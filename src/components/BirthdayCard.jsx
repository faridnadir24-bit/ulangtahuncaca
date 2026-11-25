import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, PastelFlower, PinkBow, SparkleStar } from './CuteDecorations';

const CARD_THEMES = {
  blush: 'from-[#FFF8FA] to-[#FFE4EC]/85 border-[#F8BBD0]',
  petal: 'from-[#FFFFFF] to-[#FFF0F5] border-[#F48FB1]/55',
  cotton: 'from-[#FFE4EC]/70 to-[#FFFFFF] border-[#F8BBD0]',
  rosewater: 'from-[#FFF0F5] to-[#F8BBD0]/45 border-[#F48FB1]/60',
  strawberry: 'from-[#FFFFFF] to-[#FFE4EC] border-[#E875A5]/45',
};

function CardIllustration({ motif }) {
  switch (motif) {
    case 'smile-flower':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" aria-hidden="true">
          <circle cx="32" cy="14" r="9" fill="#F8BBD0" />
          <circle cx="48" cy="25" r="9" fill="#F8BBD0" />
          <circle cx="42" cy="44" r="9" fill="#F8BBD0" />
          <circle cx="22" cy="44" r="9" fill="#F8BBD0" />
          <circle cx="16" cy="25" r="9" fill="#F8BBD0" />
          <circle cx="32" cy="30" r="13" fill="#FFF0F5" stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx="27.5" cy="28" r="1.8" fill="#75465A" />
          <circle cx="36.5" cy="28" r="1.8" fill="#75465A" />
          <path d="M28 33 Q32 37 36 33" stroke="#B94F7C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'heart-sparkle':
      return (
        <div className="relative flex h-12 w-12 items-center justify-center">
          <HeartIcon className="w-10 h-10" color="#F48FB1" stroke="#FFFFFF" />
          <SparkleStar className="absolute -top-0.5 -right-0.5 w-4 h-4" color="#B94F7C" />
        </div>
      );
    case 'star-cloud':
      return (
        <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" aria-hidden="true">
          <path
            d="M17 44 C11 44 8 39 8 34 C8 29 12 25 17 25 C19 18 25 14 32 14 C40 14 46 19 48 26 C53 26 56 30 56 35 C56 40 52 44 46 44 Z"
            fill="#FFFFFF"
            stroke="#F48FB1"
            strokeWidth="2.5"
          />
          <path d="M47 11 L49 16 L54 18 L49 20 L47 25 L45 20 L40 18 L45 16Z" fill="#E875A5" />
          <circle cx="26" cy="32" r="1.6" fill="#75465A" />
          <circle cx="37" cy="32" r="1.6" fill="#75465A" />
          <path d="M29 36 Q31.5 38.5 34 36" stroke="#B94F7C" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'ribbon-camera':
      return (
        <div className="relative flex h-12 w-12 items-center justify-center">
          <PinkBow className="w-11 h-8" color="#F48FB1" accent="#E875A5" />
        </div>
      );
    case 'love-bloom':
    default:
      return (
        <div className="relative flex h-12 w-12 items-center justify-center">
          <PastelFlower className="w-11 h-11" petal="#F48FB1" center="#FFFFFF" />
        </div>
      );
  }
}

/**
 * Distinctly styled wish card with kawaii illustration, badge number, and playful tap reaction.
 */
export default function BirthdayCard({ card, index }) {
  const [poppedCount, setPoppedCount] = useState(0);
  const themeClass = CARD_THEMES[card.theme] || CARD_THEMES.blush;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setPoppedCount((c) => c + 1)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setPoppedCount((c) => c + 1);
        }
      }}
      aria-label={`Wish ${card.number}: ${card.title}`}
      className={`group relative cursor-pointer overflow-hidden rounded-[26px] border-2 bg-gradient-to-br p-6 text-left shadow-[0_14px_34px_-12px_rgba(185,79,124,0.2)] transition-shadow hover:shadow-[0_18px_40px_-10px_rgba(232,117,165,0.32)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F48FB1]/50 ${themeClass}`}
    >
      {/* Subtle floating corner flower/heart */}
      <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
        <PastelFlower className="w-16 h-16" />
      </div>

      {/* Tap reaction heart pop */}
      {poppedCount > 0 && (
        <motion.div
          key={poppedCount}
          initial={{ opacity: 1, y: 0, scale: 0.6 }}
          animate={{ opacity: 0, y: -34, scale: 1.25 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="pointer-events-none absolute top-4 right-5 z-20"
          aria-hidden="true"
        >
          <HeartIcon className="w-6 h-6" color="#E875A5" stroke="#FFFFFF" />
        </motion.div>
      )}

      {/* Top row: Number Pill + Cute Illustration */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold tracking-wider text-[#B94F7C] shadow-xs ring-1 ring-[#FFE4EC] font-heading">
          <span>{card.number}</span>
          <HeartIcon className="w-3 h-3" color="#E875A5" stroke="#FFFFFF" />
        </span>

        <div className="rounded-2xl bg-white/80 p-1.5 shadow-xs ring-1 ring-white transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
          <CardIllustration motif={card.motif} />
        </div>
      </div>

      {/* Card Title & Message */}
      <h3 className="mt-4 text-xl font-bold text-[#B94F7C] font-heading">
        {card.title}
      </h3>
      <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#75465A]">
        {card.message}
      </p>
    </motion.div>
  );
}
