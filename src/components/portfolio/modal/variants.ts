export const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const getBackdropVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.18,
      ease: 'linear' as const,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: shouldReduceMotion ? 0 : 0.15, ease: 'linear' as const },
  },
});

export const getContainerVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, scale: 0.98, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.26,
      ease: easing,
      delay: shouldReduceMotion ? 0 : 0.12,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 8,
    transition: { duration: shouldReduceMotion ? 0 : 0.18, ease: easing },
  },
});

export const getMediaVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.24,
      delay: shouldReduceMotion ? 0 : 0.52,
    },
  },
});

export const getTitleVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.2,
      delay: shouldReduceMotion ? 0 : 0.76,
      ease: easing,
    },
  },
});

export const getMetaVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: 4 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.16,
      delay: shouldReduceMotion ? 0 : 0.96,
      ease: easing,
    },
  },
});

export const getContentVariants = (shouldReduceMotion: boolean | null) => ({
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: shouldReduceMotion ? 0 : 0.24,
      delay: shouldReduceMotion ? 0 : 1.12,
      ease: easing,
      staggerChildren: shouldReduceMotion ? 0 : 0.08,
    },
  },
});
