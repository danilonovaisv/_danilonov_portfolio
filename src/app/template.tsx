'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Ghost Era Page Template
 * Handles entry transitions for all pages.
 * Rules:
 * - Fade in (opacity 0 -> 1)
 * - Horizontal/Vertical Blur (12px -> 0px)
 * - Subtle slide up (y: 20 -> 0)
 * - Easing: cubic-bezier(0.22, 1, 0.36, 1)
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Reset scroll to top on path change (Lenis handles smooth, but we make sure)
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.95,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="w-full flex-col flex grow"
    >
      {children}
    </motion.div>
  );
}
