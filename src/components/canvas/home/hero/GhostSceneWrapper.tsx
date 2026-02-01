'use client';

import dynamic from 'next/dynamic';

const GhostScene = dynamic(
  () => import('@/components/canvas/home/hero/GhostScene'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />,
  }
);

export default function GhostSceneWrapper() {
  return <GhostScene />;
}
