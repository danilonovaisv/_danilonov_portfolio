// src/components/home/ManifestoThumb.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, useTransform, useMotionValue, useInView } from 'framer-motion';
import { BRAND } from '@/config/brand';
import { useScrollContext } from '@/contexts/ScrollContext';
import { Play, Volume2, VolumeX } from 'lucide-react';

export default function ManifestoThumb() {
  const { scrollYProgress } = useScrollContext();
  const fallbackProgress = useMotionValue(0);
  const progress = scrollYProgress ?? fallbackProgress;

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useRef(true);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  // Animation Transforms
  // Start: 192x120px, Bottom 40px, Right 24px
  // End: 100%x100%, Bottom 0px, Right 0px
  const width = useTransform(progress, [0, 0.46], ['192px', '100%']);
  const height = useTransform(progress, [0, 0.46], ['120px', '100%']);
  const right = useTransform(progress, [0, 0.46], ['24px', '0px']);
  const bottom = useTransform(progress, [0, 0.46], ['40px', '0px']);
  const borderRadius = useTransform(progress, [0, 0.46], ['12px', '0px']);

  // Opacity fade of the overlay/border to cleaner look when full
  const borderOpacity = useTransform(progress, [0.3, 0.46], [0.1, 0]);
  
  // Scale effect for the play button as it expands
  const playButtonScale = useTransform(progress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    
    // Ensure muted autoplay for reliability
    video.muted = true;
    
    // Only play if the component is in view
    if (isInView) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => console.log('Autoplay blocked', e));
      }
    }
  }, [isInView]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      style={{
        width,
        height,
        right,
        bottom,
        position: 'absolute',
        borderRadius,
        zIndex: 50, // Ensure it sits above everything when expanded
        transformOrigin: 'bottom right',
      }}
      className="overflow-hidden shadow-2xl bg-black"
      aria-label="Manifesto video thumbnail"
      role="button"
      tabIndex={0}
    >
      <motion.div
        className="absolute inset-0 border border-white"
        style={{ opacity: borderOpacity, borderRadius }}
      />

      <video
        ref={videoRef}
        src={BRAND.video.manifesto}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        aria-label="Manifesto video"
      />

      {/* Play Icon Overlay */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        style={{ scale: playButtonScale }}
      >
        <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
          <Play className="w-6 h-6 text-white" aria-hidden="true" />
        </div>
      </motion.div>

      {/* Mute Toggle Button */}
      <motion.button
        className="absolute bottom-3 right-3 z-20 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center"
        onClick={toggleMute}
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4" aria-hidden="true" />
        ) : (
          <Volume2 className="w-4 h-4" aria-hidden="true" />
        )}
      </motion.button>
    </motion.div>
  );
}