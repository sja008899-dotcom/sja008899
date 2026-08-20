import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  Palette, 
  Sparkles, 
  Store, 
  ShieldCheck, 
  Award, 
  Layers, 
  ArrowLeft,
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  Brush,
  HeartHandshake
} from 'lucide-react';
import { Product } from '../types';
import { toPersianDigits } from '../lib/formatters';

export const HandicraftsView: React.FC = () => {
  const { products, setActiveTab, setQuickViewProduct } = useApp();

  // Sub-filter for craft types
  const [selectedCraftFilter, setSelectedCraftFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Pair-with-plant interactive helper state
  const [activePairGuide, setActivePairGuide] = useState<number>(0);

  // Filter products belonging to handicrafts or tagged with craft terms
  const handicraftProducts = useMemo(() => {
    return products.filter(
      (p) =>
        p.categorySlug === 'handicrafts' ||
        p.tags.some((t) =>
          [
            'صنایع دستی',
            'سرامیک دست‌ساز',
            'مکرومه',
            'مس قلم‌زنی',
            'کپوبافی',
            'رزین دست‌ساز',
            'سفال دست‌ساز',
            'گلدان هنری',
          ].includes(t)
        )
    );
  }, [products]);

  // Sub-filter items
  const filteredProducts = useMemo(() => {
    let list = [...handicraftProducts];

    if (selectedCraftFilter === 'ceramics') {
      list = list.filter((p) =>
        p.tags.some((t) => t.includes('سرامیک') || t.includes('سفال') || t.includes('تراکوتا'))
      );
    } else if (selectedCraftFilter === 'macrame') {
      list = list.filter((p) =>
        p.tags.some((t) => t.includes('مکرومه') || t.includes('آویز'))
      );
    } else if (selectedCraftFilter === 'copper') {
      list = list.filter((p) =>
        p.tags.some((t) => t.includes('مس') || t.includes('قلم‌زنی') || t.includes('اصفهان'))
      );
    } else if (selectedCraftFilter === 'woven') {
      list = list.filter((p) =>
        p.tags.some((t) => t.includes('کپوبافی') || t.includes('حصیر') || t.includes('نخل'))
      );
    } else if (selectedCraftFilter === 'resin') {
      list = list.filter((p) =>
        p.tags.some((t) => t.includes('رزین') || t.includes('گل خشک'))
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [handicraftProducts, selectedCraftFilter, sortBy]);

  // Plant & Pot pairings data
  const pairingGuides = [
    {
      title: 'سانسوریا و زاموفیلیا + گلدان فیروزه‌ای لالجین',
      desc: 'برگ‌های سبز تیره و کشیده گیاهان آپارتمانی در تضاد رنگی با لعاب فیروزه‌ای سنتی جلوه‌ای سلطنتی و بااصالت به دکوراسیون می‌بخشد.',
      image: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=400&q=80',
      tag: 'ترکیب اصیل ایرانی'
    },
    {
      title: 'پتوس و برگ بیدی + آویز مکرومه‌بافی پنبه‌ای',
      desc: 'ساقه‌های آویز پتوس و فیلودندرون وقتی در گره‌های دست‌بافت پنبه‌ای شیری قرار می‌گیرند، حس طراوت بوهو و آرامش طبیعی ایجاد می‌کنند.',
      image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=400&q=80',
      tag: 'دکوراسیون بوهو و مدرن'
    },
    {
      title: 'برگ‌انجیری و فیکوس لیراتا + سبد حصیری کپوبافی',
      desc: 'گیاهان برگ پهن گرمسیری با بافت طبیعی الیاف نخل دزفول هارمونی کامل دارند و گرما و صمیمیت را به اتاق پذیرایی هدیه می‌دهند.',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
      tag: 'طبیعی و ارگانیک'
    },
    {
      title: 'ارکیده و رز مینیاتوری + قاب رزین گل طبیعی',
      desc: 'جاودانه‌سازی زیبایی گلبرگ‌های حساس در میان رزین اپوکسی بلوری، یادگاری ماندگار از عواطف و هدیه‌ای بی‌نظیر برای دکوراسیون دیوار.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
      tag: 'هدیه هنری ماندگار'
    }
  ];

  return (
    <div className="py-8 sm:py-12 space-y-16">
      
      {/* 1. Hero Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#172E14] via-[#24451D] to-[#12220F] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle background decorative shapes */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#2D5A27]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-5">
            <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1F3F1B] px-4 py-1.5 rounded-full text-xs font-black shadow-md">
              <Brush className="w-4 h-4" />
              <span>بخش ویژه دست‌سازه‌های هنری و سنتی ایران</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight tracking-tight text-white">
              صنایع دستی و گلدان‌های دست‌ساز اصیل
            </h1>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl">
              تلاقی طراوت گل و گیاه طبیعی با هنر دست استادکاران لالجین همدان، مس قلم‌زنی نقش جهان اصفهان، مکرومه‌بافی ظریف و حصیربافی بومی جنوب. هر اثر داستانی از عشق، خاک و هنر است.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-200 border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                <span>۱۰۰٪ کار دست استادکاران ایرانی</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-200 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>بسته‌بندی محافظتی ضدضربه</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-semibold text-stone-200 border border-white/10">
                <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
                <span>حمایت مستقیم از هنرمندان بومی</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Filter Tabs & Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Category Filter Pills */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-3xl border border-stone-200/90 shadow-xs">
          
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'همه دست‌سازه‌ها' },
              { id: 'ceramics', label: 'سفال و سرامیک لالجین' },
              { id: 'macrame', label: 'مکرومه و آویز گلدان' },
              { id: 'copper', label: 'مس و قلم‌زنی اصفهان' },
              { id: 'woven', label: 'کپوبافی و حصیر جنوب' },
              { id: 'resin', label: 'رزین و گل خشک طبیعی' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCraftFilter(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCraftFilter === tab.id
                    ? 'bg-[#2D5A27] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <SlidersHorizontal className="w-4 h-4 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-700 font-semibold focus:outline-hidden cursor-pointer"
            >
              <option value="featured">مرتب‌سازی: پیشنهادی</option>
              <option value="price-asc">قیمت: کم به زیاد</option>
              <option value="price-desc">قیمت: زیاد به کم</option>
            </select>
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3">
            <Palette className="w-12 h-12 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-700">محصولی در این دسته‌بندی یافت نشد</h3>
            <p className="text-xs text-stone-400">لطفاً فیلتر دیگری را انتخاب فرمایید.</p>
            <button
              onClick={() => setSelectedCraftFilter('all')}
              className="px-4 py-2 bg-[#2D5A27] text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              مشاهده همه صنایع دستی
            </button>
          </div>
        )}

      </section>

      {/* 3. Interactive Guide: Plant & Pot Matching */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              راهنمای چیدمان و دکوراسیون
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-heading">
              چگونه گلدان دست‌ساز مناسب گیاهمان را انتخاب کنیم؟
            </h2>
            <p className="text-xs sm:text-sm text-stone-400">
              روی هر ترکیب کلیک کنید تا راز زیبایی و شرایط بهینه نگهداری گیاه در گلدان‌های هنری را ببینید.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Guide List */}
            <div className="lg:col-span-7 space-y-3">
              {pairingGuides.map((guide, idx) => (
                <div
                  key={idx}
                  onClick={() => setActivePairGuide(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer text-right space-y-1.5 ${
                    activePairGuide === idx
                      ? 'bg-white/10 border-[#D4AF37] shadow-md'
                      : 'bg-white/5 border-white/10 hover:bg-white/8 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm sm:text-base text-white">
                      {guide.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                      {guide.tag}
                    </span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {guide.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Active Guide Visual */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-white/15 relative group">
                <img
                  src={pairingGuides[activePairGuide].image}
                  alt={pairingGuides[activePairGuide].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-xs font-bold text-[#D4AF37] mb-1">
                    {pairingGuides[activePairGuide].tag}
                  </span>
                  <h4 className="text-base font-black text-white">
                    {pairingGuides[activePairGuide].title}
                  </h4>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Artisans Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            دست‌های هنرمند ایران
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading">
            استادکاران و کارگاه‌های دست‌ساز همکار با گل آریس
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            خرید از گل آریس مستقیماً دسترنج هنرمند را بدون واسطه به حساب وی واریز می‌کند.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80"
                alt="استاد کاوه"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]"
              />
              <div>
                <h3 className="font-bold text-stone-900 text-sm">استودیو سرامیک خاک و خورشید</h3>
                <span className="text-xs text-[#2D5A27] font-semibold block">استاد کاوه - لالجین همدان</span>
                <span className="text-[11px] text-stone-400">۲۵ سال سابقه سفالگری</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              «هر گلدانی که روی چرخ سفالگری شکل می‌گیرد، روحی از خاک پاک البرز و هنر گذشتگان دارد که آماده میزبانی از گل‌های شماست.»
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
                alt="فرزانه نوری"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]"
              />
              <div>
                <h3 className="font-bold text-stone-900 text-sm">کارگاه هنر مکرومه تار و پود</h3>
                <span className="text-xs text-[#2D5A27] font-semibold block">فرزانه نوری - تهران</span>
                <span className="text-[11px] text-stone-400">طراح دکوراسیون و دست‌بافت</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              «بافت مکرومه مثل مدیتیشن است؛ هر گره با انرژی مثبت بافته می‌شود تا گیاهان آپارتمانی در آغوش نخ‌های پنبه‌ای بدرخشند.»
            </p>
          </div>

          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
                alt="استاد اصفهانی"
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#D4AF37]"
              />
              <div>
                <h3 className="font-bold text-stone-900 text-sm">آتلیه مس نقش جهان</h3>
                <span className="text-xs text-[#2D5A27] font-semibold block">استاد اصفهانی - اصفهان</span>
                <span className="text-[11px] text-stone-400">قلم‌زنی برجسته و فیروزه‌کوبی</span>
              </div>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              «صدای چکش و قلم روی مس سرخ، نبض هنر نصف جهان است. تلفیق مس اصیل با گل‌های تازه، دکوراسیون خانه را جاودانه می‌کند.»
            </p>
          </div>

        </div>
      </section>

      {/* 5. Call To Action for Artisans */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1F3F1B] to-[#2D5A27] rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-right">
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
              هنرمند سفال، سرامیک یا صنایع دستی هستید؟
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 max-w-xl">
              دست‌سازه‌های گلدانی و هنری خود را در ویترین سراسری گل آریس با کمترین کمیسیون (۵٪) به خریداران گل و گیاه بفروشید.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('sellers')}
            className="px-6 py-3 bg-[#D4AF37] hover:bg-[#BF9B2D] text-[#1F3F1B] font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>ثبت‌نام و افتتاح غرفه هنری</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
