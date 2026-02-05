'use client';

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseOriginAnimationsProps {
  isClient: boolean;
  archRef: RefObject<HTMLDivElement | null>;
  archRightRef: RefObject<HTMLDivElement | null>;
  contentCount: number;
}

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
      const blocks = archEl.querySelectorAll('[data-origin-block]');
      const images = archRightEl.querySelectorAll('.origin-img');
      const maskOverlays = archRightEl.querySelectorAll('.origin-mask');

      if (blocks.length === 0 || images.length === 0) return;

      gsap.set(images, {
        clipPath: 'inset(100% 0% 0% 0%)',
        opacity: 0.85,
        filter: 'blur(4px)',
      });
      gsap.set(images[0], {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        filter: 'blur(0px)',
      });

      gsap.set(maskOverlays, { scaleY: 1, transformOrigin: 'top center' });
      gsap.set(maskOverlays[0], { scaleY: 0 });

      blocks.forEach((block, index) => {
        ScrollTrigger.create({
          trigger: block,
          start: 'top center',
          onEnter: () => revealImage(index, 'down'),
          onEnterBack: () => revealImage(index, 'up'),
        });
      });

      function revealImage(activeIndex: number, direction: 'up' | 'down') {
        const duration = 0.8;
        const ease = 'power3.inOut';

        images.forEach((img, i) => {
          const isActive = i === activeIndex;
          gsap.to(img, {
            clipPath: isActive ? 'inset(0% 0% 0% 0%)' : (i < activeIndex ? 'inset(0% 0% 0% 0%)' : (direction === 'down' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)')),
            opacity: isActive ? 1 : 0.85,
            filter: isActive ? 'blur(0px)' : 'blur(4px)',
            duration,
            ease,
          });
        });

        maskOverlays.forEach((mask, i) => {
          gsap.to(mask, {
            scaleY: i <= activeIndex ? 0 : 1,
            duration,
            ease,
          });
        });
      }

      // Sync Exit: Lock gallery exit to the last text block's scroll
      const lastBlock = blocks[blocks.length - 1];
      if (lastBlock) {
        gsap.to(archRightEl, {
          opacity: 0,
          y: -100, // Float up with the text
          scrollTrigger: {
            trigger: lastBlock,
            start: 'center center', // Start fading when text is centered
            end: 'bottom top', // Finish when text leaves viewport
            scrub: true,
          },
        });
      }

      gsap.from(archRightEl, {
        opacity: 0,
        y: 60,
        scale: 0.95,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: archEl,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to(archRightEl, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: archEl,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, archEl);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isClient, archRef, archRightRef, contentCount]);
}
