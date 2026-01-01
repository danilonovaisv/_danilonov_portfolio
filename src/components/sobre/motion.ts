// src/components/about/motion.ts
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const motionTokens = {
  fadeGhost: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: GHOST_EASE },
    },
  },
  riseSoft: {
    hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: GHOST_EASE },
    },
  },
  imageFloat: {
    hidden: { opacity: 0, x: 12 },
    visible: {
      opacity: 0.65,
      x: 0,
      transition: { duration: 1.2, ease: GHOST_EASE },
    },
  },
};
