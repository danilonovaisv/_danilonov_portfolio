// src/config/ghostConfig.ts

// Paleta de cores fluorescentes
export const FLUORESCENT_COLORS = {
  electricBlue: '#0080ff',
  neonCyan: '#50e3c2',
  violetGlow: '#8a2be2',
  midnightBlue: '#040013',
  deepSpace: '#0f2027',
  voidSky: '#020112',
  aurora: '#4fe6ff',
  cosmicPink: '#f501d3',
  // Adicionando cores do seu config anterior para compatibilidade
  cyan: '#00ffff',
  lime: '#00ff00',
  magenta: '#ff00ff',
  yellow: '#ffff00',
  orange: '#ff4500',
  pink: '#ff1493',
  purple: '#9400d3',
  blue: '#0080ff', // Duplicado de electricBlue, mas mantido por compatibilidade
  green: '#00ff80',
  red: '#ff0040',
  teal: '#00ffaa',
} as const;

// Função para resolver nomes de cores para valores hex
export function resolveFluorescentColor(color: string) {
  return FLUORESCENT_COLORS[color as keyof typeof FLUORESCENT_COLORS] ?? color;
}

// Interface para a configuração do Ghost
export interface GhostConfig {
  backgroundColor: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;
  cameraDistance: number;
  cameraFov: number;
  rendererDPR: [number, number];
  ghostScale: number;
  followSpeed: number;
  pulseSpeed: number;
  pulseIntensity: number;
  emissiveIntensity: number;
  floatSpeed: number;
  ghostOpacity: number;
  bodyColor: string; // Será resolvido para hex
  glowColor: string; // Será resolvido para hex
  eyeGlowColor: string; // Será resolvido para hex
  rimLightIntensity: number;
  ambientLightColor: string; // Será resolvido para hex
  ambientLightIntensity: number;
  veilColor: string; // Será resolvido para hex
  veilEmissive: string; // Será resolvido para hex
  veilEmissiveIntensity: number;
  veilOpacity: number;
  veilPulseAmount: number;
  veilBackgroundColor: string; // Será resolvido para hex
  veilBackgroundOpacity: number;
  fireflyCount: number;
  fireflySpeed: number;
  fireflyBaseRadius: number;
  fireflyRadiusVariance: number;
  fireflyScaleBase: number;
  fireflyScaleVariance: number;
  fireflyFloatFrequency: number;
  fireflyFloatAmplitude: number;
  fireflyWobbleFrequency: number;
  fireflyWobbleIntensity: number;
  fireflyPulseBase: number;
  fireflyPulseVariance: number;
  fireflyPulseFrequency: number;
  fireflyOpacity: number;
  particleCount: number;
  particleColor: string; // Será resolvido para hex
  particleSpeedFactor: number;
  particleRadius: number;
  particleGlowOffset: number;
  particleGlowSpeed: number;
  particleGlowStrength: number;
  particleOpacity: number;
  eyeGlowIntensity: number;
  eyeGlowResponse: number;
  analogGrain: number;
  analogBleeding: number;
  analogScanlines: number;
  analogVignette: number;
  analogIntensity: number;
  analogJitter: number;
  analogVSync: number;
  bloomIntensity: number;
  bloomThreshold: number;
  bloomSmoothing: number;
  bloomKernel: number;
}

// Configuração centralizada do Ghost
export const GHOST_CONFIG: GhostConfig = {
  backgroundColor: '#01010f',
  fogColor: '#051f51',
  fogNear: 6,
  fogFar: 28,
  cameraDistance: 18,
  cameraFov: 60,
  rendererDPR: [2, 4], // [min, max] DPR range

  // Aparência do Ghost
  ghostScale: 1.2,
  bodyColor: 'blue', // Usa a função para resolver
  glowColor: 'cyan',
  eyeGlowColor: 'violet',
  ghostOpacity: 0.88,
  emissiveIntensity: 8.8,
  pulseSpeed: 1.6,
  pulseIntensity: 0.75,

  // Comportamento do Ghost
  followSpeed: 0.08,
  floatSpeed: 0.2,

  // Iluminação
  rimLightIntensity: 1.6,
  ambientLightColor: 'purple', // Ajuste para cor semelhante
  ambientLightIntensity: 2.18,

  // Véu Atmosférico
  veilColor: 'midnightBlue',
  veilEmissive: 'voidSky', // Ajuste para cor semelhante
  veilEmissiveIntensity: 3.6,
  veilOpacity: 0.6,
  veilPulseAmount: 0.4,
  veilBackgroundColor: 'midnightBlue',
  veilBackgroundOpacity: 0.88,

  // Fireflies
  fireflyCount: 220,
  fireflySpeed: 0.18,
  fireflyBaseRadius: 3.2,
  fireflyRadiusVariance: 0.8,
  fireflyScaleBase: 0.02,
  fireflyScaleVariance: 0.04,
  fireflyFloatFrequency: 0.5,
  fireflyFloatAmplitude: 0.005,
  fireflyWobbleFrequency: 1.3,
  fireflyWobbleIntensity: 0.2,
  fireflyPulseBase: 0.6,
  fireflyPulseVariance: 0.35,
  fireflyPulseFrequency: 2.2,
  fireflyOpacity: 0.3,

  // Partículas
  particleCount: 160,
  particleColor: 'violet',
  particleSpeedFactor: 0.015,
  particleRadius: 4,
  particleGlowOffset: 1.4,
  particleGlowSpeed: 0.2,
  particleGlowStrength: 0.028,
  particleOpacity: 0.6,

  // Olhos
  eyeGlowIntensity: 0.8,
  eyeGlowResponse: 0.18,

  // Efeitos de Pós-Processamento (Analog Decay)
  analogGrain: 0.4,
  analogBleeding: 1.2,
  analogScanlines: 1.3,
  analogVignette: 1.1,
  analogIntensity: 0.65,
  analogJitter: 0.4,
  analogVSync: 1.0,

  // Efeitos de Pós-Processamento (Bloom - se aplicável)
  bloomIntensity: 0.35,
  bloomThreshold: 0.15,
  bloomSmoothing: 0.9,
  bloomKernel: 1,
};
