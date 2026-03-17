/* eslint-disable @typescript-eslint/no-require-imports */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/images/hero');
const files = fs.readdirSync(dir).filter(f => !fs.statSync(path.join(dir, f)).isDirectory());

const outDir = path.join(dir, 'optimized');
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true });
}
fs.mkdirSync(outDir);

async function run() {
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const ext = path.extname(f).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;
    const src = path.join(dir, f);
    const dst = path.join(outDir, (i + 1) + '.jpg');
    try {
      await sharp(src)
        .resize({ width: 1920, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(dst);
      const orig = fs.statSync(src).size;
      const opt = fs.statSync(dst).size;
      console.log(f + ' -> ' + (i + 1) + '.jpg | ' + Math.round(orig / 1024) + 'K -> ' + Math.round(opt / 1024) + 'K');
    } catch (e) {
      console.error('ERR ' + f + ': ' + e.message);
    }
  }
  console.log('Done');
}

run();
