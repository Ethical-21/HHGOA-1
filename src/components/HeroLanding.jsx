import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X } from 'lucide-react';
import RadarGallery from './RadarGallery';

export default function HeroLanding({ onStartBuilding, isGrowing }) {
  const [showHypeModal, setShowHypeModal] = useState(false);

  return (
    <section className="relative w-full h-screen h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#0b6637] text-[#FEE101] p-3 sm:p-6 lg:p-8 select-none font-sans">
      
      {/* 1. TOP NAVBAR HEADER */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-[1800px] mx-auto flex-none pt-1 sm:pt-2 px-2 sm:px-4">
        
        {/* Top-Left: 2:47PM STUDIO logo */}
        <button
          onClick={onStartBuilding}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 focus:outline-none hover:opacity-90 transition-opacity"
        >
          <img
            src="/assets/2-47.svg"
            alt="2:47 PM STUDIO"
            className="h-9 sm:h-12 lg:h-14 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(254,225,1,0.3)]"
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
              className="px-5 sm:px-8 py-2 sm:py-2.5 bg-[#FEE101] text-[#0b6637] font-mono font-black text-xs sm:text-sm lg:text-base tracking-widest uppercase shadow-[0_0_15px_rgba(254,225,1,0.3)] group-hover:scale-105 transition-all duration-200"
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
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center text-center my-auto px-2 sm:px-4 max-w-[1800px] mx-auto w-full py-2">
        
        <div 
          onClick={onStartBuilding}
          className="relative flex flex-col items-center justify-center w-full max-w-[95vw] mx-auto cursor-pointer group"
        >
          
          {/* Main Title Graphic Container (Hacker House + Goa Hindi Overlay) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ 
              opacity: isGrowing ? 0.9 : 1,
              scale: isGrowing ? 1.25 : 1,
            }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="relative flex items-center justify-center w-full max-w-[94vw] lg:max-w-[1600px] mx-auto transform-gpu"
          >
            {/* Wide Yellow "HACKER HOUSE" Text Graphic */}
            <img
              src="/assets/Hacker house.png"
              alt="HACKER HOUSE"
              className="w-full h-auto max-h-[52vh] sm:max-h-[58vh] object-contain filter drop-shadow-[0_0_20px_rgba(254,225,1,0.35)] group-hover:scale-[1.01] transition-transform duration-300"
            />

            {/* Superimposed "गोवा" Hindi Sticker Overlay */}
            <img
              src="/assets/goa_hindi.svg"
              alt="गोवा"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[46%] w-[17.5%] max-w-[190px] min-w-[80px] h-auto object-contain filter drop-shadow-[0_4px_25px_rgba(0,0,0,0.6)] group-hover:scale-[1.04] transition-transform duration-300"
            />
          </motion.div>

          {/* Subtitle Info Row directly beneath "HACKER HOUSE" logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-[92vw] lg:max-w-[1550px] flex flex-row items-center justify-between gap-2 mt-2 sm:mt-3 px-2 font-mono text-xs sm:text-base lg:text-lg font-bold text-[#FEE101] tracking-widest uppercase"
          >
            <div className="flex items-center gap-1.5 sm:gap-3 drop-shadow-[0_0_8px_rgba(254,225,1,0.4)]">
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

      {/* 3. HYPE MODAL (Triggered by "CHECK HYPE") */}
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
                  <span>HACKER HOUSE GOA 2026 HYPE</span>
                </div>
                <h2 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wider uppercase">
                  GOA BUILDER HYPE & COMMUNITY WALL
                </h2>
                <p className="text-sm font-mono text-slate-200">
                  Join 500+ top web3, AI, and kernel engineers in Goa. Create your official pass below!
                </p>
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

