import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, X, User, ArrowRight } from 'lucide-react';
import RadarGallery from './RadarGallery';

export default function HeroLanding({ onStartBuilding, isGrowing }) {
  const [showHypeModal, setShowHypeModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 0, minutes: 56, seconds: 23 });

  useEffect(() => {
    const target = new Date('2026-10-28T23:59:59+05:30').getTime();
    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#0b6637] text-[#FEE101] p-3 sm:p-5 lg:p-6 select-none font-sans">
      
      {/* 1. TOP NAVBAR HEADER */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto flex-none pt-1">
        
        {/* Top-Left: 2:47PM STUDIO logo */}
        <button
          onClick={onStartBuilding}
          className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 focus:outline-none hover:opacity-90 transition-opacity"
        >
          <img
            src="/assets/2-47.svg"
            alt="2:47 PM STUDIO"
            className="h-7 sm:h-9 lg:h-10 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(254,225,1,0.3)]"
          />
        </button>

        {/* Top-Right: CHECK HYPE + CREATE */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono">
          <button
            onClick={() => setShowHypeModal(true)}
            className="text-xs sm:text-sm font-extrabold tracking-widest text-slate-100 hover:text-[#FEE101] transition-colors cursor-pointer uppercase py-1"
          >
            CHECK HYPE
          </button>

          {/* CREATE Button - Yellow rectangle with patterned border */}
          <button
            onClick={onStartBuilding}
            className="relative group cursor-pointer transition-transform duration-200 active:scale-95"
          >
            <div 
              className="px-4 sm:px-6 py-1 sm:py-1.5 bg-[#FEE101] text-[#0b6637] font-mono font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_0_15px_rgba(254,225,1,0.3)] group-hover:scale-105 transition-all duration-200"
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
      <main className="relative z-20 flex-1 flex flex-col items-center justify-evenly text-center my-auto px-2 sm:px-4 max-w-5xl mx-auto w-full py-1">
        
        <div 
          onClick={onStartBuilding}
          className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto cursor-pointer group"
        >
          
          {/* Main Title Graphic Container (Hacker House + Goa Hindi Overlay) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: isGrowing ? 0.9 : 1,
              scale: isGrowing ? 1.2 : 1,
            }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="relative flex items-center justify-center w-full max-w-4xl mx-auto transform-gpu"
          >
            {/* Wide Yellow "HACKER HOUSE" Text Graphic */}
            <img
              src="/assets/Hacker house.png"
              alt="HACKER HOUSE"
              className="w-full max-w-4xl h-auto max-h-[18vh] sm:max-h-[22vh] object-contain filter drop-shadow-[0_0_25px_rgba(254,225,1,0.4)] group-hover:scale-[1.015] transition-transform duration-300"
            />

            {/* Superimposed "गोवा" Hindi Sticker Overlay */}
            <img
              src="/assets/goa_hindi.svg"
              alt="गोवा"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-[18%] max-w-[150px] min-w-[70px] h-auto object-contain filter drop-shadow-[0_4px_25px_rgba(0,0,0,0.6)] group-hover:scale-[1.05] transition-transform duration-300"
            />
          </motion.div>

          {/* Subtitle Info Row directly beneath "HACKER HOUSE" logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-4xl flex flex-row items-center justify-between gap-2 mt-1.5 sm:mt-2 px-1 sm:px-3 font-mono text-[10px] sm:text-xs lg:text-sm font-bold text-[#FEE101] tracking-widest uppercase"
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

        {/* 3. CREAM TASK #1 CARD (Statically Fitted) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="w-full max-w-4xl mx-auto p-4 sm:p-5 lg:p-6 bg-[#FFFBE8] border border-amber-200/90 rounded-2xl sm:rounded-3xl shadow-[0_15px_35px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center gap-4 sm:gap-6 text-left text-slate-900 relative group overflow-hidden"
        >
          {/* Left Side: ID Card Vector Graphic (Maintained as SS1) */}
          <div className="relative flex items-center justify-center flex-none w-32 sm:w-44 h-32 sm:h-44 select-none">
            {/* Outer dashed pink ring */}
            <div className="w-28 sm:w-40 h-28 sm:h-40 rounded-full border-2 border-dashed border-[#FF0080] p-1.5 flex items-center justify-center">
              <div className="w-full h-full rounded-full border border-[#FF0080]/30" />
            </div>

            {/* Inner dark green circle */}
            <div className="absolute w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-[#0b6637] flex items-center justify-center shadow-inner border-2 border-white/20">
              <User className="w-10 sm:w-14 h-10 sm:h-14 text-white stroke-[1.5]" />
            </div>

            {/* Small yellow palm badge at top right */}
            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-[#FEE101] border border-white shadow-md flex items-center justify-center text-xs sm:text-sm">
              🌴
            </div>

            {/* Overlapping white BUILDER ID badge card at bottom left */}
            <div className="absolute -bottom-1 -left-1 bg-white border border-amber-200/90 rounded-lg sm:rounded-xl p-2 shadow-[0_6px_16px_rgba(0,0,0,0.18)] -rotate-6 space-y-1 w-24 sm:w-30 transition-transform group-hover:rotate-0">
              <div className="w-full h-1 bg-[#0b6637] rounded-full" />
              <div className="w-3/4 h-0.5 bg-slate-300 rounded-full" />
              <div className="text-[8px] sm:text-[9px] font-mono font-black text-[#FF0080] pt-0.5 uppercase tracking-wider">
                BUILDER ID
              </div>
            </div>
          </div>

          {/* Right Side: Content with Title, Timeline Box & Clickable CREATE YOURS Button */}
          <div className="flex-1 space-y-2.5 sm:space-y-3 w-full">
            {/* Task Badge & Main Title */}
            <div>
              <div className="text-[#FF0080] font-mono font-black text-[11px] sm:text-xs uppercase tracking-wider">
                TASK #1
              </div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#0b6637] tracking-tight mt-0.5">
                HH Goa Frame / ID Card Generator
              </h2>
            </div>

            {/* Hackathon Timeline Countdown Box (Exact as SS2 with Oct 28 date) */}
            <div className="w-full border-2 border-[#FF0080]/60 bg-[#FF0080]/10 rounded-lg sm:rounded-xl py-2 px-3 text-center text-[#FF0080] font-mono font-black text-xs sm:text-sm tracking-wide shadow-sm">
              CLOSES IN {timeLeft.days}D {String(timeLeft.hours).padStart(2, '0')}H {String(timeLeft.minutes).padStart(2, '0')}M {String(timeLeft.seconds).padStart(2, '0')}S · OCT 28, 11:59 PM IST
            </div>

            {/* Action Buttons Row with Full-Width CREATE YOURS opening studio */}
            <div className="pt-1 w-full">
              <button
                onClick={onStartBuilding}
                className="w-full flex items-center justify-center py-2.5 sm:py-3 px-6 rounded-full bg-[#FF0080] hover:bg-[#e00070] text-white font-mono font-black text-xs sm:text-sm tracking-widest uppercase shadow-[0_6px_20px_rgba(255,0,128,0.4)] hover:scale-[1.015] active:scale-95 transition-all duration-200 cursor-pointer gap-2 group/btn"
              >
                <span>CREATE YOURS</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>

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

      {/* 4. HYPE MODAL (Triggered by "CHECK HYPE" - ONLY THE VIDEO) */}
      <AnimatePresence>
        {showHypeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#094726] border-2 border-[#FEE101]/70 rounded-2xl sm:rounded-3xl p-2 sm:p-4 text-slate-100 shadow-[0_0_50px_rgba(254,225,1,0.3)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowHypeModal(false)}
                title="Close Video"
                className="absolute -top-3 -right-3 z-30 p-2 sm:p-2.5 rounded-full bg-black text-[#FEE101] hover:bg-[#FEE101] hover:text-black border-2 border-[#FEE101] transition-all duration-200 shadow-xl cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Official Prehype Video Only */}
              <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden border border-[#FEE101]/40 shadow-2xl bg-black aspect-video">
                <video
                  src="https://hhgoa.com/Prehype.mp4"
                  controls
                  autoPlay
                  playsInline
                  loop
                  className="w-full h-full object-cover block"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

