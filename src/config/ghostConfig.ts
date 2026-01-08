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

// Define o tipo para as chaves da paleta
export type FluorescentColorName = keyof typeof FLUORESCENT_COLORS;

// Função para resolver nomes de cores para valores hex
export function resolveFluorescentColor(color: FluorescentColorName): string {
  return FLUORESCENT_COLORS[color] ?? color;
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
  bodyColor: FluorescentColorName; // Será resolvido para hex
  glowColor: FluorescentColorName; // Será resolvido para hex
  eyeGlowColor: FluorescentColorName; // Será resolvido para hex
  rimLightIntensity: number;
  ambientLightColor: FluorescentColorName; // Será resolvido para hex
  ambientLightIntensity: number;
  veilColor: FluorescentColorName; // Será resolvido para hex
  veilEmissive: FluorescentColorName; // Será resolvido para hex
  veilEmissiveIntensity: number;
  veilOpacity: number;
  veilPulseAmount: number;
  veilBackgroundColor: FluorescentColorName; // Será resolvido para hex
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
  particleColor: FluorescentColorName; // Será resolvido para hex
  particleSpeedFactor: number;
  particleRadius: number;
  particleGlowOffset: number;
  particleGlowSpeed: number;
  particleGlowStrength: number;
  particleOpacity: number;
  eyeGlowIntensity: number;
  eyeGlowResponse: number;
  eyeGlowDecay: number;
  wobbleAmount: number;
  movementThreshold: number;
  fireflyGlowIntensity: number;
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
  cameraDistance: 20, // Ajuste para o código de referência
  cameraFov: 75, // Ajuste para o código de referência
  rendererDPR: [1, 2],

  // Aparência do Ghost
  ghostScale: 0.8, // Ajuste para o código de referência
  bodyColor: 'blue', // Agora é uma string (nome da cor)
  glowColor: 'neonCyan', // Agora é uma string (nome da cor)
  eyeGlowColor: 'violetGlow', // Agora é uma string (nome da cor)
  ghostOpacity: 0.88,
  emissiveIntensity: 5.8,
  pulseSpeed: 1.6,
  pulseIntensity: 0.6, // Ajuste para o código de referência

  // Comportamento do Ghost
  followSpeed: 0.05, // Ajuste para o código de referência
  floatSpeed: 1.6, // Ajuste para o código de referência

  // Iluminação
  rimLightIntensity: 1.8, // Ajuste para o código de referência
  ambientLightColor: 'midnightBlue', // Agora é uma string (nome da cor)
  ambientLightIntensity: 0.08, // Ajuste para o código de referência

  // Véu Atmosférico (não implementado diretamente no código de referência como um mesh separado)
  // Vamos manter os valores antigos como placeholder, mas talvez não sejam usados.
  veilColor: 'electricBlue',
  veilEmissive: 'voidSky',
  veilEmissiveIntensity: 3.6,
  veilOpacity: 0.6,
  veilPulseAmount: 0.4,
  veilBackgroundColor: 'voidSky',
  veilBackgroundOpacity: 0.88,

  // Fireflies (Quantidade e detalhes ajustados para o código de referência)
  fireflyCount: 20, // Ajuste para o código de referência
  fireflySpeed: 0.09, // Ajuste para o código de referência
  fireflyBaseRadius: 3.2, // Placeholder
  fireflyRadiusVariance: 0.8, // Placeholder
  fireflyScaleBase: 0.02, // Placeholder
  fireflyScaleVariance: 0.04, // Placeholder
  fireflyFloatFrequency: 0.5, // Placeholder
  fireflyFloatAmplitude: 0.005, // Placeholder
  fireflyWobbleFrequency: 1.3, // Placeholder
  fireflyWobbleIntensity: 0.2, // Placeholder
  fireflyPulseBase: 0.6, // Placeholder
  fireflyPulseVariance: 0.35, // Placeholder
  fireflyPulseFrequency: 2.2, // Placeholder
  fireflyOpacity: 0.8, // Placeholder

  // Partículas (não implementado no código de referência como um sistema separado)
  particleCount: 160, // Placeholder
  particleColor: 'violetGlow', // Agora é uma string (nome da cor)
  particleSpeedFactor: 0.015, // Placeholder
  particleRadius: 4, // Placeholder
  particleGlowOffset: 1.4, // Placeholder
  particleGlowSpeed: 0.2, // Placeholder
  particleGlowStrength: 0.028, // Placeholder
  particleOpacity: 0.6, // Placeholder

  // Olhos
  // Olhos e Movimento
  eyeGlowIntensity: 4.5,
  eyeGlowResponse: 0.31,
  eyeGlowDecay: 0.15,
  wobbleAmount: 0.4,
  movementThreshold: 0.05,
  fireflyGlowIntensity: 0.8,

  // Efeitos de Pós-Processamento (Analog Decay)
  analogGrain: 0.4,
  analogBleeding: 0.9,
  analogScanlines: 1.0,
  analogVignette: 2.4,
  analogIntensity: 0.9,
  analogJitter: 0.5,
  analogVSync: 1.7,

  // Efeitos de Pós-Processamento (Bloom)
  bloomIntensity: 0.3,
  bloomThreshold: 0.1,
  bloomSmoothing: 0.9,
  bloomKernel: 1,
};
