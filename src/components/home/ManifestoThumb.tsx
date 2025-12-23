'use client';

import { motion, MotionProps } from 'framer-motion';
import { useRef } from 'react';

interface ManifestoThumbProps extends MotionProps {
  className?: string;
  style?: React.CSSProperties | any; // frame-motion styles
  onClick?: () => void;
}

export default function ManifestoThumb({
  className,
  style,
  onClick,
  ...props
}: ManifestoThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      className={`relative overflow-hidden cursor-pointer ${className || ''}`}
      style={style}
      onClick={onClick}
      aria-label="Assista ao vídeo manifesto"
      {...props}
    >
      <video
        ref={videoRef}
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        muted
        loop
        playsInline
        autoPlay
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
