'use client';

import { useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  wrap,
} from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MarqueeProps {
  items: string[];
  direction?: number;
  baseVelocity?: number;
  reducedMotion?: boolean;
  className?: string;
}

export const Marquee = ({
  items,
  direction = 1,
  baseVelocity = 10,
  reducedMotion = false,
  className,
}: MarqueeProps) => {
  const { scrollY } = useScroll();
  const baseX = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionRef = useRef<number>(direction);
  useAnimationFrame((_t, delta) => {
    if (reducedMotion) return;

    let moveBy = directionRef.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() !== 0) {
      moveBy += directionRef.current * moveBy * velocityFactor.get();
    }

    baseX.set(baseX.get() + moveBy);
  });

  const repeatedItems = [...items, ...items, ...items, ...items];

  if (reducedMotion) {
    return (
      <div
        aria-hidden="true"
        className={cn(
          'flex flex-wrap items-center justify-center gap-4 px-4 py-4 font-black uppercase tracking-[0.15em] text-[#8705f2] text-sm',
          className
        )}
      >
        {items.map((item, idx) => (
          <span key={`${item}-${idx}`} className="flex items-center gap-2">
            <span>{item}</span>
            {idx < items.length - 1 && <span className="opacity-60">・</span>}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden whitespace-nowrap" aria-hidden="true">
      <motion.div
        className={cn(
          'flex items-center gap-8 font-black uppercase tracking-[0.2em] text-[#8705f2] text-sm lg:text-base lg:gap-10',
          className
        )}
        style={{ x }}
      >
        {repeatedItems.map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-8 lg:gap-10"
          >
            <span>{item}</span>
            <span className="opacity-40">・</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
