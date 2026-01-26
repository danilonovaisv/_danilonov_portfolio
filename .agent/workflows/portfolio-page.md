---
description: ##PROTOCOLO GÊNESE - PORTFOLIO GHOST
---

# 🧬 PROMPT MESTRE: PROTOCOLO GÊNESE - PORTFOLIO GHOST V2.2

**Contexto e Persona:**
Atue como um **Staff Frontend Architect** e **Creative Developer Senior**. Você possui autoridade técnica total sobre este repositório Next.js. Seu objetivo é orquestrar a implementação do sistema "Ghost v2.2", fundindo a engenharia de alta performance (Virtual Scroll/LERP) com a identidade visual consolidada (Design System, Hero Video, Seção de Clientes e Contato).

**Diretriz Primária:**
Elevar o nível de engenharia do projeto. Estabeleça um ecossistema "Agent-Ready" robusto, performático e visualmente fiel aos protótipos.

---

## 🔍 FASE 1: AUDITORIA E RECONHECIMENTO (Executar Imediatamente)

Utilize suas ferramentas de terminal para mapear o terreno:

1. **Mapeamento:** Execute `ls -R` (ignorando node_modules/.git) para entender a estrutura atual.
2. **Stack Check:** Leia `package.json`, `tsconfig.json` e `tailwind.config.ts`.
3. **Content Gap:** Verifique a existência de assets críticos (logos de clientes, vídeos) ou prepare placeholders.

---

## ⚙️ PROTOCOLO DE EXECUÇÃO (ALGORITMO)

### FASE 1: PARSING E INDEXAÇÃO (Chain of Thought)

1. Ler e entender completamente o DESCRITIVO DA SESSÃO ABAIXO
2. Identificar **todos os elementos, textos, animações, cores e interações** descritos nesse documento (um a um, na ordem em que aparecem).
3. **Executar cada fase sequencialmente**, aplicando as mudanças no código.
4. Para cada fase executado, rodar **testes de layout e animação** relacionados.
5. Registrar o resultado de cada etapa (sucesso, falhas, pendências).
6. Crie uma lista mental (ou JSON interno) contendo para cada item:
   - `ID`: Identificador sequencial.
   - `Contexto`: Arquivos alvo (ex: `src/components/Header.tsx`).
   - `Ação`: O que mudar (ex: "Aumentar padding", "Corrigir Z-Index").
   - `Validação`: Critério de sucesso (ex: "Compilar sem erros", "Igual à imagem X").

###REFERECIAS BIBLE DE NA PASTA:

- './docs/PORTFOLIO/port-ref/REF-ANIMA' - ANIMAÇÃO ESPERADA

- './docs/PORTFOLIO/port-ref/REF-CARDS` - LAYOUT E COMPORTAMENTO RESPONSIVO ESPERADA


## 📐 FASE 2: PLANEJAMENTO ESTRATÉGICO (Modo Artefato) - Protocolo de Análise Profunda

**PARE E AGUARDE APROVAÇÃO** após gerar o **Plano de Implementação Ghost v2.2**, contendo:

1. **Arquitetura Híbrida:** Fusão do Grid Parallax LERP com as seções legadas (Clientes Azul e Contato).
2. **Stack Definida:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, Framer Motion.
3. **Estrutura de Diretórios:**
```text
├── .agent/rules/ (Regras para IA: tech-stack, coding-style)
src/
├── components/
│   ├── portfolio/ (HeroSection, ProjectsGallery, ProjectCard, PortfolioModal)
│   ├── portfolio/content/ (TypeA, TypeB)
│   ├── sections/ (ClientsSection, ContactSection)
│   └── ui/ (Botões, Inputs do Design System)
├── hooks/ (useLERPGalleryScroll, useParallaxCard, useBodyLock)
├── utils/ (math.ts)
└── types/ (project.ts)

```



---

### 3.1. Fundação e Dependências

1. Instale: `npm install framer-motion lucide-react clsx tailwind-merge`.
2. Crie `src/utils/math.ts` com funções puras para física:
```typescript
export const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;
export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

```


3. Defina `src/types/project.ts`:
```typescript
export type ProjectType = 'A' | 'B';
export interface Project {
  id: string;
  title: string;
  category: string;
  type: ProjectType;
  image: string;
  year: string;
  client: string;
  tags: string[];
  description?: string; // Para Type B
  gallery?: string[];   // Para Type B
}

```



### 3.2. Physics Engine (O Core da Performance)

*Implemente desacoplado do React Render Cycle.*

* **`src/hooks/useLERPGalleryScroll.ts`**:
* Gerencie `current`, `target` e `ease` (0.05) via `useRef`.
* Calcule a "Virtual Height" do grid e aplique ao container pai (Ghost Container) para forçar o scroll nativo.
* No loop `requestAnimationFrame`, aplique `transform: translateY` diretamente ao `trackRef`.


* **`src/hooks/useParallaxCard.ts`**:
* Calcule o progresso do elemento na viewport (0 a 1).
* Aplique `transform` no wrapper da imagem para o efeito parallax interno.



### 3.3. Componentes Visuais (Visual & Motion)

**A. Hero Section Otimizada (`src/components/portfolio/HeroSection.tsx`):**

* **Vídeo:** Background loop (`autoPlay`, `muted`, `loop`, `playsInline`).
    - **video hero desktop:** https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort.mp4
    - **video hero mobile:** https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/project-videos/video-heroPort-mobile.mp4
* **Overlay:** Gradiente `from-black/60 via-black/40 to-black/60`.
* **Texto:** Título "portfólio showcase" (com "portfólio" em azul `#4fe6ff` ou `#0048ff`). **font-h1**
* **CTA:** Botão arredondado azul "vamos trabalhar juntos" com ícone de seta e hover scale. **AntigravityCTA.tsx**
## **O texto "portfólio showcase" e o botão de chamada para ação (CTA) "vamos trabalhar juntos" estão alinhados horizontalmente em um mesmo nível, formando uma única linha visual. Eles são posicionados centralizados NO RODAPÉ DA HERO.



**B. Project Card (`src/components/portfolio/ProjectCard.tsx`):**

* **Estrutura:** `aspect-[3/4]`, `overflow-hidden`.
* **Image Wrapper:** `h-[135%]`, `-top-[17.5%]`, `will-change-transform`.
* **Next/Image:** Use `fill`, `object-cover`, e `sizes` otimizados para responsividade.
* **Overlay:** Gradiente no hover com Título, Cliente e Ano.

**C. Projects Gallery (`src/components/portfolio/ProjectsGallery.tsx`):**

* **Container:** `relative w-full` (altura virtual).
* **Track:** `fixed top-0 w-full grid` (1 col mobile, 2 tablet, 3 desktop).
* **Dados:** Use projetos reais/mockados baseados na referência (Garoto-Nestlé, Nescafé, MPDV).

**D. Modal System "Ghost" (`src/components/portfolio/PortfolioModal.tsx`):**

* **Coreografia Estrita:**
* Backdrop: 0.18s linear.
* Container: 0.26s ease `[0.22, 1, 0.36, 1]` (delay 0.12s).
* Conteúdo: Stagger a partir de 0.52s.


* **Tipos de Conteúdo:** Implemente `TypeA` (Zoom Viewer) e `TypeB` (Página Detalhada com Galeria).




### 3.4. Seções Legadas (Integração Visual)

**A. Clients Section (`src/components/sections/ClientsSection.tsx`):** Seguindo as demais paginas

* **Estilo:** Fundo Azul Vibrante (`bg-[#0048ff]`).
* **Conteúdo:** Título "marcas com as quais já trabalhei" e grid de logos monocromáticos em branco (Algar, Aon, Ambev, Unilever, Swift, etc.).

**B. Contact Section (`src/components/sections/ContactSection.tsx`):** Seguindo as demais paginas


* **Estilo:** Fundo claro (`neutralLight`).
* **Dados:**
* Telefone: `+55 11 98396 6838`
* Emails: `dannovaisv@gmail.com`, `danilo@portfoliodanilo.com`


* **Formulário:** Inputs estilizados (Nome, Email, Telefone, Mensagem) seguindo a estética clean do Ghost System.

## 🛠️ FASE 3: EXECUÇÃO E CONFIGURAÇÃO (Protocolo de Instalação)
Para cada item da lista indexada na FASE 1, execute:

#### 1. Análise de Contexto

- Leia o conteúdo atual dos arquivos alvo.
- Compare o código atual com o pedido do prompt.
- _Raciocínio:_ "O que preciso mudar neste código para atingir o critério de aceite sem quebrar o que já funciona?"

#### 2. Aplicação Atômica

- Aplique a mudança mínima necessária.
- **Regras de Ouro:**
  - Mantenha a consistência do Tailwind (use classes utilitárias, evite style inline).
  - Não remova lógica de negócios existente.
  - Respeite a estrutura do App Router.

#### 3. Verificação Técnica (Self-Correction)

- Após a edição, simule/rode: `npm run lint` ou verifique a sintaxe.
- **Se houver erro:** Tente corrigir o erro **uma vez** baseado na mensagem de log.
- **Se persistir:** Desfaça a alteração e marque como "FALHA TÉCNICA".

#### 4. Verificação de Layout (Code-Level)

- Verifique se as classes de responsividade (ex: `md:`, `lg:`) foram aplicadas conforme o pedido "Mobile-First".
- Verifique se não há valores hardcoded que quebrem o layout (ex: `width: 1000px`).

---

## FASE 4: 🛠️ VERIFICAÇÂO:

### 3. Tipografia e Textos

- **Fonte:** Confirmar se `src/config/brand.ts` está sendo a única fonte de definição de fontes (`TT Norms Pro`).
- **Hierarquia:**
- Verificar se os tamanhos de fonte em `src/app/globals.css` (clamp) estão sendo aplicados via classes utilitárias (`text-display`, `text-h1`).

- **Quebra de Linha:** O agente deve alertar se títulos longos não tiverem `max-w-[ch]` para evitar linhas infinitas em monitores ultrawide.

### 4. Responsividade

- **Breakpoints:** Verificar o uso consistente do prefixo `lg:` (1024px) como ponto de virada principal (Desktop).
- **Menu:** O `MobileStaggeredMenu.tsx` deve ser ativado apenas em `< lg`.
- **Touch Targets:** Botões em `src/components/ui/CTAButton.tsx` devem ter altura mínima (ex: `h-12` ou `py-3`).

### 5. Componentes e Interações

- **Estados:** Verificar se os botões têm `hover:`, `active:` e `focus-visible:` definidos.
- **Feedback:** Componentes de formulário (`ContactForm.tsx`) possuem estados de erro/sucesso visuais alinhados com o tema escuro?
- **Animações:** As transições em `src/config/motion.ts` estão sendo usadas, ou há animações "hardcoded" soltas nos componentes?

### 6. Acessibilidade

- **Contraste:** Verificar se textos cinza (`text-secondary`) sobre fundo preto têm contraste suficiente.
- **Tags Semânticas:** Uso correto de `<main>`, `<section>`, `<h1>`, `<button>` vs `<div>`.
- **Imagens:** Verificar se componentes como `Image` do Next.js possuem `alt` descritivo.

### 7. Coerência Global

- **Design Tokens:** O código usa cores hexadecimais soltas (ex: `#0048ff`) ou usa variáveis do Tailwind/Brand (`bg-primary`)? _Isso é crítico para manutenção._

---


**Arquivo Mestre: `src/app/portfolio-showcase/page.tsx**` (ou rota equivalente):

1. Componha a página:
* `<HeroSection />`
* `<ProjectsGallery />` (Ocupa o espaço do scroll virtual)
* `<ClientsSection />` (Deve aparecer após o fim do scroll virtual da galeria)
* `<ContactSection />`
* `<PortfolioModal />` (Renderizado via Portal)


2. **Lógica de Z-Index:** Garanta que a `ProjectsGallery` (que é fixed) pareça rolar naturalmente ou seja coberta pelas seções subsequentes (Clients/Contact) ao final do seu scroll virtual. *Sugestão: As seções Clients e Contact devem ter `z-index` superior e fundo sólido para "cobrir" a galeria fixa ao rolar para o final.*

**Validação Final:**

* Verifique FPS do LERP (deve ser 60fps constantes).
* Confirme timings de animação do Modal.
* Valide responsividade do Grid (1 -> 2 -> 3 colunas).

**INICIE A FASE 1 AGORA.**


 ✅ Checklist Técnico Preenchido

✔ **Posicionamento texto** exato (-10% vertical)  
✔ **Mobile ordering** automático  
✔ **Cores/typo** 100% spec  
✔ **Acessibilidade** AAA  
✔ **Next.js production-ready**  
✔ **Smooth 60fps** scroll experience

