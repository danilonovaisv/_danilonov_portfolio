'use client';

import { useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { GHOST_EASE } from '@/lib/motionTokens';
import PortfolioMosaicGrid from './PortfolioMosaicGrid';
import type { MosaicRow } from './types';
import type { PortfolioProject } from '@/types/project';

interface PortfolioShowcaseSectionProps {
  projects?: PortfolioProject[];
  onProjectSelect?: (_project: PortfolioProject) => void;
}

/**
 * Portfolio Showcase Section (Portfolio Page)
 * Grid de projetos com filtros e animações
 */
export default function PortfolioShowcaseSection({ projects }: PortfolioShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = !!useReducedMotion();

  // If projects are passed, map them to mosaic rows; otherwise, fallback to mock rows
  const rows = useMemo<MosaicRow[]>(() => {
    if (projects && projects.length > 0) {
      // Simple mapping: group projects into rows of 2 for the mosaic grid
      const grouped: MosaicRow[] = [];
      for (let i = 0; i < projects.length; i += 2) {
        grouped.push({
          id: `row-${i / 2}`,
          columns: 2,
          items: projects.slice(i, i + 2).map((p) => ({
            id: String(p.id),
            gradient: 'from-gray-700 to-gray-900',
            title: p.title,
            subtitle: p.client || '',
          })),
        });
      }
      return grouped;
    }

    return [
      {
        id: 'row-1',
        columns: 2,
        items: [
          {
            id: 'placeholder-1',
            gradient: 'from-blue-600 to-blue-900',
            title: 'Projeto em Destaque',
            subtitle: 'Branding & Design',
          },
          {
            id: 'placeholder-2',
            gradient: 'from-purple-600 to-purple-900',
            title: 'Creative Development',
            subtitle: 'Web & Tech',
          },
        ],
      },
    ];
  }, [projects]);

  return (
    <section
      id="portfolio-showcase"
      ref={sectionRef}
      className="relative w-full bg-background py-20 lg:py-32"
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
          className="text-center mb-10 lg:mb-14"
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

        {/* Portfolio Grid */}
        <PortfolioMosaicGrid rows={rows} />
      </Container>
    </section>
  );
}
