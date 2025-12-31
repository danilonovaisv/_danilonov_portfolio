'use client';

import { motion } from 'framer-motion';

const processList = [
  'Briefings bem construídos para decisões claras',
  'Estratégia como base de qualquer criação',
  'Design com propósito, não só beleza',
  'Revisões inteligentes, sem ruído desnecessário',
  'IA e automações para escalar com qualidade',
  'Métricas criativas: engajamento, retenção e resultado',
];

export default function AboutMethod() {
  return (
    <section
      className="relative min-h-[120vh] py-32 flex flex-col justify-center overflow-hidden"
      aria-label="Como Eu Trabalho"
    >
      {/* Background - Simulating "Active" background with gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#000022] via-[#06071f] to-[#000] opacity-90" />

      {/* Simple animated abstract blob / glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#0057FF] rounded-full blur-[120px] opacity-30 z-0 pointer-events-none"
      />

      <div className="relative z-10 w-full max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-24"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter leading-[0.9] mb-8">
              Criatividade com método.
              <br />
              <span className="text-white/40">Impacto sem ruído.</span>
            </h2>
            <div className="text-xl md:text-2xl text-[#4fe6ff] font-mono leading-relaxed space-y-2">
              <p>Antes da estética, existe intenção.</p>
              <p>Antes do layout, existe lógica.</p>
              <p>Antes do impacto, existe silêncio.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {processList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-start gap-4 border-t border-white/10 pt-6"
              >
                <span className="font-mono text-[#0057FF] text-sm">
                  0{i + 1}
                </span>
                <p className="text-lg md:text-xl text-white/90 font-light">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
