'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Volume2, VolumeX } from 'lucide-react';

const Manifesto: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle video mute/unmute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  // Play video with delay when component mounts
  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Add a 0.5s delay before unmuting
          timeoutRef.current = setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.muted = false;
              setIsMuted(false);
            }
          }, 500);

          // Play the video
          await videoRef.current.play();
        } catch (error) {
          console.warn('Autoplay failed:', error);
        }
      }
    };

    playVideo();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="manifesto" className="w-full bg-[#F4F5F7]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        className="relative w-full aspect-video md:aspect-21/9 overflow-hidden bg-gray-100 shadow-sm"
      >
        {!hasError ? (
          <>
            <video
              ref={videoRef}
              src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              controls={false}
              onError={() => setHasError(true)}
              aria-label="Vídeo Manifesto do Portfólio"
            />
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 bg-black/30 backdrop-blur-sm rounded-full p-2 hover:bg-black/50 transition-all duration-300 z-10"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
            <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
            <p className="font-medium">Não foi possível carregar o vídeo.</p>
            <a
              href="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-primary text-sm hover:underline underline-offset-4"
            >
              Assistir diretamente
            </a>
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default Manifesto;