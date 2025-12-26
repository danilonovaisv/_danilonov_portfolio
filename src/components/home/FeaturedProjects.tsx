'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { Project } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Projetos vindos da config
  const projects = HOME_CONTENT.featuredProjects as Project[];

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      aria-label="Featured Projects"
      className="relative py-24 bg-[#F4F5F7] overflow-hidden"
    >
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[92%] xl:max-w-[1680px] relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block text-sm font-mono text-gray-500 mb-2 uppercase tracking-wider">
              Selected Work (2021-2023)
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] tracking-tight">
              Featured Projects
            </h2>
          </div>
          
          <Link 
            href="/portfolio"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#0057FF] transition-colors group"
          >
            View all projects
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Grid Layout - Bento/Mosaic feel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {projects.map((project, index) => {
            // Lógica de Layout para o Grid Irregular
            // Index 0: Esquerda (Vertical/Square)
            // Index 1: Direita (Horizontal)
            // Index 2: Full Width (Cinematic)
            // Index 3: Esquerda (Horizontal)
            
            let gridClass = 'md:col-span-1';
            let aspectClass = 'aspect-[4/3]'; // Default mobile

            if (index === 0) aspectClass = 'aspect-square md:aspect-[0.85/1]'; // Vertical portrait feel
            if (index === 1) aspectClass = 'aspect-video';
            if (index === 2) {
                gridClass = 'md:col-span-2';
                aspectClass = 'aspect-[2/1] md:aspect-[2.4/1]'; // Super wide
            }
            if (index === 3) aspectClass = 'aspect-[16/10]';

            return (
              <ProjectCard 
                key={project.slug} 
                project={project} 
                index={index} 
                className={`${gridClass} ${aspectClass}`}
              />
            );
          })}

          {/* CTA Card - Sempre a última célula */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group relative flex flex-col justify-center items-start text-left p-10 md:p-12 rounded-3xl bg-gray-100 hover:bg-gray-50 border border-transparent hover:border-blue-100 transition-colors duration-500 md:col-span-1 h-full min-h-[300px]"
          >
            {/* Background Glow Sutil */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            
            <div className="relative z-10 flex flex-col items-start gap-6 w-full h-full justify-between">
              <div /> {/* Spacer top */}
              
              <div className="space-y-6">
                <h3 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-[#111111] leading-[0.9]">
                  Like what<br/>you see?
                </h3>

                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0057FF] px-8 py-4 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="text-base font-bold tracking-wide">view projects</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile View All Link (Bottom) */}
        <div className="mt-12 text-center md:hidden">
            <Link 
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 underline underline-offset-4"
          >
            View all projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
