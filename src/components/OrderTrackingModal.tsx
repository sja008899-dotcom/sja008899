import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  Heart, 
  Calendar, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  FileText, 
  Sparkles, 
  Flower2,
  Camera,
  ThumbsUp,
  MessageSquare,
  Eye,
  Check,
  AlertCircle
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { toPersianDigits } from '../lib/formatters';

export const OrderTrackingModal: React.FC = () => {
  const { 
    isTrackingModalOpen, 
    setIsTrackingModalOpen, 
    orders, 
    findOrderByTracking,
    approvePreDispatchPhoto,
    showToast
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [feedbackText, setFeedbackText] = useState('');
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  if (!isTrackingModalOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      showToast('لطفاً کد پیگیری یا شماره تماس را وارد کنید.', 'error');
      return;
    }
    const found = findOrderByTracking(searchQuery);
    if (found) {
      setSelectedOrder(found);
      showToast(`سفارش با کد ${found.trackingCode} یافت شد.`, 'success');
    } else {
      showToast('سفارشی با این مشخصات یافت نشد.', 'error');
    }
  };

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'paid': return 1;
      case 'preparing': return 2;
      case 'gift_wrapping': return 3;
      case 'delivering': return 4;
      case 'delivered': return 5;
      default: return 1;
    }
  };

  const currentStep = selectedOrder ? getStatusStepIndex(selectedOrder.status) : 1;

  const steps = [
    { title: 'ثبت و تایید پرداخت', desc: 'سفارش در سیستم ثبت و به گلخانه ارجاع شد' },
    { title: 'برش و گل‌آرایی', desc: 'چینش گل‌های تازه و گلدان در کارگاه' },
    { title: 'بسته‌بندی و کارت هدیه', desc: 'پلمپ هدیه با مُهر طلایی گل آریس' },
    { title: 'تحویل به سفیر و ارسال', desc: 'در مسیر تحویل به گیرنده با پیک مجهز' },
    { title: 'تحویل نهایی', desc: 'سفارش با موفقیت تقدیم گردید' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="bg-gradient-to-l from-[#1F3F1B] to-[#2D5A27] text-white p-5 sm:p-6 relative">
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Truck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black font-heading text-white">
                سامانه رهگیری لحظه‌ای سفارش گل آریس
              </h3>
              <p className="text-xs text-stone-200">
                پیگیری موقعیت و مراحل آماده‌سازی گل، گیاه و صنایع دستی
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="کد پیگیری سفارش (مانند GLR-123456) یا شماره موبایل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-3 bg-stone-50 border border-stone-300 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="px-5 py-3 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer shrink-0"
            >
              پیگیری سفارش
            </button>
          </form>

          {selectedOrder ? (
            <div className="space-y-6">
              
              {/* Order Status Banner */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
                  <div>
                    <div className="text-xs text-stone-500">کد پیگیری یکتا:</div>
                    <div className="text-base font-black text-[#2D5A27] font-mono tracking-wider">
                      {selectedOrder.trackingCode}
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-xs text-stone-500">تاریخ ثبت:</div>
                    <div className="text-xs font-bold text-stone-800 font-mono">
                      {selectedOrder.createdAt}
                    </div>
                  </div>

                  {selectedOrder.rrn && (
                    <div className="text-left">
                      <div className="text-xs text-stone-500">شماره مرجع شاپرک:</div>
                      <div className="text-xs font-bold text-stone-800 font-mono">
                        {selectedOrder.rrn}
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Steps Timeline */}
                <div className="py-2">
                  <div className="relative">
                    <div className="absolute top-4 right-4 left-4 h-1 bg-stone-200 -z-0">
                      <div 
                        className="h-full bg-emerald-600 transition-all duration-500"
                        style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                      />
                    </div>

                    <div className="flex justify-between relative z-10">
                      {steps.map((step, idx) => {
                        const stepNum = idx + 1;
                        const isDone = stepNum <= currentStep;
                        const isCurrent = stepNum === currentStep;

                        return (
                          <div key={idx} className="flex flex-col items-center text-center max-w-[70px] sm:max-w-[100px]">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                                isDone
                                  ? 'bg-emerald-600 text-white shadow-md ring-4 ring-emerald-100'
                                  : 'bg-stone-200 text-stone-500'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                toPersianDigits(stepNum)
                              )}
                            </div>
                            <span className={`text-[10px] sm:text-xs font-bold mt-2 ${isCurrent ? 'text-[#2D5A27]' : 'text-stone-700'}`}>
                              {step.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

              </div>

              {/* Pre-dispatch Product Photo Inspection Section */}
              {selectedOrder.sendPreDispatchPhoto && (
                <div className="bg-gradient-to-br from-amber-500/10 via-emerald-900/5 to-[#2D5A27]/10 border-2 border-[#D4AF37]/50 rounded-2xl p-5 space-y-4 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-[#D4AF37] flex items-center justify-center shadow-xs">
                        <Camera className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-stone-900 flex items-center gap-2">
                          <span>عکس محصول گل‌آرایی شده قبل از ارسال</span>
                          <span className="text-[10px] bg-[#2D5A27] text-white px-2 py-0.5 rounded-full font-bold">
                            تضمین تطابق ۱۰۰٪
                          </span>
                        </h4>
                        <p className="text-[11px] text-stone-600">
                          عکس آماده‌شده توسط گلفروش جهت بررسی و تایید شما قبل از بسته‌بندی نهایی
                        </p>
                      </div>
                    </div>

                    {selectedOrder.preDispatchPhotoApproved ? (
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-emerald-300">
                        <Check className="w-3.5 h-3.5" />
                        تایید شده توسط شما
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-amber-300 animate-pulse">
                        <AlertCircle className="w-3.5 h-3.5" />
                        منتظر تایید نهایی شما
                      </span>
                    )}
                  </div>

                  {/* Photo Display Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                    <div className="sm:col-span-5 relative group rounded-2xl overflow-hidden border-2 border-white shadow-md aspect-4/3 cursor-pointer bg-stone-900" onClick={() => setIsPhotoZoomed(true)}>
                      <img
                        src={selectedOrder.preDispatchPhotoUrl || selectedOrder.items[0]?.product?.image}
                        alt="عکس واقعی گل قبل از تحویل به پیک"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>بزرگ‌نمایی عکس اصلی</span>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                        عکاسی شده در گلخانه
                      </div>
                    </div>

                    <div className="sm:col-span-7 space-y-3">
                      <div className="text-xs text-stone-700 leading-relaxed bg-white/80 p-3 rounded-xl border border-stone-200">
                        <p className="font-bold text-[#1F3F1B] mb-1">🌿 گزارش کیفیت گل‌آرایی:</p>
                        <ul className="space-y-1 text-[11px] text-stone-600 list-disc list-inside">
                          <li>طراوت ساقه‌ها و شادابی غنچه‌ها بازرسی شد.</li>
                          <li>کارت پستال و بسته‌بندی ضدضربه آماده شده است.</li>
                          <li>ارسال با هماهنگی به مقصد: <strong>{selectedOrder.recipientCity}</strong></li>
                        </ul>
                      </div>

                      {/* Approval Actions */}
                      {!selectedOrder.preDispatchPhotoApproved ? (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => approvePreDispatchPhoto(selectedOrder.id, true)}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <ThumbsUp className="w-4 h-4 text-[#D4AF37]" />
                              <span>تایید گل‌آرایی و ارسال به پیک</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setShowFeedbackInput(!showFeedbackInput)}
                              className="py-2.5 px-3 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4 text-amber-600" />
                              <span>درخواست تغییر</span>
                            </button>
                          </div>

                          {showFeedbackInput && (
                            <div className="pt-2 space-y-2">
                              <textarea
                                rows={2}
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder="مثلاً: لطفاً روبان قرمز اضافه شود یا چینش گل رز متراکم‌تر باشد..."
                                className="w-full p-2 bg-white border border-amber-300 rounded-xl text-xs focus:ring-2 focus:ring-[#2D5A27] focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (!feedbackText.trim()) {
                                    showToast('لطفاً نظر یا تغییر مورد نظر خود را بنویسید.', 'error');
                                    return;
                                  }
                                  approvePreDispatchPhoto(selectedOrder.id, false, feedbackText);
                                  setShowFeedbackInput(false);
                                  setFeedbackText('');
                                }}
                                className="w-full py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
                              >
                                ارسال نظر اصلاحی به گلفروش
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <span>شما گل‌آرایی را تایید کرده‌اید. سفارش در حال تحویل به سفیر اسنپ است.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Lightbox Zoom Modal */}
              {isPhotoZoomed && (
                <div 
                  className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
                  onClick={() => setIsPhotoZoomed(false)}
                >
                  <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setIsPhotoZoomed(false)}
                      className="absolute -top-12 left-0 p-2 text-white hover:text-amber-400 bg-white/10 rounded-full"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <img
                      src={selectedOrder.preDispatchPhotoUrl || selectedOrder.items[0]?.product?.image}
                      alt="عکس بزرگنمایی شده گل"
                      className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border-2 border-white/20"
                    />
                    <div className="mt-3 text-center text-white text-xs">
                      عکس با کیفیت بالا ارسالی از کارگاه گل‌آرایی گل آریس
                    </div>
                  </div>
                </div>
              )}

              {/* Order Items Detail */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 space-y-3">
                <h4 className="font-black text-stone-900 text-xs sm:text-sm flex items-center gap-2 border-b border-stone-100 pb-2">
                  <Flower2 className="w-4 h-4 text-[#2D5A27]" />
                  <span>اقلام سفارش داده شده</span>
                </h4>

                <div className="space-y-3">
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-2 border-b border-stone-100 last:border-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="flex-1">
                        <h5 className="text-xs sm:text-sm font-bold text-stone-900">
                          {item.product.name}
                        </h5>
                        <p className="text-[11px] text-stone-500">
                          تعداد: {toPersianDigits(item.quantity)} عدد | غرفه: {item.product.vendor.name}
                        </p>
                        {item.giftCardMessage && (
                          <div className="mt-1 p-2 bg-amber-50 rounded-lg text-[10px] text-amber-900 border border-amber-200">
                            <strong>پیام کارت هدیه:</strong> «{item.giftCardMessage}»
                          </div>
                        )}
                      </div>
                      <div className="text-left font-mono font-bold text-xs sm:text-sm text-stone-800">
                        {(item.product.price * item.quantity).toLocaleString('fa-IR')} تومان
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery & Recipient Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs space-y-2">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
                    <MapPin className="w-4 h-4 text-[#2D5A27]" />
                    <span>مشخصات تحویل‌گیرنده</span>
                  </div>
                  <div><span className="text-stone-500">گیرنده:</span> <strong className="text-stone-800">{selectedOrder.recipientName}</strong></div>
                  <div><span className="text-stone-500">شماره تماس:</span> <strong className="text-stone-800 dir-ltr inline-block">{selectedOrder.recipientPhone}</strong></div>
                  <div><span className="text-stone-500">شهر و آدرس:</span> <span className="text-stone-800">{selectedOrder.recipientCity}، {selectedOrder.recipientAddress}</span></div>
                </div>

                <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs space-y-2">
                  <div className="font-bold text-stone-900 flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
                    <Clock className="w-4 h-4 text-[#2D5A27]" />
                    <span>زمانبندی و فاکتور نهایی</span>
                  </div>
                  <div><span className="text-stone-500">تاریخ ارسال:</span> <strong className="text-stone-800">{selectedOrder.deliveryDate}</strong></div>
                  <div><span className="text-stone-500">بازه تحویل:</span> <strong className="text-stone-800">{selectedOrder.deliveryTimeSlot}</strong></div>
                  <div>
                    <span className="text-stone-500">مبلغ پرداخت شده:</span>{' '}
                    <strong className="text-[#2D5A27] font-bold font-mono text-sm">
                      {selectedOrder.finalAmount.toLocaleString('fa-IR')} تومان
                    </strong>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-10 space-y-3 bg-stone-50 rounded-2xl border border-stone-200">
              <Package className="w-12 h-12 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500">
                هنوز سفارشی انتخاب یا ثبت نشده است. برای پیگیری، کد پیگیری پیامک شده را در کادر بالا جستجو کنید.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
