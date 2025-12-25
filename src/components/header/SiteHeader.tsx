'use client';

import { useState, useEffect } from 'react';
import DesktopFluidHeader from '@/components/header/DesktopFluidHeader';
import MobileStaggeredMenu from '@/components/header/MobileStaggeredMenu';

const SiteHeader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return <>{isMobile ? <MobileStaggeredMenu /> : <DesktopFluidHeader />}</>;
};

export default SiteHeader;
