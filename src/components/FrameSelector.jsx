import React from 'react';
import { Palette, Circle, Square, Hexagon } from 'lucide-react';
import { PFP_FRAME_THEMES, ID_CARD_THEMES } from '../presets';

export default function FrameSelector({
  mode,
  pfpTheme,
  setPfpTheme,
  idCardTheme,
  setIdCardTheme,
  frameShape,
  setFrameShape,
  badgeSticker,
  setBadgeSticker,
}) {
  return (
    <div className="relative p-5 sm:p-6 rounded-3xl bg-[#FFFBE8] border border-amber-200/80 shadow-[6px_10px_25px_rgba(0,0,0,0.28)] space-y-4 rotate-[0.4deg] transition-transform hover:rotate-0">
      
      {/* Magenta PushPin at top center */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center">
        <div className="w-5 h-5 rounded-full border-2 border-white shadow-[0_3px_8px_rgba(0,0,0,0.35)] bg-gradient-to-br from-[#FF0080] via-[#e60073] to-[#99004d] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-inner" />
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
        <h3 className="text-xs font-mono font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-[#FF0080]" />
          <span>THEME & PRESET STYLE</span>
        </h3>
      </div>

      {mode === 'pfp' ? (
        <div className="space-y-4">
          <label className="text-xs font-mono text-slate-800 font-bold block mb-1">Color Theme Preset:</label>
          <div className="grid grid-cols-2 gap-2.5">
            {PFP_FRAME_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setPfpTheme(theme)}
                className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 cursor-pointer shadow-sm ${
                  pfpTheme.id === theme.id
                    ? 'border-[#FF0080] bg-[#F5F0DB] font-extrabold shadow-md'
                    : 'border-amber-300/80 bg-[#F5F0DB]/60 text-slate-800 hover:border-[#FF0080]'
                }`}
              >
                <span className="w-4 h-4 rounded-full border border-slate-300 shadow-sm" style={{ background: theme.accentColor }} />
                <span className="text-xs font-bold text-slate-900 truncate">{theme.name}</span>
              </button>
            ))}
          </div>

          {/* Frame Shape Cutout */}
          <div className="pt-2 border-t border-amber-200/80">
            <label className="text-xs font-mono text-slate-800 font-bold mb-2 block">Frame Cutout Shape:</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFrameShape('circle')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm ${
                  frameShape === 'circle'
                    ? 'border-[#FF0080] bg-[#FF0080] text-white font-black'
                    : 'border-amber-300 bg-[#F5F0DB] text-slate-800 hover:text-black'
                }`}
              >
                <Circle className="w-3.5 h-3.5" /> Circle
              </button>
              <button
                onClick={() => setFrameShape('square')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm ${
                  frameShape === 'square'
                    ? 'border-[#FF0080] bg-[#FF0080] text-white font-black'
                    : 'border-amber-300 bg-[#F5F0DB] text-slate-800 hover:text-black'
                }`}
              >
                <Square className="w-3.5 h-3.5" /> Square
              </button>
              <button
                onClick={() => setFrameShape('octagon')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm ${
                  frameShape === 'octagon'
                    ? 'border-[#FF0080] bg-[#FF0080] text-white font-black'
                    : 'border-amber-300 bg-[#F5F0DB] text-slate-800 hover:text-black'
                }`}
              >
                <Hexagon className="w-3.5 h-3.5" /> Octagon
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="text-xs font-mono text-slate-800 font-bold block mb-1">Card Theme Style:</label>
          <div className="grid grid-cols-2 gap-2.5">
            {ID_CARD_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setIdCardTheme(theme)}
                className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 cursor-pointer shadow-sm ${
                  idCardTheme.id === theme.id
                    ? 'border-[#FF0080] bg-[#F5F0DB] font-extrabold shadow-md'
                    : 'border-amber-300/80 bg-[#F5F0DB]/60 text-slate-800 hover:border-[#FF0080]'
                }`}
              >
                <div className="w-5 h-5 rounded-lg border border-slate-300 shadow-sm" style={{ background: theme.accent }} />
                <span className="text-xs font-bold text-slate-900 truncate">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
