import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ShieldCheck, Truck, HeartHandshake, CheckCircle2, ChevronLeft } from 'lucide-react';

export const HomeSeoContent: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="py-14 bg-stone-50/70 border-t border-stone-200/80 text-stone-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* SEO Header & Brand Story */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-[#2D5A27] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>گلفروشی آنلاین و بازار مستقیم گل و گیاه ایران</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-heading leading-tight">
            گل آریس؛ تجربه خرید مستقیم گل تازه از باغبانان و گلفروشان محلی
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            سامانه <strong>گل آریس (Golarys)</strong> اولین بازارگاه تخصصی آنلاین گل، گیاهان آپارتمانی و صنایع دستی گلدان در ایران است. با حذف واسطه‌ها، خریداران می‌توانند تازه‌ترین شاخه‌های گل رز هلندی، ارکیده، لیسیانتوس و انواع گیاهان مقاوم را با تضمین شادابی ۷ روزه و امکان عکاسی قبل از تحویل (Pre-dispatch Inspection) مستقیماً از نزدیک‌ترین گلخانه‌ها و هنرمندان محلی سفارش دهند.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2D5A27] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">ارسال فوری ۲ ساعته در سراسر شهر</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              ارسال اکسپرس دسته گل و باکس هدیه با سفیران اختصاصی اسنپ و تپسی در تهران و تحویل مطمئن گیاهان با بسته‌بندی ویژه تیپاکس به تمام شهرستان‌ها.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2D5A27] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">عکاسی محصول قبل از تحویل</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              پیش از خروج سفارش از گلفروشی، عکس واقعی چیدمان برای شما ارسال می‌شود تا با تایید شما بسته‌بندی و تحویل سفیر شود.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#2D5A27] flex items-center justify-center font-bold">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-stone-900">حمایت از پرورش‌دهندگان محلی</h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              بستری شفاف برای فروش مستقیم دست‌سازه‌های سفال لالجین، مکرومه‌بافی بانوان هنرمند و مزارع گل محلات با تسویه روزانه و عادلانه.
            </p>
          </div>
        </div>

        {/* Quick Links & Internal Navigation */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 space-y-4">
          <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#2D5A27]" />
            <span>دسته‌بندی‌های پرطرفدار بازار گل آریس:</span>
          </h4>
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-[#2D5A27] text-stone-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>خرید دسته گل رز هلندی</span>
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-[#2D5A27] text-stone-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>گیاهان آپارتمانی تصفیه‌کننده هوا</span>
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveTab('handicrafts')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-[#2D5A27] text-stone-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>گلدان‌های سرامیکی و سفال لالجین</span>
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-[#2D5A27] text-stone-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>باکس گل هدیه و تولد</span>
              <ChevronLeft className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveTab('blog')}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-emerald-50 hover:text-[#2D5A27] text-stone-700 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>راهنمای آبیاری و نگهداری گیاهان</span>
              <ChevronLeft className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
