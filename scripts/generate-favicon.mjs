import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const staticDir = join(__dirname, '..', 'static');

mkdirSync(staticDir, { recursive: true });

function generateFavicon(size, outputName) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background — indigo accent from noir theme
  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (size <= 16) {
    // 16x16: simplified to just <> (text illegible at this size)
    const fontSize = Math.round(size * 0.55);
    ctx.font = `bold ${fontSize}px monospace`;
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.fillText('<>', size / 2, size / 2 + size * 0.02);
  } else {
    // 32x32 and 180x180: full <NL/> rendering
    const centerX = size / 2;
    const centerY = size / 2 + size * 0.02;

    // Brackets in semi-transparent white
    const bracketSize = Math.round(size * 0.28);
    ctx.font = `bold ${bracketSize}px monospace`;
    ctx.fillStyle = 'rgba(255,255,255,0.7)';

    // Measure to position properly
    const nlWidth = ctx.measureText('NL').width;
    const ltWidth = ctx.measureText('<').width;
    const slashGtWidth = ctx.measureText('/>').width;

    const totalWidth = ltWidth + nlWidth + slashGtWidth + size * 0.04;
    const startX = centerX - totalWidth / 2;

    // Draw '<'
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.textAlign = 'left';
    ctx.fillText('<', startX, centerY);

    // Draw 'NL' in solid white
    ctx.fillStyle = '#ffffff';
    ctx.fillText('NL', startX + ltWidth + size * 0.02, centerY);

    // Draw '/>'
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('/>', startX + ltWidth + nlWidth + size * 0.04, centerY);
  }

  const outputPath = join(staticDir, outputName);
  writeFileSync(outputPath, canvas.toBuffer('image/png'));
  console.log(`Generated: ${outputPath}`);
}

// Generate all sizes
generateFavicon(16, 'favicon-16x16.png');
generateFavicon(32, 'favicon-32x32.png');
generateFavicon(180, 'apple-touch-icon.png');

// Generate favicon.ico (proper ICO format wrapping 32x32 PNG)
function generateIcoCanvas() {
  const size = 32;
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  ctx.arc(16, 16, 16, 0, Math.PI * 2);
  ctx.fill();

  const centerX = size / 2;
  const centerY = size / 2 + size * 0.02;

  const bracketSize = Math.round(size * 0.28);
  ctx.font = `bold ${bracketSize}px monospace`;
  ctx.textBaseline = 'middle';

  const nlWidth = ctx.measureText('NL').width;
  const ltWidth = ctx.measureText('<').width;
  const slashGtWidth = ctx.measureText('/>').width;

  const totalWidth = ltWidth + nlWidth + slashGtWidth + size * 0.04;
  const startX = centerX - totalWidth / 2;

  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('<', startX, centerY);

  ctx.fillStyle = '#ffffff';
  ctx.fillText('NL', startX + ltWidth + size * 0.02, centerY);

  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.fillText('/>', startX + ltWidth + nlWidth + size * 0.04, centerY);

  return canvas;
}

const icoCanvas = generateIcoCanvas();
const pngData = icoCanvas.toBuffer('image/png');

// Build ICO file: 6-byte header + 16-byte directory entry + PNG payload
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);      // Reserved, must be 0
header.writeUInt16LE(1, 2);      // Type: 1 = ICO
header.writeUInt16LE(1, 4);      // Number of images: 1

const dirEntry = Buffer.alloc(16);
dirEntry.writeUInt8(32, 0);      // Width (32; 0 means 256)
dirEntry.writeUInt8(32, 1);      // Height
dirEntry.writeUInt8(0, 2);       // Color palette count (0 = no palette)
dirEntry.writeUInt8(0, 3);       // Reserved
dirEntry.writeUInt16LE(1, 4);    // Color planes
dirEntry.writeUInt16LE(32, 6);   // Bits per pixel
dirEntry.writeUInt32LE(pngData.length, 8);  // Image data size
dirEntry.writeUInt32LE(22, 12);  // Offset to image data (6 + 16 = 22)

const icoBuffer = Buffer.concat([header, dirEntry, pngData]);
writeFileSync(join(staticDir, 'favicon.ico'), icoBuffer);
console.log(`Generated: ${join(staticDir, 'favicon.ico')} (valid ICO format)`);

// Generate site.webmanifest
const manifest = {
  name: 'Nick Liu',
  short_name: 'NL',
  icons: [
    { src: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { src: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
  theme_color: '#09090b',
  background_color: '#09090b',
  display: 'standalone',
};
writeFileSync(
  join(staticDir, 'site.webmanifest'),
  JSON.stringify(manifest, null, 2) + '\n',
);
console.log(`Generated: ${join(staticDir, 'site.webmanifest')}`);
