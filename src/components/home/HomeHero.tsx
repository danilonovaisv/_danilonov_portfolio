'use client';

import { useRef, useState, useCallback, useMemo } from 'react';
import { AnimatePresence, motion, cubicBezier } from 'framer-motion';
import * as THREE from 'three';
import { Preloader } from '@/components/ui/Preloader';
import { HeroCopy } from './HeroCopy';
import { GhostStage } from './GhostStage';
import { ManifestoThumb, type ManifestoThumbHandle } from './ManifestoThumb';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useHeroAnimation } from './hero/useHeroAnimation';

const CONFIG = {
  preloadMs: 2000,
  easing: cubicBezier(0.22, 1, 0.36, 1),
  entrance: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.8,
    },
  },
};

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<ManifestoThumbHandle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)'
  );

  const {
    mounted,
    dimensions,
    width,
    height,
    top,
    left,
    borderRadius,
    copyOpacity,
    lenis,
  } = useHeroAnimation(
    sectionRef,
    manifestoRef,
    isMobile,
    prefersReducedMotion
  );

  const shouldRender3D = useMemo(() => {
    if (!mounted) return false;
    if (isMobile) return false;
    return !prefersReducedMotion;
  }, [mounted, isMobile, prefersReducedMotion]);

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);
  const ghostRef = useRef<THREE.Group | null>(null);

  const handleThumbClick = useCallback(() => {
    const target = sectionRef.current;
    if (!lenis || !target) return;

    lenis.scrollTo(target, {
      offset: target.offsetHeight * 0.88,
      duration: 1.5,
    });
  }, [lenis]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-dvh md:h-[400vh] bg-[#020204] overflow-hidden"
      aria-label="Home hero section"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <AnimatePresence>
          {isLoading && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Summoning spirits"
            />
          )}
        </AnimatePresence>

        {/* CAMADA WEBGL */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{
            filter: isLoading ? 'blur(20px)' : 'blur(0px)',
            opacity: 1,
          }}
          transition={{ duration: 2.0, ease: 'linear' }}
        >
          <GhostStage
            reducedMotion={!shouldRender3D}
            active={!isLoading && shouldRender3D}
            ghostRef={ghostRef}
          />
        </motion.div>

        {/* CAMADA DE TEXTO */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute inset-0 z-25 pointer-events-none"
        >
          <div className="w-full h-full pointer-events-auto">
            <HeroCopy
              startEntrance={!isLoading}
              enable3D={shouldRender3D}
              ghostRef={ghostRef}
            />
          </div>
        </motion.div>

        {/* Floating Video - Desktop Only */}
        {!prefersReducedMotion && !isMobile && (
          <motion.div
            className="fixed bottom-5 right-5 z-50 pointer-events-auto overflow-hidden shadow-2xl"
            style={{
              width: mounted && dimensions.w > 0 ? width : '28vw',
              height: mounted && dimensions.h > 0 ? height : '15.75vw',
              top: mounted && dimensions.w > 0 ? top : undefined,
              left: mounted && dimensions.w > 0 ? left : undefined,
              bottom: mounted && dimensions.w > 0 ? undefined : 20,
              right: mounted && dimensions.w > 0 ? undefined : 20,
              borderRadius,
              opacity: mounted ? 1 : 0,
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.5,
            }}
          >
            <ManifestoThumb ref={manifestoRef} onClick={handleThumbClick} />
          </motion.div>
        )}
      </div>

      <div className="hidden md:block h-screen w-full pointer-events-none" />
    </section>
  );
}
