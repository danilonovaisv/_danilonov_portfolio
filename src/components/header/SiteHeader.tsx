'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import DesktopFluidHeader from './DesktopFluidHeader';
import MobileStaggeredMenu from './MobileStaggeredMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { headerTokens } from '@/components/header/headerTokens.ts';
import type {
  HeaderFallbackProps,
  SiteHeaderProps,
} from './types';
import { BRAND } from '@/config/brand';
import { NAVIGATION } from '@/config/navigation';

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

function HeaderFallback({
  navItems,
  logoUrl,
  className,
}: HeaderFallbackProps) {
  // Static tokens can be replaced with utility classes or kept standard style if needed dynamic.
  // Since tokens are constants, we can just use them.
  // Converting to Link component as well.

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex justify-center lg:block ${className ?? ''}`}
    >
      <div
        className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/8 px-6 py-3 text-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Ir para a home"
        >
          <img
            src={logoUrl}
            alt={`Logo ${BRAND.name}`}
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            {BRAND.name}
          </span>
        </Link>

        <nav className="flex items-center gap-5 text-[14px] font-medium uppercase tracking-[0.08em] text-white/90">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.ariaLabel || item.label}
              className="relative px-2 py-1 transition-opacity hover:opacity-[0.85]"
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function SiteHeader({
  navItems,
  logoUrl,
  gradient,
  accentColor,
  disableWebGL,
  reducedMotion,
  forcedMode,
  className,
}: SiteHeaderProps) {
  const [supportsWebGL, setSupportsWebGL] = useState(!disableWebGL);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (disableWebGL || reducedMotion) {
      setSupportsWebGL(false);
      return;
    }
    setSupportsWebGL(checkWebGLSupport());
  }, [disableWebGL, reducedMotion]);

  const resolvedMode = forcedMode ?? (isDesktop ? 'desktop' : 'mobile');

  const items = useMemo(
    () => {
      // Use props if provided, otherwise config
      if (navItems && navItems.length > 0) return navItems;
      return NAVIGATION.header.map(link => ({
        ...link,
        ariaLabel: `Ir para ${link.label}`
      }));
    },
    [navItems]
  );

  if (resolvedMode === 'desktop') {
    if (!supportsWebGL) {
      return (
        <HeaderFallback
          navItems={items}
          logoUrl={logoUrl ?? BRAND.logos.faviconLight} // Fallback uses light icon
          className={className}
        />
      );
    }

    return (
      <DesktopFluidHeader
        navItems={items}
        glass={{
          ior: 1.15,
          thickness: 4,
          chromaticAberration: 0.08,
          anisotropy: 0.02,
          smoothness: 0.9,
          followDamping: headerTokens.motion.glass.followDamping,
          maxTranslateX: headerTokens.motion.glass.maxTranslateX,
        }}
        height={headerTokens.layout.height}
        onNavigate={() => undefined}
        className={className}
      />
    );
  }

  return (
    <MobileStaggeredMenu
      navItems={items}
      logoUrl={logoUrl ?? BRAND.logos.dark} // Mobile menu uses dark logo (on light/gradient bg)
      gradient={gradient ?? ['#0d0d10', '#1a1a20']}
      accentColor={accentColor ?? BRAND.colors.primary}
      isFixed
      onOpen={() => undefined}
      onClose={() => undefined}
      className={className}
    />
  );
}
