// tools/generate-ios-icons.js
// Node script to generate iOS App Icon sizes from a source SVG or PNG using sharp.
// Usage: node tools/generate-ios-icons.js --input=assets/logo.png --output=ios/App/Assets.xcassets/AppIcon.appiconset

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sizes = [
  // {size, idiom, scale}
  {size:20, scales:[1,2,3]},
  {size:29, scales:[1,2,3]},
  {size:40, scales:[1,2,3]},
  {size:60, scales:[2,3]},
  {size:76, scales:[1,2]},
  {size:83.5, scales:[2]},
  {size:1024, scales:[1]} // App Store
];

function usage(){
  console.log('Usage: node tools/generate-ios-icons.js --input=assets/logo.png --output=ios/MyApp/Assets.xcassets/AppIcon.appiconset');
}

async function main(){
  const argv = require('minimist')(process.argv.slice(2));
  const input = argv.input || argv.i;
  const output = argv.output || argv.o;
  if(!input || !output){ usage(); process.exit(1); }
  if(!fs.existsSync(input)){ console.error('Input file not found:', input); process.exit(1); }
  fs.mkdirSync(output, { recursive: true });

  const images = [];
  for(const s of sizes){
    for(const scale of s.scales){
      const px = Math.round(s.size * scale);
      const filename = `icon_${s.size}x${s.size}@${scale}x.png`;
      const outpath = path.join(output, filename);
      console.log('Generating', outpath, px+'x'+px);
      await sharp(input)
        .resize(px, px, { fit: 'contain', background: {r:0,g:0,b:0,alpha:0} })
        .png({ quality: 90 })
        .toFile(outpath);
      images.push({ size: s.size, scale, filename, idiom: 'iphone' });
    }
  }

  // create Contents.json template
  const contents = {
    images: [],
    info: { version: 1, author: 'xcode' }
  };
  for(const s of sizes){
    for(const scale of s.scales){
      const filename = `icon_${s.size}x${s.size}@${scale}x.png`;
      contents.images.push({
        idiom: 'iphone',
        size: `${s.size}x${s.size}`,
        filename,
        scale: `${scale}x`
      });
    }
  }

  fs.writeFileSync(path.join(output,'Contents.json'), JSON.stringify(contents, null, 2));
  console.log('Generated', images.length, 'icons and Contents.json in', output);
}

main().catch(err=>{ console.error(err); process.exit(1); });
