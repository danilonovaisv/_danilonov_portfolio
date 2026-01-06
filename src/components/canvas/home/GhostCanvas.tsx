'use client';

import { Canvas } from '@react-three/fiber';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import { Suspense } from 'react';
import { useControls } from 'leva';
import { Group } from 'three';
import { RefObject } from 'react';

// Componentes da Cena
import Ghost from './Ghost';
import GhostEyes from './GhostEyes';
import Particles from './Particles';
// Ajusta o caminho conforme a tua estrutura de pastas real
import { AnalogDecay } from './postprocessing/AnalogDecayPass';

interface GhostCanvasProps {
  onCreated?: (_state: any) => void;
  ghostRef?: RefObject<Group | null>;
}

export default function GhostCanvas({ onCreated, ghostRef }: GhostCanvasProps) {
  // 1. Controles de Debug (Leva)
  // Agrupei para facilitar a passagem de props
  const config = useControls('Ghost Atmosphere', {
    // Iluminação Global
    mainColor: { value: '#4d8dff' },
    fillColor: { value: '#6e00ff' },

    // Configurações do Fantasma (Visual)
    bodyColor: { value: '#e9f0ff' },
    emissiveIntensity: { value: 12, min: 0, max: 20 },
    wobbleSpeed: { value: 2.0, min: 0, max: 5 },
    wobbleAmount: { value: 0.2, min: 0, max: 1 },

    // Olhos
    eyeColor: { value: '#ffffff' }, // Branco brilhante funciona melhor com Bloom

    // Post-Processing
    bloomIntensity: { value: 1.5, min: 0, max: 3 },
    bloomThreshold: { value: 0.2, min: 0, max: 1 },
    noiseOpacity: { value: 0.05, min: 0, max: 0.2 },
    analogIntensity: { value: 0.5, min: 0, max: 2 },
    analogSpeed: { value: 0.5, min: 0, max: 2 },
  });

  return (
    <div className="absolute inset-0 z-20 h-full w-full">
      <Canvas
        dpr={[1, 2]}
        gl={{
          antialias: false,
          alpha: true,
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={onCreated}
      >
        <Suspense fallback={null}>
          {/* Iluminação Dramática Controlada pelo Leva */}
          <ambientLight intensity={0.2} />
          <pointLight
            position={[2, 3, 4]}
            intensity={2}
            color={config.mainColor}
            distance={10}
          />
          <pointLight
            position={[-3, -2, 2]}
            intensity={1.5}
            color={config.fillColor}
            distance={10}
          />

          {/* O Ator Principal */}
          {/* IMPORTANTE: Passamos as props do Leva para o Ghost */}
          <group position={[0, -0.5, 0]}>
            <Ghost
              ref={ghostRef}
              color={config.bodyColor}
              emissiveIntensity={config.emissiveIntensity}
              wobbleSpeed={config.wobbleSpeed}
              wobbleAmount={config.wobbleAmount}
            >
              {/* CRUCIAL: Os olhos são FILHOS (children) do Ghost.
                  Assim, quando o corpo inclina (tilt), os olhos acompanham. */}
              <GhostEyes color={config.eyeColor} />
            </Ghost>
          </group>

          {/* Atmosfera */}
          <Particles count={60} />

          {/* Pipeline de Pós-Processamento */}
          <EffectComposer enableNormalPass={false}>
            <Bloom
              luminanceThreshold={config.bloomThreshold}
              mipmapBlur
              intensity={config.bloomIntensity}
              radius={0.6}
            />

            <AnalogDecay
              intensity={config.analogIntensity}
              speed={config.analogSpeed}
            />

            <Noise opacity={config.noiseOpacity} />

            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
