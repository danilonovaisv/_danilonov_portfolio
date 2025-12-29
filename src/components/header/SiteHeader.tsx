'use client';

import React, { useEffect, useMemo, useState } from 'react';
import DesktopFluidHeader from './DesktopFluidHeader';
import MobileStaggeredMenu from './MobileStaggeredMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { headerTokens } from '@/design-system/headerTokens';
import type {
  HeaderFallbackProps,
  NavItem,
  SiteHeaderProps,
} from './types';
import LogoDark from '@/assets/logos/LogoDark.svg';
import FaviconLight from '@/assets/logos/FaviconLight.svg';

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero', ariaLabel: 'Ir para a Home' },
  {
    label: 'Sobre',
    href: '/sobre',
    ariaLabel: 'Ir para a página Sobre',
  },
  {
    label: 'Portfólio',
    href: '/portfolio',
    ariaLabel: 'Ir para o portfólio',
  },
  { label: 'Contato', href: '#contact', ariaLabel: 'Ir para contato' },
];

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
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 flex justify-center lg:block ${className ?? ''}`}
      style={{ height: `${headerTokens.layout.height}px` }}
    >
      <div
        className="mx-auto flex h-full w-full max-w-5xl items-center justify-between rounded-full border border-white/10 bg-white/8 px-6 py-3 text-sm text-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl lg:px-8"
        style={{
          paddingLeft: `${headerTokens.layout.paddingX}px`,
          paddingRight: `${headerTokens.layout.paddingX}px`,
        }}
      >
        <a
          href="/"
          className="flex items-center gap-3"
          aria-label="Ir para a home"
        >
          <img
            src={logoUrl}
            alt="Logotipo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <span className="text-[15px] font-semibold tracking-tight text-white">
            Danilo Novais
          </span>
        </a>

        <nav className="flex items-center gap-5 text-[14px] font-medium uppercase tracking-[0.08em] text-white/90">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-label={item.ariaLabel}
              className="relative px-2 py-1 transition-opacity hover:opacity-[0.85]"
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function SiteHeader({
  navItems,
  disableWebGL,
  forcedMode,
  className,
}: SiteHeaderProps) {
  const [supportsWebGL, setSupportsWebGL] = useState(!disableWebGL);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (disableWebGL) {
      setSupportsWebGL(false);
      return;
    }
    setSupportsWebGL(checkWebGLSupport());
  }, [disableWebGL]);

  const resolvedMode = forcedMode ?? (isDesktop ? 'desktop' : 'mobile');

  const items = useMemo(
    () => (navItems && navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS),
    [navItems]
  );

  if (resolvedMode === 'desktop') {
    if (!supportsWebGL) {
      return (
        <HeaderFallback
          navItems={items}
          logoUrl={FaviconLight.src}
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
      logoUrl={LogoDark.src}
      gradient={[
        headerTokens.color.gradient[0],
        headerTokens.color.gradient[1],
      ]}
      accentColor={headerTokens.color.primary}
      isFixed
      onOpen={() => undefined}
      onClose={() => undefined}
      className={className}
    />
  );
}
