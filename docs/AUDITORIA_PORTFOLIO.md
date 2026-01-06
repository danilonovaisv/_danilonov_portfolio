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

 
## 🛡️ GHOST QA ENGINE — RELATÓRIO FINAL DE INTEGRIDADE (FULL SCOPE)

**Status da Auditoria:** 🟠 **APROVADO COM RESSALVAS (ACTION REQUIRED)**
**Data:** 06/01/2026
**Escopo:** HOME / PORTFOLIO / SOBRE (Codebase completa `src`)

---

### 1️⃣ VISÃO GERAL TÉCNICA

A arquitetura base (Next.js 14 App Router + Tailwind) está sólida. A integração com WebGL (`src/components/canvas`) está bem isolada. No entanto, a **fidelidade visual ("The Ghost Look")** está comprometida por inconsistências de grid (margens não alinham perfeitamente entre Header e Conteúdo) e violações das regras de Motion (uso de `scale` e easings padrão).

O sistema de fontes (`TT Norms Pro`) parece estar configurado via CSS, mas precisa garantir carregamento sem *layout shift* (CLS).

---

### 2️⃣ DIAGNÓSTICO POR SEÇÃO (O JUIZ)

#### 🏠 HOME PAGE (Hero + Manifesto)

* **Fidelidade Visual:** [✗] Alinhamento vertical do texto do Hero não bate pixel-perfect com o Logo no Header.
* **Motion:** [✗] `ManifestoThumb` usa `scale` (Violação Crítica).
* **Mobile:** [✓] Altura `dvh` correta.
* **WebGL:** [⚠] `GhostStage` sem fallback visual robusto (tela preta/branca antes de carregar).

#### 📂 PORTFOLIO (Listagem)

* **Fidelidade Visual:** [✓] Grid Mosaic está correto.
* **Responsividade:** [✗] Títulos `text-[12vw]` quebram o layout horizontal em celulares pequenos (< 370px).
* **UX:** [⚠] Transição de entrada dos cards está um pouco rápida, fugindo do `GHOST_EASE`.

#### 👤 SOBRE (Origin + Method)

* **Fidelidade Visual:** [⚠] A seção `AboutOrigin` tem espaçamento lateral inconsistente em relação à `Home`.
* **Motion:** [✗] `GhostEyes` (WebGL) pode causar re-render desnecessário se não memoizado.

---

### 3️⃣ TABELA DE SEVERIDADE DE ERROS

| ID | Seção | Erro Encontrado | Severidade | Ação |
| --- | --- | --- | --- | --- |
| **01** | **Global/Motion** | Uso de `scale` e easings padrão (não `GHOST_EASE`). | 🟣 **MOTION** | Refatorar `framer-motion`. |
| **02** | **Home/Header** | Desalinhamento de `padding-x` entre Header e Hero. | 🟡 **VISUAL** | Padronizar Container. |
| **03** | **Home/WebGL** | `Suspense fallback={null}` no Ghost. | 🔴 **CRÍTICO** | Adicionar Loader CSS. |
| **04** | **Portfolio** | Typography Overflow em viewport pequeno. | 🔴 **CRÍTICO** | Add `break-words` / clamp. |
| **05** | **Sobre** | Margens laterais diferentes da Home. | 🟡 **VISUAL** | Unificar classes de Layout. |

---

### 4️⃣ PROMPTS TÉCNICOS DE CORREÇÃO (A MÃO)

Aqui estão os 5 prompts atômicos para corrigir **todo o site**. Execute-os sequencialmente com seu Agente de Código (Cursor/Copilot).

---

#### 🛠️ Prompt #01 — Padronização Crítica de Grid (Header vs Hero)

**Objetivo:** Garantir que o texto do Hero e o Logo do Header tenham exatamente o mesmo alinhamento vertical à esquerda (Edge Alignment).

**Arquivos Alvo:**

* `src/components/layout/header/DesktopFluidHeader.tsx`
* `src/components/home/HeroCopy.tsx` (ou arquivo que contém o texto principal)

**Instruções de Refatoração:**

1. Defina uma variável de classe CSS constante para o container horizontal. Ex: `const CONTAINER_X = "px-6 md:px-12 lg:px-16"`.
2. Aplique essa **mesma classe exata** no wrapper do `DesktopFluidHeader` e no wrapper de conteúdo do `HomeHero`/`HeroCopy`.
3. Remova paddings arbitrários como `pl-4` ou `pl-8` que estejam desalinhados.

**Snippet de Referência:**

```tsx
// Em ambos os arquivos (Header e Hero Content)
const GHOST_CONTAINER = "w-full max-w-[1920px] mx-auto px-5 md:px-10 lg:px-16";

return (
  <div className={GHOST_CONTAINER}>
    {/* Conteúdo */}
  </div>
);

```

---

#### 🛠️ Prompt #02 — Correção Motion Manifesto (Remove Scale)

**Objetivo:** Remover animação de escala proibida e substituir por Reveal/ClipPath conforme "Ghost Design System".

**Arquivo Alvo:** `src/components/home/ManifestoThumb.tsx`

**Instruções de Refatoração:**

1. Localize `useTransform` ou `motion.div` que afeta `scale`.
2. **Apague** a propriedade `scale`.
3. Substitua por um efeito de `clipPath` ou `opacity` + `y` translate suave.
4. Certifique-se de usar `ease: [0.22, 1, 0.36, 1]` (GHOST_EASE).

**Snippet de Referência:**

```tsx
// Substituir Scale por ClipPath Reveal
<motion.div
  style={{
    clipPath: scrollYProgress.get() > 0 ? "inset(0% 0% 0% 0%)" : "inset(5% 10% 5% 10%)",
    transition: { ease: [0.22, 1, 0.36, 1], duration: 1.2 }
  }}
  className="w-full h-full relative overflow-hidden"
>
  <Image ... className="object-cover scale-100" /> {/* Imagem estática ou parallax suave */}
</motion.div>

```

---

#### 🛠️ Prompt #03 — Robustez WebGL (Ghost Fallback)

**Objetivo:** Eliminar o "flash" branco ou vazio antes do Ghost carregar.

**Arquivo Alvo:** `src/components/home/GhostStage.tsx`

**Instruções de Refatoração:**

1. Crie um componente `<GhostFallback />` que seja apenas uma `div` com a cor de fundo exata do site (`bg-[#0A0A0A]` ou similar).
2. Adicione uma opacidade pulsante sutil (`animate-pulse` do Tailwind com duração longa).
3. Insira no `Suspense fallback`.

**Snippet de Referência:**

```tsx
const GhostFallback = () => (
  <div className="absolute inset-0 z-0 bg-brand-black opacity-100 pointer-events-none transition-opacity duration-700" />
);

// No render:
<Suspense fallback={<GhostFallback />}>
  <GhostCanvas />
</Suspense>

```

---

#### 🛠️ Prompt #04 — Segurança de Tipografia (Portfolio)

**Objetivo:** Impedir que "Web Design" ou nomes de projetos quebrem o layout em iPhone SE/Android pequenos.

**Arquivo Alvo:** `src/components/portfolio/PortfolioHeroNew.tsx` (e Cards).

**Instruções de Refatoração:**

1. No texto principal (`text-[12vw]`), adicione a classe `break-words` e `hyphens-auto`.
2. (Opcional) Use `clamp` no estilo inline para limitar o tamanho mínimo: `fontSize: 'clamp(32px, 12vw, 160px)'`.
3. Garanta que o pai tenha `w-full overflow-hidden`.

**Snippet de Referência:**

```tsx
<h1 className="text-[12vw] leading-[0.8] tracking-tighter font-light break-words hyphens-auto w-full overflow-hidden">
  {title}
</h1>

```

---

#### 🛠️ Prompt #05 — Alinhamento Sobre (About)

**Objetivo:** Garantir consistência visual entre a página Sobre e a Home.

**Arquivos Alvo:** `src/components/sobre/AboutHero.tsx`, `src/components/sobre/AboutOrigin.tsx`

**Instruções de Refatoração:**

1. Importe ou reutilize a constante `GHOST_CONTAINER` definida no Prompt #01.
2. Verifique se o texto de "Origin" está alinhado à esquerda com o título.
3. Remova margens negativas se existirem.

---
