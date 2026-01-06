'use client';

import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef } from 'react';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import * as THREE from 'three';

import Ghost from './Ghost';
import GhostEyes from './GhostEyes';
import AtmosphereVeil from './AtmosphereVeil';
import AnalogDecay from './postprocessing/AnalogDecayPass';

interface GhostCanvasProps {
  active?: boolean;
  onCreated?: () => void;
  ghostRef?: React.RefObject<THREE.Group | null>;
}

export default function GhostCanvas({
  ghostRef: propGhostRef,
}: GhostCanvasProps) {
  const localRef = useRef<THREE.Group>(null);
  // Use the passed ref if available, otherwise use local
  const ghostRef = (propGhostRef as React.RefObject<THREE.Group>) || localRef;

  return (
    <Canvas
      dpr={[1, 1.5]} // Performance
      camera={{ position: [0, 0, 20], fov: 40 }} // Câmera mais longe para ver mais área
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: 'high-performance',
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      className="absolute top-0 left-0 w-full h-full" // Removed pointer-events-none to allow mouse interaction
      style={{ zIndex: 10 }} // O Canvas fica NA FRENTE do texto
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} color="#0a0a2e" />
        <directionalLight
          position={[-8, 6, -4]}
          intensity={2.0}
          color="#66e3ff"
        />
        <directionalLight
          position={[8, -4, -6]}
          intensity={1.5}
          color="#50e3c2"
        />

        {/* Componente que escurece o fundo e revela com base na posição do ghostRef */}
        <AtmosphereVeil ghostRef={ghostRef} />

        {/* Grupo do Fantasma */}
        <Ghost ref={ghostRef}>
          <GhostEyes /> {/* Olhos dentro do fantasma para moverem junto */}
        </Ghost>

        {/* Efeitos */}
        <EffectComposer>
          <Bloom
            luminanceThreshold={1.5}
            mipmapBlur
            intensity={1.8}
            radius={0.8}
          />
          <Noise opacity={0.15} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <AnalogDecay intensity={0.5} jitter={0.2} scanlines={0.3} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}
