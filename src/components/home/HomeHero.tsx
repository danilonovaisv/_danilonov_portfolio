'use client';

import { useRef } from 'react';
import HeroCopy from './hero/HeroCopy';
import GhostCanvas from '@/components/canvas/GhostCanvas';
import ManifestoThumb from './hero/ManifestoThumb';

export default function HomeHero() {
  // Ref para tracking de scroll do Manifesto
  const heroSectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={heroSectionRef}
      className="relative w-full bg-black h-[200vh]" // 2x viewport para acomodar scroll animation
    >
      {/* Hero fixa (primeiro 100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Texto da Hero */}
        <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
          <HeroCopy />
        </div>

        {/* Canvas do Ghost (layer acima do texto para lantern effect) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <GhostCanvas />
        </div>

        {/* Manifesto Thumb (Desktop) - Scroll-driven */}
        <ManifestoThumb sectionRef={heroSectionRef} />
      </div>
    </section>
  );
}
