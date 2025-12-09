'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import FluidProjectGrid from './FluidProjectGrid';
import { HOMEPAGE_CONTENT } from '../../config/homepageContent';

const PortfolioShowcaseSection: React.FC = () => {
  const showcase = HOMEPAGE_CONTENT.portfolioShowcase;
  const featuredImage = HOMEPAGE_CONTENT.projectCards[0]?.imageUrl;

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="relative w-full bg-[#f4f5f7] pb-16 pt-10 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto flex flex-col gap-10 px-6 md:px-8 max-w-6xl"
      >
        <div className="flex flex-col gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-xs uppercase tracking-[0.8em] text-[#0057FF]">
              [ what we love working on ]
            </p>
            <h2
              id="portfolio-title"
              className="text-3xl font-light uppercase tracking-[0.2em] text-[#111111] md:text-4xl lg:text-5xl"
            >
              {showcase.title}
            </h2>
          </div>

          <div className="relative w-full overflow-hidden rounded-[36px] border border-white/40 shadow-[0_30px_50px_rgba(15,23,42,0.2)] bg-black">
            {featuredImage ? (
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={featuredImage}
                  alt="Portfolio showcase hero"
                  fill
                  priority
                  sizes="(min-width: 1280px) 70vw, 100vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-[#0b4cd5] to-[#8b5cf6]" />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute top-5 right-6 rounded-full border border-white/60 bg-white/90 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#0057FF]">
              Branding
            </div>
            <div className="absolute bottom-6 left-6 rounded-full border border-white/70 bg-white/80 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#111]">
              watch now
            </div>
          </div>

          <div className="w-full rounded-[32px] border border-[#d8dde6] bg-white/80 shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
            {showcase.categories.map((category, index) => (
              <div
                key={category.id}
                className={`flex items-center justify-between px-6 py-6 text-2xl font-light tracking-tight text-[#111111] ${
                  index < showcase.categories.length - 1
                    ? 'border-b border-[#d8dde6]'
                    : ''
                }`}
              >
                <span className="leading-[1.15]">{category.label}</span>
                <ArrowRight className="h-5 w-5 text-[#0057FF]" />
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link
              href={showcase.finalCtaHref}
              className="inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white transition hover:bg-[#0b4cd5]"
            >
              {showcase.finalCtaLabel}
              <span className="text-white">↗</span>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-12">
        <FluidProjectGrid />
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
