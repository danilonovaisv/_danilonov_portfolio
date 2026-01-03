'use client';

import { motion, useReducedMotion } from 'framer-motion';

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

const cardRise = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

// Conteúdo oficial do protótipo interativo
const WHAT_I_DO_CONTENT = {
  title: 'Do insight ao impacto.',
  subtitle: 'Mesmo quando você não percebe.',
  items: [
    'Direção criativa que organiza o caos',
    'Design estratégico que guia decisões',
    'Identidades que permanecem na memória',
    'Campanhas multicanais com lógica e emoção',
    'Branding que não grita — mas marca',
    'Inteligência artificial aplicada à criação e automação',
    'Liderança criativa com visão e método',
  ],
};

export function AboutWhatIDo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="min-h-[90vh] flex items-center bg-[#040013] py-20 md:py-28 lg:py-32"
      aria-label="O que eu faço"
    >
      <motion.div
        variants={{
          visible: {
            transition: { staggerChildren: 0.18 },
          },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="w-full max-w-[1100px] px-6 md:px-10 flex flex-col items-center"
      >
        {/* Título e subtítulo */}
        <div className="text-center mb-12 md:mb-16 space-y-3 md:space-y-4 max-w-[760px]">
          <motion.h2
            variants={fadeGhost}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-[42px] font-semibold text-[#fcffff] tracking-tight leading-tight"
          >
            {WHAT_I_DO_CONTENT.title}
          </motion.h2>
          <motion.p
            variants={fadeGhost}
            className="text-base md:text-lg lg:text-xl text-[#a1a3a3] font-light"
          >
            {WHAT_I_DO_CONTENT.subtitle}
          </motion.p>
        </div>

        {/* Grade de cartões em pills */}
        <ul className="flex flex-wrap justify-center gap-3 md:gap-4 w-full max-w-[1100px]">
          {WHAT_I_DO_CONTENT.items.map((item, i) => (
            <motion.li
              key={i}
              variants={cardRise}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: 1,
                      borderColor: 'rgba(79, 230, 255, 0.35)',
                      transition: { duration: 0.3 },
                    }
              }
              className="text-sm md:text-base text-[#e9ecff] text-center 
                         px-4 md:px-5 lg:px-6 py-2.5 md:py-3 min-h-[44px]
                         border border-[#2b2a55] rounded-full bg-[#0f0d36]/90 
                         shadow-[0_12px_28px_rgba(0,0,0,0.16)]
                         hover:bg-[#15144a]
                         transition-all duration-300 cursor-default"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
