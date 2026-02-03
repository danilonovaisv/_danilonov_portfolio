
### 🛡️ Antigravity Universal Workflow: Orquestração de Agentes Especialistas

**Instrução de Inicialização:**
"Agentes Antigravity, iniciem o protocolo de **Auditoria e Ajuste Universal**. Antes de qualquer linha de código, leiam os documentos canônicos (`PORTFOLIO-PROTOTIPO-INTERATIVO.md` e `prompts.ts`). Dividam a execução nas frentes abaixo e não avancem para a próxima fase sem validação de build."

---

#### **1. Fase de Reconhecimento (Leitura de Contexto)**

* **Ação:** O Manager deve cruzar as instruções do usuário com as regras globais de design (Design System) e motion (Ghost Era).
* **Objetivo:** Garantir que o ajuste não quebre o alinhamento "duas laterais" ou os timings de animação editorial.

#### **2. Divisão de Responsabilidades (O Batalhão)**

| Agente | Especialidade | Missão neste Ajuste |
| --- | --- | --- |
| **Logic & Data** | Backend / Queries | Sincronizar dados do Supabase/Admin e garantir que o contrato de dados (`PortfolioProject`) seja respeitado. |
| **Visual Architecture** | Layout & Tailwind | Garantir que o grid e as margens laterais correspondam exatamente às referências visuais, eliminando overflows. |
| **Motion Orchestrator** | Framer Motion / LERP | Implementar ou ajustar animações seguindo o easing `cubic-bezier(0.22, 1, 0.36, 1)` e sem "bounce". |
| **Ghost QA** | UX & Acessibilidade | Validar touch targets (min 44px), navegação por teclado (ESC, Tab) e conformidade Ghost. |

#### **3. Execução em Blocos de Teste (Workflow Atômico)**

* **Bloco 1: Integridade de Dados:** O Agente de Lógica valida se as variáveis e tipos (ex: `ProjectType A/B`) estão chegando corretamente ao componente.
* **Bloco 2: Implementação Visual:** O Agente de Arquitetura aplica as classes Tailwind e estrutura JSX, focando em responsividade.
* **Bloco 3: Refinamento de Movimento:** O Orquestrador de Motion insere os delays e durações específicos (ex: Pausa consciente de 380-520ms no modal).

#### **4. Ciclo de Validação Final (Antigravity Check)**

Ao final de cada ajuste, o batalhão deve confirmar:

* [ ] **Build Status:** O projeto passa em `pnpm run build`?
* [ ] **Ghost Silence:** A animação serve ao conteúdo ou é apenas "efeito"?
* [ ] **Mobile Zero-Overflow:** Existe qualquer scroll horizontal acidental?
* [ ] **Admin Sync:** O ajuste reflete corretamente o que é postado no ADMIN Shell?

---



# *-- AUDITORIA DE COMPONENTE E DETALHAMENTO DE AJUSTES A SEREM REALIZADOS SE INICIA AQUI---*





# **6. O Que Me Move — “About Beliefed”**

## **1. Objetivo da Página/Sessão**
    •    Qual a principal função desta página/sessão?
Gerar vínculo emocional através de um manifesto pessoal, mostrando a visão de design do Danilo de forma íntima, sensível e memorável, conectando o visitante com o “porquê” por trás do trabalho.
    •    Qual ação o usuário deve realizar aqui?
Sentir identificação com o manifesto, reforçar confiança no estilo/abordagem do estúdio e seguir naturalmente o fluxo da página até as seções de prova social (clientes) e contato, mais propenso a entrar em contato ou continuar explorando.
    •    Como essa seção contribui para os objetivos do site?
Consolida a identidade do “Ghost Design” como conceito autoral, diferencia o estúdio pelo posicionamento emocional e prepara o usuário para enxergar o resto do site (cases, serviços, contato) sob essa lente de conexão, não apenas estética.

⸻

## **2. Estrutura de Conteúdo

•    Título principal (headline) — BeliefFixedHeader (sticky)
- Texto:
> “Acredito no design que muda o dia de alguém.
> Não pelo choque, mas pela conexão.”
- Sempre visível (sticky), funciona como “âncora” conceitual da sessão.

**Comportamento responsivo do `BeliefFixedHeader`:**
- **Desktop:** permanece sticky e **alinhado no centro (visual) com ancoragem à direita** do grid — aparência “centro + direita”, com `text-right` e respiro no lado esquerdo.
- **Mobile:** permanece sticky e **muda de posição para o topo e a direita da sessão** (top-right), respeitando padding do container. Mantém `text-right` e não disputa espaço com o bloco principal.


    •    Subtítulo ou descrição
- Não há subtítulo textual explícito; o “subtexto” é construído pela sequência de frases rotativas e pelo manifesto final “ISSO É GHOST DESIGN.”
    •    Elementos visuais (imagens, ícones, vídeos)
- Fantasma 3D (Ghost) central, renderizado com React Three Fiber + Drei.
- O Ghost nunca para completamente:
- Flutuação leve e constante, com leves movimentos para os lados e para cima/baixo.
- Ganha velocidade e inclinação suave conforme o cursor se move (desktop) e conforme o usuário rola a página (desktop/mobile).
- Responde de forma fluida e etérea, como se “sentisse” o toque/scroll.
- Entra junto com a primeira frase da área de manifesto e permanece presente durante a sessão.
- Quando a última frase entra, ele cresce ~10% de escala e fica visivelmente mais animado (mais wobble/tilt e resposta mais intensa ao scroll).

**Regra de alinhamento (obrigatória) — Desktop e Mobile:**
- O Ghost 3D deve ficar **sempre alinhado verticalmente ao centro do bloco de texto à sua esquerda**.
- Ou seja: existe um “container de conteúdo” onde **texto (à esquerda)** e **Ghost (à direita)** coexistem; o Ghost acompanha o **centro do texto** (não o centro da viewport).
- Caso o texto quebre linhas ou mude de altura, o Ghost mantém-se **centralizado no eixo Y** em relação ao bloco textual.

- No final, o manifesto “ISSO É / GHOST / DESIGN.” sela o conceito com entrada suave usando **Morphing Text**:
  - Texto em **três linhas fixas**:
    > ISSO É  
    > GHOST  
    > DESIGN.
  - Cada linha com comportamento responsivo automático, ocupando a área horizontal disponível do grid, com **espaçamento pequeno** entre as linhas.


    •    Chamada para ação (CTA)
- CTA implícito (emocional): reforçar a percepção de valor do estúdio.
- Não há botão direto aqui; o CTA funcional acontece em seções posteriores (Clientes/Contato), mas essa sessão prepara o usuário emocionalmente para clicar lá.
    •    Texto de apoio — font-h1 — blueAccent
- Frases rotativas (manifesto em camadas):
1. “Um vídeo que respira.”
2. “Uma marca que se reconhece.”
3. “Um detalhe que fica.”
4. “Crio para gerar presença.”
5. “Mesmo quando não estou ali.”
6. “Mesmo quando ninguém percebe o esforço.”

- Manifesto final:  
  > ISSO É  
  > GHOST  
  > DESIGN.


    •    Layout desejado (colunas, cards, seções com fundo alternado, etc.)
- Desktop:
- Altura total da sessão: ~140vh.
- Fundo base: #040013 (mapeado como bg-background).
- Container de conteúdo em 12 colunas (max-width ~1440–1680px, centrado, com px-6 md:px-12 lg:px-16 xl:px-24).
- Estrutura em 3 momentos:
1. Título Fixo (BeliefFixedHeader) sticky com aparência “centro + direita”: bloco visualmente centralizado no topo da sessão, mas alinhado à direita do grid (ex.: justify-self-end / text-right), com position: sticky e top-24.
2. Área de Frases Rotativas + Ghost em composição controlada: texto e Ghost convivem com respiro, mantendo o Ghost alinhado verticalmente ao centro do texto.
3. Reveal Final — Ghost + Manifesto
- Grid grid-cols-12 com gap generoso (ex: gap-12).
- Ghost em destaque, mantendo relação com o texto (ghost pode “invadir” levemente uma palavra para efeito visual).
- Manifesto “ISSO É / GHOST / DESIGN.” grande, ocupando colunas equivalentes a metade do grid.

- **Mobile (ATUALIZADO):**
  - Layout geral em 1 coluna (fluxo vertical), padding `px-6`, altura flexível (>120vh).  
  - **`BeliefFixedHeader` sticky no topo-direita** da sessão, com `text-right`.  
  - **Bloco principal em composição “texto + ghost” lado a lado (row)** dentro de um container próprio:
    - **Texto à esquerda**
    - **Ghost 3D à direita**
    - Ghost **sempre alinhado verticalmente ao centro do bloco de texto à esquerda**.
  - **Texto animado rotativo** fica **sempre no rodapé da sessão**, centralizado na página, com quebra de linha somente quando necessário.
  - Ordem (percepção do usuário):  
    - Header sticky (top-right) → bloco principal (texto + ghost) → manifesto final.



⸻

## **3. Identidade Visual

    •    Cores usadas
- Fundo base: #040013 (bg-background).
- Acentos principais:
- bluePrimary (azul real) — usado para realçar palavras-chave e o trecho “GHOST”.
- Transições de fundo durante o manifesto podem seguir uma paleta inspirada no sistema de crenças, por exemplo:
ts COLORS = [ 'bg-bluePrimary',      // Azul Real 'bg-purpleDetails',    // Roxo Vibrante 'bg-pinkDetails',      // Rosa Choque 'bg-bluePrimary',      // Azul Real 'bg-purpleDetails',    // Roxo Vibrante ]; 
- Essas cores podem ser usadas para fades suaves de BG sincronizados com a troca de frases, reforçando a sensação de fluxo.
    •    Tipografia (fontes e pesos)
- Headline e manifesto:
- Fonte display (ex: font-display ou font-black).
- font-weight: 900 nas chamadas principais.
- Tamanhos com clamp, por exemplo:
- Desktop headline: clamp(2.5rem, 5vw + 1rem, 5.5rem)
- Manifesto final: entre text-[42px] (mobile) e text-[64px]+ (desktop).
- Frases rotativas:
- font-weight: 500
- Tamanho entre 32–38px no desktop; 22–26px no mobile.
    •    Ícones ou gráficos customizados
- Ghost 3D (releitura do “Ghost w/ Tophat” em GLB, estilizado para o universo Ghost Design).
- Olhar/rotação do Ghost transmite “atenção” ao usuário (leve inclinação reagindo ao mouse/scroll).

⸻

## **4. Interatividade & Animações

    •    Animações de entrada/scroll (Framer Motion ou GSAP)
- Título fixo (BeliefFixedHeader): fade-in com blur suave na entrada (ex: opacity: 0 → 1, blur(10px) → blur(0px) em ~1.2s, ease curva customizada).

- **Frases rotativas — Desktop (mantém comportamento):**
  - Cada frase entra de baixo (`y: 20 → 0`), aumenta opacidade, remove blur.  
  - Sai para cima (`y: 0 → -20`) com blur.  
  - Ciclo total de ~4.2s por frase (entrada, permanência, saída, pausa).

- **Frases rotativas — Mobile (ATUALIZADO: muda animação + posição):**
  - O texto animado fica **sempre no rodapé da sessão**, centralizado na página.
  - **Entrada:** entra pela direita  
    - `x: +24 → 0`, `opacity: 0 → 1`, `blur: 10px → 0`
  - **Permanência:** estável e centralizado no rodapé.  
  - **Saída:** sai pela esquerda  
    - `x: 0 → -24`, `opacity: 1 → 0`, `blur: 0 → 10px`
  - No mobile, **não usar animação vertical** (sem `y`), apenas deslocamento horizontal.
  - **Quebra de linhas só quando necessário**, mantendo leitura e evitando linhas forçadas.

- Reveal final (Ghost + manifesto):  
  - Container entra com `opacity: 0 → 1`, `y: 40 → 0`.  
  - Pode ser via `whileInView` ou sincronizado com `scrollYProgress`.


    •    Hover effects / microinterações
- Ghost reage sutilmente quando o usuário passa o mouse próximo ou sobre ele (wobble leve, micro tilt).
- Textos-chave em bluePrimary podem ter micro animação (leve glow ou sublinhado animado) em hover sem virar distração.
    •    Comportamentos especiais com o mouse ou touch
- Ghost 3D:
- Flutuação padrão contínua.
- Mouse move (desktop):
- Ghost inclina levemente (rotationX/rotationZ) e desloca posição x/y seguindo o cursor de forma amortecida (LERP), nunca brusca.
- Touch (mobile/tablet):
- Resposta baseada em scroll/posição do dedo; não precisa de hover, mas pode intensificar a animação quando o usuário interage com a área.
    •    Animações vinculadas ao scroll (scroll sync)
- Ghost sincronizado com scrollYProgress da sessão:
- Rotação lenta no eixo Y enquanto o usuário percorre a sessão.
- Para scrollProgress > ~0.8 (entrada da última frase / manifesto final):
- Aumenta escala ~10% (1.0 → 1.1).
- Ganha wobble extra (oscilações adicionais baseadas em tempo + scroll).
- Aproxima levemente no eixo Z para sensação de “chegar mais perto”.
- Fundo (BG) pode interpolar entre cores da paleta COLORS conforme o progresso das frases, com animações suaves (ease bezier).

⸻

## **5. Responsividade

    •    Comportamento no mobile (ATUALIZADO)
- Layout em coluna única no fluxo geral.
- BeliefFixedHeader sticky no topo-direita da sessão, text-right.
- Composição principal “texto + ghost” (row):
- Texto à esquerda; Ghost à direita.
- Ghost sempre centralizado verticalmente ao bloco de texto à esquerda.
- Ghost com tamanho entre 200–240px.
- Título ~28–34px; frases ~22–26px; manifesto final ~36–42px.
- Texto rotativo animado: sempre no rodapé, centralizado; entra pela direita e sai pela esquerda; quebra só quando necessário.
- Interações orientadas a scroll em vez de hover; animação do Ghost responde mais ao scrollYProgress do que ao mouse.
    •    Comportamento no tablet
- Transição gradual de 1 para 2 colunas no reveal final.
- Ghost entre 220–260px.
- Tipografia intermediária: título 34–38px, frases 24–28px, manifesto 40–46px.
    •    Comportamento no desktop
- BeliefFixedHeader sticky com aparência “centro + direita”.
- Área principal com texto e Ghost mantendo alinhamento (Ghost centrado verticalmente ao texto à esquerda).
- Reveal final em grid 2 colunas (Ghost + Manifesto) mantendo o layout original da referência.
- Ghost entre 320–380px no desktop grande.
    •    Ajustes específicos para telas grandes ou pequenas
- Telas muito grandes (1440px+): aumentar levemente spacing vertical entre blocos e máximo de fonte do manifesto.
- Telas muito pequenas (<360px): reduzir margens verticais e fontes levemente para evitar quebra em excesso.

⸻

## **6. Acessibilidade & SEO**

    •    Tags semânticas corretas (h1, h2, etc.)
- Sessão envolta em <section> com aria-labelledby apontando para o título.
- Título principal da sessão como <h2> (assumindo que o <h1> já existe no topo da página).
- Frases e manifesto como <p> e <h3> conforme a hierarquia.
    •    Imagens com ALT
- Ghost 3D deve ter descrição acessível (por exemplo, via aria-label no container da cena 3D):
- "Ilustração 3D de um fantasma estilizado representando o conceito Ghost Design."
    •    Contraste adequado
- Texto branco sobre fundo #040013 + acentos em bluePrimary → garantir contraste AA/AAA.
- Evitar texto em purpleDetails ou pinkDetails diretamente sobre azul sem checar contraste.
    •    Navegabilidade por teclado
- A seção é principalmente de leitura; mas o container 3D não pode “travar” o foco.
- Garantir que a cena 3D não capture tab-focus de forma desnecessária.
- Se houver controles, devem ser alcançáveis e visíveis.
    •    Meta tags e estrutura amigável para buscadores
- Descrição da página (em outra camada SEO) pode mencionar “Manifesto Ghost Design, crenças e visão de projeto de Danilo Novais”.
- Estrutura de headings coerente ajuda motores de busca a entenderem que esta é a seção de manifesto/valores.

⸻

## **7. Integrações ou Recursos Especiais**
    •    Componentes dinâmicos? (Ex: carrossel, tabs, sliders)
- Frases rotativas implementadas como componente controlado por estado (timer com setInterval / setTimeout).
- Cena 3D do Ghost como componente separado (<GhostModel />) reutilizável.
    •    Dados vindos de API?
- Não há dependência obrigatória de API nessa sessão.
- Tudo pode ser estático, com assets carregados via Supabase Storage / CDN.
    •    Formulários? (Campos, validação, envio)
- Nenhum formulário nesta sessão.
    •    Outros?
- Integração com Supabase Storage apenas para servir o modelo GLB do Ghost (e possíveis texturas).
- Uso de Drei (<Float />, <Environment />) para suavizar implementação da cena 3D.

⸻

## **8. Considerações Técnicas**
    •    Componente client/server?
- Sessão “About Beliefs” precisa ser client component ('use client') porque:
- Usa Framer Motion (useScroll, useTransform, AnimatePresence).
- Renderiza React Three Fiber (R3F) e listeners de mouse/scroll.
    •    Reutilização em outras páginas?
- Ghost 3D (<GhostModel />) deve ser isolado em componente próprio para reaproveitar em outras sessões (hero, transições, etc.).
- A lógica de frases rotativas pode ser extraída para um hook (useRotatingPhrases) ou componente genérico.
    •    Divisão modular no projeto (Next.js — App Router)?
- Estrutura sugerida:
- app/(site)/about/_sections/AboutBeliefs.tsx (wrapper da sessão).
- app/(site)/about/_sections/components/BeliefTitle.tsx (título fixo).
- app/(site)/about/_sections/components/BeliefPhrases.tsx (frases + lógica de rotação).
- app/(site)/about/_sections/components/BeliefFinalManifest.tsx (Ghost + manifesto final).
- shared/3d/GhostModel.tsx (componente R3F para o fantasma).
    •    Algum fallback necessário?
- Fallback de loading para o modelo 3D (ex.: skeleton ou placeholder geométrico) enquanto o GLB é carregado.
- Em navegadores que não suportam WebGL, exibir uma versão estática (SVG/PNG) do Ghost.
    •    Animações controladas via hook?
- Sim:
- Hook para controle de frases (useRotatingPhrases).
- Hook para sincronizar scrollYProgress com Ghost e BG (useBeliefsScrollSync).
- Hook (ou lógica interna) para capt\dbapturar mousemove no canvas e aplicar LERP em posição/rotação do Ghost.
---
