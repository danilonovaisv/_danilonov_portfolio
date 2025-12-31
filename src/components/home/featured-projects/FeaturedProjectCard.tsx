'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '@/components/ui/ArrowIcon';

export type FeaturedProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  client: string;
  year: number;
  tags: string[];
  image: string;
  layout: { h: string; cols: string; sizes: string };
};

interface FeaturedProjectCardProps {
  project: FeaturedProject;
}

export default function FeaturedProjectCard({
  project,
}: FeaturedProjectCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
      aria-label={`Ver projeto: ${project.title}`}
    >
      <div
        className={`relative overflow-hidden rounded-md ${project.layout.h} w-full bg-white shadow-[0_12px_48px_-28px_rgba(0,87,255,0.35)] transition-shadow duration-500 ${
          reducedMotion
            ? ''
            : 'group-hover:shadow-[0_22px_54px_-26px_rgba(0,87,255,0.26)]'
        }`}
      >
        <div className="absolute top-4 right-4 z-20 flex gap-1.5 flex-wrap justify-end">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-[#E6EFEF]/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs md:text-sm font-medium uppercase tracking-wide text-text-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes={project.layout.sizes}
          className={`object-cover transition-transform duration-500 ${
            reducedMotion
              ? ''
              : 'group-hover:scale-[1.03] group-hover:-translate-y-1'
          }`}
        />
      </div>

      <div className="mt-4 flex justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#fcffff]/60 text-sm md:text-base leading-tight">
            <span className="uppercase tracking-wide text-xs md:text-sm">
              {project.category}
            </span>
            <span aria-hidden className="text-xs md:text-sm">
              •
            </span>
            <span className="text-sm md:text-base">
              {project.client} • {project.year}
            </span>
          </div>
          <h3 className="text-lg md:text-xl font-medium leading-tight text-[#fcffff] mt-1.5">
            {project.title}
          </h3>
        </div>

        <div
          className={`bg-[#0057FF] w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0 transition-all duration-500 ${
            reducedMotion
              ? ''
              : 'group-hover:scale-110 group-hover:bg-[#4fe6ff] group-hover:text-[#0d003b]'
          }`}
        >
          <motion.div
            animate={reducedMotion ? {} : { x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowIcon className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </Link>
  );
}
