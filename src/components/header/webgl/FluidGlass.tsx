/* eslint-disable react/no-unknown-property */
'use client';

import * as THREE from 'three';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, useFBO, useGLTF } from '@react-three/drei';
import { easing } from 'maath';

export type FluidGlassBarProps = {
  scale?: [number, number, number] | number;
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  transmission?: number;
  roughness?: number;
  smoothness?: number;
  color?: string;
  attenuationColor?: string;
  attenuationDistance?: number;
};

export type FluidGlassProps = {
  mode?: 'bar';
  barProps?: FluidGlassBarProps;
  pointerX?: number;
  reducedMotion?: boolean;
  className?: string;
};

const BAR_GLB = '/assets/3d/bar.glb';

const ModeWrapper = memo(function ModeWrapper({
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps,
  pointerX,
}: {
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps: FluidGlassBarProps;
  pointerX: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const { nodes } = useGLTF(glb) as unknown as {
    nodes: Record<string, THREE.Object3D>;
  };
  const buffer = useFBO();
  const { viewport, camera } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const candidate = nodes[geometryKey];
    const geo = candidate instanceof THREE.Mesh ? candidate.geometry : undefined;
    if (!geo) return;
    geo.computeBoundingBox();
    geoWidthRef.current =
      geo.boundingBox?.max.x && geo.boundingBox?.min.x
        ? geo.boundingBox.max.x - geo.boundingBox.min.x
        : 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);
    const destX = followPointer ? (pointerX * v.width) / 2 : 0;
    const destY = lockToBottom ? -v.height / 2 + 0.2 : 0;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if (modeProps.scale == null && geoWidthRef.current) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    state.gl.setRenderTarget(buffer);
    state.gl.render(scene, camera);
    state.gl.setRenderTarget(null);
    state.gl.setClearColor(0x5227ff, 1);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    transmission,
    roughness,
    smoothness,
    color,
    attenuationColor,
    attenuationDistance,
  } = modeProps;
  const resolvedRoughness =
    roughness ?? (smoothness != null ? 1 - smoothness : 0);

  return (
    <>
      {createPortal(<></>, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={
          nodes[geometryKey] instanceof THREE.Mesh
            ? nodes[geometryKey].geometry
            : undefined
        }
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          transmission={transmission ?? 1}
          roughness={resolvedRoughness}
          thickness={thickness ?? 4}
          ior={ior ?? 1.15}
          anisotropy={anisotropy ?? 0.02}
          chromaticAberration={chromaticAberration ?? 0.08}
          color={color ?? '#ffffff'}
          attenuationColor={attenuationColor ?? '#ffffff'}
          attenuationDistance={attenuationDistance ?? 0.25}
        />
      </mesh>
    </>
  );
});

function Bar({ modeProps, pointerX }: { modeProps: FluidGlassBarProps; pointerX: number }) {
  const defaultMat: FluidGlassBarProps = {
    transmission: 1,
    roughness: 0,
    thickness: 4,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb={BAR_GLB}
      geometryKey="Cube"
      lockToBottom={false}
      followPointer
      modeProps={{ ...defaultMat, ...modeProps }}
      pointerX={pointerX}
    />
  );
}

export default function FluidGlass({
  mode = 'bar',
  barProps = {},
  pointerX = 0,
  reducedMotion = false,
  className,
}: FluidGlassProps) {
  if (mode !== 'bar') return null;

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }} gl={{ alpha: true }}>
        <Bar modeProps={barProps} pointerX={reducedMotion ? 0 : pointerX} />
      </Canvas>
    </div>
  );
}

useGLTF.preload(BAR_GLB);
