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
    <div className="space-y-4 p-5 sm:p-6 rounded-3xl bg-[#073018]/90 backdrop-blur-xl border border-[#0B6839]/60 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#0B6839]/40 pb-3">
        <h3 className="text-xs font-mono font-bold text-emerald-100 uppercase tracking-wider flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-[#FEE101]" />
          <span>BADGE PERSONALIZATION</span>
        </h3>
        <span className="text-[10px] font-mono text-[#FEE101] bg-[#FEE101]/10 px-2 py-0.5 rounded border border-[#FEE101]/30 font-bold">
          FORMAT B
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-emerald-200">Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Satoshi Nakamoto"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#042010] border border-[#0B6839]/60 text-sm text-white focus:outline-none focus:border-[#FEE101] font-sans"
          />
        </div>

        {/* X Handle */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-emerald-200">X Handle:</label>
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            placeholder="@satoshi"
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#042010] border border-[#0B6839]/60 text-sm text-[#FEE101] font-mono font-bold focus:outline-none focus:border-[#FEE101]"
          />
        </div>
      </div>

      {/* Primary Stack */}
      <div className="space-y-1">
        <label className="text-xs font-mono text-emerald-200">Primary Stack / Role:</label>
        <select
          value={stack}
          onChange={(e) => setStack(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#042010] border border-[#0B6839]/60 text-sm text-white focus:outline-none focus:border-[#FEE101]"
        >
          {STACK_OPTIONS.map((st) => (
            <option key={st} value={st} className="bg-[#042010] text-white">
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Builder Class Title with Dice Button */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <label className="text-xs font-mono text-emerald-200 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#FEE101]" /> Generated Title:
          </label>
          <button
            type="button"
            onClick={randomizeTitle}
            className="text-[11px] font-mono font-bold text-slate-950 bg-[#FEE101] hover:bg-[#e2c700] px-2.5 py-1 rounded-lg shadow-sm transition flex items-center gap-1 cursor-pointer"
          >
            <Dices className="w-3.5 h-3.5" /> Shuffle Title
          </button>
        </div>
        <input
          type="text"
          value={builderTitle}
          onChange={(e) => setBuilderTitle(e.target.value)}
          placeholder="Solana Kernel Architect"
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#042010] border border-[#FEE101]/50 text-sm text-[#FEE101] font-heading font-extrabold focus:outline-none focus:border-[#FEE101]"
        />
      </div>

      {/* Access Badge Pill */}
      <div className="space-y-1">
        <label className="text-xs font-mono text-emerald-200">Badge Tier:</label>
        <select
          value={accessLevel}
          onChange={(e) => setAccessLevel(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-[#042010] border border-[#0B6839]/60 text-xs font-mono text-white focus:outline-none focus:border-[#FEE101]"
        >
          <option value="VIP BUILDER" className="bg-[#042010]">VIP BUILDER</option>
          <option value="STAGE HACKER" className="bg-[#042010]">STAGE HACKER</option>
          <option value="TOP 500" className="bg-[#042010]">TOP 500 BUILDER</option>
          <option value="GENESIS LEVEL" className="bg-[#042010]">GENESIS LEVEL</option>
        </select>
      </div>
    </div>
  );
}
