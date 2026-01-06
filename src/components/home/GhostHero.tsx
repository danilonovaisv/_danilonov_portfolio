'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { useProgress } from '@react-three/drei';
import { Preloader } from '@/components/ui/Preloader';

// Dynamic import for the GhostCanvas to ensure it only runs on client
const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/GhostCanvas'),
  {
    ssr: false,
  }
);

export default function GhostHero() {
  const { active } = useProgress();

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      <GhostCanvas />
      <Preloader ready={!active} />
    </div>
  );
}
