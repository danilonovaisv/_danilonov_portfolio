---
description: Header Specification and Implementation Guide
---

# Workflow: Header (Fluid Floating Ghost)

Este workflow define o comportamento e o estilo do header global flutuante.

## Especificação Visual

- **Tipo**: Fluid Floating Pill.
- **Posição**: Fixa no topo (`fixed top-6 left-0 right-0 z-40`).
- **Container**: Formato de pílula (`rounded-full`) com largura máxima de `min(1200px, calc(100vw - 48px))`.
- **Efeito Visual (Ghost Era)**:
  - **Fundo**: Vidro etéreo com `backdrop-filter: blur(20px)` e borda sutil `border-white/10`.
  - **Diferencial**: O fundo deve parecer uma membrana semi-visível, não um bloco sólido.
- **Sombra**: Sombra profunda e suave (`shadow-2xl` customizada).
- **Logo**: Logo Institucional (SVG) em `primary blue` (#0057FF) ou `white`.

## Interações Premium

- **Fluid Movement**: A pílula segue levemente o eixo X do mouse com física de mola (`framer-motion` `useSpring`).
- **Squash & Stretch**: Deforma sutilmente nos eixos X/Y durante o movimento lateral para parecer "líquida/orgânica".
- **Links de Navegação**:
  - Hover: Texto brilha (glow sutil) e underline azul expande do centro.
  - Active: Cor azul primária.
- **Mobile**: Substituído pelo `MobileStaggeredMenu` (entrada via pre-layers sweep).

## Requisitos Técnicos

- **Dynamic Rendering**: Carregado com `next/dynamic` para evitar hidratação desalinhada de estados do mouse.
- **Reduced Motion**: Desativa o mouse-tracking e efeitos de deformação.
- **Mix Blend Mode**: Usar `mix-blend-difference` em elementos críticos se necessário para legibilidade sobre o "Ghost" da Hero.

## Regras Inegociáveis

- **Transparência Inteligente**: O header deve ser legível tanto em fundos claros quanto escuros (idealmente usando o tema Dark como alvo principal).
- **Z-Index**: Deve estar acima de tudo (z-40+), exceto loaders de página (z-50+).
- **Acessibilidade**: `aria-label` descritivos e estados de `:focus-visible` com anéis arredondados.
