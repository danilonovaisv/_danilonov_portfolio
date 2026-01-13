'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  Variants,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * AntigravityCTA - High Fidelity Physics-Based Button
 * Updated to match the "Oval Ends" design from the provided images.
 * Implements "Ghost Design" Lo&Behold replica physics and visual style.
 *
 * NOW FEATURING:
 * - 3D Mouse Parallax Tilt
 * - Ultra-bouncy spring physics (480/20)
 * - Neon Atmospheric Glow (Blue/Indigo/Purple)
 * - Seamless Fusion Geometry
 */

type CTAVariant = 'primary' | 'secondary' | 'ghost';
type CTASize = 'sm' | 'md' | 'lg';

interface AntigravityCTAProps {
  href?: string;
  onClick?: () => void;
  label: string;
  variant?: CTAVariant;
  size?: CTASize;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  hideArrow?: boolean;
}

// Physics tuned for "Antigravity" feel (bouncy but controlled)
const springConfig = { type: 'spring' as const, stiffness: 480, damping: 20 };

const variantConfigs: Record<
  CTAVariant,
  {
    pill: string; // Styles for the text container
    icon: string; // Styles for the icon container
    text: string; // Text color/style
    glow: string; // Background glow effect
    fusion: boolean; // Whether to apply the negative margin fusion effect
  }
> = {
  primary: {
    // Lo&Behold Style: Blue filled, fusion effect
    // pill: rounded-3xl (more boxy-round) + rounded-r-none
    pill: 'bg-[#0057ff]/90 backdrop-blur-xl border border-white/10 rounded-3xl rounded-r-none z-10',
    // icon: border-l-[6px] for strong fusion seam
    icon: 'bg-[#0057ff]/95 backdrop-blur-xl rounded-full border-l-[6px] border-[#0057ff]/95 border-r-4 border-b-4 border-white/20 z-20 shadow-2xl',
    text: 'text-white',
    // Atmosphere: Blue -> Indigo -> Purple
    glow: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600',
    fusion: true,
  },
  secondary: {
    // Border style, separated elements (no fusion)
    pill: 'bg-transparent border border-white/20 group-hover:border-white/40 rounded-full',
    icon: 'bg-transparent border border-white/20 group-hover:border-white/40 rounded-full',
    text: 'text-[#0057ff] font-bold',
    glow: 'bg-blue-400/10',
    fusion: false,
  },
  ghost: {
    // Subtle style
    pill: 'bg-transparent border border-white/10 backdrop-blur-sm group-hover:bg-white/5 rounded-full',
    icon: 'bg-transparent border border-white/10 backdrop-blur-sm group-hover:bg-white/5 rounded-full',
    text: 'text-white/80 group-hover:text-white',
    glow: 'bg-white/5',
    fusion: false,
  },
};

const sizeConfigs: Record<
  CTASize,
  {
    height: string;
    padding: string;
    text: string;
    iconWidth: string;
    arrowSize: number;
    iconMargin: string; // Overlap amount
  }
> = {
  sm: {
    height: 'h-[48px]',
    padding: 'px-6',
    text: 'text-sm',
    iconWidth: 'w-[48px]',
    arrowSize: 20,
    iconMargin: '-ml-4',
  },
  md: {
    height: 'h-[58px]',
    padding: 'px-8',
    text: 'text-base',
    iconWidth: 'w-[58px]',
    arrowSize: 24,
    iconMargin: '-ml-5',
  },
  lg: {
    height: 'h-[68px]', // Slightly taller for Lo&Behold match (64->68)
    padding: 'pl-10 pr-8', // Adjusted padding for fusion look
    text: 'text-lg',
    iconWidth: 'w-[68px]',
    arrowSize: 28,
    iconMargin: '-ml-6', // Deep overlap
  },
};

export function AntigravityCTA({
  href,
  onClick,
  label,
  variant = 'primary',
  size = 'md',
  className = '',
  ariaLabel,
  external = false,
  type = 'button',
  disabled = false,
  hideArrow = false,
}: AntigravityCTAProps) {
  const prefersReducedMotion = useReducedMotion();
  const styles = variantConfigs[variant];
  // Fallback to 'lg' size config if size is invalid or custom
  const dimensions = sizeConfigs[size] || sizeConfigs.lg;

  // --- 3D Tilt Logic ---
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [-8, 8]); // Tilt X based on Mouse Y
  const rotateY = useTransform(x, [-50, 50], [-8, 8]); // Tilt Y based on Mouse X

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    x.set((mouseX / width) * 50);
    y.set((mouseY / height) * 50);
  };

  const onHoverStart = () => {
    if (!prefersReducedMotion) {
      document.addEventListener('mousemove', handleMouseMove);
    }
  };

  const onHoverEnd = () => {
    if (!prefersReducedMotion) {
      document.removeEventListener('mousemove', handleMouseMove);
      x.set(0);
      y.set(0);
    }
  };

  // Specific motion variants for the icon
  const iconVariants: Variants = {
    initial: { rotate: -45, x: 0, scale: 1, strokeWidth: 2.5 },
    hover: {
      rotate: 0,
      x: hideArrow ? 0 : 10, // Move icon right on hover
      scale: 1.05,
      strokeWidth: 3.8, // Thicker stroke on hover
      transition: springConfig,
    },
  };

  const content = (
    <>
      {/* 1. GLOW EFFECT (Atmospheric) */}
      <motion.div
        className={cn(
          'absolute inset-0 rounded-3xl blur-3xl pointer-events-none transition-all duration-500',
          'opacity-0 group-hover:opacity-80',
          'scale-[0.85] group-hover:scale-[1.15]',
          variant === 'primary'
            ? 'drop-shadow-none group-hover:drop-shadow-[0_0_40px_rgba(59,130,246,0.9)]'
            : '',
          styles.glow
        )}
      />

      {/* 2. PILL (Text Container) */}
      <div
        className={cn(
          'flex items-center justify-center transition-all duration-300 shadow-2xl',
          dimensions.height,
          dimensions.padding,
          styles.pill,
          styles.text,
          // If not fusion, strict full rounded (e.g. ghost/secondary)
          !styles.fusion && 'rounded-full'
        )}
      >
        <span
          className={cn(
            dimensions.text,
            'font-medium tracking-wide whitespace-nowrap lowercase leading-none'
          )}
        >
          {label}
        </span>
      </div>

      {/* 3. CORE (Icon Container) */}
      {!hideArrow && (
        <motion.div
          className={cn(
            'flex items-center justify-center transition-all duration-300',
            dimensions.height,
            dimensions.iconWidth,
            styles.fusion ? dimensions.iconMargin : 'ml-2', // Apply negative margin only for fusion
            styles.icon,
            styles.text,
            // If not fusion, strict full rounded
            !styles.fusion && 'rounded-full border'
          )}
          variants={iconVariants}
        >
          <ArrowUpRight
            size={dimensions.arrowSize}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.div>
      )}
    </>
  );

  const sharedProps = {
    ref: ref as any, // casting for motion component ref compatibility
    className: cn(
      'relative group inline-flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-4 ring-blue-500/50 z-50',
      disabled && 'opacity-50 pointer-events-none',
      className
    ),
    initial: 'initial',
    whileHover: prefersReducedMotion ? 'initial' : 'hover',
    whileTap: prefersReducedMotion ? 'initial' : 'press',
    animate: 'initial',
    onHoverStart: onHoverStart,
    onHoverEnd: onHoverEnd,
    style: prefersReducedMotion
      ? {}
      : { rotateX, rotateY, x, y, perspective: 1000 },
    'aria-label': ariaLabel || label,
  };

  const hoverEffect = {
    y: -8, // Elevation
    scale: 1.04, // Subtle grow
    transition: springConfig,
  };

  const pressEffect = {
    scale: 0.97,
    transition: { type: 'spring' as const, stiffness: 500, damping: 15 },
  };

  if (href) {
    const isExternal =
      external || href.startsWith('http') || href.startsWith('mailto:');

    if (href.startsWith('/') || href.startsWith('#')) {
      return (
        <motion.div
          {...sharedProps}
          whileHover={prefersReducedMotion ? {} : hoverEffect}
          whileTap={prefersReducedMotion ? {} : pressEffect}
        >
          <Link
            href={href}
            className={cn('flex items-center', dimensions.height)}
          >
            {content}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.a
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...sharedProps}
        whileHover={prefersReducedMotion ? {} : hoverEffect}
        whileTap={prefersReducedMotion ? {} : pressEffect}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...sharedProps}
      whileHover={prefersReducedMotion ? {} : hoverEffect}
      whileTap={prefersReducedMotion ? {} : pressEffect}
    >
      {content}
    </motion.button>
  );
}

export default AntigravityCTA;
