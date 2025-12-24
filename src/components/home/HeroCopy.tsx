// src/components/home/HeroCopy.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroCopy() {
  const [isVisible, setIsVisible] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Inject CSS for the reference animation */}
      <style jsx global>{`
        .ref-word-anim {
          --trans-duration: 2000ms;
          --trans-delay-factor: 30ms;
          --trans-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ref-word-anim span {
          display: inline-block;
          transform: translateY(110%);
          opacity: 0;
          transition:
            transform var(--trans-duration) var(--trans-timing-function),
            opacity var(--trans-duration) var(--trans-timing-function);
          transition-delay: calc(var(--i) * var(--trans-delay-factor));
        }

        .hero-text-visible .ref-word-anim span {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

      <div
        className={`flex flex-col justify-center items-center h-full px-6 md:px-12 ${
          isVisible ? 'hero-text-visible' : ''
        }`}
      >
        {/* BRAND AWARENESS Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          <span className="text-[#0057FF] font-medium tracking-widest text-sm uppercase">
            [ BRAND AWARENESS ]
          </span>
        </motion.div>

        {/* Main Title */}
        <div className="text-center mb-6">
          <h1 className="ref-word-anim text-[#d9dade] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.02em]">
            {'Design, não é'.split('').map((letter, i) => (
              <span
                key={i}
                style={{ '--i': i } as React.CSSProperties}
                aria-hidden="true"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
          <h1 className="ref-word-anim text-[#d9dade] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-[-0.02em] mt-2">
            {'só estética.'.split('').map((letter, i) => (
              <span
                key={i}
                style={{ '--i': i + 12 } as React.CSSProperties}
                aria-hidden="true"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="text-[#888888] text-base md:text-lg mb-10 text-center"
        >
          [ É intenção, é estratégia, é experiência. ]
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/sobre"
            className="group inline-flex items-center gap-3 bg-[#0057FF] hover:bg-[#0047DD] text-white font-semibold text-sm md:text-base rounded-full px-6 py-3.5 transition-all duration-300 shadow-lg shadow-[#0057FF]/25 hover:shadow-xl hover:shadow-[#0057FF]/30"
          >
            get to know me better
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </>
  );
}
