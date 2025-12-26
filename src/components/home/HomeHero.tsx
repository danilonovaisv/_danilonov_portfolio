// src/components/home/HomeHero.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { ASSETS } from '@/lib/constants';

// Componentes
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import HeroPreloader from './HeroPreloader';
import GhostStage from './GhostStage'; // Certifica-te que este ficheiro existe ou comenta a linha

export default function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Estado para garantir renderização apenas no cliente (evita hydration mismatch)
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const reducedMotion = usePrefersReducedMotion();
  const [showPreloader, setShowPreloader] = useState(true);

  // Scroll Animation Hooks
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Transições refinadas
  const videoScale = useTransform(scrollYProgress, [0, 0.3], [0.4, 1]);
  const videoY = useTransform(scrollYProgress, [0, 0.3], ['20%', '0%']);
  const videoRadius = useTransform(scrollYProgress, [0, 0.3], [24, 0]);
  // Opacidade do texto enquanto fazemos scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // 1. Check de montagem e mobile
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Preloader Logic
  useEffect(() => {
    if (reducedMotion) {
      setShowPreloader(false);
      return;
    }
    const timer = window.setTimeout(() => setShowPreloader(false), 2000); // 2s para ver a animação
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  // Se não estiver montado, retorna nulo ou um esqueleto simples para evitar flash
  if (!isMounted) return <div className="bg-[#06071f] h-screen w-full" />;

  return (
      <>
        <HeroPreloader isVisible={showPreloader} />

        {/* --- DESKTOP HERO (Scrollytelling) --- */}
        {!isMobile && (
            <section
                ref={heroRef}
                className="relative w-full bg-[#06071f] h-[350vh]" // Altura para o scroll
            >
              <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

                {/* 0. BACKGROUND & GHOST */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  {/* <GhostStage enabled={!reducedMotion} />  <-- Descomenta se tiveres o componente */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#06071f] via-[#0a0b2e] to-black/40" />
                </div>

                {/* 1. TEXT CONTENT (Desaparece ao fazer scroll) */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="relative z-20 flex w-full max-w-6xl flex-col items-center px-6 text-center"
                >
                  <HeroCopy />
                </motion.div>

                {/* 2. VIDEO ANIMATION (Cresce ao fazer scroll) */}
                <motion.div
                    style={{
                      scale: videoScale,
                      y: videoY,
                      borderRadius: videoRadius,
                    }}
                    className="absolute z-10 w-full h-full flex items-center justify-center overflow-hidden bg-black shadow-2xl origin-center"
                >
                  <div className="relative w-full h-full">
                    {/* Overlay escuro sobre o vídeo para o texto ser legível no início */}
                    <motion.div
                        style={{ opacity: contentOpacity }}
                        className="absolute inset-0 bg-[#06071f]/80 z-20"
                    />

                    <video
                        ref={videoRef}
                        src={ASSETS.videoManifesto}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* 3. CTA "Scroll" Indicator */}
                <motion.div
                    style={{ opacity: contentOpacity }}
                    className="absolute bottom-10 right-12 z-30 flex items-center gap-2 text-sm text-white/50 animate-bounce"
                >
                  <span>Scroll to explore</span>
                  <ArrowUpRight className="h-4 w-4 rotate-45" />
                </motion.div>
              </div>
            </section>
        )}

        {/* --- MOBILE HERO (Layout Estático) --- */}
        {isMobile && (
            <div className="bg-[#06071f] min-h-screen flex flex-col">
              {/* Conteúdo Mobile */}
              <div className="pt-32 pb-12 px-4 flex justify-center">
                <HeroCopy />
              </div>

              {/* Manifesto Thumb Mobile */}
              <ManifestoThumb />
            </div>
        )}
      </>
  );
}