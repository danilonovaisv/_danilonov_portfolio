'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { PortfolioProject } from '@/types/project';
import { useParallaxElement } from '@/hooks/useParallax';

export interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  onOpen: (_project: PortfolioProject) => void;
}

export default function ProjectCard({
  project,
  index,
  onOpen,
}: ProjectCardProps) {
  // Parallax interno da imagem (Ghost Parallax)
  const { ref: imageRef, style: imageStyle } = useParallaxElement({
    speed: 0.15, // Velocidade sutil
    direction: 'up',
  });

  const isTypeA = project.type === 'A';

  return (
    <motion.div
      layoutId={`card-container-${project.id}`}
      className={`relative group cursor-pointer ${project.layout.cols} mb-12 md:mb-24`}
      onClick={() => onOpen(project)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
    >
      {/* Container da Imagem com Overflow Hidden */}
      <div 
        className={`relative w-full overflow-hidden ${project.layout.height} ${isTypeA ? 'rounded-xs' : 'rounded-sm'}`}
      >
        {/* Imagem com Parallax Interno (135% height para movimento) */}
        <motion.div
          ref={imageRef}
          style={imageStyle}
          className="relative h-[135%] w-full -top-[17.5%]"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={project.isFeatured}
          />
        </motion.div>

        {/* Overlay Hover Ghost */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 backdrop-blur-[2px]" />
        
        {/* Info no Hover */}
        <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-blueAccent text-sm font-light tracking-wider uppercase mb-2">
            {project.displayCategory}
          </span>
          <h3 className="text-white text-3xl font-light italic">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Info Externa (Visível sempre) - Apenas para Type A ou Mobile */}
      <div className="mt-4 flex justify-between items-end opacity-80 group-hover:opacity-100 transition-opacity">
        <div>
          <h3 className="text-white text-lg font-medium">{project.title}</h3>
          <p className="text-textSecondary text-sm">{project.subtitle}</p>
        </div>
        <span className="text-textSecondary text-xs font-mono">
          0{index + 1}
        </span>
      </div>
    </motion.div>
  );
}
