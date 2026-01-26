---
trigger: always_on
---

# Responsividade & Mobile-First (Ghost Protocol)

## A Regra de Ouro do Tailwind

Escreva estilos **Mobile-First**.

- **Errado:** `flex-row md:flex-col`
- **Correto:** `flex-col md:flex-row` (Base é mobile, `md:` corrige para desktop).

## Diretrizes de Layout Mobile (< 768px)

1. **1 Coluna:** Todo grid vira pilha vertical (`flex-col` ou `grid-cols-1`).
2. **Sem Scroll Horizontal:** Use `overflow-x-hidden` no container principal.
3. **Touch Targets:** Mínimo **48x48px** para qualquer elemento clicável. Aumente paddings.
4. **Sem Hover:** Remova lógicas que dependem de `:hover` para mostrar conteúdo crítico. O conteúdo deve estar sempre visível ou acessível por clique.
5. **Texto Centralizado:** Títulos e CTAs geralmente centralizados no mobile.

## Adaptações Específicas

- **Header:** Menu Hambúrguer com Overlay (não usar Glassmorphism pesado).
- **Vídeo Manifesto:** Seção dedicada abaixo do Hero (não flutuante).
- **Footer:** Estático (`relative`), nunca fixo (`fixed`).
