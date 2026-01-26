'use client';

import { useRef, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { GHOST_EASE } from '@/lib/motionTokens';
import PortfolioMosaicGrid from './PortfolioMosaicGrid';
import type { MosaicRow } from './types';

/**
 * Portfolio Showcase Section (Portfolio Page)
 * Grid de projetos com filtros e animações
 */
export default function PortfolioShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = !!useReducedMotion();

  // Mock data para exemplo - em produção, seria passado via props
  const rows = useMemo<MosaicRow[]>(() => {
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
  }, []);

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
