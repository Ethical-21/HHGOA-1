import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Copy, Check, Twitter, Linkedin, Instagram, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { drawPfpFrame, drawIdCard, loadImage } from '../utils/canvasHelper';

export default function CanvasRenderer({
  mode,
  imageSrc,
  panX,
  panY,
  setPanX,
  setPanY,
  zoom,
  rotation,
  filter,
  pfpTheme,
  idCardTheme,
  frameShape,
  customTagline,
  badgeSticker,
  name,
  handle,
  stack,
  builderTitle,
  accessLevel,
  cityCountry,
  onOpenShareModal,
}) {
  const canvasRef = useRef(null);
  const [isRendering, setIsRendering] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userImgObj, setUserImgObj] = useState(null);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialPanX: 0, initialPanY: 0 });

  useEffect(() => {
    let isMounted = true;
    if (imageSrc) {
      loadImage(imageSrc).then((img) => {
        if (isMounted) setUserImgObj(img);
      });
    } else {
      setUserImgObj(null);
    }
    return () => {
      isMounted = false;
    };
  }, [imageSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsRendering(true);

    if (mode === 'pfp') {
      drawPfpFrame(canvas, {
        userImageObj: userImgObj,
        panX,
        panY,
        zoom,
        rotation,
        filter,
        themeObj: pfpTheme,
        customText: customTagline || pfpTheme?.tagline,
        badgeSticker,
        frameShape,
      }).then(() => setIsRendering(false));
    } else {
      drawIdCard(canvas, {
        userImageObj: userImgObj,
        panX,
        panY,
        zoom,
        rotation,
        filter,
        themeObj: idCardTheme,
        name: name || 'BUILDER',
        handle: handle || '@builder',
        stack: stack || 'Solana / Rust',
        builderTitle: builderTitle || 'SOLANA KERNEL ARCHITECT',
        accessLevel: accessLevel || 'VIP BUILDER',
        cityCountry: cityCountry || 'GOA, INDIA',
      }).then(() => setIsRendering(false));
    }
  }, [
    mode,
    userImgObj,
    panX,
    panY,
    zoom,
    rotation,
    filter,
    pfpTheme,
    idCardTheme,
    frameShape,
    customTagline,
    badgeSticker,
    name,
    handle,
    stack,
    builderTitle,
    accessLevel,
    cityCountry,
  ]);

  const handleMouseDown = (e) => {
    setIsDraggingCanvas(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialPanX: panX,
      initialPanY: panY,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDraggingCanvas) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (setPanX && setPanY) {
      setPanX(dragStartRef.current.initialPanX + dx * 1.5);
      setPanY(dragStartRef.current.initialPanY + dy * 1.5);
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FEE101', '#FF0080', '#FFFFFF'],
    });
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    triggerConfetti();

    const dataUrl = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    const filename = mode === 'idcard' ? `HH_Goa_2026_ID_Card.png` : `HH_Goa_2026_PFP.png`;
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const handleCopyImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ]);
        triggerConfetti();
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } catch (err) {
      console.warn('Clipboard fallback to download:', err);
      handleDownload();
    }
  };

  const handleShareWithCanvas = (platform) => {
    let dataUrl = null;
    const canvas = canvasRef.current;
    if (canvas) {
      try {
        dataUrl = canvas.toDataURL('image/png');
      } catch (err) {
        console.warn('Canvas toDataURL failed:', err);
      }
    }
    if (onOpenShareModal) {
      onOpenShareModal(platform, dataUrl);
    }
  };

  return (
    <div className="space-y-4 flex flex-col items-center w-full">
      
      {/* Canvas Status Header */}
      <div className="w-full flex items-center justify-between px-1 text-xs font-mono">
        <div className="flex items-center gap-2 text-slate-900">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF0080] shadow-sm animate-ping" />
          <span className="font-black text-slate-950 uppercase tracking-wide">
            {mode === 'pfp' ? 'PFP Frame Canvas' : 'Builder ID Card Pass'}
          </span>
          <span className="text-slate-500 font-bold">•</span>
          <span className="text-[#FF0080] font-black">{mode === 'idcard' ? '1080x1350' : '1080x1080'}</span>
        </div>

        {isRendering && (
          <div className="flex items-center gap-1.5 text-[#FF0080] font-bold">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Rendering...</span>
          </div>
        )}
      </div>

      {/* Interactive Preview Canvas Box */}
      <motion.div
        layout
        initial={{ opacity: 0.9, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative group w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#08090C] p-1 shadow-2xl transition cursor-grab ${
          isDraggingCanvas ? 'cursor-grabbing border-[#FEE101]' : 'hover:border-slate-700'
        }`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-auto object-contain block rounded-xl bg-[#08090C] transition-all duration-300 ease-out"
        />
      </motion.div>

      {/* Main Download & Share Actions */}
      <div className="w-full space-y-2.5">
        {/* Download Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#FEE101] via-[#f7d900] to-[#e0c600] text-slate-950 font-heading font-black text-sm flex items-center justify-center gap-2 transition shadow-[0_0_20px_rgba(254,225,1,0.35)] cursor-pointer"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>DOWNLOAD HIGH-RES GRAPHIC</span>
        </motion.button>

        {/* Social Share Buttons Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Share to X Button */}
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleShareWithCanvas('twitter')}
            title="Share to X"
            className="py-2.5 px-2.5 rounded-full bg-slate-950 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-800 shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-[#FEE101] group"
          >
            <Twitter className="w-4 h-4 text-[#FEE101] fill-[#FEE101]" />
            <span className="hidden sm:inline">Share to </span><span>X</span>
          </motion.button>

          {/* Share to LinkedIn Button (Permanent Solid Blue as Reference Image) */}
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleShareWithCanvas('linkedin')}
            title="Share to LinkedIn"
            className="py-2.5 px-2.5 rounded-full bg-[#0A66C2] text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-[#08529c] group"
          >
            <Linkedin className="w-4 h-4 text-white fill-current" />
            <span>LinkedIn</span>
          </motion.button>

          {/* Share to Instagram Button (Permanent Solid Gradient as Reference Image) */}
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleShareWithCanvas('instagram')}
            title="Share to Instagram"
            className="py-2.5 px-2.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg group"
          >
            <Instagram className="w-4 h-4 text-white" />
            <span>Instagram</span>
          </motion.button>
        </div>

        {/* Copy Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCopyImage}
          className="w-full py-2 px-4 rounded-xl bg-[#08090C] hover:bg-slate-900 text-slate-400 hover:text-white font-mono text-xs flex items-center justify-center gap-2 border border-slate-800 transition cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#FEE101]" />
              <span className="text-[#FEE101] font-bold">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy Image to Clipboard</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
