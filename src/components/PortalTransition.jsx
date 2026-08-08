import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortalTransition({ isBlinking }) {
  return (
    <AnimatePresence>
      {isBlinking && (
        <div className="fixed inset-0 z-50 pointer-events-none select-none overflow-hidden flex items-center justify-center">
          
          {/* Top Cyber Shutter (Blinks Closed then Opens) */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: ['-100%', '0%', '0%', '-100%'] }}
            transition={{
              duration: 0.85,
              times: [0, 0.45, 0.55, 1],
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ willChange: 'transform' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#050608] border-b-2 border-[#FEE101] shadow-[0_0_60px_#FEE101] z-20 flex items-end justify-center pb-3"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="text-[10px] font-mono text-[#FEE101] tracking-[0.3em] font-black uppercase opacity-70">
              ⚡ INITIALIZING STUDIO ENGINE
            </div>
          </motion.div>

          {/* Bottom Cyber Shutter (Blinks Closed then Opens) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: ['100%', '0%', '0%', '100%'] }}
            transition={{
              duration: 0.85,
              times: [0, 0.45, 0.55, 1],
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ willChange: 'transform' }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#050608] border-t-2 border-[#FF0080] shadow-[0_0_60px_#FF0080] z-20 flex items-start justify-center pt-3"
          >
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="text-[10px] font-mono text-[#FF0080] tracking-[0.3em] font-black uppercase opacity-70">
              GOA, INDIA · 2026 🌴
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
