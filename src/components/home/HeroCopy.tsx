'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function HeroCopy() {
  const reducedMotion = usePrefersReducedMotion();

  const maskStyle = reducedMotion
    ? undefined
    : ({
        WebkitMaskImage:
          'radial-gradient(200px circle at var(--gx, 50%) var(--gy, 30%), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
        maskImage:
          'radial-gradient(200px circle at var(--gx, 50%) var(--gy, 30%), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 75%)',
      } as React.CSSProperties);

  return (
    <div className="relative z-20 flex w-full flex-col items-center px-4 sm:px-6 text-center">
      {/* Espaço reservado para o Ghost (que fica acima) */}
      <div className="h-[180px] sm:h-[220px] md:h-[260px]" aria-hidden />

      {/* Tag */}
      <div className="mb-6 text-xs font-medium tracking-[0.28em] text-white/55">
        [BRAND AWARENESS]
      </div>

      {/* ===== TITLE ===== */}
      <div className="relative">
        {/* Base */}
        <h1 className="select-none text-center font-semibold leading-[0.95] tracking-[-0.03em] text-white/20 text-[clamp(2.5rem,8vw,5.5rem)]">
          Design, não é<br />
          só estética.
        </h1>

        {/* Highlight */}
        <h1
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none text-center font-semibold leading-[0.95] tracking-[-0.03em] text-white text-[clamp(2.5rem,8vw,5.5rem)] drop-shadow-[0_0_24px_rgba(120,180,255,0.6)]"
          style={maskStyle}
        >
          Design, não é<br />
          só estética.
        </h1>
      </div>

      {/* ===== SUBTITLE ===== */}
      <div className="relative mt-6">
        {/* Base */}
        <p className="select-none text-sm leading-relaxed text-white/25 md:text-base">
          [É intenção, é estratégia, é experiência.]
        </p>

        {/* Highlight */}
        <p
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none text-sm leading-relaxed text-white/70 md:text-base drop-shadow-[0_0_16px_rgba(120,180,255,0.4)]"
          style={maskStyle}
        >
          [É intenção, é estratégia, é experiência.]
        </p>
      </div>

      {/* CTA */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/sobre"
          className="
            inline-flex items-center gap-3 rounded-full bg-[#0057FF]
            px-6 py-3 text-sm font-medium text-white
            shadow-[0_14px_40px_rgba(0,87,255,0.28)]
            transition-transform duration-300
            hover:-translate-y-px
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-white focus-visible:ring-offset-2
            focus-visible:ring-offset-black
          "
        >
          get to know me better
          <span className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
            <ArrowUpRight className="h-5 w-5" />
          </span>
        </Link>
      </div>
    </div>
  );
}
