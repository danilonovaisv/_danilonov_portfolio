// app/(marketing)/hero/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { useHeroScrollProgress } from '@/hooks/useHeroScrollProgress';
import { HeroOrb } from './HeroOrb';
import { motionConfig } from '@/lib/motion';

export function HeroSection() {
  const { ref, intensity } = useHeroScrollProgress<HTMLDivElement>();

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-[#f5f5f7] overflow-hidden"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 pt-24 pb-16 md:flex-row md:items-center md:justify-between lg:gap-20">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionConfig.transition.default}
          className="space-y-6 max-w-xl"
        >
          <p className="text-sm tracking-[0.25em] uppercase text-[#2f5bff]">
            Brand Awareness
          </p>

          <h1 className="text-4xl leading-[0.95] font-black tracking-tight text-black md:text-6xl lg:text-7xl">
            <span className="text-[#2f5bff]">Design,</span> não é só estética.
          </h1>

          <p className="text-base md:text-lg text-neutral-700">
            [É intenção, é estratégia, é experiência.]
          </p>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center rounded-full bg-[#2f5bff] px-7 py-3 text-sm font-medium text-white shadow-lg shadow-[#2f5bff]/40"
          >
            get to know me better
          </motion.button>
        </motion.div>

        {/* Orb */}
        <motion.div
          style={{ opacity: intensity }} // orb some mais quando sai da área
          className="flex flex-1 items-center justify-center"
        >
          <HeroOrb scrollIntensity={1} />
        </motion.div>
      </div>
    </section>
  );
}
