import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Shield, UserCheck, Flame } from 'lucide-react';

export default function RadarGallery({ onSelectSample }) {
  const radarBadges = [
    {
      id: 'r1',
      name: 'SATOSHI NAKAMOTO',
      handle: '@satoshi',
      title: 'SOLANA KERNEL ARCHITECT',
      stack: 'Solana / Rust',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80',
      badgeType: 'ID CARD PASS',
      theme: 'Classic Gold & Emerald',
    },
    {
      id: 'r2',
      name: 'VITALIK BUTERIN',
      handle: '@vitalik',
      title: 'ZERO-KNOWLEDGE NINJA',
      stack: 'Smart Contracts / ZK',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80',
      badgeType: 'PFP FRAME',
      theme: 'HH Goa Signal Lime',
    },
    {
      id: 'r3',
      name: 'ELON MUSK',
      handle: '@elon',
      title: 'HIGH-FIBER CODE RUNNER',
      stack: 'AI / LLM Agents',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80',
      badgeType: 'ID CARD PASS',
      theme: '247PM Studio Cyber Pass',
    },
    {
      id: 'r4',
      name: 'ALICE DEFA',
      handle: '@alice_builder',
      title: 'GOA VIBE ARCHITECT',
      stack: 'Fullstack / React',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=80',
      badgeType: 'PFP FRAME',
      theme: 'Stealth Black',
    },
  ];

  return (
    <section className="py-12 border-t border-[#0B6839]/30 bg-[#06070A]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0080]/15 text-[#FF0080] border border-[#FF0080]/40 text-xs font-mono font-bold uppercase mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>RADAR // COMMUNITY BUILDER WALL</span>
            </div>
            <h2 className="font-imbue text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              #FrameInGoa RADAR GALLERY
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-sm">
            Generate your graphic & tweet with <a href="https://x.com/jaytapodhan21/status/2086347331344179212?s=20" target="_blank" rel="noopener noreferrer" className="text-[#FEE101] font-bold hover:underline cursor-pointer transition-colors">#FrameInGoa</a> to get featured on the official radar!
          </p>
        </div>

        {/* Radar Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {radarBadges.map((badge) => (
            <motion.div
              key={badge.id}
              whileHover={{ y: -6, scale: 1.02 }}
              className="p-4 rounded-2xl bg-[#111319] border border-slate-800 hover:border-[#FEE101]/60 transition-all shadow-xl group space-y-3"
            >
              <div className="relative rounded-xl overflow-hidden aspect-square border border-slate-700 bg-black">
                <img
                  src={badge.avatar}
                  alt={badge.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[#FEE101] text-[10px] font-mono font-bold border border-[#0B6839]">
                  {badge.badgeType}
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-[#FF0080] text-white text-[10px] font-mono font-extrabold">
                  VERIFIED
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-extrabold text-sm text-white truncate">{badge.name}</h4>
                  <span className="text-xs font-mono text-[#FEE101]">{badge.handle}</span>
                </div>
                <p className="text-[11px] font-mono text-slate-400 truncate">{badge.title}</p>
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-slate-500 border-t border-slate-800">
                  <span>Stack: {badge.stack}</span>
                  <span className="text-[#0B6839]">HHG 2026</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
