import React from 'react';
import { motion } from 'framer-motion';
import { HeartIcon, PastelFlower, SparkleStar } from './CuteDecorations';

const AMBIENT_ITEMS = [
  { id: 1, type: 'heart', left: '6%', top: '14%', size: 'w-5 h-5', delay: 0, duration: 5.8 },
  { id: 2, type: 'sparkle', left: '16%', top: '72%', size: 'w-4 h-4', delay: 0.9, duration: 4.6 },
  { id: 3, type: 'flower', left: '24%', top: '22%', size: 'w-6 h-6', delay: 1.4, duration: 6.4 },
  { id: 4, type: 'heart', left: '78%', top: '16%', size: 'w-6 h-6', delay: 0.4, duration: 5.2 },
  { id: 5, type: 'sparkle', left: '88%', top: '40%', size: 'w-5 h-5', delay: 1.8, duration: 4.8 },
  { id: 6, type: 'heart', left: '91%', top: '76%', size: 'w-4 h-4', delay: 1.1, duration: 6.0 },
  { id: 7, type: 'flower', left: '10%', top: '48%', size: 'w-5 h-5', delay: 2.1, duration: 6.6 },
  { id: 8, type: 'sparkle', left: '68%', top: '82%', size: 'w-4 h-4', delay: 0.6, duration: 5.0 },
];

const BURST_HEARTS = [
  { id: 'b1', x: -110, y: -155, scale: 1.1, delay: 0.02 },
  { id: 'b2', x: -55, y: -190, scale: 0.85, delay: 0.08 },
  { id: 'b3', x: 0, y: -210, scale: 1.25, delay: 0.04 },
  { id: 'b4', x: 58, y: -185, scale: 0.9, delay: 0.1 },
  { id: 'b5', x: 112, y: -150, scale: 1.05, delay: 0.06 },
  { id: 'b6', x: -85, y: -110, scale: 0.75, delay: 0.14 },
  { id: 'b7', x: 86, y: -118, scale: 0.8, delay: 0.12 },
];

/**
 * Soft ambient floating hearts, sparkles, and blossoms, plus an optional rising heart burst.
 */
export default function FloatingHearts({
  variant = 'ambient',
  burstActive = false,
  className = '',
}) {
  const items = variant === 'opening' || variant === 'final'
    ? AMBIENT_ITEMS
    : AMBIENT_ITEMS.slice(0, 6);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute opacity-60"
          style={{ left: item.left, top: item.top }}
          animate={{
            y: [0, -14, 0],
            x: [0, item.id % 2 === 0 ? 6 : -6, 0],
            rotate: [0, item.id % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.type === 'heart' && (
            <HeartIcon
              className={item.size}
              color={item.id % 2 === 0 ? '#F48FB1' : '#F8BBD0'}
              stroke="#FFFFFF"
            />
          )}
          {item.type === 'sparkle' && (
            <SparkleStar
              className={item.size}
              color={item.id % 2 === 0 ? '#E875A5' : '#F48FB1'}
            />
          )}
          {item.type === 'flower' && (
            <PastelFlower className={item.size} />
          )}
        </motion.div>
      ))}

      {burstActive && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {BURST_HEARTS.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 0, x: 0, y: 10, scale: 0.3 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: heart.x,
                y: heart.y,
                scale: [0.3, heart.scale, heart.scale * 0.9],
                rotate: [0, heart.x > 0 ? 18 : -18],
              }}
              transition={{
                duration: 1.5,
                delay: heart.delay,
                ease: 'easeOut',
              }}
              className="absolute"
            >
              <HeartIcon className="w-7 h-7 drop-shadow-sm" color="#E875A5" stroke="#FFFFFF" />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
