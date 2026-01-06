'use client';

import React, { useEffect, useState } from 'react';
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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none mix-blend-screen">
        {/* Canvas (desligado em reduced-motion) */}
        {!reducedMotion ? (
          <GhostCanvas />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(0,87,255,0.32),transparent_35%),linear-gradient(180deg,#040013_0%,#0b0d3a_100%)]" />
        )}
      </div>

      <Preloader
        ready={!active}
        durationMs={2000}
        className="z-50 bg-[linear-gradient(180deg,#0a0a0a_0%,#1a1a1a_100%)]"
      />
    </>
  );
}
