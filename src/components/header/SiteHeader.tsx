'use client';

import DesktopFluidHeader from '@/components/header/DesktopFluidHeader';
import MobileStaggeredMenu from '@/components/header/MobileStaggeredMenu';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const SiteHeader = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return isDesktop ? <DesktopFluidHeader /> : <MobileStaggeredMenu />;
};

export default SiteHeader;
