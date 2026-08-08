import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Twitter, Linkedin, Instagram, Copy, Check, Share2, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ShareModal({
  isOpen,
  onClose,
  mode,
  name,
  handle,
  builderTitle,
  stack,
}) {
  const [activePlatform, setActivePlatform] = useState('twitter'); // 'twitter' | 'linkedin' | 'instagram'
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Platform specific captions
  const twitterText = mode === 'idcard'
    ? `Hyped for Hacker House Goa 2026! 🌴⚡\n\nName: ${name || 'Builder'}\nRole: ${builderTitle || 'Solana Kernel Architect'}\n\nJust created my official VIP Builder Passport ID for HH Goa 2026!\n\nLess Noise. More Signal.\nhttps://hhgoa.com/ #FrameInGoa #HHGoa2026`
    : `Ready to lock in for Hacker House Goa 2026! 🌴⚡\n\nGenerated my official #FrameInGoa profile graphic!\n\n500 elite builders on the sand in Goa. Less Noise. More Signal.\nhttps://hhgoa.com/ #FrameInGoa`;

  const linkedinText = mode === 'idcard'
    ? `Excited to announce I'll be attending Hacker House Goa 2026! 🌴⚡\n\nName: ${name || 'Builder'}\nRole: ${builderTitle || 'Solana Kernel Architect'}\n\nJust generated my official VIP Builder Passport ID. Looking forward to connecting with 500+ Web3 & AI builders on Palolem Beach!\n\nLess Noise. More Signal.\n\n#FrameInGoa #HackerHouseGoa #Web3 #Solana #AI #BuildingInPublic`
    : `Excited for Hacker House Goa 2026! 🌴⚡\n\nJust customized my official #FrameInGoa profile badge graphic. Ready to connect with top-tier Web3 and AI builders in Goa!\n\nCheck it out and generate your pass: https://hhgoa.com/\n\n#FrameInGoa #HackerHouseGoa #Web3 #AI`;

  const instagramText = mode === 'idcard'
    ? `Hyped for Hacker House Goa 2026! 🌴⚡\n\nVIP Builder Passport ID Locked In 🎟️\nName: ${name || 'Builder'}\nRole: ${builderTitle || 'Solana Kernel Architect'}\n\n📍 Palolem Beach, Goa · 28-31 Oct 2026\n\n#FrameInGoa #HackerHouseGoa #Goa2026 #Web3 #Solana #AI #Devs`
    : `Ready for Hacker House Goa 2026! 🌴⚡\n\nGenerated my official #FrameInGoa profile frame graphic.\n\nLess Noise. More Signal.\n\n#FrameInGoa #HackerHouseGoa #Goa2026 #Web3 #AI`;

  const currentText = activePlatform === 'twitter' 
    ? twitterText 
    : activePlatform === 'linkedin' 
    ? linkedinText 
    : instagramText;

  const twitterIntentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`;
  const linkedinIntentUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://hhgoa.com/')}`;

  const copyCaption = () => {
    navigator.clipboard.writeText(currentText);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 }, colors: ['#FEE101', '#FF0080', '#FFFFFF'] });
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareClick = () => {
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 }, colors: ['#FEE101', '#FF0080'] });
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Hacker House Goa 2026 #FrameInGoa',
          text: currentText,
          url: 'https://hhgoa.com/',
        });
      } catch (err) {
        console.warn('Native share cancelled:', err);
      }
    } else {
      copyCaption();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-3xl bg-[#0F1117] border border-white/10 p-6 shadow-2xl space-y-5 text-slate-100 font-sans"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FEE101]/10 text-[#FEE101] flex items-center justify-center border border-[#FEE101]/30 shadow-[0_0_15px_rgba(254,225,1,0.25)]">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-lg text-white">Share Your Graphic</h3>
                <p className="text-xs text-slate-400 font-mono">Hacker House Goa 2026 · #FrameInGoa</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Social Platform Selection Tabs */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-white/10">
            <button
              onClick={() => setActivePlatform('twitter')}
              className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                activePlatform === 'twitter'
                  ? 'bg-[#FEE101] text-slate-950 shadow-[0_0_15px_rgba(254,225,1,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Twitter className="w-4 h-4 fill-current" />
              <span>X / Twitter</span>
            </button>

            <button
              onClick={() => setActivePlatform('linkedin')}
              className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                activePlatform === 'linkedin'
                  ? 'bg-[#0A66C2] text-white shadow-[0_0_15px_rgba(10,102,194,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Linkedin className="w-4 h-4 fill-current" />
              <span>LinkedIn</span>
            </button>

            <button
              onClick={() => setActivePlatform('instagram')}
              className={`py-2.5 px-3 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer ${
                activePlatform === 'instagram'
                  ? 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white shadow-[0_0_15px_rgba(253,29,29,0.4)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </button>
          </div>

          {/* Posting Workflow Notice */}
          <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 text-xs font-mono text-slate-200 space-y-1">
            <p className="font-bold text-[#FEE101] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FEE101]" /> How to Share:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400 pl-1">
              <li>Download your generated high-res PNG graphic.</li>
              <li>Click <strong>"Copy Caption"</strong> or post button below.</li>
              <li>Attach your PNG on {activePlatform === 'twitter' ? 'X' : activePlatform === 'linkedin' ? 'LinkedIn' : 'Instagram'} with <span className="text-[#FEE101] font-bold">#FrameInGoa</span>!</li>
            </ol>
          </div>

          {/* Pre-filled Caption Box */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>Optimized Caption for {activePlatform === 'twitter' ? 'X' : activePlatform === 'linkedin' ? 'LinkedIn' : 'Instagram'}:</span>
              <button
                onClick={copyCaption}
                className="text-[#FEE101] hover:text-white flex items-center gap-1 font-bold cursor-pointer transition"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#FEE101]" />
                    <span className="text-[#FEE101]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Caption</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-white/10 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed select-all max-h-36 overflow-y-auto">
              {currentText}
            </div>
          </div>

          {/* Platform Action Buttons */}
          <div className="space-y-2 pt-1">
            {activePlatform === 'twitter' && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={twitterIntentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleShareClick}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#FEE101] hover:bg-[#e2c700] text-slate-950 font-heading font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(254,225,1,0.35)] transition cursor-pointer"
              >
                <Twitter className="w-4 h-4 fill-slate-950" />
                <span>Open Pre-filled Tweet on X</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </motion.a>
            )}

            {activePlatform === 'linkedin' && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={linkedinIntentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleShareClick}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#0A66C2] hover:bg-[#084e96] text-white font-heading font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(10,102,194,0.4)] transition cursor-pointer"
              >
                <Linkedin className="w-4 h-4 fill-white" />
                <span>Share Post on LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-75" />
              </motion.a>
            )}

            {activePlatform === 'instagram' && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyCaption}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white font-heading font-black text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(253,229,29,0.3)] transition cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>{copied ? 'Caption Copied for Instagram!' : 'Copy Caption & Open Instagram'}</span>
              </motion.button>
            )}

            {'share' in navigator && (
              <button
                onClick={handleNativeShare}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center gap-2 border border-white/10 transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#FEE101]" />
                <span>Native Mobile Share Sheet</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
