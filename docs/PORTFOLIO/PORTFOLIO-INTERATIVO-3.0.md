# PORTFOLIO PAGE — TECHNICAL SPECIFICATION (Ghost Design System)

> Página: **Portfolio Showcase** (Next.js App Router + TS)  
> Stack: **Framer Motion** (2D), **Lenis** (scroll smoothing), **R3F/Three.js + Drei** (3D ambience opcional), **Tailwind** (design tokens)  
> Referências: Parallax Lerp (Ref 1), Finch Grid (Ref 2), Layout final (Ref 3: imagens desktop/mobile)

---

## 📋 1. PAGE OBJECTIVE & USER JOURNEY

### Primary Function
Exibir **trabalhos selecionados** com um layout editorial (grid denso) e sensação premium (parallax/lerp), reforçando autoridade e facilitando contato.

### User Action (CTA)
- CTA primário: **“vamos trabalhar juntos →”** (leva para seção **Contato** via scroll / anchor)
- CTA secundário: clicar em um **ProjectCard** para abrir **Modal** (ou rota interna) com detalhes do case.

### Site Contribution
- Eleva conversão (lead) mostrando repertório e confiança social (seção de marcas).
- Reduz fricção: navegação clara → ver trabalhos → validar (brands) → contato.

### User Journey (fit)
**Home/Sobre → Portfolio Showcase → Modal do Projeto → Brands → Contato → Conversão**

### Success Metrics
- CTR do CTA hero: ≥ 3–6%
- Abertura de modal (por card): ≥ 15–30%
- Envio de formulário: ≥ 1–3%
- Web Vitals: LCP < 2.5s, CLS < 0.1, INP “good”

---

## 🎨 2. CONTENT STRUCTURE

### 2.1 Estrutura Semântica (alto nível)

tsx
export default function PortfolioPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProjectsGallery />
        <BrandsSection />
        <ContactSection />
      </main>
      <Footer />
      <PortfolioModalRoot />
    </>
  )
}
----

### 2.2 Hero Section (vídeo looping + CTA)

Elementos:
    •    Video BG (desktop/mobile)
    •    Overlay gradient
    •    Headline: “portfólio showcase” (ênfase no “portfólio”)
    •    CTA alinhado na mesma linha visual do título (desktop) e adaptado no mobile

<section
  id="top"
  aria-label="Hero — Portfólio"
  className="relative h-[100svh] overflow-hidden"
>
  <HeroVideo />
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
  <div className="relative z-10 h-full">
    <div className="mx-auto flex h-full max-w-[1680px] items-end px-6 pb-14 md:px-12 lg:px-16 xl:px-24">
      <div className="w-full">
        <div className="flex flex-col items-center gap-5 md:flex-row md:items-end md:justify-center md:gap-8">
          <h1 className="text-center md:text-left text-h1 font-bold tracking-tight text-white">
            <span className="text-[color:var(--text-emphasis)]">portfólio</span>{" "}
            showcase
          </h1>

          <a
            href="#contato"
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--blue-primary)] px-6 py-3 text-sm font-medium text-white transition-transform duration-300 will-change-transform hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--text-highlight)]"
          >
            vamos trabalhar juntos
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

###HeroVideo (desktop/mobile)

Assets:
    •    desktop: video-heroPort.mp4
    •    mobile: video-heroPort-mobile.mp4 (host: Supabase storage)

Regras:
    •    muted + playsInline obrigatório para autoplay mobile
    •    preload="metadata" (evita travar rede)
    •    poster recomendado (evita flash)
    •    pausar vídeo se fora da viewport (IO)

function HeroVideo() {
  return (
    <video
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/posters/portfolio-hero.jpg"
    >
      <source
        src="https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort-mobile.mp4"
        media="(max-width: 768px)"
        type="video/mp4"
      />
      <source
        src="https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort.mp4"
        type="video/mp4"
      />
    </video>
  )
}


⸻

## 2.3 Projects Gallery (grid editorial + parallax lerp)

Elementos:
    •    Título de seção (pode ser “selected work” / “projects” — editorial)
    •    Grid editorial dense
    •    Cards clicáveis (abrem modal)
    •    Placeholder blocks (neutros) para ritmo visual (como no layout final)
    •    Botão “veja mais” (opcional) para expandir/paginar

Comportamento por viewport:
    •    Desktop: CSS Grid 12 colunas, spans variados (2x1, 3x2 etc)
    •    Tablet: simplifica spans (menos variação)
    •    Mobile: vira lista vertical (cards full-width)

⸻

## 2.4 Brands / Clients

Seção de confiança social com logos (como no layout final). Ex.:
O mesmo das paginas anteres

⸻

2.5 Contact
    •    bloco claro (contraste forte)
    •    lista de contatos + formulário
    •    validação, feedback de loading/sucesso/erro

⸻

🎨 3. VISUAL IDENTITY SYSTEM (Ghost)

3.1 Color Tokens

:root {
  --blue-primary: #0048ff;
  --blue-accent: #4fe6ff;
  --purple-details: #8705f2;
  --pink-details: #f501d3;

  --bg: #040013;
  --bg-light: #f0f0f0;

  --text: #fcffff;
  --text-inverse: #0e0e0e;

  --text-emphasis: #2e85f2;
  --text-highlight: #4fe6ff;
  --text-secondary: #a1a3a3;

  --neutral: #0b0d3a;
  --neutral-light: #f5f5f5;
}

### 3.2 Typography Scale (clamp)

:root {
  --font-display: clamp(2.5rem, 5vw, 4.5rem);
  --font-h1:      clamp(2rem, 4vw, 3.5rem);
  --font-h2:      clamp(1.5rem, 3vw, 2.5rem);
  --font-h3:      clamp(1.25rem, 2vw, 1.75rem);
  --font-body:    clamp(1rem, 1.2vw, 1.125rem);
  --font-small:   0.875rem;
  --font-micro:   0.75rem;
}

###3.3 Grid & Spacing (Ghost Grid)
    •    Mobile: 4 cols, gap 16px, px 24
    •    Tablet: 8 cols, gap 24px, px 48
    •    Desktop: 12 cols, gap 32px, px 64, max 1440
    •    Wide: 12 cols, gap 40px, px 96, max 1680

Container padrão:

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1680px] px-6 md:px-12 lg:px-16 xl:px-24">
      {children}
    </div>
  )
}




## 🎬 4. 3D SCENE CONFIGURATION (R3F) — OPCIONAL / AMBIENT ONLY

Objetivo do 3D aqui é atmosfera (glow/partículas leves) sem competir com conteúdo.
Regras: não bloquear interações (z-index), respeitar prefers-reduced-motion, desligar no mobile low-end.

4.1 Canvas Layer (background)

'use client'

import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

export function GhostAmbientScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 40 }}
      >
        <fog attach="fog" args={['#040013', 6, 16]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[4, 6, 4]} intensity={0.9} />
        <Environment preset="city" />
        <GhostParticles />
      </Canvas>
    </div>
  )
}

4.2 Parallax de câmera (scroll-linked, leve)
    •    Mapear scrollYProgress → camera.position com clamp
    •    Atualizar com useFrame e lerp (suave)

'use client'

import { useFrame } from '@react-three/fiber'
import { useScroll } from 'framer-motion'
import { useRef } from 'react'
import * as THREE from 'three'

export function CameraParallax() {
  const ref = useRef<THREE.PerspectiveCamera | null>(null)
  const { scrollYProgress } = useScroll()

  useFrame(({ camera }) => {
    const t = scrollYProgress.get()
    const targetZ = 6 + t * 0.8
    const targetY = -t * 0.6
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.06)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.06)
    camera.lookAt(0, 0, 0)
  })

  return null
}


⸻

# 🎭 **5. ANIMATION SYSTEM (Framer Motion + Lenis)**

5.1 Ghost Easing

export const GHOST_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

5.2 Reveal editorial (fade up) — padrão

import { motion } from 'framer-motion'
import { GHOST_EASE } from '@/lib/motion'

export function FadeUp({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8, ease: GHOST_EASE }}
    >
      {children}
    </motion.div>
  )
}

5.3 Scroll Lerp (Ref 1) — sem “hijack” perceptível

Princípio: manter scroll nativo, mas usar lerp para animar transform do track.

export function lerp(current: number, target: number, alpha: number) {
  return current + (target - current) * alpha
}

Hook:

'use client'

import { useEffect, useRef } from 'react'
import { lerp } from '@/lib/math'

export function useScrollLerp(alpha = 0.08) {
  const current = useRef(0)
  const target = useRef(0)

  useEffect(() => {
    const onScroll = () => { target.current = window.scrollY }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf = 0
    const tick = () => {
      current.current = lerp(current.current, target.current, alpha)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [alpha])

  return { current, target }
}

Aplicação no GalleryTrack:

'use client'

import { useEffect, useRef } from 'react'
import { useScrollLerp } from '@/hooks/useScrollLerp'

export function GalleryTrack({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { current } = useScrollLerp(0.085)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      const el = ref.current
      if (el) el.style.transform = `translate3d(0, ${-current.current}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [current])

  return (
    <div className="relative">
      <div ref={ref} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}

Observação: para evitar “double scroll”, o wrapper pode usar altura real do conteúdo (spacer) e o track ficar fixed (modelo Ref 1). Em mobile/tablet, pode desligar o fixed track e usar scroll normal.

## **5.4 Parallax interno por card (subtle)**
    •    Mapear posição do card vs viewport para deslocar imagem interna (Y)
    •    IntersectionObserver + requestAnimationFrame (barato) ou useScroll com ref

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function CardMediaParallax({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="h-[110%] w-full object-cover"
        loading="lazy"
      />
    </div>
  )
}

## **5.5 Hover / press feedback (desktop/touch)**
    •    Desktop: hover eleva + leve scale + brilho
    •    Touch: active:scale-[0.99] + feedback rápido

⸻

# **📱 6. RESPONSIVE LAYOUT**

6.1 Grid editorial (desktop)

CSS Grid com dense:

<section
  aria-label="Galeria de Projetos"
  className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4 md:gap-8"
>
  {/* Card */}
  <article className="col-span-4 md:col-span-4 lg:col-span-6 lg:row-span-2">...</article>
  <article className="col-span-4 md:col-span-4 lg:col-span-6 lg:row-span-1">...</article>
</section>

Dense + placeholders:

.projects-grid {
  display: grid;
  grid-auto-flow: dense;
}

6.2 Tablet (768–1024)
    •    reduz row-spans agressivos
    •    prioriza legibilidade e ritmo
    •    mantém hover simples

6.3 Mobile (<768)
    •    lista vertical (col-span full)
    •    remove placeholders “vazios” (ou substitui por separadores)
    •    desliga 3D + reduz parallax para evitar custo e enjoo

⸻

♿ 7. ACCESSIBILITY & SEO

7.1 Estrutura semântica
    •    header/nav/main/section/footer
    •    Headings: um H1 (Hero), H2 por seção, H3 por card

7.2 Modal acessível
    •    role="dialog" aria-modal="true"
    •    foco preso no modal (focus trap)
    •    fechar com Esc, clicar fora (opcional), botão fechar com label
    •    restaurar foco no card ao fechar

7.3 Keyboard navigation
    •    Cards: button ou a com href e foco visível
    •    “Skip to content” no topo

7.4 Reduced motion
    •    se prefers-reduced-motion: reduce:
    •    desliga parallax/lerp
    •    troca reveals por fade simples
    •    desliga Canvas

7.5 SEO (App Router)
    •    export const metadata com title/description/OG
    •    og:image (thumb do portfolio)
    •    schema.org (CreativeWork/Person/Portfolio) via JSON-LD

export const metadata = {
  title: 'Portfólio — Showcase',
  description: 'Seleção de projetos e cases em design e direção de arte.',
  openGraph: { title: 'Portfólio — Showcase', images: ['/og/portfolio.jpg'] },
}


⸻

# **⚙️ 8. TECHNICAL ARCHITECTURE (Next.js App Router)

8.1 Client vs Server boundary
    •    Server: page shell, metadata, fetch de projetos (se vier de CMS)
    •    Client: Hero video behaviors, animations, modal, parallax, R3F

Padrão:
    •    app/portfolio/page.tsx (Server)
    •    app/portfolio/_components/* (Client quando necessário)

8.2 Data model (Projects)

export type Project = {
  id: string
  title: string
  client?: string
  year?: string
  cover: { src: string; alt: string }
  tags?: string[]
  layout: { colSpanLg: number; rowSpanLg: number; colSpanMd?: number }
  kind: 'typeA' | 'typeB'
}

8.3 Modal routing (2 opções)
    1.    State modal (simples): useState(activeProject)
    2.    Parallel routes (elegante): @modal/(.)project/[id] (URL compartilhável)

8.4 Folder structure (sugestão)

app/
└── portfolio/
    ├── page.tsx
    ├── _components/
    │   ├── HeroSection.tsx
    │   ├── ProjectsGallery/
    │   │   ├── ProjectsGallery.tsx
    │   │   ├── GalleryTrack.tsx
    │   │   ├── ProjectCard.tsx
    │   │   └── placeholders.ts
    │   ├── BrandsSection.tsx
    │   ├── ContactSection.tsx
    │   └── PortfolioModal/
    │       ├── PortfolioModalRoot.tsx
    │       ├── ModalShell.tsx
    │       ├── ProjectTypeA.tsx
    │       └── ProjectTypeB.tsx
    ├── _data/
    │   └── projects.ts
    └── _hooks/
        ├── useScrollLerp.ts
        └── usePrefersReducedMotion.ts
lib/
├── motion.ts
└── math.ts

8.5 Fallbacks necessários
    •    Skeleton para grid (placeholder shimmer leve)
    •    Error boundary para modal/load de assets
    •    Imagens com loading="lazy" (ou next/image com sizes)
    •    Video com poster + fallback de imagem caso falhe

⸻

# **📊 9. PERFORMANCE METRICS (Targets)**
    •    Lighthouse: > 90
    •    FCP: < 1.5s
    •    LCP: < 2.5s
    •    CLS: < 0.1
    •    INP: “Good”
    •    FPS (scroll): ~60 em desktop, ~45–60 em mobile high-end

Técnicas-chave:
    •    dynamic import do R3F (ssr: false)
    •    desativar efeitos no mobile / reduced motion
    •    compressão de thumbs (AVIF/WebP)
    •    limitar blur/glow e camadas com backdrop-filter

⸻

# **✅ 10. QUALITY CHECKLIST**
    •    TS 100% tipado (data + props)
    •    Semântica correta (1 H1)
    •    Focus states + navegação por teclado
    •    Modal acessível (trap + esc)
    •    Reduced motion respeitado
    •    Lint/format ok
    •    Imagens otimizadas e lazy
    •    3D opcional e não bloqueia UI
    •    Web Vitals dentro dos targets
    •    SEO (metadata + OG + JSON-LD)

⸻

🧩 IMPLEMENTATION NOTES (pixel-perfect com Ref 3)
    •    Manter “ritmo editorial”:
    •    cards grandes alternados
    •    blocos neutros (placeholders) para composição desktop
    •    seção Brands com fundo --blue-primary
    •    Contato em --bg-light com texto --text-inverse
    •    Hero: título + CTA alinhados na mesma “linha visual” e posicionados na base do hero (desktop).
    •    Mobile: hero mantém foco no texto e CTA com hit-area grande; grid vira coluna com previews amplos.

Se você quiser, eu adapto essa especificação para **um set de spans exato (colSpan/rowSpan)** reproduzindo 1:1 o layout do desktop da imagem (incluindo os placeholders), já no formato de um `projects.ts` pronto para renderizar no grid.
