import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, MapPin, Calendar, ShieldCheck } from 'lucide-react';

export default function HeroLanding({ onStartBuilding, isGrowing }) {
  return (
    <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-[#08090C] text-slate-100 p-3 sm:p-6 lg:p-8 select-none font-sans">
      
      {/* Fixed Static Full-bleed Background Image */}
      <div className="fixed inset-0 w-full h-[100dvh] z-0 overflow-hidden pointer-events-none transform-gpu">
        <img
          src="/assets/background.png"
          alt="Hacker House Goa Atmosphere Background"
          className="w-full h-full object-cover object-bottom opacity-75 scale-100 filter brightness-95 contrast-105"
        />
        {/* Balanced Smooth Overlay Veil & Dark Fade Gradients */}
        <div className="absolute inset-0 bg-[#08090C]/40 mix-blend-multiply" />
        <div className="absolute top-0 left-0 w-full h-36 bg-gradient-to-b from-[#08090C]/85 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#08090C]/95 via-[#08090C]/60 to-transparent" />
      </div>

      {/* Ambient Radial Glow Enhancements */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[#FEE101]/12 blur-[220px] pointer-events-none rounded-full" />
      <div className="fixed bottom-10 right-1/4 w-[550px] h-[380px] bg-[#FF0080]/14 blur-[170px] pointer-events-none rounded-full" />

      {/* 1. TOP NAVBAR HEADER */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto flex-none pt-1 sm:pt-0">
        
        {/* Official 247 Studio Logo Graphic */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <img
            src="/assets/2-47.svg"
            alt="247 Studio"
            className="h-10 sm:h-12 lg:h-14 object-contain filter drop-shadow-[0_0_12px_rgba(254,225,1,0.5)]"
          />
        </div>

        {/* High-Tech Cyber Actions */}
        <div className="flex items-center gap-2 sm:gap-6 font-mono">
          <a
            href="https://hhgoa.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex relative group px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-slate-950/80 border border-[#FEE101]/50 hover:border-[#FEE101] backdrop-blur-md text-xs sm:text-sm font-mono font-bold text-slate-100 hover:text-[#FEE101] transition-all duration-300 items-center gap-2.5 shadow-[0_0_20px_rgba(254,225,1,0.2)] hover:shadow-[0_0_25px_rgba(254,225,1,0.4)] cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#0B6839] group-hover:bg-[#FEE101] animate-pulse transition-colors" />
            <span className="tracking-wide">hhgoa.com</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FEE101] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Quick Create Action */}
          <button
            onClick={onStartBuilding}
            className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FEE101] to-[#e2c700] hover:from-[#e2c700] hover:to-[#cbb200] text-slate-950 font-heading font-black text-[11px] sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(254,225,1,0.5)] transform active:scale-95 transition cursor-pointer"
          >
            CREATE
          </button>
        </div>

      </div>

      {/* 2. MIDDLE HERO SECTION */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-auto px-2 sm:px-4 max-w-6xl mx-auto w-full py-2 pb-24 sm:pb-28">
        
        {/* Hero Logo Graphic with Smooth Scale Growth Transition */}
        <div className="relative flex items-center justify-center my-1 sm:my-3 w-full">
          <motion.img
            src="/assets/logo_combined.png"
            alt="Hacker House Goa Official Logo"
            animate={{
              scale: isGrowing ? 1.75 : 1,
            }}
            transition={{
              duration: isGrowing ? 0.45 : 0.3,
              ease: [0.65, 0, 0.35, 1],
            }}
            className="w-full max-w-3xl max-h-[30vh] xs:max-h-[36vh] sm:max-h-[44vh] md:max-h-[48vh] object-contain filter drop-shadow-[0_0_60px_rgba(254,225,1,0.6)] transform-gpu"
          />
        </div>

        {/* Center Primary Action Button */}
        <motion.button
          animate={{ opacity: isGrowing ? 0 : 1, scale: isGrowing ? 0.9 : 1 }}
          transition={{ duration: 0.3 }}
          onClick={onStartBuilding}
          className="relative group px-6 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#FEE101] via-[#f7d900] to-[#e0c600] text-slate-950 font-heading font-black text-xs sm:text-base flex items-center gap-2.5 sm:gap-3.5 shadow-[0_0_40px_rgba(254,225,1,0.55)] hover:shadow-[0_0_60px_rgba(254,225,1,0.8)] active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden mt-2 sm:mt-4 -translate-y-2 sm:-translate-y-4"
        >
          {/* Internal Shimmer Light */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
          
          <span className="relative z-10 tracking-wider uppercase font-black">ENTER GENERATOR STUDIO</span>
          <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </motion.button>

      </div>

      {/* 3. FIXED BOTTOM METADATA FOOTER PINNED AT BOTTOM */}
      <motion.div
        animate={{ opacity: isGrowing ? 0 : 1, y: isGrowing ? 15 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 w-full z-40 bg-[#08090C]/90 backdrop-blur-md border-t border-white/10 py-3 sm:py-3.5 px-4 sm:px-10 text-[10px] sm:text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]"
      >
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FEE101] animate-ping" />
              <span className="text-slate-200 font-bold flex items-center gap-1">
                <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FEE101]" />
                28–31 OCT 2026
              </span>
            </div>

            <span className="text-slate-600 hidden sm:inline">•</span>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Goa,+India"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Goa, India on Google Maps"
              className="hidden sm:flex items-center gap-1.5 text-slate-300 hover:text-[#FF0080] transition-colors cursor-pointer group"
            >
              <MapPin className="w-3.5 h-3.5 text-[#FF0080] group-hover:scale-110 transition-transform" />
              <span className="group-hover:underline">GOA, INDIA</span>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1 text-slate-300 font-bold">
              <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#0B6839]" />
              <span>BUILT BY <span className="text-[#FEE101] font-black tracking-wider drop-shadow-[0_0_8px_rgba(254,225,1,0.5)]">TEAM LUCIFER</span> — Janavi · Jay · Abhi</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-[#FEE101] font-bold">#FrameInGoa</span>
          </div>
        </div>
      </motion.div>

    </section>
  );
}
