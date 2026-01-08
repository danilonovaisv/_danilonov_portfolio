'use client';
import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  cubicBezier,
} from 'framer-motion';

const POSTER_IMAGE =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';
const VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

// Configuração da Timeline
// A (0-0.12): Thumb Idle
// B (0.12-0.46): Expansão
// C (0.46-0.78): Fullscreen (Audio ON)
// D (0.78-1.0): Exit (Audio OFF)

export default function ManifestoThumb({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook de Scroll ligado à section da Hero
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Transformações (Desktop 100vh Ref)
  // Scale: Deixa de ser thumb (1x) para ocupar quase a tela toda (~2.5x a 3x dependendo do aspect)
  const scale = useTransform(scrollYProgress, [0.12, 0.46], [1, 3.5], {
    ease: cubicBezier(0.22, 1, 0.36, 1),
    clamp: true,
  });

  // Position X/Y: Adjust to center the video in full screen
  // Starting at right: 4vw, bottom: 5vh (defined in className)
  // We need to move it to cover the screen.
  // Using percentages for fluidity.
  const x = useTransform(scrollYProgress, [0.12, 0.46], ['0%', '-10%'], {
    ease: cubicBezier(0.22, 1, 0.36, 1),
  });

  const y = useTransform(scrollYProgress, [0.12, 0.46], ['0%', '-20%'], {
    ease: cubicBezier(0.22, 1, 0.36, 1),
  });

  // Border Radius: 24px -> 20px -> 0px
  const borderRadius = useTransform(
    scrollYProgress,
    [0.12, 0.25, 0.46],
    [24, 20, 0]
  );

  // Opacity for EXIT phase
  const opacity = useTransform(scrollYProgress, [0.78, 1], [1, 0]);

  // Lógica de Áudio (Reativa ao Scroll)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (!videoRef.current) return;

    // Zona C: Fullscreen Active (0.46 a 0.78)
    const shouldBeUnmuted = latest >= 0.46 && latest < 0.78;

    if (shouldBeUnmuted) {
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1;
      }
    } else {
      if (!videoRef.current.muted) {
        videoRef.current.muted = true;
      }
    }
  });

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        borderRadius,
        x,
        y,
        opacity,
        transformOrigin: 'bottom right',
      }}
      className="hidden lg:block fixed bottom-[5vh] right-[4vw] z-30 w-[30vw] aspect-[16/9] shadow-2xl bg-black pointer-events-none"
    >
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={POSTER_IMAGE}
        autoPlay
        loop
        muted // Default state
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      {/* 
        NO UI ALLOWED 
      */}
    </motion.div>
  );
}
