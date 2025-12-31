
# **Documento de Especificação Técnica — Home Page**
**Projeto:** Portfólio Institucional de Danilo Novais
**Páginas Principais:** Home, Sobre, Portfólio, Contato
**Foco deste Documento:** Home Page (seções: Header, Hero,Portfolio Showcase, Featured Projects, Clients/Brands, Contact, Footer)
---

## **INFORMAÇÕES GLOBAIS


1. Contexto do Projeto
• Projeto: Portfólio Institucional de Danilo Novais
• Páginas principais:
   • Home
   • Sobre
   • Portfólio
   • Contato

Ordem das seções da Home
1. Header
2. Hero
3. Portfolio Showcase
4. Featured Projects
5. Clients / Brands
6. Contact
7. Footer

⸻

🎨 Design Tokens

Colors
• primary: #0048ff — Cor de destaque e interação
• Background: #0d003b — fundo escuro
• Background para formns: #f0f0f0 — Fundo padrão neutro
• Textopadrão: #fcffff — Texto padrão
• textInverse: #0e0e0e — Texto sobre fundo claro
• TextoDestac: #0048ff — Texto padrão
• neutralLight: #F5F5F5 — Fundo secundário e elementos suaves
• CTA: #0048ff 
• ElementsDetalis: #4fe6ff

⸻

Typography
• Fonte principal: TT Norms Pro (self-host, se licenciado)
• Fallbacks: ui-sans-serif, system-ui
• Tamanhos e pesos:
   • Logo: 18–22px, font-semibold
   • Navegação: 15–16px, font-medium, tracking-tight

⸻

2. Assets Globais (Logos)

Miniatura para janela:
• Logo Light: ./src/assets/logos/LogoLight.svg
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg
• Logo Dark: ./src/assets/logos/LogoDark.svg
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg

Logos para páginas:
• Favicon: ./src/assets/logos/Favicon.svg
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg
• Favicon Light: ./src/assets/logos/FaviconLight.svg
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg

⸻

3. Conteúdo Global por Seção (dados base)

Hero
• Tag: [BRAND AWARENESS]
• Título: Você não vê o design.
• Subtítulo: Mas ele vê você.
• CTA (label): step inside →
• WebGL Atmosférico: Ghost abstrato + pós-processamento

Tipografia:
• Fonte: TT Norms Pro - black and medium

Manifesto (Vídeo)
• Vídeo URL (usado na Hero e na seção Manifesto):
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4

⸻

4. Princípios Globais de Animação
• DOM: Framer Motion
   • Reveals: whileInView
   • Microinterações: whileHover, whileTap
   • Scroll: useScroll, useTransform
• Animar apenas transform e opacity
• WebGL: React Three Fiber (useFrame)
• prefers-reduced-motion: reduce
   • Desativar follow, bloom intenso e parallax
   • Manter layout e fades simples

⸻

Portfolio Showcase
• Título: portfólio showcase

Categorias
• brand-campaigns
   • UI: Brand & Campaigns
   • PT: Brand & Campanhas
   • Thumbnail:
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp

• videos-motions
   • UI: Videos & Motions
   • PT: Vídeos & Motions
   • Thumbnail:
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif

• websites-webcampaigns-tech
   • UI: Web Campaigns, Websites & Tech
   • PT: Campanhas Web, Websites & Tech
   • Thumbnail:
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp


CTA final:
• Label: VEJA MAIS →
• Href: /portfolio

⸻

Featured Projects — cards
• Slug: magic-radio-branding
Título: Magic — devolvendo a magia ao rádio
Categoria: branding & campanha
Cliente: Magic
Ano: 2023
Imagem:
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp

• Slug: branding-project-01
Título: Uma marca ousada e consistente
Categoria: branding
Cliente: Cliente confidencial
Ano: 2022
Imagem:
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp

• Slug: key-visual-campaign
Título: Key visual para campanha sazonal
Categoria: campanha
Cliente: Cliente confidencial
Ano: 2021
Imagem:
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp

• Slug: webdesigner-motion
Título: Experiência web em movimento
Categoria: web & motion
Cliente: Cliente confidencial
Ano: 2023
Imagem:
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif

⸻

Clients / Brands
• Título: marcas com as quais já trabalhei

Logos (monocromáticos claros)
1. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg
2. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg
3. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg
4. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg
5. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg
6. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg
7. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg
8. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg
9. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg
10. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg
11. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg
12. https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg

⸻

Contact
• Título: contato
• Subtítulo: Tem uma pergunta ou quer trabalhar junto?

Form
• Action: https://formsubmit.co/danilo@portfoliodanilo.com
• Button label: Enviar Mensagem

Links
• Telefone: tel:+5511983966838
• Email primário: mailto:danilo@portfoliodanilo.com 
• Email secundário: mailto:dannovaisv@gmail.com
• Instagram: https://instagram.com/danilo_novais
• Facebook: https://facebook.com/danilonovaisvilela
• LinkedIn: https://linkedin.com/in/danilonovais
• Portfolio: https://portfoliodanilo.com
• Twitter: https://twitter.com/danilo_novais

⸻

Footer
• Copyright:
   • Home: © 2025 Danilo Novais Vilela — todos os direitos reservados.
   • Footer (seção): © 2023 Danilo Novais Vilela. Todos os direitos reservados.
   • Sugestão: Unificar para © 2025 ... em todo o site.

• Links:
   • home → #hero
   • portfólio showcase → #portfolio-showcase
   • sobre → #clients (atual) — sugestão: preferir /sobre
   • contato → #contact

⸻

4. Princípios Globais de Animação (consolidados)
• Usar Framer Motion para:
   • Reveals no scroll: whileInView, useInView
   • Microinterações: whileHover, whileTap
   • Animações de scroll: useScroll, useTransform
• Animar apenas transform e opacity
• Respeitar prefers-reduced-motion: reduce:
   • Desativar rotação 3D contínua, parallax e morph thumb→vídeo
   • Manter estados estáticos e fades simples
• Implementação padrão com JS puro (requestAnimationFrame) apenas como alternativa quando necessário

## ESPECIFICAÇÃO POR SEÇÃO (TEMPLATE COMPLETO)
---





# **SECTION NAME: Header (SiteHeader)**
### Desktop: Fluid Glass Header (WebGL)  
### Mobile & Tablet: Staggered Menu Header

---

## 🎯 SECTION PURPOSE

- Entregar uma **navegação principal clara e acessível**, sempre visível.  
- Criar uma **camada atmosférica premium** que conversa com a Hero, mas não compete com ela.  
- Mostrar imediatamente as principais seções (ex.: Home, Sobre, Portfólio, Contato).  
- Reforçar a identidade visual com o efeito de **vidro fluido (desktop)** e o **menu em cascata (mobile)**.

> Regra geral: o Header é moldura, não protagonista. Ele complementa a Hero em vez de disputar atenção.

---

## 🎨 DESIGN & TOKENS

- **Cores**  
  - Fundo do header: vidro translúcido usando `primary`, `gradientStart`, `gradientEnd`.  
  - Texto de navegação: `text` em desktop; `textInverse` quando necessário para contraste.  
  - Ícones (menu/close): usam `accentColor` do sistema.

- **Tipografia**  
  - Fonte principal: TT Norms Pro (self-host, se licenciado)
  - Fallbacks: ui-sans-serif, system-ui
  - Itens de navegação: `font-medium`, tracking levemente positivo.  
  - Itens secundários (social, etc. em mobile): `font-normal`, menor que nav principal.

- **Z-Index / Camadas**  
  - `z-0` → Background da página / Hero.  
  - `z-20` → Conteúdo da Hero.  
  - `z-40` → SiteHeader (sempre por cima da Hero).  

> Regra: sempre garantir contraste suficiente entre o header e o que estiver atrás (Hero, conteúdo, etc.).

---

## **LINKS DE DIRECIONAMENTO:**
- Logo - lado esquerdo
 - **Favicon Light:** - Desktop e Mobile: ["https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg"]
 
  - Navigation links:
  - Home → `/` ou `#hero` - sempre retorna para homepage ["portfoliodanilo.com"]
  - Sobre → `/sobre` - ["portfoliodanilo.com/sobre"]
  - Portfólio → `/portfolio` - ["portfoliodanilo.com/portifolio"]
  - Contato → `#contact` - sempre é direcionado para sessão contato de cada uma das paginas
  
  

## 💠 LAYOUT

### Desktop (≥1024px) — Fluid Glass Header

- Posicionamento:
  - Header flutuante, **fixo no topo** (`position: sticky` ou `fixed`, a definir), com margem superior.  
  - Largura parcial (não full-width), centralizado horizontalmente.
- Estilo:
  - Container com **bordas bem arredondadas** (pill).  
  - Fundo com vidro translúcido (blur + refração WebGL).  
  - Padding confortável em X e Y (altura aproximada: 56–72px).
- Conteúdo interno:
  - Esquerda: logo / marca.  
  - Centro/Direita: lista horizontal de navegação (4–6 itens).  
  - Opcional: call-to-action discreto ou ícones sociais.

### Tablet & Mobile (≤1023px) — Staggered Menu Header

- Barra superior fixa, full-width:
  - Esquerda: logo.  
  - Direita: ícone de menu (hamburger) que vira “X” ao abrir.
- Altura semelhante ao desktop (48–64px), mas sem vidro flutuante “largo” — aqui o header é mais funcional.
- Ao abrir o menu:
  - Menu em **overlay fullscreen** (ou quase), vindo da direita, com gradiente de fundo.  
  - Navegação em coluna, com texto grande e bem espaçado.

---

## ⚙️ INTERACTIONS & MOTION

### Desktop — Fluid Glass (WebGL)

**Comportamento principal:**

- Header funciona como um “bloco de vidro líquido” que reage levemente ao cursor:
  - Movimento **apenas no eixo X** (horizontal), acompanhado por uma leve escala.  
  - Efeito de elasticidade / mola (spring), nunca “teleportando” pro cursor.

**Parâmetros sugeridos (tokens de motion):**

- `motion.glassDamping`  
  - `followDamping` ≈ 0.08–0.12s (tempo para “alcançar” o cursor).  
  - `maxTranslateX` ≈ 40–60px (deslocamento máximo).  
  - `maxScaleX` ≈ 1.05  
  - `maxScaleY` ≈ 1.02  
  - Easing: spring suave (leve overshoot, sem bounce exagerado).

**Efeito visual do vidro:**

- Refração e distorção sutil do conteúdo de fundo.  
- Cromatismo leve nas bordas (aberração RGB discreta).  
- Blur de fundo ajustado para manter legibilidade do texto.

**Interações de navegação:**

- Hover em itens de nav:
  - `opacity: 0.8 → 1`.  
  - Subtle underline ou deslocamento Y de 1–2px no máximo.  
  - Transição de 120–180ms, ease-out.
- Clique:
  - Navega para seção correspondente.  
  - Scroll suave quando for âncora interna (a ser definido na implementação).

---

### Fallback Desktop (sem WebGL / reduced motion)

Para `disableWebGL` ou `prefers-reduced-motion: reduce`:

- Header mantém a **mesma forma, layout e tipografia**, mas:
  - Sem refração, sem aberração cromática, sem follow ao cursor.  
  - Usa blur padrão (`backdrop-filter`) ou um fundo sólido/gradient suave.
- Motion:
  - Nenhum movimento ligado ao cursor.  
  - Apenas transições simples de opacidade / leve translate (se necessário).

> Regra: o fallback deve ser visualmente consistente, mas sem depender de WebGL.

---

### Mobile & Tablet — Staggered Menu

**Estados do menu:**

- `closed`  
  - Header simples no topo.  
  - Ícone de menu (hamburger).  
  - Corpo da página rolando normalmente.

- `opening`  
  - Overlay gradiente: `opacity 0 → 1` em ~200–250ms.  
  - Painel lateral (menu): `translateX 100% → 0` em ~260–320ms (spring leve).  
  - Ícone de menu faz morph para ícone “X”.

- `open`  
  - Menu ocupa praticamente toda a tela.  
  - Scroll do `body` bloqueado.  
  - Itens de navegação aparecem em **stagger** (cascata):
    - Cada item:  
      - `opacity 0 → 1`  
      - `translateY 16px → 0`  
      - `duration` ≈ 220ms  
    - Delay incremental usando `motion.staggerDelay` (ex.: 0ms, 100ms, 200ms, 300ms…).

- `closing`  
  - Animações reversas: itens somem em ordem inversa, painel recua, overlay some.  
  - Ícone volta para hamburger.

**Interações de fechar menu:**

- Tap no ícone “X”.  
- Tap em qualquer item de navegação:
  - Fecha o menu + navega.  
- Tap fora da área principal (overlay clicável) deve fechar o menu.  
- (Opcional) Tecla ESC / gesto de back no navegador deve fechar quando relevante.

---

## 🧱 COMPONENTS & ARQUITETURA

### Contratos de tipos sugeridos

```ts
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface SiteHeaderProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string]; // gradiente principal para mobile
  accentColor: string;
  disableWebGL?: boolean;
  reducedMotion?: boolean;
}
````

#### DesktopFluidHeader

```ts
export interface DesktopFluidHeaderProps {
  navItems: NavItem[];
  height?: number;
  onNavigate: (href: string) => void;
  glass: {
    ior: number;
    thickness: number;
    chromaticAberration: number;
    anisotropy: number;
    smoothness: number;
    maxTranslateX?: number;
    followDamping?: number;   // mapeia para motion.glassDamping
  };
}
```

#### MobileStaggeredMenu

```ts
export interface MobileStaggeredMenuProps {
  navItems: NavItem[];
  logoUrl: string;
  gradient: [string, string];
  accentColor: string;
  isOpen: boolean;            // controlado pelo SiteHeader
  isFixed?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  staggerDelay?: number;      // mapeia para motion.staggerDelay
}
```

### Organização de arquivos (sugerida)

* `components/header/SiteHeader.tsx`
* `components/header/DesktopFluidHeader.tsx`
* `components/header/MobileStaggeredMenu.tsx`
* `components/header/headerTokens.ts`
* `components/webgl/header/HeaderGlassCanvas.tsx` (quando necessário)

---

## ♿ ACCESSIBILITY & PERFORMANCE

* Header sempre visível, com contraste adequado em todas as páginas.

* Suporte a `prefers-reduced-motion: reduce`:

  * Desabilitar WebGL e movimentos baseados no cursor.
  * Animações substituídas por transições discretas ou instantâneas.

* Navegação por teclado:

  * Foco visível nos links do header e itens de menu mobile.
  * Ordem de tabulação coerente (logo → nav → CTA).

* ARIA:

  * Header marcado semanticamente (`<header>`).
  * Ícone de menu com `aria-label` (“Abrir menu”, “Fechar menu”) e `aria-expanded`.

* Performance:

  * WebGL do header deve ser leve (mesh / shader simples) e pausado ou simplificado em dispositivos fracos quando possível.
  * Evitar re-renderizações desnecessárias no scroll.

---

## 🚫 NON-NEGOTIABLES

* ❌ Header não pode comprometer legibilidade do conteúdo nem da Hero.
* ❌ Sem animações agressivas de seguir cursor (nada “chiclete”).
* ❌ Sem transições longas que atrasem a abertura do menu mobile.
* ✅ Desktop: efeito Fluid Glass elegante, com interação moderada.
* ✅ Mobile/Tablet: menu em cascata, rápido, claro e acessível.
* ✅ Fallback sem WebGL totalmente funcional e visualmente coerente.

---

## STATUS

**Status:** Prototipado e refinado para implementação
**Owner:** UI Systems / Header


### 🧩 ASSETS GLOBAIS — Logos

Miniatura para janela
    •    Logo Light:
["./src/assets/logos/LogoLight.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg
    •    Logo Dark:
["./src/assets/logos/LogoDark.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg

⸻

Logos para páginas e menu
    •    Favicon:
["./src/assets/logos/Favicon.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg
    •    Favicon Light:
["./src/assets/logos/FaviconLight.svg"]
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg

---




#  **SECTION NAME: HERO + MANIFESTO**

## SECTION NAME
**Hero (Ghost Atmosphere + Texto Editorial + Manifesto Subsection)**

---

## 🎯 SECTION PURPOSE
- Criar impacto visual inicial com atmosfera **Ghost Blue** etérea e viva.  
- Comunicar posicionamento estratégico através de **texto editorial estático**.  
- Integrar o **vídeo manifesto** como subcamada sensorial da Hero (desktop)  
  e seção independente em fullscreen no mobile.  
- Introduzir a identidade “premium + experimental” sem poluição visual.  

---

## 💠 DESIGN TOKENS

### Colors
| Token | Value | Description |
|--------|--------|-------------|
| `primary` | `#0057FF` | Cor principal da atmosfera “Ghost Blue” |
| `accent` | `#4fe6ff` | Glow e emissive secundário |
| `bg` | `#0d003b` | Fundo escuro de base |
| `neutral` | `#0b0d3a` | Gradiente de transição para o fundo |
| `text` | `#FFFFFF` | Texto editorial principal |
| `highlight` | `#FFFFFF` | Picos de luminosidade e brilho de partículas |

---

### Typography
- **TT Norms Pro**, self-host *(ou fallback: `ui-sans-serif`, `system-ui`)*  
- Hierarquia:
  - `[BRAND AWARENESS]` → 12px, uppercase, `font-mono`
  - `h1` → 4rem–6rem, `font-bold`, `tracking-tight`
  - Subcopy → 1rem–1.25rem, regular
  - CTA → 0.9rem, uppercase, `tracking-wide`, `duration-300`, hover branco  

---

## 🧱 LAYER STRUCTURE (Z-INDEX HIERARCHY)

| Ordem | Layer | Descrição |
|-------|--------|------------|
| **z-50** | 🩵 **Preloader (Ghost Loader)** | SVG animado “Summoning spirits” com barra de progresso |
| **z-30** | 🎞️ **Thumb Vídeo Manifesto** | Vídeo interativo flutuante - auto-looping - 16:9 - posição inicial canto inferior direito da HERO |
| **z-20** | 👻 **Animação Ghost (WebGL)** | Atmosfera viva: Ghost, partículas e fireflies |
| **z-10** | ✍️ **Texto Editorial (HeroCopy)** | Conteúdo fixo e centralizado |
| **z-0** | 🌌 **Gradiente Base** | Fundo `#0d003b` + radial `#04097b` |

---

## 🧩 COMPONENTS

components/home/
├─ HomeHero.tsx            ← Orquestrador (todas as layers)
├─ HeroPreloader.tsx       ← Animação inicial “ghost-loader”
├─ HeroCopy.tsx            ← Texto editorial fixo
├─ ManifestoThumb.tsx      ← Vídeo manifesto flutuante (desktop)
├─ GhostStage.tsx          ← Wrapper dinâmico (Canvas 3D)
├─ GhostStage.module.css
components/canvas/home/
├─ GhostCanvas.tsx
├─ Ghost.tsx
├─ Particles.tsx
├─ Fireflies.tsx
├─ AtmosphereVeil.tsx
├─ RevealingText.tsx
└─ postprocessing/
├─ AnalogDecayPass.ts

---

---

## ⚙️ COMPONENTE PRINCIPAL — `HomeHero.tsx`

```tsx
'use client';

import HeroPreloader from './HeroPreloader';
import HeroCopy from './HeroCopy';
import ManifestoThumb from './ManifestoThumb';
import GhostStage from './GhostStage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const scaleVideo = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const posYVideo = useTransform(scrollYProgress, [0, 1], ["50%", "0%"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["16px", "0px"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative h-[200vh] bg-[#06071f] overflow-hidden">
      <HeroPreloader />

      {/* Camada WebGL */}
      <div className="absolute inset-0 z-20">
        <GhostStage />
      </div>

      {/* Texto Editorial */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="absolute z-10 inset-0 flex flex-col items-center justify-center text-center px-4"
      >
        <HeroCopy />
      </motion.div>

      {/* Vídeo Manifesto - Desktop */}
      <motion.div
        style={{
          scale: scaleVideo,
          y: posYVideo,
          borderRadius: borderRadius
        }}
        className="absolute bottom-10 right-10 z-30 w-[30vw] aspect-video overflow-hidden rounded-2xl shadow-lg hidden md:block"
      >
        <ManifestoThumb />
      </motion.div>
    </section>
  );
}```


## **HERO PRELOADER**
import { motion } from 'framer-motion';

export default function HeroPreloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]"
    >
      <svg className="ghost-svg mb-4" height="80" viewBox="0 0 512 512" width="80">
        <path fill="white" d="M508.3 432.8s-46.6-39-79.5-275.8C420 69.3 346 0 256 0S92 69.3 83.2 157C50.3 393.7 3.7 432.8 3.7 432.8-11.4 458 24.4 461 42.4 460.7c35.3-.5 35.3 40.3 70.5 40.3s35.3-35.3 70.5-35.3 37.4 45.3 72.7 45.3 37.4-45.3 72.7-45.3 35.3 35.3 70.5 35.3 35.3-40.8 70.6-40.3c18 0.3 53.8-2.8 38.7-27.9z"/>
      </svg>
      <p className="font-mono text-xs uppercase tracking-widest text-[#e0e0e0] mb-2">Summoning spirits</p>
      <div className="w-24 h-0.5 bg-[#06071f] rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-[#0057FF] to-[#5227FF]"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
        />
      </div>
    </motion.div>
  );
}

## **HERO COPY**
export default function HeroCopy() {
  return (
    <div className="text-[#d9dade] max-w-3xl mx-auto">
      <p className="font-mono text-sm uppercase tracking-widest mb-3">[BRAND AWARENESS]</p>
      <h1 className="font-bold text-5xl md:text-6xl leading-tight mb-6">Você não vê o design.<br />Mas ele vê você.</h1>
      <a href="/sobre" className="text-[#d9dade] hover:text-white transition-colors duration-300">step inside →</a>
    </div>
  );
}


## ⚙️ INTERACTIVE PROTOTYPE FLOW

### 🩵 1. PRELOADER — “Ghost Loader”
- SVG flutuante animado (`ghostFloat`, `eyePulse`, `textPulse`).  
- Mensagem: `"Summoning spirits"`.  
- Barra de progresso (`from-[#0057FF] to-[#5227FF]`).  
- Fade-out suave (`opacity 1 → 0` após 1.5s).  

---

### 🌫️ 2. GHOST ATMOSPHERE (WEBGL CANVAS)
**Camada sensorial viva**, inspirada em *Spooky Spectral Ghost* [https://gist.github.com/danilonovaisv/6fb4ce27767d6e7f26c27244d4c39873] E [https://codepen.io/danilonovaisv/pen/azZbdQo]
- Mesh esférico emissivo (`#0057FF`), pulso harmônico e flutuação vertical.  
- Olhos reativos (`Eyes.tsx`) → brilho aumenta conforme movimento do mouse.  
- Partículas orgânicas e fireflies orbitam o ghost.  
- Pós-processamento:  
  - `BloomPass` → brilho HDR (intensidade 2.8).  
  - `AnalogDecayPass` → *grain*, *scanlines*, *jitter*, *vignette*.  

**Interações:**
- Cursor move → Ghost segue lentamente o ponteiro (`lerp 0.05`).  
- Movimento senoidal orgânico (`sin(t * 0.8)` / `sin(t * 0.3)`).  
- Performance: `DPR 2`, `antialias false`, desativado em `prefers-reduced-motion`.  

---

### ✍️ 3. HERO TEXT BLOCK
**Conteúdo editorial centralizado (HeroCopy.tsx)**  

• Tag: [BRAND AWARENESS]
• Título: Você não vê o design.
• Subtítulo: Mas ele vê você.


Tipografia:
• Fonte: TT Norms Pro - black and medium

**Características:**
- 100% estático, sem fade ou scroll binding.  
- `text-[#d9dade]` sobre fundo `#06071f`.  
- Centralizado (`flex-col`, `items-center`, `text-center`).  
- **CTA Botão**: `"step inside →"` com ícone de seta  
- **Hover**: Fundo troca para `lightBlue`, seta faz `translate-x-1`
- **Idle (opcional)**: Animação sutil de loop na seta (`0 → 4px → 0`)
---

### 🎞️ 4. MANIFESTO THUMB (SUBSECTION DESKTOP)
**Comportamento (Desktop)**  
- Vídeo miniatura flutuante (`bottom-right`, `z-30`).  
- Vídeo:  
  `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`  
- Autoplay, muted, loop, playsInline.  
- Fade-in suave após preloader.  

'use client';

import { motion } from 'framer-motion';

export default function ManifestoThumb() {
  return (
    <motion.video
      src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
      autoPlay
      muted
      loop
      playsInline
      className="w-full h-full object-cover cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    />
  );
}

**Estados:**
| Estado | Ação | Efeito |
|--------|------|---------|
| Idle | Página carregada | Opacity 0 → 1, scale 0.9 → 1 |
| Hover | Mouse sobre vídeo | Scale 1 → 1.05, ícone gira (-45° → 0°) |
| Scroll | Usuário desce | Vídeo cresce e centraliza, cobrindo o texto |
| Click | Desktop | Salta para estado fullscreen instantâneo |
| Click | Mobile | Alterna som (mute/unmute) |

Sequência exata da animação on-page-load (trigger: viewport intersection ou load + 0.3s delay):

Estado inicial (0%): opacity 0, scale 0.92, translateY(60px) ligeiramente borrada (filter: blur(10px)).
De 0s a 1.2s (duration total):
0-0.4s: fade-in suave opacity de 0 a 0.6 + blur de 10px a 0px (ease-out).
0.4s-0.8s (overlap): scale de 0.92 a 1.02 (overshoot sutil), translateY de 60px a 0px (slide-up from bottom).
0.8s-1.2s: settle para opacity 1, scale 1, com elastic/ease-in-out para bounce mínimo.
Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94) ou 'easeOutExpo'.
Fundo: gradiente escuro ou overlay sutil, texto hero fade-in após 0.6s.
Suave, premium, 60fps, compatível web (GSAP/ScrollTrigger style), sem loop."

**Transições:**
- `ease-in-out`, `duration-500ms`.  
- `border-radius: 12px → 0px`.  
- `scale: 0.3 → 1`.  

---

### 📱 5. MANIFESTO (MOBILE VERSION)
**Na versão mobile, o vídeo manifesto é uma seção independente logo abaixo da Hero.**  
- Ocupa 100% da viewport (`aspect-video`).  
- Autoplay, loop, muted.  
- `whileInView` + `useInView` (Framer Motion) → fade-in + scale 0.95 → 1.  
- Fundo idêntico à Hero (`#06071f`), garantindo continuidade visual.  

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ManifestoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      id="manifesto"
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="block md:hidden w-full bg-[#06071f] aspect-video flex items-center justify-center"
    >
      <video
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </motion.section>
  );
}


⸻


## **Tech Spec: Hero Showreel Animation

Componente Alvo: .video-wrapper (Container do Vídeo) Contexto: Seção Hero (.home-hero)

## **1. Estado Inicial (Idle / Page Load)**
O componente inicia como uma miniatura flutuante sobre o conteúdo, aguardando interação.

Posição (Anchor): Canto Inferior Direito (bottom-gutter, right-gutter).
Dimensões: Aspecto Vertical (Portrait/Mobile) ou tamanho fixo relativo ao grid no Desktop.
Z-Index: 10 (Acima do texto de background, mas abaixo de modais/menus).
Visibilidade: opacity: 0 → opacity: 1 (Fade-in automático após carregamento do DOM).
Mídia: Vídeo em loop, mudo (muted), autoplay, playsinline.

## **2. Interação A: Scroll (Layout Morphing)**
Trigger: Scroll da Página (Vertical Scrub) Tipo: Continuous Timeline (Sincronizado com a posição da barra de rolagem).

Sequência da Animação
À medida que o usuário faz scroll para baixo (0% a 100% da altura da seção Hero):

Propriedade    Valor Inicial (Start)    Valor Final (End)    Curva (Easing)
Scale / Width    ~20-30% da viewport (Thumb)    100% Width / 100% Height (Fullscreen)    linear (controlado pelo scroll)
Position (X, Y)    bottom-right    center-center (0,0)    linear
Border Radius    10px - 20px (Arredondado)    0px (Quadrado)    linear
Overlay Text    opacity: 1 (Visível)    opacity: 0 (Fade out)    power1.out
Nota Técnica: O container pai da Hero deve ter height: 200vh ou superior e propriedade sticky ou pin (GSAP ScrollTrigger) para permitir que essa animação complete antes que a próxima seção suba.

## **3. Interação B: Cursor Hover (Micro-interaction)**
Trigger: Mouse Over (Desktop apenas) Target: .video-wrapper

Estado: Hover In
Scale: 100% → 105% (Zoom suave).
Classe: scale-105
Duração: 500ms
Ease: ease-in-out
Seta (Icon): Rotaciona.
Rotação: -45deg → 0deg.
Classe: rotate-0 (no elemento SVG filho).
Duração: 500ms.
Estado: Hover Out
Scale: Retorna para 100%.
Seta (Icon): Retorna para -45deg.

## **4. Interação C: Click Action (Logic)**
Trigger: click / tap no .video-wrapper.

Condicional 1: Viewport Desktop (min-width: 768px)
Ação: Skip Animation.
Comportamento: O sistema força o scroll da página imediatamente para o ponto final da animação (onde o vídeo está fullscreen).
Código: $store.scroll($store.distanceToBottom(...))
Condicional 2: Viewport Mobile (max-width: 767px)
Ação: Toggle Sound.
Comportamento: Ativa/Desativa o som do vídeo.
Feedback Visual: Ícone de som (.toggle-sound) altera estado (preenchido/vazio) e texto de overlay pode aparecer.
Código: $store.showreelMuted = !$store.showreelMuted

## **5. Tokens de Animação (CSS/Tailwind Reference)**
Para garantir a fidelidade visual durante a implementação:

Transition Timing: duration-500 (500ms).
Timing Function: ease-in-out (Cubic Bezier suave).
Bordas: rounded-md (valor base para o estado inicial).
Breakpoints:
md (768px): Define a mudança de comportamento lógico (Scroll vs Mute) e posicionamento (absolute no desktop vs relative no mobile).

## **Resumo do Fluxo do Protótipo**
Usuário entra na página: Vê a Hero com textos grandes e o vídeo pequeno no canto inferior direito.
Usuário passa o mouse no vídeo: O vídeo cresce levemente e a seta aponta para a direita (convite ao clique).
Opt A (Scrollando): O vídeo começa a crescer e se deslocar para o centro, cobrindo o texto, até virar um background completo da tela.
Opt B (Clicando): A animação salta instantaneamente para o estado "Vídeo Fullscreen".

### 🧱 FINAL Z-INDEX STACK (HERO + MANIFESTO)

z-index    Elemento    Descrição
z-50    Preloader    Ghost Loader
z-30    ManifestoThumb (desktop)    Vídeo flutuante interativo
z-20    GhostCanvas    Ghost + partículas + atmosfera
z-10    HeroCopy    Texto editorial central
z-0    Fundo radial    radial-gradient(circle, #0b0d3a, #06071f)
mobile-only    ManifestoSection    Fullscreen abaixo da Hero


⸻
⚡ PERFORMANCE
    •    WebGL dynamic import (client-only).
    •    DPR 2 máx.
    •    Antialias desativado.
    •    Instancing para partículas.
    •    Fallback CSS (gradiente radial).
    •    useInView → animações apenas quando na viewport.

⸻

♿ ACESSIBILIDADE
    •    Contraste AA garantido (#d9dade / #06071f = 7.2:1).
    •    Texto editorial fixo.
    •    aria-label em links e botões.
    •    Motion reduzido respeita prefers-reduced-motion.
    •    Vídeos sempre iniciam muted.

⸻

🚫 NON-NEGOTIABLES
    •    ❌ Sem glassmorphism.
    •    ❌ Sem texto animado.
    •    ❌ Sem 3D sólido GLB.
    •    ❌ Sem overlays sobre vídeo.
    •    ✅ Ghost é camada atmosférica.
    •    ✅ Hero é editorial e silenciosa.
    •    ✅ Manifesto integra visualmente, mas separa-se no mobile.

⸻

🧩 LAYERS (HERO STACK OVERVIEW)

[Z-50]  HeroPreloader  → SVG Ghost Loader
[Z-30]  ManifestoThumb → Vídeo interativo flutuante
[Z-20]  GhostStage     → Canvas WebGL Ghost + Partículas
[Z-10]  HeroCopy       → Texto editorial fixo
[Z-0]   Background     → Gradiente radial (#0b0d3a → #06071f)
[Mobile] ManifestoSection → Fullscreen video abaixo da Hero


⸻

🌌 EXPECTED RESULT
    •    A Hero surge com atmosfera Ghost viva.
    •    O texto é fixo e editorial, sem motion.
    •    O Ghost flutua organicamente, seguindo o cursor.
    •    O vídeo manifesto aparece pequeno e cresce com o scroll.
    •    No mobile, o manifesto já abre fullscreen.
    •    A transição é cinematográfica, sem cortes abruptos.
    •    Toda a experiência é performática e responsiva.


###🧠 VISUAL HIERARCHY (DESKTOP)
    1.    Preloader (Ghost Loader)
    2.    Hero Background + WebGL Atmosphere
    3.    Ghost Mesh (emissivo, flutuante)
    4.    Fireflies + Partículas
    5.    Hero Text Block (Editorial)
    6.    Manifesto Video Thumb (Floating Layer)
    7.    Transition → Manifesto Section (scroll ou click)

⸻


###🪞 EXPECTED RESULT
    •    Hero silenciosa e cinematográfica.
    •    Texto editorial fixo e legível desde o primeiro frame.
    •    Ghost flutuante reagindo organicamente ao cursor.
    •    Vídeo manifesto aparece como miniatura e cresce ao scroll (desktop).
    •    No mobile, manifesto abre já em fullscreen logo abaixo da Hero.
    •    Atmosfera “Ghost Blue” contínua, com profundidade e leveza.

---




# **SECTION NAME: PORTFOLIO SHOWCASE**

**Versão:** 1.0  
**Última atualização:** 29/12/2025  
**Status:** ✅ Validado | 🎨 Design System Compatível | ♿ A11y Ready

## 🎯 VISÃO GERAL
> *"Apresentar claramente as áreas de atuação organizando o portfólio em categorias distintas, criando uma experiência editorial premium com clareza, ritmo e interatividade suave."*

### 🏷️ COMPONENTES PRINCIPAIS
- `PortfolioShowcaseSection` (wrapper)
- `AccordionRow` (stripe interativa)
- `FloatingLabel` (microcopy com blend mode)
- CTAs aspiracionais


## **PRIMARY MESSAGE / HEADLINE**
- `portfólio (Branco) showcase (#5227FF)` - centralizado

---

### Typography
- **TT Norms Pro**, self-host *(ou fallback: `ui-sans-serif`, `system-ui`)*  

---

## **SECONDARY MESSAGE / SUPPORT TEXT**
- `[what we love working on]` - LightBlue: '#4fe6ff', posicionada de forma absoluta junto a primeiro intem, “Brand & Campaigns", posicionado ao lado esquerdo.
---

## **KEY CONTENT ELEMENTS**
- Headline central da seção.
- Microtexto lateral `[what we love working on]`.
- 3 stripes de categorias interativas.
- CTA aspiracional inferior.

---

## **CALL TO ACTION (if any)**
- `let’s build something great →` → `/#contact`

---

## **LINKS GLOBAIS**
- Serviços Integração com `/portfolio` (com filtro por categoria).
- CTA Integração com `/#contact`.

---

## **LAYOUT TYPE**
- Seção editorial baseada em **stripes expansíveis**.

---


### 🎨 PALETA DE CORES
```js
{
  background: '#0d003b',
  textPrimary: '#fcffff',
  textSelect: '#0048ff',
  brandBlue: '#0048ff',
  textSecondary: 'neutros suaves'
}
```
## 💻 Layout Responsivo

### 🖥️ Desktop (≥1024px)

A seção do portfólio é exibida em uma única coluna centralizada com os seguintes elementos empilhados verticalmente:

- **Título principal**: “portfólio showcase” (centralizado na parte superior)
- **Floating label interativa**: “[what we love working on]”, LightBlue: '#4fe6ff', posicionada de forma absoluta junto a primeiro intem, “Brand & Campaigns", posicionado ao lado esquerdo.

- **Três cards de categoria**, cada um com largura máxima limitada (não 100%) e alinhamento horizontal variável:
  - **Primeiro card**: “Brand & Campaigns [●] [→]” — alinhado à **direita** (`justify-end`)
  - **Segundo card**: “Videos & Motion [●] [→]” — **centralizado** (`justify-center`)
  - **Terceiro card**: “Web Campaigns, Websites & Tech [●] [→]” — alinhado à **esquerda** (`justify-start`) quebrar sempre em duas linhas - linha1 ["Web Campaigns,"] e linha2 ["Websites & Tech"]

- **call-to-actions**, centralizado abaixo dos stripes:
  - “let's build something great →” com ícone de seta
  - **Hover**: Fundo troca para `lightBlue`, seta faz `translate-x-1`
- **Idle (opcional)**: Animação sutil de loop na seta (`0 → 4px → 0`)
  
  ## **ALIGNMENT**

### Desktop (≥1024px)
- Headline centralizada.
- Microtexto alinhado à esquerda do primeiro stripe.
- Stripes com alinhamento alternado:
  1. Direita
  2. Centro
  3. Esquerda


Os cards possuem espaçamento vertical consistente e mantêm margens laterais simétricas na tela grande.

### 📱 Mobile (≤768px)

A mesma seção é reorganizada para uma experiência vertical e fluida:

- **Título principal**: “portfólio showcase” (centralizado no topo)
- **Três cards de categoria**, agora com **largura total do container** (100%):
  - “Brand & Campaigns [→]”
  - “Videos & Motion [→]”
  - “Websites & Tech [→]”
- Cada card é exibido um abaixo do outro, todos centralizados, com padding horizontal e bordas visuais consistentes
- **call-to-actions**, centralizado abaixo dos cards:
  - “let's build something great →”

Não há floating label visível em mobile (pode ser oculto ou integrado de forma alternativa). O layout prioriza toque, legibilidade e carregamento rápido.

## ⚡ INTERAÇÕES PRINCIPAIS

### HOVER (Desktop Only)
```js
// Pseudo-código da animação
onHover(Stripe) => {
  imageWrapper.animate({
    width: "0 → 288px",
    opacity: "0 → 1",
    timing: "700ms cubic-bezier(0.22, 1, 0.36, 1)"
  });
  
  contentGap.animate({
    spacing: "gap-7 → gap-10",
    duration: "300ms ease-in-out"
  });
  
  arrowIcon.animate({
    rotation: "-45deg → 0deg",
    duration: "500ms"
  });
}
```

### SCROLL REVEAL
- **Trigger:** Intersection Observer (30% no viewport)
- **Animation:** Staggered Fade Up - e texto fica azul ('#0057FF')

  - `opacity: 0 → 1`
  - `translateY: 24px → 0px`
  - `duration: 0.8s ease-out`
  

## 💻 IMPLEMENTAÇÃO TÉCNICA

### PortfolioShowcase.tsx
```tsx
import { AccordionRow } from './AccordionRow';

export const PortfolioShowcase = () => {
  const categories = [
    { id: 'brand-campaigns', title: 'Brand & Campaigns', align: 'end' },
    { id: 'videos-motion', title: 'Videos & Motion', align: 'center' },
    { id: 'websites-tech', title: 'Websites & Tech', align: 'start' }
  ];

  return (
    <section 
      aria-label="Portfolio Categories" 
      className="bg-[#F4F5F7] py-24 md:py-32"
    >
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        {/* Floating Label - Desktop Only */}
        <div className="hidden md:block absolute left-[clamp(24px,5vw,96px)] -translate-y-16">
          <span className="text-[#0057FF] uppercase tracking-widest font-mono mix-blend-difference">
            [what we love working on]
          </span>
        </div>
        
        {/* Headline Centralizada */}
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-14 md:mb-20">
          portfólio showcase
        </h2>
        
        {/* Accordion Rows */}
        <div className="flex flex-col gap-10 md:gap-14">
          {categories.map((category) => (
            <AccordionRow 
              key={category.id} 
              category={category} 
              alignment={category.align}
            />
          ))}
        </div>
        
        {/* CTAs Aspiracionais */}
        <div className="mt-20 flex flex-col md:flex-row md:justify-center gap-6">
          <PrimaryButton href="/portfolio" variant="outline">
            Ver todos os projetos →
          </PrimaryButton>
          <PrimaryButton href="/#contact" variant="solid">
            let's build something great →
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
};
```

### AccordionRow.tsx
```tsx
import { ArrowIcon } from './icons';

export const AccordionRow = ({ category, alignment }) => {
  const alignmentClasses = {
    start: 'md:justify-start',
    center: 'md:justify-center',
    end: 'md:justify-end'
  };

  return (
    <Link 
      href={`/portfolio?category=${category.id}`}
      className={`group flex w-full border-t border-[#0057FF] py-8 md:py-14 items-center transition-all ${alignmentClasses[alignment]}`}
      aria-label={`Ver projetos de ${category.title}`}
    >
      <div className="flex items-center gap-5 md:gap-7 group-hover:gap-10 transition-all duration-300 w-full">
        {/* Thumbnail Revealer - Desktop Only */}
        <div className="hidden md:block w-0 overflow-hidden group-hover:w-72 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-md relative h-40 shrink-0">
          <Image 
            src={`/thumbnails/${category.id}.jpg`} 
            alt="" 
            fill
            className="object-cover"
            aria-hidden="true"
          />
        </div>
        
        {/* Category Title */}
        <h3 className="text-2xl md:text-5xl/none font-medium whitespace-nowrap">
          {category.title}
        </h3>
        
        {/* Icon Identifier */}
        <div className="bg-[#0057FF] rounded-full p-2.5 md:p-3.5 shrink-0">
          <ArrowIcon 
            className="text-white w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" 
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
};
```

## ♿ ACESSIBILIDADE (A11Y)
```js
// Checklist A11y
const a11yCompliance = {
  semanticStructure: [
    "Usar <section> com aria-label='Portfolio Categories'",
    "Links com texto descritivo ou aria-label"
  ],
  keyboardNavigation: [
    "focus-visible:ring-[#0057FF] em todos os elementos interativos",
    "Área de toque mínima de 48x48px em mobile"
  ],
  reducedMotion: [
    "@media (prefers-reduced-motion: reduce) {",
    "  transition: none !important;",
    "  animation: none !important;",
    "  /* Manter thumbnails visíveis sem animação */",
    "}"
  ],
  screenReaders: [
    "Thumbnails com alt='' (decorativas)",
    "CTAs com texto completo visível"
  ]
};
```

## ✅ CHECKLIST DE QA

### Layout & Visual
- [ ] **Desktop:** Floating label posicionado corretamente à esquerda
- [ ] **Desktop:** Alinhamento alternado das stripes (direita/centro/esquerda)
- [ ] **Mobile:** Nenhum overflow horizontal
- [ ] **Ultrawide:** Conteúdo não parece "estreito" em telas >1920px

### Interações
- [ ] **Desktop:** Hover revela thumbnail com animação suave (700ms)
- [ ] **Desktop:** Sem layout shift durante hover
- [ ] **Mobile:** Thumbnail não aparece em hover
- [ ] **Todos:** Navegação por teclado completa com foco visível

### Performance
- [ ] **Mobile:** Nenhuma animação de width (apenas transform/opacity)
- [ ] **Todos:** Tempo de animação otimizado (máx 700ms)
- [ ] **Performance:** Imagens com otimização adequada

## 🔗 DEPENDÊNCIAS
```js
{
  pages: [
    "/portfolio",       // Página completa com filtros por categoria
    "/#contact"         // Seção de contato na Home Page
  ],
  components: [
    "PrimaryButton",    // Sistema de botões do design system
    "Image",            // Componente de imagem otimizada
    "ArrowIcon"         // Ícone SVG para interações
  ],
  hooks: [
    "useIntersectionObserver", // Para animações de entrada
    "useReducedMotion"        // Respeitar prefers-reduced-motion
  ]
}
```

## 📊 TRACKING
```js
// Eventos para analytics
const trackingEvents = {
  categoryClick: "portfolio_showcase_category_click",
  ctaClick: "portfolio_showcase_cta_click",
  impression: "portfolio_showcase_view"
};
```
> 💡 **Dica para implementação:** A referência visual é https://loandbehold.studio - priorize o ritmo editorial e a sensação premium nas transições. A animação de hover deve sentir-se orgânica, não mecânica.







# **SECTION NAME: Featured Projects**

**Version:** 1.2  
**Last Updated:** December 29, 2025  
**Status:** ✅ Validated | 🎨 Premium Editorial Layout | ♿ A11y Compliant

> _“Exibir projetos em destaque com um layout de revista visualmente dinâmico, ritmo editorial premium e micro-interações sutis — inspirado diretamente no padrão Lo&Behold.”_

---

## 🎯 PROPÓSITO DA SEÇÃO

- Exibir **seleção curada de projetos** com forte apelo visual
- Criar **ritmo editorial premium** por meio de proporções irregulares (layout bento)
- Direcionar o usuário para **páginas de projeto detalhadas** ou para o portfólio completo
- Reforçar identidade de marca através de **tipografia, cor e movimento controlado**

---

## 📦 DISTRIBUIÇÃO VISUAL DO GRID (BENTO LAYOUT)

Baseado na referência visual fornecida (`PROTFOLIO_CARDS.png`) e no layout Lo&Behold (`loandbehold.studio`), o grid segue este padrão responsivo:

### 🖥️ DESKTOP (≥1024px)

┌──────────────────────────────────────────────────────────────────┐
│                       [Projetos em Destaque]                     │
│                                                                  │
│  ┌──────────────┐    ┌───────────────────────────────────────┐  │
│  │   Card 1     │    │                Card 2                 │  │ ← Linha 1 (50% + 50%)
│  │  (336×500)   │    │             (840×500)                 │  │
│  └──────────────┘    └───────────────────────────────────────┘  │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                        Card 3                             │  │ ← Linha 2 (100% width, 1176×600)
│  │                    (1176×600)                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────┐  ┌──────────┐ │
│  │                   Card 4                     │  │   CTA    │ │ ← Linha 3 (66% + 33%)
│  │                (784×400)                     │  │ (392×400)│ │
│  └──────────────────────────────────────────────┘  └──────────┘ │
└──────────────────────────────────────────────────────────────────┘


## **📱 MOBILE (≤768px)

- Todos os cards empilhados verticalmente
- Cada card: `width: 100%`, altura adaptada ao conteúdo ou mídia
- CTA aparece como último item do fluxo

---

## 📊 **CONTEÚDO DOS PROJETOS

["js
const featuredProjects = [
  {
    id: 1,
    slug: "magic-radio-branding",
    title: "Magic — devolvendo a magia ao rádio",
    category: "branding & campanha",
    client: "Magic",
    year: 2023,
    tags: ["Branding", "Strategy", "Campaign"],
    image: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp",
    layout: { w: "md:w-5/12", h: "h-[500px]" } // ~336px
  },
  {
    id: 2,
    slug: "branding-project-01",
    title: "Uma marca ousada e consistente",
    category: "branding",
    client: "Cliente confidencial",
    year: 2022,
    tags: ["Branding", "Identity"],
    image: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp",
    layout: { w: "md:w-7/12", h: "h-[500px]" } // ~840px
  },
  {
    id: 3,
    slug: "key-visual-campaign",
    title: "Key visual para campanha sazonal",
    category: "campanha",
    client: "Cliente confidencial",
    year: 2021,
    tags: ["Campaign", "Print", "Art Direction"],
    image: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp",
    layout: { w: "w-full", h: "h-[600px]" }
  },
  {
    id: 4,
    slug: "webdesigner-motion",
    title: "Experiência web em movimento",
    category: "web & motion",
    client: "Cliente confidencial",
    year: 2023,
    tags: ["Web", "Motion", "UX"],
    image: "https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif",
    layout: { w: "md:w-8/12", h: "h-[400px]" } // ~784px
  }
];"]


> **NOTA:** As proporções são baseadas em um container de `max-width: 1176px` (equivalente a `1680px` total com padding). Ajuste conforme seu sistema de layout.

---

## 🎨 **DESIGN TOKENS

### Cores
```js
{
  background: "#0d003b",
  textPrimary: "#fcffff",
  textSecundary: "#a1a3a3",
  brandBlue: "#0048ff",
  lightBlue: "#4fe6ff",
  pillBg: "#E6EFEF", 70% de opacidade.
  pillText: "#111111"
}
```

### Tipografia (TT Norms Pro)
- **Seção Headline**: `text-2xl md:text-3xl`, `font-bold`, `text-[#0057FF]`
- **Card Title**: `text-lg md:text-xl`, `font-medium`, `text-[#111111]`
- **Meta Info (Cliente/Ano)**: `text-sm md:text-base`, `text-[#6B7280]`
- **Pills**: `text-xs md:text-sm`, `font-medium`, `uppercase`, `tracking-wide`

### Espaçamento
- **Seção**: `py-16 md:py-24`
- **Gap entre cards**: `gap-y-12 md:gap-y-16`
- **Padding interno do container**: `px-[clamp(24px,5vw,96px)]`

---

## ⚡ **INTERAÇÕES & ANIMAÇÕES

### Hover no Card (Desktop)
- **Seta**: `translate-x-5` (20px para direita), `duration-700 ease-out`
- **Mídia**: `scale-103 + -translate-y-1`, `duration-500`
- **Sombra**: `shadow-xl shadow-blue-500/10` com transição suave

### Scroll Reveal
- **Container**: `opacity: 0 → 1`, `y: 40px → 0`
- **Cards**: `staggerChildren: 0.12`, `scale: 0.96 → 1`
- **Duração**: `0.7s ease-out`

### CTA Final (Card Especial)
- **Texto**: “Like what you see?”
- **Botão**: “view projects →” com ícone de seta
- **Hover**: Fundo troca para `lightBlue`, seta faz `translate-x-1`
- **Idle (opcional)**: Animação sutil de loop na seta (`0 → 4px → 0`)

---

## 💻 IMPLEMENTAÇÃO TÉCNICA (React + Tailwind)

### **FeaturedProjectsSection.tsx

["tsx
import { ProjectCard } from './ProjectCard';
import { CTAProjectCard } from './CTAProjectCard';

export const FeaturedProjectsSection = () => {
  return (
    <section aria-label="Projetos em Destaque" className="bg-[#F4F5F7] py-16 md:py-24">
      <div className="max-w-[1680px] mx-auto px-[clamp(24px,5vw,96px)]">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0057FF] text-center mb-12 md:mb-16">
          Projetos em Destaque
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-y-16 gap-x-6">
          {/* Linha 1 */}
          <div className="md:col-span-5">
            <ProjectCard project={featuredProjects[0]} />
          </div>
          <div className="md:col-span-7">
            <ProjectCard project={featuredProjects[1]} />
          </div>

          {/* Linha 2 */}
          <div className="md:col-span-12">
            <ProjectCard project={featuredProjects[2]} />
          </div>

          {/* Linha 3 */}
          <div className="md:col-span-8">
            <ProjectCard project={featuredProjects[3]} />
          </div>
          <div className="md:col-span-4">
            <CTAProjectCard />
          </div>
        </div>
      </div>
    </section>
  );
};"]


## **ProjectCard.tsx

```tsx
import { ArrowIcon } from '@/components/icons';

export const ProjectCard = ({ project }) => (
  <Link 
    href={`/portfolio/${project.slug}`}
    className="group block h-full"
    aria-label={`Ver projeto: ${project.title}`}
  >
    <div className={`relative overflow-hidden rounded-md ${project.layout.h} w-full`}>
      {/* Pills */}
      <div className="absolute top-4 right-4 z-20 flex gap-1.5 flex-wrap justify-end">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-[#E6EFEF]/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Mídia */}
      {project.image.endsWith('.gif') ? (
        <video autoPlay muted loop playsInline className="w-full h-full object-cover" />
      ) : (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:-translate-y-1"
        />
      )}
    </div>

    {/* Info */}
    <div className="mt-4 flex justify-between items-start">
      <div>
        <h3 className="text-lg md:text-xl font-medium leading-tight">{project.title}</h3>
        <p className="text-[#6B7280] text-sm">{project.client} • {project.year}</p>
      </div>
      <div className="bg-[#0057FF] p-2.5 rounded-full aspect-square flex items-center justify-center text-white shrink-0 transition-transform duration-700 group-hover:translate-x-5">
        <ArrowIcon className="w-4 h-4" />
      </div>
    </div>
  </Link>
);
```

## **CTAProjectCard.tsx

```tsx
export const CTAProjectCard = () => (
  <Link
    href="/portfolio"
    className="group flex flex-col h-full justify-center p-6 md:p-8 bg-[#0057FF] text-white rounded-md hover:bg-[#E6F0FF] hover:text-[#0057FF] transition-colors duration-300"
  >
    <h3 className="text-xl md:text-2xl font-bold mb-4">Like what you see?</h3>
    <div className="flex items-center gap-2">
      <span className="font-medium">view projects</span>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black group-hover:bg-[#0057FF] transition-colors">
        <ArrowIcon className="w-4 h-4 text-white group-hover:text-white transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  </Link>
);
```

---

## ♿ ACESSIBILIDADE (A11Y)

- ✅ Todos os cards são `<Link>` com `href` semântico
- ✅ Imagens com `alt` descritivo
- ✅ Focus visível (`focus-visible:ring-2 ring-[#0057FF]`)
- ✅ Suporte a `prefers-reduced-motion` (desativa animações não essenciais)
- ✅ Área mínima de toque: 44×44px (mobile)
- ✅ Contraste de cor WCAG AAA entre texto e fundo

---

## ✅ CHECKLIST DE QA

### Layout
- [ ] Linha 1: 2 cards lado a lado (5/12 + 7/12)
- [ ] Linha 2: 1 card full-width
- [ ] Linha 3: Card grande + CTA (8/12 + 4/12)
- [ ] Mobile: todos os cards empilhados

### Visual
- [ ] Pills posicionadas no canto superior direito
- [ ] Títulos e metadados com hierarquia clara
- [ ] Cores de fundo e texto conforme design tokens

### Interação
- [ ] Hover move seta 20px para direita
- [ ] Mídia faz leve zoom ao hover
- [ ] CTA muda cor e anima seta ao hover

### Performance
- [ ] Imagens otimizadas (WebP/GIF leve)
- [ ] Lazy load para cards fora do viewport
- [ ] Sem layout shift durante carregamento

---

## 🔗 DEPENDÊNCIAS

- **Páginas**: `/portfolio/[slug]`, `/portfolio`
- **Bibliotecas**: `framer-motion` (scroll reveal), `next/image` ou `<picture>`
- **Design System**: `TT Norms Pro`, ícones SVG, cores definidas em `tailwind.config.js`

---

## 📊 TRACKING (Analytics)

```js
// Eventos recomendados
- project_card_click → { slug, position }
- featured_cta_click → { destination: "/portfolio" }
- section_view → { name: "featured_projects" }
```

---

> **Inspiração:** [Lo&Behold Studio](https://loandbehold.studio)  
> **Objetivo final:** Criar uma experiência editorial premium que equilibra **clareza**, **ritmo visual** e **interatividade suave** — sem distrair do conteúdo principal: os projetos.


---







# **SECTION NAME: Clients/Brands**

## **SECTION PURPOSE**
- Mostrar marcas com as quais o designer já trabalhou  
- Construir confiança e credibilidade  

## **PRIMARY MESSAGE / HEADLINE**
- "marcas com as quais já trabalhei"

## **SECONDARY MESSAGE / SUPPORT TEXT**
- N/A

## **KEY CONTENT ELEMENTS**
- Logos das marcas  - brancas
- Faixa azul de fundo  

## **CALL TO ACTION**
- N/A

## **LAYOUT TYPE**
- Grid de logos  

## **ALIGNMENT**
- **Horizontal:** Logos centralizadas  
- **Vertical:** Centralizado verticalmente  

## **SPACING**
- Padding interno: `py-12`  
- Margem entre os logos: `gap-4`  

## **BACKGROUND**
- Cor sólida azul (`bg-[#0048ff]`)  

## **SECTION COLORS**
- Título: `text-white`  
- Logos: Branco (`filter brightness-0 invert`)  

## **TYPOGRAPHY**
- Fonte: TT Norman
- Peso: **Bold**  
- Tamanho: `text-xl md:text-2xl`  

## **IMAGERY**
- Logos das marcas  

## **MEDIA**
- N/A  

## **COMPONENTS USED**
- `<section>`, `<div>`, `<h2>`, `<div>` (logo), `<img>`  

## **STATE VARIANTS**
- Hover no logo: Leve escala (`scale(1.02)`)  

## **INTERACTIONS**
- Hover no logo: Leve escala (`scale(1.02)`)  

## **SCROLL BEHAVIOUR**
- Reveal on scroll: Animação de entrada staggered ao entrar na viewport  

## **ANIMATIONS**
- **Entrada:**  
  - Título: `initial={{ opacity: 0, y: 16 }} → whileInView={{ opacity: 1, y: 0 }}`  
  - Logos: `staggerChildren: 0.03`  
  - Cada logo: `initial={{ opacity: 0, y: 12, scale: 0.9 }} → animate={{ opacity: 1, y: 0, scale: 1 }}`  
- **Hover:**  
  - `whileHover={{ scale: 1.04 }} + leve brightness(1.1)`  

## **MICRO-INTERACTIONS**
- Feedback visual ao hover no logo  

## **TEXT LIMITS**
- Título: Máximo 50 caracteres  

## **CONTENT PRIORITY**
- Alta: Título e logos  

## **ALTERNATIVE CONTENT**
- Se nenhum logo for exibido, mostrar uma mensagem de erro  

## **LINKS / GLOBAIS**
1. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client1.svg`  
2. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client2.svg`  
3. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client3.svg`  
4. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client4.svg`  
5. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client5.svg`  
6. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client6.svg`  
7. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client7.svg`  
8. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client8.svg`  
9. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client9.svg`  
10. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client10.svg`  
11. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client11.svg`  
12. `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client12.svg`  

## **DATA HOOKS / TRACKING**
- Eventos de hover nos logos para analytics  

## **DEPENDENCIES**
- `HOMEPAGE_CONTENT.clients`  

## **ACCESSIBILITY NOTES**
- Os logos devem ter `alt` descritivo  
- Os logos devem ser acessíveis via teclado  
- Respeitar `prefers-reduced-motion: reduce` desativando animações de entrada  

## **SPECIAL STATES**
- **Carregamento:** Mostrar spinner ou placeholder  
- **Erro:** Mostrar mensagem de erro  

## **NOTES / INSPIRATION**
- Layout inspirado em `HOME PORTFOLIO LAYOUYT-GHOST.jpg`  

## **NON-NEGOTIABLES**
- Faixa azul de fundo  
- Logos das marcas  
- Título "marcas com as quais já trabalhei"  

---





# **SECTION NAME: Contact**

## **SECTION PURPOSE**
- Fornecer informações de contato  
- Permitir que os usuários enviem mensagens  

## **PRIMARY MESSAGE / HEADLINE**
- "contato"  

## **SECONDARY MESSAGE / SUPPORT TEXT**
- "Vamos construir algo grande juntos?"  

## **KEY CONTENT ELEMENTS**
- Informações de contato (telefone, email, site)  
- Formulário de contato  
- Redes sociais  

## **CALL TO ACTION**
- **Texto:** "Enviar Mensagem"  
- **Comportamento:** Ao enviar, envia o formulário para o endpoint definido  

## **LAYOUT TYPE**
- Duas colunas em desktop, uma em mobile  

## **ALIGNMENT**
- **Horizontal:** Informações à esquerda, formulário à direita  
- **Vertical:** Centralizado verticalmente  

## **SPACING**
- Padding interno: `py-12`  
- Margem entre as colunas: `space-x-8`  

## **BACKGROUND**
- Cor sólida branca (`bg-white`)  

## **SECTION COLORS**
- Título: `text-[#0048ff]`  
- Texto: `text-[#111111]`  
- Botão: `bg-[#0048ff]`, `text-white`  

## **TYPOGRAPHY**
- Fonte principal: TT Norms Pro (self-host, se licenciado)
- Peso: **Bold** para o título, **Regular** para o conteúdo  
- Tamanho: Título `text-2xl`, Conteúdo `text-lg`  

## **IMAGERY**
- Ícones de redes sociais  

## **MEDIA**
- N/A  

## **COMPONENTS USED**
- `<section>`, `<div>`, `<h2>`, `<p>`, `<form>`, `<input>`, `<textarea>`, `<button>`, `<a>`  

## **STATE VARIANTS**
- Focus nos inputs: Borda e sombra  
- Hover no botão: Leve elevação (`translateY(-1px)`)  

## **INTERACTIONS**
- Envio do formulário: Envia os dados para o endpoint definido  
- Clique nas redes sociais: Abre o link em nova aba  

## **SCROLL BEHAVIOUR**
- N/A  

## **ANIMATIONS**
- **Entrada:**  
  - Seção: `whileInView={{ opacity: 1, y: 0 }}` partindo de `initial={{ opacity: 0, y: 24 }}`  
  - Campos do formulário com `staggerChildren`  
- **Interações:**  
  - Inputs com `focus-visible`: `ring-2 ring-blue-500 ring-offset-2 ring-offset-[#f5f5f7]`  
  - Botão "enviar mensagem":  
    - `whileHover={{ scale: 1.02, y: -1 }}`  
    - `whileTap={{ scale: 0.98 }}`  

## **MICRO-INTERACTIONS**
- Feedback visual ao focus nos inputs e ao hover no botão  

## **TEXT LIMITS**
- Título: Máximo 30 caracteres  
- Subtítulo: Máximo 100 caracteres  
- Inputs: Máximo 100 caracteres  
- Botão: Máximo 30 caracteres  

## **CONTENT PRIORITY**
- **Alta:** Título e formulário  
- **Média:** Informações de contato e redes sociais  

## **ALTERNATIVE CONTENT**
- Se o formulário não carregar, mostrar uma mensagem de erro  

## **LINKS / DESTINATIONS**
- **Formulário:** Endpoint definido em `HOMEPAGE_CONTENT.contact.form.action`  
- **Action:** `https://formsubmit.co/danilo@portfoliodanilo.com`  

## **REDES SOCIAIS: LINKS EXTERNOS**
- Telefone: `tel:+5511983966838`  
- Email primário: `mailto:danilo@portfoliodanilo.com`  
- Email secundário: `mailto:dannovaisv@gmail.com`  
- Instagram: `https://instagram.com/danilo_novais`  
- Facebook: `https://facebook.com/danilonovaisvilela`  
- LinkedIn: `https://linkedin.com/in/danilonovais`  
- Portfolio: `https://portfoliodanilo.com`  
- Twitter: `https://twitter.com/danilo_novais`  

 
 ### **Protótipo Interativo: Seção de Contato – Informações de Contato e Redes Sociais**

#### **Objetivo**  
Permitir que o usuário visualize e acesse rapidamente os canais de contato (telefone e e-mails) e redes sociais, com clareza visual e feedback imediato ao interagir.

---

#### **Estrutura Visual**

A seção contém dois grupos distintos de itens de contato, organizados verticalmente (em coluna única em mobile, ou alinhados à esquerda em desktop):

1. **Canais de contato direto**  
   - Cada item exibe:  
     - **Um ícone** (telefone ou envelope)  
     - **Texto descritivo legível** (ex: “+55 (11) 98396-6838”, “danilo@portfoliodanilo.com”)  
     - Todo o elemento (ícone + texto) é **clicável** e funciona como um link ativo.  
   - Comportamento visual:  
     - Cor de texto: `#111111`  
     - Ícones na mesma cor do texto  
     - Ao passar o mouse (ou foco por teclado): leve sublinhado ou mudança de cor (`#0057FF`) no texto + ícone  

2. **Redes sociais e portfólio**  
   - Cada item exibe apenas:  
     - **Um ícone representativo da plataforma** (Instagram, LinkedIn, etc.)  
     - **Sem texto descritivo**  
   - Comportamento visual:  
     - Ícones em cor `#111111`  
     - Ao passar o mouse (ou foco): ícone muda para `#0057FF` e aplica leve escala (`transform: scale(1.1)`)  
     - Cada ícone é **clicável** e abre o link em nova aba

---

#### **Interações Esperadas**

- **Clique em telefone**:  
  - Dispara a ação nativa do dispositivo (`tel:+5511983966838`) — abre o app de discagem (mobile) ou prompt de chamada (desktop com suporte).

- **Clique em e-mail**:  
  - Abre o cliente de e-mail padrão com o destinatário pré-preenchido (`mailto:...`).

- **Clique em ícone de rede social ou portfólio**:  
  - Redireciona para a URL da plataforma **em nova aba** (`target="_blank"` com `rel="noopener noreferrer"`).

- **Navegação por teclado**:  
  - Todos os links são focáveis (com `:focus-visible`)  
  - Borda de foco visível (`ring-2 ring-blue-500`) para acessibilidade

- **Respeito a `prefers-reduced-motion`**:  
  - Animações de hover (como escala ou transição de cor) são desativadas se o usuário tiver essa preferência ativada

---

#### **Feedback Visual**

- **Hover / Focus**: mudança de cor e/ou leve transformação de escala  
- **Clique ativo (tap)**: leve compressão visual (`scale(0.98)`) para confirmação tátil  
- **Ícones**: semanticamente identificáveis e consistentes com o estilo do site (mono, linha fina, estilo moderno)

---

#### **Acessibilidade**

- Todos os ícones interativos possuem rótulos invisíveis ou `aria-label` descritivo (ex: “Instagram de Danilo Novais”)  
- Links de e-mail e telefone incluem texto legível (não apenas ícones), garantindo compreensão mesmo sem contexto visual  
- Contraste mínimo de cor conforme WCAG AA (`#111111` sobre fundo branco)

## **DATA HOOKS / TRACKING**
- Eventos de envio do formulário para analytics  

## **DEPENDENCIES**
- `HOMEPAGE_CONTENT.contact`  

## **ACCESSIBILITY NOTES**
- Todos os inputs devem ter `label` associado  
- O formulário deve ser acessível via teclado  
- Respeitar `prefers-reduced-motion: reduce` desativando animações  

## **SPECIAL STATES**
- **Carregamento:** Mostrar spinner ou placeholder  
- **Erro:** Mostrar mensagem de erro  
- **Sucesso:** Mostrar mensagem de sucesso  

## **NOTES / INSPIRATION**
- Layout inspirado em `HOME-PORTFOLIO-LAYOUYT-GHOST.jpg`  

## **NON-NEGOTIABLES**
- Formulário de contato  
- Informações de contato  
- Redes sociais  

--------






# **SECTION NAME: Footer**

⸻

SECTION PURPOSE
    •    Fornecer informações legais e institucionais
    •    Oferecer navegação secundária clara
    •    Disponibilizar acesso às redes sociais
    •    Encerrar a experiência de forma limpa e editorial (especialmente no mobile)

⸻

PRIMARY MESSAGE / HEADLINE
    •    N/A

⸻

SECONDARY MESSAGE / SUPPORT TEXT
    •    © 2025 Danilo Novais Vilela — todos os direitos reservados

⸻

KEY CONTENT ELEMENTS
    •    Copyright
    •    Links de navegação (Home, Portfólio Showcase, Sobre, Contato)
    •    Links para redes sociais

⸻

CALL TO ACTION
    •    N/A

⸻

LAYOUT TYPE

🖥️ Desktop (≥1024px)
    •    Barra fixa no rodapé da viewport
    •    Comportamento persistente
    •    Atua como “âncora” institucional do site

📱 Mobile & Tablet (≤1023px)
    •    Footer estático no fluxo da página
    •    Renderizado como seção final
    •    Nunca fixo
    •    Nunca sobrepõe conteúdo
    •    Nunca compete com CTAs ou Manifesto

⸻

ALIGNMENT

Desktop
    •    Horizontal:
    •    Copyright → esquerda
    •    Links de navegação + redes sociais → direita
    •    Vertical:
    •    Conteúdo centralizado verticalmente na barra

Mobile
    •    Vertical (stacked):
    •    Copyright
    •    Links de navegação
    •    Redes sociais
    •    Alinhamento central ou left-aligned (preferência editorial)

⸻

SPACING

Desktop
    •    Padding interno: py-4 px-6
    •    Espaçamento horizontal entre elementos: space-x-4

Mobile
    •    Padding vertical: py-10
    •    Espaçamento entre blocos: space-y-6
    •    Espaçamento entre links: space-y-3
    •    Área mínima de toque: 48px

⸻

BACKGROUND
    •    Cor sólida azul institucional: bg-[#0057FF]

⸻

SECTION COLORS
    •    Texto: text-white
    •    Links:
    •    Estado normal: text-white
    •    Hover (desktop): leve redução de opacidade (opacity-80)
    •    ⚠️ Em mobile, sem hover visual dependente

⸻

TYPOGRAPHY
    •    Fonte: Sans-serif neo-grotesca (Inter ou fallback do sistema)
    •    Peso: Regular
    •    Tamanho:
    •    Desktop: text-sm
    •    Mobile: text-sm (com maior espaçamento)

⸻

IMAGERY
    •    Ícones SVG monocromáticos para redes sociais

⸻

MEDIA
    •    N/A

⸻

COMPONENTS USED
    •    <footer>
    •    <nav>
    •    <ul>, <li>
    •    <p>
    •    <a>

⸻

STATE VARIANTS

Desktop
    •    Hover nos links:
    •    Mudança sutil de opacidade
    •    Sublinhado animado (mesmo padrão do header)
    •    Hover nos ícones sociais:
    •    scale(1.05)
    •    Leve mudança de opacidade

Mobile
    •    Sem dependência de hover
    •    Feedback apenas no :active / :focus-visible

⸻

INTERACTIONS
    •    Clique nos links:
    •    Desktop: scroll suave para seção ou navegação
    •    Mobile: navegação direta (sem animações complexas)
    •    Clique nas redes sociais:
    •    Abre em nova aba (target="_blank", rel="noopener noreferrer")

⸻

SCROLL BEHAVIOUR

Desktop
    •    Footer fixo:
    •    position: fixed
    •    bottom: 0
    •    left: 0
    •    right: 0

Mobile
    •    Footer não fixo
    •    Fluxo natural do documento
    •    Última seção da página
    •    Nunca ocupa viewport persistentemente

⸻

ANIMATIONS

Desktop
    •    Fade-in simples na primeira renderização:

initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.4 }}



Mobile
    •    Sem animação obrigatória
    •    Respeitar prefers-reduced-motion

⸻

MICRO-INTERACTIONS
    •    Desktop:
    •    Hover visual discreto
    •    Mobile:
    •    Feedback de toque via :active / focus-visible

⸻

TEXT LIMITS
    •    Copyright:
    •    Máx. 100 caracteres
    •    Links:
    •    Máx. 30 caracteres

⸻

CONTENT PRIORITY
    •    Alta:
    •    Copyright
    •    Links de navegação
    •    Média:
    •    Redes sociais

⸻

ALTERNATIVE CONTENT
    •    Se não houver redes sociais:
    •    Simplesmente não renderizar o bloco
    •    ❌ Nenhuma mensagem de erro visível ao usuário

⸻

LINKS / DESTINATIONS
    •    home → #hero
    •    portfólio showcase → #portfolio-showcase
    •    sobre → /sobre (preferível a âncora)
    •    contato → #contact

⚠️ Sugestão aplicada: remover âncora #clients como “sobre” no footer.

⸻

DATA HOOKS / TRACKING
    •    footer_link_click
    •    footer_social_click

⸻

DEPENDENCIES
    •    HOMEPAGE_CONTENT.footer

⸻

ACCESSIBILITY NOTES
    •    Todos os links com aria-label descritivo
    •    Navegável via teclado
    •    Ordem lógica de tabulação
    •    Área mínima de toque garantida em mobile
    •    Contraste AA garantido (branco sobre azul)

⸻

NON-NEGOTIABLES
    •    Footer fixo apenas no desktop
    •    Footer não fixo no mobile
    •    Copyright
    •    Links de navegação
    •    Redes sociais
    •    Sem competição visual com Hero ou Manifesto

⸻

✅ RESULTADO FINAL ESPERADO
    •    Desktop: footer institucional, discreto e sempre presente
    •    Mobile: encerramento limpo, confortável e sem fricção
    •    UX consistente, sem overlays invasivos
    •    Sistema coerente com a filosofia editorial do projeto


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

