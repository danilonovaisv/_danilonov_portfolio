'use client';
import { useEffect, useRef } from 'react';

export default function ManifestoThumb() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let maxScale = 5; // Default fallback

    const updateDimensions = () => {
      // Calculate scale needed to cover the viewport based on anchoring at bottom-right
      const scaleX = window.innerWidth / 280;
      const scaleY = window.innerHeight / (280 * (9 / 16));
      // Use the larger scale to ensure cover, plus safety margin
      maxScale = Math.max(scaleX, scaleY) * 1.1;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    const handleScroll = () => {
      if (!thumbRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(1, scrollY / viewportHeight);

      const scale = 1 + progress * (maxScale - 1);
      const radius = Math.max(0, 16 - progress * 16);

      thumbRef.current.style.transform = `scale(${scale})`;
      thumbRef.current.style.borderRadius = `${radius}px`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <div
      ref={thumbRef}
      className="hidden lg:block fixed bottom-8 right-8 z-30 w-[280px] aspect-video overflow-hidden shadow-2xl origin-bottom-right cursor-pointer transition-shadow duration-300 hover:scale-105 hover:shadow-cyan-500/20"
      role="button"
      aria-label="Assistir manifesto em fullscreen"
      onClick={() => {
        // Lógica de Click: Scrollar para o ponto onde ele fica Fullscreen
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }}
    >
      <video
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Icone de seta ou indicador visual opcional */}
      <div className="absolute bottom-3 right-3 text-white/50 bg-black/20 p-1 rounded-full backdrop-blur-sm">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}
