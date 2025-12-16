# ✅ Auditoria Técnica de Portfólio — Home (Next.js + R3F + Drei + Framer Motion + Tailwind)

Referências obrigatórias:
- Layout final: docs/HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg
- Documento funcional: docs/PORT DAN REVISADO - NEXT.pdf
- Repo: https://github.com/danilonovaisv/_danilonov_portfolio
- Site: https://portfoliodanilo.com

IMPORTANTE
- Manter 100% do conteúdo textual original e a imagem [HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg](títulos, botões, ordem de seções).
- Ajustes aqui são exclusivamente técnicos, estruturais e visuais.

------------------------------------------------------------
## 1) Visão Geral

- **Alinhamento geral** com o layout: bom — mesmas seções, ordem, paleta e tipografia compatíveis com o mock esperado.
- **Home** respeita as seções definidas no documento técnico:
  1. Header  
  2. Hero  
  3. Manifesto (vídeo)  
  4. Portfolio Showcase  
  5. Featured Projects  
  6. Clients / Brands  
  7. Contact  
  8. Footer  
- **Principais desvios em relação ao layout de referência (HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg):**
  - Hero não está configurada como **bloco sticky em 200vh** com progressão clara da thumb/vídeo manifesto no scroll.
  - Elemento 3D de vidro não está **espacialmente isolado na coluna direita**; visualmente, se aproxima demais do H1 em alguns breakpoints.
  - Header não evidencia um estado “**condensado + blur**” após ~40px de scroll, com redução de padding e leve sombra.
  - CTA / navegação “**sobre**” não está garantida de forma consistente como rota direta `/sobre` (há âncoras que podem gerar ambiguidade).
  - Footer não se comporta como **fixo** (fixed bottom-0) e há **inconsistência de ano** (2023 vs 2025).
- **Integração 3D/GLB**:
  - Há um elemento 3D de vidro coerente com o conceito (“bola de vidro” / torus), porém:
    - Não há garantia de uso de `Environment preset="city"` com `blur={1}` para reflexos realistas.
    - Parallax por mouse/scroll não está claramente presente ou é sutil demais.
    - Falta tiering de qualidade para mobile + respeito a `prefers-reduced-motion`.
- **Performance**:
  - O uso de materiais de transmissão (MeshTransmissionMaterial) é pesado.
  - O Canvas poderia limitar `dpr` e aplicar tiering de `samples` / `resolution`.
  - Mídias (Supabase) podem se beneficiar de `next/image` com domains configurados.

**Resumo:**  
A base estrutural está sólida e a comunicação visual é coerente com o mock. O principal ganho virá de um polimento técnico: Hero sticky com 3D/parallax + progressão do vídeo, header condensável, acessibilidade (motion reduction/foco) e otimização WebGL/mídias.

------------------------------------------------------------
## 2) Diagnóstico por Dimensão

### UX

- Fluxos principais bem definidos:
  - Hero com proposta clara e CTA “**get to know me better →**”.
  - Stripes de categorias em **Portfolio Showcase**, preparando mentalmente as áreas.
  - **Featured Projects** com cards clicáveis e CTA “view projects”.
  - Seção **Contact** completa (dados + formulário).
- Pontos de ajuste:
  - Garantir que o CTA da Hero leve sempre a **`/sobre`** (não a anchors ambíguas).
  - Thumb do manifesto: reforçar que o clique leva a `#manifesto`, com cursor/hover claros.
  - Footer: links devem espelhar a navegação principal de forma consistente (`home`, `portfólio showcase`, `sobre`, `contato`).

### UI

- **Tipografia e cor**:
  - Uso de azul `#0057FF` como cor de marca está coerente.
  - Hierarquia tipográfica condizente: H1 forte na Hero, títulos de seção evidentes.
- **Hero**:
  - Precisa respeitar com mais rigor o grid 2 colunas:
    - Esquerda: Tag `[BRAND AWARENESS]`, H1 (“Design, não é só estética.”), subtítulo `[É intenção, é estratégia, é experiência.]` e CTA.
    - Direita: Elemento 3D + tag lateral + thumb de vídeo manifesto.
- **Portfolio Showcase**:
  - Título `portfólio showcase` está ok.
  - **Microtexto lateral** `[what we love working on]` deve estar sempre visível, respeitando layout.
  - Stripes necessitam de ritmo melhor de espaçamentos (`py`, `gap`) para chegar mais próximo do mock.
- **Clients / Brands**:
  - Faixa azul com logos monocromáticos brancos.
  - Garantir aplicação de `filter brightness-0 invert` ou assets já invertidos.

### Animação

- **Hero**:
  - Esperado: seção **h-[200vh]** com inner `sticky top-0 min-h-screen`.
  - Título com entrada “3D flip” (rotateX + translateY + opacity) com `stagger`.
  - Elemento 3D com rotação contínua sutil + parallax pelo mouse.
  - Thumb do vídeo manifesto animando com `scrollYProgress` (escala, X, Y, border-radius).
- **Header**:
  - Esperado comportamento condensado:
    - De `py-4` para `py-2` após ~40px.
    - Adição de `bg-white/95`, `backdrop-blur` e sombra sutil.
- **Outras seções**:
  - Reveal on scroll para Portfolio Showcase stripes, Featured Projects cards e Clients logos.
- **Prefers-reduced-motion**:
  - Rotação contínua do 3D, parallax e animações complexas no título e thumb devem ter fallback simples (fades + pequenas translates).

### Acessibilidade

- **Foco visível**:
  - Garantir `focus-visible` em:
    - Links do header e footer.
    - CTAs da hero, stripes, cards de projetos, ícones sociais, botões do formulário.
- **Alt text**:
  - Imagens de projetos e logos de clientes devem ter `alt` descritivo:
    - Ex.: `"Logo cliente 1"` ou o nome real da marca, quando permitido.
- **ARIA / motion**:
  - `aria-label` em:
    - Links de navegação (“Ir para página Sobre”, “Ir para seção Contato”).
    - Ícones sociais (“Abrir perfil no LinkedIn em nova aba”).
    - Botão play/pause do manifesto.
  - `useReducedMotion` do Framer Motion aplicado à Hero e às reveals.
- **Vídeo manifesto**:
  - `muted playsInline autoPlay loop` para não reproduzir som automaticamente.
  - Idealmente, legenda ou transcrição em página dedicada (sugestão futura).

### Performance

- **3D**:
  - Limitar `dpr` do Canvas: `dpr={[1, 1.5]}`.
  - MeshTransmissionMaterial com **tiering**:
    - Desktop: `samples ≈ 12`, `resolution 768–1024`.
    - Mobile: `samples ≈ 4–6`, `resolution 512`, menor `anisotropy`.
  - `Environment preset="city" blur={1}` com `background={false}`.
- **Mídias (Supabase)**:
  - Usar `next/image` com domínio do Supabase configurado.
  - Garantir formatos `.webp` quando possível.
- **DOM/Animações**:
  - Todas animações via Framer Motion em `transform` / `opacity`.
  - Evitar mudanças de layout (height, width) durante animação.

### Arquitetura / Organização

- **App Router**:
  - Seções em **componentes dedicados**:
    - `SiteHeader.tsx`
    - `Hero.tsx` (+ `HeroGlassCanvas.tsx` / `Hero3D.tsx`)
    - `HeroVideoThumb.tsx`
    - `ManifestoSection.tsx`
    - `PortfolioShowcase.tsx`
    - `FeaturedProjects.tsx`
    - `ClientsBrands.tsx`
    - `ContactSection.tsx`
    - `SiteFooter.tsx`
- **3D**:
  - Cadeia clara: `Hero` → `HeroGlassCanvas` → `TorusDan` / `GlassOrb` → GLB em `public/media//media/torus_dan.glb`.
  - Carregamento de GLB via `useGLTF('/media//media/torus_dan.glb')`.
- **Conteúdo**:
  - Conteúdos globais (links, slugs, labels, URLs de mídia) preferencialmente centralizados em objeto `HOMEPAGE_CONTENT` ou similar.

------------------------------------------------------------
## 3) Análise Detalhada por Seção (Home)

### 3.1 Header (SiteHeader)

- **OK**:
  - Logo light carregada via Supabase.
  - 4 links principais: `home`, `sobre`, `portfolio showcase`, `contato`.
- **Ajustes sugeridos**:
  - Tornar o header **condensável** via Framer Motion (`useScroll` + `useTransform`).
  - Implementar `backdrop-blur` no estado scrolado.
  - Link “sobre” deve sempre apontar para `/sobre` (não `#clients`).
- **Acessibilidade**:
  - `aria-label` para logo e links.
  - Foco visível com `focus-visible:ring`.

### 3.2 Hero

- **Conteúdo (não alterar):**
  - Tag: `[BRAND AWARENESS]`
  - Título: `Design, não é só estética.`
  - Subtítulo: `[É intenção, é estratégia, é experiência.]`
  - CTA label: `get to know me better →` → `/sobre`
  - Modelo 3D: `/media/abstract_element.glb` ou `/media//media/torus_dan.glb`
- **Layout esperado**:
  - Seção com altura ≈ `200vh`, `bg-[#F4F5F7]`.
  - Container interno sticky: `sticky top-0 min-h-screen`.
  - 2 colunas em desktop:
    - Esquerda: textos + CTA.
    - Direita: Canvas 3D + thumb de vídeo manifesto.
- **3D / interação**:
  - `Canvas` com:
    - `dpr={[1, 1.5]}`
    - `camera={{ position: [0, 0, 4.2], fov: 45 }}`
    - `Environment preset="city" blur={1} background={false}`
    - Luzes: `ambientLight` + `directionalLight`.
  - Parallax:
    - Rotação do mesh reagindo ao `state.pointer` (mouse).
    - Scroll pode modular leve variação de `distortion`/`chromaticAberration`.
- **Thumb do vídeo manifesto**:
  - Inicialmente pequena, na borda direita superior do bloco 3D.
  - Com o scroll, escala e se desloca (X/Y) em direção ao header, com borda arredondada que vai reduzindo.
  - Clique: scroll suave até `#manifesto`.
  - Respeitar `prefers-reduced-motion` (thumb estática com fade simples).

### 3.3 Manifesto (Vídeo)

- **URL**:
  - `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`
- **Comportamento**:
  - Vídeo centralizado, autoplay, `muted`, `loop`, `playsInline`.
  - Overlay inferior com gradiente escuro + microtexto/badge.
  - Botão de play/pause com `aria-label` claro.
- **Animação**:
  - Entrada via fade + leve scale.
  - Badge de play com micro-movimento em hover.

### 3.4 Portfolio Showcase

- **Conteúdo (não alterar):**
  - Título: `portfólio showcase`
  - Microtexto lateral: `[what we love working on]`
  - Stripes:
    1. `Brand & Campaigns`
    2. `Videos & Motions`
    3. `Web Campaigns, Websites & Tech`
  - CTAs:
    - `VEJA MAIS →` → `/portfolio`
    - `let’s build something great →` → `/#contact`
- **Layout**:
  - Fundo `#F4F5F7`.
  - Microtexto lateral alinhado à esquerda da coluna.
  - Stripes como grandes linhas clicáveis, com divisor (`border-b`) entre elas.
- **Interação**:
  - Clique na stripe → `/portfolio?category=<id>` (ex.: `brand-campaigns`).
  - Bolinha azul (ícone circular) com pulso leve (loop longo).

### 3.5 Featured Projects

- **Conteúdo**:
  - Slugs, títulos, categorias, clientes, anos e URLs conforme especificação (`magic-radio-branding`, `branding-project-01`, etc.).
- **Layout**:
  - Grid responsivo (1–3 colunas) com cards.
  - Card especial “Like what you see? view projects” com CTA para `/portfolio`.
- **Animação**:
  - Reveal on scroll com `staggerChildren`.
  - Hover:
    - Card: leve elevação + sombra.
    - Imagem: `scale` + leve translateY.
- **Acessibilidade**:
  - `next/image` com alt descritivo.
  - Card inteiro clicável (`role="link"` / `<Link>`).

### 3.6 Clients / Brands

- **Conteúdo (não alterar)**:
  - Título: `marcas com as quais já trabalhei`
  - 12 logos via Supabase (`client1.svg` … `client12.svg`).
- **Layout**:
  - Faixa inteira azul `bg-[#0057FF]`.
  - Título centralizado.
  - Grid de logos com spacing consistente.
- **Interação**:
  - Hover leve nos logos (`scale` + `brightness`).
  - Reveal com `stagger` em Framer Motion.

### 3.7 Contact

- **Conteúdo (não alterar)**:
  - Título: `contato`
  - Subtítulo: `Tem uma pergunta ou quer trabalhar junto?`
  - Form action: `https://formsubmit.co/danilo@portfoliodanilo.com`
  - Dados de contato + redes sociais conforme especificação.
- **Layout**:
  - Duas colunas em desktop (info + form), uma no mobile.
  - Fundo branco.
- **Formulário**:
  - Inputs com `label` associado.
  - Foco visível (`ring-2 ring-blue-500`).
  - Botão “Enviar Mensagem” com microinterações (`whileHover`, `whileTap`).
- **Acessibilidade**:
  - Inputs com `aria-invalid`/mensagens em estados de erro (futuro).
  - Navegável 100% por teclado.

### 3.8 Footer

- **Conteúdo**:
  - Copyright:
    - Unificar para: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
  - Links:
    - `home` → `#hero`
    - `portfólio showcase` → `#portfolio-showcase`
    - `sobre` → **/sobre** (ajuste recomendado)
    - `contato` → `#contact`
- **Layout**:
  - Barra fixa (`fixed bottom-0 left-0 right-0`).
  - Fundo azul `bg-[#0057FF]`, texto branco.
- **Interação**:
  - Hover com sublinhado animado (matching ao header).
  - Ícones sociais com leve `scale` + mudança de opacidade.

------------------------------------------------------------
## 4) Lista de Problemas (Severidade)

### Alta

1. **Hero sem comportamento sticky 200vh**:
   - Falta `h-[200vh]` com container interno `sticky top-0 min-h-screen`.
   - Thumb do manifesto não progride de forma clara com o scroll.
2. **Elemento 3D sem parallax/scroll robusto**:
   - Rotação e parallax não estão totalmente alinhados ao conceito de “bola de vidro líquido” descrito no anexo.
   - Ausência clara de Environment “city” com `blur={1}`.
3. **Header sem estado condensado + blur**:
   - Não há transição suave de padding/background/sombra após ~40px.

### Média

4. **Rota “sobre” inconsistente**:
   - Em parte do fluxo (footer), `sobre` aponta para `#clients` — o recomendado é `/sobre`.
5. **Footer não fixo e ano inconsistente**:
   - Footer não está fixo em todas as views.
   - Anos 2023 / 2025 misturados.
6. **Prefers-reduced-motion não aplicado globalmente**:
   - Animações da Hero (título, 3D, thumb) e reveals não respeitam claramente `useReducedMotion`.

### Baixa

7. **Microtexto `[what we love working on]` ausente/ fraco** na Portfolio Showcase.
8. **Gaps/paddings** levemente divergentes do mock entre stripes, CTAs e cards.
9. **Alt de imagens/logos** genéricos ou ausentes.
10. **Hover/foco** inconsistente em stripes, logos e ícones sociais.

------------------------------------------------------------
## 5) Recomendações Prioritárias

1. **Implementar Hero sticky + parallax 3D + animação da thumb do manifesto**:
   - Estruturar seção com `h-[200vh]` e inner sticky.
   - Integrar R3F + Drei + Framer Motion para título, 3D e thumb.
2. **Implementar Header condensado com blur no scroll**:
   - `useScroll` + `useTransform` para `padding`, `backgroundColor` e `boxShadow`.
3. **Otimizar WebGL / MeshTransmissionMaterial**:
   - Aplicar tiering (desktop vs mobile).
   - Limitar `dpr`.
   - Adicionar `Environment preset="city" blur={1}`.
4. **Endereçar Acessibilidade e Motion-Reduction**:
   - Foco visível em todas as interações.
   - `useReducedMotion` aplicado à Hero, stripes, cards e logos.
5. **Ajustes de navegação e rotas**:
   - Garantir CTA “get to know me better →” → `/sobre`.
   - Ajustar link de `sobre` no footer para `/sobre`.
6. **Polimento visual em Showcase/Featured/Clients**:
   - Microtexto lateral, ícones circulares, hovers, stagger, uso consistente de `next/image`.

------------------------------------------------------------
## 6) Prompts Técnicos de Ajuste (com código)

### 6.1 Header condensável no scroll (Framer Motion + Tailwind)

```tsx
'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'

export function SiteHeader() {
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 40], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.95)'])
  const py = useTransform(scrollY, [0, 40], ['1rem', '0.5rem']) // py-4 → py-2
  const shadow = useTransform(
    scrollY,
    [0, 40],
    ['0 0 0 rgba(0,0,0,0)', '0 4px 24px rgba(0,0,0,0.06)'],
  )

  return (
    <motion.header
      style={{
        backgroundColor: bg,
        paddingTop: py,
        paddingBottom: py,
        boxShadow: shadow,
        backdropFilter: 'blur(8px)',
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4">
        <Link
          href="/"
          aria-label="Ir para Home"
          className="focus:outline-none focus-visible:ring ring-blue-500 rounded"
        >
          <img
            src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg"
            alt="Danilo Novais — logo"
            className="h-6"
          />
        </Link>
        <ul className="flex items-center gap-6 text-sm text-gray-700">
          <li>
            <Link
              href="/#hero"
              aria-label="Ir para seção Hero"
              className="hover:text-[#0057FF] transition-colors"
            >
              home
            </Link>
          </li>
          <li>
            <Link
              href="/sobre"
              aria-label="Ir para página Sobre"
              className="hover:text-[#0057FF] transition-colors"
            >
              sobre
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio"
              aria-label="Ir para página Portfólio"
              className="hover:text-[#0057FF] transition-colors"
            >
              portfolio showcase
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              aria-label="Ir para seção Contato"
              className="hover:text-[#0057FF] transition-colors"
            >
              contato
            </Link>
          </li>
        </ul>
      </nav>
    </motion.header>
  )
}
6.2 Hero sticky 200vh + Canvas + parallax + animação da thumb
'use client'

import * as React from 'react'
import type { Mesh } from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshTransmissionMaterial, Html, useProgress } from '@react-three/drei'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="rounded bg-black/70 px-3 py-1 text-xs text-white">
        Carregando {progress.toFixed(0)}%
      </div>
    </Html>
  )
}

function GlassOrb() {
  const ref = React.useRef<Mesh | null>(null)

  useFrame((state) => {
    const r = ref.current
    if (!r) return
    const { x, y } = state.pointer
    // parallax suave com damp
    const targetY = x * 0.6
    const targetX = y * 0.4
    r.rotation.y += (targetY - r.rotation.y) * 0.08
    r.rotation.x += (targetX - r.rotation.x) * 0.08
  })

  const isMobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches

  const quality = isMobile
    ? { samples: 6, resolution: 512, anisotropy: 0 }
    : { samples: 12, resolution: 768, anisotropy: 0.2 }

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.1, 24]} />
      <MeshTransmissionMaterial
        transmission={1}
        thickness={0.6}
        roughness={0.08}
        ior={1.25}
        chromaticAberration={0.05}
        distortion={0.5}
        distortionScale={0.36}
        temporalDistortion={0.22}
        backside
        {...quality}
      />
    </mesh>
  )
}

export function HeroSection() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()

  // animação da thumb do manifesto
  const thumbScale = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0.9, 1.05, 1.25, 1.4])
  const thumbY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -120, -260])
  const thumbX = useTransform(scrollYProgress, [0, 1], [0, -120])
  const thumbRadius = useTransform(scrollYProgress, [0, 1], [16, 0])

  return (
    <section id="hero" className="relative h-[200vh] bg-[#F4F5F7]">
      <div className="sticky top-0 grid min-h-screen grid-cols-1 items-center gap-8 px-6 py-8 md:grid-cols-2">
        {/* Coluna Esquerda - Texto */}
        <div className="z-10">
          <div className="mb-2 text-sm font-medium text-[#0057FF]">[ BRAND AWARENESS ]</div>
          <h1 className="text-5xl font-extrabold leading-tight text-[#111111] md:text-7xl">
            <motion.span
              initial={{ opacity: 0, y: reduce ? 0 : 26, rotateX: reduce ? 0 : -35 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="block"
            >
              Design,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: reduce ? 0 : 26, rotateX: reduce ? 0 : -35 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="block"
            >
              não é só
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: reduce ? 0 : 26, rotateX: reduce ? 0 : -35 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="block"
            >
              estética.
            </motion.span>
          </h1>
          <p className="mt-4 inline-block rounded-md bg-white/70 px-3 py-2 text-[#0057FF] backdrop-blur">
            [ É intenção, é estratégia, é experiência. ]
          </p>
          <div className="mt-6">
            <motion.a
              href="/sobre"
              aria-label="Ir para página Sobre"
              whileHover={reduce ? {} : { y: -2, scale: 1.02 }}
              whileTap={reduce ? {} : { y: 0, scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0057FF] px-5 py-3 text-sm font-medium text-white shadow transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0057FF]"
            >
              get to know me better →
            </motion.a>
          </div>
        </div>

        {/* Coluna Direita - 3D + Thumb */}
        <div className="relative">
          <div className="h-[380px] w-full rounded-2xl md:h-[520px]">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 4.2], fov: 45 }}
              eventSource={typeof document !== 'undefined' ? document.body : undefined}
            >
              <React.Suspense fallback={<Loader />}>
                <Environment preset="city" blur={1} background={false} />
                {!reduce && <GlassOrb />}
                {reduce && (
                  <Html center>
                    <div className="rounded bg-white/80 px-3 py-1 text-xs text-[#111]">
                      Elemento 3D
                    </div>
                  </Html>
                )}
                <ambientLight intensity={0.15} />
                <directionalLight position={[4, 6, 6]} intensity={1.1} />
              </React.Suspense>
            </Canvas>
          </div>

          {/* Thumb do vídeo manifesto */}
          <motion.button
            type="button"
            onClick={() => {
              const el = document.getElementById('manifesto')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
            }}
            aria-label="Ir para o vídeo Manifesto"
            className="pointer-events-auto absolute right-2 top-2 md:right-4 md:top-4"
            style={
              reduce
                ? {}
                : {
                    scale: thumbScale,
                    y: thumbY,
                    x: thumbX,
                    borderRadius: thumbRadius,
                  }
            }
          >
            <video
              src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
              autoPlay
              playsInline
              muted
              loop
              className="h-28 w-44 rounded-xl object-cover shadow-lg"
            />
          </motion.button>
        </div>
      </div>
    </section>
  )
}
6.3 Cadeia Hero → HeroGlassCanvas → GLB (gltfjsx)
# gerar componente jsx/tSX a partir do GLB
npx gltfjsx public/media//media/torus_dan.glb --transform
// components/TorusDan.tsx
'use client'

import * as React from 'react'
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei'

type GLTFResult = {
  nodes: {
    Torus: THREE.Mesh
  }
} & THREE.Group

export function TorusDan(props: JSX.IntrinsicElements['group']) {
  const { nodes } = useGLTF('/media//media/torus_dan.glb') as unknown as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Torus.geometry}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.6}
          ior={1.25}
          roughness={0.08}
          chromaticAberration={0.05}
          distortion={0.5}
          distortionScale={0.36}
          temporalDistortion={0.22}
          samples={12}
          resolution={768}
          backside
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/media//media/torus_dan.glb')
6.4 Prefers-reduced-motion global
import { useReducedMotion } from 'framer-motion'

export function useMotionSettings() {
  const reduce = useReducedMotion()

  const fadeInUp = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } }

  return { reduce, fadeInUp }
}
6.5 Footer fixo com ano unificado
import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 bg-[#0057FF] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <p>© 2025 Danilo Novais Vilela — todos os direitos reservados.</p>
        <nav aria-label="Navegação de rodapé">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/#hero"
                aria-label="Ir para seção Hero"
                className="relative inline-flex items-center gap-1 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                home
              </Link>
            </li>
            <li>
              <Link
                href="/#portfolio-showcase"
                aria-label="Ir para seção Portfolio Showcase"
                className="relative inline-flex items-center gap-1 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                portfólio showcase
              </Link>
            </li>
            <li>
              <Link
                href="/sobre"
                aria-label="Ir para página Sobre"
                className="relative inline-flex items-center gap-1 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                sobre
              </Link>
            </li>
            <li>
              <Link
                href="/#contact"
                aria-label="Ir para seção Contato"
                className="relative inline-flex items-center gap-1 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
              >
                contato
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
6.6 next/image + Supabase
import Image from 'next/image'

type ProjectCardProps = {
  title: string
  client: string
  year: string
  category: string
  href: string
  imageUrl: string
}

export function ProjectCard({ title, client, year, category, href, imageUrl }: ProjectCardProps) {
  return (
    <a
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Projeto ${title} — ${category}`}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03] group-hover:-translate-y-1"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="space-y-1 px-4 pb-4 pt-3">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {client} • {year} • {category}
        </p>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
    </a>
  )
}
6.7 Formulário de contato (labels + focus-visible)
export function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/danilo@portfoliodanilo.com"
      method="POST"
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="name">
          Nome
        </label>
        <input
          id="name"
          name="name"
          required
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="message">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-[#0057FF] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition will-change-transform hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
      >
        Enviar Mensagem
      </button>
    </form>
  )
}
7) Reforço — Uso Obrigatório da Imagem de Referência
Todas as decisões visuais (posicionamento, grid, espaçamentos, proporções, cores, hierarquia, tamanho da Hero, posição da thumb, ritmo das stripes, etc.) devem seguir estritamente o arquivo docs/HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg como fonte de verdade.

O PDF PORT DAN REVISADO - NEXT.pdf orienta lógica, ordem das seções e copy; a imagem final é a régua de fidelidade visual.

8) Checklist de Aceite (Home)


Header “condensado + blur” após scroll, com transição suave.



Hero com h-[200vh] + bloco interno sticky (sticky top-0 min-h-screen).



Título da Hero animado (flip/fade) com fallback prefers-reduced-motion.



Elemento 3D com Environment preset="city" blur={1}, parallax (mouse/scroll), tiering de qualidade e dpr limitado.



Thumb do manifesto animando com scroll (scale/pos/borda), clicável e com autoplay mudo.



Portfolio Showcase com microtexto lateral [what we love working on] e 3 stripes com hover/ícone.



Featured Projects com hover sutil, imagens otimizadas (next/image) e alt descritivos.



Clients/Brands com faixa azul, logos invertidos e reveal staggered.



Contact com labels, focus-visible, action correta e microinterações.



Footer fixo, ano unificado © 2025 ... e links corretos (incluindo /sobre).

9) Próximos Passos Sugeridos
S1: Implementar Hero sticky + parallax/scroll (3D + thumb) e Header condensado.

S2: Otimizar WebGL/mídias (tiering MeshTransmissionMaterial + next/image + headers de cache no Firebase).

S3: Endereçar acessibilidade (focus-visible + motion-reduction + alt/aria).

S4: Polir UI/UX (gaps, microtexto, hovers) e unificar rotas/ano em todo o site.

10) Observações Finais
A base atual já comunica bem a proposta de valor e utiliza um stack moderno (Next.js App Router + R3F + Drei + Framer Motion + Tailwind).

O próximo salto de qualidade vem da fidelidade fina ao layout da Home, da Hero 3D sticky com narrativa de scroll e da camada de performance e acessibilidade.

As recomendações acima mantêm 100% do conteúdo textual original, focando exclusivamente em melhorias técnicas, estruturais e visuais. */
