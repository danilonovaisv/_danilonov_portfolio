"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { BRAND } from "@/config/brand";

export default function ManifestoThumb() {
  const reducedMotion = usePrefersReducedMotion();

  // Detecta a largura da viewport
  const [viewportWidth, setViewportWidth] = useState<number | undefined>(() =>
      typeof window !== "undefined" ? window.innerWidth : undefined
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth !== undefined ? viewportWidth < 1024 : false;
  const enableDesktopMotion = !reducedMotion && !isMobile;
  const enableMobileFade = !reducedMotion && isMobile;

  const motionKey = isMobile ? "manifesto-thumb-mobile" : "manifesto-thumb-desktop";
  const videoSrc = BRAND.video.manifesto;

  // ---------------- MOBILE VERSION (full-width video below Hero) ----------------
  if (isMobile) {
    return (
        <motion.div
            key={motionKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full h-[70vh] bg-black overflow-hidden"
        >
          {/* Overlay de fade preto cinematográfico */}
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

  // ---------------- DESKTOP VERSION (floating thumbnail) ----------------
  return (
      <motion.div
          key={motionKey}
          initial={enableDesktopMotion ? { opacity: 0, scale: 0.9, y: 20 } : false}
          animate={enableDesktopMotion ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={
            enableDesktopMotion
                ? { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
                : { duration: 0 }
          }
          whileHover={!reducedMotion ? { scale: 1.05 } : undefined}
          className="
        group fixed bottom-8 right-8 z-20
        aspect-[9/14] w-[260px]
        overflow-hidden
        rounded-xl
        shadow-[0_30px_90px_rgba(0,0,0,0.45)]
        bg-black
        cursor-pointer
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

        {/* Gradiente superior sutil para profundidade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      </motion.div>
  );
}