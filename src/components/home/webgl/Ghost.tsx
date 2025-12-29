// src/components/home/webgl/Ghost.tsx
'use client';

import { MutableRefObject, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Eyes from './Eyes';

type GhostProps = {
  speedRef?: MutableRefObject<number>;
};

export default function Ghost({ speedRef }: GhostProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    // "Movimento senoidal orgânico" SPECIFIC FROM WORKFLOW
    const floatY =
      Math.sin(t * 0.8) * 0.1 +
      Math.sin(t * 0.3) * 0.05;

    meshRef.current.position.y = floatY;
    if (glowRef.current) glowRef.current.position.y = floatY;

    // Optional: Emissive Pulse if using StandardMaterial
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    if (material) {
      // Keeping some of the existing pulse logic but integrating it
      material.emissiveIntensity = 2.0 + Math.sin(t * 2.0) * 0.5;
    }

    // Rotation wobble (optional but good for life)
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
    <group>
      {/* INTERNAL CORE */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#060a1f"
          emissive="#0e5dff"
          emissiveIntensity={2.0}
          roughness={0.2}
          metalness={0.8}
        />
        <Eyes speedRef={speedRef} />
      </mesh>

      {/* EXTERNAL HALO */}
      <mesh ref={glowRef} scale={1.2}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
