// src/config/ghostConfig.ts
// Paleta de cores fluorescentes
export const FLUORESCENT_COLORS: Record<string, string> = {
  cyan: '#00ffff',
  lime: '#00ff00',
  magenta: '#ff00ff',
  yellow: '#ffff00',
  orange: '#ff4500',
  pink: '#ff1493',
  purple: '#9400d3',
  blue: '#0080ff',
  green: '#00ff80',
  red: '#ff0040',
  teal: '#00ffaa',
  violet: '#8a2be2',
};

// Configuração centralizada do Ghost
export const GHOST_CONFIG = {
  // Ghost appearance
  bodyColor: 'blue',
  glowColor: 'cyan', // Azul ciano para maior brilho
  eyeGlowColor: 'orange',
  ghostOpacity: 0.88,
  ghostScale: 0.2,

  // Glow effects
  emissiveIntensity: 1.8, // Intensidade alta para criar o brilho de lanterna
  pulseSpeed: 1.6,
  pulseIntensity: 1.6,

  // Eyes
  eyeGlowIntensity: 3.5,
  eyeGlowDecay: 0.95,
  eyeGlowResponse: 1.31,

  // Enhanced lighting
  rimLightIntensity: 5.8,

  // Behavior
  followSpeed: 0.050,
  wobbleAmount: 0.35,
  floatSpeed: 2.6,
  movementThreshold: 0.07,

  // Particles
  particleCount: 250,
  particleDecayRate: 0.0015,
  particleColor: 'violet',
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 0.5,
  particleRadius: 4,
  particleSpeedFactor: 0.15,

  // Background reveal
  revealRadius: 27,
  fadeStrength: 1.7,
  baseOpacity: 0.90,
  revealOpacity: 0.05,

  // Fireflies
  fireflyGlowIntensity: 4.3,
  fireflySpeed: 0.090,
  fireflyCount: 30,

  // Analog Decay settings
  analogIntensity: 0.7,
  analogGrain: 0.04,
  analogBleeding: 0.9,
  analogVSync: 1.7,
  analogScanlines: 1.04,
  analogVignette: 0.4,
  analogJitter: 0.6,
  limboMode: false,
};
