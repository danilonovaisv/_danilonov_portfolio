// src/components/home/ManifestoThumb.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { BRAND } from '@/config/brand';
import { useScrollContext } from '@/contexts/ScrollContext';

function track(event: string, detail?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('portfolio:track', { detail: { event, ...detail } })
  );
}

export default function ManifestoThumb() {
  const { scrollYProgress: contextScrollProgress } = useScrollContext();
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Use context scroll if available, otherwise set up local scroll
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ['start start', 'end end'],
  });

  const progress = contextScrollProgress ?? scrollYProgress;

  // Animation Transforms
  // Start: 192x120px, Bottom 40px, Right 24px
  // End: 100%x100%, Bottom 0px, Right 0px
  const width = useTransform(progress, [0, 0.46], ['192px', '100%']);
  const height = useTransform(progress, [0, 0.46], ['120px', '100%']);
  const right = useTransform(progress, [0, 0.46], ['24px', '0px']);
  const bottom = useTransform(progress, [0, 0.46], ['40px', '0px']);
  const borderRadius = useTransform(progress, [0, 0.46], ['12px', '0px']);
  const scale = useTransform(progress, [0, 0.1, 0.46], [1, 0.98, 1]); // Slight scale down before expanding
  const opacity = useTransform(progress, [0.4, 0.46], [1, 0]); // Fade out when fully expanded

  // Opacity fade of the overlay/border to cleaner look when full
  const borderOpacity = useTransform(progress, [0.3, 0.46], [0.1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure muted autoplay for reliability
    video.muted = true;
    video
      .play()
      .then(() => {
        setIsPlaying(true);
        track('manifesto_thumb_video_play');
      })
      .catch((e) => {
        console.warn('Autoplay blocked for thumb video', e);
        // If autoplay fails, we'll try again on user interaction
      });
  }, []);

  return (
    <div ref={rootRef}>
      <motion.div
        style={{
          width,
          height,
          right,
          bottom,
          scale,
          opacity,
          position: 'fixed',
          borderRadius,
          zIndex: 49, // Slightly below the hero video
          transformOrigin: 'bottom right',
        }}
        className="overflow-hidden shadow-2xl bg-black"
      >
        <motion.div
          className="absolute inset-0 border border-white"
          style={{ opacity: borderOpacity, borderRadius }}
        />

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <video
          ref={videoRef}
          src={BRAND.video.manifesto}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label="Video thumbnail for manifesto"
        />
      </motion.div>
    </div>
  );
}
