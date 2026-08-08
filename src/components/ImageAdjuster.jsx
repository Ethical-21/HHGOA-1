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
    <div className="space-y-4 p-5 sm:p-6 rounded-3xl bg-[#0F1117]/85 backdrop-blur-xl border border-white/10 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <label className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#FEE101]" />
          <span>CROP & POSITION CONTROLS</span>
        </label>
        <button
          onClick={onReset}
          className="text-[11px] font-mono text-slate-300 hover:text-white flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 rounded-xl border border-white/15 transition cursor-pointer"
        >
          <RotateCcw className="w-3 h-3 text-[#FEE101]" /> Reset
        </button>
      </div>

      {/* Zoom Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-mono text-slate-300">
          <span>Zoom Level</span>
          <span className="text-[#FEE101] font-extrabold">{Math.round(zoom * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3.0"
          step="0.05"
          value={zoom}
          onChange={(e) => setZoom(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#FEE101]"
        />
      </div>

      {/* Pan Sliders */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>Pan Horiz</span>
            <span className="text-slate-200 font-bold">{panX}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="5"
            value={panX}
            onChange={(e) => setPanX(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#FEE101]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-slate-300">
            <span>Pan Vert</span>
            <span className="text-slate-200 font-bold">{panY}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="5"
            value={panY}
            onChange={(e) => setPanY(parseInt(e.target.value))}
            className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-[#FEE101]"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="pt-2 flex items-center justify-between border-t border-white/10">
        <span className="text-xs font-mono text-slate-300">Photo Vibe Filter:</span>
        <div className="flex gap-1.5 flex-wrap">
          {filtersList.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                filter === f.id
                  ? 'bg-[#FEE101] text-slate-950 shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 border border-white/15 hover:text-white'
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
