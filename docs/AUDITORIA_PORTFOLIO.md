
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


### 📝 Panorama Geral da Solução

Vamos dividir as correções em três blocos lógicos:

1. **Mobile Fixes (01-06):** Foco em usabilidade, layout e carregamento de mídia.
2. **Desktop UX & Motion (07-10):** Foco em interatividade e refinamento visual.
3. **Portfolio Engine (11-12):** Foco na lógica de grid matemático e alinhamento de mídia.

---

## 🛠️ Prompts para os Agentes

### 🛠️ Prompt #01 — [Mobile] Correção Crítica de Interação no Header

**Objetivo**

* Corrigir falha de clique e visibilidade do texto no menu mobile.

**Arquivos envolvidos**

* `src/components/layout/Header/...` (MobileMenu ou StaggeredMenu)

**Ações**

1. Verificar `z-index` do container do menu para garantir que não está abaixo de elementos da Hero.
2. Validar se há `pointer-events: none` impedindo o clique em estados de animação.
3. Garantir que a cor do texto (vibration/ghost) não mude para transparente ou preto sobre fundo preto durante o scroll.

**Critérios de aceite**

* [ ] Clique funcional em 100% das vezes.
* [ ] Texto visível durante toda a interação de abertura/fechamento.

---

### 🛠️ Prompt #02 — [Mobile] Layout Hero Home

**Objetivo**

* Reposicionar o CTA da Home para evitar sobreposição de conteúdo.

**Arquivos envolvidos**

* `src/components/home/HomeHero.tsx`

**Ações**

1. Ajustar o posicionamento do CTA (Botão/Link) usando `absolute bottom-4` ou similar, garantindo proximidade com o rodapé da seção.
2. Garantir que o texto principal da Hero tenha `padding-bottom` suficiente para nunca ser coberto pelo CTA em telas pequenas.

**Critérios de aceite**

* [ ] CTA próximo à base da tela.
* [ ] Texto da Hero totalmente legível acima do CTA.

---

### 🛠️ Prompt #03 — [Mobile] Centralização Featured Projects

**Objetivo**

* Centralizar o bloco de fechamento da seção de projetos.

**Arquivos envolvidos**

* `src/components/home/FeaturedProjects.tsx` (ou seção de encerramento)

**Ações**

1. Aplicar `text-center` ao container do texto “Like what you see?”.
2. Aplicar `mx-auto` ou `justify-center` ao container do CTA para centralização horizontal total.

**Critérios de aceite**

* [ ] Texto e Botão perfeitamente centralizados no mobile.

---

### 🛠️ Prompt #04 — [Mobile] Reordenação Seção Contato

**Objetivo**

* Ajustar a hierarquia de leitura da página de contato.

**Arquivos envolvidos**

* `src/components/sections/Contact.tsx`

**Ações**

1. Alterar a ordem do Flex/Grid para: 1. Texto de Apoio > 2. Info de Contato (Email/Tel) > 3. Ícones Redes Sociais > 4. Formulário.
2. Usar classes `order-1`, `order-2`, etc., do Tailwind para garantir a ordem correta sem quebrar o layout desktop.

**Critérios de aceite**

* [ ] Fluxo de leitura mobile: Texto → Contato → Social → Forms.

---

### 🛠️ Prompt #05 — [Mobile] Tipografia About Hero

**Objetivo**

* Melhorar o contraste e legibilidade do manifesto inicial.

**Arquivos envolvidos**

* `src/components/about/AboutHero.tsx`

**Ações**

1. Alterar a cor do texto para `text-white`.
2. Aplicar a classe de escala `font-h3` (ou equivalente em pixels conforme a spec).
3. Garantir `leading-tight` para melhor leitura em telas estreitas.

**Critérios de aceite**

* [ ] Texto branco e tamanho H3 aplicado.

---

### 🛠️ Prompt #06 — [Config] Mídias Dinâmicas About

**Objetivo**

* Implementar troca de vídeo baseada no dispositivo para a seção About Closed.

**Arquivos envolvidos**

* `src/components/about/AboutClosed.tsx`

**Ações**

1. Implementar lógica de detecção de viewport (ou usar a tag `<source media="(max-width: 768px)">` dentro de `<video>`).
2. **URLs:** - Desktop: `.../VIDEO-SKILLS-FINAL_compressed.mp4`
* Mobile: `.../VIDEO-SKILLS-MOBILE-FINAL.mp4`



**Critérios de aceite**

* [ ] Vídeo mobile carregando apenas em dispositivos móveis.

---

### 🛠️ Prompt #07 — [Desktop] Autoplay & Mute Control

**Objetivo**

* Controle inteligente de áudio no Vídeo Manifesto baseado no scroll.

**Arquivos envolvidos**

* `src/components/home/VideoManifesto.tsx`

**Ações**

1. Usar `framer-motion` (`whileInView`) ou `Intersection Observer` para detectar quando o vídeo está visível.
2. Ativar `muted = false` ao entrar na viewport.
3. Ativar `muted = true` ao sair da viewport.

**Critérios de aceite**

* [ ] Som ativa/desativa automaticamente sem intervenção do usuário ao scrollar.

---

### 🛠️ Prompt #08 — [Desktop] Restauração Animação About Origin

**Objetivo**

* Recuperar o efeito de scroll-transform na imagem da seção Origin.

**Arquivos envolvidos**

* `src/components/about/AboutOrigin.tsx`

**Ações**

1. Reimplementar `useScroll` e `useTransform` do Framer Motion.
2. Vincular o scroll à opacidade ou deslocamento (Y) da imagem para criar o efeito de "sumir/surgir" suave.

**Critérios de aceite**

* [ ] Animação de scroll funcionando conforme comportamento anterior.

---

### 🛠️ Prompt #09 — [Desktop] UI Refinement Icons (What I Do)

**Objetivo**

* Padronizar ícones dos cards com efeitos premium.

**Arquivos envolvidos**

* `src/components/about/WhatIDoCard.tsx`

**Ações**

1. Design: Redondo, fundo azul, ícone de seta.
2. Motion: Adicionar animação de movimento no hover.
3. Efeito: Adicionar `shadow-[0_0_20px_rgba(168,85,247,0.5)]` (glow roxo) no estado de hover.

**Critérios de aceite**

* [ ] Ícone segue o padrão visual global + glow roxo no hover.

---

### 🛠️ Prompt #10 — [Desktop] Tipografia About Metodo

**Objetivo**

* Aplicar fonte de destaque no título da seção.

**Arquivos envolvidos**

* `src/components/about/AboutMetodo.tsx`

**Ações**

1. Aplicar a classe `font-display` ao título “Criatividade com método...”.
2. Garantir que a regra se aplique tanto ao Mobile quanto ao Desktop.

**Critérios de aceite**

* [ ] Título usando a tipografia Display da identidade visual.

---

### 🛠️ Prompt #11 — [Portfolio] Grid Matemático Seamless

**Objetivo**

* Criar um grid de cards com altura fixa por linha e largura adaptável ("edge-to-edge").

**Arquivos envolvidos**

* `src/app/portfolio/page.tsx`
* `src/components/portfolio/PortfolioGrid.tsx`

**Ações**

1. Garantir que todos os cards em uma linha tenham `height` idêntico.
2. Usar `flex-grow` ou uma lógica de `grid-cols` que permita larguras diferentes (ex: card 1 = 60%, card 2 = 40%).
3. **Regra de Ouro:** A soma das larguras deve ser sempre 100%, alinhando perfeitamente com as margens (grid) da esquerda e direita da página, sem espaços entre os blocos.

**Critérios de aceite**

* [ ] Alinhamento lateral perfeito (zero gaps).
* [ ] Alturas uniformes por bloco de linha.

---

### 🛠️ Prompt #12 — [Portfolio] Alinhamento de Mídia

**Objetivo**

* Centralização absoluta de assets dentro dos cards.

**Arquivos envolvidos**

* `src/components/portfolio/ProjectCard.tsx`

**Ações**

1. Aplicar `object-cover` e `object-center` às imagens e vídeos.
2. Garantir que o container da mídia use `display: flex` com `items-center` e `justify-center`.

**Critérios de aceite**

* [ ] Mídias centralizadas independentemente da proporção horizontal do card.

---
