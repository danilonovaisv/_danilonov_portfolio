'use client';

import React from 'react';
import { motion, MotionValue, useTransform, cubicBezier } from 'framer-motion';

interface BeliefFixedHeaderProps {
  opacity: MotionValue<number>;
  progress: MotionValue<number>;
}

// Helper para encapsular a lógica de Morph (Blur + Opacity + Y)
const MorphText: React.FC<{
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  className?: string;
}> = ({ children, progress, range, className }) => {
  const ghostEase = cubicBezier(0.22, 1, 0.36, 1);
  const blur = useTransform(progress, range, ['blur(12px)', 'blur(0px)'], {
    ease: ghostEase,
  });
  const opacity = useTransform(progress, range, [0, 1], { ease: ghostEase });
  const y = useTransform(progress, range, [40, 0], { ease: ghostEase });

  return (
    <motion.span
      style={{ filter: blur, opacity, y }}
      className={`block ${className || ''}`}
    >
      {children}
    </motion.span>
  );
};

export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  opacity,
  progress,
}) => {
  return (
    <motion.header
      style={{ opacity }}
      className="sticky top-0 z-30 flex h-screen items-center pointer-events-none"
    >
      <div className="std-grid w-full flex justify-end">
        <div className="flex flex-col items-end text-right w-full max-w-[320px] md:max-w-[500px] lg:max-w-[750px]">
          {/* Primeira parte: "Acredito no..." */}
          <h1 className="text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-display leading-[1.1] tracking-tighter mb-8 uppercase font-black mix-blend-difference whitespace-nowrap">
            <div className="overflow-visible">
              <MorphText progress={progress} range={[0.1, 0.2]}>
                Acredito no
              </MorphText>
            </div>
            <div className="overflow-hidden">
              <motion.span style={{ y: y2 }} className="block text-bluePrimary">
                design que
              </MorphText>
            </div>
            <div className="overflow-hidden">
              <motion.span style={{ y: y3 }} className="block text-bluePrimary">
                muda o dia
              </MorphText>
            </div>
            <div className="overflow-visible">
              <MorphText progress={progress} range={[0.16, 0.26]}>
                de alguém.
              </MorphText>
            </div>
          </h1>
          <motion.h2
            style={{ y: h2Y, opacity: h2Opacity }}
            className="text-white text-xs md:text-xl lg:text-4xl font-h2 leading-none tracking-normal font-bold"
          >
            Não pelo choque,
            <br />
            <span className="text-bluePrimary">mas pela conexão.</span>
          </motion.h2>
        </div>
      </div>
    </motion.header>
  );
};
