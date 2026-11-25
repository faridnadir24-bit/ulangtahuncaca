import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, PinkBow, SparkleStar } from './CuteDecorations';

/**
 * Interactive Pink Envelope with satin ribbon, bow or heart-shaped wax seal,
 * animated top flap, and rising mini card / floating hearts when opened.
 */
export default function Envelope({
  isOpen = false,
  onClick,
  variant = 'opening',
  label = 'Untuk: Cacaaa ♡',
  hintText = '',
  className = '',
}) {
  const isLetter = variant === 'letter';

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={!isOpen ? { y: -4, scale: 1.02 } : {}}
      whileTap={!isOpen ? { scale: 0.97 } : {}}
      aria-label={isOpen ? 'Amplop terbuka' : hintText || 'Buka amplop pink'}
      className={`group relative mx-auto block w-full max-w-[300px] sm:max-w-[340px] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#F48FB1]/50 rounded-3xl ${className}`}
    >
      {/* Subtle aura glow behind envelope */}
      <div
        className="pointer-events-none absolute -inset-4 rounded-[36px] bg-gradient-to-b from-[#FFE4EC]/80 via-[#F8BBD0]/40 to-transparent blur-xl transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Envelope Container */}
      <div className="relative pt-10">
        {/* Card peeking up when opening */}
        <motion.div
          initial={false}
          animate={
            isOpen
              ? { y: -46, opacity: 1, scale: 1 }
              : { y: 4, opacity: 0.95, scale: 0.96 }
          }
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto w-[84%] rounded-t-2xl border-2 border-[#FFE4EC] bg-white px-4 py-5 shadow-sm"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-semibold tracking-wide text-[#B94F7C] font-heading">
            <SparkleStar className="w-3.5 h-3.5" color="#F48FB1" />
            <span>{label}</span>
            <SparkleStar className="w-3.5 h-3.5" color="#F48FB1" />
          </div>
          <div className="mt-2 space-y-1.5 opacity-60">
            <div className="mx-auto h-1.5 w-3/4 rounded-full bg-[#FFE4EC]" />
            <div className="mx-auto h-1.5 w-1/2 rounded-full bg-[#F8BBD0]" />
          </div>
        </motion.div>

        {/* Envelope Body */}
        <div
          className="relative z-20 -mt-10 h-44 sm:h-48 w-full overflow-hidden rounded-2xl border-2 border-white bg-gradient-to-br from-[#FFE4EC] via-[#FCD5E3] to-[#F8BBD0] shadow-[0_18px_40px_-10px_rgba(185,79,124,0.32)]"
        >
          {/* Inner Envelope Pocket Lining */}
          <div
            className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#F48FB1]/35 to-transparent"
            aria-hidden="true"
          />

          {/* Side diagonal pocket folds */}
          <svg
            viewBox="0 0 340 200"
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="0,0 170,118 0,200" fill="#FFE8F0" opacity="0.92" />
            <polygon points="340,0 170,118 340,200" fill="#FFE0EB" opacity="0.92" />
            <polygon points="0,200 170,96 340,200" fill="#FFF0F5" />
            <path
              d="M0 200 L170 96 L340 200"
              fill="none"
              stroke="#F8BBD0"
              strokeWidth="2"
            />
          </svg>

          {/* Satin Pink Ribbon Band */}
          <div
            className={`pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-4 bg-gradient-to-r from-[#F48FB1] via-[#E875A5] to-[#F48FB1] shadow-sm transition-opacity duration-300 ${
              isOpen ? 'opacity-25' : 'opacity-95'
            }`}
            aria-hidden="true"
          />
          {!isLetter && (
            <div
              className={`pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-[#F48FB1] via-[#E875A5] to-[#F48FB1] shadow-sm transition-opacity duration-300 ${
                isOpen ? 'opacity-25' : 'opacity-95'
              }`}
              aria-hidden="true"
            />
          )}

          {/* Top Animated Flap */}
          <motion.div
            initial={false}
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 5 : 25,
            }}
            transition={{ duration: 0.6, ease: [0.34, 1.35, 0.64, 1] }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="pointer-events-none absolute inset-x-0 top-0 h-28"
          >
            <svg
              viewBox="0 0 340 120"
              className="h-full w-full drop-shadow-sm"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon
                points="0,0 340,0 170,112"
                fill={isOpen ? '#F8BBD0' : '#FFE4EC'}
                stroke="#F48FB1"
                strokeWidth="2"
              />
            </svg>
          </motion.div>

          {/* Centerpiece Seal: Satin Bow (Opening) OR Heart Wax Seal (Letter) */}
          <motion.div
            initial={false}
            animate={
              isOpen
                ? { scale: 0.72, opacity: 0, y: 12 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.35 }}
            className="relative z-30 flex h-full w-full items-center justify-center"
          >
            {isLetter ? (
              <div className="relative flex items-center justify-center">
                {/* Glossy Heart-shaped Wax Seal */}
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#F48FB1] via-[#E875A5] to-[#B94F7C] shadow-[0_6px_16px_rgba(185,79,124,0.45)] ring-4 ring-[#FFE4EC]/85 transition-transform duration-300 group-hover:scale-110">
                  <HeartIcon className="w-8 h-8" color="#FFF0F5" stroke="#FFFFFF" />
                </div>
                <SparkleStar
                  className="absolute -top-2 -right-2 w-4 h-4 animate-sparkle"
                  color="#B94F7C"
                />
              </div>
            ) : (
              <div className="relative flex flex-col items-center">
                <PinkBow
                  className="w-20 h-14 drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                  color="#F48FB1"
                  accent="#B94F7C"
                />
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {hintText && !isOpen && (
        <p className="mt-4 text-sm font-medium text-[#B94F7C] opacity-85 transition-opacity group-hover:opacity-100 font-ui">
          {hintText}
        </p>
      )}
    </motion.button>
  );
}
