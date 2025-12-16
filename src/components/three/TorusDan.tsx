'use client';

import * as THREE from 'three';
import React, { memo, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';

type TorusDanProps = {
  /** Multiplicador adicional de escala (além do scale responsivo por viewport) */
  scaleMultiplier?: number;
  /** Posição do grupo */
  position?: THREE.Vector3 | [number, number, number];
  /** Rotação base do grupo */
  rotation?: THREE.Euler | [number, number, number];
  /** Intensidade do “float” (seno) */
  floatIntensity?: number;
  /** Velocidade do “float” */
  floatSpeed?: number;
  /** Velocidade de rotação */
  rotationSpeed?: number;
};

function TorusDanImpl({
  scaleMultiplier = 1,
  position = [0, 0, 0],
  rotation = [0.2, 0.7, 0],
  floatIntensity = 0.12,
  floatSpeed = 0.9,
  rotationSpeed = 0.25,
}: TorusDanProps) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Ajuste responsivo: quanto maior a viewport, maior o torus.
  const responsiveScale = useMemo(() => {
    const s = viewport.width / 3.2;
    return THREE.MathUtils.clamp(s, 0.85, 1.8) * scaleMultiplier;
  }, [viewport.width, scaleMultiplier]);

  // types do GLTF podem variar; `any` evita depender de gltfjsx/types.
  const gltf = useGLTF('/media/torus_dan.glb') as any;
  const nodes = (gltf?.nodes ?? {}) as Record<string, any>;

  const meshes = useMemo(() => {
    return Object.values(nodes).filter(
      (n) => n && (n.isMesh || n.isSkinnedMesh)
    );
  }, [nodes]);

  const mat = useMemo(
    () => ({
      transmission: 1,
      thickness: 0.45,
      roughness: 0.02,
      ior: 1.35,
      chromaticAberration: 0.12,
      anisotropy: 0.2,
      distortion: 0.35,
      distortionScale: 0.3,
      temporalDistortion: 0.15,
      clearcoat: 1,
      attenuationDistance: 0.75,
      attenuationColor: '#ffffff',
      samples: 8,
      resolution: 512,
      backside: true,
    }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;

    group.current.rotation.y = (rotation as any)[1] + t * rotationSpeed;
    group.current.rotation.x = (rotation as any)[0] + Math.sin(t * 0.7) * 0.06;
    group.current.rotation.z = (rotation as any)[2] + Math.cos(t * 0.5) * 0.04;

    group.current.position.y =
      (Array.isArray(position) ? position[1] : position.y) +
      Math.sin(t * floatSpeed) * floatIntensity;
  });

  return (
    <group
      ref={group}
      position={position as any}
      rotation={rotation as any}
      scale={responsiveScale}
      dispose={null}
    >
      {meshes.map((m: any, i: number) => {
        const geom = m.geometry as THREE.BufferGeometry | undefined;
        if (!geom) return null;

        return (
          <mesh
            key={m.uuid ?? i}
            geometry={geom}
            position={m.position}
            rotation={m.rotation}
            scale={m.scale}
            castShadow={false}
            receiveShadow={false}
          >
            <MeshTransmissionMaterial {...(mat as any)} />
          </mesh>
        );
      })}
    </group>
  );
}

export const TorusDan = memo(TorusDanImpl);

useGLTF.preload('/media/torus_dan.glb');
