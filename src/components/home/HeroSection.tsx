// src/components/home/HeroSection.tsx

'use client';

import { motion } from 'framer-motion';
import SpectralGhost from './SpectralGhost';
import { useSpectralGhost } from '@/hooks/useSpectralGhost';
import ManifestoThumb from './ManifestoThumb';

const HeroSection = () => {
  const isGhostLoaded = useSpectralGhost();

  return (
    <section className="hero-section">
      <div className="hero-content-wrapper">
        {/* O SpectralGhost será o fundo interativo */}
        <SpectralGhost onLoaded={() => {}} />

        {/* Os textos e botão serão sobrepostos ao canvas 3D */}
        {isGhostLoaded && (
          <div className="hero-text-overlay">
            <h1 className="hero-title">Design, não é só estética.</h1>
            <p className="hero-subtitle">
              [É intenção, é estratégia, é experiência.]
            </p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="cta-button"
            >
              get to know me better →
            </motion.button>
          </div>
        )}

        {/* Vídeo Manifesto - Desktop */}
        {isGhostLoaded && (
          <motion.div className="absolute bottom-10 right-10 z-30 w-[30vw] aspect-video overflow-hidden rounded-2xl shadow-lg hidden md:block">
            <ManifestoThumb />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
