'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import AccordionRow from './AccordionRow';
import { PrimaryButton } from '../shared/PrimaryButton';

export type CategoryConfig = {
  id: string;
  titleDesktop: string;
  titleMobile: string;
  align: 'start' | 'center' | 'end';
};

export default function PortfolioShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20% 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="portfolio-showcase"
      aria-label="Portfolio Categories"
      className="bg-[#F4F5F7] py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        {/* Floating Label - Desktop Only */}
        <div className="pointer-events-none absolute left-[clamp(24px,5vw,96px)] top-0 hidden -translate-y-12 md:block lg:-translate-y-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#0057FF] mix-blend-difference">
            [what we love working on]
          </span>
        </div>

        {/* Headline Centralizada */}
        <h2 className="mb-14 text-center text-4xl font-bold md:mb-20 md:text-7xl">
          portfólio <span className="text-[#5227FF]">showcase</span>
        </h2>

        {/* Accordion Rows */}
        <motion.div
          className="flex flex-col gap-0"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {HOME_CONTENT.showcase.categories.map((category, index) => (
            <AccordionRow
              key={category.id}
              category={{
                id: category.id,
                titleDesktop: category.label,
                titleMobile: category.labelMobile || category.label,
                align: category.align as 'start' | 'center' | 'end',
              }}
              alignment={category.align as 'start' | 'center' | 'end'}
              index={index}
              parentInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
              thumb={category.thumb}
            />
          ))}
        </motion.div>

        {/* CTAs Aspiracionais */}
        <div className="mt-20 flex flex-col items-center gap-6 md:flex-row md:justify-center">
          <PrimaryButton href="/portfolio" variant="outline">
            Ver todos os projetos →
          </PrimaryButton>
          <PrimaryButton href="/#contact" variant="solid">
            let&apos;s build something great →
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
