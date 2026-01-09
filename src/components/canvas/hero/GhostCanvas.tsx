'use client';

import { Canvas } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { RefObject } from 'react';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import type { Group } from 'three';

import Ghost from './Ghost';
import { AnalogDecay } from './AnalogDecayPass';
import GhostEyes from './GhostEyes';
import Particles from './Particles';
import AtmosphereVeil from './AtmosphereVeil';
import Fireflies from './Fireflies';
import { Vector3 } from 'three';

type GhostCanvasProps = {
  ghostRef?: RefObject<Group | null>;
};

export default function GhostCanvas({
  ghostRef: externalRef,
}: GhostCanvasProps) {
  const cfg = GHOST_CONFIG;
  const internalRef = useRef<Group>(null);
  const ghostRef = externalRef || internalRef;

  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas
        eventSource={
          typeof document !== 'undefined' ? document.body : undefined
        }
        eventPrefix="client"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        // CAMERA: Posição e FOV ajustados para Ghost visível e proeminente
        camera={{ position: [0, 0, 12], fov: 50 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} color="#0a1030" />

          {/* Primary Ghost Light - Glow azul intenso central */}
          <pointLight
            position={[0, 0, 5]}
            intensity={15}
            color="#0080ff"
            distance={20}
            decay={2}
          />

          {/* Secondary Glow - Cyan atmosférico */}
          <pointLight
            position={[0, 1, 8]}
            intensity={10}
            color="#00d4ff"
            distance={25}
            decay={2}
          />

          {/* Rim Light - Contorno cyan lateral */}
          <pointLight
            position={[-5, 0, 3]}
            intensity={6}
            color="#4fe6ff"
            distance={15}
            decay={2}
          />

          {/* Fill Light - Preenchimento sutil */}
          <pointLight
            position={[4, -2, 4]}
            intensity={4}
            color="#0048ff"
            distance={12}
            decay={2}
          />

          <AtmosphereSync ghostRef={ghostRef} />

          {/* Ghost centralizado */}
          <group position={[0, 0, 0]}>
            <Ghost ref={ghostRef}>
              <GhostEyes color={cfg.eyeGlowColor} />
            </Ghost>
          </group>

          <Particles count={80} color={cfg.particleColor} />

          <Fireflies />

          <EffectComposer enableNormalPass={false}>
            {/* Bloom intensificado para glow fantasmagórico forte */}
            <Bloom
              luminanceThreshold={0.1}
              mipmapBlur
              intensity={4.5}
              radius={0.85}
            />
            <AnalogDecay intensity={0.5} scanlines={0.05} grain={0.15} />
            <Noise opacity={0.01} />
            <Vignette eskil={false} offset={0.5} darkness={0.6} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * Componente auxiliar para sincronizar a posição do Ghost com o AtmosphereVeil
 * sem causar re-renders no GhostCanvas principal.
 */
function AtmosphereSync({ ghostRef }: { ghostRef: RefObject<Group | null> }) {
  const ghostPos = useRef(new Vector3(0, 0, 0));

  useFrame(() => {
    if (ghostRef.current) {
      ghostPos.current.copy(ghostRef.current.position);
    }
  });

  return <AtmosphereVeil ghostPosition={ghostPos.current} />;
}
