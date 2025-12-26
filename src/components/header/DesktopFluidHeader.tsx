'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/logos/LogoLight.svg';
import { useGhostEnergy } from '@/hooks/useGhostEnergy';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const FluidGlass = dynamic(
  () => import('./webgl/FluidGlass'),
  { ssr: false }
);

export default function DesktopFluidHeader() {
  const energy = useGhostEnergy();
  const reducedMotion = usePrefersReducedMotion();
  
  // Respect accessibility - static properties when motion is reduced
  const energySafe = reducedMotion ? 0.3 : energy;

  return (
    <div className="pointer-events-none fixed top-6 left-1/2 z-40 -translate-x-1/2">
      {/* HTML Fallback */}
      <nav className="
        relative flex h-[56px] items-center gap-8
        rounded-full bg-black/35 px-8
        backdrop-blur-md
        drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]
      ">
        <Image
          src={Logo}
          alt="Danilo Novais"
          className="h-5 w-auto"
          priority
        />

        <div className="flex gap-6 text-sm text-white/85">
          <Link href="/" className="transition-opacity hover:opacity-70">home</Link>
          <Link href="/sobre" className="transition-opacity hover:opacity-70">sobre</Link>
          <Link href="/portfolio" className="transition-opacity hover:opacity-70">portfolio showcase</Link>
          <Link href="#contact" className="transition-opacity hover:opacity-70">contato</Link>
        </div>
      </nav>

      {/* Glass Layer - Synchronized with Ghost */}
      <div className="absolute inset-0 -z-10">
        <FluidGlass
          mode="lens"
          lensProps={{
            scale: 0.24,
            // Modulate refraction based on ghost energy
            ior: 1.14 + energySafe * 0.03,                    // 1.14 → 1.17
            thickness: 4.2 + energySafe * 1.2,                // 4.2 → ~5.4
            chromaticAberration: 0.06 + energySafe * 0.04,    // 0.06 → 0.10
            anisotropy: 0.012
          }}
        />
      </div>
    </div>
  );
}
