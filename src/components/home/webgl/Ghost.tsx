// src/components/home/webgl/Ghost.tsx
'use client';

import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';

const GHOST_CONFIG = {
  bodyColor: '#0f2027',
  glowColor: '#0080ff',
  eyeColor: '#8a2be2',
  emissiveIntensity: 2.5, // Reduzi um pouco para não estourar em escalas menores
  floatSpeed: 1.6,
  followSpeed: 0.07,
};

// Agora aceitamos props (como scale, position, rotation) do arquivo Pai
export default function Ghost(props: any) {
  const group = useRef<Group>(null);
  const bodyMesh = useRef<Mesh>(null);
  const bodyMaterial = useRef<MeshStandardMaterial>(null);
  const leftEyeMat = useRef<any>(null);
  const rightEyeMat = useRef<any>(null);

  const { viewport } = useThree();

  // Variáveis de física
  const prevPosition = useRef(new Vector3(0, 0, 0));
  const targetPosition = useRef(new Vector3(0, 0, 0));

  // 1. Geometria (Mantive a lógica, mas ela será escalada pelo Group)
  const ghostGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const positionAttribute = geometry.getAttribute('position');
    const positions = positionAttribute.array;

    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const z = positions[i + 2];

      if (y < -0.2) {
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useFrame((state) => {
    if (!group.current || !bodyMesh.current) return;

    const t = state.clock.getElapsedTime();
    const pointer = state.pointer;

    // Movimento ajustado para seguir o mouse suavemente
    // Divide por números maiores para restringir a área de movimento
    const xTarget = pointer.x * (viewport.width / 4);
    const yTarget = pointer.y * (viewport.height / 4);

    targetPosition.current.set(xTarget, yTarget, 0);

    // Aplica movimento ao GRUPO inteiro
    // O 0.1 no lerp deixa o movimento mais "orgânico/atrasado"
    group.current.position.lerp(targetPosition.current, GHOST_CONFIG.followSpeed);

    // Detecta movimento para acender os olhos
    const currentDist = group.current.position.distanceTo(prevPosition.current);
    prevPosition.current.copy(group.current.position);

    const isMoving = currentDist > 0.005; // Mais sensível pois o objeto é menor
    const targetEyeOpacity = isMoving ? 1 : 0.2;

    if (leftEyeMat.current && rightEyeMat.current) {
      leftEyeMat.current.opacity += (targetEyeOpacity - leftEyeMat.current.opacity) * 0.1;
      rightEyeMat.current.opacity = leftEyeMat.current.opacity;
    }

    // Animações de "Respiro" e Wobble
    if (bodyMaterial.current) {
      const pulse = Math.sin(t * 1.6) * 0.6;
      bodyMaterial.current.emissiveIntensity = GHOST_CONFIG.emissiveIntensity + pulse;
    }

    // Flutuação Local (apenas visual, não muda a posição x/y do mouse)
    const floatY = Math.sin(t * GHOST_CONFIG.floatSpeed) * 0.2;
    bodyMesh.current.position.y = floatY;

    // Tilt (Inclinação ao mover)
    const moveX = (targetPosition.current.x - group.current.position.x);
    bodyMesh.current.rotation.z = -moveX * 0.2;
    bodyMesh.current.rotation.y = Math.sin(t * 0.5) * 0.1;
  });

  return (
      // Adicionei {...props} aqui. Agora o pai controla scale, position, etc.
      // Defini um scale padrão de 0.2 (20% do tamanho original)
      <group ref={group} scale={0.2} {...props}>

        {/* Luzes internas para garantir volume mesmo se a cena for escura */}
        <directionalLight position={[-8, 6, -4]} intensity={2} color="#4a90e2" />
        <directionalLight position={[8, -4, -6]} intensity={1.5} color="#50e3c2" />

        <mesh ref={bodyMesh} geometry={ghostGeometry} castShadow receiveShadow>
          <meshStandardMaterial
              ref={bodyMaterial}
              color={GHOST_CONFIG.bodyColor}
              emissive={GHOST_CONFIG.glowColor}
              emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
              transparent
              opacity={0.9}
              roughness={0.1}
              metalness={0.1}
              side={THREE.DoubleSide}
              toneMapped={false}
          />

          {/* OLHOS */}
          <group position={[0, 0, 0]}>
            {/* Olho Esquerdo */}
            <group position={[-0.7, 0.6, 1.8]} rotation={[0, -0.2, 0]}>
              <mesh position={[0, 0, -0.1]}>
                <sphereGeometry args={[0.45, 16, 16]} />
                <meshBasicMaterial color="black" />
              </mesh>
              <mesh position={[0, 0, 0.1]}>
                <sphereGeometry args={[0.20, 16, 16]} />
                <meshBasicMaterial
                    ref={leftEyeMat}
                    color={GHOST_CONFIG.eyeColor}
                    transparent
                    opacity={0}
                    toneMapped={false}
                />
              </mesh>
            </group>

            {/* Olho Direito */}
            <group position={[0.7, 0.6, 1.8]} rotation={[0, 0.2, 0]}>
              <mesh position={[0, 0, -0.1]}>
                <sphereGeometry args={[0.45, 16, 16]} />
                <meshBasicMaterial color="black" />
              </mesh>
              <mesh position={[0, 0, 0.1]}>
                <sphereGeometry args={[0.20, 16, 16]} />
                <meshBasicMaterial
                    ref={rightEyeMat}
                    color={GHOST_CONFIG.eyeColor}
                    transparent
                    opacity={0}
                    toneMapped={false}
                />
              </mesh>
            </group>
          </group>
        </mesh>
      </group>
  );
}