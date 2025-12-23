import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Ghost() {
  const meshRef = useRef<THREE.Mesh>(null);

  const ghostColor = new THREE.Color('#0057FF');

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    // Assertion to treat material as MeshStandardMaterial
    const material = meshRef.current.material as THREE.MeshStandardMaterial;

    material.emissiveIntensity = 3.5 + Math.sin(t * 1.2) * 0.6;
    meshRef.current.rotation.y = Math.sin(t * 0.3) * 0.1;
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.15;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        color="#06071f"
        emissive={ghostColor}
        emissiveIntensity={3.5}
        transparent
        opacity={0.92}
        roughness={0}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
