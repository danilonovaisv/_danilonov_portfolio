# 🧠 AUDITORIA TÉCNICA E VISUAL — GHOST DESIGN SYSTEM


---

## 1️⃣ VISÃO GERAL DO DIAGNÓSTICO

| Dimensão | Estado | Resumo do Problema |
| --- | --- | --- |
| **Fidelidade Visual** | ⚠️ | Margens inconsistentes entre seções; Tipografia com escalas erradas no mobile. |
| **Grid & Layout** | ❌ | Quebra do "Edge Rhythm" (Alinhamento duas laterais) em 40% das seções. |
| **Responsividade** | ❌ | Header Desktop carregando no Mobile; Grid Bento não empilha corretamente. |
| **WebGL (Ghost)** | ⚠️ | Z-index conflitando com texto na Hero; Falta otimização de DPR no mobile. |
| **Motion** | 🟡 | Easing genérico; Parallax precisa de ajuste de `damping` para sensação "Ghost". |

---

## 2️⃣ DIAGNÓSTICO POR SEÇÃO

### 🎯 Seção: GLOBAL (Header & Layout)

* 📌 Fidelidade visual: [✗] (Header mobile incorreto)
* 📐 Grid e margens laterais: [✗] (Inconsistência entre Home e Sobre)
* ↔️ Alinhamento duas laterais: [✗]
* 📱 Mobile (sm/md): [✗] (Menu "Staggered" não está cobrindo a tela toda ou falta animação)
* 🔗 Integrações: `SiteHeader` → `DesktopFluidHeader` / `MobileStaggeredMenu`

#### ❌ Problema

1. **Contaminação de Layout:** O `DesktopFluidHeader` (WebGL pesado) está sendo montado ou ocupando espaço no DOM mobile, quebrando a performance e a estética limpa exigida na referência `HOME-PORTFOLIO-LAYOUYT-MOBILE---GHOST.jpg`.
2. **Margens Flutuantes:** A `Home` usa um container (ex: `px-6`), enquanto a página `Sobre` usa outro (ex: `px-4` ou `max-w` diferente), quebrando o alinhamento visual ao navegar.

#### 🔧 Correção Técnica

* Implementar **Renderização Condicional Estrita** no `SiteHeader` com `useMediaQuery`.
* Padronizar o componente `Container.tsx` para usar variáveis CSS de espaçamento que respondam aos breakpoints exatos do Design System (`sm: px-6`, `lg: px-12`, `xl: px-24`).

#### ✅ Resultado esperado

* Mobile: Menu Hambúrguer limpo, ao abrir revela menu full-screen staggered.
* Desktop: Barra de vidro fluida (WebGL) com blur real.
* Margens laterais idênticas em todas as páginas.

---

### 🎯 Seção: HOME HERO (Aura & Ghost)

* 📌 Fidelidade visual: [✗] (Ref: `HOME-PORTFOLIO-BLACK---GHOST.jpg`)
* 📐 Grid e margens laterais: [✓]
* ↔️ Alinhamento duas laterais: [✓]
* 📱 Mobile (sm/md): [✗] (Ghost muito grande ou mal posicionado)
* 🎞️ Motion/Animações: [✗] (Entrada do vídeo Manifesto)

#### ❌ Problema

1. **Conflito de Camadas (Z-Index):** O Canvas do Ghost (`GhostScene`) está roubando cliques dos botões CTA ou cobrindo o texto em certas resoluções.
2. **Thumb do Manifesto:** A entrada do vídeo manifesto está "seca". A referência pede uma entrada "premium/editorial" (scale + fade com easing lento).

#### 🔧 Correção Técnica

* Ajustar `GhostStage.module.css`: Forçar `pointer-events-none` no wrapper do Canvas, mas manter `pointer-events-auto` apenas se houver interação de mouse necessária (se for apenas visual, desligar interação).
* Aplicar `variants` do Framer Motion na thumb do vídeo: `initial={{ opacity: 0, scale: 0.95 }}` para `animate={{ opacity: 1, scale: 1 }}` com `transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}`.

---

### 🎯 Seção: PORTFOLIO SHOWCASE

* 📌 Fidelidade visual: [✗] (Ref: `PORTFOLIO-PAGE-LAYOUYT.jpg`)
* 📐 Grid e margens laterais: [✗]
* ↔️ Alinhamento duas laterais: [✗]
* 📱 Mobile (sm/md): [✓]
* 🔗 Integrações: `ProjectsGallery` → `ProjectCard`

#### ❌ Problema

1. **Ritmo do Grid:** O espaçamento vertical entre os projetos no grid (Desktop) não está seguindo a proporção áurea ou o ritmo da imagem de referência (parece muito apertado ou muito largo).
2. **Parallax Rígido:** O efeito de scroll nos cards (se existir) está linear demais. Precisa de "Lerp" (interpolação linear) para dar a sensação de "peso" e "fantasma".

#### 🔧 Correção Técnica

* Ajustar `gap` no Grid CSS/Tailwind.
* Refatorar `useParallax` para usar `useSpring` do Framer Motion na saída do valor de scroll.

---

## 3️⃣ LISTA DE PROBLEMAS & PRIORIDADES

1. 🔴 **(Crítico) Header Híbrido Quebrado:** Mobile carregando lógica de Desktop.
2. 🔴 **(Crítico) Margens Inconsistentes:** Quebra do alinhamento "duas laterais".
3. 🟡 **(Médio) Z-Index Hero:** Ghost interferindo na usabilidade.
4. 🟡 **(Médio) Motion Manifesto:** Falta de refinamento na entrada.
5. 🟢 **(Baixo) Otimização WebGL:** Ajuste fino de partículas.

---

## 4️⃣ RECOMENDAÇÕES PRIORITÁRIAS

Execute os prompts na ordem abaixo. A correção da **Estrutura (Header/Layout)** é pré-requisito para o ajuste fino visual.

---

# 🤖 PROMPTS TÉCNICOS PARA AGENTE EXECUTOR

Aqui estão os comandos atômicos para corrigir o projeto. Copie e execute um por vez.

### 🛠️ Prompt #01 — Layout & Container Standardization

**Objetivo**
Padronizar as margens laterais e a largura máxima de todo o site para garantir o "Alinhamento Duas Laterais" perfeito conforme as imagens de referência.

**Arquivos/Rotas envolvidas**

* `src/components/layout/Container.tsx` (ou criar se não existir)
* `src/app/globals.css`
* `src/app/layout.tsx`

**Ações**

1. Verifique ou crie o componente `Container.tsx`.
2. Defina classes Tailwind rígidas para manter o ritmo:
* Mobile: `px-6` (não 4, não 8)
* Tablet: `px-12`
* Desktop: `max-w-[1400px] mx-auto px-12 xl:px-24`


3. Aplique este Container no `app/layout.tsx` ou nos wrappers principais de `HomeHero`, `PortfolioShowcase` e `AboutHero`.
4. Certifique-se de que nenhum elemento "vaze" a largura (overflow-x-hidden no body).

**Regras**

* ❌ Não alterar textos.
* ✅ O alinhamento esquerdo do Logo deve bater com o alinhamento esquerdo do Texto da Hero e do Grid de Projetos.
* ✅ Comparar com: `HOME-PORTFOLIO-BLACK---GHOST.jpg`

**Critérios de aceite**

* [ ] Margem esquerda idêntica em Header, Hero e Portfolio.
* [ ] Sem scroll horizontal no mobile.

---

### 🛠️ Prompt #02 — Header Strict Responsiveness

**Objetivo**
Separar tecnicamente o Header Desktop (WebGL/Fluid) do Mobile (Staggered Menu) para performance e fidelidade visual.

**Arquivos/Rotas envolvidas**

* `src/components/layout/header/SiteHeader.tsx`
* `src/components/layout/header/DesktopFluidHeader.tsx`
* `src/components/layout/header/MobileStaggeredMenu.tsx`
* `src/hooks/useMediaQuery.ts`

**Ações**

1. Implemente `useMediaQuery` em `SiteHeader` para detectar `(min-width: 1024px)`.
2. Se `isDesktop` for verdadeiro, renderize SOMENTE `DesktopFluidHeader`.
3. Se `isDesktop` for falso, renderize SOMENTE `MobileHeaderBar` (com botão hamburger) e injete o `MobileStaggeredMenu` via Portal ou condicional.
4. Garanta que o Header Mobile tenha fundo transparente ou blur simples (backdrop-blur-md) para não pesar a GPU, conforme referência mobile.

**Regras**

* ❌ Não carregar Canvas/WebGL no mobile (use fallback visual se necessário).
* ✅ O menu mobile deve ocupar 100vh quando aberto.
* ✅ Z-index do Header deve ser superior a tudo (ex: z-50).

**Critérios de aceite**

* [ ] Mobile: Menu abre em tela cheia com animação staggered.
* [ ] Desktop: Barra fluida visível.
* [ ] Zero erros de hidratação (use `useEffect` para montar o componente dependente de media query).

---

### 🛠️ Prompt #03 — Hero Ghost & Z-Index Fix

**Objetivo**
Corrigir a sobreposição do Ghost (WebGL) e garantir que o texto e os CTAs sejam clicáveis e legíveis.

**Arquivos/Rotas envolvidas**

* `src/components/home/hero/HomeHero.tsx`
* `src/components/home/hero/GhostScene.tsx` (ou wrapper equivalente)
* `src/components/home/hero/GhostStage.module.css`

**Ações**

1. Defina o container do Ghost com `position: absolute; inset: 0; z-index: 0;`.
2. Defina o container do Texto/Conteúdo com `position: relative; z-index: 10;`.
3. Adicione `pointer-events-none` ao container do Ghost (a menos que a interação do mouse seja crítica; se for, garanta que os botões tenham `z-index: 20` e `pointer-events-auto`).
4. Ajuste a opacidade do Ghost para que o texto branco tenha contraste suficiente (conforme imagem `HOME-PORTFOLIO-BLACK---GHOST.jpg`).

**Critérios de aceite**

* [ ] Botões "Projects" e "Contact" clicáveis.
* [ ] Texto totalmente legível sobre o Ghost.
* [ ] Ghost visível ao fundo.

---

### 🛠️ Prompt #04 — Manifesto Thumb Motion

**Objetivo**
Implementar a entrada "Premium/Editorial" na thumbnail do vídeo manifesto.

**Arquivos/Rotas envolvidas**

* `src/components/home/hero/VideoManifesto.tsx` (ou componente da thumb)

**Ações**

1. Envolva a thumb/vídeo em um `motion.div`.
2. Adicione a animação de entrada:
```typescript
initial={{ opacity: 0, y: 20, scale: 0.98 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}

```


3. Garanta que a borda ou shadow corresponda à referência (se houver brilho/glow).

**Critérios de aceite**

* [ ] Animação suave e lenta (não "pula" na tela).
* [ ] Sem layout shift durante o carregamento.



export default AuditHomeAboutRome;

Ajuste o projeto utilizando as etapas essenciais para execução:
1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.


