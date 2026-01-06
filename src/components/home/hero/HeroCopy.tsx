'use client';

import React from 'react';
import Link from 'next/link';
import { HOME_CONTENT } from '@/config/content';

export default function HeroCopy() {
  const { hero } = HOME_CONTENT;

  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none pb-[5vh]">
      <div className="w-full max-w-[min(90%,1400px)] pointer-events-auto text-center flex flex-col items-center">
        {/* Tag */}
        <div className="font-mono text-[14px] uppercase tracking-[0.16em] text-[#9cb3ff] opacity-80 mb-6 md:mb-8 font-normal">
          {hero.tag}
        </div>

        {/* Main Quote (H1) */}
        <h1 className="font-sans font-black tracking-tight leading-[0.9] text-[#d9ddec] mix-blend-screen text-[clamp(3.5rem,7vw,10rem)] max-w-full drop-shadow-[0_0_24px_rgba(71,128,255,0.35)] flex flex-col items-center">
          {hero.title.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
        </h1>

        {/* Sub Quote (H2) */}
        <h2 className="font-sans font-black tracking-tight leading-[0.9] mt-2 mb-12 text-[#9ca5c3] mix-blend-screen text-[clamp(2.5rem,5vw,8rem)] max-w-full drop-shadow-[0_0_18px_rgba(71,128,255,0.25)]">
          {hero.subtitle}
        </h2>

        {/* CTA Button (Center) */}
        <CtaButton href="/sobre" label={hero.cta} />
      </div>

      {/* CTA Button (Bottom) */}
      <div className="absolute bottom-12 pointer-events-auto">
        <CtaButton href="/sobre" label={hero.cta} />
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
