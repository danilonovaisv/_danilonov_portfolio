'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react';

interface ManifestoThumbProps {
  narrativeState: string;
  onSkipToFullscreen?: () => void;
}

export default function ManifestoThumb({
  narrativeState: _narrativeState,
  onSkipToFullscreen
}: ManifestoThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Trigger entry animation after preloader
  useEffect(() => {
    const timer = setTimeout(() => setHasEntered(true), 2000); // After preloader fades
    return () => clearTimeout(timer);
  }, []);

  // Handle click based on viewport
  const handleClick = () => {
    if (isMobile) {
      // Mobile: Toggle sound
      if (videoRef.current) {
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
      }
    } else {
      // Desktop: Skip to fullscreen (scroll to end of hero)
      if (onSkipToFullscreen) {
        onSkipToFullscreen();
      } else {
        // Fallback: scroll to manifesto section
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          window.scrollTo({
            top: heroSection.offsetHeight,
            behavior: 'smooth'
          });
        }
      }
    }
  };

  return (
    <motion.div
      className="relative w-full h-full group cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={hasEntered ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      onClick={handleClick}
    >
      {/* Video */}
      <video
        ref={videoRef}
        src={BRAND.video.manifesto}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="w-full h-full object-cover"
        aria-label="Manifesto Video"
      />

      {/* Hover Arrow Overlay (Desktop) */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-transform duration-500 -rotate-45 group-hover:rotate-0">
          <ArrowUpRight className="w-5 h-5" />
        </span>
      </div>

      {/* Sound Toggle Indicator (Mobile) */}
      <div className="absolute bottom-4 right-4 md:hidden">
        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white">
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </span>
      </div>

      {/* Label */}
      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white/70 text-xs uppercase tracking-wider font-mono">Strategy</span>
      </div>
    </motion.div>
  );
}
