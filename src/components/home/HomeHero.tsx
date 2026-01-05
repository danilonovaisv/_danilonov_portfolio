'use client';

import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  cubicBezier,
} from 'framer-motion';
import * as THREE from 'three';
import { Preloader } from '@/components/ui/Preloader';
import { HeroCopy } from './HeroCopy';
import { GhostStage } from './GhostStage';
import { ManifestoThumb, type ManifestoThumbHandle } from './ManifestoThumb';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useLenis } from '@/hooks/useLenis';

const CONFIG = {
  preloadMs: 2000,
  easing: cubicBezier(0.22, 1, 0.36, 1),
  // AJUSTE: Entrada mais sutil e "grounded"
  entrance: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 1.0,
      ease: [0.22, 1, 0.36, 1] as const, // easeOutExpo
      delay: 0.8, // Espera um pouco mais para aparecer após o texto
    },
  },
};

export default function HomeHero() {
  const lenis = useLenis();
  const sectionRef = useRef<HTMLElement | null>(null);
  const manifestoRef = useRef<ManifestoThumbHandle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // State to track if we have already performed the distinct "hold" logic for this session
  // preventing it from triggering every single time the user oscillates slightly.
  const hasHeldRef = useRef(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReducedMotion = useMediaQuery(
    '(prefers-reduced-motion: reduce)'
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const shouldRender3D = useMemo(() => {
    if (!mounted) return false;
    if (isMobile) return false;
    return !prefersReducedMotion;
  }, [mounted, isMobile, prefersReducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // --- DIMENSIONS & POSITIONING (Pixel-based for accuracy) ---
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  useEffect(() => {
    // Calculate global dimensions
    const updateDimensions = () => {
      setDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Animation Constants
  const T_START = 0.0; // Start immediately
  const T_END = 0.35; // Finish early (so it stays fullscreen for a while)

  // Thumbnail Config
  const THUMB_WIDTH_VW = 0.28; // 28vw
  const MARGIN_PX = 40;

  // Computed Values
  const startWidth = dimensions.w * THUMB_WIDTH_VW;
  const startHeight = startWidth * (9 / 16); // 16:9 aspect

  // Position Calculations (Anchored Bottom-Right)
  // We use `top/left` for performance, so we calculate the offset.
  // Start Top = ScreenH - ThumbH - Margin
  const startTop = dimensions.h - startHeight - MARGIN_PX;
  // Start Left = ScreenW - ThumbW - Margin
  const startLeft = dimensions.w - startWidth - MARGIN_PX;

  // Transforms
  const width = useTransform(
    scrollYProgress,
    [T_START, T_END],
    [startWidth, dimensions.w]
  );
  const height = useTransform(
    scrollYProgress,
    [T_START, T_END],
    [startHeight, dimensions.h]
  );
  const top = useTransform(scrollYProgress, [T_START, T_END], [startTop, 0]);
  const left = useTransform(scrollYProgress, [T_START, T_END], [startLeft, 0]);
  const borderRadius = useTransform(scrollYProgress, [T_START, T_END], [16, 0]);
  // Copy Fades out as video grows (faster)
  const copyOpacity = useTransform(scrollYProgress, [0.0, 0.3], [1, 0]);

  // Fallbacks for initial server render (avoid layout shift if possible, or hide)
  // Since we check `!mounted` in render conditions, this is safe.

  // --- LOGIC: HOLD & SOUND ---
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (prefersReducedMotion || isMobile) return;

    // 1. LOCK/HOLD LOGIC
    // Trigger hold slightly after it becomes full screen
    const triggerPoint = T_END + 0.05; // e.g., 0.40

    if (latest > triggerPoint && latest < triggerPoint + 0.1) {
      if (!hasHeldRef.current && lenis) {
        // Trigger Hold (Phantom Lock)
        hasHeldRef.current = true;
        lenis.stop();
        manifestoRef.current?.setMuted(false); // Unmute

        // Release after 2 seconds
        setTimeout(() => {
          lenis.start();
        }, 2000);
      }
    }

    // 2. RESET LOGIC
    // If user scrolls back up significantly, reset the hold flag so they can experience it again
    if (latest < 0.5) {
      hasHeldRef.current = false;
      manifestoRef.current?.setMuted(true);
    }

    // 3. MUTE LOGIC (Leaving Hero)
    // If we passed the hero (approx 0.98+), mute again
    if (latest > 0.99) {
      manifestoRef.current?.setMuted(true);
    }

    // Also mute if we are in the early phase (thumbnail)
    // T_END is now 0.35, so we mute if we are safely before that (0.2),
    // unless we just held it.
    if (latest < 0.2 && !hasHeldRef.current) {
      manifestoRef.current?.setMuted(true);
    }
  });

  const handlePreloaderDone = useCallback(() => setIsLoading(false), []);
  const ghostRef = useRef<THREE.Group | null>(null);

  const handleThumbClick = useCallback(() => {
    const target = sectionRef.current;
    if (!lenis || !target) return;

    // Scroll automatically to the trigger point
    lenis.scrollTo(target, {
      offset: target.offsetHeight * 0.88, // Just before the trigger
      duration: 1.5,
    });
  }, [lenis]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      // HEIGHT ADJUSTMENT:
      // Mobile: h-dvh (one screen exactly). No scroll extension needed because the video is in the next section.
      // Desktop: h-[400vh] (to allow for scroll-driven animation).
      className="relative h-dvh md:h-[400vh] bg-[#020204] overflow-hidden"
      aria-label="Home hero section"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <AnimatePresence>
          {isLoading && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Summoning spirits"
            />
          )}
        </AnimatePresence>

        {/* CAMADA WEBGL */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{
            filter: isLoading ? 'blur(20px)' : 'blur(0px)',
            opacity: 1,
          }}
          transition={{ duration: 2.0, ease: 'linear' }}
        >
          <GhostStage
            reducedMotion={!shouldRender3D}
            active={!isLoading && shouldRender3D}
            ghostRef={ghostRef}
          />
        </motion.div>

        {/* CAMADA DE TEXTO */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute inset-0 z-25 pointer-events-none"
        >
          <div className="w-full h-full pointer-events-auto">
            <HeroCopy
              startEntrance={!isLoading}
              enable3D={shouldRender3D}
              ghostRef={ghostRef}
            />
          </div>
        </motion.div>

        {/* Floating Video - Desktop Only */}
        {!prefersReducedMotion && !isMobile && (
          <motion.div
            className="fixed bottom-5 right-5 z-50 pointer-events-auto overflow-hidden shadow-2xl"
            style={{
              // Apply transforms for scale, position, and size
              width: mounted && dimensions.w > 0 ? width : '28vw',
              height: mounted && dimensions.h > 0 ? height : '15.75vw',
              top: mounted && dimensions.w > 0 ? top : undefined,
              left: mounted && dimensions.w > 0 ? left : undefined,
              bottom: mounted && dimensions.w > 0 ? undefined : 20,
              right: mounted && dimensions.w > 0 ? undefined : 20,
              borderRadius,
              opacity: mounted ? 1 : 0, // Prevent FOUC
            }}
            initial={{ opacity: 0, scale: 0.3 }} // Initial state per requirements
            animate={{ opacity: 1, scale: 1 }} // Animate to full size
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: 1.5, // Delay after preloader
            }}
          >
            <ManifestoThumb ref={manifestoRef} onClick={handleThumbClick} />
          </motion.div>
        )}
      </div>

      <div className="hidden md:block h-screen w-full pointer-events-none" />
    </section>
  );
}
