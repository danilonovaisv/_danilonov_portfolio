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




// GhostAuditHomeAbout.tsx
// Auditoria técnica das páginas HOME e SOBRE do portfoliodanilo.com,
// focada em fidelidade às especificações Ghost Design, responsividade,
// WebGL/ROME e prontidão para execução por um agente (Copilot/Cursor).

import React from "react";

export default function GhostAuditHomeAbout() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 text-sm leading-relaxed text-neutral-100 md:text-base">
      {/* 1️⃣ Visão Geral */}
      <section>
        <h1 className="mb-4 text-2xl font-semibold">
          Auditoria Técnica — HOME e SOBRE · portfoliodanilo.com
        </h1>

        <h2 className="mt-6 text-xl font-semibold">1. Visão Geral</h2>
        <p className="mt-2">
          A arquitetura geral do projeto está bem organizada: uso de App Router
          com layout global em <code>src/app/layout.tsx</code>, seções
          componentizadas por página em{" "}
          <code>src/components/home</code> e <code>src/components/sobre</code>,
          e módulos WebGL/ROME separados em{" "}
          <code>src/components/canvas</code>. O header possui implementação
          dedicada em <code>src/components/layout/header</code> e o footer em{" "}
          <code>src/components/layout/SiteFooter.tsx</code>. A página SOBRE
          reutiliza clientes, contato e footer da HOME, alinhado com o design
          system Ghost.
        </p>
        <p className="mt-2">
          Porém, comparando o estado atual (capturas de tela fornecidas) com as
          especificações canônicas mais recentes da HOME (documento técnico
          detalhado da homepage) e da SOBRE (Ghost Design / Protótipo
          Interativo), há divergências importantes em:
        </p>
        <ul className="mt-2 list-disc pl-5">
          <li>
            Header desktop: não está no formato de “fluid glass” parcial com
            pill centralizado, nem demonstra claramente o comportamento de
            seguidor de cursor e glass/WebGL descrito.
          </li>
          <li>
            Hero + Manifesto HOME: falta o preloader Ghost, o fluxo completo do
            Manifesto Video no desktop (thumbnail fixo que cresce até fullscreen
            com hold de 2s e lógica de som), e a variante mobile em seção
            separada.
          </li>
          <li>
            Portfolio Showcase: o layout de stripes e a interação de hover
            (reveal de thumbnail, alteração de gap, rotação da seta) parecem
            mais simples do que o especificado.
          </li>
          <li>
            Featured Projects: o grid bento está próximo, mas sem todos os
            detalhes de proporção, hover e scroll reveal definidos.
          </li>
          <li>
            SOBRE: as seis seções existem e seguem a narrativa, mas o “ritmo
            ghost” ainda é mais “promocional” (cartões, contrastes fortes e
            animações menos sutis) do que o proposto no protótipo
            interativo (ênfase em texto, opacity/blur/translate apenas, sem
            scale/bounce).
          </li>
          <li>
            Motion e acessibilidade: precisa de uma camada explícita de{" "}
            <code>prefers-reduced-motion</code> e checagem de foco/aria em
            navegação e vídeos.
          </li>
        </ul>
        <p className="mt-2">
          Em resumo: a base está bem estruturada e próxima do objetivo, mas
          ainda falta alinhar fino grid, motion, manifesto vídeo e o
          comportamento “ghost” silencioso, sobretudo na página SOBRE.
        </p>
      </section>

      {/* 2️⃣ Diagnóstico por Dimensão */}
      <section>
        <h2 className="mt-8 text-xl font-semibold">
          2. Diagnóstico por Dimensão
        </h2>

        <h3 className="mt-4 text-lg font-semibold">2.1 Estrutura</h3>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Arquitetura com App Router e separação por páginas em{" "}
            <code>src/app</code> está correta. Há rotas para <code>/</code>,{" "}
            <code>/sobre</code> e <code>/portfolio</code>.
          </li>
          <li>
            HOME e SOBRE usam seções componentizadas em{" "}
            <code>src/components/home</code> e{" "}
            <code>src/components/sobre</code>, o que facilita a aplicação das
            specs por seção.
          </li>
          <li>
            WebGL/ROME isolado em <code>src/components/canvas/home</code> e{" "}
            <code>src/components/canvas/header</code> (bom para lazy/dynamic
            import e controle de DPR).
          </li>
          <li>
            Ainda não há evidência clara de um arquivo de tokens único (cores,
            motion, tipografia) centralizado e consumido por todas as seções de
            HOME e SOBRE; partes do design system parecem estar duplicadas em
            CSS Modules e Tailwind.
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">2.2 UI / UX</h3>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Hierarquia tipográfica geral é boa (títulos fortes, body legível),
            mas alguns tamanhos e espaçamentos não batem exatamente com o
            documento da HOME (por exemplo, proporção entre H1 e H2 no hero e
            densidade de texto em Portfolio Showcase).
          </li>
          <li>
            Na SOBRE, seções 03 e 05 ainda têm cara de “landing page de
            serviço” (cards e destaques azuis fortes) em vez de manifesto
            silencioso com texto protagonista.
          </li>
          <li>
            CTAs estão presentes, mas não seguem um padrão único de componente
            (CTAButton) em todas as seções.
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">
          2.3 Fidelidade Visual (referências + Ghost / Phantom como controle)
        </h3>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Header desktop: visual atual é uma barra full-width; o protótipo
            Ghost define um pill central com glass e leve refração, inspirado em
            comportamentos de sites como Phantom (mas sem copiar identidade).
          </li>
          <li>
            Ghost Atmosphere: o canvas atual já traz ghost, partículas e
            fireflies, mas a posição/escala/brilho não está claramente
            calibrada para reproduzir a imagem HERO-PORTFOLIO-GHOST.jpg com
            exatidão.
          </li>
          <li>
            Sobre: o layout geral (seções 01–06) respeita a ordem e conteúdo
            textual, mas o ritmo de respiro, espaçamentos verticais e uso de
            imagens ainda não seguem integralmente o documento Ghost (texto
            deveria respirar mais e imagens nunca em 100% de opacidade).
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">2.4 Responsividade</h3>
        <ul className="mt-1 list-disc pl-5">
          <li>
            As capturas mobile mostram boa adaptação geral (seções empilhadas,
            texto legível), mas há variação de margens laterais entre seções,
            quebrando o ritmo de “duas laterais” uniforme.
          </li>
          <li>
            Em HOME mobile, o Portfolio Showcase vira uma lista de cards, mas
            ainda não reproduz a hierarquia de tipografia e espaçamentos
            descritos para mobile-first.
          </li>
          <li>
            Não é possível garantir pelas capturas se não há nenhum overflow
            horizontal; isso precisa ser checado inspecionando o DOM em
            breakpoints pequenos.
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">2.5 Motion</h3>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Há uso de Framer Motion em header, seções e WebGL (pelo naming de
            componentes), mas a camada de motion tokens Ghost (apenas opacity,
            blur e translateY até 18px; sem scale/bounce/rotate) não está
            totalmente aplicada em todas as seções.
          </li>
          <li>
            SOBRE seção 03 (“O que eu faço”) parece usar animações mais
            “card-like” e possivelmente scale ou hover mais forte, o que vai
            contra as regras Ghost.
          </li>
          <li>
            Manifesto vídeo HOME provavelmente só tem fade/hover simples; ainda
            falta o fluxo de scroll → fullscreen → hold 2s → som, e a versão
            mobile específica.
          </li>
          <li>
            Não há evidência clara de tratamento consistente de{" "}
            <code>prefers-reduced-motion</code> em todas as animações (header,
            hero, WebGL, listas da SOBRE).
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">
          2.6 ROME / WebGL (spec + fidelidade visual)
        </h3>
        <ul className="mt-1 list-disc pl-5">
          <li>
            A estrutura de ROME (GhostCanvas, Ghost, Particles, Fireflies,
            AnalogDecayPass) existe e está separada, o que é ótimo para
            manutenção.
          </li>
          <li>
            É necessário auditar: DPR máximo (2 no desktop, possivelmente menor
            em mobile), antialias desligado, e fallback completo quando
            WebGL falha ou o usuário prefere menos movimento.
          </li>
          <li>
            A posição e escala do ghost em relação ao hero editorial parecem
            um pouco diferentes da referência HERO-PORTFOLIO-GHOST.jpg; o ghost
            deve ocupar exatamente o mesmo “peso” visual, sem competir com o
            texto.
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">2.7 Performance</h3>
        <ul className="mt-1 list-disc pl-5">
          <li>
            O uso de dynamic import para WebGL não é evidente sem olhar o
            código, mas é crítico para manter o LCP/TTI da HOME.
          </li>
          <li>
            Vídeos (Manifesto, Hero Sobre, VideoAboutMethod) precisam ser
            carregados com preload/policy correta (autoplay mutado, poster
            estático, lazy quando abaixo da dobra) para respeitar o budget
            &lt;2MB inicial.
          </li>
          <li>
            Deve-se garantir que o canvas WebGL não roda fora de viewport (usar
            intersection observer / pause em abas ocultas).
          </li>
        </ul>

        <h3 className="mt-4 text-lg font-semibold">2.8 Acessibilidade</h3>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Header mobile precisa de foco aprisionado no overlay,{" "}
            <code>aria-expanded</code> no botão de menu, suporte a tecla ESC e
            rótulos adequados.
          </li>
          <li>
            Vídeos (Manifesto, Hero Sobre, AboutMethod) precisam de controles
            de som acessíveis, labels claros e nunca iniciar com áudio sem
            interação explícita (somente mutado).
          </li>
          <li>
            CTAs e links no footer e contato precisam de{" "}
            <code>focus-visible</code> consistente e tamanho mínimo de 48x48px
            em mobile.
          </li>
        </ul>
      </section>

      {/* 3️⃣ Diagnóstico por Seção — HOME */}
      <section>
        <h2 className="mt-8 text-xl font-semibold">3. Diagnóstico por Seção</h2>

        {/* HOME - Header */}
        <h3 className="mt-6 text-lg font-semibold">Página: HOME · Seção: Header</h3>
        <p className="mt-1 font-semibold">Checklist de Fidelidade</p>
        <ul className="mt-1 list-disc pl-5">
          <li>Fidelidade visual (referência HEADER docs): não.</li>
          <li>Grid e margens laterais: não (barra full-width em vez de pill central).</li>
          <li>Alinhamento duas laterais: parcial; não segue pill em container.</li>
          <li>Tipografia: próxima, mas tamanhos e espaçamentos não seguem exatamente o spec.</li>
          <li>Vídeos: não aplicável.</li>
          <li>ROME/WebGL: header glass ainda não evidentemente integrado como no FluidGlass.jsx.</li>
          <li>Mobile: menu funciona, mas precisa validar overlay staggered vs spec.</li>
          <li>Motion/Animações: parcial; falta confirmação de easing/timing Ghost.</li>
        </ul>

        <p className="mt-2 font-semibold">Problema</p>
        <p>
          O header desktop está implementado como barra full-width fixa no topo
          em vez de um container pill “fluid glass” centralizado com leve
          movimento seguindo o cursor e profundidade glass/WebGL. No mobile, o
          menu hamburguer abre um painel, mas não está garantido que seja o
          overlay full-screen staggered com foco aprisionado e animação em
          camadas.
        </p>

        <p className="mt-2 font-semibold">Correção Técnica</p>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Ajustar <code>src/app/layout.tsx</code> e{" "}
            <code>src/components/layout/Header.tsx</code> para renderizar{" "}
            <code>SiteHeader</code> dentro de um container com{" "}
            <code>max-w-1680</code> e padding lateral{" "}
            <code>clamp(24px,5vw,96px)</code>, posição{" "}
            <code>sticky</code>, <code>top:0</code> e{" "}
            <code>z-index</code> alto.
          </li>
          <li>
            Em <code>DesktopFluidHeader.tsx</code>, garantir:
            <ul className="list-disc pl-5">
              <li>
                Layout em pill: fundo translúcido com backdrop-blur,
                bordas arredondadas e largura parcial (não full viewport).
              </li>
              <li>
                Movimento baseado em cursor no eixo X com lerp/spring suave
                (máx 40–60px).
              </li>
              <li>
                Fallback sem WebGL: apenas CSS com{" "}
                <code>backdrop-filter: blur(...)</code> e sem seguimento de
                cursor.
              </li>
            </ul>
          </li>
          <li>
            Em <code>MobileStaggeredMenu.tsx</code>, garantir overlay
            fullscreen com:
            <ul className="list-disc pl-5">
              <li>
                Animação de entrada: fade + slide X, itens com stagger de
                ~100ms.
              </li>
              <li>
                Foco aprisionado enquanto menu aberto,{" "}
                <code>aria-expanded</code> e ESC para fechar.
              </li>
            </ul>
          </li>
        </ul>

        <p className="mt-2 font-semibold">Resultado Esperado</p>
        <p>
          No desktop, o header aparece como um pill translúcido centralizado,
          com leve movimento fluido e profundidade, semelhante ao vídeo de
          referência em <code>docs/HEADER</code>. Em mobile, o menu cobre a
          tela com animação staggered e navegação acessível, sem competir
          visualmente com o hero.
        </p>

        {/* HOME - Hero + Ghost Atmosphere + Manifesto */}
        <h3 className="mt-6 text-lg font-semibold">
          Página: HOME · Seção: Hero + Ghost Atmosphere + Manifesto
        </h3>
        <p className="mt-1 font-semibold">Checklist de Fidelidade</p>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Fidelidade visual (HERO-PORTFOLIO-GHOST.jpg + HERO+MANIFESTO.md):
            parcial.
          </li>
          <li>
            Grid e margens laterais: parcial; texto parece levemente mais
            comprimido que no mock.
          </li>
          <li>
            Alinhamento duas laterais: parcial; hero texto e manifesto thumb
            poderiam alinhar melhor com as colunas globais.
          </li>
          <li>Tipografia: próxima, mas tamanhos relativos H1/H2 podem ser ajustados.</li>
          <li>
            Vídeos (Manifesto): layout presente, mas sem o fluxo scroll →
            fullscreen → hold 2s → som.
          </li>
          <li>
            ROME/WebGL: presente, mas posição/escala/presença do ghost ainda
            não idênticas à referência.
          </li>
          <li>
            Mobile: hero funciona, mas não há seção Manifesto Mobile separada
            como especificado.
          </li>
          <li>
            Motion/Animações: precisa alinhar com tokens Ghost (sem scale/bounce,
            apenas opacity/translate).
          </li>
        </ul>

        <p className="mt-2 font-semibold">Problema</p>
        <p>
          O hero atual já mostra ghost e texto manifesto, mas não implementa:
        </p>
        <ul className="mt-1 list-disc pl-5">
          <li>Preloader Ghost com animação de loading.</li>
          <li>
            Comportamento avançado do vídeo Manifesto no desktop (thumbnail
            fixo que cresce até fullscreen e segura o scroll por 2s com som
            ativado).
          </li>
          <li>
            Seção Manifesto dedicada no mobile com vídeo fullscreen,
            tap-to-unmute e remute ao sair do viewport.
          </li>
          <li>
            Calibração precisa da Ghost Atmosphere (posição, brilho, bloom e
            analog decay) para casar com a imagem de referência.
          </li>
        </ul>

        <p className="mt-2 font-semibold">Correção Técnica</p>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Em <code>HomeHero.tsx</code>:
            <ul className="list-disc pl-5">
              <li>
                Implementar preloader separado (Ghost Loader) com overlay em{" "}
                <code>z-50</code>, animando opacity 1→0 após ~1.5–2s e removendo
                do fluxo.
              </li>
              <li>
                Garantir que o bloco editorial (H1/H2 + CTA) é totalmente
                estático (sem scroll-trigger) e centralizado verticalmente, com
                tipografia de acordo com o documento da homepage.
              </li>
            </ul>
          </li>
          <li>
            Em <code>GhostCanvas.tsx</code> e filhos:
            <ul className="list-disc pl-5">
              <li>
                Ajustar posição inicial do ghost para reproduzir a composição
                de HERO-PORTFOLIO-GHOST.jpg (sem invadir demais a área do
                texto).
              </li>
              <li>
                Controlar DPR com <code>gl={{ dpr: [1, 2] }}</code> e desligar{" "}
                <code>antialias</code>.
              </li>
              <li>
                Implementar fallback: se WebGL falhar ou{" "}
                <code>prefers-reduced-motion</code> for true, renderizar apenas
                o background gradiente estático.
              </li>
            </ul>
          </li>
          <li>
            Implementar componente de Manifesto desktop em{" "}
            <code>ManifestoSection.tsx</code> ou equivalente:
            <ul className="list-disc pl-5">
              <li>
                Vídeo thumb fixo na viewport enquanto o usuário percorre a
                altura da seção hero.
              </li>
              <li>
                Usar Framer Motion + <code>useScroll</code> para mapear
                progressão Y em <code>scale</code>, posição e{" "}
                <code>borderRadius</code> do vídeo; editorial text fade-out
                coordenado.
              </li>
              <li>
                Ao atingir fullscreen, pausar o scroll (scroll lock / overlay
                fixa) por 2s, desmutar o vídeo e depois liberar scroll novamente
                e remutar ao sair do fullscreen.
              </li>
            </ul>
          </li>
          <li>
            Criar seção Manifesto mobile logo abaixo do hero (em{" "}
            <code>ManifestoSection.tsx</code>):
            <ul className="list-disc pl-5">
              <li>
                Vídeo fullscreen na largura, autoplay loop mutado, botão
                dedicado para som.
              </li>
              <li>
                Ao sair do viewport, garantir remute automático.
              </li>
            </ul>
          </li>
        </ul>

        <p className="mt-2 font-semibold">Resultado Esperado</p>
        <p>
          O usuário vê o preloader Ghost, entra em um hero com texto 100%
          estático, ghost e partículas posicionados exatamente como na
          referência, e um thumbnail de manifesto que cresce suavemente até
          fullscreen conforme o scroll, segurando a experiência por 2s com som
          ativado no momento certo. No mobile, o manifesto se apresenta como
          seção própria logo abaixo do hero.
        </p>

        {/* HOME - Portfolio Showcase */}
        <h3 className="mt-6 text-lg font-semibold">
          Página: HOME · Seção: Portfolio Showcase
        </h3>
        <p className="mt-1 font-semibold">Checklist de Fidelidade</p>
        <ul className="mt-1 list-disc pl-5">
          <li>Fidelidade visual (imagem de layout da HOME): parcial.</li>
          <li>
            Grid e margens laterais: parcial; stripes parecem mais “coladas” e
            possivelmente sem label flutuante exato.
          </li>
          <li>
            Alinhamento duas laterais: parcial; é preciso alinhar com colunas
            globais.
          </li>
          <li>Tipografia: títulos ok, mas hierarquia podia ser mais marcada.</li>
          <li>Vídeos: não aplicável.</li>
          <li>ROME/WebGL: não aplicável.</li>
          <li>
            Mobile: funcional, mas não segue exatamente o layout de cards
            verticalmente e a ausência de thumbnails animados.
          </li>
          <li>
            Motion/Animações: hover e scroll reveal mais simples que o
            especificado (thumbnail expand, arrow rotate, titles ficando azuis).
          </li>
        </ul>

        <p className="mt-2 font-semibold">Problema</p>
        <p>
          As stripes de categoria não reproduzem todo o comportamento editorial:
          alinhamentos alternados (direita, centro, esquerda), label flutuante
          “[what we love working on]”, thumbnail que se revela no hover
          expandindo de 0 até largura fixa, rotação do ícone de seta e mudança
          de cor dos títulos no scroll reveal.
        </p>

        <p className="mt-2 font-semibold">Correção Técnica</p>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Em <code>src/components/home/portfolio-showcase</code> (e seus
            stripes), garantir:
            <ul className="list-disc pl-5">
              <li>
                Um wrapper com título “portfólio showcase” (parte em branco,
                parte em azul) centralizado, label flutuante posicionado
                absolutamente.
              </li>
              <li>
                Três stripes com alinhamentos alternados e flex/grid para
                alinhar texto, seta e região do thumbnail.
              </li>
              <li>
                Thumbnail inicialmente oculto (largura 0) e revelado em hover
                usando Framer Motion (ou CSS) com duração ~700ms, easing
                easeOutExpo.
              </li>
              <li>
                Ícone de seta em círculo azul que rota de -45° para 0° no hover
                e translação/rotação no tempo correto.
              </li>
              <li>
                No mobile, remover label flutuante, centralizar texto, e não
                usar thumbnail com animação (ou mantê-lo estático).
              </li>
            </ul>
          </li>
        </ul>

        <p className="mt-2 font-semibold">Resultado Esperado</p>
        <p>
          O usuário percebe três faixas editoriais bem distintas, com
          alternância de alinhamentos, thumbnail que “abre” no hover, um pequeno
          label ghost e um CTA global “let’s build something great →” usando o
          componente CTAButton unificado.
        </p>

        {/* HOME - Featured Projects, Clients, Contact, Footer */}
        <h3 className="mt-6 text-lg font-semibold">
          Página: HOME · Seções: Featured Projects, Clients/Brands, Contact,
          Footer
        </h3>
        <p className="mt-1 font-semibold">Checklist de Fidelidade (resumo)</p>
        <ul className="mt-1 list-disc pl-5">
          <li>Featured Projects: grid bento presente, mas proporções precisam ser afinadas.</li>
          <li>
            Clients/Brands: barra azul com logos já existe e está próxima ao
            esperado.
          </li>
          <li>
            Contact: layout 2 colunas (desktop) e 1 coluna (mobile) está
            implementado, mas precisa seguir tokens de cor/tipografia e foco
            exatamente.
          </li>
          <li>
            Footer: existe barra azul com navegação e sociais, mas não é claro
            se está fixo apenas em desktop e estático em mobile como definido.
          </li>
        </ul>

        <p className="mt-2 font-semibold">Principais Problemas</p>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Featured Projects: falta checar se as col-spans batem com o layout
            proposto e se hover/scroll reveal usam apenas transform/opacity.
          </li>
          <li>
            Contact: campos de formulário, estados de erro e sucesso, e o
            endpoint da FormSubmit precisam estar alinhados com o documento da
            homepage.
          </li>
          <li>
            Footer: comportamento fixo apenas em desktop precisa ser confirmado e
            ajustado (sem sobrepor conteúdo em mobile).
          </li>
        </ul>
      </section>

      {/* 3️⃣ Diagnóstico por Seção — SOBRE */}
      <section>
        <h3 className="mt-8 text-lg font-semibold">
          Página: SOBRE · Seções 01–06
        </h3>

        {/* SOBRE - Seção 01 */}
        <h4 className="mt-4 text-base font-semibold">
          Seção 01 — Hero / Manifesto
        </h4>
        <ul className="mt-1 list-disc pl-5">
          <li>Fidelidade visual: parcial (texto correto, mas vídeo e motion a refinar).</li>
          <li>Grid/margens: próximo, mas texto parece mais denso que o protótipo.</li>
          <li>Alinhamento: texto à direita ok.</li>
          <li>Tipografia: conteúdo correto; ajustar respiro e pesos conforme Ghost.</li>
          <li>Vídeo: presente, mas falta validar autoplay mutado, blur inicial, motion frame-by-frame.</li>
          <li>ROME/WebGL: não aplicável.</li>
          <li>Mobile: layout consistente, mas sem seção de vídeo totalmente dedicada.</li>
          <li>Motion: precisa seguir animação linha-a-linha com opacity+blur.</li>
        </ul>
        <p className="mt-1 font-semibold">Problema</p>
        <p>
          O hero SOBRE mostra Danilo + texto manifesto, porém a animação ainda
          não segue rigidamente o esquema 0–30–60–100% (linha a linha) apenas
          com opacity/blur, nem garante que o vídeo de fundo se comporte como
          camada visual sutil e não como elemento dominante.
        </p>

        {/* SOBRE - Seção 02 */}
        <h4 className="mt-4 text-base font-semibold">
          Seção 02 — Origem Criativa
        </h4>
        <ul className="mt-1 list-disc pl-5">
          <li>Fidelidade visual: parcial.</li>
          <li>Grid/margens: texto e imagens alternam, mas grid invisível precisa afinar.</li>
          <li>Alinhamento: ok em desktop; mobile precisa garantir texto antes das mídias.</li>
          <li>
            Tipografia: conteúdo correto; usar espaçamento mais generoso e
            títulos discretos.
          </li>
          <li>Vídeos/imagens: presentes, porém sem certeza de opacity máxima 0.85 e blur sutil permanente.</li>
          <li>Motion: provável uso de translateY e fade, mas precisa respeitar tokens Ghost (sem escala).</li>
        </ul>
        <p className="mt-1 font-semibold">Problema</p>
        <p>
          Imagens parecem totalmente nítidas e com opacidade total; o texto
          entra mais como seção convencional que como narrativa “que aparece
          aos poucos”. O mobile pode não garantir sempre “texto antes da imagem”
          em todas as combinações.
        </p>

        {/* SOBRE - Seção 03 */}
        <h4 className="mt-4 text-base font-semibold">
          Seção 03 — O que eu faço
        </h4>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Layout atual usa cartões e bullets com fundo, fugindo do layout de
            lista vertical minimalista (sem cards) descrito.
          </li>
          <li>
            Motion possivelmente inclui scale/hover mais forte; Ghost proíbe
            scale/bounce/rotate.
          </li>
          <li>
            Mobile: necessidade de manter lista vertical com bastante espaço
            entre itens.
          </li>
        </ul>
        <p className="mt-1 font-semibold">Problema</p>
        <p>
          A seção está mais “cardizada” e promocional do que minimalista e
          silenciosa. Itens não entram um a um com stagger suave e hover
          apenas de opacidade.
        </p>

        {/* SOBRE - Seção 04 */}
        <h4 className="mt-4 text-base font-semibold">
          Seção 04 — Como eu trabalho (Criatividade com método)
        </h4>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Layout atual usa grande imagem/ilustração e lista de bullets, mas o
            fundo ainda não parece full-bleed com vídeo abstrato, nem com
            parallax ultra sutil.
          </li>
          <li>
            Motion do texto precisa ser simples fadeGhost (0→100% sem animação
            contínua depois).
          </li>
        </ul>
        <p className="mt-1 font-semibold">Problema</p>
        <p>
          A seção transmite a mensagem, mas falta transformar o vídeo
          abstrato/código/IA em background vivo discreto, com texto por cima em
          primeiro plano e motion controlado (sem loops chamativos).
        </p>

        {/* SOBRE - Seção 05 */}
        <h4 className="mt-4 text-base font-semibold">
          Seção 05 — O que me move (Ghost Design)
        </h4>
        <ul className="mt-1 list-disc pl-5">
          <li>
            Atualmente há forte destaque visual com ghost pixelado “ISSO É
            GHOST DESIGN” mais próximo de um bloco hero, quando a seção deveria
            ser quase só texto com muito espaço negativo.
          </li>
          <li>
            As frases devem surgir por tempo (não scroll), com delays longos,
            apenas opacity/blur, sem deslocamento vertical.
          </li>
        </ul>
        <p className="mt-1 font-semibold">Problema</p>
        <p>
          A seção enfatiza o ghost como ilustração central, mas a proposta é
          deixar o texto ser o protagonista, com animação temporal sutil e
          sensação de pensamentos aparecendo. O componente GhostEyes deve ser
          usado como acento sutil, não como pôster.
        </p>

        {/* SOBRE - Seção 06 */}
        <h4 className="mt-4 text-base font-semibold">
          Seção 06 — Fechamento / Confirmação
        </h4>
        <ul className="mt-1 list-disc pl-5">
          <li>Layout atual bastante próximo (texto + dois CTAs).</li>
          <li>
            É preciso só garantir que hover nos CTAs seja minimalista (leve
            mudança de opacidade/cor, sem animação chamativa) e que a seção
            tenha altura 80–100vh com respiro.
          </li>
        </ul>
        <p className="mt-1 font-semibold">Problema</p>
        <p>
          Pequenos ajustes de margens, espaçamentos e motion para ficar
          perfeitamente alinhado ao Ghost Design (sem scale em hover, apenas
          opacidade e cor).
        </p>
      </section>

      {/* 4️⃣ Lista de Problemas com Severidade */}
      <section>
        <h2 className="mt-8 text-xl font-semibold">
          4. Lista de Problemas por Severidade
        </h2>
        <p className="mt-2 font-semibold">Severidade Alta</p>
        <ul className="mt-1 list-disc pl-5">
          <li>
            H-01 · Header desktop não segue layout fluid glass pill parcial e
            interfere na hierarquia com o hero.
          </li>
          <li>
            H-02 · Manifesto vídeo desktop não implementa scroll → fullscreen →
            hold 2s → lógica de som.
          </li>
          <li>H-03 · Manifesto mobile não está em seção dedicada com som sob tap.</li>
          <li>
            H-04 · WebGL/ROME sem garantia de fallback completo e controle de
            DPR/prefers-reduced-motion.
          </li>
          <li>
            S-01 · Seção 03 da SOBRE (“O que eu faço”) não segue layout/lista
            Ghost (cards e animações fora dos tokens).
          </li>
          <li>
            S-02 · Seção 05 da SOBRE (“O que me move”) enfatiza imagem/ghost em
            vez de texto temporal silencioso.
          </li>
        </ul>

        <p className="mt-3 font-semibold">Severidade Média</p>
        <ul className="mt-1 list-disc pl-5">
          <li>
            H-05 · Portfolio Showcase sem todos os comportamentos de stripes
            (thumbnail reveal, arrow rotation, label flutuante).
          </li>
          <li>
            H-06 · Featured Projects sem grid bento exatamente fiel e motion
            padronizado.
          </li>
          <li>
            H-07 · Footer possivelmente não fixo apenas em desktop e estático em
            mobile.
          </li>
          <li>
            S-03 · Seção 02 da SOBRE com imagens muito nítidas e opacas (falta
            blur/opacity máxima 0.85).
          </li>
          <li>
            S-04 · Seção 04 da SOBRE sem vídeo abstrato full-bleed de fundo e
            parallax ultra sutil.
          </li>
        </ul>

        <p className="mt-3 font-semibold">Severidade Baixa</p>
        <ul className="mt-1 list-disc pl-5">
          <li>
            G-01 · Pequenas inconsistências de margens laterais entre seções
            (edge rhythm).
          </li>
          <li>
            G-02 · Ausência de uso global de um componente CTAButton padrão.
          </li>
          <li>
            G-03 · Falta de centralização de tokens de motion Ghost em módulo
            reutilizável.
          </li>
          <li>
            G-04 · Checagem e ajustes finos de acessibilidade (focus, aria),
            especialmente em menu mobile e vídeos.
          </li>
        </ul>
      </section>

      {/* 5️⃣ Recomendações Prioritárias */}
      <section>
        <h2 className="mt-8 text-xl font-semibold">
          5. Recomendações Prioritárias (Ordem de Execução)
        </h2>
        <ol className="mt-2 list-decimal pl-5">
          <li>
            Consolidar tokens globais de cor, tipografia e motion (baseados no
            documento da homepage e no Ghost Design System da SOBRE) e aplicar
            em todos os componentes relevantes.
          </li>
          <li>
            Corrigir Header (DesktopFluidHeader + MobileStaggeredMenu) para
            bater exatamente com o spec visual e comportamental.
          </li>
          <li>
            Implementar por completo o fluxo do Manifesto vídeo (desktop e
            mobile), incluindo hold de 2s em fullscreen e lógica de som.
          </li>
          <li>
            Auditar e ajustar ROME/WebGL (GhostCanvas, Ghost, Fireflies,
            AnalogDecayPass) para fidelidade visual com HERO-PORTFOLIO-GHOST e
            performance (DPR, fallback, reduced-motion).
          </li>
          <li>
            Ajustar Portfolio Showcase e Featured Projects para refletir grid,
            hover e scroll reveal exatamente como especificado.
          </li>
          <li>
            Aplicar o Ghost Design System na página SOBRE, com foco nas seções
            03 e 05 (remover cardização, focar em texto e motion temporal).
          </li>
          <li>
            Revisar Clients/Brands, Contact e Footer (HOME e SOBRE) para alinhar
            margens laterais, CTAs padrão e comportamento fixo do footer apenas
            em desktop.
          </li>
          <li>
            Passar uma camada final de acessibilidade (tab order, aria, focus,
            touch targets) e performance (Lighthouse, Web Vitals) após as
            correções.
          </li>
        </ol>
      </section>

      {/* 🛠 Prompts Técnicos para Agente Executor */}
      <section>
        <h2 className="mt-8 text-xl font-semibold">
          6. Prompts Técnicos Atômicos para Agente Executor
        </h2>
        <p className="mt-2">
          Cada prompt abaixo descreve uma tarefa isolada, focada e mensurável
          para Copilot/Cursor atuar diretamente no repositório.
        </p>

        {/* Prompt 01 */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 01 — Header desktop fluid glass (layout e movimento)
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Transformar o header desktop em um pill “fluid glass” centralizado,
            com leve movimento seguindo o cursor, fiel ao spec de HEADER.
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/app/layout.tsx</li>
            <li>src/components/layout/Header.tsx</li>
            <li>src/components/layout/header/SiteHeader.tsx</li>
            <li>
              src/components/layout/header/DesktopFluidHeader.tsx e
              DesktopFluidHeader.module.css
            </li>
            <li>docs/HEADER/HEADER CODES DESKTOP.md (referência)</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Garantir que o header desktop é renderizado dentro de um container
              com largura máxima de 1680px e padding lateral
              clamp(24px,5vw,96px), centralizado.
            </li>
            <li>
              Implementar (ou alinhar) um wrapper pill com bordas arredondadas,
              backdrop-blur, leve gradiente e sombra sutil, sem ocupar 100% da
              largura da viewport.
            </li>
            <li>
              Implementar movimento horizontal baseado em posição do cursor,
              usando interpolação suave (por exemplo, Framer Motion ou lógica
              própria) com deslocamento máximo de 40–60px e easing suave.
            </li>
            <li>
              Implementar fallback de header estático (sem movimento) para
              ambientes sem WebGL ou com prefers-reduced-motion.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar textos de navegação.</li>
            <li>Não inventar novo layout; seguir HEADER docs.</li>
            <li>Usar Tailwind + CSS Module existente.</li>
            <li>
              Mobile-first: não quebrar o comportamento do MobileStaggeredMenu.
            </li>
            <li>
              Comparar com vídeos/imagens em docs/HEADER e referências de
              animação do site Phantom para ritmo (não visual).
            </li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>Header aparece como pill centralizado em desktop.</li>
            <li>Movimento horizontal suave acompanhando o cursor.</li>
            <li>Fallback estático ativo com prefers-reduced-motion.</li>
            <li>Layout mobile permanece inalterado.</li>
          </ul>
        </div>

        {/* Prompt 02 */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 02 — Menu mobile staggered fullscreen com acessibilidade
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Garantir que o header mobile usa overlay fullscreen com animação
            staggered, foco aprisionado e comportamento acessível.
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/components/layout/header/MobileStaggeredMenu.tsx</li>
            <li>src/components/layout/header/types.ts</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Implementar overlay fullscreen (ou quase) com background gradiente
              primary→neutral, abrindo sobre o conteúdo.
            </li>
            <li>
              Usar Framer Motion para animar entrada: overlay fade-in, painel
              slide a partir da direita, itens com stagger 80–120ms.
            </li>
            <li>
              Adicionar foco aprisionado dentro do menu enquanto aberto, usando
              refs e manipulação de tabIndex/FocusTrap.
            </li>
            <li>
              Implementar <code>aria-expanded</code>,{" "}
              <code>aria-label</code> e fechamento via tecla ESC e clique fora.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar labels de navegação.</li>
            <li>
              Respeitar motion Ghost: apenas opacity/translate; sem scale ou
              rotate.
            </li>
            <li>
              Comparar comportamento com a referência Phantom apenas em termos
              de ritmo (não estética).
            </li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>Menu abre em overlay fullscreen no mobile.</li>
            <li>Itens entram com stagger suave.</li>
            <li>
              Tecla ESC, clique fora e clique em item fecham o menu e restauram
              foco para o botão.
            </li>
            <li>
              Nenhuma animação roda quando prefers-reduced-motion for ativado.
            </li>
          </ul>
        </div>

        {/* Prompt 03 */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 03 — Preloader Ghost e hero estático na HOME
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Adicionar preloader Ghost com animação de carregamento e garantir
            que o texto editorial do hero é totalmente estático (sem
            scroll-trigger).
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/components/home/HomeHero.tsx</li>
            <li>src/components/home/HeroCopy.tsx</li>
            <li>src/components/home/GhostStage.tsx</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Criar componente <code>HeroPreloader</code> com SVG ghost, texto
              “Summoning spirits” e barra de progresso, posicionado em overlay
              com fundo gradiente escuro.
            </li>
            <li>
              Usar Framer Motion para animar opacity de 1→0 após 1.5–2s, e
              remover o preloader da árvore (ou marcar como{" "}
              <code>display:none</code>).
            </li>
            <li>
              Garantir que <code>HeroCopy</code> não dependa de{" "}
              <code>whileInView</code> ou scroll; apenas renderizar texto
              estático com alinhamento e tamanhos corretos.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar o conteúdo dos textos.</li>
            <li>Usar apenas opacity/blur/translateY no preloader.</li>
            <li>Respeitar prefers-reduced-motion (pular preloader se preciso).</li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>Preloader aparece brevemente e some sem travar o layout.</li>
            <li>Hero copy não muda ao scroll; sempre visível e estático.</li>
          </ul>
        </div>

        {/* Prompt 04 — Manifesto vídeo desktop */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 04 — Manifesto vídeo desktop: thumbnail → fullscreen →
            hold 2s com som
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Implementar o comportamento completo do manifesto vídeo no desktop,
            incluindo crescimento com scroll, estado fullscreen, hold de 2s e
            lógica de som.
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/components/home/ManifestoSection.tsx</li>
            <li>src/components/home/ManifestoThumb.tsx</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Usar <code>useScroll</code> e <code>useTransform</code> do Framer
              Motion para mapear progressão da seção hero (0→1) em:
              escala, posição e borderRadius do vídeo.
            </li>
            <li>
              Definir máquina de estados simples:{" "}
              <code>thumbnail</code> | <code>transition</code> |{" "}
              <code>fullscreenHold</code> | <code>released</code>.
            </li>
            <li>
              Ao atingir fullscreen, acionar estado{" "}
              <code>fullscreenHold</code>, travar scroll por 2s e desmutar
              o vídeo; após 2s, liberar scroll mantendo vídeo fullscreen.
            </li>
            <li>
              Remutar o vídeo ao sair da seção hero (scroll para baixo) e
              repetir comportamento caso usuário retorne ao topo.
            </li>
            <li>
              No clique da thumbnail, pular diretamente para{" "}
              <code>fullscreenHold</code> respeitando a mesma lógica de som.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar o arquivo de vídeo nem URL.</li>
            <li>Movimentar apenas transform e opacity.</li>
            <li>
              Com prefers-reduced-motion, desativar animações complexas e exibir
              vídeo em tamanho confortável estático.
            </li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>
              Vídeo começa como thumbnail mutado fixo no canto inferior
              direito.
            </li>
            <li>Durante o scroll, cresce suave até fullscreen.</li>
            <li>
              Em fullscreen, scroll fica travado por 2s e som liga; ao sair da
              seção, som desliga.
            </li>
          </ul>
        </div>

        {/* Prompt 05 — Manifesto mobile */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 05 — Seção Manifesto Mobile dedicada
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Criar uma seção exclusiva de manifesto vídeo no mobile logo abaixo
            do hero, com som controlado por tap.
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/components/home/ManifestoSection.tsx</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Adicionar branch de layout para mobile (por exemplo,
              via utilitário de breakpoint ou CSS) que rende uma seção{" "}
              full-width logo abaixo do hero.
            </li>
            <li>
              Renderizar vídeo manifesto no centro, autoplay loop{" "}
              mutado, com botão de som claro (ícone).
            </li>
            <li>
              Implementar lógica: ao tap, toggle mute/unmute; ao sair
              do viewport (observer), remutar automaticamente.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar texto do hero.</li>
            <li>Respeitar layout e tokens de cor da homepage.</li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>Mobile exibe manifesto vídeo logo abaixo do hero.</li>
            <li>Som só toca após interação explícita.</li>
            <li>
              Ao sair da seção, o vídeo volta a ficar mutado sem erros.
            </li>
          </ul>
        </div>

        {/* Prompt 06 — Portfolio Showcase */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 06 — Portfolio Showcase stripes fidelizado
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Deixar a seção Portfolio Showcase idêntica ao layout e comportamento
            descritos (stripes alternadas, thumbnail reveal, arrow rotation).
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>
              src/components/home/portfolio-showcase/** (CategoryText,
              CategoryThumbnail, CategoryArrow, etc.)
            </li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Ajustar containers para garantir alinhamentos alternados
              (direita, centro, esquerda) e label flutuante na primeira stripe.
            </li>
            <li>
              Implementar thumbnail com largura inicial 0 e animação até 288px
              em hover, com opacity 0→1 (700ms, easing expo).
            </li>
            <li>
              Animar rotação da seta de -45° para 0° em 500ms ao hover.
            </li>
            <li>
              No scroll reveal, animar opacity/translateY e troca de cor dos
              títulos para azul.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não mexer em textos de categorias.</li>
            <li>
              Não acrescentar novos efeitos além dos previstos (sem scale).
            </li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>
              Desktop exibe stripes exatamente como na imagem de referência.
            </li>
            <li>Hover mostra thumbnail expandindo com fluidez.</li>
            <li>Scroll reveal está ativado e titles mudam para azul.</li>
          </ul>
        </div>

        {/* Prompt 07 — Featured Projects */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 07 — Featured Projects Bento Grid e cards
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Ajustar a grade e interação dos Featured Projects para bater
            exatamente com a matriz de colunas e motion especificados.
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/components/home/FeaturedProjectsSection.tsx</li>
            <li>src/components/home/featured-projects/**</li>
            <li>src/components/home/ProjectCard.tsx</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Aplicar grid 12 colunas com spans exatos (5+7, 12, 8+4) para os
              quatro cards e CTA.
            </li>
            <li>
              Ajustar aspect ratios dos cards para aproximar as dimensões
              indicadas.
            </li>
            <li>
              Implementar hover com image scale leve, translateY -1 e arrow
              translateX 20px, duração ~500–700ms.
            </li>
            <li>
              Adicionar scroll reveal com container fade/translateY e
              staggerChildren nas cards.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não mudar textos de projeto nem slugs.</li>
            <li>Não adicionar animações de escala exagerada.</li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>
              Grid confere visualmente com diagrama bento da documentação.
            </li>
            <li>Hover suave e consistente em todos os cards.</li>
            <li>Sem overflow horizontal em mobile.</li>
          </ul>
        </div>

        {/* Prompt 08 — Clients/Brands, Contact, Footer (HOME/SOBRE) */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 08 — Unificação de Clients/Brands, Contact e Footer
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Garantir que as seções de marcas, contato e footer sejam idênticas
            em HOME e SOBRE e sigam fielmente o design system.
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/components/home/ClientsBrandsSection.tsx</li>
            <li>src/components/home/ContactSection.tsx</li>
            <li>src/components/layout/SiteFooter.tsx</li>
            <li>src/app/page.tsx</li>
            <li>src/app/sobre/page.tsx</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Extrair Clients/Brands e Contact para componentes reutilizáveis se
              ainda não forem, usando tokens de cor/typo da documentação.
            </li>
            <li>
              Garantir que o footer é fixo apenas em desktop (
              position: fixed, bottom:0) e estático em mobile (no fluxo).
            </li>
            <li>
              Verificar que os links e ícones sociais abrem em nova aba com{" "}
              rel="noopener noreferrer", e que o formulário usa o endpoint
              FormSubmit correto.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar textos de contato nem e-mails.</li>
            <li>Respeitar tamanho mínimo de touch target em mobile.</li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>
              Seções de marcas, contato e footer visualmente idênticas em HOME
              e SOBRE.
            </li>
            <li>Footer fixo apenas em desktop, sem sobrepor conteúdo.</li>
            <li>Formulário funcionando e acessível.</li>
          </ul>
        </div>

        {/* Prompt 09 — SOBRE: Seção 03 O que eu faço */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 09 — SOBRE: Seção 03 “O que eu faço” como lista Ghost
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Reimplementar a seção 03 da SOBRE como lista vertical minimalista,
            com itens entrando um a um e hover apenas em opacidade.
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/components/sobre/AboutWhatIDo.tsx</li>
            <li>src/components/sobre/motion.ts</li>
            <li>src/components/sobre/keywords.tsx</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Remover qualquer card/fundo decorativo extra e manter apenas
              texto, com largura fixa de ~520–600px centralizada.
            </li>
            <li>
              Usar Framer Motion para animar cada item com opacity e
              translateY até 18px, com stagger 0.18s por item.
            </li>
            <li>
              No hover, aumentar levemente opacity (+5%), sem scale nem
              underline.
            </li>
            <li>
              Usar motion tokens definidos em <code>motion.ts</code> e aplicar
              <code>prefers-reduced-motion</code>.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar textos dos itens.</li>
            <li>Não usar scale, bounce ou rotate.</li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>
              Seção ocupa 100vh, com lista limpa e muito espaço entre itens.
            </li>
            <li>
              Animações respeitam apenas opacity/translateY com stagger
              definido.
            </li>
            <li>Nenhum card visual aparente (apenas tipografia).</li>
          </ul>
        </div>

        {/* Prompt 10 — SOBRE: Seção 05 O que me move */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 10 — SOBRE: Seção 05 “O que me move” com animação temporal
            Ghost
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Transformar a seção 05 da SOBRE em bloco textual com muito espaço
            negativo e frases que surgem por tempo (não por scroll).
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/components/sobre/AboutBeliefs.tsx</li>
            <li>src/components/sobre/GhostEyes.tsx</li>
            <li>src/components/sobre/GhostEyes.module.css</li>
            <li>src/components/sobre/motion.ts</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Reposicionar a seção para ter altura 100vh, texto centralizado e
              ghost apenas como acento discreto (por exemplo, ao lado ou abaixo
              do texto, não dominante).
            </li>
            <li>
              Implementar sequência temporal: cada bloco de frase entra via
              opacity+blur com delays longos (1s+), usando timers ou{" "}
              <code>useEffect</code> + estado.
            </li>
            <li>
              Garantir que animações não dependem de scroll; são puramente
              baseadas em tempo desde a montagem da seção na viewport.
            </li>
            <li>
              Em <code>GhostEyes</code>, garantir movimento de olhos suave,
              sem jitter agressivo, respeitando variáveis CSS definidas.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar o texto do manifesto.</li>
            <li>Não usar scale/rotate/bounce em nenhum elemento.</li>
            <li>
              Respeitar motion tokens Ghost e prefers-reduced-motion (desligar
              sequência temporal para usuários sensíveis).
            </li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>
              Seção transmite sensação de “pensamentos aparecendo”, sem depender
              de scroll.
            </li>
            <li>
              Ghost está presente de forma sutil, não como pôster chamativo.
            </li>
          </ul>
        </div>

        {/* Prompt 11 — ROME/WebGL tuning */}
        <div className="mt-4 border-t border-neutral-700 pt-4">
          <h3 className="font-semibold">
            Prompt 11 — Tuning ROME/WebGL (Ghost, Particles, Fireflies, Analog
            Decay)
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Ajustar o módulo ROME para máxima fidelidade visual à referência,
            com performance controlada e respeito a prefers-reduced-motion.
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/components/canvas/home/GhostCanvas.tsx</li>
            <li>src/components/canvas/home/Ghost.tsx</li>
            <li>src/components/canvas/home/Particles.tsx</li>
            <li>src/components/canvas/home/Fireflies.tsx</li>
            <li>
              src/components/canvas/home/postprocessing/AnalogDecayPass.tsx
            </li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Ajustar câmera, posição e escala do ghost para que a composição
              seja idêntica à HERO-PORTFOLIO-GHOST.jpg.
            </li>
            <li>
              Configurar DPR máximo em 2, desligar antialias e considerar
              DPR menor em mobile.
            </li>
            <li>
              Envolver o canvas em dynamic import ({'"use client"'} + lazy) e
              renderizar fallback estático quando WebGL não estiver disponível
              ou prefers-reduced-motion for true.
            </li>
            <li>
              Afinar parâmetros de bloom e Analog Decay (grão, flicker,
              vinheta) para ficarem sutis, sem ruído visual excessivo.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar conteúdo textual do hero.</li>
            <li>Usar Drei e R3F seguindo boas práticas.</li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>
              Captura do hero coincide visualmente com HERO-PORTFOLIO-GHOST.jpg.
            </li>
            <li>
              LCP/CLS permanecem dentro do budget; canvas não degrada scroll em
              mobile.
            </li>
          </ul>
        </div>

        {/* Prompt 12 — Acessibilidade global */}
        <div className="mt-4 border-t border-neutral-700 pt-4 mb-8">
          <h3 className="font-semibold">
            Prompt 12 — Camada global de acessibilidade e prefers-reduced-motion
          </h3>
          <p className="mt-1 font-semibold">Objetivo</p>
          <p>
            Garantir que todas as páginas respeitam WCAG AA, teclado, foco e
            prefers-reduced-motion de forma consistente.
          </p>

          <p className="mt-1 font-semibold">Arquivos/Rotas envolvidas</p>
          <ul className="list-disc pl-5">
            <li>src/app/layout.tsx</li>
            <li>src/components/layout/header/**</li>
            <li>src/components/layout/SiteFooter.tsx</li>
            <li>src/components/home/**</li>
            <li>src/components/sobre/**</li>
          </ul>

          <p className="mt-1 font-semibold">Ações</p>
          <ol className="list-decimal pl-5">
            <li>
              Implementar um hook utilitário para{" "}
              <code>usePrefersReducedMotion</code> e usá-lo em todos os lugares
              onde Framer Motion ou WebGL estão ativos.
            </li>
            <li>
              Garantir que todos botões, links e ícones têm{" "}
              <code>focus-visible</code> claro e tamanho mínimo em mobile.
            </li>
            <li>
              Verificar e ajustar aria-labels, aria-expanded, aria-hidden em
              menus, overlays e vídeos.
            </li>
          </ol>

          <p className="mt-1 font-semibold">Regras</p>
          <ul className="list-disc pl-5">
            <li>Não alterar textos visíveis.</li>
            <li>Não introduzir animações adicionais.</li>
          </ul>

          <p className="mt-1 font-semibold">Critérios de aceite</p>
          <ul className="list-disc pl-5">
            <li>Lighthouse Acessibility em 100 nas páginas HOME e SOBRE.</li>
            <li>
              Teste de navegação por teclado flui sem pontos mortos ou traps
              indevidos.
            </li>
            <li>
              Com prefers-reduced-motion ativado, todas as animações não
              essenciais param ou ficam instantâneas.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
