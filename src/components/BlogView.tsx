import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  User, 
  Tag, 
  ArrowLeft, 
  X, 
  Sparkles, 
  Stethoscope, 
  HelpCircle,
  CheckCircle2,
  Flower2
} from 'lucide-react';
import { toPersianDigits } from '../lib/formatters';

export const BlogView: React.FC = () => {
  const { blogPosts, selectedBlogArticle, setSelectedBlogArticle, setActiveTab } = useApp();
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Plant Doctor Quiz State
  const [plantType, setPlantType] = useState('rose');
  const [symptom, setSymptom] = useState('drooping');
  const [doctorDiagnosis, setDoctorDiagnosis] = useState<string | null>(null);

  const allTags = Array.from(new Set(blogPosts.flatMap((p) => p.tags)));

  const filteredPosts = selectedTag === 'all'
    ? blogPosts
    : blogPosts.filter((p) => p.tags.includes(selectedTag));

  const handleDiagnose = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptom === 'drooping') {
      setDoctorDiagnosis('علت اصلی: حباب هوا در آوند ساقه یا دمای گرم محیط. راهکار فوری: ۲ سانتی‌متر انتهای ساقه را با زاویه ۴۵ درجه در آب خنک برش دهید و چند قطره لیموترش یا قند به آب اضافه کنید.');
    } else if (symptom === 'yellow_leaves') {
      setDoctorDiagnosis('علت اصلی: آبیاری بیش از حد یا غرقاب شدن ریشه. راهکار: اجازه دهید تا خشکی ۲ بند انگشت اول خاک، آبیاری بعدی را به تاخیر بیاندازید و سوراخ زهکش زیر گلدان را بررسی کنید.');
    } else if (symptom === 'falling_petals') {
      setDoctorDiagnosis('علت اصلی: مجاورت با میوه‌ها (آزادسازی گاز اتیلن) یا نور مستقیم آفتاب. راهکار: گل را به محیطی خنک و دور از تابش آفتاب و ظرف میوه‌ها منتقل کنید.');
    } else {
      setDoctorDiagnosis('علت اصلی: تجمع باکتری در آب گلدان. راهکار: آب گلدان را تعویض کرده، برگ‌های پایینی غوطه‌ور در آب را جدا کنید و گلدان را با آب و کف بشویید.');
    }
  };

  return (
    <div className="py-12 space-y-16">
      
      {/* 1. Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2D5A27]/10 text-[#2D5A27] px-4 py-1.5 rounded-full text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>مجله تخصصی گل، گیاه و نگهداری</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-[#1F3F1B] font-heading">
            آموزش و مقالات کاربردی باغبانی
          </h1>

          <p className="text-sm text-stone-600">
            جدیدترین راهنماهای علمی برای حفظ شادابی گل‌ها، تصفیه هوای خانه با گیاهان و دکوراسیون سبز
          </p>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setSelectedTag('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedTag === 'all'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            همه مقالات
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#2D5A27] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Blog Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedBlogArticle(post)}
              className="group bg-white rounded-3xl border border-stone-200/90 hover:border-[#2D5A27]/40 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="h-52 overflow-hidden bg-stone-100 relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    {post.readTime}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-stone-900 group-hover:text-[#2D5A27] transition-colors line-clamp-2 leading-snug font-heading">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-100 flex items-center justify-between mt-4">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] text-[#2D5A27] bg-[#2D5A27]/8 px-2 py-0.5 rounded-md font-semibold">
                      #{t}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-bold text-[#2D5A27] flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                  <span>مطالعه کامل</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Interactive Plant Doctor Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1F3F1B] via-[#2D5A27] to-[#1F3F1B] rounded-3xl p-8 sm:p-12 text-white shadow-xl max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-[#1F3F1B] flex items-center justify-center font-bold">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading">
                پزشک گیاه و گل (Plant Doctor)
              </h3>
              <p className="text-xs text-stone-200">
                مشکل گل یا گیاه خود را انتخاب کنید تا دستور درمان فوری آن را دریافت کنید
              </p>
            </div>
          </div>

          <form onSubmit={handleDiagnose} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-200 mb-1.5">
                  نوع گل یا گیاه شما:
                </label>
                <select
                  value={plantType}
                  onChange={(e) => setPlantType(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:bg-white/20 focus:outline-hidden"
                >
                  <option value="rose" className="text-stone-900">رز و گل‌های شاخه بریده</option>
                  <option value="orchid" className="text-stone-900">ارکیده و گیاهان خاص</option>
                  <option value="houseplant" className="text-stone-900">گیاهان آپارتمانی (زاموفیلیا، پتوس، برگ انجیری)</option>
                  <option value="sunflower" className="text-stone-900">آفتابگردان و گل‌های فصلی</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-200 mb-1.5">
                  چه علامتی مشاهده می‌کنید؟
                </label>
                <select
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2.5 text-xs text-white focus:bg-white/20 focus:outline-hidden"
                >
                  <option value="drooping" className="text-stone-900">پژمردگی و خم شدن سر گل</option>
                  <option value="yellow_leaves" className="text-stone-900">زرد شدن برگ‌ها یا لکه‌های قهوه‌ای</option>
                  <option value="falling_petals" className="text-stone-900">ریزش سریع گلبرگ‌ها</option>
                  <option value="slimy_stem" className="text-stone-900">بوی بد آب گلدان و لیز شدن ساقه</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#BF9B2D] text-[#1F3F1B] font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
            >
              دریافت نسخه و تشخیص پزشک گل
            </button>

            {doctorDiagnosis && (
              <div className="mt-4 p-4 rounded-2xl bg-white/15 border border-white/30 text-xs text-stone-100 leading-relaxed animate-in fade-in duration-200">
                <span className="font-bold text-[#D4AF37] block mb-1">🌿 تجویز باغبانی گل آریس:</span>
                <p>{doctorDiagnosis}</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* 4. Article Reader Modal */}
      {selectedBlogArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>{selectedBlogArticle.date}</span>
                <span>•</span>
                <span>{selectedBlogArticle.author}</span>
                <span>•</span>
                <span className="text-[#2D5A27] font-bold">{selectedBlogArticle.readTime}</span>
              </div>

              <button
                onClick={() => setSelectedBlogArticle(null)}
                className="p-2 rounded-full bg-white hover:bg-stone-200 text-stone-700 shadow-xs cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Content */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="h-64 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src={selectedBlogArticle.image}
                  alt={selectedBlogArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading leading-tight">
                {selectedBlogArticle.title}
              </h2>

              <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-loose space-y-4 whitespace-pre-wrap">
                {selectedBlogArticle.content}
              </div>

              <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {selectedBlogArticle.tags.map((t) => (
                    <span key={t} className="text-xs bg-stone-100 text-stone-700 px-3 py-1 rounded-lg font-medium">
                      #{t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setSelectedBlogArticle(null);
                    setActiveTab('marketplace');
                  }}
                  className="px-4 py-2 bg-[#2D5A27] text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  مشاهده گل‌های مرتبط
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
