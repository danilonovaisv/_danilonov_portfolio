'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from '@react-three/drei';
import { ASSETS } from '../../lib/constants';
import { useIsMobile } from '../../hooks/useIsMobile';

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

  // Optimization: fewer particles on mobile
  // "Partículas visíveis apenas em telas > 768px" logic combined with "const sparklesCount = isMobile ? 50 : 150"
  // If the requirement is strictly "visíveis apenas em telas > 768px", then mobile count should be 0 or hidden.
  // But Item 5 says: "redzir count para 50". I will strictly follow Item 5 as it is "OTIMIZAÇÕES TÉCNICAS".
  const sparklesCount = isMobile ? 50 : 150;

  return (
    <section
      className="relative h-screen overflow-hidden bg-[#06071f]"
      aria-label="Hero section com partículas animadas"
    >
      {/* BG estático + WebGL */}
      <div className="absolute inset-0">
        {!prefersReducedMotion && (
          <Suspense fallback={null}>
            <Canvas
              dpr={[1, 2]}
              performance={{ min: 0.7 }}
              camera={{ position: [0, 0, 30], fov: 60 }}
              className="absolute inset-0 z-0"
            >
              <color attach="background" args={['#06071f']} />
              <Sparkles
                count={sparklesCount}
                size={0.8}
                scale={[10, 5, 10]}
                color="#5d8cff" // Azul principal
                noise={2}
                speed={0.3}
                depthTest={false}
              />
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

      {/* Conteúdo principal - Estático */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center max-w-4xl mx-auto px-4">
        <p className="text-[#d9dade] text-lg md:text-xl tracking-wider uppercase mb-6">
          [BRAND AWARENESS]
        </p>
        <h1 className="text-[#d9dade] text-4xl md:text-6xl font-bold leading-tight mb-8">
          Design, não
          <br />é só estética.
        </h1>
        <p className="text-[#d9dade] text-2xl md:text-3xl italic">
          [É intenção, é estratégia, é experiência.]
        </p>
      </div>

      {/* Vídeo manifesto (posição fixa direita/baixo) */}
      <div className="absolute z-20 bottom-8 right-8 w-full max-w-[280px] md:max-w-[320px] px-4 md:px-0">
        <motion.div
          className="relative rounded-lg overflow-hidden shadow-lg border border-white/5 bg-black/20"
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
