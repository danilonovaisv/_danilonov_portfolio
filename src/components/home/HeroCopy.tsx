'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroCopyProps {
  style?: {
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    y: MotionValue<number>;
  };
}

const HeroCopy: React.FC<HeroCopyProps> = ({ style }) => {
  return (
    <motion.div
      style={style}
      className="relative z-20 flex flex-col items-center justify-center text-center px-6 pointer-events-none w-full max-w-4xl mx-auto"
    >
      {/* Label */}
      <span className="text-[#d9dade] text-sm md:text-base tracking-[0.2em] uppercase mb-6 font-light transition-opacity duration-300">
        [BRAND AWARENESS]
      </span>

      {/* Headline */}
      <h1 className="text-[#d9dade] text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-8 drop-shadow-2xl transition-colors duration-300">
        Design, não <br />é só estética.
      </h1>

      {/* Subhead */}
      <p className="text-[#d9dade] text-lg md:text-2xl font-light italic tracking-wide mb-12">
        [É intenção, é estratégia, é experiência.]
      </p>

      {/* CTA (Pointer Events Auto to clickable) */}
      <div className="pointer-events-auto flex flex-col items-center gap-4">
        <a
          href="/sobre"
          className="group relative flex items-center gap-3 bg-[#0057FF] text-white px-8 py-4 rounded-full font-medium transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,87,255,0.5)]"
          aria-label="Get to know me better"
        >
          <span className="text-lg">get to know me better</span>
          <span className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors -rotate-45 group-hover:rotate-0 duration-300">
            <ArrowRight className="w-4 h-4" />
          </span>
        </a>
      </div>
    </motion.div>
  );
};

export default HeroCopy;
