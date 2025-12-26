---
description:
---

# Google Antigravity Agent Prompt: Portfólio Danilo Novais – Next.js

## Papéis de Agentes

1. **Next.js Architect**
   - Responsável por: estrutura de `app/`, layouts, server/client components, SEO, rotas.
   - Critério de handoff: quando há erro de build, rota quebrada ou inconsistência de server/client.

2. **Performance Engineer**
   - Responsável por: Web Vitals, bundle splitting, lazy loading, otimização de R3F e Framer Motion.
   - Critério de handoff: quando há LCP alto, CLS ou INP fora do padrão.

3. **Design QA**
   - Responsável por: alinhamento visual, tipografia, espaçamento, responsividade.
   - Critério de handoff: quando há inconsistência visual ou quebra de layout.

4. **A11y Specialist**
   - Responsável por: navegação por teclado, contraste, semântica, aria, reduced motion.
   - Critério de handoff: quando há falha crítica de acessibilidade.

5. **Three.js Optimizer**
   - Responsável por: performance de `OrbCanvas`, uso de `frameloop`, `DPR`, assets.
   - Critério de handoff: quando há queda de FPS ou uso excessivo de GPU.

## Regras de segurança e estabilidade

- Não alterar estrutura de pastas sem justificativa técnica.
- Não remover ou renomear rotas existentes.
- Garantir que o build (`npm run build`) continue funcionando.
- Respeitar o design system (tokens de cor, tipografia Inter, espaçamento Tailwind).

## Política de priorização

- **P0**: Erros de build, quebra de rota, regressão visual crítica, falha de acessibilidade.
- **P1**: Performance ruim (LCP > 2.5s), CLS alto, animações travadas.
- **P2**: Pequenas inconsistências visuais, tipografia, espaçamento.

## Formato de saída padronizado

Cada agente deve retornar:

1. **Diagnóstico**
   - Problema observado
   - Arquivo/componente afetado
   - Severidade (P0/P1/P2)

2. **Fix**
   - Trecho de código alterado
   - Explicação técnica

3. **Validação**
   - Critérios de aceite
   - Passos para testar

---

Exemplo de saída:

### Diagnóstico

- **Problema**: `Hero.tsx` não respeita `prefers-reduced-motion`.
- **Arquivo**: `components/sections/Hero.tsx`
- **Severidade**: P1

### Fix

```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
  style={{
    ...(window.matchMedia('(prefers-reduced-motion: reduce)').matches && {
      transition: 'none',
      opacity: 1,
    }),
  }}
/>
```

### Validação

- Abrir em Chrome com `prefers-reduced-motion: reduce` ativo.
- Verificar que animação não ocorre.

````

---

## B) Diagnóstico do site (por página e por sessão)

### Página: Home (`/`)

#### 1. Hero Section
- **Problema**: `TorusDan` com `frameloop="always"` em mobile.
- **Causa**: `components/three/TorusDan.tsx` força renderização contínua.
- **Impacto**: Bateria drenada, FPS baixo em dispositivos móveis.
- **Severidade**: P0

#### 2. Portfolio Showcase
- **Problema**: Scroll horizontal em mobile devido a `flex-nowrap`.
- **Causa**: `components/home/PortfolioShowcase.tsx`
- **Impacto**: UX ruim em mobile.
- **Severidade**: P1

#### 3. Featured Projects
- **Problema**: Cards sem `aria-label` ou `alt` em imagens.
- **Causa**: `components/home/FeaturedProjects.tsx`
- **Impacto**: Acessibilidade prejudicada.
- **Severidade**: P1

#### 4. Clients Section
- **Problema**: Logos sem fallback textual.
- **Causa**: `components/home/Clients.tsx`
- **Impacto**: Acessibilidade e SEO prejudicados.
- **Severidade**: P2

#### 5. Contact Form
- **Problema**: `formsubmit.co` sem fallback em JS desativado.
- **Causa**: `components/home/Contact.tsx`
- **Impacto**: Acessibilidade e usabilidade.
- **Severidade**: P1

---

### Página: Sobre (`/sobre`)
- **Problema**: Placeholder sem conteúdo real.
- **Causa**: `app/sobre/page.tsx`
- **Impacto**: Conteúdo incompleto.
- **Severidade**: P1

---

### Página: Portfolio (`/portfolio`)
- **Problema**: Placeholder sem conteúdo real.
- **Causa**: `app/portfolio/page.tsx`
- **Impacto**: Conteúdo incompleto.
- **Severidade**: P1

---

## C) Plano de correção (ordem sugerida)

1. **Fixar `frameloop` do R3F no Hero para mobile**
2. **Corrigir scroll horizontal no Portfolio Showcase**
3. **Adicionar `aria-label` e `alt` nos Featured Projects**
4. **Adicionar fallback textual nas logos do Clients**
5. **Melhorar acessibilidade do Contact Form**
6. **Implementar conteúdo real nas páginas `/sobre` e `/portfolio`

---

## D) Implementação

### 1. Fixar `frameloop` do R3F no Hero para mobile

**Arquivo**: `components/three/TorusDan.tsx`

```tsx
// ANTES
<Canvas frameloop="always">
  <TorusGeometry args={[1, 0.4, 16, 100]} />
</Canvas>

// DEPOIS
<Canvas frameloop={window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'never' : 'always'}>
  <TorusGeometry args={[1, 0.4, 16, 100]} />
</Canvas>
````

**Explicação**: Evita renderização contínua em mobile e respeita `prefers-reduced-motion`.

---

### 2. Corrigir scroll horizontal no Portfolio Showcase

**Arquivo**: `components/home/PortfolioShowcase.tsx`

```tsx
// ANTES
<div className="flex flex-nowrap overflow-x-auto">

// DEPOIS
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
```

**Explicação**: Substitui `flex-nowrap` por `grid` para evitar scroll horizontal em mobile.

---

### 3. Adicionar `aria-label` e `alt` nos Featured Projects

**Arquivo**: `components/home/FeaturedProjects.tsx`

```tsx
// ANTES
<img src={project.image} />

// DEPOIS
<img
  src={project.image}
  alt={project.title}
  aria-label={project.title}
/>
```

**Explicação**: Melhora acessibilidade para leitores de tela.

---

### 4. Adicionar fallback textual nas logos do Clients

**Arquivo**: `components/home/Clients.tsx`

```tsx
// ANTES
<img src={logo.src} />

// DEPOIS
<img
  src={logo.src}
  alt={logo.alt}
  aria-label={logo.alt}
/>
<span className="sr-only">{logo.alt}</span>
```

**Explicação**: Garante que usuários com leitor de tela ou imagens desativadas possam entender o conteúdo.

---

### 5. Melhorar acessibilidade do Contact Form

**Arquivo**: `components/home/Contact.tsx`

```tsx
// ANTES
<form action="https://formsubmit.co/danilo@portfoliodanilo.com" method="POST">

// DEPOIS
<form
  action="https://formsubmit.co/danilo@portfoliodanilo.com"
  method="POST"
  noValidate
>
  <noscript>
    <p>Seu navegador não suporta JavaScript. Envie um e-mail diretamente para danilo@portfoliodanilo.com.</p>
  </noscript>
```

**Explicação**: Adiciona fallback para usuários sem JavaScript.

---

## E) Testes e validação

### Desktop (1280 / 1440+)

- Verificar que o `TorusDan` não causa lag.
- Verificar que o `PortfolioShowcase` não tem scroll horizontal.
- Verificar que o `FeaturedProjects` tem `alt` e `aria-label`.
- Verificar que o `Clients` tem fallback textual.
- Verificar que o `Contact` tem fallback para JS desativado.

### Mobile (320 / 375 / 414)

- Ver
