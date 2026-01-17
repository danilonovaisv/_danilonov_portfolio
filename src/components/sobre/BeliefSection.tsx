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

  // Intervalo de animação de entrada.
  const animationRange = isFirst ? [0.35, 0.55] : [0.1, 0.4];
  const exitRange = [0.8, 0.95];

  // Aplicando uma curva de easing para uma animação mais orgânica, similar à referência.
  // O texto terá uma aceleração e desaceleração suaves.
  const opacity = useTransform(
    scrollYProgress,
    [animationRange[0], animationRange[1], exitRange[0], exitRange[1]],
    [0, 1, 1, 0],
    { ease: (v) => 0.5 - 0.5 * Math.cos(Math.PI * v) } // Easing sinusoidall
  );

  const x = useTransform(
    scrollYProgress,
    [animationRange[0], animationRange[1]],
    ['-100%', '0%'],
    { ease: (v) => 1 - Math.pow(1 - v, 3) } // Easing easeOutCubic
  );

  // Y acompanha o scroll para dar a sensação de ancoragem na parte superior da cor
  const y = useTransform(scrollYProgress, [0.7, 0.95], ['0vh', '-100vh']);

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen flex items-start justify-start overflow-hidden pt-[20vh] md:pt-[20vh] lg:pt-[15vh] transition-colors duration-500 ease-linear ${bgColor}`}
    >
      <div className="std-grid max-w-none">
        <div className="overflow-hidden">
          <motion.div
            style={{ x, y, opacity }}
            className="w-full flex justify-start z-10"
          >
            <span className="text-[#4fe6ff] font-h2 text-4xl md:text-6xl lg:text-[5vw] xl:text-[6vw] leading-[0.9] tracking-[-0.04em] text-left whitespace-pre-line select-none font-black italic max-w-[85%] md:max-w-[70%] lg:max-w-[50%]">
              {text}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
