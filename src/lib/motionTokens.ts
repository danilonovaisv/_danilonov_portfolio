import { Variants, Transition } from 'framer-motion';

// Configurações base
export const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]; // Curva Bezier "Editorial"

export const DURATION_FAST = 0.4;
export const DURATION_MEDIUM = 0.8;
export const DURATION_SLOW = 1.2;

export const GHOST_DURATION = 0.9;
export const GHOST_DURATION_LONG = 1.4;

export const GHOST_TRANSITION = {
  duration: 0.8,
  ease: GHOST_EASE,
};

// Transition Helpers
export const ghostTransition = (
  delay = 0,
  duration = GHOST_DURATION
): Transition => ({
  duration,
  delay,
  ease: GHOST_EASE,
});

export const MOTION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: GHOST_EASE,
      },
    },
  },
};

// Tokens de Motion Legacy/Específicos

// ghostIn: Opacity + Blur (sem translate/scale)
export const ghostIn: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(10px)',
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: ghostTransition(customDelay, GHOST_DURATION_LONG),
  }),
};

// fadeGhost: Variante mais leve de opacity + blur
export const fadeGhost: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px)',
  },
  visible: (customDelay = 0.2) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: ghostTransition(customDelay),
  }),
};

// riseSoft: Leve Y (~18px) + Opacity + Blur (sem bounce)
export const riseSoft: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(8px)',
  },
  visible: (customDelay = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: ghostTransition(customDelay),
  }),
};

// floatMemory: Pequeno deslocamento lateral/vertical
export const floatMemory: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    x: 10,
  },
  visible: (customDelay = 0) => ({
    opacity: 0.65, // Opacity 0.6-0.7 conforme spec
    y: 0,
    x: 0,
    transition: {
      opacity: { duration: 1.2, delay: customDelay, ease: GHOST_EASE },
      y: { duration: 1.2, delay: customDelay, ease: GHOST_EASE },
      x: { duration: 1.2, delay: customDelay, ease: GHOST_EASE },
    },
  }),
};

// imageFloat: Entrada suave para imagens intercaladas
export const imageFloat: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (customDelay = 0) => ({
    opacity: 0.65, // Opacity 0.6-0.7 conforme spec
    y: 0,
    transition: {
      duration: 1,
      delay: customDelay,
      ease: GHOST_EASE,
    },
  }),
};

// staggerGhost: Helper para container de listas
export const staggerGhost = (staggerDelay = 0.18): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.2,
    },
  },
});
