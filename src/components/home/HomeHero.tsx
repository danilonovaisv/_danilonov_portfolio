// src/components/home/HomeHero.tsx
'use client';

import dynamic from 'next/dynamic';

import HeroCopy from './hero/HeroCopy';

// Dynamic import for the GhostHero component
const GhostHero = dynamic(() => import('./GhostHero'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
});

// Video URL from ManifestoSection reference (Supabase)
const MANIFESTO_VIDEO_URL =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

export default function HomeHero() {
  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-[linear-gradient(180deg,#040013_0%,#0b0d3a_100%)]"
      data-section="home"
    >
      {/* Base gradient overlays */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_50%,rgba(0,87,255,0.18),transparent_30%),radial-gradient(circle_at_60%_60%,rgba(34,61,140,0.22),transparent_36%)]" />

      <GhostHero />

      {/* Editorial Text (z-10) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <HeroCopy />
      </div>

      {/* Video Thumbnail (z-30) */}
      <div className="hidden lg:flex absolute bottom-12 right-12 z-30 aspect-video w-[26vw] max-w-[420px] overflow-hidden shadow-[0_0_50px_rgba(14,68,255,0.35)] border border-white/10 bg-black/35 backdrop-blur pointer-events-auto">
        <div className="absolute -top-6 right-4 text-white opacity-80">
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 31c6-1 15-6 19-12m0 0C29 13 34 8 39 7m-13 12L38 20"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32.5 9.5L38.5 7l-2.5 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <video
          src={MANIFESTO_VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-black/40 via-black/10 to-transparent" />
      </div>
    </section>
  );
}
