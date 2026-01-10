'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
} from 'framer-motion';

export interface ManifestoThumbProps {
  heroRef: RefObject<HTMLElement | null>;
  src?: string;
}

const ManifestoThumb: React.FC<ManifestoThumbProps> = ({
  heroRef,
  src = 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [muted, setMuted] = useState(true);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    // On desktop, always load immediately since the video is visible in viewport
    // The IntersectionObserver pattern doesn't work when the element's render depends on shouldLoad
    if (isDesktop) {
      setShouldLoad(true);
    }
  }, [isDesktop]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  // Morphing transforms based on scroll spec (linear)
  const width = useTransform(smoothProgress, [0, 1], ['219px', '100vw']);
  const height = useTransform(smoothProgress, [0, 1], ['131px', '100vh']);
  const right = useTransform(smoothProgress, [0, 1], ['32px', '0px']);
  const bottom = useTransform(smoothProgress, [0, 1], ['32px', '0px']);
  const borderRadius = useTransform(smoothProgress, [0, 1], ['12px', '0px']);

  // Overlay visibility
  const miniOverlayOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const finalOverlayOpacity = useTransform(smoothProgress, [0.75, 1], [0, 1]);

  // Audio threshold logic for desktop
  useEffect(() => {
    if (!isDesktop) return;
    const unsubscribe = smoothProgress.on('change', (latest) => {
      if (latest >= 0.75) {
        setMuted(false);
      } else {
        setMuted(true);
      }
    });
    return () => unsubscribe();
  }, [isDesktop, smoothProgress]);

  const handleAction = () => {
    if (isDesktop && heroRef.current) {
      // Desktop: Jump to fullscreen instant state (scroll to target)
      const targetScroll =
        heroRef.current.offsetTop +
        heroRef.current.offsetHeight -
        window.innerHeight;
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else {
      // Mobile: Toggle Sound
      setMuted((prev) => !prev);
    }
  };

  if (!isDesktop) return null; // ShowreelThumb is desktop-only floating element

  return (
    <AnimatePresence>
      {shouldLoad && (
        <motion.div
          ref={wrapperRef}
          className="video-wrapper group fixed z-30 overflow-hidden cursor-pointer"
          style={{
            width,
            height,
            right,
            bottom,
            borderRadius,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleAction}
          role="button"
          aria-label="Reveal Manifesto Video"
        >
          {/* Inner zoom effect */}
          <motion.div
            className="w-full h-full relative"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src={src}
              autoPlay
              loop
              muted={muted}
              playsInline
              preload="metadata"
              aria-label="Vídeo showreel demonstrando projetos de design gráfico"
            />

            {/* Hover UI (Arrow rotation) */}
            <motion.div
              className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none"
              style={{ opacity: miniOverlayOpacity }}
            >
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">
                  Explore
                </span>
                <motion.div
                  animate={{ rotate: isHovered ? 0 : -45 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>

            {/* Final Fullscreen Overlay */}
            <motion.div
              className="absolute inset-0 video-overlay pointer-events-none flex flex-col justify-end p-6 md:p-12"
              style={{ opacity: finalOverlayOpacity }}
            >
              <div className="max-w-4xl">
                <p className="text-white/60 text-caption mb-2 font-medium">
                  MANIFESTO VIDEO • 2025
                </p>
                <p className="text-white text-display leading-[0.9] font-black tracking-tighter">
                  WE ARE THE
                  <br />
                  INVISIBLE HAND
                </p>
              </div>
            </motion.div>

            {/* Sound Feedback Indicator */}
            {!muted && (
              <div className="absolute top-6 left-6 bg-[#0048ff]/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white flex items-center gap-2">
                <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                AUDIO ACTIVE
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ManifestoThumb;
