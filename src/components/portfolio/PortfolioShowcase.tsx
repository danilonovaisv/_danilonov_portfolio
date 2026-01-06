'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { HOME_CONTENT } from '@/config/content';
import { CTAButton } from '@/components/ui/CTAButton';
import CategoryStripe, { type CategoryStripeConfig } from './CategoryStripe';

export default function PortfolioShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20% 0px' });

  const categories = HOME_CONTENT.showcase.categories.map((c) => ({
    id: c.id,
    titleDesktop: c.label,
    titleMobile: c.labelMobile || c.label,
    align: c.align as 'start' | 'center' | 'end',
    thumb: c.thumb,
  })) satisfies CategoryStripeConfig[];

  return (
    <section
      ref={sectionRef}
      id="portfolio-showcase"
      aria-label="Portfolio Categories"
      className="relative z-10 bg-ghost-bg py-20 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        {/* Headline Section */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-12 md:mb-16">
          <h2 className="type-display text-white text-center uppercase tracking-tighter">
            portfólio <span className="text-primary italic">showcase</span>
          </h2>
        </div>

        <div className="relative">
          {/* Floating Label (Desktop Only) */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block -translate-y-full">
            <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-accent">
              {HOME_CONTENT.showcase.floatingLabel}
            </span>
          </div>

          {/* Grid of Stripes */}
          <div className="flex flex-col border-t border-white/10">
            {categories.map((category, index) => (
              <CategoryStripe
                key={category.id}
                category={category}
                index={index}
                parentInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="flex justify-center mt-16 md:mt-24">
          <CTAButton href={HOME_CONTENT.showcase.cta.href} variant="primary">
            {HOME_CONTENT.showcase.cta.label}
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
