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

// Conteúdo oficial do protótipo interativo
const CLOSING_CONTENT = {
  text: [
    'Hoje sou Diretor de Criação,',
    'com mais de 10 anos de estrada.',
    '',
    'Já liderei marcas, agências, eventos',
    'e criei experiências para todos os canais.',
    '',
    'Agora, quero criar algo que permaneça —',
    'com você.',
  ],
  ctas: [
    { label: 'Fale comigo', href: '/contato', external: false },
    {
      label: 'Download Curriculum',
      href: '/cv.pdf',
      external: true,
    },
  ],
};

export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="min-h-[70vh] flex items-center justify-center px-6 md:px-12 lg:px-20 bg-[#040013] py-20 md:py-28"
      aria-label="Fechamento"
    >
      <motion.div
        variants={fadeGhost}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="w-full max-w-[1100px] text-[#fcffff]"
      >
        <div className="h-px w-full bg-white/10 mb-10 md:mb-12" aria-hidden />
        {/* Texto de fechamento */}
        <div className="mb-10 md:mb-12 text-center md:text-left space-y-2">
          {CLOSING_CONTENT.text.map((line, i) =>
            line === '' ? (
              <br key={i} />
            ) : (
              <p
                key={i}
                className="text-lg md:text-xl lg:text-2xl font-light leading-relaxed"
              >
                {line.includes('permaneça') ? (
                  <>
                    Agora, quero criar algo que{' '}
                    <span className="ghost-accent">permaneça</span> —
                  </>
                ) : (
                  line
                )}
              </p>
            )
          )}
        </div>

        {/* CTAs - Stack vertical mobile, row desktop */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-4 md:gap-6">
          {CLOSING_CONTENT.ctas.map((cta, i) =>
            cta.external ? (
              <a
                key={i}
                href={cta.href}
                className="text-sm md:text-base font-semibold tracking-tight rounded-full px-6 md:px-7 py-3 
                           bg-[#0048ff] text-white shadow-none
                           hover:opacity-90 transition-opacity duration-200 min-h-[46px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                {cta.label}
              </a>
            ) : (
              <Link
                key={i}
                href={cta.href}
                className={`text-sm md:text-base font-semibold tracking-tight rounded-full px-6 md:px-7 py-3 min-h-[46px]
                           transition-opacity duration-200 ${
                             i === 0
                               ? 'bg-[#0048ff] text-white shadow-none hover:opacity-90'
                               : 'border border-white/35 text-white hover:border-white/60 hover:opacity-90'
                           }`}
              >
                {cta.label}
              </Link>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
