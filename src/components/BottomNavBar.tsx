import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Store, 
  ShoppingBag, 
  Truck, 
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import { ActiveTab } from '../types';
import { toPersianDigits } from '../lib/formatters';

export const BottomNavBar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cart, 
    setIsCartOpen,
    setIsTrackingModalOpen,
    setIsAuthModalOpen,
    user
  } = useApp();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      id="golarys-mobile-bottom-nav" 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 items-center h-15 px-1 max-w-md mx-auto">
        
        {/* 1. Home */}
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
            activeTab === 'home' 
              ? 'text-[#2D5A27] font-bold' 
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 transition-transform ${activeTab === 'home' ? 'scale-110 stroke-[2.5]' : ''}`} />
            {activeTab === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2D5A27] rounded-full" />
            )}
          </div>
          <span className="text-[10px] tracking-tight">خانه</span>
        </button>

        {/* 2. Marketplace / Shop */}
        <button
          onClick={() => handleTabClick('marketplace')}
          className={`flex flex-col items-center justify-center gap-1 py-1 transition-all ${
            activeTab === 'marketplace' 
              ? 'text-[#2D5A27] font-bold' 
              : 'text-stone-500 hover:text-stone-800 font-medium'
          }`}
        >
          <div className="relative">
            <Store className={`w-5 h-5 transition-transform ${activeTab === 'marketplace' ? 'scale-110 stroke-[2.5]' : ''}`} />
            {activeTab === 'marketplace' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2D5A27] rounded-full" />
            )}
          </div>
          <span className="text-[10px] tracking-tight">فروشگاه</span>
        </button>

        {/* 3. Cart with Badge */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-1 text-stone-500 hover:text-stone-800 font-medium relative group"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#2D5A27]/10 flex items-center justify-center text-[#2D5A27] group-active:scale-95 transition-transform">
              <ShoppingBag className="w-4.5 h-4.5" />
            </div>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#D4AF37] text-stone-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs border-2 border-white persian-num animate-pulse">
                {toPersianDigits(totalCartItems)}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight text-[#2D5A27] font-bold">سبد خرید</span>
        </button>

        {/* 4. Tracking */}
        <button
          onClick={() => setIsTrackingModalOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-1 text-stone-500 hover:text-stone-800 font-medium transition-all"
        >
          <div className="relative">
            <Truck className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">پیگیری</span>
        </button>

        {/* 5. User Profile */}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex flex-col items-center justify-center gap-1 py-1 text-stone-500 hover:text-stone-800 font-medium transition-all"
        >
          <div className="relative">
            <UserIcon className="w-5 h-5" />
            {user && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <span className="text-[10px] tracking-tight">
            {user ? 'حساب من' : 'ورود'}
          </span>
        </button>

      </div>
    </div>
  );
};
