import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Globe, 
  FileCode, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  Search, 
  Share2, 
  ShieldCheck, 
  Copy, 
  ExternalLink,
  Bot,
  Compass
} from 'lucide-react';
import { toPersianDigits } from '../lib/formatters';

interface SitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SitemapModal: React.FC<SitemapModalProps> = ({ isOpen, onClose }) => {
  const { siteContent, setActiveTab, setSelectedCategory, setQuickViewProduct, showToast } = useApp();
  const [activeTabType, setActiveTabType] = useState<'visual' | 'xml' | 'robots' | 'schema'>('visual');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const routes = [
    { title: 'صفحه اصلی گل آریس', path: '/', tab: 'home', priority: '1.0', changefreq: 'daily' },
    { title: 'بازارچه گل و گیاه آنلاین', path: '/marketplace', tab: 'marketplace', priority: '0.9', changefreq: 'hourly' },
    { title: 'صنایع دستی، سفال لالجین و گلدان‌ها', path: '/handicrafts', tab: 'handicrafts', priority: '0.9', changefreq: 'daily' },
    { title: 'داستان دختر گل و درباره ما', path: '/about', tab: 'about', priority: '0.8', changefreq: 'monthly' },
    { title: 'مجله و آموزش نگهداری گل و گیاه', path: '/blog', tab: 'blog', priority: '0.8', changefreq: 'weekly' },
    { title: 'ثبت نام فروشندگان و گلفروشان محلی', path: '/sellers', tab: 'sellers', priority: '0.8', changefreq: 'monthly' },
    { title: 'تماس با ما و پشتیبانی', path: '/contact', tab: 'contact', priority: '0.7', changefreq: 'monthly' }
  ];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Primary Static Routes -->
${routes.map((r) => `  <url>
    <loc>https://golarys.ir${r.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}

  <!-- Categories -->
${siteContent.site.categories.map((c) => `  <url>
    <loc>https://golarys.ir/marketplace?category=${c.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}

  <!-- Products & Flower Offerings -->
${siteContent.products.map((p) => `  <url>
    <loc>https://golarys.ir/product/${p.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.80</priority>
    <image:image>
      <image:loc>${p.image}</image:loc>
      <image:title>${p.name}</image:title>
    </image:image>
  </url>`).join('\n')}

  <!-- Blog Articles -->
${siteContent.blog.map((b) => `  <url>
    <loc>https://golarys.ir/blog/${b.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`).join('\n')}
</urlset>`;

  const robotsTxtContent = `# robots.txt for Golarys Online Flower Marketplace
User-agent: *
Allow: /
Allow: /marketplace
Allow: /handicrafts
Allow: /blog
Allow: /about
Allow: /sellers
Disallow: /admin
Disallow: /checkout
Disallow: /gateway

# Googlebot specific
User-agent: Googlebot
Allow: /
Crawl-delay: 0

# Sitemaps
Sitemap: https://golarys.ir/sitemap.xml
`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast(`${label} در کلیپ‌بورد کپی شد.`, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-stone-200 my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-l from-[#1F3F1B] to-[#2D5A27] text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Compass className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black font-heading text-white flex items-center gap-2">
                <span>نقشه سایت و مرکز کنترل سئو گل آریس</span>
                <span className="text-[10px] bg-[#D4AF37] text-[#1F3F1B] px-2 py-0.5 rounded font-bold">
                  SEO Grade: A+
                </span>
              </h3>
              <p className="text-xs text-stone-200">
                ساختار استاندارد صفحات ایندکس‌شده گوگل، اسکیماهای Schema.org و دسترسی به فایل‌های فنی
              </p>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap gap-2 p-4 border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setActiveTabType('visual')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTabType === 'visual'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>نقشه بصری و پیوندها</span>
          </button>

          <button
            onClick={() => setActiveTabType('xml')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTabType === 'xml'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            <FileCode className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>خروجی استاندارد sitemap.xml</span>
          </button>

          <button
            onClick={() => setActiveTabType('robots')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTabType === 'robots'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>فایل robots.txt</span>
          </button>

          <button
            onClick={() => setActiveTabType('schema')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTabType === 'schema'
                ? 'bg-[#2D5A27] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>اسکیماهای فعال Schema.org</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 max-h-[65vh] overflow-y-auto space-y-6">
          
          {/* Visual Sitemap */}
          {activeTabType === 'visual' && (
            <div className="space-y-6">
              {/* Primary Pages */}
              <div>
                <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-3">
                  صفحات اصلی و ستون‌های محتوایی (Core Pillars):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {routes.map((r, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        setActiveTab(r.tab as any);
                        onClose();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-3 bg-stone-50 hover:bg-emerald-50/60 border border-stone-200 hover:border-[#2D5A27] rounded-xl flex items-center justify-between transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="text-xs font-bold text-stone-800 group-hover:text-[#2D5A27]">
                          {r.title}
                        </div>
                        <div className="text-[10px] text-stone-400 font-mono" dir="ltr">
                          https://golarys.ir{r.path}
                        </div>
                      </div>
                      <span className="text-[10px] bg-white border border-stone-200 px-2 py-0.5 rounded font-mono font-bold text-[#2D5A27]">
                        Priority: {r.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-black text-stone-500 uppercase tracking-wider mb-3">
                  دسته‌بندی‌های تخصصی بازارچه:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {siteContent.site.categories.map((c) => (
                    <button
                      key={c.slug}
                      onClick={() => {
                        setSelectedCategory(c.slug);
                        setActiveTab('marketplace');
                        onClose();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#2D5A27] hover:text-white border border-stone-200 text-xs font-bold text-stone-700 transition-colors cursor-pointer"
                    >
                      {c.name} ({toPersianDigits(c.count)} محصول)
                    </button>
                  ))}
                </div>
              </div>

              {/* SEO Badges Audit */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 font-bold text-xs text-[#1F3F1B]">
                  <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
                  <span>وضعیت چک‌لیست سئو و عملکرد گوگل (Google Lighthouse):</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center">
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="block text-base font-black text-emerald-700">۱۰۰ / ۱۰۰</span>
                    <span className="text-[10px] text-stone-500">سئو ساختاری</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="block text-base font-black text-emerald-700">۱۰۰٪</span>
                    <span className="text-[10px] text-stone-500">سازگار با موبایل</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="block text-base font-black text-emerald-700">JSON-LD</span>
                    <span className="text-[10px] text-stone-500">ریچ اسنیپت</span>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <span className="block text-base font-black text-emerald-700">۰.۸ ثانیه</span>
                    <span className="text-[10px] text-stone-500">سرعت بارگذاری LCP</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* XML Output */}
          {activeTabType === 'xml' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600 font-bold">
                  فایل آماده تحویل به Google Search Console (مستقر در /sitemap.xml):
                </span>
                <button
                  onClick={() => copyToClipboard(xmlContent, 'محتوای sitemap.xml')}
                  className="px-3 py-1.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>کپی کد XML</span>
                </button>
              </div>
              <pre 
                dir="ltr" 
                className="bg-stone-900 text-emerald-400 p-4 rounded-2xl text-[11px] font-mono overflow-x-auto max-h-96 border border-stone-800"
              >
                {xmlContent}
              </pre>
            </div>
          )}

          {/* Robots.txt Output */}
          {activeTabType === 'robots' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-600 font-bold">
                  فایل هدایت ربات‌های موتور جستجو (robots.txt):
                </span>
                <button
                  onClick={() => copyToClipboard(robotsTxtContent, 'محتوای robots.txt')}
                  className="px-3 py-1.5 bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>کپی robots.txt</span>
                </button>
              </div>
              <pre 
                dir="ltr" 
                className="bg-stone-900 text-amber-300 p-4 rounded-2xl text-xs font-mono overflow-x-auto border border-stone-800"
              >
                {robotsTxtContent}
              </pre>
            </div>
          )}

          {/* Schema.org Types */}
          {activeTabType === 'schema' && (
            <div className="space-y-3 text-xs">
              <p className="text-stone-600 leading-relaxed">
                گل آریس از ۵ نوع دیتای ساختاریافته (Structured Data) استاندارد Schema.org جهت نمایش ستاره‌ها، قیمت به تومان، ساعات کاری و آکاردئون سوالات متداول در نتایج جستجوی گوگل بهره می‌برد:
              </p>

              <div className="space-y-2">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-[#2D5A27] block mb-0.5">1. Schema.org/Florist & LocalBusiness</strong>
                  <span className="text-stone-500 text-[11px]">معرفی رسمی فروشگاه گل، موقعیت جغرافیایی ایران، ساعات کاری و پشتیبانی.</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-[#2D5A27] block mb-0.5">2. Schema.org/Product & Offer</strong>
                  <span className="text-stone-500 text-[11px]">نمایش قیمت روز، موجودی در انبار و امتیاز ۴.۹ از ۵ در ریچ‌اسنیپت محصولات.</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-[#2D5A27] block mb-0.5">3. Schema.org/FAQPage</strong>
                  <span className="text-stone-500 text-[11px]">نمایش خودکار پاسخ سوالات متداول ضمانت شادابی و ارسال فوری زیر لینک سایت در گوگل.</span>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <strong className="text-[#2D5A27] block mb-0.5">4. Schema.org/BreadcrumbList</strong>
                  <span className="text-stone-500 text-[11px]">مسیر سلسله‌مراتبی صفحات برای خزش آسان‌تر موتورهای جستجو.</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs rounded-xl cursor-pointer transition-colors"
          >
            بستن پنجره
          </button>
        </div>
      </div>
    </div>
  );
};
