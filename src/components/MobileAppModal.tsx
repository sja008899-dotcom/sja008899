import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Download, 
  Smartphone, 
  Apple, 
  CheckCircle2, 
  Sparkles, 
  Share2, 
  PlusSquare, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  ChevronLeft,
  AlertTriangle,
  MoreVertical,
  Layers
} from 'lucide-react';
import { GolarysLogo } from './GolarysLogo';
import { toPersianDigits } from '../lib/formatters';

export const MobileAppModal: React.FC = () => {
  const { isMobileAppModalOpen, setIsMobileAppModalOpen, showToast } = useApp();
  const [activePlatform, setActivePlatform] = useState<'ios' | 'android'>('android');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleNativeInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
          showToast('اپلیکیشن گل آریس با موفقیت نصب شد.', 'success');
          setIsInstalled(true);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error(err);
      }
    } else {
      showToast('لطفاً در کروم روی منوی ۳ نقطه (⋮) و سپس «نصب برنامه» یا «افزودن به صفحه اصلی» بزنید.', 'info');
    }
  };

  if (!isMobileAppModalOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      showToast('لینک وب‌اپلیکیشن در کلیپ‌بورد کپی شد.', 'success');
    } catch {
      showToast('خطا در کپی لینک.', 'error');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setIsMobileAppModalOpen(false)}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Luxury Brand Background */}
        <div className="bg-gradient-to-r from-[#172E14] to-[#2D5A27] text-white p-6 sm:p-8 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
          
          <button
            onClick={() => setIsMobileAppModalOpen(false)}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="بستن پنجره"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-right relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-[#032e1b] p-1.5 shadow-xl border-2 border-[#D4AF37] shrink-0 flex items-center justify-center overflow-hidden">
              <img 
                src="/logo-gold.png?v=20260904_2" 
                alt="لوگوی رسمی گل آریس" 
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                  اپلیکیشن اختصاصی گل آریس
                </h3>
                <span className="text-[10px] font-bold bg-[#D4AF37] text-[#172E14] px-2 py-0.5 rounded-full">
                  نسخه ۲.۰
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                خرید سریع گل‌های تازه، سفارش آنلاین گلدان‌های سرامیکی و دریافت تصاویر قبل از ارسال
              </p>
            </div>
          </div>

          {/* Platform Tabs */}
          <div className="flex rounded-xl bg-black/20 p-1 mt-6 max-w-xs mx-auto sm:mx-0">
            <button
              onClick={() => setActivePlatform('ios')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activePlatform === 'ios' 
                  ? 'bg-white text-[#172E14] shadow-sm' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Apple className="w-4 h-4" />
              <span>نسخه iOS (آیفون)</span>
            </button>
            <button
              onClick={() => setActivePlatform('android')}
              className={`flex-1 py-2 px-4 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activePlatform === 'android' 
                  ? 'bg-white text-[#172E14] shadow-sm' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>نسخه اندروید</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {activePlatform === 'ios' ? (
            <div className="space-y-6">
              {/* iOS Feature Banner */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4.5 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Apple className="w-5 h-5 text-stone-900" />
                  <h4>راهنمای نصب نسخه iOS بدون محدودیت تحریم اپ استور (PWA WebApp)</h4>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  با انجام این ۳ مرحله ساده در مرورگر Safari آیفون یا آیپد، آیکون اختصاصی گل آریس مانند یک برنامه اصلی در صفحه اصلی گوشی شما قرار می‌گیرد و بدون نیاز به اینترنت پرسرعت باز می‌شود:
                </p>

                <div className="space-y-2.5 pt-1 text-xs text-stone-700">
                  <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-amber-100">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      {toPersianDigits(1)}
                    </div>
                    <div>
                      <span className="font-bold text-stone-900">مرحله اول: </span>
                      در نوار پایین مرورگر <strong>سافاری (Safari)</strong> روی دکمه <strong>Share <Share2 className="w-3.5 h-3.5 inline text-blue-600" /></strong> بزنید.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-amber-100">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      {toPersianDigits(2)}
                    </div>
                    <div>
                      <span className="font-bold text-stone-900">مرحله دوم: </span>
                      در منوی باز شده به پایین اسکرول کرده و گزینه <strong>Add to Home Screen <PlusSquare className="w-3.5 h-3.5 inline text-stone-700" /></strong> را انتخاب کنید.
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-amber-100">
                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      {toPersianDigits(3)}
                    </div>
                    <div>
                      <span className="font-bold text-stone-900">مرحله سوم: </span>
                      در بالای صفحه سمت راست روی دکمه <strong>Add</strong> بزنید تا اپلیکیشن نصب شود.
                    </div>
                  </div>
                </div>
              </div>

              {/* Xcode Project / App Store Notice */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <h5 className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>پروژه رسمی Xcode و سورس نیتیو Capacitor iOS</span>
                  </h5>
                  <p className="text-[11px] text-stone-500">
                    سورس کد کامل Xcode در پوشه <code className="bg-stone-200 px-1 rounded font-mono text-[10px]">/ios/App</code> با شناسه <code className="text-[#2D5A27] font-bold">ir.golarys.app</code> آماده کامپایل و انتشار در App Store Connect است.
                  </p>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 bg-stone-900 hover:bg-black text-white text-xs font-bold rounded-xl shrink-0 transition-colors cursor-pointer"
                >
                  کپی آدرس سایت
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Primary Recommended Method: Instant PWA Install (No Parse Error) */}
              <div className="bg-gradient-to-br from-emerald-900 to-[#172E14] text-white p-5 sm:p-6 rounded-2xl shadow-lg relative overflow-hidden space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-[#D4AF37] text-[#172E14] flex items-center justify-center font-black text-sm shadow-md">
                      ✓
                    </span>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-white">
                        روش ۱ (پیشنهادی و تضمینی): نصب فوری با یک لمس
                      </h4>
                      <p className="text-[11px] text-emerald-200">
                        بدون خطای تجزیه، بدون نیاز به دانلود فایل حجیم، سازگار با ۱۰۰٪ گوشی‌های اندروید
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-white/20 text-emerald-100 px-2.5 py-1 rounded-full">
                    تست‌شده
                  </span>
                </div>

                {isInstalled ? (
                  <div className="bg-white/10 border border-white/20 p-3 rounded-xl flex items-center gap-2 text-xs text-white">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>اپلیکیشن گل آریس هم‌اکنون روی دستگاه شما نصب است و در حالت تمام‌صفحه اجرا می‌شود.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {deferredPrompt ? (
                      <button
                        onClick={handleNativeInstall}
                        className="w-full py-3 bg-[#D4AF37] hover:bg-[#b8972e] text-[#172E14] font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all active:scale-98"
                      >
                        <Download className="w-5 h-5" />
                        <span>نصب مستقیم اپلیکیشن گل آریس روی گوشی</span>
                      </button>
                    ) : (
                      <div className="bg-black/30 backdrop-blur-xs border border-white/10 p-3.5 rounded-xl text-xs space-y-2.5">
                        <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
                          <MoreVertical className="w-4 h-4" />
                          <span>نحوه نصب در ۲ ثانیه با مرورگر کروم گوشی:</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-200 text-[11px]">
                          <div className="bg-white/5 p-2.5 rounded-lg flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#172E14] flex items-center justify-center font-bold text-[10px] shrink-0">۱</span>
                            <span>روی <strong>۳ نقطه بالای کروم (⋮)</strong> بزنید.</span>
                          </div>
                          <div className="bg-white/5 p-2.5 rounded-lg flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#172E14] flex items-center justify-center font-bold text-[10px] shrink-0">۲</span>
                            <span>گزینه <strong>«نصب برنامه»</strong> یا <strong>«افزودن به صفحه اصلی»</strong> را لمس کنید.</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Troubleshooting Note: Parse Error */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs space-y-2 text-amber-950">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>راهنمای رفع خطای «مشکل در تجزیه و تحلیل بسته» (Parse Error):</span>
                </div>
                <p className="text-[11px] text-stone-700 leading-relaxed">
                  اگر هنگام باز کردن فایل دانلودی با پیغام <em>«There was a problem parsing the package»</em> مواجه شدید، به این دلیل است که سیستم امنیتی اندروید برای جلوگیری از ویروس، بسته‌های متفرقه دانلودشده را مسدود می‌کند. <strong>بهترین و بدون خطاترین راه</strong>، استفاده از <strong>روش ۱ (نصب فوری با کروم)</strong> در بالا است که بدون هیچ خطایی آیکون طلایی گل آریس را به گوشی شما اضافه می‌کند.
                </p>
              </div>

              {/* Other Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Direct APK */}
                <div className="border border-stone-200 bg-stone-50 hover:bg-white rounded-2xl p-5 space-y-3 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#2D5A27] text-white flex items-center justify-center">
                    <Download className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">دانلود فایل خام نصبی APK</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    مخصوص گوشی‌هایی که اجازه نصب پکیج‌های توسعه‌دهنده دارند
                  </p>
                  <a
                    href="/Golarys.apk"
                    download="Golarys.apk"
                    onClick={() => showToast('در حال شروع دانلود فایل Golarys.apk...', 'success')}
                    className="w-full py-2.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>دانلود مستقیم فایل Golarys.apk</span>
                  </a>
                </div>

                {/* Cafe Bazaar / Store */}
                <div className="border border-stone-200 bg-stone-50 hover:bg-white rounded-2xl p-5 space-y-3 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">کافه بازار و مایکت</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    دریافت خودکار از مارکت‌های رسمی با تاییدیه امنیت گوگل‌پلی پروتکت
                  </p>
                  <button
                    onClick={() => showToast('لینک کافه‌بازار و مایکت پس از انتشار سراسری فعال خواهد شد.', 'info')}
                    className="w-full py-2.5 bg-stone-800 hover:bg-stone-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <span>صفحه کافه بازار گل آریس</span>
                  </button>
                </div>
              </div>

              {/* Android Native Features */}
              <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-2xl p-4 text-xs text-emerald-950 space-y-2">
                <h5 className="font-bold flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-700" />
                  <span>امکانات نسخه بومی اندروید:</span>
                </h5>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-700 pt-1">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>دریافت نوتیفیکیشن وضعیت عکاسی و ارسال</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>پرداخت سریع با رمز دوم پویا و شاپرک</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>رهگیری زنده موقعیت راننده روی نقشه</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>عملکرد سریع حتی با سرعت اینترنت پایین</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>پشتیبانی آنلاین ۲۴ ساعته: ۰۹۱۲۳۴۵۶۷۸۹</span>
          </div>
          <button
            onClick={() => setIsMobileAppModalOpen(false)}
            className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold rounded-xl transition-colors cursor-pointer"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
