import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Instagram, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  Clock, 
  ShieldCheck,
  MessageSquare
} from 'lucide-react';
import { sampleFaqs } from '../data/initialContent';
import { toPersianDigits } from '../lib/formatters';

export const ContactView: React.FC = () => {
  const { siteContent, showToast, triggerCelebration, addContactMessage, sendNotification } = useApp();
  const { brand } = siteContent.site;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'پیگیری سفارش و تحویل',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('لطفاً تمام فیلدهای ستاره‌دار را تکمیل کنید.', 'error');
      return;
    }

    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      
      // Save directly to admin inbox
      addContactMessage({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject,
        message: form.message
      });

      // Send simulated confirmation email to sender
      sendNotification(
        'email',
        `تاییدیه دریافت پیام شما در گل آریس - ${form.subject}`,
        `کاربر گرامی ${form.name}، پیام شما با موضوع «${form.subject}» در واحد پشتیبانی گل آریس ثبت گردید و در اسرع وقت پاسخ داده خواهد شد.`,
        form.email
      );

      setSentSuccess(true);
      triggerCelebration();
      showToast('پیام شما با موفقیت ارسال شد و در صندوق پیام‌های مدیریت ثبت گردید.', 'success');
      setForm({ name: '', email: '', phone: '', subject: 'پیگیری سفارش و تحویل', message: '' });
    } catch {
      showToast('خطا در ارسال پیام. لطفاً مجدداً تلاش فرمایید.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 space-y-16">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2D5A27]/10 text-[#2D5A27] px-4 py-1.5 rounded-full text-xs font-bold">
            <MessageSquare className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>پشتیبانی و ارتباط با گل آریس</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#1F3F1B] font-heading">
            تماس با تیم پشتیبانی و ثبت نظرات
          </h1>

          <p className="text-sm text-stone-600">
            سوالی درباره سفارش، زمان تحویل اکسپرس یا همکاری به عنوان فروشنده دارید؟ همکاران ما مشتاقانه پاسخگوی شما هستند.
          </p>
        </div>
      </section>

      {/* 2. Contact Form & Details Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-stone-200/90 shadow-md">
            
            {sentSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-[#1F3F1B] font-heading">
                  پیام شما با موفقیت دریافت شد
                </h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  از تماس شما سپاسگزاریم. پاسخ شما ظرف حداکثر ۲ ساعت به ایمیل یا شماره موبایل قید شده ارسال خواهد شد.
                </p>
                <button
                  onClick={() => setSentSuccess(false)}
                  className="px-5 py-2.5 bg-[#2D5A27] text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  ارسال پیام جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-stone-100 pb-3">
                  <h3 className="text-xl font-bold text-[#1F3F1B] font-heading">
                    فرم ارسال پیام مستقیم
                  </h3>
                  <span className="text-xs text-stone-400">پاسخگویی سریع در کمتر از ۲ ساعت کاری</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      نام و نام خانوادگی *:
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="مثال: علی رضایی"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      آدرس ایمیل *:
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      شماره تماس همراه:
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="۰۹۱۲XXXXXXX"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      موضوع پیام:
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                    >
                      <option>پیگیری سفارش و تحویل</option>
                      <option>درخواست همکاری و فروشندگی</option>
                      <option>سفارش گل تشریفاتی سازمانی</option>
                      <option>پیشنهادات و انتقادات</option>
                      <option>سایر موارد</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    متن پیام شما *:
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="پیام، سوال یا نظر ارزشمند خود را با ما در میان بگذارید..."
                    rows={4}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>{loading ? 'در حال ارسال پیام...' : 'ارسال پیام به گل آریس'}</span>
                </button>
              </form>
            )}

          </div>

          {/* Details & Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-[#1F3F1B] text-white p-8 rounded-3xl shadow-md space-y-6">
              <h3 className="text-xl font-bold font-heading border-b border-[#2D5A27] pb-3">
                اطلاعات مستقیم تماس
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-stone-200">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">شماره تلفن مستقیم:</span>
                    <a href={`tel:${brand.phone}`} className="font-bold hover:text-white persian-num">
                      {toPersianDigits(brand.phone)}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">پست الکترونیکی:</span>
                    <span className="font-mono">{brand.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-[#D4AF37] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">ساعات پاسخگویی:</span>
                    <span>شنبه تا جمعه: ۸:۰۰ الی ۲۳:۰۰ (بدون تعطیلی)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2D5A27] text-[#D4AF37] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[11px]">دفتر مرکزی و هاب توزیع:</span>
                    <span className="leading-relaxed text-xs">
                      {brand.address || 'تهران، خیابان ولیعصر، تقاطع بهشتی، برج نیلوفر'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#2D5A27] flex items-center gap-3">
                <a
                  href={brand.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#2D5A27] hover:bg-[#D4AF37] hover:text-[#172E14] text-center font-bold text-xs transition-colors"
                >
                  اینستاگرام @golarys
                </a>
                <a
                  href={brand.social.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-[#2D5A27] hover:bg-[#D4AF37] hover:text-[#172E14] text-center font-bold text-xs transition-colors"
                >
                  تلگرام @golarys
                </a>
              </div>
            </div>

            {/* Quick trust box */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-2">
              <div className="flex items-center gap-2 text-[#2D5A27] font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
                <span>پشتیبانی سریع سفارشات زنده</span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                اگر سفارشی ثبت کرده‌اید و نیاز به هماهنگی تغییر ساعت یا متن کارت دارید، کافیست کد سفارش را پیامک یا واتساپ فرمایید.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FAQ Accordion Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            پرسش‌های متداول
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading">
            سوالاتی که اغلب پرسیده می‌شود
          </h2>
        </div>

        <div className="space-y-3">
          {sampleFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-right font-bold text-xs sm:text-sm text-stone-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-stone-50"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#2D5A27] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
