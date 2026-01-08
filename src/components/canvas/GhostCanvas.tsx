'use client';

import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import Scene from '@/components/canvas/Scene';
import { AnalogDecay } from '@/components/canvas/home/ghost/AnalogDecayPass';

export default function GhostCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        className="h-full w-full pointer-events-auto"
        frameloop="always"
        dpr={GHOST_CONFIG.rendererDPR}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          alpha: true,
          preserveDrawingBuffer: false,
        }}
        camera={{
          position: [0, 0, GHOST_CONFIG.cameraDistance],
          fov: GHOST_CONFIG.cameraFov,
          near: 0.1,
          far: 80,
        }}
      >
        <Scene />
        <Effects />
      </Canvas>
    </div>
  );
}

function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={GHOST_CONFIG.bloomIntensity}
        kernelSize={GHOST_CONFIG.bloomKernel}
        luminanceThreshold={GHOST_CONFIG.bloomThreshold}
        luminanceSmoothing={GHOST_CONFIG.bloomSmoothing}
      />
      <AnalogDecay
        grain={GHOST_CONFIG.analogGrain}
        bleeding={GHOST_CONFIG.analogBleeding}
        scanlines={GHOST_CONFIG.analogScanlines}
        vignette={GHOST_CONFIG.analogVignette}
        intensity={GHOST_CONFIG.analogIntensity}
        jitter={GHOST_CONFIG.analogJitter}
        vsync={GHOST_CONFIG.analogVSync}
      />
    </EffectComposer>
  );
}
