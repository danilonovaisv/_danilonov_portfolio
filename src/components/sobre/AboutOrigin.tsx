'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { ABOUT_CONTENT } from '@/config/content';
import { motionTokens } from './motion';
import { kw } from './keywords';

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
          <span key={i}>{kw(part)}</span>
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[180vh] py-24 md:py-40 bg-(--ghost-bg) overflow-hidden"
      aria-label="Origem Criativa"
    >
      <div className="w-full max-w-[1680px] mx-auto px-6 md:px-24">
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

        {/* Editorial Layout: Alternating rows of Text and Media */}
        <div className="grid grid-cols-12 gap-y-32 md:gap-y-48 items-center">
          {/* Pair 1: Row 1 - Text 7 / Image 5 */}
          <motion.div
            variants={motionTokens.fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="col-span-12 md:col-span-7 order-1"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-(--ghost-text)">
              <HighlightedText
                text={origin.content[0].text || ''}
                highlight={origin.content[0].highlight}
              />
            </p>
          </motion.div>

          <motion.div
            variants={motionTokens.imageFloat}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="col-span-12 md:col-span-5 order-2"
          >
            <MediaItem
              src={origin.content[1].src || ''}
              alt={origin.content[1].alt || ''}
              aspectRatio={origin.content[1].aspectRatio || 'aspect-square'}
            />
          </motion.div>

          {/* Pair 2: Row 2 - Image 5 (left) / Text 7 (right) */}
          <motion.div
            variants={motionTokens.imageFloat}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="col-span-12 md:col-span-5 order-4 md:order-3"
          >
            <MediaItem
              src={origin.content[3].src || ''}
              alt={origin.content[3].alt || ''}
              aspectRatio={origin.content[3].aspectRatio || 'aspect-square'}
            />
          </motion.div>

          <motion.div
            variants={motionTokens.fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="col-span-12 md:col-span-7 md:pl-20 order-3 md:order-4"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-(--ghost-text)">
              <HighlightedText
                text={origin.content[2].text || ''}
                highlight={origin.content[2].highlight}
              />
            </p>
          </motion.div>

          {/* Pair 3: Row 3 - Text 7 (left) / Image 5 (right) - Similar to Row 1 but different prop */}
          <motion.div
            variants={motionTokens.fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="col-span-12 md:col-span-7 order-5"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-(--ghost-text)">
              <HighlightedText
                text={origin.content[4].text || ''}
                highlight={origin.content[4].highlight}
              />
            </p>
          </motion.div>

          <motion.div
            variants={motionTokens.imageFloat}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="col-span-12 md:col-span-5 order-6"
          >
            <MediaItem
              src={origin.content[5].src || ''}
              alt={origin.content[5].alt || ''}
              aspectRatio={origin.content[5].aspectRatio || 'aspect-square'}
            />
          </motion.div>

          {/* Pair 4: Row 4 - Closing text + final image */}
          <motion.div
            variants={motionTokens.imageFloat}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="col-span-12 md:col-span-6 md:col-start-1 order-8 md:order-7"
          >
            <MediaItem
              src={origin.content[7].src || ''}
              alt={origin.content[7].alt || ''}
              aspectRatio={origin.content[7].aspectRatio || 'aspect-square'}
            />
          </motion.div>

          <motion.div
            variants={motionTokens.fadeGhost}
            initial={prefersReducedMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            className="col-span-12 md:col-span-6 md:col-start-7 order-7 md:order-8 md:text-right"
          >
            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-(--ghost-text-secondary)">
              <HighlightedText
                text={origin.content[6].text || ''}
                highlight={origin.content[6].highlight}
              />
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
