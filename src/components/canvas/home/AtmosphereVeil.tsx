'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { GHOST_CONFIG, resolveFluorescentColor } from '@/config/ghostConfig';

export default function AtmosphereVeil() {
  const veilRef = useRef<THREE.Mesh>(null);
  const veilColor = resolveFluorescentColor(GHOST_CONFIG.veilColor);
  const veilEmissive = resolveFluorescentColor(GHOST_CONFIG.veilEmissive);
  const veilBackground = resolveFluorescentColor(
    GHOST_CONFIG.veilBackgroundColor
  );

  useFrame((state) => {
    if (!veilRef.current) return;
    const pulse = (Math.sin(state.clock.getElapsedTime() * 0.3) + 1) / 2;
    const material = veilRef.current.material as THREE.Material & {
      opacity?: number;
    };
    if (material.opacity !== undefined) {
      material.opacity = Math.min(
        1,
        GHOST_CONFIG.veilOpacity + pulse * GHOST_CONFIG.veilPulseAmount
      );
    }
  });

  return (
    <group>
      {/* Glow volumétrico atrás do fantasma */}
      <mesh
        ref={veilRef}
        position={[1, 1, -3]}
        scale={[1.2, 1.1, 1.1]}
        renderOrder={2}
      >
        <sphereGeometry args={[5.5, 64, 64]} />
        <meshStandardMaterial
          color={veilColor}
          emissive={veilEmissive}
          emissiveIntensity={GHOST_CONFIG.veilEmissiveIntensity}
          transparent
          opacity={GHOST_CONFIG.veilOpacity}
          depthWrite={false}
          side={THREE.BackSide}
          toneMapped={false}
        />
      </mesh>

      {/* Véu de fundo para integrar com o CSS */}
      <mesh position={[0, -2.5, -4]} rotation={[-0.1, 0, 0]} renderOrder={1}>
        <planeGeometry args={[18, 12]} />
        <meshStandardMaterial
          color={veilBackground}
          transparent
          opacity={GHOST_CONFIG.veilBackgroundOpacity}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
