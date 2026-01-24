'use client';

import { useParallax } from '@/hooks/useParallax';
// Removed direct import to use props instead
import ProjectCard from './ProjectCard';
import type { PortfolioProject } from '@/types/project';

interface ProjectsGalleryProps {
  projects: PortfolioProject[];
  onProjectSelect: (_project: PortfolioProject) => void;
}

export default function ProjectsGallery({
  projects,
  onProjectSelect,
}: ProjectsGalleryProps) {
  // Lerp Engine Hook
  // trackRef: aplica o transform container fixo
  const { trackRef } = useParallax();

  return (
    <section className="relative w-full z-10">
      {/* 
        Container Fixo (Track)
        O hook useParallax vai:
        1. Calcular a altura deste container
        2. Setar body.height = container.height (para criar scroll nativo)
        3. No scroll, mover este container com transform Y suavizado (Lerp)
      */}
      <div 
        ref={trackRef} 
        className="fixed top-0 left-0 w-full will-change-transform"
      >
        {/* Espaçador para o Hero (assumindo que o Hero tem ~80-100vh) */}
        {/* Ajuste: O Hero faz parte do fluxo do scroll ou é fixo atrás?
            Se for fixo atrás, precisamos de um padding-top enorme.
            Se faz parte do scroll, ele deve estar DENTRO do trackRef.
            
            WORKFLOW SUGGESTION: "Hero Section... Project Gallery". 
            Usually standard scroll means Hero scrolls up. 
            So Hero should be INSIDE this track or BEFORE it.
            
            Se o useParallax move o track baseado em window.scrollY, então TUDO que deve scrollar 
            deve estar dentro do trackRef.
        */}
        
        {/* Adicionamos um padding-top para compensar o Hero se ele for separado. 
            Mas para "Infinite Scroll" geralmente tudo está no track. 
            Vou assumir que esta Galeria começa APÓS o Hero. 
            Se o Hero for fixo (parallax background), a galeria passa por cima.
            Vamos colocar um paddingTop seguro.
        */}
        <div className="pt-[100vh] pb-32">
          
          <div className="std-grid">
            {/* Header da Galeria */}
            <div className="mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
              <h2 className="text-4xl md:text-6xl font-light text-white">
                Selected <span className="text-bluePrimary italic">Works</span>
              </h2>
              <p className="text-textSecondary text-sm md:text-base max-w-md text-right mt-4 md:mt-0">
                Uma curadoria de projetos que exploram a intersecção entre design, tecnologia e narrativa.
              </p>
            </div>

            {/* Grid de Projetos */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 md:gap-y-32">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onOpen={onProjectSelect}
                />
              ))}
            </div>
            
            {/* Footer Área (Spacer) */}
            <div className="h-32 w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
