'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import GhostEyes from './GhostEyes';

// Ghost Motion Tokens
const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PHRASES = [
  { text: 'Um vídeo que **respira**.', duration: 3500 },
  { text: 'Uma marca que se **reconhece**.', duration: 3500 },
  { text: 'Um detalhe que **fica**.', duration: 3500 },
  { text: '**Crio** para gerar presença.', duration: 3500 },
  { text: '**Mesmo** quando não estou ali.', duration: 3500 },
  { text: '**Mesmo** quando ninguém percebe o esforço.', duration: 3500 },
];

type Phase = 'initial' | 'title-visible' | 'phrases-cycling' | 'final-reveal';

export function AboutBeliefs() {
  const [phase, setPhase] = useState<Phase>('initial');
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === 'initial') {
      // Start immediately
      setPhase('title-visible');
    } else if (phase === 'title-visible') {
      // Wait 1.5s then start phrases
      timeout = setTimeout(() => setPhase('phrases-cycling'), 1500);
    } else if (phase === 'phrases-cycling') {
      if (phraseIndex < PHRASES.length) {
        timeout = setTimeout(() => {
          setPhraseIndex((prev) => prev + 1);
        }, PHRASES[phraseIndex].duration);
      } else {
        // Finished phrases, go to final reveal
        setPhase('final-reveal');
      }
    }

    return () => clearTimeout(timeout);
  }, [phase, phraseIndex]);

  // Render helpers
  const renderFormattedText = (text: string) => {
    return text.split(/(\*\*.*?\*\*)/).map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={i} className="text-primary font-bold">
            {part.slice(2, -2)}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <section
      className="min-h-screen bg-ghost-surface-deep relative overflow-hidden flex flex-col items-center justify-center py-20"
      aria-label="O que me move"
    >
      <div className="w-full max-w-[1200px] px-6 relative z-10">
        {/* 1. Static Fixed Title */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
          animate={{
            opacity: phase !== 'initial' ? 1 : 0,
            y: phase !== 'initial' ? 0 : -20,
            filter: phase !== 'initial' ? 'blur(0px)' : 'blur(10px)',
          }}
          transition={{ duration: 1.2, ease: GHOST_EASE }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Acredito no{' '}
            <span className="text-primary">design que muda o dia</span> de
            alguém.
            <br className="hidden md:block" />
            Não pelo choque,{' '}
            <span className="text-primary">mas pela conexão.</span>
          </h2>
        </motion.div>

        {/* 2. Rotating Phrases Area */}
        {phase === 'phrases-cycling' && phraseIndex < PHRASES.length && (
          <div className="h-[40vh] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={phraseIndex}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="text-2xl md:text-4xl text-center text-white font-medium max-w-[800px]"
              >
                {renderFormattedText(PHRASES[phraseIndex].text)}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        {/* 3. Final Reveal */}
        {phase === 'final-reveal' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12 md:mt-0">
            {/* Ghost */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="flex justify-center lg:justify-end"
            >
              <div className="w-48 h-48 md:w-64 md:h-64 relative">
                <GhostEyes interactive={true} />
              </div>
            </motion.div>

            {/* Manifesto Text */}
            <motion.div
              initial={{ opacity: 0, x: -30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.0, delay: 0.4, ease: 'easeOut' }}
              className="text-center lg:text-left"
            >
              <h3 className="text-4xl md:text-6xl font-bold leading-none tracking-tight">
                <span className="text-white block mb-2">ISSO É</span>
                <span className="text-primary">GHOST DESIGN.</span>
              </h3>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
