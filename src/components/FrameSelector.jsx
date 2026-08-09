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
    <div className="space-y-4 p-5 sm:p-6 rounded-3xl bg-[#073018]/90 backdrop-blur-xl border border-[#0B6839]/60 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#0B6839]/40 pb-3">
        <h3 className="text-xs font-mono font-bold text-emerald-100 uppercase tracking-wider flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5 text-[#FEE101]" />
          <span>THEME & PRESET STYLE</span>
        </h3>
      </div>

      {mode === 'pfp' ? (
        <div className="space-y-4">
          <label className="text-xs font-mono text-emerald-200 block mb-1">Color Theme Preset:</label>
          <div className="grid grid-cols-2 gap-2.5">
            {PFP_FRAME_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setPfpTheme(theme)}
                className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 cursor-pointer backdrop-blur-md ${
                  pfpTheme.id === theme.id
                    ? 'border-[#FEE101] bg-[#042010] shadow-md'
                    : 'border-[#0B6839]/50 bg-[#042010]/50 hover:border-[#FEE101]/70'
                }`}
              >
                <span className="w-4 h-4 rounded-full border border-white/20 shadow-sm" style={{ background: theme.accentColor }} />
                <span className="text-xs font-bold text-white truncate">{theme.name}</span>
              </button>
            ))}
          </div>

          {/* Frame Shape Cutout */}
          <div className="pt-2 border-t border-[#0B6839]/40">
            <label className="text-xs font-mono text-emerald-200 mb-2 block">Frame Cutout Shape:</label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFrameShape('circle')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer backdrop-blur-md ${
                  frameShape === 'circle'
                    ? 'border-[#FEE101] bg-[#FEE101]/15 text-[#FEE101]'
                    : 'border-[#0B6839]/60 bg-[#042010]/60 text-emerald-200 hover:text-white'
                }`}
              >
                <Circle className="w-3.5 h-3.5" /> Circle
              </button>
              <button
                onClick={() => setFrameShape('square')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer backdrop-blur-md ${
                  frameShape === 'square'
                    ? 'border-[#FEE101] bg-[#FEE101]/15 text-[#FEE101]'
                    : 'border-[#0B6839]/60 bg-[#042010]/60 text-emerald-200 hover:text-white'
                }`}
              >
                <Square className="w-3.5 h-3.5" /> Square
              </button>
              <button
                onClick={() => setFrameShape('octagon')}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition cursor-pointer backdrop-blur-md ${
                  frameShape === 'octagon'
                    ? 'border-[#FEE101] bg-[#FEE101]/15 text-[#FEE101]'
                    : 'border-[#0B6839]/60 bg-[#042010]/60 text-emerald-200 hover:text-white'
                }`}
              >
                <Hexagon className="w-3.5 h-3.5" /> Octagon
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="text-xs font-mono text-emerald-200 block mb-1">Card Theme Style:</label>
          <div className="grid grid-cols-2 gap-2.5">
            {ID_CARD_THEMES.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setIdCardTheme(theme)}
                className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 cursor-pointer backdrop-blur-md ${
                  idCardTheme.id === theme.id
                    ? 'border-[#FEE101] bg-[#042010] shadow-md'
                    : 'border-[#0B6839]/50 bg-[#042010]/50 hover:border-[#FEE101]/70'
                }`}
              >
                <div className="w-5 h-5 rounded-lg border border-white/20 shadow-sm" style={{ background: theme.accent }} />
                <span className="text-xs font-bold text-white truncate">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
