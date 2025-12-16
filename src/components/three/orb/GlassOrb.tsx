'use client';

import React, { memo, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';

export type GlassOrbProps = {
  modelUrl?: string;
  /**
   * Se true, renderiza uma geometria procedural (fallback) sem GLB.
   * Útil caso o asset falhe — evita “sumir” a seção inteira.
   */
  procedural?: boolean;
  /**
   * Nome do mesh dentro do GLB (se você souber).
   * Se não souber, o componente tenta encontrar o primeiro mesh.
   */
  meshName?: string;
};

type GLTFLike = {
  nodes: Record<string, any>;
};

function getFirstMeshFromNodes(nodes: Record<string, any>) {
  for (const key of Object.keys(nodes)) {
    const n = nodes[key];
    if (n && (n as THREE.Object3D).type === 'Mesh') return n as THREE.Mesh;
  }
  return null;
}

function GlassOrbImpl({ modelUrl, procedural, meshName }: GlassOrbProps) {
  const group = useRef<THREE.Group>(null);

  const { viewport } = useThree();

  // Responsivo similar ao tutorial (escala baseada no viewport)  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6MX0"}
  const scale = useMemo(() => {
    const base = viewport.width / 3.75;
    return Math.min(Math.max(base, 0.6), 1.35);
  }, [viewport.width]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.x += delta * 0.35;
    group.current.rotation.y += delta * 0.25;
  });

  const material = useMemo(
    () => (
      <MeshTransmissionMaterial
        // Base “glass” (MeshTransmissionMaterial) como no tutorial  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6Mn0"}
        transmission={1}
        thickness={0.35}
        roughness={0}
        ior={1.25}
        chromaticAberration={0.03}
        distortion={0.18}
        distortionScale={0.35}
        temporalDistortion={0.15}
        samples={10}
        resolution={512}
        backside
      />
    ),
    []
  );

  if (procedural) {
    return (
      <group ref={group} scale={scale}>
        <mesh>
          <torusKnotGeometry args={[0.85, 0.28, 220, 36]} />
          {material}
        </mesh>
      </group>
    );
  }

  // IMPORTANTE: aqui é onde normalmente “some” se o path do GLB estiver errado (404).
  // Garanta que modelUrl exista em /public (ex.: /media/...) e o nome do mesh esteja correto.
  const gltf = useGLTF(
    modelUrl ?? '/media/torus_dan.glb'
  ) as unknown as GLTFLike;

  const pickedMesh = useMemo(() => {
    if (!gltf?.nodes) return null;
    if (meshName && gltf.nodes[meshName])
      return gltf.nodes[meshName] as THREE.Mesh;
    return getFirstMeshFromNodes(gltf.nodes);
  }, [gltf, meshName]);

  // Fallback extra caso o GLB carregue mas sem nodes esperados
  if (!pickedMesh) {
    return (
      <group ref={group} scale={scale}>
        <mesh>
          <torusGeometry args={[0.95, 0.28, 64, 160]} />
          {material}
        </mesh>
      </group>
    );
  }

  // Renderiza o mesh do GLB mantendo transforms do node
  return (
    <group ref={group} scale={scale}>
      <mesh
        geometry={(pickedMesh as any).geometry}
        position={(pickedMesh as any).position}
        rotation={(pickedMesh as any).rotation}
        scale={(pickedMesh as any).scale}
      >
        {material}
      </mesh>
    </group>
  );
}

export default memo(GlassOrbImpl);
