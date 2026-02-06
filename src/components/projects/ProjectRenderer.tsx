'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { LandingPageBlock } from '@/types/landing-page';
import {
  parseLandingPageContent,
  resolveSiteAssetUrl,
} from '@/lib/projects/template-schema';
import {
  MASTER_PROJECT_TEMPLATE,
  MASTER_PROJECT_TEMPLATE_V2,
  MASTER_PROJECT_TEMPLATE_V3,
} from '@/types/project-template';
import BlockRenderer from './BlockRenderer';
import MasterProjectTemplate from './templates/MasterProjectTemplate';
import ProjectTemplateMasterRenderer from './templates/ProjectTemplateMasterRenderer';
import ProjectTemplateALPARenderer from './templates/ProjectTemplateALPARenderer';

interface ProjectRendererProps {
  project: {
    title: string;
    slug?: string;
    cover?: string | null;
    content: unknown;
  };
}

function LegacyProjectRenderer({
  project,
  blocks,
}: {
  project: { title: string; cover?: string | null };
  blocks: LandingPageBlock[];
}) {
  const coverUrl = resolveSiteAssetUrl(project.cover ?? '');

  const searchParams = useSearchParams();
  const from = searchParams.get('from');
  const backUrl = from === 'portfolio' ? '/portfolio' : '/';
  const backLabel =
    from === 'portfolio' ? 'Voltar ao Portfólio' : 'Voltar para Home';

  return (
    <div className="bg-[#040013] text-white selection:bg-blue-600 selection:text-white">
      <section className="relative flex h-[90vh] w-full flex-col items-center justify-center overflow-hidden">
        {coverUrl && (
          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={coverUrl}
              alt={project.title}
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#040013]/50 to-[#040013]" />
          </motion.div>
        )}

        <div className="pointer-events-none absolute top-0 left-0 z-50 flex w-full items-start justify-between p-6 md:p-10">
          <Link
            href={backUrl}
            className="pointer-events-auto group flex items-center gap-3 text-white/50 transition-colors duration-300 hover:text-white"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/20 backdrop-blur-md transition-all group-hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </div>
            <span className="-translate-x-2 text-sm font-medium uppercase tracking-widest opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              {backLabel}
            </span>
          </Link>
        </div>

        <div className="std-grid relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl font-bold tracking-tighter md:text-8xl lg:text-9xl"
          >
            {project.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-12 flex justify-center"
          >
            <div className="h-24 w-px bg-linear-to-b from-blue-600 to-transparent" />
          </motion.div>
        </div>
      </section>

      <div className="space-y-32 pb-32 md:space-y-64">
        {blocks.length > 0 ? (
          blocks.map((block, index) => (
            <BlockRenderer
              key={block.id ?? `block-${index}`}
              block={block}
              index={index}
            />
          ))
        ) : (
          <div className="py-20 text-center text-slate-500">
            Sem conteúdo disponível.
          </div>
        )}
      </div>

      <section className="border-t border-white/5 py-32">
        <div className="std-grid space-y-8 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-400">
            Obrigado por assistir
          </p>
          <h2 className="text-4xl font-bold md:text-6xl">
            Quer criar algo incrível?
          </h2>
          <div className="flex justify-center pt-8">
            <Link
              href="/#contact"
              className="inline-block rounded-full bg-blue-600 px-12 py-5 text-lg font-bold transition-all duration-500 hover:bg-white hover:text-blue-600"
            >
              Vamos Conversar
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProjectRenderer({ project }: ProjectRendererProps) {
  const parsed = parseLandingPageContent(project.content, {
    slug: project.slug,
    title: project.title,
    cover: project.cover,
  });

  if (parsed.template === MASTER_PROJECT_TEMPLATE) {
    return <MasterProjectTemplate project={parsed.data} />;
  }

  if (parsed.template === MASTER_PROJECT_TEMPLATE_V2) {
    return <ProjectTemplateMasterRenderer project={parsed.data} />;
  }

  if (parsed.template === MASTER_PROJECT_TEMPLATE_V3) {
    return <ProjectTemplateALPARenderer project={parsed.data} />;
  }

  return <LegacyProjectRenderer project={project} blocks={parsed.blocks} />;
}
