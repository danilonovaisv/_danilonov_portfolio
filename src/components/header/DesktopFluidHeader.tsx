'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/assets/logos/LogoLight.svg';

const FluidGlass = dynamic(() => import('./webgl/FluidGlass'), {
  ssr: false,
});

export default function DesktopFluidHeader() {
  return (
    <div className="pointer-events-none fixed top-6 left-1/2 z-40 -translate-x-1/2">
      {/* Fallback HTML */}
      <nav className="pointer-events-auto relative flex h-14 items-center gap-8 rounded-full bg-black/40 px-8 backdrop-blur-md">
        <Image src={Logo} alt="Danilo Novais" className="h-5 w-auto" priority />
        <div className="flex gap-6 text-sm text-white/80">
          <Link
            href="/"
            className="transition-opacity hover:opacity-70"
          >
            home
          </Link>
          <Link
            href="/sobre"
            className="transition-opacity hover:opacity-70"
          >
            sobre
          </Link>
          <Link
            href="/portfolio"
            className="transition-opacity hover:opacity-70"
          >
            portfolio showcase
          </Link>
          <Link
            href="#contact"
            className="transition-opacity hover:opacity-70"
          >
            contato
          </Link>
        </div>
      </nav>

      {/* WebGL Glass */}
      <div className="absolute inset-0 -z-10">
        <FluidGlass
          mode="lens"
          lensProps={{
            scale: 0.25,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01,
          }}
        />
      </div>
    </div>
  );
}
