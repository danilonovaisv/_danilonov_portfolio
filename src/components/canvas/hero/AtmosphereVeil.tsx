'use client';

import * as THREE from 'three';
import { GHOST_CONFIG, FLUORESCENT_COLORS } from '@/config/ghostConfig';

export default function AtmosphereVeil() {
  const cfg = GHOST_CONFIG;
  const glowCol = (FLUORESCENT_COLORS as any)[cfg.glowColor] || cfg.glowColor;
  const bgCol = (FLUORESCENT_COLORS as any)[cfg.fogColor] || cfg.fogColor;

  return (
    <group>
      {/* Glow Volumétrico atrás do fantasma */}
      <mesh position={[1, 1, -3]} scale={[1, 1, 1]}>
        <sphereGeometry args={[5.5, 32, 32]} />
        <meshBasicMaterial
          color={glowCol}
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Véu de fundo para integrar com o CSS */}
      <mesh position={[0, -2, -4]}>
        <planeGeometry args={[15, 16]} />
        <meshBasicMaterial
          color={bgCol}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
