'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CategoryConfig } from './PortfolioShowcaseSection';
import { ArrowIcon } from '../shared/ArrowIcon';

type Alignment = 'start' | 'center' | 'end';

interface AccordionRowProps {
    category: CategoryConfig;
    alignment: Alignment;
    index: number;
    parentInView: boolean;
    prefersReducedMotion: boolean | null;
}

const alignmentClasses: Record<Alignment, string> = {
    start: 'md:justify-start',
    center: 'md:justify-center',
    end: 'md:justify-end',
};

export default function AccordionRow({
    category,
    alignment,
    index,
    parentInView,
    prefersReducedMotion,
}: AccordionRowProps) {
    const delay = index * 0.12;

    return (
        <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
            animate={parentInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
            transition={
                prefersReducedMotion
                    ? undefined
                    : { duration: 0.8, ease: 'easeOut', delay }
            }
        >
            <Link
                href={`/portfolio?category=${category.id}`}
                className={`group flex w-full items-center border-t border-[#0057FF] py-8 text-black transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7] md:py-14 ${alignmentClasses[alignment]}`}
                aria-label={`Ver projetos de ${category.titleDesktop.replace(/\n/g, ' ')}`}
            >
                <div className="flex w-full items-center gap-5 transition-all duration-300 group-hover:gap-10 md:gap-7">
                    {/* Thumbnail Revealer - Desktop Only */}
                    <div className="relative hidden h-40 w-0 overflow-hidden rounded-md bg-black/5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-72 md:block">
                        <Image
                            src={`/thumbnails/${category.id}.jpg`}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 288px, 0px"
                        />
                    </div>

                    {/* Category Title */}
                    <h3 className="text-2xl font-medium md:text-5xl md:leading-none">
                        <span className="hidden whitespace-pre md:inline">
                            {category.titleDesktop}
                        </span>
                        <span className="md:hidden">{category.titleMobile}</span>
                    </h3>

                    {/* Icon Identifier */}
                    <div className="ml-auto shrink-0 rounded-full bg-[#0057FF] p-2.5 text-white md:p-3.5">
                        <ArrowIcon className="-rotate-45 h-4 w-4 transition-transform duration-500 group-hover:rotate-0 md:h-5 md:w-5" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
