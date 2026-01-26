---
trigger: always_on
---

# Stack Técnica & Regras de Codificação
- **Framework:** Next.js 15.3+ (App Router).
- **3D:** React Three Fiber + @react-three/drei.
- **Motion:** Framer Motion para UI 2D; GSAP para Timelines complexas.
- **Scroll:** Lenis para Smooth Scroll (Obrigatório).

## Regras de Implementação
1. **Server vs Client:** Mantenha os Layouts como Server Components. `use client` apenas em componentes de folha (botões, canvas).
2. **Performance 3D:** Use `Suspense` em todos os Canvas. Otimize modelos com Draco.
3. **Tipagem:** TypeScript Strict. Defina interfaces para todas as Props de componentes.

## Ghost Atmosphere (Gráficos & Motion)

- **3D Engine:** React Three Fiber (R3F) v8+.
- **Helpers:** @react-three/drei, @react-three/postprocessing.
- **Motion:** Framer Motion (para UI 2D) + GSAP (opcional para timelines complexas).
- **Scroll:** Lenis (Smooth Scroll) - _Mandatório para a sensação "Ghost"._

## Infraestrutura & Backend

- **Hosting:** Vercel (Melhor integração com Next.js).
- **Database/Storage:** Supabase (Postgres + Storage para assets 3D).
- **Forms:** React Server Actions (Nativo do Next.js).

## Regras de Ouro

1. **Client vs Server:** Use `use client` apenas nas folhas da árvore (botões, canvas 3D). Mantenha o layout base como Server Component.
2. **Performance:** Carregue modelos GLB via `gltfjsx` e use `draco` compression.