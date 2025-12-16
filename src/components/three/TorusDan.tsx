'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

type TorusDanProps = {
  /** 0..1 – controla intensidade da animação (scroll, etc.) */
  scrollIntensity?: number;
};

type GLTFResult = {
  nodes: Record<string, THREE.Mesh>;
};

const MODEL_PATH =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/model/torus_dan.glb';

const TorusDan: React.FC<TorusDanProps> = ({ scrollIntensity = 1 }) => {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const gltf = useGLTF(MODEL_PATH) as unknown as GLTFResult;

  const baseMesh =
    (gltf.nodes && (gltf.nodes as any).Torus) ||
    (gltf.nodes && Object.values(gltf.nodes)[0]);

  useFrame((state, delta) => {
    if (!group.current || !baseMesh) return;

    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer; // -1..1 (normalizado pelo R3F)

    // spin base
    group.current.rotation.z += delta * 0.15 * scrollIntensity;

    // tilt controlado pelo mouse
    const targetRotX = y * 0.3 * scrollIntensity;
    const targetRotY = x * 0.4 * scrollIntensity + t * 0.1;

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

    // escala responsiva
    const baseScale = viewport.width < 6 ? 1.6 : 2.1;
    const targetScale = baseScale * (0.9 + 0.15 * scrollIntensity);
    const currentScale = group.current.scale.x || 1;
    const s = THREE.MathUtils.damp(currentScale, targetScale, 4, delta);
    group.current.scale.setScalar(s);
  });

  if (!baseMesh) return null;

  return (
    <group ref={group}>
      <Float
        speed={1.2}
        floatIntensity={0.6}
        rotationIntensity={0.4}
        floatingRange={[-0.15, 0.15]}
      >
        <mesh geometry={baseMesh.geometry} castShadow receiveShadow>
          <MeshTransmissionMaterial
            transmission={1}
            ior={1.25}
            thickness={2}
            roughness={0.1}
            chromaticAberration={0.04}
            anisotropy={0.12}
            distortion={0.3}
            distortionScale={0.4}
            temporalDistortion={0.2}
            samples={10}
            resolution={256}
            color="#ffffff"
            attenuationColor="#9ab5ff"
            attenuationDistance={1.5}
            backside
          />
        </mesh>
      </Float>
    </group>
  );
};

useGLTF.preload(MODEL_PATH);

export default TorusDan;
