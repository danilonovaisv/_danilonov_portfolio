'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import GhostEyes from './GhostEyes';

// Conteúdo oficial do protótipo interativo
const BELIEFS_CONTENT = [
  [
    'Acredito no design que muda o dia de alguém.',
    'Não pelo choque —',
    'mas pela conexão.',
  ],
  [
    'Um vídeo que respira.',
    'Uma marca que se reconhece.',
    'Um detalhe que fica.',
  ],
  [
    'Crio para gerar presença.',
    'Mesmo quando não estou ali.',
    'Mesmo quando ninguém percebe o esforço.',
  ],
];

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const timeBasedFade = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: GHOST_EASE },
  },
  exit: {
    opacity: 0,
    filter: 'blur(6px)',
    transition: { duration: 0.6, ease: GHOST_EASE },
  },
};

export function AboutBeliefs() {
  const prefersReducedMotion = useReducedMotion();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;

    const timer = setTimeout(
      () => {
        if (currentBlockIndex < BELIEFS_CONTENT.length - 1) {
          setCurrentBlockIndex((prev) => prev + 1);
        }
      },
      currentBlockIndex === 0 ? 1800 : 1500
    );

    return () => clearTimeout(timer);
  }, [currentBlockIndex, isInView, prefersReducedMotion]);

  return (
    <section
      className="min-h-[100vh] flex flex-col items-center justify-center text-center bg-[#040013] py-20 md:py-28 lg:py-32"
      aria-label="O que me move"
    >
      <div className="w-full max-w-[900px] px-6 md:px-10 flex flex-col items-center gap-16">
        <div className="space-y-16 min-h-[320px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {prefersReducedMotion ? (
              BELIEFS_CONTENT.map((block, idx) => (
                <div key={idx} className="space-y-2">
                  {block.map((line) => (
                    <p
                      key={line}
                      className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))
            ) : (
              <motion.div
                key={currentBlockIndex}
                variants={timeBasedFade}
                initial="hidden"
                animate="visible"
                exit="exit"
                onViewportEnter={() => setIsInView(true)}
                viewport={{ once: true, margin: '-20%' }}
                className="space-y-2"
              >
                {BELIEFS_CONTENT[currentBlockIndex].map((line) => (
                  <p
                    key={line}
                    className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed font-light"
                  >
                    {line}
                  </p>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ghost Eyes - Subtle accent, not dominant poster */}
        <motion.div
          variants={timeBasedFade}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col items-center gap-6 opacity-80"
        >
          <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32">
            <GhostEyes interactive={false} />
          </div>
          <div className="space-y-1">
            <p className="text-xl md:text-2xl font-semibold tracking-tight text-white/90">
              ISSO É
            </p>
            <p className="text-xl md:text-2xl font-semibold tracking-tight">
              <span className="text-primary">GHOST</span>{' '}
              <span className="text-white/90">DESIGN.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
