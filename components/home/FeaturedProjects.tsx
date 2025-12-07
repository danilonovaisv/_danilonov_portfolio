'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FEATURED_PROJECTS } from '../../lib/constants';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="featured-projects"
      ref={containerRef}
      className="relative py-24 bg-[#F4F5F7] overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        {/* CTA Topo - Centralizado */}
        <div className="mb-12 md:mb-16 flex justify-center">
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-3 text-white shadow-lg hover:shadow-[#0057FF]/40 transition-all duration-300"
          >
            <span className="text-sm font-bold tracking-wide">
              let&apos;s build something great
            </span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.a>
        </div>

        {/* Layout Manual de Cards */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {/* 1ª Linha: Magic + Fearless (Branding Project 01) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start md:items-stretch h-full">
            {FEATURED_PROJECTS[0] && (
              <ProjectCard project={FEATURED_PROJECTS[0]} index={0} />
            )}
            {FEATURED_PROJECTS[1] && (
              <ProjectCard project={FEATURED_PROJECTS[1]} index={1} />
            )}
          </div>

          {/* 2ª Linha: Epic Look (Key Visual) - Full Width */}
          <div className="w-full">
            {FEATURED_PROJECTS[2] && (
              <ProjectCard project={FEATURED_PROJECTS[2]} index={2} />
            )}
          </div>

          {/* 3ª Linha: FFF (Web) + Like Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {FEATURED_PROJECTS[3] && (
              <ProjectCard project={FEATURED_PROJECTS[3]} index={3} />
            )}

            {/* Like What You See Block */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col justify-center items-center text-center h-full min-h-[300px] md:min-h-full rounded-[2.5rem] bg-white p-8 md:p-12 shadow-sm"
            >
              <h3 className="text-3xl md:text-5xl font-light text-[#111111] mb-8 leading-tight">
                Like what
                <br />
                you see?
              </h3>

              <motion.a
                href="/portfolio"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 text-white shadow-xl hover:shadow-[#0057FF]/40 transition-all duration-300"
              >
                <span className="text-lg font-bold tracking-wide">
                  view projects
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-[#0057FF] transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:text-[#0057FF]" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
