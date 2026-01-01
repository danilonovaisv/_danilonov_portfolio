'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/config/content';
import { kw } from './keywords';
import { motionTokens } from './motion';

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative h-screen flex items-center bg-(--ghost-bg) overflow-hidden">
      {/* Background Videos */}
      <video
        src={ABOUT_CONTENT.hero.videos.desktop}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <video
        src={ABOUT_CONTENT.hero.videos.mobile}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="block lg:hidden absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Dark Overlay Filter */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none z-1" />

      {/* Gradients */}
      <div className="absolute inset-0 bg-linear-to-t from-(--ghost-bg) via-transparent to-transparent z-2 opacity-80" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-black/20 z-2" />

      {/* Content wrapper aligned right according to spec */}
      <div className="relative z-10 w-full px-6 lg:px-24">
        <div className="ml-auto max-w-[680px] text-right">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0.4,
                },
              },
            }}
            className="space-y-4 md:space-y-6"
          >
            {/* Headline Group */}
            <div className="space-y-2">
              <motion.h1
                variants={motionTokens.fadeGhost}
                className="text-4xl md:text-6xl lg:text-7xl text-(--ghost-text) font-semibold tracking-tighter leading-[1.1]"
              >
                Sou {kw('Danilo Novais.')}
              </motion.h1>

              <motion.p
                variants={motionTokens.fadeGhost}
                className="text-2xl md:text-3xl lg:text-4xl text-(--ghost-text) font-medium tracking-tight leading-tight"
              >
                {kw('Você não vê')} tudo o que eu faço.
              </motion.p>

              <motion.p
                variants={motionTokens.fadeGhost}
                className="text-2xl md:text-3xl lg:text-4xl text-[var(--ghost-text)] font-medium tracking-tight leading-tight"
              >
                Mas sente quando {kw('funciona.')}
              </motion.p>
            </div>

            {/* Paragraph Group with optional delay for "pause" effect inferred from stagger */}
            <motion.div
              variants={motionTokens.fadeGhost}
              className="pt-6 space-y-2"
            >
              {ABOUT_CONTENT.hero.description.map((line, idx) => (
                <p
                  key={idx}
                  className="text-lg md:text-2xl lg:text-3xl text-(--ghost-text-secondary) font-light tracking-tight leading-snug"
                >
                  {idx === 2 ? (
                    <>{kw('estratégia e tecnologia')} — na medida certa.</>
                  ) : line.includes('design') ? (
                    <>{kw('Crio design')} que observa, entende</>
                  ) : (
                    line
                  )}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
