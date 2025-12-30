'use client';

import type { KeyboardEvent, MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

type ManifestoThumbProps = {
  onDesktopClickAction?: () => void;
};

const MANIFESTO_VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

export default function ManifestoThumb({
  onDesktopClickAction,
}: ManifestoThumbProps) {
  const prefersReducedMotion = useReducedMotion();

  const triggerDesktopClick = (event: MouseEvent | KeyboardEvent) => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 768 && onDesktopClickAction) {
      event.preventDefault();
      onDesktopClickAction();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Assistir manifesto em fullscreen"
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl bg-black/40"
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }
      }
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      onClick={triggerDesktopClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          triggerDesktopClick(event);
        }
      }}
    >
      <motion.video
        src={MANIFESTO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/55 p-2 text-white backdrop-blur-[2px] md:bottom-4 md:right-4 md:p-3">
        <ArrowIcon className="h-3 w-3 -rotate-45 transition-transform duration-500 group-hover:rotate-0 md:h-4 md:w-4" />
      </div>
    </motion.div>
  );
}
