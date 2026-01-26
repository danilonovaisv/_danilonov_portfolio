'use client';

import { BRAND } from '@/config/brand';
import AntigravityCTA from '@/components/ui/AntigravityCTA';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={BRAND.video.manifesto} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/60" />

      {/* Content */}
      <div className="std-grid relative z-10 flex h-full flex-col justify-end pb-12 sm:pb-16 md:pb-24">
        <div className="col-span-full flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-h1 text-4xl font-bold uppercase tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            <span className="text-secondary">portfólio</span>{' '}
            <span className="text-white">showcase</span>
          </motion.h1>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <AntigravityCTA 
                 href="#contact"
                 text="vamos trabalhar juntos"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
