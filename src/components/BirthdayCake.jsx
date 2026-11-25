import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const CANDLES = [
  { id: 'c1', x: 112, stripe: '#F48FB1' },
  { id: 'c2', x: 150, stripe: '#E875A5' },
  { id: 'c3', x: 188, stripe: '#F48FB1' },
];

/**
 * Custom 3-layer pastel pink birthday cake SVG with frosting drips,
 * pink ribbons, strawberries, and animated flickering candles.
 */
export default function BirthdayCake({ candlesLit = true, showSmoke = false }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px] select-none">
      {/* Soft glowing backdrop behind cake */}
      <div
        className={`pointer-events-none absolute left-1/2 top-8 h-44 w-56 -translate-x-1/2 rounded-full blur-2xl transition-opacity duration-700 ${
          candlesLit ? 'bg-[#FFE4EC] opacity-90' : 'bg-[#F8BBD0]/40 opacity-50'
        }`}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 300 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-auto w-full drop-shadow-[0_16px_28px_rgba(185,79,124,0.2)]"
        role="img"
        aria-label={
          candlesLit
            ? 'Three-layer pastel pink birthday cake with three lit candles'
            : 'Three-layer pastel pink birthday cake with candles blown out'
        }
      >
        {/* Cake Stand / Pedestal */}
        <path
          d="M126 244 L174 244 L164 264 L196 270 L104 270 L136 264 Z"
          fill="#FFE4EC"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        <ellipse
          cx="150"
          cy="242"
          rx="116"
          ry="16"
          fill="#FFFFFF"
          stroke="#F8BBD0"
          strokeWidth="3.5"
        />
        {/* Scalloped lace edge on plate */}
        <ellipse cx="150" cy="240" rx="102" ry="11" fill="#FFF0F5" />

        {/* === LAYER 1 (Bottom Layer) === */}
        <rect
          x="52"
          y="174"
          width="196"
          height="66"
          rx="16"
          fill="#F48FB1"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
        {/* Satin ribbon around bottom layer */}
        <rect x="52" y="216" width="196" height="12" fill="#E875A5" />
        {/* Bottom frosting drips */}
        <path
          d="M52 184 Q66 198 80 184 Q94 198 108 184 Q122 198 136 184 Q150 198 164 184 Q178 198 192 184 Q206 198 220 184 Q234 198 248 184 L248 174 Q248 166 232 166 L68 166 Q52 166 52 174 Z"
          fill="#FFFFFF"
        />
        {/* Cute Pink Bow centered on ribbon */}
        <path d="M148 222 C136 210 124 212 124 222 C124 232 136 232 148 222Z" fill="#B94F7C" stroke="#FFFFFF" strokeWidth="1.5" />
        <path d="M152 222 C164 210 176 212 176 222 C176 232 164 232 152 222Z" fill="#B94F7C" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="150" cy="222" r="5" fill="#FFE4EC" stroke="#B94F7C" strokeWidth="1.5" />

        {/* === LAYER 2 (Middle Layer) === */}
        <rect
          x="74"
          y="122"
          width="152"
          height="52"
          rx="14"
          fill="#F8BBD0"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
        {/* Ribbon trim on middle layer */}
        <rect x="74" y="156" width="152" height="7" fill="#F48FB1" opacity="0.8" />
        {/* Middle layer frosting drips */}
        <path
          d="M74 132 Q87 144 100 132 Q113 144 126 132 Q139 144 152 132 Q165 144 178 132 Q191 144 204 132 Q215 143 226 132 L226 122 Q226 115 212 115 L88 115 Q74 115 74 122 Z"
          fill="#FFFFFF"
        />
        {/* Sugar pearls */}
        {[94, 122, 150, 178, 206].map((cx) => (
          <circle key={cx} cx={cx} cy="148" r="3" fill="#FFF0F5" />
        ))}

        {/* === LAYER 3 (Top Layer) === */}
        <rect
          x="96"
          y="78"
          width="108"
          height="44"
          rx="13"
          fill="#FFE4EC"
          stroke="#FFFFFF"
          strokeWidth="3"
        />
        {/* Top frosting drips */}
        <path
          d="M96 87 Q107 98 118 87 Q129 98 140 87 Q150 98 161 87 Q172 98 183 87 Q194 97 204 87 L204 78 Q204 71 191 71 L109 71 Q96 71 96 78 Z"
          fill="#FFFFFF"
        />

        {/* Cute Strawberries on top & middle edge */}
        {[
          { cx: 100, cy: 70 },
          { cx: 132, cy: 68 },
          { cx: 168, cy: 68 },
          { cx: 200, cy: 70 },
          { cx: 83, cy: 113 },
          { cx: 217, cy: 113 },
        ].map((berry, idx) => (
          <g key={idx}>
            <path
              d={`M${berry.cx} ${berry.cy - 9} C${berry.cx + 9} ${berry.cy - 9} ${berry.cx + 10} ${berry.cy + 4} ${berry.cx} ${berry.cy + 8} C${berry.cx - 10} ${berry.cy + 4} ${berry.cx - 9} ${berry.cy - 9} ${berry.cx} ${berry.cy - 9}Z`}
              fill="#E875A5"
              stroke="#FFFFFF"
              strokeWidth="1.6"
            />
            <circle cx={berry.cx - 2.5} cy={berry.cy - 2} r="0.9" fill="#FFF0F5" />
            <circle cx={berry.cx + 2.5} cy={berry.cy} r="0.9" fill="#FFF0F5" />
            <circle cx={berry.cx} cy={berry.cy + 3} r="0.9" fill="#FFF0F5" />
            {/* Cute pink-blush leaf crown */}
            <path
              d={`M${berry.cx - 5} ${berry.cy - 9} Q${berry.cx} ${berry.cy - 13} ${berry.cx + 5} ${berry.cy - 9}`}
              stroke="#B94F7C"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        ))}

        {/* === CANDLES === */}
        {CANDLES.map((candle, idx) => (
          <g key={candle.id}>
            {/* Candle body */}
            <rect
              x={candle.x - 5.5}
              y="39"
              width="11"
              height="34"
              rx="4.5"
              fill="#FFFFFF"
              stroke={candle.stripe}
              strokeWidth="2"
            />
            {/* Diagonal pink stripes */}
            <line x1={candle.x - 3} y1="49" x2={candle.x + 3} y2="44" stroke={candle.stripe} strokeWidth="2.4" strokeLinecap="round" />
            <line x1={candle.x - 3} y1="58" x2={candle.x + 3} y2="53" stroke={candle.stripe} strokeWidth="2.4" strokeLinecap="round" />
            <line x1={candle.x - 3} y1="67" x2={candle.x + 3} y2="62" stroke={candle.stripe} strokeWidth="2.4" strokeLinecap="round" />

            {/* Wick */}
            <line x1={candle.x} y1="34" x2={candle.x} y2="39" stroke="#75465A" strokeWidth="1.8" strokeLinecap="round" />

            {/* Lit Flame + Glow */}
            <AnimatePresence>
              {candlesLit && (
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0, y: -6 }}
                  transition={{ duration: 0.32, delay: idx * 0.05 }}
                >
                  <circle
                    cx={candle.x}
                    cy="24"
                    r="14"
                    fill="#FFE0B2"
                    opacity="0.48"
                    className="animate-candle-glow"
                  />
                  <path
                    d={`M${candle.x} 11 C${candle.x + 6} 19 ${candle.x + 7} 28 ${candle.x} 33 C${candle.x - 7} 28 ${candle.x - 6} 19 ${candle.x} 11Z`}
                    fill="#FFCC80"
                    stroke="#F48FB1"
                    strokeWidth="1.2"
                    className="animate-flame"
                  />
                  <path
                    d={`M${candle.x} 19 C${candle.x + 3} 23 ${candle.x + 3.5} 28 ${candle.x} 31 C${candle.x - 3.5} 28 ${candle.x - 3} 23 ${candle.x} 19Z`}
                    fill="#FFF8E1"
                  />
                </motion.g>
              )}
            </AnimatePresence>

            {/* Smoke Wisps after blowing out */}
            {showSmoke && !candlesLit && (
              <g className="animate-smoke" style={{ animationDelay: `${idx * 0.12}s` }}>
                <circle cx={candle.x} cy="29" r="3.5" fill="#F8BBD0" opacity="0.6" />
                <circle cx={candle.x + 3} cy="21" r="4.5" fill="#FFE4EC" opacity="0.55" />
                <circle cx={candle.x - 2} cy="13" r="3" fill="#FFFFFF" opacity="0.6" />
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
