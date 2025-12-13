# AUDITORIA TÉCNICA — Home (portfoliodanilo.com)

Projeto auditado:
- Repositório: https://github.com/danilonovaisv/_danilonov_portfolio
- Site publicado: https://portfoliodanilo.com
- Referência visual (layout final): `docs/HOME-PORTFOLIO-LAYOUYT.jpg` (atenção: o nome citado no briefing é `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`)
- Referência mobile: `docs/HOME-HERO-MOBILE.jpg`
- Especificação técnica: `docs/PORT DAN REVISADO - NEXT.md` / `docs/PORT DAN REVISADO - NEXT.pdf`

Observação importante (limite desta auditoria):
- Foi possível validar a arquitetura, organização de pastas e a cadeia esperada de arquivos no repositório (componentes e assets 3D).
- A validação 100% “pixel perfect” do site publicado vs. o layout de referência depende de checagem visual ativa (devtools + breakpoints + inspeção de CSS no browser). Nesta auditoria, eu marco o que está “confirmado por estrutura” vs. o que está “a confirmar em runtime”.

---

## 1) Visão Geral

O repositório está bem organizado em camadas claras:
- `components/layout/*` (Header/Footer)
- `components/home/*` (seções da Home: Hero, Manifesto, PortfolioShowcase, FeaturedProjects, Clients, Contact)
- `components/three/*` (R3F: Canvas do Hero, modelo e wrapper do GLTF)
- `components/config/*` (conteúdo e navegação centralizados: `homepageContent.ts`, `navigation.ts`, `brand.ts`)
- `public/media/torus_dan.glb` (asset GLB do elemento 3D)

Ponto crítico de consistência com o briefing:
- O briefing menciona Next.js App Router em `src/app`, porém o projeto utiliza App Router em `/app` (raiz). Isso não impede funcionamento, mas conflita com a expectativa declarada e pode confundir manutenção/onboarding.

Ponto crítico de duplicidade:
- Existe `components/home/Hero.tsx` e também `components/sections/Hero.tsx`. Isso aumenta risco de “Hero errado” estar em uso, divergindo do layout final esperado e do fluxo Hero → 3D → GLB.

---

## 2) Diagnóstico por Dimensão

### 2.1 UI / Fidelidade visual (referência absoluta: imagem)
O layout de referência da Home (imagem) tem características bem específicas:
- Header fixo, minimalista
- Hero em duas colunas (desktop), tipografia “bold/clean”, CTA azul e elemento 3D à direita
- Thumb/preview do manifesto na região inferior direita do Hero, com microinteração e transição no scroll
- “Portfolio showcase” como seção editorial (stripes grandes com pontos azuis)
- “Featured Projects” em grid com cards grandes e um card CTA (“Like what you see? view projects”)
- Clients/Brands como faixa azul cheia com logos monocromáticos
- Contact em 2 colunas com formulário e ícones sociais
- Footer azul (atenção: no documento consta footer fixo; isso precisa ser confirmado se não está quebrando o mobile)

Status:
- Estrutura de seções existe no repositório (`components/home/*`), portanto a montagem geral está bem encaminhada.
- A fidelidade pixel-perfect (espaçamentos, proporções, sticky hero 200vh e transformação do manifesto thumb) precisa ser confirmada no runtime.

### 2.2 UX (navegação, leitura, fluxo)
Pontos positivos:
- Separação por seções facilita “scrollytelling”.
- Conteúdo base parece centralizado em `components/config/homepageContent.ts`, evitando strings espalhadas.

Riscos:
- Footer fixo pode sobrepor conteúdo do contato no mobile (muito comum).
- Hero com 200vh + sticky (como especificado) pode “travar” sensação se a animação do thumb/vídeo não estiver suave (principalmente iOS).

### 2.3 Animação (Framer Motion + scroll)
O documento exige:
- `whileInView`, `useInView`, microinterações `whileHover/whileTap`
- Animações apenas em `transform` e `opacity`
- `prefers-reduced-motion` respeitado (desativar rotação contínua 3D, parallax, morph do thumb)

Status por estrutura:
- Existe hook `components/hooks/usePrefersReducedMotion.ts` (ótimo sinal).
- Precisa confirmar se está sendo aplicado em: Hero title animation, rotação do 3D, parallax do mouse, e animação de scroll do manifesto thumb.

### 2.4 3D / R3F (vidro, transmissão, performance)
Caminho de integração (confirmado por estrutura de arquivos):
- `components/home/Hero.tsx` (ou `components/sections/Hero.tsx`) deve chamar `components/three/HeroGlassCanvas.tsx`
- `HeroGlassCanvas.tsx` renderiza o modelo (`TorusDan.tsx` / `Model.tsx`)
- Modelo GLB está em `public/media/torus_dan.glb` (caminho de loading em runtime deve ser `/media/torus_dan.glb`)

Riscos:
- `MeshTransmissionMaterial` é caro; sem tiering mobile pode derrubar FPS.
- Necessário garantir fallback para `prefers-reduced-motion` e para dispositivos low-end (reduzir `samples`/`resolution` ou trocar material).

### 2.5 Acessibilidade
Checklist mínimo:
- Headings em ordem (H1 no Hero, H2 nas seções)
- Links/CTAs com foco visível
- Thumb do manifesto: acessível via teclado + `aria-label`
- Vídeo: `playsInline`, `muted` e controle de play/pause acessível
- Respeito a motion-reduction (já citado)

Riscos:
- Se o manifesto thumb for um `<div>` clicável sem role/tabIndex: falha de acessibilidade.
- Se o CTA azul não tiver `focus-visible` e contraste adequado: falha AA.

### 2.6 Performance (Next + imagens + vídeo + WebGL)
Riscos típicos:
- Imagens Supabase: garantir `next.config.mjs` com `images.remotePatterns` para `aymuvxysygrwoicsjgxj.supabase.co` (senão `next/image` quebra ou cai para `<img>`).
- Vídeo manifesto remoto pesado: definir preload/estratégia (ex.: `preload="metadata"`) e poster.
- WebGL: limitar DPR e reduzir custo em mobile.

Sinal positivo:
- Hook `useIsMobile.ts` existe, então o tiering é viável.

### 2.7 Responsividade (mobile)
O layout esperado no mobile (referência) pede:
- Conteúdo empilhado
- Sem sobreposições indevidas (header + footer fixos)
- CTA e thumb com tamanhos e espaçamentos consistentes

Ponto crítico:
- Footer fixo (se realmente fixo como especificação sugere) exige `padding-bottom` global equivalente à altura do footer, ou a última seção ficará “cortada”.

---

## 3) Análise detalhada por seção (recomendado)

### Seção: Header (SiteHeader)
- Componente provável: `components/layout/Header.tsx`
- Fidelidade visual à imagem: a confirmar (estrutura existe)
- Requisitos chave do documento:
  - Fixo no topo
  - Condensa após scroll (>40px): `py-4` → `py-2`, `bg-white/95` + `backdrop-blur`
  - Links: home, sobre, portfolio showcase, contato
- Riscos:
  - Se a navegação estiver apontando para rotas/âncoras divergentes do documento (ex.: `#clients` vs `/sobre`), quebra a lógica esperada.

### Seção: Hero
- Componentes candidatos (atenção à duplicidade):
  - `components/home/Hero.tsx`
  - `components/sections/Hero.tsx`
- Integração 3D:
  - `components/three/HeroGlassCanvas.tsx`
  - `components/three/TorusDan.tsx`
  - GLB: `public/media/torus_dan.glb` (loading em `/media/torus_dan.glb`)
- Exigências do documento:
  - Altura ~200vh com bloco interno sticky
  - Título com animação de entrada “3D flip”
  - CTA `get to know me better !` → `/sobre`
  - Thumb manifesto → `#manifesto` + autoplay + animação no scroll (cresce até “virar” manifesto)
  - `prefers-reduced-motion` desativa rotação contínua/parallax/morph thumb
- Riscos de fidelidade:
  - Se o modelo estiver sendo carregado de outro path (ex.: `/public/models/torus_dan.glb`), haverá 404.
  - Se o Canvas não estiver corretamente “contido” no layout, pode haver overflow/corte do modelo (especialmente no mobile).
  - Se o `eventSource` do Canvas não estiver ajustado, parallax/raycast pode ficar errático no scroll (especialmente com smooth scroll).

### Seção: Manifesto (Vídeo)
- Componente: `components/home/Manifesto.tsx`
- Exigências:
  - Âncora `#manifesto`
  - Vídeo Supabase (autoplay, muted, playsInline)
- Riscos:
  - Autoplay com som (não permitido em vários browsers); precisa ser `muted`.
  - Sem placeholder/poster: “flash” e CLS.

### Seção: Portfolio Showcase
- Componente: `components/home/PortfolioShowcase.tsx`
- Exigências:
  - 3 stripes com labels
  - Pontos azuis e microtexto lateral
  - CTA `VEJA MAIS !` → `/portfolio`
  - CTA `let’s build something great !` → `/#contact`
- Riscos:
  - Se stripes não forem links reais (a/Link) + foco: acessibilidade.
  - Se o espaçamento e alinhamento não replicarem a referência: sensação “off” (essa seção depende muito de grid/typography).

### Seção: Featured Projects
- Componente: `components/home/FeaturedProjects.tsx`
- Exigências:
  - Grid responsivo 1/2/3 colunas
  - Hover nos cards (imagem scale, overlay, shadow)
  - Card CTA “view projects” → `/portfolio`
- Riscos:
  - Imagens externas (Supabase) sem otimização: LCP alto.
  - Falta de `priority`/estratégia de carregamento para o primeiro card.

### Seção: Clients / Brands
- Componente: `components/home/Clients.tsx`
- Exigências:
  - Faixa azul `#0057FF`
  - Logos monocromáticos claros
- Riscos:
  - SVGs externos podem falhar CORS/Content-Type em alguns contexts; validar fallback.
  - Se logos não tiverem `alt`: acessibilidade.

### Seção: Contact
- Componente: `components/home/Contact.tsx`
- Exigências:
  - Form action: `https://formsubmit.co/danilo@portfoliodanilo.com`
  - Links de contato e redes
- Riscos:
  - Campos sem `<label>` associado (a spec exige).
  - Sem estado de sucesso/erro: fricção de UX.
  - Se footer for fixo, pode cobrir o botão “Enviar Mensagem” no mobile.

### Seção: Footer
- Componente: `components/layout/Footer.tsx`
- Exigências:
  - Barra azul
  - Links e redes sociais
  - (Documento menciona fixo no bottom — confirmar se isso está em produção)
- Riscos:
  - Footer fixo sem `padding-bottom` global.
  - Inconsistência de copyright (documento cita 2023 em um local e 2025 em outro).

---

## 4) Lista de Problemas (por severidade)

### Alta severidade
1) Divergência de arquitetura declarada vs real:
- Expectativa: `src/app`
- Projeto: `/app` na raiz + `/src` usado para dataconnect
Impacto: onboarding confuso, automações/scripts/documentação podem divergir.

2) Duplicidade de Hero:
- `components/home/Hero.tsx` e `components/sections/Hero.tsx`
Impacto: risco real de o layout final estar sendo alterado no arquivo “errado”, e de a cadeia Hero → 3D → GLB ficar quebrada em uma das versões.

3) Risco de performance no Hero 3D (especialmente mobile):
- Material de transmissão pode custar muito; sem degradação FPS cai.
Impacto: travamentos e queda de UX na primeira dobra (pior lugar possível).

### Média severidade
4) Possível mismatch de path do GLB vs documentação:
- Doc menciona alternativas (`/media/abstract_element.glb` ou `/public/models/torus_dan.glb`)
- Repositório contém `public/media/torus_dan.glb` (loading correto deve ser `/media/torus_dan.glb`)
Impacto: 404 do modelo e quebra do hero.

5) Possível risco com imagens Supabase (Next Image):
- Necessário whitelisting no `next.config.mjs`
Impacto: imagens podem não otimizar ou quebrar em build.

6) Acessibilidade do manifesto thumb e stripes:
- Se forem “div clicável” sem teclado/aria, falha.
Impacto: navegação por teclado e leitores de tela.

### Baixa severidade
7) Inconsistência de nomenclatura do arquivo de referência:
- Briefing cita `HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg`
- Repo tem `HOME-PORTFOLIO-LAYOUYT.jpg`
Impacto: time usa a imagem errada como referência, gerando drift visual.

8) Inconsistência de copyright (2023 vs 2025):
Impacto: detalhe de acabamento, mas importante em portfólio.

---

## 5) Recomendações Prioritárias (ordem sugerida)

P0 (bloqueadores de fidelidade/arquitetura)
1) Resolver duplicidade do Hero:
- Definir fonte única (`components/home/Hero.tsx` OU `components/sections/Hero.tsx`) e fazer o app usar apenas uma.
- Garantir que o arquivo “ativo” é o que está alinhado ao layout referência.

2) Validar a cadeia de integração 3D ponta a ponta:
- Hero (ativo) → `components/three/HeroGlassCanvas.tsx` → `TorusDan.tsx`/`Model.tsx` → `/media/torus_dan.glb`

P1 (qualidade e consistência)
3) Implementar/confirmar tiering de performance no 3D:
- Usar `useIsMobile.ts` e `usePrefersReducedMotion.ts` para:
  - reduzir `samples/resolution` no mobile
  - desabilitar rotação/parallax no reduced motion

4) Confirmar comportamento sticky 200vh e transição do manifesto thumb:
- Ajustar para ficar “igual à referência” (o hero é o bloco mais sensível a drift).

P2 (acessibilidade e polimento)
5) Garantir acessibilidade mínima:
- Thumb manifesto: link/button real
- Stripes: links reais com foco e aria-label
- Form: labels e estados

6) Garantir que footer/header fixos não atrapalham mobile:
- Se fixos: padding compensatório no body/main.

---

## 6) Prompts técnicos de ajuste (prontos para colar no agente executor)

### Prompt 01 — Remover duplicidade e “fonte única” de Hero
Objetivo: eliminar risco de editar Hero errado e garantir fidelidade ao layout.

Tarefas:
- Identificar qual Hero está sendo importado na Home (provável `app/page.tsx`).
- Manter apenas uma implementação como “source of truth”.
- Atualizar imports e remover/arquivar a versão não usada.

Arquivos envolvidos:
- `app/page.tsx`
- `components/home/Hero.tsx`
- `components/sections/Hero.tsx`

Critério de aceite:
- Somente um Hero é usado na Home.
- Cadeia 3D continua funcionando (Canvas + GLB).

---

### Prompt 02 — Validar/normalizar caminho do GLB do Hero
Objetivo: garantir que o GLB sempre carregue.

Tarefas:
- Garantir que o path do loader é `/media/torus_dan.glb`
- Garantir que o arquivo existe em `public/media/torus_dan.glb` (já existe no repo)

Arquivos envolvidos:
- `components/three/TorusDan.tsx`
- `components/three/Model.tsx`
- `components/three/HeroGlassCanvas.tsx`

Critério de aceite:
- Sem 404 do GLB no network tab.
- Hero renderiza o modelo em produção.

---

### Prompt 03 — Tiering de performance do material de vidro (mobile + reduced motion)
Objetivo: manter estética no desktop e preservar FPS no mobile/low-end.

Tarefas:
- Usar `components/hooks/useIsMobile.ts` para reduzir qualidade:
  - Desktop: samples altos, resolution alta
  - Mobile: samples baixos, resolution menor
- Usar `components/hooks/usePrefersReducedMotion.ts` para:
  - desativar rotação contínua e parallax
  - manter estado estático + fade

Sugestão de padrão (exemplo de lógica):
```ts
const isMobile = useIsMobile()
const reduceMotion = usePrefersReducedMotion()

const transmissionProps = reduceMotion
  ? { transmission: 0.9, roughness: 0.15, thickness: 0.35, samples: 2, resolution: 256 }
  : isMobile
    ? { transmission: 1, roughness: 0.08, thickness: 0.45, samples: 4, resolution: 512 }
    : { transmission: 1, roughness: 0.05, thickness: 0.55, samples: 12, resolution: 1024 }

Arquivos envolvidos:

components/three/TorusDan.tsx (material)

components/three/HeroGlassCanvas.tsx (Canvas config)

components/hooks/useIsMobile.ts

components/hooks/usePrefersReducedMotion.ts

Critério de aceite:

Desktop mantém “glass premium”.

Mobile não degrada FPS drasticamente.

Reduced motion remove rotação/parallax.

Prompt 04 — Ajustes de Canvas (DPR + eventSource) para estabilidade no scroll
Objetivo: reduzir custo de GPU e evitar comportamento errático de mouse/parallax em scroll.

Tarefas:

Limitar DPR (ex.: dpr={[1, 1.5]})

Configurar eventSource corretamente (quando aplicável) para sincronizar eventos

Garantir Canvas com pointer-events conforme necessidade (se o 3D não precisa de clique, usar pointer-events-none)

Arquivos envolvidos:

components/three/HeroGlassCanvas.tsx

Critério de aceite:

Interação consistente em desktop.

Menor custo em telas retina.

Prompt 05 — Header “condensing on scroll” + acessibilidade de navegação
Objetivo: replicar comportamento do header da especificação.

Tarefas:

Confirmar que o Header:

é fixo

reduz padding após scroll

aplica bg-white/95 e backdrop-blur

Garantir foco visível e aria-label nos links

Garantir que rotas/âncoras batem com a especificação

Arquivos envolvidos:

components/layout/Header.tsx

components/config/navigation.ts

Critério de aceite:

Header replica o comportamento do layout de referência.

Navegação funciona por teclado.




Prompt 06 — Preloader para 3D/vídeo (evitar “branco inicial”)
Objetivo: evitar flash e melhorar percepção de performance.

Tarefas:

Implementar overlay de preloader usando useProgress do Drei para o GLB.

Remover overlay com transição suave quando progress === 100.

Arquivos envolvidos:

components/three/HeroGlassCanvas.tsx (ou wrapper da Home/Hero)

(Opcional) app/layout.tsx se quiser global

Critério de aceite:

Sem tela branca inicial perceptível em 3G/4G.

Transição suave.

Prompt 07 — Footer fixo sem quebrar mobile (se for requisito mantido)
Objetivo: manter footer fixo sem sobrepor conteúdo.

Tarefas:

Se footer for fixed bottom-0:

adicionar padding-bottom equivalente à altura do footer no container principal

Se não for obrigatório em produção:

alinhar comportamento com a referência final (imagem) e manter footer “normal”

Arquivos envolvidos:

components/layout/Footer.tsx

app/layout.tsx ou wrapper do main

Critério de aceite:

No mobile, o botão do formulário e o conteúdo final não ficam cobertos.

7) Reforço: a imagem é a referência final absoluta
Para fechar a auditoria com segurança:

Use docs/HOME-PORTFOLIO-LAYOUYT.jpg como “source of truth” visual.

Use docs/HOME-HERO-MOBILE.jpg para validar responsividade do Hero.

Sempre que houver divergência entre código e imagem, o ajuste deve buscar a imagem (sem mudar textos/ordem).

Checklist final de validação (rápido):

Desktop: 1440px, 1280px

Mobile: 390px (iPhone 12/13), 360px (Android comum)

Prefers reduced motion: ON

Network throttling: Fast 3G (para vídeo/GLB)

Como usar este arquivo:

Salve o conteúdo acima como um arquivo Markdown (ex.: docs/AUDITORIA_HOME.md).

Use como guia de revisão/execução.

Aplique os “Prompts técnicos de ajuste” no agente executor para corrigir os pontos priorizados, sempre comparando com:

docs/HOME-PORTFOLIO-LAYOUYT.jpg

docs/HOME-HERO-MOBILE.jpg
