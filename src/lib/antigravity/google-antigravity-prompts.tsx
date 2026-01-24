
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PROMPTS_TEXT = `
Estes prompts foram desenhados para serem "atômicos" (uma tarefa por vez), garantindo que os agentes executores tenham clareza total sobre o que mudar, onde mudar e como validar a correção, mantendo a consistência do seu stack (Next.js, Tailwind, Framer Motion).

---

### 📝 Panorama Geral da Solução

Vamos dividir as correções em três blocos lógicos:

1. **Mobile Fixes (01-06):** Foco em usabilidade, layout e carregamento de mídia.
2. **Desktop UX & Motion (07-10):** Foco em interatividade e refinamento visual.
3. **Portfolio Engine (11-12):** Foco na lógica de grid matemático e alinhamento de mídia.

---

### Regras Globais obrigatórias para TODOS os prompts

- ❌ Não reinventar layout  
- ❌ Não adicionar novos efeitos de animação  
- ❌ Não alterar textos ou conteúdo  
- ✅ A imagem de referência (HOME-PORTFOLIO-LAYOUYT-GHOST.jpg) é a verdade final de layout  
- ✅ Header e Hero devem funcionar como um sistema único  
- ✅ Foco exclusivo em layout + animação  
- ✅ Usar apenas propriedades otimizadas para animação (transform/opacity)  
- ✅ Respeitar prefers-reduced-motion em todas as alterações de motion  

Além disso, ao aplicar qualquer correção, validar sempre o seguinte **Checklist de Bug de Motion**:

1. **Propriedades otimizadas?** (somente transform/opacity; nunca width/height/margin/padding/top/left em animação)  
2. **Hardware acceleration?** (usar will-change ou transform 3D quando necessário)  
3. **Spring vs Tween:** a física faz sentido para o “peso” do elemento?  
4. **Ordem de execução:** não há sobreposição/confusão de animações simultâneas?

---

## 🛠️ Prompts para os Agentes (Google Antigravity)

### 🛠️ Prompt #01 — [Mobile] Correção Crítica de Interação no Header

**Objetivo**

Corrigir falhas de clique e visibilidade do texto no menu mobile, garantindo interação consistente durante toda a animação.

**Arquivos envolvidos**

- \`src/components/layout/Header/...\` (MobileMenu ou StaggeredMenu)

**Ações**

1. Verificar o \`z-index\` do container do menu mobile e garantir que ele esteja acima de qualquer camada da Hero quando aberto.
2. Inspecionar estados animados (Framer Motion e/ou CSS) e remover qualquer uso indevido de \`pointer-events: none\` que possa bloquear cliques em links e botões.
3. Garantir que a cor do texto do menu (vibration/ghost ou equivalente) nunca fique invisível (texto preto sobre fundo preto ou texto transparente) em nenhum estado de scroll ou animação.
4. Padronizar easing e duração da animação de abertura/fechamento usando a curva \`[0.22, 1, 0.36, 1]\` para manter consistência com o restante do sistema.
5. Verificar o comportamento com \`prefers-reduced-motion\`: no modo reduzido, desabilitar ou simplificar a animação, mantendo o menu funcional e sem delays.

**Critérios de aceite**

- [ ] Clique nos itens do menu funcional em 100% das tentativas, mesmo durante a animação.  
- [ ] Texto do menu sempre legível (sem sumir ou colidir com o fundo).  
- [ ] Nenhum layout shift brusco ao abrir/fechar o menu.  
- [ ] Animações usando apenas transform/opacity.  
- [ ] Comportamento consistente para usuários com motion normal e com motion reduzido.

---

### 🛠️ Prompt #02 — [Mobile] Layout Hero Home (CTA + Texto)

**Objetivo**

Reposicionar o CTA da Home no mobile para evitar sobreposição com o texto principal da Hero, respeitando a referência visual.

**Arquivos envolvidos**

- \`src/components/home/HomeHero.tsx\`

**Ações**

1. Reposicionar o CTA (botão/link principal) no mobile usando posicionamento relativo/absoluto (por exemplo, \`absolute bottom-4 left-1/2 -translate-x-1/2\` ou solução equivalente) para mantê-lo próximo à base da seção.
2. Adicionar \`padding-bottom\` suficiente na área de texto da Hero para garantir que o CTA nunca cubra o título ou subtítulo em telas menores.
3. Usar Tailwind para ajustar o layout apenas em breakpoints móveis, preservando o layout atual em desktop.
4. Garantir que quaisquer animações do CTA usem apenas \`transform\` e \`opacity\`, com easing \`[0.22, 1, 0.36, 1]\`.
5. Validar visualmente contra \`HOME-PORTFOLIO-LAYOUYT-GHOST.jpg\` para garantir alinhamento perfeito.

**Critérios de aceite**

- [ ] CTA posicionado próximo à base da Hero em dispositivos móveis.  
- [ ] Texto da Hero (título e subtítulo) 100% legível e nunca coberto pelo CTA.  
- [ ] Layout idêntico à referência visual em mobile.  
- [ ] Nenhuma regressão em desktop.  

---

### 🛠️ Prompt #03 — [Mobile] Centralização do Bloco “Featured Projects”

**Objetivo**

Centralizar o bloco de encerramento da seção de projetos (texto + CTA) no mobile para reforçar a hierarquia visual.

**Arquivos envolvidos**

- \`src/components/home/FeaturedProjects.tsx\` (ou seção equivalente de encerramento de projetos)

**Ações**

1. Aplicar \`text-center\` ao container do texto de fechamento (ex.: “Like what you see?”).
2. Garantir que o container do CTA (botão/link) use \`mx-auto\`, \`justify-center\` ou combinação equivalente (flex) para centralização horizontal perfeita.
3. Verificar que o espaçamento vertical entre texto e CTA siga o ritmo visual da página (sem espaços excessivos ou comprimidos).
4. Assegurar que não há animações que movam o CTA via propriedades não otimizadas (ex.: margin/left/top).

**Critérios de aceite**

- [ ] Texto e CTA centralizados horizontalmente em mobile.  
- [ ] Layout desktop inalterado.  
- [ ] Nenhuma animação de layout causando jumps.  

---

### 🛠️ Prompt #04 — [Mobile] Reordenação Hierárquica da Seção de Contato

**Objetivo**

Ajustar a hierarquia de leitura da seção de contato no mobile, sem quebrar o layout no desktop.

**Arquivos envolvidos**

- \`src/components/sections/Contact.tsx\`

**Ações**

1. Reorganizar a ordem visual dos blocos no mobile usando \`order-1\`, \`order-2\`, etc. para obter a seguinte sequência:  
   1. Texto de apoio (intro da seção)  
   2. Informações de contato (Email/Tel)  
   3. Ícones de redes sociais  
   4. Formulário de contato
2. Manter a estrutura de DOM original para desktop, ajustando apenas a ordem via Tailwind em breakpoints móveis.
3. Garantir que os estados de foco (focus) dos elementos interativos continuem acessíveis e visíveis após a reordenação.
4. Verificar que nenhuma animação extra seja adicionada, apenas o reordenamento de layout.

**Critérios de aceite**

- [ ] Fluxo de leitura mobile: Texto → Contato → Social → Formulário.  
- [ ] Layout desktop preservado.  
- [ ] Estados de foco/hover continuam claros e funcionais.  

---

### 🛠️ Prompt #05 — [Mobile] Tipografia e Contraste da About Hero

**Objetivo**

Melhorar o contraste e a legibilidade do manifesto inicial da página About em dispositivos móveis.

**Arquivos envolvidos**

- \`src/components/about/AboutHero.tsx\`

**Ações**

1. Alterar a cor do texto principal do manifesto para \`text-white\` (ou token equivalente) garantindo contraste adequado com o background.
2. Aplicar a escala tipográfica correspondente a \`font-h3\` (ou token equivalente do design system).
3. Ajustar o line-height para \`leading-tight\` (ou valor equivalente) para melhorar legibilidade em telas estreitas, evitando parágrafos visualmente “soltos”.
4. Validar que os tamanhos e pesos tipográficos respeitam a hierarquia global (H1, H2, H3, body).

**Critérios de aceite**

- [ ] Texto do manifesto em branco com contraste AA ou melhor.  
- [ ] Tamanho tipográfico equivalente a H3 aplicado corretamente.  
- [ ] Leitura confortável no mobile, sem cortes de linha estranhos.  

---

### 🛠️ Prompt #06 — [Config] Mídias Dinâmicas na Seção About Closed

**Objetivo**

Configurar troca de vídeo baseada no dispositivo (desktop vs mobile) na seção About Closed, otimizando carregamento e experiência.

**Arquivos envolvidos**

- \`src/components/about/AboutClosed.tsx\`

**Ações**

1. Implementar múltiplas fontes de vídeo usando a tag \`<source>\` dentro de \`<video>\`, com media queries, por exemplo:  
   - \`<source src=".../VIDEO-SKILLS-MOBILE-FINAL.mp4" media="(max-width: 768px)" />\`  
   - \`<source src=".../VIDEO-SKILLS-FINAL_compressed.mp4" media="(min-width: 769px)" />\`
2. Garantir que apenas a fonte apropriada seja carregada por dispositivo (sem downloads duplicados).
3. Manter qualquer animação de entrada/saída do vídeo existente, mas garantindo que use apenas transform/opacity.
4. Validar que o vídeo não introduz layout shifts ao carregar (altura reservada desde o início).

**Critérios de aceite**

- [ ] Vídeo mobile carregado apenas em dispositivos móveis.  
- [ ] Vídeo desktop carregado apenas em telas maiores.  
- [ ] Nenhum layout shift perceptível no carregamento.  

---

### 🛠️ Prompt #07 — [Desktop] Autoplay & Mute Control do Vídeo Manifesto

**Objetivo**

Controlar o áudio do Vídeo Manifesto com base na visibilidade (scroll), evitando áudio fora de contexto.

**Arquivos envolvidos**

- \`src/components/home/VideoManifesto.tsx\`

**Ações**

1. Usar \`framer-motion\` (ex.: \`whileInView\`, \`useInView\`) ou \`IntersectionObserver\` para detectar quando o vídeo entra e sai da viewport.
2. Definir \`muted = false\` automaticamente quando o vídeo estiver visível acima de um limiar configurado (ex.: 50% em viewport), respeitando restrições de autoplay do navegador.
3. Definir \`muted = true\` quando o vídeo estiver fora da viewport ou abaixo do limiar.
4. Caso exista controle manual de som (botão Mute/Unmute), garantir que a escolha manual do usuário tenha prioridade sobre o controle automático.
5. Garantir que, em \`prefers-reduced-motion\`, o vídeo não inicia com áudio automático (somente após ação explícita do usuário, se desejado).

**Critérios de aceite**

- [ ] Som ativado apenas quando o vídeo estiver claramente visível.  
- [ ] Som desativado quando o vídeo sai da tela.  
- [ ] Nenhuma surpresa sonora para o usuário (especialmente com prefers-reduced-motion ativo).  

---

### 🛠️ Prompt #08 — [Desktop] Restauração da Animação de Scroll na About Origin

**Objetivo**

Restaurar o efeito de animação baseada em scroll na imagem da seção Origin (About), mantendo fluidez e consistência com o restante do site.

**Arquivos envolvidos**

- \`src/components/about/AboutOrigin.tsx\`

**Ações**

1. Reimplementar \`useScroll\` e \`useTransform\` do Framer Motion para vincular o progresso de scroll de um container (ou da página) à opacidade e/ou posição Y da imagem.
2. Definir um mapeamento suave de scroll → \`y\` e \`opacity\` (por exemplo, imagem entra de baixo e se assenta ao centro com opacidade de 0 → 1).
3. Aplicar a curva de easing \`[0.22, 1, 0.36, 1]\` e durações coerentes com as demais animações da página.
4. Validar que a animação não causa stuttering ou quedas de FPS perceptíveis (alvo 60fps).

**Critérios de aceite**

- [ ] Efeito de scroll ativo e suave na seção Origin.  
- [ ] Animação perceptível, mas sutil, sem distrair da leitura.  
- [ ] Nenhum impacto negativo de performance nas seções adjacentes.  

---

### 🛠️ Prompt #09 — [Desktop] UI Refinement dos Ícones (What I Do)

**Objetivo**

Padronizar os ícones dos cards “What I Do” com visual premium e interação consistente.

**Arquivos envolvidos**

- \`src/components/about/WhatIDoCard.tsx\`

**Ações**

1. Ajustar o container do ícone para ter formato circular, fundo azul (token da identidade) e ícone de seta centralizado.
2. Implementar animação de hover usando Framer Motion apenas com \`transform\` (ex.: leve \`scale\` ou \`translateY\`), mantendo o easing global.
3. Adicionar efeito de glow roxo no hover utilizando Tailwind:  
   - \`shadow-[0_0_20px_rgba(168,85,247,0.5)]\`
4. Garantir que o mesmo feedback visual seja acessível via \`focus-visible\` para navegação por teclado.
5. Verificar que o stagger entre cards (se existir) esteja suave e consistente.

**Critérios de aceite**

- [ ] Ícones com formato circular, fundo azul e seta padronizada.  
- [ ] Hover/focus com animação suave e glow roxo perceptível, porém sutil.  
- [ ] Nenhum flicker ou travamento em hovers repetidos rápidos.  

---

### 🛠️ Prompt #10 — [Desktop] Tipografia do Título em About Método

**Objetivo**

Aplicar a fonte de destaque (display) ao título principal da seção Método, reforçando hierarquia visual.

**Arquivos envolvidos**

- \`src/components/about/AboutMetodo.tsx\`

**Ações**

1. Aplicar a classe \`font-display\` (ou token equivalente configurado no Tailwind) ao título “Criatividade com método...” (ou texto equivalente atual).
2. Garantir que o estilo seja consistente em todos os breakpoints (mobile e desktop), usando classes responsivas se necessário.
3. Validar que o título se destaque visualmente em relação a subtítulos e corpo de texto, sem quebrar o layout definido pela imagem de referência.

**Critérios de aceite**

- [ ] Título de Método usando tipografia display da identidade visual.  
- [ ] Coerência visual em mobile e desktop.  
- [ ] Nenhuma alteração de texto, apenas tipografia.  

---

### 🛠️ Prompt #11 — [Portfolio] Grid Matemático Seamless

**Objetivo**

Criar/ajustar o grid de cards de portfólio com altura fixa por linha e larguras adaptáveis “edge-to-edge”, sem gaps laterais.

**Arquivos envolvidos**

- \`src/app/portfolio/page.tsx\`
- \`src/components/portfolio/PortfolioGrid.tsx\`

**Ações**

1. Configurar o grid de cards usando \`flex\` ou \`grid\` para garantir que todos os cards de uma mesma linha tenham a mesma altura (por exemplo, via \`items-stretch\`).
2. Permitir larguras diferentes na mesma linha (ex.: card 1 = 60%, card 2 = 40%) usando \`flex-grow\` ou combinações de \`grid-cols\` que resultem em 100% da linha.
3. Garantir que não haja gaps laterais: as colunas devem encostar nas margens de layout definidas, respeitando a referência \`HOME-PORTFOLIO-LAYOUYT-GHOST.jpg\`.
4. Ajustar os breakpoints para que, em mobile, o layout continue legível (ex.: 1 coluna), mantendo a lógica “edge-to-edge”.

**Critérios de aceite**

- [ ] Alinhamento lateral perfeito (sem “buracos” ou margens irregulares).  
- [ ] Altura uniforme dos cards por linha.  
- [ ] Layout fiel à referência visual em desktop e funcional em mobile.  

---

### 🛠️ Prompt #12 — [Portfolio] Alinhamento de Mídia nos Project Cards

**Objetivo**

Garantir centralização absoluta e enquadramento correto de imagens e vídeos dentro dos cards de portfólio.

**Arquivos envolvidos**

- \`src/components/portfolio/ProjectCard.tsx\`

**Ações**

1. Aplicar \`object-cover\` e \`object-center\` em todas as imagens/vídeos renderizados dentro dos cards para evitar distorções e letterboxing indesejado.
2. Configurar o container da mídia com \`flex\`, \`items-center\` e \`justify-center\` para centralizar o conteúdo tanto na vertical quanto na horizontal.
3. Verificar o comportamento com diferentes proporções (mais horizontal, mais vertical) e garantir consistência visual em todos os casos.
4. Manter qualquer animação já existente apenas em \`transform\` e \`opacity\`, sem adicionar novos efeitos.

**Critérios de aceite**

- [ ] Mídias centralizadas independentemente da proporção original.  
- [ ] Nenhuma distorção perceptível nas imagens/vídeos.  
- [ ] Layout dos cards alinhado ao grid matemático definido no Prompt #11.  
`;

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

// src/app/google-antigravity-prompts/page.tsx

export default function GoogleAntigravityPromptsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-50">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="space-y-2"
        >
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Prompts Técnicos para Agentes Google Antigravity
          </h1>
          <p className="text-sm text-neutral-400">
            Copie cada prompt abaixo e dispare individualmente para os agentes,
            garantindo que cada tarefa seja executada de forma atômica (uma por
            vez), sempre respeitando layout, conteúdo e identidade definidos.
          </p>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.05 }}
          className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/70 shadow-lg shadow-black/40"
        >
          <div className="border-b border-neutral-800 bg-gradient-to-r from-purple-500/10 via-sky-500/5 to-transparent px-4 py-3 sm:px-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-400">
              Bloco de prompts atômicos
            </p>
          </div>
          <div className="max-h-[80vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
            <pre className="whitespace-pre-wrap text-xs leading-relaxed text-neutral-100 sm:text-sm">
              {PROMPTS_TEXT}
            </pre>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
