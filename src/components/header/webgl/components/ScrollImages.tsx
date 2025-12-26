'use client';

import { useRef } from 'react';
import { useScroll, Image } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function ScrollImages() {
  const group = useRef<THREE.Group>(null!);
  const data = useScroll();
  const { height } = useThree((s) => s.viewport);

  useFrame(() => {
    if (!group.current) return;
    // Cast strict material access
    const children = group.current.children as any[];

    if (children[0]?.material)
      children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    if (children[1]?.material)
      children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    if (children[2]?.material)
      children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    if (children[3]?.material)
      children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    if (children[4]?.material)
      children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
  });

  return (
    <group ref={group}>
      <Image
        position={[-2, 0, 0]}
        scale={[3, height / 1.1]}
        url="/assets/demo/cs1.webp"
      />
      <Image position={[2, 0, 3]} scale={3} url="/assets/demo/cs2.webp" />
      <Image
        position={[-2.05, -height, 6]}
        scale={[1, 3]}
        url="/assets/demo/cs3.webp"
      />
      <Image
        position={[-0.6, -height, 9]}
        scale={[1, 2]}
        url="/assets/demo/cs1.webp"
      />
      <Image
        position={[0.75, -height, 10.5]}
        scale={1.5}
        url="/assets/demo/cs2.webp"
      />
    </group>
  );
}
