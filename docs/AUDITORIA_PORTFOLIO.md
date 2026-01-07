
#### 1️⃣ Visão Geral

A estrutura de arquivos (`src/app`, `src/components`) parece correta para um projeto Next.js App Router moderno. A separação entre componentes de UI (`/ui`), Canvas (`/canvas`) e Seções (`/home`, `/portfolio`) é uma boa prática de arquitetura. No entanto, a complexidade do "Ghost System" exige validação rigorosa de *props* de animação e z-index.

#### 2️⃣ Diagnóstico por Dimensão

| Dimensão | Status | Observação |
| --- | --- | --- |
| **Estrutura** | 🟢 Bom | Componentização lógica e separação de responsabilidades clara. |
| **Fidelidade Visual** | 🟡 Risco | Verificar se o Grid Bento do Portfolio quebra corretamente no Mobile (coluna única vs grid). |
| **Motion** | 🔴 Crítico | Validar se *todas* as animações usam `GHOST_EASE` [0.22, 1, 0.36, 1]. Animações padrão do CSS (`ease-in-out`) são proibidas. |
| **WebGL** | 🟡 Risco | Performance do `FluidGlass` e `Ghost` no mobile. O *fallback* deve ser robusto. |
| **Responsividade** | 🔴 Crítico | O layout "Duas Colunas" do Hero frequentemente quebra em tablets (overflow horizontal). |

---

### 3️⃣ Diagnóstico Detalhado por Seção

#### ## 🎯 Seção: HOME HERO (`HomeHero.tsx` + `HeroCopy.tsx`)

* 📌 **Fidelidade visual (referência):** [✗] (Necessita validação de espaçamento exato da Imagem `HERO.jpg`)
* 📐 **Grid e margens laterais:** [✓] Estrutura parece seguir o container principal.
* ↔️ **Alinhamento duas laterais:** [?] Crítico: O texto da direita (Intro) deve alinhar opticamente com o grid, não flutuar.
* 📱 **Mobile (sm/md):** [✗] Risco alto de o Ghost Canvas sobrepor o texto se o `z-index` não estiver gerenciado via `staggered` logic.
* 🎞️ **Motion/Animações:** [?] Verificar se `HeroCopy` usa `staggerChildren` com o easing correto.

**❌ Problema (Hipótese de Auditoria):**
Provável uso de valores arbitrários no Tailwind (ex: `mt-10`, `gap-4`) em vez de tokens semânticos de espaçamento definidos no Design System, quebrando o ritmo vertical.

**🔧 Correção Técnica:**
Padronizar paddings verticais e horizontais usando classes utilitárias que reflitam o grid do Figma/PDF.

#### ## 🎯 Seção: PORTFOLIO SHOWCASE (`PortfolioShowcase.tsx`)

* 📌 **Fidelidade visual:** [?] Comparar com `PORTFOLIO-PAGE-LAYOUYT.jpg`.
* 🎞️ **Motion:** [✗] Efeito Parallax "Lerp" deve ser suave e não causar *jitter* (tremor) no scroll.
* 🔗 **Integrações:** Validar se o Modal abre via *Route Interception* ou estado local (o PDF menciona "Modal/Página Interna").

---

### 4️⃣ Lista de Problemas (Prioridade)

1. 🔴 **CRÍTICO:** Garantir que o `GHOST_EASE` esteja definido em `src/lib/motionTokens.ts` e sendo importado em *todos* os componentes de animação.
2. 🔴 **CRÍTICO:** Validar a renderização condicional do WebGL no Mobile em `src/hooks/useWebGLSupport.ts` ou similar para evitar crash em dispositivos low-end.
3. 🟡 **VISUAL:** Ajustar o `leading` (line-height) e `tracking` (letter-spacing) da tipografia no `HeroCopy` para bater exatamente com a imagem `HERO.jpg`.

---

### 🛠️ ETAPA 3: A MÃO (Prompts Atômicos Executáveis)

Vou gerar agora o primeiro prompt de correção focado na **Fundação de Motion**, pois ela afeta todas as outras seções. Se o Easing estiver errado, todo o site perde a "alma" do Ghost Design.

#### 🛠️ Prompt #01 — [Ghost System] Configuração de Motion Tokens

**Objetivo**

* Garantir que a constante `GHOST_EASE` e as durações padrão estejam corretamente definidas e exportadas para uso global, eliminando "magic numbers" nas animações.

**Arquivos/Rotas envolvidas**

* `src/lib/motionTokens.ts`

**Contexto:**
Auditoria Ghost QA detectou necessidade de padronização absoluta de curvas de animação.

**Instruções de Refatoração (Step-by-Step):**

1. Verifique/Crie o arquivo `src/lib/motionTokens.ts`.
2. Defina `GHOST_EASE = [0.22, 1, 0.36, 1]`.
3. Defina durações padrão: `DURATION_FAST = 0.4`, `DURATION_MEDIUM = 0.8`, `DURATION_SLOW = 1.2`.
4. Exporte variantes padrão do Framer Motion (`fadeUp`, `staggerContainer`) usando esses tokens.

**Snippet de Referência (Obrigatório):**

```typescript
// src/lib/motionTokens.ts

export const GHOST_EASE = [0.22, 1, 0.36, 1]; // Curva Bezier "Editorial"

export const GHOST_TRANSITION = {
  duration: 0.8,
  ease: GHOST_EASE,
};

export const MOTION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: GHOST_EASE
      }
    },
  },
};

```

---

#### 🛠️ Prompt #02 — [Layout] Correção do Grid Home Hero

**Objetivo**

* Ajustar `HomeHero.tsx` para seguir estritamente o layout de 2 colunas assimétricas (Esquerda: Título / Direita: Contexto) e garantir responsividade.

**Arquivos/Rotas envolvidas**

* `src/components/home/HomeHero.tsx`
* `src/components/home/hero/HeroCopy.tsx`

**Ações**

1. Aplicar container global com padding horizontal responsivo (`px-4 md:px-8 lg:px-12`).
2. Configurar grid CSS: `grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-8`.
3. Posicionar Título Principal: `col-span-1 lg:col-span-7`.
4. Posicionar Thumb/Intro: `col-span-1 lg:col-span-4 lg:col-start-9`.
5. Garantir z-index superior para o texto (`relative z-10`) sobre o WebGL.

**Critérios de aceite (Checklist)**

* [ ] Título alinhado à esquerda.
* [ ] Bloco de intro alinhado à direita (grid col 9-12 no desktop).
* [ ] Mobile: empilhamento vertical (Título -> Intro).
* [ ] Sem sobreposição visual que impeça leitura.

---


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


