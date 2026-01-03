'use client';

import React, { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface MobileHeaderBarProps {
  logoUrl: string;
  onLogoClick: () => void;
  children: ReactNode;
  isLight?: boolean;
}

export default function MobileHeaderBar({
  logoUrl,
  onLogoClick,
  children,
  isLight = false,
}: MobileHeaderBarProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-100 pointer-events-none ${
        isLight ? 'header--light' : ''
      }`}
    >
      <div
        className={`w-full h-[60px] backdrop-blur-md pointer-events-auto ${
          isLight
            ? 'bg-white/85 border-b border-[#0048ff]/15'
            : 'bg-black/20 border-b border-white/10'
        }`}
      >
        <div className="flex items-center justify-between h-full px-6">
          <Link href="/" onClick={onLogoClick}>
            <Image
              src={logoUrl}
              alt="Danilo"
              width={32}
              height={32}
              className="h-8 w-auto object-contain"
              unoptimized
            />
          </Link>

          {children}
        </div>
      </div>
    </header>
  );
}
