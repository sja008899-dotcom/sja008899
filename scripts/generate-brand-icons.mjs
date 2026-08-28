import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Master SVG Vector for Golarys Brand Icon matching the uploaded play store icon
function createGolarysSvg(hasBackground = true) {
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
      <stop offset="0%" stopColor="#F6DA77"/>
      <stop offset="50%" stopColor="#D9A833"/>
      <stop offset="100%" stopColor="#B37E18"/>
    </linearGradient>

    <!-- Gold Left Petal -->
    <linearGradient id="goldLeftPetal" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F5D875"/>
      <stop offset="50%" stopColor="#D8A531"/>
      <stop offset="100%" stopColor="#A87313"/>
    </linearGradient>

    <!-- Gold Right Petal -->
    <linearGradient id="goldRightPetal" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#F5D875"/>
      <stop offset="50%" stopColor="#D8A531"/>
      <stop offset="100%" stopColor="#A87313"/>
    </linearGradient>

    <!-- Gold Stem / Lower Spear -->
    <linearGradient id="goldStem" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stopColor="#E5B943"/>
      <stop offset="50%" stopColor="#CE9925"/>
      <stop offset="100%" stopColor="#96640E"/>
    </linearGradient>

    <!-- Emerald Left Wing Petal -->
    <linearGradient id="emeraldLeft" x1="30%" y1="20%" x2="80%" y2="85%">
      <stop offset="0%" stopColor="#38773C"/>
      <stop offset="50%" stopColor="#2A5C2D"/>
      <stop offset="100%" stopColor="#1B3F1E"/>
    </linearGradient>

    <!-- Emerald Right Wing Petal -->
    <linearGradient id="emeraldRight" x1="70%" y1="20%" x2="20%" y2="85%">
      <stop offset="0%" stopColor="#38773C"/>
      <stop offset="50%" stopColor="#2A5C2D"/>
      <stop offset="100%" stopColor="#1B3F1E"/>
    </linearGradient>

    <!-- Pearl Gem Gradient -->
    <radialGradient id="pearlGrad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stopColor="#FFFFFF"/>
      <stop offset="60%" stopColor="#FBF4EA"/>
      <stop offset="100%" stopColor="#EAD8C1"/>
    </radialGradient>

    <!-- Soft Drop Shadows -->
    <filter id="petalShadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#071308" flood-opacity="0.45"/>
    </filter>
    <filter id="pearlShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#071308" flood-opacity="0.4"/>
    </filter>
  </defs>

  ${hasBackground ? '<rect width="512" height="512" rx="0" fill="url(#bgGrad)" />' : ''}

  <!-- Emblem Group Centered -->
  <g id="golarys-emblem" transform="translate(0, 0)">
    
    <!-- 1. Left Emerald Petal -->
    <path 
      d="M 256 256 C 220 200, 140 210, 148 276 C 154 322, 204 336, 256 270 Z" 
      fill="url(#emeraldLeft)"
      filter="url(#petalShadow)"
    />

    <!-- 2. Right Emerald Petal -->
    <path 
      d="M 256 256 C 292 200, 372 210, 364 276 C 358 322, 308 336, 256 270 Z" 
      fill="url(#emeraldRight)"
      filter="url(#petalShadow)"
    />

    <!-- 3. Lower Golden Spear/Stem Petal -->
    <path 
      d="M 256 250 C 244 285, 240 335, 256 388 C 272 335, 268 285, 256 250 Z" 
      fill="url(#goldStem)"
      filter="url(#petalShadow)"
    />

    <!-- 4. Top Left Golden Wing Petal -->
    <path 
      d="M 256 250 C 225 220, 195 165, 222 145 C 245 130, 252 185, 256 250 Z" 
      fill="url(#goldLeftPetal)"
      filter="url(#petalShadow)"
    />

    <!-- 5. Top Right Golden Wing Petal -->
    <path 
      d="M 256 250 C 287 220, 317 165, 290 145 C 267 130, 260 185, 256 250 Z" 
      fill="url(#goldRightPetal)"
      filter="url(#petalShadow)"
    />

    <!-- 6. Top Center Golden Petal -->
    <path 
      d="M 256 120 C 235 155, 240 215, 256 260 C 272 215, 277 155, 256 120 Z" 
      fill="url(#goldCenterPetal)"
      filter="url(#petalShadow)"
    />

    <!-- 7. Central Pearl Gemstone with Gold Bezel -->
    <circle 
      cx="256" 
      cy="256" 
      r="20" 
      fill="#C99426" 
      filter="url(#pearlShadow)"
    />
    <circle 
      cx="256" 
      cy="256" 
      r="17" 
      fill="url(#pearlGrad)" 
      stroke="#DDAE3B" 
      stroke-width="2"
    />
    <circle 
      cx="251" 
      cy="251" 
      r="4" 
      fill="#FFFFFF" 
      opacity="0.8"
    />
  </g>
</svg>`;
}

async function generateAllIcons() {
  const bgSvg = Buffer.from(createGolarysSvg(true));
  const transparentSvg = Buffer.from(createGolarysSvg(false));

  const destinations = [
    // Web public directory
    { file: 'public/golarys-play-store-icon-512.png', width: 512, height: 512, svg: bgSvg },
    { file: 'public/logo-512.png', width: 512, height: 512, svg: bgSvg },
    { file: 'public/logo-192.png', width: 192, height: 192, svg: bgSvg },
    { file: 'public/favicon.png', width: 64, height: 64, svg: bgSvg },
    { file: 'public/logo-gold.png', width: 512, height: 512, svg: transparentSvg },
    { file: 'public/logo-transparent.png', width: 512, height: 512, svg: transparentSvg },

    // Android app resources (mipmap)
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

    // iOS app resources
    { file: 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png', width: 1024, height: 1024, svg: bgSvg },
    { file: 'ios/App/App/public/logo-512.png', width: 512, height: 512, svg: bgSvg },
    { file: 'ios/App/App/public/logo-192.png', width: 192, height: 192, svg: bgSvg },
    { file: 'ios/App/App/public/favicon.png', width: 64, height: 64, svg: bgSvg },
    { file: 'ios/App/App/public/logo-gold.png', width: 512, height: 512, svg: transparentSvg },
  ];

  for (const item of destinations) {
    const dir = path.dirname(item.file);
    if (fs.existsSync(dir)) {
      await sharp(item.svg)
        .resize(item.width, item.height)
        .png()
        .toFile(item.file);
      console.log(`Generated: ${item.file} (${item.width}x${item.height})`);
    }
  }

  console.log('All Golarys brand icons generated successfully!');
}

generateAllIcons().catch(console.error);
