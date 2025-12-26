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
          'radial-gradient(160px circle at var(--gx, 20%) var(--gy, 52%), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 68%)',
        maskImage:
          'radial-gradient(160px circle at var(--gx, 20%) var(--gy, 52%), rgba(0,0,0,1) 0%, rgba(0,0,0,1) 32%, rgba(0,0,0,0) 68%)',
      } as React.CSSProperties);

  return (
    <div className="relative z-20 w-full max-w-4xl px-4 sm:px-6 text-center">
      {/* Tag */}
      <div className="mb-4 text-xs font-medium tracking-[0.28em] text-white/55">
        [BRAND AWARENESS]
      </div>

      {/* ===== TITLE ===== */}
      <div className="relative mx-auto max-w-[22ch]">
        {/* Base */}
        <h1 className="select-none text-balance font-semibold leading-[0.92] tracking-[-0.03em] text-white/15 text-[clamp(2.25rem,6vw,4.6rem)]">
          Design, não é<br />
          só estética.
        </h1>

        {/* Highlight */}
        <h1
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none text-balance font-semibold leading-[0.92] tracking-[-0.03em] text-white text-[clamp(2.25rem,6vw,4.6rem)] drop-shadow-[0_0_18px_rgba(120,180,255,0.5)]"
          style={maskStyle}
        >
          Design, não é<br />
          só estética.
        </h1>
      </div>

      {/* ===== SUBTITLE ===== */}
      <div className="relative mx-auto mt-5 max-w-[58ch]">
        {/* Base */}
        <p className="select-none text-pretty text-sm leading-relaxed text-white/22 md:text-base">
          [É intenção, é estratégia, é experiência.]
        </p>

        {/* Highlight */}
        <p
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none text-pretty text-sm leading-relaxed text-white/65 md:text-base drop-shadow-[0_0_12px_rgba(120,180,255,0.32)]"
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
            hover:-translate-y-[1px]
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
