'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Ghost Motion Tokens - Only opacity/translateY, no scale/bounce/rotate
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const fadeGhost = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: GHOST_EASE },
  },
};

const itemRise = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
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
      className="min-h-[100vh] flex items-center justify-center bg-[#040013] py-24 md:py-32"
      aria-label="O que eu faço"
    >
      <motion.div
        variants={containerVariants}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="w-full max-w-[600px] px-6 md:px-10 mx-auto flex flex-col items-center"
      >
        {/* Título e subtítulo - Ghost Style */}
        <div className="text-center mb-16 md:mb-20 space-y-4 md:space-y-5">
          <motion.h2
            variants={fadeGhost}
            className="text-3xl md:text-4xl lg:text-[42px] font-semibold text-white tracking-tight leading-tight"
          >
            {WHAT_I_DO_CONTENT.title}
          </motion.h2>
          <motion.p
            variants={fadeGhost}
            className="text-lg md:text-xl text-white/60 font-light"
          >
            {WHAT_I_DO_CONTENT.subtitle}
          </motion.p>
        </div>

        {/* Lista vertical minimalista - Ghost Style */}
        <ul className="flex flex-col items-center w-full space-y-6 md:space-y-8">
          {WHAT_I_DO_CONTENT.items.map((item, i) => (
            <motion.li
              key={i}
              variants={itemRise}
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: 1.05,
                      transition: { duration: 0.2 },
                    }
              }
              className="text-lg md:text-xl lg:text-2xl text-white/80 text-center 
                         font-light tracking-tight leading-relaxed
                         transition-opacity duration-200 cursor-default
                         hover:text-white"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
