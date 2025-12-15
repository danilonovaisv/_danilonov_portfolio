'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Auditoria (Markdown) do site https://portfoliodanilo.com
 * Observação: este relatório foi gerado SEM acesso ao repositório do site.
 * Ele serve como auditoria conceitual + checklist objetivo de validação + propostas de diffs P0/P1.
 */
export const auditMarkdown = String.raw`# A) Escopo Auditável
- Páginas encontradas:
  - \`/\` (Home) — evidência via screenshots fornecidos
  - \`/sobre\` — **não confirmado sem repo/sitemap** (pode ser rota ou âncora)
  - \`/portfolio\` — **não confirmado sem repo/sitemap** (pode ser rota ou âncora)
  - \`/contato\` — **não confirmado sem repo/sitemap** (pode ser rota ou âncora)
  - Outras: \`/portfolio/[slug]\` (cases) — **hipótese comum em portfólios; confirmar**

- Seções por página
  - \`/\` (Home)
    - Header / Navigation (logo + links + menu mobile)
    - Hero (headline “Design, não é só estética.” + subcopy + CTA + elemento 3D/visual)
    - Portfolio Showcase (mosaico/vídeo/preview de trabalhos)
    - Categorias/Clusters (ex: “Brand & Campaigns”, “Videos & Motions”, “Web Campaigns, Websites & Tech”)
    - Grid de projetos / Cards (com thumbnails)
    - CTA (“Like what you see?”)
    - Marcas/Clientes (logos em faixa)
    - Contato (infos + form)
    - Footer (social/assinatura)
  - \`/sobre\` (hipótese)
    - Hero sobre / bio curta
    - Skills / stack / serviços
    - Timeline / experiência
    - CTA para contato
  - \`/portfolio\` (hipótese)
    - Filtros / categorias
    - Lista de cases (cards)
    - Página de case (gallery, contexto, resultados, próximos cases)
  - \`/contato\` (hipótese)
    - Hero / intro
    - Form + canais
    - Confirmação de envio / estados de erro

---

# B) Matriz de Achados (por página → por seção)

## [/ (Home)] → [Header / Navigation]
**1) Sintoma observado**
- Mobile: ícone de menu (hamburger) dentro de um quadrado; não é possível validar área de toque, foco e rótulo acessível via screenshot.
- Desktop: links no topo com espaçamento pequeno e hierarquia visual fraca vs. hero (risco de “sumir”).
- Possível inconsistência entre nav desktop e mobile (links vs drawer), comum em implementações rápidas.

**2) Causa provável (técnica)**
- Botão de menu sem \`aria-label\` / \`aria-expanded\` / \`aria-controls\`.
- Falta de “skip link” e ordem de foco previsível.
- Falta de estados \`:focus-visible\` consistentes (Tailwind) e/ou outline removido globalmente.

**3) Impacto**
- UX: médio (navegação em mobile pode ficar “não óbvia” ao teclado)
- Visual premium: médio (hierarquia da barra pode parecer “genérica”)
- A11y: **alto**
- Performance: baixo
- SEO: baixo

**4) Severidade e prioridade**
- Severidade: **Alta**
- Prioridade: **P0**

**5) Checklist de validação**
- Responsividade:
  - Menu no mobile abre/fecha sem saltos de layout (CLS) e sem travar scroll do body indevidamente.
- A11y:
  - Botão tem \`aria-label="Abrir menu"\`, alterna \`aria-expanded\`.
  - Drawer: foco preso dentro, fecha com \`Esc\`, retorna foco ao botão.
  - Links acessíveis por teclado em ordem lógica.
- Performance:
  - Drawer não carrega JS pesado desnecessário.
- Animações:
  - Transição suave, respeita \`prefers-reduced-motion\`.

---

## [/ (Home)] → [Hero]
**1) Sintoma observado**
- Hero com elemento visual/3D (knot/forma iridescente) e tipografia muito dominante: risco de CLS/LCP alto se 3D/imagem/vídeo não for bem controlado.
- Em mobile, grande empilhamento vertical (logo → 3D → headline → CTA), risco de “above-the-fold” muito pesado.

**2) Causa provável (técnica)**
- Se for R3F: Canvas renderizando imediatamente, sem \`dynamic import\` (SSR off) e sem \`Suspense\`/fallback.
- Tipografia/carregamento de fonte sem \`next/font\`, causando FOIT/FOUT (CLS perceptível).
- CTA sem “hit area” mínima e sem \`focus ring\`.

**3) Impacto**
- UX: alto (tempo para interagir / scroll)
- Visual premium: alto (qualquer micro-shift “barateia” a percepção)
- A11y: médio (se headings/CTA não forem semânticos)
- Performance: **alto** (LCP/INP)
- SEO: médio (se H1 não for único/ordem errada)

**4) Severidade e prioridade**
- Severidade: **Crítica**
- Prioridade: **P0**

**5) Checklist de validação**
- Responsividade:
  - H1 não quebra feio; use \`text-wrap: balance\` (quando possível) e escalas por breakpoint.
  - Elemento 3D não “empurra” conteúdo (altura reservada).
- A11y:
  - Um único H1 na página.
  - CTA é \`<a>\` ou \`<button>\` com rótulo claro.
- Performance:
  - LCP: confirmar se o LCP é o H1 (ideal) e não o Canvas/vídeo.
  - Canvas: \`dpr\` controlado; lazy/dynamic import.
- Animações:
  - Motion leve (fade/slide) e desliga com \`prefers-reduced-motion\`.

---

## [/ (Home)] → [Portfolio Showcase (mosaico/vídeo)]
**1) Sintoma observado**
- Mosaico com vários frames (parecem vídeos) e ícones de play: risco de carregamento simultâneo de múltiplos vídeos/imagens grandes.
- Área grande logo após o hero: pode competir com o hero (duas “peças principais” seguidas).

**2) Causa provável (técnica)**
- Uso de \`<video>\` com \`preload="auto"\` (ou sem controle) em múltiplos itens.
- Imagens sem \`next/image\` e sem \`sizes\`.
- Falta de poster/blur placeholder.

**3) Impacto**
- UX: alto (scroll jank, demora para exibir)
- Visual premium: médio (conteúdo pode parecer “pesado”/sem respiro)
- A11y: médio (se cards não tiverem nomes/labels e forem apenas \`div\` clicável)
- Performance: **alto**
- SEO: baixo/médio

**4) Severidade e prioridade**
- Severidade: **Alta**
- Prioridade: **P0**

**5) Checklist de validação**
- Responsividade:
  - Aspect ratios consistentes (evita “pulos”).
- A11y:
  - Itens clicáveis são links reais, com texto alternativo.
- Performance:
  - Vídeos com \`preload="metadata"\`, poster e lazy start via IntersectionObserver.
- Animações:
  - Hover não deve causar layout shift; use transform.

---

## [/ (Home)] → [Categorias/Clusters]
**1) Sintoma observado**
- Textos grandes (ex “Brand & Campaigns”) com pontos decorativos: risco de alinhamento inconsistente entre linhas e breakpoints.
- Se forem links, risco de hit area pequena e falta de foco visível.

**2) Causa provável (técnica)**
- Layout baseado em \`flex\` sem baseline/leading consistente.
- Tipografia sem tokens padronizados (font-size/leading/tracking).

**3) Impacto**
- UX: médio
- Visual premium: **alto** (consistência tipográfica é “premium cue”)
- A11y: médio
- Performance: baixo
- SEO: baixo

**4) Severidade e prioridade**
- Severidade: Média
- Prioridade: P1

**5) Checklist de validação**
- Responsividade:
  - Headings com escalas controladas e \`max-w\` para evitar linhas “viúvas”.
- A11y:
  - Se clicável: \`<a>\` com \`focus-visible\`.

---

## [/ (Home)] → [Grid de projetos / Cards]
**1) Sintoma observado**
- Cards com thumbnails grandes (um parece “Epic look”): risco de imagens pesadas e CLS se altura não for reservada.
- Possível inconsistência de padding/border-radius entre cards.

**2) Causa provável (técnica)**
- Imagens sem dimensionamento fixo (\`width/height\`) / sem \`aspect-\*\`.
- Hover states aplicando \`shadow\`/border que muda layout.

**3) Impacto**
- UX: médio/alto
- Visual premium: alto
- A11y: médio
- Performance: médio
- SEO: baixo

**4) Severidade e prioridade**
- Severidade: Alta
- Prioridade: P1

**5) Checklist de validação**
- Responsividade:
  - Grid 1 col (mobile), 2 col (tablet), 2–3 col (desktop) com gutters constantes.
- A11y:
  - Card clicável deve ser link com título textual.
- Performance:
  - \`next/image\` com \`sizes\` e compressão adequada.

---

## [/ (Home)] → [CTA “Like what you see?”]
**1) Sintoma observado**
- Área parece um bloco destacado; risco de contraste insuficiente em textos/botão (não validável via screenshot com precisão).
- Se botão for “view projects”, precisa ter foco/teclado.

**2) Causa provável (técnica)**
- Componentes sem tokens de cor (hardcoded) e sem estados.
- Falta de \`focus-visible:ring\`.

**3) Impacto**
- UX: médio
- Visual premium: médio
- A11y: médio
- Performance: baixo
- SEO: baixo

**4) Severidade e prioridade**
- Severidade: Média
- Prioridade: P1

**5) Checklist de validação**
- A11y:
  - Contraste AA no texto/botão.
  - Foco visível.

---

## [/ (Home)] → [Marcas/Clientes]
**1) Sintoma observado**
- Faixa azul com logos: risco de blur/serrilhado e tamanhos inconsistentes.
- Se forem imagens, precisa de alt adequado (ou \`alt=""\` se puramente decorativas).

**2) Causa provável (técnica)**
- Logos em PNG sem \`next/image\`, sem \`sizes\`, sem normalização de altura.
- Falta de \`aria-label\` se for lista de clientes.

**3) Impacto**
- UX: baixo/médio
- Visual premium: médio
- A11y: médio
- Performance: médio (muitos assets)
- SEO: baixo

**4) Severidade e prioridade**
- Severidade: Média
- Prioridade: P2

**5) Checklist de validação**
- A11y:
  - Se informativo: \`<ul>\` com itens e alt; se decorativo: \`alt=""\`.
- Performance:
  - Lazy load fora do viewport.

---

## [/ (Home)] → [Contato (infos + form)]
**1) Sintoma observado**
- Form ao final: risco alto de falta de labels, validação e estados de erro acessíveis.
- Contatos (telefone/email) precisam ser links \`tel:\` e \`mailto:\`.
- “Send Message” precisa de estado loading/disabled.

**2) Causa provável (técnica)**
- Inputs com placeholder como label.
- Falta de \`aria-invalid\` e mensagens associadas.
- Falta de prevenção de double submit.

**3) Impacto**
- UX: **alto**
- Visual premium: médio (erros “quebrados” passam sensação de amador)
- A11y: **alto**
- Performance: baixo
- SEO: baixo

**4) Severidade e prioridade**
- Severidade: **Alta**
- Prioridade: **P0**

**5) Checklist de validação**
- A11y:
  - Cada input tem \`<label htmlFor>\`.
  - Erros com \`role="alert"\` e \`aria-describedby\`.
- UX:
  - Estado “enviando”, sucesso e falha claros.
- Performance:
  - Sem bibliotecas de form pesadas se não necessário.

---

## [/sobre] → [Seções gerais] (hipótese)
**1) Sintoma observado**
- Risco de inconsistência tipográfica/spacing vs Home se não houver tokens/tipografia unificada.

**2) Causa provável (técnica)**
- Estilos por seção sem um “container” e escala fixa.
- Falta de componentes reutilizáveis (Section, Container, Heading).

**3) Impacto**
- UX: médio
- Visual premium: alto
- A11y: médio
- Performance: baixo
- SEO: médio (estrutura de headings)

**4) Severidade e prioridade**
- Severidade: Média
- Prioridade: P1

**5) Checklist de validação**
- SEO:
  - H1 único, H2 por seção.
- Responsividade:
  - Linhas de texto com \`max-w-prose\`.

---

## [/portfolio] → [Lista de cases + filtros] (hipótese)
**1) Sintoma observado**
- Filtros podem causar CLS (chips mudando linha) e INP alto se houver animações pesadas.

**2) Causa provável (técnica)**
- Filtro controlado por estado global sem memoização.
- Grid re-render completo sem \`key\` estável.

**3) Impacto**
- UX: alto
- Visual premium: médio
- A11y: médio
- Performance: médio/alto
- SEO: médio (indexação de cases)

**4) Severidade e prioridade**
- Severidade: Alta
- Prioridade: P1

**5) Checklist de validação**
- Performance:
  - INP com clique nos filtros.
- A11y:
  - Chips como \`button\` com \`aria-pressed\` quando toggle.

---

## [/contato] → [Form] (hipótese)
**1) Sintoma observado**
- Mesmos riscos do form da Home (labels/erros/foco).

**2) Causa provável (técnica)**
- Form duplicado sem componente único.
- Falta de validação consistente.

**3) Impacto**
- UX: alto
- Visual premium: médio
- A11y: alto
- Performance: baixo
- SEO: baixo

**4) Severidade e prioridade**
- Severidade: Alta
- Prioridade: P0

**5) Checklist de validação**
- A11y:
  - Tab order, labels, erros, submit.

---

# C) Plano de Ajustes por Seção (executável)

## Home → Header / Navigation
- **Objetivo do ajuste**
  - Navegação premium + acessível: foco, teclado, menu mobile com padrões corretos.
- **Mudanças recomendadas**
  - Botão do menu: \`aria-label\`, \`aria-expanded\`, \`aria-controls\`.
  - Drawer com focus trap e fechamento por \`Esc\`.
  - Adicionar “Skip to content” no topo.
  - Padronizar tokens: \`container\`, alturas e hit-area (mín 44px).
- **Risco de regressão**
  - Drawer pode interferir com scroll do body.
  - Mitigar: lock scroll somente quando aberto e restaurar ao fechar.
- **Critério de aceite**
  - Navegar 100% com teclado (Tab/Shift+Tab/Enter/Esc) sem perder foco.

## Home → Hero
- **Objetivo do ajuste**
  - Melhorar LCP/CLS mantendo o “impacto premium”.
- **Mudanças recomendadas**
  - Se for R3F: \`dynamic import\` (SSR off) + \`Suspense\` fallback.
  - Reservar altura do bloco 3D/imagem para evitar CLS.
  - Tipografia com \`next/font\` para reduzir FOUT/CLS.
  - Motion leve e desativável com \`prefers-reduced-motion\`.
- **Risco de regressão**
  - Mudança no carregamento do hero pode alterar a percepção “instantânea”.
  - Mitigar: fallback visual (blur/placeholder) e transição de opacidade.
- **Critério de aceite**
  - Lighthouse LCP melhora e o hero não “pula” ao carregar.

## Home → Portfolio Showcase
- **Objetivo do ajuste**
  - Manter impacto visual com carregamento progressivo.
- **Mudanças recomendadas**
  - Vídeos: \`preload="metadata"\`, \`poster\`, lazy play (IntersectionObserver).
  - Imagens: \`next/image\` + \`sizes\` + placeholder.
  - Evitar autoplay múltiplo (apenas 1 ativo no viewport).
- **Risco de regressão**
  - “Feeling” pode ficar menos dinâmico sem autoplay.
  - Mitigar: autoplay apenas do item hero e demais on-hover / on-view.
- **Critério de aceite**
  - Sem travadas no scroll; rede não baixa múltiplos vídeos no início.

## Home → Contato
- **Objetivo do ajuste**
  - Form impecável em A11y + UX (premium).
- **Mudanças recomendadas**
  - Labels reais, mensagens de erro associadas, estados (loading/success/error).
  - Links tel/mailto e ícones com rótulos acessíveis.
- **Risco de regressão**
  - Alterar validação pode mudar payload/integração (se houver backend).
  - Mitigar: manter contrato de envio; só melhorar UI/A11y.
- **Critério de aceite**
  - Screen reader anuncia labels e erros corretamente; submit não duplica.

---

# D) Implementação (somente para P0/P1)

> Observação: sem acesso ao repo, abaixo são **propostas** (diffs-modelo) para você encaixar nos arquivos reais.

## ✅ P0 — Menu mobile acessível + foco visível + “Skip link”
## 🔧 Arquivos afetados
- \`components/SiteHeader.tsx\` (ou equivalente)
- \`app/layout.tsx\`

## 🧩 Código — Diff (modelo)

### app/layout.tsx (adicionar skip link e landmarks)
\`\`\`tsx
// Antes: layout sem skip link (hipótese)
//
// Depois (modelo):
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Pular para o conteúdo
        </a>

        {/* Header aqui */}
        {children}
      </body>
    </html>
  )
}
\`\`\`

### components/SiteHeader.tsx (botão com aria + foco)
\`\`\`tsx
<button
  type="button"
  aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
  aria-expanded={isOpen}
  aria-controls="menu-principal"
  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/70 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
  onClick={() => setIsOpen((v) => !v)}
>
  <span aria-hidden="true">☰</span>
</button>

<div id="menu-principal" hidden={!isOpen}>
  {/* links */}
</div>
\`\`\`

## 💡 Por que esta solução
- Garante padrão A11y para menu (\`aria-expanded\`/\`aria-controls\`) e foco visível, elevando percepção premium por consistência de interação.

---

## ✅ P0 — Hero: reduzir LCP/CLS (R3F ou mídia pesada)
## 🔧 Arquivos afetados
- \`app/page.tsx\` (ou \`app/(home)/page.tsx\`)
- \`components/Hero.tsx\`
- \`components/HeroVisual3D.tsx\` (se existir)

## 🧩 Código — Diff (modelo)

### app/page.tsx (reservar espaço e lazy do 3D)
\`\`\`tsx
import dynamic from 'next/dynamic'

const HeroVisual3D = dynamic(() => import('@/components/HeroVisual3D'), {
  ssr: false,
  loading: () => <div className="h-[260px] w-full rounded-[32px] bg-black/5" />,
})

export default function Page() {
  return (
    <main id="conteudo">
      <section className="mx-auto w-full max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h1 className="text-balance text-[44px] font-semibold leading-[0.95] tracking-[-0.03em] text-black sm:text-[56px] lg:text-[72px]">
              Design, não é só estética.
            </h1>
            <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-black/70 sm:text-[18px]">
              [É intenção, é estratégia, é experiência.]
            </p>

            <a
              href="/sobre"
              className="mt-7 inline-flex h-11 items-center gap-3 rounded-full bg-blue-600 px-6 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              get to know me better
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="min-h-[260px] w-full lg:min-h-[360px]">
            <HeroVisual3D />
          </div>
        </div>
      </section>
    </main>
  )
}
\`\`\`

## 💡 Por que esta solução
- \`dynamic(..., { ssr:false })\` evita SSR do Canvas.
- Reserva altura mínima para evitar CLS.
- Mantém hierarquia premium (grid 2 col) e reforça tipografia com tracking/leading controlados.

---

## ✅ P0 — Portfolio Showcase: vídeos e imagens com lazy correto
## 🔧 Arquivos afetados
- \`components/PortfolioShowcase.tsx\`
- \`next.config.js\` (se thumbnails vierem do Supabase)

## 🧩 Código — Diff (modelo)

### next.config.js (permitir imagens do Supabase no next/image)
\`\`\`js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // ajuste o hostname para o seu projeto do Supabase Storage:
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
}

module.exports = nextConfig
\`\`\`

### VideoThumb (padrão recomendado)
\`\`\`tsx
export function VideoThumb({
  src,
  poster,
  title,
}: {
  src: string
  poster: string
  title: string
}) {
  return (
    <figure className="group relative overflow-hidden rounded-[28px] bg-black/5">
      <video
        className="h-full w-full object-cover"
        muted
        playsInline
        preload="metadata"
        poster={poster}
      />
      <figcaption className="sr-only">{title}</figcaption>

      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10" />
      <div className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-black/80 backdrop-blur">
        {title}
      </div>
    </figure>
  )
}
\`\`\`

## 💡 Por que esta solução
- Vídeo com \`preload="metadata"\` + poster reduz rede inicial e melhora LCP/scroll.
- \`next/image\` com \`remotePatterns\` é necessário quando assets vêm do Supabase Storage.

---

## ✅ P1 — Motion “premium” com suporte a prefers-reduced-motion
## 🔧 Arquivos afetados
- Componentes que animam (Hero, Cards, Menu)

## 🧩 Código — Antes/Depois (modelo)
\`\`\`tsx
import { motion, useReducedMotion } from 'framer-motion'

export function FadeIn({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
\`\`\`

> Padrão de \`motion(Image)\`: se você estiver animando \`next/image\`, use \`forwardRef\` como  :OaiMdDirective_Annotations_f0wdc{attrs="eyJpbmRleCI6MH0"}no exemplo 

---

# E) Testes (manual + métricas)

## Desktop
- Breakpoints: \`1280\`, \`1440\`, \`1680+\`
- O que checar:
  - Grid do hero (texto vs visual 3D) alinhado verticalmente no centro.
  - Hover states em cards sem “pulo”.
  - Menu no topo com hit-area e foco visível.
- Passo-a-passo:
  1) Abrir DevTools → Performance monitor.
  2) Recarregar com cache desativado.
  3) Observar CLS (Layout Shift Regions).
  4) Tab/Shift+Tab: navegar header → hero CTA → cards → contato.

## Tablet
- Breakpoints: \`768\`, \`834\`, \`1024\`
- O que checar:
  - Hero não “entorta” (headline com quebras elegantes).
  - Showcase não fica grande demais nem corta conteúdo.
- Passo-a-passo:
  1) Emular iPad (Safari se possível).
  2) Rotacionar portrait/landscape para detectar CLS.

## Mobile
- Breakpoints: \`320\`, \`375\`, \`390/414\`, \`430\`
- O que checar:
  - Menu abre/fecha com teclado e toque; \`Esc\` fecha.
  - Hero: H1 legível sem overflow.
  - Showcase: não baixa todos os vídeos no load.
  - Form: teclado não cobre input (scroll into view).
- Passo-a-passo:
  1) Lighthouse Mobile.
  2) Network “Slow 4G”.
  3) Verificar requests de vídeo/imagem no load.

## Performance (como medir)
- Lighthouse (Mobile + Desktop)
  - Medir LCP/CLS/INP e identificar o LCP element (ideal: H1 ou imagem única controlada).
- Web Vitals (INP/LCP/CLS)
  - Confirmar INP em interações: abrir menu, hover/click em cards.
- Recomendações de budget
  - JS inicial: manter baixo (especialmente se houver R3F).
  - Imagens: sempre com \`next/image\` + \`sizes\`.
  - Vídeo: \`preload="metadata"\`, poster, e autoplay controlado.

---

# F) Melhorias Extras (opcionais, só se fizer sentido)
Liste apenas melhorias que agreguem valor real:
- A11y (teclado, aria, foco, contraste)
  - Skip link (P0) + foco visível padrão.
  - \`aria-live\` para mensagens de form.
- Motion (prefer-reduced-motion)
  - Respeitar \`prefers-reduced-motion\` (P1).
- R3F (lazy load, DPR, suspense, canvas sizing)
  - Dynamic import + Suspense e DPR controlado; evitar Canvas como LCP.
- Images (next/image, sizes, priority, blur, caching)
  - \`remotePatterns\` no \`next.config.js\` para Supabase.
- Fonts (next/font, preload, fallback)
  - \`next/font\` para reduzir CLS/FOIT (não validável aqui; confirmar no repo).
- SEO (metadata, headings, OG, sitemap)
  - \`metadata\` em \`app/layout.tsx\` e por página, seguindo  :OaiMdDirective_Annotations_f0wdc{attrs="eyJpbmRleCI6MX0"}App Router 

---

# G) Resumo Final + Checklist
- Itens resolvidos:
  - (Sem repo: este relatório é diagnóstico + plano + diffs-modelo.)
- Pendências:
  - Confirmar rotas reais (\`/sobre\`, \`/portfolio\`, \`/contato\`) vs âncoras.
  - Confirmar se o elemento do hero é R3F (Canvas) ou mídia estática.
  - Confirmar origem de assets e domínios (Supabase).
- Riscos:
  - Otimizações de mídia podem alterar “impacto” do motion; mitigar com fallback e transições.
- Próximos passos:
  1) Você me envia repo/zip + árvore do \`app/\`.
  2) Eu retorno com diffs precisos nos arquivos reais (cirúrgico, P0/P1 primeiro).

Checklist:
| Item | OK? | Notes |
|------|-----|------|
| Layout premium consistente | [ ] | |
| Responsivo (mobile/tablet/desktop) | [ ] | |
| Animações corretas e suaves | [ ] | |
| Acessibilidade (foco/teclado/contraste/semântica) | [ ] | |
| Performance (LCP/CLS/INP) | [ ] | |
| Código limpo e reutilizável | [ ] | |
| Sem regressões visuais | [ ] | |

---

## O que eu preciso do repositório para gerar os diffs finais (objetivo, sem extra)
- Link do repositório (ou zip) + estrutura completa da pasta \`app/\`
- Lista de rotas existentes (ou árvore do \`app/\`)
- Prints/frames do design esperado por página (Home/Sobre/Portfólio/Contato)
- Quais assets vêm do Supabase (pastas/URLs)
- Config atual: \`next.config.*\`, \`tailwind.config.*\`, \`tsconfig.json\`, \`firebase.json\`
- Métricas Lighthouse (Mobile + Desktop) ou permissão para eu te passar o roteiro e você me devolve os resultados

Notas de stack (confirmadas pelos arquivos anexados):
- Tailwind com scan em \`./app\` e \`./co :OaiMdDirective_Annotations_f0wdc{attrs="eyJpbmRleCI6Mn0"}mponents\` 
- Projeto com Next/React/Framer Motion (dependên :OaiMdDirective_Annotations_f0wdc{attrs="eyJpbmRleCI6M30"}cias base) 
- Exemplo de \`motion(Image)\` via \`fo :OaiMdDirective_Annotations_f0wdc{attrs="eyJpbmRleCI6NH0"}rwardRef\` 
- PostCSS configurado com Tailwind + Au :OaiMdDirective_Annotations_f0wdc{attrs="eyJpbmRleCI6NX0"}toprefixer 
`

function fallbackCopyToClipboard(text: string) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.setAttribute('readonly', 'true')
  ta.style.position = 'fixed'
  ta.style.left = '-9999px'
  ta.style.top = '-9999px'
  document.body.appendChild(ta)
  ta.select()
  try {
    document.execCommand('copy')
  } finally {
    document.body.removeChild(ta)
  }
}

export default function AuditReport() {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<number | null>(null)

  const plainText = useMemo(() => auditMarkdown.trim(), [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  async function onCopy() {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)

    try {
      await navigator.clipboard.writeText(plainText)
      setCopied(true)
      timeoutRef.current = window.setTimeout(() => setCopied(false), 1400)
    } catch {
      try {
        fallbackCopyToClipboard(plainText)
        setCopied(true)
        timeoutRef.current = window.setTimeout(() => setCopied(false), 1400)
      } catch {
        setCopied(false)
      }
    }
  }

  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-semibold tracking-tight text-black">
            Auditoria (Markdown) — portfoliodanilo.com
          </h1>
          <p className="mt-1 text-sm text-black/60">
            Relatório conceitual + checklist + diffs-modelo (sem acesso ao repo).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <p className="sr-only" aria-live="polite">
            {copied ? 'Markdown copiado para a área de transferência.' : ''}
          </p>

          <button
            type="button"
            onClick={onCopy}
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-5 text-sm font-medium text-black shadow-sm transition hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            {copied ? 'Copiado!' : 'Copiar Markdown'}
          </button>
        </div>
      </header>

      <section className="mt-8">
        <pre
          tabIndex={0}
          aria-label="Relatório em Markdown"
          className="overflow-auto rounded-2xl border border-black/10 bg-black/[0.02] p-5 text-[13px] leading-relaxed text-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {plainText}
        </pre>
      </section>
    </main>
  )
}