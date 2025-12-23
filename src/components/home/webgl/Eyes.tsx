import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Eyes() {
  const reducedMotion = usePrefersReducedMotion();
  const { camera } = useThree();
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
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

      currentMovement.current =
        currentMovement.current * 0.95 +
        (mouseSpeedRef.current.x + mouseSpeedRef.current.y) * 0.5;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  useFrame(() => {
    if (reducedMotion || !leftEyeRef.current || !rightEyeRef.current) return;

    // Eye glow based on movement speed
    const glowIntensity = Math.min(currentMovement.current * 5, 1);
    // Use type assertion or check if material is compatible
    if (leftEyeRef.current.material instanceof THREE.MeshBasicMaterial) {
      leftEyeRef.current.material.opacity = glowIntensity;
    }
    if (rightEyeRef.current.material instanceof THREE.MeshBasicMaterial) {
      rightEyeRef.current.material.opacity = glowIntensity;
    }

    // Make eyes look at camera
    leftEyeRef.current.lookAt(camera.position);
    rightEyeRef.current.lookAt(camera.position);
  });

  return (
    <group>
      {/* Eye sockets */}
      <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Glowing eyes */}
      <mesh ref={leftEyeRef} position={[-0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshBasicMaterial
          color="#0057FF"
          transparent
          opacity={0}
          // @ts-ignore - emissive doesn't exist on MeshBasicMaterial in types but works in three.js if treated as standard-ish or we should use Standard?
          // The spec uses MeshBasicMaterial with emissive properties which is technically invalid in TS for BasicMaterial.
          // Spec says: color="#0057FF" transparent opacity={0} emissive="#5227FF" emissiveIntensity={4.5}
          // MeshBasicMaterial DOES NOT support emissive.
          // I will use MeshStandardMaterial to be safe and correct, matching the "Glow" intent.
        />
        {/* Re-reading spec: It used meshBasicMaterial with emissive properties which might be a copy-paste error in spec or R3F magic.
            However, MeshStandardMaterial contributes to lighting.
            Let's stick to the Spec's INTENT (Glowing eyes). MeshBasic is unlit.
            If I use MeshBasicMaterial, emissive prop does nothing.
            I will switch to MeshStandardMaterial to support emissive, or simulate glow with opacity.
            Actually, the spec code:
            <meshBasicMaterial color="#0057FF" transparent opacity={0} emissive="#5227FF" emissiveIntensity={4.5} />
            This is contradictory. Emissive is for reacting to light/darkness.
            If opacity is 0, it's invisible anyway unless additive blending?
            Wait, the useFrame logic sets opacity = glowIntensity.
            Let's use MeshStandardMaterial for Emissive support.
        */}
      </mesh>
      {/* Retrying with correct material for Emissive */}
      <mesh ref={leftEyeRef} position={[-0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial
          color="#0057FF"
          transparent
          opacity={0}
          emissive="#5227FF"
          emissiveIntensity={4.5}
        />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.7, 0.6, 2.0]}>
        <sphereGeometry args={[0.3, 12, 12]} />
        <meshStandardMaterial
          color="#0057FF"
          transparent
          opacity={0}
          emissive="#5227FF"
          emissiveIntensity={4.5}
        />
      </mesh>

      {/* Outer glow */}
      <mesh position={[-0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial
          color="#5227FF"
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[0.7, 0.6, 1.95]}>
        <sphereGeometry args={[0.525, 12, 12]} />
        <meshBasicMaterial
          color="#5227FF"
          transparent
          opacity={0}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
