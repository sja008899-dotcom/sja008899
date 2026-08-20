import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { 
  SlidersHorizontal, 
  Sparkles, 
  Store, 
  Heart, 
  Truck, 
  ShieldCheck, 
  Star, 
  Search, 
  Send,
  PenTool,
  CheckCircle2,
  Users,
  Filter
} from 'lucide-react';
import { sampleVendors } from '../data/initialContent';
import { toPersianDigits } from '../lib/formatters';

export const MarketplaceView: React.FC = () => {
  const { 
    siteContent, 
    products, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setIsGiftBuilderOpen,
    setActiveTab
  } = useApp();

  const [vendorTypeFilter, setVendorTypeFilter] = useState<'all' | 'local_florist' | 'home_grower'>('all');
  const [sortBy, setSortBy] = useState<'bestseller' | 'price_asc' | 'price_desc' | 'freshness'>('bestseller');
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Vendor type match
      if (vendorTypeFilter !== 'all' && p.vendor.type !== vendorTypeFilter) {
        return false;
      }
      // In stock
      if (onlyInStock && !p.inStock) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDesc = p.description.toLowerCase().includes(q);
        const matchVendor = p.vendor.name.toLowerCase().includes(q);
        const matchTags = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchVendor && !matchTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'bestseller') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'freshness') return b.freshnessGuaranteeDays - a.freshnessGuaranteeDays;
      return 0;
    });
  }, [products, selectedCategory, vendorTypeFilter, onlyInStock, searchQuery, sortBy]);

  return (
    <div className="space-y-16 py-8">
      
      {/* 1. Category Visual Carousel / Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading">
              دسته‌بندی‌های گل و گیاه
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              مجموعه‌ای بی‌نظیر از زیباترین گل‌های تازه، گیاهان مقاوم و باکس‌های هدیه
            </p>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-xs font-bold text-[#2D5A27] bg-[#2D5A27]/10 hover:bg-[#2D5A27]/20 px-3 py-1.5 rounded-xl cursor-pointer transition-colors"
            >
              نمایش همه دسته‌ها
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div
            onClick={() => setSelectedCategory('all')}
            className={`p-3 rounded-2xl cursor-pointer border text-center transition-all flex flex-col items-center justify-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-[#2D5A27] text-white border-[#2D5A27] shadow-md scale-102'
                : 'bg-white text-stone-700 border-stone-200 hover:border-[#2D5A27]/40 hover:bg-stone-50'
            }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${
              selectedCategory === 'all' ? 'bg-white/20 text-[#D4AF37]' : 'bg-stone-100'
            }`}>
              🌸
            </div>
            <span className="text-xs font-bold">همه گل‌ها</span>
            <span className="text-[10px] opacity-75">{toPersianDigits(products.length)} محصول</span>
          </div>

          {siteContent.site.categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <div
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`group relative rounded-2xl p-2 cursor-pointer border overflow-hidden transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#2D5A27] bg-[#2D5A27]/5 border-[#2D5A27] shadow-md scale-102'
                    : 'bg-white border-stone-200 hover:border-stone-400 hover:shadow-xs'
                }`}
              >
                <div className="h-24 sm:h-28 rounded-xl overflow-hidden mb-2 bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="text-center">
                  <h3 className={`text-xs font-bold ${isSelected ? 'text-[#2D5A27]' : 'text-stone-800'}`}>
                    {cat.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. Interactive Filter & Sorting Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
          
          {/* Vendor Type Switcher Pills */}
          <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-2xl overflow-x-auto max-w-full">
            <button
              onClick={() => setVendorTypeFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                vendorTypeFilter === 'all'
                  ? 'bg-white text-[#2D5A27] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              تمام فروشگاه‌ها
            </button>
            <button
              onClick={() => setVendorTypeFilter('local_florist')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                vendorTypeFilter === 'local_florist'
                  ? 'bg-white text-[#2D5A27] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>گلفروشی‌های محلی</span>
            </button>
            <button
              onClick={() => setVendorTypeFilter('home_grower')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                vendorTypeFilter === 'home_grower'
                  ? 'bg-white text-[#2D5A27] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              <span>پرورش‌دهندگان خانگی</span>
            </button>
          </div>

          {/* Sort & Quick In-Stock Switch */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-500 font-semibold hidden md:inline">مرتب‌سازی:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-stone-50 border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-700 font-semibold focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20 cursor-pointer"
              >
                <option value="bestseller">محبوب‌ترین و پرفروش</option>
                <option value="price_asc">ارزان‌ترین قیمت</option>
                <option value="price_desc">گران‌ترین (لوکس)</option>
                <option value="freshness">بیشترین ماندگاری</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-stone-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-[#2D5A27] focus:ring-[#2D5A27]"
              />
              <span>فقط موجودی روز</span>
            </label>
          </div>

        </div>

        {/* Search Results Summary if active */}
        {searchQuery.trim() && (
          <div className="mt-4 flex items-center justify-between text-xs bg-[#2D5A27]/5 border border-[#2D5A27]/20 p-3 rounded-2xl">
            <span>
              نتایج جستجو برای: <strong className="text-[#2D5A27]">«{searchQuery}»</strong> ({toPersianDigits(filteredProducts.length)} مورد پیدا شد)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-stone-500 hover:text-stone-800 font-bold underline cursor-pointer"
            >
              پاک کردن جستجو
            </button>
          </div>
        )}
      </section>

      {/* 3. Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center text-3xl">
              🥀
            </div>
            <h3 className="text-lg font-bold text-stone-800 font-heading">
              گلی با این مشخصات یافت نشد!
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              می‌توانید فیلترها را ریست کرده یا نام دیگری مانند «رز»، «ارکیده» یا «گیاه آپارتمانی» را جستجو کنید.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setVendorTypeFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#2D5A27] text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              مشاهده تمام گل‌ها
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Interactive Personalized Gift Card Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1F3F1B] via-[#2D5A27] to-[#1F3F1B] rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1F3F1B] px-3.5 py-1 rounded-full text-xs font-black">
                <Sparkles className="w-3.5 h-3.5" />
                سفارشی‌سازی رایگان
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-heading leading-snug">
                هدیه‌ای به یادماندنی با کارت پستال دست‌نویس و بسته‌بندی لوکس
              </h2>
              <p className="text-sm text-stone-200 max-w-2xl leading-relaxed">
                همراه با هر سفارش گل، می‌توانید متن تبریک یا ابراز محبت اختصاصی خود را با فونت خوشنویسی زیبا، انتخاب پاکت مخمل و مهر و موم موم عسل طراحی کنید تا مستقیماً به دست عزیزانتان برسد.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsGiftBuilderOpen(true)}
                  className="px-6 py-3 bg-[#D4AF37] hover:bg-[#BF9B2D] text-[#1F3F1B] font-extrabold text-sm rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
                >
                  <PenTool className="w-4 h-4" />
                  <span>طراحی و پیش‌نمایش کارت هدیه اختصاصی</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37] text-[#1F3F1B] flex items-center justify-center mx-auto text-xl shadow-md">
                💌
              </div>
              <h4 className="font-bold text-sm text-white">۳ تم کارت پستال رایگان</h4>
              <p className="text-xs text-stone-200">
                طلایی سلطنتی، سبز زمردی گل آریس و رمانتیک پاستلی
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Values & Commitments Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            چرا گل آریس؟
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading">
            تفاوت خرید از بازار گل آریس
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteContent.site.values.map((v, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#2D5A27]/10 text-2xl flex items-center justify-center text-[#2D5A27]">
                {v.icon}
              </div>
              <div>
                <h3 className="font-bold text-base text-stone-900 font-heading mb-1.5">
                  {v.title}
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  {v.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Florist & Home Grower Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading">
              گلفروشان و پرورش‌دهندگان برگزیده
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              مستقیماً از هنرمندان و عاشقان گل در شهر خودتان خرید کنید
            </p>
          </div>
          <button
            onClick={() => setActiveTab('sellers')}
            className="text-xs font-bold text-[#2D5A27] hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>مشاهده شرایط فروشندگی</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-xs hover:border-[#2D5A27]/30 transition-all space-y-4"
            >
              <div className="flex items-center gap-3">
                <img
                  src={vendor.avatar}
                  alt={vendor.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#D4AF37]/40"
                />
                <div>
                  <h4 className="font-bold text-sm text-stone-900">{vendor.name}</h4>
                  <span className="text-xs text-stone-500 block">{vendor.city}</span>
                  <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-bold mt-0.5">
                    <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    <span>{toPersianDigits(vendor.rating)}</span>
                    <span className="text-stone-400 font-normal">({toPersianDigits(vendor.reviewsCount)} نظر)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                {vendor.bio}
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#2D5A27] bg-[#2D5A27]/10 px-2 py-0.5 rounded-lg">
                  {vendor.badge}
                </span>
                <span className="text-[11px] text-stone-400">
                  {vendor.deliveryMethods.includes('snap') ? '🚀 اسنپ ۲ ساعته' : '📦 تیپاکس'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="bg-[#F8F9F6] py-14 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              نظرات خریداران
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading">
              تجربه مشتریان گل آریس
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {siteContent.site.testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    «{t.text}»
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-stone-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-stone-900">{t.name}</h4>
                    <span className="text-[11px] text-stone-400">خریدار تایید شده</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
