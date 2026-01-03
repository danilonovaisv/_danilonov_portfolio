'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="min-h-[70vh] flex items-center justify-center px-6 md:px-12 lg:px-20 bg-ghost-surface-deep py-20 md:py-28"
      aria-label="Fechamento"
    >
      <motion.div
        variants={fadeGhost}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="w-full max-w-[1100px] flex flex-col items-center text-center"
      >
        {/* Título Principal */}
        <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-bold leading-tight mb-8 md:mb-10 text-white max-w-[800px]">
          Hoje sou <span className="text-primary">Diretor de Criação</span>,
          <br />
          com mais de <span className="text-primary">10 anos de estrada</span>.
        </h2>

        {/* Parágrafos de Contexto */}
        <div className="space-y-6 md:space-y-8 mb-12 md:mb-14 max-w-[700px]">
          <p className="text-lg md:text-xl lg:text-[22px] font-light leading-relaxed text-[#fcffff] opacity-90">
            Já liderei marcas, agências, eventos
            <br className="hidden md:block" />e{' '}
            <span className="text-primary font-medium">criei experiências</span>{' '}
            para todos os canais.
          </p>
          <p className="text-lg md:text-xl lg:text-[22px] font-light leading-relaxed text-[#fcffff] opacity-90">
            Agora, quero criar algo que permaneça —<br />
            <span className="text-primary font-medium">com você</span>.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
          {/* Primary: Fale Comigo */}
          <Link
            href="/contato"
            className="group relative bg-primary text-white rounded-full px-8 py-4 text-base md:text-lg font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
          >
            Fale comigo
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              ↗
            </span>
          </Link>

          {/* Secondary: Download CV */}
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-transparent border-2 border-primary text-primary rounded-full px-8 py-4 text-base md:text-lg font-semibold hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-300 w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2"
          >
            Baixar curriculum
            <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              ↗
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
