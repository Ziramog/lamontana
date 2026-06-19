import { promises as fs } from 'fs';
import path from 'path';

export async function getGalleryMedia() {
  try {
    const galleryDir = path.join(process.cwd(), 'public', 'gallery');
    const files = await fs.readdir(galleryDir);
    
    return files.map(file => {
      const isVideo = file.toLowerCase().endsWith('.mp4');
      return {
        src: `/gallery/${file}`,
        type: isVideo ? 'video' : 'image',
        filename: file
      };
    });
  } catch (error) {
    console.error("Error reading gallery directory:", error);
    return [];
  }
}
