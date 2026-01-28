module.exports = [
  5502,
  (a) => {
    'use strict';
    var b = a.i(26118),
      c = a.i(60788);
    function d() {
      let a = (0, b.useReducedMotion)(),
        [d, e] = (0, c.useState)(!1);
      return (
        (0, c.useEffect)(() => {
          e(!0);
        }, []),
        !!d && (a ?? !1)
      );
    }
    a.s(['useReducedMotion', () => d]);
  },
  4531,
  (a) => {
    'use strict';
    a.i(62150);
    var b = a.i(7059),
      c = a.i(31405),
      d = a.i(66290);
    function e(a) {
      return 'number' == typeof a ? a : parseFloat(a);
    }
    var f = a.i(60788),
      g = a.i(74989),
      h = a.i(16242),
      i = a.i(48635);
    function j(a, k = {}) {
      return (function (a, j = {}) {
        let { isStatic: k } = (0, f.useContext)(g.MotionConfigContext),
          l = () => ((0, c.isMotionValue)(a) ? a.get() : a);
        if (k) return (0, i.useTransform)(l);
        let m = (0, h.useMotionValue)(l());
        return (
          (0, f.useInsertionEffect)(
            () =>
              (function (a, f, g = {}) {
                let h,
                  i = a.get(),
                  j = null,
                  k = i,
                  l = 'string' == typeof i ? i.replace(/[\d.-]/g, '') : void 0,
                  m = () => {
                    j && (j.stop(), (j = null));
                  };
                if (
                  (a.attach((c, f) => {
                    ((k = c),
                      (h = (a) => {
                        var b, c;
                        return f(((b = a), (c = l) ? b + c : b));
                      }),
                      d.frame.postRender(() => {
                        let c, d;
                        (m(),
                          (c = e(a.get())),
                          c !== (d = e(k)) &&
                            (j = new b.JSAnimation({
                              keyframes: [c, d],
                              velocity: a.getVelocity(),
                              type: 'spring',
                              restDelta: 0.001,
                              restSpeed: 0.01,
                              ...g,
                              onUpdate: h,
                            })),
                          a.events.animationStart?.notify(),
                          j?.then(() => {
                            a.events.animationComplete?.notify();
                          }));
                      }));
                  }, m),
                  (0, c.isMotionValue)(f))
                ) {
                  let b = f.on('change', (b) => {
                      var c, d;
                      return a.set(((c = b), (d = l) ? c + d : c));
                    }),
                    c = a.on('destroy', b);
                  return () => {
                    (b(), c());
                  };
                }
                return m;
              })(m, a, j),
            [m, JSON.stringify(j)]
          ),
          m
        );
      })(a, { type: 'spring', ...k });
    }
    a.s(['useSpring', () => j], 4531);
  },
];

//# sourceMappingURL=_1d3f8687._.js.map
