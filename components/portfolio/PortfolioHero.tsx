import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import PortfolioHeroCards from './PortfolioHeroCards';

const easing = [0.22, 1, 0.36, 1] as const;

export default function PortfolioHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="portfolio-hero"
      className="relative overflow-hidden bg-[#f5f5f5] text-[#0f172a]"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-16%] top-[-18%] h-[440px] w-[440px] rounded-full bg-gradient-to-br from-[#dce7ff] via-white to-[#f5f5f5] blur-[120px] opacity-70" />
        <div className="absolute left-[-12%] bottom-[-28%] h-[360px] w-[360px] rounded-full bg-gradient-to-tr from-[#0057ff]/18 via-[#7c3aed]/12 to-transparent blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20 md:pt-32 md:pb-28 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="space-y-6 md:space-y-8">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-[#0057FF]/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0057FF] shadow-sm backdrop-blur"
            >
              <Sparkles className="h-4 w-4" />
              selected work
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.75,
                ease: easing,
                delay: 0.05,
              }}
              className="text-balance text-4xl font-extrabold tracking-[-0.04em] text-[#0f172a] sm:text-5xl lg:text-[56px]"
            >
              Portfolio construído para marcas que precisam de{' '}
              <span className="text-[#0057FF]">impacto</span> e{' '}
              <span className="text-[#111111]">claridade</span>.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.65,
                ease: 'easeOut',
                delay: 0.15,
              }}
              className="max-w-2xl text-lg leading-relaxed text-[#334155]"
            >
              Selecionamos algumas entregas recentes em branding, campanhas e
              experiências digitais. Passe o cursor ou toque nos cards para ver
              o efeito principal inspirado na referência.
            </motion.p>

            <div className="flex flex-wrap items-center gap-3">
              <motion.a
                href="/#contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  ease: easing,
                  delay: 0.25,
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        scale: 1.04,
                        boxShadow: '0 10px 30px -12px rgba(0,87,255,0.45)',
                      }
                }
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#0057FF] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0057FF]/25 transition-colors duration-200 hover:bg-[#0046cc] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Vamos conversar
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors duration-200 group-hover:bg-white group-hover:text-[#0057FF]">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.a>

              <motion.a
                href="#portfolio-mosaic"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.65,
                  ease: easing,
                  delay: 0.3,
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[#111111]/10 bg-white/60 px-5 py-3 text-sm font-semibold text-[#0f172a] shadow-sm backdrop-blur transition-colors duration-200 hover:border-[#0057FF]/30 hover:text-[#0057FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Ver mural de projetos
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </div>

          <div className="relative">
            <PortfolioHeroCards />
          </div>
        </div>
      </div>
    </section>
  );
}
