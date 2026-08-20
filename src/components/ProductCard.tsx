import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { 
  ShoppingBag, 
  Eye, 
  Sparkles, 
  Store, 
  ShieldCheck, 
  Heart, 
  Mail, 
  Truck,
  Camera
} from 'lucide-react';
import { formatToman, toPersianDigits } from '../lib/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct, setIsGiftBuilderOpen } = useApp();

  return (
    <div className="group bg-white rounded-3xl border border-stone-200/90 hover:border-[#2D5A27]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Product Image Frame */}
      <div className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer" onClick={() => setQuickViewProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          {product.isBestseller && (
            <span className="bg-[#D4AF37] text-[#1F3F1B] font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              پرفروش‌ترین
            </span>
          )}
          {product.isSeasonal && (
            <span className="bg-[#2D5A27] text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-md">
              گل فصلی نوبرانه
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-rose-600 text-white font-bold text-[11px] px-2 py-0.5 rounded-full shadow-md">
              تخفیف ویژه
            </span>
          )}
        </div>

        {/* Delivery & Photo tags on bottom image */}
        <div className="absolute bottom-2 right-2 left-2 flex items-center justify-between pointer-events-none">
          <div className="bg-black/70 backdrop-blur-xs text-white text-[10px] px-2 py-1 rounded-lg flex items-center gap-1">
            <Truck className="w-3 h-3 text-[#D4AF37]" />
            <span>ارسال ۲ ساعته</span>
          </div>

          {product.categorySlug !== 'handicrafts' && (
            <div className="bg-[#1F3F1B]/90 backdrop-blur-xs text-emerald-300 text-[10px] px-2 py-1 rounded-lg flex items-center gap-1">
              <Camera className="w-3 h-3 text-[#D4AF37]" />
              <span>عکس قبل ارسال</span>
            </div>
          )}
        </div>

        {/* Quick View overlay button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
          className="absolute top-3 left-3 p-2 rounded-xl bg-white/90 hover:bg-white text-stone-800 shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer pointer-events-auto"
          title="مشاهده سریع جزئیات"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Vendor & Category details */}
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
            <span className="flex items-center gap-1 text-[#2D5A27] font-medium bg-[#2D5A27]/8 px-2 py-0.5 rounded-md">
              <Store className="w-3 h-3" />
              {product.vendor.name}
            </span>
            <span className="text-[11px] text-stone-400">
              {product.vendor.city}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="font-bold text-stone-900 text-base leading-snug group-hover:text-[#2D5A27] transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Freshness / Handmade guarantee pill */}
        <div className="flex items-center gap-1 text-[11px] text-[#2D5A27] font-medium pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>
            {product.categorySlug === 'handicrafts'
              ? 'تضمین اصالت اثر و ارسال ضدضربه'
              : `ضمانت شادابی ${toPersianDigits(product.freshnessGuaranteeDays)} روزه با آب‌رسانی`}
          </span>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            {product.originalPrice && (
              <span className="block text-[11px] text-stone-400 line-through">
                {formatToman(product.originalPrice)}
              </span>
            )}
            <span className="text-base sm:text-lg font-black text-[#1F3F1B] font-heading">
              {formatToman(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => addToCart(product, 1)}
              className="px-3.5 py-2.5 rounded-xl bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              title="افزودن به سبد خرید"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span className="hidden xs:inline">افزودن</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

