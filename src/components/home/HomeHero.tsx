'use client';

import { useCallback, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';

export default function HomeHero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const videoScaleMotion = useTransform(scrollYProgress, [0, 0.85], [0.3, 1]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.85], [16, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const handleDesktopClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const targetTop = sectionEl.offsetTop + sectionEl.offsetHeight - window.innerHeight;
    window.scrollTo({ top: targetTop, behavior: 'auto' });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] overflow-hidden bg-[#06071f]"
      aria-label="Hero institucional de Danilo Novais"
    >
      {/* Fundo radial base */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#0b0d3a_0,#06071f_60%)]" />

      {/* Preloader Ghost Loader (z-50) */}
      <HeroPreloader />

      {/* Stage sticky: Ghost Atmosphere + Texto Editorial + Manifesto Thumb */}
      <div className="sticky top-0 h-screen">
        <div className="relative h-full w-full overflow-hidden">
          {/* Ghost Atmosphere (WebGL) */}
          <div className="absolute inset-0 z-20">
            <GhostStage />
          </div>

          {/* Texto Editorial fixo (sem scroll binding) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
            <HeroCopy />
          </div>

          {/* Manifesto Thumb – Desktop (scroll morphing) */}
          <motion.div
            className="absolute inset-0 z-30 hidden md:block"
            style={{
              opacity: videoOpacity,
              scale: prefersReducedMotion ? 1 : videoScaleMotion,
              borderRadius: videoRadius,
              originX: 1,
              originY: 1,
            }}
          >
            <div className="pointer-events-none flex h-full w-full items-end justify-end p-6 md:p-10">
              <div className="pointer-events-auto h-[min(36vh,260px)] w-[min(32vw,460px)] overflow-hidden rounded-xl border border-white/5 bg-black/40 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
                <ManifestoThumb onDesktopClick={handleDesktopClick} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
