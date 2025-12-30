'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { BRAND } from '@/config/brand';

type ManifestoThumbProps = {
  muted?: boolean;
};

const ManifestoThumb = forwardRef<HTMLVideoElement, ManifestoThumbProps>(
  ({ muted = true }, ref) => {
    return (
      <motion.video
        ref={ref}
        src={BRAND.video.manifesto}
        autoPlay
        muted={muted}
        loop
        playsInline
        className="w-full h-full object-cover"
        style={{
          // Hardware acceleration
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
      />
    );
  }
);

ManifestoThumb.displayName = 'ManifestoThumb';

export default ManifestoThumb;
