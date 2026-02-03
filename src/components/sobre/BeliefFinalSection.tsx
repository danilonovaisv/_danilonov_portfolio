'use client';
import React, { useRef } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BeliefFinalSectionProps {
  bgColor: string;
  scrollProgress: MotionValue<number>;
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({
  bgColor,
  scrollProgress,
}) => {
  const ref = useRef<HTMLElement>(null);

  // Animação de entrada
  const introStart = 0.85;
  const introEnd = 0.95;

  const opacity = useTransform(scrollProgress, [introStart, introEnd], [0, 1]);
  const scale = useTransform(scrollProgress, [introStart, introEnd], [0.95, 1]);
  const blur = useTransform(
    scrollProgress,
    [introStart, introEnd],
    ['blur(10px)', 'blur(0px)']
  );

  return (
    <motion.section
      ref={ref}
      className={`w-full h-screen overflow-hidden ${bgColor}`}
    >
      <motion.div
        style={{
          opacity,
          scale,
          filter: blur,
        }}
        className="std-grid flex h-full w-full items-center"
      >
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="hidden lg:flex items-center justify-center" aria-hidden="true" />
          <div className="flex flex-col items-center text-center text-white font-display leading-[0.9] tracking-tight uppercase font-black lg:items-start lg:text-left">
            <span className="text-[clamp(2.5rem,5vw,4rem)]">ISSO É</span>
            <span className="text-[clamp(3.5rem,9vw,6rem)] text-bluePrimary">
              GHOST
            </span>
            <span className="text-[clamp(3rem,8vw,5.5rem)]">DESIGN.</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};
