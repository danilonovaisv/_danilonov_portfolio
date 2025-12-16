'use client';

import React, { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { TorusDan } from './TorusDan';

type HeroGlassCanvasProps = {
  className?: string;
};

function HeroGlassCanvasImpl({ className }: HeroGlassCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 3.2], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight intensity={1.25} position={[2.5, 2.0, 3.0]} />
        <directionalLight intensity={0.65} position={[-3.0, 1.0, 2.0]} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <TorusDan position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(HeroGlassCanvasImpl);
