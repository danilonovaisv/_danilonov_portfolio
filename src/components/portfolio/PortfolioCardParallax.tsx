'use client';

import React, { useRef } from 'react';
import type { KeyboardEvent, MouseEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { PortfolioProject } from '@/types/project';
import { BRAND } from '@/config/brand';
import { applyImageFallback, isVideo } from '@/utils/utils';

interface PortfolioCardParallaxProps {
  project: PortfolioProject;
  index: number;
  onOpen?: (_project: PortfolioProject) => void;
  className?: string;
}

export const PortfolioCardParallax: React.FC<PortfolioCardParallaxProps> = ({ 
  project, 
  index,
  onOpen,
  className = ''
}) => {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  // Parallax effect logic (CodePen inspired but using Framer Motion for performance)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax value: image moves inside the container
  // range is slightly larger than container (135% height)
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

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

  return (
    <motion.div 
      ref={cardRef}
      className={`parallax-card item group relative overflow-hidden h-[450px] cursor-pointer ${project.layout.cols ?? ''} ${className}`}
      onClick={handleNavigate}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          handleNavigate(event);
        }
      }}
      aria-label={`Ver projeto: ${project.title}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <figure className="h-full w-full relative">
        <div className="card-image-wrapper absolute inset-0 h-[140%] w-full -top-[20%]">
          <motion.div 
            style={{ y: prefersReducedMotion ? 0 : y }} 
            className="h-full w-full relative"
          >
            {isVideo(project.image) ? (
              <video
                src={project.image}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                fill
                priority={index < 4}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={applyImageFallback}
              />
            )}
          </motion.div>
        </div>
        
        {/* Info Overlay - Based on Finch/HTML Reference */}
        <div className="text-overlay absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-center justify-center p-8 backdrop-blur-[2px]">
          <div className="info transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <span className="block text-white text-xs md:text-sm uppercase tracking-[0.2em] mb-2 font-mono" style={{ color: BRAND.colors.blueAccent }}>
              {project.displayCategory}
            </span>
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-wider font-outfit">
              {project.title}
            </h2>
          </div>
        </div>
      </figure>
    </motion.div>
  );
};

export default PortfolioCardParallax;
