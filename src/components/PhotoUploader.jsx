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
    <div className="p-5 sm:p-6 rounded-3xl bg-[#073018]/90 backdrop-blur-xl border border-[#0B6839]/60 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold text-emerald-100 uppercase tracking-wider flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-[#FEE101]" />
          <span>BUILDER PHOTO</span>
        </label>
        <span className="text-[11px] font-mono text-emerald-300/80">JPG, PNG, HEIC</span>
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
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-5 text-center transition-all backdrop-blur-md ${
          isDragging
            ? 'border-[#FEE101] bg-[#FEE101]/10'
            : activeSrc
            ? 'border-[#FEE101]/40 bg-[#042010]/80 hover:border-[#FEE101]'
            : 'border-[#0B6839]/60 bg-[#042010]/60 hover:border-[#FEE101]/70'
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
            <RefreshCw className="w-6 h-6 text-[#FEE101] animate-spin" />
            <p className="text-xs font-mono text-[#FEE101] font-bold">Processing Photo...</p>
          </div>
        ) : activeSrc ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeSrc}
                alt="Uploaded photo"
                className="w-12 h-12 rounded-xl object-cover border-2 border-[#FEE101] shadow-md"
              />
              <div className="text-left">
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  <span>Photo Ready</span>
                  <Check className="w-3.5 h-3.5 text-[#FEE101]" />
                </p>
                <p className="text-[11px] text-emerald-200/70 font-mono">Click or drop to replace</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-[#042010] text-xs font-mono text-[#FEE101] border border-[#0B6839]/60 font-bold">
              Change
            </span>
          </div>
        ) : (
          <div className="py-3 flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-xl bg-[#042010] flex items-center justify-center text-[#FEE101] border border-[#0B6839]/60 shadow-inner">
              <Upload className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-emerald-100">
              Click to upload photo or <span className="text-[#FEE101] underline">drag and drop</span>
            </p>
          </div>
        )}
      </div>

      {/* Preset Sample Avatars */}
      <div className="pt-1">
        <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-300/80 mb-2">
          <Sparkles className="w-3 h-3 text-[#FEE101]" />
          <span>Or test with sample avatar:</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {SAMPLE_AVATARS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => updateSrc(sample.url)}
              className="rounded-xl overflow-hidden border border-[#0B6839]/60 hover:border-[#FEE101] transition aspect-square group shadow-md"
            >
              <img src={sample.url} alt={sample.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
