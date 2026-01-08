'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG, resolveFluorescentColor } from '@/config/ghostConfig';

const harmonicNoise = (seed: number, frequency = 1) =>
  Math.sin(seed * 0.47 + frequency * 1.3) *
  Math.cos(seed * 0.71 + frequency * 2.1);

export default function Particles({
  count = GHOST_CONFIG.particleCount,
  color = GHOST_CONFIG.particleColor,
}: {
  count?: number;
  color?: string;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const resolvedColor = resolveFluorescentColor(color);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 10; i < count; i += 1) {
      const seed = i + 1;
      temp.push({
        t: seed * 0.4,
        factor: 14 + Math.abs(harmonicNoise(seed, 0.5)) * 58,
        speed:
          0.003 +
          Math.abs(harmonicNoise(seed, 1.3)) * GHOST_CONFIG.particleSpeedFactor,
        xFactor: Math.sin(seed * 0.45) * GHOST_CONFIG.particleRadius,
        yFactor: Math.sin(seed * 0.77) * (GHOST_CONFIG.particleRadius * 0.8),
        zFactor: Math.cos(seed * 0.33) * GHOST_CONFIG.particleRadius,
      });
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    const instancedMesh = mesh.current;
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      particle.t += particle.speed;
      const { t, factor, xFactor, yFactor, zFactor } = particle;

      const wave = Math.cos(t / 2) * 0.3;
      dummy.position.set(
        xFactor + Math.cos(t / 2) * factor * 0.003 + wave,
        yFactor + Math.sin(t / 2 + 1) * factor * 0.002 + wave,
        zFactor + Math.cos(t / 2 + 2) * factor * 0.001 + wave
      );

      const glowScale =
        (Math.sin(time * GHOST_CONFIG.particleGlowSpeed + xFactor) +
          GHOST_CONFIG.particleGlowOffset) *
        GHOST_CONFIG.particleGlowStrength;
      dummy.scale.set(glowScale, glowScale, glowScale);
      dummy.rotation.set(glowScale * 5, glowScale * 2, glowScale * 3);
      dummy.updateMatrix();

      instancedMesh.setMatrixAt(i, dummy.matrix);
    });

    instancedMesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.2, 0]} />
      <meshBasicMaterial
        color={resolvedColor}
        transparent
        opacity={GHOST_CONFIG.particleOpacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
