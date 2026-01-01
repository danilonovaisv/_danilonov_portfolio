'use client';

import * as React from 'react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

interface GhostStageProps {
  reducedMotion?: boolean;
}

// Import dinâmico evita SSR do canvas
const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/GhostCanvas').then((m) => m.default),
  { ssr: false }
);

export function GhostStage({ reducedMotion }: GhostStageProps) {
  const fallback = (
    <div className="h-full w-full bg-[radial-gradient(circle_at_top,#1d4ed8_0,#06071f_55%,#020617_100%)]" />
  );

  if (reducedMotion) return fallback;

  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <GhostCanvas />
      </Suspense>
    </ErrorBoundary>
  );
}

export default GhostStage;
