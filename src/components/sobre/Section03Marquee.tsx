'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';

// Função utilitária para o loop infinito suave
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

interface MarqueeLineProps {
  text: string;
  baseVelocity: number;
}

function MarqueeLine({ text, baseVelocity }: MarqueeLineProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  const prefersReducedMotion = useReducedMotion();

  useAnimationFrame((t, delta) => {
    if (prefersReducedMotion) return;

    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Inverte a direção baseado na velocidade do scroll (efeito parallax)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex whitespace-nowrap">
      <motion.div className="flex gap-4 text-nowrap" style={{ x }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className="text-[#8705f2] text-[clamp(5rem, 20vw, 12rem)] font-black uppercase tracking-widest leading-tight flex items-center gap-9.9"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Section03Marquee() {
  return (
    <div className="w-full select-none pointer-events-none bg-[#0048ff] py-12 overflow-hidden mt-4 lg:mt-8">
      <div className="flex flex-col gap-x-0.5">
        <MarqueeLine
          text="DIREÇÃO CRIATIVA ・ DESIGN ESTRATÉGICO ・ IDENTIDADES ・ CAMPANHAS ・ BRANDING ・ IA ・ LIDERANÇA CRIATIVA ・ "
          baseVelocity={-4}
        />
        <MarqueeLine
          text="BRANDING ・ IA ・ LIDERANÇA CRIATIVA ・ DIREÇÃO CRIATIVA ・ DESIGN ESTRATÉGICO ・ IDENTIDADES ・ CAMPANHAS ・ "
          baseVelocity={4}
        />
      </div>
    </div>
  );
}
