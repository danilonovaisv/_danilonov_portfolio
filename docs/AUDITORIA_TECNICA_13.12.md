
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


A) Causa raiz (hipóteses priorizadas) + como validar
Deploy apontando para a pasta errada / artefato antigo (out/ não regenerado).

Sinal clássico: build roda, mas o output publicado não muda.

Confirmar: ls -la out/ antes do deploy e veja se timestamps mudam; rode rm -rf out .next e gere de novo.

HTML cacheado (Firebase/CDN/browser) ou SW/PWA servindo HTML antigo.

Confirmar: curl -I https://portfoliodanilo.com/ e verificar Cache-Control / Age. Testar aba anônima e “Disable cache” no DevTools.

Deploy no projeto/site errado (múltiplos Firebase projects/sites/targets).

Confirmar: firebase use e firebase hosting:sites:list (ou checar --project no CI).

Pipeline/CI usando branch errada ou reaproveitando artifact/cache.

Confirmar: comparar SHA do commit no CI com o que está em build-info.json.

B) Mudanças aplicadas
next.config.js: adiciona output: 'export', mantém trailingSlash: true (visto no seu config atual) 
‌

firebase.json: public: "out" + headers para não cachear HTML e cache longo para assets imutáveis

scripts/generate-build-info.cjs: gera public/build-info.json

app/build/*: rota de diagnóstico /build/ (carimbo de build)

C) Passo a passo de deploy e validação (P0)
Garanta que o build sempre gera artefato novo:

rm -rf out .next

node scripts/generate-build-info.cjs

npm run build

Deploy:

firebase deploy --only hosting --project portfolio-danilo-novais

Validação objetiva:

Abrir https://SEU_DOMINIO/build/ e confirmar que buildTime muda a cada deploy.

Verificar headers:

curl -I https://SEU_DOMINIO/ | grep -i cache-control

curl -I https://SEU_DOMINIO/build/ | grep -i cache-control

curl -I https://SEU_DOMINIO/build-info.json | grep -i cache-control

D) Testes visuais/responsividade + A11y
Desktop 1280 / 1440+: layout centralizado, sem overflow horizontal

Mobile 320 / 375 / 414: tipografia quebra corretamente, cards em 1 coluna

Acessibilidade:

foco visível no botão “copiar”

headings em ordem (h1/h2)

contraste (texto white/70 sobre bg escuro)

E) Melhorias extras (sem atrapalhar P0)
Se existir PWA/SW: manter no-store para sw.js/service-worker.js via firebase.json (já incluído).

Se quiser “prova” no footer do site: incluir link para /build/ só em ambiente interno (opcional).

// FILE: next.config.js
/**
 * @type {import('next').NextConfig}
 *
 * P0 (deploy “antigo”): quando o Firebase Hosting aponta para uma pasta estática (ex.: `out/`),
 * mas o build NÃO está regenerando essa pasta (ou está gerando em outro lugar), o deploy
 * reaproveita artefatos antigos e parece “preso” numa versão anterior.
 *
 * Assumido: você está usando Firebase Hosting “static” (sem SSR via Functions/frameworks).
 * Se você estiver usando SSR no Firebase, NÃO aplique `output: 'export'` — me envie seu
 * firebase.json atual para ajustar com rewrites/frameworksBackend.
 *
 * Observação: existe um next.config.js no contexto com `trailingSlash: true`  :OaiMdDirective_Annotations_fq44m{attrs="eyJpbmRleCI6MH0"}
 * (mantido abaixo).
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,

  /**
   * `next/image` otimiza imagens em runtime (precisa de servidor).
   * Em static export, desabilitamos para evitar inconsistência e erros de deploy.
   */
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

// ============================================================================
// FILE: firebase.json
/**
 * P0 (cache): garantir que HTML não fique cacheado agressivamente (causa comum de “site antigo”)
 * e que assets com hash/versionados possam ficar em cache longo com segurança.
 *
 * Referência de comportamento desejado: assets imutáveis podem ser cacheados longamente,
 * já HTML deve revalidar (Next documenta esse padrão de caching/immutability)  :OaiMdDirective_Annotations_fq44m{attrs="eyJpbmRleCI6MX0"}
 */
{
  "hosting": {
    "public": "out",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "headers": [
      {
        "source": "**/*.html",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
        ]
      },
      {
        "source": "build-info.json",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
        ]
      },

      // Se existir PWA/service worker no projeto, estes headers ajudam a evitar “stale HTML”
      {
        "source": "service-worker.js",
        "headers": [
          { "key": "Cache-Control", "value": "no-store, max-age=0" }
        ]
      },
      {
        "source": "sw.js",
        "headers": [
          { "key": "Cache-Control", "value": "no-store, max-age=0" }
        ]
      },
      {
        "source": "workbox-*.js",
        "headers": [
          { "key": "Cache-Control", "value": "no-store, max-age=0" }
        ]
      },

      // Assets do Next com hash (seguro cache longo)
      {
        "source": "_next/static/**",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      },

      // Assets estáticos (inclui glb/gltf/hdr etc para R3F/Three)
      {
        "source": "**/*.{js,css,ico,png,jpg,jpeg,gif,webp,svg,woff,woff2,ttf,eot,otf,glb,gltf,bin,hdr,mp4,webm}",
        "headers": [
          { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
        ]
      }
    ]
  }
}

// ============================================================================
// FILE: scripts/generate-build-info.cjs
/**
 * Gera um “build stamp” para confirmar (sem achismo) qual build está no ar.
 * Saída: public/build-info.json (fácil de verificar via browser/curl).
 */
const fs = require('fs')
const path = require('path')

function pickSha() {
  return (
    process.env.GITHUB_SHA ||
    process.env.NEXT_PUBLIC_GIT_SHA ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.CF_PAGES_COMMIT_SHA ||
    ''
  )
}

function main() {
  const sha = pickSha()
  const shortSha = sha ? sha.slice(0, 7) : ''
  const iso = new Date().toISOString()

  const buildInfo = {
    buildTimeISO: iso,
    gitSha: sha,
    gitShaShort: shortSha,
    nodeEnv: process.env.NODE_ENV || '',
  }

  const publicDir = path.join(process.cwd(), 'public')
  const outFile = path.join(publicDir, 'build-info.json')

  fs.mkdirSync(publicDir, { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(buildInfo, null, 2) + '\n', 'utf8')

  // eslint-disable-next-line no-console
  console.log('[build-info] wrote', outFile)
  // eslint-disable-next-line no-console
  console.log('[build-info]', buildInfo)
}

main()

// ============================================================================
// FILE: app/build/BuildInfoClient.tsx
'use client'

import * as React from 'react'

type BuildInfo = {
  buildTimeISO?: string
  gitSha?: string
  gitShaShort?: string
  nodeEnv?: string
}

async function fetchBuildInfo(): Promise<BuildInfo> {
  // Cache-busting + no-store evita respostas “stale” do browser/CDN.
  const res = await fetch(`/build-info.json?t=${Date.now()}`, { cache: 'no-store' })
  if (!res.ok) return {}
  return (await res.json()) as BuildInfo
}

export default function BuildInfoClient() {
  const [info, setInfo] = React.useState<BuildInfo | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true

    fetchBuildInfo()
      .then((data) => {
        if (!mounted) return
        setInfo(data)
      })
      .catch((e: unknown) => {
        if (!mounted) return
        setError(e instanceof Error ? e.message : 'Erro ao carregar build-info.json')
      })

    return () => {
      mounted = false
    }
  }, [])

  const buildTime = info?.buildTimeISO ? new Date(info.buildTimeISO) : null
  const buildTimeLocal = buildTime
    ? buildTime.toLocaleString(undefined, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : '—'

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10">
      <h1 className="text-balance text-2xl font-semibold tracking-tight text-white">
        Build / Deploy stamp
      </h1>

      <p className="mt-2 text-sm leading-relaxed text-white/70">
        Use esta página para confirmar objetivamente se o Firebase está servindo o build mais recente
        (e se o HTML não está cacheado indevidamente).
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        {error ? (
          <div className="text-sm text-red-200">
            <p className="font-medium">Falha ao carregar build-info.json</p>
            <p className="mt-1 opacity-80">{error}</p>
          </div>
        ) : !info ? (
          <div className="text-sm text-white/70">Carregando…</div>
        ) : (
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-wide text-white/50">buildTime (local)</dt>
              <dd className="mt-1 font-mono text-sm text-white">{buildTimeLocal}</dd>
            </div>

            <div>
              <dt className="text-xs uppercase tracking-wide text-white/50">buildTime (ISO)</dt>
              <dd className="mt-1 font-mono text-sm text-white">{info.buildTimeISO || '—'}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-white/50">git sha</dt>
              <dd className="mt-1 flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm text-white">{info.gitSha || '—'}</span>

                {info.gitSha ? (
                  <button
                    type="button"
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
                    onClick={async () => {
                      await navigator.clipboard.writeText(info.gitSha || '')
                    }}
                  >
                    copiar
                  </button>
                ) : null}
              </dd>
            </div>
          </dl>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-sm font-medium text-white">Checklist rápido</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/70">
          <li>
            Se você fizer um deploy agora, o campo <span className="font-mono">buildTime</span>{' '}
            precisa mudar imediatamente.
          </li>
          <li>
            O HTML deve responder com{' '}
            <span className="font-mono">Cache-Control: max-age=0, must-revalidate</span>.
          </li>
          <li>
            Assets em <span className="font-mono">/_next/static/</span> podem (e devem) ficar em cache
            longo.
          </li>
        </ul>
      </div>
    </section>
  )
}

// ============================================================================
// FILE: app/build/page.tsx
import BuildInfoClient from './BuildInfoClient'

export default function BuildPage() {
  return (
    <main className="min-h-dvh bg-[#0B0B0F] text-white">
      <BuildInfoClient />
    </main>
  )
}

// ============================================================================
// FILE: (opcional) .gitignore (adicione estas linhas)
/**
public/build-info.json
**/
