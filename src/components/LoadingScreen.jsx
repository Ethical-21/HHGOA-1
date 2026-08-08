import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onFinishLoading }) {
  const [progress, setProgress] = useState(0);
  const [isLogoGrowing, setIsLogoGrowing] = useState(false);
  const onFinishLoadingRef = useRef(onFinishLoading);

  useEffect(() => {
    onFinishLoadingRef.current = onFinishLoading;
  }, [onFinishLoading]);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1200; // 1.2s smooth progress counter

    let animFrameId;

    const finish = () => {
      setProgress(100);
      
      // Stage 1: Logo Grows (350ms)
      setIsLogoGrowing(true);

      setTimeout(() => {
        // Stage 2: Trigger top-level shutter blink sequence
        if (onFinishLoadingRef.current) {
          onFinishLoadingRef.current();
        }
      }, 350);
    };

    // Safety fallback: guaranteed completion after 2.5 seconds max
    const safetyTimeout = setTimeout(() => {
      finish();
    }, 2500);

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const rawPct = Math.min(1, elapsed / duration);
      const easePct = 1 - Math.pow(1 - rawPct, 3);
      const currentPct = Math.floor(easePct * 100);

      setProgress(currentPct);

      if (rawPct < 1) {
        animFrameId = requestAnimationFrame(updateProgress);
      } else {
        clearTimeout(safetyTimeout);
        finish();
      }
    };

    animFrameId = requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(safetyTimeout);
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none select-none font-mono overflow-hidden flex items-center justify-center bg-[#050608]">
      
      {/* Centered Main Content Wrapper */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 max-w-2xl w-full">
        
        {/* Ambient Glow Backdrops */}
        <motion.div
          animate={{
            scale: isLogoGrowing ? 1.8 : 1,
            opacity: isLogoGrowing ? 0.3 : 0.8,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-[600px] h-[360px] bg-[#FEE101]/20 blur-[150px] pointer-events-none rounded-full"
        />
        <motion.div
          animate={{
            scale: isLogoGrowing ? 1.8 : 1,
            opacity: isLogoGrowing ? 0.3 : 0.8,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute w-[400px] h-[260px] bg-[#FF0080]/20 blur-[130px] pointer-events-none rounded-full"
        />

        {/* Dead Center Official Logo Image - Stage 1 Logo Grows */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 10 }}
          animate={{
            scale: isLogoGrowing ? 1.75 : 1,
            opacity: 1,
          }}
          transition={{
            duration: isLogoGrowing ? 0.45 : 0.6,
            ease: [0.65, 0, 0.35, 1],
          }}
          style={{ willChange: 'transform, opacity' }}
          className="relative flex items-center justify-center my-2 transform-gpu"
        >
          <img
            src="/assets/logo_combined.png"
            alt="Hacker House Goa Official Logo"
            className="h-44 sm:h-60 md:h-72 object-contain drop-shadow-[0_0_35px_rgba(254,225,1,0.4)]"
          />
        </motion.div>

        {/* Progress Counter & Line below logo */}
        <motion.div
          animate={{
            opacity: isLogoGrowing ? 0 : 1,
            y: isLogoGrowing ? 20 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-sm sm:max-w-md space-y-2 mt-8"
        >
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-bold tracking-wider">// INITIALIZING STUDIO ENGINE</span>
            <span className="text-[#FEE101] font-extrabold text-sm sm:text-base font-mono drop-shadow-[0_0_8px_rgba(254,225,1,0.5)]">
              {progress}%
            </span>
          </div>

          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#0B6839] via-[#FEE101] to-[#FF0080] rounded-full shadow-[0_0_12px_#FEE101] transition-all duration-75 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-[11px] sm:text-xs text-slate-400 font-mono tracking-[0.25em] font-extrabold uppercase pt-1">
            LESS NOISE. MORE SIGNAL.
          </p>
        </motion.div>

      </div>

    </div>
  );
}
