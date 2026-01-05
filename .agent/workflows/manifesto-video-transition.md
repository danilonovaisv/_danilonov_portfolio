---
description: # Workflow: Ajuste do Manifesto Video Thumb (Home)
---

# Workflow: Ajuste do Manifesto Video Thumb (Home)

**Objetivo:**
Implementar o comportamento híbrido do vídeo manifesto na Home Page:

1. **Desktop:** Uma thumb flutuante no canto inferior direito que expande com o scroll (Scroll Morphing) até virar fullscreen.
2. **Mobile:** Uma seção independente abaixo da Hero.

**Arquivos Alvo:**

- `src/components/home/ManifestoThumb.tsx` (Desktop Component)
- `src/components/home/ManifestoSection.tsx` (Mobile Component)
- `src/components/home/HomeHero.tsx` (Integração)

---

## 1. Especificações Técnicas (Source of Truth)

### Comportamento Desktop (≥1024px)

- **Estado Inicial (Idle):**
- Posição: `fixed` ou `absolute` no canto **inferior direito** (`bottom-5 right-5` ou gutter definido).
- Tamanho: `w-[15vw]` (max `30vw`).
- Estilo: `rounded-[16px]`, `shadow-lg`, `z-30`.
- Mídia: Autoplay, muted, loop.

- **Scroll Interaction (Morphing):**
- **Trigger:** Scroll vertical da página.
- **Transformação:** À medida que o usuário desce, o vídeo escala (1x → 2x ou fullscreen cover), remove o `border-radius` (16px → 0px) e centraliza.
- **Lógica:** Usar `window.scrollY` para calcular o progresso e aplicar `transform: scale()` diretamente via ref para performance.

- **Micro-interações:**
- **Hover:** `scale(1.05)`, Seta do ícone gira (`-45deg` → `0deg`).
- **Click:** Pula a animação e vai direto para o estado fullscreen (skip scroll).

### Comportamento Mobile (<1024px)

- **Não exibe a thumb flutuante.**
- Renderiza uma seção dedicada (`ManifestoSection`) logo após a Hero.
- **Click:** Alterna som (Mute/Unmute).

### Z-Index Stack

1. **z-50:** Preloader
2. **z-30:** **ManifestoThumb** (Vídeo flutuante)
3. **z-20:** GhostCanvas
4. **z-10:** HeroCopy (Texto editorial)
5. **z-0:** Background Radial

---

## 2. Implementação Passo a Passo

### Passo 1: Componente Desktop (`ManifestoThumb.tsx`)

Implementar usando a lógica de `useRef` e `addEventListener` para máxima performance durante o scroll, conforme o snippet fornecido.

**Diretrizes de Código:**

- Usar `useRef` para acessar o DOM do container do vídeo.
- Calcular `scrollProgress` (0 a 1) baseado na altura da janela vs scroll.
- Aplicar `transformOrigin: 'bottom right'` para garantir que o crescimento ancore no canto correto.
- **Importante:** Adicionar a classe `hidden lg:block` para garantir que só apareça no desktop.

```tsx
// src/components/home/ManifestoThumb.tsx
'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion'; // Para o hover state se necessário

export default function ManifestoThumb() {
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!thumbRef.current) return;

      // Lógica de cálculo de progresso baseada no scroll da Hero/Página
      // Ajustar os valores de sensibilidade conforme a altura da Hero (ex: 100vh)
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const progress = Math.min(1, scrollY / viewportHeight); // 0 a 1 durante o primeiro 100vh

      // Mapeamento de valores
      const scale = 1 + progress * 2.5; // Cresce até 3.5x (ajustar conforme necessidade para cobrir tela)
      const radius = Math.max(0, 16 - progress * 16); // 16px -> 0px

      // Aplicação direta para performance (bypass React render cycle)
      thumbRef.current.style.transform = `scale(${scale})`;
      thumbRef.current.style.borderRadius = `${radius}px`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={thumbRef}
      className="hidden lg:block fixed bottom-8 right-8 z-30 w-[280px] aspect-video overflow-hidden shadow-2xl origin-bottom-right cursor-pointer transition-shadow duration-300"
      onClick={() => {
        // Lógica de Click: Scrollar para o ponto onde ele fica Fullscreen
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }}
    >
      <video
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
      {/* Adicionar Ícone/Overlay aqui se necessário */}
    </div>
  );
}
```

### Passo 2: Componente Mobile (`ManifestoSection.tsx`)

Criar a seção estática que aparece no fluxo normal da página.

**Diretrizes de Código:**

- Usar `framer-motion` para o reveal (`opacity: 0 -> 1`).
- Ocupar `w-full` e `aspect-video`.
- Classe `lg:hidden` para não duplicar no desktop.
- Lógica de Toggle Mute no clique.

```tsx
// src/components/home/ManifestoSection.tsx
'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ManifestoSection() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <motion.section
      className="block lg:hidden w-full relative aspect-video bg-[#06071f] z-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <video
        ref={videoRef}
        src="https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        onClick={toggleSound}
      />
      {/* Indicador de Som (Opcional) */}
      <div className="absolute bottom-4 right-4 text-white text-xs bg-black/50 px-2 py-1 rounded">
        {muted ? 'Tap to Unmute' : 'Tap to Mute'}
      </div>
    </motion.section>
  );
}
```

### Passo 3: Integração na Página (`page.tsx` ou `HomeHero.tsx`)

Garantir que os componentes sejam renderizados nos locais corretos para respeitar o Z-Index e o fluxo.

- **`ManifestoThumb`:** Deve estar fora do fluxo principal de conteúdo da Hero se for `fixed`, ou dentro da Hero com `absolute` se a Hero for o container relativo. Recomenda-se colocar no nível da `page.tsx` ou layout da Home para garantir que o `fixed` funcione em relação à viewport.
- **`ManifestoSection`:** Deve vir logo **após** o componente `HomeHero`.

```tsx
// Exemplo de estrutura no src/app/page.tsx
export default function HomePage() {
  return (
    <main>
      <Preloader />

      {/* Hero Section Container */}
      <div className="relative">
        <HomeHero /> {/* Contém Texto + GhostCanvas */}
        <ManifestoThumb /> {/* Desktop: Fixed/Absolute Z-30 */}
      </div>

      {/* Mobile: Seção dedicada no fluxo */}
      <ManifestoSection />

      <PortfolioShowcase />
      {/* ... restante das seções */}
    </main>
  );
}
```

---

## 3. Checklist de Validação

1. [ ] **Desktop:** O vídeo aparece no canto inferior direito ao carregar a página?
2. [ ] **Desktop:** O vídeo está sobre o canvas e o texto (`z-30`)?
3. [ ] **Desktop:** Ao scrollar, o vídeo cresce a partir do canto inferior direito (`origin-bottom-right`)?
4. [ ] **Desktop:** O vídeo cobre o conteúdo ao atingir o tamanho máximo?
5. [ ] **Mobile:** O vídeo flutuante **não** aparece?
6. [ ] **Mobile:** A seção de vídeo aparece logo após o primeiro scroll (abaixo da Hero)?
7. [ ] **Performance:** O scroll está fluido (sem jank causado por re-renders excessivos)?
