'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GhostParams } from './ghost/GhostParams';

export function Fireflies() {
  const count = 20;
  const groupRef = useRef<THREE.Group>(null);

  // Dados estáticos iniciais
  const initialData = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * GhostParams.fireflySpeed,
        (Math.random() - 0.5) * GhostParams.fireflySpeed,
        (Math.random() - 0.5) * GhostParams.fireflySpeed
      ),
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 2 + Math.random() * 3,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const data = initialData[i];
      const firefly = child as THREE.Mesh;
      const glow = firefly.children[0] as THREE.Mesh;
      const light = firefly.children[1] as THREE.PointLight;

      // Pulse
      const pulsePhase = time + data.phase;
      const pulse = Math.sin(pulsePhase * data.pulseSpeed) * 0.4 + 0.6;

      // Update Opacity & Intensity
      const glowMat = glow.material as THREE.MeshBasicMaterial;
      const flyMat = firefly.material as THREE.MeshBasicMaterial;

      glowMat.opacity = GhostParams.fireflyGlowIntensity * 0.4 * pulse;
      flyMat.opacity = GhostParams.fireflyGlowIntensity * 0.9 * pulse;
      light.intensity = GhostParams.fireflyGlowIntensity * 0.8 * pulse;

      // Random Walk
      data.velocity.x += (Math.random() - 0.5) * 0.001;
      data.velocity.y += (Math.random() - 0.5) * 0.001;
      data.velocity.z += (Math.random() - 0.5) * 0.001;
      data.velocity.clampLength(0, GhostParams.fireflySpeed);

      firefly.position.add(data.velocity);

      // Bounds check
      if (Math.abs(firefly.position.x) > 30) data.velocity.x *= -0.5;
      if (Math.abs(firefly.position.y) > 20) data.velocity.y *= -0.5;
      if (Math.abs(firefly.position.z) > 15) data.velocity.z *= -0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {initialData.map((data, i) => (
        <mesh key={i} position={data.position}>
          <sphereGeometry args={[0.02, 2, 2]} />
          <meshBasicMaterial color="#ffff44" transparent opacity={0.9} />

          {/* Glow */}
          <mesh>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial
              color="#ffff88"
              transparent
              opacity={0.4}
              side={THREE.BackSide}
            />
          </mesh>

          {/* Light */}
          <pointLight color="#ffff44" distance={3} decay={2} intensity={0.8} />
        </mesh>
      ))}
    </group>
  );
}
