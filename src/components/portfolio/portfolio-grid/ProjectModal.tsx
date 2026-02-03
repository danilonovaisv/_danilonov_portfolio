'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Project } from '@/types/portfolio-grid';
import { usePortfolioModalStore } from '@/store/portfolio-modal.store';
import { cn } from '@/lib/utils';

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const panelVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const openInNewTab = (url?: string) => {
  if (!url || typeof window === 'undefined') return;
  try {
    const target = new URL(url, window.location.origin);
    window.open(target.toString(), '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.warn('[PortfolioModal] URL inválida ignorada', error);
  }
};

type ProjectModalProps = {
  project?: Project | null;
  isOpen?: boolean;
  onClose?: () => void;
};

/**
 * ProjectModal - viewer de detalhes com AnimatePresence + layoutId
 * Controlado pelo Zustand store por padrão, mas aceita props para testes.
 */
export function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  const storeIsOpen = usePortfolioModalStore((state) => state.isOpen);
  const storeProject = usePortfolioModalStore((state) => state.project);
  const storeClose = usePortfolioModalStore((state) => state.close);

  const open = isOpen ?? storeIsOpen;
  const currentProject = project ?? storeProject;
  const close = onClose ?? storeClose;

  useEffect(() => {
    if (!open) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && currentProject && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4 py-6 sm:px-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.div
            className={cn(
              'relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10',
              'bg-slate-950/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]'
            )}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr]">
              <div className="relative aspect-[4/3] lg:aspect-[5/4] overflow-hidden">
                {currentProject.thumbnailUrl && (
                  <motion.div layoutId={`project-card-${currentProject.id}`} className="h-full w-full">
                    <Image
                      src={currentProject.thumbnailUrl}
                      alt={currentProject.title}
                      fill
                      sizes="(min-width: 1280px) 50vw, 100vw"
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  {currentProject.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <motion.h3
                      id="project-modal-title"
                      layoutId={`project-title-${currentProject.id}`}
                      className="text-2xl sm:text-3xl font-semibold leading-tight text-white"
                    >
                      {currentProject.title}
                    </motion.h3>
                    <p className="mt-2 text-sm text-white/70">{currentProject.description}</p>
                  </div>

                  <button
                    type="button"
                    onClick={close}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent"
                    aria-label="Fechar modal de projeto"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-sm text-white/80">
                  <p className="leading-relaxed">{currentProject.details.body}</p>
                  {currentProject.details.richContent}
                </div>

                {currentProject.details.highlights?.length ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Destaques
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/80">
                      {currentProject.details.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                        >
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blueAccent" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {currentProject.details.gallery?.length ? (
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
                      Gallery
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {currentProject.details.gallery.map((item) => (
                        <div
                          key={item.src}
                          className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10"
                        >
                          <Image
                            src={item.src}
                            alt={item.alt ?? currentProject.title}
                            fill
                            sizes="(min-width: 1280px) 25vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-auto flex flex-wrap gap-3">
                  {currentProject.details.links?.map((link) => (
                    <button
                      key={link.url}
                      type="button"
                      onClick={() => openInNewTab(link.url)}
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent"
                    >
                      {link.label}
                      <span aria-hidden>↗</span>
                    </button>
                  ))}

                  {currentProject.landingPageUrl && (
                    <button
                      type="button"
                      onClick={() => openInNewTab(currentProject.landingPageUrl)}
                      className="inline-flex items-center gap-2 rounded-full border border-blueAccent/60 bg-blueAccent/10 px-4 py-2 text-sm font-semibold text-blueAccent transition hover:bg-blueAccent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blueAccent"
                    >
                      Abrir landing
                      <span aria-hidden>↗</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
