'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { ABOUT_CONTENT } from '@/config/content';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

const cardRise = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={containerRef}
      className="relative bg-ghost-surface-deep overflow-hidden"
      aria-label="Como Eu Trabalho"
    >
      {/* Background Video - Desktop Full Bleed */}
      <div className="hidden lg:block absolute inset-0 z-0">
        <video
          src={ABOUT_CONTENT.method.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center"
          aria-hidden="true"
        />
        {/* Overlay: Darker on Left for text readability, Lighter on Right for visual */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0b0d26]/95 via-[#0b0d26]/80 to-[#0b0d26]/40" />
      </div>

      {/* Mobile Video Top (40vh) */}
      <div className="relative h-[40vh] w-full lg:hidden z-0">
        <video
          src={ABOUT_CONTENT.method.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-ghost-surface-deep pointer-events-none" />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-start">
          {/* Content (Left) - Desktop: Col 2-7 */}
          <div className="lg:col-start-2 lg:col-span-6 px-6 md:px-12 py-16 md:py-24 lg:py-32">
            <div className="max-w-[720px]">
              {/* Títulos */}
              <motion.div
                variants={fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="mb-8 md:mb-10"
              >
                <h2 className="text-3xl md:text-4xl lg:text-[52px] font-bold text-[#fcffff] tracking-tight leading-[1.15] mb-3">
                  <span className="text-primary">Criatividade</span> com{' '}
                  <span className="text-primary">método</span>.
                  <br />
                  <span className="text-white">Impacto</span> sem{' '}
                  <span className="opacity-60">ruído</span>.
                </h2>
              </motion.div>

              {/* Texto introdutório */}
              <motion.div
                variants={fadeGhost}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="text-lg md:text-xl text-ghost-text-secondary font-light leading-relaxed space-y-3 mb-10 md:mb-14 max-w-[520px]"
              >
                {ABOUT_CONTENT.method.intro.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </motion.div>

              {/* Steps List */}
              <div className="space-y-4">
                {ABOUT_CONTENT.method.steps.map((step, i) => (
                  <motion.div
                    key={i}
                    variants={cardRise}
                    initial={prefersReducedMotion ? 'visible' : 'hidden'}
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.08 }}
                    className="group flex items-start gap-4 bg-[#1a1a2e]/70 backdrop-blur-sm border-l-3 border-l-primary p-5 md:p-6 rounded-lg hover:translate-x-1 transition-all duration-300"
                  >
                    <span className="font-mono text-primary text-base font-bold tracking-tight shrink-0 mt-0.5">
                      0{i + 1}
                    </span>
                    <p className="text-base md:text-lg text-white font-light transition-colors duration-300">
                      {step}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Visual Area (Desktop only - Empty col to show video) */}
          <div className="hidden lg:block lg:col-span-5 h-full min-h-[50vh]" />
        </div>
      </div>
    </section>
  );
}
