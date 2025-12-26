"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { BRAND } from "@/config/brand";

export default function ManifestoThumb() {
  const reducedMotion = usePrefersReducedMotion();

  const [viewportWidth, setViewportWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth < 1024;
  const videoSrc = BRAND.video.manifesto;

  // MOBILE → vídeo full abaixo da Hero
  if (isMobile) {
    return (
      <motion.div
        key="manifesto-thumb-mobile"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-[70vh] bg-black overflow-hidden"
      >
        {/* Fade preto cinematográfico */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 bg-black z-10 pointer-events-none"
        />
        <video
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover"
          aria-label="Manifesto video full"
        />
      </motion.div>
    );
  }

  // DESKTOP → thumb flutuante no canto inferior direito
  return (
    <motion.div
      key="manifesto-thumb-desktop"
      initial={reducedMotion ? false : { opacity: 0, scale: 0.9, y: 20 }}
      whileInView={reducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={!reducedMotion ? { scale: 1.05 } : undefined}
      className="
        group fixed bottom-8 right-8 z-20
        aspect-9/14 w-65
        overflow-hidden
        rounded-xl
        shadow-[0_30px_90px_rgba(0,0,0,0.45)]
        bg-black cursor-pointer
      "
    >
      <video
        src={videoSrc}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="
          h-full w-full object-cover
          transition-transform duration-700 ease-out-expo
          group-hover:scale-105
        "
        aria-label="Manifesto thumbnail"
      />

      {/* Gradiente superior sutil */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
    </motion.div>
  );
}