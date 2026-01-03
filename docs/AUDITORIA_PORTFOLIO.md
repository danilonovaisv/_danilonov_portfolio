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

// src/components/dev/HomeHeroAuditReport.tsx
'use client';

import React from 'react';

export default function HomeHeroAuditReport() {
  return (
    <main className="min-h-screen bg-[#050511] text-[#fcffff] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-3">
          <h1 className="text-xl font-semibold tracking-tight">
            Auditoria técnica – Hero Animation & Layout (Home)
          </h1>
          <p className="text-sm text-[#a1a3a3]">
            Escopo: análise conceitual da Hero 3D + manifesto em relação ao design system e
            especificações fornecidas, listando apenas erros críticos, inconsistências visuais e
            riscos de build observáveis com os artefatos disponíveis (documentação + capturas de tela).
          </p>
        </header>

        {/* 1. Resumo de riscos críticos */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            1. Riscos críticos identificados
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>
              <span className="font-semibold">Dependência total do WebGL para o texto da Hero.</span>{' '}
              Pelo conceito, o título “Você não vê o design. / Mas ele vê você.” precisa existir
              tanto em HTML (para SEO/acessibilidade) quanto em canvas/shader. Se hoje o texto
              visível depende apenas do <code>RevealingText</code> no canvas, qualquer falha de
              WebGL, CORS de fontes ou <code>prefers-reduced-motion</code> tende a deixar a Hero
              praticamente vazia. Isso é crítico para primeira impressão, SEO e acessibilidade.
            </li>
            <li>
              <span className="font-semibold">
                Carregamento de fontes externas para o <code>drei/Text</code> / troika-three-text.
              </span>{' '}
              O uso de URLs Supabase diretas para TT Norms Pro em <code>font=...</code> é
              correto em tese, mas sensível a:
              <ul className="mt-1 list-[circle] space-y-1 pl-5">
                <li>qualquer mudança de bucket/path;</li>
                <li>headers de CORS inadequados;</li>
                <li>erros de digitação nos encodes de espaço (<code>%20</code>);</li>
                <li>latência extra no first paint da Hero.</li>
              </ul>
              Se hoje o texto 3D às vezes não aparece ou aparece com fonte fallback, isso é o
              sintoma direto. É um dos principais pontos de quebra do setup.
            </li>
            <li>
              <span className="font-semibold">
                Tailwind v4 + CSS legado em <code>globals.css</code>.
              </span>{' '}
              O único <code>globals.css</code> disponível no contexto traz apenas{' '}
              <code>@import 'tailwindcss';</code> sem outros estilos globais ou tokens
              configurados, o que é compatível com Tailwind v4, mas sugere que qualquer legado
              com <code>@tailwind base/components/utilities</code> + <code>@apply</code> ainda não
              foi limpo. Misturar as duas sintaxes é um risco de build imediato (erros de utilitário
              desconhecido, ordem de camadas e purge incorreto).
            </li>
            <li>
              <span className="font-semibold">
                Tipo customizado para o material <code>revealMaterial</code>.
              </span>{' '}
              Se o shader da Hero foi exposto como um novo tipo JSX (por exemplo,{' '}
              <code>&lt;revealMaterial /&gt;</code> via <code>extend</code> do R3F), é obrigatório
              adicionar a declaração global em TypeScript. Sem isso, o projeto compila no
              JavaScript, mas costuma quebrar o build TS ou o lint da App Router.
            </li>
            <li>
              <span className="font-semibold">
                Fallback 3D → HTML em mobile ainda não é “à prova de falhas”.
              </span>{' '}
              Pelo fluxo descrito, <code>enable3D</code> deve ser <code>false</code> enquanto a
              cena não estiver pronta, em dispositivos móveis e em{' '}
              <code>prefers-reduced-motion</code>, garantindo que o HTML da Hero (H1/H2/CTA) seja
              sempre visível. Se hoje o canvas monta em mobile antes do texto ou em paralelo,
              existe risco de hitchs, layout shift e consumo de bateria sem ganho perceptível.
            </li>
          </ul>
        </section>

        {/* 2. Hero Animation (shader, fontes, Z-order, fallback) */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            2. Hero Animation – pontos específicos
          </h2>

          {/* 2.1 Shader & posição do fantasma */}
          <section className="space-y-2">
            <h3 className="text-base font-semibold">
              2.1. Shader <code>RevealingText</code> vs. posição do fantasma
            </h3>
            <p className="text-sm leading-relaxed">
              Sem acesso ao código do shader, não dá para afirmar se o fantasma está, de fato,
              dirigindo o revel da tipografia. Mas, pelo que foi descrito, o fluxo correto deve ser:
            </p>
            <ul className="list-decimal space-y-1 pl-5 text-sm leading-relaxed">
              <li>
                O componente <code>&lt;Ghost /&gt;</code> expõe sua posição em world space
                (ex.: via Zustand/Context ou prop callback).
              </li>
              <li>
                O componente <code>&lt;RevealingText /&gt;</code> recebe essa posição já
                normalizada para o mesmo espaço do plano de texto e a injeta num uniforme{' '}
                <code>uGhostPosition</code>.
              </li>
              <li>
                O fragment shader calcula a distância 2D/3D de cada fragmento para{' '}
                <code>uGhostPosition</code> e usa um <code>smoothstep</code> invertido com um{' '}
                <code>uRevealRadius</code> suficiente (algo ≈ <code>5.0</code>) para abrir área
                visível.
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              Sintomas típicos de erro crítico aqui:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
              <li>
                Texto nunca aparece → uniforme não atualizado ou <code>smoothstep</code> invertido.
              </li>
              <li>
                Reveal travado em um ponto fixo → posição do fantasma calculada no espaço errado
                (world vs. view vs. local do plano).
              </li>
              <li>
                Fantasma visível, mas texto totalmente escondido atrás do bloom → shader está
                rodando, mas o plano de texto está muito atrás ou com material opaco demais.
              </li>
            </ul>
          </section>

          {/* 2.2 Fonts Supabase / troika-three-text */}
          <section className="space-y-2">
            <h3 className="text-base font-semibold">
              2.2. Fontes TT Norms Pro (Supabase) em <code>drei/Text</code>
            </h3>
            <p className="text-sm leading-relaxed">
              Para o <code>drei/Text</code> (troika-three-text) funcionar com TT Norms Pro, é
              obrigatório:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
              <li>
                Passar explicitamente a URL WOFF2 correta no prop <code>font</code> (por exemplo a
                Bold, já que não há Black).
              </li>
              <li>
                Garantir que o bucket do Supabase é público e serve{' '}
                <code>Content-Type: font/woff2</code> com CORS liberado (
                <code>Access-Control-Allow-Origin: *</code> ou pelo menos o domínio da app).
              </li>
              <li>
                Evitar alterar esses paths sem revisar a Hero; qualquer 404 aqui resulta em texto
                invisível dentro do canvas.
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              Do ponto de vista de UX, é crítico manter a versão HTML do H1/H2 visível no DOM
              (mesmo que “escondida” visualmente via <code>sr-only</code> quando o 3D está ativo),
              para que falhas de fonte não derrubem a mensagem principal da página.
            </p>
          </section>

          {/* 2.3 Z-index / profundidade */}
          <section className="space-y-2">
            <h3 className="text-base font-semibold">
              2.3. Ordem de renderização – fantasma vs. texto
            </h3>
            <p className="text-sm leading-relaxed">
              A especificação indica o fantasma em <code>z ≈ -0.2</code> e o texto em{' '}
              <code>z ≈ -1.5</code>, com câmera padrão em <code>z &gt; 0</code>. Isso, em teoria,
              garante que o fantasma fique visualmente sobre o texto. Os riscos principais:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
              <li>
                <span className="font-semibold">Materiais transparentes com depthWrite desligado.</span>{' '}
                Se o fantasma usa materiais com <code>transparent</code> e{' '}
                <code>depthWrite=false</code> combinados com bloom forte, você pode ver halos
                estranhos onde o texto “vaza” através do glow.
              </li>
              <li>
                <span className="font-semibold">Uso incorreto de <code>renderOrder</code>.</span>{' '}
                Forçar <code>renderOrder</code> sem necessidade pode inverter a ordem esperada e
                gerar popping quando a cena cresce.
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              Como regra: se o fantasma está de fato à frente do texto na matriz de modelagem e os
              materiais respeitam depth testing padrão, você não precisa mexer em{' '}
              <code>renderOrder</code>. Qualquer gambiarra nesse ponto é um sinal de problema
              estrutural.
            </p>
          </section>

          {/* 2.4 Fallback mobile / enable3D */}
          <section className="space-y-2">
            <h3 className="text-base font-semibold">
              2.4. Fallback mobile – <code>enable3D</code> e visibilidade de <code>HeroCopy</code>
            </h3>
            <p className="text-sm leading-relaxed">
              O fluxo descrito para a Hero é correto em conceito, mas frágil se{' '}
              <code>enable3D</code> não for centralizado:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
              <li>
                <code>enable3D</code> precisa nascer como <code>false</code> e só virar{' '}
                <code>true</code> depois de:
                <ul className="mt-1 list-[circle] space-y-1 pl-5">
                  <li>verificar largura mínima (desktop),</li>
                  <li>checar <code>prefers-reduced-motion: no-preference</code>,</li>
                  <li>
                    garantir que o <code>canvas</code> conseguiu criar contexto WebGL sem erros.
                  </li>
                </ul>
              </li>
              <li>
                <code>HeroCopy</code> deve receber <code>enable3D</code> como prop e decidir
                internamente se aplica <code>sr-only</code> ou se exibe o texto com a
                tipografia completa (H1 5–8rem, H2 4–6rem) no fallback.
              </li>
              <li>
                Em mobile, a versão segura é:
                <ul className="mt-1 list-[circle] space-y-1 pl-5">
                  <li>Hero 100% HTML (sem canvas) com mesmo conteúdo;</li>
                  <li>Manifesto em vídeo como seção seguinte, em full-width;</li>
                  <li>nenhuma dependência de scroll-sync complexo para entender a narrativa.</li>
                </ul>
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              Se hoje você ainda vê ghost 3D + vídeo thumbnail em telas pequenas, isso contraria o
              design system (mobile-first) e é um ponto crítico a ajustar para performance e
              acessibilidade.
            </p>
          </section>
        </section>

        {/* 3. Layout & globals */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">
            3. Layout global, tipografia e cores
          </h2>

          <section className="space-y-2">
            <h3 className="text-base font-semibold">3.1. Tailwind v4 &amp; globals.css</h3>
            <p className="text-sm leading-relaxed">
              Pelo que consta na documentação, você já está no modelo novo do Tailwind v4, usando{' '}
              <code>@import "tailwindcss";</code> e devendo migrar tokens para <code>@theme</code>.
              Os riscos principais aqui:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
              <li>
                Manter qualquer arquivo antigo com <code>@tailwind base;</code>,{' '}
                <code>@tailwind components;</code> e <code>@tailwind utilities;</code> junto do
                import novo.
              </li>
              <li>
                Usar <code>@apply</code> com utilitários que não existem no core (ex.{' '}
                <code>border-white/10</code> ou variantes arbitrárias) — o compilador novo é mais
                rígido e tende a falhar o build em vez de ignorar.
              </li>
              <li>
                Não propagar as variáveis de cor (<code>--color-background</code>,{' '}
                <code>--color-text</code> etc.) para o <code>&lt;body&gt;</code>, o que quebra a
                consistência entre home, /sobre e demais páginas.
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              Do ponto de vista de layout, o body precisa sair da caixa com:
              <code>background: #050511</code>, <code>color: #fcffff</code> e{' '}
              <code>font-family: "TT Norms Pro", system-ui, sans-serif</code>, para que qualquer
              página nova herde imediatamente o “Ghost Design System”.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold">
              3.2. Tipografia da Hero vs. tokens globais
            </h3>
            <p className="text-sm leading-relaxed">
              Há uma pequena inconsistência entre os tokens globais (H1 = 4–6rem) e o que a Hero
              especifica (H1 = 5–8rem, H2 = 4–6rem). Isso em si não quebra o build, mas é um risco
              de “drift” visual:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
              <li>
                Se H1 global for usado em outras seções (ex: “portfólio showcase”) em 4rem, e a
                Hero for manualmente forçada para 6–8rem, a hierarquia entre seções pode ficar
                inconsistente.
              </li>
              <li>
                Em /sobre, onde a tipografia já é mais densa, é fácil o H1/H2 cair para tamanhos
                diferentes do que você usa na home, quebrando a sensação de sistema único.
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              Recomendação: definir um token específico para “Hero Display” (ex.:{' '}
              <code>text-[clamp(3.5rem,6vw,5.5rem)]</code>) e usá‑lo apenas nas Heroes da home e
              /sobre, mantendo H1/H2 globais mais baixos.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="text-base font-semibold">
              3.3. Hierarquia visual da Hero (HTML vs. Canvas)
            </h3>
            <p className="text-sm leading-relaxed">
              Visualmente, a hierarquia da Hero está coerente com o design (tag →
              título→subtítulo→CTA), mas há dois riscos práticos:
            </p>
            <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed">
              <li>
                Se a tag <code>[BRAND AWARENESS]</code> for renderizada apenas no canvas (como
                textura ou texto 3D), você perde semântica e legibilidade em telas pequenas.
              </li>
              <li>
                Se o CTA “step inside →” for 100% dependente do glow/bloom no canvas, ele pode
                ficar pouco legível em monitores com calibração ruim ou em ambientes muito claros.
              </li>
            </ul>
            <p className="text-sm leading-relaxed">
              O ideal é que toda a copy crucial da Hero exista em HTML puro, com o canvas atuando
              como camada atmosférica, não como fonte de verdade do conteúdo.
            </p>
          </section>
        </section>

        {/* 4. Prioridades de correção */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-semibold tracking-tight">
            4. Prioridades sugeridas (ordem de ataque)
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>
              <span className="font-semibold">
                Blindar o fallback da Hero (HTML sempre disponível):
              </span>{' '}
              centralizar <code>enable3D</code>, garantir que a copy da Hero é renderizada em HTML,
              e só esconder visualmente quando o 3D estiver saudável e permitido pelo usuário.
            </li>
            <li>
              <span className="font-semibold">
                Consolidar <code>globals.css</code> em Tailwind v4 puro:
              </span>{' '}
              remover sintaxe antiga, definir <code>@theme</code> com tokens de cor, tipografia e
              spacing, aplicar fonts Supabase e fundo <code>#050511</code> diretamente no body.
            </li>
            <li>
              <span className="font-semibold">
                Revisar o pipeline do shader <code>RevealingText</code>:
              </span>{' '}
              checar uniforms de posição do fantasma, <code>uRevealRadius</code> e lógica de{' '}
              <code>smoothstep</code>, além da tipagem TS para o material customizado.
            </li>
            <li>
              <span className="font-semibold">
                Validar carregamento das fontes Supabase em ambiente real (produção):
              </span>{' '}
              inspecionar network para garantir 200 + CORS ok nos WOFF2 de TT Norms Pro, tanto para
              CSS global quanto para <code>drei/Text</code>.
            </li>
            <li>
              <span className="font-semibold">Ajustar tokens de tipografia da Hero:</span> alinhar
              tamanhos de H1/H2 da home e /sobre com um único set de tokens “Hero Display” e
              garantir consistência entre breakpoints.
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}