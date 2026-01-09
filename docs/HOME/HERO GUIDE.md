
# ✅ CHECKLIST — Hero Section para Portfólio de Design Gráfico

## 🎯 1. Propósito da Hero
- Quero trazer um impacto na primeira impressão para quem entra na minha pagina, gerar curiosidade. Criar uma experiência hero imersiva e responsiva, com atmosfera 3D, manifesto em vídeo e animação de entrada impactante. A sessão além da animçao 3D (Inspirado em: CodePen: https://codepen.io/danilonovaisv/pen/YPWyrdW) com a frase de impacto contará um video manifesto com resumo poetico do meu trabalho (Animação scroll do video baseada na referencia do site ('https://loandbehold.studio/').
- A ação principal na sessão é CTA que leva para sessão SOBRE e/ou entrar em contato.




## 🧑‍🎨 2. Identidade Visual
- Color Palette:
| Token          | Value     | Uso                                                      |
| -------------- | --------- | -------------------------------------------------------- |
| bluePrimary    | `#0048ff` | Cor primária da marca, CTAs, links, elementos interativos |
| background     | `#040013` | Fundo escuro principal                                   |
| text           | `#fcffff` | Texto principal em fundo escuro                          |

- Typography:
**Fonte primária:** TT Norms Pro (self-hosted, fallback: `ui-sans-serif, system-ui`)
Tokens de texto **responsivos** (usando `clamp`) para manter coerência em todos os breakpoints:

| Token     | Mobile (~<640px) | Desktop (~≥1024px) | Peso   | Uso                                                              
| display   | 2.5rem (40px)    | 4.5rem (72px)      | Black  | Frases grandes no meio da página, não-semânticas (Big Phrase) 
- src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Black.woff2') format('woff2'); 
| h1        | 2rem (32px)      | 3.5rem (56px)      | Bold   | Hero headlines, títulos principais 
- src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2') format('woff2'); 
| h2        | 1.5rem (24px)    | 2.5rem (40px)      | Bold   | Títulos de seção
- src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2') format('woff2'); 
| h3        | 1.25rem (20px)   | 1.75rem (28px)     | Medium | Títulos de cards, subtítulos
- src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Medium.woff2') format('woff2')
| body      | 1rem (16px)      | 1.125rem (18px)    | Regular| Texto corrido 
- src: url('https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Regular.woff2') format('woff2');





## ✍️ **3. Conteúdo da Hero**

**Conteúdo**:
- Tag: `[BRAND AWARENESS]` (mono, 19px)
- Display: “Você não vê / o design.” (2 e 3 linhas)
- H2: “Mas ele vê você.” (destacado)

**CTA:** “step inside →” (link: `/sobre`, hover animado)
**Design Visual:**
- **Formato:** Compósito (Pílula à esquerda + Círculo à direita).
- **Cor:** Azul Primário (`#0048ff`). Texto Branco.
- **Texto:** Uppercase, tracking médio, padding `px-6 py-3`.
- **Ícone:** Seta (→) centralizada no círculo.

**Estilo**:
- Centralizado verticalmente
- Cor: `#d9dade` 

---
## 🎥 4. Animações e Interações

 **🎬 Entrada TExtos (Page Load)**
```js
initial: {
  opacity: 0,
  scale: 0.92,
  translateY: 60,
  filter: "blur(10px)"
},
animate: {
  opacity: 1,
  scale: [1.02, 1],
  translateY: 0,
  filter: "blur(0px)"
},
duration: 1.2s,
easing: [0.25, 0.46, 0.45, 0.94]
```

**CTA - Interações e Animações:**
1.  **Hover (Desktop):** O botão inteiro sobe 1px (`translateY(-1px)`).
2.  **Seta (Opcional):** Desliza 4px para a direita no hover.
3.  **Click (Mobile):** Efeito de compressão (`scale(0.98)`).
4.  **Foco (Teclado):** Outline de 2px sólido cor `#4fe6ff` com offset de 4px.


- [ ] Qual tipo de animação deseja usar? (Framer Motion: fade-in, slide, spring?; Three.js para fundo animado?)
- [ ] Efeitos ao scroll ou load?
- [ ] Interação no hover dos CTAs?




## 🖼️ **5. Imagens / Elementos Visuais**

### **Animação Ghost - Elementos visuais:** 

### Background / atmosfera
| aspecto | observação |
|---|---|
| **Cores e textura** | O fundo da hero é um **gradiente bem escuro** (`#0a0a0a` → `#1a1a1a`) aplicado ao `body` e ao `preloader`. Após a transição, o canvas do WebGL é transparente e um plano em Three.js (Mesh com `PlaneGeometry(300,300)`) recebe um **shader próprio** chamado _atmosphere_. Esse shader controla a opacidade e cria um **halo circular** em torno do fantasma. Ele usa `revealRadius`, `fadeStrength`, `baseOpacity` e `revealOpacity` para revelar gradualmente a região perto do personagem. Esse fundo não é uma imagem, mas sim um **material customizado** em Three.js.  |
| **Efeito de película analógica** | Após o render da cena, um **passo de pós‑processamento** (ShaderPass) aplica _grain_, _bleeding_, _scanlines_, _vignette_ e jitter usando uniforms (`uAnalogGrain`, `uAnalogBleeding`, `uAnalogVSync`, etc.), criando um visual vintage de monitor. Esse shader é opcional e pode ser parametrizado via GUI. |
| **Preloader** | Antes de exibir a cena 3D, um preloader em HTML/CSS ocupa toda a tela. Ele usa um **SVG de fantasma em 2D** que flutua e pisca (animações `@keyframes ghostFloat` e `eyePulse`). Uma barra de progresso (`.progress‑bar`) anima enquanto os assets são carregados. |

### Fantasma e objetos flutuantes
| elemento | implementação |
|---|---|
| **Fantasma 3D** | Criado com `THREE.SphereGeometry(2,40,40)`; vértices da parte inferior são deslocados por ruído sinusoidal para formar a “saia” ondulada. O material é um `MeshStandardMaterial` com **alta emissividade** (`emissiveIntensity`) e cor controlada via parâmetro `bodyColor`.  Rim lights direcionais adicionam contorno azulado. |
| **Olhos** | Olhos são um `Group` com esferas menores (`SphereGeometry(0.3)`) e glows maiores (`SphereGeometry(0.525)`) com materiais transparentes. A opacidade aumenta de acordo com o movimento do usuário; há também um controle de _fade_ (`eyeGlowDecay`) que suaviza a iluminação ao parar de mover o mouse. |
| **Fireflies** | 20 “vagalumes” são gerados como pequenas esferas amarelas e um `PointLight`. Cada vagalume possui uma esfera de glow (`SphereGeometry(0.08)`) com `BackSide` e opacidade 0.4. Um objeto `userData` controla velocidade, fase e intensidade; eles se movem suavemente dentro de um volume (`±30` x, `±20` y, `±15` z) e pulsam em brilho. |
| **Partículas** | Cada partícula é uma pequena forma (esfera, tetraedro ou octaedro) clonada de um _pool_. Ao mover o mouse, partículas nascem a partir da posição do fantasma, possuem escala randômica, rotação lenta e decaem (`life` e `decayRate`). A cor é fluorescente (ex.: `violet`) e pode ser ajustada via parâmetros. |
| **Interação com o mouse** | O fantasma segue o cursor suavemente. A coordenada do mouse é convertida de `screen` para `world` (`x: (event.clientX/window.innerWidth)*2 - 1`, `y: …`). Um `followSpeed` governa a aproximação; além disso, ocorrem **oscilações** (senos e cossenos) para dar vida mesmo sem movimento. A intensidade do brilho dos olhos e a taxa de geração de partículas dependem da velocidade do mouse. |

### Tipografia e layout
* Todo o conteúdo é centralizado com Flexbox (`display:flex; flex-direction:column; justify-content:center; align-items:center;`), ocupando `100vh`.

-----



### **THUMB VIDEO MANIFESTO - Posição na página, comportamento, interação e scroll

### 1.1 Onde o “thumb video” fica
O *thumb video* pertence à **Home Hero** (`.home-hero`), dentro de um wrapper identificado por classe **`.video-wrapper`**.

Padrão de layout (deduzido pelo HTML + animações):
- **Desktop (≥ 768px)**: `.video-wrapper` fica **absoluto no canto inferior direito** da hero (ex.: `md:absolute md:bottom-… md:right-…`).
- **Mobile (< 768px)**: `.video-wrapper` é **relative** e entra no fluxo normal do layout (classe começa com `relative`), com **aspect ratio vertical** (`aspect-[9/14]`), sugerindo thumbnail “cartaz”/vertical.

### 1.2 Interação (click/tap)
O `<video>` tem um handler de click:

- **Desktop (≥ 768px)**: ao clicar no vídeo, ele **não alterna o mute**; ele **faz scroll** até o final da área “pinned” da hero:
  - Chamada observada: `scroll(distanceToBottom(... pin-spacer ...) - 1)`
  - Resultado: força o usuário a “revelar” a segunda fase da hero (quando o vídeo já ocupou área maior e overlays aparecem).

- **Mobile (< 768px)**: ao tocar no vídeo, ele **alterna o estado de mute**:
  - `showreelMuted = !showreelMuted`
  - Ou seja: no mobile, o vídeo é consumido como mídia “inline” e o tap controla áudio.

### 1.3 Scroll: pin + scrub (comportamento principal)
No desktop, a hero é **pinned** (fixada) com **scrub**.

Configuração observada no bundle:
- `scrollTrigger: { trigger: ".home-hero", pin: true, start: "top top", end: "+=800", scrub: 1, ... }`

Isso significa:
- A hero “segura” o scroll por ~800px de progresso virtual.
- A animação do vídeo é sincronizada com o scroll (“scrub”), em vez de ser uma animação com tempo fixo.

### 1.4 Transformações do thumb (desktop)
Durante a animação/pinning, o vídeo sofre **morphing**:

Transição 1 (desktop):
- `.home-hero .video-wrapper`
  - **from**: `width: "219px"`, `height: "131px"`, `right: 30`, `bottom: 30`, `borderRadius: 5`
  - **to**: `width: "100%"`, `height: "100%"`, `right: 0`, `bottom: 0`, `borderRadius: 0`
  - easing/duração: `ease: "expo.inOut"`, `duration: 0.7`

Transição complementar:
- `.home-hero video`
  - `borderRadius: 5` → `borderRadius: 0` (`ease:"power4.out"`, `duration: 0.9`)

> Interpretação: começa como **thumb pequeno** no canto inferior direito e se transforma em **vídeo fullscreen** dentro do container da hero.

### 1.5 Estados por progresso do scroll (gatilhos)
O `onUpdate` do ScrollTrigger define thresholds:

- `progress <= 0.03`
  - remove `no-hover` do `.video-wrapper`
- caso contrário
  - adiciona `no-hover` (bloqueia alguns hovers durante transição inicial)

- `progress >= 0.75` (e ainda não executado)
  - adiciona `.show` em:
    - `.home-hero .video-text`
    - `.home-hero .toggle-sound`
    - `.home-hero .video-overlay`
  - altera `showreelMuted` para **false** (desmuta) **em desktop** (observado `store("showreelMuted", !1)`)

- `progress < 0.75`
  - remove `.show` dos elementos acima
  - força `showreelMuted = true` (muta novamente)

### 1.6 Hover/overlay (desktop)
O vídeo tem estilo de hover (observado por utilitários):  
- `group-hover:scale-105` + `transition duration-500 ease-in-out`

E existem camadas:
- `.video-overlay` (provável layer de gradiente/sombra)
- `.video-text` (texto e metadados que aparecem com `.show`)
- `.toggle-sound` (botão de som, aparece com `.show`)

---




## 📱 6. Responsividade

### **Comportamento Responsivo Textos
**Viewport:**
- **Desktop**:  
  H1: "Você não vê" (linha 01)  
       "o design." (linha 02)  
  _Fonte: TT Norms Pro Black, 6–9rem, tracking-tight_

- **Tablet**:  
  H1: "Você não vê" (linha 01)  
       "o design." (linha 02)  
  _Fonte: TT Norms Pro Black, 6–9rem, tracking-tight_

- **Mobile**:  
  H1: "Você não" (linha 01)  
       "vê o" (linha 02)  
       "design." (linha 03)  
  _Fonte: TT Norms Pro Black, 6–9rem, tracking-tight_
  
  -----
  
  
### **Animação Ghost -  Responsividade**

* A implementação original é **fluida**: o WebGL renderer dimensiona para `window.innerWidth`/`window.innerHeight`; um listener de `resize` recalcula a razão de aspecto, atualiza `camera`, `renderer`, `composer` e uniformes de shaders. Portanto, ele se adapta a qualquer resolução.
* A tipografia utiliza unidades `vw` (viewport width) para o tamanho do título e mantém margens em `vh`. Esse ajuste natural dispensa media queries explícitas, mas para uma aplicação real recomenda‑se:
  * **Mobile-first** – defina a base de fontes com `clamp()` ou classes Tailwind (`text-4xl md:text-6xl lg:text-8xl`) para controlar legibilidade em telas pequenas.
  * **Breakpoints** – use breakpoints Tailwind (`sm`, `md`, `lg`, `xl`) para ajustar espaçamentos, tamanho do container e possivelmente reduzir a quantidade de partículas/vagalumes em dispositivos com performance limitada.
  * **Fallback touch** – em touch devices onde `mousemove` não ocorre, mantenha o fantasma centralizado e rode apenas a animação de flutuação. Detecte `pointer: coarse` e reduza efeitos opcionais para preservar bateria.
  
  ----




### **THUMB VIDEO MANIFESTO - Responsividade:**

**(Desktop)**

**Estado Inicial**:
- Posição: `bottom-right`, `30vw` largura
- Estilo: `rounded`, `shadow`, `aspect-video`
- Props: autoplay, loop, muted, `playsInline`

**Scroll Behavior**:
- Vídeo fixo no viewport (não rola com página)
- Animação:
  - scale: `[0.3, 1]`
  - posX/posY: `["100%", "50%"]`
  - borderRadius: `["16px", "0px"]`
  - editorial opacity: `[1, 0]`

**Lógica Scroll**:
- Quando atinge fullscreen:
  - `hold 2s` com scroll travado
  - vídeo se **desmuta**
- Ao sair do Hero: volta a ser **muted**

**Click Behavior**:
- Clica → vai direto ao fullscreen
- Triggera mesma lógica de áudio/scroll

**Hover**:
- Scale `1 → 1.05`, `500ms`

---

**(Mobile)**

**Layout**:
- Seção fullscreen logo após a Hero - colado as paredes da pagina
- `aspect-video`, 

**Vídeo**:
- autoplay, loop, muted, `playsInline`
- botão visível para som (tap = unmute)
- Ao sair da seção → mutar de novo

**Animação**:
```js
initial: { opacity: 0, scale: 0.95, y: 20 }
animate: { opacity: 1, scale: 1, y: 0 }
transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
```

**Acessibilidade**:
- Controles claros
- Modo focável visível
- Sem som automático

---


## 🧠 7. Acessibilidade & SEO

### **Animação Ghost -  Acessibilidade e SEO**

* **Semântica**: mantenha o texto principal dentro de um `<h1>` e a linha secundária como `<h2>` ou `<p>`. Evite usar `<br>` dentro do `<h1>`; em vez disso, use CSS (`display:block` para separar linhas) ou `Framer Motion` para animação de cada linha. 
* **Contraste**: a cor `#e0e0e0` em fundo `#0a0a0a` garante contraste suficiente (> 7:1) para WCAG 2.1. Teste as cores do brilho do fantasma contra o fundo; dê alternativa de tema sem efeitos para usuários sensíveis a brilho/interferência.
* **Canvas acessível**:  o canvas de Three.js é puramente decorativo. Adicione `aria-hidden="true"` e `role="presentation"` ao contêiner do canvas. Forneça uma descrição alternativa da animação via `<figcaption>` ou `aria-label` (“Fantasma flutuante com partículas luminosas”) para leitores de tela.
* **Carregamento**: o preloader deve ser anunciável; inclua `aria-live="polite"` e texto visível indicando progresso.  O progresso é visual e há uma barra; forneça também `aria-valuenow`/`aria-valuemax` nos momentos de carregamento se possível.
* **SEO**: como a hero é a primeira seção, inclua meta tags (`<title>`, `<meta name="description">`, `<meta property="og:image">`) no layout Next.js. Utilize Next.js `Image` para pré-carregar versões estáticas do fantasma ou do fundo como _placeholder_.

-----


### **THUMB VIDEO MANIFESTO - Acessibilidade & SEO:**

### 3.1 Problemas típicos do padrão original (e como corrigir)
O padrão “vídeo clicável” costuma ser um `<video>` com handler de click. Para acessibilidade:

Checklist obrigatório:
- [ ] Não usar o vídeo como único “botão”.  
      ✅ Envolver com `<button>` ou `<a>` com `role="button"` e `aria-label`.
- [ ] Botão de som (`toggle-sound`) com:
  - `aria-label="Ativar/Desativar som do vídeo"`
  - `aria-pressed={muted ? "false" : "true"}`
- [ ] `playsInline` no mobile (já existe) para evitar fullscreen indesejado.
- [ ] **Respeitar prefers-reduced-motion**: reduzir/encurtar morphing e remover “scrub” intenso.
- [ ] Headline principal da hero como `<h1>` (sem pular heading levels).
- [ ] Contraste: overlay/gradiente no vídeo para garantir leitura do texto.

SEO:
- O vídeo é decorativo/experiencial; não deve substituir o conteúdo textual importante.
- Se a thumb tem CTA, garantir link navegável e texto indexável fora do canvas.

---






## **🛠️ 8. Extras Técnicos (pra sua stack):**

Estrutura (Desktop - Z-Index Stack)

1. **Z-50** Preloader (SVG ghost + texto)
2. **Z-30** Manifesto Video Thumbnail (flutuante, bottom-right)
3. **Z-20** Ghost Atmosphere (WebGL Canvas) - O Ghost sempre acima da camada de texto
4. **Z-10** Editorial Text Block (centralizado)
5. **Z-0** Fundo Gradient: `#040013 → #0b0d3a`

### **Animação Ghost - Arquitetura recomendada (Next.js App Router)

A estrutura abaixo divide a hero em componentes reutilizáveis. Todos os componentes podem ser organizados dentro de `app/components` para o App Router.

### 1. Estrutura de arquivos

```
app/
  page.tsx               → Home
  components/
    Hero.tsx             → Componente principal da hero (texto + canvas)
    GhostScene.tsx       → Cena 3D com Three.js/R3F
    Preloader.tsx        → Pré-carregador e animação inicial
    HeroText.tsx         → Container de texto e CTA
  lib/
    useMouse.ts          → Hook para rastrear movimento do mouse
  styles/
    globals.css          → Importa Tailwind e fontes customizadas
  tailwind.config.ts     → Extensão de tema (cores, fontes)
```

### 2. Tailwind e configuração

* **Instalação**: o projeto Next.js deverá estar com Tailwind já instalado (`pnpm add tailwindcss @types/tailwindcss`).
* **Extensões de tema**: configure fontes e cores fluorescentes para reutilização:

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        boldonse: ['var(--font-boldonse)', 'sans-serif'],
        monospace: ['PPSupplyMono', 'monospace'],
      },
      colors: {
        background: '#0a0a0a',
        highlight: '#e0e0e0',
        fluorescent: {
          cyan: '#00ffff',
          lime: '#00ff00',
          magenta: '#ff00ff',
          yellow: '#ffff00',
          orange: '#ff4500',
          pink: '#ff1493',
          purple: '#9400d3',
          blue: '#0080ff',
          green: '#00ff80',
          red: '#ff0040',
          teal: '#00ffaa',
          violet: '#8a2be2',
        }
      },
      screens: {
        xs: '375px',
      },
      keyframes: {
        ghostFloat: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        eyePulse: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
        },
      },
      animation: {
        ghostFloat: 'ghostFloat 3s ease-in-out infinite',
        eyePulse: 'eyePulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
```

### 3. Componentes React

#### `Hero.tsx`

```tsx
// app/components/Hero.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HeroText from './HeroText';
import Preloader from './Preloader';

// Carregar cena 3D somente no cliente (desativa SSR)
const GhostScene = dynamic(() => import('./GhostScene'), { ssr: false });

export default function Hero() {
  return (
    <section className="relative h-screen w-full bg-background text-highlight overflow-hidden">
      {/* Preloader controla exibição inicial */}
      <Preloader />
      {/* Texto sobreposto */}
      <HeroText />
      {/* Canvas 3D e pós‑processamento */}
      <Suspense fallback={null}>
        <GhostScene />
      </Suspense>
    </section>
  );
}
```

#### `HeroText.tsx`

```tsx
// app/components/HeroText.tsx
import { motion } from 'framer-motion';

export default function HeroText() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { delay: 1.5, duration: 1.2 } },
  };

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-center text-center pointer-events-none"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <span className="font-monospace text-xs uppercase tracking-widest mb-2">[Brand awareness]</span>
      <h1 className="font-boldonse font-semibold uppercase leading-tight mb-4 text-[10vw] md:text-6xl lg:text-8xl">
        Você não vê o design
      </h1>
      <h2 className="font-boldonse font-medium uppercase text-[6vw] md:text-4xl lg:text-5xl">
        Mas ele vê você
      </h2>
    </motion.div>
  );
}
```
*Note:* O uso de `pointer-events:none` impede interferência com o canvas; as tags `<h1>` e `<h2>` garantem estrutura semântica.

#### `Preloader.tsx`

```tsx
// app/components/Preloader.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Simule carga ou escute eventos de carregamento (ex.: fonts/webgl)
    const timer = setTimeout(() => setComplete(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Ícone SVG do fantasma */}
            <svg className="w-20 h-20" viewBox="0 0 512 512" fill="currentColor" aria-hidden="true">
              <path d="m508.374 432.802s-46.6-39.038-79.495-275.781c-8.833-87.68-82.856-156.139-172.879-156.139-90.015 0-164.046 68.458-172.879 156.138-32.895 236.743-79.495 275.782-79.495 275.782-15.107 25.181 20.733 28.178 38.699 27.94 35.254-.478 35.254 40.294 70.516 40.294 35.254 0 35.254-35.261 70.508-35.261s37.396 45.343 72.65 45.343 37.389-45.343 72.651-45.343c35.254 0 35.254 35.261 70.508 35.261s35.27-40.772 70.524-40.294c17.959.238 53.798-2.76 38.692-27.94z"/>
              <circle cx="208" cy="225" r="22" />
              <circle cx="297" cy="225" r="22" />
            </svg>
          </motion.div>
          <motion.p className="font-monospace text-xs uppercase tracking-widest mt-4"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >Summoning spirits…</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

#### `GhostScene.tsx`

```tsx
// app/components/GhostScene.tsx
'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState, Suspense } from 'react';
import { Sphere, PointLight, Plane, Float } from '@react-three/drei';
import * as THREE from 'three';

// Shader para o efeito de atmosfera (baseado no script original)
const AtmosphereMaterial = {
  uniforms: {
    ghostPosition: { value: new THREE.Vector3() },
    revealRadius: { value: 20 },
    fadeStrength: { value: 1.7 },
    baseOpacity: { value: 0.9 },
    revealOpacity: { value: 0.05 },
    time: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 ghostPosition;
    uniform float revealRadius;
    uniform float fadeStrength;
    uniform float baseOpacity;
    uniform float revealOpacity;
    uniform float time;
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    void main() {
      float dist = distance(vWorldPosition.xy, ghostPosition.xy);
      float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
      float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
      reveal = pow(reveal, fadeStrength);
      float opacity = mix(revealOpacity, baseOpacity, reveal);
      gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
    }
  `,
  transparent: true,
};

function Ghost() {
  const group = useRef<THREE.Group>(null!);
  const body = useRef<THREE.Mesh>(null!);
  const [hover, setHover] = useState(false);
  const { viewport, mouse } = useThree();

  // Atualiza posição para seguir o mouse
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // movimento flutuante constante
    const floatY = Math.sin(t * 1.5) * 0.05 + Math.cos(t * 0.7) * 0.03;
    group.current.position.y = floatY;
    // segue mouse suavemente
    const targetX = (mouse.x ?? 0) * viewport.width * 0.5;
    const targetY = (mouse.y ?? 0) * viewport.height * 0.3;
    group.current.position.x += (targetX - group.current.position.x) * 0.05;
    group.current.position.y += (targetY - group.current.position.y) * 0.05;

    // ajuste do emissive intensity pulsando
    const pulse = Math.sin(t * 1.6) * 0.6 + Math.sin(t * 0.6) * 0.12;
    if (body.current.material instanceof THREE.MeshStandardMaterial) {
      body.current.material.emissiveIntensity = 5.8 + pulse;
    }
  });

  // cria geometria do fantasma com “saia” ondulada
  useEffect(() => {
    if (!body.current) return;
    const geo = body.current.geometry as THREE.SphereGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const y = arr[i + 1];
      if (y < -0.2) {
        const x = arr[i];
        const z = arr[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        arr[i + 1] = -2.0 + noise1 + noise2 + noise3;
      }
    }
    geo.computeVertexNormals();
  }, []);

  return (
    <group ref={group} scale={2.4}>
      <mesh ref={body}>
        <sphereGeometry args={[2, 40, 40]} />
        <meshStandardMaterial
          color="#0f2027"
          roughness={0.02}
          metalness={0}
          transparent
          opacity={0.88}
          emissive="#0080ff"
          emissiveIntensity={5.8}
        />
      </mesh>
      {/* Olhos */}
      <group>
        <mesh position={[-0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.0} />
        </mesh>
        <mesh position={[0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial color="#8a2be2" transparent opacity={0.0} />
        </mesh>
      </group>
      {/* Vagalumes e partículas podem ser componentes separados */}
    </group>
  );
}

export default function GhostScene() {
  const planeRef = useRef<THREE.Mesh>(null!);
  const ghostRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (planeRef.current) {
      const mat = planeRef.current.material as any;
      mat.uniforms.time.value = t;
      mat.uniforms.ghostPosition.value.copy(ghostRef.current?.position ?? new THREE.Vector3());
    }
  });

  return (
    <Canvas
      className="absolute inset-0"
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 20], fov: 75 }}
    >
      <ambientLight color="#0a0a2e" intensity={0.08} />
      {/* Rim lights */}
      <directionalLight position={[-8, 6, -4]} color="#4a90e2" intensity={1.8} />
      <directionalLight position={[8, -4, -6]} color="#50e3c2" intensity={1.26} />

      {/* Atmosfera */}
      <mesh ref={planeRef} position={[0, 0, -50]} renderOrder={-100}>
        <planeGeometry args={[300, 300]} />
        <shaderMaterial attach="material" args={[AtmosphereMaterial]} />
      </mesh>

      <Suspense fallback={null}>
        <Ghost />
      </Suspense>
    </Canvas>
  );
}
```

*Observações*:
- A cena utiliza `Canvas` do `@react-three/fiber` com `className="absolute inset-0"` para ocupar toda a tela.  
- O shader de atmosfera foi transposto para `shaderMaterial`. Para o shader analógico (grain/vignette), pode‑se criar outro `ShaderPass` usando `@react-three/postprocessing` se necessário.
- Para adicionar **vagalumes** e **partículas**, crie componentes que iteram listas de objetos e usam `useFrame` para atualizar posição e opacidade. Reduza a contagem em dispositivos móveis.

### **Animação Ghost - Integração com o restante da stack:**

* **App Router**: as rotas ficam em `app/page.tsx`. O componente `Hero` pode ser importado ali. Qualquer rota subsequente (blog, contato) poderá ser carregada via links normais.  Como o canvas é puramente do cliente, o componente `GhostScene` deve ser marcado com `'use client'` e importado dinamicamente.
* **Firebase Hosting**: compile com `next build` e publique usando `firebase deploy`. Garanta que as variáveis de ambiente da hospedagem estejam definidas em `.env` e leia‑as via `process.env` apenas no servidor.
* **Supabase Storage**: armazene assets como fontes personalizadas, modelos glb ou texturas no Supabase. Carregue‐os em tempo de build ou no cliente usando a URL gerada. Defina um mecanismo de fallback no preloader caso o download falhe.

### **Animação Ghost -  Conclusão

A animação “Spectral Ghost” combina **WebGL/Three.js**, um **shader de película analógica**, partículas responsivas e um preloader estilizado. Para reconstruí‑la em Next.js com React Three Fiber é necessário separar a lógica em componentes reutilizáveis, cuidar da **responsividade** com unidades relativas e breakpoints Tailwind, e garantir **acessibilidade** com marcas semânticas e canvas marcado como decorativo. Com as configurações e exemplos acima, um agente de construção de sites pode replicar o efeito de forma fiel e escalável.

----


### **THUMB VIDEO MANIFESTO - Extras técnicos (stack solicitada):**

### 4.1 Divisão de componentes recomendada
Estrutura (App Router):

- `<Hero />`
  - `<GhostCanvasBackground />` (R3F)
  - `<HeroCopy />` (h1, subtítulo, CTA)
  - `<ShowreelThumb />` (thumb vídeo + overlay + mute + scroll progress)
  - `<Preloader />` (se necessário)

### 4.2 App Router: client-side ou server-side?
- **Hero** precisa ser **Client Component** por:
  - WebGL + R3F
  - listeners de mouse/scroll
  - controle de vídeo (mute/play)
  - framer-motion `useScroll`

Então:
- `app/page.tsx` pode ser server, mas renderiza `<HeroClient />`:
  - `const HeroClient = dynamic(() => import("./HeroClient"), { ssr: false })`

### 4.3 Three.js / R3F: fallback SSR
- Use `dynamic(..., { ssr:false })` para o canvas.
- Renderize um fallback estático:
  - background gradient + textura (CSS) + ghost SVG/PNG + thumb vídeo.

### 4.4 Tailwind: theme extend (tokens úteis)
Sugestão mínima (exemplo):
- `colors.blue = "#0B63FF"` (ou o azul neon do projeto)
- `spacing.gutter = "20px"` (e `md: 30px`, `lg: 40px`)
- `borderRadius.videoThumb = "5px"`

### 4.5 Framer Motion: declarativas ou variantes?
Para recriar fielmente o scrub do scroll:
- Use **Framer Motion + `useScroll` + `useTransform`** (declarativo)  
  ✅ mantém stack “pura” sem GSAP
- Alternativa: **GSAP ScrollTrigger** (fica idêntico ao original), mas adiciona dependência.

Recomendação: **Framer Motion** (porque está na sua stack), com fallback “CSS sticky”.

---

### **THUMB VIDEO MANIFESTO - Implementação sugerida (Framer Motion, sem GSAP):**

### 5.1 Conceito
- Hero com `position: relative` e `height: 200svh` (mobile) / `height: 100vh` (desktop).
- Conteúdo textual fica central.
- Thumb fica:
  - mobile: dentro do fluxo com aspect vertical
  - desktop: `absolute bottom-gutter right-gutter`, inicia pequeno e, conforme scroll, vira fullscreen.

### 5.2 Código (ShowreelThumb.tsx)
> Este componente implementa:
> - morph por scroll (219x131 → 100%)
> - borderRadius 5 → 0
> - threshold 75% para mostrar overlay + botão de som
> - click desktop = scroll-to-reveal; click mobile = toggle mute

```tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const onChange = () => setMatches(m.matches);
    onChange();
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

type Props = {
  heroRef: React.RefObject<HTMLElement>;
  src: string; // Supabase Storage URL (mp4)
};

export function ShowreelThumb({ heroRef, src }: Props) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Estado de áudio (equivale ao store showreelMuted)
  const [muted, setMuted] = useState(true);

  // Scroll progress dentro da hero
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'], // ajusta o “scrub”
  });

  // Morphing desktop (valores do bundle: 219x131 → 100%)
  const w = useTransform(scrollYProgress, [0, 1], ['219px', '100%']);
  const h = useTransform(scrollYProgress, [0, 1], ['131px', '100%']);
  const right = useTransform(scrollYProgress, [0, 1], ['30px', '0px']);
  const bottom = useTransform(scrollYProgress, [0, 1], ['30px', '0px']);
  const radius = useTransform(scrollYProgress, [0, 1], ['5px', '0px']);

  // Mostrar overlays após 75%
  const overlayOpacity = useTransform(scrollYProgress, [0.74, 0.75], [0, 1]);

  // Controlar mute por threshold (desktop)
  useEffect(() => {
    if (!isDesktop) return;
    const unsub = scrollYProgress.on('change', (p) => {
      if (p >= 0.75) setMuted(false);
      else setMuted(true);
    });
    return () => unsub();
  }, [isDesktop, scrollYProgress]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = muted;
    // tentativa de autoplay (silencioso no mobile)
    videoRef.current.play().catch(() => {});
  }, [muted]);

  const onClick = async () => {
    if (!heroRef.current) return;

    if (isDesktop) {
      // desktop: scroll para “revelar”
      const rect = heroRef.current.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const end = top + heroRef.current.offsetHeight - window.innerHeight + 1;
      window.scrollTo({ top: end, behavior: 'smooth' });
    } else {
      // mobile: toggle mute
      setMuted((m) => !m);
    }
  };

  return (
    <motion.div
      className={[
        'video-wrapper z-10',
        'relative aspect-[9/14] overflow-hidden rounded-[5px]',
        'md:absolute md:aspect-auto',
        'cursor-pointer group',
      ].join(' ')}
      style={
        isDesktop
          ? { width: w, height: h, right, bottom, borderRadius: radius, position: 'absolute' as const }
          : undefined
      }
      onClick={onClick}
      role="button"
      aria-label={isDesktop ? 'Revelar vídeo (scroll)' : muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <motion.video
        ref={videoRef}
        className="w-full h-full object-cover transition duration-500 ease-in-out group-hover:scale-105"
        src={src}
        autoPlay
        loop
        playsInline
        muted={muted}
      />

      {/* Overlay escuro/gradiente */}
      <motion.div
        className="video-overlay absolute inset-0 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Texto/legenda */}
      <motion.div
        className="video-text absolute bottom-0 left-0 w-full p-4 pointer-events-none"
        style={{ opacity: overlayOpacity }}
      >
        <p className="text-white text-sm opacity-80">Showreel</p>
        <p className="text-white text-base font-medium">Strategy • Branding • Motion</p>
      </motion.div>

      {/* Toggle som (só visível no desktop, após 75%) */}
      <motion.button
        type="button"
        className="toggle-sound absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white backdrop-blur flex items-center justify-center"
        style={{ opacity: isDesktop ? overlayOpacity : 0, pointerEvents: isDesktop ? 'auto' : 'none' }}
        onClick={(e) => {
          e.stopPropagation();
          setMuted((m) => !m);
        }}
        aria-label={muted ? 'Ativar som do vídeo' : 'Desativar som do vídeo'}
        aria-pressed={!muted}
      >
        {muted ? '🔇' : '🔊'}
      </motion.button>
    </motion.div>
  );
}
```

### 5.3 CSS/Tailwind para overlay
No Tailwind, você pode adicionar utilitários, mas um mínimo em CSS global resolve:

```css
.video-overlay {
  background: radial-gradient(120% 120% at 70% 30%, rgba(0,0,0,0) 0%, rgba(0,0,0,.55) 70%, rgba(0,0,0,.75) 100%);
}
```

---

### **THUMB VIDEO MANIFESTO - Integração na Hero (App Router):**

### 6.1 HeroClient.tsx
```tsx
'use client';

import { useRef } from 'react';
import { ShowreelThumb } from './ShowreelThumb';
import dynamic from 'next/dynamic';

const GhostCanvasBackground = dynamic(() => import('./GhostCanvasBackground'), { ssr: false });

export default function HeroClient() {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section ref={heroRef} className="home-hero relative w-full h-[200svh] md:h-screen overflow-hidden bg-neutral-950">
      <GhostCanvasBackground />

      <div className="relative z-20 h-screen flex items-center justify-center text-center px-5">
        <div className="max-w-4xl">
          <p className="text-white/60 text-xs tracking-widest uppercase mb-4">[BRAND AWARENESS]</p>
          <h1 className="text-white text-5xl md:text-7xl font-semibold tracking-tight leading-tight">
            Você não vê o design.
            <span className="block text-white/50 mt-3">Mas ele vê você.</span>
          </h1>
        </div>
      </div>

      <ShowreelThumb
        heroRef={heroRef}
        src={'https://YOUR_SUPABASE_PUBLIC_URL/LB-Showreel-2025.mp4'}
      />
    </section>
  );
}
```

---

### **THUMB VIDEO MANIFESTO - Recomendações

### Desktop
- Implementar “pin” real:
  - **Opção A (sem GSAP)**: `section` com `height: 200vh` e inner sticky (100vh). O scroll “simula” o pin.
  - **Opção B (GSAP ScrollTrigger)**: reproduz exatamente. (Se o agente puder adicionar dependência.)

### Tablet touch
- Decidir se “click = scroll” faz sentido.
  - Alternativa: no tablet, usar comportamento do mobile (toggle mute), porque o usuário está em touch.

### Performance
- `preload="metadata"` para o vídeo.
- `playsInline` e `muted` no primeiro paint para garantir autoplay.
- Lazy-load do vídeo (IntersectionObserver) se a hero não está imediatamente visível.

---

### **THUMB VIDEO MANIFESTO -  Checklist de validação (para o agente autônomo)

**Funcional**
- [ ] Thumb inicia pequeno no canto inferior direito (desktop) e cresce para fullscreen com scroll.
- [ ] Border radius 5px → 0px durante a transição.
- [ ] Overlay + texto + toggle-sound aparecem após 75% do progresso.
- [ ] Desktop click faz scroll para o final da hero (reveal).
- [ ] Mobile click alterna mute.
- [ ] Estado de mute volta a true quando scroll retorna < 75%.

**A11y**
- [ ] Wrapper focável + Enter/Space acionam.
- [ ] Botão de som com `aria-label` e `aria-pressed`.
- [ ] Respeitar `prefers-reduced-motion`.

**SEO**
- [ ] Conteúdo textual em `<h1>` e `<p>` fora do canvas.
- [ ] Vídeo não é a única fonte de informação.

---

### **THUMB VIDEO MANIFESTO - Onde o arquivo de vídeo entra (Supabase Storage)

- Manifesto Video: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4`
- Usar URL pública no `src`.

Exemplo (pseudo):
```ts
const src = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/assets/LB-Showreel-2025.mp4`;
```

---
