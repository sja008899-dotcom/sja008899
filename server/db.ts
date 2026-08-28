import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Product, SiteContent, BlogPost, Order, ContactMessage, User } from '../src/types';
import { initialSiteContent, sampleProducts, sampleBlogPosts } from '../src/data/initialContent';

export interface OtpRecord {
  target: string; // phone or email
  code: string;
  expiresAt: number;
  attempts: number;
  createdAt: number;
}

export interface AdminUser {
  passwordHash: string;
  salt: string;
  updatedAt: string;
}

export interface DatabaseSchema {
  products: Product[];
  orders: Order[];
  blogPosts: BlogPost[];
  siteContent: SiteContent;
  contactMessages: ContactMessage[];
  users: User[];
  otpSessions: Record<string, OtpRecord>;
  admin: AdminUser;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Helper to hash password with salt using PBKDF2
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const finalSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, finalSalt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt: finalSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const computed = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return crypto.timingSafeEqual(Buffer.from(computed, 'hex'), Buffer.from(hash, 'hex'));
}

// Initial Admin Password (can be overridden by ADMIN_PASSWORD env var)
const defaultAdminPass = process.env.ADMIN_PASSWORD || 'eylma';
const initialAdmin = hashPassword(defaultAdminPass);

const initialDatabase: DatabaseSchema = {
  products: sampleProducts,
  orders: [
    {
      id: 'ord-1725000000000',
      trackingCode: 'GOL-789412',
      items: [
        {
          product: sampleProducts[0],
          quantity: 1,
          giftCardMessage: 'تولدت مبارک عزیزترینم، همیشه شاداب و خندان باشی.',
          giftCardRecipient: 'سمانه مرادی'
        }
      ],
      totalAmount: 1450000,
      shippingCost: 0,
      finalAmount: 1450000,
      paymentMethod: 'shaparak',
      status: 'preparing',
      deliveryDate: 'امروز (ارسال فوری ۲ الی ۳ ساعته)',
      deliveryTimeSlot: 'بعدازظهر (۱۴:۰۰ الی ۱۸:۰۰)',
      recipientName: 'سمانه مرادی',
      recipientPhone: '09121234567',
      recipientAddress: 'تهران، سعادت‌آباد، میدان کاج، خیابان مروارید، پلاک ۱۲، واحد ۴',
      recipientCity: 'تهران',
      createdAt: '۱۴۰۳/۰۶/۱۵ - ۱۱:۳۰',
      rrn: 'RRN-9823741029',
      sendPreDispatchPhoto: true,
      preDispatchPhotoUrl: sampleProducts[0].image
    }
  ],
  blogPosts: sampleBlogPosts,
  siteContent: initialSiteContent,
  contactMessages: [
    {
      id: 'msg-sample-1',
      name: 'دکتر علیرضا افشار',
      email: 'dr.afshar@gmail.com',
      phone: '09121234567',
      subject: 'سفارش تاج گل تبریک مراسم افتتاحیه',
      message: 'با سلام، برای پنجشنبه هفته آینده یک تاج گل دو طبقه آنتوریوم و لیلیوم با متن تبریک اختصاصی برای بیمارستان فرمانیه نیاز داریم. آیا امکان ارسال ساعت ۹ صبح وجود دارد؟',
      createdAt: '۱۴۰۳/۰۶/۱۵ ۱۰:۳۰',
      read: false
    },
    {
      id: 'msg-sample-2',
      name: 'خانم مهندس سارا بیات',
      email: 'sara.bayat@yahoo.com',
      phone: '09359876543',
      subject: 'طراحی فضای سبز و گیاهان آپارتمانی شرکت',
      message: 'درود، برای لابی و اتاق جلسات شرکت به تعدادی زاموفولیا بلک و فیکوس لیراتا در گلدان سرامیکی لالجین نیاز داریم. لطفاً پیش‌فاکتور ارسال بفرمایید.',
      createdAt: '۱۴۰۳/۰۶/۱۴ ۱۶:۴۵',
      read: true,
      replied: true
    }
  ],
  users: [
    {
      id: 'usr-default',
      fullName: 'کاربر نمونه گل آریس',
      phone: '09120000000',
      email: 'user@golarys.ir',
      city: 'تهران',
      address: 'تهران، ولیعصر، پلاک ۱۰۰',
      isLoggedIn: true,
      createdAt: new Date().toISOString()
    }
  ],
  otpSessions: {},
  admin: {
    passwordHash: initialAdmin.hash,
    salt: initialAdmin.salt,
    updatedAt: new Date().toISOString()
  }
};

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDirectory();
    this.data = this.load();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        const rawProducts: Product[] = parsed.products || sampleProducts;
        const productsWithStock = rawProducts.map((p) => ({
          ...p,
          stock: p.stock !== undefined ? p.stock : 20
        }));

        // Ensure all required top-level keys exist
        return {
          products: productsWithStock,
          orders: parsed.orders || initialDatabase.orders,
          blogPosts: parsed.blogPosts || sampleBlogPosts,
          siteContent: parsed.siteContent || initialSiteContent,
          contactMessages: parsed.contactMessages || initialDatabase.contactMessages,
          users: parsed.users || initialDatabase.users,
          otpSessions: parsed.otpSessions || {},
          admin: parsed.admin || initialDatabase.admin
        };
      }
    } catch (err) {
      console.error('Error reading db.json, initializing fresh db:', err);
    }

    this.save(initialDatabase);
    return initialDatabase;
  }

  private isWriting = false;
  private writeQueue: (() => void)[] = [];

  public save(newData?: DatabaseSchema) {
    if (newData) {
      this.data = newData;
    }
    this.ensureDirectory();

    if (this.isWriting) {
      this.writeQueue.push(() => this.save());
      return;
    }

    this.isWriting = true;
    try {
      // Atomic write using temporary file
      const tempFile = `${DB_FILE}.tmp.${Date.now()}.${Math.random().toString(36).substring(2, 6)}`;
      fs.writeFileSync(tempFile, JSON.stringify(this.data, null, 2), 'utf-8');
      fs.renameSync(tempFile, DB_FILE);
    } catch (err) {
      console.error('Error saving db.json:', err);
    } finally {
      this.isWriting = false;
      if (this.writeQueue.length > 0) {
        const nextWrite = this.writeQueue.shift();
        if (nextWrite) nextWrite();
      }
    }
  }

  // --- Products ---
  public getProducts(): Product[] {
    return this.data.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.data.products.find((p) => p.id === id || p.slug === id);
  }

  public addProduct(product: Product): Product {
    if (product.stock === undefined) {
      product.stock = 20;
    }
    this.data.products.unshift(product);
    this.save();
    return product;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.data.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.data.products[idx] = { ...this.data.products[idx], ...updates };
    this.save();
    return this.data.products[idx];
  }

  public decreaseProductStock(productId: string, quantity: number): boolean {
    const product = this.data.products.find((p) => p.id === productId || p.slug === productId);
    if (!product) return false;
    const currentStock = product.stock !== undefined ? product.stock : 20;
    const newStock = Math.max(0, currentStock - quantity);
    product.stock = newStock;
    if (newStock === 0) {
      product.inStock = false;
    }
    this.save();
    return true;
  }

  public increaseProductStock(productId: string, quantity: number): boolean {
    const product = this.data.products.find((p) => p.id === productId || p.slug === productId);
    if (!product) return false;
    const currentStock = product.stock !== undefined ? product.stock : 0;
    product.stock = currentStock + quantity;
    if (product.stock > 0) {
      product.inStock = true;
    }
    this.save();
    return true;
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.data.products.length;
    this.data.products = this.data.products.filter((p) => p.id !== id);
    if (this.data.products.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Orders ---
  public getOrders(): Order[] {
    return this.data.orders;
  }

  public getOrderById(id: string): Order | undefined {
    return this.data.orders.find((o) => o.id === id || o.trackingCode === id);
  }

  public getOrdersByPhoneOrEmail(target: string): Order[] {
    const clean = target.trim().toLowerCase();
    return this.data.orders.filter(
      (o) =>
        o.recipientPhone.includes(clean) ||
        o.trackingCode.toLowerCase().includes(clean)
    );
  }

  public addOrder(order: Order): Order {
    this.data.orders.unshift(order);
    this.save();
    return order;
  }

  public updateOrder(id: string, updates: Partial<Order>): Order | null {
    const idx = this.data.orders.findIndex((o) => o.id === id || o.trackingCode === id);
    if (idx === -1) return null;
    this.data.orders[idx] = { ...this.data.orders[idx], ...updates };
    this.save();
    return this.data.orders[idx];
  }

  // --- Site Content ---
  public getSiteContent(): SiteContent {
    return this.data.siteContent;
  }

  public updateSiteContent(content: SiteContent): SiteContent {
    this.data.siteContent = content;
    this.save();
    return this.data.siteContent;
  }

  // --- Blog Posts ---
  public getBlogPosts(): BlogPost[] {
    return this.data.blogPosts;
  }

  public addBlogPost(post: BlogPost): BlogPost {
    this.data.blogPosts.unshift(post);
    this.save();
    return post;
  }

  // --- Contact Messages ---
  public getContactMessages(): ContactMessage[] {
    return this.data.contactMessages;
  }

  public addContactMessage(msg: ContactMessage): ContactMessage {
    this.data.contactMessages.unshift(msg);
    this.save();
    return msg;
  }

  public markContactMessageRead(id: string): boolean {
    const msg = this.data.contactMessages.find((m) => m.id === id);
    if (msg) {
      msg.read = true;
      this.save();
      return true;
    }
    return false;
  }

  public deleteContactMessage(id: string): boolean {
    const initLen = this.data.contactMessages.length;
    this.data.contactMessages = this.data.contactMessages.filter((m) => m.id !== id);
    if (this.data.contactMessages.length !== initLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Users ---
  public getUser(phoneOrEmail: string): User | undefined {
    const clean = phoneOrEmail.trim().toLowerCase();
    return this.data.users.find(
      (u) => u.phone === clean || (u.email && u.email.toLowerCase() === clean)
    );
  }

  public upsertUser(user: User): User {
    const idx = this.data.users.findIndex((u) => u.id === user.id || u.phone === user.phone);
    if (idx !== -1) {
      this.data.users[idx] = { ...this.data.users[idx], ...user };
    } else {
      this.data.users.unshift(user);
    }
    this.save();
    return user;
  }

  // --- OTP Management ---
  public setOtp(target: string, code: string, expiresInMs = 120000): OtpRecord {
    const now = Date.now();
    const record: OtpRecord = {
      target,
      code,
      expiresAt: now + expiresInMs,
      attempts: 0,
      createdAt: now
    };
    this.data.otpSessions[target] = record;
    this.save();
    return record;
  }

  public getOtp(target: string): OtpRecord | undefined {
    return this.data.otpSessions[target];
  }

  public clearOtp(target: string) {
    if (this.data.otpSessions[target]) {
      delete this.data.otpSessions[target];
      this.save();
    }
  }

  // --- Admin Security ---
  public getAdmin(): AdminUser {
    return this.data.admin;
  }

  public updateAdminPassword(newPass: string) {
    const hashed = hashPassword(newPass);
    this.data.admin = {
      passwordHash: hashed.hash,
      salt: hashed.salt,
      updatedAt: new Date().toISOString()
    };
    this.save();
  }
}

export const db = new Database();
