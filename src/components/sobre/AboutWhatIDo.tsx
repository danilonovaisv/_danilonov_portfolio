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
                staggerChildren: 0.1,
              },
            },
          }}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="flex flex-col gap-8 md:gap-12 max-w-4xl mx-auto"
        >
          {CAPABILITIES.map((item, index) => {
            return (
              <motion.div
                key={index}
                variants={motionTokens.riseSoft}
                className={`
                  group relative
                  flex flex-row items-baseline gap-6
                  transition-all duration-300
                `}
              >
                {/* Ícone circular azul - Minimalista */}
                <span
                  className="
                    flex h-2.5 w-2.5 shrink-0 items-center justify-center 
                    rounded-full bg-primary mt-3
                    shadow-[0_0_10px_rgba(0,87,255,0.8)]
                  "
                />

                {/* Texto Editorial */}
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-4">
                  <h3 className="text-[20px] md:text-[24px] font-semibold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[16px] md:text-[18px] font-light text-white/50 italic leading-snug">
                    {item.desc}
                  </p>
                </div>
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
