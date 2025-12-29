'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HEADER_LINKS_DESKTOP } from '@/config/navigation';
import { BRAND } from '@/config/brand';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import FluidGlass from './webgl/FluidGlass';
import FaviconLight from '@/assets/logos/FaviconLight.svg';
import { headerTokens } from '@/design-system/headerTokens';

const checkWebGLSupport = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const hasContext =
      !!window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    return Boolean(hasContext);
  } catch {
    return false;
  }
};

const DesktopFluidHeader: React.FC = () => {
  const [supportsWebGL, setSupportsWebGL] = useState(true);
  const [pointerX, setPointerX] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setSupportsWebGL(checkWebGLSupport());
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    setPointerX((x - 0.5) * 2);
  };

  const handlePointerLeave = () => {
    if (prefersReducedMotion) return;
    setPointerX(0);
  };

  return (
    <header className="fixed top-6 left-1/2 z-40 hidden w-[min(980px,92vw)] -translate-x-1/2 lg:block">
      <div
        className={cn(
          'relative overflow-hidden rounded-full',
          'flex items-center justify-between',
          supportsWebGL
            ? 'text-black'
            : 'bg-[#F5F5F5] text-black shadow-[0_12px_40px_rgba(0,0,0,0.12)]'
        )}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          height: headerTokens.layout.height,
          paddingLeft: headerTokens.layout.paddingX,
          paddingRight: headerTokens.layout.paddingX,
        }}
      >
        {supportsWebGL ? (
          <FluidGlass
            mode="bar"
            pointerX={pointerX}
            reducedMotion={prefersReducedMotion}
            className="absolute inset-0 pointer-events-none"
            barProps={{
              scale: [1.2, 0.25, 0.2],
              ior: 1.15,
              thickness: 4,
              chromaticAberration: 0.08,
              anisotropy: 0.02,
              smoothness: 0.9,
            }}
          />
        ) : null}

        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center"
            aria-label="Ir para a home"
          >
            <Image
              src={FaviconLight}
              alt={`Logo ${BRAND.name}`}
              width={32}
              height={32}
              className="h-8 w-8"
              priority
            />
          </Link>
        </div>

        <nav
          aria-label="Navegação principal"
          className="relative z-10 flex items-center gap-8"
        >
          {HEADER_LINKS_DESKTOP.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel}
              className="text-[15px] font-medium tracking-tight text-black/80 transition-opacity hover:opacity-[0.85]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default DesktopFluidHeader;
