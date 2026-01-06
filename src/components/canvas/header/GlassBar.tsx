'use client';

import * as THREE from 'three';
import {
  createPortal,
  ThreeElements,
  useFrame,
  useThree,
} from '@react-three/fiber';
import { useFBO, useGLTF, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';
import { memo, ReactNode, useEffect, useRef, useState } from 'react';

useGLTF.preload('/assets/3d/bar.glb');

type ModeProps = Record<string, unknown>;

type ModeWrapperProps = ThreeElements['mesh'] & {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
  clearColor: THREE.Color;
};

export interface FluidGlassMaterialProps {
  scale?: number | [number, number, number];
  ior?: number;
  thickness?: number;
  chromaticAberration?: number;
  anisotropy?: number;
  roughness?: number;
  smoothness?: number;
  [key: string]: any;
}

export type BarProps = Omit<ModeWrapperProps, 'glb' | 'geometryKey'>;

const ModeWrapper = memo(function ModeWrapper({
  children,
  glb,
  geometryKey,
  lockToBottom = false,
  followPointer = true,
  modeProps = {},
  clearColor,
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material>>(null!);
  const { nodes } = useGLTF(glb) as unknown as {
    nodes: Record<string, THREE.Mesh<THREE.BufferGeometry>>;
  };
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState(() => new THREE.Scene());
  const geoWidthRef = useRef(1);

  useEffect(() => {
    const geo = (nodes[geometryKey] as THREE.Mesh<THREE.BufferGeometry>)
      ?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      if (geo.boundingBox) {
        const width = geo.boundingBox.max.x - geo.boundingBox.min.x;
        geoWidthRef.current = width || 1;
      }
    }
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, viewport, pointer, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    const destX = followPointer ? (pointer.x * v.width) / 2 : 0;
    const destY = lockToBottom
      ? -v.height / 2 + 0.2
      : followPointer
        ? (pointer.y * v.height) / 2
        : 0;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.15, delta);

    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(clearColor, 1);
  });

  const {
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    ...extraMat
  } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial
          map={buffer.texture}
          transparent
          depthWrite={false}
        />
      </mesh>
      <mesh
        ref={ref}
        scale={scale ?? 0.15}
        rotation-x={Math.PI / 2}
        geometry={
          (nodes[geometryKey] as THREE.Mesh<THREE.BufferGeometry>)?.geometry
        }
        {...props}
      >
        <MeshTransmissionMaterial
          buffer={buffer.texture}
          ior={ior ?? 1.15}
          thickness={thickness ?? 5}
          anisotropy={anisotropy ?? 0.01}
          chromaticAberration={chromaticAberration ?? 0.1}
          {...(typeof extraMat === 'object' && extraMat !== null
            ? extraMat
            : {})}
        />
      </mesh>
    </>
  );
});

export function GlassBar({
  modeProps = {},
  clearColor,
  children,
  ...props
}: BarProps) {
  const defaultMat = {
    transmission: 1,
    roughness: 0,
    thickness: 10,
    ior: 1.15,
    color: '#ffffff',
    attenuationColor: '#ffffff',
    attenuationDistance: 0.25,
  };

  return (
    <ModeWrapper
      glb="/assets/3d/bar.glb"
      geometryKey="Cube"
      lockToBottom
      followPointer={false}
      modeProps={{ ...defaultMat, ...modeProps }}
      clearColor={clearColor}
      {...props}
    >
      {children}
    </ModeWrapper>
  );
}
