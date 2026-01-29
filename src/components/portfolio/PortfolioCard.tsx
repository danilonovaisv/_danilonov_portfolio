'use client';

import { FC } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { PortfolioProject } from '@/types/project';
import { applyImageFallback, isVideo } from '@/utils/utils';

interface PortfolioCardProps {
  project: PortfolioProject;
  index: number;
  onOpen?: (_project: PortfolioProject) => void;
  className?: string;
}

const defaultTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] } as const;

const overlayVariants: Variants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.25 } },
};

const infoVariants: Variants = {
  rest: { opacity: 0, y: 12 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.25, delay: 0.05 } },
};

const mediaVariants = (prefersReducedMotion: boolean): Variants => ({
  rest: { scale: 1 },
  hover: {
    scale: prefersReducedMotion ? 1 : 1.08,
    transition: defaultTransition,
  },
});

const PortfolioCard: FC<PortfolioCardProps> = ({
  project,
  index: _index,
  onOpen,
  className = '',
}) => {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const handleNavigate = (event?: MouseEvent | KeyboardEvent) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (project.landingPageSlug) {
      router.push(`/projects/${project.landingPageSlug}?from=portfolio`);
      return;
    }

    onOpen?.(project);
  };

  const mediaSizing = `${project.layout.aspectRatio ?? 'aspect-[4/3]'} ${project.layout.height ?? ''}`.trim();

  return (
    <motion.article
      className={`relative block ${project.layout.cols ?? ''} ${className} h-full cursor-pointer`}
      initial="rest"
      animate="rest"
      whileHover="hover"
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleNavigate(event);
        }
      }}
      aria-label={`Ver projeto: ${project.title}`}
    >
      <motion.figure className="relative block overflow-hidden">
        <motion.a
          href={project.landingPageSlug ? `/projects/${project.landingPageSlug}` : '#'}
          className={`relative block w-full overflow-hidden ${mediaSizing}`}
          onClick={handleNavigate}
          aria-label={`Abrir ${project.title}`}
          style={{ cursor: 'pointer' }}
        >
          <motion.div
            className="text-overlay absolute inset-0 flex items-center justify-center bg-black/60"
            variants={overlayVariants}
            transition={defaultTransition}
            style={{ pointerEvents: 'none' }}
          >
            <motion.div
              className="info text-white uppercase tracking-[0.28em] text-xs md:text-sm"
              variants={infoVariants}
            >
              <span className="block text-center">{project.displayCategory}</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0"
            variants={mediaVariants(Boolean(prefersReducedMotion))}
          >
            {isVideo(project.image) ? (
              <video
                src={project.image}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center"
                sizes={
                  project.layout.sizes ??
                  '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                }
                loading="lazy"
                onError={applyImageFallback}
              />
            )}
          </motion.div>
        </motion.a>
      </motion.figure>

      <motion.div
        className="info mt-4 text-left"
        variants={infoVariants}
        transition={{ ...defaultTransition, delay: 0.05 }}
      >
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold uppercase tracking-[0.12em] text-white">
          {project.title}
        </h2>
      </motion.div>
    </motion.article>
  );
};

export default PortfolioCard;
