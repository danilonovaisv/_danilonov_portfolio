'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { MathUtils, type Mesh } from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

export default function GhostEyes({
  color = GHOST_CONFIG.eyeGlowColor,
  opacity = 0.6,
}: {
  color?: string;
  opacity?: number;
}) {
  const leftEye = useRef<Mesh>(null);
  const rightEye = useRef<Mesh>(null);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const timeout = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      timer = setTimeout(timeout, nextBlink);
    };

    timer = setTimeout(timeout, 3000);
    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (!leftEye.current || !rightEye.current) return;

    // Blink animation only - Position is static relative to head
    const targetScaleY = blink ? 0.1 : 1;
    const lerpSpeed = 0.4;

    leftEye.current.scale.y = MathUtils.lerp(
      leftEye.current.scale.y,
      targetScaleY,
      lerpSpeed
    );
    rightEye.current.scale.y = MathUtils.lerp(
      rightEye.current.scale.y,
      targetScaleY,
      lerpSpeed
    );
  });

  // Positions matching GhostHero.tsx (Reference)
  // sphere radius 2.0
  // Left: -0.7, 0.6, 2.0
  // Right: 0.7, 0.6, 2.0

  return (
    <group>
      {/* LEFT EYE */}
      <group position={[-0.7, 0.6, 2.0]}>
        {/* Pupil */}
        <mesh ref={leftEye}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
          {/* Opacity fixed for now, can be dynamic later */}
        </mesh>
        {/* Glow */}
        <mesh position={[0, 0, -0.05]}>
          <sphereGeometry args={[0.525, 12, 12]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity * 0.5}
            side={2}
          />
          {/* Side 2 = DoubleSide or BackSide? Ref uses BackSide (1) or Double? Ref uses BackSide. THREE.BackSide = 1 */}
        </mesh>
      </group>

      {/* RIGHT EYE */}
      <group position={[0.7, 0.6, 2.0]}>
        {/* Pupil */}
        <mesh ref={rightEye}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
        {/* Glow */}
        <mesh position={[0, 0, -0.05]}>
          <sphereGeometry args={[0.525, 12, 12]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={opacity * 0.5}
            side={2}
          />
        </mesh>
      </group>
    </group>
  );
}
