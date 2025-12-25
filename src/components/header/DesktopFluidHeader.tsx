'use client';

import Link from 'next/link';
import Image from 'next/image';
import LogoLight from '@/assets/logos/LogoLight.svg';
import FluidGlass from './webgl/FluidGlass';

const DesktopFluidHeader = () => {
  const navItems = [
    { label: 'home', link: '#hero' },
    { label: 'sobre', link: '/sobre' },
    { label: 'portfolio showcase', link: '/portfolio' },
    { label: 'contato', link: '#contact' },
  ];
  const activeIndex = 0;

  return (
    <header
      role="banner"
      className="fixed left-1/2 top-4 z-[120] w-full -translate-x-1/2 px-4 md:top-6"
    >
      <div className="relative mx-auto h-[82px] w-full max-w-[1200px] overflow-visible sm:h-[90px]">
        {/* Canvas + glow as background layer */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 -z-10 rounded-[30px] bg-[radial-gradient(circle_at_15%_10%,rgba(86,133,255,0.28),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(120,66,255,0.22),transparent_42%)] opacity-70 blur-xl" />
          <div className="absolute inset-0">
            <FluidGlass
              mode="lens"
              lensProps={{
                scale: 0.25,
                ior: 1.15,
                thickness: 5,
                chromaticAberration: 0.1,
                anisotropy: 0.01,
                navItems,
              }}
            />
          </div>
        </div>

        {/* DOM overlay for clarity and accessibility */}
        <div className="relative z-10 flex h-full items-center justify-between px-6 text-white">
          <div className="flex items-center gap-3">
            <Image
              src={LogoLight}
              alt="Danilo Novais"
              className="h-10 w-auto drop-shadow-[0_0_18px_rgba(59,130,246,0.45)]"
              priority
            />
          </div>

          <nav className="hidden items-center gap-8 text-lg font-medium tracking-tight md:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.link}
                className={`pb-1 transition-colors duration-200 ${
                  index === activeIndex
                    ? 'text-[#2c7bff]'
                    : 'text-white/90 hover:text-white'
                }`}
                aria-label={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DesktopFluidHeader;
