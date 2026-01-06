---
trigger: always_on
---

# Contexto do Projeto: Portfólio Danilo Novais (Ghost Era)

## Visão Geral

Portfólio interativo de alta fidelidade focado em **Creative Coding**, **Minimalismo Editorial** e **Performance**.
O projeto segue a filosofia "Ghost Design": presença que guia sem aparecer.

- **Domínio:** `portfoliodanilo.com`
- **Conceito:** "You don't see design. But it sees you."

## Sitemap & Estrutura de Seções (Fonte da Verdade)

### 1. HOME (`/`)

A entrada principal. Impacto visual e curadoria.

1.  **Header** (Global - Fluid Glass).
2.  **Hero Section**: Ghost WebGL Atmosphere + Manifesto Video Thumbnail (Desktop) ou Seção de Vídeo (Mobile).
3.  **Portfolio Showcase**: Categorias interativas (Accordion Stripes).
4.  **Featured Projects**: Bento Grid Magazine (Destaques).
5.  **Clients / Brands**: Grid de logos monocromáticos (Global).
6.  **Contact**: Formulário + Info (Global).
7.  **Footer**: (Global).

### 2. SOBRE (`/sobre`)

Narrativa profunda e pessoal. Texto sobre imagem/vídeo.

1.  **Header** (Global).
2.  **Hero / Manifesto**: Vídeo Loop Background + Texto Manifesto (Overlay Sólido).
3.  **Origem Criativa**: Timeline narrativa com alternância texto ↔ mídia (1 Col mobile, 2 Cols desktop).
4.  **O Que Eu Faço**: Grid de Cards de serviços + Marquee animado (Rodapé da seção).
5.  **Como Eu Trabalho**: Metodologia em lista (6 itens).
6.  **O Que Me Move**: Frases rotativas (Motion Text) + Ghost Reveal (CGI).
7.  **Fechamento**: Texto de autoridade ("10 anos de estrada") + CTAs (Fale Comigo / Download CV).
8.  **Clients / Brands** (Reused).
9.  **Contact** (Reused).
10. **Footer** (Reused).

### 3. PORTFOLIO (`/portfolio`)

Showcase completo e imersivo. Foco na obra.

1.  **Header** (Global).
2.  **Hero Section**: Vídeo Loop Fullscreen + Título "Portfólio Showcase" + CTA.
3.  **Projects Gallery**: Grid de Projetos com **Parallax Lerp** (Scroll suave customizado).
4.  **Project Modal**: Overlay de detalhes (Type A: Zoom / Type B: Full Case) — _Sem navegação para nova página, tudo via Modal/Portal_.
5.  **Clients / Brands** (Reused).
6.  **Contact** (Reused).
7.  **Footer** (Reused).

## Design System: Ghost System v3.0

### Palette (Tokens Oficiais)

- `bluePrimary`: `#0048ff` (Cor da Marca, CTAs, Links).
- `blueAccent`: `#4fe6ff` (Brilhos Ghost, Atmosfera).
- `background`: `#040013` (Fundo Principal - Deep Void).
- `text`: `#fcffff` (Texto Principal).
- `textSecondary`: `#a1a3a3` (Metadados).
- `purpleDetails`: `#8705f2` (Highlights sutis).

### Typography

- **Font Family:** 'TT Norms Pro' (Self-hosted).
- **Scale:** Uso de `clamp()` para fluidez entre Mobile e Desktop.

## Princípios Visuais

- **Ghost Atmosphere:** Presença sem peso. Uso de opacidade e blur.
- **Motion:** Editorial e silencioso. Easing `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Interação:** O usuário nunca espera (loaders rápidos ou invisíveis).
