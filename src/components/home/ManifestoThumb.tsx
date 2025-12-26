'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform, Transition } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { BRAND } from '@/config/brand';

interface ManifestoThumbProps {
    heroRef?: RefObject<HTMLElement> | undefined;
}

export default function ManifestoThumb({ heroRef }: ManifestoThumbProps) {
    const reducedMotion = usePrefersReducedMotion();
    const thumbRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [videoReady, setVideoReady] = useState(false);
    const _thumbInView = useInView(thumbRef, { amount: 0.2, once: true }); // Prefixo com _ para indicar que está sendo usado indiretamente

    // Detecta o tamanho da viewport
    const [dimensions, setDimensions] = useState(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : 1280,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    }));

    useEffect(() => {
        const handleResize = () =>
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = dimensions.width < 1024;

    // ==========================================
    // 🎬 SCROLL-DRIVEN ANIMATION (Desktop only)
    // ==========================================
    const { scrollYProgress } = useScroll({
        target: heroRef ?? undefined,
        offset: ['start start', 'end start'],
    });

    // Mapear valores para a transformação do vídeo (sincronizado com o vídeo de referência)
    const scale = useSpring(
        useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 1.8, 3, 5]),
        { stiffness: 100, damping: 20 }
    );

    const x = useSpring(
        useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, -120, -300, -500]),
        { stiffness: 100, damping: 20 }
    );

    const y = useSpring(
        useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [0, -60, -200, -400]),
        { stiffness: 100, damping: 20 }
    );

    const opacity = useSpring(
        useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0]),
        { stiffness: 100, damping: 20 }
    );

    const borderRadius = useSpring(
        useTransform(scrollYProgress, [0, 0.5, 1], [12, 8, 0]),
        { stiffness: 100, damping: 20 }
    );

    // ==========================================
    // 🎨 ANIMATION PROPS
    // ==========================================
    const enableDesktopMotion = !reducedMotion && !isMobile;
    const _showVideo = (_thumbInView || reducedMotion) && (videoReady || reducedMotion); // Prefixo com _ para indicar uso indireto

    // Animação de entrada (fade-in com leve translateY)
    const entryAnimation = reducedMotion
        ? {}
        : {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } as Transition
        };

    const videoSrc = BRAND.video.manifesto;

    const handleThumbClick = () => {
        if (!isMobile && heroRef?.current) {
            const manifestoSection = document.getElementById('manifesto');
            if (manifestoSection) {
                manifestoSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    // ==========================================
    // 📱 MOBILE LAYOUT
    // ==========================================
    if (isMobile) {
        return (
            <motion.div
                key="manifesto-thumb-mobile"
                ref={thumbRef}
                {...(reducedMotion ? {} : {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 0.5 } as Transition
                })}
                className="relative w-full h-[70vh] bg-black overflow-hidden"
            >
                <video
                    ref={videoRef}
                    src={videoSrc}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    onLoadedData={() => setVideoReady(true)}
                    onCanPlay={() => setVideoReady(true)}
                    className="w-full h-full object-cover"
                    aria-label="Manifesto video full"
                />
            </motion.div>
        );
    }

    // ==========================================
    // 🖥️ DESKTOP LAYOUT com SCROLL ANIMATION
    // ==========================================
    return (
        <motion.div
            key="manifesto-thumb-desktop"
            style={{
                position: 'fixed',
                top: 'auto',
                bottom: '40px',
                left: 'auto',
                right: '40px',
                width: '320px',
                height: '180px',
                borderRadius: enableDesktopMotion ? borderRadius : 12,
                scale: enableDesktopMotion ? scale : 1,
                x: enableDesktopMotion ? x : 0,
                y: enableDesktopMotion ? y : 0,
                opacity: enableDesktopMotion ? opacity : 1,
                zIndex: 50,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
            }}
            {...entryAnimation}
            className="overflow-hidden bg-black origin-bottom-right"
        >
            <div
                ref={thumbRef}
                className="w-full h-full relative cursor-pointer"
                onClick={handleThumbClick}
            >
                <video
                    ref={videoRef}
                    src={videoSrc}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    onLoadedData={() => setVideoReady(true)}
                    onCanPlay={() => setVideoReady(true)}
                    className="w-full h-full object-cover"
                    aria-label="Manifesto thumbnail"
                />
                {/* Overlay sutil para melhorar contraste */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            </div>
        </motion.div>
    );
}