'use client';

import { Suspense } from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { NAV_LINKS } from '@/config/navigation';

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

      {/* 
        Accessibility Fallback / SEO Layer
        Visible to screen readers but hidden visually as the WebGL layer 
        handles the primary visual presentation.
      */}
      <div className="sr-only">
        <header>
          <nav>
            {NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
      </div>
    </>
  );
}
