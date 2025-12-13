'use client';

import React from 'react';
import { motion } from 'framer-motion';

export type MosaicItem = {
  id: string;
  imageSrc?: string;
  gradient: string;
  accent?: string;
};

export type MosaicRow = {
  id: string;
  columns: 1 | 2 | 3;
  items: MosaicItem[];
};

type PortfolioMosaicGridProps = {
  rows: MosaicRow[];
};

const easing = [0.22, 1, 0.36, 1] as const;

const cardTransition = {
  duration: 0.5,
  ease: easing,
};

const getWidthClass = (columns: MosaicRow['columns']) => {
  if (columns === 3) return 'sm:w-1/3';
  if (columns === 2) return 'sm:w-1/2';
  return 'sm:w-full';
};

export default function PortfolioMosaicGrid({ rows }: PortfolioMosaicGridProps) {
  return (
    <section
      id="portfolio-mosaic"
      className="relative bg-[#f7f7f7] text-[#0f172a]"
      aria-label="Mural de projetos em mosaico"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-0 pb-28 pt-8 sm:px-6 sm:pt-14 lg:px-10">
        <div className="overflow-hidden rounded-3xl border border-white/40 bg-white shadow-[0_30px_60px_-45px_rgba(0,0,0,0.35)]">
          {rows.map((row) => (
            <div key={row.id} className="flex w-full flex-wrap sm:flex-nowrap">
              {row.items.map((item) => {
                const widthClass = getWidthClass(row.columns);

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={cardTransition}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{
                      scale: 1.01,
                      filter: 'saturate(1.05)',
                    }}
                    className={`group relative w-full ${widthClass} overflow-hidden`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <div
                        className="absolute inset-0"
                        style={{
                          background: item.gradient,
                        }}
                      />

                      {item.imageSrc ? (
                        <img
                          src={item.imageSrc}
                          alt=""
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      ) : null}

                      <div className="absolute inset-0 bg-gradient-to-br from-black/22 via-transparent to-white/10 mix-blend-multiply" />
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-70">
                        <div
                          className="absolute inset-0"
                          style={{
                            background: `radial-gradient(circle at 40% 30%, rgba(255,255,255,0.28), transparent 35%), radial-gradient(circle at 90% 80%, ${
                              item.accent ?? 'rgba(0,87,255,0.45)'
                            }, transparent 45%)`,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
