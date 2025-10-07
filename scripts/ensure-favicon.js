#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.join(projectRoot, 'public');
const srcLogo = path.join(projectRoot, 'src', 'logo.png');
const destFavicon = path.join(publicDir, 'favicon.png');

try {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  if (!fs.existsSync(destFavicon)) {
    if (fs.existsSync(srcLogo)) {
      fs.copyFileSync(srcLogo, destFavicon);
      console.log('Created public/favicon.png from src/favicon.png');
    } else {
      console.warn('No src/favicon.png found; skipping favicon creation.');
    }
  }
} catch (err) {
  console.error('Failed to ensure favicon.png:', err);
  process.exit(0);
}
