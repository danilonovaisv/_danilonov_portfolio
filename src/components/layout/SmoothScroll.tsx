'use client';

import { ReactNode, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { ScrollContext } from '@/contexts/ScrollContext';

import { useAntigravityStore } from '@/store/antigravity.store';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const { flags } = useAntigravityStore();

  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    // ♿ SE REDUCED MOTION → SEM LENIS
    if (flags.reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });

    setLenisInstance(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [flags.reducedMotion]);

  return (
    <ScrollContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </ScrollContext.Provider>
  );
}
