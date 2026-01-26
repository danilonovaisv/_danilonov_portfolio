'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PortfolioProject } from '@/types/project';
import { useParallaxCard } from '@/hooks/useParallaxCard';

interface ProjectCardProps {
  project: PortfolioProject;
  onClick?: (_project: PortfolioProject) => void;
  className?: string;
  priority?: boolean;
}

export const ProjectCard = ({
  project,
  onClick,
  className = '',
  priority = false,
}: ProjectCardProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { y } = useParallaxCard(containerRef);

  return (
    <div
      ref={containerRef}
      className={`group relative w-full overflow-hidden bg-black ${className} aspect-3/4`}
    >
      {/* Parallax Image Wrapper */}
      <motion.div
        style={{ y }}
        className="absolute -top-[17.5%] left-0 h-[135%] w-full will-change-transform"
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          priority={priority}
        />
      </motion.div>

      {/* Overlay */}
      <div 
        onClick={() => onClick?.(project)}
        className="absolute inset-0 z-10 flex cursor-pointer flex-col justify-end bg-linear-to-t from-black/80 via-black/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-accent">
            {project.client} — {project.year}
          </p>
          <h3 className="font-display text-2xl font-bold text-white md:text-3xl">
            {project.title}
          </h3>
          {project.tags && (
             <div className="mt-2 flex gap-2">
                {project.tags.slice(0, 2).map(tag => (
                   <span key={tag} className="text-[10px] text-gray-300 border border-white/20 px-2 py-0.5 rounded-full">
                      {tag}
                   </span>
                ))}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
