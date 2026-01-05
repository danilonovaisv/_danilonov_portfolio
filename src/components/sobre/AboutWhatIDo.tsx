'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section03Marquee from './Section03Marquee';
import { motionTokens } from './motion';

const CAPABILITIES = [
  { title: 'Direção criativa', desc: 'que organiza o caos' },
  { title: 'Design estratégico', desc: 'que guia decisões' },
  { title: 'Identidades', desc: 'que permanecem na memória' },
  { title: 'Campanhas', desc: 'multicanais com lógica e emoção' },
  { title: 'Branding', desc: 'que não grita — mas marca' },
  { title: 'Inteligência artificial', desc: 'aplicada à criação e automação' },
  { title: 'Liderança criativa', desc: 'com visão e método' },
];

export function AboutWhatIDo() {
  const prefersReducedMotion = useReducedMotion();

  const renderTitle = () => {
    return (
      <div className="text-center pt-4 md:pt-8 mb-8 md:mb-12 max-w-[860px] mx-auto z-10 relative">
        <h2 className="text-[26px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-bold italic tracking-tight leading-[1.15] text-white">
          Do <span className="text-primary">insight</span> ao{' '}
          <span className="text-primary">impacto</span>.
          <span className="text-white font-bold block mt-1">
            Mesmo quando você não percebe.
          </span>
        </h2>
      </div>
    );
  };

  return (
    <section
      className="bg-ghost-surface-deep pt-14 sm:pt-16 md:pt-20 pb-0 relative overflow-hidden flex flex-col"
      aria-label="O que eu faço"
    >
      <div className="container mx-auto px-6 max-w-[1400px] relative z-30 pb-32 md:pb-64">
        <motion.div
          variants={motionTokens.riseSoft}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {renderTitle()}
        </motion.div>

        {/* Mobile: Lista vertical | Desktop: Grid horizontal de 7 colunas */}
        <motion.div
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.06,
              },
            },
          }}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-col gap-3 md:grid md:grid-cols-7 md:gap-4"
        >
          {CAPABILITIES.map((item, index) => {
            return (
              <motion.div
                key={index}
                variants={motionTokens.riseSoft}
                className={`
                  group relative
                  bg-[#0d0d1f]/95
                  rounded-xl
                  overflow-hidden
                  
                  /* Mobile: layout horizontal */
                  flex flex-row items-center gap-3
                  px-4 py-3.5
                  
                  /* Desktop: layout vertical centrado */
                  md:flex-col md:items-center md:text-center
                  md:px-3 md:py-5
                  md:min-h-[140px]
                  
                  /* Borda com gradiente sutil */
                  border border-[#1a1a3a]/80
                  shadow-[0_4px_24px_rgba(6,7,31,0.5)]
                  
                  /* Hover sutil */
                  transition-all duration-300
                  hover:border-primary/30
                  hover:shadow-[0_8px_32px_rgba(0,87,255,0.15)]
                `}
              >
                {/* Ícone circular azul */}
                <span
                  className="
                    flex h-7 w-7 shrink-0 items-center justify-center 
                    rounded-full bg-primary 
                    text-[11px] font-bold text-white 
                    shadow-[0_4px_12px_rgba(0,87,255,0.4)]
                    md:mb-3
                  "
                >
                  ↗
                </span>

                {/* Texto */}
                <p className="text-[14px] md:text-[13px] lg:text-[14px] font-normal text-white/85 leading-snug">
                  <span className="text-primary font-semibold">
                    {item.title}
                  </span>{' '}
                  <span className="text-white/70">{item.desc}</span>
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* O Marquee continua aqui, no fundo, z-20 */}
      <Section03Marquee />
    </section>
  );
}
