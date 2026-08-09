import React from 'react';
import { User, Dices, Sparkles } from 'lucide-react';
import { BUILDER_TITLES, STACK_OPTIONS } from '../presets';

export default function BadgeForm({
  name,
  setName,
  handle,
  setHandle,
  stack,
  setStack,
  builderTitle,
  setBuilderTitle,
  accessLevel,
  setAccessLevel,
}) {
  const randomizeTitle = () => {
    const randomIndex = Math.floor(Math.random() * BUILDER_TITLES.length);
    setBuilderTitle(BUILDER_TITLES[randomIndex]);
  };

  return (
    <div className="relative p-5 sm:p-6 bg-[#FFFBE8] border border-amber-200/90 rounded-[20px_30px_16px_34px] shadow-[6px_12px_26px_rgba(0,0,0,0.26)] space-y-4 rotate-[0.5deg] transition-transform hover:rotate-0 group">
      
      {/* Magenta 3D PushPin at top center */}
      <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center">
        <div className="w-1.5 h-3 bg-gradient-to-b from-slate-400 to-slate-900 rounded-full shadow-md -mb-1 z-0" />
        <div className="w-7 h-7 rounded-full border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.45)] bg-gradient-to-br from-[#FF4DB8] via-[#FF0080] to-[#800040] flex items-center justify-center z-10 relative">
          <div className="w-2.5 h-2.5 rounded-full bg-white/80 shadow-inner -mt-1 -ml-1 border-t border-l border-white" />
        </div>
      </div>

      {/* Sticky Note Dog-Ear Fold at Bottom-Right Corner */}
      <div className="absolute bottom-0 right-0 w-6 h-6 bg-gradient-to-tl from-amber-300/80 via-amber-200/90 to-[#FFFBE8] border-t border-l border-amber-300/90 rounded-tl-md shadow-inner pointer-events-none z-10" />

      <div className="flex items-center justify-between border-b border-amber-200/80 pb-3">
        <h3 className="text-xs font-mono font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#FF0080]" />
          <span>BADGE PERSONALIZATION</span>
        </h3>
        <span className="text-[10px] font-mono text-slate-950 bg-[#FF0080]/15 px-2 py-0.5 rounded border border-[#FF0080]/40 font-black">
          FORMAT B
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-800 font-bold">Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Satoshi Nakamoto"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F0DB] border border-amber-300 text-sm text-slate-950 placeholder-slate-500 focus:outline-none focus:border-[#FF0080] font-sans font-medium"
          />
        </div>

        {/* X Handle */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-slate-800 font-bold">X Handle:</label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@satoshi"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F0DB] border border-amber-300 text-sm text-[#FF0080] font-mono font-bold focus:outline-none focus:border-[#FF0080]"
          />
        </div>
      </div>

      {/* Primary Stack */}
      <div className="space-y-1">
        <label className="text-xs font-mono text-slate-800 font-bold">Primary Stack / Role:</label>
        <select
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F0DB] border border-amber-300 text-sm text-slate-950 font-medium focus:outline-none focus:border-[#FF0080]"
        >
          {STACK_OPTIONS.map((st) => (
            <option key={st} value={st} className="bg-[#FFFBE8] text-slate-950">
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Builder Class Title with Dice Button */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-mono text-slate-800 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FF0080]" /> Generated Title:
          </label>
          <button
            type="button"
            onClick={randomizeTitle}
            className="text-[11px] font-mono font-black text-white bg-[#FF0080] hover:bg-[#d6006c] px-2.5 py-1 rounded-lg shadow-sm transition flex items-center gap-1 cursor-pointer border border-pink-400"
          >
            <Dices className="w-3.5 h-3.5" /> Shuffle Title
          </button>
        </div>
        <input
          type="text"
          value={builderTitle}
          onChange={(e) => setBuilderTitle(e.target.value)}
          placeholder="Solana Kernel Architect"
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F0DB] border border-[#FF0080]/60 text-sm text-[#FF0080] font-heading font-extrabold focus:outline-none focus:border-[#FF0080]"
        />
      </div>

      {/* Access Badge Pill */}
      <div className="space-y-1">
        <label className="text-xs font-mono text-slate-800 font-bold">Badge Tier:</label>
        <select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F0DB] border border-amber-300 text-xs font-mono text-slate-950 font-bold focus:outline-none focus:border-[#FF0080]"
        >
          <option value="VIP BUILDER" className="bg-[#FFFBE8]">VIP BUILDER</option>
          <option value="STAGE HACKER" className="bg-[#FFFBE8]">STAGE HACKER</option>
          <option value="TOP 500" className="bg-[#FFFBE8]">TOP 500 BUILDER</option>
          <option value="GENESIS LEVEL" className="bg-[#FFFBE8]">GENESIS LEVEL</option>
        </select>
      </div>
    </div>
  );
}
