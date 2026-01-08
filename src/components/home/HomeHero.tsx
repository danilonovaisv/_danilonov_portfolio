'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { GhostStage } from './hero/GhostStage';
import HeroCopy from './hero/HeroCopy';
import { useHeroAnimation } from './hero/useHeroAnimation';
import ManifestoThumb from './hero/ManifestoThumb';
import GhostAura from './hero/GhostAura';

function usePrefersReducedMotion() {
  const [pref, setPref] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => setPref(!!mq.matches);
      apply();
      try {
        mq.addEventListener('change', apply);
        return () => mq.removeEventListener('change', apply);
      } catch {
        mq.addListener?.(apply);
        return () => mq.removeListener?.(apply);
      }
    }
  }, []);
  return pref;
}

export default function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ghostRef = useRef<any>(null); // Referência para a posição do ghost 3D

  const prefersReducedMotion = usePrefersReducedMotion();

  // Hook de animação do Hero (Controla Copy Opacity agora)
  const { copyOpacity } = useHeroAnimation(sectionRef);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen h-[120vh] md:h-[250vh] bg-[#040013] overflow-hidden"
      aria-label="Home hero section"
    >
      {/* Sticky Context */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 z-0 bg-[linear-gradient(180deg,#040013_0%,#0b0d3a_100%)]"
          aria-hidden
        />

        {/* Ghost Aura - Camada de atmosfera etérea */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <GhostAura />
        </div>

        {/* Hero Copy (Editorial) - MIDDLE LAYER */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ opacity: copyOpacity }}
        >
          <HeroCopy ghostRef={ghostRef} />
        </motion.div>

        {/* WebGL Atmosphere - TOP LAYER (Acting as a flashlight) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <GhostStage
            reducedMotion={prefersReducedMotion}
            ghostRef={ghostRef}
          />
        </div>

        {/* Manifesto Thumb (Desktop Transition) */}
        <ManifestoThumb />
      </div>

      {/* Scroll Space */}
      <div className="h-screen w-full pointer-events-none" />
    </section>
  );
}
