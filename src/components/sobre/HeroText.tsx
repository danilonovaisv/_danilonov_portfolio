// src/components/about/HeroText.tsx
'use client';

import { motion } from 'framer-motion';
import { motionTokens } from './motion';

export function HeroText() {
  return (
    <div className="ml-auto max-w-[680px] text-right pr-6 md:pr-20">
      {/* Headline */}
      <motion.h1
        variants={motionTokens.fadeGhost}
        initial="hidden"
        animate="visible"
        className="text-[42px] md:text-[56px] font-medium leading-[1.1] mb-8"
      >
        Sou Danilo Novais.
      </motion.h1>

      {/* Parágrafo */}
      <motion.p
        variants={motionTokens.fadeGhost}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.35 }}
        className="text-[15px] md:text-[17px] leading-[1.7] text-white/85"
      >
        Você não vê tudo o que eu faço. Mas sente quando{' '}
        <span className="ghost-accent">funciona</span>.
        <br />
        <br />
        Crio design que observa, entende e guia experiências com{' '}
        <span className="ghost-accent">intenção</span>, estratégia e tecnologia
        — na medida certa.
      </motion.p>
    </div>
  );
}
