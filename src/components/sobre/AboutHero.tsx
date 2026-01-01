'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ABOUT_CONTENT } from '@/config/content';
import { kw } from './keywords';
import { motionTokens } from './motion';

export function AboutHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative h-screen flex items-center bg-(--ghost-bg) overflow-hidden">
      {/* Background Videos - Atmosphere, not protagonist */}
      <video
        src={ABOUT_CONTENT.hero.videos.desktop}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="hidden lg:block absolute inset-0 w-full h-full object-cover object-top opacity-[0.55]"
      />
      <video
        src={ABOUT_CONTENT.hero.videos.mobile}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="block lg:hidden absolute inset-0 w-full h-full object-cover object-top opacity-[0.55]"
      />

      {/* Strong Dark Overlay for Legibility */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/65 to-black/90 pointer-events-none z-1" />

      {/* Content wrapper with invisible grid (ml-auto + padding) */}
      <div className="relative z-10 w-full pr-[8vw] px-6">
        <div className="ml-auto max-w-[680px] text-right">
          <motion.div
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2,
                  delayChildren: 0, // Headline starts at 0
                },
              },
            }}
            className="space-y-12"
          >
            {/* Headline Group - Hero Title Specs */}
            <div className="space-y-2">
              <motion.h1
                variants={motionTokens.fadeGhost}
                className="text-[clamp(44px,4.5vw,64px)] text-(--ghost-text) font-medium tracking-[-0.02em] leading-[1.08]"
              >
                Sou {kw('Danilo Novais.')}
              </motion.h1>

              <motion.p
                variants={motionTokens.fadeGhost}
                className="text-[clamp(32px,3.5vw,48px)] text-(--ghost-text) font-medium tracking-[-0.02em] leading-[1.08]"
              >
                {kw('Você não vê')} tudo o que eu faço.
              </motion.p>

              <motion.p
                variants={motionTokens.fadeGhost}
                className="text-[clamp(32px,3.5vw,48px)] text-(--ghost-text) font-medium tracking-[-0.02em] leading-[1.08]"
              >
                Mas sente quando {kw('funciona.')}
              </motion.p>
            </div>

            {/* Paragraph Group - Hero Text Specs with 0.4s pause effect */}
            <motion.div
              variants={motionTokens.fadeGhost}
              transition={{ delay: 0.4 }} // 0.4s pause after headlines
              className="space-y-4 ml-auto max-w-[520px]"
            >
              {ABOUT_CONTENT.hero.description.map((line, idx) => (
                <p
                  key={idx}
                  className="text-base text-(--ghost-text-secondary) font-light leading-[1.8] tracking-tight"
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
