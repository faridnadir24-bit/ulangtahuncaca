import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MailOpen, RotateCcw } from 'lucide-react';
import Envelope from '../components/Envelope';
import FloatingHearts from '../components/FloatingHearts';
import { HeartIcon, PastelFlower, PinkBow, SparkleStar } from '../components/CuteDecorations';
import { firePinkConfetti } from '../utils/confettiEffects';

export default function LetterSection({ config }) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showLetterCard, setShowLetterCard] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  const paragraphs = config.letter.paragraphs || [];
  const allRevealed = visibleCount >= paragraphs.length;

  const handleOpenEnvelope = () => {
    if (envelopeOpened) return;
    setEnvelopeOpened(true);
    firePinkConfetti({ x: 0.5, y: 0.52 }, 40);

    setTimeout(() => {
      setShowLetterCard(true);
      setVisibleCount(1);
    }, 520);
  };

  const handleCloseEnvelope = () => {
    setShowLetterCard(false);
    setVisibleCount(0);
    setTimeout(() => {
      setEnvelopeOpened(false);
    }, 220);
  };

  // Gentle sequential reveal for letter paragraphs
  useEffect(() => {
    if (!showLetterCard || allRevealed) return undefined;

    const timer = setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 1, paragraphs.length));
    }, 340);

    return () => clearTimeout(timer);
  }, [showLetterCard, visibleCount, allRevealed, paragraphs.length]);

  return (
    <section
      id="letter"
      className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC]/55 to-[#FFF0F5]"
    >
      <FloatingHearts variant="ambient" burstActive={envelopeOpened && !showLetterCard} />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1 text-xs font-bold text-[#E875A5] shadow-xs ring-1 ring-[#FFE4EC] font-ui">
            <MailOpen className="h-3.5 w-3.5" />
            <span>{config.letter.badge || 'Sepucuk Surat Kecil 💌'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#B94F7C]">
            {config.letter.title}
          </h2>
        </motion.div>

        {/* Closed Wax-Seal Envelope OR Opened Letter Sheet */}
        <div className="mt-10">
          <AnimatePresence mode="wait">
            {!showLetterCard ? (
              <motion.div
                key="sealed-envelope"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -12 }}
                transition={{ duration: 0.45 }}
                className="py-4"
              >
                <Envelope
                  variant="letter"
                  isOpen={envelopeOpened}
                  onClick={handleOpenEnvelope}
                  label={config.letter.openLabel}
                  hintText={config.letter.closedHint}
                />
              </motion.div>
            ) : (
              <motion.article
                key="opened-letter"
                initial={{ opacity: 0, y: 36, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.96 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="stationery-paper relative mx-auto max-w-2xl rounded-[28px] border-2 border-[#FFE4EC] px-6 py-8 sm:px-12 sm:py-12 text-left shadow-[0_24px_56px_-14px_rgba(185,79,124,0.25)]"
              >
                {/* Stationery Corner Decorations */}
                <PinkBow className="pointer-events-none mx-auto -mt-12 mb-4 w-16 h-11 drop-shadow-sm" />
                <PastelFlower className="pointer-events-none absolute top-5 right-5 w-8 h-8 opacity-75" />
                <SparkleStar className="pointer-events-none absolute bottom-6 left-5 w-5 h-5 opacity-60 animate-sparkle" />

                {/* Top Controls */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-[#FFE4EC] pb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wide text-[#E875A5] font-heading">
                    <HeartIcon className="w-4 h-4" color="#E875A5" stroke="#FFE4EC" />
                    {config.letter.openLabel}
                  </span>

                  <div className="flex items-center gap-2">
                    {!allRevealed && (
                      <button
                        type="button"
                        onClick={() => setVisibleCount(paragraphs.length)}
                        className="rounded-full bg-[#FFF0F5] px-3 py-1 text-xs font-semibold text-[#B94F7C] hover:bg-[#FFE4EC] transition-colors"
                      >
                        {config.letter.revealAllText || 'Tampilkan semua'}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleCloseEnvelope}
                      className="inline-flex items-center gap-1 rounded-full bg-[#FFF0F5] px-3 py-1 text-xs font-semibold text-[#966379] hover:bg-[#FFE4EC] hover:text-[#B94F7C] transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>{config.letter.tuckInText || 'Simpan ke amplop'}</span>
                    </button>
                  </div>
                </div>

                {/* Letter Body Paragraphs */}
                <div className="space-y-4 font-serif-warm text-[15.5px] sm:text-[17px] leading-[1.85] text-[#75465A]">
                  {paragraphs.slice(0, visibleCount).map((line, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: 'easeOut' }}
                      className={
                        index === 0 || line.includes('Selamat Ulang Tahun')
                          ? 'font-semibold text-[#B94F7C]'
                          : ''
                      }
                    >
                      {line}
                    </motion.p>
                  ))}
                </div>

                {/* Sign-off once letter finishes revealing */}
                <AnimatePresence>
                  {allRevealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55 }}
                      className="mt-8 border-t border-[#FFE4EC] pt-6 text-right font-serif-warm"
                    >
                      <p className="text-sm sm:text-base italic text-[#966379]">
                        {config.letter.closing}
                      </p>
                      <p className="mt-1 text-base sm:text-lg font-semibold text-[#B94F7C]">
                        {config.letter.signature}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
