// src/config/ghostConfig.ts
// Paleta de cores fluorescentes
export const FLUORESCENT_COLORS = {
  cyan: '#00ffff',
  lime: '#00ff00',
  magenta: '#ff00ff',
  yellow: '#ffff00',
  orange: '#ff4500',
  pink: '#ff1493',
  purple: '#9400d3',
  blue: '#0048ff',
  green: '#00ff80',
  red: '#ff0040',
  teal: '#00ffaa',
  violet: '#8a2be2',
};

// Configuração centralizada do Ghost
// Valores calibrados para corresponder à referência HERO.png
export const GHOST_CONFIG = {
  // Ghost appearance - Cores hex para garantir consistência
  bodyColor: '#1a3050', // Corpo azul mais claro para visibilidade
  glowColor: '#00aaff', // Blue glow mais brilhante
  eyeGlowColor: '#101025', // Olhos escuros/roxo profundo
  ghostOpacity: 0.95,
  ghostScale: 1.5, // AUMENTADO: Ghost maior e mais visível

  // Glow effects - Intensificado para efeito lanterna
  emissiveIntensity: 8.0, // AUMENTADO para maior visibilidade
  pulseSpeed: 1.4,
  pulseIntensity: 2.0,

  // Eyes - Valores ajustados
  eyeGlowIntensity: 2.0,
  eyeGlowDecay: 2.0,
  eyeGlowResponse: 1.2,

  // Enhanced lighting - Mais intenso
  rimLightIntensity: 5.0,

  // Behavior - Movimento suave
  followSpeed: 0.035,
  wobbleAmount: 1.5,
  floatSpeed: 1.2,
  movementThreshold: 0.8,

  // Particles - Reduzido para performance
  particleCount: 120,
  particleDecayRate: 0.02,
  particleColor: '#4fe6ff',
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 0.8,

  // Background reveal
  revealRadius: 35,
  fadeStrength: 1.5,
  baseOpacity: 0.95,
  revealOpacity: 0.1,

  // Fireflies
  fireflyGlowIntensity: 1500,
  fireflySpeed: 0.012,

  // Analog Decay settings - Sutilizado
  analogIntensity: 0.8,
  analogGrain: 0.2,
  analogBleeding: 0.4,
  analogVSync: 0.1,
  analogScanlines: 0.6,
  analogVignette: 1.2,
  analogJitter: 0.2,
  limboMode: false,
};
