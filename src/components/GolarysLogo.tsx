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
            <linearGradient id="goldCenterPetalFallback" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#F6DA77" />
              <stop offset="50%" stopColor="#D9A833" />
              <stop offset="100%" stopColor="#B37E18" />
            </linearGradient>
            <linearGradient id="goldLeftPetalFallback" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5D875" />
              <stop offset="50%" stopColor="#D8A531" />
              <stop offset="100%" stopColor="#A87313" />
            </linearGradient>
            <linearGradient id="goldRightPetalFallback" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5D875" />
              <stop offset="50%" stopColor="#D8A531" />
              <stop offset="100%" stopColor="#A87313" />
            </linearGradient>
            <linearGradient id="goldStemFallback" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#E5B943" />
              <stop offset="50%" stopColor="#CE9925" />
              <stop offset="100%" stopColor="#96640E" />
            </linearGradient>
            <linearGradient id="emeraldLeftFallback" x1="30%" y1="20%" x2="80%" y2="85%">
              <stop offset="0%" stopColor="#38773C" />
              <stop offset="50%" stopColor="#2A5C2D" />
              <stop offset="100%" stopColor="#1B3F1E" />
            </linearGradient>
            <linearGradient id="emeraldRightFallback" x1="70%" y1="20%" x2="20%" y2="85%">
              <stop offset="0%" stopColor="#38773C" />
              <stop offset="50%" stopColor="#2A5C2D" />
              <stop offset="100%" stopColor="#1B3F1E" />
            </linearGradient>
            <radialGradient id="pearlGradFallback" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#FBF4EA" />
              <stop offset="100%" stopColor="#EAD8C1" />
            </radialGradient>
          </defs>
          <g transform="scale(0.195) translate(0, 0)">
            <path d="M 256 256 C 220 200, 140 210, 148 276 C 154 322, 204 336, 256 270 Z" fill="url(#emeraldLeftFallback)" />
            <path d="M 256 256 C 292 200, 372 210, 364 276 C 358 322, 308 336, 256 270 Z" fill="url(#emeraldRightFallback)" />
            <path d="M 256 250 C 244 285, 240 335, 256 388 C 272 335, 268 285, 256 250 Z" fill="url(#goldStemFallback)" />
            <path d="M 256 250 C 225 220, 195 165, 222 145 C 245 130, 252 185, 256 250 Z" fill="url(#goldLeftPetalFallback)" />
            <path d="M 256 250 C 287 220, 317 165, 290 145 C 267 130, 260 185, 256 250 Z" fill="url(#goldRightPetalFallback)" />
            <path d="M 256 120 C 235 155, 240 215, 256 260 C 272 215, 277 155, 256 120 Z" fill="url(#goldCenterPetalFallback)" />
            <circle cx="256" cy="256" r="20" fill="#C99426" />
            <circle cx="256" cy="256" r="17" fill="url(#pearlGradFallback)" stroke="#DDAE3B" strokeWidth="2" />
          </g>
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
