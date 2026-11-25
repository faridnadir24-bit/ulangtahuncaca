import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RotateCcw, Sparkles } from 'lucide-react';
import BirthdayCake from '../components/BirthdayCake';
import FloatingHearts from '../components/FloatingHearts';
import { HeartIcon, PinkBow, SparkleStar } from '../components/CuteDecorations';
import { fireBirthdayCelebration } from '../utils/confettiEffects';

export default function CakeSection({ config }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [hasWished, setHasWished] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setHasWished(true);
    fireBirthdayCelebration();
  };

  const handleRelight = () => {
    setCandlesLit(true);
    setHasWished(false);
  };

  return (
    <section
      id="cake"
      className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 scrapbook-dots"
    >
      <FloatingHearts variant="ambient" burstActive={hasWished} />

      <div className="relative z-10 mx-auto max-w-2xl rounded-[34px] border-2 border-white bg-white/85 px-6 py-10 sm:px-10 sm:py-12 text-center shadow-[0_22px_54px_-14px_rgba(185,79,124,0.22)] backdrop-blur-sm">
        {/* Corner bow */}
        <PinkBow className="mx-auto mb-3 w-12 h-8" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFE4EC] px-4 py-1 text-xs font-bold text-[#B94F7C] font-ui">
            <SparkleStar className="w-3.5 h-3.5" color="#E875A5" />
            <span>{config.cake.badge || 'Buat Permintaan'}</span>
          </span>

          <h2 className="mt-3 text-2xl sm:text-4xl font-bold text-[#B94F7C]">
            {config.cake.prompt}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#75465A]">
            {config.cake.subPrompt}
          </p>
        </motion.div>

        {/* Interactive 3-Layer Cake */}
        <div className="mt-7 mb-6">
          <BirthdayCake candlesLit={candlesLit} showSmoke={hasWished} />
        </div>

        {/* Action Button & Wish Message Reveal */}
        <AnimatePresence mode="wait">
          {candlesLit ? (
            <motion.div
              key="blow-btn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
            >
              <motion.button
                type="button"
                onClick={handleBlowCandles}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-kawaii inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-base sm:text-lg font-bold"
              >
                <Sparkles className="h-4 w-4" />
                <span>{config.cake.buttonText}</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="wish-reveal"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto max-w-md rounded-2xl border border-[#FFE4EC] bg-gradient-to-br from-[#FFF0F5] to-[#FFE4EC]/75 px-6 py-6 shadow-xs"
            >
              <div className="mx-auto mb-2 flex justify-center">
                <HeartIcon className="w-7 h-7 animate-heart-soft" color="#E875A5" stroke="#FFFFFF" />
              </div>
              <p className="text-lg sm:text-xl font-semibold text-[#B94F7C] font-serif-warm leading-relaxed">
                “{config.cake.wishMessage}”
              </p>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-3 text-base sm:text-lg font-bold text-[#E875A5] font-heading"
              >
                {config.cake.wishSubMessage}
              </motion.p>

              <button
                type="button"
                onClick={handleRelight}
                className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold text-[#B94F7C] shadow-xs ring-1 ring-[#F8BBD0] hover:bg-[#FFE4EC] transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>{config.cake.relightText}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
