'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import type { PortfolioProject } from '@/types/project';
import { useSiteAssetUrl } from '@/hooks/useSiteAssetUrl';

type GalleryCardProps = {
  project: PortfolioProject;
  cardRef: (_el: HTMLDivElement | null) => void;
  onProjectSelect: (_project: PortfolioProject) => void;
};

export function GalleryCard({ project, cardRef, onProjectSelect }: GalleryCardProps) {
  const imageUrl = useSiteAssetUrl(project.image);

  const sizes = useMemo(
    () =>
      project.layout?.sizes ||
      '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
    [project.layout?.sizes]
  );

  return (
    <div
      ref={cardRef}
      className="h-[400px] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      role="button"
      tabIndex={0}
      aria-label={`Ver projeto ${project.title}`}
      onClick={() => onProjectSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onProjectSelect(project);
        }
      }}
    >
      <div className="relative h-[135%] card-image-wrapper motion-safe:will-change-transform">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          sizes={sizes}
          priority={project.isFeatured}
        />
      </div>
    </div>
  );
}

export default GalleryCard;
