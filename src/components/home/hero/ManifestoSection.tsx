'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      className="flex md:hidden w-full bg-ghost-bg-accent relative overflow-hidden flex-col items-center"
      style={{ zIndex: 1 }}
    >
      <motion.div
        className="w-full aspect-video"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <video
          src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Mobile Visual Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-ghost-bg-accent via-transparent to-transparent pointer-events-none" />

        {/* Sound Hint for Mobile Tap logic */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-[10px] font-bold text-white/70 uppercase tracking-widest border border-white/10 pointer-events-none">
          Tap for Audio
        </div>
      </motion.div>

      {/* Mobile Editorial Continuity */}
      <div className="w-full p-8 text-center bg-ghost-bg-accent">
        <p className="text-white text-h3 font-bold mb-2">Our Manifesto</p>
        <p className="text-white/50 text-caption max-w-xs mx-auto">
          Experiencing the strategy behind the motion.
        </p>
      </div>
    </motion.section>
  );
}
