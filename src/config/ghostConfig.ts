/**
 * Ghost System v3.0 - Configuration
 * Central point of truth for all "Ghost" related parameters.
 */

export const FLUORESCENT_COLORS = {
  blue: '#0048ff',
  cyan: '#4fe6ff',
  purple: '#8705f2',
  white: '#fcffff',
  black: '#040013',
} as const;

export const GHOST_CONFIG = {
  // Movement & Physics
  followSpeed: 0.05,
  floatSpeed: 1.5,
  pulseSpeed: 2.0,
  pulseIntensity: 0.5,

  // Visuals
  ghostScale: 0.2,
  ghostOpacity: 0.88,
  bodyColor: '#0059ff',
  glowColor: '#4fe6ff', // blueAccent
  eyeGlowColor: '#610ab8', // text
  emissiveIntensity: 1.2,
  rimLightIntensity: 1.2,

  // Scene Environment
  fogColor: '#040013',
  fogNear: 5,
  fogFar: 15,
  ambientLightColor: 'rgba(0,234,255,0.85)',
  ambientLightIntensity: 0.2,

  // Particles
  fireflySpeed: 1.0,
  particleCount: 90,

  // Post-Processing (Analog Decay)
  postProcessing: {
    intensity: 0.7,
    scanlines: 0.08,
    grain: 0.25,
    vignette: 0.7,
    bloomIntensity: 3.5,
    bloomRadius: 0.7,
    noiseOpacity: 0.015,
  },
} as const;
