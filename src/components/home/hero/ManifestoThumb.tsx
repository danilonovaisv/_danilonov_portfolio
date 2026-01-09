'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ManifestoThumbProps {
  heroRef: React.RefObject<HTMLElement | null>;
  src?: string;
}

const VIDEO_DESCRIPTION_ID = 'manifesto-thumb-video-description';

export default function ManifestoThumb({
  heroRef,
  src = 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
}: ManifestoThumbProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [muted, setMuted] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [videoQuality, setVideoQuality] = useState<'hd' | 'sd'>('hd');

  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Media query
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Lazy load com IntersectionObserver
  useEffect(() => {
    if (!wrapperRef.current || !isDesktop) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Pre-load 200px antes
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  // Detectar qualidade de conexão
  useEffect(() => {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const conn = (navigator as any).connection;

      if (conn?.effectiveType === '4g' || conn?.effectiveType === '5g') {
        setVideoQuality('hd');
      } else {
        setVideoQuality('sd');
      }

      const handleChange = () => {
        if (conn.effectiveType === '4g' || conn.effectiveType === '5g') {
          setVideoQuality('hd');
        }
      };

      conn.addEventListener('change', handleChange);
      return () => conn.removeEventListener('change', handleChange);
    }
  }, []);

  // Scroll progress (desktop only) — expand to reveal final state earlier
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Loandbehold replication:
  // Starts Small. Expands mid-scroll.
  // Extended to 0.75 to match Blueprint "Show" state sync
  const width = useTransform(
    smoothProgress,
    [0, 0.12, 0.46, 0.78],
    ['30vw', '30vw', '100vw', '100vw']
  );
  const height = useTransform(
    smoothProgress,
    [0, 0.12, 0.46, 0.78],
    ['16.875vw', '16.875vw', '100vh', '100vh']
  );
  const right = useTransform(
    smoothProgress,
    [0, 0.12, 0.46],
    ['4vw', '4vw', '0%']
  );
  const bottom = useTransform(
    smoothProgress,
    [0, 0.12, 0.46],
    ['5vh', '5vh', '0%']
  );
  const borderRadius = useTransform(
    smoothProgress,
    [0, 0.12, 0.46],
    ['24px', '20px', '0px']
  );
  const translate = useTransform(
    smoothProgress,
    [0, 0.46, 0.78],
    [
      'translate(0%, 0%)',
      'translate(0%, 0%)',
      'translate(-50%, -50%)',
    ]
  );
  const opacity = useTransform(smoothProgress, [0.78, 1], [1, 0]);

  // Controlar mute por threshold (desktop)
  useEffect(() => {
    if (!isDesktop) return;

    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (latest >= 0.78) {
        setMuted(true);
      } else if (latest >= 0.46) {
        setMuted(false);
      } else {
        setMuted(true);
      }
    });

    return () => unsubscribe();
  }, [isDesktop, smoothProgress]);

  // Aplicar mute ao vídeo
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
    videoRef.current.volume = muted ? 0 : 1;
  }, [muted]);
  // Handler removed (Zero UI)

  // Determinar src baseado na qualidade
  const videoSrc =
    videoQuality === 'hd' ? src : src.replace('.mp4', '-720p.mp4');

  // Prevent duplicate video check removed - Component handles responsive styles
  // if (!isDesktop) return null;

  if (!isDesktop) {
    return null;
  }

  return (
    <motion.div
      ref={wrapperRef}
      className="video-wrapper fixed z-30 pointer-events-none"
      style={{
        width,
        height,
        right,
        bottom,
        borderRadius,
        opacity,
        transform: translate,
        willChange: 'transform, width, height, opacity',
      }}
    >
      {shouldLoad ? (
        <>
          <motion.video
            ref={videoRef}
            className="w-full h-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted={muted}
            playsInline
            preload="metadata"
            aria-label="Vídeo showreel demonstrando projetos de design gráfico"
            aria-describedby={VIDEO_DESCRIPTION_ID}
          />

          <p id={VIDEO_DESCRIPTION_ID} className="sr-only">
            Vídeo de apresentação dos trabalhos em estratégia, branding e motion
            design.
          </p>
        </>
      ) : (
        <div className="w-full h-full bg-neutral-900 animate-pulse" />
      )}
    </motion.div>
  );
}
