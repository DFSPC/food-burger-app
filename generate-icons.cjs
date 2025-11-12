const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: 'icon-192.png', size: 192 },
  { name: 'icon-512.png', size: 512 },
  { name: 'favicon.png', size: 512 },
];

const androidSizes = [
  { folder: 'mipmap-mdpi', size: 48 },
  { folder: 'mipmap-hdpi', size: 72 },
  { folder: 'mipmap-xhdpi', size: 96 },
  { folder: 'mipmap-xxhdpi', size: 144 },
  { folder: 'mipmap-xxxhdpi', size: 192 },
];

async function generateIcons() {
  const svgPath = path.join(__dirname, 'public', 'logo.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  // Generate web icons
  for (const { name, size } of sizes) {
    const outputPath = path.join(__dirname, 'public', name);
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(outputPath);
    console.log(`Generated: ${outputPath}`);
  }

  // Generate Android icons
  for (const { folder, size } of androidSizes) {
    const baseDir = path.join(__dirname, 'android', 'app', 'src', 'main', 'res', folder);

    // ic_launcher.png
    const launcherPath = path.join(baseDir, 'ic_launcher.png');
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(launcherPath);
    console.log(`Generated: ${launcherPath}`);

    // ic_launcher_round.png
    const roundPath = path.join(baseDir, 'ic_launcher_round.png');
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(roundPath);
    console.log(`Generated: ${roundPath}`);

    // ic_launcher_foreground.png (larger for adaptive icons)
    const foregroundSize = Math.floor(size * 1.5);
    const foregroundPath = path.join(baseDir, 'ic_launcher_foreground.png');
    await sharp(svgBuffer)
      .resize(foregroundSize, foregroundSize)
      .png()
      .toFile(foregroundPath);
    console.log(`Generated: ${foregroundPath}`);
  }

  console.log('\n✓ All icons generated successfully!');
}

generateIcons().catch(console.error);
