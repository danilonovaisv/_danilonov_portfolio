'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { ASSETS } from '@/lib/constants';
import HeroCopy from './HeroCopy';
import GhostStage from './GhostStage';
import HeroPreloader from './HeroPreloader';

export default function HomeHero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Detecção de Mobile e Montagem
  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // SCROLL TRIGGER
  // O container tem altura suficiente (~220vh) para permitir o scroll timeline completo
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Suavização do scroll (Lenis feel) para evitar movimentos bruscos
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  // --- TIMELINE DE ANIMAÇÃO (DESKTOP) ---
  // Baseado na spec: 0% -> 5% (Trava) -> 25% (Zoom) -> 55% (Full) -> 75% (Lock)

  // Scale: 0.58 (Thumb) -> 1 (Fullscreen)
  const desktopScale = useTransform(smoothProgress,
      [0, 0.05, 0.25, 0.55],
      [0.58, 0.58, 0.75, 1]
  );

  // Border Radius: 24px (Thumb) -> 0px (Full)
  const desktopRadius = useTransform(smoothProgress,
      [0, 0.05, 0.25, 0.55, 0.75],
      [24, 24, 20, 6, 0]
  );

  // --- TIMELINE DE ANIMAÇÃO (MOBILE) ---
  // Simplificada para performance: 0.85 -> 1
  const mobileScale = useTransform(smoothProgress, [0, 0.6], [0.85, 1]);
  const mobileRadius = useTransform(smoothProgress, [0, 0.6], [12, 0]);

  // Aplicação condicional das transformações
  const scale = isMobile ? mobileScale : desktopScale;
  const borderRadius = isMobile ? mobileRadius : desktopRadius;

  // Efeitos de Texto e Ghost (Fading out para dar destaque ao vídeo)
  const contentOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const contentBlur = useTransform(smoothProgress, [0, 0.15], ['0px', '10px']);

  if (!isMounted) return <div className="h-screen w-full bg-[#06071f]" />;

  return (
      <>
        <HeroPreloader isVisible={true} />

        <section
            ref={containerRef}
            // Altura definida para ~220vh para acomodar o timeline da animação
            className="relative h-[220vh] w-full bg-[#06071f]"
        >
          {/* WRAPPER STICKY: Mantém o conteúdo fixo enquanto o usuário faz scroll */}
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

            {/* 1. LAYER: BACKGROUND GHOST & TEXTO (Z-INDEX 10) */}
            {/* Ficam atrás/junto do vídeo inicialmente, mas somem ao scrollar */}
            <motion.div
                style={{ opacity: contentOpacity, filter: useMotionTemplate`blur(${contentBlur})` }}
                className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"
            >
              {/* Ghost Background */}
              <div className="absolute inset-0 z-0 opacity-60">
                <GhostStage enabled={!isMobile} />
              </div>

              {/* Hero Copy (Texto) */}
              <div className="relative z-20 w-full px-6">
                <HeroCopy />
              </div>
            </motion.div>

            {/* 2. LAYER: VÍDEO HERO ANIMADO (Z-INDEX 0 -> Background funcional) */}
            <motion.div
                style={{
                  scale,
                  borderRadius,
                }}
                className="relative z-0 w-full h-full overflow-hidden shadow-2xl origin-center will-change-transform"
            >
              {/* Overlay sutil para garantir contraste inicial (desaparece quando full) */}
              <motion.div
                  style={{ opacity: contentOpacity }}
                  className="absolute inset-0 bg-[#06071f]/40 z-10 pointer-events-none"
              />

              <video
                  src={ASSETS.videoManifesto}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  // Propriedades de otimização
                  disablePictureInPicture
                  controls={false}
              />
            </motion.div>

          </div>
        </section>
      </>
  );
}