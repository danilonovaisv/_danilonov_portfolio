// ============================================================================
// FILE: components/hero/HeroGlassOrb.tsx
// ============================================================================

'use client'

import * as React from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  CubeCamera,
  Environment,
  MeshRefractionMaterial,
  PerspectiveCamera,
  useGLTF,
} from '@react-three/drei'
import { motion, useReducedMotion } from 'framer-motion'
import type { GLTF } from 'three-stdlib'

/**
 * HERO GLASS ORB (Next.js App Router + R3F + Drei + Tailwind + Framer Motion)
 *
 * --------------------------------------------------------------------------
 * PROBLEMAS ENCONTRADOS NO CÓDIGO ANTERIOR (comuns nesse setup)
 * --------------------------------------------------------------------------
 * 1) <color attach="background" args={['transparent']} />:
 *    - THREE.Color NÃO suporta alpha; "transparent" não é uma cor válida no three.
 *    - Resultado comum: background fica preto / warnings / comportamento confuso.
 *    - Correção: manter alpha no renderer e setar clearColor com alpha 0 no onCreated.
 *
 * 2) CubeCamera com frames=Infinity:
 *    - Muito caro para um Hero (captura cubemap todo frame).
 *    - Correção: frames=1 (captura uma vez). Visual permanece “glass-like” e performance melhora.
 *
 * 3) Preload em module-scope (useGLTF.preload fora de efeitos):
 *    - Em alguns setups, pode causar erro em build/hidratação se algo tentar tocar window/document.
 *    - Correção: preload dentro de useEffect (client-only) e/ou guardas.
 *
 * 4) Falta de clearColor alpha:
 *    - Mesmo com gl.alpha=true, alguns drivers deixam fundo visível sem setClearColor(…, 0).
 *
 * 5) Interação/scroll sem throttle:
 *    - Scroll listener é OK, mas mantemos escrito para atualizar ref (sem setState) -> sem rerender.
 *
 * --------------------------------------------------------------------------
 * COMPORTAMENTOS (animação/interação)
 * --------------------------------------------------------------------------
 * - LOAD: container (Framer Motion) entra com opacity + scale + y
 * - ORB (R3F):
 *   - autoSpin (leve, futurista)
 *   - parallax via cursor (pointer.x/y)
 *   - scroll influencia um float vertical + tilt
 * - Reduced motion:
 *   - remove autoSpin forte, reduz amplitudes e limita custos (CubeCamera frames=1 sempre)
 *
 * Asset:
 * - default: /media/Torus_dan.glb (coloque em public/media)
 * - ou Supabase Storage public URL via prop modelUrl
 */

type HeroGlassOrbProps = {
  modelUrl?: string
  className?: string
}

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function damp(current: number, target: number, lambda: number, dt: number) {
  // aproximação estável para lerp com base no delta time
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt))
}

function getScrollProgress() {
  if (typeof window === 'undefined') return 0
  const doc = document.documentElement
  const max = Math.max(1, doc.scrollHeight - window.innerHeight)
  return clamp01(window.scrollY / max)
}

class WebGLErrorBoundary extends React.Component<
  { fallback?: React.ReactNode; children: React.ReactNode },
  { hasError: boolean; message?: string }
> {
  state = { hasError: false as boolean, message: undefined as string | undefined }

  static getDerivedStateFromError(error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    return { hasError: true, message }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex h-full w-full items-center justify-center rounded-xl bg-black/5 p-6 text-center text-xs text-black/50">
            WebGL indisponível: {this.state.message}
          </div>
        )
      )
    }
    return this.props.children
  }
}

function GlassOrbMesh({
  geometry,
  scrollRef,
  reducedMotion,
}: {
  geometry: THREE.BufferGeometry
  scrollRef: React.MutableRefObject<number>
  reducedMotion: boolean
}) {
  const groupRef = React.useRef<THREE.Group>(null!)
  const hoveredRef = React.useRef(false)

  const baseRotation = React.useMemo(() => new THREE.Euler(0.05, 0.15, 0), [])
  const basePosition = React.useMemo(() => new THREE.Vector3(0, 0, 0), [])

  useFrame((state, dt) => {
    const g = groupRef.current
    if (!g) return

    const t = state.clock.elapsedTime
    const sp = scrollRef.current

    // autoSpin mais “premium” quando hover (desktop)
    const hoverBoost = hoveredRef.current && !reducedMotion ? 1.25 : 1
    const autoSpin = reducedMotion ? 0 : t * 0.22 * hoverBoost

    const pointerX = reducedMotion ? 0 : state.pointer.x
    const pointerY = reducedMotion ? 0 : state.pointer.y

    // float leve (idle) + scrollFloat (page)
    const idleFloat = reducedMotion ? 0 : Math.sin(t * 0.85) * 0.04
    const scrollFloat = reducedMotion ? 0 : (sp - 0.15) * 0.55

    const targetPosY = basePosition.y + idleFloat + scrollFloat
    g.position.y = damp(g.position.y, targetPosY, 4.5, dt)

    const targetRotX = baseRotation.x + pointerY * 0.22 + sp * 0.24
    const targetRotY = baseRotation.y + pointerX * 0.34 + autoSpin
    const targetRotZ = baseRotation.z + pointerX * 0.08

    g.rotation.x = damp(g.rotation.x, targetRotX, 6.5, dt)
    g.rotation.y = damp(g.rotation.y, targetRotY, 6.5, dt)
    g.rotation.z = damp(g.rotation.z, targetRotZ, 6.5, dt)

    // entrada (scale) – começa menor e chega em 1
    const targetScale = 1
    g.scale.x = damp(g.scale.x, targetScale, 5.5, dt)
    g.scale.y = damp(g.scale.y, targetScale, 5.5, dt)
    g.scale.z = damp(g.scale.z, targetScale, 5.5, dt)
  })

  return (
    <group ref={groupRef} scale={0.78}>
      <CubeCamera resolution={256} frames={1}>
        {(texture) => (
          <mesh
            geometry={geometry}
            castShadow={false}
            receiveShadow={false}
            onPointerOver={() => {
              hoveredRef.current = true
            }}
            onPointerOut={() => {
              hoveredRef.current = false
            }}
          >
            <MeshRefractionMaterial
              envMap={texture}
              ior={1.12}
              bounces={2}
              fresnel={0.18}
              aberrationStrength={0.085}
              fastChroma
              color="#ffffff"
              toneMapped={false}
            />
          </mesh>
        )}
      </CubeCamera>
    </group>
  )
}

function GlassOrbModel({
  modelUrl,
  scrollRef,
  reducedMotion,
}: {
  modelUrl: string
  scrollRef: React.MutableRefObject<number>
  reducedMotion: boolean
}) {
  const gltf = useGLTF(modelUrl) as GLTF

  const geometry = React.useMemo(() => {
    let firstGeom: THREE.BufferGeometry | null = null
    gltf.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!firstGeom && (mesh as any).isMesh && mesh.geometry) firstGeom = mesh.geometry
    })
    // clone para evitar edge-cases de dispose/overrides em caches
    return firstGeom ? firstGeom.clone() : null
  }, [gltf])

  if (!geometry) return null

  // Em algumas exports, normals podem vir “fracas”; garantimos algo utilizável.
  // (computeVertexNormals é seguro, mas pode ser caro em geometria muito alta.
  // aqui é 1x no mount, OK pro Hero.)
  React.useEffect(() => {
    if (!geometry.attributes.normal) geometry.computeVertexNormals()
  }, [geometry])

  return <GlassOrbMesh geometry={geometry} scrollRef={scrollRef} reducedMotion={reducedMotion} />
}

function GlassOrbCanvas({
  modelUrl = '/media/Torus_dan.glb',
  className,
}: {
  modelUrl?: string
  className?: string
}) {
  const reducedMotionPref = useReducedMotion()
  const reducedMotion = !!reducedMotionPref

  const scrollRef = React.useRef(0)
  const eventSourceRef = React.useRef<HTMLDivElement>(null)
  const [eventSource, setEventSource] = React.useState<HTMLElement | undefined>(undefined)

  React.useEffect(() => {
    setEventSource(eventSourceRef.current ?? undefined)
  }, [])

  React.useEffect(() => {
    const onScroll = () => {
      scrollRef.current = getScrollProgress()
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  React.useEffect(() => {
    // preload client-only (evita edge cases em build/SSR)
    if (typeof window !== 'undefined') useGLTF.preload(modelUrl)
  }, [modelUrl])

  return (
    <div ref={eventSourceRef} className={className}>
      <WebGLErrorBoundary>
        <Canvas
          dpr={reducedMotion ? 1 : [1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          eventSource={eventSource}
          eventPrefix="client"
          style={{ background: 'transparent', touchAction: 'none' }}
          onCreated={(state) => {
            // garante alpha real no clear
            state.gl.setClearColor(0x000000, 0)
          }}
          fallback={
            <div className="flex h-full w-full items-center justify-center text-xs text-black/40">
              WebGL indisponível
            </div>
          }
        >
          <PerspectiveCamera makeDefault position={[0, 0, 4.2]} fov={42} />

          {/* luzes minimalistas (clean + futurista) */}
          <ambientLight intensity={0.62} />
          <directionalLight position={[4, 6, 2]} intensity={1.1} />
          <directionalLight position={[-4, -2, 3]} intensity={0.32} />

          {/* ambiente para refração */}
          <Environment preset="city" background={false} />

          <React.Suspense fallback={null}>
            <GlassOrbModel
              modelUrl={modelUrl}
              scrollRef={scrollRef}
              reducedMotion={reducedMotion}
            />
          </React.Suspense>
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}

export default function HeroGlassOrb({ modelUrl, className }: HeroGlassOrbProps) {
  return (
    <section className={['relative w-full bg-[#f3f3f3]', className].filter(Boolean).join(' ')}>
      {/* Header minimalista (logo + menu) */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded bg-white/70 ring-1 ring-black/10" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-tight text-black/80">danilo</span>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded bg-white/70 ring-1 ring-black/10 transition hover:bg-white"
          aria-label="Abrir menu"
        >
          <span className="block h-[2px] w-5 bg-black/70" />
          <span className="mt-1 block h-[2px] w-5 bg-black/70" />
        </button>
      </div>

      {/* Hero */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 pb-16 pt-10 lg:grid-cols-2 lg:items-center lg:pb-24 lg:pt-14">
        {/* Texto */}
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance text-[44px] font-black leading-[0.95] tracking-tight text-black sm:text-[64px] lg:text-[74px]"
          >
            <span className="text-[#0b57ff]">Design</span>, não é só estética.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-balance text-lg font-medium text-[#0b57ff] sm:text-xl"
          >
            [É intenção, é estratégia, é experiência.]
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <a
              href="#portfolio"
              className="inline-flex items-center gap-3 rounded-full bg-[#0b57ff] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-110"
            >
              get to know me better
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 ring-1 ring-white/20">
                <span className="text-base leading-none">↗</span>
              </span>
            </a>
          </motion.div>
        </div>

        {/* Orb (posicionamento e responsividade) */}
        <div className="relative z-0">
          <div className="pointer-events-none absolute -inset-x-10 -inset-y-8 blur-3xl">
            <div className="h-full w-full bg-gradient-to-tr from-[#0b57ff]/10 via-fuchsia-500/10 to-emerald-400/10" />
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-square w-full max-w-[520px]"
          >
            <GlassOrbCanvas modelUrl={modelUrl ?? '/media/Torus_dan.glb'} className="h-full w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// FILE: app/page.tsx (EXEMPLO DE USO)
// ============================================================================

export function PageExample() {
  return (
    <main>
      <HeroGlassOrb modelUrl="/media/Torus_dan.glb" />
      <div style={{ height: 1200 }} />
    </main>
  )
}

// ============================================================================
// FIM
// ============================================================================
