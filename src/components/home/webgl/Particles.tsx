import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Particles() {
  const count = 50;
  const geometries = useMemo(
    () => [
      new THREE.SphereGeometry(0.05, 6, 6),
      new THREE.TetrahedronGeometry(0.04, 0),
      new THREE.OctahedronGeometry(0.045, 0),
    ],
    []
  );

  const particles = useMemo(
    () =>
      new Array(count).fill(0).map(() => ({
        geoIndex: Math.floor(Math.random() * geometries.length),
        pos: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 8 - 2,
          (Math.random() - 0.5) * 4 - 1
        ),
        color: '#8a2be2', // violet equivalent
      })),
    [geometries]
  );

  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos} geometry={geometries[p.geoIndex]}>
          <meshBasicMaterial color={p.color} transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}
