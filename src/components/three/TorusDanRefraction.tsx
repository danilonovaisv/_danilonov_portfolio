'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import {
  CubeCamera,
  Float,
  MeshRefractionMaterial,
  useGLTF,
} from '@react-three/drei';
import * as THREE from 'three';

type TorusDanRefractionProps = {
  scrollIntensity?: number;
};

type GLTFResult = {
  nodes: Record<string, THREE.Mesh>;
};

const MODEL_PATH = '/media/torus_dan.glb';

const TorusDanRefraction: React.FC<TorusDanRefractionProps> = ({
  scrollIntensity = 1,
}) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const gltf = useGLTF(MODEL_PATH) as unknown as GLTFResult;

  const baseMesh =
    (gltf.nodes && (gltf.nodes as any).Torus) ||
    (gltf.nodes && Object.values(gltf.nodes)[0]);

  useFrame((state, delta) => {
    if (!group.current || !baseMesh) return;

    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    group.current.rotation.z += delta * 0.2 * scrollIntensity;

    const targetRotX = y * 0.35 * scrollIntensity;
    const targetRotY = x * 0.45 * scrollIntensity + t * 0.15;

    group.current.rotation.x = THREE.MathUtils.damp(
      group.current.rotation.x,
      targetRotX,
      4,
      delta
    );
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      targetRotY,
      4,
      delta
    );

    const baseScale = viewport.width < 6 ? 1.5 : 2.0;
    const targetScale = baseScale * (0.9 + 0.15 * scrollIntensity);
    const currentScale = group.current.scale.x || 1;
    const s = THREE.MathUtils.damp(currentScale, targetScale, 4, delta);
    group.current.scale.setScalar(s);
  });

  if (!baseMesh) return null;

  return (
    <CubeCamera resolution={256} frames={Infinity}>
      {(texture) => (
        <group ref={group}>
          <Float
            speed={1.2}
            floatIntensity={0.6}
            rotationIntensity={0.4}
            floatingRange={[-0.15, 0.15]}
          >
            <mesh geometry={baseMesh.geometry} castShadow receiveShadow>
              <MeshRefractionMaterial
                envMap={texture}
                bounces={2}
                aberrationStrength={0.015}
                ior={2.2}
                fresnel={0.12}
                color="#ffffff"
                fastChroma
                toneMapped={false}
              />
            </mesh>
          </Float>
        </group>
      )}
    </CubeCamera>
  );
};

useGLTF.preload(MODEL_PATH);

export default TorusDanRefraction;
