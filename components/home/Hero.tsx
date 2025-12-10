'use client';

import React, { useCallback, useRef } from 'react';
import { motion, useScroll, useTransform, type Easing } from 'framer-motion';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import HeroGlassCanvas from '@/components/three/HeroGlassCanvas';
import ManifestoThumb from '@/components/home/ManifestoThumb';
import Button from '@/components/ui/Button';

const HERO_FADE_EASE: Easing = 'easeOut';
const HERO_TITLE_LINE_EASE: Easing = [0.2, 0.65, 0.3, 0.9] as const;

const HERO_SECTION_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const HERO_SECTION_VARIANTS_REDUCED = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const HERO_FADE_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: HERO_FADE_EASE },
  },
};

const HERO_FADE_VARIANTS_REDUCED = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: HERO_FADE_EASE },
  },
};

const HERO_HEADLINE_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const HERO_HEADLINE_VARIANTS_REDUCED = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const HERO_TITLE_LINE_VARIANTS = {
  hidden: { opacity: 0, y: 40, rotateX: 20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: HERO_TITLE_LINE_EASE,
    },
  },
};

const HERO_TITLE_LINE_VARIANTS_REDUCED = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: HERO_TITLE_LINE_EASE,
    },
  },
};

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.25]);
  const textScale = useTransform(scrollYProgress, [0, 0.65], [1, 0.94]);

  const thumbScale = prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 1], [1, 1])
    : useTransform(scrollYProgress, [0, 1], [0.9, 1.2]);
  const thumbTranslateY = prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 1], [0, 0])
    : useTransform(scrollYProgress, [0, 1], [0, -150]);
  const thumbTranslateX = prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 1], [0, 0])
    : useTransform(scrollYProgress, [0, 1], [0, -80]);
  const thumbRadius = prefersReducedMotion
    ? useTransform(scrollYProgress, [0, 1], ['16px', '16px'])
    : useTransform(scrollYProgress, [0, 1], ['24px', '6px']);

  const handleVideoExpand = useCallback(() => {
    if (typeof window === 'undefined') return;
    const target = document.getElementById('manifesto');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('hero:playManifesto'));
    }
  }, []);

  const sectionVariants = prefersReducedMotion
    ? HERO_SECTION_VARIANTS_REDUCED
    : HERO_SECTION_VARIANTS;
  const fadeVariants = prefersReducedMotion
    ? HERO_FADE_VARIANTS_REDUCED
    : HERO_FADE_VARIANTS;
  const headlineVariants = prefersReducedMotion
    ? HERO_HEADLINE_VARIANTS_REDUCED
    : HERO_HEADLINE_VARIANTS;
  const lineVariants = prefersReducedMotion
    ? HERO_TITLE_LINE_VARIANTS_REDUCED
    : HERO_TITLE_LINE_VARIANTS;

  const heroIntroMotionProps = {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: prefersReducedMotion
      ? { once: true }
      : { once: true, margin: '-100px' },
    variants: sectionVariants,
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-[#F4F5F7]"
    >
      <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-center px-6 py-16 lg:px-12 lg:py-20">
        <motion.div
          {...heroIntroMotionProps}
          style={{ opacity: textOpacity, scale: textScale }}
          className="pointer-events-auto w-full"
        >
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="relative z-10 space-y-6 md:space-y-8">
              <motion.h1
                variants={headlineVariants}
                className="font-display font-extrabold text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-tight text-[#111111]"
              >
                <motion.span variants={lineVariants} className="block text-[#0057FF]">
                  Design,
                </motion.span>
                <motion.span variants={lineVariants} className="block">
                  não é só
                </motion.span>
                <motion.span variants={lineVariants} className="block">
                  estética.
                </motion.span>
              </motion.h1>

              <motion.div
                variants={fadeVariants}
                className="max-w-xl rounded-xl bg-white/50 px-4 py-3 text-lg font-medium leading-relaxed text-[#111111]/85 backdrop-blur-md shadow-sm"
              >
                [É intenção, é estratégia, é experiência.]
              </motion.div>

              <motion.div variants={fadeVariants} className="flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  href="/sobre"
                  className="text-base lowercase font-semibold px-8 py-4 rounded-full"
                >
                  get to know me better →
                </Button>
              </motion.div>
            </div>

            <div className="relative flex flex-col items-end gap-6 md:pl-6">
              <motion.div
                variants={fadeVariants}
                className="w-full flex justify-end"
              >
                <div className="rounded-2xl bg-white/60 px-6 py-3 text-sm font-semibold tracking-[0.2em] uppercase text-[#0057FF] shadow-sm">
                  [ BRAND AWARENESS ]
                </div>
              </motion.div>

              <div className="relative h-[440px] w-full overflow-visible">
                <HeroGlassCanvas
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  scrollYProgress={scrollYProgress}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>

              <div className="flex w-full justify-end pr-4">
                <div className="flex flex-col items-end gap-2">
                  <ManifestoThumb
                    onClick={handleVideoExpand}
                    prefersReducedMotion={prefersReducedMotion}
                    motionStyle={{
                      scale: thumbScale,
                      translateY: thumbTranslateY,
                      translateX: thumbTranslateX,
                      borderRadius: thumbRadius,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
