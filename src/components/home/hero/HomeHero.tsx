'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Preloader } from '@/components/ui/Preloader';
// import { useMediaQuery } from '@/hooks/useMediaQuery';
// import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Group } from 'three';

import HeroCopy from './HeroCopy';
// ManifestoThumb removed

// Dynamic import for WebGL Scene
const GhostScene = dynamic(
  () => import('@/components/canvas/home/hero/GhostScene'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />,
  }
);

const CONFIG = {
  preloadMs: 2000,
} as const;

// heroGradient removed

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<Group>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), CONFIG.preloadMs);
    return () => clearTimeout(timer);
  }, []);

  // Performance: Desativa WebGL em mobile para garantir LCP < 2.5s (Lei da Performance Mobile)
  // const isMobile = useMediaQuery('(max-width: 768px)');

  const handlePreloaderDone = useCallback(() => setIsLoaded(true), []);

  return (
    <>
      <section
        id="hero"
        ref={heroRef}
        className="relative w-full min-h-screen bg-[#040013]"
        aria-label="Portfolio Hero Section"
      >
        {/* Preloader */}
        <AnimatePresence>
          {!isLoaded && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Initializing Experience"
            />
          )}
        </AnimatePresence>

        {/* Camada: Texto Editorial (Z-25 conforme Battle Plan) */}
        <div className="absolute inset-0 z-25">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center px-6 md:px-12">
            <HeroCopy ghostRef={ghostRef} isLoaded={isLoaded} />
          </div>
        </div>

        {/* Camada: Ghost WebGL (Z-20 conforme Battle Plan) */}
        <div className="sticky top-0 h-screen w-full z-20 overflow-hidden pointer-events-none">
          <GhostScene ghostRef={ghostRef} />
        </div>

        <div className="sr-only">
          Decorative animation of a floating spectral ghost with glowing
          particles following your cursor.
        </div>
      </section>

      {/* Mobile-only Manifesto Section */}
    </>
  );
}
