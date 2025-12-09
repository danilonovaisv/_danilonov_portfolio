'use client';

import React, { useCallback, useMemo, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import HeroGlassCanvas from '@/components/three/HeroGlassCanvas';
import Button from '@/components/ui/Button';
import { ASSETS } from '@/lib/constants';

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.97]);

  const videoWidth = useTransform(scrollYProgress, [0, 0.3], ['20vw', '100vw']);
  const videoHeight = useTransform(scrollYProgress, [0, 0.3], ['180px', '100vh']);
  const videoX = useTransform(scrollYProgress, [0, 0.3], ['70vw', '0vw']);
  const videoY = useTransform(scrollYProgress, [0, 0.3], ['60vh', '0vh']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.3], ['1.5rem', '0rem']);

  const videoStyle = useMemo(() => {
    if (prefersReducedMotion) {
      return {
        width: '65vw',
        height: '45vh',
        borderRadius: '1.5rem',
        x: '0vw',
        y: '0vh',
      };
    }

    return {
      width: videoWidth,
      height: videoHeight,
      borderRadius: videoRadius,
      x: videoX,
      y: videoY,
    };
  }, [prefersReducedMotion, videoWidth, videoHeight, videoX, videoY, videoRadius]);

  const handleVideoExpand = useCallback(() => {
    if (typeof window === 'undefined') return;
    const target = document.getElementById('manifesto');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const motionButtonProps = prefersReducedMotion
    ? {}
    : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[200vh] w-full overflow-hidden bg-[#F4F4F7]"
    >
      <div className="sticky top-0 h-screen w-full">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <HeroGlassCanvas
            className="w-full h-full"
            eventSource={sectionRef}
            scrollYProgress={scrollYProgress}
            prefersReducedMotion={prefersReducedMotion}
          />
        </div>

        <div className="relative z-20 h-full w-full">
          <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 py-12 text-[#111111] lg:grid lg:grid-cols-[40%_60%] lg:items-center lg:gap-10">
            <motion.div
              style={{ opacity: textOpacity, y: textY, scale: textScale }}
              className="order-2 mt-6 lg:order-1"
            >
              <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/70 px-4 py-1 text-[0.65rem] uppercase tracking-[0.5em] text-[#0057FF] backdrop-blur-sm shadow-sm">
                <span>[ brand awareness ]</span>
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.08] text-[#111111] sm:text-5xl md:text-[4.5rem] lg:text-[5rem]">
                <span className="block text-[#0057FF]">Design,</span>
                <span className="block">não é só</span>
                <span className="block">estética.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg font-semibold text-[#0f172a]">
                [É intenção, é estratégia, é experiência.]
              </p>

              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                <Button variant="primary" href="/sobre" className="uppercase tracking-[0.3em]">
                  conhecer o manifesto
                </Button>
                <motion.button
                  type="button"
                  {...motionButtonProps}
                  onClick={handleVideoExpand}
                  className="inline-flex items-center gap-3 rounded-full border border-[#0057FF]/60 px-6 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-[#0057FF] transition focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]/70"
                >
                  <Play className="h-4 w-4 text-[#0057FF]" />
                  manifesto em vídeo
                </motion.button>
              </div>
            </motion.div>

            <div className="order-1 lg:order-2" aria-hidden>
              <p className="text-sm font-semibold uppercase tracking-[0.7em] text-white/0 lg:text-transparent">
                visual immersion
              </p>
            </div>
          </div>
        </div>

        <motion.button
          type="button"
          {...motionButtonProps}
          tabIndex={0}
          onClick={handleVideoExpand}
          aria-label="Expandir manifesto em vídeo"
          style={videoStyle}
          className="absolute top-0 left-0 z-30 flex cursor-pointer flex-col overflow-hidden border border-white/50 bg-black/80 shadow-2xl transition-all duration-500"
        >
          <video
            src={ASSETS.videoManifesto}
            poster={ASSETS.heroManifestThumb}
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full border border-white/60 bg-black/30 px-5 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.5em] text-white shadow-md">
              <Play className="h-3 w-3 text-[#0057FF]" />
              manifesto
            </div>
          </div>
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
