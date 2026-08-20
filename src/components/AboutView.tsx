import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Heart, 
  Sparkles, 
  Target, 
  Eye, 
  ShieldCheck, 
  Flower2, 
  Users, 
  Award,
  Leaf
} from 'lucide-react';
import { toPersianDigits } from '../lib/formatters';
import { GolarysLogo } from './GolarysLogo';

export const AboutView: React.FC = () => {
  const { siteContent, setActiveTab } = useApp();
  const { about } = siteContent.site;

  return (
    <div className="py-12 space-y-16">
      
      {/* 1. Hero Story Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#F2F7F0] to-[#FCFCFA] rounded-3xl p-8 sm:p-14 border border-stone-200/80 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <GolarysLogo size="sm" iconOnly={true} />
                <div className="inline-flex items-center gap-2 bg-[#2D5A27]/10 text-[#2D5A27] px-4 py-1.5 rounded-full text-xs font-bold">
                  <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>داستان شکل‌گیری گل آریس</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-[#1F3F1B] font-heading leading-tight">
                روایت عشق، خاک و لبخند «دختر گل»
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
                {about.story}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => setActiveTab('marketplace')}
                  className="px-6 py-3 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
                >
                  دیدن محصولات بازارچه
                </button>
                <button
                  onClick={() => setActiveTab('sellers')}
                  className="px-6 py-3 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer"
                >
                  پیوستن به جمع پرورش‌دهندگان
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
                  alt="دختر گل و گلفروشی محلی گل آریس"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Mission & Vision Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center">
              <Target className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-heading">
              ماموریت ما (Mission)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {about.mission}
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#2D5A27]/10 text-[#2D5A27] flex items-center justify-center">
              <Eye className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 font-heading">
              چشم‌انداز ما (Vision)
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {about.vision}
            </p>
          </div>

        </div>
      </section>

      {/* 3. Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            اصول بنیادین ما
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1F3F1B] font-heading">
            ارزش‌های پایدار در گل آریس
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.values.map((val, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 text-[#1F3F1B] flex items-center justify-center font-black text-sm">
                {toPersianDigits(idx + 1)}
              </div>
              <h4 className="font-bold text-stone-900 text-sm">
                {val}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Community & Sustainability Impact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1F3F1B] text-white rounded-3xl p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-[#2D5A27]">
            
            <div className="p-4 space-y-2">
              <span className="text-3xl sm:text-4xl font-black text-[#D4AF37] font-heading block">
                +۶۰٪
              </span>
              <h4 className="font-bold text-sm text-white">حمایت از بانوان پرورش‌دهنده خانگی</h4>
              <p className="text-xs text-stone-300">
                بیش از نیمی از تامین‌کنندگان ما بانوان هنرمند سرپرست خانوار و باغبانان مستقل هستند.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <span className="text-3xl sm:text-4xl font-black text-[#D4AF37] font-heading block">
                ۱۰۰٪
              </span>
              <h4 className="font-bold text-sm text-white">بسته‌بندی دوستدار طبیعت (Eco-Friendly)</h4>
              <p className="text-xs text-stone-300">
                استفاده از کاغذهای کرافت زیست‌تخریب‌پذیر و الیاف گیاهی به جای پلاستیک‌های یک‌بار مصرف.
              </p>
            </div>

            <div className="p-4 space-y-2">
              <span className="text-3xl sm:text-4xl font-black text-[#D4AF37] font-heading block">
                ۷ روز
              </span>
              <h4 className="font-bold text-sm text-white">ضمانت شادابی واقعی گل‌ها</h4>
              <p className="text-xs text-stone-300">
                برش مستقیم روزانه از گلخانه‌ها باعث می‌شود گل‌ها تا دو برابر بیشتر از مغازه‌های معمولی تازه بمانند.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
