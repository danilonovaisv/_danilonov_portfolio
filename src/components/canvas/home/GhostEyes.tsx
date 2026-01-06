// src/components/canvas/home/GhostEyes.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export default function GhostEyes() {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);

  // Posição alvo suavizada do mouse
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  const eyeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: '#ffffff', // Branco ou a cor que preferir (na ref é glow violeta, mas branco destaca mais)
        toneMapped: false, // Importante para o Bloom pegar forte
      }),
    []
  );

  const eyeGeo = useMemo(() => new THREE.SphereGeometry(0.25, 32, 32), []);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Interpolação (Lerp) do mouse para movimento suave
    const { pointer } = state;
    // O fator 0.1 define a velocidade/suavidade (menor = mais lento)
    mouseTarget.current.x += (pointer.x * 5 - mouseTarget.current.x) * 0.1;
    mouseTarget.current.y += (pointer.y * 3 - mouseTarget.current.y) * 0.1;

    // Aplica a posição ao grupo dos olhos (movimento relativo à cabeça)
    // Limitamos o movimento para não sair do "rosto"
    groupRef.current.position.x = mouseTarget.current.x * 0.3;
    groupRef.current.position.y = mouseTarget.current.y * 0.3;

    // Pequena escala dinâmica ao mover (pupila dilata)
    const scale = 1 + Math.abs(pointer.x) * 0.2;
    if (leftEyeRef.current) leftEyeRef.current.scale.setScalar(scale);
    if (rightEyeRef.current) rightEyeRef.current.scale.setScalar(scale);
  });

  return (
    <group position={[0, 0.5, 1.6]}>
      {' '}
      {/* Posição relativa ao centro do Fantasma */}
      <group ref={groupRef}>
        {/* Olho Esquerdo */}
        <mesh
          ref={leftEyeRef}
          geometry={eyeGeo}
          material={eyeMaterial}
          position={[-0.7, 0, 0]}
        />

        {/* Olho Direito */}
        <mesh
          ref={rightEyeRef}
          geometry={eyeGeo}
          material={eyeMaterial}
          position={[0.7, 0, 0]}
        />
      </group>
    </group>
  );
}
