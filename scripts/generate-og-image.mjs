import { createCanvas } from 'canvas';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, '..', 'assets', 'img', 'og-default.png');

const WIDTH = 1200;
const HEIGHT = 630;

const canvas = createCanvas(WIDTH, HEIGHT);
const ctx = canvas.getContext('2d');

// Background — noir theme (#09090b)
ctx.fillStyle = '#09090b';
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Subtle gradient overlay
const gradient = ctx.createLinearGradient(0, 0, WIDTH, HEIGHT);
gradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
gradient.addColorStop(1, 'rgba(99, 102, 241, 0.02)');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, WIDTH, HEIGHT);

// Decorative line
ctx.strokeStyle = 'rgba(99, 102, 241, 0.4)';
ctx.lineWidth = 3;
ctx.beginPath();
ctx.moveTo(80, 500);
ctx.lineTo(400, 500);
ctx.stroke();

// Name
ctx.fillStyle = '#f5f5f5';
ctx.font = 'bold 64px sans-serif';
ctx.fillText('Nick Liu', 80, 220);

// Title
ctx.fillStyle = '#a1a1aa';
ctx.font = '32px sans-serif';
ctx.fillText('Senior Software Engineer @ Meta', 80, 280);

// Description
ctx.fillStyle = '#71717a';
ctx.font = '24px sans-serif';
ctx.fillText('Distributed Systems \u00B7 ML Infrastructure \u00B7 Backend Services', 80, 340);

// URL
ctx.fillStyle = '#6366f1';
ctx.font = '22px sans-serif';
ctx.fillText('nickboy.github.io', 80, 540);

// Write output
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, canvas.toBuffer('image/png'));
console.log(`OG image generated: ${outputPath}`);
