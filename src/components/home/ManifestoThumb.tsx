'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BRAND } from '@/config/brand';

export default function ManifestoThumb() {
  const reducedMotion = usePrefersReducedMotion();

  return (
      <motion.div
          initial={
            reducedMotion
                ? undefined
                : {
                  opacity: 1,
                  scale: 0.25,
                  x: '35%',
                  y: '30%',
                  borderRadius: 16,
                }
          }
          whileInView={
            reducedMotion
                ? undefined
                : {
                  opacity: 1,
                  scale: 1,
                  x: '0%',
                  y: '0%',
                  borderRadius: 0,
                }
          }
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
        relative w-full aspect-video
        overflow-hidden
        shadow-[0_30px_90px_rgba(0,0,0,0.45)]
        bg-black
      "
      >
        <video
            src={BRAND.video.manifesto}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="h-full w-full object-cover"
            aria-label="Manifesto thumbnail"
        />

        {/* Overlay de profundidade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      </motion.div>
  );
}
