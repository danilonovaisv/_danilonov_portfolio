'use client';

import * as THREE from 'three';

export default function AtmosphereVeil() {
  return (
    <group>
      {/* Glow Volumétrico atrás do fantasma */}
      <mesh position={[0, 0, -3]} scale={[1, 1, 1]}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#0057ff" // Azul profundo
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Véu de fundo para integrar com o CSS */}
      <mesh position={[0, -2, -4]}>
        <planeGeometry args={[15, 10]} />
        <meshBasicMaterial
          color="#0b0d3a"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
