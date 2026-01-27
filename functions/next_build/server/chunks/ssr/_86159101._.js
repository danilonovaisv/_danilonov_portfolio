module.exports = [
  80140,
  (a, b, c) => {
    'use strict';
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      Object.defineProperty(c, 'registerServerReference', {
        enumerable: !0,
        get: function () {
          return d.registerServerReference;
        },
      }));
    let d = a.r(15169);
  },
  76286,
  (a, b, c) => {
    'use strict';
    function d(a) {
      for (let b = 0; b < a.length; b++) {
        let c = a[b];
        if ('function' != typeof c)
          throw Object.defineProperty(
            Error(`A "use server" file can only export async functions, found ${typeof c}.
Read more: https://nextjs.org/docs/messages/invalid-use-server-value`),
            '__NEXT_ERROR_CODE',
            { value: 'E352', enumerable: !1, configurable: !0 }
          );
      }
    }
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      Object.defineProperty(c, 'ensureServerEntryExports', {
        enumerable: !0,
        get: function () {
          return d;
        },
      }));
  },
  36391,
  (a) => {
    'use strict';
    var b = a.i(80140);
    a.i(70324);
    var c = a.i(78255),
      d = a.i(16349);
    async function e() {
      let a = await (0, d.createClient)();
      (await a.auth.signOut(), (0, c.redirect)('/admin/login'));
    }
    ((0, a.i(76286).ensureServerEntryExports)([e]),
      (0, b.registerServerReference)(
        e,
        '0026168e0126d9243f874bcb5385f0cd79f9875e9b',
        null
      ),
      a.s(['signOut', () => e]));
  },
  77476,
  (a) => {
    'use strict';
    var b = a.i(80140),
      c = a.i(16349);
    async function d(a = {}, b) {
      let e = (b ?? (await (0, c.createClient)()))
        .from('portfolio_projects')
        .select(
          '*, tags:portfolio_project_tags(tag:portfolio_tags(id, slug, label, kind)), landing_page:landing_pages(slug)'
        )
        .order('featured_portfolio_order', { ascending: !0, nullsFirst: !1 });
      (a.includeUnpublished || (e = e.eq('is_published', !0)),
        a.tagSlug && (e = e.eq('tags.tag.slug', a.tagSlug)),
        a.year && (e = e.eq('year', a.year)),
        a.search &&
          (e = e.or(
            `title.ilike.%${a.search}%,client_name.ilike.%${a.search}%`
          )),
        a.featuredOnHome && (e = e.eq('featured_on_home', !0)),
        a.featuredOnPortfolio && (e = e.eq('featured_on_portfolio', !0)));
      let { data: f, error: g } = await e.returns();
      if (g) throw g;
      return f;
    }
    let e = async function (a) {
      let b = a.get('id'),
        d = 'true' === a.get('nextStatus'),
        e = await (0, c.createClient)(),
        { error: f } = await e
          .from('portfolio_projects')
          .update({ is_published: d })
          .eq('id', b);
      if (f) throw f;
    };
    ((0, b.registerServerReference)(
      e,
      '40c3fbb7e06034faa0281bd0d716d436d9b115300d',
      null
    ),
      a.s([
        '$$RSC_SERVER_ACTION_0',
        0,
        e,
        'listProjects',
        () => d,
        'togglePublish',
        () => e,
      ]));
  },
  44954,
  (a) => {
    'use strict';
    var b = a.i(36391),
      c = a.i(77476);
    (a.s([], 29034),
      a.i(29034),
      a.s(
        [
          '0026168e0126d9243f874bcb5385f0cd79f9875e9b',
          () => b.signOut,
          '40c3fbb7e06034faa0281bd0d716d436d9b115300d',
          () => c.$$RSC_SERVER_ACTION_0,
        ],
        44954
      ));
  },
];

//# sourceMappingURL=_86159101._.js.map
