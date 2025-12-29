// src/components/home/webgl/Eyes.tsx
'use client';

import { MutableRefObject, useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

type EyesProps = {
  speedRef?: MutableRefObject<number>;
};

export default function Eyes({ speedRef }: EyesProps) {
  const reducedMotion = usePrefersReducedMotion();
  const { camera } = useThree();

  // Refs for logic
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftOuterGlowRef = useRef<THREE.Mesh>(null);
  const rightOuterGlowRef = useRef<THREE.Mesh>(null);

  const mouseSpeedRef = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const currentMovement = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;

      const mousePos = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };

      mouseSpeedRef.current.x = Math.abs(mousePos.x - lastMousePos.current.x);
      mouseSpeedRef.current.y = Math.abs(mousePos.y - lastMousePos.current.y);
      lastMousePos.current = mousePos;

      // Smoother movement accumulator
      currentMovement.current =
        currentMovement.current * 0.95 +
        (mouseSpeedRef.current.x + mouseSpeedRef.current.y) * 2.0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (reducedMotion) return;

    // Eye glow based on movement speed (Reference "Glow Response")
    // Reference params: eyeGlowResponse: 0.31, eyeGlowDecay: 0.95
    // Here we simulate logic:
    currentMovement.current *= 0.95; // Decay

    // Base glow from ghost speed + mouse jitter
    const velocityGlow = speedRef?.current
      ? THREE.MathUtils.clamp(speedRef.current * 0.1, 0, 1) // Increased multiplier
      : 0;

    const effectiveGlow = Math.min(currentMovement.current + velocityGlow, 1.2);

    // Apply opacity to Eyes
    if (leftEyeRef.current) {
      (leftEyeRef.current.material as THREE.MeshBasicMaterial).opacity = effectiveGlow;
      leftEyeRef.current.lookAt(camera.position);
    }
    if (rightEyeRef.current) {
      (rightEyeRef.current.material as THREE.MeshBasicMaterial).opacity = effectiveGlow;
      rightEyeRef.current.lookAt(camera.position);
    }

    // Apply opacity to Outer Glows
    if (leftOuterGlowRef.current) {
      (leftOuterGlowRef.current.material as THREE.MeshBasicMaterial).opacity = effectiveGlow * 0.5;
    }
    if (rightOuterGlowRef.current) {
      (rightOuterGlowRef.current.material as THREE.MeshBasicMaterial).opacity = effectiveGlow * 0.5;
    }
  });

  return (
    <group>
      {/* Eye sockets - Reference: Color Black, Scale 1.1, 1.0, 0.6 */}
      <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Glowing eyes - Reference: Sphere(0.3) */}
      <mesh ref={leftEyeRef} position={[-0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial color="#8a2be2" transparent opacity={0} /> {/* Violet per ref default */}
      </mesh>
      <mesh ref={rightEyeRef} position={[0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial color="#8a2be2" transparent opacity={0} />
      </mesh>

      {/* Outer Glow - Reference: Sphere(0.525), Side: BackSide */}
      <mesh ref={leftOuterGlowRef} position={[-0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial color="#8a2be2" transparent opacity={0} side={THREE.BackSide} />
      </mesh>
      <mesh ref={rightOuterGlowRef} position={[0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial color="#8a2be2" transparent opacity={0} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
