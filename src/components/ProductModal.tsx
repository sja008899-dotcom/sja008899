import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Store, 
  Heart, 
  Star,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { formatToman, toPersianDigits } from '../lib/formatters';

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsGiftBuilderOpen } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [giftMessage, setGiftMessage] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [includeGiftCard, setIncludeGiftCard] = useState(false);

  if (!quickViewProduct) return null;

  const currentImage = selectedImage || quickViewProduct.image;
  const gallery = quickViewProduct.gallery || [quickViewProduct.image];

  const handleAdd = () => {
    addToCart(
      quickViewProduct, 
      qty, 
      includeGiftCard ? giftMessage : undefined, 
      includeGiftCard ? recipientName : undefined
    );
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 left-4 z-10 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md cursor-pointer transition-colors"
          aria-label="بستن پنجره"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Photo & Thumbnails Column */}
          <div className="p-6 bg-stone-50 flex flex-col justify-between space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-inner">
              <img
                src={currentImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.isBestseller && (
                <span className="absolute top-3 right-3 bg-[#D4AF37] text-[#1F3F1B] font-black text-xs px-3 py-1 rounded-full shadow-md">
                  ★ پرفروش‌ترین
                </span>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2 justify-center">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                      currentImage === img ? 'border-[#2D5A27] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Freshness & Logistics Badge */}
            <div className="bg-white p-3.5 rounded-2xl border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#2D5A27] font-bold">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>تضمین طراوت {toPersianDigits(quickViewProduct.freshnessGuaranteeDays)} روزه با اسفنج اوآسیس</span>
              </div>
              <div className="flex items-center gap-2 text-stone-600">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>ارسال اکسپرس ۲ ساعته در تهران و حومه</span>
              </div>
            </div>
          </div>

          {/* Details & Action Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5 overflow-y-auto max-h-[85vh]">
            
            <div className="space-y-4">
              
              {/* Vendor info tag */}
              <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <img
                    src={quickViewProduct.vendor.avatar}
                    alt={quickViewProduct.vendor.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <span className="font-bold text-stone-900 block">{quickViewProduct.vendor.name}</span>
                    <span className="text-[11px] text-stone-500">{quickViewProduct.vendor.city}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#D4AF37] font-bold">
                  <Star className="w-4 h-4 fill-[#D4AF37]" />
                  <span>{toPersianDigits(quickViewProduct.vendor.rating)}</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#1F3F1B] font-heading">
                  {quickViewProduct.name}
                </h2>
                <span className="text-xs text-stone-400 font-sans tracking-wide block mt-0.5">
                  {quickViewProduct.nameEn}
                </span>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-2xl font-black text-[#2D5A27] font-heading">
                    {formatToman(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-stone-400 line-through">
                      {formatToman(quickViewProduct.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1 text-xs sm:text-sm text-stone-600 leading-relaxed">
                <p>{quickViewProduct.description}</p>
              </div>

              {/* Plant Care Instructions if available */}
              {quickViewProduct.careInstructions && (
                <div className="bg-[#2D5A27]/5 border border-[#2D5A27]/20 p-3 rounded-2xl space-y-1 text-xs">
                  <span className="font-bold text-[#2D5A27] block">🌿 دستور نگهداری در خانه:</span>
                  <p className="text-stone-600">{quickViewProduct.careInstructions}</p>
                </div>
              )}

              {/* Personalized Gift Card Option */}
              <div className="border border-stone-200 rounded-2xl p-3.5 space-y-3 bg-stone-50/50">
                <label className="flex items-center justify-between text-xs font-bold text-stone-800 cursor-pointer select-none">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span>افزودن کارت هدیه و متن اختصاصی (رایگان)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={includeGiftCard}
                    onChange={(e) => setIncludeGiftCard(e.target.checked)}
                    className="rounded text-[#2D5A27] focus:ring-[#2D5A27]"
                  />
                </label>

                {includeGiftCard && (
                  <div className="space-y-2 pt-2 animate-in fade-in duration-200">
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="نام گیرنده گل (مثال: سارای عزیز)"
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/30"
                    />
                    <textarea
                      value={giftMessage}
                      onChange={(e) => setGiftMessage(e.target.value)}
                      placeholder="متن پیام تبریک یا ابراز محبت شما..."
                      rows={2}
                      className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/30"
                    />
                  </div>
                )}
              </div>

            </div>

            {/* Quantity and Add to Cart Bar */}
            <div className="pt-4 border-t border-stone-200 flex items-center gap-3">
              
              {/* Quantity selector */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2.5 text-stone-700 hover:bg-stone-200 font-bold cursor-pointer transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2.5 text-xs font-bold text-stone-900 min-w-8 text-center">
                  {toPersianDigits(qty)}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2.5 text-stone-700 hover:bg-stone-200 font-bold cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-4 rounded-xl bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                <span>افزودن به سبد خرید ({formatToman(quickViewProduct.price * qty)})</span>
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
