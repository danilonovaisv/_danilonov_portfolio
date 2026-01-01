'use client';

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useRef } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { ghostIn } from '@/lib/motionTokens';

const VIDEO_DESKTOP =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO%20HERO%20-%20SOBRE.mp4';
const VIDEO_MOBILE =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO_HERO_SOBRE_MOBILE_1.mp4';

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const shouldReduceMotion = useReducedMotion();

  // Parallax effect for video
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center md:justify-end pt-24"
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
      <div className="relative z-10 w-full max-w-4xl px-6 md:px-24 text-center mr-0 md:mr-12 lg:mr-24 flex flex-col items-center">
        <motion.div
          variants={ghostIn}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate="visible"
          className="space-y-2 md:space-y-4"
        >
          {/* Line 1 */}
          <motion.h1
            custom={0}
            variants={ghostIn}
            className="text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-tight leading-tight"
          >
            Sou{' '}
            <span className="font-bold text-[#0048ff] transition-colors duration-300 hover:text-[#4fe6ff] cursor-default">
              Danilo Novais.
            </span>
          </motion.h1>

          {/* Line 2 */}
          <motion.p
            custom={1}
            variants={ghostIn}
            className="text-2xl md:text-4xl lg:text-5xl text-white font-light tracking-tight leading-tight"
          >
            <span className="font-bold text-[#0048ff] transition-colors duration-300 hover:text-[#4fe6ff] cursor-default">
              Você não vê
            </span>{' '}
            tudo o que eu faço.
          </motion.p>

          {/* Line 3 */}
          <motion.p
            custom={2}
            variants={ghostIn}
            className="text-2xl md:text-4xl lg:text-5xl text-white font-light tracking-tight leading-tight"
          >
            Mas sente quando{' '}
            <span className="font-bold text-[#0048ff] transition-colors duration-300 hover:text-[#4fe6ff] cursor-default">
              funciona.
            </span>
          </motion.p>

          {/* Spacer */}
          <div className="h-4 md:h-8" />

          {/* Line 4 */}
          <motion.p
            custom={3}
            variants={ghostIn}
            className="text-xl md:text-3xl lg:text-4xl text-white font-light tracking-tight leading-relaxed max-w-3xl mx-auto"
          >
            <span className="font-bold text-[#0048ff] transition-colors duration-300 hover:text-[#4fe6ff] cursor-default">
              Crio design
            </span>{' '}
            que observa, entende
          </motion.p>

          {/* Line 5 */}
          <motion.p
            custom={4}
            variants={ghostIn}
            className="text-xl md:text-3xl lg:text-4xl text-white font-light tracking-tight leading-relaxed max-w-3xl mx-auto"
          >
            e guia experiências com intenção,
          </motion.p>

          {/* Line 6 */}
          <motion.p
            custom={5}
            variants={ghostIn}
            className="text-xl md:text-3xl lg:text-4xl text-white font-light tracking-tight leading-relaxed max-w-3xl mx-auto"
          >
            <span className="font-bold text-[#0048ff] transition-colors duration-300 hover:text-[#4fe6ff] cursor-default">
              estratégia e tecnologia
            </span>{' '}
            — na medida certa.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
