'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_LINKS } from '@/config/navigation';
import { BRAND } from '@/config/brand';

// Dynamically import WebGL component to avoid SSR issues
const FluidGlass = dynamic(() => import('./webgl/FluidGlass'), {
  ssr: false,
  loading: () => <div className="h-20 w-full" />,
});

/**
 * Desktop Fluid Glass Header
 */
export default function DesktopFluidHeader() {
  return (
    <>
      {/* 
        WebGL Fluid Glass Layer
        Now self-contained: includes Logo and navigation in the canvas
        Portals them into a buffer for real refraction/distortion
      */}
      <div
        className="fixed inset-x-0 top-0 z-[100] w-full h-24 pointer-events-none"
        role="img"
        aria-label="Header de vidro fluido com navegação 3D"
      >
        <Suspense fallback={null}>
          <FluidGlass
            scale={0.25}
            ior={1.25}
            thickness={6}
            chromaticAberration={0.12}
            anisotropy={0.3}
          />
        </Suspense>
      </div>

      {/* Desktop text overlay (logo + links) */}
      <div className="hidden lg:flex fixed inset-x-0 top-0 z-[110] h-24 items-center justify-center pointer-events-auto">
        <div className="container mx-auto flex items-center justify-between px-6 text-xs font-semibold uppercase tracking-[0.4em] text-white">
          <Link
            href="/"
            aria-label={`Ir para a home de ${BRAND.name}`}
            className="flex items-center gap-4"
          >
            <Image
              src={BRAND.logos.light}
              alt={BRAND.name}
              width={140}
              height={28}
              className="object-contain"
              priority
            />
          </Link>
          <nav className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors duration-200 hover:text-[#0057FF]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
