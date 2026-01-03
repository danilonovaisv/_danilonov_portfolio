'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/CTAButton';

interface HeroCopyProps {
  startEntrance?: boolean;
}

export function HeroCopy({ startEntrance = false }: HeroCopyProps) {
  // Configuração de animação para consistência

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between z-10 py-[12vh] md:py-[10vh] pointer-events-none">
      {/* 1. TOPO: TAG [BRAND AWARENESS] */}
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={
          startEntrance ? { opacity: 0.8, y: 0 } : { opacity: 0, y: -20 }
        }
        transition={{ delay: 3.0, duration: 1.0, ease: 'easeOut' }}
        className="font-mono text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-cyan-400"
      >
        [BRAND AWARENESS]
      </motion.span>

      {/* 2. MEIO: Área Reservada para o Texto WebGL + SEO */}
      <div className="flex flex-col items-center justify-center flex-1 w-full relative">
        <div className="sr-only">
          <h1 className="text-8xl font-black">Você não vê o design.</h1>
          <h2 className="text-6xl font-black">Mas ele vê você.</h2>
        </div>

        {/* Espaçador para o CTA Central */}
        <div className="h-[20vh] md:h-[30vh] w-full" />

        <motion.div
          className="pointer-events-auto mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={startEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 4.2, duration: 0.8 }}
        >
          <CTAButton href="/sobre" variant="primary">
            step inside
          </CTAButton>
        </motion.div>
      </div>

      {/* 3. FUNDO: CTA Secundário (Ghost) */}
      <motion.div
        className="pointer-events-auto mt-auto"
        initial={{ opacity: 0 }}
        animate={startEntrance ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ delay: 4.8, duration: 1.0 }}
      >
        <CTAButton href="/sobre" variant="ghost">
          step inside
        </CTAButton>
      </motion.div>
    </div>
  );
}

export default HeroCopy;
