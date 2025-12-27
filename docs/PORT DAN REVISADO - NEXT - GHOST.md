
# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais
**Páginas Principais:** Home, Sobre, Portfólio, Contato
**Foco deste Documento:** Home Page (seções: Header, Hero, Manifesto,Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)
---
## INFORMAÇÕES GLOBAIS

### 1. Contexto do Projeto
- Projeto: Portfólio Institucional de Danilo Novais.
- Páginas principais:
  - Home
  - Sobre
  - Portfólio
  - Contato

**Ordem das seções da Home:**
1. Header
2. Hero
3. Vídeo Manifesto (Manifesto)
4. Portfolio Showcase
5. Featured Projects
6. Clients / Brands
7. Contact
8. Footer

---

### 2. Assets Globais
- **Logo Light:**  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg
- **Logo Dark:**  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon.svg
- **Favicon:**  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg

---

### 3. Conteúdo Global por Seção (dados base)

#### Hero
- Tag: `[BRAND AWARENESS]`
- Título:
  ```
  Design, não é
  só estética.
  ```
- Subtítulo: `[É intenção, é estratégia, é experiência.]`
- CTA label: `get to know me better →`
- CTA secundário (scroll): `#manifesto`
- **WebGL Atmosférico:** Ghost abstrato + pós-processamento (substitui qualquer modelo GLB)

**TYPOGRAPHY:**
- Fonte: TT Norms Pro

#### Manifesto (Vídeo)
- Vídeo URL (usado na Hero e na seção Manifesto):  
  https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4

---

### 4. Princípios Globais de Animação
- **DOM:** Framer Motion
  - Reveals (`whileInView`)
  - Microinterações (`whileHover`, `whileTap`)
  - Scroll (`useScroll`, `useTransform`)
- Animar apenas `transform` e `opacity`
- **WebGL:** React Three Fiber (`useFrame`)
- `prefers-reduced-motion: reduce`
  - Desativa follow, bloom intenso e parallax
  - Mantém layout e fades simples


- **Portfolio Showcase**
- Título: `portfólio showcase`
- Categorias:
| ID | Label (UI) |
Label PT (explicativo) | Thumbnail URL
|
| ---------------------------- | -------------------------------- |
-------------------------------- |
-----------------------------------------------------------------------
------------------------------------ |
| `brand-campaigns` | `Brand & Campaigns` |
`Brand & Campanhas` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp` |
| `videos-motions` | `Videos & Motions` |
`Vídeos & Motions` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif` |
| `websites-webcampaigns-tech` | `Web Campaigns, Websites & Tech` |
`Campanhas Web, Websites & Tech` |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp` |
- CTA final:
- Label: `VEJA MAIS →`
- Href: `/portfolio`
- **Featured Projects — cards**
| Slug | Título |
Categoria | Cliente | Ano | Imagem URL
|
| ---------------------- | ------------------------------------- |
--------------------- | ---------------------- | ---- |
-------------------------------------------------------------------------
------------------------------------ |
| `magic-radio-branding` | `Magic — devolvendo a magia ao rádio` |
`branding & campanha` | `Magic` | 2023 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp` |
| `branding-project-01` | `Uma marca ousada e consistente` |
`branding` | `Cliente confidencial` | 2022 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp` |
| `key-visual-campaign` | `Key visual para campanha sazonal` |
`campanha` | `Cliente confidencial` | 2021 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Key-Visual.webp` |
| `webdesigner-motion` | `Experiência web em movimento` | `web &
motion` | `Cliente confidencial` | 2023 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif` |
- **Clients / Brands**
- Título: `marcas com as quais já trabalhei`
- Logos (monocromáticos claros):
| # | URL
|
| --- |
-----------------------------------------------------------------------
---------------------- |
| 1 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client1.svg` |
| 2 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client2.svg` |
| 3 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client3.svg` |
| 4 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client4.svg` |
| 5 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client5.svg` |
| 6 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client6.svg` |
| 7 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client7.svg` |
| 8 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client8.svg` |
| 9 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client9.svg` |
| 10 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client10.svg` |
| 11 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client11.svg` |
| 12 |
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client12.svg` |


- **Contact**
- Título: `contato`
- Subtítulo: `Tem uma pergunta ou quer trabalhar junto?`
- Form:
- Action: `https://formsubmit.co/danilo@portfoliodanilo.com`
- Button label: `Enviar Mensagem`
- Links:
- Telefone: `tel:+5511983966838`
- Email primário: `mailto:dannovaisv@gmail.com`
- Email secundário: `mailto:danilo@portfoliodanilo.com`
- Instagram: `https://instagram.com/danilo_novais`
- Facebook: `https://facebook.com/danilonovaisvilela`
- LinkedIn: `https://linkedin.com/in/danilonovais`
- Portfolio: `https://portfoliodanilo.com`
- Twitter: `https://twitter.com/danilo_novais`
- **Footer**
- Copyright:
- Home: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
- Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos
reservados.`
**[SUGESTÃO]** Unificar para `© 2025 ...` em todo o site.
- Links:
- `home` → `#hero`
- `portfólio showcase` → `#portfolio-showcase`
- `Sobre` → `#clients` (atual) **[SUGESTÃO]** preferir `/sobre`
- `contato` → `#contact`
### 4. Princípios Globais de Animação
- Usar Framer Motion para:
- Reveals no scroll (`whileInView`, `useInView`).
- Microinterações (`whileHover`, `whileTap`).
- Animações de scroll (`useScroll`, `useTransform`).
- Animar apenas `transform` e `opacity`.
- Respeitar `prefers-reduced-motion: reduce`:
- Desativar rotação 3D contínua, parallax e morph thumb→vídeo.
- Manter estados estáticos + fades simples.
**implementação padrão**
para animações de scroll, com JS puro (`requestAnimationFrame`) apenas
como alternativa se necessário.
---

## ESPECIFICAÇÃO POR SEÇÃO (TEMPLATE COMPLETO)
---

# **SECTION NAME: Header (SiteHeader)**
### Desktop: Fluid Glass Navigation  
### Mobile & Tablet: Staggered Menu Navigation

---

## SECTION PURPOSE (what this section must achieve)
- Fornecer navegação global e identidade visual do site.
- Permanecer visível em todas as páginas.
- Reforçar a identidade **premium + experimental** do projeto.
- Atuar como camada atmosférica complementar à Hero Ghost.

---

## RESPONSABILIDADE CONCEITUAL

### Desktop
- O header se comporta como um **objeto óptico fluido**.
- Utiliza **refração real em WebGL** (Fluid Glass).
- Não disputa atenção com a Hero — apenas dialoga visualmente.

### Mobile & Tablet
- O header é **funcional e minimalista**.
- A navegação ocorre via **menu fullscreen staggered**.
- Performance e clareza são priorizadas sobre efeitos visuais.

---

## BREAKPOINT STRATEGY

| Device | Behaviour |
|------|----------|
| Desktop ≥ 1024px | Fluid Glass Header |
| Tablet ≤ 1023px | Staggered Menu |
| Mobile ≤ 640px | Staggered Menu |

---

## DESKTOP — FLUID GLASS HEADER

### VISUAL REFERENCE
https://reactbits.dev/components/fluid-glass

---

### VISUAL BEHAVIOR
- Elemento translúcido com refração real (MeshTransmissionMaterial)
- Distorção óptica sutil
- Chromatic aberration controlada
- Movimento leve seguindo o cursor
- Renderiza o conteúdo por trás (não possui fundo sólido)

---

### CONTENT (DESKTOP)
- Logo (Light)
- Navigation links:
  - Home → `/` ou `#hero`
  - Sobre → `/sobre`
  - Portfolio → `/portfolio`
  - Contato → `#contact`

---

### LAYOUT TYPE
- Header flutuante
- Centralizado horizontalmente
- Altura compacta
- Não ocupa 100% da largura (aspecto de “objeto”)

---

### FILE ARCHITECTURE (DESKTOP)

```
components/header/
 ├─ SiteHeader.tsx
 ├─ DesktopFluidHeader.tsx
 └─ webgl/
     └─ FluidGlass.tsx
```

---

### FLUID GLASS — DEFAULT CONFIGURATION

```tsx
<FluidGlass
  mode="lens"
  lensProps={{
    scale: 0.25,
    ior: 1.15,
    thickness: 5,
    chromaticAberration: 0.1,
    anisotropy: 0.01
  }}
/>
```

---

### INTERACTIONS (DESKTOP)
- Hover nos links:
  - Apenas alteração de opacidade
  - ❌ Sem underline
  - ❌ Sem animações chamativas
- Pointer move:
  - Vidro acompanha suavemente o cursor
- Scroll:
  - Header permanece fixo
  - ❌ Sem morph de tamanho
  - ❌ Sem animação por scroll

---

### PERFORMANCE (DESKTOP)
- Canvas WebGL isolado
- Sem ScrollControls
- DPR limitado
- Geometria simples (`lens.glb`)
- Fallback automático se WebGL falhar

---

### ACCESSIBILITY (DESKTOP)
- Navegação por teclado funcional
- Links com `aria-label`
- Fallback HTML:
  - Logo + links estáticos se WebGL não estiver disponível

---

## MOBILE & TABLET — STAGGERED MENU

### VISUAL REFERENCE
https://reactbits.dev/components/staggered-menu

---

### VISUAL BEHAVIOR
- Menu fullscreen
- Entrada lateral
- Animação staggered editorial
- Camadas de cor animadas (prelayers)
- Ícone Menu ↔ Close animado

---

### STAGGERED MENU — DEFAULT CONFIGURATION

```tsx
<StaggeredMenu
  position="right"
  items={menuItems}
  socialItems={socialItems}
  displaySocials={true}
  displayItemNumbering={true}
  menuButtonColor="#e9e9ef"
  openMenuButtonColor="#000"
  changeMenuColorOnOpen={true}
  colors={['#B19EEF', '#5227FF']}
  accentColor="#5227FF"
  isFixed
/>
```

---

## Z-INDEX STRATEGY

```
z-40 → Header / Menu
z-20 → Hero Content
z-0  → WebGL Hero Canvas
```

---

## NON-NEGOTIABLES (HEADER)
- ❌ Header não compete com a Hero
- ❌ Sem glassmorphism fake em CSS
- ❌ Sem animações decorativas gratuitas
- ✅ WebGL apenas no Desktop
- ✅ Mobile sem WebGL pesado
- ✅ Fallback funcional obrigatório

---





# HEADER (SiteHeader)

## SECTION NAME:

Header (SiteHeader)

## SECTION PURPOSE (what this section must achieve):

* Fornecer navegação global e identidade visual do site.
* Permanecer visível em todas as páginas.
* Reforçar a identidade **premium + experimental** do projeto.
* Atuar como **camada atmosférica complementar** à Hero Ghost (não competir).

## PRIMARY MESSAGE / HEADLINE:

* Identidade + navegação (objeto óptico “premium”).

## SECONDARY MESSAGE / SUPPORT TEXT:

* Header como “objeto” translúcido: presença discreta, leitura clara.

## KEY CONTENT ELEMENTS (bullets, stats, quotes, etc.):

* Logo (Light)
* Links de navegação (Desktop):

  * Home → `/` ou `#hero`
  * Sobre → `/sobre`
  * Portfolio → `/portfolio`
  * Contato → `#contato`
* Mobile/Tablet: botão Menu → abre menu fullscreen

## CALL TO ACTION (if any):

* Navegação primária via links (sem CTA extra no header).

## LINKS GLOBAIS:

* Home: `/` (ou `/#hero`)
* Sobre: `/sobre`
* Portfolio showcase: `/portfolio`
* Contato: `/#contato`

---

## LAYOUT TYPE (hero, grid, list, carousel, form, etc.):

* Header flutuante fixo (Desktop e Mobile)

## ALIGNMENT (left/center/right, vertical alignment):

* Desktop: container centralizado horizontalmente, conteúdo distribuído `space-between`.
* Mobile: logo à esquerda, menu à direita.

## SPACING (top/bottom padding, breathing room):

* Desktop: altura compacta (~64px), padding horizontal ~24px.
* Mobile: altura compacta (~56px), padding horizontal ~20px.
* Margem do topo: 16–20px.

---

## BACKGROUND (color, gradient, image, video):

* Desktop: **WebGL Fluid Glass** (refração real) renderizando o conteúdo por trás.
* Mobile/Tablet: fundo discreto + blur leve, sem WebGL pesado.

## SECTION COLORS (overrides or specific tokens):

* Texto: `white/80 → white` (hover)
* Ativo: `sky-300` (ou token equivalente)
* Linhas/Glows: `sky-400/…`, `fuchsia-400/…` (sutil)

## TYPOGRAPHY (any overrides for headings/body in this section):

* Navegação: 15–16px, `font-medium`, tracking-tight.
* Logo: 18–22px, `font-semibold`.

## IMAGERY (what to show: photos, illustrations, icons, logos):

* Logo “anilo” com marca + wordmark.

## MEDIA (video, animation, Lottie, 3D, etc.):

* Desktop: WebGL (React Three Fiber) + MeshTransmissionMaterial.

---

## COMPONENTS USED (buttons, cards, tabs, accordions, sliders, etc.):

* `SiteHeader.tsx`
* `DesktopFluidHeader.tsx`
* `MobileStaggeredMenu.tsx`
* `webgl/FluidGlass.tsx`

## STATE VARIANTS (hover, active, focus, disabled, selected):

* Links:

  * hover: aumento leve de opacidade
  * active: cor destacada + underline ativo
  * focus-visible: ring acessível
* Menu (mobile):

  * open/close com ícone animado

## INTERACTIONS (click, hover, tap, drag, scroll-trigger, etc.):

* Desktop:

  * hover nos links: opacidade
  * pointer move: vidro acompanha suavemente o cursor (WebGL)
  * click: navegação
* Mobile/Tablet:

  * tap: abrir/fechar menu
  * tap item: navegar e fechar menu

## SCROLL BEHAVIOUR (sticky, parallax, reveal on scroll):

* **Sticky/fixed** no topo.
* **Sem animação por scroll** (não reage ao scroll; não muda tamanho).

## ANIMATIONS (what moves, when, duration, easing):

---

## HERO — VIDEO MORPHING (SCROLL CINEMATOGRÁFICO)

### SECTION NAME:

Hero — Video Morphing (Scroll Cinematográfico)

### SECTION PURPOSE (what this section must achieve):

* Criar uma transição **cinematográfica e contínua** entre a Hero e o Manifesto.
* Transformar uma **thumb central** em um **vídeo fullpage**, guiado exclusivamente pelo scroll.
* Estabelecer uma narrativa visual clara: *objeto → ambiente*.

### PRIMARY MESSAGE / HEADLINE:

* O vídeo não comunica mensagem textual — ele **amplifica o manifesto visual**.

### KEY CONTENT ELEMENTS:

* Vídeo MP4 único (mesmo asset em todas as fases)
* Wrapper sticky
* Scroll-driven morphing

---

### LAYOUT TYPE:

* Sticky full-viewport morphing container

### ALIGNMENT:

* Centro absoluto (horizontal + vertical) no estado inicial

### SCROLL BEHAVIOUR:

* `position: sticky; top: 0`
* Scroll total da Hero: ~180–220vh
* Animação ativa nos primeiros 65–75%

---

### ANIMATION TIMELINE (DESKTOP)

#### Fase 0 — Estado inicial (0% → 5%)

* scale: `0.58`
* border-radius: `24px`
* vídeo autoplay, **muted**

#### Fase 1 — Início do zoom (5% → 25%)

* scale: `0.58 → 0.75`
* border-radius: `24px → 20px`

#### Fase 2 — Transição estrutural (25% → 55%)

* scale: `0.75 → 1`
* width: `60vw → 100vw`
* height: `auto → 100vh`
* border-radius: `20px → 6px`

#### Fase 3 — Fullpage takeover (55% → 75%)

* border-radius: `6px → 0`
* translateY: `0 → -2vh`
* **Áudio é ativado automaticamente**

#### Fase 4 — Lock visual (75% → 100%)

* vídeo permanece fixo
* scroll move o conteúdo subsequente

---

### AUDIO BEHAVIOUR:

* Desktop:

  * Thumb: **muted**
  * Fullpage: **áudio ativo automaticamente**
  * Ao sair para próxima seção: volta para **muted**
* Mobile:

  * Vídeo inicia muted
  * Áudio é ativado quando o vídeo estiver **100% visível na viewport**

---

### INTERACTIONS:

* ❌ Sem interação de mouse
* ❌ Sem hover
* ❌ Vídeo não clicável
* `pointer-events: none`

---

### PERFORMANCE:

* Apenas transformações GPU-friendly
* `will-change: transform, border-radius`
* Sem filtros pesados

---

### ACCESSIBILITY:

* `prefers-reduced-motion: reduce`

  * Animação desativada
  * Vídeo inicia diretamente em fullpage

---

* Desktop — **entrada única (on mount)**:

  * `opacity: 0 → 1`
  * `y: -14 → 0`
  * duration ~0.55s
  * ease: `[0.16, 1, 0.3, 1]`
* Desktop — **cursor follow (contínuo, sutil)**:

  * movimento óptico do glass (damp) + micro-tilt
  * respeita `prefers-reduced-motion`
* Mobile — menu:

  * overlay fade-in
  * painel slide/opacity
  * itens em stagger editorial (~0.04s de delay incremental)

## MICRO-INTERACTIONS (small feedback, e.g. button press, icon change):

* Hover nos links: apenas opacidade
* Link ativo: underline
* Botão menu: ícone “hamburger → X”

---

## TEXT LIMITS (max characters for headline, body, CTA):

* Labels dos links: até ~20–24 caracteres (sem quebrar linha no desktop).

## CONTENT PRIORITY (what must be seen first):

1. Logo
2. Links / Menu
3. Efeito glass como ambiente (secundário)

## ALTERNATIVE CONTENT (fallback if image/video not available):

* Se WebGL falhar: header HTML normal com fundo discreto e borda.

---

## LINKS / DESTINATIONS (where CTAs point):

* Home → `/` ou `#hero`
* Sobre → `/sobre`
* Portfolio → `/portfolio`
* Contato → `#contato`

## DATA HOOKS / TRACKING (events to track in analytics):

* `header_nav_click` (label, href)
* `mobile_menu_open` / `mobile_menu_close`

## DEPENDENCIES (APIs, forms, integrations for this section):

* `framer-motion`
* `@react-three/fiber`
* `@react-three/drei`
* `three`

---

## ACCESSIBILITY NOTES (alt text, motion reduction, ARIA if needed):

* `aria-label` no logo e botão do menu
* `aria-expanded` e `aria-label` no toggle do menu
* `focus-visible` ring nos links
* `prefers-reduced-motion`:

  * desativar followPointer do glass
  * reduzir/evitar animações do menu

## SPECIAL STATES (empty state, error state, loading state):

* WebGL loading: fallback transparente (sem layout shift)
* WebGL erro: fallback HTML estático

---

## NOTES / INSPIRATION (links, references, moodboards):

* Fluid Glass: [https://reactbits.dev/components/fluid-glass](https://reactbits.dev/components/fluid-glass)
* Staggered Menu: [https://reactbits.dev/components/staggered-menu](https://reactbits.dev/components/staggered-menu)

## REFERENCES:

* Referência visual: Header com “pill glass” e glow sutil (vídeo/header anexado)

## "NON-NEGOTIABLES" (things that cannot change in this section):

* ❌ Sem animação por scroll
* ❌ Sem morph de tamanho
* ❌ Sem glassmorphism fake em CSS
* ✅ WebGL apenas no Desktop
* ✅ Mobile/Tablet com menu fullscreen staggered
* ✅ Fallback funcional obrigatório

---







# HERO

## SECTION NAME:

Hero

## SECTION PURPOSE (what this section must achieve):

* Criar impacto visual inicial com atmosfera etérea.
* Comunicar posicionamento estratégico com texto editorial forte.
* Introduzir linguagem digital experimental com WebGL como camada sensorial.
* Direcionar o usuário ao Manifesto com mínima distração.

## PRIMARY MESSAGE / HEADLINE:

* “Design, não é só estética.”

## SECONDARY MESSAGE / SUPPORT TEXT:

* “[BRAND AWARENESS]”
* “[É intenção, é estratégia, é experiência.]”

## KEY CONTENT ELEMENTS (bullets, stats, quotes, etc.):

* Texto editorial (100% estático)
* Botão/link: “get to know me better” (ou equivalente)
* WebGL Ghost no background (atmosférico)
* Thumb de vídeo (Manifesto) no desktop (elemento secundário)

## CALL TO ACTION (if any):

* CTA principal: link para “sobre” (ex: `/sobre`) **ou** interação equivalente definida no design.
* CTA secundário (via thumb): scroll para `#manifesto`

## LINKS GLOBAIS:

* CTA “get to know me better” → `/sobre`
* Thumb Manifesto → `#manifesto`

---

## LAYOUT TYPE (hero, grid, list, carousel, form, etc.):

* Hero editorial centralizado + background WebGL

## ALIGNMENT (left/center/right, vertical alignment):

* Conteúdo centralizado (text-center), verticalmente centrado.
* Thumb no desktop ancorada ao canto inferior direito (overlay dentro da hero).

## SPACING (top/bottom padding, breathing room):

* Hero: min-height ~90vh (ou dvh), padding vertical amplo.
* Conteúdo com respiro (max-width ~3xl).

---

## BACKGROUND (color, gradient, image, video):

* Base: `#06071f`
* Opcional: `radial-gradient(circle at center, #0b0d3a 0%, #06071f 60%)`
* WebGL Ghost (camada z-0)
* Vinheta / integração sutil (camada z-10, se necessário)

## SECTION COLORS (overrides or specific tokens):

* Texto: `#d9dade`
* Glow WebGL: `#0057FF` (bloom)

## TYPOGRAPHY (any overrides for headings/body in this section):

* Headline: 48–72px (responsivo), `font-bold`, leading-tight
* Suporte: 14–18px
* Tracking editorial sutil

## IMAGERY (what to show: photos, illustrations, icons, logos):

* Sem fotos na hero.
* Ghost como elemento abstrato emissivo.

## MEDIA (video, animation, Lottie, 3D, etc.):

* WebGL Ghost (R3F) com pós-processamento
* Thumb de vídeo (desktop)
* Vídeo full-width abaixo da Hero no mobile

---

## COMPONENTS USED (buttons, cards, tabs, accordions, sliders, etc.):

* `HomeHero.tsx` (orchestrator)
* `HeroCopy.tsx` (texto estático)
* `GhostStage.tsx` / `GhostCanvas.tsx` (WebGL)
* `ManifestoThumb.tsx` (thumb vídeo desktop)
* `ManifestoSection.tsx` (seção manifesto)

## STATE VARIANTS (hover, active, focus, disabled, selected):

* CTA link/botão:

  * hover: mudança leve de cor/opacidade
  * focus-visible: ring
* Thumb:

  * hover: micro scale/brightness (opcional, sutil)
  * focus-visible: ring

## INTERACTIONS (click, hover, tap, drag, scroll-trigger, etc.):

* Texto: **sem animação**
* CTA: click navega para `/sobre`
* Thumb (desktop): click faz scroll suave para `#manifesto`
* WebGL: follow do mouse apenas no desktop (sutil)

## SCROLL BEHAVIOUR (sticky, parallax, reveal on scroll):

* Texto: **não reage ao scroll**
* WebGL: **não reage ao scroll**
* Thumb (desktop): **reage ao scroll enquanto a hero sai da viewport** (transform-only)

---

## ANIMATIONS (what moves, when, duration, easing):

### A) Texto (HeroCopy) — NÃO NEGOCIÁVEL

* ✅ 100% estático desde o primeiro frame.
* ❌ Sem fade-in / reveal / scroll binding.

### B) WebGL Ghost (background)

* Movimento contínuo baseado em tempo:

  * flutuação orgânica
  * pulso emissivo
  * partículas / fireflies lentos
* Mouse follow (desktop): damp sutil
* `prefers-reduced-motion`: desativar follow e reduzir intensidade de efeitos

### C) Thumb do Manifesto (desktop) — ENTRADA

* Trigger: `whileInView` / `useInView` (once)
* Motion: fade-in + translateY leve + scale sutil
* duration: ~0.5–0.6s
* ease premium: `[0.43, 0.13, 0.23, 0.96]` (ou `[0.16, 1, 0.3, 1]`)

### D) Thumb do Manifesto (desktop) — SCROLL-DRIVEN (OBRIGATÓRIO)

* Trigger: `useScroll({ target: heroRef, offset: ['start start', 'end start'] })`
* Mapeamentos (0 → 1):

  * `translateY`: 0 → -120px (tunable)
  * `scale`: 1 → 0.82 (tunable)
  * `opacity`: 1 → 0.7 → 0 (com mid-point tunable)
  * `blur`: 0px → 6px
  * (opcional) `rotate`: 0 → -3deg
* Suavização: `useSpring` em y/scale/opacity/rotate
* Restrições:

  * ❌ sem width/height
  * ❌ sem fullscreen
  * ❌ sem position swap para fixed
  * ✅ apenas transform + opacity + filter

### E) Manifesto Section (vídeo abaixo) — REVEAL AO ENTRAR

* Trigger: `whileInView` / `useInView`
* Motion: fade-in + scale leve
* Não é continuidade da thumb (mudança de seção clara)

---

## MICRO-INTERACTIONS (small feedback, e.g. button press, icon change):

* CTA: feedback de hover/tap discreto
* Thumb: hover sutil (scale até ~1.03–1.04) + leve brightness (opcional)

---

## TEXT LIMITS (max characters for headline, body, CTA):

* [BRAND AWARENESS]: até 24–32 chars
* Headline: até 40–60 chars (quebra em 2 linhas)
* Suporte: até 60–90 chars
* CTA: até 22–28 chars

## CONTENT PRIORITY (what must be seen first):

1. Headline
2. Suporte
3. CTA principal
4. WebGL como atmosfera
5. Thumb como elemento secundário

## ALTERNATIVE CONTENT (fallback if image/video not available):

* Se WebGL falhar: fundo radial/gradiente estático.
* Se vídeo não carregar: placeholder sólido sem overlay.

---

## LINKS / DESTINATIONS (where CTAs point):

* CTA principal: `/sobre`
* Thumb: `#manifesto`

## DATA HOOKS / TRACKING (events to track in analytics):

* `hero_cta_click` (label)
* `manifesto_thumb_click`
* `manifesto_video_in_view` (IntersectionObserver)
* `manifesto_audio_unmuted` / `manifesto_audio_muted`

## DEPENDENCIES (APIs, forms, integrations for this section):

* `framer-motion`
* `@react-three/fiber`
* `@react-three/drei`
* `@react-three/postprocessing` (ou passes custom)
* Vídeo: Supabase Storage

---

## ACCESSIBILITY NOTES (alt text, motion reduction, ARIA if needed):

* `prefers-reduced-motion`:

  * reduzir/desativar animações não essenciais
  * manter texto estático (já é)
* Vídeo:

  * `playsInline`, `muted` default
  * áudio só quando em foco (IntersectionObserver)
* Links/CTA:

  * `aria-label`
  * `focus-visible` ring

## SPECIAL STATES (empty state, error state, loading state):

* Preloader (se aplicável): z-50, transição suave
* WebGL loading: fallback background
* Vídeo loading: `preload='metadata'` e placeholder simples

---

## NOTES / INSPIRATION (links, references, moodboards):

* Referência hero ghost (CodePen): [https://codepen.io/danilonovaisv/pen/azZbdQo](https://codepen.io/danilonovaisv/pen/azZbdQo)
* Referência de comportamento (vídeos anexados): Header + Hero + scroll thumb

## REFERENCES:

* Header fluid glass: [https://reactbits.dev/components/fluid-glass](https://reactbits.dev/components/fluid-glass)
* Mobile staggered menu: [https://reactbits.dev/components/staggered-menu](https://reactbits.dev/components/staggered-menu)

## "NON-NEGOTIABLES" (things that cannot change in this section):

* ✅ Texto da hero 100% estático (sem animação)
* ✅ WebGL é atmosfera, não protagonista
* ✅ Thumb reage ao scroll **sem expandir** (transform-only)
* ✅ Seção Manifesto tem reveal próprio (não é continuação da thumb)
* ✅ Mobile: sem thumb na hero; vídeo full-width abaixo
* ✅ Sem overlays sobre vídeos
* ✅ Sem fullscreen forçado; respeitar proporção original






# **SECTION NAME: Portfolio Showcase**

### SECTION PURPOSE (what this section must achieve)
Apresentar claramente as áreas de atuação de Danilo.
Organizar mentalmente o portfólio em categorias.
Criar navegação editorial premium com foco em clareza, ritmo e interatividade suave.

### PRIMARY MESSAGE / HEADLINE
`portfólio showcase`

### SECONDARY MESSAGE / SUPPORT TEXT
`[what we love working on]`

### KEY CONTENT ELEMENTS
- Headline central da seção.
- Microtexto lateral `[what we love working on]`.
- 3 stripes de categorias interativas.
- CTA aspiracional inferior.

### CALL TO ACTION (if any)
- `Ver todos os projetos →` → `/portfolio?category={id}`
- `let’s build something great →` → `/#contact`

### LINKS GLOBAIS
- Integração com `/portfolio` (com filtro por categoria).
- Integração com `/#contact`.

---

## LAYOUT & DESIGN (Adaptado da Referência Lo&Behold)

### ALIGNMENT
**Desktop (≥1024px)**
- Headline centralizada.
- Microtexto alinhado à esquerda do primeiro stripe.
- Stripes com alinhamento alternado:
    - Direita
    - Centro
    - Esquerda
- **Referência Lo&Behold:** As linhas são delimitadas por finas bordas horizontais. O conteúdo dentro de cada stripe é alinhado de forma que o título e o ícone de seta fiquem visualmente centrados no espaço disponível, criando um ritmo fluido.

**Mobile (≤768px)**
- Todos os elementos empilhados.
- Alinhamento à esquerda.
- Stripes ocupam 100% da largura.

### SPACING
**Desktop:**
- `py-24`
- `gap-14` entre stripes
- Espaço claro antes do CTA final.

**Mobile:**
- `py-16`
- `gap-10`

### BACKGROUND
- Fundo sólido `#F4F5F7`.

### SECTION COLORS
- Azul da marca `#0057FF`.
- Texto principal `#111111`.
- Texto secundário em tons neutros.

### TYPOGRAPHY
- **Headline:**
    - Mobile: `text-4xl`
    - Desktop: `text-6xl`
- **Stripes:**
    - Mobile: `text-2xl`
    - Desktop: `text-5xl / text-6xl`
- **Microtexto:**
    - Uppercase
    - Tracking amplo apenas em desktop

---

## INTERAÇÕES & ANIMAÇÕES (Equivalência Comportamental à Referência Lo&Behold)

### IMAGERY & MEDIA
- Miniaturas animadas apenas em hover (desktop).
- Imagem grande apenas no estado expandido.
- Mobile não exibe thumbnails em hover.
- **Referência Lo&Behold:** As miniaturas aparecem com uma animação de slide-in suave do lado esquerdo ao passar o mouse sobre a linha. A imagem é um preview do projeto associado à categoria.

### COMPONENTS USED
- `PortfolioShowcaseSection`
- `CategoryStripe`
- `ExpandedCategoryPanel`
- CTA Button

### STATE VARIANTS
- **Hover (desktop):**
    - Slide-in da thumbnail da esquerda para a direita.
    - Mudança sutil de cor ou peso do título (ex: escurecimento ou leve aumento de peso).
    - Ícone de seta rotaciona levemente (aproximadamente 45 graus) para indicar interatividade.
- **Active:**
    - Stripe expandido, revelando mais detalhes ou uma galeria de projetos.
- **Focus:**
    - Outline visível (keyboard).

### INTERACTIONS
- **Clique / Enter / Space no stripe:**
    - Expande a categoria para mostrar mais detalhes ou redireciona para a página de portfólio filtrada.
- **Clique em CTA:**
    - Navegação direta.
- **Hover:**
    - Micro-interações sutis (desktop apenas). A animação deve ser fluida, sem jank, e respeitar o tempo de transição da referência (aproximadamente 0.3s).

### SCROLL BEHAVIOUR
- Reveal on scroll com fade + translateY.
- Sem sticky.

### ANIMATIONS
- **Entrada da seção:**
    - `opacity: 0 → 1`
    - `y: 24 → 0`
- **Expansão:**
    - Animação de layout (`layout` animation).
    - Easing: `cubic-bezier(0.22,1,0.36,1)`
- **Hover:**
    - Apenas `transform` e `opacity`.
    - `prefers-reduced-motion`: Desativa animações não essenciais.

### MICRO-INTERACTIONS
- Hover no ponto azul (scale ligeiro).
- Ícone de seta rotaciona ao expandir.

---

## TEXT LIMITS & CONTENT PRIORITY
- Labels curtos e escaneáveis.
- **Content Priority:**
    1. Headline
    2. Stripes
    3. CTA final

### ALTERNATIVE CONTENT
- Imagem fallback neutra.
- Conteúdo textual sempre visível.

### LINKS / DESTINATIONS
- `brand-campaigns` → Brand & Campaigns
- `videos-motions` → Videos & Motions
- `websites-webcampaigns-tech` → Web Campaigns, Websites & Tech

### DATA HOOKS / TRACKING
- `portfolio_showcase_category_click`
- `portfolio_showcase_cta_click`

### DEPENDENCIES
- Página `/portfolio` com suporte a filtros.

---

## ACCESSIBILITY NOTES
- `role="button"` nos stripes.
- `aria-expanded` no estado ativo.
- Navegação completa por teclado.
- Foco visível.
- Respeito a `prefers-reduced-motion`.

---

## SPECIAL STATES
- Não aplicável (conteúdo estático).

---

## ULTRAWIDE STRATEGY (1920px+)
- **Objetivo:** Evitar aparência “apertada” ou excessivamente centralizada em telas grandes, mantendo elegância editorial.
- **Container Strategy:**
    - Substituir container rígido por container fluido controlado:
        - `max-width: 1680px`
        - `padding-inline: clamp(24px, 5vw, 96px)`
    - Centralizar conteúdo com `mx-auto`.
- **Layout:**
    - Headline mantém centralização visual.
    - Stripes ganham mais “respiro” lateral.
    - Microtexto permanece alinhado ao primeiro stripe, não ao viewport.
- **Animações:**
    - Mesmos timings do desktop.
    - Nenhuma animação baseada em largura do viewport.

---

## CHECKLIST DE QA VISUAL — Portfolio Showcase

✅ **Desktop (1280 / 1440 / 1680)**
- [ ] Headline centralizada visualmente.
- [ ] Microtexto visível apenas no primeiro stripe.
- [ ] Alinhamento alternado correto (direita / centro / esquerda).
- [ ] Hover revela thumbnail suavemente (slide-in da esquerda).
- [ ] Nenhum layout shift ao hover.
- [ ] Expansão fluida, sem jank.
- [ ] CTA final visível e equilibrado.

✅ **Ultrawide (1920+)**
- [ ] Conteúdo não parece “estreito”.
- [ ] Padding lateral confortável.
- [ ] Stripes não colam nas bordas.
- [ ] Ritmo visual consistente com desktop.
- [ ] Nada parece “perdido” no centro.

✅ **Tablet (768 / 820 / 1024)**
- [ ] Stripes ocupam largura correta.
- [ ] Textos legíveis sem quebra estranha.
- [ ] Expansão não causa overflow.
- [ ] CTA acessível sem scroll excessivo.

✅ **Mobile (320 / 375 / 414)**
- [ ] Sem overflow horizontal.
- [ ] Todos os textos legíveis.
- [ ] Stripes clicáveis com boa área de toque.
- [ ] Thumbnails não aparecem em hover.
- [ ] Expansão vertical suave.
- [ ] CTA final claramente visível.

✅ **Acessibilidade**
- [ ] Navegação completa por teclado.
- [ ] Foco visível em stripes e CTAs.
- [ ] `aria-expanded` correto.
- [ ] Movimento reduzido respeitado.

✅ **Performance**
- [ ] Nenhuma animação de `width` em mobile.
- [ ] Apenas `transform` e `opacity` animados.
- [ ] Sem layout shift perceptível.
- [ ] Imagens carregam corretamente.

✅ **Fidelidade Premium**
- [ ] Ritmo editorial consistente com a referência Lo&Behold.
- [ ] Espaçamento equilibrado.
- [ ] Tipografia hierárquica.
- [ ] Comportamento de hover e expansão alinhado à referência.

---

## STATUS FINAL
Este documento representa a versão final validada da seção Portfolio Showcase para a Home Page, adaptada com equivalência de comportamento, layout e ritmo da referência https://loandbehold.studio.

---

# **SECTION NAME: Featured Projects**
**SECTION PURPOSE:**
- Exibir projetos em destaque
- Direcionar o usuário para mais detalhes
**PRIMARY MESSAGE / HEADLINE:**
- "Projetos em Destaque"
**SECONDARY MESSAGE / SUPPORT TEXT:**
- N/A
**KEY CONTENT ELEMENTS:**
- Grid de cards com imagens dos projetos
- Título, cliente, ano e categoria para cada projeto
- CTA "view projects"
**CALL TO ACTION:**
- Texto: "view projects"
- Comportamento: Ao clicar, redireciona para a página Portfólio Showcase
(`/portfolio`)
**LAYOUT TYPE:**
- Grid responsivo com 1, 2 ou 3 colunas
**ALIGNMENT:**
- Horizontal: Cards centralizados
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-12`
- Margem entre os cards: `gap-6`
**BACKGROUND:**
- Cor sólida cinza claro (`bg-[#F4F5F7]`)
**SECTION COLORS:**
- Título: `text-[#0057FF]`
- Texto dos cards: `text-[#111111]`
- CTA: `bg-[#0057FF]`, `text-white`
**TYPOGRAPHY:**
- Fonte: TT Norms Pro
- Peso: Bold para o título, Regular para o conteúdo dos cards
- Tamanho: Título `text-2xl`, Conteúdo dos cards `text-lg`
**IMAGERY:**
- Imagens dos projetos
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<div>` (card), `<img>`, `<h3>`, `<p>`,
`<a>`
**STATE VARIANTS:**
- Hover no card: Leve elevação (`translateY(-5px)`) e sombra
- Hover no CTA: Leve elevação (`translateY(-1px)`)
**INTERACTIONS:**
- Clique no card: Redireciona para a página do projeto
- Clique no CTA: Redireciona para `/portfolio`
**SCROLL BEHAVIOUR:**
- Reveal on scroll: Animação de entrada staggered ao entrar na viewport
**ANIMATIONS:**
- Entrada da seção:
- Container: initial={{ opacity: 0, y: 40 }} → whileInView={{ opacity: 1,
y: 0 }}
- Cards: staggerChildren: 0.08
- Cada card:
- initial={{ opacity: 0, y: 24, scale: 0.96 }}
- whileInView={{ opacity: 1, y: 0, scale: 1 }}
- Hover nos cards:
- Imagem: whileHover={{ scale: 1.03, y: -4 }}
- Overlay gradiente suave escuro + título em branco com fadeUp
- Shadow: shadow-xl + shadow-blue-500/15
- Card "Like what you see? view projects":
- Botão com o mesmo hover do CTA da hero
- Ícone de seta com animação sutil de x (0 → 4px → 0) em loop lento
**MICRO-INTERACTIONS:**
- Feedback visual ao hover no card e no CTA
**TEXT LIMITS:**
- Título: Máximo 30 caracteres
- Título dos projetos: Máximo 50 caracteres
- Cliente: Máximo 30 caracteres
- Categoria: Máximo 30 caracteres
- CTA: Máximo 30 caracteres
**CONTENT PRIORITY:**
- Alta: Título e cards
- Média: CTA
**ALTERNATIVE CONTENT:**
- Se nenhuma imagem for exibida, mostrar um placeholder com o texto "Imagem
do projeto"
**LINKS / DESTINATIONS:**
- Cards: Link para a página do projeto
- CTA: `/portfolio`
### Projetos
- **Slug:** `magic-radio-branding`
**Título:** Magic — devolvendo a magia ao rádio
**Categoria:** branding & campanha
**Cliente:** Magic
**Ano:** 2023
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp
- **Slug:** `branding-project-01`
**Título:** Uma marca ousada e consistente
**Categoria:** branding
**Cliente:** Cliente confidencial
**Ano:** 2022
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Branding-Project.webp
- **Slug:** `key-visual-campaign`
**Título:** Key visual para campanha sazonal
**Categoria:** campanha
**Cliente:** Cliente confidencial
**Ano:** 2021
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/Key-Visual.webp
- **Slug:** `webdesigner-motion`
**Título:** Experiência web em movimento
**Categoria:** web & motion
**Cliente:** Cliente confidencial
**Ano:** 2023
**Imagem URL:**
https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/project-images/webdesigner-2%202.gif
**DATA HOOKS / TRACKING:**
- Eventos de clique nos cards e no CTA para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.projectCards`
**ACCESSIBILITY NOTES:**
- As imagens dos projetos devem ter `alt` descritivo
- Os cards devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de
entrada
**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
**NON-NEGOTIABLES:**
- Grid de cards com imagens dos projetos
- Informações de cada projeto (título, cliente, ano, categoria)
- CTA que redireciona para a página Portfólio Showcase
---


# **SECTION NAME: Clients/Brands**
**SECTION PURPOSE:**
- Mostrar marcas com as quais o designer já trabalhou
- Construir confiança e credibilidade
**PRIMARY MESSAGE / HEADLINE:**
- "marcas com as quais já trabalhei"
**SECONDARY MESSAGE / SUPPORT TEXT:**
- N/A
**KEY CONTENT ELEMENTS:**
- Logos das marcas
- Faixa azul de fundo
**CALL TO ACTION:**
- N/A
**LAYOUT TYPE:**
- Grid de logos
**ALIGNMENT:**
- Horizontal: Logos centralizadas
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-12`
- Margem entre os logos: `gap-4`
**BACKGROUND:**
- Cor sólida azul (`bg-[#0057FF]`)
**SECTION COLORS:**
- Título: `text-white`
- Logos: Branco (`filter brightness-0 invert`)
**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold
- Tamanho: `text-xl md:text-2xl`
**IMAGERY:**
- Logos das marcas
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<div>` (logo), `<img>`
**STATE VARIANTS:**
- Hover no logo: Leve escala (`scale(1.02)`)
**INTERACTIONS:**
- Hover no logo: Leve escala (`scale(1.02)`)
**SCROLL BEHAVIOUR:**
- Reveal on scroll: Animação de entrada staggered ao entrar na viewport
**ANIMATIONS:**
- Entrada:
- Título: initial={{ opacity: 0, y: 16 }} → whileInView={{ opacity: 1, y:
0 }}
- Logos: staggerChildren: 0.03
- Cada logo: initial={{ opacity: 0, y: 12, scale: 0.9 }} → animate={{
opacity: 1, y: 0, scale: 1 }}
- Hover:
- whileHover={{ scale: 1.04 }} + leve brightness(1.1)
**MICRO-INTERACTIONS:**
- Feedback visual ao hover no logo
**TEXT LIMITS:**
- Título: Máximo 50 caracteres
**CONTENT PRIORITY:**
- Alta: Título e logos
**ALTERNATIVE CONTENT:**
- Se nenhum logo for exibido, mostrar uma mensagem de erro
**LINKS / Globais:**
1.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client1.svg`
2.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client2.svg`
3.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client3.svg`
4.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client4.svg`
5.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client5.svg`
6.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client6.svg`
7.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client7.svg`
8.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client8.svg`
9.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client9.svg`
10.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client10.svg`
11.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client11.svg`
12.
`https://aymuvxysygrwoicsjgxj.supabase
.co/storage/v1/object/public/client-logos/client12.svg`
**DATA HOOKS / TRACKING:**
- Eventos de hover nos logos para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.clients`
**ACCESSIBILITY NOTES:**
- Os logos devem ter `alt` descritivo
- Os logos devem ser acessíveis via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações de
entrada
**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
**NON-NEGOTIABLES:**
- Faixa azul de fundo
- Logos das marcas
- Título "marcas com as quais já trabalhei"
---


# **SECTION NAME: Contact**
**SECTION PURPOSE:**
- Fornecer informações de contato
- Permitir que os usuários enviem mensagens
**PRIMARY MESSAGE / HEADLINE:**
- "contato"
**SECONDARY MESSAGE / SUPPORT TEXT:**
- "Tem uma pergunta ou quer trabalhar junto?"
**KEY CONTENT ELEMENTS:**
- Informações de contato (telefone, email, site)
- Formulário de contato
- Redes sociais
**CALL TO ACTION:**
- Texto: "Enviar Mensagem"
- Comportamento: Ao enviar, envia o formulário para o endpoint definido
**LAYOUT TYPE:**
- Duas colunas em desktop, uma em mobile
**ALIGNMENT:**
- Horizontal: Informações à esquerda, formulário à direita
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-12`
- Margem entre as colunas: `space-x-8`
**BACKGROUND:**
- Cor sólida branca (`bg-white`)
**SECTION COLORS:**
- Título: `text-[#0057FF]`
- Texto: `text-[#111111]`
- Botão: `bg-[#0057FF]`, `text-white`
**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Bold para o título, Regular para o conteúdo
- Tamanho: Título `text-2xl`, Conteúdo `text-lg`
**IMAGERY:**
- Ícones de redes sociais
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<section>`, `<div>`, `<h2>`, `<p>`, `<form>`, `<input>`, `<textarea>`,
`<button>`, `<a>`
**STATE VARIANTS:**
- Focus nos inputs: Borda e sombra
- Hover no botão: Leve elevação (`translateY(-1px)`)
**INTERACTIONS:**
- Envio do formulário: Envia os dados para o endpoint definido
- Clique nas redes sociais: Abre o link em nova aba
**SCROLL BEHAVIOUR:**
- N/A
**ANIMATIONS:**
- Entrada:
- Seção: whileInView={{ opacity: 1, y: 0 }} partindo de initial={{
opacity: 0, y: 24 }}
- Campos do formulário com staggerChildren
- Interações:
- Inputs com focus-visible: ring-2 ring-blue-500 ring-offset-2
ring-offset-[#f5f5f7]
- Botão "enviar mensagem":
- whileHover={{ scale: 1.02, y: -1 }}
- whileTap={{ scale: 0.98 }}
**MICRO-INTERACTIONS:**
- Feedback visual ao focus nos inputs e ao hover no botão
**TEXT LIMITS:**
- Título: Máximo 30 caracteres
- Subtítulo: Máximo 100 caracteres
- Inputs: Máximo 100 caracteres
- Botão: Máximo 30 caracteres
**CONTENT PRIORITY:**
- Alta: Título e formulário
- Média: Informações de contato e redes sociais
**ALTERNATIVE CONTENT:**
- Se o formulário não carregar, mostrar uma mensagem de erro
**LINKS / DESTINATIONS:**
- Formulário: Endpoint definido em `HOMEPAGE_CONTENT.contact.form.action`
- Action: `https://formsubmit.co/danilo@portfoliodanilo.com`
- **Redes sociais: Links externos:**
- Telefone: `tel:+5511983966838`
- Email primário: `mailto:dannovaisv@gmail.com`
- Email secundário: `mailto:danilo@portfoliodanilo.com`
- Instagram: `https://instagram.com/danilo_novais`
- Facebook: `https://facebook.com/danilonovaisvilela`
- LinkedIn: `https://linkedin.com/in/danilonovais`
- Portfolio: `https://portfoliodanilo.com`
- Twitter: `https://twitter.com/danilo_novais`
**DATA HOOKS / TRACKING:**
- Eventos de envio do formulário para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.contact`
**ACCESSIBILITY NOTES:**
- Todos os inputs devem ter `label` associado
- O formulário deve ser acessível via teclado
- Respeitar `prefers-reduced-motion: reduce` desativando animações
**SPECIAL STATES:**
- Carregamento: Mostrar spinner ou placeholder
- Erro: Mostrar mensagem de erro
- Sucesso: Mostrar mensagem de sucesso
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`
**NON-NEGOTIABLES:**
- Formulário de contato
- Informações de contato
- Redes sociais
---


## **SECTION NAME: Footer**
**SECTION PURPOSE:**
- Fornecer informações legais e de contato
- Permitir que os usuários voltem ao topo da página
**PRIMARY MESSAGE / HEADLINE:**
- N/A
**SECONDARY MESSAGE / SUPPORT TEXT:**
- "© 2025 Danilo Novais Vilela — todos os direitos reservados"
**KEY CONTENT ELEMENTS:**
- Copyright
- Links de navegação (Home, Portfolio Showcase, Brands, Contact)
- Redes sociais
**CALL TO ACTION:**
- N/A
**LAYOUT TYPE:**
- Barra fixa no rodapé da página
**ALIGNMENT:**
- Horizontal: Copyright à esquerda, links e redes sociais à direita
- Vertical: Centralizado verticalmente
**SPACING:**
- Padding interno: `py-4`
- Margem entre os elementos: `space-x-4`
**BACKGROUND:**
- Cor sólida azul (`bg-[#0057FF]`)
**SECTION COLORS:**
- Texto: `text-white`
- Links: `text-white`, `hover:text-[#0057FF]`
**TYPOGRAPHY:**
- Fonte: Sans-serif neo-grotesca (Inter ou similar)
- Peso: Regular
- Tamanho: `text-sm`
**IMAGERY:**
- Ícones de redes sociais
**MEDIA:**
- N/A
**COMPONENTS USED:**
- `<footer>`, `<div>`, `<p>`, `<ul>`, `<li>`, `<a>`
**STATE VARIANTS:**
- Hover nos links: Muda a cor do texto para azul (`text-[#0057FF]`)
**INTERACTIONS:**
- Clique nos links: Redireciona para a página ou faz scroll até a seção
- Clique nas redes sociais: Abre o link em nova aba
**SCROLL BEHAVIOUR:**
- Fixo no rodapé da página (`fixed bottom-0 left-0 right-0`)
**ANIMATIONS:**
- Apenas um fadeIn simples:
- initial={{ opacity: 0 }}
- whileInView={{ opacity: 1 }}
- Links com sublinhado animado igual ao header; ícones sociais com hover
scale(1.05) + leve mudança de opacidade
**MICRO-INTERACTIONS:**
- Feedback visual ao hover nos links
**TEXT LIMITS:**
- Copyright: Máximo 100 caracteres
- Links: Máximo 30 caracteres
**CONTENT PRIORITY:**
- Alta: Copyright e links de navegação
- Média: Redes sociais
**ALTERNATIVE CONTENT:**
- Se nenhuma rede social for exibida, mostrar uma mensagem de erro
**LINKS / DESTINATIONS:**
- Copyright:
- Home: `© 2025 Danilo Novais Vilela — todos os direitos reservados.`
- Footer seção: `© 2023 Danilo Novais Vilela. Todos os direitos
reservados.`
- Links:
- `home` → `#hero`
- `portfólio showcase` → `#portfolio-showcase`
- `sobre` → `#clients`
- `contato` → `#contact`
**DATA HOOKS / TRACKING:**
- Eventos de clique nos links e redes sociais para analytics
**DEPENDENCIES:**
- `HOMEPAGE_CONTENT.footer`
**ACCESSIBILITY NOTES:**
- Todos os links devem ter `aria-label` descritivo
- O footer deve ser navegável via teclado (tab)
**SPECIAL STATES:**
- N/A
**NOTES / INSPIRATION:**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
**NON-NEGOTIABLES:**
- Footer fixo
- Copyright
- Links de navegação
- Redes sociais
---


# **ANEXO TÉCNICO — WEBGL ATMOSFÉRICO (GHOST)**

## Objetivo
Documentar o pipeline técnico da Hero Ghost WebGL, substituindo completamente a abordagem anterior baseada em vidro líquido, GLB e MeshTransmissionMaterial.

---

## Paradigma Atual
- Sem modelos GLB
- Sem MeshTransmissionMaterial
- Sem ScrollControls
- WebGL como camada sensorial
- Pós-processamento como linguagem visual

---

## Canvas
```tsx
<Canvas
  dpr={[1, 2]}
  gl={{ antialias: false }}
  camera={{ position: [0, 0, 5], fov: 45 }}
>
```

---

## Loop de Animação
```ts
useFrame((state, delta) => {
  ghost.position.lerp(target, 0.08)
  material.emissiveIntensity =
    1 + Math.sin(state.clock.elapsedTime) * 0.2
})
```

---

## Postprocessing
- Bloom para aura
- Analog Decay para textura temporal
- Intensidade moderada (premium)

---

## Regras Não-Negociáveis
- WebGL nunca controla layout
- Texto nunca depende de shader
- Se o Canvas falhar, a Hero continua funcional

---

## Regra de Ouro
> WebGL apoia a narrativa. Nunca a substitui.
