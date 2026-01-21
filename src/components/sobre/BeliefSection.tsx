'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion';

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

  // Intervalo de animação de entrada.
  const animationRange = isFirst ? [0.35, 0.55] : [0.1, 0.35];
  const exitRange = [0.8, 0.95];

  // Easing Ghost Padrão: cubic-bezier(0.22, 1, 0.36, 1)
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);

  const opacity = useTransform(
    scrollYProgress,
    [animationRange[0], animationRange[1], exitRange[0], exitRange[1]],
    [0, 1, 1, 0]
  );

  // Y acompanha o scroll para dar a sensação de ancoragem na parte superior da cor
  const yScroll = useTransform(scrollYProgress, [0.7, 0.95], ['0vh', '-100vh']);

  // Dividindo o texto por linhas para entrada staggered
  const lines = text.split('\n');

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen flex items-start justify-start overflow-hidden pt-[20vh] md:pt-[20vh] lg:pt-[15vh] transition-colors duration-500 ease-linear ${bgColor}`}
    >
      <div className="std-grid max-w-none">
        <motion.div
          style={{ y: yScroll, opacity }}
          className="w-full flex flex-col justify-start z-10"
        >
          {lines.map((line, i) => {
            // Cada linha tem seu próprio transform baseado no progresso
            // para criar o efeito de "levitação" suave
            const lineY = useTransform(
              scrollYProgress,
              [animationRange[0] + i * 0.02, animationRange[1] + i * 0.02],
              [40, 0],
              { ease: ghostEase }
            );

            const lineBlur = useTransform(
              scrollYProgress,
              [animationRange[0] + i * 0.02, animationRange[1] + i * 0.02],
              ['blur(10px)', 'blur(0px)'],
              { ease: ghostEase }
            );

            return (
              <div key={i} className="overflow-hidden mb-1 md:mb-2">
                <motion.span
                  style={{ y: lineY, filter: lineBlur }}
                  className="block text-[#4fe6ff] font-h2 text-4xl md:text-6xl lg:text-[5vw] xl:text-[6vw] leading-[0.9] tracking-[-0.04em] text-left whitespace-pre-line select-none font-black italic max-w-[95%] md:max-w-[85%] lg:max-w-[70%]"
                >
                  {line}
                </motion.span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
