'use client';

import { motion } from 'framer-motion';
import { CTAButton } from '@/components/ui/CTAButton';

interface HeroCopyProps {
  startEntrance?: boolean;
  enable3D?: boolean;
}

export function HeroCopy({
  startEntrance = false,
  enable3D = true,
}: HeroCopyProps) {
  // Lógica de visibilidade:
  // Se 3D ativo (Desktop) -> Esconde texto (sr-only)
  // Se 3D inativo (Mobile) -> Mostra texto
  const textContainerClass = enable3D
    ? 'sr-only'
    : 'flex flex-col items-center justify-center text-center relative z-20 px-4';

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between z-10 py-[12vh] md:py-[10vh] pointer-events-none">
      {/* TOPO: TAG [BRAND AWARENESS] */}
      {/* Spec: 12px, uppercase, TT Norms Pro (sans) */}
      <motion.span
        initial={{ opacity: 0, y: -20 }}
        animate={
          startEntrance ? { opacity: 0.8, y: 0 } : { opacity: 0, y: -20 }
        }
        transition={{ delay: 3.0, duration: 1.0, ease: 'easeOut' }}
        className="font-sans text-[12px] uppercase tracking-[0.2em] text-cyan-400 font-normal"
      >
        [BRAND AWARENESS]
      </motion.span>

      {/* MEIO: TEXTO + BOTÃO */}
      <div className="flex flex-col items-center justify-center flex-1 w-full relative">
        <div className={textContainerClass}>
          {/* H1: 5-8rem, Bold (Black), tracking-tight */}
          {/* H1: 5-8rem (clampped) */}
          <h1 className="text-display-hero text-white mb-6">
            Você não vê <br className="hidden md:block" /> o design.
          </h1>

          {/* H2: 4-6rem, Bold (Black), tracking-tight */}
          {/* H2: 4-6rem (clampped) */}
          <h2 className="text-display-sub text-white/90">Mas ele vê você.</h2>
        </div>

        {/* Espaçador para o botão quando o texto é 3D */}
        {enable3D && <div className="h-[25vh] md:h-[35vh] w-full" />}

        {/* CTA Button Principal */}
        <motion.div
          className={`pointer-events-auto ${enable3D ? 'mt-8 md:mt-12' : 'mt-12'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={startEntrance ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 4.2, duration: 0.8 }}
        >
          <CTAButton href="/sobre" variant="primary">
            step inside
          </CTAButton>
        </motion.div>
      </div>

      {/* FUNDO: BOTÃO SECUNDÁRIO */}
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
