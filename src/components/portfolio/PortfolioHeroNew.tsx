// =============================================================================
// PortfolioHeroNew - Ghost Era v2.2
// Hero com video loop responsivo, atmosfera Ghost e animações etéreas
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import { PORTFOLIO_CONTENT } from '@/config/content';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useSiteAssetUrl } from '@/contexts/site-assets';
import { SITE_ASSET_KEYS } from '@/config/site-assets';
import AntigravityCTA from '@/components/ui/AntigravityCTA';

export default function PortfolioHeroNew() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const desktopVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.portfolioDesktop,
    PORTFOLIO_CONTENT.hero.video.desktop ?? undefined
  );
  const mobileVideo = useSiteAssetUrl(
    SITE_ASSET_KEYS.heroVideos.portfolioMobile,
    PORTFOLIO_CONTENT.hero.video.mobile ?? undefined
  );

  // Seleciona o vídeo correto baseado no dispositivo
  const videoSrc = isMobile ? mobileVideo : desktopVideo;

  return (
    <section
      id="portfolio-hero"
      aria-label="Portfolio Hero"
      className="relative h-[78vh] md:h-screen w-full overflow-hidden"
    >
      {/* Video Background - Responsivo Desktop/Mobile */}
      <div className="absolute inset-0 z-0">
        <video
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/70 via-transparent to-black/90" />

      {/* Ghost Atmospheric Radial Gradients - Enhanced */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute inset-0 portfolio-hero-glow-primary opacity-60" />
        <div className="absolute inset-0 portfolio-hero-glow-accent opacity-40" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Hero Content - Title & CTA Fixed Bottom - Single Visual Line */}
      <div className="absolute bottom-0 left-0 w-full z-30 pb-10 md:pb-16 px-4 md:px-12">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-end justify-between gap-6 md:gap-12">
          
          {/* Title - "portfólio showcase" */}
          <div className="flex-1 text-center md:text-left">
             <h1
              id="portfolio-hero-heading"
              className="text-4xl sm:text-6xl md:text-8xl tracking-tighter leading-none font-bold"
            >
              <span className="text-[#4fe6ff] mr-3 md:mr-6">
                portfólio
              </span>
              <span className="text-white">showcase</span>
            </h1>
          </div>

          {/* CTA - "vamos trabalhar juntos" - Aligned to bottom baseline */}
          <div className="shrink-0 flex justify-center md:justify-end pb-2">
            <AntigravityCTA
              href="#contact"
              text="vamos trabalhar juntos"
              className="static! transform-none!" // Override default fixed positioning
            />
          </div>
        </div>
      </div>
    </section>
  );
}
