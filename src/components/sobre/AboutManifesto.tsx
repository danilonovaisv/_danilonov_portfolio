'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { kw } from './keywords';

export function AboutManifesto() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="min-h-screen flex items-center justify-center text-center bg-(--ghost-bg) py-24">
      <div className="max-w-[680px] space-y-10">
        <motion.p
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, filter: 'blur(10px)' }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, filter: 'blur(0px)' }
          }
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-3xl text-white"
        >
          Acredito no design que muda o dia de alguém. Não pelo {kw('choque')} —
          mas pela conexão.
        </motion.p>

        <motion.p
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, filter: 'blur(10px)' }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, filter: 'blur(0px)' }
          }
          viewport={{ once: true }}
          transition={{
            delay: prefersReducedMotion ? 0 : 1.2,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-xl md:text-3xl text-white"
        >
          Um vídeo que {kw('respira')}. Uma marca que se reconhece.
        </motion.p>

        <motion.p
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0, filter: 'blur(10px)' }
          }
          whileInView={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, filter: 'blur(0px)' }
          }
          viewport={{ once: true }}
          transition={{
            delay: prefersReducedMotion ? 0 : 2.4,
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-xl md:text-3xl text-white"
        >
          Isso é {kw('ghost design')}.
        </motion.p>
      </div>
    </section>
  );
}
