// app/(marketing)/hero/HeroOrb.tsx
'use client';

import dynamic from 'next/dynamic';

const OrbCanvas = dynamic(
  () => import('@/src/components/three/HeroGlassCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[260px] w-[260px] md:h-[360px] md:w-[360px] rounded-full bg-[#e3e6f0]" />
    ),
  }
);

type HeroOrbProps = {
  scrollIntensity: number;
};

export function HeroOrb({ scrollIntensity }: HeroOrbProps) {
  return (
    <div className="relative flex items-center justify-center h-[260px] md:h-[420px]">
      <div className="absolute inset-0 rounded-full blur-3xl bg-[#2f5bff]/20" />
      <div className="relative aspect-square w-full max-w-[360px]">
        <OrbCanvas scrollIntensity={scrollIntensity} />
      </div>
    </div>
  );
}
