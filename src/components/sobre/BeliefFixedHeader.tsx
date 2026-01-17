'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface BeliefFixedHeaderProps {
  opacity: MotionValue<number>;
}

export const BeliefFixedHeader: React.FC<BeliefFixedHeaderProps> = ({
  opacity,
}) => {
  return (
    <motion.header
      style={{ opacity }}
      className="fixed inset-0 z-100 flex items-center pointer-events-none"
    >
      <div className="std-grid w-full flex justify-end">
        <div className="flex flex-col items-end text-right w-full max-w-[280px] sm:max-w-[320px] md:max-w-[480px] lg:max-w-[700px]">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-display leading-[1.1] tracking-tighter mb-4 sm:mb-6 uppercase font-black">
            Acredito no
            <br />
            design que
            <br />
            muda o dia
            <br />
            de alguém.
          </h1>
          <h2 className="text-white text-xs sm:text-sm md:text-lg lg:text-3xl xl:text-4xl font-h2 opacity-80 leading-tight sm:leading-none tracking-normal font-bold">
            Não pelo choque,
            <br />
            mas pela conexão.
          </h2>
        </div>
      </div>
    </motion.header>
  );
};
