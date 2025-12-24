// src/components/home/ManifestoSection.tsx
'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BRAND } from '@/config/brand';

function track(event: string, detail?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('portfolio:track', { detail: { event, ...detail } })
  );
}

export default function ManifestoSection() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasPlayedRef = useRef(false);

  // Set up scroll-based animations
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start end', 'end start'],
  });

  // Opacity animation based on scroll
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.3, 1, 1]
  );

  // Audio control based on intersection
  useEffect(() => {
    const el = rootRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const io = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          try {
            if (!hasPlayedRef.current) {
              // first play (muted)
              await video.play();
              hasPlayedRef.current = true;
              setIsPlaying(true);
              track('manifesto_video_auto_play');
            }

            video.muted = false;
            track('manifesto_audio_unmuted_auto');
          } catch (error) {
            // If autoplay is blocked, keep muted
            video.muted = true;
            console.warn('Autoplay blocked:', error);
          }
        } else {
          video.muted = true;
          track('manifesto_audio_muted_on_leave');
        }
      },
      { threshold: [0, 0.55, 0.75] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="manifesto"
      ref={rootRef}
      aria-label="Manifesto"
      className="w-full bg-[#0E0F12] py-16"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '0px 0px -100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={[
            'overflow-hidden rounded-2xl',
            'shadow-[0_26px_90px_rgba(0,0,0,0.35)]',
            'bg-white/5',
          ].join(' ')}
        >
          <div className="aspect-video w-full relative">
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-[#0E0F12]">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <motion.video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={BRAND.video.manifesto}
              autoPlay
              loop
              muted
              playsInline
              controls
              preload="metadata"
              aria-label="Vídeo manifesto"
              data-track="manifesto_video_auto_play"
              onPlay={() => track('manifesto_video_auto_play')}
              style={{ opacity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
