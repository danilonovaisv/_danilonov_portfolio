'use client';

import { motion } from 'framer-motion';

export function HeroCopy() {
  return (
    <div className="mx-auto max-w-4xl text-white relative z-10 flex flex-col items-center justify-center text-center px-4">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#fcffff]/60 mb-8"
      >
        [BRAND AWARENESS]
      </motion.p>
      
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="font-bold text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tighter mb-10 text-[#fcffff]"
      >
        Você não vê o design.<br />Mas ele vê você.
      </motion.h1>

      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        whileHover={{ x: 5 }}
        href="/sobre"
        className="pointer-events-auto inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#fcffff] transition-colors hover:text-primary"
      >
        step inside <span className="text-primary transition-transform group-hover:translate-x-1">→</span>
      </motion.a>
    </div>
  );
}

export default HeroCopy;