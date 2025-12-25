'use client';

import Link from 'next/link';
import FluidGlass from './webgl/FluidGlass';

const DesktopFluidHeader = () => {
  const navItems = [
    { label: 'Home', link: '/' },
    { label: 'Sobre', link: '/sobre' },
    { label: 'Portfolio', link: '/portfolio' },
    { label: 'Contato', link: '#contact' }
  ];

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 w-auto">
      <div className="relative" style={{ height: '80px', width: '600px' }}>
        <FluidGlass 
          mode="lens"
          lensProps={{
            scale: 0.25,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01,
            navItems
          }}
        />
        
        {/* Fallback navigation if WebGL fails */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none">
          <nav className="flex space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.label}
                href={item.link}
                className="text-white text-sm font-medium hover:opacity-70 transition-opacity"
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
