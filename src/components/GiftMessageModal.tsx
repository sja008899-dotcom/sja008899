import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  PenTool, 
  Heart, 
  Send, 
  Copy, 
  Check, 
  Flower2 
} from 'lucide-react';
import { GolarysLogo } from './GolarysLogo';

const inspirationTemplates = [
  {
    title: "تبریک تولد عاشقانه",
    text: "زادروزت شیرین‌ترین بهانه برای شکفتن گل‌های بهاری است. میلادت فرخنده و زندگیت سرشار از عطر آرامش و شادابی باد."
  },
  {
    title: "سالگرد ازدواج و عشق",
    text: "هر شاخه از این گل‌ها نمادی از روزهای پرمهر و خاطرات قشنگی است که در کنار تو ساخته‌ام. سالگرد با هم بودنمان مبارک، عشق من."
  },
  {
    title: "قدردانی و تشکر صمیمانه",
    text: "برای تمام مهربانی‌ها و حضور گرم و ارزشمندت، از صمیم قلب سپاسگزارم. امیدوارم طراوت این گل‌ها لبخند به چهره‌ات بیاورد."
  },
  {
    title: "تبریک موفقیت و شروع نو",
    text: "موفقیت چشمگیرت را صمیمانه تبریک می‌گویم. شکوفایی استعدادهای بی‌نظیرت همیشه مایه افتخار و شادمانی ماست."
  }
];

export const GiftMessageModal: React.FC = () => {
  const { isGiftBuilderOpen, setIsGiftBuilderOpen, cart, updateCartGiftCard, showToast, triggerCelebration } = useApp();
  
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [cardTheme, setCardTheme] = useState<'gold' | 'emerald' | 'rose' | 'minimal'>('gold');
  const [copied, setCopied] = useState(false);

  if (!isGiftBuilderOpen) return null;

  const handleCopy = () => {
    const fullText = `برای: ${recipient || 'عزیز دل'}\n\n${message}\n\nاز طرف: ${sender || 'همراه همیشگی تو'}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    showToast('متن کارت پستال در کلیپ‌بورد کپی شد.', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleApplyToCart = () => {
    if (!message.trim()) {
      showToast('لطفاً ابتدا متنی برای کارت هدیه بنویسید.', 'error');
      return;
    }
    if (cart.length === 0) {
      showToast('کارت هدیه شما آماده شد. حالا می‌توانید گل مورد نظر را انتخاب و به سبد اضافه کنید.', 'info');
      setIsGiftBuilderOpen(false);
      return;
    }
    // Apply to all items in cart
    cart.forEach((item) => {
      updateCartGiftCard(item.product.id, message, recipient);
    });
    showToast('کارت هدیه اختصاصی برای تمام گل‌های سبد خرید شما تنظیم شد.', 'success');
    triggerCelebration();
    setIsGiftBuilderOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1F3F1B] text-white p-6 sm:p-7 flex items-center justify-between border-b border-[#2D5A27]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2D5A27] text-[#D4AF37] flex items-center justify-center">
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-heading">
                استودیوی طراحی کارت پستال و پیام هدیه
              </h2>
              <p className="text-xs text-stone-300">
                نگارش و چاپ رایگان روی کاغذ فابریانو با مهر و موم اختصاصی
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsGiftBuilderOpen(false)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Controls column */}
          <div className="md:col-span-6 space-y-5">
            
            {/* Theme switcher */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                انتخاب قالب و رنگ کارت هدیه:
              </label>
              <div className="grid grid-cols-4 gap-2">
                <button
                  onClick={() => setCardTheme('gold')}
                  className={`p-2 rounded-xl text-xs font-bold border text-center cursor-pointer transition-all ${
                    cardTheme === 'gold' ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-stone-900 ring-2 ring-[#D4AF37]' : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  ⚜️ طلایی
                </button>
                <button
                  onClick={() => setCardTheme('emerald')}
                  className={`p-2 rounded-xl text-xs font-bold border text-center cursor-pointer transition-all ${
                    cardTheme === 'emerald' ? 'border-[#2D5A27] bg-[#2D5A27]/10 text-stone-900 ring-2 ring-[#2D5A27]' : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  🌿 زمردی
                </button>
                <button
                  onClick={() => setCardTheme('rose')}
                  className={`p-2 rounded-xl text-xs font-bold border text-center cursor-pointer transition-all ${
                    cardTheme === 'rose' ? 'border-rose-400 bg-rose-50 text-stone-900 ring-2 ring-rose-400' : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  🌸 رز صورتی
                </button>
                <button
                  onClick={() => setCardTheme('minimal')}
                  className={`p-2 rounded-xl text-xs font-bold border text-center cursor-pointer transition-all ${
                    cardTheme === 'minimal' ? 'border-stone-800 bg-stone-100 text-stone-900 ring-2 ring-stone-800' : 'border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  ✉️ مینیمال
                </button>
              </div>
            </div>

            {/* Recipient and Sender inputs */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  نام گیرنده:
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="مثال: مریم عزیزم"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  از طرف:
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="مثال: علی"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20"
                />
              </div>
            </div>

            {/* Message input */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                متن دلخواه کارت هدیه:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="متن زیبای خود را اینجا بنویسید یا از متن‌های آماده زیر استفاده کنید..."
                rows={4}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#2D5A27]/20 leading-relaxed"
              />
            </div>

            {/* Inspiration quick templates */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                متن‌های آماده پیشنهادی:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {inspirationTemplates.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setMessage(t.text)}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#2D5A27]/10 hover:text-[#2D5A27] text-stone-700 text-[11px] font-medium transition-colors cursor-pointer"
                  >
                    {t.title}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Live Preview Column */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            
            <div className="text-xs font-bold text-stone-500 mb-1">
              پیش‌نمایش زنده کارت پستال چاپ شده:
            </div>

            {/* Postcard Frame */}
            <div className={`p-6 sm:p-8 rounded-3xl shadow-lg border relative min-h-[260px] flex flex-col justify-between transition-all ${
              cardTheme === 'gold' ? 'bg-[#FCF9EE] border-[#D4AF37]/60 text-stone-800' :
              cardTheme === 'emerald' ? 'bg-[#F2F7F0] border-[#2D5A27]/40 text-stone-800' :
              cardTheme === 'rose' ? 'bg-[#FFF5F5] border-rose-300 text-stone-800' :
              'bg-white border-stone-300 text-stone-800'
            }`}>
              
              {/* Decorative stamp / wax seal */}
              <div className="absolute top-4 left-4 flex items-center gap-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md p-1 ${
                  cardTheme === 'gold' ? 'bg-[#D4AF37] text-white ring-2 ring-[#D4AF37]/30' :
                  cardTheme === 'emerald' ? 'bg-[#2D5A27] text-white ring-2 ring-[#2D5A27]/30' :
                  cardTheme === 'rose' ? 'bg-rose-500 text-white ring-2 ring-rose-300' :
                  'bg-stone-800 text-white ring-2 ring-stone-400'
                }`}>
                  <GolarysLogo size="sm" iconOnly={true} variant="light" />
                </div>
              </div>

              {/* To Header */}
              <div>
                <span className="text-xs text-stone-400 font-serif">به نام زیبایی</span>
                <h4 className="font-bold text-sm text-[#2D5A27] mt-1 font-heading">
                  {recipient ? `برای ${recipient}` : 'برای: . . . . . . . . . . .'}
                </h4>
              </div>

              {/* Body Text */}
              <p className="text-xs sm:text-sm leading-relaxed my-4 font-serif italic text-stone-700 min-h-[70px]">
                {message || 'متن زیبای شما در این بخش با خط تحریری و فونت خوشنویسی چاپ خواهد شد...'}
              </p>

              {/* From Footer */}
              <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400">گل آریس — تحویل با عشق</span>
                <span className="font-bold text-stone-800">
                  {sender ? `با عشق، ${sender}` : 'از طرف: . . . . . .'}
                </span>
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={handleCopy}
                className="px-3.5 py-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'کپی شد' : 'کپی متن'}</span>
              </button>

              <button
                onClick={handleApplyToCart}
                className="flex-1 py-3 px-4 rounded-xl bg-[#2D5A27] hover:bg-[#1F3F1B] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>ثبت و الصاق به سفارشات سبد خرید</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
