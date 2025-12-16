'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Environment,
  Lightformer,
} from '@react-three/drei';
import TorusDan from './TorusDan';
import TorusDanRefraction from './TorusDanRefraction';

type HeroGlassCanvasProps = {
  className?: string;
  /** transmission (default) = MeshTransmissionMaterial, refraction = MeshRefractionMaterial */
  variant?: 'transmission' | 'refraction';
  /** 0..1 – controla força da animação (scroll, etc.) */
  scrollIntensity?: number;
};

const HeroGlassCanvas: React.FC<HeroGlassCanvasProps> = ({
  className,
  variant = 'transmission',
  scrollIntensity = 1,
}) => {
  const OrbComponent = variant === 'refraction' ? TorusDanRefraction : TorusDan;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 30 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#f4f5f7']} />

        <Suspense fallback={null}>
          {/* Luzes básicas */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[4, 8, 6]} intensity={2.4} />

          {/* Environment tipo “studio” para highlights bonitos no vidro */}
          <Environment preset="studio">
            <Lightformer
              form="ring"
              intensity={3}
              position={[0, 2, 6]}
              scale={6}
            />
            <Lightformer
              form="rect"
              intensity={1.8}
              position={[-3, -1, -6]}
              scale={[6, 3, 1]}
            />
          </Environment>

          <OrbComponent scrollIntensity={scrollIntensity} />

          {/* Performance helpers */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroGlassCanvas;
