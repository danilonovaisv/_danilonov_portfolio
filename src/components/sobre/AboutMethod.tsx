'use client';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';

import { ABOUT_CONTENT } from '@/config/content';
import { motionTokens } from './motion';
import { kw } from './keywords';

// ... imports remain the same

// Removed local processList

export default function AboutMethod() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { title, intro, steps } = ABOUT_CONTENT.method; // Destructure new content

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 flex flex-col justify-center overflow-hidden bg-(--ghost-bg)"
      aria-label="Como Eu Trabalho"
    >
      {/* Background - Full bleed video with parallax */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y }}
        className="absolute inset-0 z-0 h-[110%] -top-[5%]"
      >
        <video
          src={ABOUT_CONTENT.method.video}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-(--ghost-bg)/40" />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-6 md:px-24">
        <div className="max-w-[560px]">
          <motion.div
            variants={motionTokens.fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-(--ghost-text) tracking-tighter leading-none mb-8">
              {title.text.replace(title.highlight, '')}
              {kw(title.highlight)}
            </h2>
            <div className="text-xl md:text-2xl text-(--ghost-text-secondary) font-light leading-relaxed space-y-2">
              {intro.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-y-10">
            {steps.map((item, i) => (
              <motion.div
                key={i}
                variants={motionTokens.riseSoft}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 border-t border-white/10 pt-6"
              >
                <span className="font-mono text-[#0057FF] text-base font-bold">
                  0{i + 1}
                </span>
                <p className="text-lg md:text-xl text-(--ghost-text-secondary) font-light">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
