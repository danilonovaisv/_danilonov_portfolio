---
description: # Workflow: Implementação do Portfolio Showcase
---

# Workflow: Implementação do Portfolio Showcase (Lo&Behold Style)

**Contexto:**
Esta seção é a porta de entrada para o portfólio, apresentando 3 categorias principais num formato de "Stripes" interativos, com tipografia hierárquica e previews laterais, replicando a fluidez da referência Lo&Behold.

### Referências visuais absolutas (lei)

- docs/HOME "HOME-PORTFOLIO-BLACK---GHOST.jpg" E "HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg"
- Documentação para checagem de configuração: docs/HOME "HOME - PROTOTIPO INTERATIVO.md"

### Design Specs & Comportamento (Ajustados)

- **Layout:** 3 linhas horizontais (Stripes) separadas por bordas finas.
- **Alinhamento Desktop:** Alternado (Direita / Centro / Esquerda).
- **Mobile:** Empilhado, alinhamento centralizado, sem hover effects.
- **Container:** `max-width: 1680px`, `padding-inline: clamp(24px, 5vw, 96px)` para todos os breakpoints.
- **Background:** `#040013` (fundo escuro principal).

### Passo a Passo de Implementação (Ajustado)

1.  **Componente `PortfolioShowcase.tsx`:**
    - **Headline Centralizada:** `"portfólio showcase"` com `text-display` (clamped).
      - Cor: "portfólio" em `#fcffff`, "showcase" em `#0048ff`.
      - Espaçamento: `mt-16 mb-12` (desktop), `mt-8 mb-6` (mobile).
    - **Floating Label (Desktop apenas):** `[what we love working on]` posicionado absolutamente à esquerda, próximo ao primeiro stripe, cor `#4fe6ff`, fonte `micro`.
    - **Grid de Stripes:** Usar `flex flex-col gap-8 md:gap-12` para empilhar as stripes verticalmente.

2.  **Componente `CategoryStripe.tsx`:**
    - **Estrutura:**
      - Container: `flex items-center justify-between` (ou `justify-end`, `justify-center`, `justify-start` conforme o alinhamento).
      - **Content Block:** Contém o título da categoria (usar `h2` ou `h3` com `font-h2`/`font-h3`) e o ícone de seta em círculo azul.
      - **Thumbnail Wrapper (Desktop):** Elemento invisível por padrão, que revela a imagem no hover.
    - **Interatividade (Desktop):**
      - **Hover na Stripe:**
        - **Thumbnail:** `width: 0 → 288px`, `opacity: 0 → 1` (duração: 700ms, easing: `cubic-bezier(0.22, 1, 0.36, 1)`).
        - **Content Gap:** `gap-7 → gap-10` (duração: 300ms).
        - **Arrow Icon:** Rotação de `-45deg → 0deg` (duração: 500ms).
      - **Click na Stripe:** Navega para `/portfolio?category=[slug]`.
    - **Estado Ativo (Expandido):** Não aplicável. O comportamento é de hover, não de toggle.

3.  **Dados das Categorias (Hardcoded):**
    - **Stripe 1 (Brand & Campaigns):**
      - Título: `"Brand & Campaigns"`
      - Slug: `brand-campaigns`
      - Thumbnail: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp`
      - Alinhamento: `justify-end` (direita).
    - **Stripe 2 (Videos & Motions):**
      - Título: `"Videos & Motions"`
      - Slug: `videos-motions`
      - Thumbnail: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif`
      - Alinhamento: `justify-center` (centro).
    - **Stripe 3 (Web Campaigns, Websites & Tech):**
      - Título: `"Web Campaigns, Websites & Tech"` (quebra em duas linhas se necessário).
      - Slug: `websites-webcampaigns-tech`
      - Thumbnail: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp`
      - Alinhamento: `justify-start` (esquerda).

4.  **Acessibilidade & QA (Ajustado):**
    - Adicionar `role="button"` e `tabIndex={0}` às stripes para navegação por teclado.
    - Garantir que o foco seja visível (`focus-visible:outline-2 focus-visible:outline-[#4fe6ff]`).
    - **Mobile:** Desativar completamente as animações de hover. Mostrar apenas o título e o ícone, sem thumbnail.

5.  **CTA Final:**
    - **Botão:** `"let's build something great →"` (usar o componente `CTAButton` padrão).
    - **Cor:** Fundo `#0048ff`, texto branco.
    - **Hover:** Fundo muda para `#4fe6ff`, seta translada `4px` para a direita.
    - **Espaçamento:** `pt-12 pb-16` (desktop), `pt-8 pb-12` (mobile). Centralizado.

6.  **Validação Visual (@VisualCore) - Ajustada:**
    - Verificar se o ritmo visual (espaçamentos, fontes, cores) coincide exatamente com o protótipo.
    - Em ecrãs ultrawide (≥1920px), confirmar que o conteúdo está contido em `1680px` e não esticado.
    - Testar o comportamento de hover em desktop e o estado estático em mobile.
    - Confirmar que o floating label só aparece em desktop e está posicionado corretamente.
