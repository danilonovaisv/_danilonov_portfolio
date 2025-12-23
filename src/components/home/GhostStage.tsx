'use client';

import dynamic from 'next/dynamic';

// Carregamento lazy + SSR-safe
const GhostCanvas = dynamic(
  () => import('@/components/canvas/webgl/GhostCanvas'),
  {
    ssr: false,
  }
);

export default function GhostStage() {
  return <GhostCanvas />;
}
