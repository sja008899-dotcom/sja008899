import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Sparkles, 
  Truck, 
  Mail, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { formatToman, toPersianDigits } from '../lib/formatters';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart,
    setIsGiftBuilderOpen,
    setIsCheckoutModalOpen,
    showToast,
    triggerCelebration
  } = useApp();

  const [deliveryMethod, setDeliveryMethod] = useState<'snap' | 'tipax'>('snap');
  const [deliverySlot, setDeliverySlot] = useState('امروز - بازه ۱۴ تا ۱۷ (اکسپرس)');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState<{ orderId: string; total: number } | null>(null);

  // Form fields for simulated checkout
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.percent) / 100) : 0;
  const shippingCost = subtotal > 1500000 ? 0 : deliveryMethod === 'snap' ? 35000 : 45000;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'GOLARYS5') {
      setAppliedPromo({ code: 'GOLARYS5', percent: 5 });
      showToast('کد تخفیف ۵٪ با موفقیت اعمال شد!', 'success');
    } else if (code === 'NOROOZ') {
      setAppliedPromo({ code: 'NOROOZ', percent: 10 });
      showToast('کد تخفیف ویژه ۱۰٪ اعمال شد!', 'success');
    } else {
      showToast('کد تخفیف وارد شده معتبر نیست. از GOLARYS5 استفاده کنید.', 'error');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      showToast('لطفاً مشخصات تحویل‌گیرنده و آدرس را تکمیل فرمایید.', 'error');
      return;
    }
    const orderId = 'GLR-' + Math.floor(100000 + Math.random() * 900000);
    setOrderCompleted({ orderId, total: grandTotal });
    triggerCelebration();
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-left duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Top Header */}
        <div className="p-4 sm:p-5 bg-[#1F3F1B] text-white flex items-center justify-between border-b border-[#2D5A27]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-bold text-base font-heading">
              سبد خرید شما ({toPersianDigits(cart.length)} قلم)
            </h3>
          </div>

          <button
            onClick={() => {
              setIsCartOpen(false);
              setOrderCompleted(null);
              setIsCheckingOut(false);
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {orderCompleted ? (
            /* Order Success View */
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                ✓
              </div>
              <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
                سفارش شما با موفقیت ثبت شد!
              </h3>
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs space-y-2 text-stone-700">
                <p>کد پیگیری سفارش: <strong className="text-[#2D5A27] font-mono text-sm">{orderCompleted.orderId}</strong></p>
                <p>مبلغ پرداختی: <strong>{formatToman(orderCompleted.total)}</strong></p>
                <p className="text-stone-500 pt-1">
                  پیامک تایید سفارش و لینک رهگیری زنده اسنپ‌باکس برای شماره شما ارسال شد.
                </p>
              </div>
              <button
                onClick={() => {
                  setOrderCompleted(null);
                  setIsCheckingOut(false);
                  setIsCartOpen(false);
                }}
                className="w-full py-3 bg-[#2D5A27] text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                بازگشت به بازارچه
              </button>
            </div>
          ) : cart.length === 0 ? (
            /* Empty Cart View */
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto text-3xl">
                🌸
              </div>
              <h4 className="font-bold text-stone-800 text-base">سبد خرید شما خالی است</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                از دسته گل‌ها و گیاهان شاداب دیدن کنید و گل دلخواهتان را انتخاب فرمایید.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-4 py-2 bg-[#2D5A27] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                مشاهده محصولات
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form View */
            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <h4 className="font-bold text-sm text-stone-900">مشخصات تحویل و پرداخت</h4>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[#2D5A27] font-bold hover:underline cursor-pointer"
                >
                  ویرایش اقلام سبد
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  نام و نام خانوادگی گیرنده:
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="مثال: سارا محمدی"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  شماره موبایل جهت هماهنگی تحویل:
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="۰۹۱۲XXXXXXX"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  آدرس دقیق تحویل:
                </label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="شهر، خیابان، پلاک، واحد..."
                  rows={2}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                />
              </div>

              <div className="bg-[#2D5A27]/5 border border-[#2D5A27]/20 p-3 rounded-xl text-xs space-y-1">
                <div className="flex items-center gap-1 text-[#2D5A27] font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>درگاه پرداخت امن شاپرک (شبیه‌سازی شده)</span>
                </div>
                <p className="text-stone-500 text-[11px]">
                  سفارش شما پس از ثبت، مستقیماً به گلفروش اطلاع داده شده و آماده‌سازی آغاز می‌گردد.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-all"
              >
                تایید نهایی و پرداخت {formatToman(grandTotal)}
              </button>
            </form>
          ) : (
            /* Items List View */
            <div className="space-y-4">
              
              {/* Product items */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex gap-3 items-center relative"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-stone-900 truncate">
                        {item.product.name}
                      </h4>
                      <span className="text-[11px] text-[#2D5A27] font-semibold block mt-0.5">
                        {formatToman(item.product.price)}
                      </span>

                      {item.giftCardMessage && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mt-1 border border-amber-200">
                          <Mail className="w-3 h-3" />
                          دارای کارت هدیه دست‌نویس
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-stone-100 rounded text-stone-600 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1.5">
                        {toPersianDigits(item.quantity)}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-stone-100 rounded text-stone-600 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery method selector */}
              <div className="border-t border-stone-200 pt-3 space-y-2">
                <label className="block text-xs font-bold text-stone-700">
                  روش و زمان ارسال:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDeliveryMethod('snap')}
                    className={`p-2 rounded-xl text-xs font-bold border text-right cursor-pointer transition-all ${
                      deliveryMethod === 'snap'
                        ? 'border-[#2D5A27] bg-[#2D5A27]/5 text-[#2D5A27] ring-1 ring-[#2D5A27]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="block font-bold">🚀 اکسپرس اسنپ</span>
                    <span className="text-[10px] text-stone-500">تحویل ۲ ساعته درون‌شهری</span>
                  </button>

                  <button
                    onClick={() => setDeliveryMethod('tipax')}
                    className={`p-2 rounded-xl text-xs font-bold border text-right cursor-pointer transition-all ${
                      deliveryMethod === 'tipax'
                        ? 'border-[#2D5A27] bg-[#2D5A27]/5 text-[#2D5A27] ring-1 ring-[#2D5A27]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <span className="block font-bold">📦 ارسال تیپاکس</span>
                    <span className="text-[10px] text-stone-500">سراسر کشور (۲۴-۴۸ ساعت)</span>
                  </button>
                </div>

                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-700 font-semibold focus:outline-hidden"
                >
                  <option>امروز - بازه ۱۴ تا ۱۷ (اکسپرس)</option>
                  <option>امروز - بازه ۱۸ تا ۲۱ (غروب)</option>
                  <option>فردا صبح - بازه ۹ تا ۱۲</option>
                  <option>فردا عصر - بازه ۱۶ تا ۲۰</option>
                </select>
              </div>

              {/* Promo Code input */}
              <form onSubmit={handleApplyPromo} className="border-t border-stone-200 pt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="کد تخفیف (مثال: GOLARYS5)"
                    className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs uppercase focus:bg-white focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-[#D4AF37] hover:bg-[#BF9B2D] text-[#1F3F1B] font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    اعمال
                  </button>
                </div>
                {appliedPromo && (
                  <span className="text-[11px] text-emerald-700 font-bold mt-1 block">
                    ✓ کد {appliedPromo.code} با {toPersianDigits(appliedPromo.percent)}٪ تخفیف اعمال شد.
                  </span>
                )}
              </form>

            </div>
          )}

        </div>

        {/* Drawer Bottom Action Bar */}
        {cart.length > 0 && !orderCompleted && !isCheckingOut && (
          <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>جمع کل اقلام:</span>
                <span>{formatToman(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>تخفیف:</span>
                  <span>- {formatToman(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-600">
                <span>هزینه ارسال:</span>
                <span>{shippingCost === 0 ? 'رایگان' : formatToman(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-sm font-black text-[#1F3F1B] pt-2 border-t border-stone-200">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="font-heading text-base text-[#2D5A27]">{formatToman(grandTotal)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutModalOpen(true);
              }}
              className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>تکمیل اطلاعات و پرداخت سفارش</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
