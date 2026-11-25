import React from 'react';

/**
 * Cute satin pink bow SVG used on envelopes, scrapbook cards, and headers.
 */
export function PinkBow({ className = 'w-12 h-8', color = '#F48FB1', accent = '#E875A5' }) {
  return (
    <svg
      viewBox="0 0 80 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Ribbon tails */}
      <path
        d="M36 27L20 49L29 45L34 51L40 31Z"
        fill={accent}
      />
      <path
        d="M44 27L60 49L51 45L46 51L40 31Z"
        fill={accent}
      />
      {/* Left loop */}
      <path
        d="M38 25C25 10 8 9 7 23C6 36 24 37 38 26Z"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      {/* Right loop */}
      <path
        d="M42 25C55 10 72 9 73 23C74 36 56 37 42 26Z"
        fill={color}
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      {/* Inner creases */}
      <path d="M18 22C24 21 30 23 35 25" stroke="#FFE4EC" strokeWidth="2" strokeLinecap="round" />
      <path d="M62 22C56 21 50 23 45 25" stroke="#FFE4EC" strokeWidth="2" strokeLinecap="round" />
      {/* Center knot */}
      <rect x="33" y="18" width="14" height="14" rx="6" fill="#B94F7C" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="38" cy="23" r="2" fill="#FFE4EC" opacity="0.85" />
    </svg>
  );
}

/**
 * Soft 5-petal pastel pink blossom.
 */
export function PastelFlower({ className = 'w-8 h-8', petal = '#F8BBD0', center = '#FFE4EC' }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="30" cy="14" r="10" fill={petal} />
      <circle cx="45" cy="25" r="10" fill={petal} />
      <circle cx="39" cy="43" r="10" fill={petal} />
      <circle cx="21" cy="43" r="10" fill={petal} />
      <circle cx="15" cy="25" r="10" fill={petal} />
      <circle cx="30" cy="30" r="8.5" fill={center} stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="30" cy="30" r="3" fill="#E875A5" />
    </svg>
  );
}

/**
 * Clean 4-point kawaii sparkle star.
 */
export function SparkleStar({ className = 'w-5 h-5', color = '#F48FB1' }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M16 2L19.4 12.6L30 16L19.4 19.4L16 30L12.6 19.4L2 16L12.6 12.6L16 2Z"
        fill={color}
      />
    </svg>
  );
}

/**
 * Cute glossy pastel pink heart SVG.
 */
export function HeartIcon({ className = 'w-6 h-6', color = '#F48FB1', stroke = '#FFFFFF' }) {
  return (
    <svg viewBox="0 0 40 36" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 33C20 33 4 23.2 4 12.2C4 7.1 8 3.5 12.8 3.5C15.9 3.5 18.4 5.1 20 7.7C21.6 5.1 24.1 3.5 27.2 3.5C32 3.5 36 7.1 36 12.2C36 23.2 20 33 20 33Z"
        fill={color}
        stroke={stroke}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="13" cy="11" r="2.2" fill="#FFFFFF" opacity="0.7" />
    </svg>
  );
}

/**
 * Die-cut white-bordered scrapbook sticker badge for Polaroids & cards.
 */
export function StickerBadge({ type = 'heart', className = '' }) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-white p-1.5 shadow-md ring-2 ring-[#FFE4EC] ${className}`}
      aria-hidden="true"
    >
      {type === 'bow' && <PinkBow className="w-7 h-5" />}
      {type === 'heart' && <HeartIcon className="w-5 h-5" color="#E875A5" stroke="#FFE4EC" />}
      {type === 'flower' && <PastelFlower className="w-6 h-6" />}
      {type === 'sparkle' && <SparkleStar className="w-5 h-5" color="#E875A5" />}
      {type === 'star' && <SparkleStar className="w-5 h-5" color="#F48FB1" />}
      {type === 'ribbon' && <PinkBow className="w-7 h-5" color="#F8BBD0" accent="#B94F7C" />}
    </div>
  );
}

/**
 * Scrapbook page divider with ribbon line and small heart emblem.
 */
export function ScrapbookDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-4 px-6 ${className}`} aria-hidden="true">
      <div className="h-[1.5px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#F8BBD0] to-[#F48FB1]" />
      <PastelFlower className="w-5 h-5 opacity-80" />
      <HeartIcon className="w-5 h-5" color="#F48FB1" stroke="#FFFFFF" />
      <PastelFlower className="w-5 h-5 opacity-80" />
      <div className="h-[1.5px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#F8BBD0] to-[#F48FB1]" />
    </div>
  );
}
