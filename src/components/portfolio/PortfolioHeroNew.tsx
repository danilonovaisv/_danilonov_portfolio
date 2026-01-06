// =============================================================================
// PortfolioHeroNew - Ghost Era v2.1
// Hero com video loop responsivo, atmosfera Ghost e animações etéreas
// Conforme especificação: PORTFOLIO - PROTÓTIPO INTERATIVO.md
// =============================================================================

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '@/config/content';
import { BRAND } from '@/config/brand';
import { MOTION_TOKENS } from '@/config/motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

// Motion config - Ghost Era ethereal timing
const ghostEasing = MOTION_TOKENS.easing.ghost;
const slowDuration = MOTION_TOKENS.duration.slow;

export default function PortfolioHeroNew() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Seleciona o vídeo correto baseado no dispositivo
  const videoSrc = isMobile
    ? PORTFOLIO_CONTENT.hero.video.mobile
    : PORTFOLIO_CONTENT.hero.video.desktop;

  const handleCTAClick = () => {
    // Scroll suave para a seção de contato
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="portfolio-hero"
      aria-label="Portfolio Hero"
      className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden"
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
          poster="/images/portfolio-hero-poster.webp"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>

      {/* Main Gradient Overlay - Intenso nas bordas para legibilidade */}
      <div 
        className="absolute inset-0 z-10 bg-linear-to-b from-(--color-ghost-bg)/60 via-transparent to-(--color-ghost-bg)/90" 
      />

      {/* Ghost Atmospheric Radial Gradients - Enhanced */}
      <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
        {/* Primary blue glow - top left */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `radial-gradient(ellipse 60% 50% at 15% 15%, ${BRAND.colors.primary}22, transparent 50%)` 
          }} 
        />
        {/* Accent cyan glow - top right */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `radial-gradient(ellipse 50% 40% at 85% 10%, ${BRAND.colors.accent}18, transparent 45%)` 
          }} 
        />
        {/* Subtle purple accent - mid-left */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: `radial-gradient(circle at 5% 50%, ${BRAND.colors.purpleDetails}10, transparent 30%)` 
          }} 
        />
        {/* Vignette effect - focus attention */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(4, 0, 19, 0.4) 100%)' 
          }} 
        />
      </div>

      {/* Content - Posicionado no rodapé da seção */}
      <div className="relative z-20 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-16 md:pb-24">
        {/* Título principal - "portfólio" em azul primário, "showcase" em branco */}
        <motion.h1
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: slowDuration, ease: ghostEasing }}
          className="text-[clamp(2.5rem,7vw,5rem)] font-bold tracking-[-0.02em] text-white leading-[1.05] mb-6 md:mb-8"
        >
          <span style={{ color: BRAND.colors.primary }}>portfólio</span>{' '}
          <span className="text-white">showcase</span>
        </motion.h1>

        {/* CTA Button - Enhanced glow and ethereal hover */}
        <motion.button
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: slowDuration * 0.8, ease: ghostEasing, delay: 0.3 }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -2 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
          onClick={handleCTAClick}
          className="group inline-flex items-center gap-3 text-white px-7 md:px-8 py-3.5 md:py-4 rounded-full font-medium text-sm md:text-base transition-all duration-500 w-fit"
          style={{ 
            backgroundColor: BRAND.colors.primary,
            boxShadow: `0 0 30px ${BRAND.colors.primary}40, 0 4px 20px ${BRAND.colors.primary}20`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 50px ${BRAND.colors.primary}60, 0 8px 30px ${BRAND.colors.primary}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 0 30px ${BRAND.colors.primary}40, 0 4px 20px ${BRAND.colors.primary}20`;
          }}
        >
          vamos trabalhar juntos
          <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 ease-out group-hover:translate-x-1.5" />
        </motion.button>
      </div>

      {/* Scroll indicator - Ethereal animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: slowDuration }}
        className="absolute bottom-10 right-6 md:right-12 lg:right-16 z-20 flex flex-col items-center gap-3"
        aria-hidden="true"
      >
        <span 
          className="text-[10px] uppercase tracking-[0.35em] font-medium"
          style={{ color: `${BRAND.colors.text}60` }}
        >
          scroll
        </span>
        <motion.div
          animate={prefersReducedMotion ? {} : { 
            y: [0, 10, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2.2, 
            ease: 'easeInOut',
          }}
          className="w-px h-10"
          style={{
            background: `linear-gradient(to bottom, ${BRAND.colors.text}80, transparent)`,
          }}
        />
      </motion.div>
    </section>
  );
}
