'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHOST_CONFIG, resolveFluorescentColor } from '@/config/ghostConfig';

export default function Fireflies() {
  const spritesRef = useRef<(THREE.Sprite | null)[]>([]);
  const resolvedColor = resolveFluorescentColor(GHOST_CONFIG.particleColor);

  const spriteMaterial = useMemo(
    () =>
      new THREE.SpriteMaterial({
        color: resolvedColor,
        opacity: GHOST_CONFIG.fireflyOpacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
        transparent: true,
      }),
    [resolvedColor]
  );

  const fireflies = useMemo(
    () =>
      Array.from({ length: GHOST_CONFIG.fireflyCount }, (_, index) => {
        const phase = index * 0.6;
        return {
          basePhase: phase,
          radius:
            GHOST_CONFIG.fireflyBaseRadius +
            Math.sin(index * 0.4) * GHOST_CONFIG.fireflyRadiusVariance,
          xFactor: Math.sin(index * 0.37) * 3,
          yFactor: Math.cos(index * 0.22) * 1.8,
          zFactor: Math.sin(index * 0.56) * 3,
          scaleBase:
            GHOST_CONFIG.fireflyScaleBase +
            Math.abs(Math.sin(index * 0.21)) *
              GHOST_CONFIG.fireflyScaleVariance,
        };
      }),
    []
  );

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    fireflies.forEach((firefly, index) => {
      const sprite = spritesRef.current[index];
      if (!sprite) return;

      const floatSpeed =
        Math.sin(elapsed * GHOST_CONFIG.fireflyFloatFrequency + index) *
        GHOST_CONFIG.fireflyFloatAmplitude;
      const orbitTime = elapsed * GHOST_CONFIG.fireflySpeed + firefly.basePhase;
      const wobble =
        Math.sin(orbitTime * GHOST_CONFIG.fireflyWobbleFrequency) *
        GHOST_CONFIG.fireflyWobbleIntensity;

      sprite.position.set(
        firefly.xFactor +
          Math.cos(orbitTime * 0.8) * firefly.radius +
          floatSpeed,
        firefly.yFactor +
          Math.sin(orbitTime * 0.6) * firefly.radius * 0.4 +
          wobble,
        firefly.zFactor + Math.cos(orbitTime * 0.4) * firefly.radius * 0.6
      );

      const pulse =
        GHOST_CONFIG.fireflyPulseBase +
        Math.sin(orbitTime * GHOST_CONFIG.fireflyPulseFrequency) *
          GHOST_CONFIG.fireflyPulseVariance;
      const scale = firefly.scaleBase * pulse;
      sprite.scale.setScalar(scale);
    });
  });

  return (
    <group>
      {fireflies.map((_, index) => (
        <sprite
          key={index}
          ref={(el) => {
            spritesRef.current[index] = el;
          }}
          material={spriteMaterial}
        />
      ))}
    </group>
  );
}
