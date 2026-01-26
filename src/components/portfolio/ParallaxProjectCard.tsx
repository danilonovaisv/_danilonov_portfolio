'use client';

import { FC } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { PortfolioProject } from '@/types/project';
import { useParallaxCard } from '@/hooks/useParallaxGallery';
import { useSiteAssetUrl } from '@/hooks/useSiteAssetUrl';

interface ParallaxProjectCardProps {
  project: PortfolioProject;
  onProjectSelect: (project: PortfolioProject) => void;
}

const ParallaxProjectCard: FC<ParallaxProjectCardProps> = ({ project, onProjectSelect }) => {
  const { wrapperRef, cardRef } = useParallaxCard<HTMLDivElement>();
  const imageUrl = useSiteAssetUrl(project.image);

  return (
    <motion.div
      ref={cardRef}
      className="relative h-[400px] overflow-hidden rounded-lg group cursor-pointer"
      onClick={() => onProjectSelect(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onProjectSelect(project)}
      aria-label={`Ver projeto ${project.title}`}
      whileHover="hover"
    >
      <div
        ref={wrapperRef}
        className="absolute top-[-17.5%] left-0 w-full h-[135%] will-change-transform"
      >
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          priority // Assuming these images are important for LCP
        />
      </div>
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <p className="text-white/80">{project.shortDescription}</p>
      </div>
    </motion.div>
  );
};

export default ParallaxProjectCard;
