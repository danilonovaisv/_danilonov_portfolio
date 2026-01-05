import React from 'react';
import Image from 'next/image';
import { OriginMedia } from './types';

// Componente para mídia (vídeo ou imagem)
export function MediaItem({
  src,
  alt,
  aspectRatio,
  preserveRatio,
}: OriginMedia) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');
  const ratioClass = aspectRatio || 'aspect-[0.8]';

  if (isVideo) {
    if (preserveRatio) {
      return (
        <div className="w-full overflow-hidden rounded-xl">
          <video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="block w-full h-auto"
            aria-label={alt}
          />
        </div>
      );
    }

    return (
      <div
        className={`relative w-full ${ratioClass} overflow-hidden rounded-xl`}
      >
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-label={alt}
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full ${ratioClass} rounded-xl overflow-hidden`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
    </div>
  );
}
