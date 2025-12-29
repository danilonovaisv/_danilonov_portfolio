// src/components/home/webgl/Ghost.tsx
'use client';

import { MutableRefObject, useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Eyes from './Eyes';

type GhostProps = {
  speedRef?: MutableRefObject<number>;
};

export default function Ghost({ speedRef }: GhostProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const geometryRef = useRef<THREE.SphereGeometry>(null!);

  // Implement Vertex Deformation (Organic Wavy Bottom) - Runs once like in reference
  useLayoutEffect(() => {
    if (!geometryRef.current) return;

    const geometry = geometryRef.current;
    const positionAttribute = geometry.getAttribute('position');
    const positions = positionAttribute.array;
    const count = positionAttribute.count;

    // Modify bottom vertices to create wavy skirt
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const x = positions[idx];
      const y = positions[idx + 1];
      const z = positions[idx + 2];

      if (y < -0.2) {
        // Reference Logic:
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;

        // Apply deformation
        positions[idx + 1] = -2.0 + combinedNoise;
      }
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();

    // "Movimento senoidal orgânico" SPECIFIC FROM WORKFLOW
    // Reference: floatSpeed: 1.6 in params, but logic might be simple sin
    const floatY =
      Math.sin(t * 1.6) * 0.1 +  // Updated speed to match reference (1.6)
      Math.sin(t * 0.6) * 0.05;

    meshRef.current.position.y = floatY;
    if (glowRef.current) glowRef.current.position.y = floatY;

    // Emissive Pulse
    // Reference: emissiveIntensity: 5.8, pulseSpeed: 1.6, pulseIntensity: 0.6
    const material = meshRef.current.material as THREE.MeshStandardMaterial;
    if (material) {
      // 5.8 base + pulse
      material.emissiveIntensity = 5.8 + Math.sin(t * 1.6) * 0.6;
    }

    // Rotation wobble
    // Reference: wobbleAmount: 0.35
    meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.05; // Slight tilt
  });

  return (
    <group>
      {/* INTERNAL CORE */}
      <mesh ref={meshRef}>
        <sphereGeometry ref={geometryRef} args={[2, 40, 40]} />
        <meshStandardMaterial
          color="#0f2027" // Reference bodyColor
          emissive="#0080ff" // Reference blue (fluorescentColors.blue)
          emissiveIntensity={5.8}
          roughness={0.02}
          metalness={0.0}
          transparent
          opacity={0.88} // Reference ghostOpacity
          side={THREE.DoubleSide}
        />
        <Eyes speedRef={speedRef} />
      </mesh>

      {/* EXTERNAL HALO (Optional - R3F addition for extra glow, keeping it because it looks good, but tuned) */}
      <mesh ref={glowRef} scale={1.2}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#4263eb"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
