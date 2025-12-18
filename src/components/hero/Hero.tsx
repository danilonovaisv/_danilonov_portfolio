'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { ASSETS } from '../../lib/constants';

/**
 * HERO (Premium + estável + fiel ao HERO.png)
 *
 * Fixes principais (para evitar “sumir”):
 * - section/wrapper com min-h-[100svh] (altura estável em iOS/Android e desktop)
 * - stacking context previsível via z-index
 *
 * Glass Orb:
 * - Canvas absoluto com background transparente (gl.alpha)
 * - pointer-events: none no overlay do Canvas (não bloqueia links/botões)
 * - eventos de mouse capturados via eventSource do R3F apontando para o wrapper
 * - rotação lenta + follow do mouse + material translúcido com reflexos coloridos
 */

const BG = '#EEEEEE';
const BRAND_BLUE = '#0055FF';
const BRAND_BLUE_DARK = '#0047D6';

type HeroProps = {
  logoSrc?: string;
  previewSrc?: string;
};

export default function Hero({ logoSrc = ASSETS.favicon }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const eventSourceRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
      style={{ backgroundColor: BG }}
    >
      <div ref={eventSourceRef} className="relative min-h-[100svh]">
        {/* 3D Orb overlay (não bloqueia cliques) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
          <HeroOrbCanvas
            eventSourceRef={eventSourceRef}
            reduceMotion={!!reduceMotion}
          />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-6">
          {/* Header removed to avoid duplication with Global Header */}

          <div className="grid flex-1 grid-cols-1 items-center gap-10 pt-32 lg:grid-cols-12 lg:gap-8 lg:pt-40 pb-10">
            {/* Texto (orb passa por cima com translucidez/reflexos) */}
            <div className="lg:col-span-7">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <h1
                  id="hero-title"
                  className="font-sans text-[clamp(3.2rem,6.2vw,7.1rem)] font-extrabold leading-[0.88] tracking-tight text-black"
                >
                  <span style={{ color: BRAND_BLUE }}>Design, </span>
                  <br />
                  não é só
                  <br />
                  estética.
                </h1>

                <p
                  className="mt-5 max-w-xl text-[clamp(1.05rem,1.6vw,1.35rem)] font-medium leading-snug"
                  style={{ color: BRAND_BLUE }}
                >
                  [É intenção, é estratégia, é experiência.]
                </p>

                <div className="mt-10">
                  <Link
                    href="/sobre"
                    className="group inline-flex items-center gap-5 rounded-full px-7 py-3.5 text-base font-semibold text-white shadow-[0_18px_45px_rgba(0,85,255,0.28)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={
                      {
                        backgroundColor: BRAND_BLUE,
                        '--tw-ring-color': BRAND_BLUE_DARK,
                        '--tw-ring-offset-color': BG,
                      } as React.CSSProperties
                    }
                    aria-label="Get to know me better"
                  >
                    <span className="tracking-tight">
                      get to know me better
                    </span>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 transition group-hover:bg-white/25">
                      <ArrowUpRightIcon className="h-5 w-5" />
                    </span>

                    <span className="sr-only">Abrir seção sobre</span>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* UI lateral (fica acima da orb) */}
            <div className="relative z-30 lg:col-span-5">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative ml-auto flex min-h-[420px] w-full max-w-[520px] flex-col items-end justify-between py-6 lg:min-h-[540px]"
              >
                <div className="text-right">
                  <p
                    className="text-lg font-semibold tracking-wide"
                    style={{ color: BRAND_BLUE }}
                  >
                    [ BRAND AWARENESS ]
                  </p>
                </div>

                <div className="relative w-full max-w-[320px]">
                  <div
                    className="absolute -top-6 right-3"
                    style={{ color: BRAND_BLUE }}
                  >
                    <ArrowDownLeftIcon className="h-6 w-6" />
                  </div>

                  <div className="relative overflow-hidden rounded-xl border border-cyan-200/70 bg-cyan-100/50 p-4 shadow-[0_18px_50px_rgba(0,0,0,0.10)] backdrop-blur">
                    <motion.div
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-black"
                    >
                      <video
                        src={ASSETS.videoManifesto}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="pb-8" />
        </div>

        {/* Nav mobile */}
        {/* Mobile Nav removed to use Global Header Mobile Menu */}
      </div>
    </section>
  );
}

function NavLink({
  href,
  active = false,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative text-[18px] font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={
        {
          color: active ? BRAND_BLUE : `${BRAND_BLUE}CC`,
          '--tw-ring-color': BRAND_BLUE,
          '--tw-ring-offset-color': BG,
        } as React.CSSProperties
      }
      aria-current={active ? 'page' : undefined}
    >
      <span className="relative">
        {children}
        <span
          className={[
            'absolute -bottom-1 left-0 h-[2px] w-full rounded transition-opacity',
            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60',
          ].join(' ')}
          style={{ backgroundColor: BRAND_BLUE }}
        />
      </span>
    </Link>
  );
}

function HeroOrbCanvas({
  eventSourceRef,
  reduceMotion,
}: {
  eventSourceRef: React.RefObject<HTMLElement | null>;
  reduceMotion: boolean;
}) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const supportsWebGL = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      return !!(
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      );
    } catch {
      return false;
    }
  }, []);

  if (!mounted || !supportsWebGL) return null;

  return (
    <Canvas
      eventSource={eventSourceRef as any}
      eventPrefix="client"
      dpr={[1, 1.75]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 5.2], fov: 32, near: 0.1, far: 40 }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[7, 6, 3]} intensity={1.5} color="#ffffff" />
      <directionalLight
        position={[-6, -2, 2]}
        intensity={0.5}
        color="#c7d2fe"
      />

      {/* Lightformers coloridos (premium glass reflections) */}
      <Environment resolution={256}>
        <Lightformer
          form="circle"
          intensity={10}
          position={[3.4, 1.2, 2.4]}
          scale={0.9}
          color="#4aa3ff"
        />
        <Lightformer
          form="circle"
          intensity={9}
          position={[-3.2, -0.9, 2.5]}
          scale={1.0}
          color="#b58cff"
        />
        <Lightformer
          form="rect"
          intensity={7}
          position={[0, -2.6, -2.0]}
          scale={[11, 2.3, 1]}
          color="#22d3ee"
        />
        <Lightformer
          form="rect"
          intensity={7}
          position={[0, 3.2, -1.2]}
          scale={[11, 2.5, 1]}
          color="#fb7185"
        />
      </Environment>

      <GlassOrb reduceMotion={reduceMotion} />
    </Canvas>
  );
}

function GlassOrb({ reduceMotion }: { reduceMotion: boolean }) {
  const group = React.useRef<THREE.Group | null>(null);
  const { viewport } = useThree();

  const baseScale = React.useRef(1.55);

  const geom = React.useMemo(
    () => new THREE.TorusKnotGeometry(1, 0.42, 320, 40),
    []
  );
  React.useEffect(() => () => geom.dispose(), [geom]);

  React.useEffect(() => {
    if (!group.current) return;
    const isMobile = viewport.width < 7.2;

    baseScale.current = isMobile ? 1.02 : 1.6;
    // Adjusted initial position to be visible
    group.current.position.set(isMobile ? 0.0 : 0.9, isMobile ? 0.45 : 0.04, 0);
    group.current.scale.setScalar(baseScale.current);
  }, [viewport.width]);

  useFrame((state) => {
    if (!group.current) return;

    const t = state.clock.elapsedTime;
    const spin = reduceMotion ? 0.2 : 0.35;
    const pointer = reduceMotion ? 0.08 : 0.3;

    // Mouse tilt (amplified)
    const targetX = state.pointer.y * 0.8 * pointer;
    const targetY = state.pointer.x * 1.2 * pointer;

    // Slow continuous rotation (time-driven, stable)
    const rotY = t * spin + targetY;
    const rotZ = t * (spin * 0.62) + Math.sin(t * 0.6) * 0.06;

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      targetX,
      0.06
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      rotY,
      0.06
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      rotZ,
      0.06
    );

    // Subtle breathing
    const breathing = baseScale.current * (1 + Math.sin(t * 0.7) * 0.009);
    const s = THREE.MathUtils.lerp(group.current.scale.x, breathing, 0.06);
    group.current.scale.setScalar(s);
  });

  return (
    <group ref={group}>
      {/* Corpo glass */}
      <mesh geometry={geom} castShadow={false} receiveShadow={false}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1.35}
          roughness={0.01}
          ior={1.24}
          chromaticAberration={0.26}
          anisotropy={0.35}
          distortion={0.26}
          distortionScale={0.55}
          temporalDistortion={0.18}
          color="#ffffff"
          attenuationColor="#b9d6ff"
          attenuationDistance={0.22}
          samples={12}
          resolution={768}
        />
      </mesh>

      {/* Rim highlights (iridescent “pop” por cima do texto) */}
      <mesh geometry={geom}>
        <meshPhysicalMaterial
          transparent
          opacity={0.22}
          roughness={0.18}
          metalness={0.0}
          reflectivity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={1}
          iridescenceIOR={1.8}
          iridescenceThicknessRange={[180, 420]}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ArrowUpRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 17L17 7M10 7h7v7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 7L7 17M7 10v7h7"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
