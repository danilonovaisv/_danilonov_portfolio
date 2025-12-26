'use client';

import { memo, useRef, useState, useEffect, ReactNode } from 'react';
import { useFrame, useThree, createPortal, ThreeElements } from '@react-three/fiber';
import { useGLTF, useFBO, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';
import * as THREE from 'three';

export type ModeWrapperProps = ThreeElements['mesh'] & {
  children?: ReactNode;
};

export const BarWrapper = memo(function BarWrapper({
  children,
  ...props
}: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);
  const { nodes } = useGLTF('/assets/3d/bar.glb');
  const buffer = useFBO();
  const { viewport: vp } = useThree();
  const [scene] = useState<THREE.Scene>(() => new THREE.Scene());
  const geoWidthRef = useRef<number>(1);

  useEffect(() => {
    const geo = (nodes.Cube as THREE.Mesh)?.geometry;
    if (geo) {
      geo.computeBoundingBox();
      geoWidthRef.current = geo.boundingBox!.max.x - geo.boundingBox!.min.x || 1;
    }
  }, [nodes]);

  useFrame((state, delta) => {
    const { gl, viewport, camera } = state;
    const v = viewport.getCurrentViewport(camera, [0, 0, 15]);

    easing.damp3(
      ref.current.position,
      [0, -v.height / 2 + 0.2, 15],
      0.15,
      delta
    );

    if (true) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.15, desired));
    }

    gl.setRenderTarget(buffer);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.setClearColor(0x5227ff, 1);
  });

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
    <>
      {createPortal(children, scene)}
      <mesh scale={[vp.width, vp.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh
        ref={ref}
        scale={0.15}
        rotation-x={Math.PI / 2}
        geometry={(nodes.Cube as THREE.Mesh)?.geometry}
        {...props}
      >
        <MeshTransmissionMaterial {...defaultMat} buffer={buffer.texture} />
      </mesh>
    </>
  );
});
