// Genera assets optimizados (AVIF/WebP responsivos, favicons, OG) en public/img.
// Uso: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { mkdirSync, copyFileSync } from 'node:fs';

const OUT = 'public/img';
mkdirSync(OUT, { recursive: true });
sharp.cache(false);

async function variants(src, name, widths, { extract, q = 62 } = {}) {
  for (const w of widths) {
    let p = sharp(src, { limitInputPixels: false });
    if (extract) p = p.extract(extract);
    p = p.resize({ width: w, withoutEnlargement: true });
    const buf = await p.toBuffer();
    await sharp(buf).avif({ quality: q - 12, effort: 5 }).toFile(`${OUT}/${name}-${w}.avif`);
    await sharp(buf).webp({ quality: q + 10 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
}

// Hero: ilustración 3D (teléfono + categorías) recortada del arte original sin el texto horneado.
await variants('public/Hero-edited.png', 'hero-phone', [420, 696], { extract: { left: 680, top: 0, width: 696, height: 740 } });
// Iconos 3D de categorías (originales 6250px, ~25 MB c/u)
for (const n of [2, 3, 4, 5, 6, 7, 8, 9]) await variants(`public/Assets/Iconos_Categorias_Semper_Fi/${n}.png`, `cat-${n}`, [160, 320]);
// Capturas de la app
for (const n of ['Inicio', 'login', 'Perfiles', 'Reservas', 'Comida1', 'Comida2']) await variants(`public/${n}.jpeg`, `app-${n.toLowerCase()}`, [300, 540]);
// Fotos de servicios
for (let n = 1; n <= 8; n++) await variants(`public/service${n}.png`, `service-${n}`, [480]);
// Ilustraciones
await variants('public/Assets/conectandoTC.png', 'conectando', [600, 1000]);
await variants('public/Assets/animacion-semperFi.png', 'domicilios-online', [600, 1000]);
await variants('public/Assets/Efiia-image.png', 'efiia', [600, 1000]);
// Integrantes
for (const n of ['alexander-trullo', 'deiby-ramirez', 'david-urrutia', 'oscar-yepez', 'melki-santiago']) await variants(`public/integrantes/${n}.png`, `team-${n}`, [320]);
// Logo
const logo = 'public/Assets/Logo_Semper_Fi_transparente.png';
await variants(logo, 'logo', [96, 256]);
const grad = 'public/Assets/1_1_Logo_Semper_Fi_Con_Fondo_Degradado.png';
await sharp(grad, { limitInputPixels: false }).resize(32).png({ palette: true, quality: 80 }).toFile('public/favicon-32.png');
await sharp(grad, { limitInputPixels: false }).resize(180).png({ palette: true, quality: 80 }).toFile('public/apple-touch-icon.png');
await sharp(grad, { limitInputPixels: false }).resize(192).png({ palette: true, quality: 80 }).toFile('public/icon-192.png');
// Póster del preloader (primer frame aproximado = logo sobre degradado)
await sharp(grad, { limitInputPixels: false }).resize(240).webp({ quality: 75 }).toFile(`${OUT}/preloader-logo.webp`);
// Open Graph 1200x630
const heroBuf = await sharp('public/Hero-edited.png').extract({ left: 680, top: 0, width: 696, height: 740 }).resize({ height: 630 }).toBuffer();
const logoBuf = await sharp(logo).resize(220).toBuffer();
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="g" cx="75%" cy="40%" r="60%"><stop offset="0" stop-color="#2ebaf8" stop-opacity=".45"/><stop offset="1" stop-color="#0a1628" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="#0a1628"/><rect width="1200" height="630" fill="url(#g)"/></svg>`);
await sharp(svg).composite([{ input: heroBuf, left: 640, top: 0 }, { input: logoBuf, left: 90, top: 205 }]).jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/og-semperfi.jpg`);
console.log('ok');
