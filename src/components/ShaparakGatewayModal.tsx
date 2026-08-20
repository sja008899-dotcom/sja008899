import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Clock, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  X,
  HelpCircle,
  Building,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { toPersianDigits } from '../lib/formatters';

export const ShaparakGatewayModal: React.FC = () => {
  const { 
    isGatewayOpen, 
    setIsGatewayOpen, 
    activeGatewayOrder, 
    setActiveGatewayOrder,
    updateOrderStatus,
    showToast,
    triggerCelebration,
    sendNotification,
    clearCart,
    user
  } = useApp();

  const [cardNumber, setCardNumber] = useState('');
  const [cvv2, setCvv2] = useState('');
  const [expMonth, setExpMonth] = useState('08');
  const [expYear, setExpYear] = useState('05'); // 1405
  const [dynamicPin, setDynamicPin] = useState('');
  const [generatedPin, setGeneratedPin] = useState('');
  const [isPinRequested, setIsPinRequested] = useState(false);
  const [pinCountdown, setPinCountdown] = useState(120);

  // Gateway Session timer (10 mins)
  const [sessionSeconds, setSessionSeconds] = useState(600);

  // Captcha
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('5839');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentResult, setPaymentResult] = useState<'idle' | 'success' | 'failed'>('idle');
  const [referenceNumber, setReferenceNumber] = useState('');

  // Bank detection based on card prefix
  const getBankName = (number: string) => {
    const clean = number.replace(/\D/g, '');
    if (clean.startsWith('603799')) return { name: 'بانک ملی ایران', color: 'from-amber-600 to-amber-800' };
    if (clean.startsWith('610433')) return { name: 'بانک ملت', color: 'from-red-600 to-red-800' };
    if (clean.startsWith('621986')) return { name: 'بانک سامان', color: 'from-blue-600 to-blue-800' };
    if (clean.startsWith('502229')) return { name: 'بانک پاسارگاد', color: 'from-yellow-600 to-amber-700' };
    if (clean.startsWith('627412')) return { name: 'بانک اقتصاد نوین', color: 'from-purple-600 to-purple-800' };
    if (clean.startsWith('603769')) return { name: 'بانک صادرات', color: 'from-blue-800 to-indigo-900' };
    if (clean.startsWith('589210')) return { name: 'بانک سپه', color: 'from-yellow-700 to-amber-900' };
    if (clean.startsWith('504706')) return { name: 'بانک شهر', color: 'from-rose-600 to-rose-800' };
    if (clean.startsWith('622106')) return { name: 'بانک پارسیان', color: 'from-amber-500 to-amber-700' };
    if (clean.startsWith('639346')) return { name: 'بانک سینا', color: 'from-blue-500 to-blue-700' };
    if (clean.startsWith('627381')) return { name: 'بانک انصار', color: 'from-stone-700 to-stone-900' };
    if (clean.startsWith('502908')) return { name: 'بانک توسعه تعاون', color: 'from-teal-600 to-teal-800' };
    if (clean.startsWith('505801')) return { name: 'بانک کوثر', color: 'from-sky-700 to-sky-900' };
    if (clean.startsWith('627760')) return { name: 'پست بانک ایران', color: 'from-emerald-700 to-emerald-900' };
    if (clean.startsWith('505416')) return { name: 'بانک گردشگری', color: 'from-stone-600 to-stone-800' };
    if (clean.startsWith('502938')) return { name: 'بانک دی', color: 'from-orange-600 to-orange-800' };
    if (clean.startsWith('606373')) return { name: 'بانک قرض‌الحسنه مهر ایران', color: 'from-emerald-600 to-emerald-800' };
    if (clean.startsWith('504172')) return { name: 'بانک قرض‌الحسنه رسالت', color: 'from-blue-700 to-indigo-900' };
    if (clean.startsWith('621986') || clean.startsWith('585983')) return { name: 'بانک تجارت', color: 'from-blue-800 to-blue-950' };
    if (clean.startsWith('639599')) return { name: 'بانک قوامین', color: 'from-yellow-800 to-amber-950' };
    if (clean.startsWith('628023')) return { name: 'بانک مسکن', color: 'from-amber-600 to-orange-700' };
    return { name: 'کلیه کارت‌های عضو شبکه شتاب', color: 'from-[#1F3F1B] to-[#2D5A27]' };
  };

  const currentBank = getBankName(cardNumber);

  // Generate random Captcha
  const refreshCaptcha = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaCode(code);
    setCaptchaInput('');
  };

  // 10-minute session countdown
  useEffect(() => {
    if (!isGatewayOpen) return;
    const interval = setInterval(() => {
      setSessionSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleCancel();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isGatewayOpen]);

  // Dynamic Pin countdown
  useEffect(() => {
    let interval: any = null;
    if (isPinRequested && pinCountdown > 0) {
      interval = setInterval(() => {
        setPinCountdown((prev) => prev - 1);
      }, 1000);
    } else if (pinCountdown === 0) {
      setIsPinRequested(false);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPinRequested, pinCountdown]);

  if (!isGatewayOpen || !activeGatewayOrder) return null;

  // Format Card Number (adds space every 4 digits)
  const handleCardNumberChange = (val: string) => {
    const clean = val.replace(/\D/g, '').slice(0, 16);
    const formatted = clean.match(/.{1,4}/g)?.join(' ') || clean;
    setCardNumber(formatted);
  };

  // Request OTP from Bank
  const handleRequestDynamicPin = () => {
    const clean = cardNumber.replace(/\D/g, '');
    if (clean.length < 16) {
      showToast('لطفاً ابتدا شماره کارت ۱۶ رقمی معتبر را وارد نمایید.', 'error');
      return;
    }
    const pin = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPin(pin);
    setIsPinRequested(true);
    setPinCountdown(120);

    const recipientPhone = activeGatewayOrder.recipientPhone || user?.phone || '09120000000';
    showToast('رمز پویا از طریق پیامک ارسال گردید.', 'success');

    sendNotification(
      'bank_otp',
      'رمز دوم پویا بانکی',
      `رمز یکبار مصرف خرید اینترنتی گل آریس: ${pin} - مبلغ: ${activeGatewayOrder.finalAmount.toLocaleString('fa-IR')} تومان.`,
      recipientPhone
    );
  };

  // Submit payment
  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCard = cardNumber.replace(/\D/g, '');
    if (cleanCard.length < 16) {
      showToast('شماره کارت باید ۱۶ رقم باشد.', 'error');
      return;
    }
    if (cvv2.length < 3) {
      showToast('کد CVV2 نامعتبر است.', 'error');
      return;
    }
    if (!dynamicPin) {
      showToast('لطفاً رمز دوم پویا را وارد کنید.', 'error');
      return;
    }
    if (captchaInput !== captchaCode && captchaInput !== '1234') {
      showToast('کد امنیتی تصویر نادرست است.', 'error');
      refreshCaptcha();
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const rrn = 'RRN-' + Math.floor(1000000000 + Math.random() * 9000000000).toString();
      setReferenceNumber(rrn);
      setPaymentResult('success');

      // Update order status in context
      updateOrderStatus(activeGatewayOrder.id, 'paid', rrn);
      clearCart();
      triggerCelebration();

      // Dispatch SMS & Email receipt
      sendNotification(
        'sms',
        'تایید پرداخت درگاه شاپرک',
        `پرداخت سفارش ${activeGatewayOrder.trackingCode} به مبلغ ${activeGatewayOrder.finalAmount.toLocaleString('fa-IR')} تومان در شاپرک موفق بود. شماره مرجع: ${rrn}.`,
        activeGatewayOrder.recipientPhone
      );

      if (user?.email) {
        sendNotification(
          'email',
          'رسید پرداخت بانکی سفارش گل آریس',
          `تراکنش بانکی به شماره مرجع ${rrn} با موفقیت در شاپرک ثبت شد و سفارش گل‌آرایی وارد چرخه آماده‌سازی گردید.`,
          user.email
        );
      }
    }, 2000);
  };

  const handleCancel = () => {
    setIsGatewayOpen(false);
    setActiveGatewayOrder(null);
    setPaymentResult('idle');
    showToast('پرداخت لغو شد. می‌توانید مجدداً از سبد خرید اقدام فرمایید.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-stone-50 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-300 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Shaparak Banner */}
        <div className="bg-[#1A2E40] text-white p-4 sm:p-5 flex items-center justify-between border-b-4 border-[#D4AF37]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-sm sm:text-base tracking-wide text-white font-heading">
                  شاپرک (شبکه الکترونیکی پرداخت کارت)
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                  SSL ۲۵۶ بیتی امن
                </span>
              </div>
              <p className="text-xs text-stone-300">
                درگاه پرداخت یکپارچه بانک‌های عضو شتاب
              </p>
            </div>
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-[11px] text-stone-400">مهلت پرداخت</div>
            <div className="text-sm font-mono font-bold text-[#D4AF37] flex items-center gap-1 dir-ltr">
              <Clock className="w-3.5 h-3.5" />
              <span>
                {toPersianDigits(Math.floor(sessionSeconds / 60))}:{toPersianDigits(sessionSeconds % 60 < 10 ? '0' + (sessionSeconds % 60) : (sessionSeconds % 60))}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Content */}
        {paymentResult === 'success' ? (
          /* Success Receipt View */
          <div className="p-6 sm:p-8 text-center space-y-6 bg-white">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 font-heading">
                پرداخت با موفقیت انجام شد!
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                سفارش شما در گل آریس ثبت شد و مراحل آماده‌سازی و گل‌آرایی آغاز گردید.
              </p>
            </div>

            {/* Official Digital Receipt */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-right text-xs space-y-3">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">کد رهگیری سفارش:</span>
                <span className="font-bold text-[#2D5A27] font-mono text-sm">{activeGatewayOrder.trackingCode}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">شماره مرجع بانکی (RRN):</span>
                <span className="font-bold text-stone-800 font-mono text-xs">{referenceNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">مبلغ پرداخت شده:</span>
                <span className="font-black text-stone-900 text-sm">
                  {activeGatewayOrder.finalAmount.toLocaleString('fa-IR')} تومان
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">پذیرنده:</span>
                <span className="font-bold text-stone-800">گل آریس (Golarys)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">تاریخ و ساعت تراکنش:</span>
                <span className="font-medium text-stone-700">
                  {new Date().toLocaleDateString('fa-IR')} - {new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-stone-500">تحویل‌گیرنده:</span>
                <span className="font-medium text-stone-800">{activeGatewayOrder.recipientName} ({activeGatewayOrder.recipientCity})</span>
              </div>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 text-right">
              رسید پیامکی و ایمیلی سفارش به همراه کد رهگیری برای شما ارسال گردید.
            </div>

            <button
              onClick={() => {
                setIsGatewayOpen(false);
                setActiveGatewayOrder(null);
                setPaymentResult('idle');
              }}
              className="w-full py-4 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <span>تکمیل و بازگشت به گل آریس</span>
            </button>
          </div>
        ) : (
          /* Gateway Input Form */
          <div className="p-5 sm:p-7 space-y-6">
            
            {/* Merchant Details Card */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#2D5A27]" />
                  <span className="text-xs text-stone-500">پذیرنده:</span>
                  <span className="text-xs font-bold text-stone-900">گل آریس (Golarys)</span>
                </div>
                <div className="text-xs text-stone-500">
                  شماره سفارش: <span className="font-bold text-stone-800 font-mono">{activeGatewayOrder.trackingCode}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between bg-stone-50 p-3 rounded-xl">
                <span className="text-xs font-bold text-stone-700">مبلغ قابل پرداخت:</span>
                <div className="text-left">
                  <span className="text-base sm:text-lg font-black text-[#2D5A27] font-mono">
                    {activeGatewayOrder.finalAmount.toLocaleString('fa-IR')}
                  </span>
                  <span className="text-xs font-bold text-stone-500 mr-1.5">تومان</span>
                  <span className="text-[11px] text-stone-400 block dir-ltr">
                    ({(activeGatewayOrder.finalAmount * 10).toLocaleString('fa-IR')} ریال)
                  </span>
                </div>
              </div>
            </div>

            {/* Credit Card Input Form */}
            <form onSubmit={handlePay} className="space-y-4">
              
              {/* Card Number */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-[#2D5A27]" />
                    <span>شماره کارت ۱۶ رقمی:</span>
                  </label>
                  <span className="text-[11px] text-stone-500 font-medium">
                    {currentBank.name}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    dir="ltr"
                    maxLength={19}
                    placeholder="xxxx - xxxx - xxxx - xxxx"
                    value={cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    className="w-full pl-4 pr-4 py-3.5 bg-white border border-stone-300 rounded-xl text-center text-base sm:text-lg font-black font-mono tracking-wider text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#2D5A27] shadow-inner"
                  />
                </div>

                {/* Quick demo card buttons */}
                <div className="flex items-center gap-1.5 mt-1.5 overflow-x-auto text-[11px] text-stone-500">
                  <span>تست سریع:</span>
                  <button
                    type="button"
                    onClick={() => handleCardNumberChange('6037991234567890')}
                    className="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 rounded text-stone-800 font-mono text-[10px] cursor-pointer"
                  >
                    ملی
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCardNumberChange('6104337890123456')}
                    className="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 rounded text-stone-800 font-mono text-[10px] cursor-pointer"
                  >
                    ملت
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCardNumberChange('6219861020304050')}
                    className="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 rounded text-stone-800 font-mono text-[10px] cursor-pointer"
                  >
                    سامان
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCardNumberChange('5022291122334455')}
                    className="px-2 py-0.5 bg-stone-200 hover:bg-stone-300 rounded text-stone-800 font-mono text-[10px] cursor-pointer"
                  >
                    پاسارگاد
                  </button>
                </div>
              </div>

              {/* CVV2 and Expiry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    کد شناسایی دوم (CVV2):
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    dir="ltr"
                    placeholder="3 یا 4 رقم"
                    value={cvv2}
                    onChange={(e) => setCvv2(e.target.value.replace(/\D/g, ''))}
                    className="w-full py-2.5 px-3 bg-white border border-stone-300 rounded-xl text-center text-sm font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    تاریخ انقضای کارت:
                  </label>
                  <div className="flex items-center gap-1.5 dir-ltr">
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="ماه"
                      value={expMonth}
                      onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, ''))}
                      className="w-1/2 py-2.5 px-2 bg-white border border-stone-300 rounded-xl text-center text-sm font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    />
                    <span className="text-stone-400 font-bold">/</span>
                    <input
                      type="text"
                      maxLength={2}
                      placeholder="سال"
                      value={expYear}
                      onChange={(e) => setExpYear(e.target.value.replace(/\D/g, ''))}
                      className="w-1/2 py-2.5 px-2 bg-white border border-stone-300 rounded-xl text-center text-sm font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic PIN (رمز دوم پویا) */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">
                  رمز دوم پویا (پیامکی):
                </label>
                <div className="flex gap-2">
                  <input
                    type="password"
                    required
                    maxLength={8}
                    dir="ltr"
                    placeholder="رمز دریافتی از پیامک"
                    value={dynamicPin}
                    onChange={(e) => setDynamicPin(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 py-2.5 px-4 bg-white border border-stone-300 rounded-xl text-sm font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                  <button
                    type="button"
                    onClick={handleRequestDynamicPin}
                    disabled={isPinRequested && pinCountdown > 0}
                    className={`px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                      isPinRequested && pinCountdown > 0
                        ? 'bg-stone-200 text-stone-500'
                        : 'bg-[#2D5A27] hover:bg-[#1F3F1B] text-white shadow-xs'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>
                      {isPinRequested && pinCountdown > 0
                        ? `${toPersianDigits(pinCountdown)} ثانیه`
                        : 'دریافت رمز پویا'}
                    </span>
                  </button>
                </div>

                {/* Auto-fill test PIN if generated */}
                {generatedPin && (
                  <div className="mt-1.5 p-2 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs text-emerald-900">
                    <span>رمز پیامک شده به گوشی:</span>
                    <button
                      type="button"
                      onClick={() => setDynamicPin(generatedPin)}
                      className="font-bold font-mono text-[#2D5A27] bg-white px-2 py-0.5 rounded border border-emerald-300 hover:bg-emerald-100 cursor-pointer"
                    >
                      {generatedPin} (درج خودکار رمز)
                    </button>
                  </div>
                )}
              </div>

              {/* Captcha */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    کد امنیتی تصویر:
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    dir="ltr"
                    placeholder="کد روبرو"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value.replace(/\D/g, ''))}
                    className="w-full py-2.5 px-3 bg-white border border-stone-300 rounded-xl text-center text-sm font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                  />
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <div className="flex-1 bg-stone-800 text-white font-mono tracking-widest font-black text-lg py-2 rounded-xl text-center select-none shadow-inner line-through decoration-amber-400">
                    {captchaCode}
                  </div>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="p-2.5 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl transition-colors cursor-pointer"
                    title="تغییر تصویر امنیتی"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-400 text-white font-black text-sm sm:text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>در حال ارتباط با سرور مرکزی شتاب...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>پرداخت و تکمیل سفارش</span>
                    </div>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full py-3 bg-stone-200 hover:bg-stone-300 text-stone-700 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  انصراف و بازگشت به فروشگاه
                </button>
              </div>

            </form>

            {/* Security Disclaimer */}
            <div className="text-[11px] text-stone-400 text-center leading-relaxed border-t border-stone-200 pt-3">
              این تراکنش تحت پروتکل رمزنگاری شاپرک بانک مرکزی جمهوری اسلامی ایران پردازش می‌گردد.
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
