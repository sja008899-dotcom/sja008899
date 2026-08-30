import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, SiteContent, ActiveTab, BlogPost, User, Order, OrderStatus, DispatchedNotification, ContactMessage } from '../types';
import { initialSiteContent, sampleProducts, sampleBlogPosts } from '../data/initialContent';
import { parseRoute, getPathForTab, getPathForProduct, getPathForBlogArticle } from '../lib/routing';
import confetti from 'canvas-confetti';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  siteContent: SiteContent;
  updateSiteContent: (newContent: SiteContent) => Promise<void>;
  resetSiteContent: () => void;
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => Promise<void>;
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

  // Real Auth & User Profile (Backed by JWT & Server API)
  user: User | null;
  sendOtp: (target: string, type?: 'phone' | 'email') => Promise<{ success: boolean; message: string; expiresIn?: number }>;
  verifyOtp: (target: string, code: string, fullName?: string, city?: string, address?: string) => Promise<boolean>;
  logoutUser: () => void;
  updateUserProfile: (updates: Partial<User>) => Promise<void>;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  // Real Order & Banking System (Backed by Server Database)
  orders: Order[];
  refreshOrders: () => Promise<void>;
  createOrder: (orderData: {
    items: CartItem[];
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
    recipientCity: string;
    deliveryDate: string;
    deliveryTimeSlot: string;
    paymentMethod: 'shaparak' | 'card_to_card' | 'cod';
    notes?: string;
    sendPreDispatchPhoto?: boolean;
  }) => Promise<Order | null>;
  updateOrderStatus: (orderId: string, status: OrderStatus, rrn?: string) => Promise<void>;
  updateOrder: (orderId: string, updates: Partial<Order>) => Promise<void>;
  savePreDispatchPhoto: (orderId: string, photoUrl: string) => Promise<boolean>;
  approvePreDispatchPhoto: (orderId: string, approved: boolean, feedback?: string) => Promise<void>;
  findOrderByTracking: (codeOrPhone: string) => Promise<Order[]>;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;

  // Notifications
  dispatchedNotifications: DispatchedNotification[];
  sendNotification: (type: 'sms' | 'email' | 'bank_otp', title: string, message: string, recipient: string) => void;
  isNotificationsDrawerOpen: boolean;
  setIsNotificationsDrawerOpen: (open: boolean) => void;

  // Contact / Webmail Inbox
  contactMessages: ContactMessage[];
  refreshContactMessages: () => Promise<void>;
  addContactMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => Promise<void>;
  markContactMessageRead: (id: string) => Promise<void>;
  deleteContactMessage: (id: string) => Promise<void>;

  // SEO & Sitemap Modal
  isSitemapModalOpen: boolean;
  setIsSitemapModalOpen: (open: boolean) => void;

  // Mobile App Download Modal
  isMobileAppModalOpen: boolean;
  setIsMobileAppModalOpen: (open: boolean) => void;

  // Admin Security (JWT & Server Session)
  isAdminAuthenticated: boolean;
  adminPassword?: string;
  adminLogin: (password: string) => Promise<boolean>;
  adminLogout: () => void;
  changeAdminPassword: (currentPass: string, newPass: string) => Promise<boolean>;
  resetAdminPassword?: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = 'golarys_cart_v2';
const TOKEN_USER_KEY = 'golarys_user_token_v2';
const TOKEN_ADMIN_KEY = 'golarys_admin_token_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteContent, setSiteContent] = useState<SiteContent>(initialSiteContent);
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(sampleBlogPosts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const initialRoute = typeof window !== 'undefined' ? parseRoute(window.location.pathname) : { tab: 'home' as ActiveTab };
  const [activeTab, setActiveTabState] = useState<ActiveTab>(initialRoute.tab);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const [isSitemapModalOpen, setIsSitemapModalOpen] = useState(false);
  const [isMobileAppModalOpen, setIsMobileAppModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProductState] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProductState] = useState<Product | null>(null);
  const [selectedBlogArticle, setSelectedBlogArticleState] = useState<BlogPost | null>(null);

  const setSelectedBlogArticle = useCallback((post: BlogPost | null) => {
    setSelectedBlogArticleState(post);
    if (post) {
      const newPath = getPathForBlogArticle(post.slug);
      if (window.location.pathname !== newPath) {
        window.history.pushState({ blogSlug: post.slug }, '', newPath);
      }
    } else {
      const currentTabPath = getPathForTab(activeTab);
      if (window.location.pathname.startsWith('/blog/')) {
        window.history.pushState({}, '', currentTabPath);
      }
    }
  }, [activeTab]);
  const [isGiftBuilderOpen, setIsGiftBuilderOpen] = useState(false);
  const [language, setLanguage] = useState<'fa' | 'en'>('fa');
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [dispatchedNotifications, setDispatchedNotifications] = useState<DispatchedNotification[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Initial Data Fetch from Server
  useEffect(() => {
    // 1. Fetch Products
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => console.log('Products fallback to default:', err));

    // 2. Fetch Content
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data?.site?.brand) {
          setSiteContent(data);
        }
      })
      .catch((err) => console.log('Content fallback to default:', err));

    // 3. Fetch Blog
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogPosts(data);
        }
      })
      .catch((err) => console.log('Blog fallback to default:', err));

    // 4. Check User Token
    const userToken = localStorage.getItem(TOKEN_USER_KEY);
    if (userToken) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${userToken}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            localStorage.removeItem(TOKEN_USER_KEY);
          }
        })
        .catch(() => localStorage.removeItem(TOKEN_USER_KEY));
    }

    // 5. Check Admin Token
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    if (adminToken) {
      fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            setIsAdminAuthenticated(true);
            refreshOrders();
            refreshContactMessages();
          } else {
            localStorage.removeItem(TOKEN_ADMIN_KEY);
          }
        })
        .catch(() => localStorage.removeItem(TOKEN_ADMIN_KEY));
    }
  }, []);

  // Fetch Orders
  const refreshOrders = async () => {
    try {
      const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
      const headers: Record<string, string> = {};
      if (adminToken) headers.Authorization = `Bearer ${adminToken}`;
      const res = await fetch('/api/orders', { headers });
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      console.error('refreshOrders error:', err);
    }
  };

  // Fetch Contact Messages
  const refreshContactMessages = async () => {
    try {
      const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
      if (!adminToken) return;
      const res = await fetch('/api/contact', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setContactMessages(data);
      }
    } catch (err) {
      console.error('refreshContactMessages error:', err);
    }
  };

  // Synchronized Tab Setter that updates browser history URL
  const setActiveTab = useCallback((tab: ActiveTab) => {
    setActiveTabState(tab);
    setQuickViewProductState(null);
    setSelectedProductState(null);
    const newPath = getPathForTab(tab);
    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab }, '', newPath);
    }
  }, []);

  // Synchronized Product View that updates both selectedProduct & quickViewProduct and browser URL
  const setQuickViewProduct = useCallback((product: Product | null) => {
    setQuickViewProductState(product);
    setSelectedProductState(product);
    if (product) {
      const newPath = getPathForProduct(product.slug);
      if (window.location.pathname !== newPath) {
        window.history.pushState({ productSlug: product.slug }, '', newPath);
      }
    } else {
      const currentTabPath = getPathForTab(activeTab);
      if (window.location.pathname.startsWith('/product/')) {
        window.history.pushState({}, '', currentTabPath);
      }
    }
  }, [activeTab]);

  const setSelectedProduct = useCallback((product: Product | null) => {
    setQuickViewProduct(product);
  }, [setQuickViewProduct]);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const { tab, productSlug, blogSlug } = parseRoute(window.location.pathname);
      setActiveTabState(tab);
      if (productSlug) {
        const found = products.find((p) => p.slug === productSlug || p.id === productSlug);
        if (found) {
          setQuickViewProductState(found);
          setSelectedProductState(found);
        }
      } else {
        setQuickViewProductState(null);
        setSelectedProductState(null);
      }

      if (blogSlug) {
        const foundArticle = blogPosts.find((b) => b.slug === blogSlug || b.id === blogSlug);
        if (foundArticle) {
          setSelectedBlogArticleState(foundArticle);
        }
      } else {
        setSelectedBlogArticleState(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [products, blogPosts]);

  // Initial product & blog route check once data loads
  useEffect(() => {
    if (initialRoute.productSlug && products.length > 0) {
      const found = products.find((p) => p.slug === initialRoute.productSlug || p.id === initialRoute.productSlug);
      if (found) {
        setQuickViewProductState(found);
        setSelectedProductState(found);
      }
    }
    if (initialRoute.blogSlug && blogPosts.length > 0) {
      const foundArticle = blogPosts.find((b) => b.slug === initialRoute.blogSlug || b.id === initialRoute.blogSlug);
      if (foundArticle) {
        setSelectedBlogArticleState(foundArticle);
      }
    }
  }, [products, blogPosts]);

  // Handle Zarinpal Payment Verification Callback
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const authority = queryParams.get('Authority');
    const status = queryParams.get('Status');
    const orderId = queryParams.get('order_id');
    const verifyPayment = queryParams.get('payment_verify');

    if (verifyPayment && orderId) {
      if (status === 'OK' && authority) {
        showToast('در حال بررسی و تایید تراکنش بانکی زرین‌پال...', 'info');

        fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ authority, orderId })
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success || data.code === 101) {
              triggerCelebration();
              showToast('سفارش شما با موفقیت پرداخت و ثبت گردید!', 'success');
              clearCart();
              setIsTrackingModalOpen(true);
              refreshOrders();
            } else {
              showToast(data.message || 'خطا در تایید نهایی پرداخت بانک.', 'error');
            }
          })
          .catch((err) => {
            console.error('Verify error:', err);
            showToast('خطا در تایید تراکنش بانکی.', 'error');
          });
      } else {
        showToast('پرداخت در درگاه بانکی توسط کاربر لغو شد یا با خطا مواجه گردید.', 'error');
      }

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

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

  // ==========================================
  // REAL AUTHENTICATION & OTP
  // ==========================================

  const sendOtp = async (target: string, type: 'phone' | 'email' = 'phone') => {
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, type })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message, 'success');
        return { success: true, message: data.message, expiresIn: data.expiresIn || 120 };
      } else {
        showToast(data.error || 'خطا در ارسال کد تایید.', 'error');
        return { success: false, message: data.error || 'خطا' };
      }
    } catch (err) {
      showToast('خطا در برقراری ارتباط با سرور احراز هویت.', 'error');
      return { success: false, message: 'خطای سرور' };
    }
  };

  const verifyOtp = async (target: string, code: string, fullName?: string, city?: string, address?: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target, code, fullName, city, address })
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem(TOKEN_USER_KEY, data.token);
        setUser(data.user);
        showToast(`خوش آمدید، ${data.user.fullName}`, 'success');
        setIsAuthModalOpen(false);
        return true;
      } else {
        showToast(data.error || 'کد تایید وارد شده نادرست است.', 'error');
        return false;
      }
    } catch (err) {
      showToast('خطا در اعتبارسنجی کد تایید.', 'error');
      return false;
    }
  };

  const logoutUser = () => {
    localStorage.removeItem(TOKEN_USER_KEY);
    setUser(null);
    showToast('از حساب کاربری خارج شدید.', 'info');
  };

  const updateUserProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const token = localStorage.getItem(TOKEN_USER_KEY);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        setUser(data.user);
        showToast('اطلاعات حساب کاربری بروزرسانی شد.', 'success');
      }
    } catch {
      showToast('خطا در بروزرسانی حساب کاربری.', 'error');
    }
  };

  // ==========================================
  // REAL ADMIN AUTHENTICATION
  // ==========================================

  const adminLogin = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem(TOKEN_ADMIN_KEY, data.token);
        setIsAdminAuthenticated(true);
        showToast('ورود موفقیت‌آمیز به پنل مدیریت گل آریس', 'success');
        refreshOrders();
        refreshContactMessages();
        return true;
      } else {
        showToast(data.error || 'رمز عبور مدیریت نادرست است.', 'error');
        return false;
      }
    } catch {
      showToast('خطای سرور در احراز هویت مدیریت.', 'error');
      return false;
    }
  };

  const adminLogout = () => {
    localStorage.removeItem(TOKEN_ADMIN_KEY);
    setIsAdminAuthenticated(false);
    showToast('از پنل مدیریت خارج شدید.', 'info');
  };

  const changeAdminPassword = async (currentPass: string, newPass: string): Promise<boolean> => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ currentPassword: currentPass, newPassword: newPass })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message || 'رمز عبور مدیریت تغییر یافت.', 'success');
        return true;
      } else {
        showToast(data.error || 'خطا در تغییر رمز عبور.', 'error');
        return false;
      }
    } catch {
      showToast('خطا در تغییر رمز عبور.', 'error');
      return false;
    }
  };

  // ==========================================
  // ORDERS & SERVER PERSISTENCE
  // ==========================================

  const createOrder = async (orderData: {
    items: CartItem[];
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
    recipientCity: string;
    deliveryDate: string;
    deliveryTimeSlot: string;
    paymentMethod: 'shaparak' | 'card_to_card' | 'cod';
    notes?: string;
    sendPreDispatchPhoto?: boolean;
  }): Promise<Order | null> => {
    try {
      const userToken = localStorage.getItem(TOKEN_USER_KEY);
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (userToken) headers.Authorization = `Bearer ${userToken}`;

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(orderData)
      });
      const data = await res.json();
      if (res.ok && data.success && data.order) {
        setOrders((prev) => [data.order, ...prev]);
        return data.order;
      } else {
        showToast(data.error || 'خطا در ثبت سفارش روی سرور.', 'error');
        return null;
      }
    } catch (err) {
      console.error('Order creation error:', err);
      showToast('خطا در برقراری ارتباط با سرور ثبت سفارش.', 'error');
      return null;
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus, rrn?: string) => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify({ status, rrn })
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((ord) => (ord.id === orderId ? updated : ord)));
        showToast('وضعیت سفارش بروز شد.', 'success');
      }
    } catch {
      showToast('خطا در بروزرسانی وضعیت سفارش.', 'error');
    }
  };

  const updateOrder = async (orderId: string, updates: Partial<Order>) => {
    setOrders((prev) => prev.map((ord) => (ord.id === orderId ? { ...ord, ...updates } : ord)));
  };

  const savePreDispatchPhoto = async (orderId: string, photoUrl: string): Promise<boolean> => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      const res = await fetch(`/api/orders/${orderId}/photo`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(adminToken ? { Authorization: `Bearer ${adminToken}` } : {})
        },
        body: JSON.stringify({ photoUrl })
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((ord) => (ord.id === orderId ? updated : ord)));
        showToast('عکس محصول با موفقیت بارگذاری و برای مشتری ثبت گردید.', 'success');
        return true;
      } else {
        const err = await res.json();
        showToast(err.error || 'خطا در ثبت عکس در سرور', 'error');
        return false;
      }
    } catch {
      showToast('خطا در ارسال عکس به سرور.', 'error');
      return false;
    }
  };

  const approvePreDispatchPhoto = async (orderId: string, approved: boolean, feedback?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}/photo`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved, feedback })
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders((prev) => prev.map((ord) => (ord.id === orderId ? updated : ord)));
        showToast(approved ? 'گل‌آرایی سفارش شما تایید شد.' : 'پیام شما به گلفروشی ارسال شد.', 'success');
      }
    } catch {
      showToast('خطا در ثبت تایید عکس.', 'error');
    }
  };

  const findOrderByTracking = async (codeOrPhone: string): Promise<Order[]> => {
    try {
      const res = await fetch(`/api/orders?trackingCode=${encodeURIComponent(codeOrPhone.trim())}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        return data;
      }
    } catch {}
    return [];
  };

  // ==========================================
  // CONTACT & INBOX
  // ==========================================

  const addContactMessage = async (msgData: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msgData)
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setContactMessages((prev) => [data.data, ...prev]);
        showToast('پیام شما با موفقیت در سامانه گل آریس ثبت شد.', 'success');
      }
    } catch {
      showToast('خطا در ثبت پیام.', 'error');
    }
  };

  const markContactMessageRead = async (id: string) => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      await fetch(`/api/contact/${id}/read`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setContactMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg))
      );
    } catch {}
  };

  const deleteContactMessage = async (id: string) => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setContactMessages((prev) => prev.filter((msg) => msg.id !== id));
      showToast('پیام با موفقیت حذف شد.', 'info');
    } catch {
      showToast('خطا در حذف پیام.', 'error');
    }
  };

  // ==========================================
  // PRODUCTS & CONTENT MANAGEMENT
  // ==========================================

  const addProduct = async (product: Product) => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        const created = await res.json();
        setProducts((prev) => [created, ...prev]);
        showToast(`محصول «${product.name}» با موفقیت در سرور ثبت شد.`, 'success');
      }
    } catch {
      showToast('خطا در ثبت محصول در سرور.', 'error');
    }
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        showToast('اطلاعات محصول در سرور ذخیره شد.', 'success');
      }
    } catch {
      showToast('خطا در بروزرسانی محصول.', 'error');
    }
  };

  const deleteProduct = async (id: string) => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast('محصول با موفقیت از فروشگاه حذف شد.', 'info');
      }
    } catch {
      showToast('خطا در حذف محصول.', 'error');
    }
  };

  const updateSiteContent = async (newContent: SiteContent) => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(newContent)
      });
      if (res.ok) {
        setSiteContent(newContent);
        showToast('محتوای سایت با موفقیت در دیتابیس سرور ذخیره شد.', 'success');
      }
    } catch {
      showToast('خطا در ذخیره محتوای سایت.', 'error');
    }
  };

  const resetSiteContent = () => {
    setSiteContent(initialSiteContent);
    showToast('محتوا به حالت پیش‌فرض بازگردانی شد.', 'info');
  };

  const addBlogPost = async (post: BlogPost) => {
    const adminToken = localStorage.getItem(TOKEN_ADMIN_KEY);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`
        },
        body: JSON.stringify(post)
      });
      if (res.ok) {
        const created = await res.json();
        setBlogPosts((prev) => [created, ...prev]);
        showToast('مقاله جدید در پایگاه دانش گل آریس منتشر شد.', 'success');
      }
    } catch {
      showToast('خطا در ذخیره مقاله.', 'error');
    }
  };

  // ==========================================
  // CART OPERATIONS
  // ==========================================

  const addToCart = (
    product: Product,
    quantity = 1,
    giftCardMessage?: string,
    giftCardRecipient?: string
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.giftCardMessage === giftCardMessage
      );

      if (existingIndex > -1) {
        return prevCart.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            product,
            quantity,
            giftCardMessage,
            giftCardRecipient
          }
        ];
      }
    });

    showToast(`«${product.name}» به سبد خرید افزوده شد.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('محصول از سبد خرید حذف شد.', 'info');
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
    showToast('متن کارت پیام هدیه بروز شد.', 'success');
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
        updateProduct,
        deleteProduct,
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
        user,
        sendOtp,
        verifyOtp,
        logoutUser,
        updateUserProfile,
        isAuthModalOpen,
        setIsAuthModalOpen,
        orders,
        refreshOrders,
        createOrder,
        updateOrderStatus,
        updateOrder,
        savePreDispatchPhoto,
        approvePreDispatchPhoto,
        findOrderByTracking,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        dispatchedNotifications,
        sendNotification,
        isNotificationsDrawerOpen,
        setIsNotificationsDrawerOpen,
        contactMessages,
        refreshContactMessages,
        addContactMessage,
        markContactMessageRead,
        deleteContactMessage,
        isSitemapModalOpen,
        setIsSitemapModalOpen,
        isMobileAppModalOpen,
        setIsMobileAppModalOpen,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        changeAdminPassword
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
