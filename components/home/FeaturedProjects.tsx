'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '../../lib/constants';
import { ArrowUpRight } from 'lucide-react';
import ProjectsGrid from '../ui/ProjectsGrid';
import ProjectCard from '../ui/ProjectCard';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      className="relative py-24 bg-[#F4F5F7] overflow-hidden"
    >
      {/* 
        Ajuste de container: 
        O ProjectsGrid já tem max-w-7xl e mx-auto. 
        Precisamos apenas garantir o padding lateral do wrapper ou passar padding para ob grid.
      */}
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* Usando o Componente Grid Reutilizável */}
        <ProjectsGrid className="grid-cols-1 md:grid-cols-2 xl:grid-cols-2"> 
          {/* Override temporário para manter o layout 2 colunas como no design original desta seção específica, se desejado.
              O ProjectsGrid padrão tem xl:grid-cols-3. O FeaturedProjects original era md:grid-cols-2.
              Vou passar className para forçar o layout original de Featured se for estrito, 
              mas o requisito diz "Desktop: 2-3 colunas". Vou deixar o padrão do componente (3 cols xl) 
              OU forçar 2 cols se for para manter fidelidade exata ao "Featured".
              Dado que temos 4 itens (3 projetos + 1 CTA), 2 colunas fariam mais sentido para ficar simétrico (2x2).
              Vou forçar 2 colunas no desktop para esta seção específica.
          */}
          
          {FEATURED_PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              className={project.isHero ? 'md:col-span-2' : ''}
              priority={index === 0}
            />
          ))}

          {/* Bloco "Like what you see?" - Usando motion div diretamente pois é um card customizado */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center items-center text-center min-h-[400px] md:col-span-1"
          >
            <h3 className="text-4xl md:text-5xl font-light text-[#111111] mb-8 leading-tight">
              Like what
              <br />
              you see?
            </h3>

            <motion.a
              href="/portfolio"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 text-white shadow-xl hover:shadow-[#0057FF]/40 transition-all duration-300"
            >
              <span className="text-lg font-bold tracking-wide">
                view projects
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-[#0057FF] transition-colors duration-300">
                <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#0057FF]" />
              </span>
            </motion.a>
          </motion.div>

        </ProjectsGrid>
      </div>
    </section>
  );
};

export default FeaturedProjects;

