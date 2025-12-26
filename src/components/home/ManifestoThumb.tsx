'use client';

import { useEffect, useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BRAND } from '@/config/brand';

export default function ManifestoThumb() {
  const reducedMotion = usePrefersReducedMotion();
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateViewport = () => setViewportWidth(window.innerWidth);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const isMobile = viewportWidth !== null ? viewportWidth < 1024 : null;
  const enableDesktopMotion = !reducedMotion && isMobile === false;
  const enableMobileFade = !reducedMotion && isMobile === true;

  const motionProps: MotionProps = enableDesktopMotion
    ? {
        initial: {
          scale: 0.25,
          x: '35%',
          y: '30%',
          borderRadius: 16,
        },
        whileInView: {
          scale: 1,
          x: '0%',
          y: '0%',
          borderRadius: 0,
        },
        viewport: { once: true, amount: 0.4 },
        transition: {
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        },
      }
    : enableMobileFade
      ? {
          initial: { opacity: 0.75 },
          whileInView: { opacity: 1 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.35, ease: 'easeOut' },
        }
      : {
          initial: false,
          viewport: { once: true },
        };

  const motionKey =
    isMobile === null ? 'manifesto-thumb-pending' : isMobile ? 'manifesto-thumb-mobile' : 'manifesto-thumb-desktop';

  const handleScrollToManifesto = () => {
    const manifestoSection = document.getElementById('manifesto');
    if (manifestoSection) {
      manifestoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      key={motionKey}
      {...motionProps}
      onClick={handleScrollToManifesto}
      className="
        relative w-full aspect-video
        overflow-hidden
        shadow-[0_30px_90px_rgba(0,0,0,0.45)]
        bg-black
        cursor-pointer
      "
    >
      <video
        src={BRAND.video.manifesto}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="h-full w-full object-cover"
        aria-label="Manifesto thumbnail"
      />

      {/* Overlay de profundidade */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
    </motion.div>
  );
}
