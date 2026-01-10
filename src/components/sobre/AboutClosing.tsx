'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { motionTokens } from './motion';
import { AntigravityCTA } from '@/components/ui/AntigravityCTA';

export function AboutClosing() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="flex items-center justify-center px-6 md:px-12 lg:px-20 bg-background py-20 md:py-24"
      aria-label="Fechamento"
    >
      <motion.div
        variants={motionTokens.fadeGhost}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="w-full max-w-[1200px]"
      >
        {/* Título Principal + Linhas */}
        <div className="flex flex-col items-center text-center">
          <div className="h-px w-full max-w-[980px] bg-accent/60 mb-8 md:mb-10" />
          <h2 className="text-[32px] sm:text-[36px] md:text-[36px] lg:text-[42px] font-semibold leading-tight text-white max-w-[900px]">
            Hoje sou <span className="text-primary">Diretor de Criação</span>,
            <br />
            com mais de <span className="text-primary">10 anos de estrada</span>
            .
          </h2>
          <div className="h-px w-full max-w-[980px] bg-accent/60 mt-8 md:mt-10" />
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
          {/* Parágrafos de Contexto */}
          <div className="space-y-5 max-w-[560px] mx-auto text-center">
            <p className="text-[18px] md:text-[18px] lg:text-[19px] font-normal leading-relaxed text-text-light opacity-90">
              Já liderei marcas, agências, eventos
              <br className="hidden md:block" />e{' '}
              <span className="text-primary font-medium">
                criei experiências
              </span>{' '}
              para todos os canais.
            </p>
            <p className="text-[18px] md:text-[18px] lg:text-[19px] font-normal leading-relaxed text-text-light opacity-90">
              Agora, quero criar algo que permaneça
              <br className="hidden md:block" />—{' '}
              <span className="text-primary font-medium">com você</span>.
            </p>
          </div>

          {/* CTAs - Using AntigravityCTA component */}
          <div className="flex flex-row lg:flex-col items-center justify-center gap-4 md:gap-5 justify-self-center">
            <AntigravityCTA
              href="/contato"
              label="fale comigo"
              variant="primary"
              size="sm"
              ariaLabel="Entrar em contato"
            />

            <AntigravityCTA
              href="/cv.pdf"
              label="baixar curriculum"
              variant="secondary"
              size="sm"
              external
              ariaLabel="Baixar curriculum em PDF"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
