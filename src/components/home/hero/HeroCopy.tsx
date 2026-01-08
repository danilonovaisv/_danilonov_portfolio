'use client';

import React from 'react';
import Link from 'next/link';

export default function HeroCopy() {
  return (
    <div className="absolute inset-0 z-0 flex flex-col justify-center items-center pointer-events-none pb-[5vh]">
      <div
        className="w-[90%] max-w-[1100px] pointer-events-auto text-center flex flex-col items-center gap-4"
        style={{
          maxHeight: '80vh',
          overflow: 'hidden',
          maxWidth: 'min(90%, 1100px)',
        }}
      >
        {/* Tag */}
        <div
          className="text-[14px] uppercase tracking-[0.18em] text-[#9cb3ff] opacity-80 mb-[0.5vh]"
          style={{
            fontFamily: "'TT Norms Pro', 'PPSupplyMono', monospace",
            letterSpacing: '0.18em',
          }}
        >
          [BRAND AWARENESS]
        </div>

        {/* Main Quote - Texto principal com efeito de revelação por trás do fantasma */}
        <h1
          className="font-black tracking-tight leading-[1.05] mb-[1vh] text-[#d9ddec] mix-blend-screen text-[clamp(6rem,6vw,9rem)] drop-shadow-[0_0_24px_rgba(71,128,255,0.35)] text-center"
          style={{
            fontFamily: "'TT Norms Pro', 'ui-sans-serif', sans-serif",
            lineHeight: '1.05',
            maxWidth: '90%',
            wordWrap: 'break-word',
          }}
        >
          <span className="hidden md:flex flex-col items-center">
            <span>Você não vê</span>
            <span>o design.</span>
          </span>
          <span className="flex md:hidden flex-col items-center">
            <span>Você não</span>
            <span>vê o</span>
            <span>design.</span>
          </span>
        </h1>

        {/* Sub Quote - Texto secundário */}
        <h2
          className="font-normal tracking-tight leading-[1.1] mb-[4vh] text-[#d9dade] mix-blend-screen text-[clamp(1.5rem,3vw,3rem)] drop-shadow-[0_0_18px_rgba(71,128,255,0.25)] text-center"
          style={{
            fontFamily: "'TT Norms Pro', 'ui-sans-serif', sans-serif",
            lineHeight: '1.1',
            maxWidth: '80%',
            wordWrap: 'break-word',
          }}
        >
          Mas ele vê você.
        </h2>

        {/* CTA Button */}
        <Link
          href="/sobre"
          className="group inline-flex items-center gap-4 px-10 py-4 mt-2 bg-[#0c5bff] text-white no-underline text-[17px] font-semibold lowercase rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(12,91,255,0.55)] ring-1 ring-white/12 hover:bg-[#0a46d4] hover:shadow-[0_0_55px_rgba(12,91,255,0.75)]"
          style={{
            fontSize: 'clamp(14px, 3vw, 17px)',
            padding: 'clamp(12px, 3vw, 16px) clamp(20px, 5vw, 32px)',
            borderRadius: 'clamp(20px, 5vw, 32px)',
          }}
        >
          <span>step inside →</span>
        </Link>
      </div>
    </div>
  );
}
