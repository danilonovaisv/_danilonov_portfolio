'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Ghost from './Ghost';
import Eyes from './Eyes';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

export default function GhostCanvas() {
  const dpr: [number, number] =
    typeof window === 'undefined'
      ? [1, 1.5]
      : [1, Math.min(2, window.devicePixelRatio || 1)];

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 3], fov: 40 }}
    >
      <color attach="background" args={['#06071f']} />
      <Suspense fallback={null}>
        <AtmosphereVeil />
        <Ghost />
        <Eyes />
        <Particles />
        <Fireflies />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={2.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            kernelSize={KernelSize.LARGE}
          />
          <Noise premultiply opacity={0.25} />
          <Vignette eskil={false} offset={0.45} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
