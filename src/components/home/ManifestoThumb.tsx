// src/components/home/ManifestoThumb.tsx
'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ASSETS } from '@/lib/constants';

// Função auxiliar de tracking (segura para SSR)
function track(event: string, detail?: Record<string, unknown>) {
    if (typeof window === 'undefined') return;
    // window.dispatchEvent(new CustomEvent('portfolio:track', { detail: { event, ...detail } }));
    // console.log removido para passar no linter
}

export default function ManifestoThumb() {
    const reduceMotion = useReducedMotion();
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const rootRef = React.useRef<HTMLElement | null>(null);
    const hasPlayedRef = React.useRef(false);

    React.useEffect(() => {
        const el = rootRef.current;
        const video = videoRef.current;
        if (!el || !video) return;

        const io = new IntersectionObserver(
            async (entries) => {
                const entry = entries[0];
                if (!entry) return;

                if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                    try {
                        if (!hasPlayedRef.current) {
                            await video.play();
                            hasPlayedRef.current = true;
                            track('manifesto_video_auto_play');
                        }
                        // video.muted = false; // Opcional: ativar som ao focar
                    } catch (e) {
                        // console.warn('Autoplay failed', e); // Removido para linter
                        video.muted = true;
                    }
                } else {
                    video.pause();
                }
            },
            { threshold: 0.5 }
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <section
            id="manifesto"
            ref={rootRef}
            aria-label="Manifesto"
            className="flex w-full justify-center bg-[#0E0F12] px-4 py-12 md:px-8"
        >
            <div className="w-full max-w-[1240px]">
                <motion.div
                    initial={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-2xl"
                >
                    <video
                        ref={videoRef}
                        className="h-full w-full object-cover"
                        src={ASSETS.videoManifesto}
                        autoPlay={false} // Controlado via Observer
                        loop
                        muted
                        playsInline
                        controls // Controles nativos úteis para mobile/tablet
                        preload="metadata"
                        aria-label="Manifesto video presentation"
                    />
                </motion.div>
            </div>
        </section>
    );
}