'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface UseOriginAnimationsProps {
    isClient: boolean;
    archRef: RefObject<HTMLDivElement | null>;
    archRightRef: RefObject<HTMLDivElement | null>;
    contentCount: number;
}

/**
 * Hook that manages scroll-based animations for the Origin section
 * Controls image transitions as user scrolls through content blocks
 */
export function useOriginAnimations({
    isClient,
    archRef,
    archRightRef,
    contentCount,
}: UseOriginAnimationsProps) {
    useEffect(() => {
        if (!isClient) return;

        const archEl = archRef.current;
        const archRightEl = archRightRef.current;

        if (!archEl || !archRightEl) return;

        const ctx = gsap.context(() => {
            // Get all content blocks and images
            const blocks = archEl.querySelectorAll('[data-origin-block]');
            const images = archRightEl.querySelectorAll('.origin-img');

            if (blocks.length === 0 || images.length === 0) return;

            // Create scroll triggers for each block
            blocks.forEach((block, index) => {
                ScrollTrigger.create({
                    trigger: block,
                    start: 'top center',
                    end: 'bottom center',
                    onEnter: () => updateActiveImage(index),
                    onEnterBack: () => updateActiveImage(index),
                });
            });

            function updateActiveImage(activeIndex: number) {
                images.forEach((img, i) => {
                    gsap.to(img, {
                        opacity: i === activeIndex ? 1 : 0,
                        duration: 0.5,
                        ease: 'power2.inOut',
                    });
                });
            }

            // Initial fade-in animation for the gallery
            gsap.from(archRightEl, {
                opacity: 0,
                y: 40,
                duration: 1,
                delay: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: archEl,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
            });
        }, archEl);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) => {
                const triggerEl = trigger.vars.trigger;
                if (triggerEl instanceof Element && triggerEl.closest('.arch')) {
                    trigger.kill();
                }
            });
        };
    }, [isClient, archRef, archRightRef, contentCount]);
}
