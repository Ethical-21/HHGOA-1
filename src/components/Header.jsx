import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Header({ onBack }) {
  return (
    <header className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-[4px] border-b border-white/5 z-50">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Official Brand Logo - Click to Return to Landing Page */}
        <button
          onClick={onBack}
          title="Return to Landing Page"
          className="flex items-center gap-2 py-1 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 group bg-transparent border-none focus:outline-none"
        >
          <img
            src="/assets/logo_hacker_house.png"
            alt="Hacker House"
            className="h-6 sm:h-7 object-contain filter drop-shadow-[0_0_12px_rgba(254,225,1,0.4)] group-hover:brightness-110 transition"
          />
          <img
            src="/assets/logo_goa_sticker.png"
            alt="Goa"
            className="h-7 sm:h-8 object-contain filter drop-shadow-[0_0_12px_rgba(255,0,128,0.5)] group-hover:brightness-110 transition"
          />
        </button>

        {/* Right: hhgoa.com external link */}
        <div className="flex items-center gap-3 font-mono">
          <span className="text-xs text-slate-400 hidden lg:inline">#FrameInGoa</span>
          <a
            href="https://hhgoa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-xl bg-[#FEE101] hover:bg-[#e2c700] text-slate-950 font-heading font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition hover:scale-105 shadow-[0_0_15px_rgba(254,225,1,0.35)]"
          >
            <span className="hidden sm:inline">hhgoa.com</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

      </div>
    </header>
  );
}
