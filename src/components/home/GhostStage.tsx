'use client';

// ============================================================================
// src/components/home/GhostStage.tsx
// Wrapper da camada WebGL, respeitando prefers-reduced-motion / fallback
// ============================================================================

import * as React from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import para evitar SSR do Canvas WebGL
const GhostCanvas = dynamic(
  () =>
    import('@/components/canvas/home/GhostCanvas').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-[radial-gradient(circle_at_top,#1d4ed8_0,#06071f_55%,#020617_100%)]" />
    ),
  }
);

interface GhostStageProps {
  reducedMotion?: boolean;
}

export function GhostStage({ reducedMotion }: GhostStageProps) {
  if (reducedMotion) {
    // Fallback estático em gradiente radial (sem WebGL)
    return (
      <div className="h-full w-full bg-[radial-gradient(circle_at_top,#1d4ed8_0,#06071f_55%,#020617_100%)]" />
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,#1d4ed8_0,#06071f_55%,#020617_100%)]" />
      }
    >
      <GhostCanvas />
    </Suspense>
  );
}

export default GhostStage;
