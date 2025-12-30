# 🧠 Auditoria + Correções (Prompts Atômicos) — HOME + PORTFOLIO 'use client';

 * Relatório em Markdown (copie/cole em um arquivo .md se preferir).
 *
 * Observação importante:
 * - Este relatório foi produzido a partir do spec fornecido na conversa e da comparação visual com as imagens anexadas.
 * - A inspeção “linha a linha” do código do repositório não foi possível aqui, então os prompts para agente são “cirúrgicos”
 *   no sentido de serem verificáveis e aplicáveis diretamente, mas pedem checagem do estado atual em cada arquivo/trecho.
 */
export const HOME_PORTFOLIO_AUDIT_MD = String.raw`# Auditoria Técnica — HOME + PORTFOLIO (Header + Hero em foco)
**Projeto:** Portfólio Institucional de Danilo Novais  
**Stack:** Next.js App Router + TS + Tailwind + R3F/Drei/Three + Framer Motion  
**Lei absoluta:** Fidelidade visual às referências \`HERO-PORTFOLIO-GHOST.jpg\` + \`HOME-PORTFOLIO-LAYOUYT-GHOST.jpg\` + \`PORTFOLIO-PAGE-LAYOUYT.jpg\`

 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.
REFRENCIAS VISUAIS:
1. /docs/HERO-PORTFOLIO-GHOST.jpg
2. /docs/HOME-PORTFOLIO-LAYOUYT-GHOST.jpg
3. /docs/PORTFOLIO-PAGE-LAYOUYT.jpg

REFRENCIAS ANIMAÇÃO:
1. /docs/HEADER - HEADER=["https://reactbits.dev/components/fluid-glass?p=%7B%2522mode%2522:%2522bar%2522%7D”]
2. /docs/REFERENCIA_HERO-GHOST - HERO=["https://codepen.io/danilonovaisv/pen/azZbdQo"] 


---

## 1️⃣ Visão Geral

### Estado atual (alto nível)
- A arquitetura proposta no spec (separação de Header e Hero em componentes) **parece alinhada conceitualmente** ao que é necessário.
- Visualmente, pelas imagens anexadas, **o Hero está muito próximo do esperado** (ghost à esquerda, texto editorial central, manifesto thumb desktop no canto inferior direito e manifesto fullscreen no mobile).
- O maior risco técnico/visual está na **integração Header + Hero** (camadas/z-index, competição visual, consistência entre desktop/mobile e consistência de margens laterais).
- Há risco de “excesso de glow/motion” em assets/estilos do projeto: exemplos de CSS com glow/hover agressivo e blur/glassmorphism existem nos arquivos disponíveis no bundle/arquivos analisados  :OaiMdDirective_Annotations_yl0ex{attrs="eyJpbmRleCI6MH0"} — isso é um red flag porque o spec exige motion editorial sutil e proíbe poluição visual.

### Escopo auditado com prioridade
- HOME: Header + Hero (incl. Ghost WebGL + Manifesto Thumb + Manifesto Mobile)
- PORTFOLIO: Header (consistência) + grid/margens (alto nível; faltam referências visuais da página /portfolio anexadas aqui para verificação pixel-perfect)

---

## 2️⃣ Diagnóstico por Dimensão

### Estrutura / Arquitetura
- **Risco médio:** duplicação/variação de componentes que podem gerar inconsistência (ex.: Header “A” vs “B”, Thumb “A” vs “B”), causando divergências visuais entre rotas.
- **Ação:** garantir fonte única de verdade para \`SiteHeader\` e para \`HomeHero\`.

### UI (hierarquia tipográfica, grid, ritmo)
- **Risco alto:** consistência do “edge rhythm” (margens laterais) entre Header ↔ Hero ↔ próximas seções.
- **Ação:** padronizar container (mesma fórmula de padding lateral) e alinhar colunas.

### UX / Interação
- **Risco médio:** menu mobile precisa bloquear scroll do body, suportar tap fora, ESC e foco/teclado sem glitches.
- **Ação:** checklist de acessibilidade + scroll lock.

### Fidelidade visual
- **Risco alto:** qualquer variação de posicionamento/escala do ghost, do texto editorial e do manifesto thumb vira BUG.
- **Ação:** travar layout com tokens (padding clamp, breakpoints, z-index fixo).

### Responsividade (mobile-first)
- **Risco alto:** canvas/WebGL em mobile (DPR alto + postprocessing) pode degradar performance, aquecer, travar e piorar LCP.
- **Ação:** DPR controlado + fallback + desligar follow/bloom em reduced motion e em mobile/tablet.

### Motion / Animações
- **Risco alto:** manifesto thumb precisa motion “premium editorial” sem exagero; e reduced-motion precisa funcionar.
- **Ação:** limitar transform/opacity; timings curtos; easing premium; sem efeitos “glow/elastic” (exemplo de padrões agressivos em CSS deve ser evitado  :OaiMdDirective_Annotations_yl0ex{attrs="eyJpbmRleCI6MX0"}).

### WebGL / 3D
- **Risco alto:** camadas (z-index, pointer events, depth) e pós-processamento.
- **Ação:** Canvas isolado, pointer-events none, DPR clamp, antialias false, fallback CSS.

### Performance (LCP/CLS)
- **Risco alto no Hero:** vídeo e canvas podem afetar LCP/CLS se não tiverem sizing estável e lazy/dynamic import correto.
- **Ação:** dimensões fixas (aspect-video), placeholder estável, dynamic import do Canvas.

### Acessibilidade
- **Risco médio:** aria/teclado no header/menu e foco visível.
- **Ação:** aria-expanded, aria-label, focus-visible ring, ordem de tabulação.

---

## 3️⃣ Diagnóstico por Seção (Obrigatório)

## 🎯 Seção: Header (SiteHeader)

- 📌 Fidelidade visual (referência): ✗ — comparar com \`HERO-PORTFOLIO-GHOST.jpg\` (header como moldura) e docs/HEADER (animação)
- 📐 Grid e margens laterais: ✗
- ↔️ Alinhamento duas laterais: ✗
- 📱 Mobile (sm/md): ✓ (aparenta correto nas imagens anexadas: logo + hamburger)
- 🎞️ Motion/Animações: ✗ (não confirmado: stagger, scroll-lock, tap-outside, reduced-motion)
- 🧩 Componentes envolvidos: \`SiteHeader\` → \`DesktopFluidHeader\` / \`MobileStaggeredMenu\`
- 🔗 Integrações: \`layout.tsx\`/Home → \`SiteHeader\` → (desktop) fluid glass / (mobile) stagger overlay

### ❌ Problema (objetivo, mensurável)
1) **Header desktop potencialmente inconsistente com a “moldura” esperada**: risco de estar full-width ou com estilo/contraste competindo com a Hero, em vez de um pill flutuante discreto (conforme spec do Header).  
2) **Edge rhythm não garantido**: padding lateral do header pode não bater com o padding lateral do conteúdo (HeroCopy, seções seguintes), gerando “saltos” visuais.  
3) **A11y e comportamento do menu mobile não comprovados**: falta garantir aria, foco, ESC, tap-outside, scroll lock do body, e stagger real.

### 🔧 Correção Técnica (ação exata)
- Garantir que o header desktop use container **centralizado** com largura parcial + border-radius pill + z-index acima da hero.
- Garantir que o header use **o mesmo padding lateral** do container da Home (\`px-[clamp(24px,5vw,96px)]\` ou equivalente) para alinhar com o grid.
- No mobile: implementar overlay fullscreen com stagger, scroll lock do body, aria-expanded, focus trap (mínimo: foco visível e retorno de foco).

### ✅ Resultado esperado (comparável)
- Header desktop “moldura”: visualmente discreto, sempre legível, sem competir com ghost/texto.  
- Header e Hero compartilham o mesmo alinhamento de bordas (margem esquerda/direita).  
- Mobile menu abre com cascata (stagger) fluida, rápida e acessível, conforme docs/HEADER.

### ✅ Checklist de fidelidade (Header)
- Grid corresponde à imagem? **Não**
- Margens laterais equivalentes? **Não**
- Alinhamento “duas laterais” consistente? **Não**
- Hierarquia tipográfica equivalente? **Não confirmado**
- Espaçamento vertical equivalente? **Não confirmado**
- Elementos 3D/WebGL na mesma posição/escala? **N/A (Header)**
- Mobile equivalente ao esperado? **Sim**
- Sem overflow horizontal? **Não confirmado (precisa QA real)**

---

## 🎯 Seção: Hero (Ghost Atmosphere + Texto Editorial + Manifesto)

- 📌 Fidelidade visual (referência): ✓ — comparar com \`HERO-PORTFOLIO-GHOST.jpg\`
- 📐 Grid e margens laterais: ✗ (edge rhythm com header e próximas seções não comprovado)
- ↔️ Alinhamento duas laterais: ✗ (risco de desalinhamento entre hero e próximas seções)
- 📱 Mobile (sm/md): ✓ (aparenta: manifesto fullscreen abaixo da Hero)
- 🎞️ Motion/Animações: ✗ (não confirmado: timing/easing premium, reduced-motion)
- 🧩 Componentes envolvidos: \`HomeHero\` → \`HeroPreloader\` / \`HeroCopy\` / \`ManifestoThumb\` / \`GhostStage\` → \`GhostCanvas\`
- 🔗 Integrações: \`HomeHero\` (camadas) → manifesto thumb (hover/scroll/click) → manifesto section (mobile)

### ❌ Problema (objetivo, mensurável)
1) **Risco de conflito de regras do próprio spec**: há trechos do spec dizendo “texto editorial 100% estático” vs “overlay text opacity 1 → 0 no scroll do morph do vídeo”. Se o texto estiver animando além do fade-out necessário para o morph, isso viola “sem texto animado”.  
2) **Manifesto thumb precisa motion premium e contido**: sem exagero (evitar padrões “glow/elastic/overshoot” — exemplos agressivos de hover/glow deve :OaiMdDirective_Annotations_yl0ex{attrs="eyJpbmRleCI6Mn0"}m ser evitados ).  
3) **WebGL Ghost**: precisa garantir (a) follow apenas desktop, (b) reduced motion desativa follow + bloom intenso, (c) fallback se WebGL falhar, (d) DPR controlado, (e) canvas não captura input.

### 🔧 Correção Técnica (ação exata)
- Hero: garantir stack de z-index conforme spec (preloader z-50, manifesto z-30, ghost z-20, copy z-10, bg z-0).
- Manifesto (desktop): entrada com \`opacity/translate/scale\` sutil; hover scale 1 → 1.05 e seta -45 → 0; scroll morph com \`useScroll/useTransform\`; click (desktop) salta para estado final; click (mobile) alterna mute.
- WebGL: dynamic import do canvas; \`dpr={[1,2]}\`, \`antialias:false\`; reduced motion e mobile: desativar follow e/ou reduzir efeitos.

### ✅ Resultado esperado (comparável)
- Primeiro frame: ghost atmosférico vivo + texto editorial legível + manifesto thumb discreto no canto inferior direito (desktop).  
- Ao scroll: manifesto cresce e centraliza, texto some (apenas o necessário), sem cortes abruptos.  
- Mobile: manifesto fullscreen logo abaixo da Hero, com reveal sutil e sem travar a navegação.

### ✅ Checklist de fidelidade (Hero)
- Grid corresponde à imagem? **Sim (aparente)**
- Margens laterais equivalentes? **Não confirmado**
- Alinhamento “duas laterais” consistente? **Não**
- Hierarquia tipográfica equivalente? **Sim (aparente)**
- Espaçamento vertical equivalente? **Sim (aparente)**
- Elementos 3D/WebGL na mesma posição/escala? **Sim (aparente)**
- Mobile equivalente ao esperado? **Sim**
- Sem overflow horizontal? **Não confirmado (precisa QA real)**

---

## 🎯 Seção: Portfolio Page (/portfolio)

- 📌 Fidelidade visual (referência): ✗ — **não validável aqui** sem a imagem \`PORTFOLIO-PAGE-LAYOUYT.jpg\` anexada nesta conversa
- 📐 Grid e margens laterais: ✗ (não validável)
- ↔️ Alinhamento duas laterais: ✗ (não validável)
- 📱 Mobile (sm/md): ✗ (não validável)
- 🎞️ Motion/Animações: ✗ (não validável)
- 🧩 Componentes envolvidos: rota \`/portfolio\` + header
- 🔗 Integrações: \`/portfolio\` deve manter consistência de header e containers com Home

### ❌ Problema (objetivo, mensurável)
- Falta de evidência visual nesta conversa para validar pixel-perfect da página /portfolio.

### 🔧 Correção Técnica (ação exata)
- Rodar auditoria visual comparando /portfolio com \`PORTFOLIO-PAGE-LAYOUYT.jpg\` e ajustar containers/margens/typography.

### ✅ Resultado esperado (comparável)
- /portfolio com o mesmo edge rhythm da Home e sem divergências em grid/spacing.

---

# 4️⃣ Lista de Problemas (com severidade)

## 🔴 Alta (bloqueia fidelidade/UX/performance)
1) Header desktop não comprovadamente “moldura” (risco de competir com hero / inconsistência de pill flutuante).  
2) Edge rhythm (margens laterais) não garantido entre Header ↔ Hero ↔ seções seguintes.  
3) WebGL Ghost sem garantias explícitas de fallback + reduced-motion + DPR controlado.  
4) Manifesto thumb: sem garantias de motion editorial contido (evitar exageros e padrões de glow/elastic; exemplos agressivos exist :OaiMdDirective_Annotations_yl0ex{attrs="eyJpbmRleCI6M30"}em em estilos analisados ).  
5) /portfolio não validado visualmente nesta conversa (fidelidade não confirmada).

## 🟡 Média (perceptível mas não bloqueia)
6) A11y do menu mobile: aria-expanded, ESC, foco visível, tap-outside e scroll-lock precisam ser garantidos.  
7) Possível duplicidade de componentes (header/thumb) gerando divergência entre rotas.  
8) Potenciais problemas de LCP/CLS (vídeo + canvas) se sizing não for estável.

## 🟢 Baixa (polimento)
9) Microinterações de hover/focus podem precisar calibragem de timing/easing (premium sutil).  
10) Ajustes finos de contraste do header sobre o fundo do hero.

---

# 5️⃣ Recomendações Prioritárias (ordem de execução)

1) **Travar layout e edge rhythm (container único)**: porque afeta todas as seções e impede “saltos” visuais.  
2) **Header (desktop + mobile)**: z-index, forma, legibilidade e comportamento do menu.  
3) **Hero (manifesto thumb + scroll morph)**: timing/easing premium + reduced motion.  
4) **WebGL Ghost**: DPR/antialias/fallback, follow apenas desktop, performance.  
5) **/portfolio**: auditoria visual completa com referência \`PORTFOLIO-PAGE-LAYOUYT.jpg\`.

---

# 🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR (OBRIGATÓRIO)

> Cada prompt é atômico (1 problema).  
> Regra: ❌ não alterar textos / ❌ não inventar layout / ✅ comparar com as imagens de referência.

---

### 🛠️ Prompt #01 — Garantir “fonte única” do Header usado no site

**Objetivo**
- Garantir que HOME e /portfolio renderizem o mesmo componente de header (sem divergências visuais entre rotas).

**Arquivos/Rotas envolvidas**
- \`src/app/layout.tsx\`
- \`src/app/page.tsx\`
- \`src/app/portfolio/page.tsx\`
- \`src/components/header/SiteHeader.tsx\`
- (se existir em uso) \`src/components/layout/Header.tsx\`

**Ações**
1. Localize onde o header é renderizado (layout global e/ou por página).
2. Se houver mais de um header sendo usado, padronize para **apenas um** (preferir \`SiteHeader\`).
3. Verifique visualmente HOME e /portfolio lado a lado após a mudança.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Tailwind + App Router
- ✅ Comparar com: \`HERO-PORTFOLIO-GHOST.jpg\`

**Critérios de aceite (Checklist)**
- [ ] Mesmo header em HOME e /portfolio
- [ ] Sem regressão visual no hero
- [ ] Sem overflow horizontal (mobile)

---

### 🛠️ Prompt #02 — Desktop Header: “pill flutuante” (moldura) com largura parcial

**Objetivo**
- Fazer o header desktop ficar como moldura discreta: pill flutuante centralizado e não full-width.

**Arquivos/Rotas envolvidas**
- \`src/components/header/SiteHeader.tsx\`
- \`src/components/header/DesktopFluidHeader.tsx\`

**Ações**
1. No desktop (≥1024px), ajuste container para largura parcial (ex.: \`max-w-[...]\` + \`mx-auto\`) e bordas arredondadas (pill).
2. Garanta altura/padding do header conforme spec (56–72px).
3. Ajuste contraste para não competir com a Hero.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Comparar com: \`HERO-PORTFOLIO-GHOST.jpg\`

**Critérios de aceite (Checklist)**
- [ ] Header não é full-width no desktop
- [ ] Header é pill flutuante e discreto
- [ ] Legibilidade do menu 100%

---

### 🛠️ Prompt #03 — Edge rhythm: unificar padding lateral entre Header e Hero

**Objetivo**
- Garantir que a borda esquerda/direita do Header alinhe com a borda esquerda/direita do conteúdo da Hero.

**Arquivos/Rotas envolvidas**
- \`src/components/header/*\`
- \`src/components/home/HomeHero.tsx\` e/ou wrapper/container da Home
- \`src/app/page.tsx\`

**Ações**
1. Defina um padrão de padding lateral (ex.: \`px-[clamp(24px,5vw,96px)]\`) e aplique ao header e ao container da home.
2. Garanta que o hero copy e CTAs respeitam a mesma largura útil.
3. Faça QA em 1440px e 1920px.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Comparar com: \`HOME-PORTFOLIO-LAYOUYT-GHOST.jpg\`

**Critérios de aceite (Checklist)**
- [ ] Grid e margens iguais à referência
- [ ] Sem “saltos” de alinhamento entre seções
- [ ] Sem overflow horizontal

---

### 🛠️ Prompt #04 — Mobile Menu: overlay fullscreen com stagger real + scroll lock

**Objetivo**
- Implementar menu mobile fullscreen com animação stagger e travar o scroll do body quando aberto.

**Arquivos/Rotas envolvidas**
- \`src/components/header/MobileStaggeredMenu.tsx\`
- \`src/components/header/SiteHeader.tsx\`

**Ações**
1. Ao abrir, renderize overlay fullscreen com gradiente e painel (se aplicável).
2. Bloqueie scroll do body (\`document.body.style.overflow = 'hidden'\`) e reverta ao fechar.
3. Aplique stagger nos itens (opacity 0→1 e y 16→0).
4. Permita fechar via: X, clique em item, clique fora, tecla ESC.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Mobile-first
- ✅ Comparar com: docs/HEADER (animação)

**Critérios de aceite (Checklist)**
- [ ] Scroll do body bloqueado no menu aberto
- [ ] Stagger funciona e é rápido
- [ ] Tap-outside fecha
- [ ] ESC fecha
- [ ] aria-expanded correto

---

### 🛠️ Prompt #05 — Acessibilidade do Header (desktop + mobile)

**Objetivo**
- Garantir navegação por teclado e ARIA completos no header e menu.

**Arquivos/Rotas envolvidas**
- \`src/components/header/SiteHeader.tsx\`
- \`src/components/header/MobileStaggeredMenu.tsx\`
- \`src/components/header/DesktopFluidHeader.tsx\`

**Ações**
1. Botão hamburger: \`aria-label\` (abrir/fechar), \`aria-expanded\`, \`aria-controls\`.
2. Links: foco visível (\`focus-visible:ring\`), ordem de tab coerente.
3. ESC fecha menu; foco retorna ao botão.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout

**Critérios de aceite (Checklist)**
- [ ] Navegável via teclado
- [ ] Foco visível
- [ ] ARIA consistente

---

### 🛠️ Prompt #06 — Hero: garantir stack de z-index e pointer-events do Canvas

**Objetivo**
- Garantir que Canvas do Ghost não roube interações e que as camadas respeitem a hierarquia do spec.

**Arquivos/Rotas envolvidas**
- \`src/components/home/HomeHero.tsx\`
- \`src/components/home/GhostStage.tsx\`
- \`src/components/home/webgl/GhostCanvas.tsx\`

**Ações**
1. Garanta camadas: preloader z-50, manifesto z-30, ghost z-20, copy z-10, bg z-0.
2. Aplique \`pointer-events-none\` no wrapper do Canvas (ou no canvas).
3. Garanta que o header fique acima da Hero (z-40 no header).

**Regras**
- ❌ Não alterar textos
- ✅ Comparar com: \`HERO-PORTFOLIO-GHOST.jpg\`

**Critérios de aceite (Checklist)**
- [ ] CTA e links clicáveis
- [ ] Canvas não bloqueia scroll/click
- [ ] Z-index consistente

---

### 🛠️ Prompt #07 — WebGL Ghost: DPR/antialias/perf + reduced motion

**Objetivo**
- Controlar performance do Ghost e respeitar prefers-reduced-motion.

**Arquivos/Rotas envolvidas**
- \`src/components/home/webgl/GhostCanvas.tsx\`
- \`src/components/home/GhostStage.tsx\`

**Ações**
1. Setar Canvas com \`dpr={[1,2]}\` e \`gl={{ antialias:false }}\`.
2. Em \`prefers-reduced-motion: reduce\`: desativar follow/parallax e reduzir bloom/decay (ou desligar postprocessing pesado).
3. Em mobile/tablet: reduzir DPR e/ou desligar follow.

**Regras**
- ❌ Não alterar textos
- ✅ Mobile-first

**Critérios de aceite (Checklist)**
- [ ] Sem travamentos no mobile
- [ ] Reduced-motion remove follow/efeitos agressivos
- [ ] Visual continua fiel ao still (ghost atmosférico)

---

### 🛠️ Prompt #08 — Manifesto Thumb: motion editorial premium (entrada + hover)

**Objetivo**
- Implementar entrada premium e hover contido para o manifesto thumb (sem competir com ghost).

**Arquivos/Rotas envolvidas**
- \`src/components/home/ManifestoThumb.tsx\` (ou componente equivalente)
- \`src/components/home/HomeHero.tsx\`

**Ações**
1. Entrada: \`opacity 0→1\`, \`y 12→0\`, \`scale 0.98→1\`, easing \`[0.22,1,0.36,1]\`, duração ~600ms.
2. Hover (desktop): \`scale 1→1.05\`; seta \`-45deg→0deg\`.
3. Respeitar reduced motion (remover hover scale e usar transição simples).

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Comparar com: \`HERO-PORTFOLIO-GHOST.jpg\`

**Critérios de aceite (Checklist)**
- [ ] Animação sutil (sem glow exagerado)
- [ ] Reduced motion respeitado
- [ ] Não compete com ghost

---

### 🛠️ Prompt #09 — Manifesto Thumb: scroll morph (thumb → fullscreen)

**Objetivo**
- Fazer o manifesto crescer e centralizar com scroll dentro da seção Hero, com radius indo a 0.

**Arquivos/Rotas envolvidas**
- \`src/components/home/HomeHero.tsx\`

**Ações**
1. Garantir Hero com altura suficiente (ex.: 200vh) para o scrub.
2. Usar \`useScroll\` + \`useTransform\` para scale/position/borderRadius.
3. Garantir sizing estável (\`aspect-video\`) para evitar CLS.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Comparar com: docs/REFERENCIA_HERO-GHOST

**Critérios de aceite (Checklist)**
- [ ] Thumb inicia no canto inferior direito (desktop)
- [ ] Termina fullscreen central
- [ ] Border radius 12–16px → 0
- [ ] Sem CLS

---

### 🛠️ Prompt #10 — Manifesto: comportamento de click (desktop vs mobile)

**Objetivo**
- Desktop: click “salta” para o estado final do morph; Mobile: click alterna som.

**Arquivos/Rotas envolvidas**
- \`src/components/home/ManifestoThumb.tsx\`
- \`src/components/home/HomeHero.tsx\`
- (mobile) \`src/components/home/ManifestoSection.tsx\` (se existir)

**Ações**
1. Desktop (≥768px): ao clicar, scroll para o final do range do morph.
2. Mobile (≤767px): toggle muted/unmuted no vídeo manifesto.
3. Adicionar feedback mínimo no mobile (ícone/estado), sem overlay pesado.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout

**Critérios de aceite (Checklist)**
- [ ] Desktop pula para fullscreen
- [ ] Mobile alterna som
- [ ] Sem overlays agressivos

---

### 🛠️ Prompt #11 — Mobile: ManifestoSection fullscreen logo abaixo da Hero

**Objetivo**
- Garantir manifesto como seção independente no mobile, com reveal sutil ao entrar na viewport.

**Arquivos/Rotas envolvidas**
- \`src/components/home/ManifestoSection.tsx\` (se existir)
- \`src/components/home/HomeHero.tsx\`

**Ações**
1. Renderizar manifesto section somente em \`md:hidden\`.
2. Aplicar \`whileInView\` / \`useInView\` com \`opacity\` + \`scale\` sutil.
3. Garantir \`aspect-video\` e \`object-cover\`.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Comparar com: \`HOME-PORTFOLIO-LAYOUYT-GHOST.jpg\`

**Critérios de aceite (Checklist)**
- [ ] Mobile mostra manifesto fullscreen abaixo da hero
- [ ] Sem overflow horizontal
- [ ] Reveal suave, sem exagero

---

### 🛠️ Prompt #12 — /portfolio: auditoria visual completa e correção de containers

**Objetivo**
- Ajustar /portfolio para ficar pixel-perfect com \`PORTFOLIO-PAGE-LAYOUYT.jpg\`.

**Arquivos/Rotas envolvidas**
- \`src/app/portfolio/page.tsx\`
- Componentes da página portfolio (se existir em \`src/components/portfolio/*\`)
- \`src/components/header/SiteHeader.tsx\`

**Ações**
1. Compare /portfolio com a referência (grid, gutters, tipografia, espaçamento).
2. Ajuste containers para respeitar o mesmo padding/clamp da Home.
3. Garantir consistência do header e edge rhythm.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout
- ✅ Comparar com: \`PORTFOLIO-PAGE-LAYOUYT.jpg\`

**Critérios de aceite (Checklist)**
- [ ] Grid e margens iguais à referência
- [ ] Alinhamento duas laterais consistente
- [ ] Mobile sem overflow
- [ ] Fidelidade visual confirmada

---

### 🛠️ Prompt #13 — Remover/neutralizar padrões de glow/hover agressivo (se estiverem afetando o site)

**Objetivo**
- Garantir que não existam efeitos de glow/hover “fortes” competindo com o Hero (motion editorial sutil).

**Arquivos/Rotas envolvidas**
- \`src/app/globals.css\` (ou css global equivalente)
- Qualquer css/module que aplique glow/box-shadow intenso

**Ações**
1. Localize estilos com box-shadows e animações de glow agressivas (exemplo de padrão a evitar: \`landing-button\` com m :OaiMdDirective_Annotations_yl0ex{attrs="eyJpbmRleCI6NH0"}últiplas sombras e animação “glow-pulse” ).
2. Se esses estilos estiverem aplicados nas páginas HOME/PORTFOLIO, reduza para transições discretas (opacity/transform).
3. Respeitar reduced motion: desativar animações contínuas.

**Regras**
- ❌ Não alterar textos
- ❌ Não inventar layout

**Critérios de aceite (Checklist)**
- [ ] Sem glow exagerado no header/CTAs
- [ ] Motion premium e contido
- [ ] Reduced motion respeitado

---
`;

export default function HomePortfolioAuditReport() {
  return (
    <main className="min-h-dvh bg-neutral-950 text-neutral-100">
      <div className="mx-auto w-full max-w-5xl px-6 py-10">
        <h1 className="text-balance text-2xl font-semibold">Home + Portfolio — Audit Report (Markdown)</h1>
        <p className="mt-2 text-sm text-neutral-300">
          Este componente apenas exibe o relatório em Markdown. Copie/cole em um arquivo <code>.md</code> se preferir.
        </p>

        <pre className="mt-6 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 p-5 text-[13px] leading-relaxed">
          {HOME_PORTFOLIO_AUDIT_MD}
        </pre>
      </div>
    </main>
  );
}
