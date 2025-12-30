'use client';

// Canonical Header Component
import SiteHeader from '@/components/header/SiteHeader';
import { BRAND } from '@/config/brand';
import { HEADER_LINKS_DESKTOP } from '@/config/navigation';

export default function Header() {
  return (
    <SiteHeader
      navItems={HEADER_LINKS_DESKTOP}
      logoUrl={BRAND.logos.faviconLight} // Desktop: FaviconLight
      logoUrlMobile={BRAND.logos.dark} // Mobile: LogoDark
      gradient={BRAND.colors.headerGradient}
      accentColor={BRAND.colors.primary}
    />
  );
}
