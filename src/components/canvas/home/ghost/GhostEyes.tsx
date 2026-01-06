'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GhostEyes({ color = '#ffffff' }: { color?: string }) {
  const leftEye = useRef<THREE.Mesh>(null);
  const rightEye = useRef<THREE.Mesh>(null);
  const [blink, setBlink] = useState(false);

  // Piscar aleatório
  useEffect(() => {
    const timeout = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      setTimeout(timeout, Math.random() * 3000 + 2000);
    };
    const timer = setTimeout(timeout, 2000);
    return () => clearTimeout(timer);
  }, []);

  useFrame((state) => {
    if (!leftEye.current || !rightEye.current) return;

    // Olhar segue o mouse
    const x = state.pointer.x * 0.1;
    const y = state.pointer.y * 0.1;

    leftEye.current.position.x = THREE.MathUtils.lerp(
      leftEye.current.position.x,
      -0.15 + x,
      0.1
    );
    leftEye.current.position.y = THREE.MathUtils.lerp(
      leftEye.current.position.y,
      0.05 + y,
      0.1
    );

    rightEye.current.position.x = THREE.MathUtils.lerp(
      rightEye.current.position.x,
      0.15 + x,
      0.1
    );
    rightEye.current.position.y = THREE.MathUtils.lerp(
      rightEye.current.position.y,
      0.05 + y,
      0.1
    );

    const scaleY = blink ? 0.05 : 1;
    leftEye.current.scale.y = THREE.MathUtils.lerp(
      leftEye.current.scale.y,
      scaleY,
      0.3
    );
    rightEye.current.scale.y = THREE.MathUtils.lerp(
      rightEye.current.scale.y,
      scaleY,
      0.3
    );
  });

  return (
    // Z = 0.9 coloca os olhos na superfície do fantasma de Raio 1
    <group position={[0, 0.1, 0.9]}>
      <mesh ref={leftEye} position={[-0.15, 0.05, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} /> {/* Olhos menores */}
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={rightEye} position={[0.15, 0.05, 0]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
