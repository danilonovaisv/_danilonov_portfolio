'use client';

import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { useSiteAssetsByPrefix } from '@/contexts/site-assets';

export default function ClientsBrandsSection() {
  const reducedMotion = useReducedMotion();
  const assets = useSiteAssetsByPrefix('clients.').filter(
    (asset) => asset.publicUrl
  );

  const logos =
    assets.length > 0
      ? assets.map((asset) => ({
          id: asset.key,
          src: asset.publicUrl,
          alt: asset.description ?? asset.key,
        }))
      : HOME_CONTENT.clients.logos;

  const hasLogos = logos.length > 0;

  const logoVariants: Variants = reducedMotion
    ? {
        hidden: { opacity: 1, y: 0, scale: 1 },
        show: { opacity: 1, y: 0, scale: 1 },
      }
    : {
        hidden: { opacity: 0, y: 12, scale: 0.9 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      };

  return (
    <section
      id="clients"
      className="bg-[#0048ff] py-4 md:py-20 lg:py-24 relative z-10 overflow-hidden"
      aria-label="marcas com as quais já trabalhei"
    >
      <div className="max-w-[1680px] mx-auto px-4 md:px-[clamp(24px,5vw,96px)]">
        <motion.div
          initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
          }}
          className="mb-8 md:mb-16 lg:mb-20"
        >
          <h2 className="text-white text-[1.5rem] md:text-[2rem] font-bold text-center tracking-tight leading-tight lowercase">
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
                  staggerChildren: reducedMotion ? 0 : 0.03,
                },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-6 gap-x-6 sm:gap-8 md:gap-x-12 md:gap-y-16 lg:gap-x-16 lg:gap-y-20 items-center justify-items-center"
          >
            {logos.map((logo) => (
              <motion.div
                key={logo.id}
                variants={logoVariants}
                className="group relative w-full h-10 sm:h-12 lg:h-16 flex items-center justify-center outline-none"
                tabIndex={0}
                aria-label={logo.alt}
              >
                <div className="relative w-full h-full max-w-[98px] md:max-w-[140px] flex items-center justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="w-auto h-auto max-w-full max-h-full object-contain filter brightness-0 invert opacity-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.04]"
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
            Nenhum parceiro cadastrado.
          </p>
        )}
      </div>
    </section>
  );
}
