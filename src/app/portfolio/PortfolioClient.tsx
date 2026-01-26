'use client';

import { useCallback, useState } from 'react';
import type { PortfolioProject } from '@/types/project';
import PortfolioHeroNew from '@/components/portfolio/PortfolioHeroNew';
import { PortfolioShowcaseSection } from '@/components/portfolio/PortfolioShowcaseSection';
import PortfolioModalNew from '@/components/portfolio/PortfolioModalNew';
import { SiteClosure } from '@/components/layout/SiteClosure';
import type { FC } from 'react';

type ShowcaseProps = {
  projects: PortfolioProject[];
  onProjectSelect: (project: PortfolioProject) => void;
};

// Workaround: ensure TS understands the imported symbol is a React component with props
const Showcase = PortfolioShowcaseSection as unknown as FC<ShowcaseProps>;

type PortfolioClientProps = {
  projects: PortfolioProject[];
};

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handler para abrir o projeto
  const handleOpenProject = useCallback((project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }, []);

  // Handler para fechar o modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Limpa o projeto após a animação de saída (400ms matching transition)
    setTimeout(() => {
      setSelectedProject(null);
    }, 400);
  }, []);

  return (
    <div className="min-h-screen bg-background text-text">
      {/* Hero com video loop */}
      <PortfolioHeroNew />

      {/* Nova Seção de Cards com Animações de Overlay */}
      <Showcase projects={projects} onProjectSelect={handleOpenProject} />

      {/* Modal de Detalhes (Ghost) */}
      <PortfolioModalNew
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Global Closure (Footer Area) */}
      <SiteClosure />
    </div>
  );
}
