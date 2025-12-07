'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ASSETS } from '@/src/lib/constants';
import { AlertCircle } from 'lucide-react';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [forceMute, setForceMute] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const updateAudioPreference = () => {
      const isMobile = window.innerWidth < 768;
      setForceMute(isMobile);
      if (isMobile && videoRef.current) {
        videoRef.current.muted = true;
      }
      if (isMobile) {
        setIsAudioEnabled(false);
      }
    };

    updateAudioPreference();
    window.addEventListener('resize', updateAudioPreference);
    return () => window.removeEventListener('resize', updateAudioPreference);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px 200px 0px',
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const isAudioAllowed = !forceMute && isAudioEnabled;

  useEffect(() => {
    if (!shouldLoad) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoEl) return;

        if (!isAudioAllowed) {
          videoEl.muted = true;
          videoEl.pause();
          return;
        }

        if (entry.intersectionRatio >= 0.9) {
          videoEl.muted = false;
          if (videoEl.paused) {
            videoEl.play().catch(() => null);
          }
        } else {
          videoEl.muted = true;
          videoEl.pause();
        }
      },
      { threshold: [0, 0.9, 1] }
    );

    observer.observe(videoEl);
    return () => observer.disconnect();
  }, [isAudioAllowed, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        if (!entry.isIntersecting) {
          videoRef.current.muted = true;
          videoRef.current.pause();
        }
      },
      { threshold: 0 }
    );

    observer.observe(sectionEl);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'hidden' && videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.pause();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      aria-labelledby="manifesto-title"
      className="w-full bg-[#F4F5F7] px-6 py-16"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="space-y-3">
          <h2
            id="manifesto-title"
            className="text-2xl font-semibold text-[#111111]"
          >
            Vídeo Manifesto
          </h2>
          <p className="text-base text-[#111111]/80">
            Este vídeo apresenta meu manifesto em design. O áudio é ativado
            automaticamente quando visível em tela cheia.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAudioEnabled((prev) => !prev)}
              disabled={forceMute}
              aria-pressed={isAudioAllowed}
              className="rounded-full border border-[#0057FF] px-5 py-2 text-sm font-semibold text-[#0057FF] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]/70 disabled:border-[#94b5ff]/60 disabled:text-[#94b5ff] disabled:opacity-70"
            >
              {isAudioAllowed ? 'Desativar áudio' : 'Ativar áudio'}
            </button>
            <span className="text-sm text-[#111111]/70">
              {forceMute
                ? 'Áudio desligado em dispositivos móveis.'
                : 'Use o botão para ativar o áudio no desktop.'}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg"
        >
          {!hasError ? (
            shouldLoad ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={ASSETS.videoManifesto}
                  className="aspect-video h-full w-full max-w-full object-contain"
                  autoPlay
                  muted={!isAudioAllowed}
                  loop
                  playsInline
                  preload="none"
                  controls
                  aria-label="Vídeo Manifesto do portfólio"
                />
              </div>
            ) : (
              <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-[#e4ebff] to-[#f5f8ff] text-sm text-[#5b6b7f]">
                Preparando manifesto...
              </div>
            )
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
              <AlertCircle className="mb-3 h-10 w-10 opacity-50" />
              <p className="font-medium">Não foi possível carregar o vídeo.</p>
              <a
                href={ASSETS.videoManifesto}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 text-[#0057FF] text-sm underline-offset-4 hover:underline"
              >
                Assistir diretamente
              </a>
            </div>
          )}
        </motion.div>

        <p className="text-sm text-[#111111]/60">
          Em dispositivos móveis o áudio permanece desativado para respeitar o
          ambiente do usuário.
        </p>
      </div>
    </section>
  );
};

export default Manifesto;
