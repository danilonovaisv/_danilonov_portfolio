'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { CTAButton } from '@/components/ui/CTAButton';

export default function AboutClosing() {
  return (
    <section
      className="relative min-h-[80vh] py-24 flex flex-col justify-center"
      aria-label="Fechamento"
    >
      <div className="w-full max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight text-white mb-16"
          >
            <p className="mb-8">
              Hoje sou{' '}
              <span className="text-[#0057FF] font-medium">
                Diretor de Criação
              </span>
              ,<br />
              com mais de 10 anos de estrada.
            </p>
            <p className="mb-8 text-white/80">
              Já liderei marcas, agências, eventos
              <br />e criei experiências para todos os canais.
            </p>
            <p>
              Agora, quero criar algo que permaneça —<br />
              <span className="italic">com você.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-6 items-center"
          >
            <CTAButton href="mailto:dannovaisv@gmail.com">
              Fale comigo
            </CTAButton>

            <a
              href="/curriculum.pdf"
              target="_blank"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 hover:border-[#0057FF] hover:bg-[#0057FF]/10 text-white transition-all duration-300"
            >
              <Download className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
              <span className="font-medium tracking-wide">
                Download Curriculum
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
