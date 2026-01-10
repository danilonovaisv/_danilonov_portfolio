'use client';

import React from 'react';
import { AntigravityCTA } from '@/components/ui/AntigravityCTA';

/**
 * CTAProjectCard - Featured Projects Section CTA
 *
 * Spec:
 * - Background: #0d003b (dark)
 * - Headline: "Like what you see?" - font normal
 * - On hover: text becomes #0057FF
 * - Button: Compound pill (full pill text + circular icon overlapping)
 * - Animation: translateY(-1px) on hover, ease-out, 200ms
 */
export default function CTAProjectCard() {
  return (
    <div className="group relative flex flex-col items-center justify-center h-full md:min-h-[400px] md:bg-linear-to-br md:from-neutral/80 md:to-ghost-bg md:p-12 md:overflow-hidden md:rounded-md md:border md:border-white/5 md:transition-all md:duration-500 md:hover:border-primary/20 md:hover:shadow-[0_0_40px_rgba(var(--color-primary),0.1)]">
      {/* Ghost Atmosphere Glow - Desktop Only */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,var(--color-primary-faint),transparent_70%)] hidden md:block" />

      {/* Headline - font normal, hover changes to blue - Desktop Only */}
      <h3 className="hidden md:block relative z-10 text-3xl md:text-5xl lg:text-6xl font-normal text-center mb-8 md:mb-12 tracking-tight leading-[1.1] text-white transition-colors duration-300 group-hover:text-primary">
        Like what
        <br />
        you see?
      </h3>

      {/* CTA Button - Full width on mobile, Auto on desktop */}
      <div className="relative z-10 w-full md:w-auto">
        <AntigravityCTA
          href="/portfolio"
          label="view projects"
          variant="primary"
          size="lg" // Keeping LG for impact
          ariaLabel="Ver todos os projetos"
          className="w-full md:w-auto"
        />
      </div>
    </div>
  );
}
