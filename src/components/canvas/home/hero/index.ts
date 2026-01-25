/**
 * Canvas Home Hero - Barrel Exports
 * ===================================
 * Exportações centralizadas dos componentes da cena Ghost
 */

// Main Canvas Wrapper (R3F Declarativo)
export { GhostCanvas } from './GhostCanvas';
export { default as GhostCanvasDefault } from './GhostCanvas';

// Componentes da Cena
export { Ghost } from './Ghost';
export { Atmosphere } from './Atmosphere';
export { AtmosphereVeil } from './AtmosphereVeil';
export { GhostFireflies } from './GhostFireflies';
export { GhostParticles } from './GhostParticles';

// Cena Three.js Pura (Legacy - para casos específicos de performance)
export { default as GhostScene } from './GhostScene';
