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
          x: '20%', // Reduzido para evitar corte excessivo
          y: '20%',
          opacity: 0, // Garante que não apareça "travado" antes de animar
          borderRadius: 24,
        },
        animate: { // Mudado de whileInView para animate
          scale: 1,
          x: '0%',
          y: '0%',
          opacity: 1,
          borderRadius: 0,
        },
        transition: {
          duration: 1.2, // Mais lento e etéreo conforme Lo & Behold
          ease: [0.16, 1, 0.3, 1], // Ajuste fino da curva
          delay: 0.2, // Pequeno delay para permitir renderização inicial
        },
      }
    : enableMobileFade
      ? {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: "-10%" }, // Margem para garantir trigger no mobile
          transition: { duration: 0.6, ease: 'easeOut' },
        }
      : {
          initial: false, // Reduced motion
          animate: { opacity: 1 },
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
