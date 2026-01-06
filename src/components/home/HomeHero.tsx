// src/components/home/HomeHero.tsx
'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import * as THREE from 'three';
import { Preloader } from '@/components/ui/Preloader';
import { HeroCopy } from './HeroCopy';
import { GhostStage } from './GhostStage';
import { ManifestoThumb, type ManifestoThumbHandle } from './ManifestoThumb';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useHeroAnimation } from './hero/useHeroAnimation';
import { useWebGLSupport } from '@/hooks/useWebGLSupport';

const CONFIG = {
  preloadMs: 2000,
  easing: cubicBezier(0.22, 1, 0.36, 1),
  // Removemos a entrada por framer-motion aqui para controlar via classe/opacity manual
  // para garantir que o DOM existe para os refs.
};

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<ManifestoThumbHandle | null>(null);
  const ghostRef = useRef<THREE.Group>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)'
  );
  const isWebGLAvailable = useWebGLSupport();

  // Os hooks correm sempre, então o DOM precisa de existir (mesmo que invisível)
  const { dimensions, width, height, top, left, borderRadius } =
    useHeroAnimation(sectionRef, manifestoRef, isMobile, prefersReducedMotion);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, CONFIG.preloadMs);
    return () => clearTimeout(timer);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    if (minTimeElapsed) {
      setIsLoading(false);
    }
  }, [minTimeElapsed]);

  const shouldRender3D = isWebGLAvailable && !prefersReducedMotion && !isMobile;
  // Lógica para mostrar o Manifesto apenas em Desktop/Sem movimento reduzido
  const showManifesto = !prefersReducedMotion && !isMobile;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[300vh] bg-black"
      data-section="home"
    >
      <Preloader
        onComplete={handlePreloaderComplete}
        durationMs={CONFIG.preloadMs}
      />

      {/* Sticky Container for Animation Sequence */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {/* Layer 0: Loading State Wrapper */}
        <div
          className={`relative w-full h-full transition-opacity duration-1000 ease-out ${
            isLoading ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        >
          {/* Layer 1: Ghost WebGL (Atmosphere) - Z-20 */}
          {/* Render only if supported and NOT mobile */}
          <div className="absolute inset-0 z-20 w-full h-full pointer-events-none">
            {shouldRender3D && <GhostStage ghostRef={ghostRef} />}
          </div>

          {/* Layer 2: Editorial Text (Hero Copy) - Z-25 */}
          <div className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none">
            <div className="w-full h-full">
              <HeroCopy
                startEntrance={!isLoading}
                enable3D={shouldRender3D}
                ghostRef={ghostRef}
              />
            </div>
          </div>

          {/* Layer 3: Manifesto Video (Expands to Fullscreen) - Z-30 */}
          {/* Changed from fixed to absolute to scroll away with the section */}
          <motion.div
            className="absolute z-30 pointer-events-auto overflow-hidden shadow-2xl"
            style={{
              width: mounted && dimensions.w > 0 ? width : '28vw',
              height: mounted && dimensions.h > 0 ? height : '15.75vw',
              top: mounted && dimensions.w > 0 ? top : undefined,
              left: mounted && dimensions.w > 0 ? left : undefined,
              bottom: mounted && dimensions.w > 0 ? undefined : 20,
              right: mounted && dimensions.w > 0 ? undefined : 20,
              borderRadius,
              opacity: mounted ? 1 : 0,
              display: showManifesto ? 'block' : 'none',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.5,
            }}
          >
            <ManifestoThumb ref={manifestoRef} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const mounted = typeof window !== 'undefined';
