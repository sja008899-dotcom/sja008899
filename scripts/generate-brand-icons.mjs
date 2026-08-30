import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const sourceImage = 'src/assets/images/golarys_company_logo_1788051723462.jpg';

async function generateAllBrandIcons() {
  if (!fs.existsSync(sourceImage)) {
    console.error('Source image not found:', sourceImage);
    return;
  }

  console.log('Processing master company logo from:', sourceImage);

  // 1. Create a 1024x1024 base buffer with high quality
  const masterBuffer = await sharp(sourceImage)
    .resize(1024, 1024, { fit: 'cover' })
    .png({ quality: 100 })
    .toBuffer();

  // 2. Create a clean transparent version by isolating the white background
  // For pixels very close to pure white (r > 245, g > 245, b > 245), make them transparent
  const { data, info } = await sharp(masterBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixelCount = info.width * info.height;
  const transparentData = Buffer.from(data);

  for (let i = 0; i < pixelCount; i++) {
    const offset = i * 4;
    const r = transparentData[offset];
    const g = transparentData[offset + 1];
    const b = transparentData[offset + 2];

    // Detect white perimeter background
    if (r > 246 && g > 246 && b > 246) {
      transparentData[offset + 3] = 0; // Transparent
    } else if (r > 235 && g > 235 && b > 235) {
      // Soft antialiased blend on edges
      const alphaFactor = (255 - Math.max(r, g, b)) / 20;
      transparentData[offset + 3] = Math.min(255, Math.floor(alphaFactor * 255));
    }
  }

  const transparentBuffer = await sharp(transparentData, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    }
  })
  .png({ quality: 100 })
  .toBuffer();

  // Create adaptive foreground for Android (scaled to 72% within 108dp safe zone)
  const adaptiveForegroundBuffer = await sharp(transparentBuffer)
    .resize(740, 740, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 142,
      bottom: 142,
      left: 142,
      right: 142,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .resize(1024, 1024)
    .png()
    .toBuffer();

  const destinations = [
    // Web public directory
    { file: 'public/logo-gold.png', width: 512, height: 512, buffer: masterBuffer },
    { file: 'public/logo-transparent.png', width: 512, height: 512, buffer: transparentBuffer },
    { file: 'public/golarys-icon-transparent.png', width: 512, height: 512, buffer: transparentBuffer },
    { file: 'public/golarys-icon-1024.png', width: 1024, height: 1024, buffer: masterBuffer },
    { file: 'public/logo-512.png', width: 512, height: 512, buffer: masterBuffer },
    { file: 'public/logo-192.png', width: 192, height: 192, buffer: masterBuffer },
    { file: 'public/golarys-play-store-icon-512.png', width: 512, height: 512, buffer: masterBuffer },
    { file: 'public/favicon.png', width: 64, height: 64, buffer: masterBuffer },

    // Android Legacy Icons
    { file: 'android/app/src/main/res/mipmap-mdpi/ic_launcher.png', width: 48, height: 48, buffer: masterBuffer },
    { file: 'android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png', width: 48, height: 48, buffer: masterBuffer },
    { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher.png', width: 72, height: 72, buffer: masterBuffer },
    { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png', width: 72, height: 72, buffer: masterBuffer },
    { file: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher.png', width: 96, height: 96, buffer: masterBuffer },
    { file: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png', width: 96, height: 96, buffer: masterBuffer },
    { file: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png', width: 144, height: 144, buffer: masterBuffer },
    { file: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png', width: 144, height: 144, buffer: masterBuffer },
    { file: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png', width: 192, height: 192, buffer: masterBuffer },
    { file: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png', width: 192, height: 192, buffer: masterBuffer },

    // Android Adaptive Icon Foregrounds
    { file: 'android/app/src/main/res/mipmap-mdpi/ic_launcher_foreground.png', width: 108, height: 108, buffer: adaptiveForegroundBuffer },
    { file: 'android/app/src/main/res/mipmap-hdpi/ic_launcher_foreground.png', width: 162, height: 162, buffer: adaptiveForegroundBuffer },
    { file: 'android/app/src/main/res/mipmap-xhdpi/ic_launcher_foreground.png', width: 216, height: 216, buffer: adaptiveForegroundBuffer },
    { file: 'android/app/src/main/res/mipmap-xxhdpi/ic_launcher_foreground.png', width: 324, height: 324, buffer: adaptiveForegroundBuffer },
    { file: 'android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_foreground.png', width: 432, height: 432, buffer: adaptiveForegroundBuffer },

    // iOS app resources (AppIcon-512@2x = 1024x1024 App Store Icon)
    { file: 'ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png', width: 1024, height: 1024, buffer: masterBuffer },
    { file: 'ios/App/App/public/logo-512.png', width: 512, height: 512, buffer: masterBuffer },
    { file: 'ios/App/App/public/logo-192.png', width: 192, height: 192, buffer: masterBuffer },
    { file: 'ios/App/App/public/favicon.png', width: 64, height: 64, buffer: masterBuffer },
    { file: 'ios/App/App/public/logo-gold.png', width: 512, height: 512, buffer: masterBuffer },
    { file: 'ios/App/App/public/logo-transparent.png', width: 512, height: 512, buffer: transparentBuffer },
    { file: 'ios/App/App/public/golarys-icon-1024.png', width: 1024, height: 1024, buffer: masterBuffer },
  ];

  for (const item of destinations) {
    const dir = path.dirname(item.file);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    await sharp(item.buffer)
      .resize(item.width, item.height)
      .png({ quality: 95 })
      .toFile(item.file);
    console.log(`Generated official asset: ${item.file} (${item.width}x${item.height})`);
  }

  console.log('✅ Successfully replaced and synchronized ALL official Golarys logos and app icons!');
}

generateAllBrandIcons().catch(console.error);
