import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Store, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Clock, 
  CheckCircle2, 
  ArrowLeft,
  Calculator,
  UserCheck,
  Building,
  UploadCloud
} from 'lucide-react';
import { VendorApplication } from '../types';
import { formatToman, toPersianDigits } from '../lib/formatters';

export const ForSellersView: React.FC = () => {
  const { siteContent, showToast, triggerCelebration } = useApp();
  const { sellers } = siteContent.site;

  // Interactive Profit Calculator State
  const [estimatedMonthlySales, setEstimatedMonthlySales] = useState<number>(20000000); // 20M Toman
  const commissionRate = 0.05; // 5%
  const estimatedCommission = Math.round(estimatedMonthlySales * commissionRate);
  const estimatedNetPayout = estimatedMonthlySales - estimatedCommission;

  // Application Form State
  const [form, setForm] = useState<VendorApplication>({
    fullName: '',
    shopName: '',
    type: 'local_florist',
    city: 'تهران',
    phone: '',
    email: '',
    experienceYears: 3,
    instagramHandle: '',
    note: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.shopName || !form.phone) {
      showToast('لطفاً اطلاعات ضروری فرم را پر کنید.', 'error');
      return;
    }
    setSubmitted(true);
    triggerCelebration();
    showToast('درخواست ثبت‌نام شما با موفقیت ثبت شد! کارشناسان ما ظرف ۲۴ ساعت با شما تماس خواهند گرفت.', 'success');
  };

  return (
    <div className="py-12 space-y-16">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#172E14] via-[#2D5A27] to-[#172E14] rounded-3xl p-8 sm:p-14 text-white shadow-xl relative overflow-hidden text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1F3F1B] px-4 py-1.5 rounded-full text-xs font-black mb-4">
            <Store className="w-4 h-4" />
            فرصت ویژه برای گلفروشان و پرورش‌دهندگان گل‌های خانگی
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight max-w-3xl mx-auto">
            محصولات گل و گیاه خود را به هزاران خریدار در سراسر ایران بفروشید
          </h1>

          <p className="text-sm sm:text-base text-stone-200 mt-4 max-w-2xl mx-auto leading-relaxed">
            کمترین کمیسیون در ایران ({sellers.commission})، تسویه حساب منظم {sellers.settlement} و مدیریت خودکار حمل و نقل با اسنپ و تیپاکس.
          </p>
        </div>
      </section>

      {/* 2. Key Selling Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 font-heading">
              کمیسیون منصفانه {sellers.commission}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              ۹۵٪ از تمام مبلغ فروش مستقیماً به حساب بانکی شما واریز می‌شود. هیچ هزینه پنهان یا آبونمان ماهانه‌ای وجود ندارد.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 font-heading">
              تسویه حساب سریع ۴۸ ساعته
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              بلافاصله پس از تایید دریافت گل توسط خریدار، وجه سفارش ظرف حداکثر ۴۸ ساعت از طریق پایا به شبا شما واریز می‌شود.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center">
              <Truck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="font-bold text-lg text-stone-900 font-heading">
              ناوگان یکپارچه تحویل کالا
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              نیازی به دغدغه پیک ندارید. سفیران اسنپ‌باکس و ماموران تیپاکس در محل گلخانه یا مغازه شما گل را تحویل می‌گیرند.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Interactive Commission & Profit Calculator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-md max-w-4xl mx-auto space-y-8">
          
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 text-[#1F3F1B] flex items-center justify-center">
              <Calculator className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
                ماشین‌حساب درآمد و سودآوری فروشندگان
              </h3>
              <p className="text-xs text-stone-500">
                برآورد درآمد خالص ماهانه خود را بر اساس میزان فروش گل و گیاه محاسبه کنید
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-stone-800">
              <span>تخمین فروش ماهانه شما:</span>
              <span className="text-lg text-[#2D5A27] font-heading font-black">
                {formatToman(estimatedMonthlySales)}
              </span>
            </div>

            <input
              type="range"
              min="5000000"
              max="100000000"
              step="5000000"
              value={estimatedMonthlySales}
              onChange={(e) => setEstimatedMonthlySales(Number(e.target.value))}
              className="w-full accent-[#2D5A27] cursor-pointer h-2 bg-stone-200 rounded-lg"
            />

            <div className="flex justify-between text-[11px] text-stone-400">
              <span>۵ میلیون تومان</span>
              <span>۵۰ میلیون تومان</span>
              <span>۱۰۰ میلیون تومان</span>
            </div>
          </div>

          {/* Result Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#2D5A27]/8 p-5 rounded-2xl border border-[#2D5A27]/20 space-y-1">
              <span className="text-xs text-stone-500 font-bold block">واریزی خالص به حساب شما (۹۵٪):</span>
              <span className="text-2xl sm:text-3xl font-black text-[#2D5A27] font-heading block">
                {formatToman(estimatedNetPayout)}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold">
                ✓ تسویه منظم هفتگی به کارت شما
              </span>
            </div>

            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-1">
              <span className="text-xs text-stone-500 font-bold block">سهم کمیسیون گل آریس (۵٪):</span>
              <span className="text-xl sm:text-2xl font-bold text-stone-700 font-heading block">
                {formatToman(estimatedCommission)}
              </span>
              <span className="text-[11px] text-stone-400">
                شامل بازاریابی، پشتیبانی مشتریان و درگاه شاپرک
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Registration Roadmap Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            مراحل ساده پیوستن
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading">
            چگونه در گل آریس فروشنده شوم؟
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3 relative overflow-hidden"
            >
              <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#1F3F1B] font-black text-xs flex items-center justify-center shadow-xs">
                {toPersianDigits(idx + 1)}
              </span>
              <h4 className="font-bold text-sm text-stone-900 leading-snug">
                {step}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Vendor Application Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-stone-200/90 shadow-xl max-w-3xl mx-auto">
          
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-[#1F3F1B] font-heading">
                درخواست شما با موفقیت ثبت شد!
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                همکاران واحد توسعه تامین‌کنندگان گل آریس مدارک شما را بررسی کرده و ظرف ۲۴ ساعت برای فعال‌سازی پنل با شماره <strong>{form.phone}</strong> تماس خواهند گرفت.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-[#2D5A27] text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                ثبت درخواست جدید
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="border-b border-stone-100 pb-4">
                <h3 className="text-2xl font-black text-[#1F3F1B] font-heading">
                  فرم ثبت‌نام گلفروشی و پرورش‌دهنده خانگی
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  تکمیل این فرم کمتر از ۳ دقیقه زمان می‌برد و عضویت کاملاً رایگان است.
                </p>
              </div>

              {/* Vendor Type Selection */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-2">
                  نوع فعالیت شما چیست؟
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'local_florist' })}
                    className={`p-3 rounded-2xl text-xs font-bold border text-right cursor-pointer transition-all flex items-center gap-2 ${
                      form.type === 'local_florist'
                        ? 'border-[#2D5A27] bg-[#2D5A27]/10 text-[#2D5A27] ring-2 ring-[#2D5A27]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Building className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>گلفروشی تجاری و آتلیه گل</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'home_grower' })}
                    className={`p-3 rounded-2xl text-xs font-bold border text-right cursor-pointer transition-all flex items-center gap-2 ${
                      form.type === 'home_grower'
                        ? 'border-[#2D5A27] bg-[#2D5A27]/10 text-[#2D5A27] ring-2 ring-[#2D5A27]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>پرورش‌دهنده خانگی گل</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'artisan' })}
                    className={`p-3 rounded-2xl text-xs font-bold border text-right cursor-pointer transition-all flex items-center gap-2 ${
                      form.type === 'artisan'
                        ? 'border-[#2D5A27] bg-[#2D5A27]/10 text-[#2D5A27] ring-2 ring-[#2D5A27]'
                        : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <Store className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>صنایع دستی و گلدان‌ساز هنری</span>
                  </button>
                </div>
              </div>

              {/* Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    نام و نام خانوادگی مدیر:
                  </label>
                  <input
                    type="text"
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="مثال: مریم رحیمی"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    نام گلفروشی یا نام برند شما:
                  </label>
                  <input
                    type="text"
                    required
                    value={form.shopName}
                    onChange={(e) => setForm({ ...form, shopName: e.target.value })}
                    placeholder="مثال: گلخانه ترنج"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    شهر و منطقه فعالیت:
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="مثال: تهران - نیاوران"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    شماره موبایل جهت هماهنگی:
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="۰۹۱۲XXXXXXX"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    آیدی اینستاگرام (اختیاری):
                  </label>
                  <input
                    type="text"
                    value={form.instagramHandle}
                    onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                    placeholder="@your_flower_shop"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    سابقه فعالیت (سال):
                  </label>
                  <select
                    value={form.experienceYears}
                    onChange={(e) => setForm({ ...form, experienceYears: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                  >
                    <option value={1}>کمتر از ۱ سال (تازه‌کار)</option>
                    <option value={3}>۱ تا ۳ سال</option>
                    <option value={5}>۳ تا ۵ سال</option>
                    <option value={10}>بیش از ۵ سال (حرفه‌ای)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  توضیحات یا انواع گل‌هایی که پرورش می‌دهید:
                </label>
                <textarea
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="مثال: پرورش تخصصی ارکیده فالانوپسیس و بونسای، ارسال فوری..."
                  rows={3}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>ارسال فرم و درخواست پیوستن به فروشندگان</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

            </form>
          )}

        </div>
      </section>

    </div>
  );
};
