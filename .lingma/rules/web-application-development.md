---
trigger: always_on
---

# Web Application Development Standards

## Estrutura de Diretórios (Atualizada)

src/ app/ # Next.js App Router pages (home)/ # Route group para Home sobre/ # Página Sobre portfolio/ # Página Portfolio components/ # React Components ui/ # Componentes básicos (Button, Input, Marquee) layout/ # Header, Footer home/ # Seções exclusivas da Home (Hero, Featured) about/ # Seções exclusivas do Sobre (Origin, Method, Beliefs) portfolio/ # Seções do Portfolio (Gallery, ProjectCard, Modal) canvas/ # R3F / WebGL Components config/ # Constantes, rotas, dados estáticos (brand.ts, projects.ts) hooks/ # Custom Hooks (useParallax, useWindowSize, useBodyLock) styles/ # Globals e Tailwind config types/ # Definições TypeScript (Project, Section)

## Padrões de Componentização
1. **Server Components:** Padrão. Use `'use client'` apenas na folha (leaf) da árvore que precisa de interatividade (ex: `ProjectCard` com hover, `Gallery` com scroll listener).
2. **Separação de Seções:** Cada seção das páginas (ex: "Origem Criativa" em Sobre) deve ser um componente isolado em `src/components/about/OriginSection.tsx`.
3. **Tailwind:** Use classes utilitárias. Evite `@apply`.
4. **Imagens:** Sempre use `next/image`.

## Workflow de Implementação
1. **Identidade Visual:** Seguir as regras de `00-project-context.md`.
2. **Motion Choreography:**
   - **Home:** WebGL pesado + Motion.
   - **Sobre:** Motion de texto e imagem (Scroll Reveal).
   - **Portfolio:** Parallax Lerp (Custom physics).
3. **Clean Code:** Remover logs de produção.

## SEO & Metadata
- Todo SVG deve ter `aria-hidden="true"` se for decorativo.
- Metadata dinâmica em `layout.tsx` e `page.tsx` de cada rota.