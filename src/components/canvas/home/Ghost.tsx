'use client';

import React, { useRef, useMemo, forwardRef, useImperativeHandle } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Usamos forwardRef para permitir que o Canvas acesse a posição do grupo
type GhostProps = {
  children?: React.ReactNode;
};

const Ghost = forwardRef<THREE.Group, GhostProps>((props, ref) => {
  const localRef = useRef<THREE.Group>(null);
  const bodyMeshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Expõe a ref interna para o componente pai
  useImperativeHandle(ref, () => localRef.current!);

  // Parâmetros de física (ajuste conforme gosto)
  const params = {
    followSpeed: 0.05, // Menor = mais "pesado/atrasado"
    wobbleAmount: 0.35,
    floatSpeed: 1.6,
    rotationDamping: 0.95, // Suavidade da rotação
    maxRotation: 0.5, // Máximo que ele inclina
  };

  // Geometria Procedural (Mesma da anterior, mantém a saia ondulada)
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 64, 64);
    const posAttribute = geo.getAttribute('position');
    const positions = posAttribute.array;
    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise =
          Math.sin(x * 5) * 0.35 +
          Math.cos(z * 4) * 0.25 +
          Math.sin((x + z) * 3) * 0.15;
        positions[i + 1] = -2.0 + noise;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (!localRef.current || !bodyMeshRef.current) return;

    const time = state.clock.getElapsedTime();
    const { pointer, viewport } = state;

    // 1. Calcular Posição Alvo (Mouse convertidado para coordenadas do mundo)
    // Multiplicadores ajustam a área de movimento (11 e 7 vêm da referência)
    const targetX = pointer.x * (viewport.width / 2);
    const targetY = pointer.y * (viewport.height / 2);

    // 2. Movimento com "Lag" (Inércia)
    // Aproxima a posição atual do alvo lentamente
    localRef.current.position.x +=
      (targetX - localRef.current.position.x) * params.followSpeed;
    localRef.current.position.y +=
      (targetY - localRef.current.position.y) * params.followSpeed;

    // 3. Levitação (Float) - Adiciona offset no Y
    const floatOffset =
      Math.sin(time * params.floatSpeed * 1.5) * 0.03 +
      Math.cos(time * params.floatSpeed * 0.7) * 0.018;
    localRef.current.position.y += floatOffset;

    // 4. Calcular Inclinação (Tilt) baseada na direção do movimento
    const dx = targetX - localRef.current.position.x;
    const dy = targetY - localRef.current.position.y;

    // Normaliza direção
    const dist = Math.sqrt(dx * dx + dy * dy);
    const dirX = dist > 0 ? dx / dist : 0;
    const dirY = dist > 0 ? dy / dist : 0;

    // Aplica rotação no corpo (mesh interna) e não no grupo
    // Rotation Z: inclina para os lados (baseado em X)
    // Rotation X: inclina para frente/trás (baseado em Y)
    const tiltStrength = 0.15 * params.wobbleAmount;

    // Física de rotação: valor atual * amortecimento + nova força
    bodyMeshRef.current.rotation.z =
      bodyMeshRef.current.rotation.z * params.rotationDamping +
      -dirX * tiltStrength * (1 - params.rotationDamping) * dist; // Multiplica por dist para inclinar mais se mover rápido

    bodyMeshRef.current.rotation.x =
      bodyMeshRef.current.rotation.x * params.rotationDamping +
      dirY * tiltStrength * (1 - params.rotationDamping) * dist;

    // Wobble extra idle
    bodyMeshRef.current.rotation.y =
      Math.sin(time * 1.4) * 0.05 * params.wobbleAmount;

    // 5. Pulso de Luz
    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        3.5 + Math.sin(time * 1.6) * 0.6 + Math.sin(time * 0.6) * 0.12;
    }
  });

  return (
    <group ref={localRef}>
      {/* Passamos o bodyMeshRef para inclinar apenas o corpo, mantendo o grupo alinhado para os olhos */}
      <mesh ref={bodyMeshRef} geometry={geometry}>
        <meshStandardMaterial
          ref={materialRef}
          color="#0f2027"
          emissive="#0048ff"
          emissiveIntensity={3.8}
          roughness={0.1}
          metalness={0.0}
          transparent
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Olhos devem ser filhos deste grupo para seguir o fantasma */}
      {props.children}
    </group>
  );
});

Ghost.displayName = 'Ghost';
export default Ghost;
