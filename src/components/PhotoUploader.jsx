import React, { useState, useRef } from 'react';
import { Upload, Camera, Check, Sparkles, RefreshCw } from 'lucide-react';
import { SAMPLE_AVATARS } from '../presets';
import heic2any from 'heic2any';

export default function PhotoUploader({ imageSrc, setImageSrc, onImageSelected, currentImageSrc }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const activeSrc = imageSrc || currentImageSrc;
  const updateSrc = (src) => {
    if (setImageSrc) setImageSrc(src);
    if (onImageSelected) onImageSelected(src);
  };

  const handleFileChange = async (file) => {
    if (!file) return;
    setIsLoading(true);

    try {
      let imageFile = file;

      if (file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic') {
        const convertedBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9,
        });
        imageFile = new File(
          [Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob],
          'converted.jpg',
          { type: 'image/jpeg' }
        );
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        updateSrc(e.target.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(imageFile);
    } catch (err) {
      console.error('Image upload error:', err);
      const reader = new FileReader();
      reader.onload = (e) => {
        updateSrc(e.target.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="relative p-5 sm:p-6 bg-[#FFFBE8] border border-amber-200/90 rounded-2xl sm:rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.25)] space-y-4 rotate-[0.5deg] transition-transform hover:rotate-0 group">
      
      {/* Magenta PushPin at top center (Reference Image Style) */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="w-6 sm:w-7 h-6 sm:h-7 rounded-full border-2 border-white bg-[#FF0080] shadow-[0_3px_8px_rgba(0,0,0,0.35)] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/70 shadow-inner" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
        <label className="text-xs font-mono font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-[#FF0080]" />
          <span>BUILDER PHOTO</span>
        </label>
        <span className="text-[11px] font-mono text-slate-600 font-bold">JPG, PNG, HEIC</span>
      </div>

      {/* Drag & Drop Upload Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-5 text-center transition-all ${
          isDragging
            ? 'border-[#FF0080] bg-[#FF0080]/10'
            : activeSrc
            ? 'border-[#FF0080]/60 bg-[#F5F0DB] hover:border-[#FF0080]'
            : 'border-amber-300 bg-[#F5F0DB]/80 hover:border-[#FF0080]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png, image/jpeg, image/webp, image/heic"
          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
          className="hidden"
        />

        {isLoading ? (
          <div className="py-4 flex flex-col items-center gap-2">
            <RefreshCw className="w-6 h-6 text-[#FF0080] animate-spin" />
            <p className="text-xs font-mono text-[#FF0080] font-bold">Processing Photo...</p>
          </div>
        ) : activeSrc ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeSrc}
                alt="Uploaded photo"
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#FF0080] shadow-md"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  <span>Photo Ready</span>
                  <Check className="w-3.5 h-3.5 text-[#FF0080]" />
                </p>
                <p className="text-[11px] text-slate-600 font-mono">Click or drop to replace</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-[#FF0080] text-xs font-mono text-white border border-pink-400 font-bold shadow-sm">
              Change
            </span>
          </div>
        ) : (
          <div className="py-3 flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-[#FFFBE8] flex items-center justify-center text-[#FF0080] border border-amber-300 shadow-sm">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-slate-800">
              Click to upload photo or <span className="text-[#FF0080] underline font-bold">drag and drop</span>
            </p>
          </div>
        )}
      </div>

      {/* Preset Sample Avatars */}
      <div className="pt-1">
        <div className="flex items-center gap-1 text-[11px] font-mono text-slate-700 font-bold mb-2">
          <Sparkles className="w-3 h-3 text-[#FF0080]" />
          <span>Or test with sample avatar:</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {SAMPLE_AVATARS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => updateSrc(sample.url)}
              className="rounded-xl overflow-hidden border border-amber-300/80 hover:border-[#FF0080] hover:scale-105 transition aspect-square group shadow-sm"
            >
              <img src={sample.url} alt={sample.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
