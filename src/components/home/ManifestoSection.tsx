// src/components/home/ManifestoSection.tsx
'use client';

import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { BRAND } from '@/config/brand';

const videoVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export default function ManifestoSection() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <section
      id="manifesto"
      aria-label="Manifesto"
      className="w-full h-screen bg-[#050505] relative overflow-hidden"
    >
      <motion.div
        className="w-full h-full"
        variants={videoVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <video
          ref={videoRef}
          src={BRAND.video.manifesto}
          className="h-full w-full object-cover"
          playsInline
          muted
          loop
          autoPlay
          preload="metadata"
        />
      </motion.div>
    </section>
  );
}
