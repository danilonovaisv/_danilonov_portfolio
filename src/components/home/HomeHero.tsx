// src/components/home/HomeHero.tsx
'use client';

import dynamic from 'next/dynamic';

// Dynamic import for the GhostHero component to avoid SSR issues with Three.js
const GhostHero = dynamic(() => import('./GhostHero'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-black" />,
});

export default function HomeHero() {
  // We can keep the media query check if we want to conditionally render,
  // but the GhostHero component handles its own responsiveness internally mostly.
  // However, for heavy WebGL, sometimes we might want a fallback on mobile if performance is poor.
  // For now, we trust the Audit instruction to use the component "as is".

  return (
    <section className="relative w-full h-screen bg-black" data-section="home">
      <GhostHero />
    </section>
  );
}
