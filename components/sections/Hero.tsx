'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { ASSETS } from '../../lib/constants';

const Hero: React.FC = () => {
  const handleVideoOpen = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.open(ASSETS.videoManifesto, '_blank', 'noopener,noreferrer');
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#F4F5F7] px-4 py-20 sm:py-28"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 text-center lg:flex-row lg:items-center lg:gap-16 lg:text-left">
        <div className="flex flex-1 flex-col items-center gap-6 sm:gap-8 lg:items-start">
          <span className="text-xs font-semibold uppercase tracking-[0.5em] text-[#0057FF]">
            [ BRAND AWARENESS ]
          </span>
          <h1 className="text-[3.35rem] font-bold leading-tight text-[#111111] sm:text-[3.9rem] md:text-[4.7rem]">
            Design, não é só estética.
          </h1>
          <p className="text-base text-[#1f2937] sm:text-lg">
            [ É intenção, é estratégia, é experiência. ]
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <Link
              href="/sobre"
              className="inline-flex items-center justify-center rounded-full bg-[#0057FF] px-8 py-3 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_12px_30px_rgba(0,87,255,0.35)] transition hover:bg-[#004fe1]"
            >
              get to know me better &rarr;
            </Link>
            <button
              type="button"
              onClick={handleVideoOpen}
              className="inline-flex items-center gap-2 rounded-full border border-[#0057FF] px-5 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-[#0057FF] transition hover:bg-[#0057FF] hover:text-white"
            >
              <Play className="h-4 w-4" />
              manifesto em vídeo
            </button>
          </div>
        </div>

        <div className="flex flex-1 justify-center lg:justify-end">
          <div className="w-full max-w-3xl">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-black shadow-[0_25px_60px_rgba(15,23,42,0.4)]">
              <div className="aspect-video">
                <video
                  src={ASSETS.videoManifesto}
                  className="h-full w-full object-cover"
                  loop
                  muted
                  playsInline
                  aria-label="Vídeo manifesto"
                  preload="metadata"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 rounded-full border border-white/60 bg-black/30 px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.5em] text-white">
                  <Play className="h-3 w-3" />
                  manifesto
                </div>
              </div>
              <button
                type="button"
                onClick={handleVideoOpen}
                className="absolute inset-0 z-10 rounded-[1.75rem] bg-transparent focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#0057FF]/70"
                aria-label="Abrir manifesto em vídeo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
