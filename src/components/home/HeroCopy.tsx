import { motion } from 'framer-motion';
import Link from 'next/link';
import { HOME_CONTENT } from '@/config/content';
import { ArrowUpRight } from 'lucide-react';

export default function HeroCopy() {
  const { tag, title, subtitle, cta } = HOME_CONTENT.hero;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="text-ghost-text max-w-3xl mx-auto flex flex-col items-center"
    >
      {/* Tag */}
      <p className="font-mono text-xs uppercase tracking-[0.2em] mb-4 text-ghost-text/70">
        {tag}
      </p>

      {/* Headline */}
      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight mb-6 text-center">
        {title[0]}
        <br />
        {title[1]}
      </h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg mb-10 text-ghost-text/80">
        {subtitle}
      </p>

      {/* CTA Button - Styled as per reference */}
      <Link
        href="/portfolio"
        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-focus-ring text-white text-sm uppercase tracking-wider transition-all duration-200 hover:bg-[#0047cc] hover:scale-105 hover:shadow-[0_4px_12px_rgba(0,0,0,0.2)] motion-reduce:hover:scale-100 motion-reduce:transition-none"
      >
        <span>{cta}</span>
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white text-focus-ring transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  );
}
