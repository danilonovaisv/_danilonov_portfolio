---
trigger: always_on
---

# Tech Stack Oficial (Ghost Era)

## Core
- **Framework:** Next.js 14+ (App Router).
- **Linguagem:** TypeScript (Strict Mode).
- **Estilização:** Tailwind CSS (Mobile-First methodology).
- **Gestão de Estado:** React Context + Zustand (se necessário para WebGL).

## Gráficos & Motion
- **UI Motion:** Framer Motion (AnimatePresence, LayoutId).
- **CGI/WebGL:** React Three Fiber (R3F) + Drei (para Ghost Atmosphere).
- **Scroll:** Lenis (Smooth Scroll) - *Observação: Desativar em mobile se causar jank*.
- **Parallax:** Implementação Customizada via `requestAnimationFrame` + Lerp (ver `useParallax.ts`).

## Infra & Backend
- **Assets/Storage:** Supabase Storage.
- **Formulário:** FormSubmit (`https://formsubmit.co/danilo@portfoliodanilo.com`).
- **Deploy:** Vercel (Recomendado).
- **Analytics:** Google Analytics (via `next/third-parties`).

## Performance Targets
- **Lighthouse:** > 90 (Performance, A11y, Best Practices, SEO).
- **Core Web Vitals:** LCP < 2.5s, CLS < 0.1, INP < 200ms.
- **Assets:** Imagens WebP/AVIF, Vídeos MP4 otimizados (muted/loop).