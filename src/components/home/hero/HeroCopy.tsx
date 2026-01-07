'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';

export default function HeroCopy() {
  const { hero } = HOME_CONTENT;

  // Motion value for mask animation (0 = hidden, 1 = fully revealed)
  const maskProgress = useMotionValue(0);

  // Transform mask progress to mask position
  const maskPosition = useTransform(maskProgress, [0, 1], ['200% 0', '0% 0']);

  // Animate mask on mount
  useEffect(() => {
    const controls = animate(maskProgress, 1, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1], // Ghost easeOutExpo
      delay: 0.4,
    });
    return () => controls.stop();
  }, [maskProgress]);

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none pb-[5vh]">
      <div className="w-full max-w-[min(92%,1400px)] md:max-w-[80vw] lg:max-w-[55vw] pointer-events-auto text-center flex flex-col items-center px-4 sm:px-8 transition-all duration-500">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#9cb3ff] mb-6 md:mb-10 font-normal"
        >
          {hero.tag}
        </motion.div>

        {/* Main Quote (H1) - Animated with SVG Mask Reveal Effect */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.4,
          }}
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 40%, black 60%, transparent 100%)',
            WebkitMaskSize: '300% 100%',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: maskPosition,
          }}
          className="font-sans font-black tracking-tighter text-[#d9ddec] mix-blend-screen max-w-[1200px] drop-shadow-[0_0_24px_rgba(71,128,255,0.35)] flex flex-col items-center leading-[0.9] text-[clamp(3.5rem,12vw,11rem)]"
        >
          {hero.title.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        {/* Sub Quote (H2) */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.8,
          }}
          className="font-sans font-bold tracking-tight mt-6 mb-12 text-[#9ca5c3] mix-blend-screen max-w-[800px] drop-shadow-[0_0_18px_rgba(71,128,255,0.25)] leading-[1.1] text-[clamp(1.2rem,4vw,2.5rem)]"
        >
          {hero.subtitle}
        </motion.h2>

        {/* CTA Button (Center) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 1.2,
          }}
        >
          <CtaButton href="/sobre" label={hero.cta} />
        </motion.div>
      </div>
    </div>
  );
}

function CtaButton({ href, label }: { href: string; label: string }) {
  // Parsing label "step inside →" to separate arrow if needed,
  // but better to just use text and icon.
  // The user string is 'step inside →', likely wants the arrow to be the icon.
  const cleanLabel = label.replace('→', '').trim();

  return (
    <Link
      href={href}
      className="group flex items-center gap-3 bg-[#0c5bff] text-white no-underline font-semibold lowercase transition-all duration-300 shadow-[0_0_40px_rgba(12,91,255,0.55)] ring-1 ring-white/12 hover:bg-[#0a46d4] hover:shadow-[0_0_55px_rgba(12,91,255,0.75)] text-[15px] px-8 py-3 rounded-full"
    >
      <span>{cleanLabel}</span>
      <span className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H13M13 7L7 1M13 7L7 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}
