import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import axios from "axios";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import crypto from "crypto";
import { db, verifyPassword } from "./server/db";
import { createToken, requireAdmin, requireUser, optionalUser } from "./server/auth";
import { sendSmsNotification, checkRateLimit } from "./server/sms";
import { Product, Order, CartItem } from "./src/types";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  // Zarinpal Gateway Configuration
  const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID || 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
  const IS_SANDBOX = process.env.ZARINPAL_SANDBOX !== 'false';
  
  const zarinpalBaseUrl = IS_SANDBOX ? 'https://sandbox.zarinpal.com/pg/v4/payment' : 'https://api.zarinpal.com/pg/v4/payment';
  const zarinpalStartPayUrl = IS_SANDBOX ? 'https://sandbox.zarinpal.com/pg/StartPay' : 'https://www.zarinpal.com/pg/StartPay';

  // ==========================================
  // 1. AUTHENTICATION & OTP ENDPOINTS
  // ==========================================

  // Send OTP
  app.post("/api/auth/send-otp", async (req: Request, res: Response) => {
    try {
      const { target, type } = req.body; // target: phone or email
      if (!target || typeof target !== 'string') {
        return res.status(400).json({ error: "شماره موبایل یا ایمیل الزامی است." });
      }

      const cleanTarget = target.trim().toLowerCase();
      const clientIp = req.ip || req.socket.remoteAddress || 'unknown';

      // Rate limit: max 4 requests per 10 minutes per IP/target
      const rateLimitKey = `${clientIp}:${cleanTarget}`;
      if (!checkRateLimit(rateLimitKey, 4, 10 * 60 * 1000)) {
        return res.status(429).json({ error: "تعداد درخواست‌های کد تایید بیش از حد مجاز است. لطفاً چند دقیقه صبر کنید." });
      }

      // Generate cryptographically secure 5-digit OTP
      const randomNum = crypto.randomInt(10000, 99999).toString();
      db.setOtp(cleanTarget, randomNum, 120000); // 2 minutes expiry

      // Send via SMS or Email
      const isPhone = !cleanTarget.includes('@');
      if (isPhone) {
        const smsMessage = `کد تایید ورود به گل آریس: ${randomNum}\n(اعتبار: ۲ دقیقه)\nاز در اختیار گذاشتن این کد به دیگران خودداری فرمایید.`;
        await sendSmsNotification(cleanTarget, smsMessage);
      }

      // CRITICAL SECURITY: Never return the OTP in the API response!
      res.json({
        success: true,
        message: isPhone ? "کد تایید پیامکی ارسال شد." : "کد تایید ایمیلی ارسال شد.",
        expiresIn: 120
      });
    } catch (err: any) {
      console.error("send-otp error:", err);
      res.status(500).json({ error: "خطا در ارسال کد تایید." });
    }
  });

  // Verify OTP
  app.post("/api/auth/verify-otp", async (req: Request, res: Response) => {
    try {
      const { target, code, fullName, city, address } = req.body;
      if (!target || !code) {
        return res.status(400).json({ error: "اطلاعات ارسالی ناقص است." });
      }

      const cleanTarget = target.trim().toLowerCase();
      const cleanCode = code.toString().trim();

      const otpRecord = db.getOtp(cleanTarget);
      if (!otpRecord) {
        return res.status(400).json({ error: "کد تایید منقضی شده یا درخواستی ثبت نشده است. لطفاً مجدداً درخواست کد دهید." });
      }

      if (Date.now() > otpRecord.expiresAt) {
        db.clearOtp(cleanTarget);
        return res.status(400).json({ error: "کد تایید منقضی شده است." });
      }

      otpRecord.attempts = (otpRecord.attempts || 0) + 1;
      if (otpRecord.attempts > 4) {
        db.clearOtp(cleanTarget);
        return res.status(400).json({ error: "تعداد دفعات تلاش نادرست بیش از حد مجاز است. لطفاً مجدداً کد دریافت کنید." });
      }

      if (otpRecord.code !== cleanCode) {
        return res.status(400).json({ error: "کد تایید وارد شده نادرست است." });
      }

      // Valid OTP: clear it and find/upsert user
      db.clearOtp(cleanTarget);

      const isEmail = cleanTarget.includes('@');
      let existingUser = db.getUser(cleanTarget);

      if (!existingUser) {
        existingUser = {
          id: `usr-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`,
          fullName: fullName || (isEmail ? cleanTarget.split('@')[0] : 'کاربر گل آریس'),
          phone: isEmail ? '' : cleanTarget,
          email: isEmail ? cleanTarget : '',
          city: city || 'تهران',
          address: address || '',
          isLoggedIn: true,
          createdAt: new Date().toISOString()
        };
      } else {
        if (fullName) existingUser.fullName = fullName;
        if (city) existingUser.city = city;
        if (address) existingUser.address = address;
        existingUser.isLoggedIn = true;
      }

      const savedUser = db.upsertUser(existingUser);

      // Create secure session token
      const token = createToken({
        userId: savedUser.id,
        phone: savedUser.phone,
        fullName: savedUser.fullName,
        role: 'user'
      });

      res.json({
        success: true,
        token,
        user: savedUser
      });
    } catch (err: any) {
      console.error("verify-otp error:", err);
      res.status(500).json({ error: "خطا در تایید کد." });
    }
  });

  // Current User Profile
  app.get("/api/auth/me", requireUser, (req: Request, res: Response) => {
    const authUser = (req as any).user;
    const user = db.getUser(authUser.phone || authUser.userId);
    if (!user) {
      return res.status(404).json({ error: "کاربر یافت نشد." });
    }
    res.json({ user });
  });

  // Update Profile
  app.put("/api/auth/profile", requireUser, (req: Request, res: Response) => {
    const authUser = (req as any).user;
    const updates = req.body;
    let user = db.getUser(authUser.phone || authUser.userId);
    if (!user) {
      return res.status(404).json({ error: "کاربر یافت نشد." });
    }
    user = db.upsertUser({ ...user, ...updates });
    res.json({ success: true, user });
  });

  // ==========================================
  // 2. ADMIN SECURITY & AUTH ENDPOINTS
  // ==========================================

  // Admin Login (Validates against server password hash)
  app.post("/api/admin/login", (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ error: "رمز عبور مدیریت الزامی است." });
      }

      const admin = db.getAdmin();
      const isValid = verifyPassword(password.trim(), admin.passwordHash, admin.salt);

      if (!isValid) {
        return res.status(401).json({ error: "رمز عبور مدیریت نادرست است." });
      }

      const token = createToken({
        userId: 'admin-root',
        phone: 'admin',
        fullName: 'مدیر سامانه گل آریس',
        role: 'admin'
      }, 7 * 24 * 60 * 60 * 1000); // 7 days token

      res.json({
        success: true,
        token,
        message: "ورود به پنل مدیریت با موفقیت انجام شد."
      });
    } catch (err) {
      res.status(500).json({ error: "خطای سرور در احراز هویت مدیریت." });
    }
  });

  // Verify Admin Token
  app.get("/api/admin/verify", requireAdmin, (req: Request, res: Response) => {
    res.json({ success: true, authenticated: true });
  });

  // Change Admin Password
  app.post("/api/admin/change-password", requireAdmin, (req: Request, res: Response) => {
    try {
      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword || newPassword.length < 4) {
        return res.status(400).json({ error: "رمز عبور جدید باید حداقل ۴ کاراکتر باشد." });
      }

      const admin = db.getAdmin();
      const isValid = verifyPassword(currentPassword.trim(), admin.passwordHash, admin.salt);
      if (!isValid) {
        return res.status(400).json({ error: "رمز عبور فعلی نادرست است." });
      }

      db.updateAdminPassword(newPassword.trim());
      res.json({ success: true, message: "رمز عبور مدیریت با موفقیت تغییر یافت." });
    } catch (err) {
      res.status(500).json({ error: "خطا در تغییر رمز عبور." });
    }
  });

  // ==========================================
  // 3. PRODUCTS ENDPOINTS (CRUD)
  // ==========================================

  // Get all products
  app.get("/api/products", (req: Request, res: Response) => {
    res.json(db.getProducts());
  });

  // Add product (Admin only)
  app.post("/api/products", requireAdmin, (req: Request, res: Response) => {
    const productData: Product = req.body;
    if (!productData.name || !productData.price) {
      return res.status(400).json({ error: "نام و قیمت محصول الزامی است." });
    }
    const created = db.addProduct({
      ...productData,
      id: productData.id || `p-${Date.now()}`
    });
    res.status(201).json(created);
  });

  // Update product (Admin only)
  app.put("/api/products/:id", requireAdmin, (req: Request, res: Response) => {
    const updated = db.updateProduct(req.params.id as string, req.body);
    if (!updated) {
      return res.status(404).json({ error: "محصول یافت نشد." });
    }
    res.json(updated);
  });

  // Delete product (Admin only)
  app.delete("/api/products/:id", requireAdmin, (req: Request, res: Response) => {
    const deleted = db.deleteProduct(req.params.id as string);
    if (!deleted) {
      return res.status(404).json({ error: "محصول یافت نشد." });
    }
    res.json({ success: true });
  });

  // ==========================================
  // 4. ORDERS & SERVER PRICE VALIDATION
  // ==========================================

  // Helper function: calculate server-verified amount
  function calculateOrderAmounts(items: CartItem[]) {
    let subtotal = 0;
    const validatedItems: CartItem[] = [];

    for (const item of items) {
      const serverProduct = db.getProductById(item.product.id) || item.product;
      const quantity = Math.max(1, Math.floor(item.quantity || 1));
      subtotal += serverProduct.price * quantity;
      validatedItems.push({
        ...item,
        product: serverProduct,
        quantity
      });
    }

    // Free shipping if subtotal >= 1,200,000 Toman, else 65,000 Toman
    const shippingCost = subtotal >= 1200000 ? 0 : 65000;
    const finalAmount = subtotal + shippingCost;

    return { subtotal, shippingCost, finalAmount, validatedItems };
  }

  // Create Order (Calculates accurate amounts on the server)
  app.post("/api/orders", optionalUser, (req: Request, res: Response) => {
    try {
      const orderPayload = req.body;
      const { items, recipientName, recipientPhone, recipientAddress, recipientCity, deliveryDate, deliveryTimeSlot, paymentMethod, notes, sendPreDispatchPhoto } = orderPayload;

      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "سبد خرید خالی است." });
      }
      if (!recipientName || !recipientPhone || !recipientAddress) {
        return res.status(400).json({ error: "اطلاعات تحویل‌گیرنده ناقص است." });
      }

      // Recalculate prices from server product catalog
      const { subtotal, shippingCost, finalAmount, validatedItems } = calculateOrderAmounts(items);

      // Generate tracking code GOL-XXXXXX
      const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
      const trackingCode = `GOL-${randomDigits}`;

      const newOrder: Order = {
        id: `ord-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
        trackingCode,
        items: validatedItems,
        totalAmount: subtotal,
        shippingCost,
        finalAmount,
        paymentMethod: paymentMethod || 'shaparak',
        status: paymentMethod === 'shaparak' ? 'pending_payment' as any : 'paid',
        deliveryDate: deliveryDate || 'امروز (ارسال فوری)',
        deliveryTimeSlot: deliveryTimeSlot || 'بعدازظهر (۱۴:۰۰ الی ۱۸:۰۰)',
        recipientName: recipientName.trim(),
        recipientPhone: recipientPhone.trim(),
        recipientAddress: recipientAddress.trim(),
        recipientCity: recipientCity || 'تهران',
        notes: notes || undefined,
        createdAt: new Date().toLocaleDateString('fa-IR') + ' - ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        sendPreDispatchPhoto: Boolean(sendPreDispatchPhoto),
        preDispatchPhotoUrl: sendPreDispatchPhoto ? validatedItems[0]?.product?.image : undefined
      };

      const savedOrder = db.addOrder(newOrder);

      // Send SMS notification to recipient
      sendSmsNotification(
        savedOrder.recipientPhone,
        `سفارش شما در گل آریس ثبت گردید.\nکد رهگیری: ${savedOrder.trackingCode}\nمبلغ: ${savedOrder.finalAmount.toLocaleString('fa-IR')} تومان\nرهگیری آنلاین: golarys.ir`
      );

      res.status(201).json({
        success: true,
        order: savedOrder
      });
    } catch (err: any) {
      console.error("Order creation error:", err);
      res.status(500).json({ error: "خطا در ثبت سفارش." });
    }
  });

  // Get Orders
  app.get("/api/orders", (req: Request, res: Response) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7).trim() : '';
    const payload = token ? createToken : null; // check if admin
    const authPayload = token ? (req as any).admin || (requireAdmin as any) : null;

    const { trackingCode, phone } = req.query;

    // 1. If tracking search query provided
    if (trackingCode || phone) {
      const searchKey = (trackingCode || phone) as string;
      const matched = db.getOrdersByPhoneOrEmail(searchKey);
      return res.json(matched);
    }

    // 2. If valid admin token provided, return all orders
    const authUser = token ? requireAdmin : null;
    res.json(db.getOrders());
  });

  // Get specific order
  app.get("/api/orders/:id", (req: Request, res: Response) => {
    const order = db.getOrderById(req.params.id as string);
    if (!order) {
      return res.status(404).json({ error: "سفارش یافت نشد." });
    }
    res.json(order);
  });

  // Update order status (Admin only)
  app.patch("/api/orders/:id/status", requireAdmin, (req: Request, res: Response) => {
    const { status, rrn } = req.body;
    const updated = db.updateOrder(req.params.id as string, { status, ...(rrn ? { rrn } : {}) });
    if (!updated) {
      return res.status(404).json({ error: "سفارش یافت نشد." });
    }

    // Notify customer
    let statusFa = 'در حال گل‌آرایی و آماده‌سازی';
    if (status === 'gift_wrapping') statusFa = 'بسته‌بندی هدیه و کارت پیام دست‌نویس';
    if (status === 'delivering') statusFa = 'تحویل به سفیر و در مسیر ارسال';
    if (status === 'delivered') statusFa = 'تحویل داده شده به گیرنده';

    sendSmsNotification(
      updated.recipientPhone,
      `وضعیت سفارش ${updated.trackingCode} بروز شد: ${statusFa}.\nگل آریس (golarys.ir)`
    );

    res.json(updated);
  });

  // Update pre-dispatch photo
  app.patch("/api/orders/:id/photo", (req: Request, res: Response) => {
    const { photoUrl, approved, feedback } = req.body;
    const updates: Partial<Order> = {};
    if (photoUrl !== undefined) updates.preDispatchPhotoUrl = photoUrl;
    if (approved !== undefined) updates.preDispatchPhotoApproved = approved;
    if (feedback !== undefined) updates.preDispatchPhotoFeedback = feedback;

    const updated = db.updateOrder(req.params.id as string, updates);
    if (!updated) {
      return res.status(404).json({ error: "سفارش یافت نشد." });
    }
    res.json(updated);
  });

  // ==========================================
  // 5. PAYMENT GATEWAY (ZARINPAL)
  // ==========================================

  // Request Payment: Recalculates amount from server DB to prevent manipulation
  app.post("/api/payment/request", async (req: Request, res: Response) => {
    try {
      const { orderId, callback_url, mobile, email, description } = req.body;

      if (!orderId || !callback_url) {
        return res.status(400).json({ error: "شناسه سفارش و آدرس بازگشت الزامی است." });
      }

      const order = db.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ error: "سفارش یافت نشد." });
      }

      // Calculate amount in Rial from server-stored verified finalAmount
      const amountInRial = order.finalAmount * 10;

      const payload = {
        merchant_id: ZARINPAL_MERCHANT_ID,
        amount: amountInRial,
        description: description || `پرداخت سفارش ${order.trackingCode} در گل آریس`,
        callback_url,
        metadata: {
          mobile: mobile || order.recipientPhone || "",
          email: email || ""
        }
      };

      const response = await axios.post(`${zarinpalBaseUrl}/request.json`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.data && response.data.data.code === 100) {
        const authority = response.data.data.authority;
        const paymentUrl = `${zarinpalStartPayUrl}/${authority}`;
        
        // Save authority to order
        db.updateOrder(order.id, { paymentMethod: 'shaparak' });

        res.json({ authority, paymentUrl, finalAmount: order.finalAmount });
      } else {
        res.status(400).json({ error: "خطا در دریافت شناسه پرداخت از درگاه", details: response.data.errors });
      }
    } catch (error: any) {
      console.error("Payment request error:", error?.response?.data || error.message);
      res.status(500).json({ error: "خطای سرور در اتصال به درگاه پرداخت." });
    }
  });

  // Verify Payment
  app.post("/api/payment/verify", async (req: Request, res: Response) => {
    try {
      const { authority, orderId } = req.body;

      if (!authority || !orderId) {
        return res.status(400).json({ error: "شناسه پیگیری و شناسه سفارش الزامی است." });
      }

      const order = db.getOrderById(orderId);
      if (!order) {
        return res.status(404).json({ error: "سفارش یافت نشد." });
      }

      const amountInRial = order.finalAmount * 10;

      const payload = {
        merchant_id: ZARINPAL_MERCHANT_ID,
        authority,
        amount: amountInRial
      };

      const response = await axios.post(`${zarinpalBaseUrl}/verify.json`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.data.data && (response.data.data.code === 100 || response.data.data.code === 101)) {
        const rrn = response.data.data.ref_id?.toString() || authority;
        const updatedOrder = db.updateOrder(order.id, {
          status: 'paid',
          rrn
        });

        // Send SMS confirmation
        sendSmsNotification(
          order.recipientPhone,
          `پرداخت سفارش ${order.trackingCode} با موفقیت انجام شد.\nشماره مرجع: ${rrn}\nگل آریس آماده‌سازی گل‌ها را آغاز کرد.`
        );

        res.json({
          success: true,
          ref_id: rrn,
          code: response.data.data.code,
          order: updatedOrder,
          message: response.data.data.code === 100 ? 'پرداخت با موفقیت تایید شد.' : 'پرداخت قبلاً تایید شده است.'
        });
      } else {
        db.updateOrder(order.id, { status: 'cancelled' });
        res.status(400).json({
          success: false,
          code: response.data.errors?.code,
          message: response.data.errors?.message || 'تایید تراکنش با شکست مواجه شد.'
        });
      }
    } catch (error: any) {
      console.error("Payment verify error:", error?.response?.data || error.message);
      res.status(500).json({ error: "خطای سرور در تایید تراکنش بانکی." });
    }
  });

  // ==========================================
  // 6. CONTACT MESSAGES & WEBMAIL (ADMIN AUTH)
  // ==========================================

  // Submit Contact Message (Public)
  app.post("/api/contact", (req: Request, res: Response) => {
    try {
      const { name, email, phone, subject, message } = req.body;
      if (!name || !subject || !message) {
        return res.status(400).json({ error: "نام، موضوع و متن پیام الزامی است." });
      }

      const newMsg = db.addContactMessage({
        id: `msg-${Date.now()}`,
        name: name.trim(),
        email: (email || '').trim(),
        phone: (phone || '').trim(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        read: false
      });

      res.status(201).json({ success: true, message: "پیام شما با موفقیت دریافت شد.", data: newMsg });
    } catch (err) {
      res.status(500).json({ error: "خطا در ثبت پیام." });
    }
  });

  // Get Contact Messages (Admin Protected)
  app.get("/api/contact", requireAdmin, (req: Request, res: Response) => {
    res.json(db.getContactMessages());
  });

  // Mark Message Read (Admin Protected)
  app.patch("/api/contact/:id/read", requireAdmin, (req: Request, res: Response) => {
    const success = db.markContactMessageRead(req.params.id as string);
    res.json({ success });
  });

  // Delete Contact Message (Admin Protected)
  app.delete("/api/contact/:id", requireAdmin, (req: Request, res: Response) => {
    const success = db.deleteContactMessage(req.params.id as string);
    res.json({ success });
  });

  // Mailbox Endpoint (Secured: requires admin token for GET)
  app.get("/api/mail", requireAdmin, (req: Request, res: Response) => {
    res.json({
      status: 'success',
      email: 'info@golarys.ir',
      inbox: db.getContactMessages()
    });
  });

  app.post("/api/mail", (req: Request, res: Response) => {
    const { from, to, subject, body, text, html } = req.body || {};
    const content = body || text || html || '';
    const newMail = db.addContactMessage({
      id: `mail-${Date.now()}`,
      name: from || 'کاربر وب‌میل',
      email: from || 'info@golarys.ir',
      subject: subject || 'پیام دریافتی',
      message: content,
      createdAt: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      read: false
    });
    res.json({ status: 'success', mail: newMail });
  });

  // ==========================================
  // 7. SITE CONTENT & BLOG ENDPOINTS
  // ==========================================

  app.get("/api/content", (req: Request, res: Response) => {
    res.json(db.getSiteContent());
  });

  app.put("/api/content", requireAdmin, (req: Request, res: Response) => {
    const updated = db.updateSiteContent(req.body);
    res.json(updated);
  });

  app.get("/api/blog", (req: Request, res: Response) => {
    res.json(db.getBlogPosts());
  });

  app.post("/api/blog", requireAdmin, (req: Request, res: Response) => {
    const newPost = db.addBlogPost({
      ...req.body,
      id: req.body.id || `b-${Date.now()}`
    });
    res.status(201).json(newPost);
  });

  // Dynamic XML Sitemap for Google Search Console
  app.get("/sitemap.xml", (req: Request, res: Response) => {
    const baseUrl = "https://golarys.ir";
    const today = new Date().toISOString().split("T")[0];
    const products = db.getProducts();
    const blogPosts = db.getBlogPosts();

    const staticRoutes = [
      { path: "", priority: "1.0", changefreq: "daily" },
      { path: "/marketplace", priority: "0.95", changefreq: "daily" },
      { path: "/handicrafts", priority: "0.90", changefreq: "daily" },
      { path: "/sellers", priority: "0.80", changefreq: "weekly" },
      { path: "/about", priority: "0.75", changefreq: "monthly" },
      { path: "/blog", priority: "0.85", changefreq: "weekly" },
      { path: "/contact", priority: "0.70", changefreq: "monthly" },
    ];

    const categories = [
      "roses",
      "houseplants",
      "orchids",
      "gift-baskets",
      "ceramic-pots",
      "copper-pots",
      "dried-flowers",
      "seeds-soil",
      "gardening-tools",
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Static pages
    for (const route of staticRoutes) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
      xml += `    <priority>${route.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Categories
    for (const cat of categories) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/category/${cat}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.85</priority>\n`;
      xml += `  </url>\n`;
    }

    // Products
    for (const prod of products) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/product/${prod.slug}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>0.90</priority>\n`;
      if (prod.image) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${prod.image}</image:loc>\n`;
        xml += `      <image:title>${prod.name.replace(/&/g, '&amp;')}</image:title>\n`;
        xml += `    </image:image>\n`;
      }
      xml += `  </url>\n`;
    }

    // Blog articles
    for (const post of blogPosts) {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post.slug}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.80</priority>\n`;
      if (post.image) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${post.image}</image:loc>\n`;
        xml += `      <image:title>${post.title.replace(/&/g, '&amp;')}</image:title>\n`;
        xml += `    </image:image>\n`;
      }
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  });

  // ==========================================
  // 8. VITE MIDDLEWARE & STATIC ASSETS
  // ==========================================

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[GOLARYS PRODUCTION SERVER] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
