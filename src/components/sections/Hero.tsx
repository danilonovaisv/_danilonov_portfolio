'use client';

import React, { useRef, useState } from 'react';
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
        {/* fallback suave, tipo glow da orb */}
        <div className="h-[60vw] w-[60vw] max-h-[300px] max-w-[300px] rounded-full bg-gradient-to-br from-blue-400/30 to-indigo-600/30 blur-3xl animate-pulse" />
      </div>
    ),
  }
);

const MotionLink = motion.create(Link);

// ========= AnimatedTextLine =========

type AnimatedTextLineProps = {
  text: string;
  className?: string;
  delay?: number;
  colorClass?: string;
};

const AnimatedTextLine = ({
  text,
  className,
  delay = 0,
  colorClass = 'text-[#111111]',
}: AnimatedTextLineProps) => {
  const letters = text.split('');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    },
  };

  const child: Variants = {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={`flex overflow-hidden ${className ?? ''}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={child}
          className={`block leading-[0.9] ${colorClass}`}
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

  // scroll progress para animações
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

  // animações de scroll do conteúdo
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 0.15], [0, -50]);

  // orb 3D (background)
  const glassOrbOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const glassOrbScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // vídeo manifesto (foreground)
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
      <div className="md:hidden flex flex-col items-center text-center px-4 pt-16 pb-12 gap-8">
        {/* Orb 3D mobile */}
        <div className="relative w-full flex justify-center -mb-8">
          <div className="relative h-[280px] w-[280px]">
            <HeroGlassCanvas modelUrl="/media/torus_dan.glb" />
          </div>
        </div>

        {/* Título mobile */}
        <div className="flex flex-col items-center gap-0 leading-[0.95] text-[2.75rem] sm:text-[3.5rem] font-extrabold tracking-[-0.04em] text-[#111111]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center"
          >
            <div className="flex flex-row justify-center gap-[0.2em] whitespace-nowrap">
              <span className="text-[#0057FF]">Design,</span>
              <span className="text-[#111111]">não é</span>
            </div>
            <span id="hero-heading" className="text-[#111111]">
              só estética.
            </span>
          </motion.div>
        </div>

        {/* Subtítulo mobile */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
          className="mt-2 text-xs font-semibold uppercase tracking-widest text-[#0057FF]"
        >
          [ É intenção, é estratégia, é experiência. ]
        </motion.p>

        {/* CTA mobile */}
        <MotionLink
          href="/sobre"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.3,
          }}
          className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_24px_-12px_rgba(0,87,255,0.6)] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2"
        >
          get to know me better
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0057FF] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </MotionLink>
      </div>

      {/* Vídeo manifesto mobile */}
      <div className="md:hidden relative -mx-6 mt-8 w-screen aspect-[375/330] min-h-[300px] overflow-hidden">
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
      <div className="hidden md:flex sticky top-0 h-screen w-full items-center justify-center overflow-hidden">
        {/* 1. LAYER 3D (background orb) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            opacity: prefersReducedMotion ? 1 : glassOrbOpacity,
            scale: prefersReducedMotion ? 1 : glassOrbScale,
          }}
          className="pointer-events-none absolute inset-0 z-[-1]"
        >
          <HeroGlassCanvas modelUrl="/media/torus_dan.glb" />
        </motion.div>

        {/* 2. TEXTOS + CTA */}
        <motion.div
          style={{
            opacity: prefersReducedMotion ? 1 : contentOpacity,
            scale: prefersReducedMotion ? 1 : contentScale,
            y: prefersReducedMotion ? 0 : contentY,
          }}
          className="pointer-events-none absolute inset-0 container mx-auto flex h-full px-6 md:px-12 lg:px-16"
        >
          {/* Label lateral BRAND AWARENESS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:right-12 md:block"
          >
            <span className="text-lg font-medium tracking-widest text-[#0057FF] md:text-xl">
              [ BRAND AWARENESS ]
            </span>
          </motion.div>

          <div className="mx-auto flex h-full max-w-4xl flex-col items-center gap-6 pt-24 text-center md:mx-0 md:items-start md:gap-0 md:pt-0 md:text-left">
            {/* Título principal */}
            <div className="mb-6 flex flex-col items-center gap-1 font-sans text-[clamp(3rem,7vw,7.5rem)] font-extrabold tracking-[-0.04em] md:mb-10 md:items-start">
              <div className="hidden flex-col items-start gap-0 md:flex">
                <AnimatedTextLine
                  text="Design,"
                  delay={0.2}
                  colorClass="text-[#0057FF]"
                />
                <AnimatedTextLine
                  text="não é só"
                  delay={0.4}
                  colorClass="text-[#111111]"
                />
                <AnimatedTextLine
                  text="estética."
                  delay={0.6}
                  colorClass="text-[#111111]"
                />
              </div>
            </div>

            {/* Subtítulo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.8,
              }}
              className="relative mb-10 flex w-full justify-center md:mb-14 md:justify-start"
            >
              <p className="inline-block rounded-lg bg-white/5 px-0 pr-4 text-lg font-medium tracking-wide text-[#0057FF] backdrop-blur-sm md:text-xl">
                [ É intenção, é estratégia, é experiência. ]
              </p>
            </motion.div>

            {/* CTA desktop */}
            <motion.div className="pointer-events-auto flex w-full justify-center md:justify-start">
              <MotionLink
                href="/sobre"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 1.0,
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 30px -10px rgba(0, 87, 255, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#0057FF]/20 transition-all md:text-lg"
              >
                get to know me better
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#0057FF] shadow-sm transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </MotionLink>
            </motion.div>
          </div>
        </motion.div>

        {/* 3. VÍDEO MANIFESTO (foreground) */}
        <motion.div
          style={{
            scale: prefersReducedMotion ? 1 : videoScale,
            x: prefersReducedMotion ? '0%' : videoX,
            y: prefersReducedMotion ? '0%' : videoY,
            borderRadius: prefersReducedMotion ? 0 : videoRadius,
          }}
          className="pointer-events-none absolute flex h-full w-full items-center justify-center overflow-hidden bg-black shadow-2xl"
        >
          <div className="pointer-events-auto relative block h-full w-full">
            <video
              ref={videoRef}
              src={ASSETS.videoManifesto}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover transition-opacity duration-500"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
