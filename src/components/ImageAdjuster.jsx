import React from 'react';
import { Sliders, RotateCcw } from 'lucide-react';

export default function ImageAdjuster({
  zoom,
  setZoom,
  panX,
  setPanX,
  panY,
  setPanY,
  rotation,
  setRotation,
  filter,
  setFilter,
  onReset,
}) {
  const filtersList = [
    { id: 'normal', name: 'Original' },
    { id: 'cyber', name: 'Cyber Lime' },
    { id: 'sunset', name: 'Goa Sunset' },
    { id: 'bw', name: 'B&W' },
  ];

  return (
    <div className="relative p-5 sm:p-6 rounded-3xl bg-[#FFFBE8] border border-amber-200/80 shadow-[6px_10px_25px_rgba(0,0,0,0.28)] space-y-4 rotate-[-0.5deg] transition-transform hover:rotate-0">
      
      {/* Yellow PushPin at top center */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <div className="w-5 h-5 rounded-full border-2 border-white shadow-[0_3px_8px_rgba(0,0,0,0.35)] bg-gradient-to-br from-[#FEE101] via-[#e6cb00] to-[#b39e00] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-inner" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
        <label className="text-xs font-mono font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#FF0080]" />
          <span>CROP & POSITION CONTROLS</span>
        </label>
        <button
          onClick={onReset}
          className="text-[11px] font-mono text-slate-900 hover:text-black font-bold flex items-center gap-1 bg-[#F5F0DB] px-2.5 py-1 rounded-xl border border-amber-300 shadow-sm transition cursor-pointer"
        >
          <RotateCcw className="w-3 h-3 text-[#FF0080]" /> Reset
        </button>
      </div>

      {/* Zoom Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-mono text-slate-800 font-bold">
          <span>Zoom Level</span>
          <span className="text-[#FF0080] font-black">{Math.round(zoom * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3.0"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-full h-2.5 bg-amber-200/80 rounded-lg appearance-none cursor-pointer accent-[#FF0080]"
        />
      </div>

      {/* Pan Sliders */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-slate-800 font-bold">
            <span>Pan Horiz</span>
            <span className="text-slate-900 font-extrabold">{panX}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="5"
            value={panX}
            onChange={(e) => setPanX(parseInt(e.target.value))}
            className="w-full h-2.5 bg-amber-200/80 rounded-lg appearance-none cursor-pointer accent-[#FF0080]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-slate-800 font-bold">
            <span>Pan Vert</span>
            <span className="text-slate-900 font-extrabold">{panY}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="5"
            value={panY}
            onChange={(e) => setPanY(parseInt(e.target.value))}
            className="w-full h-2.5 bg-amber-200/80 rounded-lg appearance-none cursor-pointer accent-[#FF0080]"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="pt-2 flex items-center justify-between border-t border-amber-200/80">
        <span className="text-xs font-mono text-slate-800 font-bold">Photo Vibe Filter:</span>
        <div className="flex gap-1.5 flex-wrap">
          {filtersList.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer shadow-sm ${
                filter === f.id
                  ? 'bg-[#FF0080] text-white border border-pink-400 font-black'
                  : 'bg-[#F5F0DB] text-slate-800 border border-amber-300 hover:text-black'
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
