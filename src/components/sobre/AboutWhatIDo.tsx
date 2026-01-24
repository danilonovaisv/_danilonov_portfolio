'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

const SERVICES = [
  {
    id: '01',
    keyword: 'Direção criativa',
    description: ' que organiza o caos',
  },
  {
    id: '02',
    keyword: 'Design estratégico',
    description: ' que guia decisões',
  },
  {
    id: '03',
    keyword: 'Identidades',
    description: ' que permanecem na memória',
  },
  {
    id: '04',
    keyword: 'Campanhas',
    description: ' multicanais com lógica e emoção',
  },
  { id: '05', keyword: 'Branding', description: ' que não grita — mas marca' },
  {
    id: '06',
    keyword: 'Inteligência Artificial',
    description: ' aplicada à criação',
  },
  {
    id: '07',
    keyword: 'Liderança Criativa',
    description: ' com visão e método',
  },
];

export function AboutWhatIDo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = !!useReducedMotion();

  // Desktop Animation: Scroll Synced
  // Mapeia o progresso do scroll vertical (0 a 1) para o movimento horizontal.
  // Começa fora da tela (100vw) e vai até sair completamente (-100%)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['100vw', '-100%']);

  return (
    <section
      ref={containerRef}
      className="relative z-10 w-full bg-[#040013] text-white"
    >
      {/* 
        DESKTOP LAYOUT (≥ 1024px)
        Sticky Container + Horizontal Translate
      */}
      <div className="hidden lg:block lg:h-[400vh]">
        <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          {/* Header Unificado para Desktop no Topo do Scroll View */}
          <div className="absolute top-0 z-20 flex w-full justify-center pt-20">
            <div className="max-w-[800px] text-center">
              <h2 className="font-display text-5xl font-black leading-[1.2] tracking-tight text-white">
                Do <span className="text-[#0048ff]">insight</span> ao{' '}
                <span className="text-[#0048ff]">impacto</span>.
              </h2>
              <p className="mt-2 text-5xl font-black leading-[1.2] tracking-tight text-white">
                Mesmo quando você não percebe.
              </p>
            </div>
          </div>

          {/* Track Horizontal */}
          <motion.div
            style={{ x: prefersReducedMotion ? 0 : x }}
            className="flex gap-6 will-change-transform pt-40" // pt-40 compensate for header space
          >
            {SERVICES.map((service, index) => (
              <article
                key={index}
                className="flex min-h-[180px] min-w-[420px] items-center gap-6 rounded-2xl bg-[#0048ff] p-8 shadow-[0_25px_50px_-12px_rgba(0,72,255,0.5)]"
              >
                <span className="shrink-0 font-display text-6xl font-black text-[#8705f2]">
                  {service.id}
                </span>
                <p className="font-display text-2xl font-bold leading-tight text-white">
                  <strong className="text-[#4fe6ff]">{service.keyword}</strong>
                  {service.description}
                </p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 
        MOBILE LAYOUT (≤ 1023px)
        Vertical Stack + Viewport Reveal
      */}
      <div className="block py-16 lg:hidden">
        <div className="mx-auto max-w-[1680px] px-6">
          <header className="mb-16 text-center">
            <div className="mx-auto max-w-[800px]">
              <h2 className="font-display text-[2.75rem] font-black leading-[1.1] tracking-tight text-white">
                Do <span className="text-[#0048ff]">insight</span> ao{' '}
                <span className="text-[#0048ff]">impacto</span>.
              </h2>
              <p className="mt-2 font-display text-[2.75rem] font-black leading-[1.1] tracking-tight text-white">
                Mesmo quando você não percebe.
              </p>
            </div>
          </header>

          <div className="flex flex-col gap-3">
            {SERVICES.map((service, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="flex min-h-[90px] w-full items-center gap-4 rounded-xl bg-[#0048ff] p-5 shadow-lg"
              >
                <span className="shrink-0 font-display text-3xl font-black text-[#8705f2]">
                  {service.id}
                </span>
                <p className="text-sm font-semibold leading-relaxed text-white">
                  <strong className="text-[#4fe6ff]">{service.keyword}</strong>
                  {service.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
