import fs from 'fs';
import path from 'path';

// Read PNG and find bounding box of non-zero alpha bytes
function getPngTrimBoundingBox(filePath) {
  const buf = fs.readFileSync(filePath);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  
  // Find IDAT chunk or parse raw pixels if possible, or print basic info
  console.log(`File: ${filePath}, Canvas Size: ${width}x${height}`);
}

getPngTrimBoundingBox('./public/assets/logo_combined.png');
getPngTrimBoundingBox('./public/assets/Hacker house.png');
getPngTrimBoundingBox('./public/assets/logo_goa_sticker.png');
