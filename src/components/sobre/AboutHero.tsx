'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const VIDEO_DESKTOP =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO%20HERO%20-%20SOBRE-DESKTOP.mp4';
const VIDEO_MOBILE =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO%20HERO%20-%20SOBRE%20MOBILE.mp4';

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Parallax effect for video
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const lines = [
    'Sou Danilo Novais.',
    '',
    'Você não vê tudo o que eu faço.',
    'Mas sente quando funciona.',
    '',
    'Crio design que observa, entende',
    'e guia experiências com intenção,',
    'estratégia e tecnologia — na medida certa.',
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <video
          src={isDesktop ? VIDEO_DESKTOP : VIDEO_MOBILE}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-black/60" /> {/* Dimming overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-[#000022] via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 text-center">
        {lines.map((line, i) => {
          if (line === '') return <div key={i} className="h-4 md:h-8" />;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 1.4,
                delay: 0.2 + i * 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <h1
                className={`${i === 0 ? 'text-4xl md:text-6xl font-bold mb-8 text-white' : 'text-xl md:text-3xl font-light text-white/90 leading-relaxed'}`}
              >
                {line}
              </h1>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
