import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Fireflies() {
  const groupRef = useRef<THREE.Group>(null);
  const count = 20;

  const fireflies = useMemo(
    () =>
      new Array(count).fill(0).map(() => ({
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 20
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.09,
          (Math.random() - 0.5) * 0.09,
          (Math.random() - 0.5) * 0.09
        ),
      })),
    []
  );

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const data = fireflies[i];
      // Keep them moving
      child.position.add(data.velocity);

      // Simple wrap around to keep them in view?
      // For now, let's just let them drift as per original code
      // If they drift too far, we could reset, but original didn't have explicit bounds in the snippet shown
      // Adding a simple bound check to avoid empty screen eventually
      if (child.position.x > 25) child.position.x = -25;
      if (child.position.x < -25) child.position.x = 25;
      if (child.position.y > 20) child.position.y = -20;
      if (child.position.y < -20) child.position.y = 20;
    });
  });

  return (
    <group ref={groupRef}>
      {fireflies.map((f, i) => (
        <mesh key={i} position={f.pos}>
          <sphereGeometry args={[0.02, 4, 4]} />
          <meshBasicMaterial color={0xffff44} transparent opacity={0.9} />
          <pointLight color={0xffff44} intensity={0.8} distance={3} decay={2} />
          <mesh>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshBasicMaterial
              color={0xffff88}
              transparent
              opacity={0.4}
              side={THREE.BackSide}
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}
