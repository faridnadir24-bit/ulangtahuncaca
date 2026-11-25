import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import FloatingHearts from '../components/FloatingHearts';
import { HeartIcon, PastelFlower, PinkBow, SparkleStar } from '../components/CuteDecorations';
import { fireBirthdayCelebration, firePinkConfetti } from '../utils/confettiEffects';

function PinkBalloon({ color = '#F48FB1', highlight = '#FFE4EC', className = '', onPop }) {
  return (
    <motion.button
      type="button"
      onClick={onPop}
      whileHover={{ scale: 1.08, y: -6 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Pop a little birthday sparkle"
      className={`group focus:outline-none ${className}`}
    >
      <svg viewBox="0 0 84 140" className="w-12 h-22 sm:w-20 sm:h-34 drop-shadow-md" fill="none">
        {/* Curly string */}
        <path
          d="M42 86 Q34 102 44 114 Q52 125 40 138"
          stroke="#E875A5"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Balloon knot */}
        <path d="M38 84 L46 84 L42 78 Z" fill={color} />
        {/* Balloon body */}
        <ellipse cx="42" cy="44" rx="30" ry="36" fill={color} stroke="#FFFFFF" strokeWidth="2.5" />
        {/* Glossy shine */}
        <ellipse
          cx="30"
          cy="29"
          rx="7"
          ry="12"
          transform="rotate(-20 30 29)"
          fill={highlight}
          opacity="0.78"
        />
        <circle cx="25" cy="44" r="2.8" fill="#FFFFFF" opacity="0.7" />
        {/* Tiny heart on balloon */}
        <path
          d="M42 54 C42 54 34 49 34 43.5 C34 40.5 36.2 38.8 38.6 38.8 C40.2 38.8 41.3 39.6 42 40.8 C42.7 39.6 43.8 38.8 45.4 38.8 C47.8 38.8 50 40.5 50 43.5 C50 49 42 54 42 54Z"
          fill="#FFFFFF"
          opacity="0.88"
        />
      </svg>
    </motion.button>
  );
}

function HeroMiniCake() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.25 }}
      className="relative mx-auto w-44 sm:w-52 select-none"
      aria-hidden="true"
    >
      <svg viewBox="0 0 220 185" fill="none" className="w-full h-auto drop-shadow-[0_12px_22px_rgba(185,79,124,0.2)]">
        {/* Soft aura */}
        <ellipse cx="110" cy="162" rx="82" ry="14" fill="#F8BBD0" opacity="0.45" />
        {/* Plate */}
        <ellipse cx="110" cy="156" rx="76" ry="12" fill="#FFFFFF" stroke="#F8BBD0" strokeWidth="3" />
        {/* Bottom tier */}
        <rect x="46" y="108" width="128" height="46" rx="14" fill="#F8BBD0" stroke="#FFFFFF" strokeWidth="3" />
        <path
          d="M46 118 Q62 130 78 118 Q94 130 110 118 Q126 130 142 118 Q158 130 174 118 L174 108 Q174 102 162 102 L58 102 Q46 102 46 108 Z"
          fill="#FFFFFF"
        />
        {/* Cute ribbon band */}
        <rect x="46" y="136" width="128" height="8" fill="#E875A5" opacity="0.85" />
        {/* Top tier */}
        <rect x="66" y="70" width="88" height="38" rx="12" fill="#FFE4EC" stroke="#FFFFFF" strokeWidth="3" />
        <path
          d="M66 80 Q80 90 95 80 Q110 90 125 80 Q140 90 154 80 L154 70 Q154 64 142 64 L78 64 Q66 64 66 70 Z"
          fill="#FFFFFF"
        />
        {/* Kawaii happy face on cake */}
        <circle cx="96" cy="94" r="3" fill="#75465A" />
        <circle cx="124" cy="94" r="3" fill="#75465A" />
        <path d="M105 97 Q110 102 115 97" stroke="#B94F7C" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <circle cx="88" cy="97" r="4" fill="#F48FB1" opacity="0.65" />
        <circle cx="132" cy="97" r="4" fill="#F48FB1" opacity="0.65" />
        {/* Strawberries on top */}
        <circle cx="84" cy="60" r="8" fill="#E875A5" stroke="#FFFFFF" strokeWidth="2" />
        <circle cx="136" cy="60" r="8" fill="#E875A5" stroke="#FFFFFF" strokeWidth="2" />
        {/* Center Candle */}
        <rect x="104" y="34" width="12" height="32" rx="5" fill="#F48FB1" stroke="#FFFFFF" strokeWidth="2" />
        <line x1="106" y1="44" x2="114" y2="39" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="106" y1="54" x2="114" y2="49" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
        {/* Candle glow & flame */}
        <circle cx="110" cy="21" r="14" fill="#FFE4EC" opacity="0.7" className="animate-candle-glow" />
        <path
          d="M110 10 C115 17 117 24 110 29 C103 24 105 17 110 10Z"
          fill="#FFD180"
          stroke="#E875A5"
          strokeWidth="1.2"
          className="animate-flame"
        />
      </svg>
    </motion.div>
  );
}

export default function HeroSection({ config }) {
  const handleBalloonPop = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    firePinkConfetti({ x, y }, 32);
  };

  return (
    <header
      id="hero"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFE4EC]/80 via-[#FFF0F5] to-[#FFF0F5] pt-6 pb-16 sm:pt-8 sm:pb-24"
    >
      <FloatingHearts variant="hero" />

      {/* Top Ribbon Scrapbook Header */}
      <nav
        aria-label="Bagian website ulang tahun"
        className="relative z-10 mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-8"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white bg-white/85 px-3.5 py-1.5 shadow-xs backdrop-blur-xs">
          <HeartIcon className="w-4 h-4" color="#E875A5" stroke="#FFE4EC" />
          <span className="text-xs font-bold tracking-wider text-[#B94F7C] font-heading">
            {config.siteTitle}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1.5 rounded-full border border-white bg-white/80 px-2.5 py-1.5 shadow-xs backdrop-blur-xs text-xs font-semibold text-[#75465A] font-ui">
          <a href="#memories" className="rounded-full px-3 py-1 hover:bg-[#FFE4EC] hover:text-[#B94F7C] transition-colors">
            {config.hero.nav?.memories || 'Kenangan'}
          </a>
          <a href="#letter" className="rounded-full px-3 py-1 hover:bg-[#FFE4EC] hover:text-[#B94F7C] transition-colors">
            {config.hero.nav?.letter || 'Surat'}
          </a>
          <a href="#cake" className="rounded-full px-3 py-1 hover:bg-[#FFE4EC] hover:text-[#B94F7C] transition-colors">
            {config.hero.nav?.cake || 'Tiup Lilin'}
          </a>
          <a href="#wishes" className="rounded-full px-3 py-1 hover:bg-[#FFE4EC] hover:text-[#B94F7C] transition-colors">
            {config.hero.nav?.wishes || 'Harapan'}
          </a>
        </div>
      </nav>

      {/* Hero Center Stage */}
      <div className="relative z-10 mx-auto mt-8 sm:mt-12 max-w-4xl px-4 sm:px-6 text-center">
        {/* Decorative Floating Balloons on sides (Desktop / Tablet) */}
        <div className="hidden sm:block pointer-events-none absolute top-0 left-4 md:left-8 animate-balloon">
          <div className="pointer-events-auto">
            <PinkBalloon color="#F48FB1" highlight="#FFFFFF" onPop={handleBalloonPop} />
          </div>
        </div>
        <div
          className="hidden sm:block pointer-events-none absolute top-4 right-4 md:right-8 animate-balloon"
          style={{ animationDelay: '1.2s' }}
        >
          <div className="pointer-events-auto">
            <PinkBalloon color="#E875A5" highlight="#FFE4EC" onPop={handleBalloonPop} />
          </div>
        </div>
        <div
          className="hidden sm:block pointer-events-none absolute bottom-12 left-10 animate-balloon"
          style={{ animationDelay: '2.2s' }}
        >
          <div className="pointer-events-auto">
            <PinkBalloon color="#F8BBD0" highlight="#FFFFFF" className="scale-75" onPop={handleBalloonPop} />
          </div>
        </div>
        <div
          className="hidden sm:block pointer-events-none absolute bottom-14 right-10 animate-balloon"
          style={{ animationDelay: '0.6s' }}
        >
          <div className="pointer-events-auto">
            <PinkBalloon color="#F48FB1" highlight="#FFE4EC" className="scale-75" onPop={handleBalloonPop} />
          </div>
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#F8BBD0] bg-white/90 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#B94F7C] shadow-sm font-ui"
        >
          <PinkBow className="w-6 h-4" />
          <span>{config.hero.badge}</span>
          <SparkleStar className="w-3.5 h-3.5 animate-sparkle" color="#E875A5" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.15] text-[#B94F7C] drop-shadow-[0_2px_10px_rgba(255,255,255,0.9)]"
        >
          {config.hero.headline}
        </motion.h1>

        {/* Subtle animated greeting subtitle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-3 inline-flex items-center gap-2 text-sm sm:text-base font-medium italic text-[#E875A5] font-serif-warm"
        >
          <PastelFlower className="w-4 h-4 animate-spin" style={{ animationDuration: '14s' }} />
          <span>{config.hero.subtitlePill}</span>
          <PastelFlower className="w-4 h-4 animate-spin" style={{ animationDuration: '14s' }} />
        </motion.div>

        {/* Supporting Message */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-[#75465A]"
        >
          {config.hero.subtext}
        </motion.p>

        {/* Illustrated Mini Birthday Cake (flanked cleanly by balloons on mobile) */}
        <div className="relative mt-7 flex items-center justify-center">
          <div className="sm:hidden absolute left-1 top-2 animate-balloon">
            <PinkBalloon color="#F48FB1" highlight="#FFFFFF" onPop={handleBalloonPop} />
          </div>
          <HeroMiniCake />
          <div className="sm:hidden absolute right-1 top-4 animate-balloon" style={{ animationDelay: '1.2s' }}>
            <PinkBalloon color="#E875A5" highlight="#FFE4EC" onPop={handleBalloonPop} />
          </div>
        </div>

        {/* Hero Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35 }}
          className="mt-7 flex flex-wrap items-center justify-center gap-3.5"
        >
          <a
            href="#memories"
            className="btn-kawaii inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm sm:text-base font-bold"
          >
            <span>{config.hero.scrollPrompt}</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </a>

          <button
            type="button"
            onClick={() => fireBirthdayCelebration()}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#F8BBD0] bg-white/90 px-5 py-3 text-sm sm:text-base font-bold text-[#B94F7C] shadow-xs transition-all hover:bg-[#FFE4EC] hover:border-[#F48FB1] active:scale-95"
          >
            <Sparkles className="h-4 w-4 text-[#E875A5]" />
            <span>{config.hero.confettiButton || 'Tabur Konfeti'}</span>
          </button>
        </motion.div>
      </div>
    </header>
  );
}
