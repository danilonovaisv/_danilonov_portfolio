'use client';

import Link from 'next/link';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import * as THREE from 'three';

type HeroProps = {
  className?: string;
  /** CTA principal (botão) */
  ctaHref?: string;
  ctaLabel?: string;

  /**
   * Opcional: URL/Path de um GLB/GLTF do “glass orb”.
   * Ex.: "/medias/torrus.glb" ou uma URL do Supabase Storage.
   *
   * Se não informado, o componente usa um TorusKnot procedural (sem asset externo).
   */
  orbModelUrl?: string;

  /** Label lateral (desktop) */
  sideLabel?: string;

  /** Thumb (desktop) – pode ser um preview do showcase */
  sideThumbHref?: string;
  sideThumbAlt?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function useHeroParallax(enabled: boolean) {
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const x = useSpring(mvX, { stiffness: 220, damping: 26, mass: 0.25 });
  const y = useSpring(mvY, { stiffness: 220, damping: 26, mass: 0.25 });

  function setFromPointer(e: React.PointerEvent<HTMLElement>) {
    if (!enabled) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    const nx = (px - 0.5) * 2; // -1..1
    const ny = (py - 0.5) * 2; // -1..1
    mvX.set(nx);
    mvY.set(ny);
  }

  function reset() {
    mvX.set(0);
    mvY.set(0);
  }

  return { x, y, setFromPointer, reset };
}

type OrbShared = {
  pointerX: React.MutableRefObject<number>;
  pointerY: React.MutableRefObject<number>;
  reduceMotion: boolean;
};

function OrbModelProcedural({ pointerX, pointerY, reduceMotion }: OrbShared) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;

    const t = state.clock.getElapsedTime();
    const px = clamp(pointerX.current, -1, 1);
    const py = clamp(pointerY.current, -1, 1);

    // Em reduce motion: mantém resposta mínima ao mouse e evita “wobble”
    const base = reduceMotion ? 0.16 : 0.32;
    const wobble = reduceMotion ? 0 : Math.sin(t * 0.55) * 0.08;

    const targetX = base + wobble + py * (reduceMotion ? 0.12 : 0.28);
    const targetY = base + px * (reduceMotion ? 0.14 : 0.34);

    mesh.rotation.x = lerp(mesh.rotation.x, targetX, 0.06);
    mesh.rotation.y = lerp(mesh.rotation.y, targetY, 0.06);
    mesh.rotation.z = lerp(mesh.rotation.z, reduceMotion ? 0 : px * 0.08, 0.06);
  });

  return (
    <mesh ref={ref} castShadow={false} receiveShadow={false}>
      <torusKnotGeometry args={[1, 0.34, 256, 32]} />
      <MeshTransmissionMaterial
        transmission={1}
        thickness={0.35}
        roughness={0}
        ior={1.18}
        chromaticAberration={0.08}
        anisotropy={0.1}
        distortion={0.35}
        distortionScale={0.55}
        temporalDistortion={0.18}
        backside
        samples={10}
        resolution={512}
      />
    </mesh>
  );
}

function OrbModelFromGLB({
  url,
  pointerX,
  pointerY,
  reduceMotion,
}: OrbShared & { url: string }) {
  const gltf = useGLTF(url);
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo<THREE.BufferGeometry | null>(() => {
    let found: THREE.BufferGeometry | null = null;
    gltf.scene.traverse((obj) => {
      if (found) return;
      const anyObj = obj as unknown as { isMesh?: boolean; geometry?: THREE.BufferGeometry };
      if (anyObj.isMesh && anyObj.geometry) found = anyObj.geometry;
    });
    return found;
  }, [gltf.scene]);

  const scale = useMemo(() => {
    if (!geometry) return 1;
    geometry.computeBoundingBox();
    const bb = geometry.boundingBox;
    if (!bb) return 1;
    const size = new THREE.Vector3();
    bb.getSize(size);
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    return 2.05 / maxAxis;
  }, [geometry]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = state.clock.getElapsedTime();
    const px = clamp(pointerX.current, -1, 1);
    const py = clamp(pointerY.current, -1, 1);

    const base = reduceMotion ? 0.16 : 0.32;
    const wobble = reduceMotion ? 0 : Math.sin(t * 0.55) * 0.08;

    const targetX = base + wobble + py * (reduceMotion ? 0.12 : 0.28);
    const targetY = base + px * (reduceMotion ? 0.14 : 0.34);

    mesh.rotation.x = lerp(mesh.rotation.x, targetX, 0.06);
    mesh.rotation.y = lerp(mesh.rotation.y, targetY, 0.06);
    mesh.rotation.z = lerp(mesh.rotation.z, reduceMotion ? 0 : px * 0.08, 0.06);
  });

  if (!geometry) return null;

  return (
    <mesh ref={meshRef} geometry={geometry} scale={scale} castShadow={false} receiveShadow={false}>
      <MeshTransmissionMaterial
        transmission={1}
        thickness={0.35}
        roughness={0}
        ior={1.18}
        chromaticAberration={0.08}
        anisotropy={0.1}
        distortion={0.35}
        distortionScale={0.55}
        temporalDistortion={0.18}
        backside
        samples={10}
        resolution={512}
      />
    </mesh>
  );
}

function OrbScene({
  pointerX,
  pointerY,
  reduceMotion,
  orbModelUrl,
}: OrbShared & { orbModelUrl?: string }) {
  const { viewport } = useThree();
  const groupScale = useMemo(() => {
    const s = viewport.width / 3.6;
    return clamp(s, 0.75, 1.35);
  }, [viewport.width]);

  return (
    <group scale={groupScale}>
      <ambientLight intensity={0.85} />
      <directionalLight intensity={2.2} position={[3, 2.2, 3]} />
      <directionalLight intensity={1.2} position={[-3, -1, 2]} />
      <Environment preset="city" />

      {orbModelUrl ? (
        <Suspense fallback={null}>
          <OrbModelFromGLB
            url={orbModelUrl}
            pointerX={pointerX}
            pointerY={pointerY}
            reduceMotion={reduceMotion}
          />
        </Suspense>
      ) : (
        <OrbModelProcedural pointerX={pointerX} pointerY={pointerY} reduceMotion={reduceMotion} />
      )}
    </group>
  );
}

export default function Hero({
  className,
  ctaHref = '/#portfolio-showcase',
  ctaLabel = 'get to know me better',
  orbModelUrl,
  sideLabel = '[ BRAND AWARENESS ]',
  sideThumbHref = '/#portfolio-showcase',
  sideThumbAlt = 'Portfolio showcase preview',
}: HeroProps) {
  const reduceMotion = useReducedMotion();

  // Evita “sumir”/quebrar por hidratação SSR do Canvas (WebGL) e garante altura consistente.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Mouse → parallax do texto (Framer) + orb (R3F)
  const pointerX = useRef(0);
  const pointerY = useRef(0);
  const parallaxEnabled = mounted && !reduceMotion;

  const { x, y, setFromPointer, reset } = useHeroParallax(parallaxEnabled);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    setFromPointer(e);

    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height; // 0..1
    pointerX.current = (px - 0.5) * 2;
    pointerY.current = (py - 0.5) * 2;
  };

  const onPointerLeave = () => {
    reset();
    pointerX.current = 0;
    pointerY.current = 0;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { when: 'beforeChildren', staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10, filter: 'blur(6px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: reduceMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={[
        'relative isolate w-full overflow-hidden bg-[#F4F4F4] text-zinc-950',
        'min-h-[100svh]',
        className ?? '',
      ].join(' ')}
      aria-labelledby="hero-title"
    >
      <div className="mx-auto w-full max-w-7xl px-5 pt-5 sm:px-8 sm:pt-7 lg:px-10 lg:pt-8">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="select-none text-[22px] font-semibold tracking-tight text-blue-600 outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F4F4]"
            aria-label="Voltar para home"
          >
            danilo
          </Link>

          <nav className="hidden items-center gap-8 text-[18px] font-medium text-blue-600 lg:flex">
            <Link className="underline underline-offset-8" href="/#home">
              home
            </Link>
            <Link className="hover:underline hover:underline-offset-8" href="/#sobre">
              sobre
            </Link>
            <Link className="hover:underline hover:underline-offset-8" href="/#portfolio-showcase">
              portfolio showcase
            </Link>
            <Link className="hover:underline hover:underline-offset-8" href="/#contato">
              contato
            </Link>
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-md bg-zinc-950/0 text-zinc-950 outline-none ring-1 ring-zinc-950/10 hover:bg-zinc-950/5 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F4F4] lg:hidden"
            aria-label="Abrir menu"
          >
            <span className="block h-[2px] w-6 bg-zinc-950" />
            <span className="mt-1 block h-[2px] w-6 bg-zinc-950" />
            <span className="mt-1 block h-[2px] w-6 bg-zinc-950" />
          </button>
        </header>

        <div className="relative mt-6 grid grid-cols-1 items-start gap-7 pb-10 sm:mt-10 sm:gap-8 sm:pb-14 lg:mt-10 lg:grid-cols-2 lg:items-center lg:gap-10 lg:pb-16">
          {/* ORB (mobile acima do texto) */}
          <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
            <div
              className={[
                'relative',
                'h-[240px] w-[240px]',
                'sm:h-[320px] sm:w-[320px]',
                'lg:h-[520px] lg:w-[520px]',
              ].join(' ')}
              aria-hidden="true"
            >
              {/* placeholder (evita “flash”/layout shift) */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/65 to-white/10 blur-[2px]" />

              {mounted && (
                <Canvas
                  className="!absolute inset-0"
                  dpr={[1, 1.75]}
                  camera={{ position: [0, 0, 4.2], fov: 35, near: 0.1, far: 100 }}
                  gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: 'high-performance',
                    preserveDrawingBuffer: false,
                  }}
                  // Mantém "always" para que o orb responda ao pointer mesmo com reduce motion
                  frameloop="always"
                  style={{ pointerEvents: 'none' }}
                >
                  <Suspense fallback={null}>
                    <OrbScene
                      pointerX={pointerX}
                      pointerY={pointerY}
                      reduceMotion={!!reduceMotion}
                      orbModelUrl={orbModelUrl}
                    />
                  </Suspense>
                </Canvas>
              )}

              {/* Side label + preview (desktop) */}
              <div className="pointer-events-none absolute right-[-34px] top-[30%] hidden w-[320px] lg:block">
                <div className="flex flex-col items-end gap-10">
                  <div className="rounded-md bg-white/35 px-6 py-5 text-right text-[26px] font-medium tracking-wide text-blue-600 ring-1 ring-zinc-950/5 backdrop-blur">
                    {sideLabel}
                  </div>

                  <div className="relative">
                    <div className="absolute -left-7 -top-7 text-blue-600">↙</div>
                    <Link
                      href={sideThumbHref}
                      className="pointer-events-auto block rounded-xl bg-cyan-200/50 p-3 ring-1 ring-zinc-950/10 backdrop-blur hover:bg-cyan-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F4F4]"
                      aria-label="Abrir portfolio showcase"
                    >
                      <div className="h-[92px] w-[170px] rounded-lg bg-zinc-950/10" />
                      <span className="sr-only">{sideThumbAlt}</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* TEXTO */}
          <motion.div
            className="order-2 max-w-[620px] lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{
              translateX: parallaxEnabled ? x : 0,
              translateY: parallaxEnabled ? y : 0,
            }}
          >
            <motion.h1
              id="hero-title"
              variants={itemVariants}
              className={[
                'text-balance',
                'text-[56px] leading-[0.92] tracking-tight',
                'sm:text-[76px]',
                'lg:text-[96px]',
                'font-black',
              ].join(' ')}
            >
              <span className="text-blue-600">Design,</span>
              <br />
              <span className="text-zinc-950">não é</span> <span className="text-zinc-950">só</span>
              <br />
              <span className="text-zinc-950">estética.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-5 text-[18px] font-medium leading-snug tracking-wide text-blue-600 sm:mt-6 sm:text-[22px]"
            >
              [É intenção, é estratégia, é experiência.]
            </motion.p>

            <motion.div variants={itemVariants} className="mt-7 sm:mt-10">
              <Link
                href={ctaHref}
                className={[
                  'inline-flex items-center gap-3',
                  'rounded-full bg-blue-600 px-7 py-4',
                  'text-[16px] font-medium text-white',
                  'shadow-[0_18px_40px_rgba(37,99,235,0.28)]',
                  'outline-none',
                  'hover:bg-blue-700',
                  'focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F4F4F4]',
                ].join(' ')}
              >
                <span>{ctaLabel}</span>
                <span
                  className="grid h-11 w-11 place-items-center rounded-full bg-blue-500/70 ring-1 ring-white/25"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Se você for usar orbModelUrl com GLB/GLTF:
// (useGLTF tem cache interno; este preload é opcional se você souber o path fixo)
// useGLTF.preload('/medias/torrus.glb');
