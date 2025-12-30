'use client';

import { useMemo, useRef } from 'react';
import type { InstancedMesh, Object3D } from 'three';
import { Object3D as ThreeObject3D } from 'three';
import { useFrame } from '@react-three/fiber';

const FIREFLY_COUNT = 26;

export default function Fireflies() {
  const meshRef = useRef<InstancedMesh | null>(null);
  const dummy = useMemo<Object3D>(() => new ThreeObject3D(), []);

  const seeds = useMemo(
    () =>
      Array.from({ length: FIREFLY_COUNT }, () => ({
        radius: 1.2 + Math.random() * 1.2,
        speed: 0.4 + Math.random() * 0.6,
        offset: Math.random() * Math.PI * 2,
        height: -0.4 + Math.random() * 0.8,
      })),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    seeds.forEach((seed, i) => {
      const angle = t * seed.speed + seed.offset;

      dummy.position.set(
        Math.cos(angle) * seed.radius,
        seed.height + Math.sin(angle * 2.0) * 0.2,
        Math.sin(angle) * seed.radius
      );

      const scale = 0.02 + 0.01 * Math.sin(angle * 3.0);
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined as any, undefined as any, FIREFLY_COUNT]}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
    </instancedMesh>
  );
}
