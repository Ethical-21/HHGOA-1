import React from 'react';
import { Home, ExternalLink } from 'lucide-react';

export default function Header({ onBack }) {
  return (
    <header className="w-full bg-[#051e10] border-b border-[#0b6637]/60 shadow-md relative z-30">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-4 py-1.5">
        
        {/* Left: Home Button + 247 Studio Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            title="Go to Landing Page"
            className="px-4 py-1.5 rounded-xl bg-[#FFFBE8] hover:bg-white text-slate-950 font-mono font-black text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 border border-amber-200"
          >
            <Home className="w-4 h-4 text-[#FF0080]" />
            <span>HOME</span>
          </button>

          <button
            onClick={onBack}
            title="Return to Landing Page"
            className="flex items-center gap-2 p-1 cursor-pointer hover:scale-105 active:scale-95 transition-all duration-200 group bg-transparent border-none focus:outline-none"
          >
            <img
              src="/assets/2-47.svg"
              alt="247 Studio"
              className="h-8 sm:h-10 lg:h-11 object-contain filter drop-shadow-[0_0_12px_rgba(254,225,1,0.5)] group-hover:brightness-110 transition"
            />
          </button>
        </div>

        {/* Right: hhgoa.com external link */}
        <div className="flex items-center gap-3 font-mono">
          <a
            href="https://x.com/jaytapodhan21/status/2086347331344179212?s=20"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-100 hover:text-[#FEE101] hover:underline hidden lg:inline cursor-pointer transition-colors font-bold"
          >
            #FrameInGoa
          </a>
          <a
            href="https://hhgoa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-xl bg-[#FEE101] hover:bg-[#e2c700] text-slate-950 font-heading font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition hover:scale-105 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
          >
            <span className="hidden sm:inline">hhgoa.com</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

      </div>
    </header>
  );
}
