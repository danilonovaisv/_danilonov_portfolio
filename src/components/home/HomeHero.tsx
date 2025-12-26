'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import ManifestoThumb from './ManifestoThumb';
import HeroCopy from '@/components/home/HeroCopy';
import GhostStage from './GhostStage';
import HeroPreloader from './HeroPreloader';

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
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
            ref={heroRef}
            className={`relative w-full bg-[#06071f] ${isMobile ? 'min-h-screen flex items-center justify-center' : 'h-[450vh]'}`}
        >
          {/* Sticky Utility for Scrollytelling on Desktop */}
          <div
              className={
                isMobile
                    ? 'contents'
                    : 'sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center'
              }
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
                <>
                  <div className="absolute bottom-10 right-6 z-30 w-55 md:right-12 md:w-65 pointer-events-none">
                    {/* Container fantasma para alinhamento do ícone/texto se necessário */}
                    <div className="pointer-events-none absolute -top-8 right-0 flex items-center gap-2 text-sm text-white/80">
                      <ArrowUpRight className="h-5 w-5" />
                    </div>
                  </div>
                  {/* ManifestoThumb movido para o root do sticky container para garantir Full Screen real */}
                  <ManifestoThumb heroRef={heroRef as React.RefObject<HTMLElement | null>} />
                </>
            )}
          </div>
        </section>

        {isMobile && (
            <section className="relative flex w-full flex-col items-center justify-center bg-[#050505] p-0">
              <ManifestoThumb heroRef={heroRef as React.RefObject<HTMLElement | null>} />
            </section>
        )}

        <HeroPreloader isVisible={showPreloader} />
      </>
  );
}