'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import Ghost from './Ghost';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Scanline,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// ============================================================================
// CONFIGURAÇÃO CRÍTICA: A COR DO FUNDO DEVE SER IDÊNTICA À COR DA MÁSCARA
// ============================================================================
const BACKGROUND_COLOR = '#06071f';

export default function GhostCanvas() {
  const dpr: [number, number] =
    typeof window === 'undefined'
      ? [1, 1.5]
      : [1, Math.min(2, window.devicePixelRatio || 1)];

  const ghostRef = useRef<THREE.Group>(null);

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.NoToneMapping,
      }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <color attach="background" args={[BACKGROUND_COLOR]} />

      <Suspense fallback={null}>
        <AtmosphereVeil />

        {/* Ghost (Z ~ 0) */}
        <Ghost ref={ghostRef} scale={0.22} position={[0, -0.2, 0]} />

        {/* Partículas decorativas */}
        <Particles />
        <Fireflies />

        {/* Post-processing */}
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.9}
            mipmapBlur
            intensity={1.8}
            radius={0.5}
          />
          <ChromaticAberration
            offset={[0.0015, 0.0015]}
            radialModulation={false}
            modulationOffset={0}
          />
          <Scanline density={1.2} opacity={0.12} />
          <Noise
            opacity={0.12}
            premultiply
            blendFunction={BlendFunction.OVERLAY}
          />
          <Vignette eskil={false} offset={0.15} darkness={0.9} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
