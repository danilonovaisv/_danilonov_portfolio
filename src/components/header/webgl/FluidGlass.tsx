'use client';

import * as THREE from 'three';
import React, { memo, ReactNode, useEffect, useRef, useState } from 'react';
import {
  Canvas,
  createPortal,
  ThreeElements,
  useFrame,
  useThree,
} from '@react-three/fiber';
import { MeshTransmissionMaterial, useFBO, useGLTF } from '@react-three/drei';
import { easing } from 'maath';

type Mode = 'lens' | 'bar' | 'cube';
type ModeProps = Record<string, unknown>;

export interface FluidGlassProps {
  mode?: Mode;
  lensProps?: ModeProps;
  barProps?: ModeProps;
  cubeProps?: ModeProps;

  /**
   * Quando informado, o Canvas do R3F escuta os eventos do elemento pai (ex: wrapper do header),
   * permitindo que o glass responda ao cursor mesmo com o HTML por cima.
   */
  eventSource?: HTMLElement | null;

  /**
   * Controla se o glass deve “seguir” o cursor. Útil para prefers-reduced-motion.
   */
  followPointer?: boolean;

  /**
   * className aplicado diretamente no <canvas>.
   * Dica: use `pointer-events-none` quando estiver usando `eventSource`.
   */
  className?: string;
}

export default function FluidGlass({
                                     mode = 'lens',
                                     lensProps = {},
                                     barProps = {},
                                     cubeProps = {},
                                     eventSource = null,
                                     followPointer = true,
                                     className,
                                   }: FluidGlassProps) {
  const Wrapper = mode === 'bar' ? Bar : mode === 'cube' ? Cube : Lens;
  const modeProps =
      mode === 'bar' ? barProps : mode === 'cube' ? cubeProps : lensProps;

  return (
      <Canvas
          className={className}
          camera={{ position: [0, 0, 20], fov: 15 }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          dpr={[1, 1.5]}
          // Quando usamos eventSource, o canvas pode ficar com pointer-events: none (via className),
          // mas ainda assim recebe os eventos porque o R3F escuta no eventSource.
          {...(eventSource ? { eventSource } : {})}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
      >
        <Wrapper modeProps={modeProps} followPointer={followPointer} />
      </Canvas>
  );
}

type MeshProps = ThreeElements['mesh'];

interface ModeWrapperProps extends MeshProps {
  children?: ReactNode;
  glb: string;
  geometryKey: string;
  lockToBottom?: boolean;
  followPointer?: boolean;
  modeProps?: ModeProps;
}

/**
 * Implementação baseada no “Fluid Glass” (reactbits.dev):
 * - Renderiza uma cena “portal” para um FBO (buffer texture)
 * - Reapresenta esse buffer como background (plane)
 * - Usa MeshTransmissionMaterial com `buffer={buffer.texture}` para refração real
 */
const ModeWrapper = memo(function ModeWrapper({
                                                children,
                                                glb,
                                                geometryKey,
                                                lockToBottom = false,
                                                followPointer = true,
                                                modeProps = {},
                                                ...props
                                              }: ModeWrapperProps) {
  const ref = useRef<THREE.Mesh>(null!);

  // GLTF tipado de forma defensiva (evita quebrar TS se o loader retornar unknown)
  const { nodes } = useGLTF(glb) as unknown as {
    nodes: Record<string, THREE.Mesh>;
  };

  const buffer = useFBO({
    stencilBuffer: false,
    depthBuffer: true,
  });

  const { viewport } = useThree();
  const [portalScene] = useState<THREE.Scene>(() => new THREE.Scene());

  // Largura do mesh no GLB (para auto-scale quando scale não é passado)
  const geoWidthRef = useRef<number>(1);

  useEffect(() => {
    const mesh = nodes?.[geometryKey] as THREE.Mesh | undefined;
    const geo = mesh?.geometry;
    if (!geo) return;

    geo.computeBoundingBox();
    const bb = geo.boundingBox;
    if (!bb) return;

    geoWidthRef.current = bb.max.x - bb.min.x || 1;
  }, [nodes, geometryKey]);

  useFrame((state, delta) => {
    const { gl, pointer, camera } = state;

    // Viewport em “world units” no plano do glass (z ~ 15)
    const v = state.viewport.getCurrentViewport(camera, [0, 0, 15]);

    // Movimento mais contido (premium)
    const ampX = followPointer ? 0.35 : 0;
    const ampY = followPointer ? 0.25 : 0;

    const destX = (pointer.x * v.width * ampX) / 2;
    const destY = lockToBottom
        ? -v.height / 2 + 0.2
        : (pointer.y * v.height * ampY) / 2;

    easing.damp3(ref.current.position, [destX, destY, 15], 0.18, delta);

    // Auto-scale (caso não venha definido via props)
    if ((modeProps as { scale?: number }).scale == null) {
      const maxWorld = v.width * 0.9;
      const desired = maxWorld / geoWidthRef.current;
      ref.current.scale.setScalar(Math.min(0.25, desired));
    }

    // Render da cena portal no FBO
    gl.setRenderTarget(buffer);
    gl.setClearColor(0x000000, 0);
    gl.clear(true, true, true);
    gl.render(portalScene, camera);
    gl.setRenderTarget(null);

    // Transparência no render final do canvas
    gl.setClearColor(0x000000, 0);
  });

  const {
    // Requisitos do “lens” (referência reactbits)
    scale,
    ior,
    thickness,
    anisotropy,
    chromaticAberration,
    // Extras opcionais (ex: roughness, transmission, samples, resolution, etc.)
    ...extraMat
  } = modeProps as {
    scale?: number;
    ior?: number;
    thickness?: number;
    anisotropy?: number;
    chromaticAberration?: number;
    [key: string]: unknown;
  };

  const geometry = (nodes?.[geometryKey] as THREE.Mesh | undefined)?.geometry;

  return (
      <>
        {createPortal(children, portalScene)}

        {/* Background do buffer (necessário para o efeito de refração funcionar como no exemplo) */}
        <mesh scale={[viewport.width, viewport.height, 1]} position={[0, 0, 0]}>
          <planeGeometry />
          <meshBasicMaterial map={buffer.texture} transparent />
        </mesh>

        {/* Lens / Glass mesh */}
        <mesh
            ref={ref}
            scale={scale ?? 0.25}
            rotation-x={Math.PI / 2}
            geometry={geometry}
            frustumCulled={false}
            {...props}
        >
          <MeshTransmissionMaterial
              // Buffer do “mundo” atrás (portalScene)
              buffer={buffer.texture}
              // Defaults “premium” (evita glassmorphism fake via CSS)
              transmission={1}
              roughness={0}
              metalness={0}
              reflectivity={0.2}
              clearcoat={1}
              clearcoatRoughness={0}
              // Requisitos do prompt
              ior={ior ?? 1.15}
              thickness={thickness ?? 5}
              anisotropy={anisotropy ?? 0.01}
              chromaticAberration={chromaticAberration ?? 0.1}
              {...(typeof extraMat === 'object' && extraMat !== null ? extraMat : {})}
          />
        </mesh>
      </>
  );
});

function Lens({
                modeProps,
                followPointer = true,
                ...p
              }: { modeProps?: ModeProps; followPointer?: boolean } & MeshProps) {
  return (
      <ModeWrapper
          glb="/assets/3d/lens.glb"
          geometryKey="Cylinder"
          followPointer={followPointer}
          modeProps={modeProps}
          {...p}
      />
  );
}

function Cube({
                modeProps,
                followPointer = true,
                ...p
              }: { modeProps?: ModeProps; followPointer?: boolean } & MeshProps) {
  return (
      <ModeWrapper
          glb="/assets/3d/cube.glb"
          geometryKey="Cube"
          followPointer={followPointer}
          modeProps={modeProps}
          {...p}
      />
  );
}

function Bar({
               modeProps = {},
               followPointer = false,
               ...p
             }: { modeProps?: ModeProps; followPointer?: boolean } & MeshProps) {
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
          followPointer={followPointer}
          modeProps={{ ...defaultMat, ...modeProps }}
          {...p}
      />
  );
}

useGLTF.preload('/assets/3d/lens.glb');
useGLTF.preload('/assets/3d/bar.glb');
useGLTF.preload('/assets/3d/cube.glb');