'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';

const MANIFESTO_VIDEO_SRC_MOBILE =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20% 0px' });
  const prefersReducedMotion = useReducedMotion();
  const [muted, setMuted] = useState(true);

  return (
    <motion.section
      id="manifesto"
      ref={sectionRef}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
      animate={
        isInView && !prefersReducedMotion ? { opacity: 1, scale: 1, y: 0 } : {}
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block w-full bg-ghost-void md:hidden"
    >
      <button
        type="button"
        onClick={() => setMuted((prev) => !prev)}
        className="relative flex aspect-video w-full items-center justify-center overflow-hidden"
        aria-pressed={!muted ? 'true' : 'false'}
        aria-label={
          muted ? 'Ativar som do manifesto' : 'Desativar som do manifesto'
        }
      >
        <video
          src={MANIFESTO_VIDEO_SRC_MOBILE}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white">
          <span>{muted ? 'sound off' : 'sound on'}</span>
          <span
            className={`h-2 w-2 rounded-full ${
              muted ? 'bg-white/40' : 'bg-ghost-green'
            }`}
          />
        </div>
      </button>
    </motion.section>
  );
}
