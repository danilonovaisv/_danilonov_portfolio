'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

export default function HeroPreloader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const fadeDuration = prefersReducedMotion ? 0.01 : 1;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        delay: prefersReducedMotion ? 0 : 1.5,
        duration: fadeDuration,
      }}
      onAnimationComplete={() => setVisible(false)}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
      aria-hidden="true"
    >
      <motion.svg
        className="mb-5 h-20 w-20"
        viewBox="0 0 512 512"
        fill="none"
        initial={{ y: 0, opacity: 1 }}
        animate={prefersReducedMotion ? {} : { y: [0, -12, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <path
          fill="white"
          d="M508.3 432.8s-46.6-39-79.5-275.8C420 69.3 346 0 256 0S92 69.3 83.2 157C50.3 393.7 3.7 432.8 3.7 432.8-11.4 458 24.4 461 42.4 460.7c35.3-.5 35.3 40.3 70.5 40.3s35.3-35.3 70.5-35.3 37.4 45.3 72.7 45.3 37.4-45.3 72.7-45.3 35.3 35.3 70.5 35.3 35.3-40.8 70.6-40.3c18 0.3 53.8-2.8 38.7-27.9z"
        />
        {/* Olhos pulsando */}
        <motion.circle
          cx="210"
          cy="190"
          r="26"
          fill="#06071f"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 0.85, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 1.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.1,
                }
          }
        />
        <motion.circle
          cx="302"
          cy="190"
          r="26"
          fill="#06071f"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 0.85, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : {
                  duration: 1.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.25,
                }
          }
        />
      </motion.svg>

      <motion.p
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#e0e0e0]"
        initial={{ opacity: 0.7 }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                opacity: [0.7, 1, 0.7],
                letterSpacing: ['0.18em', '0.24em', '0.18em'],
              }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        Summoning spirits
      </motion.p>

      <div className="h-0.5 w-24 overflow-hidden rounded-full bg-[#06071f]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}
