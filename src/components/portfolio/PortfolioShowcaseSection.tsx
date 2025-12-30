'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import AccordionRow from './AccordionRow';
import { PrimaryButton } from '../shared/PrimaryButton';

export type CategoryConfig = {
  id: string;
  titleDesktop: string;
  titleMobile: string;
  align: 'start' | 'center' | 'end';
};

const CATEGORIES: CategoryConfig[] = [
  {
    id: 'brand-campaigns',
    titleDesktop: 'Brand & Campaigns',
    titleMobile: 'Brand & Campaigns',
    align: 'end',
  },
  {
    id: 'videos-motion',
    titleDesktop: 'Videos & Motion',
    titleMobile: 'Videos & Motion',
    align: 'center',
  },
  {
    id: 'websites-tech',
    titleDesktop: 'Web Campaigns,\nWebsites & Tech',
    titleMobile: 'Websites & Tech',
    align: 'start',
  },
];

export default function PortfolioShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-30% 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      aria-label="Portfolio Categories"
      className="bg-[#F4F5F7] py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        {/* Floating Label - Desktop Only */}
        <div className="pointer-events-none hidden md:block">
          <span className="absolute left-[clamp(24px,5vw,96px)] -top-10 font-mono text-[11px] uppercase tracking-[0.24em] text-[#0057FF] mix-blend-difference">
            [what we love working on]
          </span>
        </div>

        {/* Headline Centralizada */}
        <h2 className="mb-14 text-center text-4xl font-bold md:mb-20 md:text-6xl">
          portfólio showcase
        </h2>

        {/* Accordion Rows */}
        <motion.div
          className="flex flex-col gap-10 md:gap-14"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {CATEGORIES.map((category, index) => (
            <AccordionRow
              key={category.id}
              category={category}
              alignment={category.align}
              index={index}
              parentInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
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
