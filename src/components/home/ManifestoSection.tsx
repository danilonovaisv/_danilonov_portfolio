"use client";

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BRAND } from '@/config/brand';
import { AlertCircle } from 'lucide-react';

const ManifestoSection: React.FC = () => {
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  return (
    <div className="w-full">
      <motion.div
        initial={reducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full aspect-video overflow-hidden bg-black"
      >
        {!hasError ? (
          <video
            ref={videoRef}
            src={BRAND.video.manifesto}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            onError={() => setHasError(true)}
            aria-label="Vídeo Manifesto do Portfólio"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-gray-500 p-6 text-center">
            <AlertCircle className="w-10 h-10 mb-3 opacity-50" />
            <p className="font-medium">Não foi possível carregar o vídeo.</p>
            <a
              href={BRAND.video.manifesto}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-[#0057FF] text-sm hover:underline underline-offset-4"
            >
              Assistir diretamente
            </a>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ManifestoSection;
