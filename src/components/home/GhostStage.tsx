'use client';

import dynamic from 'next/dynamic';

// Carregamento lazy + SSR-safe
const GhostCanvas = dynamic(() => import('./webgl/GhostCanvas'), {
  ssr: false,
});

export default function GhostStage() {
  return <GhostCanvas />;
}
