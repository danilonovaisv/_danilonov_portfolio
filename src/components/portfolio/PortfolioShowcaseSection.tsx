'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { CompoundPillCTA } from '@/components/ui/CompoundPillCTA';
import AccordionRow from './AccordionRow';

export type CategoryConfig = {
  id: string;
  titleDesktop: string;
  titleMobile: string;
  align: 'start' | 'center' | 'end';
};

export default function PortfolioShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-30% 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="portfolio-showcase"
      aria-label="Portfolio Categories"
      className="bg-background py-24 md:py-32 relative overflow-hidden"
    >
      <div className="mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">

        <div className="relative">
          {/* Floating Label - Desktop Only - Alinhado ao primeiro item */}
          <div className="pointer-events-none absolute left-0 top-[18px] hidden md:block z-20">
            <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#4fe6ff]">
              [what we love working on]
            </span>
          </div>

          {/* Accordion Rows */}
          <motion.div
            className="flex flex-col border-b border-[#0057FF]/30"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
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
        </div>

        {/* CTA Centralizado - Estilo Compound Pill Standard */}
        <CompoundPillCTA 
          href="/portfolio" 
          label="let's build something great" 
        />
      </div>
    </section>
  );
}
