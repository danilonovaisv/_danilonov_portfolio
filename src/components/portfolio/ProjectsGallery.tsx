// =============================================================================
// ProjectsGallery - Parallax LERP Version
// Recreates the gallery with a fixed grid and smooth scroll effect.
// =============================================================================

'use client';

import { FC, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { PortfolioProject, ProjectCategory } from '@/types/project';

import { filterProjectsByCategory } from '@/data/projects';
import { useLERPGalleryScroll } from '@/hooks/useParallaxGallery';
import CategoryFilter from './CategoryFilter';
import ParallaxProjectCard from './ParallaxProjectCard';
import { Container } from '@/components/layout/Container';

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
  
  // Hook for the smooth scrolling gallery effect
  const trackRef = useLERPGalleryScroll<HTMLDivElement>();

  const filteredProjects = useMemo(() => {
    let filtered = filterProjectsByCategory(projects, activeCategory);
    if (maxProjects) {
      filtered = filtered.slice(0, maxProjects);
    }
    return filtered;
  }, [activeCategory, maxProjects, projects]);

  // The main gallery container needs the 'gallery' class for the hook to find it.
  // It acts as a scrollable area.
  return (
    <section
      id="projects-gallery"
      aria-label="Galeria de Projetos"
      className={`gallery relative z-10 bg-background ${className}`}
    >
      {/* 
        The track is a fixed element that moves with the scroll.
        The parent 'gallery' section has its height set by the hook to match the track's height,
        creating the scrollable area.
      */}
      <div
        ref={trackRef}
        className={`w-full will-change-transform ${prefersReducedMotion ? '' : 'fixed top-0 left-0'}`}
      >
        <Container>
          {/* Header with filters */}
          {showFilter && (
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: easing }}
              className="flex justify-center md:justify-end my-16 md:my-24"
            >
              <CategoryFilter
                activeCategory={activeCategory}
                onChange={setActiveCategory}
              />
            </motion.div>
          )}

          {/* Grid of projects */}
          <motion.div
            layout={!prefersReducedMotion}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ParallaxProjectCard
                  key={project.id}
                  project={project}
                  onProjectSelect={onProjectOpen!}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <span className="text-6xl mb-4">🔍</span>
              <h3 className="text-xl font-medium text-white mb-2">
                Nenhum projeto encontrado
              </h3>
              <p className="text-white/60">
                Tente selecionar outra categoria.
              </p>
            </motion.div>
          )}
        </Container>
      </div>
    </section>
  );
};

export default ProjectsGallery;
