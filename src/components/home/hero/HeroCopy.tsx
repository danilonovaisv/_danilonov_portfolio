'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const textContainerAnimation: Variants = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 60,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: [0.92, 1.02, 1],
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier
      staggerChildren: 0.1,
    },
  },
};

const itemAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function HeroCopy() {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = prefersReducedMotion
    ? {}
    : {
        initial: 'initial' as const,
        animate: 'animate' as const,
        variants: textContainerAnimation,
      };

  return (
    <motion.div
      {...motionProps}
      className="hero-content flex flex-col items-center text-center max-w-5xl px-4 pointer-events-auto"
    >
      {/* Tag decorativa */}
      <motion.span
        variants={itemAnimation}
        className="text-caption uppercase tracking-widest opacity-60 mb-6 font-medium"
      >
        [BRAND AWARENESS]
      </motion.span>

      {/* Headline principal */}
      <motion.h1
        variants={itemAnimation}
        className="text-display font-black tracking-tight leading-[1.05] mb-4 text-text-light"
      >
        {/* Desktop/Tablet: 2 linhas */}
        <span className="hidden md:block">
          Você não vê
          <br />o design.
        </span>

        {/* Mobile: 3 linhas */}
        <span className="md:hidden">
          Você não
          <br />
          vê o
          <br />
          design.
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.h2
        variants={itemAnimation}
        className="text-h2 font-bold text-[#d9dade] mb-12"
      >
        Mas ele vê você.
      </motion.h2>

      {/* CTA */}
      <motion.div variants={itemAnimation}>
        <CTAButton href="/sobre">step inside →</CTAButton>
      </motion.div>
    </motion.div>
  );
}

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
}

function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <motion.div
      className="inline-flex items-center gap-0 group cursor-pointer"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        className="relative inline-flex items-center focus-visible:outline-2 focus-visible:outline-blue-glow focus-visible:outline-offset-4 rounded-full"
        aria-label="Ir para seção sobre"
      >
        {/* Pílula de texto */}
        <span
          className="
            px-6 py-3
            bg-[#0048ff] text-white
            text-sm uppercase tracking-wide font-medium
            rounded-l-full
            transition-colors duration-300
            group-hover:bg-[#0048ff]/90
          "
        >
          {children}
        </span>

        {/* Círculo da seta */}
        <span
          className="
            w-12 h-12
            bg-[#0048ff] text-white
            rounded-r-full
            flex items-center justify-center
            transition-all duration-300
            group-hover:bg-[#0048ff]/90
          "
        >
          <svg
            className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
