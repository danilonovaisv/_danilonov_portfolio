'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Image from 'next/image';
import '@/styles/about-origin.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    id: 'permanence',
    title: 'O QUE PERMANECE',
    text: `Desde cedo, sempre prestei atenção no que ficava —
não só no que aparecia.

Enquanto muitos olhavam para o brilho imediato,
eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo.
A essência das coisas sempre falou mais alto do que a superfície.`,
    img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp',
    alt: 'O que permanece - essência que sobrevive ao tempo',
    textAlign: 'right' as const,
  },
  {
    id: 'intention',
    title: 'DO TRAÇO À INTENÇÃO',
    text: `Rabiscos viraram ideias.
Ideias viraram projetos.
E os projetos começaram a deixar rastros.

Meu processo criativo nasceu do improviso, do lápis na margem do caderno.
Aos poucos, aquilo que era instinto virou direção.
Com cada tentativa, aprendi a dar forma ao invisível —
até que os conceitos começaram a falar por si.`,
    img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp',
    alt: 'Do traço à intenção - processo criativo',
    textAlign: 'left' as const,
  },
  {
    id: 'invisible',
    title: 'A DESCOBERTA DO INVISÍVEL',
    text: `Foi ali que entendi:
design não é enfeite.
É ferramenta invisível de transformação.

Por trás de cada escolha visual, existe intenção.
Descobri que o design verdadeiro não grita — ele conduz.
Ele está presente nos detalhes que ninguém percebe,
mas que todos sentem.
Transformar sem que se perceba a transformação: isso é potência.`,
    img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp',
    alt: 'A descoberta do invisível - design como ferramenta de transformação',
    textAlign: 'right' as const,
  },
  {
    id: 'expansion',
    title: 'EXPANSÃO COM PROPÓSITO',
    text: `Estudei Comunicação, mergulhei no design, no branding
e hoje uso inteligência artificial para expandir o alcance
sem perder a essência humana da criação.

Minha trajetória uniu intuição com método, arte com estratégia.
O futuro pede novas ferramentas — e eu as abracei.
Mas nunca deixei que a tecnologia apagasse o que me move:
a sensibilidade, o olhar atento, a busca pelo significado.`,
    img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp',
    alt: 'Expansão com propósito - união de intuição e método',
    textAlign: 'left' as const,
  },
];

const AboutOrigin = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const handleMobileLayout = useCallback(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const leftItems = leftRef.current?.querySelectorAll('.arch__info');
    const rightItems = rightRef.current?.querySelectorAll('.img-wrapper');

    if (isMobile) {
      leftItems?.forEach((item, i) => {
        (item as HTMLElement).style.order = `${i * 2}`;
      });
      rightItems?.forEach((item, i) => {
        (item as HTMLElement).style.order = `${i * 2 + 1}`;
      });
    } else {
      leftItems?.forEach((item) => {
        (item as HTMLElement).style.order = '';
      });
      rightItems?.forEach((item) => {
        (item as HTMLElement).style.order = '';
      });
    }
  }, []);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const container = containerRef.current;
    if (!container) return;

    // Set z-index for images (reverse order for stacking)
    const imgWrappers = container.querySelectorAll('.img-wrapper');
    imgWrappers.forEach((element, index) => {
      (element as HTMLElement).style.zIndex = String(SECTIONS.length - index);
    });

    // Background colors for transitions
    const bgColors = ['#040013', '#0a001a', '#040013', '#0a001a'];

    // GSAP Animation with Media Query
    ScrollTrigger.matchMedia({
      // Desktop: Pin + Mask Reveal
      '(min-width: 769px)': function () {
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.arch',
            start: 'top top',
            end: 'bottom bottom',
            pin: '.arch__right',
            scrub: 1, // Smooth scrubbing
          },
        });

        const imgs = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');

        // Initial state - exactly like reference
        gsap.set(imgs, {
          clipPath: 'inset(0)',
          objectPosition: '0px 0%',
        });

        imgs.forEach((currentImage, index) => {
          const nextImage = imgs[index + 1];

          if (nextImage) {
            const sectionTimeline = gsap.timeline();

            sectionTimeline
              // Background color transition
              .to(
                'body',
                {
                  backgroundColor: bgColors[index + 1] || bgColors[0],
                  duration: 1.5,
                  ease: 'power2.inOut',
                },
                0
              )
              // Current image mask reveal (slides up)
              .to(
                currentImage,
                {
                  clipPath: 'inset(0px 0px 100%)',
                  objectPosition: '0px 60%',
                  duration: 1.5,
                  ease: 'none',
                },
                0
              )
              // Next image parallax
              .to(
                nextImage,
                {
                  objectPosition: '0px 40%',
                  duration: 1.5,
                  ease: 'none',
                },
                0
              );

            mainTimeline.add(sectionTimeline);
          }
        });
      },

      // Mobile: Parallax effect on images
      '(max-width: 768px)': function () {
        const imgs = gsap.utils.toArray<HTMLImageElement>('.img-wrapper img');

        gsap.set(imgs, {
          objectPosition: '0px 60%',
        });

        imgs.forEach((image, index) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: image,
                start: 'top-=70% top+=50%',
                end: 'bottom+=200% bottom',
                scrub: true,
              },
            })
            .to(image, {
              objectPosition: '0px 30%',
              duration: 5,
              ease: 'none',
            })
            .to(
              'body',
              {
                backgroundColor: bgColors[index] || bgColors[0],
                duration: 1.5,
                ease: 'power2.inOut',
              },
              0
            );
        });
      },
    });

    // Handle mobile layout ordering
    handleMobileLayout();
    window.addEventListener('resize', handleMobileLayout);

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.clearMatchMedia();
      lenisRef.current?.destroy();
      window.removeEventListener('resize', handleMobileLayout);
    };
  }, [handleMobileLayout]);

  return (
    <section className="origem-criativa std-grid py-20" ref={containerRef}>
      <h1 className="text-center text-[40px] md:text-[64px] font-outfit font-extrabold text-[#fcffff] mb-16 md:mb-20">
        Origem
      </h1>

      <div className="spacer h-[20vh] w-full" />

      <div className="arch">
        <div className="arch__left" ref={leftRef}>
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              className="arch__info"
              id={`${section.id}-arch`}
            >
              <div
                className={`content ${section.textAlign === 'right' ? 'text-right' : 'text-left'}`}
              >
                <h2 className="header">{section.title}</h2>
                <p className="desc">
                  {section.text.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < section.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="arch__right" ref={rightRef}>
          {SECTIONS.map((section, index) => (
            <div
              key={section.id}
              className="img-wrapper"
              data-index={SECTIONS.length - index}
            >
              <Image
                src={section.img}
                alt={section.alt}
                fill
                className="object-cover object-center"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 540px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="spacer h-[30vh] w-full" />
    </section>
  );
};

export default AboutOrigin;
