// src/components/home/HomeHero.tsx
'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ScrollProvider } from '@/contexts/ScrollContext';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';

// Dynamically import WebGL canvas to avoid SSR issues
const GhostStage = dynamic(() => import('@/components/canvas/GhostStage'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#0b0d3a_0%,_#050505_60%)]" />
  ),
});

export default function HomeHero() {
  const containerRef = useRef<HTMLElement>(null);

  // Set up scroll tracking for the Hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  return (
    <ScrollProvider scrollYProgress={scrollYProgress}>
      <section
        ref={containerRef}
        id="hero"
        className="relative w-full h-[100vh] bg-[#050505] overflow-hidden"
      >
        {/* WebGL Atmosphere (z-0) */}
        <div className="absolute inset-0 z-0">
          <GhostStage />
        </div>

        {/* Radial overlay for visual integration (z-10) */}
        <div
          className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_50%,transparent_0%,#050505_70%)] pointer-events-none"
          aria-hidden="true"
        />

        {/* Editorial Content (z-20) */}
        <div className="relative z-20 h-full">
          <HeroCopy />
        </div>

        {/* Manifesto Video Thumbnail (z-30) - Fixed position, bottom-right */}
        <ManifestoThumb />
      </section>
    </ScrollProvider>
  );
}
