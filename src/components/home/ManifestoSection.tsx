'use client';

// ============================================================================
// src/components/home/ManifestoSection.tsx
// Versão mobile do manifesto — seção independente logo abaixo da Hero
// ============================================================================

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const MANIFESTO_VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

export function ManifestoSection() {
  const ref = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReducedMotion = useReducedMotion();
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block md:hidden w-full bg-[#06071f] aspect-video relative"
    >
      <video
        ref={videoRef}
        src={MANIFESTO_VIDEO_SRC}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Sound Toggle Button */}
      <button
        type="button"
        onClick={toggleSound}
        className="absolute bottom-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm text-white transition-colors hover:bg-black/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
        aria-label={isMuted ? 'Ativar som' : 'Desativar som'}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </button>
    </motion.section>
  );
}

export default ManifestoSection;
