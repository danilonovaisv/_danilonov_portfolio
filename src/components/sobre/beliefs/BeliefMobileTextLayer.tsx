import React, { useRef } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BeliefMobileTextLayerProps {
    phrases: string[];
    scrollYProgress: MotionValue<number>;
}

export const BeliefMobileTextLayer: React.FC<BeliefMobileTextLayerProps> = ({ phrases, scrollYProgress }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Animate opacity based on scroll progress specifically for mobile
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity }}
            className="md:hidden fixed bottom-8 left-0 w-full px-6 flex flex-col items-start justify-end pointer-events-none z-30 space-y-4"
        >
            {phrases.map((phrase, index) => (
                <motion.p
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                    className="text-white/90 text-sm font-light leading-snug drop-shadow-md"
                >
                    {phrase}
                </motion.p>
            ))}
        </motion.div>
    );
};
