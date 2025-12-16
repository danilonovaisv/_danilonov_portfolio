// app/page.tsx
import Hero from '@/components/home/Hero'

export default function HomePage() {
  return (
    <main className="min-h-dvh bg-[#f3f3f3] text-neutral-950">
      <Hero />
    </main>
  )
}

// components/home/Hero.tsx
'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const HeroOrbCanvas = dynamic(() => import('./HeroOrbCanvas'), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden="true"
      className="h-[min(520px,58svh)] w-full rounded-3xl bg-gradient-to-br from-white/70 to-white/20 shadow-[0_30px_120px_rgba(0,0,0,0.12)] ring-1 ring-black/5 backdrop-blur-sm"
    />
  ),
})

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      aria-label="Hero"
      className="relative isolate overflow-hidden px-4 pt-24 sm:px-6 lg:px-10"
    >
      {/* Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-[-120px] top-[-80px] h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_minmax(360px,520px)] lg:gap-14">
        {/* Copy */}
        <div className="relative">
          <motion.h1
            className="text-balance text-[clamp(44px,6vw,88px)] font-extrabold leading-[0.95] tracking-tight"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="text-blue-600">Design,</span>
            <br />
            <span className="text-neutral-950">não é só</span>
            <br />
            <span className="text-neutral-950">estética.</span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-blue-700/90"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
          >
            [É intenção, é estratégia, é experiência.]
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          >
            <Link
              href="/sobre"
              className="inline-flex h-12 items-center justify-center gap-3 rounded-full bg-blue-600 px-6 text-base font-medium text-white shadow-[0_18px_55px_rgba(37,99,235,0.35)] ring-1 ring-blue-700/20 transition hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f3f3]"
              aria-label="Ir para a seção sobre"
            >
              get to know me better <span aria-hidden="true">↗</span>
            </Link>

            <Link
              href="/portfolio"
              className="inline-flex h-12 items-center justify-center rounded-full px-6 text-base font-medium text-blue-700 ring-1 ring-blue-700/20 transition hover:bg-blue-600/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f3f3]"
              aria-label="Ver portfólio"
            >
              portfolio showcase
            </Link>
          </motion.div>
        </div>

        {/* 3D Orb */}
        <div className="relative">
          <div
            className="relative h-[min(520px,58svh)] w-full overflow-hidden rounded-3xl bg-white/40 ring-1 ring-black/5"
            aria-hidden="true"
          >
            {/* IMPORTANT:
               - Canvas precisa de um parent com width/height válidos para renderizar (se o container colapsa, o Canvas fica 0x0 e “some”).
               - Referência: Canvas é responsivo ao tamanho do parent.  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6MH0"}
            */}
            <HeroOrbCanvas />
          </div>

          <div className="pointer-events-none absolute left-6 top-6 rounded-2xl bg-white/55 px-5 py-3 text-sm font-semibold tracking-[0.18em] text-blue-700/90 ring-1 ring-black/5 backdrop-blur">
            [ BRAND AWARENESS ]
          </div>
        </div>
      </div>

      {/* Spacer to ensure Hero has breathing room and avoids CLS from late-loading fonts/canvas */}
      <div className="h-14 sm:h-20" />
    </section>
  )
}

// components/home/HeroOrbCanvas.tsx
'use client'

import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, Text, useGLTF } from '@react-three/drei'

/**
 * DIAGNÓSTICO (resumo dentro do código, para manter o formato de saída):
 * - Sintoma: hero/orb “some” ao carregar ou após interações.
 * - Causas mais comuns nesse setup:
 *   1) R3F rodando em Server Component/SSR → falha de hidratação ou render nulo.
 *      Correção: dynamic import com ssr:false (como no tutorial) + "use client".  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6MX0"}
 *   2) Canvas com parent sem altura/largura (0x0) por colapso de layout/overflow/position.
 *      Correção: container com h-* explícito (ver Hero.tsx) e Canvas com className w-full h-full.  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6Mn0"}
 *   3) Asset GLB falhando (404/CORS) → promise rejeita e a cena pode parar.
 *      Correção: ErrorBoundary + fallback 3D simples.
 *
 * Referência técnica do material/transmission e setup: MeshTransmissionMaterial aplicado em um mesh do GLB + Environment/light.  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6M30"}
 */

type ErrorBoundaryProps = {
  children: React.ReactNode
  fallback: React.ReactNode
}

type ErrorBoundaryState = { hasError: boolean }

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    // eslint-disable-next-line no-console
    console.error('[HeroOrbCanvas] R3F error:', error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true }) ||
      canvas.getContext('experimental-webgl', { failIfMajorPerformanceCaveat: true })
    return !!gl
  } catch {
    return false
  }
}

function GlassOrbModel({ modelUrl = '/medias/torrus.glb' }: { modelUrl?: string }) {
  const { nodes } = useGLTF(modelUrl) as unknown as {
    nodes: Record<string, THREE.Mesh>
  }

  const meshRef = useRef<THREE.Mesh | null>(null)
  const { viewport, size } = useThree()

  const isSmall = size.width < 768

  // Material tuned for a premium “glass + distortion” look (MeshTransmissionMaterial).
  // Based on tutorial structure (GLB mesh + transmission + Environment).  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6NH0"}
  const materialProps = useMemo(() => {
    const mobile = isSmall
    return {
      thickness: mobile ? 0.18 : 0.25,
      roughness: mobile ? 0.05 : 0.02,
      transmission: 1,
      ior: 1.2,
      chromaticAberration: mobile ? 0.01 : 0.03,
      distortion: mobile ? 0.15 : 0.25,
      distortionScale: mobile ? 0.2 : 0.35,
      temporalDistortion: mobile ? 0.08 : 0.15,
      anisotropicBlur: mobile ? 0.05 : 0.12,
      backside: true,
      samples: mobile ? 6 : 10,
      resolution: mobile ? 256 : 512,
      transparent: true,
    } as const
  }, [isSmall])

  useFrame((state, delta) => {
    const m = meshRef.current
    if (!m) return
    m.rotation.y += delta * 0.35
    m.rotation.x += delta * 0.12
    m.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04
  })

  const scale = viewport.width / 3.8

  // Try to find a torus mesh from the GLB, otherwise fallback to first node mesh.
  const torusNode =
    (nodes.Torus002 as THREE.Mesh | undefined) ||
    (nodes.Torus as THREE.Mesh | undefined) ||
    (Object.values(nodes).find((n) => (n as any)?.isMesh) as THREE.Mesh | undefined)

  if (!torusNode) return <FallbackOrb />

  return (
    <group scale={scale}>
      {/* WebGL text ensures distortion is visible through refraction (matches tutorial approach).  :OaiMdDirective_Annotations_5h6qs{attrs="eyJpbmRleCI6NX0"} */}
      <Text
        position={[0, 0, -1.1]}
        fontSize={0.55}
        color="#111827"
        anchorX="center"
        anchorY="middle"
      >
        danilo
      </Text>

      <mesh ref={meshRef} geometry={torusNode.geometry} position={[0, 0, 0]}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  )
}

function FallbackOrb() {
  const ref = useRef<THREE.Mesh | null>(null)
  const { viewport, size } = useThree()
  const isSmall = size.width < 768

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.35
    ref.current.rotation.x += delta * 0.12
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04
  })

  return (
    <group scale={viewport.width / 4}>
      <Text
        position={[0, 0, -1.1]}
        fontSize={0.55}
        color="#111827"
        anchorX="center"
        anchorY="middle"
      >
        danilo
      </Text>
      <mesh ref={ref}>
        <torusKnotGeometry args={[0.85, 0.28, 220, 24]} />
        <MeshTransmissionMaterial
          thickness={isSmall ? 0.18 : 0.25}
          roughness={isSmall ? 0.06 : 0.03}
          transmission={1}
          ior={1.2}
          chromaticAberration={isSmall ? 0.01 : 0.03}
          distortion={isSmall ? 0.15 : 0.25}
          distortionScale={isSmall ? 0.2 : 0.35}
          temporalDistortion={isSmall ? 0.08 : 0.15}
          anisotropicBlur={isSmall ? 0.05 : 0.12}
          backside
          samples={isSmall ? 6 : 10}
          resolution={isSmall ? 256 : 512}
          transparent
        />
      </mesh>
    </group>
  )
}

export default function HeroOrbCanvas() {
  const [webglOk, setWebglOk] = useState(true)

  useEffect(() => {
    setWebglOk(isWebGLAvailable())
  }, [])

  // Preload GLB (if you are using this path). If it 404s, ErrorBoundary + fallback handles it.
  useEffect(() => {
    try {
      useGLTF.preload('/medias/torrus.glb')
    } catch {
      // no-op
    }
  }, [])

  if (!webglOk) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-white/40">
        <div className="text-sm text-neutral-700">WebGL indisponível neste dispositivo.</div>
      </div>
    )
  }

  return (
    <Canvas
      className="h-full w-full"
      // Ensures transparency over the hero card background
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.2], fov: 45, near: 0.1, far: 100 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
      }}
    >
      <ErrorBoundary fallback={<FallbackOrb />}>
        <Suspense fallback={<FallbackOrb />}>
          <ambientLight intensity={0.6} />
          <directionalLight intensity={2} position={[0.5, 2.2, 3.2]} />
          <Environment preset="city" />
          <GlassOrbModel modelUrl="/medias/torrus.glb" />
        </Suspense>
      </ErrorBoundary>
    </Canvas>
  )
}
