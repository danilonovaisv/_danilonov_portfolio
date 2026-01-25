'use client';

import * as React from 'react';
import { useRef, useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';

import { Preloader } from '@/components/ui/Preloader';

import HeroCTA from './HeroCTA';
import HeroCopy from './HeroCopy';

// Dynamic import para o GhostCanvas (R3F wrapper com fallbacks embutidos)
const GhostCanvas = dynamic(
  () => import('@/components/canvas/home/hero/GhostCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]" />
    ),
  }
);

const CONFIG = {
  preloadMs: 1800, // Slightly faster for better UX
} as const;

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Timer de segurança para garantir que o preloader some
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), CONFIG.preloadMs);
    return () => clearTimeout(timer);
  }, []);

  // Callback do preloader
  const handlePreloaderDone = useCallback(() => setIsLoaded(true), []);

  // Callback quando o Canvas R3F está pronto
  const handleCanvasReady = useCallback(() => {
    setCanvasReady(true);
    // Força o carregamento se o canvas estiver pronto antes do timer
    setIsLoaded(true);
  }, []);

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
              label="Summoning spirits..."
            />
          )}
        </AnimatePresence>

        {/* Camada: Texto Editorial (Z-20) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="flex items-center w-full h-screen md:sticky md:top-0">
            <div className="std-grid pointer-events-auto pb-32 md:pb-0">
              <HeroCopy isLoaded={isLoaded && canvasReady} />
            </div>
          </div>
        </div>

        {/* Camada: Ghost WebGL (Z-30) - R3F com fallbacks embutidos */}
        <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
          <div className="sticky top-0 h-screen w-full">
            <GhostCanvas onCreated={handleCanvasReady} />
          </div>
        </div>

        {/* Camada: CTA (Z-50) */}
        <div className="absolute inset-0 z-50 pointer-events-none">
          <div className="flex items-end w-full h-screen md:sticky md:top-0">
            <div className="std-grid relative w-full pointer-events-auto">
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:relative md:bottom-auto md:left-auto md:translate-x-0 md:pb-12 lg:pb-20">
                <HeroCTA isLoaded={isLoaded} />
              </div>
            </div>
          </div>
        </div>

        {/* Screen Reader Description */}
        <div className="sr-only">
          Decorative animation of a floating spectral ghost with glowing
          particles following your cursor.
        </div>
      </section>
    </>
  );
}
