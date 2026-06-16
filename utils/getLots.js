import { promises as fs } from 'fs';
import path from 'path';

export async function getLots() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'lots.json');
    const fileContents = await fs.readFile(dataPath, 'utf8');
    const lots = JSON.parse(fileContents);
    return lots;
  } catch (error) {
    console.error("Error reading lots.json:", error);
    return [];
  }
}

export async function getLotById(id) {
  try {
    const lots = await getLots();
    return lots.find(lot => lot._id === id || lot.id === id) || null;
  } catch (error) {
    console.error(`Error finding lot with id ${id}:`, error);
    return null;
  }
}
