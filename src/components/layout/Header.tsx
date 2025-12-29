'use client';

// Canonical Header Component
import SiteHeader from '@/components/header/SiteHeader';

export default function Header() {
  return (
    <SiteHeader
      navItems={[
        { label: 'home', href: '/' },
        { label: 'sobre', href: '/sobre' },
        { label: 'portfolio showcase', href: '/#portfolio-showcase' },
        { label: 'contato', href: '/#contact' },
      ]}
      logoUrl="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg"
      gradient={['rgba(0,87,255,0.55)', 'rgba(82,39,255,0.45)']}
      accentColor="#0057FF"
    />
  );
}
