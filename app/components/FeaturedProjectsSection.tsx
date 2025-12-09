'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { featuredProjects, Project } from '@/content/projects';
import ProjectCard from './ProjectCard';

type FeaturedProjectsSectionProps = {
  projects?: Project[];
};

const ctaVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const FeaturedProjectsSection = ({ projects = featuredProjects }: FeaturedProjectsSectionProps) => {
  const arranged = projects.slice(0, 4);
  const [smallProject, mediumProject, wideProject, rectangleProject] = arranged;

  return (
    <section id="featured-projects" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[0.65rem] uppercase tracking-[0.6em] text-[#0057FF]">featured projects</span>
          <h2 className="text-3xl font-semibold text-[#111111] sm:text-4xl lg:text-5xl">
            Recent collaborations
          </h2>
        </div>

        <div className="space-y-8">
          {(smallProject || mediumProject) && (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
              {smallProject && (
                <ProjectCard project={smallProject} index={0} className="w-full" />
              )}
              {mediumProject && (
                <ProjectCard project={mediumProject} index={1} className="w-full" />
              )}
            </div>
          )}

          {wideProject && (
            <div className="w-full">
              <ProjectCard project={wideProject} index={2} className="w-full" />
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] lg:items-stretch">
            {rectangleProject && (
              <ProjectCard project={rectangleProject} index={3} className="w-full h-full" />
            )}

            <motion.div
                variants={ctaVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.6 }}
                className="flex min-h-[260px] w-full flex-col justify-between gap-6 rounded-[1.5rem] bg-[#F4F5F7] p-8"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.45em] text-[#7D8297]">portfolio</p>
                  <h3 className="mt-4 text-3xl font-light text-[#111111] leading-tight">
                    Like what <br /> you see?
                  </h3>
                </div>
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-3 rounded-full bg-[#0057FF] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-all duration-300 hover:bg-[#0045d6]"
                >
                  view projects
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
