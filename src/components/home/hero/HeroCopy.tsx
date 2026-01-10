'use client';

import { motion, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useRef } from 'react';
import { useGhostReveal } from '@/hooks/useGhostReveal';
import type { Group } from 'three';
import styles from './HeroCopy.module.css';

/**
 * Animation: Page Load Entry
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

  // Estrutura de conteúdo idêntica para ambas as camadas para garantir alinhamento perfeito
  const renderTextContent = (isMask: boolean) => (
    <div className={isMask ? styles.maskText : styles.baseText}>
      <span className={`block font-body mb-4 ${isMask ? '' : styles.tag}`}>
        [BRAND AWARENESS]
      </span>
      <h1
        className="font-display mb-1 md:mb-6 leading-[0.9] md:leading-tight uppercase"
        style={{ fontSize: 'clamp(3rem, 6vw + 2rem, 8rem)' }}
      >
        A MODERN CREATIVE AGENCY <br className="hidden md:block" />
        FOCUSED ON{' '}
        <span className={isMask ? 'text-white' : 'text-blue-primary'}>
          Ghost
        </span>{' '}
        EXPERIENCE.
      </h1>
      <p
        className={`font-body max-w-2xl mx-auto leading-relaxed md:leading-normal ${isMask ? '' : styles.subText}`}
      >
        Acompanhamos sua marca na era digital através de interfaces etéreas,
        design invisível e tecnologia de ponta.
      </p>
    </div>
  );

  return (
    <motion.div
      {...motionProps}
      className={`relative flex flex-col items-center justify-center text-center max-w-5xl px-4 pointer-events-auto ${styles.root}`}
    >
      {/* Camada 1: Texto Base (Low Opacity) */}
      <motion.div variants={itemAnimation}>
        {renderTextContent(false)}
      </motion.div>

      {/* Camada 2: Texto Revelado (Masked / Bright / Glow) */}
      {!prefersReducedMotion && (
        <div className={styles.maskLayer} aria-hidden="true">
          <div className="max-w-5xl px-4 w-full">
            <motion.div variants={itemAnimation}>
              {renderTextContent(true)}
            </motion.div>
          </div>
        </div>
      )}

      {/* Brilho Global (Aura do Ghost) */}
      <div
        ref={revealRef}
        className="fixed top-0 left-0 w-80 h-80 rounded-full bg-radial from-[#0048ff]/40 to-transparent blur-3xl pointer-events-none mix-blend-screen z-10"
        style={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* CTA Button Layer */}
      <motion.div
        variants={itemAnimation}
        className="mt-8 md:mt-12 relative z-50"
      >
        <a href="#contact" className="cta-button group">
          Começar Projeto
          <div className="icon-circle group-hover:bg-blue-primary/20 transition-colors">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 13L13 1M13 1H4M13 1V10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </a>
      </motion.div>
    </motion.div>
  );
}
