'use client';
import { useRef } from 'react';
import Image from 'next/image';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ABOUT_CONTENT } from '@/config/content';

gsap.registerPlugin(ScrollTrigger);

export default function OrigemCriativa() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const contentBlocks = ABOUT_CONTENT.origin.blocks;

  useGSAP(
    () => {
      // Setup Z-Index for desktop stacking (reverse order so first is on top)
      const imageWrappers = gsap.utils.toArray<HTMLElement>('.img-wrapper');

      // Initial states
      gsap.set(imageWrappers, {
        zIndex: (i) => imageWrappers.length - i,
        clipPath: 'inset(0% 0% 0% 0%)',
      });

      const imgs = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');

      // Media Query for Desktop/Mobile logic
      const mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        // Desktop Animation
        gsap.set(imgs, {
          objectPosition: '0px 0%',
          filter: 'blur(0px)',
          opacity: 1,
        });

        // Main Timeline pinned to the container
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            pin: rightRef.current,
            scrub: true,
          },
        });

        imgs.forEach((img, index) => {
          const nextImage = imgs[index + 1];
          if (nextImage) {
            const sectionTimeline = gsap.timeline();

            sectionTimeline
              .to(img, {
                clipPath: 'inset(0% 0% 100% 0%)',
                objectPosition: '0px 60%',
                filter: 'blur(4px)',
                opacity: 0.85,
                duration: 1,
                ease: 'none',
              })
              .fromTo(
                nextImage,
                {
                  objectPosition: '0px 40%',
                  filter: 'blur(4px)',
                  opacity: 0.85,
                },
                {
                  objectPosition: '0px 0%',
                  filter: 'blur(0px)',
                  opacity: 1,
                  duration: 1,
                  ease: 'none',
                },
                '<'
              );

            mainTimeline.add(sectionTimeline);
          }
        });
      });

      mm.add('(max-width: 768px)', () => {
        const imgs = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');

        gsap.set(imgs, {
          objectPosition: '50% 50%',
          clipPath: 'inset(0%)',
          filter: 'blur(0px)',
          opacity: 1,
        });

        imgs.forEach((img) => {
          gsap.fromTo(
            img,
            { objectPosition: '50% 60%' },
            {
              objectPosition: '50% 30%',
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="origem-criativa relative w-full" ref={containerRef}>
      <div className="container mx-auto max-w-[1440px] px-4 py-10 md:px-8 md:py-20 text-[#fcffff]">
        <h2 className="pb-16 text-center text-5xl font-extrabold tracking-tighter md:text-[64px] md:pb-24">
          Origem
        </h2>

        <div
          className="arch relative mx-auto flex max-w-[1100px] flex-col justify-between gap-5 md:flex-row md:gap-[60px]"
          ref={triggerRef}
        >
          {/* Left Column: Texts */}
          <div className="arch__left w-full min-w-[300px] flex-col contents md:block!">
            {contentBlocks.map((block, index) => (
              <div
                key={block.id}
                className={`arch__info grid h-auto w-full place-items-center py-10 px-0 md:h-screen md:order-0 md:py-0 ${
                  index === 0
                    ? 'order-0'
                    : index === 1
                      ? 'order-2'
                      : index === 2
                        ? 'order-4'
                        : 'order-6'
                }`}
              >
                <div
                  className={`content w-full max-w-[356px] text-${block.align === 'right' ? 'right' : 'left'}`}
                >
                  <h3 className="mb-6 text-[32px] font-extrabold uppercase leading-[1.1] tracking-tight text-primary md:text-[42px]">
                    {block.title}
                  </h3>
                  <p className="whitespace-pre-line text-[18px] font-normal leading-[1.6] opacity-90 md:text-[20px]">
                    {block.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Images */}
          <div className="arch__right relative w-full flex-col contents md:flex!">
            {contentBlocks.map((block, index) => (
              <div
                key={`img-${block.id}`}
                className={`img-wrapper relative mb-5 h-[360px] w-full overflow-hidden rounded-[16px] md:absolute md:top-1/2 md:mb-0 md:h-[400px] md:-translate-y-1/2 md:rounded-[24px] left-0 ${
                  index === 0
                    ? 'order-1'
                    : index === 1
                      ? 'order-3'
                      : index === 2
                        ? 'order-5'
                        : 'order-7'
                }`}
              >
                <Image
                  src={block.src}
                  alt={block.alt || block.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="spacer h-[20vh] w-full md:h-[30vh]" />
      </div>
    </section>
  );
}
