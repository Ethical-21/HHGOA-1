import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import PortalTransition from './components/PortalTransition';
import Header from './components/Header';
import HeroLanding from './components/HeroLanding';
import CanvasRenderer from './components/CanvasRenderer';
import FrameSelector from './components/FrameSelector';
import PhotoUploader from './components/PhotoUploader';
import ImageAdjuster from './components/ImageAdjuster';
import BadgeForm from './components/BadgeForm';
import ShareModal from './components/ShareModal';
import { PFP_FRAME_THEMES, ID_CARD_THEMES } from './presets';
import { Sliders, UserCheck, Image, CreditCard } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Single-page View Switcher: 'landing' -> 'studio'
  const [currentView, setCurrentView] = useState('landing');

  // Choreography States
  const [isBlinking, setIsBlinking] = useState(false);
  const [isLogoGrowing, setIsLogoGrowing] = useState(false);

  // Studio Active 2 Options: 'editing' (1. Photo Editing) | 'personalization' (2. Personalization)
  const [activeTab, setActiveTab] = useState('editing');

  // Active Output Format: Default to 'pfp' (Format A: Profile Frame) whenever studio opens
  const [mode, setMode] = useState('pfp');

  // Photo & Canvas state
  const [imageSrc, setImageSrc] = useState(null);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [filter, setFilter] = useState('normal');

  // Themes
  const [pfpTheme, setPfpTheme] = useState(PFP_FRAME_THEMES[0]);
  const [idCardTheme, setIdCardTheme] = useState(ID_CARD_THEMES[0]);
  const [frameShape, setFrameShape] = useState('circle');
  const [customTagline, setCustomTagline] = useState('LESS NOISE. MORE SIGNAL.');
  const [badgeSticker, setBadgeSticker] = useState('#FrameInGoa');

  // Format B specifics
  const [name, setName] = useState('SATOSHI NAKAMOTO');
  const [handle, setHandle] = useState('@satoshi');
  const [stack, setStack] = useState('Solana / Rust');
  const [builderTitle, setBuilderTitle] = useState('SOLANA KERNEL ARCHITECT');
  const [accessLevel, setAccessLevel] = useState('VIP BUILDER');
  const [cityCountry, setCityCountry] = useState('GOA, INDIA');

  // Modal export state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharePlatform, setSharePlatform] = useState('twitter');
  const [shareDataUrl, setShareDataUrl] = useState(null);

  // Initial Loading Screen Completion
  const handleFinishLoading = () => {
    setIsBlinking(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 450);

    setTimeout(() => {
      setIsBlinking(false);
    }, 850);
  };

  // Landing -> Studio Transition
  const triggerPortalToStudio = () => {
    if (isBlinking) return;

    setIsLogoGrowing(true);
    setMode('pfp'); // Always open Format A by default when studio is entered

    setTimeout(() => {
      setIsBlinking(true);

      setTimeout(() => {
        setCurrentView('studio');
      }, 450);

      setTimeout(() => {
        setIsBlinking(false);
        setIsLogoGrowing(false);
      }, 850);

    }, 350);
  };

  // Studio -> Landing Transition
  const triggerPortalToLanding = () => {
    if (isBlinking) return;

    setIsLogoGrowing(true);
    setIsBlinking(true);

    setTimeout(() => {
      setCurrentView('landing');
    }, 450);

    setTimeout(() => {
      setIsBlinking(false);
      setIsLogoGrowing(false);
    }, 850);
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-slate-100 font-sans selection:bg-[#FEE101] selection:text-slate-950 flex flex-col overflow-x-hidden relative">
      
      {/* 1. Cinematic Opening Animation */}
      {isLoading && (
        <LoadingScreen onFinishLoading={handleFinishLoading} />
      )}

      {/* 2. Cyber Laser Eye-Blink Shutter Portal Transition */}
      <PortalTransition isBlinking={isBlinking} />

      {/* 3. View Switcher (Landing <-> Studio Workspace) */}
      {currentView === 'landing' ? (
        /* SINGLE PAGE LANDING VIEW */
        <div className="flex-1 flex flex-col justify-center min-h-screen">
          <HeroLanding
            onStartBuilding={triggerPortalToStudio}
            isGrowing={isLogoGrowing}
          />
        </div>
      ) : (
        /* STUDIO GENERATOR WORKSPACE */
        <div className="min-h-screen flex flex-col relative z-10 bg-[#040C07]">
          
          {/* Eye-soothing Studio Green-Black-Yellow Scenery Background */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <img
              src="/assets/background.png"
              alt="Hacker House Goa Atmosphere Background"
              className="w-full h-full object-cover object-center opacity-25 filter brightness-90 contrast-110 mix-blend-luminosity"
            />
            {/* Rich Cyber Green-Black-Yellow Gradient Veil */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B2A14]/90 via-[#05160A]/95 to-[#030905]" />
          </div>

          {/* Green, Black, Yellow Ambient Glow Orbs */}
          <div className="fixed -top-20 left-1/4 w-[900px] h-[650px] bg-[#0A4D1F]/40 blur-[220px] pointer-events-none rounded-full" />
          <div className="fixed top-10 right-10 w-[700px] h-[550px] bg-[#D4CF00]/16 blur-[200px] pointer-events-none rounded-full" />
          <div className="fixed bottom-0 left-1/3 w-[850px] h-[500px] bg-[#083D18]/45 blur-[220px] pointer-events-none rounded-full" />

          {/* Studio Content Container */}
          <div className="relative z-10 flex-1 flex flex-col pt-0 pb-6">
            
            {/* Transparent Widescreen Navbar Header */}
            <Header onBack={triggerPortalToLanding} />

            <main className="flex-1 w-full max-w-[1800px] mx-auto px-3 sm:px-8 lg:px-12 py-4 sm:py-8">
              
              {/* COMPACT FORMAT SELECTION BAR */}
              <div className="w-full bg-[#0F1117]/85 backdrop-blur-xl border border-white/10 p-1.5 sm:p-2.5 rounded-2xl sm:rounded-3xl mb-5 sm:mb-8 shadow-xl flex flex-row items-center gap-1.5 sm:gap-3 relative">
                
                {/* Format A Option Card */}
                <button
                  onClick={() => setMode('pfp')}
                  className="relative flex-1 w-full py-2.5 sm:py-3.5 px-2.5 sm:px-5 rounded-xl sm:rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2 sm:gap-3.5 cursor-pointer select-none group"
                >
                  {mode === 'pfp' && (
                    <motion.div
                      layoutId="activeFormatGlider"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-[#FEE101] rounded-xl sm:rounded-2xl shadow-md z-0"
                    />
                  )}

                  <div className={`relative z-10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center ${
                    mode === 'pfp' ? 'bg-slate-950 text-[#FEE101]' : 'bg-slate-800/80 text-slate-300 group-hover:bg-slate-700'
                  }`}>
                    <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="relative z-10 text-left font-mono">
                    <div className={`font-heading font-black text-[11px] sm:text-sm tracking-wide uppercase transition-colors duration-200 ${
                      mode === 'pfp' ? 'text-slate-950' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      <span className="sm:hidden">FORMAT A</span>
                      <span className="hidden sm:inline">FORMAT A: PFP PROFILE FRAME</span>
                    </div>
                    <div className={`hidden sm:block text-[10px] sm:text-xs font-bold transition-colors duration-200 ${
                      mode === 'pfp' ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      1080 x 1080 · Profile Frame
                    </div>
                  </div>
                </button>

                {/* Format B Option Card */}
                <button
                  onClick={() => setMode('idcard')}
                  className="relative flex-1 w-full py-2.5 sm:py-3.5 px-2.5 sm:px-5 rounded-xl sm:rounded-2xl transition-colors duration-200 flex items-center justify-center gap-2 sm:gap-3.5 cursor-pointer select-none group"
                >
                  {mode === 'idcard' && (
                    <motion.div
                      layoutId="activeFormatGlider"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-[#FEE101] rounded-xl sm:rounded-2xl shadow-md z-0"
                    />
                  )}

                  <div className={`relative z-10 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl transition-colors duration-200 flex items-center justify-center ${
                    mode === 'idcard' ? 'bg-slate-950 text-[#FF0080]' : 'bg-slate-800/80 text-slate-300 group-hover:bg-slate-700'
                  }`}>
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="relative z-10 text-left font-mono">
                    <div className={`font-heading font-black text-[11px] sm:text-sm tracking-wide uppercase transition-colors duration-200 ${
                      mode === 'idcard' ? 'text-slate-950' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      <span className="sm:hidden">FORMAT B</span>
                      <span className="hidden sm:inline">FORMAT B: VIP BUILDER PASS</span>
                    </div>
                    <div className={`hidden sm:block text-[10px] sm:text-xs font-bold transition-colors duration-200 ${
                      mode === 'idcard' ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      1080 x 1350 · Passport Badge Pass
                    </div>
                  </div>
                </button>

              </div>

              {/* Studio Grid: Live Canvas (Left) + 2-Option Customizer (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 items-start">
                
                {/* Left Column: Live Canvas Preview */}
                <div className="lg:col-span-5 xl:col-span-5 relative lg:sticky lg:top-24">
                  <div className="p-3 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#0F1117]/85 backdrop-blur-xl border border-white/10 shadow-xl space-y-3 sm:space-y-4">
                    
                    <CanvasRenderer
                      mode={mode}
                      imageSrc={imageSrc}
                      panX={panX}
                      panY={panY}
                      setPanX={setPanX}
                      setPanY={setPanY}
                      zoom={zoom}
                      rotation={rotation}
                      filter={filter}
                      pfpTheme={pfpTheme}
                      idCardTheme={idCardTheme}
                      frameShape={frameShape}
                      customTagline={customTagline}
                      badgeSticker={badgeSticker}
                      name={name}
                      handle={handle}
                      stack={stack}
                      builderTitle={builderTitle}
                      accessLevel={accessLevel}
                      cityCountry={cityCountry}
                      onOpenShareModal={(platform, dataUrl) => {
                        setSharePlatform(platform || 'twitter');
                        setShareDataUrl(dataUrl || null);
                        setIsShareModalOpen(true);
                      }}
                    />

                    <p className="text-[10px] sm:text-[11px] font-mono text-slate-400 text-center font-medium">
                      💡 Tip: Click and drag directly on the canvas image to adjust photo position!
                    </p>
                  </div>
                </div>

                {/* Right Column: Clean 2-Option Customizer Panel */}
                <div className="lg:col-span-7 xl:col-span-7 space-y-4 sm:space-y-6">
                  
                  {/* TAB SWITCHER BAR */}
                  <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 bg-[#0F1117]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 shadow-lg relative">
                    
                    <button
                      onClick={() => setActiveTab('editing')}
                      className="relative flex-1 py-2.5 sm:py-3 px-3 sm:px-5 rounded-lg sm:rounded-xl font-heading font-extrabold text-[11px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition cursor-pointer select-none group"
                    >
                      {activeTab === 'editing' && (
                        <motion.div
                          layoutId="activeTabGlider"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          className="absolute inset-0 bg-[#FEE101] rounded-lg sm:rounded-xl shadow-md z-0"
                        />
                      )}
                      <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                        activeTab === 'editing' ? 'text-slate-950 font-black' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        <Sliders className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>1. PHOTO EDITING</span>
                      </span>
                    </button>

                    <button
                      onClick={() => setActiveTab('personalization')}
                      className="relative flex-1 py-2.5 sm:py-3 px-3 sm:px-5 rounded-lg sm:rounded-xl font-heading font-extrabold text-[11px] sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition cursor-pointer select-none group"
                    >
                      {activeTab === 'personalization' && (
                        <motion.div
                          layoutId="activeTabGlider"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          className="absolute inset-0 bg-[#FEE101] rounded-lg sm:rounded-xl shadow-md z-0"
                        />
                      )}
                      <span className={`relative z-10 flex items-center gap-1.5 transition-colors duration-200 ${
                        activeTab === 'personalization' ? 'text-slate-950 font-black' : 'text-slate-300 group-hover:text-white'
                      }`}>
                        <UserCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span>2. PERSONALIZATION</span>
                      </span>
                    </button>

                  </div>

                  {/* Animated 2-Option Content Panels */}
                  <AnimatePresence mode="wait">
                    
                    {/* OPTION 1: PHOTO & IMAGE EDITING */}
                    {activeTab === 'editing' && (
                      <motion.div
                        key="editing"
                        initial={{ opacity: 0, y: 15, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.99 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4 sm:space-y-5"
                      >
                        {/* Photo Uploader */}
                        <PhotoUploader
                          imageSrc={imageSrc}
                          setImageSrc={setImageSrc}
                        />

                        {/* Position, Crop & Filter Adjustments */}
                        <ImageAdjuster
                          zoom={zoom}
                          setZoom={setZoom}
                          panX={panX}
                          setPanX={setPanX}
                          panY={panY}
                          setPanY={setPanY}
                          rotation={rotation}
                          setRotation={setRotation}
                          filter={filter}
                          setFilter={setFilter}
                          onReset={() => {
                            setZoom(1);
                            setPanX(0);
                            setPanY(0);
                            setRotation(0);
                            setFilter('normal');
                          }}
                        />
                      </motion.div>
                    )}

                    {/* OPTION 2: THEME & PERSONALIZATION */}
                    {activeTab === 'personalization' && (
                      <motion.div
                        key="personalization"
                        initial={{ opacity: 0, y: 15, scale: 0.99 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -15, scale: 0.99 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-4 sm:space-y-5"
                      >
                        {/* Theme & Style Selector */}
                        <FrameSelector
                          mode={mode}
                          pfpTheme={pfpTheme}
                          setPfpTheme={setPfpTheme}
                          idCardTheme={idCardTheme}
                          setIdCardTheme={setIdCardTheme}
                          frameShape={frameShape}
                          setFrameShape={setFrameShape}
                          badgeSticker={badgeSticker}
                          setBadgeSticker={setBadgeSticker}
                        />

                        {/* Builder Personal Info (For Format B ID Card) */}
                        {mode === 'idcard' && (
                          <BadgeForm
                            name={name}
                            setName={setName}
                            handle={handle}
                            setHandle={setHandle}
                            stack={stack}
                            setStack={setStack}
                            builderTitle={builderTitle}
                            setBuilderTitle={setBuilderTitle}
                            accessLevel={accessLevel}
                            setAccessLevel={setAccessLevel}
                            cityCountry={cityCountry}
                            setCityCountry={setCityCountry}
                          />
                        )}
                      </motion.div>
                    )}

                  </AnimatePresence>

                </div>

              </div>

            </main>

            {/* Studio Footer */}
            <footer className="w-full border-t border-white/10 bg-[#08090C]/90 backdrop-blur-md py-4 sm:py-5 px-4 sm:px-10 text-center relative z-20 mt-8 sm:mt-12">
              <div className="w-full max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-heading font-black text-[#FEE101] text-sm">HACKER HOUSE GOA 2026</span>
                  <span>· 28-31 OCT 2026</span>
                </div>

                <p className="font-bold text-slate-200">
                  BUILT BY <span className="text-[#FEE101] font-black tracking-wider drop-shadow-[0_0_8px_rgba(254,225,1,0.5)]">TEAM LUCIFER</span> — Janavi · Jay · Abhi · #FRAMEINGOA
                </p>

                <a href="https://hhgoa.com" target="_blank" rel="noopener noreferrer" className="text-[#FEE101] hover:underline font-bold">
                  HHGOA.COM →
                </a>
              </div>
            </footer>

          </div>

        </div>
      )}

      {/* Download & Share Modal */}
      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          mode={mode}
          name={name}
          handle={handle}
          builderTitle={builderTitle}
          initialPlatform={sharePlatform}
          canvasDataUrl={shareDataUrl}
        />
      )}

    </div>
  );
}
