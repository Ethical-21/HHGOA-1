/**
 * Canvas Helper Utility for HH Goa 2026 Generator
 * Renders Format A (PFP Frames) and Format B (Builder ID Cards)
 * Uses official HH Goa logo image assets for perfect visual fidelity.
 */

export function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

let logoHackerHouseCache = null;
let logoGoaStickerCache = null;

async function getLogoAssets() {
  if (!logoHackerHouseCache) {
    logoHackerHouseCache = await loadImage('/assets/logo_hacker_house.png');
  }
  if (!logoGoaStickerCache) {
    logoGoaStickerCache = await loadImage('/assets/logo_goa_sticker.png');
  }
  return { logoHackerHouse: logoHackerHouseCache, logoGoaSticker: logoGoaStickerCache };
}

/**
 * Format A: PFP Frame (1080x1080px Canvas)
 */
export async function drawPfpFrame(canvas, options) {
  const {
    userImageObj,
    panX = 0,
    panY = 0,
    zoom = 1,
    rotation = 0,
    filter = 'normal',
    themeObj,
    customText = 'LESS NOISE. MORE SIGNAL.',
    frameShape = 'circle',
  } = options;

  const ctx = canvas.getContext('2d');
  const size = 1080;
  canvas.width = size;
  canvas.height = size;

  const accent = themeObj?.accentColor || '#FEE101';
  const pink = themeObj?.secondaryColor || '#FF008A';
  const bgColor = themeObj?.bgColor || '#08090C';

  const { logoHackerHouse, logoGoaSticker } = await getLogoAssets();

  // 1. Background Fill & Grid
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);
  drawMinimalGrid(ctx, size, size);

  // 2. User Photo Crop Area
  const center = size / 2;
  const cropRadius = size * 0.36; // 388px radius

  if (userImageObj) {
    ctx.save();
    ctx.beginPath();
    if (frameShape === 'circle') {
      ctx.arc(center, center - 10, cropRadius, 0, Math.PI * 2);
    } else if (frameShape === 'octagon') {
      const r = cropRadius;
      const cy = center - 10;
      const chamfer = 50;
      ctx.moveTo(center - r + chamfer, cy - r);
      ctx.lineTo(center + r - chamfer, cy - r);
      ctx.lineTo(center + r, cy - r + chamfer);
      ctx.lineTo(center + r, cy + r - chamfer);
      ctx.lineTo(center + r - chamfer, cy + r);
      ctx.lineTo(center - r + chamfer, cy + r);
      ctx.lineTo(center - r, cy + r - chamfer);
      ctx.lineTo(center - r, cy - r + chamfer);
      ctx.closePath();
    } else {
      const cy = center - 10;
      const boxSize = cropRadius * 2;
      ctx.roundRect(center - cropRadius, cy - cropRadius, boxSize, boxSize, 36);
    }
    ctx.clip();

    applyCanvasFilter(ctx, filter);

    ctx.translate(center + panX, center - 10 + panY);
    ctx.rotate((rotation * Math.PI) / 180);

    const imgAspect = userImageObj.width / userImageObj.height;
    let drawW = cropRadius * 2;
    let drawH = cropRadius * 2;

    if (imgAspect > 1) {
      drawW = cropRadius * 2 * imgAspect * zoom;
      drawH = cropRadius * 2 * zoom;
    } else {
      drawW = cropRadius * 2 * zoom;
      drawH = (cropRadius * 2 / imgAspect) * zoom;
    }

    ctx.drawImage(userImageObj, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  } else {
    ctx.fillStyle = '#111319';
    ctx.beginPath();
    ctx.arc(center, center - 10, cropRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8E95A5';
    ctx.font = '700 32px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('UPLOAD PHOTO', center, center - 10);
  }

  // 3. Outer Frame Border Ring
  ctx.save();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 16;

  if (frameShape === 'circle') {
    ctx.beginPath();
    ctx.arc(center, center - 10, cropRadius + 8, 0, Math.PI * 2);
    ctx.stroke();
  } else if (frameShape === 'octagon') {
    const r = cropRadius + 8;
    const cy = center - 10;
    const chamfer = 50;
    ctx.beginPath();
    ctx.moveTo(center - r + chamfer, cy - r);
    ctx.lineTo(center + r - chamfer, cy - r);
    ctx.lineTo(center + r, cy - r + chamfer);
    ctx.lineTo(center + r, cy + r - chamfer);
    ctx.lineTo(center + r - chamfer, cy + r);
    ctx.lineTo(center - r + chamfer, cy + r);
    ctx.lineTo(center - r, cy + r - chamfer);
    ctx.lineTo(center - r, cy - r + chamfer);
    ctx.closePath();
    ctx.stroke();
  } else {
    const boxSize = (cropRadius + 8) * 2;
    ctx.beginPath();
    ctx.roundRect(center - cropRadius - 8, center - 10 - cropRadius - 8, boxSize, boxSize, 40);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Top Header Banner & Official Image Logos (Cleaned of overlapping dates & tags)
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, 120);
  ctx.fillStyle = accent;
  ctx.fillRect(0, 116, size, 4);

  // Render Official Logo Images on Top Left
  if (logoHackerHouse) {
    const hhAspect = logoHackerHouse.width / logoHackerHouse.height;
    const hhH = 55;
    const hhW = hhH * hhAspect;
    ctx.drawImage(logoHackerHouse, 45, 32, hhW, hhH);

    if (logoGoaSticker) {
      const gAspect = logoGoaSticker.width / logoGoaSticker.height;
      const gH = 60;
      const gW = gH * gAspect;
      ctx.drawImage(logoGoaSticker, 45 + hhW + 12, 28, gW, gH);
    }
  } else {
    ctx.fillStyle = accent;
    ctx.font = '800 42px "Space Grotesk", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('HACKER HOUSE', 50, 75);

    ctx.fillStyle = pink;
    ctx.font = '800 38px "Noto Sans Devanagari", sans-serif';
    ctx.fillText('गोवा', 415, 75);
  }

  // 5. Bottom Footer Banner
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, size - 150, size, 150);
  ctx.fillStyle = accent;
  ctx.fillRect(0, size - 150, size, 4);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 32px "Space Grotesk", "Imbue", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(customText.toUpperCase(), size / 2, size - 95);

  ctx.fillStyle = '#8E95A5';
  ctx.font = '600 18px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('247PM STUDIO  •  500 ELITE BUILDERS  •  #FrameInGoa', size / 2, size - 50);
}

/**
 * Format B: Builder ID Card Pass (1080x1350px Canvas)
 */
export async function drawIdCard(canvas, options) {
  const {
    userImageObj,
    panX = 0,
    panY = 0,
    zoom = 1,
    rotation = 0,
    filter = 'normal',
    themeObj,
    name = 'SATOSHI NAKAMOTO',
    handle = '@satoshi',
    stack = 'Solana / Rust',
    builderTitle = 'SOLANA KERNEL ARCHITECT',
    ticketId = 'HH26-8A39F1',
    cityCountry = 'GOA, INDIA',
  } = options;

  const ctx = canvas.getContext('2d');
  const width = 1080;
  const height = 1350;
  canvas.width = width;
  canvas.height = height;

  const accent = themeObj?.accent || '#FEE101';
  const pink = themeObj?.pinkAccent || '#FF008A';

  const { logoHackerHouse, logoGoaSticker } = await getLogoAssets();

  // Card Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, themeObj?.bgGradient?.[0] || '#166B3A');
  bgGrad.addColorStop(1, themeObj?.bgGradient?.[1] || '#0D3F24');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  drawMinimalGrid(ctx, width, height);

  // Outer Card Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, width - 48, height - 48);

  // Top Accent Bar
  ctx.fillStyle = pink;
  ctx.fillRect(24, 24, (width - 48) / 2, 8);
  ctx.fillStyle = accent;
  ctx.fillRect(24 + (width - 48) / 2, 24, (width - 48) / 2, 8);

  // Lanyard Slot Graphic
  ctx.fillStyle = '#08090C';
  ctx.beginPath();
  ctx.roundRect(width / 2 - 65, 45, 130, 20, 10);
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Header Details
  ctx.fillStyle = accent;
  ctx.font = '800 18px "JetBrains Mono", "Victor Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('// 2:47 PM STUDIO PRESENTS', 60, 115);

  // Draw Official Logo Images on Badge
  if (logoHackerHouse) {
    const hhAspect = logoHackerHouse.width / logoHackerHouse.height;
    const hhH = 65;
    const hhW = hhH * hhAspect;
    ctx.drawImage(logoHackerHouse, 60, 132, hhW, hhH);

    if (logoGoaSticker) {
      const gAspect = logoGoaSticker.width / logoGoaSticker.height;
      const gH = 70;
      const gW = gH * gAspect;
      ctx.drawImage(logoGoaSticker, 60 + hhW + 15, 128, gW, gH);
    }
  } else {
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 48px "Space Grotesk", sans-serif';
    ctx.fillText('HACKER HOUSE', 60, 175);

    ctx.fillStyle = accent;
    ctx.font = '800 44px "Noto Sans Devanagari", sans-serif';
    ctx.fillText('गोवा', 485, 175);
  }

  // Divider Line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 230);
  ctx.lineTo(width - 60, 230);
  ctx.stroke();

  // Photo Section
  const photoSize = 400;
  const photoX = 60;
  const photoY = 265;

  ctx.save();
  ctx.fillStyle = '#08090C';
  ctx.beginPath();
  ctx.roundRect(photoX - 6, photoY - 6, photoSize + 12, photoSize + 12, 20);
  ctx.fill();

  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.restore();

  if (userImageObj) {
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoSize, photoSize, 16);
    ctx.clip();

    applyCanvasFilter(ctx, filter);

    ctx.translate(photoX + photoSize / 2 + panX, photoY + photoSize / 2 + panY);
    ctx.rotate((rotation * Math.PI) / 180);

    const imgAspect = userImageObj.width / userImageObj.height;
    let drawW = photoSize;
    let drawH = photoSize;

    if (imgAspect > 1) {
      drawW = photoSize * imgAspect * zoom;
      drawH = photoSize * zoom;
    } else {
      drawW = photoSize * zoom;
      drawH = (photoSize / imgAspect) * zoom;
    }

    ctx.drawImage(userImageObj, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  } else {
    ctx.fillStyle = '#111319';
    ctx.beginPath();
    ctx.roundRect(photoX, photoY, photoSize, photoSize, 16);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '700 24px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('PHOTO', photoX + photoSize / 2, photoY + photoSize / 2);
  }

  // Right Side Info Panel
  const infoX = 500;

  // Name
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '700 18px "JetBrains Mono", "Victor Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText('BUILDER NAME', infoX, 300);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 38px "Space Grotesk", sans-serif';
  ctx.fillText(name.toUpperCase(), infoX, 345, 520);

  // X Handle
  ctx.fillStyle = accent;
  ctx.font = '700 24px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText(handle.startsWith('@') ? handle : `@${handle}`, infoX, 385);

  // Stack
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '700 18px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('PRIMARY STACK', infoX, 445);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 26px "Space Grotesk", sans-serif';
  ctx.fillText(stack.toUpperCase(), infoX, 485, 520);

  // Location
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '700 18px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('LOCATION', infoX, 545);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 22px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText(cityCountry.toUpperCase(), infoX, 580);

  // Builder Class Title Card
  const titleY = 715;
  ctx.fillStyle = 'rgba(10, 10, 10, 0.65)';
  ctx.beginPath();
  ctx.roundRect(60, titleY, width - 120, 110, 18);
  ctx.fill();

  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.font = '700 16px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('// GENERATED BUILDER CLASS', 90, titleY + 35);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 34px "Space Grotesk", "Imbue", sans-serif';
  ctx.fillText(builderTitle.toUpperCase(), 90, titleY + 80, width - 180);

  // Passport Metadata Table
  const metaY = 855;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.beginPath();
  ctx.roundRect(60, metaY, width - 120, 110, 16);
  ctx.fill();

  // Col 1: Ticket ID
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '700 16px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('CARD ID', 90, metaY + 38);
  ctx.fillStyle = accent;
  ctx.font = '800 26px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText(ticketId, 90, metaY + 80);

  // Separator 1
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(380, metaY + 15);
  ctx.lineTo(380, metaY + 95);
  ctx.stroke();

  // Col 2: Issued Date
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '700 16px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('ISSUED', 410, metaY + 38);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('28 Oct 2026', 410, metaY + 80);

  // Separator 2
  ctx.beginPath();
  ctx.moveTo(680, metaY + 15);
  ctx.lineTo(680, metaY + 95);
  ctx.stroke();

  // Col 3: Status
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  ctx.font = '700 16px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('STATUS', 710, metaY + 38);
  ctx.fillStyle = accent;
  ctx.font = '700 24px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('VERIFIED', 710, metaY + 80);

  // Bottom QR & Footer
  const bottomY = 1000;
  drawSimulatedQrCode(ctx, 60, bottomY, 160, 160, accent);

  ctx.fillStyle = accent;
  ctx.font = '800 32px "Space Grotesk", sans-serif';
  ctx.fillText('READY TO BUILD', 250, bottomY + 55);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.font = '600 20px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('500 ELITE BUILDERS • PALOLEM BEACH, GOA', 250, bottomY + 100);

  ctx.fillStyle = pink;
  ctx.font = '700 18px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('#FrameInGoa  •  247PM STUDIO', 250, bottomY + 138);

  // Card Footer Strip
  ctx.fillStyle = '#08090C';
  ctx.fillRect(24, height - 105, width - 48, 76);
  ctx.fillStyle = accent;
  ctx.fillRect(24, height - 105, width - 48, 3);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 26px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('LESS NOISE. MORE SIGNAL.', width / 2, height - 58);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.font = '600 16px "JetBrains Mono", "Victor Mono", monospace';
  ctx.fillText('Hacker House Goa 2026 Builder Passport', width / 2, height - 30);
}

function drawMinimalGrid(ctx, w, h) {
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
  ctx.lineWidth = 1;
  const step = 50;

  for (let x = 0; x < w; x += step) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawSimulatedQrCode(ctx, x, y, w, h, color) {
  ctx.save();
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x, y, w, h);

  ctx.fillStyle = '#08090C';
  const tileSize = w / 7;

  ctx.fillRect(x, y, tileSize * 2, tileSize * 2);
  ctx.fillRect(x + w - tileSize * 2, y, tileSize * 2, tileSize * 2);
  ctx.fillRect(x, y + h - tileSize * 2, tileSize * 2, tileSize * 2);

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(x + tileSize * 0.5, y + tileSize * 0.5, tileSize, tileSize);
  ctx.fillRect(x + w - tileSize * 1.5, y + tileSize * 0.5, tileSize, tileSize);
  ctx.fillRect(x + tileSize * 0.5, y + h - tileSize * 1.5, tileSize, tileSize);

  ctx.fillStyle = '#08090C';
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      if ((row < 2 && col < 2) || (row < 2 && col > 4) || (row > 4 && col < 2)) continue;
      if ((row + col) % 2 === 0 || (row * col) % 3 === 0) {
        ctx.fillRect(x + col * tileSize, y + row * tileSize, tileSize - 1, tileSize - 1);
      }
    }
  }

  ctx.fillStyle = color;
  ctx.fillRect(x + tileSize * 3, y + tileSize * 3, tileSize, tileSize);
  ctx.restore();
}

function applyCanvasFilter(ctx, filter) {
  if (filter === 'cyber') {
    ctx.filter = 'contrast(115%) brightness(105%) saturate(120%)';
  } else if (filter === 'sunset') {
    ctx.filter = 'sepia(20%) saturate(140%) hue-rotate(-10deg)';
  } else if (filter === 'bw') {
    ctx.filter = 'grayscale(100%) contrast(125%)';
  } else if (filter === 'vibrant') {
    ctx.filter = 'saturate(150%) contrast(110%)';
  } else {
    ctx.filter = 'none';
  }
}
