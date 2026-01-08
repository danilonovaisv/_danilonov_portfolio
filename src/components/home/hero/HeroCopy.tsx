'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';

export default function HeroCopy({
  ghostRef,
}: {
  ghostRef?: React.RefObject<any>;
}) {
  const { hero } = HOME_CONTENT;
  const containerRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  // Hook para sincronizar a posição do Ghost 3D com a máscara 2D
  useEffect(() => {
    if (!ghostRef?.current || !containerRef.current) return;

    let rafId: number;
    const update = () => {
      if (ghostRef.current && containerRef.current && h1Ref.current) {
        const ghostPos = ghostRef.current.position;

        // Conversão aproximada de mundo 3D para % da viewport
        const x = ((ghostPos.x + 8) / 16) * 100;
        const y = (1 - (ghostPos.y + 5) / 10) * 100;

        // Atualiza variáveis CSS diretamente no DOM (Performance + sem lint error)
        containerRef.current.style.setProperty('--mask-x', `${x}%`);
        containerRef.current.style.setProperty('--mask-y', `${y}%`);

        // Aplica a máscara radial diretamente
        const mask = `radial-gradient(circle 200px at ${x}% ${y}%, black 0%, rgba(0,0,0,0.4) 40%, transparent 70%)`;
        h1Ref.current.style.webkitMaskImage = mask;
        h1Ref.current.style.maskImage = mask;
      }
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [ghostRef]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4 pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-0 md:pb-[5vh]"
    >
      {/* Container de texto */}
      <div className="w-[70vw] sm:w-[75vw] md:w-[80vw] lg:w-[55vw] max-w-[1400px] pointer-events-auto text-center flex flex-col items-center transition-all duration-500">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-[11px] sm:text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-[#9cb3ff] mb-4 sm:mb-6 md:mb-10 font-normal"
        >
          {hero.tag}
        </motion.div>

        {/* Main Quote (H1) - LANTERNA EFFECT */}
        <motion.h1
          ref={h1Ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-sans font-black tracking-tighter text-text-light mix-blend-lighten max-w-[1200px] drop-shadow-[0_0_35px_rgba(79,230,255,0.4)] flex flex-col items-center leading-[0.9] text-[clamp(2.5rem,10vw,9rem)] sm:text-[clamp(3rem,11vw,9rem)] md:text-[clamp(3.5rem,9vw,9rem)]"
        >
          {/* Mobile Version: 3 linhas - Visível apenas abaixo de md */}
          <span className="md:hidden flex flex-col items-center">
            {hero.titleMobile.map((line, index) => (
              <span key={`mobile-${index}`} className="block">
                {line}
              </span>
            ))}
          </span>

          {/* Desktop/Tablet Version: 2 linhas - Visível apenas em md+ */}
          <span className="hidden md:flex flex-col items-center">
            {hero.title.map((line, index) => (
              <span key={`desktop-${index}`} className="block">
                {line}
              </span>
            ))}
          </span>
        </motion.h1>

        {/* Sub Quote (H2) - with subtle flicker */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [1, 0.9, 1], // Subtle presence flicker
            y: 0,
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="font-sans font-bold tracking-tight mt-4 sm:mt-6 mb-8 sm:mb-12 text-[#9ca5c3] mix-blend-screen max-w-[800px] drop-shadow-[0_0_18px_rgba(71,128,255,0.25)] leading-[1.1] text-[clamp(1rem,4vw,2.5rem)] sm:text-[clamp(1.2rem,4vw,2.5rem)]"
        >
          {hero.subtitle}
        </motion.h2>

        {/* CTA Button (Center) - Full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 1.2,
          }}
          className="w-full sm:w-auto"
        >
          <CtaButton href="/sobre" label={hero.cta} />
        </motion.div>
      </div>
    </div>
  );
}

function CtaButton({ href, label }: { href: string; label: string }) {
  const cleanLabel = label.replace('→', '').trim();

  return (
    <Link
      href={href}
      className="group flex items-center justify-center gap-3 bg-[#0c5bff] text-white no-underline font-semibold lowercase transition-all duration-300 shadow-[0_0_40px_rgba(12,91,255,0.55)] ring-1 ring-white/12 hover:bg-[#0a46d4] hover:shadow-[0_0_55px_rgba(12,91,255,0.75)] text-[14px] sm:text-[15px] px-6 sm:px-8 py-3 rounded-full w-full max-w-xs sm:w-auto sm:max-w-none mx-auto"
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
