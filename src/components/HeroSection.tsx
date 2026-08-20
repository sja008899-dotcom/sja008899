import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Heart, 
  Store, 
  Star,
  Clock,
  Play,
  CheckCircle2,
  Flame,
  Camera,
  Layers
} from 'lucide-react';
import { toPersianDigits } from '../lib/formatters';

export const HeroSection: React.FC = () => {
  const { siteContent, setActiveTab, setSelectedCategory } = useApp();
  const { hero } = siteContent.site;
  const [activeMediaTab, setActiveMediaTab] = useState<'bloom' | 'arranging' | 'craft'>('bloom');

  // Real short video / live motion GIF sources for flower blossoming, arranging, and handicrafts
  const mediaHighlights = {
    bloom: {
      title: 'شکفتن غنچه‌های رز هلندی در گلخانه',
      subtitle: 'چیده شده صبح امروز با پکیج آبرسانی اختصاصی',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1000&q=85',
      badge: 'گل تازه روز • ارسال ۲ ساعته',
      rating: '۵.۰ (بیش از ۱۴۰۰ سفارش رضایت‌بخش)'
    },
    arranging: {
      title: 'هنر گل‌آرایی ژورنالی و مدرن',
      subtitle: 'دیزاین سفارشی توسط برترین گل‌آراهای محلی با کارت دست‌نویس',
      image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1000&q=85',
      badge: 'عکاسی اختصاصی قبل از ارسال',
      rating: '۴.۹ (تضمین تطابق با تصویر)'
    },
    craft: {
      title: 'گلدان‌های دست‌ساز سرامیکی لالجین',
      subtitle: 'ترکیب گیاهان اصیل با سفال و سرامیک هنر دست اساتید همدان',
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=85',
      badge: 'صنایع دستی اصیل • بسته‌بندی ضدضربه',
      rating: '۵.۰ (بیمه شکستگی تا تحویل)'
    }
  };

  const currentMedia = mediaHighlights[activeMediaTab];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3F7F0] via-[#FAFBF8] to-[#FCFCFA] py-10 md:py-16 border-b border-stone-200/80">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#2D5A27]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Right Column (Headlines, Search Highlights, Quick CTAs) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md text-[#1F3F1B] px-4 py-2 rounded-full text-xs font-extrabold border border-[#2D5A27]/20 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#2D5A27]"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>بازار آنلاین گل و گیاه ایران | گلفروشی آنلاین با ارسال ۲ ساعته</span>
            </div>

            {/* Main Headline with High-Impact Persian Keywords */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-[#1F3F1B] leading-tight font-heading">
                بازار بزرگ گل و گیاه ایران؛ <br />
                <span className="text-[#2D5A27] underline decoration-[#D4AF37] decoration-wavy decoration-2">
                  خرید آنلاین گل تازه
                </span> مستقیم از باغبان
              </h1>
            </div>

            {/* Persian Search Friendly Subheadline */}
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl font-medium">
              سامانه سراسری سفارش اینترنتی انواع دسته گل رز هلندی، گیاهان آپارتمانی تصفیه‌کننده هوا، باکس هدیه لوکس و صنایع دستی لالجین با عکاسی قبل از ارسال و تضمین شادابی ۷ روزه.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  setActiveTab('marketplace');
                  window.scrollTo({ top: 480, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-2xl bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#2D5A27]/25 hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>مشاهده بازارچه و خرید آنلاین</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#D4AF37]" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('roses');
                  setActiveTab('marketplace');
                }}
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-[#1F3F1B] font-bold text-sm border border-stone-300 hover:border-[#2D5A27]/40 shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-rose-500" />
                <span>سفارش دسته گل رز</span>
              </button>

              <button
                onClick={() => setActiveTab('sellers')}
                className="px-4 py-3.5 rounded-2xl bg-[#D4AF37]/15 hover:bg-[#D4AF37]/25 text-[#1F3F1B] font-bold text-xs sm:text-sm border border-[#D4AF37]/40 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Store className="w-4 h-4 text-[#D4AF37]" />
                <span>ورود باغبانان و غرفه‌داران</span>
              </button>
            </div>

            {/* Popular Persian Search Categories */}
            <div className="pt-4 border-t border-stone-200/90">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-stone-500 font-bold">
                  دسته‌بندی‌های پرجستجو در بازار گل ایران:
                </span>
                <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  تخفیف ویژه گل‌های امروز 🏷️
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {[
                  { name: '🌹 دسته گل رز هلندی', slug: 'roses' },
                  { name: '🪴 گیاهان آپارتمانی مقاوم', slug: 'houseplants' },
                  { name: '🎁 باکس گل هدیه لوکس', slug: 'gift-baskets' },
                  { name: '🏺 گلدان سرامیکی لالجین', slug: 'handicrafts' },
                  { name: '🌸 ارکیده فالانوپسیس', slug: 'orchids' },
                  { name: '🌻 گل آفتابگردان پرانرژی', slug: 'sunflowers' }
                ].map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setActiveTab('marketplace');
                      window.scrollTo({ top: 520, behavior: 'smooth' });
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-[#2D5A27] hover:text-white text-stone-700 border border-stone-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar with Persian Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/90 shadow-2xs text-center">
                <span className="block text-lg sm:text-xl font-black text-[#2D5A27] font-heading">
                  +{toPersianDigits(500)}
                </span>
                <span className="text-[11px] text-stone-600 font-bold">باغبان و گلفروش فعال</span>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/90 shadow-2xs text-center">
                <span className="block text-lg sm:text-xl font-black text-[#2D5A27] font-heading">
                  {toPersianDigits(2)} ساعته
                </span>
                <span className="text-[11px] text-stone-600 font-bold">ارسال اکسپرس در تهران</span>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-3.5 rounded-2xl border border-stone-200/90 shadow-2xs text-center">
                <span className="block text-lg sm:text-xl font-black text-[#2D5A27] font-heading">
                  {toPersianDigits(7)} روز
                </span>
                <span className="text-[11px] text-stone-600 font-bold">ضمانت شادابی واقعی</span>
              </div>
            </div>

          </div>

          {/* Left Column (Interactive Visual Showcase with Dynamic Real Shots) */}
          <div className="lg:col-span-5 relative">
            
            {/* Interactive Tab Selector on top of Media Card */}
            <div className="flex items-center justify-center gap-1.5 mb-3 bg-stone-200/60 p-1.5 rounded-2xl backdrop-blur-xs max-w-md mx-auto">
              <button
                onClick={() => setActiveMediaTab('bloom')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMediaTab === 'bloom'
                    ? 'bg-white text-[#1F3F1B] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🌹 گل تازه روز
              </button>
              <button
                onClick={() => setActiveMediaTab('arranging')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMediaTab === 'arranging'
                    ? 'bg-white text-[#1F3F1B] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                ✨ گل‌آرایی لوکس
              </button>
              <button
                onClick={() => setActiveMediaTab('craft')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMediaTab === 'craft'
                    ? 'bg-white text-[#1F3F1B] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                🏺 سفال لالجین
              </button>
            </div>

            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Media Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-stone-900/10 aspect-4/3 sm:aspect-4/4 group bg-stone-900">
                <img
                  src={currentMedia.image}
                  alt={currentMedia.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dynamic Vignette / Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                
                {/* Top Badge: Live Photo Proof */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-bold">{currentMedia.badge}</span>
                </div>

                {/* Bottom Media Card Details */}
                <div className="absolute bottom-4 right-4 left-4 text-white space-y-1.5">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <Star className="w-4 h-4 fill-[#D4AF37]" />
                    <span className="text-xs text-stone-200 mr-1 font-bold">{currentMedia.rating}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black font-heading leading-tight">
                    {currentMedia.title}
                  </h3>
                  <p className="text-xs text-stone-200 line-clamp-2">
                    {currentMedia.subtitle}
                  </p>
                </div>
              </div>

              {/* Floating Top-Left Tag: 2-Hour Delivery */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-2.5 z-20">
                <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-800">ارسال اکسپرس ۲ ساعته</span>
                  <span className="text-[10px] text-stone-500">پیک اختصاصی در تهران و کرج</span>
                </div>
              </div>

              {/* Floating Bottom-Right Card: Freshness Guarantee */}
              <div className="absolute -bottom-4 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-200 flex items-center gap-2.5 z-20">
                <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-stone-800">تضمین ۱۰۰٪ تازگی گل</span>
                  <span className="text-[10px] text-[#2D5A27] font-bold">ارسال مستقیم از باغ گل محلات</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
