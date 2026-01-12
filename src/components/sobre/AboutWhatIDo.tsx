'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

import { ABOUT_CONTENT } from '@/config/content';

import { DesktopCard } from './what-i-do/DesktopCard';
import { MobileCard } from './what-i-do/MobileCard';
import { Marquee } from './what-i-do/Marquee';

const MARQUEE_LINE_A = ABOUT_CONTENT.whatIDo.marquee;
const MARQUEE_LINE_B = [...ABOUT_CONTENT.whatIDo.marquee].reverse();

export function AboutWhatIDo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = !!useReducedMotion();

  // Scroll progress para toda a seção (Desktop)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Spring global mais suave: animação editorial e silenciosa
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001,
  });

  const cards = ABOUT_CONTENT.whatIDo.cards;

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#040013] py-16 text-white lg:py-32"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 text-center lg:mb-20">
          <motion.h2
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="font-display text-[2rem] font-black leading-[1.1] tracking-tight text-white lg:text-[4rem]"
          >
            Do <span className="text-[#0048ff]">insight</span> ao{' '}
            <span className="text-[#0048ff]">impacto</span>.
          </motion.h2>
          <motion.p
            initial={
              prefersReducedMotion
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 16 }
            }
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
            className="mt-4 text-base font-medium text-[#a1a3a3] lg:mt-6 lg:text-xl"
          >
            Mesmo quando você não percebe.
          </motion.p>
        </header>
      </div>

      {/* DESKTOP: Cards com animação horizontal full-viewport */}
      {/* DESKTOP: Cards com animação horizontal full-viewport */}
      <div className="hidden lg:block relative w-full overflow-hidden py-8">
        {/* Container flex com GAP REDUZIDO */}
        <div className="flex flex-row flex-nowrap gap-3 items-center justify-center">
          {cards.map((service, index) => (
            <DesktopCard
              key={service.id}
              index={index}
              text={service.text}
              scrollProgress={smoothProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      {/* MOBILE: Barras com entrada e depois seguem scroll normal */}
      {/* MOBILE: Barras com entrada e depois seguem scroll normal */}
      <div className="lg:hidden mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col gap-3 w-full">
          {cards.map((service, index) => (
            <MobileCard
              key={service.id}
              index={index}
              text={service.text}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      {/* Marquee Footer */}
      <div className="mt-10 w-full bg-[#0048ff] py-6 lg:mt-8 lg:py-10">
        {' '}
        {/* Ajustei padding vertical: reduzi lg:py-8 para lg:py-10 ou mantenha py-6 para faixa mais fina */}
        <div className="flex flex-col gap-1 lg:gap-2">
          {' '}
          {/* Reduzi gap entre linhas: de gap-2/gap-4 para gap-1/gap-2 */}
          <Marquee
            items={MARQUEE_LINE_A}
            direction={1}
            baseVelocity={4}
            reducedMotion={prefersReducedMotion}
          />
          <Marquee
            items={MARQUEE_LINE_B}
            direction={-1}
            baseVelocity={4}
            reducedMotion={prefersReducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
