// src/config/ghostConfig.ts

// Paleta de cores fluorescentes (mantendo os nomes originais)
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
} as const;

// Função para resolver nomes de cores para valores hex
export function resolveFluorescentColor(color: string) {
  return FLUORESCENT_COLORS[color as keyof typeof FLUORESCENT_COLORS] ?? color;
}

// Interface para a configuração do Ghost
export interface GhostConfig {
  // Fundo e névoa
  backgroundColor: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;

  // Câmera e renderização
  cameraDistance: number;
  cameraFov: number;
  rendererDPR: [number, number];

  // Aparência do Ghost
  ghostScale: number;
  bodyColor: string; // Nome da cor
  glowColor: string; // Nome da cor
  eyeGlowColor: string; // Nome da cor
  ghostOpacity: number;
  emissiveIntensity: number;
  pulseSpeed: number;
  pulseIntensity: number;
  floatSpeed: number;

  wobbleAmount: number;
  movementThreshold: number;
  eyeGlowDecay: number;

  // Comportamento do Ghost
  followSpeed: number;

  // Iluminação
  rimLightIntensity: number;
  ambientLightColor: string; // Nome da cor
  ambientLightIntensity: number;

  // Véu Atmosférico (Revelação)
  veilColor: string; // Cor do véu
  veilEmissive: string; // Cor do brilho do véu
  veilEmissiveIntensity: number;
  veilOpacity: number;
  veilPulseAmount: number;
  veilBackgroundColor: string; // Cor de fundo do véu
  veilBackgroundOpacity: number;

  // Fireflies
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

  // Partículas
  particleCount: number;
  particleColor: string; // Nome da cor
  particleSpeedFactor: number;
  particleRadius: number;
  particleGlowOffset: number;
  particleGlowSpeed: number;
  particleGlowStrength: number;
  particleOpacity: number;

  // Olhos
  eyeGlowIntensity: number;
  eyeGlowResponse: number;

  // Efeitos de Pós-Processamento (Analog Decay)
  analogGrain: number;
  analogBleeding: number;
  analogScanlines: number;
  analogVignette: number;
  analogIntensity: number;
  analogJitter: number;
  analogVSync: number;

  // Parâmetros do Véu Atmosférico (novos)
  revealRadius: number;
  fadeStrength: number;
  baseOpacity: number;
  revealOpacity: number;
}

// Configuração centralizada do Ghost (valores alinhados com o CodePen)
export const GHOST_CONFIG: GhostConfig = {
  backgroundColor: '#01010f',
  fogColor: '#051f51',
  fogNear: 6,
  fogFar: 28,

  cameraDistance: 20,
  cameraFov: 75,
  rendererDPR: [1, 2],

  ghostScale: 2.4,
  bodyColor: 'deepSpace', // Agora é uma string (nome da cor)
  glowColor: 'neonCyan', // Agora é uma string (nome da cor)
  eyeGlowColor: 'violetGlow', // Agora é uma string (nome da cor)
  ghostOpacity: 0.88,
  emissiveIntensity: 5.8,
  pulseSpeed: 1.6,
  pulseIntensity: 0.6,
  floatSpeed: 1.6,

  wobbleAmount: 1.0,
  movementThreshold: 0.1,
  eyeGlowDecay: 0.95,

  followSpeed: 0.05,

  rimLightIntensity: 1.8,
  ambientLightColor: 'midnightBlue', // Agora é uma string (nome da cor)
  ambientLightIntensity: 0.08,

  veilColor: 'electricBlue',
  veilEmissive: 'voidSky',
  veilEmissiveIntensity: 3.6,
  veilOpacity: 0.6,
  veilPulseAmount: 0.4,
  veilBackgroundColor: 'voidSky',
  veilBackgroundOpacity: 0.88,

  fireflyCount: 20,
  fireflySpeed: 0.09,
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
  fireflyOpacity: 0.8,

  particleCount: 160,
  particleColor: 'violetGlow',
  particleSpeedFactor: 0.015,
  particleRadius: 4,
  particleGlowOffset: 1.4,
  particleGlowSpeed: 0.2,
  particleGlowStrength: 0.028,
  particleOpacity: 0.6,

  eyeGlowIntensity: 4.5,
  eyeGlowResponse: 0.31,

  analogGrain: 0.4,
  analogBleeding: 0.9,
  analogScanlines: 1.0,
  analogVignette: 2.4,
  analogIntensity: 0.9,
  analogJitter: 0.5,
  analogVSync: 1.7,

  // Parâmetros do Véu Atmosférico (novos)
  revealRadius: 37,
  fadeStrength: 1.7,
  baseOpacity: 0.9,
  revealOpacity: 0.05,
};
