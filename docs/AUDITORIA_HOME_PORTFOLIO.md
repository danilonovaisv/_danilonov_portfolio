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

NÂO TEM PROMPT JA SÂO OS CODIGOS


Use o conteúdo exibido como checklist para o agente executor aplicar as correções nos componentes reais (HomeHero, Preloader, HeroCopy, ManifestoThumb, GhostStage, Header, etc.).
// src/components/home/HomeAuditPrompts.tsx
'use client';

import React from 'react';

export default function HomeAuditPrompts() {
  return (
    <div className="space-y-10 text-sm leading-relaxed text-slate-100">
      {/* 1️⃣ Visão Geral */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">1️⃣ Visão Geral</h2>
        <p>
          Com base nos snippets que você definiu como implementação atual da HOME
          (<code>HomeHero.tsx</code>, <code>Preloader.tsx</code>,{' '}
          <code>HeroCopy.tsx</code> e <code>ManifestoThumb.tsx</code>), o Hero ainda está
          alinhado ao primeiro rascunho do protótipo e não à especificação final 2.0:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            O texto editorial da Hero é animado via <code>opacity</code> atrelada ao scroll,
            quando deveria ser 100% estático.
          </li>
          <li>
            O vídeo manifesto funciona apenas como thumbnail que escala/translada com o
            scroll, mas não está fixo na viewport, não realiza o hold em fullscreen por 2s
            nem controla o som conforme o estado.
          </li>
          <li>
            A estrutura de <code>sticky/pin</code> do container da Hero ainda não está
            implementada, o que impede o morph completo do vídeo antes da próxima seção.
          </li>
          <li>
            O Preloader ainda não tem as microanimações de flutuação/pulsos esperadas para
            o “Ghost Loader”.
          </li>
          <li>
            A versão mobile não apresenta o manifesto como seção fullscreen independente
            logo abaixo da Hero.
          </li>
          <li>
            Não há, na arquitetura fornecida, um Header “fluid glass” com motion reativo e
            menu mobile staggered conforme a seção 4.1 — isso é um gap de implementação.
          </li>
        </ul>
        <p>
          Resultado: a hierarquia geral (Preloader → Ghost Atmosphere → Texto → Manifesto)
          está conceitualmente correta, mas os detalhes de layout, timing e estados do
          manifesto ainda não atingem a fidelidade 1:1 com a referência visual +
          documentação técnica.
        </p>
      </section>

      {/* 2️⃣ Diagnóstico por Seção */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">2️⃣ Diagnóstico por Seção</h2>

        {/* HEADER */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold">🎯 Seção: HEADER</h3>

          <ul className="space-y-1">
            <li>• Grid corresponde à imagem? <strong>Não (gap de implementação)</strong></li>
            <li>• Margens laterais iguais? <strong>Não</strong></li>
            <li>
              • Alinhamento das duas colunas consistente (logo × navegação)?{' '}
              <strong>Não</strong>
            </li>
            <li>• Proporção Header ↔ Hero correta? <strong>Não</strong></li>
            <li>
              • Animações existem apenas onde a referência sugere?{' '}
              <strong>Não avaliado / considerar como Não até implementar spec</strong>
            </li>
            <li>
              • Timing/Easing compatível com motion premium?{' '}
              <strong>Não avaliado / considerar como Não</strong>
            </li>
            <li>• Mobile mantém hierarquia e ritmo? <strong>Não</strong></li>
          </ul>

          <div>
            <h4 className="font-semibold">❌ Problema</h4>
            <p>
              O Header “fluid glass” descrito na documentação (pill centralizado, sticky,
              com efeito fluido reativo ao cursor no desktop e overlay staggered no mobile)
              não está especificado no código atual da HOME. Sem esse componente:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                Não há garantia de que o header use container parcial (pill) com margens
                laterais idênticas à referência.
              </li>
              <li>
                A proporção visual entre Header e Hero não é controlada — o Header tende a
                competir visualmente ou a sumir demais, dependendo da implementação atual.
              </li>
              <li>
                Em mobile, falta o menu overlay com animação staggered, foco aprisionado e
                sem interferir no Hero.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">🔧 Correção Técnica</h4>
            <ul className="list-decimal space-y-1 pl-5">
              <li>
                Introduzir um componente dedicado de Header (por exemplo,
                <code>src/components/layout/Header.tsx</code>) com:
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>
                    <code>position: sticky; top: 0; z-index: 40;</code>
                  </li>
                  <li>
                    Container máximo <code>max-w-[1680px]</code> e padding horizontal{' '}
                    <code>px-[clamp(24px,5vw,96px)]</code>.
                  </li>
                  <li>
                    Pill centralizado com <code>rounded-full</code>,{' '}
                    <code>backdrop-blur</code> e leve gradiente, sem ocupar 100% da
                    largura da viewport.
                  </li>
                </ul>
              </li>
              <li>
                Desktop: aplicar motion fluido no pill (Framer Motion), com leve
                deslocamento e escala em função da posição do cursor, respeitando os
                limites definidos (translação máxima ~40–60px,{' '}
                <code>scaleX</code> até ~1.05 e <code>scaleY</code> ~1.02).
              </li>
              <li>
                Mobile (≤1023px): transformar o Header em barra fixa full-width com logo +
                ícone de menu; implementar overlay fullscreen com navegação vertical
                staggered, fundo em gradiente e social icons ao rodapé.
              </li>
              <li>
                Implementar acessibilidade: <code>aria-label</code> e{' '}
                <code>aria-expanded</code> no botão de menu, trap de foco dentro do
                overlay e suporte a tecla ESC para fechar.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">✅ Resultado Esperado</h4>
            <p>
              O Header aparece como um único bloco de glass/fluid centralizado que não
              compete com o Hero, mantendo as margens laterais idênticas à referência e
              uma navegação clara tanto em desktop quanto em mobile. Em telas menores, o
              overlay do menu se sobrepõe de forma suave e editorial, sem quebrar o ritmo
              da página.
            </p>
          </div>
        </section>

        {/* HERO + MANIFESTO */}
        <section className="space-y-3">
          <h3 className="text-base font-semibold">🎯 Seção: HERO + MANIFESTO</h3>

          <ul className="space-y-1">
            <li>• Grid corresponde à imagem? <strong>Não</strong></li>
            <li>• Margens laterais iguais? <strong>Não</strong></li>
            <li>• Alinhamento das duas colunas consistente? <strong>Não</strong></li>
            <li>• Proporção Header ↔ Hero correta? <strong>Não</strong></li>
            <li>
              • Animações existem apenas onde a referência sugere? <strong>Não</strong> —
              o texto editorial tem fade de saída.
            </li>
            <li>
              • Timing/Easing compatível com motion premium? <strong>Não</strong> — falta
              o hold em fullscreen e o controle de áudio do manifesto.
            </li>
            <li>• Mobile mantém hierarquia e ritmo? <strong>Não</strong></li>
          </ul>

          <div>
            <h4 className="font-semibold">❌ Problema</h4>
            <p>Principais desvios identificados no Hero atual:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Texto editorial com fade no scroll</strong>: o{' '}
                <code>motion.div</code> do <code>HeroCopy</code> usa{' '}
                <code>opacityText</code> derivado de <code>scrollYProgress</code>, fazendo
                o texto desaparecer conforme o usuário desce, contrariando a regra “100%
                estático, sem scroll binding”.
              </li>
              <li>
                <strong>Vídeo manifesto sem pin/hold</strong>: o container do vídeo usa
                <code>absolute bottom-10 right-10</code> dentro da seção, em vez de{' '}
                <code>position: fixed</code> ancorado à viewport + container pai com
                <code>sticky</code>, o que impede o morph completo (thumb → fullscreen)
                antes da próxima seção subir.
              </li>
              <li>
                <strong>Estado fullscreen sem lógica de som</strong>: não há máquina de
                estados para <code>thumbnail → transition → fullscreenHold → released</code>
                , nem controle de áudio (muted em thumb/transition, unmute no fullscreen
                hold, mute ao sair).
              </li>
              <li>
                <strong>Mobile sem seção Manifesto dedicada</strong>: a thumb é escondida
                com <code>hidden md:block</code> e a seção <code>ManifestoSection</code>{' '}
                ainda não está representada como fullscreen logo abaixo da Hero no mobile.
              </li>
              <li>
                <strong>GhostStage / WebGL</strong>: não há garantia, na versão atual, de
                dynamic import, respect ao <code>prefers-reduced-motion</code> e fallback
                em gradiente radial quando WebGL estiver desativado.
              </li>
              <li>
                <strong>Copy/Hierarquia tipográfica</strong>: o <code>HeroCopy.tsx</code>{' '}
                ainda usa o texto do primeiro rascunho (“Design, não é só estética / get
                to know me better →”) em vez do texto final (“Você não vê o design. / Mas
                ele vê você. / step inside →”) descrito na documentação 2.0.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">🔧 Correção Técnica</h4>
            <ul className="list-decimal space-y-1 pl-5">
              <li>
                Em <code>HomeHero.tsx</code>, remover o binding de{' '}
                <code>opacity</code> do bloco editorial ao scroll, mantendo o texto como
                camada fixa e silenciosa (<code>div</code> simples).
              </li>
              <li>
                Reestruturar o container da Hero para usar <code>h-[200vh]</code> no{' '}
                <code>&lt;section&gt;</code> e um wrapper interno{' '}
                <code>sticky top-0 h-screen</code>, garantindo que Ghost, texto e vídeo
                permaneçam presos à viewport durante o scrub.
              </li>
              <li>
                Atualizar o container do vídeo manifesto para{' '}
                <code>position: fixed</code> ancorado em <code>bottom/right</code>, com
                morph de <code>scale</code>, posição e <code>border-radius</code> guiado
                por <code>scrollYProgress</code> (thumb 30% → fullscreen 100%).
              </li>
              <li>
                Adicionar máquina de estados em <code>HomeHero.tsx</code> (por exemplo,
                booleanos como <code>isFullscreenHold</code> +{' '}
                <code>hasReachedEnd</code>) para:
                <ul className="mt-1 list-disc space-y-1 pl-5">
                  <li>
                    Detectar <code>scrollYProgress ≈ 1</code> e entrar em{' '}
                    <em>fullscreenHold</em>.
                  </li>
                  <li>
                    Travar o scroll por ~2s (<code>document.body.style.overflow</code>) e
                    chamar um método <code>setMuted(false)</code> no vídeo.
                  </li>
                  <li>
                    Após 2s, liberar o scroll e voltar a mutar o vídeo.
                  </li>
                  <li>
                    Em desktop, ao clicar na thumb, pular direto para o estado
                    fullscreenHold.
                  </li>
                </ul>
              </li>
              <li>
                Implementar <code>ManifestoSection.tsx</code> para mobile conforme a spec
                (fullscreen, <code>aspect-video</code>, fundo #06071f, animação de
                entrada suave) e renderizá-lo logo abaixo da Hero apenas em{' '}
                <code>md:hidden</code>.
              </li>
              <li>
                Ajustar <code>GhostStage.tsx</code> para carregar o Canvas via dynamic
                import (<code>ssr: false</code>), checar{' '}
                <code>prefers-reduced-motion</code> e cair em gradiente radial quando
                necessário.
              </li>
              <li>
                Atualizar <code>HeroCopy.tsx</code> para o texto final e hierarquia
                tipográfica definida na documentação (tag 12px mono, H1/H2 4–6rem,
                subcopy 1–1.25rem, CTA 0.9rem uppercase).
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">✅ Resultado Esperado</h4>
            <p>
              A Hero passa a se comportar exatamente como o protótipo: o Ghost flutua em
              segundo plano, o texto editorial permanece fixo e silencioso, e o vídeo
              manifesto inicia como thumb no canto inferior direito, cresce com o scroll
              até ocupar o fullscreen (com hold de 2s + áudio ativo) antes da transição
              suave para a próxima seção. No mobile, o manifesto aparece como seção
              fullscreen logo abaixo da Hero, mantendo a mesma atmosfera “Ghost Blue”.
            </p>
          </div>
        </section>
      </section>

      {/* 3️⃣ Lista de Problemas */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3️⃣ Lista de Problemas (com severidade)</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            🔴 <strong>HERO-01 — Texto editorial com fade no scroll</strong> — quebra a
            premissa de Hero editorial estática.
          </li>
          <li>
            🔴 <strong>HERO-02 — Vídeo manifesto sem pin/hold + lógica de som</strong> —
            experiência cinematográfica incompleta e sem controle de áudio.
          </li>
          <li>
            🔴 <strong>HERO-03 — Manifesto mobile sem seção fullscreen dedicada</strong> —
            perda da continuidade visual e sensorial em telas pequenas.
          </li>
          <li>
            🔴 <strong>HERO-04 — GhostStage sem controle de WebGL/reduced motion</strong> —
            risco de problemas de performance e acessibilidade.
          </li>
          <li>
            🟡 <strong>HERO-05 — Preloader sem microanimações Ghost Loader</strong> —
            motion menos editorial/premium que a referência.
          </li>
          <li>
            🟡 <strong>HERO-06 — Copy/Hierarquia tipográfica desatualizada</strong> —
            desalinhamento com a mensagem final aprovada.
          </li>
          <li>
            🟢 <strong>HERO-07 — Fundo sem radial-gradient dedicado</strong> — detalhe
            estético de refinamento.
          </li>
          <li>
            🔴 <strong>HEADER-01 — Header fluid glass ausente/incompleto</strong> —
            compromete a proporção Header ↔ Hero e o sistema de navegação.
          </li>
          <li>
            🔴 <strong>HEADER-02 — Menu mobile sem overlay staggered/a11y</strong> — quebra
            a experiência em telas menores e o padrão de navegação global.
          </li>
        </ul>
      </section>

      {/* 4️⃣ Prompts Técnicos */}
      <section className="space-y-6">
        <h2 className="text-lg font-semibold">4️⃣ Prompts Técnicos para Agente Executor</h2>

        {/* Prompt 01 */}
        <article className="space-y-2">
          <h3 className="font-semibold">
            🛠️ Prompt #01 — HeroCopy estático (remover fade de scroll)
          </h3>
          <p>
            <strong>Objetivo</strong>
            <br />
            Garantir que o bloco editorial da Hero fique 100% estático, sem qualquer
            animação de entrada/saída ou binding com o scroll.
          </p>
          <p>
            <strong>Arquivos envolvidos</strong>
            <br />- <code>components/home/HomeHero.tsx</code>
            <br />- <code>components/home/HeroCopy.tsx</code>
          </p>
          <p>
            <strong>Ações</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Em <code>HomeHero.tsx</code>, substituir o <code>motion.div</code> que
              envolve o <code>&lt;HeroCopy /&gt;</code> por um <code>div</code> estático
              ou remover o estilo <code>style={{ opacity: opacityText }}</code>, mantendo
              o texto sempre opaco (<code>opacity: 1</code>).
            </li>
            <li>
              Manter o uso de <code>useScroll</code> apenas para o vídeo manifesto (thumb
              → fullscreen), não para o texto.
            </li>
            <li>
              Confirmar que <code>HeroCopy.tsx</code> não utiliza Framer Motion — o
              componente deve ser apenas JSX estático.
            </li>
          </ol>
          <p>
            <strong>Regras</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>❌ Não animar o texto editorial em opacity, translate ou scale.</li>
            <li>❌ Não adicionar novos efeitos de entrada.</li>
            <li>✅ Manter o texto centralizado conforme layout.</li>
          </ul>
          <p>
            <strong>Critérios de Aceite</strong>
          </p>
          <ul className="list-none space-y-1 pl-0">
            <li>□ Texto da Hero permanece visível e estático em todo o scroll da seção.</li>
            <li>□ Nenhuma animação de opacity/transform aplicada ao bloco editorial.</li>
            <li>□ Layout 1:1 com a referência HOME-PORTFOLIO-LAYOUYT-GHOST.jpg.</li>
          </ul>
        </article>

        {/* Prompt 02 */}
        <article className="space-y-2">
          <h3 className="font-semibold">
            🛠️ Prompt #02 — Container sticky da Hero + vídeo manifesto fixo
          </h3>
          <p>
            <strong>Objetivo</strong>
            <br />
            Reestruturar a Hero para usar um container <code>sticky</code> e transformar o
            vídeo manifesto em elemento fixo na viewport, permitindo o morph thumb →
            fullscreen dentro de um bloco de 200vh.
          </p>
          <p>
            <strong>Arquivos envolvidos</strong>
            <br />- <code>components/home/HomeHero.tsx</code>
          </p>
          <p>
            <strong>Ações</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Garantir que o <code>&lt;section&gt;</code> da Hero tenha{' '}
              <code>className="relative h-[200vh] bg-[#06071f] overflow-hidden"</code>.
            </li>
            <li>
              Dentro da seção, criar um wrapper{' '}
              <code>div</code> com <code>className="sticky top-0 h-screen"</code> que
              envolva GhostStage, HeroCopy e ManifestoThumb.
            </li>
            <li>
              Alterar o container do vídeo manifesto para usar{' '}
              <code>fixed bottom-6 right-6 md:right-10 z-30</code> (em vez de{' '}
              <code>absolute</code>), mantendo <code>w-[30vw]</code> e{' '}
              <code>aspect-video</code>.
            </li>
            <li>
              Manter o uso de <code>useScroll</code> com <code>scrollYProgress</code> para
              dirigir <code>scale</code>, <code>y</code> e <code>borderRadius</code> do
              vídeo, mas agora com o elemento fixo.
            </li>
          </ol>
          <p>
            <strong>Regras</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>
              ✅ O vídeo deve permanecer visível na viewport enquanto a Hero estiver
              ativa.
            </li>
            <li>
              ❌ Não mover o texto editorial para fora do centro da Hero durante o morph.
            </li>
          </ul>
          <p>
            <strong>Critérios de Aceite</strong>
          </p>
          <ul className="space-y-1">
            <li>□ Ao rolar de 0% a 100% da Hero, o vídeo sai de thumb e chega a fullscreen.</li>
            <li>□ O texto editorial some apenas por cobertura do vídeo, não por fade.</li>
            <li>□ A próxima seção só começa a subir após o morph completo.</li>
          </ul>
        </article>

        {/* Prompt 03 */}
        <article className="space-y-2">
          <h3 className="font-semibold">
            🛠️ Prompt #03 — Estado fullscreenHold + lógica de áudio do manifesto
          </h3>
          <p>
            <strong>Objetivo</strong>
            <br />
            Implementar a máquina de estados do manifesto no desktop (thumbnail → transition
            → fullscreenHold → released), com hold de 2s em fullscreen e controle de áudio
            conforme a especificação.
          </p>
          <p>
            <strong>Arquivos envolvidos</strong>
            <br />- <code>components/home/HomeHero.tsx</code>
            <br />- <code>components/home/ManifestoThumb.tsx</code>
          </p>
          <p>
            <strong>Ações</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Em <code>HomeHero.tsx</code>, criar estados locais (
              <code>isFullscreenHold</code>, <code>hasReachedEnd</code>) e usar{' '}
              <code>useMotionValueEvent(scrollYProgress, 'change')</code> para detectar
              quando <code>scrollYProgress</code> atingir ~1.0.
            </li>
            <li>
              Ao entrar em <em>fullscreenHold</em>:
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Setar <code>document.body.style.overflow = 'hidden'</code>.</li>
                <li>
                  Chamar um método exposto por <code>ManifestoThumb</code> (
                  <code>setMuted(false)</code>) via <code>ref</code> para unmutar o vídeo.
                </li>
                <li>
                  Iniciar um <code>setTimeout</code> de 2000ms; ao terminar, restaurar o
                  <code>overflow</code> do body, sair de fullscreenHold e voltar a mutar o
                  vídeo.
                </li>
              </ul>
            </li>
            <li>
              Em <code>ManifestoThumb.tsx</code>, transformar o componente em{' '}
              <code>forwardRef</code> e expor <code>setMuted(muted: boolean)</code> via{' '}
              <code>useImperativeHandle</code>, chamando <code>videoRef.current.muted</code>{' '}
              e <code>play()</code> quando necessário.
            </li>
            <li>
              Implementar clique na thumb (desktop) para acionar diretamente o estado de
              fullscreenHold, sem depender apenas do scroll.
            </li>
            <li>
              Garantir que, ao sair da Hero (scrollYProgress &lt; 0.01 ou &gt; 1.05), o
              vídeo volte a ficar <code>muted</code>.
            </li>
          </ol>
          <p>
            <strong>Regras</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>✅ Áudio só pode tocar no estado fullscreenHold.</li>
            <li>✅ Sempre mutar o vídeo em thumb/transition e ao sair da Hero.</li>
            <li>✅ Respeitar <code>prefers-reduced-motion</code> desabilitando o hold.</li>
          </ul>
          <p>
            <strong>Critérios de Aceite</strong>
          </p>
          <ul className="space-y-1">
            <li>□ Ao atingir o fim da Hero, o scroll “trava” por ~2s com vídeo fullscreen.</li>
            <li>□ O áudio só é audível durante esse hold.</li>
            <li>□ Ao descer para a próxima seção ou subir de volta, o vídeo volta a ficar mudo.</li>
          </ul>
        </article>

        {/* Prompt 04 */}
        <article className="space-y-2">
          <h3 className="font-semibold">
            🛠️ Prompt #04 — Microanimações do Preloader (Ghost Loader)
          </h3>
          <p>
            <strong>Objetivo</strong>
            <br />
            Tornar o Preloader fiel ao “Ghost Loader”: ghost flutuando, texto pulsando e
            barra de progresso com gradient, tudo com motion sutil e editorial.
          </p>
          <p>
            <strong>Arquivos envolvidos</strong>
            <br />- <code>components/home/Preloader.tsx</code>
          </p>
          <p>
            <strong>Ações</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Envolver o <code>&lt;svg&gt;</code> do ghost em um{' '}
              <code>&lt;motion.svg&gt;</code> com animação de flutuação (
              <code>y: [0, -8, 0]</code>, <code>opacity: [1, 0.9, 1]</code>, duração
              ~2.2s, loop infinito).
            </li>
            <li>
              Aplicar pulsação sutil no texto “Summoning spirits” usando{' '}
              <code>&lt;motion.p&gt;</code> com <code>opacity</code> oscilando entre 0.6 e
              1.
            </li>
            <li>
              Manter a barra de progresso como <code>motion.div</code> com largura de 0 →
              100% em ~2s, alinhado à duração do preloader.
            </li>
            <li>
              Respeitar <code>prefers-reduced-motion</code>: quando ativo, manter apenas o
              fade-out global, sem animações de y/opacity contínuas.
            </li>
          </ol>
          <p>
            <strong>Regras</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>❌ Não adicionar novos elementos visuais.</li>
            <li>✅ Motion deve ser sutil, sem overshoot agressivo.</li>
          </ul>
          <p>
            <strong>Critérios de Aceite</strong>
          </p>
          <ul className="space-y-1">
            <li>□ Ghost flutua suavemente durante o preload.</li>
            <li>□ Texto “Summoning spirits” pulsa de forma discreta.</li>
            <li>□ Preloader some com fade-out após ~1.5–2.5s.</li>
          </ul>
        </article>

        {/* Prompt 05 */}
        <article className="space-y-2">
          <h3 className="font-semibold">
            🛠️ Prompt #05 — Atualizar copy e tipografia do HeroCopy
          </h3>
          <p>
            <strong>Objetivo</strong>
            <br />
            Sincronizar o conteúdo textual e a hierarquia tipográfica do HeroCopy com a
            especificação 2.0.
          </p>
          <p>
            <strong>Arquivos envolvidos</strong>
            <br />- <code>components/home/HeroCopy.tsx</code>
          </p>
          <p>
            <strong>Ações</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Ajustar o conteúdo para:
              <ul className="mt-1 list-disc space-y-1 pl-5">
                <li>Tag: <code>[BRAND AWARENESS]</code> (font-mono, 12px, uppercase).</li>
                <li>H1: “Você não vê o design.”</li>
                <li>H2: “Mas ele vê você.”</li>
                <li>Subcopy: “[É intenção, é estratégia, é experiência.]” (opcional).</li>
                <li>CTA: “step inside →” apontando para <code>/sobre</code>.</li>
              </ul>
            </li>
            <li>
              Garantir tamanhos: H1/H2 entre 4rem–6rem em desktop, tag com 12px mono e
              CTA com ~0.9rem uppercase e <code>tracking-wide</code>.
            </li>
          </ol>
          <p>
            <strong>Regras</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>❌ Não inventar nova copy.</li>
            <li>✅ Usar apenas o texto aprovado na documentação.</li>
          </ul>
          <p>
            <strong>Critérios de Aceite</strong>
          </p>
          <ul className="space-y-1">
            <li>□ Texto do Hero bate 1:1 com a especificação 2.0.</li>
            <li>□ Escala tipográfica preserva a hierarquia editorial desejada.</li>
          </ul>
        </article>

        {/* Prompt 06 */}
        <article className="space-y-2">
          <h3 className="font-semibold">
            🛠️ Prompt #06 — ManifestoSection mobile fullscreen abaixo da Hero
          </h3>
          <p>
            <strong>Objetivo</strong>
            <br />
            Garantir que, em mobile, o manifesto seja apresentado como uma seção independente,
            fullscreen, logo abaixo da Hero.
          </p>
          <p>
            <strong>Arquivos envolvidos</strong>
            <br />- <code>components/home/ManifestoSection.tsx</code>
            <br />- <code>app/page.tsx</code> (ou equivalente da Home)
          </p>
          <p>
            <strong>Ações</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Implementar <code>ManifestoSection</code> conforme spec (usando{' '}
              <code>motion.section</code> + <code>useInView</code> para fade/scale de
              entrada) com <code>className="block md:hidden w-full bg-[#06071f]"</code> e
              <code>aspect-video</code>.
            </li>
            <li>
              Na página da Home (<code>app/page.tsx</code>), renderizar{' '}
              <code>&lt;ManifestoSection /&gt;</code> logo após <code>&lt;HomeHero /&gt;</code>.
            </li>
            <li>
              Implementar botão/ícone para toggle de som (mute/unmute) no mobile e garantir
              que, ao sair da seção (fora de view), o vídeo volte a ficar mudo.
            </li>
          </ol>
          <p>
            <strong>Regras</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>✅ Mesmo vídeo, cor de fundo e atmosfera da Hero.</li>
            <li>❌ Nada de overlay de texto sobre o vídeo.</li>
          </ul>
          <p>
            <strong>Critérios de Aceite</strong>
          </p>
          <ul className="space-y-1">
            <li>□ Em mobile, o manifesto aparece como seção fullscreen logo abaixo da Hero.</li>
            <li>□ Não há thumb flutuante em mobile (apenas a seção fullscreen).</li>
          </ul>
        </article>

        {/* Prompt 07 */}
        <article className="space-y-2">
          <h3 className="font-semibold">
            🛠️ Prompt #07 — GhostStage com dynamic import e fallback radial
          </h3>
          <p>
            <strong>Objetivo</strong>
            <br />
            Converter o GhostStage em camada WebGL client-only, com fallback em gradiente
            radial quando WebGL estiver desativado ou quando{' '}
            <code>prefers-reduced-motion</code> estiver ativo.
          </p>
          <p>
            <strong>Arquivos envolvidos</strong>
            <br />- <code>components/home/GhostStage.tsx</code>
            <br />- <code>components/home/webgl/GhostCanvas.tsx</code>
          </p>
          <p>
            <strong>Ações</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Em <code>GhostStage.tsx</code>, usar <code>next/dynamic</code> para carregar{' '}
              <code>GhostCanvas</code> com <code>ssr: false</code> e um fallback em{' '}
              <code>&lt;div className="bg-[radial-gradient(circle,#0b0d3a,#06071f)]"&gt;</code>.
            </li>
            <li>
              Adicionar detecção de <code>prefers-reduced-motion</code> via{' '}
              <code>window.matchMedia</code> ou <code>useReducedMotion</code> e, quando
              ativo, renderizar apenas o gradiente radial.
            </li>
          </ol>
          <p>
            <strong>Regras</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>✅ WebGL é camada atmosférica, nunca crítica para o conteúdo.</li>
          </ul>
          <p>
            <strong>Critérios de Aceite</strong>
          </p>
          <ul className="space-y-1">
            <li>□ Site continua funcional se o Canvas falhar.</li>
            <li>□ Usuários com motion reduzido veem apenas gradiente estático.</li>
          </ul>
        </article>

        {/* Prompt 08 */}
        <article className="space-y-2">
          <h3 className="font-semibold">
            🛠️ Prompt #08 — Header fluid glass (desktop) alinhado ao Hero
          </h3>
          <p>
            <strong>Objetivo</strong>
            <br />
            Implementar o Header “fluid glass” centralizado, sticky e com motion reativo
            ao cursor, sem competir com o Hero.
          </p>
          <p>
            <strong>Arquivos envolvidos</strong>
            <br />- <code>components/layout/Header.tsx</code> (ou equivalente)
          </p>
          <p>
            <strong>Ações</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Criar container sticky com{' '}
              <code>className="sticky top-0 z-40 flex justify-center pt-4"</code>.
            </li>
            <li>
              Dentro, renderizar o pill (<code>nav</code>) com{' '}
              <code>max-w-[1680px]</code>, <code>px-[clamp(24px,5vw,96px)]</code>,{' '}
              <code>rounded-full</code>, <code>backdrop-blur</code> e gradiente sutil.
            </li>
            <li>
              Usar Framer Motion para aplicar leve deslocamento/escala em função do cursor
              (e.g. <code>useMotionValue</code> + <code>useSpring</code>), respeitando os
              limites definidos na documentação.
            </li>
          </ol>
          <p>
            <strong>Regras</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>❌ Não ocupar 100% da largura em desktop.</li>
            <li>✅ Manter o Hero como foco visual principal.</li>
          </ul>
          <p>
            <strong>Critérios de Aceite</strong>
          </p>
          <ul className="space-y-1">
            <li>□ Header reproduz o pill centralizado da referência 1:1.</li>
            <li>□ Movimento do header é sutil e editorial.</li>
          </ul>
        </article>

        {/* Prompt 09 */}
        <article className="space-y-2">
          <h3 className="font-semibold">
            🛠️ Prompt #09 — Header mobile com overlay staggered e acessível
          </h3>
          <p>
            <strong>Objetivo</strong>
            <br />
            Implementar o comportamento mobile do Header com menu overlay fullscreen,
            animação staggered e acessibilidade completa.
          </p>
          <p>
            <strong>Arquivos envolvidos</strong>
            <br />- <code>components/layout/Header.tsx</code> (ou equivalente)
          </p>
          <p>
            <strong>Ações</strong>
          </p>
          <ol className="list-decimal space-y-1 pl-5">
            <li>
              Em breakpoints ≤1023px, exibir apenas logo + ícone de menu em uma barra fixa
              full-width.
            </li>
            <li>
              Criar overlay <code>motion.div</code> fullscreen com fundo em gradiente
              (primary → neutral) e lista de links em coluna, usando stagger para entrada.
            </li>
            <li>
              Adicionar estado <code>isOpen</code> e toggles no ícone (hamburger → X),
              com <code>aria-expanded</code> e <code>aria-label</code>.
            </li>
            <li>
              Implementar trap de foco e fechar o menu com ESC e clique fora.
            </li>
          </ol>
          <p>
            <strong>Regras</strong>
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>✅ Animação suave, sem overshoot agressivo.</li>
            <li>✅ Overlay nunca deve competir com o Hero (abre por intenção do usuário).</li>
          </ul>
          <p>
            <strong>Critérios de Aceite</strong>
          </p>
          <ul className="space-y-1">
            <li>□ Navegação mobile funciona apenas dentro do overlay.</li>
            <li>□ Todos os links são acessíveis por teclado com foco visível.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
