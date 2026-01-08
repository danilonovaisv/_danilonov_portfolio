'use client';

import { Canvas } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense } from 'react';
import type { RefObject } from 'react';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import type { Group } from 'three';

import Ghost from '../Ghost';
import AtmosphereVeil from '../../home/AtmosphereVeil';
import Fireflies from './Fireflies';
import { AnalogDecay } from './AnalogDecayPass';
import GhostEyes from './GhostEyes';
import Particles from './Particles';

type GhostCanvasProps = {
  ghostRef?: RefObject<Group>;
};

export default function GhostCanvas({ ghostRef }: GhostCanvasProps) {
  const cfg = GHOST_CONFIG;

  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas
        eventSource={document.body}
        eventPrefix="client"
        dpr={[1, 1.2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        // CAMERA AJUSTADA: Z=7 afasta, FOV=45 dá estilo de cinema sem exagerar no zoom
        camera={{ position: [0, 0, 7], fov: 35 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <AtmosphereVeil />
          <Fireflies />

          {/* Primary Ghost Light - Glow intenso */}
          <pointLight
            position={[2, 3, 4]}
            intensity={2}
            color={cfg.glowColor}
            distance={0.9}
          />

          {/* Extra Glow Light - Cyan atmosférico */}
          <pointLight
            position={[0, 0, 3]}
            intensity={8}
            color={cfg.glowColor}
            distance={12}
            decay={2}
          />

          {/* Rim Light - Contorno sutil */}
          <pointLight
            position={[-3, -2, 2]}
            intensity={4}
            color={cfg.glowColor}
            distance={8}
            decay={2}
          />

          <group position={[0, -0.2, 0]}>
            <Ghost ref={ghostRef}>
              <GhostEyes color={cfg.eyeGlowColor} />
            </Ghost>
          </group>

          <Particles count={cfg.particleCount} color={cfg.glowColor} />

          <EffectComposer enableNormalPass={false}>
            {/* Bloom mais intenso para glow fantasmagórico */}
            <Bloom
              luminanceThreshold={0.15}
              mipmapBlur
              intensity={cfg.postProcessing.bloomIntensity}
              radius={cfg.postProcessing.bloomRadius}
            />
            <AnalogDecay
              intensity={cfg.postProcessing.intensity}
              scanlines={cfg.postProcessing.scanlines}
              grain={cfg.postProcessing.grain}
            />
            <Noise opacity={cfg.postProcessing.noiseOpacity} />
            <Vignette
              eskil={false}
              offset={0.6}
              darkness={cfg.postProcessing.vignette}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
