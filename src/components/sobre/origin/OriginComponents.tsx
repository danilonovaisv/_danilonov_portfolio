'use client';

import { RefObject } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { OriginBlock } from './data';

interface OriginInfoBlockProps {
    block: OriginBlock & { img?: string };
}

/**
 * Individual content block with title, text, and mobile image
 */
export function OriginInfoBlock({ block }: OriginInfoBlockProps) {
    return (
        <div
            className="arch__info min-h-[80vh] lg:min-h-screen flex flex-col lg:flex-row lg:items-end lg:justify-end py-12 lg:py-24"
            data-origin-block={block.id}
        >
            {/* Mobile Image */}
            <div className="mobile-img-container lg:hidden mb-8">
                {block.img && (
                    <Image
                        src={block.img}
                        alt={block.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 0vw"
                        priority={block.id === 1}
                    />
                )}
            </div>

            {/* Text Content */}
            <div className="mobile-text-container lg:p-0 lg:max-w-md">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xl md:text-2xl lg:text-3xl font-['CustomLight'] font-light text-[#4fe6ff] mb-4 lg:mb-6 tracking-wide"
                >
                    {block.title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20%' }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed lg:text-right"
                >
                    {block.paragraph}
                </motion.p>
            </div>
        </div>
    );
}

interface OriginStickyGalleryProps {
    blocks: (OriginBlock & { img?: string })[];
    archRightRef: RefObject<HTMLDivElement | null>;
}

/**
 * Sticky gallery that displays images on desktop
 * Images transition as user scrolls through content blocks
 */
export function OriginStickyGallery({
    blocks,
    archRightRef,
}: OriginStickyGalleryProps) {
    return (
        <div
            className="arch__right hidden lg:flex col-span-6 h-screen sticky top-0"
            ref={archRightRef}
        >
            <div className="relative w-full max-w-lg aspect-3/4">
                {blocks.map((block, index) => (
                    <div
                        key={block.id}
                        className={`img-wrapper origin-img ${index === 0 ? 'origin-img-active' : 'origin-img-hidden'}`}
                        data-img-index={index}
                        data-z-index={blocks.length - index}
                    >
                        {block.img && (
                            <Image
                                src={block.img}
                                alt={block.title}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 33vw, 0vw"
                                priority={index === 0}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
