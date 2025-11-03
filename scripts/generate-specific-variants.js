#!/usr/bin/env node
/*
  One-off helper to generate specific responsive variants (webp/avif)
  for Analytické myšlení cover image at 1200px and 1600px widths.
  This script allows upscaling if the source is smaller.
*/
const fs = require('fs');
const path = require('path');

(async () => {
  const PROJECT_ROOT = path.resolve(__dirname, '..');
  const SRC = path.join(PROJECT_ROOT, 'src', 'images', 'blog', 'analyticke-mysleni', 'analyticke-mysleni-cover.png');
  const OUT_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'optimized');
  const BASE = 'analyticke-mysleni-cover';
  const WIDTHS = [1200, 1600];

  try {
    const sharp = require('sharp');

    await fs.promises.mkdir(OUT_DIR, { recursive: true });

    const img = sharp(SRC);
    const meta = await img.metadata();
    console.log(`Source: ${path.relative(PROJECT_ROOT, SRC)} (${meta.width}x${meta.height})`);

    for (const w of WIDTHS) {
      const webpOut = path.join(OUT_DIR, `${BASE}-w${w}.webp`);
      const avifOut = path.join(OUT_DIR, `${BASE}-w${w}.avif`);
      await sharp(SRC)
        .resize({ width: w, withoutEnlargement: false })
        .webp({ quality: 82 })
        .toFile(webpOut);
      await sharp(SRC)
        .resize({ width: w, withoutEnlargement: false })
        .avif({ quality: 50 })
        .toFile(avifOut);
      console.log(`Wrote ${path.basename(webpOut)} and ${path.basename(avifOut)}`);
    }

    console.log('Done.');
  } catch (err) {
    console.error('Failed to generate variants:', err?.message || err);
    process.exitCode = 1;
  }
})();
