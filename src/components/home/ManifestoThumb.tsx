'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BRAND } from '@/config/brand';

export default function ManifestoThumb() {
  const reducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);

  // Detecta o tamanho da viewport
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : undefined
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth !== undefined ? viewportWidth < 1024 : false;

  // IntersectionObserver para trigger da animação de entrada
  useEffect(() => {
    if (reducedMotion || !thumbRef.current) {
      setIsVisible(true); // Exibir imediatamente se reducedMotion está ativo
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Animar apenas uma vez
        }
      },
      {
        threshold: 0.1, // Trigger quando 10% do elemento estiver visível
      }
    );

    observer.observe(thumbRef.current);

    return () => observer.disconnect();
  }, [reducedMotion]);

  const enableDesktopMotion = !reducedMotion && !isMobile;
  const enableMobileFade = !reducedMotion && isMobile;

  // Define as animações específicas conforme referência loandbehold.studio
  // ease-in-out = cubic-bezier(0.42, 0, 0.58, 1)
  const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];

  const motionProps = enableDesktopMotion
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 },
        transition: {
          duration: 0.5,
          ease: easeInOut,
        },
        whileHover: { 
          scale: 1.05,
          transition: { duration: 0.5, ease: easeInOut }
        },
      }
    : enableMobileFade
      ? {
          initial: { opacity: 0 },
          animate: isVisible ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.5, ease: easeInOut },
        }
      : { initial: false };

  const motionKey = isMobile
    ? 'manifesto-thumb-mobile'
    : 'manifesto-thumb-desktop';

  const videoSrc = BRAND.video.manifesto;

  // MOBILE → vídeo full abaixo da Hero
  if (isMobile) {
    return (
      <motion.div
        key={motionKey}
        ref={thumbRef}
        {...motionProps}
        className="relative w-full h-[70vh] bg-black overflow-hidden"
      >
        <video
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover"
          aria-label="Manifesto video full"
        />
      </motion.div>
    );
  }

  // DESKTOP → thumb fixa no canto inferior direito
  return (
    <motion.div
      key={motionKey}
      ref={thumbRef}
      {...motionProps}
      className="
        group fixed bottom-8 right-8 z-20
        aspect-video w-[360px]
        overflow-hidden
        rounded-xl
        shadow-[0_30px_90px_rgba(0,0,0,0.45)]
        bg-black
        cursor-pointer
      "
    >
      <video
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="
          h-full w-full object-cover
          transition-transform duration-500 ease-in-out
          group-hover:scale-105
        "
        aria-label="Manifesto thumbnail"
      />

      {/* Gradiente superior sutil */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
    </motion.div>
  );
}
