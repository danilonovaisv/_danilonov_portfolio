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
    <header className="fixed top-6 left-1/2 z-50 w-full max-w-none -translate-x-1/2 px-4">
      <div className="relative z-40 h-[78px] w-full max-w-[1100px] overflow-hidden rounded-[32px] sm:h-20 md:h-24">
        <FluidGlass
          mode="bar"
          lensProps={{
            scale: 0.25,
            ior: 1.2,
            thickness: 3,
            chromaticAberration: 0.12,
            anisotropy: 0.08,
            navItems,
          }}
        />

        {/* DOM overlay for clarity and accessibility */}
        <div className="absolute inset-0 flex items-center justify-between px-6 text-white">
          <div className="flex items-center gap-3">
            <Image
              src={LogoLight}
              alt="Danilo Novais"
              className="h-10 w-auto drop-shadow-[0_0_18px_rgba(59,130,246,0.4)]"
              priority
            />
          </div>

          <nav className="hidden items-center gap-10 text-lg font-medium tracking-tight md:flex">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.link}
                className={`border-b-2 border-transparent pb-1 transition-colors duration-200 ${
                  index === activeIndex
                    ? 'border-[#0057FF] text-[#0057FF]'
                    : 'text-white/85 hover:text-white'
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
