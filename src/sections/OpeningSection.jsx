import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Envelope from '../components/Envelope';
import FloatingHearts from '../components/FloatingHearts';
import { PastelFlower, PinkBow, SparkleStar } from '../components/CuteDecorations';
import { fireBirthdayCelebration } from '../utils/confettiEffects';

/**
 * Full-screen Opening Surprise screen for Cacaaa.
 * Plays envelope opening, rising heart burst, pink sparkles/confetti,
 * and starts background music strictly on user click.
 */
export default function OpeningSection({ config, onOpenComplete, onStartMusic }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Start music directly inside user gesture event
    onStartMusic?.();
    fireBirthdayCelebration();

    // Let envelope flap, rising hearts, and confetti play cleanly before transitioning
    setTimeout(() => {
      onOpenComplete?.();
    }, 1150);
  };

  return (
    <motion.section
      key="opening-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC] to-[#F8BBD0]/65 px-5 py-10 text-center"
    >
      {/* Ambient floating hearts, flowers, and sparkles */}
      <FloatingHearts variant="opening" burstActive={isOpening} />

      {/* Decorative top corner bows & flowers */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.8 }}
        className="pointer-events-none absolute top-6 left-6 sm:top-10 sm:left-12 animate-float-slow"
        aria-hidden="true"
      >
        <PinkBow className="w-12 h-9 sm:w-14 sm:h-10" color="#F8BBD0" accent="#E875A5" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 0.9, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="pointer-events-none absolute top-8 right-6 sm:top-12 sm:right-14 animate-float-gentle"
        aria-hidden="true"
      >
        <PastelFlower className="w-10 h-10 sm:w-12 sm:h-12" />
      </motion.div>

      {/* Main Centered Gift Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center rounded-[34px] border-2 border-white/90 bg-white/70 px-6 py-9 sm:px-9 sm:py-11 shadow-[0_24px_60px_-14px_rgba(185,79,124,0.28)] backdrop-blur-md"
      >
        {/* Top pill label */}
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#FFE4EC] px-4 py-1.5 text-xs font-bold tracking-wide text-[#B94F7C] shadow-xs font-heading">
          <SparkleStar className="w-3.5 h-3.5 animate-sparkle" color="#E875A5" />
          <span>{config.siteTitle}</span>
          <SparkleStar className="w-3.5 h-3.5 animate-sparkle" color="#E875A5" />
        </div>

        {/* Greeting */}
        <h1 className="text-3xl sm:text-4xl font-bold text-[#B94F7C] font-heading leading-tight">
          {config.opening.greeting}
        </h1>

        <p className="mt-2.5 max-w-xs text-sm sm:text-base text-[#75465A] font-body">
          {config.opening.tagline}
        </p>

        {/* Interactive Pink Envelope with Ribbon */}
        <div className="my-6 w-full">
          <Envelope
            isOpen={isOpening}
            onClick={handleOpen}
            variant="opening"
            label={config.opening.envelopeTo}
          />
        </div>

        {/* Primary CTA Button */}
        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={isOpening}
          whileHover={!isOpening ? { scale: 1.03 } : {}}
          whileTap={!isOpening ? { scale: 0.97 } : {}}
          className="btn-kawaii inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-base sm:text-lg font-bold tracking-wide disabled:opacity-80"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isOpening ? (config.opening.openingLabel || 'Membuka kejutanmu...') : config.opening.buttonText}</span>
        </motion.button>

        <p className="mt-4 text-[11px] font-medium text-[#966379]">
          {config.opening.musicHint || 'Ketuk untuk membuka bersama alunan musik lembut 🎵'}
        </p>
      </motion.div>
    </motion.section>
  );
}
