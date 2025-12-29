'use client';

import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { BRAND } from '@/config/brand';

type ManifestoThumbProps = {
  muted?: boolean;
};

export const ManifestoThumb = forwardRef<HTMLVideoElement, ManifestoThumbProps>(
  ({ muted = true }, ref) => {
    const reducedMotion = useReducedMotion();

    return (
      <motion.video
        ref={ref}
        src={BRAND.video.manifesto}
        autoPlay
        muted={muted}
        loop
        playsInline
        className="h-full w-full cursor-pointer object-cover"
        aria-label="Manifesto video presentation"
        whileHover={reducedMotion ? undefined : { scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    );
  }
);

ManifestoThumb.displayName = 'ManifestoThumb';

type HeroVideoThumbProps = {
  scrollProgress: MotionValue<number>;
};

type ThumbState = {
  id: string;
  label: string;
  time: number;
};

// Pivots de progresso para refletir as fases do manifesto no vídeo de referência
const THUMB_STATES: ThumbState[] = [
  { id: 'intro', label: 'Manifesto • Intro', time: 0.5 },
  { id: 'middle', label: 'Manifesto • Meio', time: 3 },
  { id: 'closing', label: 'Manifesto • Clímax', time: 6 },
  { id: 'handoff', label: 'Manifesto • Transition', time: 8 },
];

// Faixas de scroll que disparam cada estado (0 -> 0.2 do hero)
const BREAKPOINTS = [0, 0.05, 0.1, 0.15, 0.2];

export default function HeroVideoThumb({
  scrollProgress,
}: HeroVideoThumbProps) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [metadataReady, setMetadataReady] = useState(false);

  const clampIndex = (value: number) =>
    Math.max(0, Math.min(THUMB_STATES.length - 1, value));

  // Índice derivado do scroll (frames à la referência loandbehold)
  const frameIndex = useTransform(
    scrollProgress,
    BREAKPOINTS,
    [0, 1, 2, 3, 3],
    { clamp: true }
  );

  // Micro movimento (levitação) inspirado na ref
  const thumbScale = useTransform(
    scrollProgress,
    [0, 0.12, 0.25],
    [1, 1.04, 1.08]
  );
  const thumbY = useTransform(scrollProgress, [0, 0.12, 0.25], [0, -6, -10]);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const nextIndex = clampIndex(Math.round(latest));
    setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
  });

  const activeState = useMemo(
    () => THUMB_STATES[activeIndex] ?? THUMB_STATES[0],
    [activeIndex]
  );

  // Sincroniza o frame do vídeo com o estado ativo
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const seekTo = () => {
      try {
        video.currentTime = activeState.time;
        video.pause();
      } catch {
        /* ignore seek errors */
      }
    };

    if (metadataReady) {
      seekTo();
      return;
    }

    const handleLoaded = () => {
      setMetadataReady(true);
      seekTo();
    };

    video.addEventListener('loadedmetadata', handleLoaded, { once: true });
    video.load();

    return () => video.removeEventListener('loadedmetadata', handleLoaded);
  }, [activeState.time, metadataReady]);

  const handleClick = () => {
    const target = document.getElementById('manifesto');
    if (target) {
      target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <motion.div
      className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[1000] cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1 }}
      style={{ scale: thumbScale, y: thumbY }}
      transition={{
        duration: reducedMotion ? 0.15 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              scale: 1.05,
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
            }
      }
      onClick={handleClick}
      aria-label="Pré-visualização do vídeo manifesto"
    >
      <div className="relative h-[140px] w-[200px] md:h-[170px] md:w-[240px] overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform duration-300">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeState.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0.15 : 0.5,
              ease: 'easeInOut',
            }}
          >
            <video
              ref={videoRef}
              src={BRAND.video.manifesto}
              playsInline
              muted
              loop={false}
              controls={false}
              preload="auto"
              className="h-full w-full object-cover"
              aria-label={activeState.label}
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        <div className="pointer-events-none absolute left-3 bottom-3 flex flex-col gap-1">
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            manifesto
          </span>
          <span className="text-xs font-medium text-white/80">
            {activeState.label}
          </span>
        </div>

        <div className="pointer-events-none absolute top-3 left-3 flex gap-1.5">
          {THUMB_STATES.map((state, idx) => {
            const isActive = idx === activeIndex;
            return (
              <span
                key={state.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'w-6 bg-white' : 'w-2 bg-white/35'
                }`}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
