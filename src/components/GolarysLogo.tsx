import React, { useState } from 'react';

interface GolarysLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'emerald' | 'gold' | 'light' | 'dark';
  className?: string;
  iconOnly?: boolean;
}

export const GolarysLogo: React.FC<GolarysLogoProps> = ({
  size = 'md',
  showText = true,
  variant = 'emerald',
  className = '',
  iconOnly = false,
}) => {
  const [imgError, setImgError] = useState(false);

  // Dimension mappings for the logo icon
  const iconDimensions = {
    xs: { px: 28, imgSize: 'w-7 h-7' },
    sm: { px: 36, imgSize: 'w-9 h-9' },
    md: { px: 46, imgSize: 'w-11 h-11' },
    lg: { px: 60, imgSize: 'w-15 h-15' },
    xl: { px: 80, imgSize: 'w-20 h-20' },
  };

  const { imgSize, px } = iconDimensions[size] || iconDimensions.md;

  // Text colors based on variant
  const titleColor =
    variant === 'light'
      ? 'text-white'
      : variant === 'gold'
      ? 'text-[#D4AF37]'
      : 'text-[#1F3F1B]';

  const badgeBg =
    variant === 'light'
      ? 'bg-white/20 text-[#D4AF37] border-white/30'
      : 'bg-[#2D5A27]/10 text-[#D4AF37] border-[#D4AF37]/30';

  const subtitleColor =
    variant === 'light' ? 'text-stone-300' : 'text-stone-500';

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none transition-transform ${className}`}
    >
      {/* Golden Iris Flower Emblem (Transparent Background) */}
      {!imgError ? (
        <img
          src="/logo-gold.png"
          alt="Golarys Gold Iris Logo"
          className={`${imgSize} object-contain shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_8px_rgba(212,175,55,0.25)]`}
          onError={() => setImgError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <svg
          width={px}
          height={px}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="goldGradFallback" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D77F" />
              <stop offset="40%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#997A1E" />
            </linearGradient>
            <linearGradient id="emeraldGradFallback" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3E7B35" />
              <stop offset="100%" stopColor="#172E14" />
            </linearGradient>
          </defs>
          <path
            d="M 50 50 C 35 35, 12 40, 20 62 C 26 78, 44 74, 50 50 Z"
            fill="url(#emeraldGradFallback)"
          />
          <path
            d="M 50 50 C 65 35, 88 40, 80 62 C 74 78, 56 74, 50 50 Z"
            fill="url(#emeraldGradFallback)"
          />
          <path
            d="M 50 14 C 40 28, 42 42, 50 52 C 58 42, 60 28, 50 14 Z"
            fill="url(#goldGradFallback)"
          />
          <path
            d="M 50 48 C 38 42, 30 28, 38 22 C 46 16, 48 34, 50 48 Z"
            fill="url(#goldGradFallback)"
          />
          <path
            d="M 50 48 C 62 42, 70 28, 62 22 C 54 16, 52 34, 50 48 Z"
            fill="url(#goldGradFallback)"
          />
          <path
            d="M 50 52 C 45 66, 46 82, 50 88 C 54 82, 55 66, 50 52 Z"
            fill="url(#goldGradFallback)"
          />
          <circle cx="50" cy="50" r="5" fill="#FAF0E6" stroke="url(#goldGradFallback)" strokeWidth="1.5" />
        </svg>
      )}

      {/* Brand Typography */}
      {showText && !iconOnly && (
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black font-heading tracking-tight ${titleColor} ${
                size === 'xs'
                  ? 'text-base'
                  : size === 'sm'
                  ? 'text-lg'
                  : size === 'md'
                  ? 'text-xl'
                  : size === 'lg'
                  ? 'text-2xl'
                  : 'text-3xl'
              }`}
            >
              گل آریس
            </span>
            <span
              className={`font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border text-[10px] ${badgeBg}`}
            >
              GOLARYS
            </span>
          </div>
          <span
            className={`font-medium tracking-tight ${subtitleColor} ${
              size === 'xs' || size === 'sm' ? 'text-[10px]' : 'text-[11px]'
            }`}
          >
            بازار آنلاین گل، گیاه و صنایع دستی
          </span>
        </div>
      )}
    </div>
  );
};
