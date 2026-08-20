import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-2xl shadow-xl border text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in slide-in-from-bottom duration-300 pointer-events-auto ${
            toast.type === 'success'
              ? 'bg-[#1F3F1B] text-white border-[#2D5A27] ring-1 ring-[#D4AF37]/40'
              : toast.type === 'error'
              ? 'bg-rose-900 text-white border-rose-700'
              : 'bg-stone-900 text-white border-stone-700'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-stone-300 shrink-0" />}
          
          <span className="leading-snug">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
