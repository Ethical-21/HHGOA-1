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
    <div className="space-y-4 p-5 sm:p-6 rounded-3xl bg-[#073018]/90 backdrop-blur-xl border border-[#0B6839]/60 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#0B6839]/40 pb-3">
        <label className="text-xs font-mono font-bold text-emerald-100 uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-[#FEE101]" />
          <span>CROP & POSITION CONTROLS</span>
        </label>
        <button
          onClick={onReset}
          className="text-[11px] font-mono text-emerald-200 hover:text-white flex items-center gap-1 bg-[#042010] px-2.5 py-1 rounded-xl border border-[#0B6839]/60 transition cursor-pointer"
        >
          <RotateCcw className="w-3 h-3 text-[#FEE101]" /> Reset
        </button>
      </div>

      {/* Zoom Slider */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-mono text-emerald-200">
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
          className="w-full h-2 bg-[#042010] rounded-lg appearance-none cursor-pointer accent-[#FEE101]"
        />
      </div>

      {/* Pan Sliders */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-emerald-200">
            <span>Pan Horiz</span>
            <span className="text-emerald-100 font-bold">{panX}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="5"
            value={panX}
            onChange={(e) => setPanX(parseInt(e.target.value))}
            className="w-full h-2 bg-[#042010] rounded-lg appearance-none cursor-pointer accent-[#FEE101]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono text-emerald-200">
            <span>Pan Vert</span>
            <span className="text-emerald-100 font-bold">{panY}px</span>
          </div>
          <input
            type="range"
            min="-300"
            max="300"
            step="5"
            value={panY}
            onChange={(e) => setPanY(parseInt(e.target.value))}
            className="w-full h-2 bg-[#042010] rounded-lg appearance-none cursor-pointer accent-[#FEE101]"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="pt-2 flex items-center justify-between border-t border-[#0B6839]/40">
        <span className="text-xs font-mono text-emerald-200">Photo Vibe Filter:</span>
        <div className="flex gap-1.5 flex-wrap">
          {filtersList.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                filter === f.id
                  ? 'bg-[#FEE101] text-slate-950 shadow-sm'
                  : 'bg-[#042010]/80 text-emerald-200 border border-[#0B6839]/50 hover:text-white'
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
