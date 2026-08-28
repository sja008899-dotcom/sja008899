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
      {/* Golden Iris Flower Emblem (Razor-sharp, Large, Transparent Vector) */}
      <svg
        width={px}
        height={px}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_10px_rgba(212,175,55,0.3)]"
      >
        <defs>
          <linearGradient id="goldCenterPetalFull" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FFE58F" />
            <stop offset="30%" stopColor="#F5C842" />
            <stop offset="70%" stopColor="#D49B24" />
            <stop offset="100%" stopColor="#A67012" />
          </linearGradient>

          <linearGradient id="goldLeftPetalFull" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE899" />
            <stop offset="35%" stopColor="#F5C842" />
            <stop offset="75%" stopColor="#C98F1D" />
            <stop offset="100%" stopColor="#99630D" />
          </linearGradient>

          <linearGradient id="goldRightPetalFull" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE899" />
            <stop offset="35%" stopColor="#F5C842" />
            <stop offset="75%" stopColor="#C98F1D" />
            <stop offset="100%" stopColor="#99630D" />
          </linearGradient>

          <linearGradient id="goldStemFull" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#FCE07A" />
            <stop offset="45%" stopColor="#DCA427" />
            <stop offset="85%" stopColor="#B37812" />
            <stop offset="100%" stopColor="#7E4F06" />
          </linearGradient>

          <linearGradient id="emeraldLeftFull" x1="20%" y1="15%" x2="85%" y2="85%">
            <stop offset="0%" stopColor="#439348" />
            <stop offset="40%" stopColor="#2E6C32" />
            <stop offset="80%" stopColor="#1B471E" />
            <stop offset="100%" stopColor="#102E13" />
          </linearGradient>

          <linearGradient id="emeraldRightFull" x1="80%" y1="15%" x2="15%" y2="85%">
            <stop offset="0%" stopColor="#439348" />
            <stop offset="40%" stopColor="#2E6C32" />
            <stop offset="80%" stopColor="#1B471E" />
            <stop offset="100%" stopColor="#102E13" />
          </linearGradient>

          <radialGradient id="pearlGradFull" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FFF7EC" />
            <stop offset="75%" stopColor="#F2DFC7" />
            <stop offset="100%" stopColor="#D9BE9B" />
          </radialGradient>

          <filter id="logoShadowFull" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        <g id="golarys-vector-emblem" filter="url(#logoShadowFull)">
          <path
            d="M 256 256 C 185 140, 24 160, 28 300 C 32 395, 140 415, 256 280 Z"
            fill="url(#emeraldLeftFull)"
          />

          <path
            d="M 256 256 C 327 140, 488 160, 484 300 C 480 395, 372 415, 256 280 Z"
            fill="url(#emeraldRightFull)"
          />

          <path
            d="M 256 250 C 230 320, 222 410, 256 492 C 290 410, 282 320, 256 250 Z"
            fill="url(#goldStemFull)"
          />

          <path
            d="M 256 256 C 190 210, 125 130, 182 65 C 228 35, 248 145, 256 256 Z"
            fill="url(#goldLeftPetalFull)"
          />

          <path
            d="M 256 256 C 322 210, 387 130, 330 65 C 284 35, 264 145, 256 256 Z"
            fill="url(#goldRightPetalFull)"
          />

          <path
            d="M 256 20 C 205 95, 210 195, 256 260 C 302 195, 307 95, 256 20 Z"
            fill="url(#goldCenterPetalFull)"
          />

          <circle cx="256" cy="256" r="36" fill="#C99426" />
          <circle
            cx="256"
            cy="256"
            r="30"
            fill="url(#pearlGradFull)"
            stroke="#E6B843"
            strokeWidth="3.5"
          />
          <circle cx="245" cy="245" r="7" fill="#FFFFFF" opacity="0.9" />
        </g>
      </svg>

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
