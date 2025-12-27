'use client';

import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import { ASSETS } from '@/lib/constants';

interface ManifestoThumbProps {
    scrollProgress?: MotionValue<number>;
    isMobile?: boolean;
}

export default function ManifestoThumb({
                                           scrollProgress,
                                           isMobile = false,
                                       }: ManifestoThumbProps) {
    /**
     * SCROLL TIMELINE (0 → 1)
     *
     * 0–5%   : Thumb estática
     * 5–25%  : Zoom cinematográfico
     * 25–55% : Morph estrutural
     * 55–75% : Fullpage takeover
     * 75–100: Lock
     */

    const fallbackProgress = useMotionValue(0);
    const progress = scrollProgress ?? fallbackProgress;
    const isControlled = !!scrollProgress && !isMobile;

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

    return (
        <div className="relative h-full w-full flex items-center justify-center">
            <motion.div
                style={
                    isControlled
                        ? { scale, borderRadius, y }
                        : undefined
                }
                className={`
          relative overflow-hidden bg-black shadow-2xl
          ${
                    isControlled
                        ? 'w-screen h-screen'
                        : 'w-full aspect-video rounded-xl border border-white/10'
                }
        `}
            >
                <video
                    src={ASSETS.videoManifesto}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover"
                />

                {/* Vinheta sutil */}
                <div className="absolute inset-0 pointer-events-none bg-black/10" />
            </motion.div>
        </div>
    );
}
