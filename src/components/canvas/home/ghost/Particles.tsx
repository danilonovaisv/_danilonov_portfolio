'use client';

import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ParticlesProps {
  count?: number;
  color?: string;
}

export default function Particles({
  count = 250,
  color = '#4d8dff',
}: ParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15; // X
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8; // Y
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8; // Z
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    // Rotação lenta de todo o campo
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.position.y = Math.sin(t * 0.1) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.04}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
