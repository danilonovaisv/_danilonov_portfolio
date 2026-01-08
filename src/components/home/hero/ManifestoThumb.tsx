'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';

// ============================================================================
// ManifestoThumb - Desktop Scroll-Driven Video (loandbehold.studio replica)
// ============================================================================

const VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

interface ManifestoThumbProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

// Ghost easing (editorial premium)
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ManifestoThumb({ sectionRef }: ManifestoThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll progress: Hero offset ['start start', 'end start']
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // ============================================================================
  // ESTADOS DE SCROLL (loandbehold.studio spec)
  // ============================================================================
  // A: THUMB      → 0.00 - 0.12
  // B: EXPANSÃO   → 0.12 - 0.46
  // C: FULL       → 0.46 - 0.78 (ÁUDIO ON)
  // D: EXIT       → 0.78 - 1.00 (ÁUDIO OFF)
  // ============================================================================

  // Transforms (scroll-driven, sem setState)
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.12, 0.46],
    ['24px', '20px', '0px']
  );
  const opacity = useTransform(scrollYProgress, [0.78, 1], [1, 0]);

  // Posição: bottom-right → centro
  // Inicial (Estado A): right: 4vw, bottom: 5vh
  const right = useTransform(
    scrollYProgress,
    [0, 0.12, 0.46],
    ['4vw', '4vw', '0vw']
  );
  const bottom = useTransform(
    scrollYProgress,
    [0, 0.12, 0.46],
    ['5vh', '5vh', '0vh']
  );

  // Translate para centrar no FULL
  const x = useTransform(scrollYProgress, [0, 0.12, 0.46], ['0%', '0%', '50%']);
  const y = useTransform(scrollYProgress, [0, 0.12, 0.46], ['0%', '0%', '50%']);

  // Dimensões: thumb (~30vw x 16.875vw) → fullscreen (100vw x 100vh)
  const width = useTransform(
    scrollYProgress,
    [0, 0.12, 0.46],
    ['30vw', '30vw', '100vw']
  );
  const height = useTransform(
    scrollYProgress,
    [0, 0.12, 0.46],
    ['16.875vw', '16.875vw', '100vh']
  );

  // ============================================================================
  // ÁUDIO CONTROL (threshold-based, sem UI)
  // ============================================================================
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    // Estado C: FULL (0.46 ≤ progress < 0.78) → ÁUDIO ON
    if (latest >= 0.46 && latest < 0.78) {
      if (video.muted) {
        video.muted = false;
        video.volume = 1;
        video.play().catch(() => {
          // Autoplay bloqueado: manter muted (sem UI)
          video.muted = true;
        });
      }
    }
    // Estado D: EXIT (progress ≥ 0.78) → ÁUDIO OFF IMEDIATO
    else if (latest >= 0.78) {
      if (!video.muted) {
        video.muted = true;
      }
    }
    // Estados A/B: THUMB/EXPANSÃO → muted
    else {
      if (!video.muted) {
        video.muted = true;
      }
    }
  });

  // ============================================================================
  // RENDER (apenas video, sem UI)
  // ============================================================================
  return (
    <motion.div
      className="hidden lg:block fixed z-30 overflow-hidden"
      style={{
        right,
        bottom,
        x,
        y,
        width,
        height,
        borderRadius,
        opacity,
        maxWidth: '1920px',
        willChange: 'transform, opacity',
      }}
      // Respeitar prefers-reduced-motion
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.96 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: GHOST_EASE }}
    >
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </motion.div>
  );
}
