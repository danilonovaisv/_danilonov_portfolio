'use client';

import Image from 'next/image';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { MOTION_TOKENS, ghostTransition } from '@/config/motion';

const { duration, stagger, offset } = MOTION_TOKENS;

// Use logos directly from content - already includes id, src, alt
const logos = HOME_CONTENT.clients.logos;

export default function ClientsBrandsSection() {
  const reducedMotion = useReducedMotion();
  const hasLogos = logos.length > 0;

  // Ghost Era: sem scale, apenas opacity + y movement
  const logoVariants = reducedMotion
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: offset.subtle, filter: 'blur(4px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: ghostTransition(0, duration.normal),
        },
      };

  return (
    <section
      id="clients"
      className="bg-section-clients py-12 md:py-16 lg:py-24 relative z-10"
      aria-label="Clientes e Parcerias"
    >
      {/* Container: 16px padding mobile, fluid desktop */}
      <div className="max-w-[1300px] mx-auto px-4 md:px-[clamp(24px,5vw,72px)]">
        <motion.div
          initial={
            reducedMotion ? { opacity: 1 } : { opacity: 0, y: offset.subtle }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={ghostTransition(0, duration.normal)}
          className="mb-8 md:mb-12 lg:mb-16"
        >
          {/* Título: 1.5rem mobile, 2rem desktop (spec linha 1908) */}
          <h2 className="text-white text-2xl md:text-[28px] lg:text-[32px] font-bold text-center tracking-tight leading-tight">
            {HOME_CONTENT.clients.title}
          </h2>
        </motion.div>

        {hasLogos ? (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: reducedMotion ? 0 : stagger.tight,
                },
              },
            }}
            // Grid: 2 cols small mobile → 3 cols larger mobile → 4 cols md → 6 cols lg (spec linha 1905)
            // Gap: 16px mobile → 24px larger, aumentando para desktop (spec linhas 1907-1909)
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-x-10 md:gap-y-12 lg:gap-x-12 lg:gap-y-16 items-center justify-items-center"
          >
            {logos.map((l) => (
              <motion.div
                key={l.src}
                variants={logoVariants}
                // Altura: 70% do desktop no mobile (spec linha 1906)
                className="group relative w-full h-10 sm:h-11 md:h-12 lg:h-14 flex items-center justify-center outline-none transition-all duration-300 hover:brightness-110"
                tabIndex={0}
                aria-label={l.alt}
              >
                {/* Max-width: menor no mobile para respeitar proporção 70% */}
                <div className="relative w-full h-full max-w-[90px] sm:max-w-[100px] md:max-w-[120px] lg:max-w-[140px]">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    fill
                    unoptimized
                    className="object-contain filter brightness-0 invert opacity-[0.9] transition-all duration-500 group-hover:opacity-100 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p
            role="status"
            className="text-center text-white/40 text-sm font-mono uppercase tracking-widest"
            aria-live="polite"
          >
            Failed to load partners.
          </p>
        )}
      </div>
    </section>
  );
}
