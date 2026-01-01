'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { ABOUT_CONTENT } from '@/config/content';
import { motionTokens } from './motion';

const { origin } = ABOUT_CONTENT;

// Helper: destaca palavra-chave no texto com classe ghost-accent
function HighlightedText({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  if (!highlight) return <>{text}</>;

  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="ghost-accent">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

// Componente para renderizar imagem ou vídeo
function MediaItem({
  src,
  alt,
  aspectRatio,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
}) {
  const isVideo = src.endsWith('.mp4') || src.endsWith('.webm');

  if (isVideo) {
    return (
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={`w-full ${aspectRatio} object-cover rounded-lg`}
        aria-label={alt}
      />
    );
  }

  return (
    <div
      className={`relative w-full ${aspectRatio} rounded-lg overflow-hidden`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

export default function AboutOrigin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={containerRef}
      className="relative min-h-[180vh] py-24 md:py-40 overflow-hidden bg-(--ghost-bg)"
      aria-label="Origem Criativa"
    >
      <div className="w-full max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        {/* Section Label */}
        <motion.h2
          variants={motionTokens.fadeGhost}
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-10%' }}
          className="text-sm font-mono uppercase tracking-[0.2em] text-[#4fe6ff] mb-16 font-bold"
        >
          {origin.sectionLabel}
        </motion.h2>

        {/* Conteúdo intercalado: Frase → Imagem → Frase → Imagem */}
        <div className="grid grid-cols-12 md:gap-y-32 gap-y-20 items-center">
          {origin.content.map((item, idx) => {
            const pairIndex = Math.floor(idx / 2);
            const textLayouts = [
              'md:col-span-6 md:col-start-1',
              'md:col-span-5 md:col-start-8 md:text-right',
              'md:col-span-7 md:col-start-1',
              'md:col-span-6 md:col-start-7 md:text-right',
            ];
            const imageLayouts = [
              'md:col-span-6 md:col-start-7',
              'md:col-span-7 md:col-start-1',
              'md:col-span-5 md:col-start-8',
              'md:col-span-6 md:col-start-1',
            ];
            const layoutIndex = pairIndex % textLayouts.length;
            const textLayout = textLayouts[layoutIndex];
            const imageLayout = imageLayouts[layoutIndex];

            if (item.type === 'text') {
              // Bloco de texto
              return (
                <motion.div
                  key={idx}
                  variants={motionTokens.fadeGhost}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView="visible"
                  viewport={{ once: true, margin: '-10%' }}
                  className={`col-span-12 ${textLayout} max-w-[560px]`}
                >
                  <p
                    className={`text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed ${
                      item.isClosing ? 'text-white/70' : 'text-white/90'
                    }`}
                  >
                    <HighlightedText
                      text={item.text}
                      highlight={item.highlight}
                    />
                  </p>
                </motion.div>
              );
            }

            // Bloco de imagem
            return (
              <motion.div
                key={idx}
                variants={motionTokens.imageFloat}
                initial={prefersReducedMotion ? 'visible' : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, margin: '-10%' }}
                className={`col-span-12 ${imageLayout}`}
              >
                <MediaItem
                  src={item.src}
                  alt={item.alt}
                  aspectRatio={item.aspectRatio}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
