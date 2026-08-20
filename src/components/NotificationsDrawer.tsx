import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Bell, 
  MessageSquare, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  Smartphone, 
  Clock, 
  Trash2,
  Send
} from 'lucide-react';
import { toPersianDigits } from '../lib/formatters';

export const NotificationsDrawer: React.FC = () => {
  const { 
    isNotificationsDrawerOpen, 
    setIsNotificationsDrawerOpen, 
    dispatchedNotifications 
  } = useApp();

  if (!isNotificationsDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/50 backdrop-blur-xs">
      <div 
        className="absolute inset-y-0 left-0 max-w-md w-full bg-white shadow-2xl flex flex-col border-r border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Drawer Header */}
        <div className="bg-gradient-to-l from-[#1F3F1B] to-[#2D5A27] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base font-heading text-white">
                سامانه پیامک و ایمیل‌های ارسالی
              </h3>
              <p className="text-[11px] text-stone-200">
                گزارش لحظه‌ای کدهای تایید، رسیدها و اعلان‌ها
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsNotificationsDrawerOpen(false)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {dispatchedNotifications.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto text-stone-400">
                <Send className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-stone-700 text-sm">هیچ پیامی ثبت نشده است</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                با ارسال درخواست ورود، دریافت رمز پویا یا ثبت سفارش، پیامک‌ها و ایمیل‌های ارسالی در این بخش به صورت زنده نمایش داده می‌شوند.
              </p>
            </div>
          ) : (
            dispatchedNotifications.map((notif) => {
              const isSMS = notif.type === 'sms';
              const isEmail = notif.type === 'email';
              const isBankOtp = notif.type === 'bank_otp';

              return (
                <div
                  key={notif.id}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2 hover:bg-white transition-colors shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 font-bold">
                      {isSMS && <Smartphone className="w-4 h-4 text-emerald-600" />}
                      {isEmail && <Mail className="w-4 h-4 text-blue-600" />}
                      {isBankOtp && <KeyRound className="w-4 h-4 text-amber-600" />}
                      
                      <span className={`
                        ${isSMS ? 'text-emerald-700' : ''}
                        ${isEmail ? 'text-blue-700' : ''}
                        ${isBankOtp ? 'text-amber-700' : ''}
                      `}>
                        {notif.title}
                      </span>
                    </div>

                    <span className="text-[10px] text-stone-400 font-mono">
                      {notif.timestamp}
                    </span>
                  </div>

                  <p className="text-xs text-stone-700 leading-relaxed">
                    {notif.message}
                  </p>

                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-500">
                    <span className="truncate">ارسال به: <strong className="dir-ltr inline-block font-mono text-stone-800">{notif.recipient}</strong></span>
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>تحویل شد</span>
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-stone-100 border-t border-stone-200 text-center text-[11px] text-stone-500">
          متصل به پنل پیامکی مجهز به سرشماره خدماتی گل آریس
        </div>

      </div>
    </div>
  );
};
