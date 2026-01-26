---
trigger: always_on
---

---
trigger: always_on
---

# Contexto do Projeto: Portfólio Danilo Novais

## Visão Geral

Portfólio interativo de alta fidelidade para Danilo Novais (Creative Developer). O objetivo é posicionar a marca pessoal com a mensagem: "Design, não é só estética".

## Estrutura da Home Page

1. Contexto do Projeto
   • Projeto: Portfólio Institucional de Danilo Novais
   • Páginas principais:
   • Home
   • Sobre
   • Portfólio
   • Contato

Ordem das seções da Home

1. Header
2. Hero + thumb video manifesto
3. Portfolio Showcase
4. Featured Projects
5. Clients / Brands
6. Contact
7. Footer

Ordem das seções da Sobre

1. Header
2. Hero - AboutHero
3. AboutOrigin
4. AboutWhatIDo
5. AboutMethod
6. AboutBeliefs
8. AboutClosing
9. Clients / Brands
10. Contact
11. Footer

Ordem das seções da Potfolio

1. Header
2. Hero
3. Portfolio Showcase cards
4. Clients / Brands
5. Contact
6. Footer

## Design System (Ghost Theme)

-Colors
• primary: #0057FF — Cor de destaque e interação
• bg: #f0f0f0 — Fundo padrão neutro
• text: #000000 — Texto padrão
• textInverse: #FFFFFF — Texto sobre fundo escuro
• neutralLight: #F5F5F5 — Fundo secundário e elementos suaves

⸻

Typography
• Fonte principal: TT Norms Pro (self-host, se licenciado)
• Fallbacks: ui-sans-serif, system-ui
• Tamanhos e pesos:
• Logo: 18–22px, font-semibold
• Navegação: 15–16px, font-medium, tracking-tight

# Contexto: Ghost Era (v3.0)
Este repositório é o núcleo do portfólio de Danilo Novais.

## Estrutura do Código (src/)
- `app/`: Next.js App Router. Páginas: Home (Grouped), Sobre, Portfolio.
- `components/`: UI e Seções divididas por página (about, home, portfolio).
- `canvas/`: Onde vive a alma "Ghost". Componentes R3F e Shaders.
- `hooks/`: Lógica de Scroll (Lenis) e Parallax customizado.
- `config/`: Centralização de dados (brand.ts, projects.ts).

## O Conceito "Ghost"
Minimalismo editorial. Elementos que aparecem através de brilhos (glow) e desfoques (blur). O movimento deve ser "fluido e silencioso".