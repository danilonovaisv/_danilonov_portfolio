// src/components/home/ManifestoSection.tsx
'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { BRAND } from '@/config/brand';

function track(event: string, detail?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('portfolio:track', { detail: { event, ...detail } })
  );
}

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Audio control based on intersection
  useEffect(() => {
    const el = sectionRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          // Unmute when video is mostly visible
          video.muted = false;
          track('manifesto_audio_unmuted');
        } else {
          // Mute when leaving view
          video.muted = true;
          track('manifesto_audio_muted');
        }
      },
      { threshold: [0, 0.5, 0.75] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Handle video play state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        track('manifesto_video_play');
      })
      .catch((e) => {
        console.warn('Autoplay blocked:', e);
      });
  }, []);

  const variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-label="Manifesto Video"
      className="relative w-full min-h-screen bg-[#050505] flex items-center justify-center py-0"
    >
      {/* Video Container with reveal animation */}
      <motion.div
        variants={variants}
        initial={reduceMotion ? 'visible' : 'hidden'}
        animate={inView ? 'visible' : 'hidden'}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full"
      >
        {/* Loading Spinner */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-10">
            <div className="w-12 h-12 border-3 border-[#0057FF] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Full-width Video */}
        <video
          ref={videoRef}
          src={BRAND.video.manifesto}
          className="w-full h-screen object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          preload="metadata"
          aria-label="Manifesto video presentation"
          onPlay={() => {
            setIsPlaying(true);
            track('manifesto_video_play');
          }}
        />

        {/* Optional: Gradient overlay at edges for visual polish */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#050505]/30 via-transparent to-[#050505]/10"
          aria-hidden="true"
        />
      </motion.div>
    </section>
  );
}
