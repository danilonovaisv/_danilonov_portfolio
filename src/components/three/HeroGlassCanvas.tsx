'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  ContactShadows,
  OrbitControls,
  Html,
} from '@react-three/drei';
import { TorusDan } from './TorusDan';

type HeroGlassCanvasProps = {
  className?: string;
  /**
   * transmission → MeshTransmissionMaterial
   * refraction   → MeshRefractionMaterial
   */
  variant?: 'transmission' | 'refraction';
  /** 0–1, usado para intensificar a animação com o scroll */
  scrollIntensity?: number;
};

export default function HeroGlassCanvas({
  className,
  variant = 'transmission',
  scrollIntensity = 0,
}: HeroGlassCanvasProps) {
  return (
    <div
      className={`relative h-full w-full ${className ?? ''}`}
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.7]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 5.5], fov: 35 }}
      >
        {/* Fundo neutro (aproxima do bg do hero) */}
        <color attach="background" args={['#F4F5F7']} />

        <Suspense
          fallback={
            <Html center>
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-400/40 to-indigo-500/40 blur-xl" />
            </Html>
          }
        >
          {/* Luzes principais */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.8} castShadow />
          <directionalLight position={[-6, -4, -4]} intensity={0.5} />

          {/* Environment para reflexos/refração */}
          <Environment preset="city" resolution={1024} />

          {/* Orb 3D */}
          <TorusDan variant={variant} scrollIntensity={scrollIntensity} />

          {/* Sombra macia abaixo da orb */}
          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.35}
            blur={2.5}
            scale={8}
            far={4}
          />
        </Suspense>

        {/* Controles opcionais – desabilitamos zoom/pan
            para manter o layout consistente */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}
