import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Master SVG Vector for Golarys Brand Icon:
// hasBackground: true (with luxury emerald radial gradient) or false (transparent background)
// isAdaptiveForeground: true (scaled within 66% safe zone of 108dp canvas for Android Adaptive Icons)
export function createGolarysSvg(hasBackground = false, isAdaptiveForeground = false) {
  const transform = isAdaptiveForeground 
    ? 'transform="translate(85, 85) scale(0.66)"' 
    : 'transform="translate(0, 0) scale(1)"';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stopColor="#1E4B25"/>
      <stop offset="60%" stopColor="#173B1D"/>
      <stop offset="100%" stopColor="#112915"/>
    </radialGradient>

    <!-- Top Gold Center Petal -->
    <linearGradient id="goldCenterPetal" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stopColor="#FFE58F"/>
      <stop offset="30%" stopColor="#F5C842"/>
      <stop offset="70%" stopColor="#D49B24"/>
      <stop offset="100%" stopColor="#A67012"/>
    </linearGradient>

    <!-- Gold Left Petal -->
    <linearGradient id="goldLeftPetal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#FFE899"/>
      <stop offset="35%" stopColor="#F5C842"/>
      <stop offset="75%" stopColor="#C98F1D"/>
      <stop offset="100%" stopColor="#99630D"/>
    </linearGradient>

    <!-- Gold Right Petal -->
    <linearGradient id="goldRightPetal" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#FFE899"/>
      <stop offset="35%" stopColor="#F5C842"/>
      <stop offset="75%" stopColor="#C98F1D"/>
      <stop offset="100%" stopColor="#99630D"/>
    </linearGradient>

    <!-- Gold Stem / Lower Spear -->
    <linearGradient id="goldStem" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stopColor="#FCE07A"/>
      <stop offset="45%" stopColor="#DCA427"/>
      <stop offset="85%" stopColor="#B37812"/>
      <stop offset="100%" stopColor="#7E4F06"/>
    </linearGradient>

    <!-- Emerald Left Wing Petal -->
    <linearGradient id="emeraldLeft" x1="20%" y1="15%" x2="85%" y2="85%">
      <stop offset="0%" stopColor="#439348"/>
      <stop offset="40%" stopColor="#2E6C32"/>
      <stop offset="80%" stopColor="#1B471E"/>
      <stop offset="100%" stopColor="#102E13"/>
    </linearGradient>

    <!-- Emerald Right Wing Petal -->
    <linearGradient id="emeraldRight" x1="80%" y1="15%" x2="15%" y2="85%">
      <stop offset="0%" stopColor="#439348"/>
      <stop offset="40%" stopColor="#2E6C32"/>
      <stop offset="80%" stopColor="#1B471E"/>
      <stop offset="100%" stopColor="#102E13"/>
    </linearGradient>

    <!-- Pearl Gem Gradient -->
    <radialGradient id="pearlGrad" cx="35%" cy="30%" r="70%">
      <stop offset="0%" stopColor="#FFFFFF"/>
      <stop offset="45%" stopColor="#FFF7EC"/>
      <stop offset="75%" stopColor="#F2DFC7"/>
      <stop offset="100%" stopColor="#D9BE9B"/>
    </radialGradient>

    <!-- Soft Drop Shadows -->
    <filter id="petalShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000000" flood-opacity="0.32"/>
    </filter>
    <filter id="pearlShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#000000" flood-opacity="0.38"/>
    </filter>
  </defs>

  ${hasBackground ? '<rect width="512" height="512" rx="0" fill="url(#bgGrad)" />' : ''}

  <!-- Emblem Group -->
  <g ${transform} filter="url(#petalShadow)">
    
    <!-- 1. Left Emerald Petal Leaf -->
    <path 
      d="M 256 256 C 185 140, 24 160, 28 300 C 32 395, 140 415, 256 280 Z" 
      fill="url(#emeraldLeft)"
    />

    <!-- 2. Right Emerald Petal Leaf -->
    <path 
      d="M 256 256 C 327 140, 488 160, 484 300 C 480 395, 372 415, 256 280 Z" 
      fill="url(#emeraldRight)"
    />

    <!-- 3. Lower Golden Spear / Stem Petal -->
    <path 
      d="M 256 250 C 230 320, 222 410, 256 492 C 290 410, 282 320, 256 250 Z" 
      fill="url(#goldStem)"
    />

    <!-- 4. Top Left Golden Wing Petal -->
    <path 
      d="M 256 256 C 190 210, 125 130, 182 65 C 228 35, 248 145, 256 256 Z" 
      fill="url(#goldLeftPetal)"
    />

    <!-- 5. Top Right Golden Wing Petal -->
    <path 
      d="M 256 256 C 322 210, 387 130, 330 65 C 284 35, 264 145, 256 256 Z" 
      fill="url(#goldRightPetal)"
    />

    <!-- 6. Top Center Golden Petal -->
    <path 
      d="M 256 20 C 205 95, 210 195, 256 260 C 302 195, 307 95, 256 20 Z" 
      fill="url(#goldCenterPetal)"
    />

    <!-- 7. Central Pearl Gemstone with Golden Bezel -->
    <g filter="url(#pearlShadow)">
      <circle 
        cx="256" 
        cy="256" 
        r="36" 
        fill="#C99426" 
      />
      <circle 
        cx="256" 
        cy="256" 
        r="30" 
        fill="url(#pearlGrad)" 
        stroke="#E6B843" 
        stroke-width="3.5"
      />
      <circle 
        cx="245" 
        cy="245" 
        r="7" 
        fill="#FFFFFF" 
        opacity="0.9"
      />
    </g>
  </g>
</svg>`;
}

async function generateAllIcons() {
  const transparentSvg = Buffer.from(createGolarysSvg(false, false));
  const bgSvg = Buffer.from(createGolarysSvg(true, false));
  const adaptiveFgSvg = Buffer.from(createGolarysSvg(false, true));

  const destinations = [
    // Web public directory
    { file: 'public/logo-transparent.png', width: 512, height: 512, svg: transparentSvg },
    { file: 'public/logo-gold.png', width: 512, height: 512, svg: transparentSvg },
    { file: 'public/golarys-icon-transparent.png', width: 512, height: 512, svg: transparentSvg },
    { file: 'public/golarys-icon-1024.png', width: 1024, height: 1024, svg: transparentSvg },
    { file: 'public/logo-512.png', width: 512, height: 512, svg: bgSvg },
    { file: 'public/logo-192.png', width: 192, height: 192, svg: bgSvg },
    { file: 'public/golarys-play-store-icon-512.png', width: 512, height: 512, svg: bgSvg },
    { file: 'public/favicon.png', width: 64, height: 64, svg: bgSvg },

    // Android Legacy Icons (Full icon with luxury emerald background for all launcher sizes)
    { file: 'android/app/src/main/res/mipmap-mdpi/ic_launcher.png', width: 48, height: 48, svg: bgSvg },
    { file: 'android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png', width: 48, height: 48, svg: bgSvg },
    { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher.png', width: 72, height: 72, svg: bgSvg },
    { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png', width: 72, height: 72, svg: bgSvg },
    { file: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png', width: 96, height: 96, svg: bgSvg },
    { file: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png', width: 96, height: 96, svg: bgSvg },
    { file: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png', width: 144, height: 144, svg: bgSvg },
    { file: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png', width: 144, height: 144, svg: bgSvg },
    { file: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png', width: 192, height: 192, svg: bgSvg },
    { file: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png', width: 192, height: 192, svg: bgSvg },

    // Android Adaptive Icon Foregrounds (Scaled within safe area for API 26+)
    { file: 'android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png', width: 108, height: 108, svg: adaptiveFgSvg },
    { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png', width: 162, height: 162, svg: adaptiveFgSvg },
    { file: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png', width: 216, height: 216, svg: adaptiveFgSvg },
    { file: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png', width: 324, height: 324, svg: adaptiveFgSvg },
    { file: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png', width: 432, height: 432, svg: adaptiveFgSvg },

    // iOS app resources
    { file: 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png', width: 1024, height: 1024, svg: bgSvg },
    { file: 'ios/App/App/public/logo-512.png', width: 512, height: 512, svg: bgSvg },
    { file: 'ios/App/App/public/logo-192.png', width: 192, height: 192, svg: bgSvg },
    { file: 'ios/App/App/public/favicon.png', width: 64, height: 64, svg: bgSvg },
    { file: 'ios/App/App/public/logo-gold.png', width: 512, height: 512, svg: transparentSvg },
    { file: 'ios/App/App/public/logo-transparent.png', width: 512, height: 512, svg: transparentSvg },
  ];

  for (const item of destinations) {
    const dir = path.dirname(item.file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await sharp(item.svg)
      .resize(item.width, item.height)
      .png()
      .toFile(item.file);
    console.log(`Generated: ${item.file} (${item.width}x${item.height})`);
  }

  console.log('All Android & iOS native icons generated successfully!');
}

generateAllIcons().catch(console.error);
