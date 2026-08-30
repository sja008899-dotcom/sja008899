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
    xs: { px: 30, imgSize: 'w-7.5 h-7.5' },
    sm: { px: 40, imgSize: 'w-10 h-10' },
    md: { px: 52, imgSize: 'w-13 h-13' },
    lg: { px: 68, imgSize: 'w-17 h-17' },
    xl: { px: 92, imgSize: 'w-23 h-23' },
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
      ? 'bg-white/20 text-[#D4AF37] border-white/40'
      : 'bg-[#1F3F1B] text-[#D4AF37] border-[#D4AF37]/50';

  const subtitleColor =
    variant === 'light' ? 'text-stone-200' : 'text-stone-600';

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none transition-transform ${className}`}
    >
      {/* Official Master Golarys Golden Iris Jewel Logo */}
      <div 
        className={`relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${imgSize}`}
        style={{ width: `${px}px`, height: `${px}px` }}
      >
        <img
          src="/logo-transparent.png"
          alt="لوگوی رسمی گل آریس (Golarys)"
          className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(212,175,55,0.35)]"
          loading="eager"
          decoding="sync"
          onError={(e) => {
            if (!imgError) {
              setImgError(true);
              (e.target as HTMLImageElement).src = '/logo-gold.png';
            }
          }}
        />
      </div>

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
