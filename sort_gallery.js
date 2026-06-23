const fs = require('fs');

// Read files from directory directly to ensure we get the latest renames
const files = fs.readdirSync('F:/LAMONTAÑA/public/gallery');

// Filter only "fotoX.jpeg" and "videoX.mp4" or "VideoX.mp4"
const fotoFiles = files.filter(f => f.toLowerCase().startsWith('foto') && f.endsWith('.jpeg'));
const videoFiles = files.filter(f => f.toLowerCase().startsWith('video') && f.endsWith('.mp4'));

// Sort fotos
fotoFiles.sort((a, b) => {
  const numA = parseInt(a.match(/\d+/)[0], 10);
  const numB = parseInt(b.match(/\d+/)[0], 10);
  return numA - numB;
});

// Sort videos
videoFiles.sort((a, b) => {
  const numA = parseInt(a.match(/\d+/)[0], 10);
  const numB = parseInt(b.match(/\d+/)[0], 10);
  return numA - numB;
});

const sortedFiles = [...fotoFiles, ...videoFiles];

const data = sortedFiles.map(f => {
  const src = '/gallery/' + f;
  const isVideo = f.endsWith('.mp4');
  return { src, type: isVideo ? 'video' : 'image', filename: f, width: 1920, height: 1280 };
});

fs.writeFileSync('F:/LAMONTAÑA/data/gallery.json', JSON.stringify(data, null, 2));
console.log('Gallery JSON updated with new videos.');
