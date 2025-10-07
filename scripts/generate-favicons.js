#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

async function run() {
  const projectRoot = path.resolve(__dirname, '..');
  const publicDir = path.join(projectRoot, 'public');
  const srcLogo = path.join(projectRoot, 'src', 'favicon.png');
  const sizes = [32, 48];

  if (!fs.existsSync(srcLogo)) {
    console.error('Missing src/favicon.png, cannot generate favicons.');
    process.exit(0);
  }

  try {
    // lazy import sharp to handle environments without it gracefully
    const sharp = require('sharp');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    for (const size of sizes) {
      const out = path.join(publicDir, `favicon-${size}x${size}.png`);
      await sharp(srcLogo)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toFile(out);
      console.log(`Generated ${path.relative(projectRoot, out)}`);
    }

    // also write a default favicon.png (48x48)
    const def = path.join(publicDir, 'favicon.png');
    await sharp(srcLogo)
      .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(def);
    console.log(`Generated ${path.relative(projectRoot, def)}`);
  } catch (err) {
    console.warn('sharp not available or failed to generate favicons. Falling back to copy. Error:', err?.message || err);
    // Fallback: copy original logo to public/favicon.png
    const dest = path.join(projectRoot, 'public', 'favicon.png');
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(srcLogo, dest);
    console.log('Fallback: copied src/logo.png to public/favicon.png');
  }
}

run();
