// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import Ghost from './Ghost';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';
import RevealingText from './RevealingText'; // Importe o novo componente

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
  Scanline,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function GhostCanvas() {
  const dpr: [number, number] =
    typeof window === 'undefined'
      ? [1, 1.5]
      : [1, Math.min(2, window.devicePixelRatio || 1)];

  // 1. Criamos a ref que vai guardar a posição do fantasma
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
      {/* Background removido para permitir visibilidade do HeroCopy (Z-10) e gradiente radial (Z-0) */}

      <Suspense fallback={null}>
        <AtmosphereVeil />

        {/* 2. Passamos a ref para o Ghost preencher */}
        <Ghost ref={ghostRef} scale={0.2} position={[0, -0.2, 0]} />

        {/* 3. Passamos a mesma ref para o Texto ler */}
        <RevealingText ghostRef={ghostRef} />

        <Particles />
        <Fireflies />

        <EffectComposer enableNormalPass={false}>
          <Bloom
            luminanceThreshold={1}
            mipmapBlur
            intensity={1.8}
            radius={0.6}
          />
          <ChromaticAberration
            offset={[0.002, 0.002]}
            radialModulation={false}
            modulationOffset={0}
          />
          <Scanline density={1.5} opacity={0.3} />
          <Noise
            opacity={0.15}
            premultiply
            blendFunction={BlendFunction.OVERLAY}
          />
          <Vignette eskil={false} offset={0.1} darkness={1.0} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
