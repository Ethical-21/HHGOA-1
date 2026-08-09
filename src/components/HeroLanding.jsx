import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X } from 'lucide-react';
import RadarGallery from './RadarGallery';

export default function HeroLanding({ onStartBuilding, isGrowing }) {
  const [showHypeModal, setShowHypeModal] = useState(false);

  return (
    <section className="relative w-full h-screen h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#0b6637] text-[#FEE101] p-3 sm:p-6 lg:p-8 select-none font-sans">
      
      {/* 1. TOP NAVBAR HEADER */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto flex-none pt-1 sm:pt-2">
        
        {/* Top-Left: 2:47PM STUDIO logo */}
        <button
          onClick={onStartBuilding}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 focus:outline-none hover:opacity-90 transition-opacity"
        >
          <img
            src="/assets/2-47.svg"
            alt="2:47 PM STUDIO"
            className="h-8 sm:h-11 lg:h-12 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(254,225,1,0.3)]"
          />
        </button>

        {/* Top-Right: CHECK HYPE + CREATE */}
        <div className="flex items-center gap-4 sm:gap-8 font-mono">
          <button
            onClick={() => setShowHypeModal(true)}
            className="text-xs sm:text-sm lg:text-base font-extrabold tracking-widest text-slate-100 hover:text-[#FEE101] transition-colors cursor-pointer uppercase py-1"
          >
            CHECK HYPE
          </button>

          {/* CREATE Button - Yellow rectangle with patterned border */}
          <button
            onClick={onStartBuilding}
            className="relative group cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <div 
              className="px-4 sm:px-7 py-1.5 sm:py-2 bg-[#FEE101] text-[#0b6637] font-mono font-black text-xs sm:text-sm lg:text-base tracking-widest uppercase shadow-[0_0_15px_rgba(254,225,1,0.3)] group-hover:scale-105 transition-all duration-200"
              style={{
                border: '3px solid #b45309',
                borderImage: 'repeating-linear-gradient(45deg, #FF0080, #FF0080 5px, #FEE101 5px, #FEE101 10px, #0b6637 10px, #0b6637 15px) 3'
              }}
            >
              <span className="font-black text-[#083D18] tracking-widest uppercase">
                CREATE
              </span>
            </div>
          </button>
        </div>

      </header>

      {/* 2. MAIN CENTER HERO AREA */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center my-auto px-2 sm:px-4 max-w-6xl mx-auto w-full py-2">
        
        <div 
          onClick={onStartBuilding}
          className="relative flex flex-col items-center justify-center w-full max-w-5xl mx-auto cursor-pointer group"
        >
          
          {/* Main Title Graphic Container (Hacker House + Goa Hindi Overlay) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: isGrowing ? 0.9 : 1,
              scale: isGrowing ? 1.2 : 1,
            }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="relative flex items-center justify-center w-full max-w-5xl mx-auto transform-gpu"
          >
            {/* Wide Yellow "HACKER HOUSE" Text Graphic */}
            <img
              src="/assets/Hacker house.png"
              alt="HACKER HOUSE"
              className="w-full max-w-5xl h-auto max-h-[38vh] sm:max-h-[44vh] object-contain filter drop-shadow-[0_0_25px_rgba(254,225,1,0.4)] group-hover:scale-[1.015] transition-transform duration-300"
            />

            {/* Superimposed "गोवा" Hindi Sticker Overlay */}
            <img
              src="/assets/goa_hindi.svg"
              alt="गोवा"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-[20%] max-w-[190px] min-w-[85px] h-auto object-contain filter drop-shadow-[0_4px_25px_rgba(0,0,0,0.6)] group-hover:scale-[1.05] transition-transform duration-300"
            />
          </motion.div>

          {/* Subtitle Info Row directly beneath "HACKER HOUSE" logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-5xl flex flex-row items-center justify-between gap-2 mt-3 sm:mt-5 px-1 sm:px-3 font-mono text-[11px] sm:text-sm lg:text-base font-bold text-[#FEE101] tracking-widest uppercase"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 drop-shadow-[0_0_8px_rgba(254,225,1,0.4)]">
              <span>GOA, INDIA</span>
              <span>·</span>
              <span>28 - 31 OCT 2026</span>
            </div>

            <div className="drop-shadow-[0_0_8px_rgba(254,225,1,0.4)]">
              2:47 PM STUDIO
            </div>
          </motion.div>

        </div>

      </main>

      {/* 3. FOOTER ROW (as in the uploaded image) */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs font-mono text-[#FEE101] pt-3 border-t border-[#FEE101]/30 gap-1.5 sm:gap-2 pb-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span>BUILT BY</span>
          <span className="font-extrabold text-[#FEE101]">TEAM LUCIFER</span>
          <span>·</span>
          <span>Janavi</span>
          <span>·</span>
          <span>Jay</span>
          <span>·</span>
          <span>Abhi</span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="https://hhgoa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-bold text-[#FEE101] cursor-pointer transition-colors"
          >
            HHGOA.COM &rarr;
          </a>
          <span className="text-[#FEE101]/60">&middot;</span>
          <a
            href="https://x.com/jaytapodhan21/status/2086347331344179212?s=20"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#FEE101] hover:underline cursor-pointer transition-colors"
          >
            #FRAMEINGOA
          </a>
        </div>
      </footer>

      {/* 4. HYPE MODAL (Triggered by "CHECK HYPE") */}
      <AnimatePresence>
        {showHypeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#094726] border border-[#FEE101]/40 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setShowHypeModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE101]/20 text-[#FEE101] font-mono text-xs font-bold uppercase">
                  <Flame className="w-4 h-4 text-[#FEE101]" />
                  <span>HACKER HOUSE GOA 2026 OFFICIAL PREHYPE</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#FEE101] tracking-wider uppercase">
                  GOA BUILDER HYPE & TEASER VIDEO
                </h2>
                <p className="text-sm font-mono text-slate-200">
                  Watch the official Hacker House Goa prehype teaser video! Join 500+ top web3, AI, and kernel engineers in Goa.
                </p>
              </div>

              {/* Official HH Goa Prehype Video */}
              <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#FEE101]/60 shadow-[0_0_35px_rgba(254,225,1,0.25)] bg-black aspect-video">
                <video
                  src="https://hhgoa.com/Prehype.mp4"
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="w-full h-full object-cover"
                />
              </div>

              <RadarGallery onSelectSample={() => {
                setShowHypeModal(false);
                onStartBuilding();
              }} />

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => {
                    setShowHypeModal(false);
                    onStartBuilding();
                  }}
                  className="px-6 py-3 rounded-xl bg-[#FEE101] text-[#0b6637] font-mono font-black text-sm uppercase tracking-wider hover:bg-[#ffe833] transition cursor-pointer"
                >
                  START BUILDING YOUR PASS NOW &rarr;
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

