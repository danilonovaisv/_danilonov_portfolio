import { motion } from 'framer-motion';
import {
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';

// Video sources - prioritize local, fallback to Supabase
const VIDEO_SOURCES = {
  local: '/assets/thumb-hero.mp4',
  remote:
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
} as const;

// Animation configuration
const ANIMATION_CONFIG = {
  // Play icon animation
  playIcon: {
    initial: { rotate: -45, opacity: 0.7 },
    hover: { rotate: 0, opacity: 1 },
    transition: { duration: 0.4, ease: 'easeOut' },
  },
} as const;

export interface ManifestoThumbHandle {
  setMuted: (_muted: boolean) => void;
}

interface ManifestoThumbProps {
  onClick?: () => void;
}

export const ManifestoThumb = forwardRef<
  ManifestoThumbHandle,
  ManifestoThumbProps
>(({ onClick }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useImperativeHandle(ref, () => ({
    setMuted: (muted: boolean) => {
      if (videoRef.current) {
        videoRef.current.muted = muted;
        setIsMuted(muted);
        if (!muted) {
          videoRef.current.play().catch(() => {
            // Handle potential autoplay block if unmuted manually
          });
        }
      }
    },
  }));

  const handleVideoError = useCallback(() => {
    if (!videoError) {
      setVideoError(true);
    }
  }, [videoError]);

  const videoSrc = videoError ? VIDEO_SOURCES.remote : VIDEO_SOURCES.local;

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-pointer group"
      aria-label="Assistir manifesto em fullscreen"
      role="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        onError={handleVideoError}
        className="w-full h-full object-cover"
        aria-label="Portfolio showreel video"
      />

      {/* Hover overlay with play icon */}
      <div
        className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors duration-300"
        aria-hidden="true"
      >
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm 
                       flex items-center justify-center opacity-0 group-hover:opacity-100 
                       transition-opacity duration-300"
          initial={ANIMATION_CONFIG.playIcon.initial}
          animate={
            isHovered
              ? ANIMATION_CONFIG.playIcon.hover
              : ANIMATION_CONFIG.playIcon.initial
          }
          transition={ANIMATION_CONFIG.playIcon.transition}
        >
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M5 3l14 9-14 9V3z" />
          </svg>
        </motion.div>
      </div>

      {/* Subtle gradient overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none bg-linear-to-t from-black/30 via-transparent to-transparent opacity-60"
        aria-hidden="true"
      />
    </div>
  );
});

ManifestoThumb.displayName = 'ManifestoThumb';

export default ManifestoThumb;
