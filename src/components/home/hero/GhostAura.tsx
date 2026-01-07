'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * GhostAura - Camadas visuais etéreas flutuantes
 * Inspirado na estética "Ghost" do CodePen: https://codepen.io/danilonovaisv/pen/YPWyrdW
 * Cria orbs com blur e movimento flutuante para reforçar a atmosfera etérea.
 */
export default function GhostAura() {
  const auraCommon =
    'absolute rounded-full bg-white opacity-10 blur-3xl pointer-events-none';

  return (
    <div className="absolute inset-0 z-10 overflow-hidden" aria-hidden="true">
      {/* Orb Superior Esquerdo - Movimento lento e sutil */}
      <motion.div
        className={cn(auraCommon, 'w-96 h-96 top-[20%] left-[10%]')}
        animate={{
          y: [0, 30, 0],
          x: [0, -10, 0],
          opacity: [0.07, 0.1, 0.07],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orb Inferior Direito - Movimento oposto para contraste */}
      <motion.div
        className={cn(
          auraCommon,
          'w-[400px] h-[400px] bottom-[15%] right-[5%]'
        )}
        animate={{
          y: [0, -25, 0],
          x: [0, 15, 0],
          opacity: [0.06, 0.1, 0.06],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orb Central - Blue Accent para reforçar a paleta Ghost */}
      <motion.div
        className={cn(
          'absolute rounded-full pointer-events-none blur-[100px]',
          'w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'bg-[#0048ff]/10'
        )}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Orb Accent - Cyan para highlight sutil */}
      <motion.div
        className={cn(
          'absolute rounded-full pointer-events-none blur-[80px]',
          'w-64 h-64 top-[30%] right-[20%]',
          'bg-[#4fe6ff]/8'
        )}
        animate={{
          y: [0, -20, 0],
          opacity: [0.04, 0.07, 0.04],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
}
