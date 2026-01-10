'use client';

import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { AntigravityCTA } from '@/components/ui/AntigravityCTA';

/**
 * Animation: Page Load Entry
 * - Scale: 0.92 → 1.02 → 1
 * - Blur: 10px → 0
 * - Y: 60px → 0
 * - Duration: 1.2s
 * - Easing: [0.25, 0.46, 0.45, 0.94]
 */
const textContainerAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 60,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: [0.92, 1.02, 1],
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.15,
    },
  },
};

const itemAnimation: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

import { useRef } from 'react';
import { useGhostReveal } from '@/hooks/useGhostReveal';
import type { Group } from 'three';

export default function HeroCopy({
  ghostRef,
  isLoaded = true,
}: {
  ghostRef?: React.RefObject<Group | null>;
  isLoaded?: boolean;
}) {
  const revealRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Sincroniza a posição do overlay 2D com o Ghost 3D
  useGhostReveal(ghostRef, revealRef, isLoaded && !prefersReducedMotion);

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'initial' as const,
        animate: 'animate' as const,
        variants: textContainerAnimation,
      };

  return (
    <motion.div
      {...motionProps}
      className="hero-content relative flex flex-col items-center justify-center text-center max-w-5xl px-4 pointer-events-auto"
    >
      {/* Ghost Reveal Overlay (Segredo do Sistema Ghost) */}
      {!prefersReducedMotion && (
        <div
          ref={revealRef}
          className="absolute pointer-events-none z-50 rounded-full bg-radial from-[#00ffff]/80 to-transparent blur-3xl mix-blend-screen transition-opacity duration-1000"
          style={{
            width: 'clamp(300px, 40vw, 600px)',
            height: 'clamp(300px, 40vw, 600px)',
            willChange: 'transform',
            opacity: isLoaded ? 1 : 0,
          }}
        />
      )}
      {/* Tag decorativa - Mono, 19px, uppercase */}
      <motion.span
        variants={itemAnimation}
        className="font-mono text-[19px] uppercase tracking-[0.2em] text-[#d9dade] opacity-50 mb-8"
      >
        [BRAND AWARENESS]
      </motion.span>

      {/* Headline principal - Display: 6-9rem, Black weight */}
      <motion.h1
        variants={itemAnimation}
        className="font-black tracking-tight leading-[0.95] mb-6 text-white/20"
        style={{
          fontSize: 'clamp(3.5rem, 10vw + 1rem, 9rem)',
        }}
      >
        {/* Desktop/Tablet: 2 linhas */}
        <span className="hidden md:block">
          Você não vê
          <br />o design.
        </span>

        {/* Mobile: 3 linhas */}
        <span className="md:hidden">
          Você não
          <br />
          vê o
          <br />
          design.
        </span>
      </motion.h1>

      {/* Subheading - H2 size, #d9dade */}
      <motion.h2
        variants={itemAnimation}
        className="font-bold text-[#d9dade]/30 mb-14"
        style={{
          fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 2.5rem)',
        }}
      >
        Mas ele vê você.
      </motion.h2>

      {/* CTA Button - Using AntigravityCTA component */}
      <motion.div variants={itemAnimation}>
        <AntigravityCTA
          href="/sobre"
          label="step inside"
          variant="primary"
          size="md"
          ariaLabel="Ir para seção sobre"
        />
      </motion.div>
    </motion.div>
  );
}
