'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef } from 'react';
import { BRAND } from '@/config/brand';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const reducedMotion = usePrefersReducedMotion();

  const manifestoVideoVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: reducedMotion ? 1 : 0.95, 
      y: reducedMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // Easing premium
      },
    },
  };

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="flex w-full items-center justify-center bg-[#06071f] py-20"
    >
      <div className="w-full max-w-4xl px-4">
        <motion.div
           variants={manifestoVideoVariants}
           initial="hidden"
           animate={isInView ? 'visible' : 'hidden'}
           className="aspect-video w-full overflow-hidden rounded-xl bg-black"
        >
          <video
            src={BRAND.video.manifesto}
            muted
            loop
            playsInline
            autoPlay
            className="h-full w-full object-cover"
            aria-label="Manifesto video presentation"
          />
        </motion.div>
      </div>
    </section>
  );
}
