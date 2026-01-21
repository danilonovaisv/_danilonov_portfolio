'use client';

import React, { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  cubicBezier,
  useTransform,
} from 'framer-motion';
import { BeliefFixedHeader } from './BeliefFixedHeader';

const PHRASES = [
  'Um vídeo\nque respira.',
  'Uma marca\n que se\n reconhece.',
  'Um detalhe\n que fica.',
  'Crio para\n gerar\n presença.',
  'Mesmo\n quando\n ninguém\npercebe\n o esforço.',
];

const COLORS = [
  '#0048ff', // bluePrimary
  '#8705f2', // purpleDetails
  '#f501d3', // pinkDetails (Added from reference)
  '#0048ff',
  '#8705f2',
];

const FINAL_COLOR = '#0048ff';

// Easing da referência: [0.25, 0.46, 0.45, 0.94]
const REFERENCE_EASING = [0.25, 0.46, 0.45, 0.94];
const ghostEase = cubicBezier(0.25, 0.46, 0.45, 0.94);

export const AboutBeliefs: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const totalSteps = PHRASES.length + 1;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const nextStep = Math.min(
      totalSteps - 1,
      Math.max(0, Math.floor(latest * totalSteps))
    );
    if (nextStep !== stepIndex) setStepIndex(nextStep);
  });

  const isFinalStep = stepIndex === totalSteps - 1;
  const currentPhrase = PHRASES[Math.min(stepIndex, PHRASES.length - 1)];
  const backgroundColor = isFinalStep
    ? FINAL_COLOR
    : COLORS[stepIndex % COLORS.length];

  // Header Opacity (linked to section entry/exit)
  const headerOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.1, 0.9, 0.98],
    [0, 1, 1, 0]
  );

  return (
    <motion.section
      ref={containerRef}
      initial={{ backgroundColor: COLORS[0] }}
      animate={{ backgroundColor }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full"
      style={{ height: `${totalSteps * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <BeliefFixedHeader opacity={headerOpacity} progress={scrollYProgress} />

        <div className="std-grid w-full h-full flex items-center justify-center">
          <div className="relative w-full flex items-center justify-center pt-[20vh]">
            <AnimatePresence mode="wait">
              {!isFinalStep && (
                <motion.p
                  key={currentPhrase}
                  initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -28, filter: 'blur(12px)' }}
                  transition={{ duration: 0.8, ease: REFERENCE_EASING }}
                  className="text-[#4fe6ff] font-h2 text-4xl md:text-6xl lg:text-[5vw] xl:text-[6vw] leading-[0.9] tracking-[-0.04em] text-center whitespace-pre-line select-none font-black italic max-w-[90%]"
                >
                  {currentPhrase}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {isFinalStep && (
                <motion.div
                  key="final-section"
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.88, filter: 'blur(12px)' }}
                  transition={{ duration: 0.8, ease: REFERENCE_EASING }}
                  className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full"
                >
                  <div className="text-[12vw] md:text-[14rem] tracking-tighter uppercase font-black">
                    ISSO É
                  </div>
                  <div className="text-[25vw] md:text-[25rem] font-black tracking-tighter uppercase">
                    GHOST
                  </div>
                  <div className="text-[18vw] md:text-[19rem] tracking-tighter uppercase font-black">
                    DESIGN
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutBeliefs;
