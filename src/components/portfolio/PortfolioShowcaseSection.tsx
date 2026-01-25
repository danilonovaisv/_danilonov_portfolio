// =============================================================================
// PortfolioShowcaseSection - Ghost Era v2.0
// Cards animados com overlay hover inspirado em referência CodePen
// =============================================================================

'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import CategoryFilter from './CategoryFilter';
import type { PortfolioProject, ProjectCategory } from '@/types/project';

// Ghost Design System easing
const GHOST_EASE = [0.22, 1, 0.36, 1] as const;

interface PortfolioShowcaseSectionProps {
  projects: PortfolioProject[];
  onProjectSelect: (_project: PortfolioProject) => void;
}

const PortfolioShowcaseSection: React.FC<PortfolioShowcaseSectionProps> = ({
  projects,
  onProjectSelect,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  // Filtra os itens com base na categoria ativa
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  // Handler para abrir projeto
  const handleProjectClick = useCallback(
    (project: PortfolioProject) => {
      onProjectSelect(project);
    },
    [onProjectSelect]
  );

  return (
    <section
      className="relative bg-background py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8"
      aria-labelledby="showcase-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: GHOST_EASE }}
          className="text-center mb-12 md:mb-16"
        >
          <h2
            id="showcase-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Projetos <span className="text-primary">em Destaque</span>
          </h2>
          <p className="text-base md:text-lg text-white/60 max-w-2xl mx-auto">
            Uma seleção cuidadosa dos nossos trabalhos mais impactantes e
            inovadores.
          </p>
        </motion.div>

        {/* Filtro de Categorias */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: GHOST_EASE, delay: 0.1 }}
          className="flex justify-center mb-10 md:mb-14"
        >
          <CategoryFilter
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </motion.div>

        {/* Grid de Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project, index) => (
              <ShowcaseCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => handleProjectClick(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Estado vazio */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/50 text-lg">
              Nenhum projeto encontrado nesta categoria.
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: GHOST_EASE, delay: 0.2 }}
          className="mt-16 md:mt-24 text-center"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            Vamos trabalhar <span className="text-primary">juntos?</span>
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-full text-white bg-primary hover:bg-primary-hover shadow-[0_0_24px_rgba(0,72,255,0.4)] hover:shadow-[0_0_32px_rgba(0,72,255,0.6)] transition-all duration-300"
            >
              Entrar em Contato
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// =============================================================================
// ShowcaseCard - Card individual com animações de overlay
// =============================================================================

interface ShowcaseCardProps {
  project: PortfolioProject;
  index: number;
  onClick: () => void;
}

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({
  project,
  index,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determinar aspect ratio baseado no tipo
  const aspectClass = project.type === 'A' ? 'aspect-[4/5]' : 'aspect-[1/1]';

  return (
    <motion.article
      layoutId={`showcase-card-${project.id}`}
      className={`relative group overflow-hidden rounded-2xl cursor-pointer ${aspectClass} bg-black/20`}
      initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
      transition={{
        duration: 0.5,
        ease: GHOST_EASE,
        delay: index * 0.05,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Ver projeto: ${project.title}`}
    >
      {/* Imagem de Fundo */}
      <div className="absolute inset-0">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading="lazy"
        />
      </div>

      {/* Overlay Gradiente Base */}
      <motion.div
        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: isHovered ? 0.95 : 0.7 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Overlay de Blur no Hover */}
      <motion.div
        className="absolute inset-0 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Conteúdo do Card - Sempre Visível */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
        {/* Tag de Categoria */}
        <motion.span
          className="inline-flex self-start items-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 text-[10px] md:text-xs font-medium uppercase tracking-wide text-white/80 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: GHOST_EASE, delay: 0.1 }}
        >
          {project.displayCategory}
        </motion.span>

        {/* Título */}
        <motion.h3
          className="text-xl md:text-2xl lg:text-3xl font-bold text-white leading-tight mb-1"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -4 : 0 }}
          transition={{ duration: 0.4, ease: GHOST_EASE }}
        >
          {project.title}
        </motion.h3>

        {/* Subtítulo */}
        <motion.p
          className="text-sm md:text-base text-white/70"
          initial={{ opacity: 0.7, y: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0.7,
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.4, ease: GHOST_EASE, delay: 0.05 }}
        >
          {project.subtitle || `${project.client} · ${project.year}`}
        </motion.p>

        {/* Botão "Ver Projeto" - Aparece no hover */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 16,
          }}
          transition={{ duration: 0.4, ease: GHOST_EASE, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-medium text-white border border-white/30 rounded-full hover:bg-white/10 transition-colors duration-200">
            Ver Projeto
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </motion.div>
      </div>

      {/* Glow Effect no Hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${project.accentColor || '#0048ff'}20, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />

      {/* Focus Ring */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-primary ring-offset-2 ring-offset-background opacity-0 group-focus-visible:opacity-100 transition-opacity pointer-events-none" />
    </motion.article>
  );
};

export default PortfolioShowcaseSection;
