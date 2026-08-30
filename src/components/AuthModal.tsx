import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Phone, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  MapPin, 
  User as UserIcon
} from 'lucide-react';
import { GolarysLogo } from './GolarysLogo';
import { toPersianDigits, toEnglishDigits, sanitizePersianPhone } from '../lib/formatters';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    sendOtp, 
    verifyOtp, 
    user, 
    logoutUser, 
    showToast 
  } = useApp();

  const [authStep, setAuthStep] = useState<'input_phone' | 'verify_otp' | 'complete_profile'>('input_phone');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('تهران');
  const [address, setAddress] = useState('');
  
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [canResend, setCanResend] = useState(false);

  // OTP Countdown timer
  useEffect(() => {
    let interval: any = null;
    if (authStep === 'verify_otp' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setCanResend(true);
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [authStep, timerSeconds]);

  if (!isAuthModalOpen) return null;

  const currentTarget = authMethod === 'phone' ? sanitizePersianPhone(phoneNumber) : emailAddress.trim();

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === 'phone') {
      const cleanPhone = sanitizePersianPhone(phoneNumber);
      if (cleanPhone.length !== 11 || !cleanPhone.startsWith('09')) {
        showToast('لطفاً شماره موبایل معتبر ۱۱ رقمی (مانند ۰۹۱۲۳۴۵۶۷۸۹) وارد کنید.', 'error');
        return;
      }
    } else {
      if (!emailAddress.includes('@') || !emailAddress.includes('.')) {
        showToast('لطفاً یک آدرس ایمیل معتبر وارد فرمایید.', 'error');
        return;
      }
    }

    setIsLoading(true);
    const result = await sendOtp(currentTarget, authMethod);
    setIsLoading(false);

    if (result.success) {
      setTimerSeconds(result.expiresIn || 120);
      setCanResend(false);
      setAuthStep('verify_otp');
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanOtp = toEnglishDigits(otpCode).trim();
    if (!cleanOtp || cleanOtp.length !== 5) {
      showToast('لطفاً کد تایید ۵ رقمی را کامل وارد کنید.', 'error');
      return;
    }

    setIsLoading(true);
    const success = await verifyOtp(currentTarget, cleanOtp, fullName, city, address);
    setIsLoading(false);

    if (success) {
      // Reset form
      setAuthStep('input_phone');
      setOtpCode('');
      setIsAuthModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-gradient-to-l from-[#1F3F1B] to-[#2D5A27] text-white p-6 relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <GolarysLogo size="sm" iconOnly={true} variant="light" />
            <div>
              <h3 className="text-lg font-black font-heading text-white">
                {user ? 'حساب کاربری شما' : 'ورود یا ثبت‌نام در گل آریس'}
              </h3>
              <p className="text-xs text-stone-200 mt-0.5">
                {user ? `خوش آمدید، ${user.fullName}` : 'دسترسی امن به پیگیری سفارش‌ها و فاکتورها'}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {user ? (
            /* Logged in User Profile Overview */
            <div className="space-y-5">
              <div className="bg-[#2D5A27]/5 border border-[#2D5A27]/20 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#2D5A27] text-[#D4AF37] flex items-center justify-center font-bold text-lg">
                    {user.fullName ? user.fullName.charAt(0) : 'U'}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                      {user.fullName}
                    </h4>
                    <p className="text-xs text-stone-500 dir-ltr text-right">
                      {user.phone || user.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-stone-200">
                  <div>
                    <span className="text-stone-500 block">شهر سکونت:</span>
                    <span className="font-bold text-stone-800">{user.city || 'تهران'}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">ایمیل:</span>
                    <span className="font-bold text-stone-800 truncate block">{user.email || 'ثبت نشده'}</span>
                  </div>
                </div>

                {user.address && (
                  <div className="text-xs pt-2 border-t border-stone-200">
                    <span className="text-stone-500 block">آدرس تحویل گل:</span>
                    <p className="text-stone-800 font-medium mt-0.5">{user.address}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsAuthModalOpen(false)}
                  className="flex-1 py-3 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  تایید و ادامه خرید
                </button>
                <button
                  onClick={logoutUser}
                  className="px-4 py-3 bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-700 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  خروج از حساب
                </button>
              </div>
            </div>
          ) : (
            /* Auth Steps */
            <>
              {authStep === 'input_phone' && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  {/* Method selector */}
                  <div className="flex p-1 bg-stone-100 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setAuthMethod('phone')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        authMethod === 'phone'
                          ? 'bg-white text-[#2D5A27] shadow-xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>شماره موبایل (پیامک)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAuthMethod('email')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        authMethod === 'email'
                          ? 'bg-white text-[#2D5A27] shadow-xs'
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>آدرس ایمیل</span>
                    </button>
                  </div>

                  {authMethod === 'phone' ? (
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        شماره همراه خود را وارد نمایید:
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          inputMode="numeric"
                          autoComplete="tel"
                          placeholder="09123456789"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full pl-4 pr-10 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                        />
                        <Phone className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">
                        کد تایید ۵ رقمی اختصاصی از طریق سرور پیامکی برای شما ارسال خواهد شد.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-xs font-bold text-stone-700 mb-1.5">
                        ایمیل خود را وارد نمایید:
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          dir="ltr"
                          placeholder="example@gmail.com"
                          value={emailAddress}
                          onChange={(e) => setEmailAddress(e.target.value)}
                          className="w-full pl-4 pr-10 py-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-bold text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                        />
                        <Mail className="w-4 h-4 text-stone-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isLoading ? 'در حال ارسال کد...' : 'دریافت کد تایید'}</span>
                    <ArrowRight className="w-4 h-4 rotate-180" />
                  </button>
                </form>
              )}

              {authStep === 'verify_otp' && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-bold text-[#2D5A27] bg-[#2D5A27]/10 px-3 py-1 rounded-full inline-block">
                      کد تایید پیامکی ارسال شد
                    </span>
                    <p className="text-xs text-stone-600">
                      کد تایید ۵ رقمی ارسال شده به{' '}
                      <span className="font-bold text-stone-900 dir-ltr inline-block">
                        {currentTarget}
                      </span>{' '}
                      را وارد نمایید:
                    </p>
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      dir="ltr"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      autoComplete="one-time-code"
                      placeholder="• • • • •"
                      value={otpCode}
                      onChange={(e) => setOtpCode(toEnglishDigits(e.target.value).replace(/\D/g, ''))}
                      className="w-full py-3 text-center tracking-[0.6em] text-2xl font-black font-mono bg-stone-50 border border-stone-300 rounded-xl text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D5A27]"
                      autoFocus
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <button
                      type="button"
                      onClick={() => setAuthStep('input_phone')}
                      className="text-stone-600 hover:text-stone-900 underline cursor-pointer"
                    >
                      ویرایش شماره / ایمیل
                    </button>

                    {canResend ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[#2D5A27] font-bold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>ارسال مجدد کد</span>
                      </button>
                    ) : (
                      <span>
                        ارسال مجدد تا {toPersianDigits(Math.floor(timerSeconds / 60))}:{toPersianDigits(timerSeconds % 60 < 10 ? '0' + (timerSeconds % 60) : (timerSeconds % 60))}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || otpCode.length < 5}
                    className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isLoading ? 'در حال اعتبارسنجی...' : 'تایید و ورود به سیستم'}</span>
                  </button>
                </form>
              )}
            </>
          )}

          {/* Privacy & Trust Badge */}
          <div className="pt-3 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-400">
            <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
            <span>حریم خصوصی شما در سرور رمزنگاری شده محفوظ است.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
