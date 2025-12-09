'use client';

import Image from 'next/image';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  PROJECT_SHOWCASE_CARDS,
  ProjectShowcaseCard,
} from '../../lib/constants';

const ProjectBlockCard = ({
  card,
  index,
}: {
  card: ProjectShowcaseCard;
  index: number;
}) => (
  <motion.article
    className="group relative flex flex-col overflow-hidden rounded-[34px] border border-white/70 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10%' }}
    transition={{ delay: index * 0.08, duration: 0.7, ease: 'easeOut' }}
  >
    <div className="relative aspect-[16/9] w-full overflow-hidden">
      <Image
        src={card.imageUrl}
        fill
        priority={index === 0}
        sizes="(min-width: 1024px) 50vw, 100vw"
        alt={card.title}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: card.overlayGradient }}
      />
    </div>

    <div className="flex flex-col gap-3 px-6 py-7">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#0057FF]">
            {card.category}
          </p>
          <h3 className="text-2xl font-semibold text-[#111111] md:text-3xl leading-tight">
            {card.title}
          </h3>
          <p className="text-base text-[#111111]/80">{card.subtitle}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0057FF] text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {card.tags.map((tag) => (
          <span
            key={`${card.id}-${tag}`}
            className="rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.4em] text-[#111111]/70"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.article>
);

const FluidProjectGrid: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="w-full"
  >
    <div className="container mx-auto px-4 md:px-8 max-w-6xl">
      <div className="grid grid-cols-1 gap-8 lg:gap-10 xl:grid-cols-2">
        {PROJECT_SHOWCASE_CARDS.map((card, index) => (
          <ProjectBlockCard card={card} index={index} key={card.id} />
        ))}
      </div>
    </div>
  </motion.div>
);

export default FluidProjectGrid;
