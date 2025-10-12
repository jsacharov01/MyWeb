#!/usr/bin/env node
/*
  Generate optimized responsive image variants (WebP/AVIF) for images in src/.
  - Scans src/** for .png, .jpg, .jpeg (excluding favicon.png)
  - Emits into public/images/optimized as <name>-w<width>.(webp|avif)
  - Writes a manifest at public/images/optimized/manifest.json
*/

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const SRC_DIR = path.join(PROJECT_ROOT, 'src');
const OUT_DIR = path.join(PROJECT_ROOT, 'public', 'images', 'optimized');

const VALID_EXT = new Set(['.png', '.jpg', '.jpeg']);
const EXCLUDES = new Set([
  path.join(SRC_DIR, 'favicon.png'),
]);

const TARGET_WIDTHS = [400, 800, 1200, 1600];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files = files.concat(walk(full));
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase();
      if (VALID_EXT.has(ext) && !EXCLUDES.has(full)) files.push(full);
    }
  }
  return files;
}

async function ensureDir(p) {
  await fs.promises.mkdir(p, { recursive: true });
}

async function run() {
  const images = walk(SRC_DIR);
  if (images.length === 0) {
    console.log('optimize-images: no images found in src/. Nothing to do.');
    return;
  }
  try {
    const sharp = require('sharp');
    await ensureDir(OUT_DIR);

    const manifest = {};

    for (const file of images) {
      const rel = path.relative(PROJECT_ROOT, file);
      const base = path.basename(file, path.extname(file));
      const outBase = base.replace(/\s+/g, '-').toLowerCase();

      try {
        const img = sharp(file);
        const meta = await img.metadata();
        const origW = meta.width || 0;
        const origH = meta.height || 0;
        if (!origW || !origH) {
          console.warn(`optimize-images: cannot read metadata for ${rel}, skipping.`);
          continue;
        }

        const widths = TARGET_WIDTHS.filter(w => w <= origW).length
          ? TARGET_WIDTHS.filter(w => w <= origW)
          : [Math.min(origW, TARGET_WIDTHS[0])];

        const variants = [];
        for (const w of widths) {
          const webpOut = path.join(OUT_DIR, `${outBase}-w${w}.webp`);
          await sharp(file)
            .resize({ width: w, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toFile(webpOut);
          variants.push({ width: w, type: 'image/webp', url: `/images/optimized/${path.basename(webpOut)}` });

          const avifOut = path.join(OUT_DIR, `${outBase}-w${w}.avif`);
          await sharp(file)
            .resize({ width: w, withoutEnlargement: true })
            .avif({ quality: 50 })
            .toFile(avifOut);
          variants.push({ width: w, type: 'image/avif', url: `/images/optimized/${path.basename(avifOut)}` });
        }

        manifest[rel] = {
          width: origW,
          height: origH,
          variants: variants.sort((a, b) => a.width - b.width),
        };
        console.log(`Optimized ${rel} → ${variants.length} variants`);
      } catch (e) {
        console.warn(`optimize-images: failed processing ${rel}:`, e?.message || e);
      }
    }

    const manifestPath = path.join(OUT_DIR, 'manifest.json');
    await fs.promises.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`Wrote manifest ${path.relative(PROJECT_ROOT, manifestPath)}`);
  } catch (err) {
    console.warn('optimize-images: sharp not available or failed to run. Skipping. Error:', err?.message || err);
  }
}

run();
