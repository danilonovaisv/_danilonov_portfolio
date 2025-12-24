// src/components/home/ManifestoThumb.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { BRAND } from '@/config/brand';

function track(event: string, detail?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('portfolio:track', { detail: { event, ...detail } })
  );
}

export default function ManifestoThumb() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        track('manifesto_thumb_video_play');
      })
      .catch((e) => {
        console.warn('Autoplay blocked for thumb video', e);
      });
  }, []);

  // Click handler to smooth-scroll to the Manifesto section
  const handleClick = () => {
    const target = document.getElementById('manifesto');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      track('manifesto_thumb_click_scroll');
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="fixed z-30 right-6 md:right-8 bottom-8 md:bottom-10 cursor-pointer group"
      style={{ transformOrigin: 'bottom right' }}
      aria-label="Watch manifesto video"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Video Container */}
      <div className="relative w-48 h-28 md:w-56 md:h-32 rounded-xl overflow-hidden shadow-2xl bg-black ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300">
        {/* Loading Spinner */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
            <div className="w-6 h-6 border-2 border-white/50 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Video */}
        <video
          ref={videoRef}
          src={BRAND.video.manifesto}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />

        {/* Hover Overlay with Arrow */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-end justify-end p-3">
          <motion.div
            initial={{ opacity: 0, x: -5 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-white/80 text-xs font-medium tracking-wide flex items-center gap-1"
          >
            <span className="hidden group-hover:inline">Watch</span>
            <svg
              className="w-4 h-4 transform -rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.div>
        </div>

        {/* "Strategy" Label - matching reference image */}
        <div className="absolute bottom-2 left-3 z-20">
          <span className="text-white text-sm font-semibold drop-shadow-lg">
            Strategy
          </span>
        </div>
      </div>
    </motion.div>
  );
}
