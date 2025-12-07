'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { HOMEPAGE_CONTENT } from '../../config/homepageContent';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from '../ui/ProjectCard';

const FeaturedProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const projects = HOMEPAGE_CONTENT.projectCards;

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
            whileHover={{ scale: 1.05, translateY: -1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-8 py-3 text-white shadow-lg hover:shadow-[#0057FF]/40 transition-all duration-300"
          >
            <span className="text-sm font-bold tracking-wide">
              let&apos;s build something great
            </span>
            <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        {/* Layout Manual de Cards - com motion container */}
        <motion.div
          className="flex flex-col gap-16 lg:gap-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1, duration: 0.6 },
            },
          }}
        >
          {/* 1ª Linha: Magic + Fearless - Asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-16 items-start">
            {projects[0] && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="w-full"
              >
                <ProjectCard
                  project={projects[0]}
                  index={0}
                  className="md:aspect-4/3 aspect-[4/3.5]"
                />
              </motion.div>
            )}
            {projects[1] && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="w-full md:pt-24"
              >
                <ProjectCard
                  project={projects[1]}
                  index={1}
                  className="md:aspect-[3.5/4] aspect-4/3"
                />
              </motion.div>
            )}
          </div>

          {/* 2ª Linha: Epic Look - Full Width */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            className="w-full"
          >
            {projects[2] && (
              <ProjectCard
                project={projects[2]}
                index={2}
                className="aspect-video md:aspect-[2.4/1]"
              />
            )}
          </motion.div>

          {/* 3ª Linha: FFF + Like Block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-16 items-center">
            {projects[3] && (
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="w-full"
              >
                <ProjectCard project={projects[3]} index={3} />
              </motion.div>
            )}

            {/* Like What You See Block */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              className="flex flex-col justify-center items-center text-center h-full min-h-[300px]"
            >
              <h3 className="text-3xl md:text-5xl font-light text-[#111111] mb-8 leading-tight">
                Like what
                <br />
                you see?
              </h3>

              <motion.a
                href="/portfolio"
                whileHover={{ scale: 1.05, translateY: -1 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-5 text-white shadow-xl hover:shadow-[#0057FF]/40 transition-all duration-300"
              >
                <span className="text-lg font-bold tracking-wide">
                  view projects
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 group-hover:bg-white text-[#0057FF] transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white group-hover:animate-pulse-horizontal" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
