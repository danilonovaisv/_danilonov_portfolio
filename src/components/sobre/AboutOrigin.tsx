'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import '@/styles/about-origin.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutOrigin = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      ScrollTrigger.update();
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Set up animation
    const container = containerRef.current;
    if (!container) return;

    // Set z-index for images
    const imgWrappers = container.querySelectorAll('.img-wrapper');
    imgWrappers.forEach((element) => {
      const order = element.getAttribute('data-index');
      if (order !== null) {
        (element as HTMLElement).style.zIndex = order;
      }
    });

    // Mobile layout handler (only handle order)
    function handleMobileLayout() {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const leftItems = gsap.utils.toArray('.arch__left .arch__info');
      const rightItems = gsap.utils.toArray('.arch__right .img-wrapper');

      if (isMobile) {
        // Interleave items using order
        leftItems.forEach((item: any, i: number) => {
          item.style.order = i * 2;
        });
        rightItems.forEach((item: any, i: number) => {
          item.style.order = i * 2 + 1;
        });
      } else {
        // Clear order for desktop
        leftItems.forEach((item: any) => {
          item.style.order = '';
        });
        rightItems.forEach((item: any) => {
          item.style.order = '';
        });
      }
    }

    // Debounce resize for performance
    let resizeTimeout: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleMobileLayout, 100);
    });

    // Run on initial load
    handleMobileLayout();

    const imgs = gsap.utils.toArray('.img-wrapper img');
    // Background colors according to specification: #040013 (bg inicial) → #0a001a (transição scroll)
    const bgColors = ['#040013', '#0a001a', '#040013', '#0a001a'];

    // GSAP Animation with Media Query
    ScrollTrigger.matchMedia({
      '(min-width: 769px)': function () {
        const mainTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: '.arch',
            start: 'top top',
            end: 'bottom bottom',
            pin: '.arch__right',
            scrub: true,
          },
        });

        gsap.set(imgs, {
          clipPath: 'inset(0)',
          objectPosition: '0px 0%',
          filter: 'blur(4px)',
          opacity: 0.85,
        });

        imgs.forEach((_: any, index: number) => {
          const currentImage = imgs[index] as HTMLElement;
          const nextImage = imgs[index + 1] ? imgs[index + 1] : null;

          const sectionTimeline = gsap.timeline();

          if (nextImage) {
            sectionTimeline
              .to(
                'body',
                {
                  backgroundColor: bgColors[index],
                  duration: 1.5,
                  ease: 'power2.inOut',
                },
                0
              )
              .to(
                currentImage,
                {
                  clipPath: 'inset(0px 0px 100%)',
                  objectPosition: '0px 60%',
                  filter: 'blur(0px)',
                  opacity: 1,
                  duration: 1.5,
                  ease: 'none',
                },
                0
              )
              .to(
                nextImage,
                {
                  objectPosition: '0px 40%',
                  filter: 'blur(0px)',
                  opacity: 1,
                  duration: 1.5,
                  ease: 'none',
                },
                0
              );
          }

          mainTimeline.add(sectionTimeline);
        });
      },
      '(max-width: 768px)': function () {
        const mbTimeline = gsap.timeline();
        gsap.set(imgs, {
          objectPosition: '0px 60%',
          filter: 'blur(4px)',
          opacity: 0.85,
        });

        imgs.forEach((image: any, index: number) => {
          const innerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: image,
              start: 'top-=70% top+=50%',
              end: 'bottom+=200% bottom',
              scrub: true,
            },
          });

          innerTimeline
            .to(image, {
              objectPosition: '0px 30%',
              filter: 'blur(0px)',
              opacity: 1,
              duration: 5,
              ease: 'none',
            })
            .to('body', {
              backgroundColor: bgColors[index],
              duration: 1.5,
              ease: 'power2.inOut',
            });

          mbTimeline.add(innerTimeline);
        });
      },
    });

    // Cleanup function
    return () => {
      if (typeof resizeTimeout !== 'undefined') {
        clearTimeout(resizeTimeout);
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="origem-criativa std-grid py-20" ref={containerRef}>
      <h1 className="text-center text-[64px] font-outfit font-800 text-[#fcffff] mb-20">
        Origem
      </h1>

      <div className="spacer h-[30vh] w-full" />

      <div className="arch">
        <div className="arch__left">
          <div className="arch__info" id="permanence-arch">
            <div className="content text-right">
              <h2 className="header font-outfit text-[#0048ff]">
                O QUE PERMANECE
              </h2>
              <p className="desc text-[#fcffff] mt-4 -mb-10">
                Desde cedo, sempre prestei atenção no que ficava —<br />
                não só no que aparecia.
                <br />
                <br />
                Enquanto muitos olhavam para o brilho imediato,
                <br />
                eu era atraído pelos vestígios, pelos detalhes que sobreviviam
                ao tempo.
                <br />A essência das coisas sempre falou mais alto do que a
                superfície.
              </p>
            </div>
          </div>

          <div className="arch__info" id="intention-arch">
            <div className="content text-left">
              <h2 className="header font-outfit text-[#0048ff]">
                DO TRAÇO À INTENÇÃO
              </h2>
              <p className="desc text-[#fcffff] mt-4 -mb-10">
                Rabiscos viraram ideias.
                <br />
                Ideias viraram projetos.
                <br />
                E os projetos começaram a deixar rastros.
                <br />
                <br />
                Meu processo criativo nasceu do improviso, do lápis na margem do
                caderno.
                <br />
                Aos poucos, aquilo que era instinto virou direção.
                <br />
                Com cada tentativa, aprendi a dar forma ao invisível —<br />
                até que os conceitos começaram a falar por si.
              </p>
            </div>
          </div>

          <div className="arch__info" id="invisible-arch">
            <div className="content text-right">
              <h2 className="header font-outfit text-[#0048ff]">
                A DESCOBERTA DO INVISÍVEL
              </h2>
              <p className="desc text-[#fcffff] mt-4 -mb-10">
                Foi ali que entendi:
                <br />
                design não é enfeite.
                <br />
                É ferramenta invisível de transformação.
                <br />
                <br />
                Por trás de cada escolha visual, existe intenção.
                <br />
                Descobri que o design verdadeiro não grita — ele conduz.
                <br />
                Ele está presente nos detalhes que ninguém percebe,
                <br />
                mas que todos sentem.
                <br />
                Transformar sem que se perceba a transformação: isso é potência.
              </p>
            </div>
          </div>

          <div className="arch__info" id="expansion-arch">
            <div className="content text-left">
              <h2 className="header font-outfit text-[#0048ff]">
                EXPANSÃO COM PROPÓSITO
              </h2>
              <p className="desc text-[#fcffff] mt-4 -mb-10">
                Estudei Comunicação, mergulhei no design, no branding
                <br />
                e hoje uso inteligência artificial para expandir o alcance
                <br />
                sem perder a essência humana da criação.
                <br />
                <br />
                Minha trajetória uniu intuição com método, arte com estratégia.
                <br />
                O futuro pede novas ferramentas — e eu as abracei.
                <br />
                Mas nunca deixei que a tecnologia apagasse o que me move:
                <br />a sensibilidade, o olhar atento, a busca pelo significado.
              </p>
            </div>
          </div>
        </div>

        <div className="arch__right">
          <div className="img-wrapper" data-index="4">
            <img
              src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp"
              alt="O que permanece - essência que sobrevive ao tempo"
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          </div>

          <div className="img-wrapper" data-index="3">
            <img
              src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp"
              alt="Do traço à intenção - processo criativo"
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          </div>

          <div className="img-wrapper" data-index="2">
            <img
              src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp"
              alt="A descoberta do invisível - design como ferramenta de transformação"
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          </div>

          <div className="img-wrapper" data-index="1">
            <img
              src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp"
              alt="Expansão com propósito - união de intuição e método"
              className="w-full h-full object-cover object-center rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="spacer h-[30vh] w-full" />
    </section>
  );
};

export default AboutOrigin;
