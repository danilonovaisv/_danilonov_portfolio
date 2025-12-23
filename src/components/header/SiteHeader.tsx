'use client';

import DesktopFluidHeader from './DesktopFluidHeader';
import StaggeredMenu from './StaggeredMenu';
import Link from 'next/link';
import Image from 'next/image';
import { ASSETS } from '@/lib/constants';

export default function SiteHeader() {
  return (
    <>
      {/* Desktop View (>= 1024px) */}
      <div className="hidden lg:block">
        <DesktopFluidHeader />
      </div>

      {/* Mobile/Tablet View (< 1024px) */}
      <div className="lg:hidden">
        <MobileHeader />
      </div>
    </>
  );
}

function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between p-6 pointer-events-none">
      {/* Logo - Clickable */}
      <Link href="/" className="pointer-events-auto relative w-24 h-8">
        <Image
          src={ASSETS.logoDark} // Check if background needs light/dark. Usually website is light/dark?
          // Site context: Hero is Dark (#06071f). Footer is Blue. Content?
          // "Contexto do Projeto: Home" -> Header remains visible.
          // On Hero (Dark), valid.
          // On Portfolio (Light bg?).
          // For safety on Mobile (which has no glass pill background usually, strict overlay),
          // we might need a mix-blend-mode or just assume contrast.
          // Let's stick to logoDark for now, assuming light sections or white bg header?
          // Wait, Mobile Header usually has a background or is transparent?
          // "Mobile & Tablet: Staggered Menu"
          // If transparent, we need to ensure contrast.
          // Hero is Dark. Project Showcase is Light (#F4F5F7).
          // A simple solution: Backdrop filter strip or blend mode.
          // Or just dynamic color based on section (complex).
          // Let's implement a glass strip for mobile too? Or just transparent?
          // "Mobile & Tablet: O header é funcional e minimalista."
          alt="Danilo Novais"
          fill
          className="object-contain object-left invert md:invert-0"
          // Invert trick if needed for dark hero
        />
      </Link>

      <div className="pointer-events-auto">
        <StaggeredMenu />
      </div>
    </header>
  );
}
