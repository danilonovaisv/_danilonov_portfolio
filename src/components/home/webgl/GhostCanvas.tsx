// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Ghost from './Ghost';
// Removido import de Eyes, pois já está dentro de Ghost
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';
import AnalogDecayPass from './postprocessing/AnalogDecayPass'; // Importamos o nosso efeito customizado

import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

export default function GhostCanvas() {
  // Ajuste de DPI para performance em telas retina
  const dpr: [number, number] =
    typeof window === 'undefined'
      ? [1, 1.5]
      : [1, Math.min(2, window.devicePixelRatio || 1)];

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: false, // Desliga antialias padrão pois o PostProcessing cuida disso
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      // Câmera um pouco mais longe (z: 4) e FOV maior para sensação de profundidade
      camera={{ position: [0, 0, 4.5], fov: 45 }}
    >
      <color attach="background" args={['#06071f']} />

      <Suspense fallback={null}>
        <AtmosphereVeil />

        {/* GHOST:
           scale={0.16} -> Tamanho agradável, nem gigante nem minúsculo.
           position={[0, -0.2, 0]} -> Centralizado verticalmente.
        */}
        <Ghost scale={0.16} position={[0, -0.2, 0]} />

        {/* Ambient Effects */}
        <Particles />
        <Fireflies />

        {/* Pós-Processamento - A ordem importa! */}
        <EffectComposer multisampling={0} disableNormalPass>
          {/* 1. Bloom: Faz o brilho do fantasma "vazar" */}
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.5} // Só brilha o que for muito claro
            luminanceSmoothing={0.9}
            kernelSize={KernelSize.LARGE}
            mipmapBlur // Deixa o glow mais suave e menos pixelado
          />

          {/* 2. Nosso efeito customizado de TV Velha/VHS */}
          <AnalogDecayPass />

          {/* 3. Noise adicional para textura extra */}
          <Noise premultiply opacity={0.15} />

          {/* 4. Vignette para focar o olhar no centro */}
          <Vignette eskil={false} offset={0.1} darkness={0.9} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}