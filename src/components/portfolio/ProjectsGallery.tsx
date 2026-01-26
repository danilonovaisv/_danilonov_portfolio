// =============================================================================
// ProjectsGallery - Parallax LERP Grid (CodePen reference)
// =============================================================================

'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { PortfolioProject, ProjectCategory } from '@/types/project';

import { filterProjectsByCategory } from '@/data/projects';
import CategoryFilter from './CategoryFilter';
import GalleryCard from './GalleryCard';
import { useLERPScroll } from '@/hooks/useLERPScroll';
import { useCardParallax } from '@/hooks/useCardParallax';

interface ProjectsGalleryProps {
  projects: PortfolioProject[];
  onProjectOpen?: (_project: PortfolioProject) => void;
  showFilter?: boolean;
  maxProjects?: number;
  className?: string;
}

const easing = [0.22, 1, 0.36, 1] as const;

const ProjectsGallery: FC<ProjectsGalleryProps> = ({
  projects,
  onProjectOpen,
  showFilter = true,
  maxProjects,
  className = '',
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const prefersReducedMotion = useReducedMotion();
  const parallaxEnabled = !prefersReducedMotion;
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  // Smooth scroll of the fixed track
  useLERPScroll(trackRef, parallaxEnabled);
  // Individual card parallax
  useCardParallax(cardRefs, parallaxEnabled);

  const filteredProjects = useMemo(() => {
    let filtered = filterProjectsByCategory(projects, activeCategory);
    if (maxProjects) {
      filtered = filtered.slice(0, maxProjects);
    }
    return filtered;
  }, [activeCategory, maxProjects, projects]);

  // Reset refs length whenever the visible list changes to avoid stale nodes
  useEffect(() => {
    cardRefs.current = new Array(filteredProjects.length).fill(null);
  }, [filteredProjects.length]);

  return (
    <main
      id="projects-gallery"
      aria-label="Galeria de Projetos"
      className={`gallery relative z-10 bg-background ${className}`}
    >
      {/* Track fixo que recebe o translateY suavizado */}
      <div
        ref={trackRef}
        className={`gallery-track ${parallaxEnabled ? 'fixed will-change-transform' : 'relative'} inset-x-0 top-0 grid grid-cols-12 gap-1 md:gap-1.5 px-1 md:px-1.5`}
      >
        {showFilter && (
          <div className="col-span-12 flex justify-center md:justify-end py-10 md:py-12 px-1 md:px-3">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easing }}
            >
              <CategoryFilter
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </motion.div>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout={!prefersReducedMotion}
              className="col-span-12 md:col-span-6 lg:col-span-4"
            >
              <GalleryCard
                project={project}
                onProjectSelect={onProjectOpen ?? (() => {})}
                cardRef={(el) => {
                  cardRefs.current[index] = el;
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-12 flex flex-col items-center justify-center py-20 text-center"
          >
            <span className="text-6xl mb-4">🔍</span>
            <h3 className="text-xl font-medium text-white mb-2">
              Nenhum projeto encontrado
            </h3>
            <p className="text-white/60">Tente selecionar outra categoria.</p>
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default ProjectsGallery;
