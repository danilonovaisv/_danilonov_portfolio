
# Auditoria & Prompts de Sessão — Home do Portfólio (Next.js + R3F + Tailwind + Framer Motion)

## 0. Como usar este documento

- Este arquivo é um _prompt de sistema_ para um agente de IA que corrige e evolui a **Home do portfólio**.
- O fluxo recomendado é **trabalhar por sessão**, escolhendo um dos prompts de sessão abaixo (Prompt 1, 2, 3…) e colando apenas a seção daquela sessão no chat do agente, junto com os arquivos relevantes do projeto.
- Cada sessão é **focada**, com:
  - Objetivo principal
  - Contexto técnico
  - Checklist de saída
  - Arquivos-alvo / áreas do código

---

## 1. Contexto do projeto (resumo consolidado)

A Home atual está próxima do layout esperado: hierarquia de seções, grid de Featured Projects, faixa de marcas e seção de contato coerentes. [oai_citation:0‡ajustes-11.12.md](sediment://file_000000006a5c71f58012d87a0e5d0432)  

Os principais problemas se concentram em:

- **Hero**  
  - Fidelidade do bloco principal (heading, subtítulo com _pill_, CTA).
  - Integração do 3D (_orb_ de vidro) com o layout e com o scroll.
  - Transição da **thumb de vídeo na Hero → seção Manifesto** via scroll.
- **Animações & Motion**
  - Uso consistente de Framer Motion para reveals por scroll.
  - Respeito a `prefers-reduced-motion`. [oai_citation:1‡ajustes-11.12.md](sediment://file_000000006a5c71f58012d87a0e5d0432)
- **Acessibilidade**
  - `alt` em imagens.
  - Vídeos com `playsInline`, `muted`, `loop`, `aria-label` claros. [oai_citation:2‡ajustes-11.12.md](sediment://file_000000006a5c71f58012d87a0e5d0432)
- **Performance**
  - GLB 3D com tiering (DPR, samples) e pattern “distorted glass” baseado em MeshTransmissionMaterial + Environment.
  - Imagens remotas da Supabase configuradas em `next/image` via `remotePatterns`.
- **Arquitetura**
  - Separar cena 3D e materiais em `components/hero3d/…`.
  - Canvas isolado e preparado para App Router (Client Components apenas onde necessário).

Estrutura de pastas alvo para a Home: [oai_citation:3‡ajustes-11.12.md](sediment://file_000000006a5c71f58012d87a0e5d0432)

```txt
src/
  app/
    page.tsx
    layout.tsx
  components/
    layout/SiteHeader.tsx
    hero/Hero.tsx
    hero/HeroThumbToManifesto.tsx
    hero3d/HeroGlassCanvas.tsx
    hero3d/TorusDan.tsx
  hooks/
    usePrefersReducedMotion.ts
public/
  media/torus_dan.glb


⸻

2. Diagnóstico consolidado

2.1 Severidade (resumida)
    •    Alta
    •    Hero não é sticky em 200vh com transição da thumb → Manifesto.
    •    Integração 3D sem tiering de performance (DPR alto / samples excessivos / sem fallback motion-reduced).
    •    Imagens Supabase sem remotePatterns de next/image.
    •    Média
    •    Subtítulo da Hero sem pill translúcido.
    •    Header possivelmente sem condensação/backdrop-blur em scroll; foco/ARIA da navegação a revisar.
    •    Faltam alt e opções adequadas em vídeos (playsInline, muted, loop).
    •    Baixa
    •    Microinterações (hover nas stripes, pontos azuis, sombra de cards, loop de seta em CTA).
    •    Uniformização de tokens (#0057FF, tipografia, tamanhos).

2.2 Recomendações prioritárias (resumo) ￼
    1.    Hero sticky + transição de vídeo
    •    Implementar Hero com 200vh, bloco interno sticky.
    •    Animação da thumb de vídeo → Manifesto com Framer Motion (useScroll, useTransform), respeitando prefers-reduced-motion.
    2.    Orb de vidro 3D
    •    Consolidar o “orb” com MeshTransmissionMaterial + Environment e pipeline GLB via gltfjsx (controle fino de materiais).
    3.    Tiering de performance
    •    dpr={[1, 1.5]}.
    •    Reduzir samples/resolution em mobile.
    •    Fallback para material físico mais simples se prefers-reduced-motion ativo.
    4.    Imagens remotas (Supabase)
    •    Configurar next/image com remotePatterns.
    •    Substituir <img> por <Image> quando possível.
    5.    Acessibilidade
    •    alt em todas as imagens.
    •    Vídeos com playsInline, muted, loop e aria-label/title adequado.
    •    Navegação com foco visível (header/footer/clients).
    6.    Header sticky
    •    Condensar padding após ~40px de scroll, com backdrop-blur.
    •    Estado ativo / underline animado por rota/âncora.
    7.    Ajustes visuais
    •    Subtítulo da Hero em pill translúcido.
    •    Hovers nos stripes de “portfolio showcase”.
    •    Loop sutil no ícone seta do CTA.

⸻

3. Regras globais para o agente (todas as sessões)

Quando qualquer sessão deste documento for usada como prompt:
    1.    Stack & Arquitetura
    •    Next.js App Router.
    •    React + TypeScript (não usar any; preferir tipos gerados pelo gltfjsx para GLB). ￼
    •    Tailwind CSS para layout/responsividade.
    •    Framer Motion para animações.
    •    React Three Fiber + Drei para 3D.
    2.    Código
    •    Não usar any (exceto se explicitamente instruído a manter código legado ao descrever problema).
    •    Componentes 3D em components/hero3d/* como Client Components.
    •    hooks/* sempre como Client ('use client' no topo quando necessário).
    3.    UX / UI
    •    Fidelidade visual à referência HOME-PORTFOLIO-LAYOUYT_ESPERADO.jpg. ￼
    •    Garantir que a narrativa Hero → Manifesto funcione fluida e legível.
    4.    Acessibilidade
    •    aria-label em links ícones / botões sem texto.
    •    Foco visível em navegação e CTAs.
    •    Respeitar prefers-reduced-motion via hook dedicado.
    5.    Performance
    •    Usar Suspense para GLB, com fallback leve (null ou skeleton).
    •    DPR controlado por dpr={[1, 1.5]}.
    •    Props de MeshTransmissionMaterial balanceadas para não explodir custo em mobile.

⸻

4. Prompts por sessão (para colar no agente)

Instrução: para usar, copie apenas uma sessão por vez (Prompt 1, 2, 3…) junto com os arquivos relevantes do repo.

⸻

Prompt 1 — Next/Image + Supabase (remotePatterns)

Objetivo da sessão
    •    Configurar corretamente next/image para servir todas as imagens remotas vindas da Supabase, usando remotePatterns.

Contexto técnico
    •    Host Supabase utilizado atualmente:
    •    aymuvxysygrwoicsjgxj.supabase.co.

Instruções para o agente
    1.    Abrir e revisar next.config.js.
    2.    Garantir que:
    •    images.remotePatterns inclui o host Supabase correto.
    •    Tipagem do config usa JSDoc ou NextConfig comentado para ajudar o TS. ￼
    3.    Revisar componentes que usam imagens na Home (Hero, Portfolio, Clients, etc.) e:
    •    Substituir <img> por <Image> de next/image, preservando alt, sizes e fill/width/height adequados.
    4.    Verificar que imagens do bucket Supabase usado para thumbs/vídeos/clients funcionam sem warnings na build.

Checklist de saída
    •    next.config.js com remotePatterns corretos para o domínio Supabase.
    •    Todas as imagens da Home usando next/image.
    •    alt informativo para cada imagem.

Arquivos-alvo
    •    next.config.js
    •    src/components/hero/*
    •    src/components/portfolio/*
    •    src/components/clients/*

⸻

Prompt 2 — Hook usePrefersReducedMotion

Objetivo da sessão
    •    Implementar um hook usePrefersReducedMotion robusto (SSR-safe, tipado, sem any) e aplicá-lo nas animações relevantes.

Contexto técnico
    •    O hook já aparece no documento com um esboço de implementação, mas precisa:
    •    De proteção para SSR (typeof window === 'undefined').
    •    De tipagem explícita boolean.
    •    De uso consistente em cena 3D, Hero e animações de scroll.

Instruções para o agente
    1.    Criar ou revisar src/hooks/usePrefersReducedMotion.ts com:
    •    'use client';
    •    export function usePrefersReducedMotion(): boolean;
    •    useEffect que usa window.matchMedia('(prefers-reduced-motion: reduce)'), com fallback seguro. ￼
    2.    Usar esse hook:
    •    Na cena 3D (TorusDan) para desativar rotações/parallax quando reduced === true. ￼
    •    Na Hero e/ou animações de scroll para oferecer versão com menos movimento (ex: sem deslocamento de vídeo).

Checklist de saída
    •    Hook tipado, sem any, SSR-safe.
    •    Chamada do hook nos pontos críticos (3D, Hero, thumb→Manifesto).
    •    Quando prefers-reduced-motion, a página continua legível, sem animações exageradas.

Arquivos-alvo
    •    src/hooks/usePrefersReducedMotion.ts
    •    src/components/hero3d/TorusDan.tsx
    •    src/components/hero/Hero.tsx
    •    src/components/hero/HeroThumbToManifesto.tsx

⸻

Prompt 3 — Canvas 3D da Hero (HeroGlassCanvas)

Objetivo da sessão
    •    Isolar o Canvas 3D da Hero em um componente dedicado, seguindo boas práticas de R3F/Drei e configurando DPR/câmera/eventSource corretamente.

Contexto técnico
    •    A cena 3D deve:
    •    Usar Canvas em Client Component.
    •    Rodar um GLB “orb” com material de vidro (MeshTransmissionMaterial).
    •    Aplicar Environment com preset (ex.: city).
    •    Usar Suspense para carregamento com fallback.

Instruções para o agente
    1.    Estruturar HeroGlassCanvas em src/components/hero3d/HeroGlassCanvas.tsx:
    •    'use client';
    •    Componente memoizado (memo) que rende o Canvas.
    •    Subcomponente HeroGlassScene com:
    •    <Suspense fallback={null}>
    •    <TorusDan />
    •    <Environment preset="city" background={false} blur={1} />
    •    ambientLight e directionalLight leves.
    •    Canvas com:
    •    dpr={[1, 1.5]}
    •    camera={{ fov: 40, position: [0, 0, 6] }}
    •    eventSource={typeof document !== 'undefined' ? document.body : undefined}.
    2.    Garantir que o Canvas se posiciona corretamente na Hero:
    •    Geralmente como background absoluto (absolute inset-0 -z-10 pointer-events-none).

Checklist de saída
    •    HeroGlassCanvas isolado, usando R3F/Drei e Suspense corretamente.
    •    DPR configurado com tiering.
    •    Cena 3D acende de forma previsível e suave.

Arquivos-alvo
    •    src/components/hero3d/HeroGlassCanvas.tsx
    •    src/components/hero3d/TorusDan.tsx (em leitura, para integração)

⸻

Prompt 4 — Modelo GLB + “distorted glass” (TorusDan)

Objetivo da sessão
    •    Implementar o modelo TorusDan carregando o GLB via useGLTF, tipado, com material de vidro configurado e animação de rotação/parallax que respeita reduced motion.

Contexto técnico
    •    GLB está em public/media/torus_dan.glb. ￼
    •    Queremos pattern de “distorted glass”:
    •    MeshTransmissionMaterial com props como thickness, ior, chromaticAberration, distortion, samples, resolution.
    •    Tiering:
    •    Menos samples/resolution em mobile; mais em desktop.

Instruções para o agente
    1.    Gerar tipos para o GLB via gltfjsx (idealmente com --types) e tipar o retorno de useGLTF, evitando as any.
    2.    Implementar o componente:
    •    type Props = GroupProps & { rotationScroll?: number }.
    •    Carregar nodes com useGLTF('/media/torus_dan.glb').
    •    useRef<THREE.Mesh>(null!) para mesh principal.
    •    usePrefersReducedMotion() para controlar animação.
    •    useFrame para:
    •    Rodar o torus em Y com MathUtils.damp.
    •    Oscilar levemente X.
    •    Desativar rotação se reduced === true.
    •    useMemo para props do MeshTransmissionMaterial, parametrizando samples/resolution em função de isMobile e reduced.
    •    useGLTF.preload('/media/torus_dan.glb'); no final.
    3.    Expor o componente como default e integrá-lo à cena 3D via HeroGlassCanvas.

Checklist de saída
    •    TorusDan tipado, sem any.
    •    Material de vidro configurado conforme padrão “distorted glass”.
    •    Animação suave, desativada em reduced motion.
    •    Preload do GLB configurado.

Arquivos-alvo
    •    src/components/hero3d/TorusDan.tsx
    •    Arquivo de tipos gerados por gltfjsx (separado ou inline)

⸻

Prompt 5 — Thumb de vídeo → Manifesto (HeroThumbToManifesto)

Objetivo da sessão
    •    Implementar animação de scroll que:
    •    Começa com uma thumb pequena de vídeo na Hero.
    •    Faz o vídeo crescer e se deslocar até ocupar a seção Manifesto.

Contexto técnico
    •    A versão atual usa useScroll + useTransform com transformações em scale, x, y e borderRadius. ￼
    •    URL de vídeo hospedado na Supabase já está definida no documento. ￼

Instruções para o agente
    1.    Em HeroThumbToManifesto:
    •    'use client';
    •    useRef<HTMLDivElement> + useScroll com target: ref e offset: ['start end', 'end start'].
    •    useTransform para:
    •    scale (ex: [1, 3.2]).
    •    x (ex: '0vw' → '-12vw').
    •    y (ex: '0vh' → '-18vh').
    •    borderRadius (ex: 16px → 0px para efeito full bleed). ￼
    2.    Garantir acessibilidade:
    •    autoPlay, muted, loop, playsInline.
    •    aria-label="Vídeo manifesto" (ou similar).
    3.    Integrar com Manifesto:
    •    Garantir que a posição final do vídeo coincide visualmente com a seção Manifesto (ver layout ou IDs da seção).
    4.    Adicionar respeito a prefers-reduced-motion (via usePrefersReducedMotion):
    •    Se reduced === true, usar versão sem deslocamentos / transformações, apenas um vídeo estático.

Checklist de saída
    •    Animação de thumb → Manifesto funcionando na rolagem.
    •    Fallback amigável para reduced motion.
    •    Vídeo acessível e com boas práticas de reprodução.

Arquivos-alvo
    •    src/components/hero/HeroThumbToManifesto.tsx
    •    src/components/manifesto/ManifestoSection.tsx (para integração visual)

⸻

Prompt 6 — Hero sticky 200vh + integração com Canvas 3D

Objetivo da sessão
    •    Transformar a Hero em um bloco com 200vh, conteúdo sticky, Canvas 3D desacoplado e animações de entrada do heading.

Contexto técnico
    •    Hero alvo:
    •    <section id="hero" className="relative bg-[#F4F5F7] h-[200vh]">
    •    Wrapper sticky: <div className="sticky top-0 min-h-screen overflow-hidden">
    •    Canvas 3D como background.
    •    Bloco textual com H1, tag [BRAND AWARENESS], subtítulo em pill, CTA principal e link “get to know me better → /sobre”.

Instruções para o agente
    1.    Em Hero.tsx:
    •    Montar estrutura sticky 200vh.
    •    Incluir HeroGlassCanvas como background (absoluto).
    •    Usar motion.h1 com animação de entrada (ex.: initial={{ y: 24, opacity: 0 }} → animate={{ y: 0, opacity: 1 }}). ￼
    •    Garantir que o subtítulo esteja em um pill translúcido (bg semitransparente + borda arredondada), conforme diagnóstico.
    2.    Conectar CTA:
    •    Link href="/sobre" para “get to know me better →”.
    3.    Integrar HeroThumbToManifesto no canto inferir direito do bloco.
    4.    Usar usePrefersReducedMotion (opcional) para:
    •    Ajustar animação do heading em reduced motion (ex.: fade simples).

Checklist de saída
    •    Hero com 200vh e bloco interno sticky.
    •    Heading animado com Framer Motion.
    •    Subtítulo em pill translúcido.
    •    CTA funcionando /sobre.
    •    Thumb do vídeo conectada com scroll → Manifesto.

Arquivos-alvo
    •    src/components/hero/Hero.tsx
    •    src/components/hero/HeroGlassCanvas.tsx
    •    src/components/hero/HeroThumbToManifesto.tsx

⸻

Prompt 7 — Header sticky com condensação + blur

Objetivo da sessão
    •    Implementar header sticky que:
    •    Reduz padding após ~40px de scroll.
    •    Aplica backdrop-blur e sombra sutil.
    •    Tem estados de foco, hover e “ativo” (underline animado).

Contexto técnico
    •    Os requisitos apontam:
    •    Links: home → #hero; sobre → /sobre; portfolio showcase → /portfolio; contato → #contact. ￼
    •    Código atual do documento já esboça um SiteHeader usando Framer Motion + useScroll para condensação. ￼

Instruções para o agente
    1.    Em SiteHeader.tsx:
    •    'use client';
    •    Usar useScroll + useTransform para derivar headerY / headerPadding / backdropOpacity.
    •    motion.header sticky com:
    •    className="fixed inset-x-0 top-0 z-50" (ou similar).
    •    Variar padding (py-5 → py-2, por exemplo) em função do scroll.
    •    backdrop-blur + bg-white/80 ao rolar.
    2.    Navegação:
    •    Mapear itens de menu (home, sobre, portfolio showcase, contato) em um array de config.
    •    Usar next/link.
    •    Adicionar underline animado no item ativo (por rota/âncora).
    3.    Acessibilidade:
    •    Focus ring consistente em links.
    •    aria-label para o logo (ex.: “Ir para o topo”).

Checklist de saída
    •    Header sticky com transição suave de padding.
    •    Blur e sombra aplicados após scroll.
    •    Itens de navegação corretos e acessíveis.
    •    Hover/active state coerentes com o design (incl. azul #0057FF). ￼

Arquivos-alvo
    •    src/components/layout/SiteHeader.tsx
    •    src/app/layout.tsx (para incluir o header)

⸻

Prompt 8 — Estrutura de arquivos & checklist visual final

Objetivo da sessão
    •    Validar a organização de pastas e a fidelidade visual final da Home, garantindo que todos os prompts anteriores convergem num resultado consistente.

Contexto técnico
    •    Estrutura alvo já foi definida (ver seção 1).
    •    Anexos de referência incluem:
    •    Ecossistema R3F/Drei + gltfjsx.
    •    Pattern de “distorted glass”.
    •    Animações por scroll com R3F.
    •    Exemplo de MeshTransmissionMaterial com GLB.

Instruções para o agente
    1.    Validar que a estrutura de pastas da Home bate com a esperada:
    •    app/layout.tsx e app/page.tsx.
    •    components/layout, components/hero, components/hero3d, hooks, etc.
    2.    Revisar se:
    •    The Hero corresponde visualmente à imagem de referência.
    •    O orb 3D está posicionado corretamente em relação ao heading.
    •    A transição da thumb → Manifesto está suave e alinhada ao layout.
    3.    Verificar as demais seções (Manifesto, Portfolio Showcase, Featured Projects, Clients, Contact, Footer) de forma rápida, aplicando:
    •    Hovers/coerência de tokens.
    •    alt em imagens.
    •    Navegação fluida por teclado.

Checklist de saída
    •    Estrutura de pastas conforme especificado.
    •    Home reproduz o layout de referência.
    •    Navegação e narrativa Hero → Manifesto → Portfolio → Contact coerentes.
    •    Acessibilidade básica garantida.

Arquivos-alvo
    •    src/app/layout.tsx
    •    src/app/page.tsx
    •    src/components/**/*
    •    src/hooks/usePrefersReducedMotion.ts

⸻

5. Nota final

Este documento substitui versões anteriores com entradas duplicadas ou contraditórias.
Use apenas os prompts estruturados acima por sessão.
Se um código “completo” anterior divergir deste texto, considere este documento como fonte de verdade de requisitos e intenções para o agente.

```m
