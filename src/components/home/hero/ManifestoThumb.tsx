'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface ManifestoThumbProps {
  heroRef: React.RefObject<HTMLElement | null>;
  src?: string;
}

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
    if (!wrapperRef.current) return;

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
  }, []);

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

  // Scroll progress (desktop only)
  // Scroll progress (desktop only)
  // Use 'end end' to allow full scroll range for the animation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Loandbehold replication:
  // Starts Small. Expands mid-scroll.
  const width = useTransform(smoothProgress, [0, 0.6], ['219px', '100%']);
  const height = useTransform(smoothProgress, [0, 0.6], ['131px', '100%']);
  const right = useTransform(smoothProgress, [0, 0.6], ['32px', '0px']);
  const bottom = useTransform(smoothProgress, [0, 0.6], ['32px', '0px']);
  const borderRadius = useTransform(smoothProgress, [0, 0.6], ['12px', '0px']);
  const overlayOpacity = useTransform(smoothProgress, [0.5, 0.6], [1, 0]);

  // Controlar mute por threshold (desktop)
  useEffect(() => {
    if (!isDesktop) return;

    const unsubscribe = smoothProgress.on('change', (latest) => {
      // Unmute earlier (0.5) to prepare for full reveal
      if (latest >= 0.5) {
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
  }, [muted]);

  // Handler de click
  const handleClick = () => {
    if (!heroRef.current) return;

    if (isDesktop) {
      // Automatic scroll to reveal point (0.6 of height)
      const rect = heroRef.current.getBoundingClientRect();
      const scrollHeight = heroRef.current.offsetHeight;

      // Calculate position where progress is ~0.6
      // Progress = (WindowScroll - UnstickStart) / (UnstickEnd - UnstickStart)
      // Simpler: Just scroll down a screenful
      const scrollTarget = window.scrollY + window.innerHeight * 0.8;

      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });
    } else {
      // Mobile: toggle mute
      setMuted((m) => !m);
    }
  };

  // Determinar src baseado na qualidade
  const videoSrc =
    videoQuality === 'hd' ? src : src.replace('.mp4', '-720p.mp4');

  const posterSrc = src.replace('.mp4', '-poster.jpg');

  // Prevent duplicate video on mobile (Mobile has its own video in ManifestoSection)
  if (!isDesktop) return null;

  return (
    <motion.div
      ref={wrapperRef}
      // Force initial styles via CSS as baseline, Motion overrides on hydration
      // Using fixed positioning for stability during scroll
      className="video-wrapper group cursor-pointer overflow-hidden fixed z-50 right-8 bottom-8 w-[219px] h-[131px]"
      style={
        isDesktop
          ? {
              width,
              height,
              right,
              bottom,
              borderRadius,
            }
          : {
              borderRadius: '5px',
            }
      }
      onClick={handleClick}
      role="button"
      aria-label={
        isDesktop
          ? 'Revelar vídeo completo (scroll)'
          : muted
            ? 'Ativar som do vídeo'
            : 'Desativar som do vídeo'
      }
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {shouldLoad ? (
        <>
          <motion.video
            ref={videoRef}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted={muted}
            playsInline
            preload="metadata"
          />

          {/* Overlay gradiente */}
          <motion.div
            className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/70 via-black/20 to-transparent"
            style={{ opacity: isDesktop ? overlayOpacity : 1 }}
          />

          {/* Texto/metadados */}
          <motion.div
            className="absolute bottom-0 left-0 w-full p-6 pointer-events-none"
            style={{ opacity: isDesktop ? overlayOpacity : 1 }}
          >
            <p className="text-white/70 text-sm mb-1">Showreel 2025</p>
            <p className="text-white text-lg font-medium">
              Strategy • Branding • Motion
            </p>
          </motion.div>

          {/* Toggle som (desktop) */}
          {isDesktop && (
            <motion.button
              type="button"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              style={{ opacity: overlayOpacity }}
              onClick={(e) => {
                e.stopPropagation();
                setMuted((m) => !m);
              }}
              aria-label={muted ? 'Ativar som' : 'Desativar som'}
              aria-pressed={!muted ? 'true' : 'false'}
            >
              {muted ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  />
                </svg>
              )}
            </motion.button>
          )}

          {/* Toggle som (mobile) */}
          {!isDesktop && (
            <button
              type="button"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setMuted((m) => !m);
              }}
              aria-label={muted ? 'Ativar som' : 'Desativar som'}
              aria-pressed={!muted}
            >
              {muted ? '🔇' : '🔊'}
            </button>
          )}
        </>
      ) : (
        // Placeholder
        <div className="w-full h-full bg-linear-to-br from-neutral-900 to-neutral-800 animate-pulse" />
      )}
    </motion.div>
  );
}
