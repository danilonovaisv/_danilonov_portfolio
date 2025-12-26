'use client';

import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, index, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className={`group relative flex flex-col w-full ${className}`}
    >
      <Link href={`/portfolio/${project.slug}`} className="block w-full">
        {/* Imagem Container */}
        <div className="relative overflow-hidden rounded-2xl w-full mb-5 transition-all duration-500 transform group-hover:scale-[1.01] group-hover:shadow-2xl group-hover:shadow-blue-900/10">
          
          {/* Tags (Top Right) */}
          <div className="absolute top-4 right-4 z-20">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-medium text-gray-900 shadow-sm border border-white/20">
              {project.category || 'Case'}
            </span>
          </div>

          <div className="relative w-full aspect-[4/3] md:aspect-auto h-full"> 
            {/* Aspect ratio será controlado pelo container pai ou classes utilitárias na imagem se necessário, 
                mas para garantir flexibilidade vamos deixar o aspect-ratio ser definido pelas classes passadas ou o padrão */}
             <div className="w-full h-full relative">
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
             </div>
          </div>
          
          {/* Overlay suave no hover para profundidade */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Footer Info */}
        <div className="flex items-end justify-between gap-4 px-1">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg md:text-xl font-bold text-[#111111] leading-tight group-hover:text-[#0057FF] transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-sm text-gray-500 font-medium">
              {project.client}
            </span>
          </div>

          {/* Botão Circular Azul */}
          <div className="shrink-0 w-10 h-10 rounded-full bg-[#0057FF] flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-15deg]">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
