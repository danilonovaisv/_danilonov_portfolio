'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { ASSETS } from '../../lib/constants';
import { useIsMobile } from '../../hooks/useIsMobile';
import GhostScene from './GhostScene';

// Lazy load Canvas for performance and SSR avoidance
const Canvas = dynamic(
  () => import('@react-three/fiber').then((mod) => mod.Canvas),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Hero() {
  const isMobile = useIsMobile();
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-[#06071f]"
      aria-label="Hero section com partículas animadas"
    >
      {/* BG estático + WebGL */}
      <div className="absolute inset-0">
        {!prefersReducedMotion && (
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 2]}
              performance={{ min: 0.7 }}
              camera={{ position: [0, 0, 12], fov: 45 }} // Adjusted camera for ghost size
              className="absolute inset-0 z-0"
              gl={{
                antialias: false,
                alpha: false,
                stencil: false,
                depth: true,
              }} // Optimizations for post-processing
            >
              <GhostScene />
            </Canvas>
          </Suspense>
        )}

        {/* Gradiente animado sutil (fallback e complemento) */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'linear-gradient(120deg, #2c52ff 0%, #0a1eff 100%)',
            animation: prefersReducedMotion
              ? 'none'
              : 'gradientShift 15s ease infinite',
          }}
        />

        <style jsx global>{`
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </div>

      {/* Conteúdo principal - Estático e Centralizado */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-5xl mx-auto px-4 pointer-events-none">
        {/* Brand Awareness */}
        <p className="text-[#d9dade] text-lg md:text-xl tracking-wider uppercase mb-8 font-[PPSupplyMono]">
          [BRAND AWARENESS]
        </p>

        {/* Título */}
        <h1 className="text-[#d9dade] text-4xl md:text-7xl font-bold leading-tight mb-8 font-[PPSupplyMono]">
          Design, não
          <br />é só estética.
        </h1>

        {/* Subtítulo */}
        <p className="text-[#d9dade] text-xl md:text-3xl italic font-[PPSupplyMono] opacity-80">
          [É intenção, é estratégia, é experiência.]
        </p>
      </div>

      {/* Vídeo manifesto (posição fixa direita/baixo) - Pointer events auto para interatividade */}
      <div className="absolute z-20 bottom-8 right-8 w-full max-w-[280px] md:max-w-[320px] px-4 md:px-0 pointer-events-auto">
        <motion.div
          className="relative rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-black/40"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.02 }}
        >
          <video
            src={ASSETS.videoManifesto}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
          />
        </motion.div>
      </div>
    </section>
  );
}
