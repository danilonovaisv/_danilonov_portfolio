'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ASSETS } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

// ==== Dynamic 3D hero orb (R3F) ====
const HeroGlassCanvas = dynamic(
  () => import('@/components/three/HeroGlassCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        {/* fallback suave */}
        <div className="h-[60vw] w-[60vw] max-h-[300px] max-w-[300px] rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-600/30 blur-3xl animate-pulse" />
      </div>
    ),
  }
);

const MotionLink = motion.create(Link);

// ========= Animation Constants (Reference HTML) =========
const ANIMATION_CONFIG = {
  duration: 0.8,
  ease: [0.34, 1.56, 0.64, 1], // cubic-bezier from reference
  stagger: 0.05,
};

// ========= AnimatedTextLine =========

type AnimatedTextLineProps = {
  text: string;
  className?: string;
  delay?: number;
  colorClass?: string;
  isPriority?: boolean; // For higher z-index (e.g. "Design,")
};

const AnimatedTextLine = ({
  text,
  className,
  delay = 0,
  colorClass = 'text-[#111111]',
  isPriority = false,
}: AnimatedTextLineProps) => {
  const letters = text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_CONFIG.stagger,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      y: '110%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: ANIMATION_CONFIG.duration,
        ease: ANIMATION_CONFIG.ease,
      },
    },
  };

  return (
    <motion.div
      className={`flex overflow-hidden ${isPriority ? 'relative z-10' : 'relative z-0'} ${className ?? ''}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={child}
          className={`block leading-[0.9] ${colorClass}`}
          aria-hidden="true"
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ============= Hero =============

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const prefersReducedMotion = usePrefersReducedMotion();

  // scroll progress para animações do vídeo/canvas
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // controla áudio do vídeo
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (videoRef.current) {
      if (latest > 0.01 && latest < 0.9) {
        videoRef.current.muted = false;
      } else {
        videoRef.current.muted = true;
      }
    }
  });

  // animações de scroll do conteúdo (Saindo)
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // orb 3D (bg)
  const glassOrbOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const glassOrbScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // vídeo manifesto (fg)
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.25, 1]);
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['30%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [12, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-full bg-[#F4F5F7] md:h-[450vh]"
      aria-labelledby="hero-heading"
    >
      {/* ========== MOBILE HERO ========== */}
      <div className="md:hidden flex flex-col items-center text-center px-4 pt-16 pb-12 gap-6 relative z-10 w-full overflow-hidden">
        {/* Orb 3D mobile */}
        <div className="relative w-full flex justify-center -mb-8">
          <div className="relative h-[280px] w-[280px]">
            <HeroGlassCanvas modelUrl="/media/torus_dan.glb" />
          </div>
        </div>

        {/* Título mobile */}
        <div className="flex flex-col items-center leading-[0.9] text-[clamp(2.5rem,10vw,4rem)] font-extrabold tracking-[-0.03em] text-[#111111]">
          <div className="flex flex-col items-center gap-1">
            <AnimatedTextLine
              text="Design,"
              delay={0.1}
              colorClass="text-[#0057FF]"
              isPriority
            />
            <div className="flex gap-2">
              <AnimatedTextLine text="não" delay={0.2} />
              <AnimatedTextLine text="é" delay={0.25} />
              <AnimatedTextLine text="só" delay={0.3} />
            </div>
            <AnimatedTextLine text="estética." delay={0.4} />
          </div>
        </div>

        {/* Subtítulo mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: ANIMATION_CONFIG.ease,
          }}
          className="mt-2 text-xs font-semibold text-[#0057FF] flex gap-1 items-center"
        >
          <span className="font-bold">[</span>
          <span>É intenção, é estratégia, é experiência.</span>
          <span className="font-bold">]</span>
        </motion.div>

        {/* CTA mobile */}
        <MotionLink
          href="/sobre"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            ease: ANIMATION_CONFIG.ease,
          }}
          className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,87,255,0.6)]"
        >
          get to know me better
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0057FF]">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </MotionLink>
      </div>

      {/* Vídeo manifesto mobile */}
      <div className="md:hidden relative -mx-6 mt-8 w-screen aspect-video min-h-[300px] overflow-hidden">
        <video
          src={ASSETS.videoManifesto}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* ========== DESKTOP HERO (sticky) ========== */}
      <div className="hidden md:flex sticky top-0 h-screen w-full items-center overflow-hidden">
        {/* 1. LAYER 3D (bg) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            opacity: prefersReducedMotion ? 1 : glassOrbOpacity,
            scale: prefersReducedMotion ? 1 : glassOrbScale,
          }}
          className="pointer-events-none absolute inset-0 z-[-1] flex items-center justify-center"
        >
          <div className="relative h-[80vh] w-[80vh]">
            <HeroGlassCanvas modelUrl="/media/torus_dan.glb" />
          </div>
        </motion.div>

        {/* 2. TEXTOS + CTA - ALIGNED LEFT (pl-[10vw]) */}
        <motion.div
          style={{
            opacity: prefersReducedMotion ? 1 : contentOpacity,
            scale: prefersReducedMotion ? 1 : contentScale,
            y: prefersReducedMotion ? 0 : contentY,
          }}
          className="pointer-events-none absolute inset-0 flex h-full items-center justify-start pl-[10vw] pr-6"
        >
          <div className="flex flex-col items-start gap-4">
            {/* Título Principal */}
            <div
              className="flex flex-col items-start leading-[0.9] text-[clamp(4rem,11vw,9rem)] font-extrabold tracking-[-0.03em]"
              style={{ fontFeatureSettings: "'ss01', 'ss02'" }}
            >
              {/* Linha 1: "Design," (Blue) */}
              <AnimatedTextLine
                text="Design,"
                delay={0.1}
                colorClass="text-[#0057FF]"
                isPriority={true}
                className="mb-[-0.05em]"
              />

              {/* Linha 2: "não é só" (Black) */}
              <div className="flex gap-[0.25em]">
                <AnimatedTextLine text="não" delay={0.2} />
                <AnimatedTextLine text="é" delay={0.25} />
                <AnimatedTextLine text="só" delay={0.3} />
              </div>

              {/* Linha 3: "estética." (Black) */}
              <AnimatedTextLine text="estética." delay={0.4} />
            </div>

            {/* Subtítulo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: ANIMATION_CONFIG.duration,
                ease: ANIMATION_CONFIG.ease,
                delay: 0.6,
              }}
              className="mt-2 flex items-center gap-2 text-lg font-medium text-[#0057FF] md:text-xl md:gap-3"
            >
              <span className="font-bold text-[#0057FF]">[</span>
              <div className="flex flex-wrap gap-x-2">
                <span className="inline-block">É intenção,</span>
                <span className="inline-block">é estratégia,</span>
                <span className="inline-block">é experiência.</span>
              </div>
              <span className="font-bold text-[#0057FF]">]</span>
            </motion.div>

            {/* CTA */}
            <motion.div
              className="pointer-events-auto mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                ease: ANIMATION_CONFIG.ease,
              }}
            >
              <MotionLink
                href="/sobre"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-[#0057FF]/20 transition-all hover:bg-[#0047D4]"
              >
                get to know me better
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0057FF] transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </MotionLink>
            </motion.div>
          </div>
        </motion.div>

        {/* 3. VÍDEO MANIFESTO (Foreground / Interaction) */}
        <motion.div
          style={{
            scale: prefersReducedMotion ? 1 : videoScale,
            x: prefersReducedMotion ? '0%' : videoX,
            y: prefersReducedMotion ? '0%' : videoY,
            borderRadius: prefersReducedMotion ? 0 : videoRadius,
          }}
          className="pointer-events-none absolute right-0 bottom-0 top-0 w-full h-full flex items-center justify-center overflow-hidden z-20"
        >
          <div className="relative h-full w-full bg-black shadow-2xl">
            <video
              ref={videoRef}
              src={ASSETS.videoManifesto}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover"
            />
          </div>
        </motion.div>

        {/* Label Brand Awareness */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block z-10"
        >
          <span className="text-sm font-medium tracking-widest text-[#0057FF] rotate-90 origin-right whitespace-nowrap">
            [ BRAND AWARENESS ]
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
