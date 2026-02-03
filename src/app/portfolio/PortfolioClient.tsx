'use client';

import { useMemo } from 'react';
import type { PortfolioProject } from '@/types/project';
import PortfolioHeroNew from '@/components/portfolio/PortfolioHeroNew';
import { SiteClosure } from '@/components/layout/SiteClosure';
import { mapPortfolioProjectsToGrid } from '@/lib/portfolio/grid-project-mapper';
import { PortfolioSection } from '@/components/portfolio/portfolio-grid/PortfolioSection';

type PortfolioClientProps = {
  projects: PortfolioProject[];
};

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const gridProjects = useMemo(
    () => mapPortfolioProjectsToGrid(projects),
    [projects]
  );

  return (
    <div className="min-h-screen bg-background text-text">
      <PortfolioHeroNew />
      <PortfolioSection projects={gridProjects} />
      <SiteClosure />
    </div>
  );
}
