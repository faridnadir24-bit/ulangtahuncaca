import confetti from 'canvas-confetti';

const PINK_PALETTE = [
  '#F48FB1',
  '#F8BBD0',
  '#E875A5',
  '#FFE4EC',
  '#B94F7C',
  '#FFFFFF',
];

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

/**
 * Fires a soft pastel pink celebration burst from the center or a given origin.
 */
export function firePinkConfetti(origin = { x: 0.5, y: 0.55 }, count = 65) {
  if (prefersReducedMotion()) return;

  confetti({
    particleCount: count,
    spread: 75,
    startVelocity: 32,
    gravity: 0.85,
    ticks: 210,
    origin,
    colors: PINK_PALETTE,
    scalar: 0.95,
    disableForReducedMotion: true,
  });
}

/**
 * Dual side cannon celebration for the Opening Reveal and Candle Wish moment.
 */
export function fireBirthdayCelebration() {
  if (prefersReducedMotion()) return;

  confetti({
    particleCount: 55,
    angle: 60,
    spread: 60,
    origin: { x: 0.12, y: 0.65 },
    colors: PINK_PALETTE,
    ticks: 220,
    disableForReducedMotion: true,
  });

  confetti({
    particleCount: 55,
    angle: 120,
    spread: 60,
    origin: { x: 0.88, y: 0.65 },
    colors: PINK_PALETTE,
    ticks: 220,
    disableForReducedMotion: true,
  });

  setTimeout(() => {
    confetti({
      particleCount: 42,
      spread: 95,
      startVelocity: 26,
      origin: { x: 0.5, y: 0.45 },
      colors: PINK_PALETTE,
      shapes: ['circle'],
      scalar: 0.85,
      disableForReducedMotion: true,
    });
  }, 240);
}
