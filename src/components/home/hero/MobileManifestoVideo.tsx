import React from 'react';

export default function MobileManifestoVideo() {
  return (
    <section
      className="block md:hidden w-full relative pt-[64px]" // Padding top for header
      aria-label="Manifesto Video"
    >
      <div className="w-full aspect-video relative overflow-hidden bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
          poster="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp" // Fallback poster
        >
          <source
            src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay para legibilidade, se necessário */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </section>
  );
}
