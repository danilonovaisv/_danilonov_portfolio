---
trigger: always_on
---

# Auditoria: Acessibilidade & Performance

## Web Vitals & Métricas

- **LCP (Largest Contentful Paint):** O vídeo Hero é o LCP. Otimizar carregamento.
- **CLS (Cumulative Layout Shift):** Definir `aspect-ratio` em containers de imagem/vídeo para evitar pulos.

## Acessibilidade (WCAG AA)

- **Vídeos:** Devem ter botão de controle de som ou iniciar `muted`.
- **Foco:** O site deve ser navegável via Tab. O Outline de foco deve ser visível (use `focus-visible:ring`).
- **Semântica:** Use `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`.
- **Labels:** Botões de ícone (como o Menu Hambúrguer) PRECISAM de `aria-label`.

## Otimização de Assets

- Imagens: `loading="lazy"` para tudo abaixo da dobra.
- WebGL: Carregar dinamicamente (`next/dynamic` com `ssr: false`).
