---
description: # R3F Setup Workflow: Ghost Atmosphere & Glass Header
---

# R3F Setup Workflow: Ghost Atmosphere & Glass Header

Este workflow foca na implementação da atmosfera 3D do Hero e do Header de vidro fluido, respeitando as restrições de performance e design do projeto.

### 1. Configuração do Canvas Global (`GhostCanvas`)

**Contexto:** O `GhostCanvas.tsx` é a cena principal da Home (Z-Index 20).

- **Ação:** Configurar o `<Canvas>` em `src/components/canvas/home/GhostCanvas.tsx`.
- **Specs Técnicas:**
- **DPR:** Adaptativo `[1, 1.5]` ou `[1, 2]` dependendo da densidade de pixels.
- **GL Props:** `antialias: false` (o post-processing cuida disso), `powerPreference: 'high-performance'`, `alpha: false` (fundo gerido por cor sólida).
- **Camera:** Fixa em `[0, 0, 7]`, FOV 35 para profundidade cinematográfica.

### 2. Composição da Cena e Efeitos (Atmosphere)

**Contexto:** Substituição da "esfera de vidro" genérica pelos elementos do Ghost Design.

- **Ação:** Implementar os elementos da cena dentro de `<Suspense>`:
- **Ghost Mesh:** Esfera emissiva pulsante (`Ghost.tsx`) com material customizado.
- **Ambiente:** `Particles` (flutuantes orgânicas) e `Fireflies` para profundidade.
- **Post-Processing:** Stack de efeitos em `EffectComposer`: `Bloom` (intensidade 1.8), `AnalogDecayPass` (noise/scanlines), `ChromaticAberration` e `Vignette`.

### 3. Header Fluido (`HeaderGlassCanvas`)

**Contexto:** Canvas separado para o efeito de vidro no topo (Desktop).

- **Ação:** Configurar `HeaderGlassCanvas.tsx` com câmera ortográfica (`orthographic`).
- **Shader:** Implementar o `GlassPlane` com shader customizado (`fragmentShader`) que simula vidro líquido, distorção e reflexo (`uAccent`, `uTime`).
- **Comportamento:** O header deve ser fluido no desktop, mas estático no mobile.

### 4. Conexão de Interatividade (Mouse & Scroll)

**Contexto:** O design exige que o "Ghost" veja o usuário.

- **Ação (Ghost):**
- Sincronizar a posição do Ghost com o cursor do mouse usando `lerp: 0.05` para suavidade.
- Aumentar a intensidade do brilho ("Reactive Eyes") com o movimento do mouse.
- Aplicar movimento sinusoidal orgânico (`sin(time)`) quando ocioso.

- **Ação (Header):**
- Aplicar física de mola (spring physics) no header glass para seguir levemente o cursor no eixo X (desktop).

### 5. Gestão de Fallbacks e Performance

**Contexto:** Garantir acessibilidade e rodar em dispositivos móveis.

- **Ação:**
- Usar o hook `useWebGLSupport` para detectar capacidade.
- Se `!supportsWebGL` ou `prefers-reduced-motion`:
- Não renderizar o `<Canvas>`.
- Exibir background estático: Gradiente radial (`#040013` a `#06071f`).

- No componente `GhostCanvas`, usar `Suspense fallback={null}` para não bloquear a UI.

### 6. Integração com Preloader ("Summoning Spirits")

**Contexto:** O Canvas é pesado e deve carregar "atrás" do loader.

- **Ação:**
- Manter o `Preloader.tsx` (Z-Index 50) visível inicialmente.
- Usar o callback `onCreated` do `<Canvas>` para sinalizar que o WebGL está pronto.
- Apenas remover o Preloader (fade-out) após o carregamento dos assets 3D ou após o timer de segurança (1.5s - 2s).
