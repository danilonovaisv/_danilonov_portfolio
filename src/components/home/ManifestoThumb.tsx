// src/components/home/ManifestoThumb.tsx
'use client';

import { motion, useTransform, MotionValue, useMotionValue } from 'motion/react';
import { ASSETS } from '@/lib/constants';

interface ManifestoThumbProps {
  scrollProgress?: MotionValue<number>;
  isMobile?: boolean; // Generic flag if we want conditional logic inside
}

export default function ManifestoThumb({ scrollProgress }: ManifestoThumbProps) {
  // --- ANIMATION CONFIGURATION ---
  // Based on Technical Report:
  // Phase 0 (0-5%): Static (scale 0.58)
  // Phase 1 (5-25%): Zoom Start (scale -> 0.75)
  // Phase 2 (25-55%): Structural Transition (scale -> 1, width -> 100vw)
  // Phase 3 (55-75%): Fullpage Takeover (borderRadius -> 0)

  // Note: We use a fallback MotionValue (0) if none provided (e.g., standard render or mobile without scroll)
  // To simulate "Video Thumb" behavior on mobile without external scroll, we might default to a static 1 or 0 state.
  // Current HomeHero logic for mobile renders this as a static component at the bottom.

  // Default values for cases without scroll control (Mobile Static)
  // If scrollProgress is missing, we render a static "card" look (Progress = 0)

  // TRANSFORMATIONS
  // Input Range: [0, 0.05, 0.25, 0.55, 0.75, 1]

  // Scale Map
  // 0-5%: 0.58
  // 25%: 0.75
  // 55%: 1 (Full width effectively)
  // 100%: 1

  // Border Radius Map
  // 0-25%: 24px
  // 55%: 6px
  // 75%: 0px

  // Y Offset Map (Optional "slight negative")
  // 55-75%: 0 -> -2vh?

  const defaultProgress = useMotionValue(0);
  const progress = scrollProgress || defaultProgress;

  const scale = useTransform(
    progress,
    [0, 0.05, 0.25, 0.55, 1],
    [0.58, 0.58, 0.75, 1, 1]
  );

  const borderRadius = useTransform(
    progress,
    [0, 0.25, 0.55, 0.75],
    [24, 24, 6, 0]
  );

  const y = useTransform(
    progress,
    [0.55, 0.75],
    ['0%', '-2%']
  );

  // If isMobile (and no scrollControl passed), we might want a different static style or just standard block.
  // The current Mobile implementation in HomeHero uses this component.
  // If scrollProgress IS provided, we assume it's driving the animation.

  // Fallback style for when scrollProgress is NOT provided (e.g. current Mobile static thumb)
  // We want it to look like a normal card.
  const isControlled = !!scrollProgress;

  return (
    <div className="relative h-full w-full flex items-center justify-center">
      <motion.div
        style={
          isControlled
            ? {
              scale,
              borderRadius,
              y,
            }
            : undefined // Standard static rendering if not controlled
        }
        className={`
          relative overflow-hidden shadow-2xl bg-black
          ${!isControlled ? 'w-full aspect-video rounded-xl border border-white/10' : 'w-screen h-screen'}
        `}
      // Note: For controlled desktop, we want base w-screen h-screen to allow scaling DOWN to 0.58.
      // If we scaled UP from a small card, resolution might be an issue if not 100vw from start.
      // Spec says: "Video fullpage ... 100% viewport".
      // Best approach: "Start as full screen element, Scale DOWN to look like thumb".
      // Scale 0.58 of 100vw ~ 58vw. Matches "56-62vw".  :)
      >
        <video
          src={ASSETS.videoManifesto}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster={ASSETS.videoManifesto} // Optional poster if asset exists or just video
        />

        {/* Optional Overlay/Noise/Vignette that fades out? */}
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      </motion.div>
    </div>
  );
}
