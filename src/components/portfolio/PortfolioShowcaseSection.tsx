'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { GHOST_EASE } from '@/lib/motionTokens';
import { PortfolioCardParallax } from './PortfolioCardParallax';
import type { PortfolioProject } from '@/types/project';

interface PortfolioShowcaseSectionProps {
  projects: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
}

/**
 * Portfolio Showcase Section (Portfolio Page)
 * Grid de projetos com animações de parallax e overlays (Finch Style)
 */
export default function PortfolioShowcaseSection({ projects, onProjectSelect }: PortfolioShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = !!useReducedMotion();

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative w-full bg-background pt-10 pb-20 lg:pb-32"
      aria-labelledby="portfolio-showcase-heading"
    >
      <Container>
        {/* Headline */}
        <motion.header
          initial={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: GHOST_EASE }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2
            id="portfolio-showcase-heading"
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight"
          >
            <span className="text-bluePrimary italic font-light">
              todos os{' '}
            </span>
            <span className="text-white font-bold">projetos</span>
          </h2>
        </motion.header>

        {/* Portfolio Parallax Grid (Finch + CodePen inspired) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-2">
          {projects.map((project, index) => (
            <PortfolioCardParallax
              key={project.id}
              project={project}
              index={index}
              onOpen={onProjectSelect}
              className={project.layout.cols === 'col-span-12' ? 'md:col-span-2 lg:col-span-3' : ''}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
