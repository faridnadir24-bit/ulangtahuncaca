import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import FloatingHearts from '../components/FloatingHearts';
import { HeartIcon, PastelFlower, PinkBow, SparkleStar } from '../components/CuteDecorations';
import { firePinkConfetti } from '../utils/confettiEffects';

export default function FinalSection({ config }) {
  const handleHeartTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    firePinkConfetti({ x, y }, 45);
  };

  return (
    <footer
      id="final"
      className="relative overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC] to-[#F8BBD0]/80 pt-16 pb-20 sm:pt-24 sm:pb-24 px-4 sm:px-6 text-center"
    >
      {/* Soft glowing pink orbs */}
      <div
        className="pointer-events-none absolute left-1/4 top-12 h-56 w-56 rounded-full bg-white/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-1/4 bottom-12 h-64 w-64 rounded-full bg-[#F48FB1]/30 blur-3xl"
        aria-hidden="true"
      />

      <FloatingHearts variant="final" />

      <div className="relative z-10 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="rounded-[34px] border-2 border-white/95 bg-white/80 px-6 py-10 sm:px-12 sm:py-12 shadow-[0_24px_60px_-14px_rgba(185,79,124,0.25)] backdrop-blur-md"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <PastelFlower className="w-6 h-6" />
            <PinkBow className="w-12 h-8" />
            <PastelFlower className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#B94F7C]">
            {config.final.headline}
          </h2>

          <div className="mt-7 space-y-4 font-serif-warm text-base sm:text-lg leading-relaxed text-[#75465A]">
            {config.final.paragraphs.map((line, index) => {
              const isHighlight = line.includes('Selamat Ulang Tahun');

              return (
                <p
                  key={index}
                  className={
                    isHighlight
                      ? 'pt-1 text-lg sm:text-xl font-semibold text-[#B94F7C]'
                      : ''
                  }
                >
                  {line}
                </p>
              );
            })}
          </div>

          {/* Animated Final Line */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#F8BBD0] bg-[#FFF0F5] px-5 py-2.5 text-sm sm:text-base font-bold text-[#E875A5] font-heading shadow-xs"
          >
            <SparkleStar className="w-4 h-4 animate-sparkle" color="#E875A5" />
            <span>{config.final.closingAnimatedText}</span>
            <SparkleStar className="w-4 h-4 animate-sparkle" color="#E875A5" />
          </motion.div>

          {/* Interactive Beating Pink Heart */}
          <div className="mt-8 flex flex-col items-center">
            <motion.button
              type="button"
              onClick={handleHeartTap}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Send a shower of pink confetti"
              className="animate-heart-soft rounded-full p-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F48FB1]/50"
            >
              <HeartIcon className="w-12 h-12 drop-shadow-md" color="#E875A5" stroke="#FFFFFF" />
            </motion.button>
          </div>
        </motion.div>

        {/* Footer & Back to Top */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-xs sm:text-sm font-medium text-[#75465A]">
            {config.final.footer}
          </p>

          <a
            href="#hero"
            className="inline-flex items-center gap-1.5 rounded-full border border-white bg-white/85 px-4 py-2 text-xs font-bold text-[#B94F7C] shadow-xs transition-all hover:bg-white hover:-translate-y-0.5"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>{config.final.backToTop || 'Kembali ke Atas'}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
