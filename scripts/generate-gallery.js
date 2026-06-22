const fs = require('fs');
const path = require('path');

const galleryDir = path.join(process.cwd(), 'public', 'gallery');
const outputFile = path.join(process.cwd(), 'data', 'gallery.json');

try {
  const files = fs.readdirSync(galleryDir);
  const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.mp4'];
  
  const galleryMedia = files
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return validExtensions.includes(ext);
    })
    .sort((a, b) => {
      if (a === 'recorrido2.11.mp4') return -1;
      if (b === 'recorrido2.11.mp4') return 1;
      return a.localeCompare(b);
    })
    .map(file => {
      const isVideo = file.toLowerCase().endsWith('.mp4');
      return {
        src: `/gallery/${file}`,
        type: isVideo ? 'video' : 'image',
        filename: file
      };
    });

  // Ensure data directory exists
  const dataDir = path.dirname(outputFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(outputFile, JSON.stringify(galleryMedia, null, 2));
  console.log('✅ Successfully generated gallery.json');
} catch (error) {
  console.error("❌ Error generating gallery.json:", error);
  process.exit(1);
}
