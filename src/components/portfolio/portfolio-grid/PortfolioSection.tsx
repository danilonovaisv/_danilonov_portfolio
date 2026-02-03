'use client';

import { createRef, useCallback, useEffect, useMemo, useRef } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, View, useTexture } from '@react-three/drei';
import { Project } from '@/types/portfolio-grid';
import { Container } from '@/components/layout/Container';
import { ProjectCard } from './ProjectCard';
import { ProjectPlane } from './ProjectPlane';
import { ProjectModal } from './ProjectModal';
import { usePortfolioModalStore } from '@/store/portfolio-modal.store';
import { cn } from '@/lib/utils';

type InteractionState = {
  hover: number;
  tiltX: number;
  tiltY: number;
};

const sanitizeUrl = (url?: string) => {
  if (!url) return null;
  try {
    const base =
      typeof window !== 'undefined' ? window.location.origin : 'https://danilo.dev';
    const parsed = new URL(url, base);
    if (!['http:', 'https:'].includes(parsed.protocol)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
};

type PortfolioSectionProps = {
  projects: Project[];
};

/**
 * PortfolioSection / PortfolioGrid
 * - DOM grid para SEO + acessibilidade
 * - Canvas único com <View /> por card (Option B)
 */
export function PortfolioSection({ projects }: PortfolioSectionProps) {
  const openModal = usePortfolioModalStore((state) => state.open);

  const viewRefs = useMemo(() => {
    const map = new Map<string, RefObject<HTMLDivElement | null>>();
    projects.forEach((project) => {
      map.set(project.id, createRef<HTMLDivElement>());
    });
    return map;
  }, [projects]);

  const interactionRefs = useMemo(() => {
    const map = new Map<string, MutableRefObject<InteractionState>>();
    projects.forEach((project) => {
      map.set(project.id, {
        current: { hover: 0, tiltX: 0, tiltY: 0 },
      });
    });
    return map;
  }, [projects]);

  // Preload textures so View planes render instantly
  useEffect(() => {
    projects.forEach((project) => {
      if (project.thumbnailUrl) {
        useTexture.preload(project.thumbnailUrl);
      }
    });
  }, [projects]);

  const handleCardClick = useCallback(
    (project: Project) => {
      const safeUrl = sanitizeUrl(project.landingPageUrl);
      if (safeUrl) {
        window.open(safeUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      openModal(project);
    },
    [openModal]
  );

  const pattern = [
    'md:col-span-6 lg:col-span-6',
    'md:col-span-6 lg:col-span-6',
    'md:col-span-4 lg:col-span-4',
    'md:col-span-4 lg:col-span-4',
    'md:col-span-4 lg:col-span-4',
    'md:col-span-7 lg:col-span-7',
    'md:col-span-5 lg:col-span-5',
  ];

  return (
    <section
      id="portfolio-grid"
      className="relative overflow-hidden bg-background text-white py-16 sm:py-24"
      aria-labelledby="portfolio-grid-heading"
    >
      <Container className="gap-8">
        <header className="col-span-full flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.22em] text-white/60">
            Projetos em destaque
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <h2
              id="portfolio-grid-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight"
            >
              Portfolio Grid
            </h2>
            <span className="text-sm text-white/60">
              Grid acessível + views 3D com parallax suave
            </span>
          </div>
        </header>

        <div className="col-span-full relative">
          <PortfolioViewsCanvas
            projects={projects}
            viewRefs={viewRefs}
            interactionRefs={interactionRefs}
          />

          <div
            className={cn(
              'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6',
              'auto-rows-[minmax(260px,1fr)]'
            )}
          >
            {projects.map((project, index) => {
              const viewRef = viewRefs.get(project.id);
              const interactionRef = interactionRefs.get(project.id);
              const cols = pattern[index % pattern.length];
              if (!viewRef || !interactionRef) return null;

              return (
                <div
                  key={project.id}
                  className={cn(
                    'col-span-1 sm:col-span-1',
                    cols,
                    'relative'
                  )}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    viewRef={viewRef}
                    interactionRef={interactionRef}
                    onOpen={handleCardClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </Container>

      <ProjectModal />
    </section>
  );
}

type PortfolioViewsCanvasProps = {
  projects: Project[];
  viewRefs: Map<string, RefObject<HTMLDivElement | null>>;
  interactionRefs: Map<string, MutableRefObject<InteractionState>>;
};

const PortfolioViewsCanvas = ({
  projects,
  viewRefs,
  interactionRefs,
}: PortfolioViewsCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        ref={canvasRef}
        dpr={[1, 1.6]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        eventPrefix="client"
        frameloop="always"
      >
        <color attach="background" args={['#05070e']} />
        <ScrollControls pages={1} damping={0.22}>
          <ambientLight intensity={0.65} />
          <directionalLight position={[2, 3, 5]} intensity={1} />
          {projects.map((project) => {
            const track = viewRefs.get(project.id);
            const interactionRef = interactionRefs.get(project.id);
            if (!track || !interactionRef) return null;
            return (
              <View key={project.id} track={track as RefObject<HTMLElement>}>
                <ProjectPlane
                  textureUrl={project.thumbnailUrl}
                  interactionRef={interactionRef}
                />
              </View>
            );
          })}
        </ScrollControls>
      </Canvas>
    </div>
  );
};

// Alias para manter nomenclatura solicitada
export const PortfolioGrid = PortfolioSection;
