'use client';

import { motion } from 'framer-motion';

/**
 * HeroCopy - Apenas o botão CTA "step inside".
 * O texto principal é renderizado pelo RevealingText no Canvas.
 */
export function HeroCopy() {
  return (
    <motion.a
      href="/sobre"
      className="group relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-[0.85rem] md:text-[0.95rem] font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all duration-500 hover:border-white/20 hover:bg-white/10"
      aria-label="Ir para a seção sobre"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-cyan-300">
        step inside
      </span>
      <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1 text-cyan-400 group-hover:text-cyan-300">
        →
      </span>

      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 rounded-full bg-cyan-500/0 blur-md transition-colors duration-500 group-hover:bg-cyan-500/10" />
    </motion.a>
  );
}

export default HeroCopy;
