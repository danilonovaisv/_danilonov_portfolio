// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Ghost from './Ghost';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';
import * as THREE from 'three';

// Importando efeitos padrão da biblioteca
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

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: THREE.NoToneMapping, // Importante para cores neon
      }}
      camera={{ position: [1, 0, 6], fov: 25 }}
    >
      {/* Ambient Light para volume base */}
      <ambientLight intensity={0.5} />

      <Suspense fallback={null}>
        {/* Elementos da Cena */}
        <AtmosphereVeil />
        <Ghost scale={0.2} position={[0, -0.2, 0]} />
        <Particles />
        <Fireflies />

        {/* EFEITOS VISUAIS (O "Look" do vídeo) */}
        <EffectComposer enableNormalPass={false}>
          <Bloom
            luminanceThreshold={1}
            mipmapBlur
            intensity={1.5}
            radius={0.5}
          />
          <ChromaticAberration
            offset={new THREE.Vector2(0.013, 0.003)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Scanline density={1.5} opacity={0.3} />
          <Noise
            opacity={0.75}
            premultiply
            blendFunction={BlendFunction.OVERLAY}
          />
          <Vignette eskil={false} offset={0.4} darkness={1.2} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
