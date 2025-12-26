'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BRAND } from '@/config/brand';

interface ManifestoThumbProps {
  heroRef?: RefObject<HTMLElement | null>;
}

export default function ManifestoThumb({ heroRef }: ManifestoThumbProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Detecta o tamanho da viewport para interpolação numérica precisa
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  }));

  useEffect(() => {
    const handleResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    // Force initial update just in case
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = dimensions.width < 1024;

  // ==========================================
  // 🎬 SCROLL-DRIVEN ANIMATION (Desktop only)
  // ==========================================
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Mapeamento Numérico com Scroll Staging (Delay)
  // [0, 0.25] -> Expand (Quickly)
  // [0.25, 0.85] -> Hold Full Screen (The Delay)
  // [0.85, 0.95] -> Fade Out
  const widthRaw = useTransform(
    scrollYProgress,
    [0, 0.25],
    [360, dimensions.width]
  );
  const heightRaw = useTransform(
    scrollYProgress,
    [0, 0.25],
    [200, dimensions.height]
  );
  const rightRaw = useTransform(scrollYProgress, [0, 0.25], [48, 0]);
  const bottomRaw = useTransform(scrollYProgress, [0, 0.25], [40, 0]);
  const radiusRaw = useTransform(scrollYProgress, [0, 0.25], [12, 0]);

  // Opacidade: Mantém visível (1) para transição natural de scroll
  const opacityRaw = useTransform(scrollYProgress, [0, 1], [1, 1]);

  // Suavização
  const springConfig = { stiffness: 200, damping: 30 };
  const smoothWidth = useSpring(widthRaw, springConfig);
  const smoothHeight = useSpring(heightRaw, springConfig);
  const smoothRight = useSpring(rightRaw, springConfig);
  const smoothBottom = useSpring(bottomRaw, springConfig);
  const smoothRadius = useSpring(radiusRaw, springConfig);
  const smoothOpacity = useSpring(opacityRaw, springConfig);

  // ==========================================
  // 🔊 AUDIO CONTROL (Scroll Driven)
  // ==========================================
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!videoRef.current || isMobile) return;

    // Unmute na fase Full Screen (0.25 até 0.9)
    // Estendido até 0.9 para acompanhar o scroll natural sem fade
    const shouldPlayAudio = latest > 0.25 && latest < 0.9;

    if (shouldPlayAudio) {
      if (videoRef.current.muted) {
        // Tenta desmutar (pode falhar se não houve interação, mas o scroll conta com frequência)
        videoRef.current.muted = false;
      }
    } else {
      if (!videoRef.current.muted) {
        videoRef.current.muted = true;
      }
    }
  });

  // ==========================================
  // 👁️ ENTRY ANIMATION com IntersectionObserver
  // ==========================================
  useEffect(() => {
    if (reducedMotion || !thumbRef.current) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(thumbRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  // ==========================================
  // 🎨 ANIMATION PROPS
  // ==========================================
  const enableDesktopMotion = !reducedMotion && !isMobile;
  const enableMobileFade = !reducedMotion && isMobile;

  const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];

  // Entry animation props
  const entryProps = enableDesktopMotion
    ? {
        initial: { opacity: 0, scale: 0.9 },
        animate: isVisible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.9 },
        transition: { duration: 0.5, ease: easeInOut },
      }
    : enableMobileFade
      ? {
          initial: { opacity: 0 },
          animate: isVisible ? { opacity: 1 } : { opacity: 0 },
          transition: { duration: 0.5, ease: easeInOut },
        }
      : { initial: false };

  const videoSrc = BRAND.video.manifesto;

  const handleThumbClick = () => {
    // Scrolla levemente para iniciar a expansão
    if (!isMobile) {
      window.scrollTo({ top: window.innerHeight * 0.3, behavior: 'smooth' });
    }
  };

  // ==========================================
  // 📱 MOBILE LAYOUT
  // ==========================================
  if (isMobile) {
    return (
      <motion.div
        key="manifesto-thumb-mobile"
        ref={thumbRef}
        {...entryProps}
        className="relative w-full h-[70vh] bg-black overflow-hidden"
      >
        <video
          ref={videoRef}
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
  // ==========================================
  // 🖥️ DESKTOP LAYOUT com SCROLL ANIMATION
  // ==========================================
  return (
    <motion.div
      key="manifesto-thumb-desktop"
      style={{
        width: enableDesktopMotion ? smoothWidth : 360,
        height: enableDesktopMotion ? smoothHeight : 200,
        right: enableDesktopMotion ? smoothRight : 48,
        bottom: enableDesktopMotion ? smoothBottom : 40,
        borderRadius: enableDesktopMotion ? smoothRadius : 12,
        opacity: enableDesktopMotion ? smoothOpacity : 1,
      }}
      className="
        fixed z-50
        overflow-hidden
        shadow-[0_30px_90px_rgba(0,0,0,0.45)]
        bg-black
      "
    >
      <motion.div
        ref={thumbRef}
        {...entryProps}
        className="w-full h-full relative cursor-pointer"
        onClick={handleThumbClick}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="
            h-full w-full object-cover
          "
          aria-label="Manifesto thumbnail"
        />
        {/* Gradiente superior sutil */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
