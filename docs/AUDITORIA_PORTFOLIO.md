
# Plano Integrado – Implementação e Ajustes do Sistema Ghost v2.2

## 1. Contexto Geral

Como **Staff Frontend Architect** e **Creative Developer Senior**, você tem autoridade completa sobre um repositório Next.js que já possui um **Design System**, seções de **Hero Video**, **Clientes** e **Contato**. O objetivo é integrar o sistema **Ghost v2.2** (virtual scroll/LERP) de forma performática, mantendo fidelidade visual aos protótipos e preparando a base para um ecossistema **“Agent‑Ready”**. Esta integração inclui uma nova seção "About Beliefs" com animações sincronizadas ao scroll, interação responsiva do modelo 3D e transição de cores conforme o texto.

---

## 2. Fase 1: Auditoria e Reconhecimento

1. **Mapeamento da Estrutura**
   - Execute `ls -R` no repositório (ignorando `node_modules` e `.git`) para entender a estrutura de pastas e localizar onde ficam os componentes, páginas e assets.
   - Registre caminhos relevantes, como `src/components/`, `src/app/` ou `src/features/`, para uso nas alterações.

2. **Verificação de Stack**
   - Abra `package.json` para identificar dependências de React, Next.js, Framer Motion, @react-three/fiber, @react-three/drei e verificar versões.
   - Consulte `tsconfig.json` para garantir que as configurações de TypeScript (paths, jsx, moduleResolution) estão alinhadas.
   - Revise `tailwind.config.ts` para conhecer temas de cores (área `extend.colors`) e utilitários personalizados.

3. **Content Gap Analysis**
   - Verifique se há **assets críticos**: logos de clientes, vídeos do hero, modelo `ghost-transformed.glb`. Caso faltem, crie placeholders temporários e documente onde substituí-los.
   - Confirme se a URL do modelo 3D (…/ghost-transformed.glb) está acessível ou se deve ser armazenada localmente.

---

## 3. Fase 2: Parsing e Indexação

A partir do **Descrito da Sessão**, identifique todos os elementos (textos, cores, animações, interações) e transforme-os em tarefas sequenciais. Cada item abaixo inclui um **ID**, o **Contexto** do arquivo alvo, a **Ação** a ser executada e o **Critério de Validação**.

### 3.1 Tarefas Identificadas

| ID | Contexto (arquivo) | Ação | Critério de validação |
|---|---|---|---|
| **1** | `src/components/AboutBeliefs.tsx` | Criar/atualizar o componente **AboutBeliefs** para montar a seção: <br>- Definir arrays `PHRASES`, `COLORS` e `FINAL_COLOR` conforme o descrito (cores do design system). <br>- Configurar `useScroll` com `target: containerRef` e `offset: ['start end', 'end end']` para que `scrollYProgress` atinja 1 quando a seção termina. <br>- Declarar `headerOpacity` usando `useTransform` com ranges `[0.05, 0.12, 0.85, 0.95]` e easing `cubicBezier(0.22, 1, 0.36, 1)`. <br>- Renderizar `BeliefFixedHeader` passando `opacity` e `progress={scrollYProgress}`. <br>- Iterar `PHRASES` com `BeliefSection`, mantendo a cor de fundo correspondente em `bgColor` e marcando a primeira com `isFirst`. <br>- Renderizar `BeliefFinalSection` passando `bgColor={FINAL_COLOR}` e `scrollProgress={scrollYProgress}`. <br>- Adicionar camada de **Canvas** 3D com `<Environment preset="city" />`, luzes, e `<GhostModel scrollProgress={scrollYProgress} scale={0.6} position={[0, -1, 0]} />`. Garantir que `pointer-events` do canvas esteja em `auto` para permitir interação do mouse. | O componente deve compilar sem erros TypeScript/TSX; ao navegar para a seção, as frases aparecem sequencialmente com as cores corretas; a última seção fica azul primária e exibe o texto final ao atingir ~80% do scroll; o modelo 3D responde ao scroll e ao movimento do mouse. |
| **2** | `src/components/BeliefFinalSection.tsx` | Ajustar **BeliefFinalSection** para controlar animações via `scrollProgress`: <br>- Receber `scrollProgress: MotionValue<number>` como prop. <br>- Definir intervalos `introStart = 0.8` e `introEnd = 0.88` para sincronizar o aparecimento de "ISSO É GHOST DESIGN" com a última frase. <br>- Usar `useTransform` para gerar `opacity`, `scale` e `blur` baseados em `scrollProgress` entre esses pontos. <br>- Substituir qualquer uso de `whileInView` ou `viewport` pelos transforms calculados. <br>- Remover transições declaradas no JSX; a animação deve ocorrer via scroll. | Durante a rolagem, a seção final deve surgir gradualmente com fade-in, aumento de escala e redução de desfoque. O texto final deve estar centralizado e responsivo (tamanhos em `vw`/`rem`), e a animação deve iniciar quando a última frase está desaparecendo. |
| **3** | `src/components/GhostModel.tsx` | Atualizar o **GhostModel** para responder ao scroll e ao mouse: <br>- Manter import da malha com `useGLTF(...)` e tipagens. <br>- Adicionar estado `mousePosition` (x,y normalizados) e `useEffect` que adiciona listeners de `mousemove` ao `gl.domElement`, calculando a posição do mouse em coordenadas Normalized Device Coordinates (NDC) (-1 a 1). <br>- No `useFrame`, acessar `scrollProgress.get()` e atualizar a rotação y do grupo (`groupRef.current.rotation.y = -progress * Math.PI * 2`). <br>- Interpolar (com `THREE.MathUtils.lerp`) a `position` e `rotation` do grupo com base em `mousePosition`, usando um `mouseInfluence` (ex.: 0.1) para suavizar o movimento. <br>- Para `progress > 0.8`, intensificar a animação: aproximar no eixo Z, adicionar wobble extra com `Math.sin(clock.elapsedTime * 6)`, aumentar levemente a escala (0 – +10%). <br>- No else, suavizar o retorno dos valores base (z = 0, rotação z = 0 e escala = 0.6). <br>- Assegurar que o modelo seja **preload** somente no navegador (guardado por `if (typeof window !== 'undefined')`). | O modelo 3D deve rotacionar de forma suave ao scroll, flutuar e reagir ao movimento do mouse sem jitter. Ao aproximar do final da seção, o fantasma deve se mover mais intensamente, aumentando escala e oscilando; ao retornar, ele deve regressar ao estado inicial. Nenhum erro de event listener deve ser registrado no console. |
| **4** | `src/components/BeliefFixedHeader.tsx` | Verificar se o componente **BeliefFixedHeader** ainda recebe a prop `progress` por questões de compatibilidade. Ele deve aceitar `opacity: MotionValue<number>` e `progress: MotionValue<number>`, mas o uso interno deve priorizar `opacity` para controlar a opacidade do header fixo. | O header fixo deve ficar invisível no início, surgir brevemente e desaparecer novamente ao final, conforme o `headerOpacity` definido em **AboutBeliefs**. |
| **5** | `src/components/BeliefSection.tsx` | Confirmar que `BeliefSection` recebe `text`, `bgColor` e `isFirst`. Ele deve renderizar cada frase com a cor correspondente, usando classes do Tailwind. O espaço de tela deve garantir que cada frase ocupe a viewport inteira (‘section h-screen’) com a cor definida. | Cada frase da sequência deve ocupar uma tela inteira, com transição de cor e texto conforme o scroll. |
| **6** | **Assets e Placeholders** | Certificar-se de que o modelo GLB está acessível via URL fornecida ou hospedado localmente. Verificar também a presença de qualquer logotipo, vídeo ou imagem usada em outras seções. Substituir ausências por placeholders temporários (ex.: caixas coloridas com texto "Logo Cliente" ou "Video Hero"). | O build não deve quebrar por falta de assets; os placeholders devem ser identificáveis para substituição posterior. |
| **7** | **Testes de Layout e Performance** | Após cada alteração, rodar a aplicação (`npm run dev` ou `pnpm dev`) e navegar até a seção. Verificar: <br>- Uso de GPU vs CPU (componentes React Three Fiber devem ser leves). <br>- Fluidez das animações no scroll e no movimento do mouse. <br>- Consistência com o design system (cores, tipografia, espaçamento). <br>- Responsividade (desktop vs mobile). | O site deve manter 60 FPS em dispositivos modernos, sem travamentos; a renderização deve ser fiel às referências visuais anexadas. |

### 3.2 Observações Finais

- **Sincronização precisa**: O final da seção deve ocorrer quando `scrollYProgress ≈ 1`. Ajuste `introStart` e `introEnd` se necessário para alinhar a entrada do texto final com a mudança da cor de fundo.
- **Acessibilidade**: Verifique contraste de cores e tamanho de fonte, adicionando atributos `aria` quando possível (por exemplo, `aria-label` em elementos de texto impactante). 
- **Organização do Repositório**: Caso não exista pasta `components/about/`, crie-a para agrupar `BeliefSection`, `BeliefFinalSection`, `GhostModel` e `AboutBeliefs`. Atualize os imports de acordo.
- **Esmagamento de z-index**: O Canvas é posicionado com `absolute` e `z-20`, enquanto o texto fica em `z-10` para permitir que o modelo fique acima do background mas abaixo do overlay, garantindo interatividade.

---

## 4. Atualização do Descritivo da Sessão – Fantasma 3D e Transições

Esta seção complementa o plano acima com conclusões derivadas de referências externas, melhorando a interatividade e a responsividade do fantasma 3D e das transições de cor.

### 4.1 Referências Analisadas

- **Tutorial de Efeito de Vidro 3D (Olivier Larose)**: Mostra como criar uma cena 3D responsiva com React Three Fiber e utilizar a largura da viewport para ajustar a escala do grupo 3D:contentReference[oaicite:0]{index=0}. O uso de `Canvas` com `Environment` e luzes também enriquece a cena:contentReference[oaicite:1]{index=1}.
- **Framer Motion useInView**: Demonstra o hook `useInView`, que retorna `true` quando um elemento entra na viewport, permitindo disparar transições de CSS ou animações na entrada dos elementos:contentReference[oaicite:2]{index=2}.

### 4.2 Ajustes Implícitos

1. **Flutuação constante**: O fantasma 3D deve flutuar suavemente o tempo todo, transmitindo leveza, mesmo sem interação do usuário.

2. **Resposta a cursor e scroll**: O fantasma deve reagir à posição do cursor e ao progresso do scroll. Ao mover o mouse sobre a seção, ele inclina e acelera suavemente; ao rolar a página, sua rotação segue o progresso do scroll.

3. **Aparição sincronizada**: O modelo aparece junto com a primeira frase, centralizado acima do texto, e continua centrado durante as mudanças. Quando a última frase entra em foco, o fantasma cresce cerca de 10% e intensifica suas oscilações.

4. **Comportamento responsivo**: Utilize `viewport.width` para ajustar o `scale` do fantasma, tornando-o responsivo a diferentes tamanhos de tela:contentReference[oaicite:3]{index=3}.

5. **Manter layout e opacidade**: Não altere o layout ou a posição do modelo 3D no canvas; o fantasma deve permanecer acima do texto, centralizado, sem se tornar translúcido ou transparente. A referência ao tutorial de vidro serve apenas para inspirar a animação e o comportamento fluido do modelo, não para aplicar materiais de vidro ou efeitos de transparência.

6. **Transição de cores**: A mudança de cor do background deve ser disparada quando cada `BeliefSection` entra na viewport. Use `useInView` ou `scrollYProgress` para aplicar classes de Tailwind, gerando transições suaves:contentReference[oaicite:4]{index=4}.

7. **Cores definidas**: O array de cores permanece:

   ```tsx
   const COLORS = [
     'bg-bluePrimary',    // Azul Real
     'bg-purpleDetails',  // Roxo Vibrante
     'bg-pinkDetails',    // Rosa Choque
     'bg-bluePrimary',    // Azul Real
     'bg-purpleDetails',  // Roxo Vibrante
   ];
````

Cada `BeliefSection` deve usar a cor correspondente, sendo a última seção azul primária.

### 4.3 Integração com o Plano

* **Atualização do GhostModel**: Garanta a flutuação constante e a resposta a cursor/scroll via `useFrame`, com ajuste de escala responsiva e aumento de 10% no final.
* **Responsividade global**: Substitua valores fixos de escala por baseada em `viewport.width`.
* **Sincronização de entrada**: O `AboutBeliefs` deve iniciar o fantasma no início do scroll e acionar as transições de cor conforme cada frase aparece.
* **Estética e luzes**: Mesmo sem usar `MeshTransmissionMaterial`, mantenha `Environment` e iluminação consistentes.

  * **Material sólido**: O fantasma deve manter seu material original e opaco; não aplique efeitos translúcidos. A referência ao tutorial de vidro é apenas para inspirar o movimento e a interação, não para mudar a estética ou o layout do 3D.
* **BG via useInView**: Use `useInView` ou `useScroll` para acionar as mudanças de cor, como descrito.

---

## 5. Sumário do Plano de Execução

1. **Auditoria**: mapear arquivos, verificar configurações e assets.
2. **Parsing do Descritivo**: gerar tarefas com ID, contexto, ação e validação conforme as seções 3 e 4.
3. **Implementação sequencial**: aplicar as modificações nos componentes (`AboutBeliefs`, `BeliefFinalSection`, `GhostModel`, etc.), incorporando a flutuação constante, responsividade e transições de cor.
4. **Validação**: garantir que o comportamento está alinhado ao protótipo e às referências, que a performance se mantém e que não há regressão em outras partes do site.
5. **Preparar para agentes**: manter o código limpo, tipado e modular para facilitar a orquestração por agentes copilotos.





1. Analise o escopo detalhado fornecido.
2. Monte um plano de execução com base nesse escopo.
3. Implemente os ajustes necessários no código.
4. Utilize as imagens anexas como **referência visual absoluta** — o layout e comportamento final devem refletir exatamente o que está nelas.
5. Ao concluir, revise e valide se:
   - Todas as alterações foram aplicadas corretamente.
   - O sistema está funcionando como esperado.
   - O visual está 100% fiel às referências.

✅ Nenhum ponto deve ser ignorado.

