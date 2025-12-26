// src/components/home/HomeHero.tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { ASSETS } from '@/lib/constants';
import HeroCopy from './HeroCopy';
import GhostStage from './GhostStage';
import HeroPreloader from './HeroPreloader';
import ManifestoThumb from './ManifestoThumb'; // Reutilizado no Mobile

// --- SUB-COMPONENTE DESKTOP ---
function DesktopHero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Animação da Thumb (Dissolver)
  const thumbY = useTransform(smoothProgress, [0, 0.5], ['0%', '-20%']);
  const thumbScale = useTransform(smoothProgress, [0, 0.5], [1, 0.95]);
  const thumbOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const thumbBlur = useTransform(smoothProgress, [0, 0.4], ['0px', '12px']);
  const ghostOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  return (
      <section
          ref={containerRef}
          className="relative h-screen w-full overflow-hidden bg-[#06071f]"
      >
        <motion.div
            style={{ opacity: ghostOpacity }}
            className="absolute inset-0 z-0 pointer-events-none"
        >
          <GhostStage enabled={true} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#06071f_90%)]" />
        </motion.div>

        <div className="relative z-10 flex h-full w-full items-center justify-center pointer-events-none">
          <HeroCopy />
        </div>

        <motion.div
            style={{
              y: thumbY,
              scale: thumbScale,
              opacity: thumbOpacity,
              filter: thumbBlur,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="group absolute bottom-8 right-8 z-20 aspect-video w-[280px] cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/20 shadow-2xl backdrop-blur-md"
            onClick={() => {
              const manifestoSection = document.getElementById('manifesto');
              if (manifestoSection) {
                manifestoSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
        >
          <div className="relative h-full w-full">
            <video
                ref={videoRef}
                src={ASSETS.videoManifesto}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full scale-105 object-cover opacity-80 transition-transform duration-500 group-hover:scale-100 group-hover:opacity-100"
            />
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0057FF] shadow-[0_0_8px_#0057FF]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/90 drop-shadow-md">
              Showreel
            </span>
            </div>
            <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-transparent" />
          </div>
        </motion.div>
      </section>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function HomeHero() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMounted) return <div className="h-screen w-full bg-[#06071f]" />;

  return (
      <>
        <HeroPreloader isVisible={true} />

        {isMobile ? (
            <>
              <section className="relative flex min-h-[70vh] w-full items-center justify-center overflow-hidden bg-[#06071f] pt-20">
                <div className="absolute inset-0 opacity-40">
                  <GhostStage enabled={false} />
                </div>
                <div className="relative z-10 w-full px-4">
                  <HeroCopy />
                </div>
              </section>

              {/* Componente Manifesto separado para Mobile */}
              <ManifestoThumb />
            </>
        ) : (
            <DesktopHero />
        )}
      </>
  );
}