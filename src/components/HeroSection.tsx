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
  const { siteContent, setActiveTab, setSelectedCategory, setIsMobileAppModalOpen } = useApp();
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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#122410] via-[#172E14] to-[#1C3818] py-12 md:py-18 border-b border-[#D4AF37]/30 text-white">
      {/* Decorative ambient golden & emerald floral glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#2D5A27]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Right Column (Headlines, Search Highlights, Quick CTAs) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Pill with Golden Flower */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#FAF0E6] px-4 py-2 rounded-full text-xs font-extrabold border border-[#D4AF37]/40 shadow-lg shadow-black/20">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>بازار آنلاین گل و گیاه ایران | گلفروشی آنلاین با ارسال ۲ ساعته</span>
            </div>

            {/* Main Headline with High-Impact Persian Keywords */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight font-heading">
                بازار بزرگ گل و گیاه ایران؛ <br />
                <span className="text-[#D4AF37] drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">
                  خرید آنلاین گل تازه
                </span> مستقیم از باغبان
              </h1>
            </div>

            {/* Persian Search Friendly Subheadline */}
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl font-medium">
              سامانه سراسری سفارش اینترنتی انواع دسته گل رز هلندی، گیاهان آپارتمانی تصفیه‌کننده هوا، باکس هدیه لوکس و صنایع دستی لالجین با عکاسی قبل از ارسال و تضمین شادابی ۷ روزه.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  setActiveTab('marketplace');
                  window.scrollTo({ top: 480, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-2xl bg-[#D4AF37] hover:bg-[#BF9B2D] text-[#172E14] font-black text-sm sm:text-base shadow-xl shadow-[#D4AF37]/30 hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>مشاهده فروشگاه و خرید آنلاین</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#172E14]" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('roses');
                  setActiveTab('marketplace');
                }}
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-[#D4AF37]/40 shadow-xs backdrop-blur-sm transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-rose-400" />
                <span>سفارش دسته گل رز</span>
              </button>

              <button
                onClick={() => setActiveTab('sellers')}
                className="px-4 py-3.5 rounded-2xl bg-[#2D5A27]/60 hover:bg-[#2D5A27] text-white font-bold text-xs sm:text-sm border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Store className="w-4 h-4 text-[#D4AF37]" />
                <span>ورود باغبانان و غرفه‌داران</span>
              </button>

              <button
                onClick={() => setIsMobileAppModalOpen(true)}
                className="px-4 py-3.5 rounded-2xl bg-black/40 hover:bg-black/60 text-white font-bold text-xs sm:text-sm border border-white/20 flex items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-all group"
                title="دانلود مستقیم اپلیکیشن اندروید و آیفون"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[#D4AF37]">📱 دانلود اپلیکیشن اندروید (APK)</span>
              </button>
            </div>

            {/* Popular Persian Search Categories */}
            <div className="pt-4 border-t border-white/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-stone-300 font-bold">
                  دسته‌بندی‌های پرجستجو در بازار گل ایران:
                </span>
                <span className="text-[11px] text-[#D4AF37] font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/30 px-2 py-0.5 rounded-md">
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
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-[#D4AF37] hover:text-[#172E14] text-stone-200 border border-white/15 shadow-2xs hover:shadow-xs transition-all cursor-pointer backdrop-blur-xs"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar with Persian Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-[#D4AF37]/25 shadow-sm text-center">
                <span className="block text-lg sm:text-xl font-black text-[#D4AF37] font-heading">
                  +{toPersianDigits(500)}
                </span>
                <span className="text-[11px] text-stone-200 font-bold">باغبان و گلفروش فعال</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-[#D4AF37]/25 shadow-sm text-center">
                <span className="block text-lg sm:text-xl font-black text-[#D4AF37] font-heading">
                  {toPersianDigits(2)} ساعته
                </span>
                <span className="text-[11px] text-stone-200 font-bold">ارسال اکسپرس در تهران</span>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-[#D4AF37]/25 shadow-sm text-center">
                <span className="block text-lg sm:text-xl font-black text-[#D4AF37] font-heading">
                  {toPersianDigits(7)} روز
                </span>
                <span className="text-[11px] text-stone-200 font-bold">ضمانت شادابی واقعی</span>
              </div>
            </div>

          </div>

          {/* Left Column (Interactive Visual Showcase with Dynamic Real Shots) */}
          <div className="lg:col-span-5 relative">
            
            {/* Interactive Tab Selector on top of Media Card */}
            <div className="flex items-center justify-center gap-1.5 mb-3 bg-black/40 p-1.5 rounded-2xl backdrop-blur-md max-w-md mx-auto border border-white/15">
              <button
                onClick={() => setActiveMediaTab('bloom')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMediaTab === 'bloom'
                    ? 'bg-[#D4AF37] text-[#172E14] shadow-md font-black'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                🌹 گل تازه روز
              </button>
              <button
                onClick={() => setActiveMediaTab('arranging')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMediaTab === 'arranging'
                    ? 'bg-[#D4AF37] text-[#172E14] shadow-md font-black'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                ✨ گل‌آرایی لوکس
              </button>
              <button
                onClick={() => setActiveMediaTab('craft')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMediaTab === 'craft'
                    ? 'bg-[#D4AF37] text-[#172E14] shadow-md font-black'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                🏺 سفال لالجین
              </button>
            </div>

            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Media Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50 ring-2 ring-black/40 aspect-4/3 sm:aspect-4/4 group bg-stone-900">
                <img
                  src={currentMedia.image}
                  alt={currentMedia.title}
                  width={700}
                  height={525}
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dynamic Vignette / Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Top Badge: Live Photo Proof */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-[#D4AF37]/40 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
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
                  <h2 className="text-base sm:text-lg font-black font-heading leading-tight text-white">
                    {currentMedia.title}
                  </h2>
                  <p className="text-xs text-stone-200 line-clamp-2">
                    {currentMedia.subtitle}
                  </p>
                </div>
              </div>

              {/* Floating Top-Left Tag: 2-Hour Delivery */}
              <div className="absolute -top-4 -left-3 sm:-left-6 bg-[#172E14]/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#D4AF37]/40 flex items-center gap-2.5 z-20 text-white">
                <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 text-[#D4AF37] flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">ارسال اکسپرس ۲ ساعته</span>
                  <span className="text-[10px] text-stone-300">پیک اختصاصی در تهران و کرج</span>
                </div>
              </div>

              {/* Floating Bottom-Right Card: Freshness Guarantee */}
              <div className="absolute -bottom-4 -right-3 sm:-right-6 bg-[#172E14]/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#D4AF37]/40 flex items-center gap-2.5 z-20 text-white">
                <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center font-bold border border-[#D4AF37]/30">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">تضمین ۱۰۰٪ تازگی گل</span>
                  <span className="text-[10px] text-[#D4AF37] font-bold">ارسال مستقیم از باغ گل محلات</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
