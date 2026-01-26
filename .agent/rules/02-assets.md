---
trigger: always_on
---

# 🎨 Ghost System v3.0: Design System & Assets

Este documento é a "Fonte da Verdade" para a estética do projeto. Siga rigorosamente os tokens e cálculos abaixo.

## 1. REPOSITÓRIO DE ASSETS (SUPABASE)

**Base URL:** `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/`

*   **Logos:** `/logo_site/LogoLight.svg`, `/logo_site/LogoDark.svg`
*   **Vídeos:** 
    *   `VIDEO-APRESENTACAO-PORTFOLIO.mp4` (Home/Portfolio Hero)
    *   `VIDEO HERO - SOBRE-DESKTOP.mp4` / `MOBILE.mp4` (Página Sobre)
*   **Fonts:** `TT Norms Pro` (Disponível localmente em `/public/fonts/`).

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette

| Token          | Value     | Uso Principal                                      |
| :------------- | :-------- | :------------------------------------------------- |
| **bluePrimary**| `#0048ff` | Marca, CTAs, Links, Foco                           |
| **blueAccent** | `#4fe6ff` | Atmosfera Ghost, Brilhos, Highlights               |
| **background** | `#040013` | Deep Void (Fundo Principal)                        |
| **text**       | `#fcffff` | Texto Primário (Contraste Alto)                    |
| **textSecondary**| `#a1a3a3`| Metadados, Legendas                                |
| **surface**    | `#0b0d3a` | Cards sutis, Gradientes de fundo                   |
| **error**      | `#ff3366` | Validação de formulários                           |

### 2.2 Typography (Fluid Design)

**Fonts:** `TT Norms Pro` (Primária), `Geist Mono` (Tech/Monospace).

#### Fluid Tokens (`clamp`)
| Token      | Mobile (<768px)  | Desktop (≥1024px) | Tailwind Class |
| :--------- | :--------------- | :---------------- | :------------- |
| **Display**| 2.5rem (40px)    | 5.5rem (88px)     | `text-display` |
| **H1**     | 2rem (32px)      | 3.5rem (56px)     | `text-h1`      |
| **H2**     | 1.5rem (24px)    | 2.5rem (40px)     | `text-h2`      |
| **Body**   | 1rem (16px)      | 1.125rem (18px)   | `text-body`    |

**Regra CSS:** Use `clamp()` para transições suaves entre breakpoints.

---

## 3. GRID & LAYOUT (MATEMÁTICA GHOST)

O sistema usa **12 colunas** (Desktop) e **4 colunas** (Mobile).

| Breakpoint | Columns | Gutter (Gap) | Margin (X-Padding) |
| :--- | :--- | :--- | :--- |
| **Mobile** (<768px) | **4** | `16px` (gap-4) | `24px` (px-6) |
| **Tablet** (768px+) | **8** | `24px` (gap-6) | `48px` (px-12) |
| **Desktop** (1024px+) | **12** | `32px` (gap-8) | `64px` (px-16) |

### 🧱 Estrutura de Z-Index
1.  `z-0`: Canvas WebGL (Background).
2.  `z-10`: Glass Layers (Backdrop-blur).
3.  `z-20`: Content (Textos/Interativos).
4.  `z-50`: Header/Nav (Sticky).
5.  `z-100`: Modals/Overlays.

---

## 4. ANIMATION PRINCIPLES

**Engine:** Framer Motion + Lenis Scroll.

### The "Ghost" Easing
Sensação de peso e elegância: `ease: [0.22, 1, 0.36, 1]` (Cubic Bezier).

### Padrões de Implementação:

```tsx
// Revelação Padrão (Scroll Reveal)
const ghostReveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

// Cascata (Stagger)
const containerStagger = {
  show: { transition: { staggerChildren: 0.1 } }
};

5. REGRAS MÓVEIS (MOBILE-FIRST)
Alinhamento: Se < md, use text-center e flex-col items-center por padrão.
Interatividade: Remova efeitos de :hover em dispositivos touch; substitua por feedback de toque ou visibilidade persistente.
Performance: Se detectada GPU fraca, o Canvas (z-0) deve ser substituído por um gradiente CSS de background para surface.