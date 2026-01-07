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
  blue: '#0080ff',
  green: '#00ff80',
  red: '#ff0040',
  teal: '#00ffaa',
  violet: '#8a2be2',
};

// Mapeamento de nomes de cores para valores numéricos para Three.js
const THREE_COLOR_MAP: Record<string, number> = {
  cyan: 0x00ffff,
  lime: 0x00ff00,
  magenta: 0xff00ff,
  yellow: 0xffff00,
  orange: 0xff4500,
  pink: 0xff1493,
  purple: 0x9400d3,
  blue: 0x0080ff,
  green: 0x00ff80,
  red: 0xff0040,
  teal: 0x00ffaa,
  violet: 0x8a2be2,
};

// Função auxiliar para resolver a cor
const resolveColor = (
  colorName: string,
  defaultHex: string = '#ffffff'
): string => {
  return (
    FLUORESCENT_COLORS[colorName as keyof typeof FLUORESCENT_COLORS] ||
    defaultHex
  );
};

const resolveThreeColorNumber = (
  colorName: string,
  defaultNum: number = 0xffffff
): number => {
  return (
    THREE_COLOR_MAP[colorName as keyof typeof THREE_COLOR_MAP] || defaultNum
  );
};

// Configuração centralizada do Ghost
export const GHOST_CONFIG = {
  // Ghost appearance
  bodyColor: resolveColor('cyan'), // Usa a função para pegar o valor hex
  glowColor: resolveColor('blue'),
  eyeGlowColor: resolveColor('violet'),
  ghostOpacity: 0.78,
  ghostScale: 0.2,

  // Glow effects
  emissiveIntensity: 3.8, // Intensidade alta para criar o brilho de lanterna
  pulseSpeed: 1.6,
  pulseIntensity: 1.6,

  // Eyes
  eyeGlowIntensity: 9.5,
  eyeGlowDecay: 0.95,
  eyeGlowResponse: 0.31,

  // Enhanced lighting (usado em Three.js numbers)
  rimLightIntensity: 6.8,

  // Behavior
  followSpeed: 0.05,
  wobbleAmount: 0.35,
  floatSpeed: 1.6,
  movementThreshold: 0.07,

  // Particles
  particleCount: 550,
  particleDecayRate: 0.015,
  particleColor: resolveThreeColorNumber('pink'), // Usa o número para Three.js
  createParticlesOnlyWhenMoving: true,
  particleCreationRate: 45,

  // Background reveal (valores ajustados para simular a "lanterna")
  revealRadius: 37,
  fadeStrength: 12.7,
  baseOpacity: 1.9, // Ajuste cuidadoso, pode ser >= 1 para escurecer mais o fundo
  revealOpacity: 0.05,

  // Fireflies
  fireflyGlowIntensity: 4.3,
  fireflySpeed: 0.09,

  // Analog Decay settings
  analogIntensity: 0.9,
  analogGrain: 0.2,
  analogBleeding: 0.0,
  analogVSync: 0.7,
  analogScanlines: 0.0,
  analogVignette: 3.4,
  analogJitter: 0.5,
  limboMode: false,
};
