'use client';

import dynamic from 'next/dynamic';
import React from 'react';

export type HeroOrbProps = {
  className?: string;
  /**
   * Caminho do GLB/GLTF dentro de /public.
   * Recomendado no seu projeto: /media/...
   */
  modelUrl?: string;
};

const HeroGlassCanvas = dynamic(() => import('./HeroGlassCanvas'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-[32px] bg-transparent"
    />
  ),
});

export default function HeroOrb({
  className,
  modelUrl = '/torus_dan.glb',
}: HeroOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={[
        // IMPORTANTE: o pai precisa ter dimensão; este wrapper não deve colapsar.
        // Use este componente dentro de um container `relative`.
        'pointer-events-none absolute inset-0',
        'min-h-[240px] sm:min-h-[320px] lg:min-h-[520px]',
        className ?? '',
      ].join(' ')}
    >
      <HeroGlassCanvas modelUrl={modelUrl} />
    </div>
  );
}
