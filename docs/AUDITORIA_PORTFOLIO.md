 Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

// HomeAboutAuditDoc.tsx
// Blueprint de auditoria + prompts técnicos para HOME (/) e SOBRE (/sobre)
// portfoliodanilo.com — baseado nas specs fornecidas e estrutura do repositório.

import React from "react";

export const homeAboutAuditMarkdown = `
# 🧾 Auditoria HOME + SOBRE — portfoliodanilo.com  
_Blueprint para agente (Copilot/Codex)_

> Importante  
> • Este documento foi gerado **a partir das especificações detalhadas** e da **estrutura de arquivos do repositório** (listagem de diretórios).  
> • Dentro deste ambiente não há acesso direto ao código-fonte nem ao site rodando, então **não é possível inspecionar o comportamento real** (layout renderizado, animações, WebGL em execução).  
> • Todos os itens marcados como “Requer validação” devem ser verificados manualmente por um agente ou dev humano antes de serem classificados como ✓ / ✗.  
> • Os prompts ao final já estão prontos para o agente aplicar correções nos arquivos reais do projeto.

Stack assumido (fonte: configuração de agente) :OaiMdDirective_Annotations_cdnyd{attrs="eyJpbmRleCI6MH0"}   
- Next.js App Router (src/app)  
- React + TypeScript  
- Tailwind CSS  
- React Three Fiber + Drei + Three.js  
- Framer Motion  
- Supabase Storage (mídias)  
- Firebase Hosting

---

## 1️⃣ Visão Geral

**Arquitetura (via listagem de diretórios GitHub)**  
- App Router em \`src/app\`:  
  - \`page.tsx\` (Home)  
  - \`/sobre/page.tsx\` (About)  
  - \`/portfolio\` e \`/portfolio/[slug]\` para projetos.  
- Componentes organizados por contexto:  
  - Home: \`src/components/home/*\` (Hero, Manifesto, Portfolio Showcase, Featured Projects, Clients, Contact).  
  - Sobre: \`src/components/sobre/*\` (AboutHero, AboutOrigin, AboutWhatIDo, AboutMethod, AboutBeliefs, AboutClosing, GhostEyes).  
  - Layout global: \`src/components/layout/*\` (Header, SiteFooter, SmoothScroll, ClientLayout) + \`header/*\` (DesktopFluidHeader, MobileStaggeredMenu, etc.).  
- Canvas/WebGL isolado em \`src/components/canvas/*\` (Ghost, etc.).  

**Leitura:**  
A estrutura de pastas é coerente com o design system descrito e favorece componentização por página e por seção. Falta apenas validar, no código, se **cada componente realmente implementa as regras de layout, motion e acessibilidade** descritas nas specs.

---

## 2️⃣ Diagnóstico por Dimensão (nível macro)

> Como não há inspeção direta do DOM/Canvas neste ambiente, os status abaixo são “suposição estrutural + risco”.  
> O agente executor deve transformar todos os itens “Requer validação” em ✓ ao aplicar os prompts.

- **Estrutura/Arquitetura**
  - Pastas por domínio (\`home\`, \`sobre\`, \`layout\`, \`portfolio\`) → **OK (boa base estrutural)**.
  - Reuso de seções globais (ClientsBrandsSection, ContactSection, SiteFooter) → **OK (consistência entre páginas)**.
  - Risco: componentes internos (\`HeroHeader\`, \`HeroCopy\`, \`GhostStage\`, \`ManifestoThumb\`, etc.) não seguirem 100% os tokens de layout e motion da doc.

- **UI / UX**
  - Tipografia, grid e ritmo visual dependem da implementação de Tailwind/CSS Modules → **Requer validação**.
  - Risco: desalinhamento lateral entre seções, espaçamentos verticais irregulares, ou hierarquia tipográfica inconsistente.

- **Fidelidade visual às imagens de referência**
  - Sem acesso aos arquivos JPG de referência dentro deste ambiente → **Requer validação manual comparando com:**
    - HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg  
    - HOME-PORTFOLIO-BLACK---GHOST.jpg  
    - SOBRE-MOBILE-BLACK---GHOST.jpg  
    - SOBRE-PORTFOLIO-BLACK---GHOST.jpg  

- **Responsividade mobile**
  - Estrutura mobile-first sugerida pelas specs, mas uso real de breakpoints \`sm/md/lg/xl\` precisa ser checado em cada componente → **Requer validação**.

- **Alinhamento “duas laterais”**
  - Containers existem, mas é comum cada seção usar paddings diferentes; precisa ser normalizado para seguir o mesmo eixo lateral → **Risco alto**.

- **Animações / Motion**
  - Há uso de Framer Motion + componentes de menu (StaggeredMenu) → **Requer validação** para:
    - Respeitar \`prefers-reduced-motion\`;
    - Evitar scale/bounce/rotate em conteúdo editorial (Ghost Design System).

- **WebGL / 3D (Ghost)**
  - Canvas isolado em \`components/canvas\` (pela estrutura) → **positivo**.  
  - DPR, post-processing, follow mouse, fallback e reduced motion precisam ser checados no código → **Requer validação crítica**.

- **Performance**
  - Sem acesso a métricas de LCP/CLS ou bundle real. Riscos típicos:
    - Canvas com DPR alto em mobile;
    - Manifesto vídeo sem lazy loading adequado;
    - Animações de scroll acionadas em excesso.

- **Acessibilidade**
  - Estrutura permite implementação correta (aria, foco, teclas, etc.), mas precisa ser garantida em:
    - Header (menu hambúrguer + foco/ESC);
    - Manifesto vídeo (controle de som);
    - Formulário de contato (labels, estados de erro);
    - Ghost / motion (prefers-reduced-motion).

---

## 3️⃣ Diagnóstico por Seção (Blueprint)

> **Nota:** As respostas abaixo usam:  
> • “Requer validação” = precisa ser verificado e ajustado pelo agente.  
> • “Se divergente da referência, tratar como BUG (severidade indicada)”.

---

### 🎯 Seção: Home — Header (Desktop Fluid + Mobile Staggered)

- 📌 Fidelidade visual (referência): **Requer validação** — HOME-PORTFOLIO-BLACK---GHOST.jpg  
- 📐 Grid e margens laterais: **Requer validação** (pill centralizado em container, não full-bleed).  
- ↔️ Alinhamento duas laterais: **Requer validação** (logo, nav e hero text alinhados na mesma coluna).  
- 📱 Mobile (sm/md): **Requer validação** (barra fixa + overlay staggered fullscreen).  
- 🎞️ Motion/Animações: **Crítico a validar** (sem bounce; glass fluido apenas desktop; mobile sem glass pesado).  
- 🧩 Componentes envolvidos:  
  - \`src/components/layout/Header.tsx\`  
  - \`src/components/layout/header/SiteHeader.tsx\`  
  - \`src/components/layout/header/DesktopFluidHeader.tsx\`  
  - \`src/components/layout/header/MobileStaggeredMenu.tsx\`  
  - \`src/components/layout/header/mobile/*\`  
- 🔗 Integrações: \`SiteHeader → DesktopFluidHeader | MobileHeaderBar + MobileMenuPanel (StaggeredMenu)\`

#### ❌ Problema (a evitar / checar)

1. Desktop:
   - Header ocupando largura errada (full-width em vez de pill centralizado).
   - Efeito “fluid glass” exagerado (translate/scale além de 40–60px, overshoot chamativo).
   - Falta de troca de contraste quando sobre a seção de contato (texto continua branco sobre fundo claro).

2. Mobile:
   - Menu overlay sem focus trap, sem ESC, ou com animação excessiva.
   - Header com glass pesado ou blur excessivo em mobile (contra a spec).

#### 🔧 Correção Técnica (ação exata — guia)

- Verificar em \`DesktopFluidHeader.tsx\`:
  - Garantir \`position: sticky; top: 0; z-index: 40\` (ou top: 24px se seguir padding do layout).  
  - Limitar a animação de “follow X” a algo como: deslocamento horizontal máximo ≈ 40–60px, **sem scale perceptível** (usar \`translateX\` + leve skew se existir, sem \`scale\`).  
  - Glass: \`backdrop-filter: blur(12px)\` + gradiente sutil, sem brilho exagerado.

- Em \`SiteHeader.tsx\` + \`headerTokens.ts\`:
  - Implementar lógica de contraste: quando o header estiver sobre a seção \`#contact\` (fundo claro), trocar tokens de cor (logo + links em azul primário, fundo um pouco mais opaco). Pode ser via IntersectionObserver ou hook \`useActiveSection\`.

- Em \`MobileStaggeredMenu.tsx\` + \`mobile/*\`:
  - Barra fixa: full-width, \`height: 48–64px\`, logo à esquerda, botão hambúrguer à direita.  
  - Overlay: fullscreen, fundo gradiente (primary → neutral), itens grandes em coluna com stagger de 100ms.  
  - Garantir:
    - \`aria-label\` no hambúrguer;
    - \`aria-expanded\`;
    - ESC fecha menu;
    - Focus trap dentro do overlay;
    - Tap no backdrop fecha menu.

#### ✅ Resultado esperado (comparável)

- Desktop:  
  - Header em formato pill translúcido, posicionado alguns pixels abaixo do topo, alinhado com a coluna do hero, se movendo horizontalmente de forma **sutil** com o mouse, sem competir visualmente com o Ghost/hero.  
  - Quando passa sobre o fundo claro de contato, texto/ícones mudam para azul e o fundo fica levemente mais opaco.

- Mobile:  
  - Header simples, sem glass pesado, com menu hambúrguer que abre overlay fullscreen com animação editada (fade + slide, não exagerada).  
  - Navegação completamente operável por teclado/toque.

---

### 🎯 Seção: Home — Hero + Ghost Atmosphere

- 📌 Fidelidade visual (referência): **Requer validação** — HERO-PORTFOLIO-GHOST.jpg  
- 📐 Grid e margens laterais: **Requer validação** (ghost ocupando lado esquerdo/central, texto alinhado à direita).  
- ↔️ Alinhamento duas laterais: **Requer validação** (tag, H1, H2, CTA na mesma coluna usada pelo restante da página).  
- 📱 Mobile (sm/md):  
  - Ghost simplificado + CTA centralizado; manifesto vídeo em seção própria abaixo → **Requer validação**.  
- 🎞️ Motion/Animações:  
  - Ghost com follow suave no mouse (apenas desktop); sem scroll-trigger no texto → **Crítico**.  
- 🧩 Componentes envolvidos:  
  - \`src/components/home/HomeHero.tsx\`  
  - \`src/components/home/HeroHeader.tsx\`  
  - \`src/components/home/HeroCopy.tsx\`  
  - \`src/components/home/GhostStage.tsx\` + \`.module.css\`  
  - \`src/components/canvas/*\` (caso Ghost esteja lá)  
- 🔗 Integrações: \`HomeHero → HeroHeader + GhostStage + HeroCopy + ManifestoThumb (z-index stack)\`

#### ❌ Problema (a evitar / checar)

- Texto do hero entrando com scroll reveal ou animações exageradas (spec exige texto 100% estático).
- Ghost com follow do mouse também em mobile/tablet (spec: **apenas desktop**).
- DPR sem limitação (DPR 3+ em monitores retina pesando LCP).
- Ausência de fallback para browsers sem WebGL ou \`prefers-reduced-motion: reduce\`.

#### 🔧 Correção Técnica (ação exata — guia)

- Em \`HomeHero.tsx\`:
  - Z-index stack obrigatório:
    - Z-50: preloader Ghost Loader (se ainda existir);  
    - Z-30: thumbnail manifesto;  
    - Z-20: Ghost Canvas;  
    - Z-10: bloco editorial;  
    - Z-0: background gradiente.
  - Editorial (\`HeroCopy\`):  
    - Remover qualquer \`whileInView\`, \`useScroll\` e transições de opacidade/translate; deixar conteúdo estático, apenas com leve fade-in inicial se muito necessário.

- Em \`GhostStage.tsx\` / canvas:
  - Configurar R3F/Three:
    - \`dpr={[1, 2]}\` para limitar DPR máx 2;  
    - \`gl={{ antialias: false }}\`;  
    - Post-processing Bloom com intensidade moderada (~2.8) mas sem saturar toda a tela.  
  - Movimento:
    - Aplicar follow do mouse com \`lerp\` suave (~0.05);  
    - Sinus maior apenas no eixo vertical/horizontal sutil;  
    - Encapsular lógica de mouse dentro de \`if (!prefersReducedMotion && isDesktop)\`.

  - Fallback:
    - Se \`prefers-reduced-motion\` ativo ou erro de contexto WebGL, renderizar apenas gradiente radial estático (\`background: from #040013 to #06071f\`) atrás do texto, sem canvas.

#### ✅ Resultado esperado

- Desktop: ghost flutuando, com leve follow do cursor, bloom controlado, texto fixo claramente legível, CTA “step inside →” alinhado com restante da página.
- Mobile: ghost simplificado ou imagem/gradiente sem follow, texto centralizado e CTA grande; manifesto vídeo vem **logo abaixo** em seção separada.

---

### 🎯 Seção: Home — Manifesto Vídeo (Thumbnail Desktop / Seção Mobile)

- 📌 Fidelidade visual (referência): **Requer validação** — HERO-PORTFOLIO-GHOST + docs de manifesto.  
- 📐 Grid/margens: thumbnail ≈ 30vw, bottom-right desktop; full-width section no mobile.  
- 📱 Mobile: vídeo em seção própria, fullscreen width, sem thumbnail flutuante → **Requer validação**.  
- 🎞️ Motion/Animações: entrada “editorial premium” tipo loandbehold.studio; scroll transform para fullscreen, hold 2s, lógica de som → **Crítico**.  
- 🧩 Componentes envolvidos:  
  - \`src/components/home/ManifestoThumb.tsx\`  
  - \`src/components/home/ManifestoSection.tsx\`  
- 🔗 Integrações: \`HomeHero → ManifestoThumb\` (desktop); \`Home → ManifestoSection\` (mobile)

#### ❌ Problema (a evitar / checar)

- Thumbnail competindo visualmente com o Ghost (animação forte demais).
- Falta do comportamento “pinned + scale to fullscreen + hold 2s + sound on/off” no desktop.
- No mobile, vídeo aparecendo ainda como thumbnail flutuante em vez de seção dedicada.

#### 🔧 Correção Técnica (ação exata — guia)

- Em \`ManifestoThumb.tsx\` (desktop):
  - Implementar Framer Motion com:
    - \`initial: { opacity: 0, scale: 0.92, y: 60, filter: "blur(10px)" }\`;  
    - \`animate: { opacity: 1, scale: [1.02, 1], y: 0, filter: "blur(0px)" }\`, duração ≈ 1.2s, easing ghost.  
  - Comportamento scroll:
    - Usar \`useScroll\` + \`useTransform\` para mapear \`scrollYProgress\` da seção Hero → props \`scale\`, \`x\`, \`y\`, \`borderRadius\`.  
    - Enquanto \`0 < progress < 1\`: position \`fixed\` ancorado em bottom-right; ao chegar em 1, fullscreen, \`borderRadius: 0\`.
  - Lógica de som:
    - Vídeo sempre \`muted\` durante thumbnail + transição;  
    - Ao atingir estado fullscreen + hold de 2s, \`muted = false\`;  
    - Ao sair da seção hero (scroll para baixo), \`muted = true\` novamente.  
    - Respeitar \`prefers-reduced-motion\`: pular transições complexas (apenas fade + scale leve).

- Em \`ManifestoSection.tsx\` (mobile):
  - Vídeo ocupa largura total, aspect-video, \`autoplay loop muted playsInline\`.  
  - Som: botão de toggle claro (ícone) para mute/unmute; ao sair da seção, voltar para \`muted\`.  
  - Scroll reveal: fade + leve translateY (sem scale forte).

#### ✅ Resultado esperado

- Desktop: thumbnail discreto, que cresce até fullscreen conforme o scroll e segura o usuário 2s com áudio ligado; depois o scroll continua.  
- Mobile: seção de manifesto imediatamente após hero, com controle de som explícito, sem competição com o Ghost.

---

### 🎯 Seção: Home — Portfolio Showcase

- 📌 Fidelidade visual (referência): **Requer validação** — HOME-PORTFOLIO-* imagens.  
- 📐 Grid/margens:  
  - Desktop: heading centralizado, label flutuante à esquerda, 3 stripes com alinhamentos alternados;  
  - Mobile: cards 100% width, tudo centralizado, sem label.  
- ↔️ Alinhamento duas laterais: **Requer validação** (mantém mesma coluna lateral do hero/featured).  
- 📱 Mobile: \`Videos & Motions\`, etc. como cards em 1 coluna.  
- 🎞️ Motion/Animações: hover para revelar thumb + arrow rotate; scroll reveal com stagger leve.  
- 🧩 Componentes envolvidos:  
  - \`src/components/home/portfolio-showcase/*\`  
- 🔗 Integrações: \`HomeHero → PortfolioShowcaseSection\` via âncora \`#portfolio-showcase\`.

#### ❌ Problema (a evitar / checar)

- Stripes desalinhados com grid global (cada um com padding diferente).
- Thumbnail visível todo o tempo em desktop (deveria expandir só no hover).
- Mobile usando layout de stripes laterais em vez de cards simples centralizados.

#### 🔧 Correção Técnica (ação exata — guia)

- Na seção principal (\`PortfolioShowcaseSection.tsx\`):
  - Container com \`max-w-[1680px]\` + \`px-[clamp(24px,5vw,96px)]\`.  
  - Heading “portfólio showcase” com metade em branco / metade azul.  
  - Label “[what we love working on]” posicionado absoluto próximo da primeira stripe (desktop apenas).

- Em cada stripe (categoria):
  - Desktop:
    - Layout flex entre thumbnail (0→288px no hover) e título+ícone.  
    - Hover:
      - Thumbnail: width/opacity anima de 0 → 288px / 0 → 1 em ≈ 700ms;  
      - Gap aumenta (\`gap-7 → gap-10\`);  
      - Ícone circular gira arrow de -45° para 0°.  
    - Click: navegar para \`/portfolio?category=slug\`.
  - Mobile:
    - Esconder label;  
    - Exibir stripes empilhadas, título centralizado, ícone à direita;  
    - Sem animação de reveal, apenas hover/tap leve.

#### ✅ Resultado esperado

- Desktop: seção editorial com 3 linhas interativas que revelam thumbs apenas ao hover, mantendo o mesmo alinhamento lateral da hero e da seção de projetos.  
- Mobile: 3 cards full-width, centralizados, tipografia consistente, sem overflow horizontal.

---

### 🎯 Seção: Home — Featured Projects (Bento Grid)

- 📌 Fidelidade visual: **Requer validação** — layout Bento nas imagens HOME-PORTFOLIO-BLACK---GHOST.jpg.  
- 📐 Grid/margens: grid de 12 colunas com spans exatos (\`5/7/12/8/4\`).  
- ↔️ Alinhamento duas laterais: deve bater com container global.  
- 📱 Mobile: cards empilhados verticalmente, CTA por último.  
- 🎞️ Motion: hover leve em imagem + arrow; scroll reveal com stagger.  
- 🧩 Componentes envolvidos:  
  - \`src/components/home/FeaturedProjectsSection.tsx\`  
  - \`src/components/home/featured-projects/*\`  
  - \`src/components/home/ProjectCard.tsx\`  

#### ❌ Problema (a evitar / checar)

- Uso de \`grid-cols-3\` genérico em vez das col-spans especificadas, resultando em proporções erradas.
- Hover muito agressivo (scale grande, sombra forte).
- Em mobile, manter Bento irregular em vez de stack vertical simples.

#### 🔧 Correção Técnica (ação exata — guia)

- Em \`FeaturedProjectsSection.tsx\`:
  - Implementar grid Tailwind:
    - \`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8\`.  
    - Row 1: card 1 (\`md:col-span-5\`), card 2 (\`md:col-span-7\`);  
    - Row 2: card 3 (\`md:col-span-12\`);  
    - Row 3: card 4 (\`md:col-span-8\`), CTA (\`md:col-span-4\`).  
  - Mobile: todos \`col-span-12\` via \`md:\` override.

- Em \`ProjectCard.tsx\`:
  - Estrutura: imagem full-cover, pills no canto, bloco de texto abaixo (titulo + meta + arrow).  
  - Hover:
    - Imagem: \`scale-105\` máx + \`-translate-y-[1px]\` (sem bounce).  
    - Arrow: translateX ~20px, easing suave.  
  - Scroll reveal: container com \`opacity 0→1\`, \`y 40→0\`, cards com \`scale 0.96→1\` + stagger.

#### ✅ Resultado esperado

- Desktop: Bento elegante, proporções fiéis, cards com hover sutil.  
- Mobile: lista vertical clara, sem cortes de imagem, CTA como último card.

---

### 🎯 Seção: Home — Clients/Brands

- 📌 Fidelidade visual: **Requer validação** — barra azul full-bleed nos mocks.  
- 📐 Grid/margens: barra \`bg-[#0048ff]\` full-width, conteúdo centralizado com padding consistente.  
- 📱 Mobile: 2–3 colunas de logos, headline menor.  
- 🎞️ Motion: fade + leve scale nas logos ao hover (desktop), scroll reveal com stagger.  
- 🧩 Componentes envolvidos:  
  - \`src/components/home/ClientsBrandsSection.tsx\`  

#### ❌ Problema (a evitar / checar)

- Barra azul confinada ao container (sem full-bleed).
- Logos sem inversão (não ficam brancas) ou com tamanhos inconsistentes quebrando grid.

#### 🔧 Correção Técnica (ação exata — guia)

- Em \`ClientsBrandsSection.tsx\`:
  - Wrapper full-width com \`bg-[#0048ff]\`;  
  - Conteúdo: container central com headline branco (2xl desktop, 1.5rem mobile).  
  - Grid:
    - Mobile: \`grid-cols-2 sm:grid-cols-3 gap-y-6\`;  
    - Desktop: \`md:grid-cols-6\`.  
  - Logos:
    - Aplicar \`filter brightness-0 invert\` ou usar versões brancas;  
    - Hover desktop: leve \`scale-105\` e \`brightness(1.1)\`.

#### ✅ Resultado esperado

- Barra azul contínua de borda a borda, logos brancas, grid responsivo com colunas corretas.

---

### 🎯 Seção: Home — Contact + Footer

- 📌 Fidelidade visual: **Requer validação** — seção clara + footer azul fixo desktop.  
- 📐 Grid/margens: contact 2 colunas desktop / 1 coluna mobile; footer fixed only desktop.  
- 📱 Mobile: footer **não fixo**, última seção da página.  
- 🎞️ Motion: apenas scroll reveal suave, hover em botões/links.  
- 🧩 Componentes envolvidos:  
  - \`src/components/home/ContactSection.tsx\`  
  - \`src/components/home/contact/*\`  
  - \`src/components/layout/SiteFooter.tsx\`  

#### ❌ Problema (a evitar / checar)

- Footer fixo também em mobile (sobrepondo conteúdo).
- Formulário sem labels associados, sem estados de foco/erro.

#### 🔧 Correção Técnica (ação exata — guia)

- Em \`ContactSection.tsx\`:
  - Desktop: \`grid-cols-2\` (info + form); mobile: \`grid-cols-1\`, elementos empilhados.  
  - Inputs:
    - Labels explícitas associadas por \`htmlFor\`;  
    - Estados de foco com \`ring-2 ring-blue-500 ring-offset-2\`;  
    - Botão “Enviar Mensagem” com hover \`scale(1.02)\` + leve \`-translate-y-px\`.  
  - Integração \`FormSubmit.co\` com método POST.

- Em \`SiteFooter.tsx\`:
  - Desktop: \`fixed bottom-0 w-full bg-[#0057FF]\` + layout horizontal.  
  - Mobile: **não usar fixed**; renderizar footer como seção normal (\`static\`), com stack vertical, padding generoso (\`py-10\`), links + sociais em linhas separadas.

#### ✅ Resultado esperado

- Contact claro, legível, com form acessível.  
- Footer discreto, fixo apenas em desktop, sem atrapalhar hero/manifesto.

---

### 🎯 Seções /sobre — Hero, Origem, O que eu faço, Método, O que me move, Fechamento

> As seções da página **Sobre** já estão devidamente mapeadas em componentes:  
> - \`AboutHero.tsx\` (Seção 01 — Hero / Manifesto)  
> - \`AboutOrigin.tsx\` (Seção 02 — Origem criativa)  
> - \`AboutWhatIDo.tsx\` (Seção 03 — O que eu faço)  
> - \`AboutMethod.tsx\` (Seção 04 — Como eu trabalho)  
> - \`AboutBeliefs.tsx\` + \`GhostEyes.tsx\` (Seção 05 — O que me move / Ghost)  
> - \`AboutClosing.tsx\` (Seção 06 — Fechamento)

Para cada uma, aplicar o mesmo checklist:

- Grid corresponde à imagem? **Requer validação**  
- Margens laterais equivalentes? **Requer validação**  
- Alinhamento “duas laterais” consistente? **Requer validação**  
- Hierarquia tipográfica equivalente? **Requer validação**  
- Espaçamento vertical equivalente? **Requer validação**  
- Elementos 3D/WebGL na mesma posição/escala? (somente GhostEyes) **Requer validação**  
- Mobile equivalente ao esperado? **Requer validação**  
- Sem overflow horizontal? **Deve ser garantido** (✗ se qualquer overflow).

Os detalhes de cada seção (texto sobre vídeo com overlay, listas de cards, parallax sutil, rotação de frases, CTAs finais etc.) já estão descritos extensivamente no documento de especificação fornecido; os prompts abaixo irão orientar as correções nos arquivos específicos.

---

## 4️⃣ Lista de Problemas / Riscos com Severidade (para o agente validar)

> Use como **checklist de BUGS potenciais**.  
> Se, ao inspecionar o projeto, qualquer item abaixo se confirmar, trate-o com a severidade indicada.

- 🔴 **H-01 — Header desktop com motion excessivo ou layout diferente do mock**
  - Efeitos de scale/bounce, overshoot grande, glass muito chamativo, largura/full-bleed sem respeito ao container.

- 🔴 **H-02 — Hero/Ghost sem fallback ou sem respeito a \`prefers-reduced-motion\`**
  - Canvas sempre ativo em mobile; DPR alto; ausência de gradiente estático fallback.

- 🔴 **H-03 — Manifesto vídeo sem lógica de fullscreen hold + som**
  - Sem comportamento pinned, sem controle de áudio, som tocando fora da fullscreen.

- 🔴 **H-04 — Portfolio Showcase e Featured Projects fora do grid especificado**
  - Col-spans errados, desalinhamento lateral, hover excessivo.

- 🔴 **S-01 — /sobre Hero com texto sem overlay escuro suficiente**
  - Quebra da regra absoluta: nunca texto direto sobre vídeo sem overlay ≥ 80%.

- 🔴 **S-02 — Seção Como eu trabalho sem overlay ou contraste suficiente sobre vídeo**
  - Cards de processo sem legibilidade (violação de WCAG AA).

- 🔴 **S-03 — Seção O que me move sem controle de frases rotativas / prefers-reduced-motion**
  - Frases animando em loop sem opção de pular; screen readers não acessam o conteúdo completo.

- 🟡 **M-01 — Margens laterais inconsistentes entre seções**
  - Textos “respirando” com colunas diferentes; sensação de desalinhamento.

- 🟡 **M-02 — Footer fixo em mobile**
  - Sobreposição de conteúdo, UX prejudicada.

- 🟢 **L-01 — Microinterações de hover/tap ligeiramente fora dos timings especificados**
  - Ainda aceitável, mas pode ser refinado para “sensação premium”.

---

## 5️⃣ Recomendações Prioritárias (ordem sugerida de execução)

1. **Header + Footer globais**  
   - Corrigir glass, responsividade mobile, contraste dinâmico e comportamento fixo do footer.  
   - Justificativa: afeta TODAS as páginas.

2. **Hero + Ghost Atmosphere + Manifesto Vídeo (Home)**  
   - Área de maior impacto visual e LCP; corrigir WebGL, motion, lógica de som.

3. **Seções estruturais de conteúdo (Portfolio Showcase, Featured Projects, Clients, Contact)**  
   - Garantir grid, margens laterais e responsividade.

4. **/sobre — Hero + Método (seções com vídeo em background)**  
   - Priorizar contraste, overlay, motion control e performance.

5. **/sobre — Origem, O que eu faço, O que me move, Fechamento**  
   - Ajustar tipografia, grid, animações de lista e frases rotativas.

6. **Refinamentos finais de motion e acessibilidade**  
   - Revisar prefers-reduced-motion, foco, aria, leitura por screen readers.

---

## 🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR

> Um problema por prompt.  
> Cada prompt pressupõe que o agente abrirá os arquivos mencionados, comparará com as imagens de referência e ajustará até que todos os checklists estejam ✓.

---

### 🛠️ Prompt #01 — Header Fluid Desktop + Contraste Dinâmico

**Objetivo**  
- Garantir que o header desktop seja um pill de glass fluido **sutil**, alinhado ao container e com contraste dinâmico ao sobrepor a seção de contato.

**Arquivos/Rotas envolvidas**
- \`src/components/layout/Header.tsx\`  
- \`src/components/layout/header/SiteHeader.tsx\`  
- \`src/components/layout/header/DesktopFluidHeader.tsx\`  
- \`src/components/layout/header/headerTokens.ts\`  

**Ações**
1. Ajustar \`DesktopFluidHeader\` para:
   - Usar container parcial centralizado (não full-bleed);  
   - Aplicar glass (\`backdrop-filter: blur(12px)\` + gradiente) sem glow exagerado;  
   - Limitar qualquer movimento fluido a um \`translateX\` máximo de 40–60px, sem \`scale\` ou bounce.
2. Implementar lógica de contraste no \`SiteHeader\` usando \`IntersectionObserver\` ou similar para:
   - Detectar quando o header está sobre o bloco de contato (fundo claro);  
   - Trocar tokens de cor (links/logo em azul primário, fundo um pouco mais opaco).
3. Garantir que o header **não interfira** com o Ghost/Hero (z-index, margens) e respeite \`prefers-reduced-motion\` (reduzir/interromper motion do glass se necessário).

**Regras**
- ❌ Não alterar textos dos links.  
- ❌ Não mudar a ordem das entradas de navegação.  
- ✅ Tailwind + CSS Modules ou classes utilitárias coerentes com o projeto.  
- ✅ Mobile-first, mas animação glass só ativa em \`lg+\`.  
- ✅ Comparar com: HOME-PORTFOLIO-BLACK---GHOST.jpg.

**Critérios de aceite (Checklist)**
- [ ] Header em formato pill centralizado, alinhado ao container.  
- [ ] Motion fluido sutil, sem bounce/scale perceptível.  
- [ ] Troca de contraste correta sobre a seção de contato.  
- [ ] Sem conflitos de z-index com Hero/Ghost.  
- [ ] Performance estável (sem jank em scroll).

---

### 🛠️ Prompt #02 — Header Mobile + Staggered Menu Overlay

**Objetivo**
- Fazer o header mobile usar uma barra simples com menu hambúrguer que abre um overlay fullscreen staggered, acessível e fiel à spec.

**Arquivos/Rotas envolvidas**
- \`src/components/layout/header/MobileStaggeredMenu.tsx\`  
- \`src/components/layout/header/mobile/MobileHeaderBar.tsx\`  
- \`src/components/layout/header/mobile/MobileMenuButton.tsx\`  
- \`src/components/layout/header/mobile/MobileMenuPanel.tsx\`  
- \`src/components/layout/header/mobile/MobilePreLayers.tsx\`  

**Ações**
1. Garantir que \`MobileHeaderBar\`:
   - Seja \`fixed top-0 w-full\`, altura 48–64px;  
   - Tenha logo à esquerda, botão hambúrguer à direita com padding 16px.  
2. Ajustar \`MobileMenuPanel\` + \`MobileStaggeredMenu\` para:
   - Abrir overlay fullscreen (ou quase) com gradient background;  
   - Itens de navegação em coluna, grande, com stagger de ~100ms;  
   - Social icons alinhados na base.  
3. Implementar acessibilidade:
   - \`aria-label\`, \`aria-expanded\` no botão;  
   - Focus trap dentro do overlay;  
   - ESC, clique no backdrop e clique em link fecham o menu.

**Regras**
- ❌ Não alterar o conteúdo das labels de navegação.  
- ✅ Tailwind para layout/responsividade.  
- ✅ Evitar blur exagerado no background em mobile.  
- ✅ Comparar com: HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg.

**Critérios de aceite**
- [ ] Header mobile simples, sem glass pesado.  
- [ ] Overlay cobre a viewport inteira ao abrir.  
- [ ] Stagger suave nos itens, sem animações gritantes.  
- [ ] Navegação totalmente acessível via teclado.  
- [ ] Sem overflow horizontal em mobile.

---

### 🛠️ Prompt #03 — Ghost Atmosphere (Canvas, DPR, Reduced Motion)

**Objetivo**
- Configurar o Ghost Atmosphere WebGL para seguir exatamente as regras de DPR, motion suave, desktop-only interaction e fallback.

**Arquivos/Rotas envolvidas**
- \`src/components/home/GhostStage.tsx\`  
- \`src/components/canvas/*\` (se aplicável)  
- \`src/components/home/HomeHero.tsx\`  

**Ações**
1. Ajustar o \`Canvas\` R3F para:
   - \`dpr={[1, 2]}\`;  
   - \`gl={{ antialias: false }}\`;  
   - Tamanho atrelado ao container do hero, não à janela inteira.  
2. Implementar movimento:
   - Follow de mouse usando \`useFrame\` + \`lerp\` suave no desktop;  
   - Desabilitar follow em mobile/tablet (usar feature detection ou breakpoint + \`pointer: fine\`).  
3. Implementar fallback:
   - Se \`prefers-reduced-motion\` ou falha de WebGL, não montar Canvas; desenhar apenas gradiente estático no background, mantendo o hero copy intacto.

**Regras**
- ❌ Não alterar textos do hero.  
- ✅ Manter a lógica de luz/bloom próxima do design, sem exageros.  
- ✅ Respeitar Ghost Design System (sem motion gratuito).  
- ✅ Comparar com: HERO-PORTFOLIO-GHOST.jpg.

**Critérios de aceite**
- [ ] Canvas não roda em browsers sem WebGL / reduced motion (fallback presente).  
- [ ] DPR limitado a 2.  
- [ ] Follow de mouse apenas desktop.  
- [ ] Ghost não bloqueia legibilidade do texto.  
- [ ] FPS estável em devices medianos.

---

### 🛠️ Prompt #04 — Manifesto Vídeo Thumbnail + Fullscreen Hold

**Objetivo**
- Implementar o comportamento de thumbnail flutuante no hero que cresce até fullscreen com hold de 2s e lógica de som conforme descrito.

**Arquivos/Rotas envolvidas**
- \`src/components/home/ManifestoThumb.tsx\`  
- \`src/components/home/HomeHero.tsx\`  

**Ações**
1. Implementar entrada do thumbnail com Framer Motion (fade + blur + leve overshoot de scale).  
2. Usar \`useScroll\` e \`useTransform\` para:
   - Fixar o vídeo no viewport enquanto o scroll percorre a seção Hero;  
   - Animar \`scale\`, \`x\`, \`y\`, \`borderRadius\` de thumbnail → fullscreen.  
3. Implementar state machine simples:
   - \`thumbnail → transition → fullscreenHold → released\`;  
   - No estado \`fullscreenHold\`, manter scroll travado por 2s e ligar \`muted = false\`;  
   - Ao sair do Hero, desligar áudio (\`muted = true\`).  
4. Respeitar \`prefers-reduced-motion\`: fallback para fade simples e clique que abre o vídeo em estado quase fullscreen sem scroll complexo.

**Regras**
- ❌ Não alterar o vídeo fonte ou URL.  
- ✅ Usar apenas transform + opacity em animações.  
- ✅ Não competir visualmente com o Ghost (evitar glow/scale fortes).  
- ✅ Comparar com: HERO-PORTFOLIO-GHOST + docs de Manifesto.

**Critérios de aceite**
- [ ] Thumbnail inicial discreto, posicionado no bottom-right.  
- [ ] Transição suave até fullscreen vinculada ao scroll do Hero.  
- [ ] Hold de 2s em fullscreen com áudio ligado.  
- [ ] Ao sair do Hero, áudio volta a \`muted\`.  
- [ ] Sem travamento de scroll indevido fora do Hero.

---

### 🛠️ Prompt #05 — Portfolio Showcase (Stripes Desktop + Cards Mobile)

**Objetivo**
- Fazer a seção Portfolio Showcase seguir exatamente o layout de stripes com hover/thumbnail no desktop e cards centrados no mobile.

**Arquivos/Rotas envolvidas**
- \`src/components/home/portfolio-showcase/*\`  
- \`src/components/home/HomeHero.tsx\` (âncora para \`#portfolio-showcase\`)  

**Ações**
1. Desktop:
   - Implementar 3 stripes com alinhamentos: direita / centro / esquerda, mantendo mesma coluna lateral.  
   - Thumbnail 288px revelado no hover com animação de largura + opacity (700ms, ease premium).  
   - Arrow em círculo azul rotacionando -45° → 0° no hover.
2. Mobile:
   - Remover label flutuante;  
   - Exibir 3 cards full-width, títulos centralizados, arrow à direita;  
   - Sem reveal de thumbnail (opcional manter oculto ou estático).

**Regras**
- ❌ Não mudar slugs ou textos das categorias.  
- ✅ Tailwind para grid/responsividade.  
- ✅ Motion sempre sutil e editorial.  
- ✅ Comparar com: HOME-PORTFOLIO-* imagens.

**Critérios de aceite**
- [ ] Stripes em desktop com hover que revela thumbnail lateral.  
- [ ] Cards em mobile, centralizados, sem overflow.  
- [ ] Colunas laterais alinhadas ao resto da página.  
- [ ] CTA “let's build something great →” centralizada sob as stripes.  
- [ ] Clique nas stripes leva a \`/portfolio\` com filtro correto.

---

### 🛠️ Prompt #06 — Featured Projects Bento Grid + Stack Mobile

**Objetivo**
- Implementar o grid Bento de 4 cards + CTA no desktop e lista vertical limpa no mobile.

**Arquivos/Rotas envolvidas**
- \`src/components/home/FeaturedProjectsSection.tsx\`  
- \`src/components/home/featured-projects/*\`  
- \`src/components/home/ProjectCard.tsx\`  

**Ações**
1. Configurar grid 12-colunas com os spans corretos (5/7/12/8/4).  
2. Garantir que cada \`ProjectCard\`:
   - Use imagem otimizada (WebP/gif), object-cover;  
   - Renderize pills (tags) no canto superior;  
   - Tenha bloco de texto com título + meta + arrow.  
3. Mobile:
   - Colocar todos os cards em 1 coluna, altura fluida;  
   - CTA como último “card” full-width.

**Regras**
- ❌ Não alterar textos, anos, clientes.  
- ✅ Seguir dimensões relativas do mock, não propor layout novo.  
- ✅ Hover suave em imagem + arrow.  
- ✅ Comparar com: HOME-PORTFOLIO-BLACK---GHOST.jpg.

**Critérios de aceite**
- [ ] Bento grid idêntico visualmente ao mock em desktop.  
- [ ] Stack vertical sem gaps estranhos em mobile.  
- [ ] Nenhum overflow horizontal.  
- [ ] Scroll reveal com stagger leve (sem exageros).

---

### 🛠️ Prompt #07 — Clients/Brands Strip (Home + Sobre)

**Objetivo**
- Tornar a faixa de marcas visualmente idêntica nas páginas Home e Sobre, respeitando full-bleed azul e grid de logos.

**Arquivos/Rotas envolvidas**
- \`src/components/home/ClientsBrandsSection.tsx\`  
- \`src/components/sobre/AboutClosing.tsx\` (ponto de transição para marcas)  

**Ações**
1. Garantir que \`ClientsBrandsSection\` seja usada tanto na Home quanto na Sobre após o fechamento.  
2. Ajustar layout:
   - Fundo \`bg-[#0048ff]\` full-width;  
   - Headline centralizada em branco;  
   - Grid responsivo de logos (2–3 colunas mobile, 6+ desktop).  
3. Aplicar \`filter brightness(0) invert(1)\` ou usar logos brancas estáticas.  
4. Implementar hover only desktop (scale + brightness).

**Regras**
- ❌ Não alterar lista de logos ou their URLs.  
- ✅ Reuso de componente único nas duas páginas.  
- ✅ Comparar com as imagens HOME/SOBRE de marcas.

**Critérios de aceite**
- [ ] Mesma aparência da seção de marcas nas duas páginas.  
- [ ] Grid adaptável, sem distorções.  
- [ ] Logos todas brancas, legíveis no azul.  
- [ ] Sem motion em mobile além de hover/tap feedback básico.

---

### 🛠️ Prompt #08 — Contact Section + Form Acessível

**Objetivo**
- Assegurar que a seção de contato siga o layout 2 colunas desktop / 1 coluna mobile, com formulário acessível e integrado ao FormSubmit.

**Arquivos/Rotas envolvidas**
- \`src/components/home/ContactSection.tsx\`  
- \`src/components/home/contact/*\`  

**Ações**
1. Desktop:
   - Implementar grid 2 colunas: info de contato + form.  
   - Garantir espaçamentos verticais coerentes com o restante.  
2. Mobile:
   - Empilhar: título, sub, info, form, sociais.  
   - Botão de envio full-width.  
3. Acessibilidade:
   - Labels atrelados a inputs;  
   - Mensagens de erro acessíveis via aria (por ex. \`aria-describedby\`);  
   - Foco visível claro.

**Regras**
- ❌ Não alterar textos de contato, e-mails ou telefones.  
- ✅ Tailwind para paddings/gaps e estados de foco.  
- ✅ Comparar com: HOME-PORTFOLIO-* (seção contato).

**Critérios de aceite**
- [ ] Layout 2 colunas limpo em desktop; 1 coluna confortável em mobile.  
- [ ] Botão \`Enviar Mensagem\` responsivo e com feedback de hover/tap.  
- [ ] Form envia corretamente via FormSubmit.  
- [ ] Todos os campos acessíveis via teclado + leitores de tela.

---

### 🛠️ Prompt #09 — Footer Desktop Fixo / Mobile Estático

**Objetivo**
- Garantir que o footer seja fixo **apenas em desktop**, e parte do fluxo normal em mobile.

**Arquivos/Rotas envolvidas**
- \`src/components/layout/SiteFooter.tsx\`  

**Ações**
1. Aplicar classes condicionais por breakpoint:
   - \`lg:fixed lg:bottom-0 lg:w-full\`;  
   - Em \`<lg\`, footer deve ser \`static\` (ou sem \`fixed\`).  
2. Organizar layout:
   - Desktop: linha com copyright à esquerda, navegação + sociais à direita;  
   - Mobile: stack vertical: copyright → nav → sociais.  
3. Revisar z-index para não competir com hero/manifesto.

**Regras**
- ❌ Não alterar texto de copyright.  
- ✅ Respeitar minimum touch target (48×48).  
- ✅ Comparar com: HOME/SOBRE comps de footer.

**Critérios de aceite**
- [ ] Footer fixo apenas em telas \`lg+\`.  
- [ ] Em mobile, footer no fim do scroll, sem sobrepor conteúdo.  
- [ ] Links e ícones acessíveis e responsivos.  

---

### 🛠️ Prompt #10 — /sobre — Hero (vídeo + manifesto) com Overlay

**Objetivo**
- Implementar o hero da página Sobre com vídeo de fundo, overlay escuro e texto manifesto conforme especificação.

**Arquivos/Rotas envolvidas**
- \`src/app/sobre/page.tsx\`  
- \`src/components/sobre/AboutHero.tsx\`  

**Ações**
1. Desktop:
   - Altura \`h-screen\`; vídeo \`object-cover\` full-viewport;  
   - Overlay em \`backgroundDark\` (gradiente mais escuro atrás do texto);  
   - Grid 12 colunas, texto ocupando colunas 7–12, alinhado à direita da página mas texto left-align.
2. Mobile:
   - Vídeo reduzido (~45–55vh) abaixo do header;  
   - Texto manifesto logo abaixo, centralizado, dentro do mesmo fundo escuro.  
3. Motion:
   - Entrada linha a linha (fade + blur leve);  
   - Sem scale ou bounce.

**Regras**
- ❌ Não alterar o conteúdo do manifesto.  
- ✅ Garantir overlay ≥ 80% de opacidade onde há texto.  
- ✅ Comparar com: SOBRE-MOBILE-BLACK---GHOST.jpg e SOBRE-PORTFOLIO-BLACK---GHOST.jpg.

**Critérios de aceite**
- [ ] Texto sempre sobre overlay escuro, legível AA+.  
- [ ] Layout 12 colunas em desktop; 1 coluna em mobile.  
- [ ] Sem overflow horizontal.  
- [ ] Motion sutil, ghostIn easing.

---

### 🛠️ Prompt #11 — /sobre — Origem, O que eu faço, Método

**Objetivo**
- Fazer as seções intermediárias de /sobre (Origem, O que eu faço, Como eu trabalho) respeitarem o grid alternado texto↔mídia, opacidade/blur de mídia e listas de cards.

**Arquivos/Rotas envolvidas**
- \`src/components/sobre/AboutOrigin.tsx\`  
- \`src/components/sobre/AboutWhatIDo.tsx\`  
- \`src/components/sobre/AboutMethod.tsx\`  

**Ações**
1. \`AboutOrigin\`:
   - Desktop: 12-col grid com blocos alternando texto/mídia, mídias com opacidade máx 0.85 e blur leve fixo; nunca encostar texto na mídia (margem lateral ≥ 24px).  
   - Mobile: um fluxo texto → mídia para cada bloco.  
2. \`AboutWhatIDo\`:
   - Implementar grid de 7 cards de capabilities com borda superior azul, título em primary e descrição;  
   - Responsividade: 1 coluna (sm/md), 2 colunas (lg), 3 colunas (xl) com último card centralizado.  
3. \`AboutMethod\`:
   - Vídeo \`VideoAboutMethod.mp4\` como background full-bleed com overlay gradient escuro, texto em colunas 2–7, lista de 6 cards de processo com borda esquerda azul e hover sutil.

**Regras**
- ❌ Não alterar textos dos blocos.  
- ✅ Manter opacidade máxima das mídias < 1 (0.85–0.9).  
- ✅ Respeitar overlay forte em qualquer texto sobre vídeo.  
- ✅ Comparar com: SOBRE-PORTFOLIO-BLACK---GHOST.jpg.

**Critérios de aceite**
- [ ] Alternância texto↔mídia clara em desktop, stack texto→mídia em mobile.  
- [ ] Cards de “O que eu faço” seguindo grid descrito por breakpoint.  
- [ ] Método com overlay forte e lista legível.  
- [ ] Preferes-reduced-motion aplicado (sem parallax se reduzido).

---

### 🛠️ Prompt #12 — /sobre — O que me move + GhostEyes + Fechamento

**Objetivo**
- Implementar a sequência narrativa final de /sobre (frases rotativas + GhostEyes + fechamento com CTAs) respeitando timing, acessibilidade e layout.

**Arquivos/Rotas envolvidas**
- \`src/components/sobre/AboutBeliefs.tsx\`  
- \`src/components/sobre/GhostEyes.tsx\`  
- \`src/components/sobre/AboutClosing.tsx\`  
- \`src/components/sobre/motion.ts\`  

**Ações**
1. Em \`AboutBeliefs\`:
   - Título fixo no topo da seção;  
   - Área central com frases rotativas (1 de cada vez), com ciclos de entrada/permanência/saída conforme timing da spec (~4.2s/frase).  
   - Usar state machine simples (\`phase: initial → phrasesCycling → finalReveal\`).  
2. Em \`GhostEyes\`:
   - Posicionar o Ghost + texto “ISSO É GHOST DESIGN” conforme especificado (grid 2 colunas desktop, coluna única mobile);  
   - Implementar olhos seguindo cursor apenas após \`finalReveal`.  
3. Em \`AboutClosing\`:
   - Título principal “Hoje sou Diretor de Criação…” + parágrafos + dois CTAs (“fale comigo”, “baixar curriculum”), com layout centralizado e botões lado a lado em desktop / stack em mobile.

**Regras**
- ❌ Não remover frases ou alterar texto.  
- ✅ Respeitar \`prefers-reduced-motion\`: se ativo, mostrar todas as frases fixas de uma vez + reveal final imediato.  
- ✅ Botões com foco visível e interação de hover/tap sutil.  
- ✅ Comparar com: SOBRE-MOBILE-BLACK---GHOST.jpg.

**Critérios de aceite**
- [ ] Sequência de frases suave, sem loops infinitos irritantes.  
- [ ] GhostEyes só reage ao cursor após o final da sequência.  
- [ ] Botões finais claros, com layout correto em cada breakpoint.  
- [ ] Nenhum overflow ou jank perceptível.

---

> **Resumo para o agente**  
> - Trate todos os itens de “Requer validação” como pendências.  
> - Aplique os prompts seção a seção, sempre comparando com as imagens de referência oficiais e o documento de specs.  
> - Seu objetivo final é que, para cada seção, todas as respostas da checklist de fidelidade passem a ser **Sim**, sem regressão em performance nem acessibilidade.

`;

export function HomeAboutAuditDoc() {
  return (
    <article
      style={{
        whiteSpace: "pre-wrap",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontSize: "14px",
        lineHeight: 1.6,
      }}
    >
      {homeAboutAuditMarkdown}
    </article>
  );
}

export default HomeAboutAuditDoc;
