'use client';

import { motion } from 'framer-motion';
import { kw } from './keywords';
import { useEditorialMotion } from '@/hooks/useEditorialMotion';

const items = [
  <>Direção criativa que organiza o {kw('caos')}</>,
  <>Design estratégico que guia {kw('decisões')}</>,
  <>Identidades que permanecem na {kw('memória')}</>,
  <>Campanhas multicanais com lógica e {kw('emoção')}</>,
  <>Branding que não grita — mas {kw('marca')}</>,
  <>IA aplicada à {kw('criação')} e automação</>,
  <>Liderança criativa com {kw('visão')} e método</>,
];

export function AboutWhatIDo() {
  const { prefersReducedMotion, variants } = useEditorialMotion();

  return (
    <section className="min-h-screen flex items-center justify-center bg-(--ghost-bg) py-24">
      <motion.ul
        variants={variants.staggerContainer} // Use standardized stagger
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        className="max-w-[520px] space-y-10 px-6"
      >
        {items.map((item, i) => (
          <motion.li
            key={i}
            variants={variants.riseSoft}
            whileHover={prefersReducedMotion ? undefined : { opacity: 1, x: 5 }} // Added subtle hover move
            className="text-lg text-(--ghost-text-secondary) opacity-95 transition-opacity duration-300"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
