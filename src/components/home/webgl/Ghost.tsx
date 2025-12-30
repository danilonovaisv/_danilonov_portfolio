'use client';

import { useRef } from 'react';
import type { Group, MeshStandardMaterial } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export default function Ghost() {
  const group = useRef<Group | null>(null);
  const bodyMaterial = useRef<MeshStandardMaterial | null>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current || !bodyMaterial.current) return;

    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // normalized -1..1

    const ampX = viewport.width * 0.15;
    const ampY = viewport.height * 0.12;

    const targetX = (pointer.x || 0) * ampX;
    const targetY = (pointer.y || 0) * ampY + Math.sin(t * 0.8) * 0.18;

    group.current.position.x += (targetX - group.current.position.x) * 0.05;
    group.current.position.y += (targetY - group.current.position.y) * 0.05;
    group.current.position.z = 0.1 + Math.sin(t * 0.3) * 0.06;

    group.current.rotation.y = Math.sin(t * 0.35) * 0.18;

    const baseEmissive = 1.4;
    const pulse = 0.3 + 0.25 * Math.sin(t * 2.1);
    bodyMaterial.current.emissiveIntensity = baseEmissive + pulse;
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.65, 48, 48]} />
        <meshStandardMaterial
          ref={bodyMaterial}
          color="#0057FF"
          emissive="#0057FF"
          emissiveIntensity={1.8}
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.9, 32, 1, true]} />
        <meshStandardMaterial
          color="#0057FF"
          emissive="#0057FF"
          emissiveIntensity={1.5}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
