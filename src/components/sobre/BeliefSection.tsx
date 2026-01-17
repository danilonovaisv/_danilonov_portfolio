'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface BeliefSectionProps {
  text: string;
  bgColor: string;
  isFirst?: boolean;
}

export const BeliefSection: React.FC<BeliefSectionProps> = ({
  text,
  bgColor,
  isFirst = false,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Animação do texto entrando da esquerda para direita em sincronia com a mudança de cor
  const x = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    ['-100%', '-100%', '0%', '0%']
  );

  // Y acompanha o scroll para dar a sensação de ancoragem na parte superior da cor
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '-100vh']);

  // Opacidade rápida na entrada para colar com o background
  // Adicionamos um DELAY na primeira para garantir que o manifesto fixo seja lido primeiro
  const opacityRange = isFirst ? [0, 0.05, 0.95, 1] : [0, 0.05, 0.95, 1];
  const opacity = useTransform(scrollYProgress, opacityRange, [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className={`relative w-full min-h-screen flex items-start justify-start overflow-hidden pt-[25vh] sm:pt-[20vh] md:pt-[15vh] transition-colors duration-500 ease-linear ${bgColor}`}
    >
      <div className="std-grid max-w-none">
        <motion.div
          style={{ x, y, opacity }}
          className="w-full flex justify-start z-10"
        >
          <span className="text-[#4fe6ff] font-h2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5vw] 2xl:text-[6vw] leading-[0.9] tracking-[-0.04em] text-left whitespace-pre-line select-none font-black italic max-w-full sm:max-w-[60%] lg:max-w-[50%]">
            {text}
          </span>
        </motion.div>
      </div>
    </section>
  );
};
