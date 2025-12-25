'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { HOME_CONTENT } from '@/config/content';
import ManifestoThumb from './ManifestoThumb';

// Dynamically import WebGL canvas to avoid SSR issues
const GhostStage = dynamic(() => import('@/components/canvas/GhostStage'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 z-0 bg-[#050505]" />,
});

export default function HomeHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <section
        id="hero"
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#06071f]"
      >
        <div className="absolute inset-0 z-0 pointer-events-none">
          <GhostStage />
        </div>
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(0,87,255,0.22),transparent_42%),radial-gradient(circle_at_70%_35%,rgba(82,39,255,0.14),transparent_45%)] pointer-events-none" />

        <div className="relative z-20 flex w-full max-w-[1200px] flex-col items-center gap-6 px-6 text-center md:px-10">
          <span className="text-xs uppercase tracking-[0.35em] text-[#d9dade] md:text-sm">
            {HOME_CONTENT.hero.tag}
          </span>
          <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-[#d9dade] drop-shadow-[0_0_28px_rgba(0,87,255,0.28)]">
            {HOME_CONTENT.hero.title[0]}
            <br />
            {HOME_CONTENT.hero.title[1]}
          </h1>
          <p className="text-base text-[#d9dade] opacity-80 md:text-lg">
            {HOME_CONTENT.hero.subtitle}
          </p>

          <div className="pt-2">
            <Link
              href="/sobre"
              className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#0057FF] to-[#2b7bff] px-8 py-4 text-base font-semibold text-white shadow-[0_0_40px_rgba(0,87,255,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(0,87,255,0.6)]"
            >
              {HOME_CONTENT.hero.cta.replace(' →', '')}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {!isMobile && (
          <div className="absolute bottom-10 right-6 z-30 w-[220px] drop-shadow-[0_10px_40px_rgba(0,0,0,0.45)] md:right-12 md:w-[260px]">
            <div className="pointer-events-none absolute -top-8 right-0 flex items-center gap-2 text-sm text-white/80">
              <ArrowUpRight className="h-5 w-5" />
            </div>
            <ManifestoThumb />
          </div>
        )}
      </section>

      {/* Mobile Manifesto Video Section (Separate from Hero) */}
      {isMobile && (
        <section className="relative flex w-full flex-col items-center justify-center bg-black p-6">
          <ManifestoThumb />
        </section>
      )}
    </>
  );
}
