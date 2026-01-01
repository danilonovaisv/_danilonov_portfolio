// src/components/about/HeroVideo.tsx
'use client';

import { useEffect, useState } from 'react';

const DESKTOP_VIDEO =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4';

const MOBILE_VIDEO =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4';

export function HeroVideo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        key={isMobile ? 'mobile' : 'desktop'}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover opacity-[0.6]"
      >
        <source
          src={isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO}
          type="video/mp4"
        />
      </video>

      {/* Overlay obrigatório */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/70 to-black/90" />
    </div>
  );
}
