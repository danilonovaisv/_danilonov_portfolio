export const headerTokens = {
  // Colors & Typography now sourced from @/config/brand.ts
  layout: {
    height: 64,
    paddingX: 24,
    minTouchTarget: 48,
  },
  zIndex: {
    header: 40,
    hero: 20,
    webgl: 0,
  },
  motion: {
    hoverOpacity: 0.85,
    glassDamping: 0.15,
    staggerDelay: 0.1,
  },
} as const;
