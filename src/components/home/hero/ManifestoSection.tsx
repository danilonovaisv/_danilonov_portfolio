'use client';

// ============================================================================
// src/components/home/ManifestoSection.tsx
// Mobile-only fullscreen manifesto section below Hero
//
// BEHAVIOR:
// - Full viewport width, aspect-video height
// - Video: Autoplay, loop, muted (sem UI de controle)
// - Scroll reveal animation
// - Auto-mute quando scroll away
// ============================================================================

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

// Video source (Supabase)
const VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

// Animation config (Ghost easing)
const ANIMATION = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1], // easeOutExpo
  },
} as const;

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Track if section is in view
  const isInView = useInView(sectionRef, {
    once: false,
    amount: 0.5,
  });

  const prefersReducedMotion = useReducedMotion();
  const [, setIsMuted] = useState(true); // Keep state for potential future use

  // ============================================================================
  // AUTO-MUTE WHEN LEAVING VIEW
  // ============================================================================
  useEffect(() => {
    if (!isInView) {
      // User scrolled away, mute the video
      if (videoRef.current) {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  }, [isInView]);

  return (
    <motion.section
      id="manifesto"
      ref={sectionRef}
      initial={prefersReducedMotion ? {} : ANIMATION.initial}
      animate={isInView && !prefersReducedMotion ? ANIMATION.animate : {}}
      transition={ANIMATION.transition}
      className="lg:hidden w-full bg-[#040013] aspect-video relative overflow-hidden"
    >
      {/* Video (sem UI, muted por padrão) */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        aria-label="Portfolio showreel video"
      />
    </motion.section>
  );
}
