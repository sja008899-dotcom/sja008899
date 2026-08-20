import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Store, 
  Sparkles, 
  SlidersHorizontal, 
  ShieldCheck,
  Phone,
  Heart,
  Flower2,
  User as UserIcon,
  Truck,
  Bell,
  CheckCircle2,
  LogOut
} from 'lucide-react';
import { ActiveTab } from '../types';
import { toPersianDigits } from '../lib/formatters';
import { GolarysLogo } from './GolarysLogo';

export const Header: React.FC = () => {
  const { 
    siteContent, 
    activeTab, 
    setActiveTab, 
    cart, 
    setIsCartOpen,
    searchQuery,
    setSearchQuery,
    language,
    setLanguage,
    user,
    setIsAuthModalOpen,
    setIsTrackingModalOpen,
    setIsNotificationsDrawerOpen,
    dispatchedNotifications,
    isAdminAuthenticated
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems: { id: ActiveTab; labelFa: string; labelEn: string }[] = [
    { id: 'home', labelFa: 'خانه', labelEn: 'Home' },
    { id: 'marketplace', labelFa: 'بازارچه گل و گیاه', labelEn: 'Marketplace' },
    { id: 'handicrafts', labelFa: 'صنایع دستی و گلدان', labelEn: 'Handicrafts' },
    { id: 'sellers', labelFa: 'برای فروشندگان', labelEn: 'For Sellers' },
    { id: 'about', labelFa: 'درباره ما', labelEn: 'About Us' },
    { id: 'blog', labelFa: 'مجله گل و گیاه', labelEn: 'Flower Magazine' },
    { id: 'contact', labelFa: 'تماس با ما', labelEn: 'Contact' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all">
      {/* Top micro announcement bar */}
      <div className="bg-[#1F3F1B] text-[#FAF0E6] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#D4AF37] text-[#1F3F1B] font-bold px-2 py-0.5 rounded-full text-[11px]">
              <Sparkles className="w-3 h-3" />
              تخفیف بهاره
            </span>
            <span className="hidden sm:inline text-stone-200">
              ارسال فوری ۲ ساعته در تهران | ۵٪ تخفیف اولین خرید با کد: <strong className="text-[#D4AF37]">GOLARYS5</strong>
            </span>
            <span className="sm:hidden text-stone-200">ارسال فوری گل | تخفیف اولین خرید</span>
          </div>

          <div className="flex items-center gap-3 text-stone-300">
            {/* Quick Order Tracking */}
            <button
              onClick={() => setIsTrackingModalOpen(true)}
              className="hover:text-white flex items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer"
            >
              <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>پیگیری سریع سفارش</span>
            </button>

            <span className="text-stone-500">|</span>

            <a 
              href={`tel:${siteContent.site.brand.phone}`}
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#D4AF37]" />
              <span className="persian-num">{toPersianDigits(siteContent.site.brand.phone)}</span>
            </a>

            <span className="text-stone-500">|</span>

            <button
              onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')}
              className="hover:text-white text-[11px] font-medium tracking-wide flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>{language === 'fa' ? 'English (EN)' : 'فارسی (FA)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer select-none group" onClick={() => handleNavClick('home')}>
            <GolarysLogo size="md" variant="emerald" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all relative cursor-pointer ${
                    isActive
                      ? 'text-[#2D5A27] bg-[#2D5A27]/8 font-bold'
                      : 'text-stone-600 hover:text-[#2D5A27] hover:bg-stone-100/70'
                  }`}
                >
                  {language === 'fa' ? item.labelFa : item.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#2D5A27] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Search trigger */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-stone-100 rounded-xl px-3 py-1.5 border border-stone-300 focus-within:ring-2 focus-within:ring-[#2D5A27]/30 w-40 sm:w-56 transition-all">
                  <Search className="w-4 h-4 text-stone-400 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeTab !== 'marketplace') setActiveTab('marketplace');
                    }}
                    placeholder="جستجوی گل، رز..."
                    className="w-full bg-transparent border-0 text-xs px-2 focus:outline-none text-stone-800"
                    autoFocus
                  />
                  <button 
                    onClick={() => setShowSearchInput(false)}
                    className="text-stone-400 hover:text-stone-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="p-2 rounded-xl text-stone-600 hover:text-[#2D5A27] hover:bg-stone-100 cursor-pointer transition-colors"
                  title="جستجو در محصولات"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Dispatched Notification Stream Bell */}
            <button
              onClick={() => setIsNotificationsDrawerOpen(true)}
              className="relative p-2 rounded-xl text-stone-600 hover:text-[#2D5A27] hover:bg-stone-100 cursor-pointer transition-colors"
              title="پیامک‌ها و اعلان‌های سیستم"
            >
              <Bell className="w-5 h-5" />
              {dispatchedNotifications.length > 0 && (
                <span className="absolute top-1 right-1 bg-amber-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {toPersianDigits(dispatchedNotifications.length)}
                </span>
              )}
            </button>

            {/* User Account / Auth Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-stone-200 hover:border-[#2D5A27] hover:bg-stone-50 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold text-stone-800"
              title={user ? 'پروفایل کاربری' : 'ورود / عضویت'}
            >
              <UserIcon className="w-4 h-4 text-[#2D5A27]" />
              <span className="hidden sm:inline">
                {user ? user.fullName || 'کاربر گرامی' : 'ورود / ثبت‌نام'}
              </span>
            </button>

            {/* Admin Panel Button */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 sm:px-3 sm:py-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                activeTab === 'admin'
                  ? 'bg-[#2D5A27] text-white border-[#2D5A27]'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              }`}
              title="پنل مدیریت گل آریس"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden sm:inline">پنل مدیریت</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white rounded-xl shadow-xs hover:shadow-md cursor-pointer transition-all flex items-center justify-center group"
              aria-label="سبد خرید"
            >
              <ShoppingBag className="w-5 h-5 text-[#FAF0E6] group-hover:scale-110 transition-transform" />
              {totalCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#1F3F1B] font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white animate-bounce">
                  {toPersianDigits(totalCartItems)}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 cursor-pointer"
              aria-label="منوی سایت"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-4 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-right px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-[#2D5A27] text-white'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{language === 'fa' ? item.labelFa : item.labelEn}</span>
                {activeTab === item.id && <span className="text-xs text-[#D4AF37]">● فعال</span>}
              </button>
            ))}

            <div className="pt-4 mt-2 border-t border-stone-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsAuthModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-[#2D5A27]" />
                <span>{user ? `حساب کاربری (${user.fullName})` : 'ورود یا عضویت سریع'}</span>
              </button>

              <button
                onClick={() => {
                  setIsTrackingModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-sm cursor-pointer border border-emerald-200"
              >
                <Truck className="w-4 h-4 text-[#2D5A27]" />
                <span>رهگیری زنده سفارش</span>
              </button>

              <button
                onClick={() => handleNavClick('sellers')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D5A27]/10 text-[#2D5A27] font-bold text-sm cursor-pointer"
              >
                <Store className="w-4 h-4 text-[#D4AF37]" />
                <span>ثبت نام گلفروشی و غرفه‌دار</span>
              </button>

              <button
                onClick={() => handleNavClick('admin')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2D5A27] text-white font-bold text-sm cursor-pointer shadow-xs"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
                <span>ورود به پنل مدیریت گل آریس</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
