import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, Truck, ShieldCheck, Heart, Flower2 } from 'lucide-react';
import { toPersianDigits } from '../lib/formatters';

const faqs = [
  {
    q: 'چرا خرید آنلاین گل از گل آریس با گلفروشی‌های سنتی متفاوت است؟',
    a: 'در گل آریس واسطه‌ها حذف شده‌اند. سفارش شما به نزدیک‌ترین گلخانه معتبر یا هنرمند گل‌آرا ارجاع داده می‌شود و گل‌ها به جای نگهداری طولانی‌مدت در مغازه، در همان روز برش خورده و در پکیج‌های آبرسانی اختصاصی با شادابی کامل به دست شما می‌رسند.'
  },
  {
    q: 'سفارش آنلاین گل در تهران و شهرستان‌ها چگونه ارسال می‌شود؟',
    a: 'در شهر تهران، ارسال فوری با پیک‌های مجهز در بازه زمانی ۲ الی ۳ ساعته انجام می‌پذیرد. همچنین می‌توانید ساعت و تاریخ تحویل دلخواه خود را تعیین کنید. برای گلدان‌های گیاهی و صنایع دستی در سایر استان‌ها، ارسال از طریق پست پیشتاز و تیپاکس با بسته‌بندی ضدضربه صورت می‌گیرد.'
  },
  {
    q: 'ضمانت شادابی ۷ روزه گل آریس شامل چه مواردی است؟',
    a: 'ما تازگی و طراوت گل‌ها را تضمین می‌کنیم. در صورتی که گل دریافتی طی ۷ روز دچار پژمردگی غیرطبیعی شود، کافیست تصویر آن را برای تیم پشتیبانی ارسال کنید تا بدون دریافت هزینه، محصول جایگزین ارسال یا مبلغ سفارش عودت داده شود.'
  },
  {
    q: 'آیا امکان سفارش گلدان‌های سرامیکی لالجین به همراه گیاه زنده وجود دارد؟',
    a: 'بله، در بخش «صنایع دستی و گلدان»، می‌توانید گلدان‌های دست‌ساز سفالی و سرامیکی لالجین همدان را انتخاب کرده و در صورت تمایل، گیاه آپارتمانی متناسب با سایز گلدان را به صورت کاشته شده و آماده تحویل بگیرید.'
  },
  {
    q: 'چگونه کارت پیام اختصاصی و دست‌نویس با بسته‌بندی هدیه دریافت کنم؟',
    a: 'در صفحه تسویه حساب و سبد خرید، با انتخاب گزینه کارت پیام هدیه، می‌توانید متن دلخواه خود را بنویسید یا از اشعار و متون پیشنهادی انتخاب کنید. همکاران ما پیام شما را با خط خوش روی کارت‌های کرافت پلمپ‌شده با مُهر طلایی گل آریس قرار می‌دهند.'
  }
];

export const HomeFAQSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-gradient-to-b from-stone-50 to-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-xs">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2D5A27]/10 text-[#2D5A27] px-4 py-1.5 rounded-full text-xs font-bold">
            <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>راهنمای خرید و پاسخ به سوالات متداول</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading">
            هر آنچه درباره سفارش آنلاین گل و گیاه باید بدانید
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            پاسخ به پرتکرارترین پرسش‌های مشتریان در خصوص نحوه ارسال فوری، ضمانت تازگی و کارت هدیه دست‌نویس
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIdx === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-[#2D5A27]/40 bg-white shadow-md ring-1 ring-[#2D5A27]/20'
                    : 'border-stone-200 bg-white/70 hover:bg-white hover:border-stone-300'
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  className="w-full p-5 text-right flex items-center justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#2D5A27]/10 text-[#2D5A27] font-bold text-xs flex items-center justify-center shrink-0">
                      {toPersianDigits(index + 1)}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                      {faq.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#2D5A27]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 mr-10">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Local Keywords & Coverage Cities Footer Bar */}
        <div className="mt-12 pt-8 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-stone-500">
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-4 h-4 text-[#2D5A27]" />
            <span>ارسال فوری در تهران، کرج، اصفهان، شیراز و مشهد</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>تضمین اصالت صنایع دستی لالجین و سلامت فیزیکی</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            <span>کارت پستال‌های اختصاصی با بسته‌بندی لوکس کادویی</span>
          </div>
        </div>

      </div>
    </section>
  );
};
