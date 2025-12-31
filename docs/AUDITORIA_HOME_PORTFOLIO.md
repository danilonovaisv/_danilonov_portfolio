# 🧠 Auditoria + Correções (Prompts Atômicos) — HOME + PORTFOLIO 'use client';

// ============================================================================
// src/components/header/types.ts
// Tipos públicos do sistema de Header (mantendo a API descrita na especificação)
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteHeaderProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string]; // gradiente principal para mobile
  accentColor: string;
  disableWebGL?: boolean;
  reducedMotion?: boolean;
}

export interface DesktopFluidHeaderProps {
  navItems: NavItem[];
  height?: number;
  onNavigate: (href: string) => void;
  glass: {
    ior: number;
    thickness: number;
    chromaticAberration: number;
    anisotropy: number;
    smoothness: number;
    maxTranslateX?: number;
    followDamping?: number; // mapeia para motion.glassDamping
  };
}

export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string];
  accentColor: string;
  isOpen: boolean; // controlado pelo SiteHeader
  isFixed?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  staggerDelay?: number; // mapeia para motion.staggerDelay
}

// ============================================================================
// src/components/header/headerTokens.ts
// Tokens de layout, cor e motion específicos do Header
// ============================================================================

export const headerColors = {
  primary: '#0048ff',
  background: '#0d003b',
  text: '#fcffff',
  textInverse: '#0e0e0e',
  accent: '#4fe6ff',
};

export const headerZ = {
  heroContent: 20,
  header: 40,
};

export const glassMotionTokens = {
  maxTranslateX: 48, // dentro do range 40–60px sugerido
  scaleX: [1, 1.05],
  scaleY: [1, 1.02],
  followDamping: 0.12,
};

export const mobileMenuMotionTokens = {
  overlayDuration: 0.22,
  panelDuration: 0.28,
  itemDuration: 0.22,
  itemInitialY: 16,
};

// ============================================================================
// src/components/header/DesktopFluidHeader.tsx
// Header desktop com efeito “fluid glass” seguindo o cursor no eixo X
// ============================================================================

'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { DesktopFluidHeaderProps, NavItem } from './types';
import { glassMotionTokens, headerColors } from './headerTokens';

interface DesktopFluidHeaderInternalProps extends DesktopFluidHeaderProps {
  logoUrl: string;
}

export function DesktopFluidHeader({
  navItems,
  height = 64,
  onNavigate,
  glass,
  logoUrl,
}: DesktopFluidHeaderInternalProps) {
  const prefersReducedMotion = useReducedMotion();

  const maxTranslateX = glass.maxTranslateX ?? glassMotionTokens.maxTranslateX;
  const followDamping = glass.followDamping ?? glassMotionTokens.followDamping;

  const x = useMotionValue(0);
  const springX = useSpring(x, {
    damping: 40 * followDamping,
    stiffness: 220,
    mass: 0.6,
  });

  const scaleX = useTransform(
    springX,
    [-maxTranslateX, 0, maxTranslateX],
    [glassMotionTokens.scaleX[0], 1, glassMotionTokens.scaleX[1]],
  );
  const scaleY = useTransform(
    springX,
    [-maxTranslateX, 0, maxTranslateX],
    [glassMotionTokens.scaleY[0], 1, glassMotionTokens.scaleY[1]],
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const deltaX = event.clientX - centerX;
    const clamped = Math.max(-maxTranslateX, Math.min(maxTranslateX, deltaX * 0.2));
    x.set(clamped);
  };

  const handleMouseLeave = () => {
    x.set(0);
  };

  const handleClick = (item: NavItem, event: React.MouseEvent) => {
    event.preventDefault();
    onNavigate(item.href);
  };

  return (
    <motion.nav
      aria-label="Navegação principal"
      className="pointer-events-auto max-w-5xl w-[min(960px,calc(100%-2.5rem))] rounded-full border border-white/12 bg-white/5
                 shadow-[0_0_40px_rgba(0,72,255,0.45)] backdrop-blur-xl px-5 py-3 flex items-center justify-between
                 text-sm font-medium text-white/90"
      style={!prefersReducedMotion ? { x: springX, scaleX, scaleY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Logo / Marca */}
      <Link href="/" aria-label="Ir para a página inicial" className="flex items-center gap-2">
        {/* Se desejar usar next/image, trocar por <Image> */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoUrl}
          alt="Danilo Novais — Portfólio"
          className="h-6 w-auto"
        />
        <span className="text-[15px] tracking-tight font-semibold text-white">
          danilo
        </span>
      </Link>

      {/* Navegação principal */}
      <ul className="flex items-center gap-6 text-[15px] tracking-tight">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={(e) => handleClick(item, e)}
              className="relative inline-flex items-center gap-1 text-white/80 transition-colors duration-150
                         hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                         focus-visible:ring-offset-transparent focus-visible:ring-[rgba(79,230,255,0.6)]"
            >
              <span>{item.label}</span>
              <span className="sr-only"> — ir para {item.label}</span>
              <span
                className="pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-[rgba(79,230,255,0.8)]
                           transition-transform duration-150 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

// ============================================================================
// src/components/header/MobileStaggeredMenu.tsx
// Header mobile com overlay em cascata (staggered menu)
// ============================================================================

'use client';

import * as React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { MobileStaggeredMenuProps, NavItem } from './types';
import { headerColors, mobileMenuMotionTokens } from './headerTokens';

export function MobileStaggeredMenu({
  navItems,
  logoUrl,
  gradient,
  accentColor,
  isOpen,
  isFixed = true,
  onOpen,
  onClose,
  staggerDelay = 0.08,
}: MobileStaggeredMenuProps) {
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (!isFixed) return;
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen, isFixed]);

  const handleNavigate = (href: string) => {
    if (onClose) onClose();

    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const menuItemsVariants = {
    open: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: staggerDelay, delayChildren: 0.12 },
    },
    closed: {
      transition: prefersReducedMotion
        ? { staggerChildren: 0 }
        : { staggerChildren: staggerDelay / 2, staggerDirection: -1 },
    },
  };

  const menuItemVariants = {
    open: {
      opacity: 1,
      y: 0,
    },
    closed: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : mobileMenuMotionTokens.itemInitialY,
    },
  };

  return (
    <>
      {/* Barra superior */}
      <header
        className={`${
          isFixed ? 'fixed' : 'relative'
        } top-0 inset-x-0 z-[40] flex items-center justify-between px-4 py-3
                    bg-[rgba(6,7,31,0.92)] backdrop-blur-md border-b border-white/10`}
      >
        <Link href="/" aria-label="Ir para a página inicial" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt="Danilo Novais — Portfólio" className="h-6 w-auto" />
          <span className="text-[15px] font-semibold tracking-tight text-white">danilo</span>
        </Link>

        <button
          type="button"
          onClick={isOpen ? onClose : onOpen}
          className="relative z-[41] inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20
                     bg-black/40 text-white focus-visible:outline-none focus-visible:ring-2
                     focus-visible:ring-[rgba(79,230,255,0.7)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isOpen}
        >
          <span className="sr-only">{isOpen ? 'Fechar menu' : 'Abrir menu'}</span>
          {/* Ícone hambúrguer / X simples, respeitando motion reduzido */}
          <div className="relative h-4 w-4">
            <span
              className={`absolute left-0 right-0 h-0.5 bg-white transition-transform duration-200 ${
                isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-[3px]'
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-0.5 bg-white transition-opacity duration-150 ${
                isOpen ? 'opacity-0' : 'top-1/2 -translate-y-1/2 opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 right-0 h-0.5 bg-white transition-transform duration-200 ${
                isOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-[3px]'
              }`}
            />
          </div>
        </button>
      </header>

      {/* Overlay + painel lateral */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay clicável */}
            <motion.div
              className="fixed inset-0 z-[39] bg-black/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : mobileMenuMotionTokens.overlayDuration,
              }}
              onClick={onClose}
            />

            {/* Painel lateral */}
            <motion.aside
              className="fixed inset-y-0 right-0 z-[40] w-full max-w-sm bg-gradient-to-b from-[rgba(6,7,31,0.98)] to-[rgba(13,0,59,0.96)]
                         border-l border-white/10 px-6 pt-20 pb-10 flex flex-col justify-between"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: prefersReducedMotion ? 'tween' : 'spring',
                stiffness: 260,
                damping: 30,
                duration: prefersReducedMotion ? 0.2 : mobileMenuMotionTokens.panelDuration,
              }}
            >
              <motion.ul
                variants={menuItemsVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="space-y-4 text-2xl font-medium text-white"
              >
                {navItems.map((item) => (
                  <motion.li key={item.href} variants={menuItemVariants}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-2"
                        onClick={() => {
                          if (onClose) onClose();
                        }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        className="block py-2"
                        onClick={(e) => {
                          if (item.href.startsWith('#')) {
                            e.preventDefault();
                            handleNavigate(item.href);
                          }
                        }}
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Seção secundária opcional — redes sociais, etc. */}
              <div className="mt-8 space-y-3 text-sm text-white/70">
                <p className="font-normal">
                  Portfólio institucional de <span className="font-medium">Danilo Novais</span>.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] text-[rgba(79,230,255,0.9)]"
                  onClick={() => {
                    handleNavigate('#contact');
                  }}
                >
                  contato
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ============================================================================
// src/components/header/SiteHeader.tsx
// Orquestrador: decide entre DesktopFluidHeader e MobileStaggeredMenu
// ============================================================================

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useReducedMotion } from 'framer-motion';
import { DesktopFluidHeader } from './DesktopFluidHeader';
import { MobileStaggeredMenu } from './MobileStaggeredMenu';
import { headerColors, headerZ } from './headerTokens';
import type { NavItem, SiteHeaderProps } from './types';

// Valores padrão coerentes com o documento
const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'home', href: '#hero' },
  { label: 'sobre', href: '/sobre' },
  { label: 'portfólio showcase', href: '#portfolio-showcase' },
  { label: 'contato', href: '#contact' },
];

const DEFAULT_LOGO_URL =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg';

const DEFAULT_GRADIENT: [string, string] = ['#020617', '#0d003b'];

const DEFAULT_ACCENT_COLOR = headerColors.accent;

// Permite uso flexível: se nada for passado, aplica defaults
type SiteHeaderComponentProps = Partial<SiteHeaderProps>;

export function SiteHeader({
  navItems = DEFAULT_NAV_ITEMS,
  logoUrl = DEFAULT_LOGO_URL,
  gradient = DEFAULT_GRADIENT,
  accentColor = DEFAULT_ACCENT_COLOR,
  disableWebGL,
  reducedMotion,
}: SiteHeaderComponentProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const effectiveReducedMotion = reducedMotion ?? prefersReducedMotion;

  const handleNavigate = (href: string) => {
    if (href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    router.push(href);
  };

  return (
    <>
      {/* Wrapper do header respeitando proporção/margem com a Hero */}
      <div
        className="pointer-events-none fixed inset-x-0 top-4 z-[40] flex justify-center"
        style={{ zIndex: headerZ.header }}
      >
        {/* Desktop */}
        <div className="hidden md:flex">
          <DesktopFluidHeader
            navItems={navItems}
            height={64}
            onNavigate={handleNavigate}
            glass={{
              ior: 1.1,
              thickness: 0.3,
              chromaticAberration: 0.2,
              anisotropy: 0.4,
              smoothness: 0.9,
              maxTranslateX: 48,
              followDamping: glassMotionTokens.followDamping,
            }}
            logoUrl={logoUrl}
          />
        </div>

        {/* Mobile / Tablet */}
        <div className="flex w-full md:hidden">
          <MobileStaggeredMenu
            navItems={navItems}
            logoUrl={logoUrl}
            gradient={gradient}
            accentColor={accentColor}
            isOpen={isMobileMenuOpen}
            isFixed
            onOpen={() => setIsMobileMenuOpen(true)}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </div>
    </>
  );
}

// ============================================================================
// src/components/home/HeroPreloader.tsx
// Preloader Ghost Loader — z-50, com respeito a prefers-reduced-motion
// ============================================================================

'use client';

import { motion, useReducedMotion } from 'framer-motion';

export function HeroPreloader() {
  const prefersReducedMotion = useReducedMotion();

  const baseTransition = {
    delay: prefersReducedMotion ? 0 : 1.5,
    duration: prefersReducedMotion ? 0.3 : 1,
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={baseTransition}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#050509] to-[#111827]"
    >
      <motion.svg
        className="mb-4"
        height="80"
        width="80"
        viewBox="0 0 512 512"
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { y: 0 }}
        animate={prefersReducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <path
          fill="white"
          d="M508.3 432.8s-46.6-39-79.5-275.8C420 69.3 346 0 256 0S92 69.3 83.2 157C50.3 393.7 3.7 432.8 3.7 432.8-11.4 458 24.4 461 42.4 460.7c35.3-.5 35.3 40.3 70.5 40.3s35.3-35.3 70.5-35.3 37.4 45.3 72.7 45.3 37.4-45.3 72.7-45.3 35.3 35.3 70.5 35.3 35.3-40.8 70.6-40.3c18 0.3 53.8-2.8 38.7-27.9z"
        />
      </motion.svg>

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#e0e0e0] mb-3">
        Summoning spirits
      </p>

      <div className="w-24 h-0.5 bg-[#06071f] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: prefersReducedMotion ? 0.6 : 2 }}
        />
      </div>
    </motion.div>
  );
}

// ============================================================================
// src/components/home/HeroCopy.tsx
// Texto editorial estático da Hero (sem motion próprio)
// ============================================================================

export function HeroCopy() {
  return (
    <div className="text-[#d9dade] max-w-3xl mx-auto text-center px-4">
      <p className="font-mono text-[11px] md:text-xs uppercase tracking-[0.3em] mb-4 text-[#4fe6ff]">
        [BRAND AWARENESS]
      </p>
      <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl leading-tight mb-4 text-white">
        Você não vê o design.
        <br />
        Mas ele vê você.
      </h1>
      <p className="text-sm md:text-base text-[#9ca3af] mb-8">
        Estratégia, identidade e experiências digitais que se escondem aos olhos, mas não à
        percepção.
      </p>

      <a
        href="/sobre"
        className="inline-flex items-center gap-2 rounded-full border border-[#4fe6ff] px-5 py-2.5 text-[11px]
                   font-semibold uppercase tracking-[0.22em] text-[#d9dade] transition-colors duration-300
                   hover:bg-[#4fe6ff] hover:text-[#06071f] focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-[#4fe6ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#06071f]"
        aria-label="Step inside — conhecer mais sobre Danilo"
      >
        step inside
        <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

// ============================================================================
// src/components/home/ManifestoThumb.tsx
// Thumb do vídeo manifesto (desktop) com microinterações
// ============================================================================

'use client';

import { motion } from 'framer-motion';

const MANIFESTO_VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

export function ManifestoThumb() {
  return (
    <motion.video
      src={MANIFESTO_VIDEO_SRC}
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover cursor-pointer"
      initial={{ opacity: 0, scale: 0.92, y: 60 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.05 }}
    />
  );
}

// ============================================================================
// src/components/home/ManifestoSection.tsx
// Versão mobile do manifesto — seção independente logo abaixo da Hero
// ============================================================================

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function ManifestoSection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block md:hidden w-full bg-[#06071f] aspect-video flex items-center justify-center"
    >
      <video
        src={MANIFESTO_VIDEO_SRC}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.section>
  );
}

// ============================================================================
// src/components/canvas/home/GhostCanvas.tsx
// WebGL atmosférico Ghost (React Three Fiber) — camada sensorial
// ============================================================================

'use client';

import * as React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { Color, InstancedMesh, Matrix4, Object3D, Vector3 } from 'three';

interface GhostCanvasProps {
  reducedMotion?: boolean;
}

const GHOST_PRIMARY = '#0057FF';
const GHOST_ACCENT = '#4fe6ff';

function Ghost({ reducedMotion }: { reducedMotion?: boolean }) {
  const mesh = React.useRef<THREE.Mesh>(null!);
  const target = React.useRef(new Vector3(0, 0, 0));
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!mesh.current) return;

    const t = state.clock.getElapsedTime();

    if (!reducedMotion) {
      // Segue o cursor suavemente
      target.current.set(state.mouse.x * 1.8, state.mouse.y * 1.1, 0);
      mesh.current.position.lerp(target.current, 0.08);
      mesh.current.position.y += Math.sin(t * 0.8) * 0.004;
    }

    const material = mesh.current.material as THREE.MeshStandardMaterial;
    material.emissiveIntensity = 1.2 + Math.sin(t * 0.8) * 0.2;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.7, 48, 48]} />
      <meshStandardMaterial
        color={GHOST_PRIMARY}
        emissive={new Color(GHOST_PRIMARY)}
        emissiveIntensity={1.4}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}

function Particles({ count = 120, reducedMotion }: { count?: number; reducedMotion?: boolean }) {
  const mesh = React.useRef<InstancedMesh>(null!);
  const dummy = React.useMemo(() => new Object3D(), []);
  const positions = React.useMemo(
    () =>
      new Array(count).fill(0).map(() => [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3,
        (Math.random() - 0.5) * 4,
      ]),
    [count],
  );

  React.useEffect(() => {
    positions.forEach((pos, i) => {
      dummy.position.set(pos[0], pos[1], pos[2]);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [positions, dummy]);

  useFrame((state, delta) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    positions.forEach((pos, i) => {
      const y = pos[1] + Math.sin(t * 0.4 + i) * 0.08;
      dummy.position.set(pos[0], y, pos[2]);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined as any, undefined as any, count]}>
      <sphereGeometry args={[0.02, 8, 8]} />
      <meshBasicMaterial color={GHOST_ACCENT} transparent opacity={0.7} />
    </instancedMesh>
  );
}

function AtmosphereVeil() {
  return (
    <mesh position={[0, 0, -1.5]}>
      <planeGeometry args={[12, 6]} />
      <meshBasicMaterial
        color={new Color('#020617')}
        transparent
        opacity={0.96}
      />
    </mesh>
  );
}

export function GhostCanvas({ reducedMotion }: GhostCanvasProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: false }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <color attach="background" args={['#06071f']} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[4, 6, 4]} intensity={0.7} color={GHOST_PRIMARY} />

      <Ghost reducedMotion={reducedMotion} />
      <Particles reducedMotion={reducedMotion} />
      <AtmosphereVeil />

      {!reducedMotion && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
          <Noise premultiply opacity={0.18} />
          <Vignette eskil={false} offset={0.25} darkness={0.6} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

// ============================================================================
// src/components/home/GhostStage.tsx
// Wrapper da camada WebGL, respeitando prefers-reduced-motion / fallback
// ============================================================================

'use client';

import * as React from 'react';
import { Suspense } from 'react';
import { useReducedMotion } from 'framer-motion';
import { GhostCanvas } from '@/components/canvas/home/GhostCanvas';

interface GhostStageProps {
  reducedMotion?: boolean;
}

export function GhostStage({ reducedMotion }: GhostStageProps) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = reducedMotion ?? prefersReducedMotion;

  if (shouldReduce) {
    // Fallback estático em gradiente radial (sem WebGL)
    return (
      <div className="h-full w-full bg-[radial-gradient(circle_at_top,#1d4ed8_0,#06071f_55%,#020617_100%)]" />
    );
  }

  return (
    <Suspense fallback={null}>
      <GhostCanvas reducedMotion={shouldReduce} />
    </Suspense>
  );
}

// ============================================================================
// src/components/home/HomeHero.tsx
// Orquestrador da Hero — layers e morph do ManifestoThumb com scroll
// ============================================================================

'use client';

import * as React from 'react';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { HeroPreloader } from './HeroPreloader';
import { HeroCopy } from './HeroCopy';
import { ManifestoThumb } from './ManifestoThumb';
import { GhostStage } from './GhostStage';

export function HomeHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Transformações apenas se motion não estiver reduzido
  const scaleVideo = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const posYVideo = useTransform(scrollYProgress, [0, 1], ['50%', '0%']);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['16px', '0px']);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const videoStyle = prefersReducedMotion
    ? undefined
    : {
        scale: scaleVideo,
        y: posYVideo,
        borderRadius,
      };

  const textStyle = prefersReducedMotion
    ? undefined
    : {
        opacity: opacityText,
      };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[200vh] bg-[#06071f] overflow-hidden"
    >
      {/* Preloader acima de tudo */}
      <HeroPreloader />

      {/* WebGL Ghost Atmosphere */}
      <div className="absolute inset-0 z-20">
        <GhostStage reducedMotion={prefersReducedMotion} />
      </div>

      {/* Texto Editorial */}
      <motion.div
        style={textStyle}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      >
        <HeroCopy />
      </motion.div>

      {/* Vídeo Manifesto — Desktop */}
      <motion.div
        style={videoStyle}
        className="absolute bottom-10 right-6 md:right-10 z-30 w-[60vw] sm:w-[45vw] md:w-[30vw] aspect-video
                   overflow-hidden rounded-2xl shadow-[0_18px_60px_rgba(0,0,0,0.8)] hidden md:block"
      >
        <ManifestoThumb />
      </motion.div>
    </section>
  );
}

// ============================================================================
// src/app/page.tsx
// Página Home básica usando SiteHeader + HomeHero (+ManifestoSection mobile)
// ============================================================================

import { SiteHeader } from '@/components/header/SiteHeader';
import { HomeHero } from '@/components/home/HomeHero';
import { ManifestoSection } from '@/components/home/ManifestoSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#06071f] text-white">
      <SiteHeader />
      <HomeHero />
      <ManifestoSection />
      {/* Demais seções (Portfolio Showcase, Featured Projects, Clients, Contact, Footer)
          entram aqui, preservando a hierarquia visual definida no documento. */}
    </main>
  );
}
