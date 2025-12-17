'use client';

import dynamic from 'next/dynamic';
import * as React from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import HeroOverlay from './HeroOverlay';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export type HeroInputs = {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  scrollYProgress: ReturnType<typeof useMotionValue<number>>;
  reducedMotion: boolean;
};

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement | null>(null);

  // Cursor (normalized -1..1)
  const mouseXRaw = useMotionValue(0);
  const mouseYRaw = useMotionValue(0);

  // Smooth cursor
  const mouseX = useSpring(mouseXRaw, {
    stiffness: 120,
    damping: 26,
    mass: 0.8,
  });
  const mouseY = useSpring(mouseYRaw, {
    stiffness: 120,
    damping: 26,
    mass: 0.8,
  });

  // Scroll progress relative to hero section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseXRaw.set((x - 0.5) * 2);
      mouseYRaw.set((y - 0.5) * 2);
    },
    [mouseXRaw, mouseYRaw]
  );

  const onPointerLeave = React.useCallback(() => {
    mouseXRaw.set(0);
    mouseYRaw.set(0);
  }, [mouseXRaw, mouseYRaw]);

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative min-h-[92vh] w-full overflow-hidden bg-[#f3f4f6] text-black"
      aria-label="Hero"
    >
      {/* 3D */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <HeroScene
          mouseX={mouseX}
          mouseY={mouseY}
          scrollYProgress={scrollYProgress}
          reducedMotion={!!reducedMotion}
        />
      </motion.div>

      {/* Overlay */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pb-16 pt-20 sm:px-10 sm:pt-24 lg:pb-24 lg:pt-28">
        <HeroOverlay />
      </div>
    </section>
  );
}
