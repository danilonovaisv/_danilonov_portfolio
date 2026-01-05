# 🎬 PROTÓTIPO INTERATIVO COMPLETO — PÁGINA PORTFOLIO SHOWCASE
## Site: portfoliodanilo.com
## Sistema: Ghost Design System
## Documento Canônico — Estrutura + Motion + Interação + Parallax Lerp
## Versão: 2.0 — COM ANIMAÇÕES PARALLAX

---

## 🎯 OBJETIVO DO PROTÓTIPO

Criar a **página Portfolio Showcase completa** com:

- Hero Section com vídeo em loop
- Grid de projetos com **Parallax Lerp** (scroll suave)
- Modal/Página Interna de Projeto (2 tipos)
- Sistema de animação editorial silencioso
- Navegação fluida e contextual
- Coerência total com Ghost System

---

## 📐 ESTRUTURA DA PÁGINA

### 🧱 Hierarquia de Componentes

```
PortfolioShowcase
├── Hero Section (Video Loop)
│   ├── Video Background
│   ├── Overlay Gradient
│   ├── Título "portfólio showcase"
│   └── CTA "vamos trabalhar juntos"
├── Projects Gallery (Parallax Lerp)
│   ├── Gallery Container (fixed)
│   ├── Gallery Track (animated)
│   └── ProjectCard[] (clicáveis + parallax)
│       └── Card Image Wrapper (parallax interno)
├── Footer Brands
└── PortfolioModal (quando ativo)
    ├── Backdrop
    ├── ModalContainer
    │   ├── CloseButton
    │   ├── ProjectContent (Tipo A ou B)
    │   │   ├── MainMedia
    │   │   ├── ProjectTitle
    │   │   ├── ProjectMeta
    │   │   └── SecondaryContent (galeria/texto)
    └── AnimatePresence
```

---

## 🎥 HERO SECTION — VÍDEO LOOPING

### Estrutura HTML/JSX
```tsx
<section className="hero-section relative h-screen overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="[URL_DO_VIDEO]" type="video/mp4" />
  </video>
  
  <div className="overlay absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
  
  <div className="content relative h-full flex flex-col items-center justify-center text-white px-4">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
      <span className="text-blue-400">portfólio</span> showcase
    </h1>
    <button className="cta bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full">
      vamos trabalhar juntos →
    </button>
  </div>
</section>
```

### Especificações Técnicas

**Vídeo:**
- `autoPlay`: inicia automaticamente
- `loop`: repete infinitamente
- `muted`: sem som (necessário para autoplay)
- `playsInline`: reproduz inline em mobile
- `object-fit: cover`: cobre toda a área

**Overlay:**
- Gradient vertical: `from-black/60 via-black/40 to-black/60`
- Garante legibilidade do texto sobre qualquer vídeo

**Título:**
- "portfólio" em azul (`text-blue-400`)
- "showcase" em branco
- Centralizado vertical e horizontalmente

**CTA:**
- Cor: `bg-blue-500`
- Hover: `hover:bg-blue-600`
- Border radius: `rounded-full`
- Transição suave: `transition-all duration-300`
- Efeito scale no hover: `hover:scale-105`

---

## 🎨 GALLERY COM PARALLAX LERP

### 🧠 Conceito do Parallax Lerp

O sistema usa **Linear Interpolation (Lerp)** para criar:
- Scroll suave e fluido
- Movimento parallax independente em cada imagem
- Performance otimizada com `requestAnimationFrame`

### 📐 Estrutura HTML/CSS

```html
<section class="gallery" ref={galleryRef}>
  <div class="gallery-track" ref={trackRef}>
    <div class="card" ref={cardRef}>
      <div class="card-image-wrapper">
        <img src="[URL]" alt="Project">
      </div>
      <div class="card-overlay">
        <!-- Conteúdo -->
      </div>
    </div>
    <!-- Mais cards... -->
  </div>
</section>
```

### 🎨 CSS Crítico

```css
.gallery {
  /* Height será setado dinamicamente via JS */
}

.gallery-track {
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  padding: 0.25rem;
  will-change: transform;
}

.card {
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.card-image-wrapper {
  height: 135%; /* 35% maior que o card para criar espaço de parallax */
  will-change: transform;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsivo */
@media (max-width: 1024px) {
  .gallery-track {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .gallery-track {
    grid-template-columns: repeat(1, 1fr);
  }
}
```

### ⚙️ JavaScript — Sistema Parallax Lerp

```javascript
// Refs e variáveis
const galleryRef = useRef(null);
const trackRef = useRef(null);
const cardsRef = useRef([]);
const rafRef = useRef(null);
const startYRef = useRef(0);
const endYRef = useRef(0);
const easing = 0.05; // Suavidade do lerp (quanto menor, mais suave)

// Função Lerp
const lerp = (start, end, t) => start * (1 - t) + end * t;

// Função Parallax para cada card
const parallax = (cardElement) => {
  const wrapper = cardElement.querySelector('.card-image-wrapper');
  if (!wrapper) return;

  // Diferença entre altura do card e altura da imagem
  const diff = cardElement.offsetHeight - wrapper.offsetHeight;
  
  // Posição do card na viewport
  const { top } = cardElement.getBoundingClientRect();
  
  // Progresso (0 = topo da tela, 1 = fundo da tela)
  const progress = top / window.innerHeight;
  
  // Posição Y do parallax
  const yPos = diff * progress;
  
  wrapper.style.transform = `translateY(${yPos}px)`;
};

// Ativa parallax em todos os cards
const activateParallax = () => {
  cardsRef.current.forEach(card => {
    if (card) parallax(card);
  });
};

// Update Loop principal
const updateScroll = () => {
  if (!galleryRef.current || !trackRef.current) return;

  // Lerp entre posição atual e posição alvo
  startYRef.current = lerp(startYRef.current, endYRef.current, easing);
  
  // Atualiza altura da galeria (para criar espaço de scroll)
  galleryRef.current.style.height = `${trackRef.current.clientHeight}px`;
  
  // Move o track
  trackRef.current.style.transform = `translateY(-${startYRef.current}px)`;
  
  // Ativa parallax em cada card
  activateParallax();
  
  // Continua o loop
  rafRef.current = requestAnimationFrame(updateScroll);
  
  // Para o loop quando chegar muito perto do target
  if (Math.abs(startYRef.current - window.scrollY) < 0.1) {
    cancelAnimationFrame(rafRef.current);
  }
};

// Handler do scroll
const startScroll = () => {
  endYRef.current = window.scrollY;
  if (rafRef.current) cancelAnimationFrame(rafRef.current);
  rafRef.current = requestAnimationFrame(updateScroll);
};

// Setup dos event listeners
useEffect(() => {
  const handleScroll = () => startScroll();
  const handleResize = () => updateScroll();

  // Inicializa
  updateScroll();
  
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
}, []);
```

### 🎯 Como Funciona o Parallax Lerp

1. **Gallery Container** (`galleryRef`):
   - Tem altura dinâmica baseada no conteúdo
   - Cria espaço para scroll natural

2. **Gallery Track** (`trackRef`):
   - `position: fixed` → fica fixo na tela
   - Animado via `transform: translateY()`
   - Lerp cria movimento suave

3. **Cada Card**:
   - Wrapper da imagem tem 135% de altura
   - Movimento parallax independente
   - Baseado na posição do card na viewport

4. **Loop de Animação**:
   - `requestAnimationFrame` garante 60fps
   - Lerp interpola entre posição atual e target
   - Para automaticamente quando chega no destino

---

## 🃏 PROJECT CARD — ANATOMIA COMPLETA

### Estrutura Visual
```tsx
<div className="card" onClick={onClick}>
  <div className="card-image-wrapper">
    <img src={project.image} alt={project.title} />
  </div>
  
  <div className="card-overlay">
    <h3>{project.title}</h3>
    <div className="card-meta">
      <span>{project.client}</span>
      <span>•</span>
      <span>{project.year}</span>
    </div>
    <div className="card-tags">
      {project.tags.map(tag => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  </div>
</div>
```

### Estados do Card

#### Default
```css
.card {
  transform: none;
}

.card-overlay {
  opacity: 0;
}
```

#### Hover
```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.card-overlay {
  opacity: 1;
  background: linear-gradient(to top, 
    rgba(0, 0, 0, 0.9) 0%, 
    rgba(0, 0, 0, 0.5) 50%, 
    transparent 100%
  );
}
```

#### Active (clique)
- Trigger modal/página interna
- Card permanece visível no fundo
- Backdrop escurece a página

---

## 🎭 MODAL / PÁGINA INTERNA — TIPOS

### 🅐 TIPO A — ZOOM VIEWER

**Quando usar:**
- Projeto visual simples
- Uma peça principal forte
- Foco em observação

**Layout:**
```
┌────────────────────────────────────┐
│  [X]                               │
│                                    │
│     ┌──────────────────────┐      │
│     │                      │      │
│     │   MÍDIA PRINCIPAL    │      │
│     │                      │      │
│     └──────────────────────┘      │
│                                    │
│  Título do Projeto                 │
│  Cliente • 2024 • tag tag          │
│                                    │
└────────────────────────────────────┘
```

**Código:**
```tsx
<div className="modal-type-a">
  <div className="media-container">
    <img src={project.image} alt={project.title} />
  </div>
  
  <div className="info-container">
    <h2>{project.title}</h2>
    
    <div className="meta">
      <span>{project.client}</span>
      <span>•</span>
      <span>{project.year}</span>
    </div>
    
    <div className="tags">
      {project.tags.map(tag => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  </div>
</div>
```

---

### 🅑 TIPO B — PÁGINA INTERNA DE PROJETO

**Quando usar:**
- Projeto complexo
- Múltiplas entregas
- Contexto necessário

**Layout:**
```
┌────────────────────────────────────┐
│  [X]                               │
│                                    │
│  ┌──────────┐  ┌─────────────┐    │
│  │  MÍDIA   │  │   Título    │    │
│  │  HERO    │  │   Cliente   │    │
│  │          │  │   Ano       │    │
│  └──────────┘  │   Tags      │    │
│                │   Descrição │    │
│                └─────────────┘    │
│                                    │
│  ┌────────────────────────────┐   │
│  │  Galeria / Texto / Lista   │   │
│  └────────────────────────────┘   │
│                                    │
└────────────────────────────────────┘
```

**Código:**
```tsx
<div className="modal-type-b">
  <div className="hero-section">
    <div className="hero-media">
      <img src={project.image} alt={project.title} />
    </div>
    
    <div className="hero-info">
      <h2>{project.title}</h2>
      
      <div className="meta">
        <span>{project.client}</span>
        <span>•</span>
        <span>{project.year}</span>
      </div>
      
      <div className="tags">
        {project.tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      
      <p className="description">
        {project.description}
      </p>
    </div>
  </div>
  
  {project.gallery && (
    <div className="gallery-section">
      {project.gallery.map((img, idx) => (
        <img key={idx} src={img} alt={`${project.title} - ${idx + 1}`} />
      ))}
    </div>
  )}
</div>
```

---

## 🎞️ ANIMAÇÃO — TIMELINE CANÔNICO DO MODAL

### 📍 ABERTURA DO MODAL

#### T = 0ms — Estado Inicial
```ts
// Backdrop
opacity: 0

// Modal Container
opacity: 0
scale: 0.98
y: 12px

// Conteúdo interno
visibility: hidden
opacity: 0
```

---

#### T = 0 → 180ms — Backdrop Aparece
```ts
backdrop {
  opacity: 0 → 1
  transition: linear 180ms
}
```

**CSS/Framer Motion:**
```tsx
<motion.div
  className="backdrop"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.18, ease: 'linear' }}
/>
```

---

#### T = 120 → 380ms — Container Aparece
```ts
modalContainer {
  opacity: 0 → 1
  scale: 0.98 → 1
  y: 12 → 0
  transition: cubic-bezier(0.22, 1, 0.36, 1) 260ms
  delay: 120ms
}
```

**CSS/Framer Motion:**
```tsx
<motion.div
  className="modal-container"
  initial={{ opacity: 0, scale: 0.98, y: 12 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.98, y: 8 }}
  transition={{
    opacity: { duration: 0.26 },
    scale: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
    y: { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
  }}
/>
```

---

#### T = 380 → 520ms — Pausa Consciente
- **Nenhuma animação**
- Usuário reconhece contexto
- Estabilização visual
- Container está visível mas conteúdo ainda não

---

#### T = 520 → 760ms — Mídia Principal
```ts
mainMedia {
  opacity: 0 → 1
  transition: ease-out 240ms
  delay: 520ms
}
// ❌ Sem translate
// ❌ Sem scale
// Apenas presença
```

**Implementação:**
```tsx
<motion.div
  className="main-media"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    delay: 0.52,
    duration: 0.24,
    ease: 'easeOut'
  }}
>
  <img src={project.image} alt={project.title} />
</motion.div>
```

---

#### T = 760 → 960ms — Título
```ts
projectTitle {
  opacity: 0 → 1
  y: 6 → 0
  duration: 200ms
  delay: 760ms
}
```

**Implementação:**
```tsx
<motion.h2
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.76,
    duration: 0.2
  }}
>
  {project.title}
</motion.h2>
```

---

#### T = 960 → 1120ms — Meta Informações
```ts
projectMeta {
  opacity: 0 → 1
  y: 4 → 0
  duration: 160ms
  delay: 960ms
}
```

**Implementação:**
```tsx
<motion.div
  className="meta"
  initial={{ opacity: 0, y: 4 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    delay: 0.96,
    duration: 0.16
  }}
>
  <span>{project.client}</span>
  <span>•</span>
  <span>{project.year}</span>
</motion.div>
```

---

#### T = 1120 → 1500ms — Conteúdo Secundário
```ts
// Galeria, texto, bullets
secondaryContent {
  opacity: 0 → 1
  y: 8 → 0
  stagger: 80ms
  duration: 200ms
  delay: 1120ms (base)
}
```

**Implementação com Stagger:**
```tsx
{project.gallery?.map((img, idx) => (
  <motion.img
    key={idx}
    src={img}
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay: 1.12 + (idx * 0.08),
      duration: 0.2
    }}
  />
))}
```

---

### 📍 ESTADO IDLE (T > 1500ms)

**Após entrada completa:**
- ✅ Nenhuma animação contínua
- ✅ Nada flutua
- ✅ Nada pulsa
- ✅ Foco total em leitura
- ✅ Scroll interno habilitado
- ✅ Parallax do fundo está pausado (body overflow hidden)

---

### 📍 FECHAMENTO DO MODAL

#### T = 0 → 180ms — Container Sai
```ts
modalContainer {
  opacity: 1 → 0
  scale: 1 → 0.98
  y: 0 → 8
  transition: ease-in 180ms
}
```

#### T = 0 → 150ms — Backdrop Sai
```ts
backdrop {
  opacity: 1 → 0
  transition: linear 150ms
}
```

**Implementação:**
```tsx
<AnimatePresence>
  {selectedProject && (
    <PortfolioModal
      project={selectedProject}
      onClose={() => setSelectedProject(null)}
    />
  )}
</AnimatePresence>
```

---

## 🖱️ INTERAÇÃO — FLUXO COMPLETO

### 1️⃣ Usuário rola a página
- Parallax lerp ativo
- Cards se movem suavemente
- Imagens internas fazem parallax independente

### 2️⃣ Usuário passa mouse sobre card
```ts
onMouseEnter={() => setIsHovered(true)}

// CSS aplicado
.card-overlay {
  opacity: 0 → 1
  backdrop-filter: blur(4px)
}
```

### 3️⃣ Usuário clica em um card
```ts
onClick={() => setSelectedProject(project)}

// Ações
1. Estado atualizado
2. Modal renderizado via Portal
3. Scroll da página bloqueado (body overflow: hidden)
4. Foco move para o modal
```

### 4️⃣ Modal/Página Interna abre
- Backdrop aparece (0→180ms)
- Container aparece (120→380ms)
- Pausa (380→520ms)
- Conteúdo se revela em sequência (520→1500ms)
- Scroll interno disponível após 1500ms

### 5️⃣ Usuário lê/explora o projeto
- Scroll interno disponível
- Botão fechar sempre visível (fixed position)
- ESC funciona
- Click no backdrop funciona

### 6️⃣ Usuário fecha modal

**Gatilhos:**
- Click no backdrop
- Click no botão [X]
- Tecla ESC

**Código:**
```tsx
const handleClose = () => {
  setSelectedProject(null);
  // Body overflow restaurado automaticamente no useEffect cleanup
};

// ESC handler
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') handleClose();
  };
  window.addEventListener('keydown', handleEscape);
  return () => window.removeEventListener('keydown', handleEscape);
}, []);

// Backdrop click
<div onClick={(e) => {
  if (e.target === e.currentTarget) handleClose();
}} />
```

**Resultado:**
- Modal fecha com animação reversa
- Foco retorna ao card original
- Scroll da página é restaurado
- Parallax volta a funcionar

---

## ⚛️ IMPLEMENTAÇÃO REACT COMPLETA

### Estado Global
```tsx
const [selectedProject, setSelectedProject] = useState<Project | null>(null);
```

### Hero Section
```tsx
<section className="relative h-screen overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="video.mp4" type="video/mp4" />
  </video>
  
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
  
  <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
      <span className="text-blue-400">portfólio</span> showcase
    </h1>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
      vamos trabalhar juntos
      <span className="text-xl">→</span>
    </button>
  </div>
</section>
```

### Gallery com Parallax
```tsx
<section ref={galleryRef} className="gallery">
  <div
    ref={trackRef}
    className="gallery-track fixed grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-1"
  >
    {projects.map((project, index) => (
      <ProjectCard
        key={project.id}
        ref={(el) => (cardsRef.current[index] = el)}
        project={project}
        onClick={() => setSelectedProject(project)}
      />
    ))}
  </div>
</section>
```

### Modal com Portal
```tsx
import { createPortal } from 'react-dom';

{selectedProject && createPortal(
  <PortfolioModal
    project={selectedProject}
    onClose={() => setSelectedProject(null)}
  />,
  document.body
)}
```

### useEffect — Parallax Setup
```tsx
useEffect(() => {
  const handleScroll = () => startScroll();
  const handleResize = () => updateScroll();

  updateScroll();
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('resize', handleResize);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };
}, []);
```

### useEffect — Modal Body Lock
```tsx
useEffect(() => {
  if (selectedProject) {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }
}, [selectedProject]);
```

---

## 🎨 ESTILO — CSS/TAILWIND COMPLETO

### Hero Section
```css
.hero-section {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.hero-section video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-section .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
}

.hero-section .content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 1rem;
}
```

### Gallery & Track
```css
.gallery {
  /* Height dinâmica via JS */
}

.gallery-track {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.25rem;
  padding: 0.25rem;
  will-change: transform;
}

@media (max-width: 1024px) {
  .gallery-track {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .gallery-track {
    grid-template-columns: repeat(1, 1fr);
  }
}
```

### Card
```css
.card {
  position: relative;
  height: 400px;
  overflow: hidden;
  background: #f3f4f6;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.card-image-wrapper {
  position: absolute;
  inset: 0;
  height: 135%;
  will-change: transform;
}

.card-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.5) 50%,
    transparent 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-overlay {
  opacity: 1;
}
```

### Modal
```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  max-height: 90vh;
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  overflow-y: auto;
  overscroll-behavior: contain;
}

@media (min-width: 768px) {
  .modal-container {
    padding: 3rem;
  }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;