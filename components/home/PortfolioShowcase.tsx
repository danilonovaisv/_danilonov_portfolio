'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import heroThumb from '../../docs/HERO.png';
import { HOMEPAGE_CONTENT } from '../../config/homepageContent';

const alignmentHints = [
  { justify: 'justify-center md:justify-end', textAlign: 'text-center md:text-right' },
  { justify: 'justify-center md:justify-center', textAlign: 'text-center md:text-center' },
  { justify: 'justify-center md:justify-start', textAlign: 'text-center md:text-left' },
];

const PortfolioShowcaseSection: React.FC = () => {
  const showcase = HOMEPAGE_CONTENT.portfolioShowcase;

  const buildLabelSegments = (label: string) => {
    const segments = label
      .split(',')
      .map((segment) => segment.trim())
      .filter(Boolean);

    if (segments.length > 1) {
      return segments;
    }

    return label.split(' & ').length > 1
      ? label.split(' & ').map((segment) => segment.trim())
      : [label];
  };

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      className="relative w-full bg-[#f5f5f5] py-24 overflow-hidden"
    >
      <div className="container mx-auto flex flex-col gap-12 px-6 md:px-8 max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.9fr,1.1fr] items-start">
          <div className="space-y-6">
            <div className="space-y-2 text-center md:text-left">
              <p className="text-[0.65rem] uppercase tracking-[0.6em] text-[#777]">
                [ what we love working on ]
              </p>
              <h2
                id="portfolio-title"
                className="text-3xl font-light uppercase tracking-[0.24em] text-[#111111] md:text-4xl lg:text-5xl"
              >
                <span className="text-[#0057FF]">portfólio</span>{' '}
                <span className="text-[#111111]">showcase</span>
              </h2>
            </div>

            <div className="space-y-6 rounded-[32px] border border-[#e0e3ec] bg-white/80 px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
              {showcase.categories.map((category, index) => {
                const alignment =
                  alignmentHints[index % alignmentHints.length];
                const labelSegments = buildLabelSegments(category.label);

                return (
                  <Link
                    key={category.id}
                    href={showcase.finalCtaHref}
                    className={`group flex w-full transition-all duration-300 ease-out border-b border-[#e0e3ec] last:border-b-0 py-6 ${
                      alignment.justify
                    }`}
                    aria-label={`Explorar ${category.label}`}
                  >
                    <div
                      className={`flex w-full flex-wrap items-center gap-6 ${alignment.justify}`}
                    >
                      <div
                        className={`max-w-[320px] ${alignment.textAlign} space-y-1`}
                      >
                        {labelSegments.map((segment, partIndex) => (
                          <span
                            key={`${segment}-${partIndex}`}
                            className="block text-3xl md:text-5xl font-light tracking-tight leading-[1.1] text-[#111111] transition-colors duration-300 group-hover:text-[#0057FF]"
                          >
                            {segment}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0057FF] text-white shadow-lg shadow-[#0057FF]/30 transition-all duration-300 group-hover:-translate-y-1">
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="flex justify-center md:justify-start">
              <Link
                href="#featured-projects"
                className="group inline-flex items-center gap-4 rounded-full bg-[#0057FF] px-10 py-4 text-sm font-semibold uppercase tracking-[0.45em] text-white shadow-xl shadow-[#0057FF]/30 transition-all duration-300 hover:shadow-[#0057FF]/60"
              >
                let&apos;s build something great
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[#0057FF] transition-colors duration-300 group-hover:bg-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[32px] border border-black/10 bg-black shadow-[0_35px_80px_rgba(15,23,42,0.25)]">
              <div className="aspect-[16/9] w-full">
                <Image
                  src={heroThumb}
                  alt="Thumb do manifesto em vídeo"
                  fill
                  priority
                  sizes="(min-width: 1280px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute top-6 left-6 rounded-full border border-white/40 bg-white/20 px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.4em] text-white backdrop-blur-sm">
                manifesto
              </div>
              <div className="absolute bottom-6 right-6 flex items-center gap-3 rounded-full border border-white/50 bg-white/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.5em] text-white backdrop-blur">
                <span>watch now</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#0057FF] shadow-md">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcaseSection;
