'use client';

import React, { Suspense, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, Environment, Preload } from '@react-three/drei';
import GlassOrb from './orb/GlassOrb';

type HeroGlassCanvasProps = {
  modelUrl: string;
};

class OrbErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallback: React.ReactNode }>,
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Mantido propositalmente silencioso para não “derrubar” a Hero.
    // Se quiser, você pode logar para Sentry aqui.
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function OrbFallback() {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <directionalLight intensity={1.4} position={[2, 2, 3]} />
      <GlassOrb procedural />
      <Environment preset="city" />
    </group>
  );
}

export default function HeroGlassCanvas({ modelUrl }: HeroGlassCanvasProps) {
  // DPR adaptativo simples (boa relação qualidade/perf em mobile)
  const [dpr] = useState<[number, number]>([1, 1.75]);

  const camera = useMemo(
    () => ({
      position: [0, 0, 3.2] as [number, number, number],
      fov: 35,
      near: 0.1,
      far: 100,
    }),
    []
  );

  return (
    <Canvas
      className="h-full w-full"
      camera={camera}
      dpr={dpr}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      // Para a orb animar continuamente (rotações/distortion temporal)
      frameloop="always"
    >
      <color attach="background" args={['#00000000']} />

      <AdaptiveDpr pixelated />

      <ambientLight intensity={0.35} />
      <directionalLight intensity={2} position={[0, 2, 3]} />
      <directionalLight intensity={1} position={[-2, -1, 2]} />

      <Environment preset="city" />

      <OrbErrorBoundary fallback={<OrbFallback />}>
        <Suspense fallback={<OrbFallback />}>
          <GlassOrb modelUrl={modelUrl} />
          <Preload all />
        </Suspense>
      </OrbErrorBoundary>
    </Canvas>
  );
}
