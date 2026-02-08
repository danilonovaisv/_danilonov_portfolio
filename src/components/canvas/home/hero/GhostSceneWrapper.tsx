'use client';

import dynamic from 'next/dynamic';

const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/hero/GhostCanvas').then((mod) => mod.GhostCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 w-full h-full bg-background" />
    ),
  }
);

export default function GhostSceneWrapper() {
  return <GhostCanvas />;
}
