'use client';

import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// Placeholder for the Fluid Glass effect
// In a real "Fluid Glass" implementation ref ReactBits, it usually involves a shader or specific physical material setup.
// Here we use MeshTransmissionMaterial to simulate the optical glass effect.

function GlassCapsule() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t * 0.5) * 0.05;
      mesh.current.rotation.y = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <mesh ref={mesh} rotation={[0, 0, Math.PI / 2]} scale={[8, 1, 1]}>
      <capsuleGeometry args={[0.4, 1, 32, 64]} />
      <MeshTransmissionMaterial
        resolution={1024}
        distortion={0.25}
        color="#ffffff"
        thickness={1}
        anisotropy={1}
        chromaticAberration={0.06}
        roughness={0.2}
        toneMapped={true}
      />
    </mesh>
  );
}

export default function FluidGlass() {
  return (
    <group>
      <GlassCapsule />
    </group>
  );
}
