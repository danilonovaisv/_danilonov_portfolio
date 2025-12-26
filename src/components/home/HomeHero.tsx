'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import ManifestoThumb from './ManifestoThumb';
import HeroCopy from '@/components/home/HeroCopy';
import GhostStage from './GhostStage';
import HeroPreloader from './HeroPreloader';

export default function HomeHero() {
  const [isMobile, setIsMobile] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const [showPreloader, setShowPreloader] = useState(!reducedMotion);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setShowPreloader(false);
      return;
    }
    const timer = window.setTimeout(() => setShowPreloader(false), 1500);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <>
      <section
        id="hero"
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#06071f]"
      >
        {/* Canvas atrás de tudo */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GhostStage enabled={!reducedMotion} />
        </div>

        {/* Overlays entre canvas e texto */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_25%_50%,rgba(0,87,255,0.08)_0%,transparent_55%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-linear-to-b from-transparent via-black/10 to-black/35"
            aria-hidden
          />
        </div>

        {/* Texto SEMPRE acima */}
        <div className="relative z-20 flex w-full max-w-6xl flex-col items-center px-6 pt-12 pb-16 text-center md:px-10 md:pt-16 xl:px-12">
          <HeroCopy />
        </div>

        {!isMobile && (
          <div className="absolute bottom-10 right-6 z-30 w-[220px] drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)] md:right-12 md:w-[260px]">
            <div className="pointer-events-none absolute -top-8 right-0 flex items-center gap-2 text-sm text-white/80">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <ManifestoThumb />
          </div>
        )}
      </section>

      {isMobile && (
        <section className="relative flex w-full flex-col items-center justify-center bg-black p-6">
          <ManifestoThumb />
        </section>
      )}

      <HeroPreloader isVisible={showPreloader} />
    </>
  );
}
