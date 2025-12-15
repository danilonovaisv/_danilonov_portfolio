'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../../lib/constants';
import { AlertCircle, Maximize2 } from 'lucide-react';
import ManifestoOverlay from './ManifestoOverlay';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  // Inline video state (Tumblr/Preview mode): Muted by default
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const manifestRef = useRef<HTMLDivElement>(null);

  // Toggle Manual Mute for Inline Video
  const toggleMuteManual = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsMuted((prev) => !prev);
  }, []);

  // Sync state with video element
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted) {
        videoRef.current.volume = 1;
      }
    }
  }, [isMuted]);

  // Intersection Observer to handle "return to multi/mute" when scrolling away
  useEffect(() => {
    if (!manifestRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If we leave the view, we ensure it goes back to Muted (Multi state)
        if (!entry.isIntersecting) {
          setIsMuted(true);
        }
        // We do NOT auto-unmute on entry to respect "Tumblr" (passive) feel unless user interacts
        // The user can unmute manually.
      },
      { threshold: 0.1 }
    );

    observer.observe(manifestRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="manifesto"
      className="w-full bg-[#F4F5F7] px-4 py-16 sm:px-6 sm:py-24"
    >
      <motion.div
        ref={manifestRef}
        initial={{ opacity: 0.6, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="mx-auto w-full max-w-6xl flex flex-col gap-4"
      >
        {/* Main Video Container - Click triggers Overlay */}
        <div
          className="relative w-full overflow-hidden rounded-3xl bg-gray-100 shadow-sm cursor-pointer group"
          onClick={() => setShowOverlay(true)}
          role="button"
          aria-label="Abrir vídeo Manifesto em tela cheia"
        >
          {/* Aspect Ratio Container */}
          <div className="w-full aspect-video relative bg-black">
            {!hasError ? (
              <motion.div
                layoutId="manifesto-video-main"
                className="w-full h-full relative"
              >
                <video
                  ref={videoRef}
                  src={ASSETS.videoManifesto}
                  className="w-full h-full object-contain"
                  autoPlay
                  muted={isMuted} // Controlled by state
                  loop
                  playsInline
                  preload="metadata"
                  controls={false}
                  onError={() => setHasError(true)}
                />
                {/* Hover Overlay Hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-black/20">
                  <div className="bg-white/90 backdrop-blur text-black px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    Expandir
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
                <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
                <p className="font-medium">
                  Não foi possível carregar o vídeo.
                </p>
                <a
                  href={ASSETS.videoManifesto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-primary text-sm hover:underline underline-offset-4"
                >
                  Assistir diretamente
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Controls / Status Below Video */}
        <div className="flex items-center justify-between px-2 text-sm font-medium text-gray-500">
          <span>Manifesto</span>
          <div className="flex items-center gap-4">
            {/* Mute Toggle for Inline */}
            <button
              onClick={toggleMuteManual}
              className="flex items-center gap-2 hover:text-[#0057FF] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] rounded px-2 py-1"
              aria-label={isMuted ? 'Ligar som' : 'Desligar som'}
            >
              <span
                className={`w-2 h-2 rounded-full ${isMuted ? 'bg-gray-400' : 'bg-[#0057FF] animate-pulse'}`}
              />
              {isMuted ? 'Som desligado' : 'Som ligado'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Fullscreen Overlay */}
      <AnimatePresence>
        {showOverlay && (
          <ManifestoOverlay
            isOpen={showOverlay}
            onClose={() => setShowOverlay(false)}
            layoutId="manifesto-video-main"
            defaultMuted={false} // Som ON na versão full
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Manifesto;
