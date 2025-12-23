'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import HomeHero from './HomeHero';
import ManifestoThumb from './ManifestoThumb';

const HomeIntro: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* 
     SCROLL ORCHESTRATION 
     Total Height: 250vh
     
     Phase 1: 0% -> 15% 
     - Hero Text fades out
     - Ghost fades out (optional, or stays as ambient)
     
     Phase 2: 0% -> 25% (Overlapping with Phase 1)
     - Manifesto Thumb expands from bottom-right (or specified pos) to Fullscreen
     
     Phase 3: 25% -> 100%
     - Manifesto Video plays in fullscreen
  */

  // Hero Transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.98]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]); // Move up slightly

  // Manifesto Transforms
  // Scale: Starts small (0.25 = 25% of screen height/width approx), grows to 1
  const videoScale = useTransform(scrollYProgress, [0, 0.25], [0.28, 1]);

  // Position (X, Y)
  // We want the thumb to start at Bottom-Right approximately.
  // Since it is centered by 'absolute inset-0 flex center',
  // X > 0 moves Right, Y > 0 moves Down.
  // Let's position it at ~35% Right, ~30% Down relative to center.
  // This places it in the bottom-right quadrant.
  const videoX = useTransform(scrollYProgress, [0, 0.25], ['35%', '0%']);
  const videoY = useTransform(scrollYProgress, [0, 0.25], ['25%', '0%']);

  // Radius: Card (24px) -> Screen (0px)
  const videoRadius = useTransform(scrollYProgress, [0, 0.2], [16, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] w-full bg-[#050505]"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: HomeHero (Background + Text) */}
        {/* We wrap it in a div that handles the "Hero" phase opacity */}
        <div className="absolute inset-0 w-full h-full z-10">
          <HomeHero
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY,
            }}
          >
            {/* Layer 2: Manifesto Thumb (The Expanding Video) passed as child */}
            <ManifestoThumb
              style={{
                scale: videoScale,
                x: videoX,
                y: videoY,
                borderRadius: videoRadius,
              }}
              scrollProgress={scrollYProgress}
            />
          </HomeHero>
        </div>
      </div>
    </section>
  );
};

export default HomeIntro;
