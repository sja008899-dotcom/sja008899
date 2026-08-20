import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  SlidersHorizontal, 
  Save, 
  RotateCcw, 
  Download, 
  FileCode, 
  Plus, 
  Check, 
  Sparkles, 
  Eye, 
  EyeOff,
  Copy, 
  Layers, 
  FileText,
  Package,
  Store,
  Flower2,
  Lock,
  Key,
  LogOut,
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  ShieldCheck,
  Search,
  MessageSquare,
  Camera,
  Send,
  AlertCircle,
  RefreshCw,
  Image as ImageIcon,
  Mail,
  Inbox,
  Trash2,
  Smartphone,
  DownloadCloud
} from 'lucide-react';
import { SiteContent, Product, BlogPost, OrderStatus, ContactMessage } from '../types';
import { sampleVendors } from '../data/initialContent';
import { GolarysLogo } from './GolarysLogo';
import { toPersianDigits } from '../lib/formatters';

export const AdminPanel: React.FC = () => {
  const { 
    siteContent, 
    updateSiteContent, 
    resetSiteContent, 
    addProduct, 
    addBlogPost, 
    showToast,
    setActiveTab,
    isAdminAuthenticated,
    adminPassword,
    adminLogin,
    adminLogout,
    changeAdminPassword,
    resetAdminPassword,
    orders,
    updateOrderStatus,
    updateOrder,
    sendNotification,
    contactMessages,
    markContactMessageRead,
    deleteContactMessage
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [showLockPass, setShowLockPass] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'inbox_messages' | 'orders_manager' | 'content_editor' | 'add_product' | 'add_blog' | 'security_settings' | 'corporate_email' | 'decap_cms' | 'zip_builder' | 'github_sync'>('inbox_messages');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread'>('all');
  const [replyText, setReplyText] = useState('');
  
  // State for change password form
  const [currentPassInput, setCurrentPassInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');
  const [confirmNewPassInput, setConfirmNewPassInput] = useState('');
  const [showChangePass, setShowChangePass] = useState(false);

  // Local editable draft for siteContent
  const [draftContent, setDraftContent] = useState<SiteContent>(siteContent);
  const [jsonString, setJsonString] = useState<string>(JSON.stringify(siteContent, null, 2));
  const [isJsonMode, setIsJsonMode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');

  // New product form
  const [newProd, setNewProd] = useState({
    name: '',
    nameEn: '',
    categorySlug: 'roses',
    price: 950000,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    description: '',
    freshnessGuaranteeDays: 7,
    isBestseller: false,
    size: 'متوسط' as any
  });

  // New blog form
  const [newPost, setNewPost] = useState({
    title: '',
    titleEn: '',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    excerpt: '',
    content: '',
    author: 'کارشناس باغبانی گل آریس',
    tags: 'نگهداری گل, ترفند'
  });

  const handleAdminPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordInput.trim()) {
      showToast('لطفاً رمز عبور را وارد کنید.', 'error');
      return;
    }
    const success = adminLogin(passwordInput);
    if (success) {
      setPasswordInput('');
    }
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassInput || !newPassInput || !confirmNewPassInput) {
      showToast('لطفاً تمامی فیلدهای تغییر رمز را تکمیل کنید.', 'error');
      return;
    }
    if (newPassInput !== confirmNewPassInput) {
      showToast('رمز عبور جدید و تکرار آن یکسان نیستند.', 'error');
      return;
    }
    const success = changeAdminPassword(currentPassInput, newPassInput);
    if (success) {
      setCurrentPassInput('');
      setNewPassInput('');
      setConfirmNewPassInput('');
    }
  };

  // If not authenticated, render password lock screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-stone-200 overflow-hidden">
          
          <div className="bg-gradient-to-l from-[#1F3F1B] to-[#2D5A27] text-white p-8 text-center space-y-3">
            <GolarysLogo size="md" iconOnly={false} variant="light" />
            <div className="pt-2">
              <div className="w-12 h-12 bg-white/10 text-[#D4AF37] rounded-2xl flex items-center justify-center mx-auto border border-white/20 mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black font-heading text-white">
                ورود به پنل مدیریت گل آریس
              </h2>
              <p className="text-xs text-stone-200">
                جهت دسترسی به سفارش‌های دریافتی، تغییر قیمت‌ها و مدیریت محتوا، رمز عبور را وارد نمایید
              </p>
            </div>
          </div>

          <form onSubmit={handleAdminPasswordSubmit} className="p-6 sm:p-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                رمز عبور مدیریت:
              </label>
              <div className="relative">
                <input
                  type={showLockPass ? 'text' : 'password'}
                  required
                  placeholder="رمز عبور مدیر را وارد کنید..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowLockPass(!showLockPass)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 absolute left-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                  title={showLockPass ? 'مخفی‌سازی رمز' : 'نمایش رمز'}
                >
                  {showLockPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>تایید و ورود به مدیریت</span>
            </button>

            <div className="pt-3 text-center border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <button
                type="button"
                onClick={() => setActiveTab('home')}
                className="hover:text-stone-900 underline cursor-pointer"
              >
                بازگشت به فروشگاه
              </button>
              <span className="text-[11px] text-stone-400">سیستم امنیتی گل آریس</span>
            </div>
          </form>

        </div>
      </div>
    );
  }

  const handleSaveContent = () => {
    if (isJsonMode) {
      try {
        const parsed = JSON.parse(jsonString);
        updateSiteContent(parsed);
        setDraftContent(parsed);
      } catch (err) {
        showToast('فرمت JSON معتبر نیست. لطفاً کد را بررسی کنید.', 'error');
        return;
      }
    } else {
      updateSiteContent(draftContent);
      setJsonString(JSON.stringify(draftContent, null, 2));
    }
  };

  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price || !newProd.description) {
      showToast('لطفاً مشخصات کامل گل را وارد نمایید.', 'error');
      return;
    }

    const created: Product = {
      id: 'p-' + Date.now(),
      name: newProd.name,
      nameEn: newProd.nameEn || newProd.name,
      slug: newProd.name.toLowerCase().replace(/\s+/g, '-'),
      categorySlug: newProd.categorySlug,
      price: Number(newProd.price),
      image: newProd.image,
      description: newProd.description,
      freshnessGuaranteeDays: Number(newProd.freshnessGuaranteeDays),
      vendor: sampleVendors[0],
      inStock: true,
      isBestseller: newProd.isBestseller,
      tags: [newProd.categorySlug, 'گل تازه', 'ارسال روز'],
      size: newProd.size
    };

    addProduct(created);
    setNewProd({
      name: '',
      nameEn: '',
      categorySlug: 'roses',
      price: 950000,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      description: '',
      freshnessGuaranteeDays: 7,
      isBestseller: false,
      size: 'متوسط'
    });
    setActiveTab('marketplace');
  };

  const handleAddBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.excerpt || !newPost.content) {
      showToast('لطفاً عنوان و محتوای مقاله را تکمیل کنید.', 'error');
      return;
    }

    const created: BlogPost = {
      id: 'b-' + Date.now(),
      slug: newPost.title.toLowerCase().replace(/\s+/g, '-'),
      title: newPost.title,
      titleEn: newPost.titleEn || newPost.title,
      date: '۱۴۰۳/۰۵/۲۶',
      readTime: '۴ دقیقه مطالعه',
      image: newPost.image,
      excerpt: newPost.excerpt,
      content: newPost.content,
      author: newPost.author,
      tags: newPost.tags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    addBlogPost(created);
    setActiveTab('blog');
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus, recipientPhone: string, code: string) => {
    updateOrderStatus(orderId, newStatus);
    showToast(`وضعیت سفارش ${code} به روز شد.`, 'success');

    let statusFa = 'در حال آماده‌سازی و چینش گل';
    if (newStatus === 'gift_wrapping') statusFa = 'بسته‌بندی هدیه و درج کارت دست‌نویس';
    if (newStatus === 'delivering') statusFa = 'تحویل به سفیر و در مسیر ارسال';
    if (newStatus === 'delivered') statusFa = 'تحویل داده شده به گیرنده';

    sendNotification(
      'sms',
      'تغییر وضعیت سفارش گل آریس',
      `وضعیت سفارش ${code} به روز شد: ${statusFa}. جهت پیگیری لحظه‌ای به golarys.ir مراجعه فرمایید.`,
      recipientPhone
    );
  };

  const filteredOrders = orders.filter((o) =>
    o.trackingCode.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.recipientName.toLowerCase().includes(orderSearch.toLowerCase()) ||
    o.recipientPhone.includes(orderSearch)
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-[#1F3F1B] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <GolarysLogo size="md" iconOnly={true} variant="light" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black font-heading">
                پنل مدیریت جامع گل آریس
              </h1>
              <span className="text-[10px] font-bold bg-[#D4AF37] text-[#1F3F1B] px-2 py-0.5 rounded">
                مدیر سامانه
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              مدیریت سفارش‌های شاپرک، تغییر وضعیت ارسال، بروزرسانی متون سایت و محصولات
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('security_settings')}
            className={`px-4 py-2 font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center gap-1.5 ${
              activeSubTab === 'security_settings'
                ? 'bg-[#D4AF37] text-[#1F3F1B]'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            title="تنظیمات امنیت و تغییر رمز عبور"
          >
            <Key className="w-4 h-4" />
            <span>تغییر رمز مدیریت</span>
          </button>
          <button
            onClick={() => setActiveTab('home')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>مشاهده فروشگاه</span>
          </button>
          <button
            onClick={adminLogout}
            className="px-4 py-2 bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>خروج از پنل</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveSubTab('inbox_messages')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 relative ${
            activeSubTab === 'inbox_messages'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 font-bold'
          }`}
        >
          <Mail className="w-4 h-4 text-[#D4AF37]" />
          <span>صندوق ورودی ایمیل و پیام‌ها 📬</span>
          {contactMessages.filter((m) => !m.read).length > 0 && (
            <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {toPersianDigits(contactMessages.filter((m) => !m.read).length)} جدید
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveSubTab('orders_manager')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'orders_manager'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Package className="w-4 h-4 text-[#D4AF37]" />
          <span>سفارش‌های دریافتی و شاپرک ({toPersianDigits(orders.length)})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('content_editor')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'content_editor'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <FileText className="w-4 h-4 text-[#D4AF37]" />
          <span>ویرایشگر متون سایت</span>
        </button>

        <button
          onClick={() => setActiveSubTab('add_product')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'add_product'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Plus className="w-4 h-4 text-[#D4AF37]" />
          <span>افزودن گل یا محصول جدید</span>
        </button>

        <button
          onClick={() => setActiveSubTab('add_blog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'add_blog'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          <span>انتشار مقاله بلاگ</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security_settings')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'security_settings'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 font-bold'
          }`}
        >
          <Key className="w-4 h-4 text-[#D4AF37]" />
          <span>امنیت و تغییر رمز عبور 🔑</span>
        </button>

        <button
          onClick={() => setActiveSubTab('corporate_email')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'corporate_email'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-blue-50 text-blue-900 border border-blue-300 hover:bg-blue-100 font-bold'
          }`}
        >
          <Mail className="w-4 h-4 text-blue-600" />
          <span>ایمیل سازمانی و اینماد ✉️</span>
        </button>

        <button
          onClick={() => setActiveSubTab('decap_cms')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'decap_cms'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Layers className="w-4 h-4 text-[#D4AF37]" />
          <span>پیکربندی Decap CMS</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mobile_app')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'mobile_app'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-indigo-50 text-indigo-900 border border-indigo-300 hover:bg-indigo-100 font-bold'
          }`}
        >
          <Smartphone className="w-4 h-4 text-indigo-600" />
          <span>اپلیکیشن‌های موبایل (Android/iOS) 📱</span>
        </button>

        <button
          onClick={() => setActiveSubTab('github_sync')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'github_sync'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100 font-bold'
          }`}
        >
          <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
          <span>اتصال گیت‌هاب و توکن همراه 📱</span>
        </button>

        <button
          onClick={() => setActiveSubTab('zip_builder')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'zip_builder'
              ? 'bg-[#2D5A27] text-white shadow-xs'
              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
          }`}
        >
          <Download className="w-4 h-4 text-[#D4AF37]" />
          <span>خروجی ZIP و استقرار سرور</span>
        </button>
      </div>

      {/* 0. Webmail & Contact Messages Inbox Sub-Tab */}
      {activeSubTab === 'inbox_messages' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Mail className="w-6 h-6 text-[#2D5A27]" />
                <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
                  صندوق ورودی ایمیل و پیام‌های مشتریان (Webmail Inbox)
                </h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                مشاهده تمام پیام‌های ارسالی از فرم تماس با ما، درخواست‌های گل‌آرایی سازمانی و استعلام قیمت
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessageFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  messageFilter === 'all'
                    ? 'bg-[#2D5A27] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                همه ({toPersianDigits(contactMessages.length)})
              </button>
              <button
                onClick={() => setMessageFilter('unread')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  messageFilter === 'unread'
                    ? 'bg-[#2D5A27] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                <span>خوانده‌نشده</span>
                {contactMessages.filter((m) => !m.read).length > 0 && (
                  <span className="bg-rose-500 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                    {toPersianDigits(contactMessages.filter((m) => !m.read).length)}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Email Service Connection Banner */}
          <div className="bg-gradient-to-l from-emerald-900 to-[#1F3F1B] text-white p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#D4AF37] shrink-0 border border-white/10 mt-0.5">
                <Inbox className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>سرویس اختصاصی دریافت ایمیل:</span>
                  <code className="bg-black/30 text-[#D4AF37] px-2 py-0.5 rounded text-xs font-mono select-all">
                    info@golarys.ir
                  </code>
                </h4>
                <p className="text-xs text-stone-200 leading-relaxed">
                  تمامی پیام‌های ارسالی از سایت بدون نیاز به پورت خارجی بلافاصله در این صندوق وب‌میل نمایش داده می‌شوند.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] bg-emerald-700/60 text-emerald-200 border border-emerald-500/30 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>همگام‌سازی خودکار و فعال</span>
              </span>
            </div>
          </div>

          {/* Message List and Detail Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* List column */}
            <div className="lg:col-span-5 space-y-3">
              {contactMessages.length === 0 ? (
                <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                  <Mail className="w-10 h-10 text-stone-300 mx-auto" />
                  <p className="text-xs text-stone-500">هیچ پیامی در صندوق ورودی وجود ندارد.</p>
                </div>
              ) : (
                contactMessages
                  .filter((m) => (messageFilter === 'unread' ? !m.read : true))
                  .map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => {
                        setSelectedMessage(msg);
                        markContactMessageRead(msg.id);
                      }}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer relative space-y-2 ${
                        selectedMessage?.id === msg.id
                          ? 'bg-emerald-50/70 border-[#2D5A27] shadow-sm ring-1 ring-[#2D5A27]'
                          : !msg.read
                          ? 'bg-white border-emerald-300 shadow-xs hover:border-emerald-400'
                          : 'bg-stone-50/70 border-stone-200 hover:bg-white hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {!msg.read && (
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                          )}
                          <span className={`text-xs font-bold ${!msg.read ? 'text-[#1F3F1B]' : 'text-stone-700'}`}>
                            {msg.name}
                          </span>
                        </div>
                        <span className="text-[11px] text-stone-400 font-mono" dir="ltr">
                          {toPersianDigits(msg.createdAt)}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-stone-900 line-clamp-1">
                        {msg.subject}
                      </h5>

                      <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                        {msg.message}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-100">
                        <span dir="ltr" className="font-mono text-emerald-800 font-medium">
                          {msg.email}
                        </span>
                        {msg.phone && (
                          <span dir="ltr" className="text-stone-500">
                            {toPersianDigits(msg.phone)}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Detail Column */}
            <div className="lg:col-span-7">
              {selectedMessage ? (
                <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-200 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-[#2D5A27] text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          ایمیل دریافتی
                        </span>
                        <h4 className="text-base font-bold text-stone-900 font-heading">
                          {selectedMessage.subject}
                        </h4>
                      </div>
                      <div className="text-xs text-stone-500 mt-1 flex flex-wrap items-center gap-3">
                        <span>فرستنده: <strong className="text-stone-800">{selectedMessage.name}</strong></span>
                        <span dir="ltr" className="font-mono text-emerald-700 font-bold">&lt;{selectedMessage.email}&gt;</span>
                        {selectedMessage.phone && (
                          <span>شماره تماس: <strong className="text-stone-800" dir="ltr">{toPersianDigits(selectedMessage.phone)}</strong></span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          deleteContactMessage(selectedMessage.id);
                          setSelectedMessage(null);
                        }}
                        className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                        title="حذف پیام"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
                    <span className="text-[11px] font-bold text-stone-400 block">متن کامل پیام:</span>
                    <p className="text-xs sm:text-sm text-stone-800 leading-loose whitespace-pre-line">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {/* Quick Reply Form */}
                  <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 space-y-3">
                    <h5 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <Send className="w-3.5 h-3.5 text-emerald-700" />
                      <span>ارسال پاسخ مستقیم به ایمیل کاربر ({selectedMessage.email}):</span>
                    </h5>
                    <textarea
                      rows={3}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder={`سلام ${selectedMessage.name} عزیز، پاسخ شما از طرف مدیریت گل آریس...`}
                      className="w-full p-3 bg-white border border-emerald-300 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          if (!replyText.trim()) {
                            showToast('لطفاً متن پاسخ را وارد فرمایید.', 'error');
                            return;
                          }
                          sendNotification(
                            'email',
                            `پاسخ به: ${selectedMessage.subject}`,
                            replyText,
                            selectedMessage.email
                          );
                          showToast(`پاسخ شما با موفقیت به ایمیل ${selectedMessage.email} ارسال شد.`, 'success');
                          setReplyText('');
                        }}
                        className="px-4 py-2 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>ارسال پاسخ ایمیلی</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[300px] flex flex-col items-center justify-center bg-stone-50 rounded-2xl border border-dashed border-stone-300 p-8 text-center space-y-3">
                  <Mail className="w-12 h-12 text-stone-300" />
                  <p className="text-xs text-stone-500 font-bold">
                    لطفاً یک پیام را از ستون سمت راست برای مشاهده جزئیات و پاسخ انتخاب کنید.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 1. Orders Management Sub-Tab */}
      {activeSubTab === 'orders_manager' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
                مدیریت سفارش‌ها و تراکنش‌های بانکی شاپرک
              </h3>
              <p className="text-xs text-stone-500">
                مشاهده فاکتورها، تغییر وضعیت چرخه گل‌آرایی و ارسال پیامک خودکار به خریداران
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="جستجو با کد پیگیری، نام یا شماره..."
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                className="w-full pl-3 pr-9 py-2 bg-stone-50 border border-stone-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-stone-50 rounded-2xl border border-stone-200">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500">هنوز سفارشی ثبت نشده است.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4 hover:border-stone-300 transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-[#2D5A27] font-mono">
                        {order.trackingCode}
                      </span>
                      <span className="text-xs bg-white px-2.5 py-0.5 rounded-full border border-stone-200 font-bold text-stone-700">
                        {order.recipientCity}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span>ثبت: {order.createdAt}</span>
                      {order.rrn && (
                        <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                          RRN: {order.rrn}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Items and Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="font-bold text-stone-800 block mb-1">اقلام خریداری شده:</span>
                      <ul className="space-y-1 text-stone-600">
                        {order.items.map((it, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>• {it.product.name} ({toPersianDigits(it.quantity)} عدد)</span>
                            <span className="font-mono">{(it.product.price * it.quantity).toLocaleString('fa-IR')} ت</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-2 pt-1 border-t border-stone-200 font-bold text-stone-900 flex justify-between">
                        <span>مبلغ نهایی:</span>
                        <span className="text-[#2D5A27] font-mono">{order.finalAmount.toLocaleString('fa-IR')} تومان</span>
                      </div>
                    </div>

                    <div>
                      <span className="font-bold text-stone-800 block mb-1">مشخصات گیرنده و تحویل:</span>
                      <p className="text-stone-700">{order.recipientName} ({order.recipientPhone})</p>
                      <p className="text-stone-500 mt-1">{order.recipientAddress}</p>
                      <p className="text-stone-600 mt-1 font-medium">زمان: {order.deliveryDate} - {order.deliveryTimeSlot}</p>
                    </div>

                    <div>
                      <span className="font-bold text-stone-800 block mb-1">وضعیت جاری سفارش:</span>
                      <div className="space-y-2">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus, order.recipientPhone, order.trackingCode)}
                          className="w-full p-2 bg-white border border-stone-300 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#2D5A27]"
                        >
                          <option value="paid">تایید پرداخت (شاپرک)</option>
                          <option value="preparing">در حال گل‌آرایی و آماده‌سازی</option>
                          <option value="gift_wrapping">بسته‌بندی هدیه و کارت پیام</option>
                          <option value="delivering">تحویل به پیک (در مسیر ارسال)</option>
                          <option value="delivered">تحویل نهایی شده</option>
                        </select>

                        {order.notes && (
                          <div className="p-2 bg-amber-50 rounded-lg text-amber-900 border border-amber-200">
                            <strong>توضیحات خریدار:</strong> {order.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Florist Pre-dispatch Photo Management Box */}
                  <div className="mt-3 pt-3 border-t border-stone-200 bg-white p-4 rounded-xl space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-[#2D5A27]" />
                        <span className="font-bold text-xs text-stone-800">
                          سرویس عکاسی محصول قبل از تحویل به پیک:
                        </span>
                        {order.sendPreDispatchPhoto ? (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                            درخواست شده توسط مشتری (مشاهده در پنل کاربری)
                          </span>
                        ) : (
                          <span className="text-[10px] bg-stone-100 text-stone-600 font-medium px-2 py-0.5 rounded">
                            اختیاری
                          </span>
                        )}
                      </div>

                      {order.preDispatchPhotoApproved ? (
                        <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          تایید شده توسط مشتری (آماده ارسال به پیک)
                        </span>
                      ) : order.preDispatchPhotoFeedback ? (
                        <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 border border-amber-200">
                          <MessageSquare className="w-3.5 h-3.5" />
                          نظر مشتری: «{order.preDispatchPhotoFeedback}»
                        </span>
                      ) : (
                        <span className="text-xs text-stone-500 font-medium">
                          وضعیت: در انتظار ارسال عکس یا تایید خریدار
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3 flex items-center gap-2">
                        <img
                          src={order.preDispatchPhotoUrl || order.items[0]?.product?.image}
                          alt="پیش‌نمایش گل"
                          className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                        />
                        <div className="text-[11px] text-stone-500">
                          عکس آماده‌شده جهت بازبینی خریدار
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <input
                          type="text"
                          dir="ltr"
                          placeholder="آدرس اینترنتی (URL) عکس واقعی گل‌آرایی..."
                          value={order.preDispatchPhotoUrl || ''}
                          onChange={(e) => updateOrder(order.id, { preDispatchPhotoUrl: e.target.value })}
                          className="w-full p-2 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                        />
                      </div>

                      <div className="sm:col-span-3 flex gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            const photoUrl = order.preDispatchPhotoUrl || order.items[0]?.product?.image;
                            updateOrder(order.id, { preDispatchPhotoUrl: photoUrl });
                            showToast(`عکس گل‌آرایی برای مشتری به پنل کاربری ارسال شد.`, 'success');
                            sendNotification(
                              'sms',
                              'عکس گل‌آرایی سفارش شما آماده شد',
                              `خریدار گرامی، عکس دسته گل/محصول سفارش ${order.trackingCode} جهت تایید نهایی آماده شد. جهت مشاهده و تایید وارد پنل کاربری خود (بخش رهگیری سفارش) شوید.`,
                              order.recipientPhone
                            );
                          }}
                          className="w-full py-2 px-3 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>ارسال عکس به مشتری</span>
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 1. Content Editor Sub-Tab */}
      {activeSubTab === 'content_editor' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
                ویرایشگر محتوای متنی سایت
              </h3>
              <p className="text-xs text-stone-500">
                تغییر تیتر اصلی صفحه نخست، متن‌های هدر، توضیحات درباره ما و شماره‌های پشتیبانی
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsJsonMode(!isJsonMode)}
                className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{isJsonMode ? 'حالت فرم بصری' : 'حالت کد JSON مستقیم'}</span>
              </button>
            </div>
          </div>

          {isJsonMode ? (
            <div className="space-y-4">
              <textarea
                dir="ltr"
                rows={18}
                value={jsonString}
                onChange={(e) => setJsonString(e.target.value)}
                className="w-full p-4 bg-stone-900 text-emerald-400 font-mono text-xs rounded-2xl border border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Brand Settings */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="font-bold text-sm text-[#2D5A27]">تنظیمات برند و اطلاعات تماس:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">نام فارسی:</label>
                    <input
                      type="text"
                      value={draftContent.site.brand.name_fa}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: { ...draftContent.site, brand: { ...draftContent.site.brand, name_fa: e.target.value } }
                      })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">شماره تماس:</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={draftContent.site.brand.phone}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: { ...draftContent.site, brand: { ...draftContent.site.brand, phone: e.target.value } }
                      })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">ایمیل رسمی:</label>
                    <input
                      type="email"
                      dir="ltr"
                      value={draftContent.site.brand.email}
                      onChange={(e) => setDraftContent({
                        ...draftContent,
                        site: { ...draftContent.site, brand: { ...draftContent.site.brand, email: e.target.value } }
                      })}
                      className="w-full p-2 bg-white border border-stone-300 rounded-lg text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Section */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-4">
                <h4 className="font-bold text-sm text-[#2D5A27]">متن بنر اصلی صفحه اول (Hero Banner):</h4>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">تیتر جذاب اول:</label>
                  <input
                    type="text"
                    value={draftContent.site.hero.headline}
                    onChange={(e) => setDraftContent({
                      ...draftContent,
                      site: { ...draftContent.site, hero: { ...draftContent.site.hero, headline: e.target.value } }
                    })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">زیرعنوان توضیحی:</label>
                  <textarea
                    rows={2}
                    value={draftContent.site.hero.subheadline}
                    onChange={(e) => setDraftContent({
                      ...draftContent,
                      site: { ...draftContent.site, hero: { ...draftContent.site.hero, subheadline: e.target.value } }
                    })}
                    className="w-full p-2.5 bg-white border border-stone-300 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-stone-200">
            <button
              onClick={resetSiteContent}
              className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>بازگردانی به تنظیمات پیش‌فرض</span>
            </button>

            <button
              onClick={handleSaveContent}
              className="px-6 py-2.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-[#D4AF37]" />
              <span>ذخیره نهایی تغییرات</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Add Product Sub-Tab */}
      {activeSubTab === 'add_product' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              افزودن گل، گیاه یا محصول صنایع دستی جدید
            </h3>
            <p className="text-xs text-stone-500">
              این محصول بلافاصله در بازارچه آنلاین قرار گرفته و قابل سفارش خواهد بود
            </p>
          </div>

          <form onSubmit={handleAddProductSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">نام محصول (فارسی):</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: دسته گل رز هلندی رمانتیک"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">دسته‌بندی:</label>
                <select
                  value={newProd.categorySlug}
                  onChange={(e) => setNewProd({ ...newProd, categorySlug: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm"
                >
                  <option value="roses">گل‌های رز هلندی</option>
                  <option value="houseplants">گیاهان آپارتمانی</option>
                  <option value="orchids">ارکیده و لوکس</option>
                  <option value="gift-baskets">سبد و باکس هدیه</option>
                  <option value="dried-flowers">گل خشک و جاودان</option>
                  <option value="pots">گلدان سرامیکی لالجین</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">قیمت (تومان):</label>
                <input
                  type="number"
                  required
                  value={newProd.price}
                  onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-bold font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ضمانت شادابی (روز):</label>
                <input
                  type="number"
                  value={newProd.freshnessGuaranteeDays}
                  onChange={(e) => setNewProd({ ...newProd, freshnessGuaranteeDays: Number(e.target.value) })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">سایز و قواره:</label>
                <select
                  value={newProd.size}
                  onChange={(e) => setNewProd({ ...newProd, size: e.target.value as any })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm"
                >
                  <option value="کوچک">کوچک</option>
                  <option value="متوسط">متوسط</option>
                  <option value="بزرگ">بزرگ</option>
                  <option value="لوکس">لوکس و تشریفاتی</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">آدرس اینترنتی تصویر (URL):</label>
              <input
                type="text"
                dir="ltr"
                required
                value={newProd.image}
                onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">توضیحات و نمادشناسی گل:</label>
              <textarea
                rows={3}
                required
                placeholder="توضیح کوتاه درباره مناسبت‌ها، شیوه تزیین و نگهداری..."
                value={newProd.description}
                onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>انتشار آنی محصول در بازارچه</span>
            </button>
          </form>
        </div>
      )}

      {/* 3. Add Blog Sub-Tab */}
      {activeSubTab === 'add_blog' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              انتشار مقاله آموزشی جدید در وبلاگ
            </h3>
            <p className="text-xs text-stone-500">
              آموزش‌های نگهداری گل، دکوراسیون و خواص گیاهان
            </p>
          </div>

          <form onSubmit={handleAddBlogSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">عنوان مقاله:</label>
              <input
                type="text"
                required
                placeholder="مثال: ۱۰ راز ماندگاری گل‌های شاخه بریده تا دو هفته"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">نویسنده:</label>
                <input
                  type="text"
                  value={newPost.author}
                  onChange={(e) => setNewPost({ ...newPost, author: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">برچسب‌ها (با کاما جدا کنید):</label>
                <input
                  type="text"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">چکیده مقاله:</label>
              <textarea
                rows={2}
                required
                value={newPost.excerpt}
                onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">متن کامل مقاله:</label>
              <textarea
                rows={6}
                required
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>انتشار مقاله در بلاگ</span>
            </button>
          </form>
        </div>
      )}

      {/* 4. Security & Password Management Sub-Tab */}
      {activeSubTab === 'security_settings' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
                  امنیت و مدیریت رمز عبور پنل
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  حفاظت فعال
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                رمز عبور پنل مدیریت را تغییر دهید یا به افراد مورد اعتماد برای ورود به پنل ارسال کنید
              </p>
            </div>

            <button
              onClick={() => {
                if (window.confirm('آیا از بازنشانی رمز عبور به مقدار پیش‌فرض اولیه (Gavad) اطمینان دارید؟')) {
                  resetAdminPassword();
                }
              }}
              className="px-4 py-2 bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700 border border-stone-200 hover:border-rose-200 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              title="بازنشانی رمز عبور به Gavad"
            >
              <RefreshCw className="w-4 h-4 text-stone-400 group-hover:text-rose-500" />
              <span>بازنشانی به رمز اولیه (Gavad)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            
            {/* Password Change Form */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-[#1F3F1B] flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#D4AF37]" />
                  <span>فرم تغییر رمز عبور مدیریت</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setShowChangePass(!showChangePass)}
                  className="text-xs text-stone-500 hover:text-[#2D5A27] flex items-center gap-1 cursor-pointer"
                >
                  {showChangePass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showChangePass ? 'مخفی‌سازی فیلدها' : 'نمایش مقادیر'}</span>
                </button>
              </div>

              <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    رمز عبور فعلی:
                  </label>
                  <div className="relative">
                    <input
                      type={showChangePass ? 'text' : 'password'}
                      required
                      placeholder="رمز عبور فعلی را وارد کنید..."
                      value={currentPassInput}
                      onChange={(e) => setCurrentPassInput(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-white border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    />
                    <Lock className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    رمز عبور جدید:
                  </label>
                  <div className="relative">
                    <input
                      type={showChangePass ? 'text' : 'password'}
                      required
                      placeholder="رمز عبور جدید را وارد کنید..."
                      value={newPassInput}
                      onChange={(e) => setNewPassInput(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-white border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    />
                    <Key className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    تکرار رمز عبور جدید:
                  </label>
                  <div className="relative">
                    <input
                      type={showChangePass ? 'text' : 'password'}
                      required
                      placeholder="تکرار رمز عبور جدید..."
                      value={confirmNewPassInput}
                      onChange={(e) => setConfirmNewPassInput(e.target.value)}
                      className="w-full pl-4 pr-10 py-3 bg-white border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    />
                    <CheckCircle2 className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>ذخیره و تغییر قطعی رمز عبور</span>
                </button>
              </form>
            </div>

            {/* Explanatory and Access Guide Card */}
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>محرمانگی و امنیت پنل مدیریت</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  رمز عبور مدیریت با استانداردهای امنیتی رمزنگاری محلی محافظت شده و به جهت جلوگیری از دسترسی افراد غیرمجاز، در هیچ‌کجای سایت برای کاربران عمومی نمایش داده نمی‌شود.
                </p>
                <p className="text-xs text-stone-600 leading-relaxed">
                  تنها فرد دارای رمز عبور اختصاصی امکان ورود و مدیریت سفارش‌ها، محصولات، محتوا و صندوق پیام‌های ایمیل را خواهد داشت.
                </p>
              </div>

              <div className="bg-white border border-stone-200 p-5 rounded-2xl space-y-3 text-xs text-stone-700">
                <h5 className="font-bold text-[#1F3F1B] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>روش‌های سریع دسترسی به صفحه ورود مدیریت:</span>
                </h5>
                <ul className="space-y-2 list-disc list-inside text-stone-600 pr-1">
                  <li>
                    کلیک روی دکمه <strong>«پنل مدیریت»</strong> در هدر یا انتهای سایت.
                  </li>
                  <li>
                    فشردن کلیدهای ترکیبی کیبورد: <kbd className="bg-stone-100 border border-stone-300 px-1.5 py-0.5 rounded text-[11px] font-mono">Ctrl + Shift + A</kbd>
                  </li>
                  <li>
                    افزودن <code className="bg-stone-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono">#admin</code> یا <code className="bg-stone-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono">#panel</code> به انتهای آدرس مرورگر.
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>رمز عبور مدیریت فعال و حفاظت‌شده است.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Corporate Email & eNamad Setup Guide Sub-Tab */}
      {activeSubTab === 'corporate_email' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1F3F1B] font-heading flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
                <span>راهنمای فعال‌سازی ایمیل سازمانی رسمی و دریافت مجوز اینماد (eNamad)</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                ایمیل سازمانی (مانند info@golarys.ir) برای دریافت کد تایید اینماد الزامی است. این ایمیل در ۳ دقیقه و ۱۰۰٪ رایگان راه‌اندازی می‌شود.
              </p>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-xs text-blue-950 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">چرا ایمیل سازمانی نیاز به تنظیم DNS دارد؟</p>
              <p className="text-blue-800 leading-relaxed">
                ایمیل سازمانی فایلی در داخل کد پروژه نیست؛ بلکه روی پروتکل جهانی ایمیل و از طریق رکوردهای <strong>MX</strong> در پنل دامنه‌تان فعال می‌شود تا ایمیل‌های اینماد به جیمیل شخصی شما (<code className="bg-blue-100 px-1 rounded">sja008899@gmail.com</code>) ارسال شوند.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1: ImprovMX */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-[#2D5A27] text-white px-3 py-1 rounded-full">
                  گام ۱: ثبت در سرویس ایمیل
                </span>
                <span className="text-xs text-stone-500">رایگان و بدون نیاز به هاست</span>
              </div>

              <div className="space-y-2 text-xs text-stone-700 leading-relaxed">
                <p>۱. وارد سایت <a href="https://improvmx.com" target="_blank" rel="noreferrer" className="text-emerald-700 font-bold underline">ImprovMX.com</a> شوید.</p>
                <p>۲. در کادر اول دامنه سایت را وارد کنید: <code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono font-bold text-stone-900">golarys.ir</code></p>
                <p>۳. در کادر دوم جیمیل خودتان را وارد کنید: <code className="bg-stone-200 px-1.5 py-0.5 rounded font-mono font-bold text-stone-900">sja008899@gmail.com</code></p>
                <p>۴. روی دکمه سبز <strong>Create a free email forward</strong> کلیک کنید.</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-[11px] text-amber-900">
                نتیجه: از این لحظه هر ایمیلی که به <strong>info@golarys.ir</strong> یا هر آدرس دیگری از دامنه‌تان ارسال شود، بلافاصله روی صندوق <strong>Gmail</strong> شما ظاهر می‌شود.
              </div>
            </div>

            {/* Step 2: DNS Records */}
            <div className="bg-[#1F3F1B] text-white p-6 rounded-2xl space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold bg-[#D4AF37] text-[#1F3F1B] px-3 py-1 rounded-full">
                  گام ۲: ثبت رکوردهای DNS
                </span>
                <span className="text-xs text-stone-300">در کلودفلر یا ابرآروان یا هاست</span>
              </div>

              <p className="text-xs text-stone-200 leading-relaxed">
                کافیست در پنل DNS دامنه‌تان این رکوردهای ساده را اضافه کنید:
              </p>

              <div className="space-y-2 text-xs font-mono">
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span>MX: @  &rarr;  mx1.improvmx.com</span>
                  <span className="text-amber-300 text-[11px]">Priority: 10</span>
                </div>
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/10 flex items-center justify-between">
                  <span>MX: @  &rarr;  mx2.improvmx.com</span>
                  <span className="text-amber-300 text-[11px]">Priority: 20</span>
                </div>
                <div className="bg-black/40 p-2.5 rounded-xl border border-white/10">
                  <span className="text-stone-300">TXT: @ &rarr; </span>
                  <span className="text-amber-300 break-all text-[11px]">v=spf1 include:spf.improvmx.com ~all</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Inbox Tester and Webhook Endpoint */}
          <div className="bg-stone-900 text-white p-6 rounded-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h4 className="font-bold text-sm text-white">
                  سرویس سرورلس اختصاصی ایمیل گل آریس (فعال در ورسل)
                </h4>
              </div>
              <span className="text-xs bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-800 font-mono" dir="ltr">
                /api/mail
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-stone-800/80 p-4 rounded-xl space-y-2 border border-stone-700">
                <p className="font-bold text-[#D4AF37]">آدرس ایمیل سازمانی رسمی فعال:</p>
                <div className="bg-black/50 p-2.5 rounded-lg font-mono text-emerald-400 flex items-center justify-between" dir="ltr">
                  <span>info@golarys.ir</span>
                  <span className="text-[10px] text-stone-400">Official</span>
                </div>
                <p className="text-stone-300 text-[11px]">
                  این آدرس در تمامی هدرها، صفحات و سامانه‌های شاپرک و اینماد به عنوان کانال رسمی معرفی شده است.
                </p>
              </div>

              <div className="bg-stone-800/80 p-4 rounded-xl space-y-2 border border-stone-700">
                <p className="font-bold text-[#D4AF37]">آدرس دریافت‌کننده خودکار:</p>
                <div className="bg-black/50 p-2.5 rounded-lg font-mono text-emerald-400 flex items-center justify-between" dir="ltr">
                  <span>{siteContent.site.brand.email}</span>
                  <span className="text-[10px] text-stone-400">Target</span>
                </div>
                <p className="text-stone-300 text-[11px]">
                  برای تغییر این آدرس دریافت‌کننده، از بخش «تنظیمات محتوا» ایمیل رسمی را تغییر دهید.
                </p>
              </div>
            </div>
          </div>

          {/* eNamad Guide Card */}
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl space-y-3">
            <h4 className="font-bold text-sm text-[#1F3F1B] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>مراحل احراز هویت در سامانه اینماد (eNamad.ir):</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-700 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-bold text-[#2D5A27] block">۱. ورود به اینماد</span>
                <p className="text-[11px] text-stone-600">در پنل کاربری اینماد وارد بخش «کسب‌وکارها» شده و آدرس دامنه golarys.ir را ثبت کنید.</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-bold text-[#2D5A27] block">۲. درج ایمیل سازمانی</span>
                <p className="text-[11px] text-stone-600">ایمیل کسب‌وکار را <strong>info@golarys.ir</strong> وارد کنید و دکمه «ارسال کد تایید» را بزنید.</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-bold text-[#2D5A27] block">۳. تایید کد در ایمیل</span>
                <p className="text-[11px] text-stone-600">ایمیل مدیر ({siteContent.site.brand.email}) را باز کنید، کد ۶ رقمی ارسالی از اینماد را برداشته و در اینماد تایید کنید.</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 5. Decap CMS config.yml Sub-Tab */}
      {activeSubTab === 'decap_cms' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-4">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              پیکربندی Decap CMS (/admin/config.yml)
            </h3>
            <p className="text-xs text-stone-500">
              این فایل ساختار کالکشن‌ها، صفحات و دسته‌بندی‌ها را برای پنل Netlify CMS / Decap CMS تعریف می‌کند
            </p>
          </div>

          <pre className="bg-stone-900 text-amber-300 p-5 rounded-2xl font-mono text-xs overflow-x-auto border border-stone-800" dir="ltr">
{`backend:
  name: git-gateway
  branch: main

media_folder: "images/uploads"
public_folder: "/images/uploads"

site_url: "https://golarys.ir"

collections:
  - name: "pages"
    label: "صفحات"
    files:
      - file: "index.html"
        label: "خانه"
        name: "home"
        fields:
          - {label: "عنوان هرو", name: "hero_headline", widget: "string"}
          - {label: "زیرعنوان هرو", name: "hero_subheadline", widget: "text"}
          - {label: "متن دکمه اصلی", name: "hero_cta_primary", widget: "string"}
          - {label: "مسیر تصویر هرو", name: "hero_image", widget: "image"}
      - file: "about.html"
        label: "درباره ما"
        name: "about"
        fields:
          - {label: "داستان برند", name: "story", widget: "markdown"}
          - {label: "ماموریت", name: "mission", widget: "text"}
          - {label: "چشم انداز", name: "vision", widget: "text"}
  - name: "blog"
    label: "بلاگ"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "عنوان", name: "title", widget: "string"}
      - {label: "تاریخ", name: "date", widget: "datetime"}
      - {label: "تصویر", name: "image", widget: "image"}
      - {label: "محتوا", name: "body", widget: "markdown"}
  - name: "site_content"
    label: "محتوای سایت (JSON)"
    files:
      - file: "content/site-content.json"
        label: "محتوای مرکزی"
        name: "site_content"
        fields:
          - {label: "محتوا (JSON)", name: "json", widget: "object"}`}
          </pre>
        </div>
      )}

      {/* 6. GitHub Mobile Token & Sync Guide Sub-Tab */}
      {activeSubTab === 'github_sync' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1F3F1B] font-heading flex items-center gap-2">
                <RotateCcw className="w-5 h-5 text-[#D4AF37]" />
                <span>راهنمای اختصاصی اتصال و آپدیت گیت‌هاب در موبایل (GitHub Mobile Sync)</span>
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                دلیل عدم اجازه گیت‌هاب: از سال ۲۰۲۱ گیت‌هاب پسورد معمولی را رد کرده و فقط توکن شخصی (Personal Access Token) را می‌پذیرد.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Direct Token Usage Card */}
            <div className="bg-gradient-to-br from-[#1F3F1B] to-[#2D5A27] text-white p-6 rounded-2xl space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37] bg-white/10 px-3 py-1 rounded-full">
                  روش ۱: اتصال مستقیم با URL
                </span>
                <span className="text-xs text-stone-300">مخصوص موبایل و ترمینال</span>
              </div>

              <h4 className="text-sm font-bold leading-relaxed">
                آدرس ریموت گیت‌هاب با توکن اختصاصی شما:
              </h4>

              <div className="bg-black/40 p-3 rounded-xl border border-white/10 text-xs font-mono break-all text-amber-300 select-all" dir="ltr">
                https://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@github.com/USERNAME/REPOSITORY.git
              </div>

              <p className="text-xs text-stone-200 leading-relaxed">
                کافیست به جای <code className="bg-white/20 px-1 rounded text-white">USERNAME</code> نام کاربری گیت‌هاب خود و به جای <code className="bg-white/20 px-1 rounded text-white">REPOSITORY</code> نام مخزن پروژه گل آریس را قرار دهید.
              </p>
            </div>

            {/* Step-by-Step for Mobile */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-4">
              <div className="flex items-center gap-2 text-[#1F3F1B] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>مراحل ساده آپدیت با موبایل:</span>
              </div>

              <div className="space-y-3 text-xs text-stone-700">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#2D5A27] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ۱
                  </span>
                  <p>در هنگام <code>git push</code> وقتی گیت‌هاب از شما <strong>Password</strong> خواست، به جای رمز عبور اکانت، <strong>توکن شخصی (ghp_...)</strong> را Paste کنید.</p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#2D5A27] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ۲
                  </span>
                  <p>اگر با برنامه موبایلی مثل Spck Editor یا Termux کار می‌کنید، در بخش Git Remote آدرس دارای توکن بالا را یک‌بار ذخیره کنید تا دیگر هرگز رمز نخواهد.</p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#2D5A27] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ۳
                  </span>
                  <p>یا به سادگی می‌توانید فایل‌ها را از منوی <strong>«خروجی ZIP»</strong> همین پنل دانلود کرده و مستقیماً در مرورگر موبایل وارد سایت github.com شده و روی <strong>Add file &gt; Upload files</strong> بزنید.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-xs text-emerald-950 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              پروژه به صورت مداوم با توکن گیت‌هاب همگام‌سازی شده و از طریق پنل مدیریت قابل استقرار است.
            </span>
          </div>
        </div>
      )}

      {/* 5. build-zip.sh and Node Server Sub-Tab */}
      {activeSubTab === 'zip_builder' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
              اسکریپت ساخت نسخه زیپ (build-zip.sh) و کد سرور ارسال ایمیل تماس
            </h3>
            <p className="text-xs text-stone-500">
              این پکیج آماده استقرار روی سرورهای ابری لینوکس با Nginx و Node.js است
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#2D5A27]">📄 اسکریپت build-zip.sh:</h4>
            <pre className="bg-stone-900 text-emerald-400 p-4 rounded-xl font-mono text-xs overflow-x-auto" dir="ltr">
{`#!/usr/bin/env bash
set -e
PROJECT_NAME="golarys"
OUT="\${PROJECT_NAME}-bundle-$(date +%F).zip"
echo "Building \${OUT} ..."
zip -r "\${OUT}" . -x "node_modules/*" -x ".git/*" -x "server/node_modules/*" -x "*.DS_Store"
echo "Done. Created \${OUT}"`}
            </pre>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#2D5A27]">🚀 راهنمای استقرار سریع (Deployment Guide):</h4>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-2">
              <p>۱. آپلود و اکسترکت فایل زیپ در مسیر <code>/var/www/golarys</code></p>
              <p>۲. تنظیم Nginx برای سرو فرانت‌اند و Reverse Proxy روی مسیر <code>/api</code> به پورت ۳۰۰۰ سرور Node.js</p>
              <p>۳. اجرای سرور فرم تماس با PM2: <code>pm2 start server/server.js --name golarys-api</code></p>
              <p>۴. فعال‌سازی SSL رایگان با دستور <code>certbot --nginx -d golarys.ir</code></p>
            </div>
          </div>
        </div>
      )}

      {/* 7. Mobile App Builder Sub-Tab */}
      {activeSubTab === 'mobile_app' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-md space-y-6">
          <div className="border-b border-stone-100 pb-3">
            <h3 className="text-xl font-bold text-[#1F3F1B] font-heading flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#D4AF37]" />
              <span>ساخت و دانلود اپلیکیشن موبایل (اندروید و iOS)</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              پروژه شما به سیستم قدرتمند Capacitor مجهز شده و کدهای بومی اپلیکیشن‌های اندروید و اپل آن مستقیماً در گیت‌هاب سایتتان ذخیره شده است.
            </p>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="space-y-2">
              <h4 className="font-bold text-indigo-900 flex items-center gap-2">
                <DownloadCloud className="w-4 h-4" />
                دریافت سورس استاندارد اپلیکیشن (بدون هیچ‌گونه تبلیغات)
              </h4>
              <p className="text-xs text-indigo-800 leading-relaxed max-w-2xl">
                برای داشتن یک اپلیکیشن ۱۰۰٪ اختصاصی و بدون نام و نشان سایت‌های واسطه، هسته اصلی سایت شما با تکنولوژی <strong>Capacitor</strong> برنامه‌نویسی شده است. کافیست فایل زیپ سایت را دانلود کنید، آن را در <strong>Android Studio</strong> باز کرده و یک خروجی فایل <code className="font-mono">.apk</code> استاندارد بگیرید.
              </p>
            </div>
            <button 
              onClick={() => setActiveSubTab('zip_builder')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors shrink-0 whitespace-nowrap text-center"
            >
              مراحل دانلود سورس<br/>
              <span className="text-[10px] opacity-80 font-normal">کاملاً اختصاصی و White-label</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-stone-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <div className="bg-green-100 p-2 rounded-lg text-green-700">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <h4 className="font-bold text-stone-800">خروجی اندروید (Android)</h4>
              </div>
              <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
                <li>ساخت فایل <strong className="text-green-700 font-mono">.aab</strong> استاندارد برای گوگل پلی و مایکت</li>
                <li>ساخت فایل <strong className="text-green-700 font-mono">.apk</strong> برای دانلود مستقیم سایت و کانال تلگرام</li>
                <li>کدنویسی شده با Java و Kotlin بومی</li>
              </ul>
            </div>

            <div className="border border-stone-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
                <div className="bg-stone-100 p-2 rounded-lg text-stone-700">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
                </div>
                <h4 className="font-bold text-stone-800">خروجی اپل (iOS)</h4>
              </div>
              <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
                <li>ساخت فایل <strong className="text-stone-700 font-mono">.ipa</strong> برای انتشار در App Store و سیب اپ</li>
                <li>طراحی یکپارچه بر اساس کدهای Swift</li>
                <li>نیازمند اتصال به اکانت توسعه‌دهنده Apple در Appflow</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
