'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ABOUT_CONTENT } from '@/config/content';

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const shouldReduceMotion = useReducedMotion();

  // Parallax effect for video
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Transition variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      filter: 'blur(10px)',
      y: 10,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-svh w-full overflow-hidden flex items-center justify-end"
    >
      {/* Video Background */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <video
          src={
            isDesktop
              ? ABOUT_CONTENT.hero.videos.desktop
              : ABOUT_CONTENT.hero.videos.mobile
          }
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover opacity-55 saturate-[0.8]"
        />
        {/* Darkening overlays for legibility */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-black/40" />
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 md:px-12 lg:px-24">
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-end text-right space-y-4 md:space-y-6"
        >
          {/* Headline Group */}
          <div className="space-y-1 md:space-y-2">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl text-white font-semibold tracking-tighter leading-[1.1]"
            >
              Sou <span className="ghost-accent">Danilo Novais.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium tracking-tight leading-tight"
            >
              <span className="ghost-accent">Você não vê</span> tudo o que eu
              faço.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-medium tracking-tight leading-tight"
            >
              Mas sente quando <span className="ghost-accent">funciona.</span>
            </motion.p>
          </div>

          {/* Pause simulation via staggerChildren in container and a small div if needed, 
              but since variants stagger, it's natural. I'll add a bigger transition delay for the next block */}

          {/* Paragraph Group */}
          <motion.div
            variants={itemVariants}
            className="pt-6 md:pt-10 space-y-1 md:space-y-2 max-w-2xl"
          >
            {ABOUT_CONTENT.hero.description.map((line, idx) => (
              <p
                key={idx}
                className="text-lg md:text-2xl lg:text-3xl text-white/70 font-light tracking-tight leading-snug"
              >
                {idx === 2 ? (
                  <>
                    <span className="ghost-accent">
                      estratégia e tecnologia
                    </span>{' '}
                    — na medida certa.
                  </>
                ) : line.includes('design') ? (
                  <>
                    <span className="ghost-accent">Crio design</span> que
                    observa, entende
                  </>
                ) : (
                  line
                )}
              </p>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
