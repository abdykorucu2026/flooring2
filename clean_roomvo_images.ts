import * as fs from 'fs';
import * as path from 'path';

const dataDir = path.resolve('prisma/data/vinyl');
const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  let modified = false;
  
  for (const product of data) {
    if (product.images && Array.isArray(product.images)) {
      const originalLength = product.images.length;
      // Filter out roomvo or generic UI images
      product.images = product.images.filter(url => !url.includes('roomvo'));
      
      if (product.images.length !== originalLength) {
        modified = true;
      }
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Cleaned 'view in a room' images from ${file}`);
  }
}
