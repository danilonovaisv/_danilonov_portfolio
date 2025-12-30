'use client';

export default function AtmosphereVeil() {
  return (
    <group>
      {/* Plano escuro de base */}
      <mesh position={[0, -1.3, -1.4]} scale={[7, 4, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#06071f" />
      </mesh>
      {/* Glow Ghost Blue */}
      <mesh position={[0, 0, -0.7]} scale={[2.6, 2.6, 1]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#0057FF" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}
