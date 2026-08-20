import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SiteContent, ActiveTab, BlogPost, User, Order, OrderStatus, DispatchedNotification, ContactMessage } from '../types';
import { initialSiteContent, sampleProducts, sampleBlogPosts } from '../data/initialContent';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  siteContent: SiteContent;
  updateSiteContent: (newContent: SiteContent) => void;
  resetSiteContent: () => void;
  products: Product[];
  addProduct: (product: Product) => void;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, giftMessage?: string, recipient?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  updateCartGiftCard: (productId: string, message: string, recipient: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedBlogArticle: BlogPost | null;
  setSelectedBlogArticle: (post: BlogPost | null) => void;
  isGiftBuilderOpen: boolean;
  setIsGiftBuilderOpen: (open: boolean) => void;
  language: 'fa' | 'en';
  setLanguage: (lang: 'fa' | 'en') => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  triggerCelebration: () => void;

  // Real Auth & User Profile
  user: User | null;
  loginUser: (phone: string, fullName: string, email?: string, city?: string, address?: string) => void;
  logoutUser: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Real Order & Banking System
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'trackingCode' | 'createdAt' | 'status'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, rrn?: string) => void;
  updateOrder: (orderId: string, updates: Partial<Order>) => void;
  approvePreDispatchPhoto: (orderId: string, approved: boolean, feedback?: string) => void;
  findOrderByTracking: (codeOrPhone: string) => Order | undefined;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  isGatewayOpen: boolean;
  setIsGatewayOpen: (open: boolean) => void;
  activeGatewayOrder: Order | null;
  setActiveGatewayOrder: (order: Order | null) => void;

  // Real Notifications (SMS & Email simulated logs)
  dispatchedNotifications: DispatchedNotification[];
  sendNotification: (type: 'sms' | 'email' | 'bank_otp', title: string, message: string, recipient: string) => void;
  isNotificationsDrawerOpen: boolean;
  setIsNotificationsDrawerOpen: (open: boolean) => void;

  // Contact / Webmail Inbox
  contactMessages: ContactMessage[];
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => void;
  markContactMessageRead: (id: string) => void;
  deleteContactMessage: (id: string) => void;

  // SEO & Sitemap Modal
  isSitemapModalOpen: boolean;
  setIsSitemapModalOpen: (open: boolean) => void;

  // Admin Security (Password: 'eylma')
  isAdminAuthenticated: boolean;
  adminPassword: string;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  changeAdminPassword: (currentPass: string, newPass: string) => boolean;
  resetAdminPassword: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_CONTENT_KEY = 'golarys_site_content_v1';
const LOCAL_STORAGE_CART_KEY = 'golarys_cart_v1';
const LOCAL_STORAGE_PRODUCTS_KEY = 'golarys_products_v1';
const LOCAL_STORAGE_BLOG_KEY = 'golarys_blog_v1';
const LOCAL_STORAGE_USER_KEY = 'golarys_user_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'golarys_orders_v1';
const LOCAL_STORAGE_NOTIFS_KEY = 'golarys_notifs_v1';
const LOCAL_STORAGE_MESSAGES_KEY = 'golarys_inbox_messages_v1';
const LOCAL_STORAGE_ADMIN_AUTH_KEY = 'golarys_admin_auth_v1';
const LOCAL_STORAGE_ADMIN_PASSWORD_KEY = 'golarys_admin_password_v3';
const DEFAULT_ADMIN_PASSWORD = 'eylma';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialSiteContent;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return sampleProducts;
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_BLOG_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return sampleBlogPosts;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // User State
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return null;
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Notifications State
  const [dispatchedNotifications, setDispatchedNotifications] = useState<DispatchedNotification[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_NOTIFS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Contact / Webmail Inbox Messages
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
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
    ];
  });

  // Admin Auth State (Requires password 'eylma' to authenticate)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(LOCAL_STORAGE_ADMIN_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ADMIN_PASSWORD_KEY);
      if (saved && saved.trim()) return saved.trim();
    } catch {
      // ignore
    }
    return DEFAULT_ADMIN_PASSWORD;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isSitemapModalOpen, setIsSitemapModalOpen] = useState(false);
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [activeGatewayOrder, setActiveGatewayOrder] = useState<Order | null>(null);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlogArticle, setSelectedBlogArticle] = useState<BlogPost | null>(null);
  const [isGiftBuilderOpen, setIsGiftBuilderOpen] = useState(false);
  const [language, setLanguage] = useState<'fa' | 'en'>('fa');
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CONTENT_KEY, JSON.stringify(siteContent));
    } catch {}
  }, [siteContent]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
    } catch {}
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_BLOG_KEY, JSON.stringify(blogPosts));
    } catch {}
  }, [blogPosts]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      }
    } catch {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_NOTIFS_KEY, JSON.stringify(dispatchedNotifications));
    } catch {}
  }, [dispatchedNotifications]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(contactMessages));
    } catch {}
  }, [contactMessages]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ADMIN_PASSWORD_KEY, adminPassword);
    } catch {}
  }, [adminPassword]);

  // URL Hash & Keyboard shortcut listener to open admin panel discreetly
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#panel' || hash === '#management') {
        setActiveTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + A (or Cmd + Shift + A) to quickly toggle Admin Portal
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'ش')) {
        e.preventDefault();
        setActiveTab((prev) => (prev === 'admin' ? 'home' : 'admin'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle Zarinpal Payment Verification Callback
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authority = queryParams.get('Authority');
    const status = queryParams.get('Status');
    const orderId = queryParams.get('order_id');
    const verifyPayment = queryParams.get('payment_verify');

    if (verifyPayment && orderId) {
      // Find the order
      const order = orders.find(o => o.id === orderId);
      if (!order) return;

      if (status === 'OK' && authority) {
        showToast('در حال بررسی و تایید پرداخت از سمت بانک...', 'info');
        
        // Verify via backend API
        fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            authority,
            amount: order.finalAmount
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success || data.code === 101) {
            updateOrderStatus(order.id, 'paid', data.ref_id?.toString() || authority);
            triggerCelebration();
            showToast(`سفارش شما با کد پیگیری ${order.trackingCode} با موفقیت ثبت شد!`, 'success');
            clearCart();
            setIsTrackingModalOpen(true);
            
            sendNotification(
              'sms',
              'سفارش شما با موفقیت ثبت شد',
              `سفارش شما در گل آریس ثبت شد. کد پیگیری: ${order.trackingCode}\nمبلغ: ${order.finalAmount.toLocaleString('fa-IR')} تومان.`,
              order.recipientPhone
            );
          } else {
            updateOrderStatus(order.id, 'cancelled');
            showToast(data.message || 'خطا در تایید نهایی پرداخت. در صورت کسر وجه، بازگشت داده خواهد شد.', 'error');
            sendNotification('sms', 'خطای پرداخت سفارش', `تراکنش سفارش ${order.trackingCode} ناموفق بود.`, order.recipientPhone);
          }
        })
        .catch(err => {
          console.error('Verify error:', err);
          showToast('خطا در برقراری ارتباط با سرور.', 'error');
        });
      } else {
        updateOrderStatus(order.id, 'cancelled');
        showToast('تراکنش توسط شما لغو شد یا با شکست مواجه گردید.', 'error');
      }

      // Clean up URL without refreshing
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [orders]); // Needs orders dependency or to be careful. Wait, if it depends on orders, it will run again. But we clear query string! So it's safe.

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2D5A27', '#D4AF37', '#E53E3E', '#F6E05E', '#38A169']
      });
    } catch {}
  };

  // Notification sender helper (SMS, Email, OTP)
  const sendNotification = (
    type: 'sms' | 'email' | 'bank_otp',
    title: string,
    message: string,
    recipient: string
  ) => {
    const newNotif: DispatchedNotification = {
      id: 'notif-' + Date.now() + '-' + Math.random().toString(36).substring(2, 5),
      type,
      title,
      message,
      recipient,
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered'
    };
    setDispatchedNotifications((prev) => [newNotif, ...prev]);
  };

  // User Authentication
  const loginUser = (phone: string, fullName: string, email?: string, city = 'تهران', address?: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now(),
      phone,
      fullName: fullName || 'کاربر گرامی گل آریس',
      email: email || '',
      city: city || 'تهران',
      address: address || '',
      isLoggedIn: true,
      createdAt: new Date().toISOString()
    };
    setUser(newUser);
    showToast(`خوش آمدید، ${newUser.fullName}`, 'success');
    sendNotification(
      'sms',
      'ورود موفق به گل آریس',
      `کاربر گرامی ${newUser.fullName}، ورود شما به سامانه گل آریس با موفقیت انجام شد.`,
      phone
    );
    if (email) {
      sendNotification(
        'email',
        'خوش‌آمدگویی به خانواده گل آریس',
        `سلام ${newUser.fullName}، از حضور شما در بازار آنلاین گل و صنایع دستی گل آریس سپاسگزاریم.`,
        email
      );
    }
  };

  const logoutUser = () => {
    setUser(null);
    showToast('از حساب کاربری خارج شدید.', 'info');
  };

  const updateUserProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    showToast('اطلاعات حساب کاربری بروزرسانی شد.', 'success');
  };

  // Contact Message Management
  const addContactMessage = (msgData: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...msgData,
      id: 'msg-' + Date.now(),
      createdAt: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    setContactMessages((prev) => [newMessage, ...prev]);
    showToast('پیام شما در صندوق پیام‌های گل آریس ثبت شد.', 'success');
  };

  const markContactMessageRead = (id: string) => {
    setContactMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
    );
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages((prev) => prev.filter((msg) => msg.id !== id));
    showToast('پیام با موفقیت حذف شد.', 'info');
  };

  // Admin authentication with dynamic password (default 'eylma')
  const adminLogin = (password: string): boolean => {
    if (password.trim() === adminPassword.trim()) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(LOCAL_STORAGE_ADMIN_AUTH_KEY, 'true');
      showToast('ورود موفقیت‌آمیز به پنل مدیریت گل آریس', 'success');
      return true;
    } else {
      showToast('رمز عبور پنل مدیریت اشتباه است!', 'error');
      return false;
    }
  };

  const changeAdminPassword = (currentPass: string, newPass: string): boolean => {
    if (currentPass.trim() !== adminPassword.trim()) {
      showToast('رمز عبور فعلی مدیریت اشتباه است.', 'error');
      return false;
    }
    if (!newPass.trim() || newPass.trim().length < 3) {
      showToast('رمز عبور جدید باید حداقل ۳ حرف یا عدد باشد.', 'error');
      return false;
    }
    const cleanNewPass = newPass.trim();
    setAdminPassword(cleanNewPass);
    try {
      localStorage.setItem(LOCAL_STORAGE_ADMIN_PASSWORD_KEY, cleanNewPass);
    } catch {}
    showToast(`رمز عبور مدیریت با موفقیت به «${cleanNewPass}» تغییر یافت.`, 'success');
    return true;
  };

  const resetAdminPassword = () => {
    setAdminPassword(DEFAULT_ADMIN_PASSWORD);
    try {
      localStorage.setItem(LOCAL_STORAGE_ADMIN_PASSWORD_KEY, DEFAULT_ADMIN_PASSWORD);
    } catch {}
    showToast(`رمز عبور مدیریت به مقدار پیش‌فرض (${DEFAULT_ADMIN_PASSWORD}) بازگردانده شد.`, 'info');
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(LOCAL_STORAGE_ADMIN_AUTH_KEY);
    showToast('از پنل مدیریت خارج شدید.', 'info');
  };

  // Order Management
  const createOrder = (orderData: Omit<Order, 'id' | 'trackingCode' | 'createdAt' | 'status'>): Order => {
    const randomCode = 'GLR-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: Order = {
      ...orderData,
      id: 'ord-' + Date.now(),
      trackingCode: randomCode,
      createdAt: new Date().toLocaleDateString('fa-IR') + ' ' + new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      status: orderData.paymentMethod === 'shaparak' ? 'paid' : 'preparing'
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Send notifications to buyer & recipient
    sendNotification(
      'sms',
      'ثبت سفارش جدید در گل آریس',
      `سفارش شما با کد پیگیری ${newOrder.trackingCode} به مبلغ ${newOrder.finalAmount.toLocaleString('fa-IR')} تومان ثبت شد و فرآیند آماده‌سازی گل‌ها آغاز گردید.`,
      newOrder.recipientPhone
    );

    if (user?.email) {
      sendNotification(
        'email',
        `رسید الکترونیک سفارش ${newOrder.trackingCode}`,
        `فاکتور رسمی سفارش گل و گیاه شما صادر شد. تاریخ تحویل: ${newOrder.deliveryDate} بازه زمانی: ${newOrder.deliveryTimeSlot}.`,
        user.email
      );
    }

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, rrn?: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status, ...(rrn ? { rrn } : {}) } : ord))
    );
  };

  const updateOrder = (orderId: string, updates: Partial<Order>) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, ...updates } : ord))
    );
  };

  const approvePreDispatchPhoto = (orderId: string, approved: boolean, feedback?: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          preDispatchPhotoApproved: approved,
          preDispatchPhotoFeedback: feedback,
          status: approved ? 'gift_wrapping' : ord.status
        };
      })
    );

    const target = orders.find((o) => o.id === orderId);
    if (target) {
      if (approved) {
        showToast('عکس گل‌آرایی تایید شد! سفارش جهت بسته‌بندی نهایی و تحویل به پیک ارسال گردید.', 'success');
        sendNotification(
          'sms',
          'تایید گل‌آرایی توسط خریدار',
          `خریدار گرامی، تاییدیه گل‌آرایی سفارش ${target.trackingCode} با موفقیت ثبت شد و بسته جهت ارسال به پیک مجهز تحویل شد.`,
          target.recipientPhone
        );
      } else {
        showToast('نظر شما برای اصلاح و تغییر گل‌آرایی به گلفروش ارسال شد.', 'info');
        sendNotification(
          'sms',
          'درخواست اصلاح گل‌آرایی',
          `درخواست شما: «${feedback || 'اصلاح گل‌آرایی'}» برای سفارش ${target.trackingCode} ثبت شد. گلفروش پس از تغییرات عکس جدید ارسال خواهد کرد.`,
          target.recipientPhone
        );
      }
    }
  };

  const findOrderByTracking = (codeOrPhone: string): Order | undefined => {
    const clean = codeOrPhone.trim().toLowerCase();
    return orders.find(
      (o) =>
        o.trackingCode.toLowerCase() === clean ||
        o.recipientPhone.replace(/\D/g, '') === clean.replace(/\D/g, '') ||
        o.id === clean
    );
  };

  const updateSiteContent = (newContent: SiteContent) => {
    setSiteContent(newContent);
    showToast('محتوای سایت با موفقیت بروزرسانی و ذخیره شد!', 'success');
  };

  const resetSiteContent = () => {
    setSiteContent(initialSiteContent);
    setProducts(sampleProducts);
    setBlogPosts(sampleBlogPosts);
    showToast('محتوای سایت به حالت اولیه بازگردانی شد.', 'info');
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`محصول «${newProduct.name}» با موفقیت اضافه شد.`, 'success');
  };

  const addBlogPost = (newPost: BlogPost) => {
    setBlogPosts((prev) => [newPost, ...prev]);
    showToast(`مقاله «${newPost.title}» در بلاگ منتشر شد.`, 'success');
  };

  const addToCart = (product: Product, quantity = 1, giftMessage?: string, recipient?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (giftMessage) updated[existingIndex].giftCardMessage = giftMessage;
        if (recipient) updated[existingIndex].giftCardRecipient = recipient;
        return updated;
      }
      return [
        ...prev,
        {
          product,
          quantity,
          giftCardMessage: giftMessage,
          giftCardRecipient: recipient,
          giftCardTheme: 'classic_gold'
        }
      ];
    });
    showToast(`«${product.name}» به سبد خرید اضافه شد.`, 'success');
    triggerCelebration();
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('آیتم از سبد خرید حذف شد.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const updateCartGiftCard = (productId: string, message: string, recipient: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, giftCardMessage: message, giftCardRecipient: recipient }
          : item
      )
    );
    showToast('پیام کارت هدیه اختصاصی برای این گل ثبت شد.', 'success');
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider
      value={{
        siteContent,
        updateSiteContent,
        resetSiteContent,
        products,
        addProduct,
        blogPosts,
        addBlogPost,
        activeTab,
        setActiveTab,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        updateCartGiftCard,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        selectedProduct,
        setSelectedProduct,
        selectedBlogArticle,
        setSelectedBlogArticle,
        isGiftBuilderOpen,
        setIsGiftBuilderOpen,
        language,
        setLanguage,
        toasts,
        showToast,
        triggerCelebration,

        // Auth
        user,
        loginUser,
        logoutUser,
        updateUserProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,

        // Orders & Banking
        orders,
        createOrder,
        updateOrderStatus,
        updateOrder,
        approvePreDispatchPhoto,
        findOrderByTracking,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        isGatewayOpen,
        setIsGatewayOpen,
        activeGatewayOrder,
        setActiveGatewayOrder,

        // Real Notifications
        dispatchedNotifications,
        sendNotification,
        isNotificationsDrawerOpen,
        setIsNotificationsDrawerOpen,

        // Contact / Webmail Inbox
        contactMessages,
        addContactMessage,
        markContactMessageRead,
        deleteContactMessage,

        // SEO & Sitemap
        isSitemapModalOpen,
        setIsSitemapModalOpen,

        // Admin Auth
        isAdminAuthenticated,
        adminPassword,
        adminLogin,
        adminLogout,
        changeAdminPassword,
        resetAdminPassword
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
