module.exports = [
  49569,
  (e, t, a) => {
    'use strict';
    t.exports = e.r(21396).vendored['react-rsc'].ReactServerDOMTurbopackServer;
  },
  69916,
  (e, t, a) => {
    'use strict';
    (Object.defineProperty(a, '__esModule', { value: !0 }),
      Object.defineProperty(a, 'registerServerReference', {
        enumerable: !0,
        get: function () {
          return i.registerServerReference;
        },
      }));
    let i = e.r(49569);
  },
  98135,
  (e) => {
    'use strict';
    var t = e.i(9354),
      a = e.i(21800),
      i = e.i(86681),
      r = e.i(79208),
      o = e.i(24626),
      n = e.i(63124),
      s = e.i(46592),
      l = e.i(98251),
      d = e.i(78661),
      c = e.i(19213),
      u = e.i(73489),
      p = e.i(10474),
      m = e.i(20287),
      g = e.i(67494),
      h = e.i(48372),
      b = e.i(93695);
    e.i(70905);
    var f = e.i(18373),
      v = e.i(24982),
      w = e.i(83195);
    let y = (e) => (0, w.buildSupabaseStorageUrl)('site-assets', e),
      R = (e) => (0, w.buildSupabaseStorageUrl)('portfolio-media', e),
      _ = (e) => (0, w.buildSupabaseStorageUrl)('project-videos', e),
      x = {
        hero: {
          tag: '[BRAND AWARENESS]',
          title: ['Você não vê o design.'],
          subtitle: 'Mas ele vê você.',
          cta: 'step inside',
        },
        showcase: {
          title: 'portfólio showcase',
          floatingLabel: '[what we love working on]',
          cta: { label: 'let’s build something great →', href: '/#contact' },
          ctas: [
            { label: 'Fale Comigo', href: '#contact', variant: 'primary' },
            {
              label: 'Download CV',
              href: '/cv-danilo-novais.pdf',
              variant: 'secondary',
              download: !0,
              external: !0,
            },
          ],
          categories: [
            {
              id: 'brand-campaigns',
              label: 'Brand & Campaigns',
              titleDesktop: 'Brand & Campaigns',
              titleMobile: 'Brand &\nCampaigns',
              align: 'end',
              thumb: y('home/showcase/Branding-Project.webp'),
            },
            {
              id: 'videos-motions',
              label: 'Videos & Motion',
              titleDesktop: 'Videos & Motion',
              titleMobile: 'Videos &\nMotion',
              align: 'center',
              thumb: y('home/showcase/Key-Visual.webp'),
            },
            {
              id: 'websites-webcampaigns-tech',
              label: 'Web Campaigns, Websites & Tech',
              titleDesktop: 'Web Campaigns,\nWebsites & Tech',
              titleMobile: 'Web Campaigns,\nWebsites & Tech',
              align: 'start',
              thumb: y('home/showcase/webdesigner-2.gif'),
            },
          ],
        },
        featuredProjects: [
          {
            id: 1,
            slug: 'magic-radio-branding',
            title: 'Magic — devolvendo a magia ao rádio',
            category: 'branding & campanha',
            client: 'Magic',
            year: 2023,
            tags: ['Branding', 'Campaign'],
            img: R('projects/creative-direction/hero.webp'),
            layout: {
              h: 'min-h-[400px] md:h-[500px] aspect-[4/5] md:aspect-auto',
              cols: 'md:col-span-5',
              sizes: '(max-width: 1024px) 100vw, 42vw',
            },
          },
          {
            id: 2,
            slug: 'branding-project-01',
            title: 'Uma marca ousada e consistente',
            category: 'Branding',
            client: 'Cliente confidencial',
            year: 2022,
            tags: ['Strategy', 'Identity'],
            img: R('projects/campaign/hero.webp'),
            layout: {
              h: 'min-h-[400px] md:h-[500px] aspect-[4/5] md:aspect-auto',
              cols: 'md:col-span-7',
              sizes: '(max-width: 1024px) 100vw, 58vw',
            },
          },
          {
            id: 3,
            slug: 'key-visual-campaign',
            title: 'Key visual para campanha sazonal',
            category: 'Campanha',
            client: 'Cliente confidencial',
            year: 2021,
            tags: ['Art Direction'],
            img: R('projects/key-vision/gallery/converted-5-webp.webp'),
            layout: {
              h: 'min-h-[400px] md:h-[600px]',
              cols: 'md:col-span-12',
              sizes: '100vw',
            },
          },
          {
            id: 4,
            slug: 'webdesigner-motion',
            title: 'Experiência web em movimento',
            category: 'Web & Motion',
            client: 'Cliente confidencial',
            year: 2023,
            tags: ['UX/UI', 'Animation'],
            img: R('projects/key_vision/hero.webp'),
            layout: {
              h: 'min-h-[400px] md:h-[400px] aspect-video md:aspect-auto',
              cols: 'md:col-span-8',
              sizes: '(max-width: 1024px) 100vw, 66vw',
            },
          },
        ],
        clients: {
          title: 'marcas com as quais já trabalhei',
          logos: Array.from({ length: 12 }, (e, t) => ({
            id: t + 1,
            src: y(`clients/clients.strip.${t + 1}.svg`),
            alt: `Logo do cliente ${t + 1}`,
          })),
        },
        contact: {
          title: 'contato',
          subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
        },
      };
    (y('about/hero/about.hero.desktop_video.mp4'),
      y('about/hero/about.hero.mobile_video.mp4'),
      y('about/origin/about.origin_image.1.webp'),
      y('about/origin/about.origin_image.2.webp'),
      y('about/origin/about.origin_image.3.webp'),
      y('about/origin/about.origin_image.4.webp'),
      y('about/method/about.method.desktop_video.mp4'),
      y('about/method/about.method.mobile_video.mp4'),
      _('video-heroPort.mp4'),
      _('video-heroPort-mobile.mp4'));
    var C = e.i(23856),
      E = e.i(80248),
      A = e.i(69916);
    e.i(74157);
    var S = e.i(69460),
      P = e.i(69691);
    async function T() {
      let e;
      try {
        e = await (0, P.cookies)();
      } catch {}
      return (0, S.createServerClient)(
        'https://umkmwbkwvulxtdodzmzf.supabase.co',
        'sb_publishable_lW8dC02qgDYiYxBfHGr54A_X1-D-NQ4',
        {
          cookieOptions: { name: '__session', sameSite: 'lax', secure: !0 },
          cookies: {
            getAll: () => e?.getAll() ?? [],
            setAll(t) {
              try {
                t.forEach(({ name: t, value: a, options: i }) =>
                  e?.set(t, a, i)
                );
              } catch {}
            },
          },
        }
      );
    }
    async function k(e = {}, t) {
      let a = (t ?? (await T()))
        .from('portfolio_projects')
        .select(
          '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind)), landing_page:landing_pages(slug)'
        )
        .order('featured_portfolio_order', { ascending: !0, nullsFirst: !1 });
      (e.includeUnpublished || (a = a.eq('is_published', !0)),
        e.tagSlug && (a = a.eq('tags.tag.slug', e.tagSlug)),
        e.year && (a = a.eq('year', e.year)),
        e.search &&
          (a = a.or(
            `title.ilike.%${e.search}%,client_name.ilike.%${e.search}%`
          )),
        e.featuredOnHome && (a = a.eq('featured_on_home', !0)),
        e.featuredOnPortfolio && (a = a.eq('featured_on_portfolio', !0)));
      let { data: i, error: r } = await a.returns();
      if (r) throw r;
      return i;
    }
    let D = async function (e) {
      let t = e.get('id'),
        a = 'true' === e.get('nextStatus'),
        i = await T(),
        { error: r } = await i
          .from('portfolio_projects')
          .update({ is_published: a })
          .eq('id', t);
      if (r) throw r;
    };
    (0, A.registerServerReference)(
      D,
      '40c3fbb7e06034faa0281bd0d716d436d9b115300d',
      null
    );
    let N = 'force-static';
    async function q() {
      let e = `https://${C.BRAND.domain}`,
        t = [];
      try {
        let a = (function () {
          if (process.env.PLAYWRIGHT_TEST) {
            let e = {
              eq: () => e,
              order: () => e,
              limit: () => e,
              returns: () => Promise.resolve({ data: [], error: null }),
              select: () => e,
              single: () => Promise.resolve({ data: null, error: null }),
            };
            return {
              from: () => e,
              storage: {
                from: () => ({
                  getPublicUrl: () => ({ data: { publicUrl: '' } }),
                }),
              },
            };
          }
          let e = 'https://umkmwbkwvulxtdodzmzf.supabase.co',
            t =
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
              'sb_publishable_lW8dC02qgDYiYxBfHGr54A_X1-D-NQ4';
          if (!e || !t) throw Error('Missing Supabase environment variables');
          return (0, E.createClient)(e, t, { auth: { persistSession: !1 } });
        })();
        t = (await k({}, a)).map((t) => ({
          url: `${e}/portfolio/${t.slug}`,
          lastModified: new Date(t.updated_at || new Date()),
          changeFrequency: 'monthly',
          priority: 0.7,
        }));
      } catch (a) {
        (console.warn(
          'Sitemap: Error fetching projects from Supabase, using fallback.',
          a
        ),
          (t = x.featuredProjects.map((t) => ({
            url: `${e}/portfolio/${t.slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
          }))));
      }
      return [
        {
          url: e,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 1,
        },
        {
          url: `${e}/portfolio`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.9,
        },
        {
          url: `${e}/sobre`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        ...t,
      ];
    }
    e.s(['default', () => q, 'dynamic', 0, N], 63034);
    var M = e.i(50998);
    async function O() {
      let e = await q(),
        t = (0, M.resolveRouteData)(e, 'sitemap');
      return new v.NextResponse(t, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=0, must-revalidate',
        },
      });
    }
    (e.s(['GET', () => O], 79512),
      e.i(79512),
      e.i(63034),
      e.s(['GET', () => O, 'dynamic', 0, N], 87576));
    var U = e.i(87576);
    let j = new t.AppRouteRouteModule({
        definition: {
          kind: a.RouteKind.APP_ROUTE,
          page: '/sitemap.xml/route',
          pathname: '/sitemap.xml',
          filename: 'sitemap--route-entry',
          bundlePath: '',
        },
        distDir: '.next',
        relativeProjectDir: '',
        resolvedPagePath: '[project]/src/app/sitemap--route-entry.js',
        nextConfigOutput: '',
        userland: U,
      }),
      { workAsyncStorage: H, workUnitAsyncStorage: $, serverHooks: I } = j;
    function B() {
      return (0, i.patchFetch)({
        workAsyncStorage: H,
        workUnitAsyncStorage: $,
      });
    }
    async function F(e, t, i) {
      j.isDev &&
        (0, r.addRequestMeta)(
          e,
          'devRequestTimingInternalsEnd',
          process.hrtime.bigint()
        );
      let v = '/sitemap.xml/route';
      v = v.replace(/\/index$/, '') || '/';
      let w = await j.prepare(e, t, { srcPage: v, multiZoneDraftMode: !1 });
      if (!w)
        return (
          (t.statusCode = 400),
          t.end('Bad Request'),
          null == i.waitUntil || i.waitUntil.call(i, Promise.resolve()),
          null
        );
      let {
          buildId: y,
          params: R,
          nextConfig: _,
          parsedUrl: x,
          isDraftMode: C,
          prerenderManifest: E,
          routerServerContext: A,
          isOnDemandRevalidate: S,
          revalidateOnlyGenerated: P,
          resolvedPathname: T,
          clientReferenceManifest: k,
          serverActionsManifest: D,
        } = w,
        N = (0, s.normalizeAppPath)(v),
        q = !!(E.dynamicRoutes[N] || E.routes[T]),
        M = async () => (
          (null == A ? void 0 : A.render404)
            ? await A.render404(e, t, x, !1)
            : t.end('This page could not be found'),
          null
        );
      if (q && !C) {
        let e = !!E.routes[T],
          t = E.dynamicRoutes[N];
        if (t && !1 === t.fallback && !e) {
          if (_.experimental.adapterPath) return await M();
          throw new b.NoFallbackError();
        }
      }
      let O = null;
      !q || j.isDev || C || (O = '/index' === (O = T) ? '/' : O);
      let U = !0 === j.isDev || !q,
        H = q && !U;
      D &&
        k &&
        (0, n.setManifestsSingleton)({
          page: v,
          clientReferenceManifest: k,
          serverActionsManifest: D,
        });
      let $ = e.method || 'GET',
        I = (0, o.getTracer)(),
        B = I.getActiveScopeSpan(),
        F = {
          params: R,
          prerenderManifest: E,
          renderOpts: {
            experimental: { authInterrupts: !!_.experimental.authInterrupts },
            cacheComponents: !!_.cacheComponents,
            supportsDynamicResponse: U,
            incrementalCache: (0, r.getRequestMeta)(e, 'incrementalCache'),
            cacheLifeProfiles: _.cacheLife,
            waitUntil: i.waitUntil,
            onClose: (e) => {
              t.on('close', e);
            },
            onAfterTaskError: void 0,
            onInstrumentationRequestError: (t, a, i, r) =>
              j.onRequestError(e, t, i, r, A),
          },
          sharedContext: { buildId: y },
        },
        W = new l.NodeNextRequest(e),
        K = new l.NodeNextResponse(t),
        z = d.NextRequestAdapter.fromNodeNextRequest(
          W,
          (0, d.signalFromNodeResponse)(t)
        );
      try {
        let n = async (e) =>
            j.handle(z, F).finally(() => {
              if (!e) return;
              e.setAttributes({
                'http.status_code': t.statusCode,
                'next.rsc': !1,
              });
              let a = I.getRootSpanAttributes();
              if (!a) return;
              if (a.get('next.span_type') !== c.BaseServerSpan.handleRequest)
                return void console.warn(
                  `Unexpected root span type '${a.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`
                );
              let i = a.get('next.route');
              if (i) {
                let t = `${$} ${i}`;
                (e.setAttributes({
                  'next.route': i,
                  'http.route': i,
                  'next.span_name': t,
                }),
                  e.updateName(t));
              } else e.updateName(`${$} ${v}`);
            }),
          s = !!(0, r.getRequestMeta)(e, 'minimalMode'),
          l = async (r) => {
            var o, l;
            let d = async ({ previousCacheEntry: a }) => {
                try {
                  if (!s && S && P && !a)
                    return (
                      (t.statusCode = 404),
                      t.setHeader('x-nextjs-cache', 'REVALIDATED'),
                      t.end('This page could not be found'),
                      null
                    );
                  let o = await n(r);
                  e.fetchMetrics = F.renderOpts.fetchMetrics;
                  let l = F.renderOpts.pendingWaitUntil;
                  l && i.waitUntil && (i.waitUntil(l), (l = void 0));
                  let d = F.renderOpts.collectedTags;
                  if (!q)
                    return (
                      await (0, p.sendResponse)(
                        W,
                        K,
                        o,
                        F.renderOpts.pendingWaitUntil
                      ),
                      null
                    );
                  {
                    let e = await o.blob(),
                      t = (0, m.toNodeOutgoingHttpHeaders)(o.headers);
                    (d && (t[h.NEXT_CACHE_TAGS_HEADER] = d),
                      !t['content-type'] &&
                        e.type &&
                        (t['content-type'] = e.type));
                    let a =
                        void 0 !== F.renderOpts.collectedRevalidate &&
                        !(
                          F.renderOpts.collectedRevalidate >= h.INFINITE_CACHE
                        ) &&
                        F.renderOpts.collectedRevalidate,
                      i =
                        void 0 === F.renderOpts.collectedExpire ||
                        F.renderOpts.collectedExpire >= h.INFINITE_CACHE
                          ? void 0
                          : F.renderOpts.collectedExpire;
                    return {
                      value: {
                        kind: f.CachedRouteKind.APP_ROUTE,
                        status: o.status,
                        body: Buffer.from(await e.arrayBuffer()),
                        headers: t,
                      },
                      cacheControl: { revalidate: a, expire: i },
                    };
                  }
                } catch (t) {
                  throw (
                    (null == a ? void 0 : a.isStale) &&
                      (await j.onRequestError(
                        e,
                        t,
                        {
                          routerKind: 'App Router',
                          routePath: v,
                          routeType: 'route',
                          revalidateReason: (0, u.getRevalidateReason)({
                            isStaticGeneration: H,
                            isOnDemandRevalidate: S,
                          }),
                        },
                        !1,
                        A
                      )),
                    t
                  );
                }
              },
              c = await j.handleResponse({
                req: e,
                nextConfig: _,
                cacheKey: O,
                routeKind: a.RouteKind.APP_ROUTE,
                isFallback: !1,
                prerenderManifest: E,
                isRoutePPREnabled: !1,
                isOnDemandRevalidate: S,
                revalidateOnlyGenerated: P,
                responseGenerator: d,
                waitUntil: i.waitUntil,
                isMinimalMode: s,
              });
            if (!q) return null;
            if (
              (null == c || null == (o = c.value) ? void 0 : o.kind) !==
              f.CachedRouteKind.APP_ROUTE
            )
              throw Object.defineProperty(
                Error(
                  `Invariant: app-route received invalid cache entry ${null == c || null == (l = c.value) ? void 0 : l.kind}`
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E701', enumerable: !1, configurable: !0 }
              );
            (s ||
              t.setHeader(
                'x-nextjs-cache',
                S
                  ? 'REVALIDATED'
                  : c.isMiss
                    ? 'MISS'
                    : c.isStale
                      ? 'STALE'
                      : 'HIT'
              ),
              C &&
                t.setHeader(
                  'Cache-Control',
                  'private, no-cache, no-store, max-age=0, must-revalidate'
                ));
            let b = (0, m.fromNodeOutgoingHttpHeaders)(c.value.headers);
            return (
              (s && q) || b.delete(h.NEXT_CACHE_TAGS_HEADER),
              !c.cacheControl ||
                t.getHeader('Cache-Control') ||
                b.get('Cache-Control') ||
                b.set(
                  'Cache-Control',
                  (0, g.getCacheControlHeader)(c.cacheControl)
                ),
              await (0, p.sendResponse)(
                W,
                K,
                new Response(c.value.body, {
                  headers: b,
                  status: c.value.status || 200,
                })
              ),
              null
            );
          };
        B
          ? await l(B)
          : await I.withPropagatedContext(e.headers, () =>
              I.trace(
                c.BaseServerSpan.handleRequest,
                {
                  spanName: `${$} ${v}`,
                  kind: o.SpanKind.SERVER,
                  attributes: { 'http.method': $, 'http.target': e.url },
                },
                l
              )
            );
      } catch (t) {
        if (
          (t instanceof b.NoFallbackError ||
            (await j.onRequestError(
              e,
              t,
              {
                routerKind: 'App Router',
                routePath: N,
                routeType: 'route',
                revalidateReason: (0, u.getRevalidateReason)({
                  isStaticGeneration: H,
                  isOnDemandRevalidate: S,
                }),
              },
              !1,
              A
            )),
          q)
        )
          throw t;
        return (
          await (0, p.sendResponse)(W, K, new Response(null, { status: 500 })),
          null
        );
      }
    }
    e.s(
      [
        'handler',
        () => F,
        'patchFetch',
        () => B,
        'routeModule',
        () => j,
        'serverHooks',
        () => I,
        'workAsyncStorage',
        () => H,
        'workUnitAsyncStorage',
        () => $,
      ],
      98135
    );
  },
];

//# sourceMappingURL=11cf4_next_dist_6cc166b1._.js.map
