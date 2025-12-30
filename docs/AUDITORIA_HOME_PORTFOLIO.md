# 🧠 Auditoria + Correções (Prompts Atômicos) — HOME + PORTFOLIO 'use client';

 // =============================
// HERO + MANIFESTO + PORTFOLIO
// Rebuild – Danilo Novais Portfolio
// =============================
/*
TECHNICAL DIAGNOSIS (LEGACY VS SPEC)

1) Hero orchestration
- HomeHero.tsx atual vincula o texto editorial ao scroll (opacityText via useScroll/useTransform),
  fazendo o bloco desaparecer conforme o usuário desce.
- Isso quebra o requisito de que o HeroCopy seja 100% estático, editorial e legível desde o
  primeiro frame (sem fade, sem scroll binding).

2) Manifesto Thumb (vídeo)
- A thumb é apenas um bloco absoluto no canto inferior direito com scale/translate simples,
  sem pin/sticky da seção. O morph para fullscreen não acompanha a timeline de scroll como
  definido no protótipo (0–100% da altura da Hero).
- Falta o clique de “skip to fullscreen” no desktop e a separação de comportamento entre
  desktop (scroll morphing) e mobile (seção independente + toggle de som).

3) Preloader (Ghost Loader)
- Implementação atual faz apenas um fade-out simples de overlay.
- Especificação exige: ghost flutuante, olhos pulsando, texto “Summoning spirits” pulsando
  e barra de progresso com gradiente Ghost Blue, respeitando prefers-reduced-motion.

4) Ghost Atmosphere (WebGL)
- Canvas não é garantidamente carregado via dynamic import client-only, nem desativado
  para usuários com prefers-reduced-motion.
- Falta controle explícito de DPR máximo, antialias off e separação clara entre camada
  atmosférica (Ghost + partículas + fireflies) e fallback CSS radial.

5) Portfolio Showcase
- Seção não respeita ainda o layout editorial descrito (stripes alternando alinhamento,
  floating label, hover com thumbnail revelada e scroll reveal com stagger).
- Interações de hover estão parcialmente presentes, mas sem coordenação com reduced motion
  e sem garantir ausência de layout shift.

JUSTIFICATIVA DAS MUDANÇAS

1) HomeHero foi refeito para:
   - Ter container de 220vh + inner stage sticky (top: 0, h-screen), garantindo pin da
     atmosfera Ghost, texto editorial e vídeo durante o morph.
   - Remover qualquer scroll binding do HeroCopy (texto sempre visível enquanto a Hero
     estiver em viewport).
   - Usar useScroll + useTransform apenas para o container fullscreen do vídeo, com
     transform-origin bottom-right (scale 0.3→1, border-radius 16→0, opacity 0→1).

2) ManifestoThumb:
   - Agora é um motion “video-wrapper” completo, com idle fade-in (opacity 0→1, scale 0.9→1),
     micro-interação de hover (scale 1→1.05, arrow -45°→0°) e acessível via teclado.
   - Recebe callback onDesktopClick usado para o salto imediato para o estado fullscreen
     (scroll jump até o fim da Hero em viewports ≥ md).

3) HeroPreloader:
   - Recriado com ghost SVG flutuando (sinusoidal), olhos com pulsação de escala/opacidade,
     texto monoespaçado pulsando e barra de progresso com gradiente Ghost Blue.
   - Overlay é desmontado via onAnimationComplete para liberar ponteiros; todas as animações
     respeitam prefers-reduced-motion.

4) GhostStage + WebGL:
   - GhostStage faz dynamic import de GhostCanvas (ssr: false). GhostCanvas configura DPR
     máximo 2, antialias false e EffectComposer com Bloom + Noise + Vignette para aproximar
     BloomPass + AnalogDecayPass.
   - Ghost segue o cursor via lerp (~0.05) com movimento senoidal orgânico; olhos reagem à
     distância do ponteiro; partículas e fireflies usam instancing/points com animação leve
     em useFrame para reduzir custo de GPU.

5) ManifestoSection (mobile):
   - Nova seção independente, logo abaixo da Hero, ocupando aspect-video 100% da viewport
     em mobile. Usa useInView + motion.section para fade/scale-in e botão que alterna som
     (mute/unmute) ao toque.

6) PortfolioShowcaseSection + AccordionRow:
   - Implementam exatamente a organização em stripes: alinhamento alternado (end/center/start),
     floating label “[what we love working on]”, hover com thumbnail revelada (width 0→288px,
     700ms cubic-bezier(0.22,1,0.36,1)), arrow rotacionando -45°→0° e scroll reveal com
     stagger e ease-out.
   - Respeitam prefers-reduced-motion desativando animações de entrada.

Todas as camadas respeitam o z-index stack definido:
   z-50 Preloader   | z-30 ManifestoThumb | z-20 GhostCanvas
   z-10 HeroCopy    | z-0 radial background | Mobile ManifestoSection abaixo da Hero.
*/

// -----------------------------------------------------------------------------
// components/home/HomeHero.tsx
// -----------------------------------------------------------------------------
'use client';

import { useCallback, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';

export default function HomeHero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const videoScaleMotion = useTransform(scrollYProgress, [0, 0.85], [0.3, 1]);
  const videoRadius = useTransform(scrollYProgress, [0, 0.85], [16, 0]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const handleDesktopClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const targetTop = sectionEl.offsetTop + sectionEl.offsetHeight - window.innerHeight;
    window.scrollTo({ top: targetTop, behavior: 'auto' });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[220vh] overflow-hidden bg-[#06071f]"
      aria-label="Hero institucional de Danilo Novais"
    >
      {/* Fundo radial base */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#0b0d3a_0,#06071f_60%)]" />

      {/* Preloader Ghost Loader (z-50) */}
      <HeroPreloader />

      {/* Stage sticky: Ghost Atmosphere + Texto Editorial + Manifesto Thumb */}
      <div className="sticky top-0 h-screen">
        <div className="relative h-full w-full overflow-hidden">
          {/* Ghost Atmosphere (WebGL) */}
          <div className="absolute inset-0 z-20">
            <GhostStage />
          </div>

          {/* Texto Editorial fixo (sem scroll binding) */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-center">
            <HeroCopy />
          </div>

          {/* Manifesto Thumb – Desktop (scroll morphing) */}
          <motion.div
            className="absolute inset-0 z-30 hidden md:block"
            style={{
              opacity: videoOpacity,
              scale: prefersReducedMotion ? 1 : videoScaleMotion,
              borderRadius: videoRadius,
              originX: 1,
              originY: 1,
            }}
          >
            <div className="pointer-events-none flex h-full w-full items-end justify-end p-6 md:p-10">
              <div className="pointer-events-auto h-[min(36vh,260px)] w-[min(32vw,460px)] overflow-hidden rounded-xl border border-white/5 bg-black/40 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
                <ManifestoThumb onDesktopClick={handleDesktopClick} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// components/home/HeroPreloader.tsx
// -----------------------------------------------------------------------------
'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';

export default function HeroPreloader() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  const fadeDuration = prefersReducedMotion ? 0.01 : 1;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: prefersReducedMotion ? 0 : 1.5, duration: fadeDuration }}
      onAnimationComplete={() => setVisible(false)}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
      aria-hidden="true"
    >
      <motion.svg
        className="mb-5 h-20 w-20"
        viewBox="0 0 512 512"
        fill="none"
        initial={{ y: 0, opacity: 1 }}
        animate={
          prefersReducedMotion ? {} : { y: [0, -12, 0] }
        }
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
        {/* Olhos pulsando */}
        <motion.circle
          cx="210"
          cy="190"
          r="26"
          fill="#06071f"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 0.85, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.1 }
          }
        />
        <motion.circle
          cx="302"
          cy="190"
          r="26"
          fill="#06071f"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={
            prefersReducedMotion
              ? {}
              : { scale: [1, 0.85, 1], opacity: [0.7, 1, 0.7] }
          }
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }
          }
        />
      </motion.svg>

      <motion.p
        className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[#e0e0e0]"
        initial={{ opacity: 0.7 }}
        animate={
          prefersReducedMotion
            ? {}
            : { opacity: [0.7, 1, 0.7], letterSpacing: ['0.18em', '0.24em', '0.18em'] }
        }
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        Summoning spirits
      </motion.p>

      <div className="h-0.5 w-24 overflow-hidden rounded-full bg-[#06071f]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: prefersReducedMotion ? 0.01 : 2,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// components/home/HeroCopy.tsx
// -----------------------------------------------------------------------------
'use client';

export function HeroCopy() {
  return (
    <div className="mx-auto max-w-3xl text-[#d9dade]">
      <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.24em]">
        [BRAND AWARENESS]
      </p>
      <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
        Design, não
        <br />
        é só estética.
      </h1>
      <p className="mb-8 text-base md:text-lg">
        [É intenção, é estratégia, é experiência.]
      </p>
      <a
        href="/sobre"
        className="text-[0.9rem] font-medium uppercase tracking-[0.22em] text-[#d9dade] transition-colors duration-300 hover:text-white"
        aria-label="Ir para a seção sobre e conhecer melhor o trabalho de Danilo"
      >
        get to know me better →
      </a>
    </div>
  );
}

export default HeroCopy;

// -----------------------------------------------------------------------------
// components/home/ManifestoThumb.tsx
// -----------------------------------------------------------------------------
'use client';

import type { KeyboardEvent, MouseEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from '../shared/ArrowIcon';

type ManifestoThumbProps = {
  onDesktopClick?: () => void;
};

const MANIFESTO_VIDEO_SRC =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

export default function ManifestoThumb({ onDesktopClick }: ManifestoThumbProps) {
  const prefersReducedMotion = useReducedMotion();

  const triggerDesktopClick = (event: MouseEvent | KeyboardEvent) => {
    if (typeof window === 'undefined') return;
    if (window.innerWidth >= 768 && onDesktopClick) {
      event.preventDefault();
      onDesktopClick();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label="Assistir manifesto em fullscreen"
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl bg-black/40"
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
      animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }
      }
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.97 }}
      onClick={triggerDesktopClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          triggerDesktopClick(event);
        }
      }}
    >
      <motion.video
        src={MANIFESTO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-black/55 p-2 text-white backdrop-blur-[2px] md:bottom-4 md:right-4 md:p-3">
        <ArrowIcon className="h-3 w-3 -rotate-45 transition-transform duration-500 group-hover:rotate-0 md:h-4 md:w-4" />
      </div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// components/home/GhostStage.tsx
// -----------------------------------------------------------------------------
'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';

const GhostCanvas = dynamic(() => import('./webgl/GhostCanvas'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[radial-gradient(circle_at_center,#0b0d3a_0,#06071f_60%)]" />
  ),
});

export default function GhostStage() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    // Fallback visual leve quando o usuário prefere menos motion
    return (
      <div className="h-full w-full bg-[radial-gradient(circle_at_center,#0b0d3a_0,#06071f_60%)]" />
    );
  }

  return <GhostCanvas />;
}

// -----------------------------------------------------------------------------
// components/home/webgl/GhostCanvas.tsx
// -----------------------------------------------------------------------------
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Ghost from './Ghost';
import Eyes from './Eyes';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { KernelSize } from 'postprocessing';

export default function GhostCanvas() {
  const dpr: [number, number] =
    typeof window === 'undefined'
      ? [1, 1.5]
      : [1, Math.min(2, window.devicePixelRatio || 1)];

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 3], fov: 40 }}
    >
      <color attach="background" args={['#06071f']} />
      <Suspense fallback={null}>
        <AtmosphereVeil />
        <Ghost />
        <Eyes />
        <Particles />
        <Fireflies />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={2.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            kernelSize={KernelSize.LARGE}
          />
          <Noise premultiply opacity={0.25} />
          <Vignette eskil={false} offset={0.45} darkness={0.8} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

// -----------------------------------------------------------------------------
// components/home/webgl/Ghost.tsx
// -----------------------------------------------------------------------------
'use client';

import { useRef } from 'react';
import type { Group, MeshStandardMaterial } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export default function Ghost() {
  const group = useRef<Group | null>(null);
  const bodyMaterial = useRef<MeshStandardMaterial | null>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!group.current || !bodyMaterial.current) return;

    const t = state.clock.getElapsedTime();
    const pointer = state.pointer; // normalized -1..1

    const ampX = viewport.width * 0.15;
    const ampY = viewport.height * 0.12;

    const targetX = (pointer.x || 0) * ampX;
    const targetY = (pointer.y || 0) * ampY + Math.sin(t * 0.8) * 0.18;

    group.current.position.x += (targetX - group.current.position.x) * 0.05;
    group.current.position.y += (targetY - group.current.position.y) * 0.05;
    group.current.position.z = 0.1 + Math.sin(t * 0.3) * 0.06;

    group.current.rotation.y = Math.sin(t * 0.35) * 0.18;

    const baseEmissive = 1.4;
    const pulse = 0.3 + 0.25 * Math.sin(t * 2.1);
    bodyMaterial.current.emissiveIntensity = baseEmissive + pulse;
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.65, 48, 48]} />
        <meshStandardMaterial
          ref={bodyMaterial}
          color="#0057FF"
          emissive="#0057FF"
          emissiveIntensity={1.8}
          transparent
          opacity={0.95}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.9, 32, 1, true]} />
        <meshStandardMaterial
          color="#0057FF"
          emissive="#0057FF"
          emissiveIntensity={1.5}
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

// -----------------------------------------------------------------------------
// components/home/webgl/Eyes.tsx
// -----------------------------------------------------------------------------
'use client';

import { useRef } from 'react';
import type { Group, MeshBasicMaterial } from 'three';
import { useFrame } from '@react-three/fiber';

export default function Eyes() {
  const group = useRef<Group | null>(null);
  const leftMaterial = useRef<MeshBasicMaterial | null>(null);
  const rightMaterial = useRef<MeshBasicMaterial | null>(null);

  useFrame((state) => {
    if (!group.current || !leftMaterial.current || !rightMaterial.current) return;

    const t = state.clock.getElapsedTime();
    const pointer = state.pointer;

    const dist = Math.min(1, Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y));
    const targetOpacity = 0.6 + dist * 0.4;

    const lerp = (a: number, b: number, alpha: number) => a + (b - a) * alpha;

    leftMaterial.current.opacity = lerp(leftMaterial.current.opacity, targetOpacity, 0.12);
    rightMaterial.current.opacity = lerp(rightMaterial.current.opacity, targetOpacity, 0.12);

    const lookX = (pointer.x || 0) * 0.12;
    const lookY = (pointer.y || 0) * 0.12 + Math.sin(t * 0.8) * 0.02;

    group.current.position.x = lookX;
    group.current.position.y = lookY;
  });

  return (
    <group ref={group} position={[-0.14, 0.06, 0.8]}>
      <mesh>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshBasicMaterial
          ref={leftMaterial}
          color="#FFFFFF"
          transparent
          opacity={0.7}
        />
      </mesh>
      <mesh position={[0.28, 0, 0]}>
        <sphereGeometry args={[0.09, 32, 32]} />
        <meshBasicMaterial
          ref={rightMaterial}
          color="#FFFFFF"
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}

// -----------------------------------------------------------------------------
// components/home/webgl/Particles.tsx
// -----------------------------------------------------------------------------
'use client';

import { useMemo, useRef } from 'react';
import type { Points } from 'three';
import { useFrame } from '@react-three/fiber';

const PARTICLE_COUNT = 260;

export default function Particles() {
  const pointsRef = useRef<Points | null>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] = (Math.random() - 0.5) * 6;
      arr[i3 + 1] = (Math.random() - 0.5) * 4;
      arr[i3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.03;
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = t;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FFFFFF"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.25}
      />
    </points>
  );
}

// -----------------------------------------------------------------------------
// components/home/webgl/Fireflies.tsx
// -----------------------------------------------------------------------------
'use client';

import { useMemo, useRef } from 'react';
import type { InstancedMesh, Object3D } from 'three';
import { Object3D as ThreeObject3D } from 'three';
import { useFrame } from '@react-three/fiber';

const FIREFLY_COUNT = 26;

export default function Fireflies() {
  const meshRef = useRef<InstancedMesh | null>(null);
  const dummy = useMemo<Object3D>(() => new ThreeObject3D(), []);

  const seeds = useMemo(
    () =>
      Array.from({ length: FIREFLY_COUNT }, () => ({
        radius: 1.2 + Math.random() * 1.2,
        speed: 0.4 + Math.random() * 0.6,
        offset: Math.random() * Math.PI * 2,
        height: -0.4 + Math.random() * 0.8,
      })),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const t = state.clock.getElapsedTime();
    seeds.forEach((seed, i) => {
      const angle = t * seed.speed + seed.offset;

      dummy.position.set(
        Math.cos(angle) * seed.radius,
        seed.height + Math.sin(angle * 2.0) * 0.2,
        Math.sin(angle) * seed.radius
      );

      const scale = 0.02 + 0.01 * Math.sin(angle * 3.0);
      dummy.scale.setScalar(scale);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined as any, undefined as any, FIREFLY_COUNT]}
    >
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
    </instancedMesh>
  );
}

// -----------------------------------------------------------------------------
// components/home/webgl/AtmosphereVeil.tsx
// -----------------------------------------------------------------------------
'use client';

export default function AtmosphereVeil() {
  return (
    <group>
      {/* Plano escuro de base */}
      <mesh position={[0, -1.3, -1.4]} scale={[7, 4, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#06071f" />
      </mesh>
      {/* Glow Ghost Blue */}
      <mesh position={[0, 0, -0.7]} scale={[2.6, 2.6, 1]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color="#0057FF" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

// -----------------------------------------------------------------------------
// components/home/ManifestoSection.tsx (mobile only)
// -----------------------------------------------------------------------------
'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';

const MANIFESTO_VIDEO_SRC_MOBILE =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4';

export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-20% 0px' });
  const prefersReducedMotion = useReducedMotion();
  const [muted, setMuted] = useState(true);

  return (
    <motion.section
      id="manifesto"
      ref={sectionRef}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView && !prefersReducedMotion ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block w-full bg-[#06071f] md:hidden"
      aria-label="Manifesto em vídeo"
    >
      <button
        type="button"
        onClick={() => setMuted((prev) => !prev)}
        className="relative flex aspect-video w-full items-center justify-center overflow-hidden"
        aria-pressed={!muted}
        aria-label={muted ? 'Ativar som do manifesto' : 'Desativar som do manifesto'}
      >
        <video
          src={MANIFESTO_VIDEO_SRC_MOBILE}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white">
          <span>{muted ? 'sound off' : 'sound on'}</span>
          <span
            className={`h-2 w-2 rounded-full ${
              muted ? 'bg-white/40' : 'bg-[#00ff9d]'
            }`}
          />
        </div>
      </button>
    </motion.section>
  );
}

// -----------------------------------------------------------------------------
// components/portfolio/PortfolioShowcaseSection.tsx
// -----------------------------------------------------------------------------
'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import AccordionRow from './AccordionRow';
import { PrimaryButton } from '../shared/PrimaryButton';

type CategoryConfig = {
  id: string;
  titleDesktop: string;
  titleMobile: string;
  align: 'start' | 'center' | 'end';
};

const CATEGORIES: CategoryConfig[] = [
  {
    id: 'brand-campaigns',
    titleDesktop: 'Brand & Campaigns',
    titleMobile: 'Brand & Campaigns',
    align: 'end',
  },
  {
    id: 'videos-motion',
    titleDesktop: 'Videos & Motion',
    titleMobile: 'Videos & Motion',
    align: 'center',
  },
  {
    id: 'websites-tech',
    titleDesktop: 'Web Campaigns,\nWebsites & Tech',
    titleMobile: 'Websites & Tech',
    align: 'start',
  },
];

export default function PortfolioShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-30% 0px' });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      aria-label="Portfolio Categories"
      className="bg-[#F4F5F7] py-24 md:py-32"
    >
      <div className="relative mx-auto max-w-[1680px] px-[clamp(24px,5vw,96px)]">
        {/* Floating Label - Desktop Only */}
        <div className="pointer-events-none hidden md:block">
          <span className="absolute left-[clamp(24px,5vw,96px)] -top-10 font-mono text-[11px] uppercase tracking-[0.24em] text-[#0057FF] mix-blend-difference">
            [what we love working on]
          </span>
        </div>

        {/* Headline Centralizada */}
        <h2 className="mb-14 text-center text-4xl font-bold md:mb-20 md:text-6xl">
          portfólio showcase
        </h2>

        {/* Accordion Rows */}
        <motion.div
          className="flex flex-col gap-10 md:gap-14"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
          animate={isInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {CATEGORIES.map((category, index) => (
            <AccordionRow
              key={category.id}
              category={category}
              alignment={category.align}
              index={index}
              parentInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </motion.div>

        {/* CTAs Aspiracionais */}
        <div className="mt-20 flex flex-col items-center gap-6 md:flex-row md:justify-center">
          <PrimaryButton href="/portfolio" variant="outline">
            Ver todos os projetos →
          </PrimaryButton>
          <PrimaryButton href="/#contact" variant="solid">
            let&apos;s build something great →
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// components/portfolio/AccordionRow.tsx
// -----------------------------------------------------------------------------
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { CategoryConfig } from './PortfolioShowcaseSection';
import { ArrowIcon } from '../shared/ArrowIcon';

type Alignment = 'start' | 'center' | 'end';

interface AccordionRowProps {
  category: CategoryConfig;
  alignment: Alignment;
  index: number;
  parentInView: boolean;
  prefersReducedMotion: boolean;
}

const alignmentClasses: Record<Alignment, string> = {
  start: 'md:justify-start',
  center: 'md:justify-center',
  end: 'md:justify-end',
};

export default function AccordionRow({
  category,
  alignment,
  index,
  parentInView,
  prefersReducedMotion,
}: AccordionRowProps) {
  const delay = index * 0.12;

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      animate={parentInView && !prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
      transition={
        prefersReducedMotion
          ? undefined
          : { duration: 0.8, ease: 'easeOut', delay }
      }
    >
      <Link
        href={`/portfolio?category=${category.id}`}
        className={`group flex w-full items-center border-t border-[#0057FF] py-8 text-black transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F5F7] md:py-14 ${alignmentClasses[alignment]}`}
        aria-label={`Ver projetos de ${category.titleDesktop.replace(/\n/g, ' ')}`}
      >
        <div className="flex w-full items-center gap-5 transition-all duration-300 group-hover:gap-10 md:gap-7">
          {/* Thumbnail Revealer - Desktop Only */}
          <div className="relative hidden h-40 w-0 overflow-hidden rounded-md bg-black/5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-72 md:block">
            <Image
              src={`/thumbnails/${category.id}.jpg`}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 288px, 0px"
            />
          </div>

          {/* Category Title */}
          <h3 className="text-2xl font-medium md:text-5xl md:leading-none">
            <span className="hidden whitespace-pre md:inline">
              {category.titleDesktop}
            </span>
            <span className="md:hidden">{category.titleMobile}</span>
          </h3>

          {/* Icon Identifier */}
          <div className="ml-auto shrink-0 rounded-full bg-[#0057FF] p-2.5 text-white md:p-3.5">
            <ArrowIcon className="-rotate-45 h-4 w-4 transition-transform duration-500 group-hover:rotate-0 md:h-5 md:w-5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// components/shared/PrimaryButton.tsx
// -----------------------------------------------------------------------------
'use client';

import type { ReactNode } from 'react';

type Variant = 'solid' | 'outline';

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
}

export function PrimaryButton({ href, children, variant = 'solid' }: PrimaryButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.22em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variantClasses =
    variant === 'solid'
      ? 'bg-[#0057FF] text-white hover:bg-[#0043cc] focus-visible:ring-[#0057FF] focus-visible:ring-offset-[#F4F5F7]'
      : 'border border-[#0057FF] text-[#0057FF] hover:bg-[#0057FF] hover:text-white focus-visible:ring-[#0057FF] focus-visible:ring-offset-[#F4F5F7]';

  return (
    <a href={href} className={`${baseClasses} ${variantClasses}`}>
      {children}
    </a>
  );
}

// -----------------------------------------------------------------------------
// components/shared/ArrowIcon.tsx
// -----------------------------------------------------------------------------
'use client';

import type { SVGProps } from 'react';

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      {...props}
    >
      <path d="M3 13L13 3M6 3H13V10" />
    </svg>
  );
}
