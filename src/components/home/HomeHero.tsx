'use client';

import React from 'react';
import { MotionValue } from 'framer-motion';
import HeroCopy from './HeroCopy';
import GhostStage from './GhostStage';

interface HomeHeroProps {
  style?: {
    opacity: MotionValue<number>;
    scale: MotionValue<number>;
    y: MotionValue<number>;
  };
  children?: React.ReactNode;
}

const HomeHero: React.FC<HomeHeroProps> = ({ style, children }) => {
  return (
    <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden bg-[#06071f]">
      {/* 1. LAYER 0: WebGL Ghost (Atmosphere) -> z-0 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GhostStage />
      </div>

      {/* 2. LAYER 10: Overlay Gradient -> z-10 */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#06071f_60%)] opacity-80" />

      {/* 3. LAYER 20: Content (Text + Video Thumb) -> z-20 */}
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        {/* Text Copy */}
        <div className="relative w-full flex justify-center p-6">
          <HeroCopy style={style} />
        </div>

        {/* Video Thumb (passed as child). 
             It has pointer-events-auto in its own component to allow interaction.
         */}
        <div className="pointer-events-auto absolute inset-0">{children}</div>
      </div>
    </div>
  );
};

export default HomeHero;
