import type { Variants } from 'framer-motion';
import { GHOST_EASE } from '../motion';

export const textReveal = (direction: 'left' | 'right' = 'left'): Variants => ({
  hidden: {
    opacity: 0,
    x: direction === 'left' ? -40 : 40,
    filter: 'blur(8px)',
  },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE, delay },
  }),
});

export const mediaReveal = (direction: 'left' | 'right'): Variants => ({
  hidden: {
    opacity: 0,
    y: 18,
    x: direction === 'left' ? -10 : 10,
    filter: 'blur(12px)',
  },
  visible: (delay = 0) => ({
    opacity: 0.9, // Imagens/vídeos nunca chegam a 100%
    y: 0,
    x: 0,
    filter: 'blur(0.6px)',
    transition: { duration: 1.1, ease: GHOST_EASE, delay: 0.12 + delay },
  }),
});
