module.exports = [
  25194,
  (a, b, c) => {},
  872,
  (a, b, c) => {
    a.r(25194);
    var d = a.r(10385),
      e = d && 'object' == typeof d && 'default' in d ? d : { default: d },
      f = 'u' > typeof process && process.env && !0,
      g = function (a) {
        return '[object String]' === Object.prototype.toString.call(a);
      },
      h = (function () {
        function a(a) {
          var b = void 0 === a ? {} : a,
            c = b.name,
            d = void 0 === c ? 'stylesheet' : c,
            e = b.optimizeForSpeed,
            h = void 0 === e ? f : e;
          (i(g(d), '`name` must be a string'),
            (this._name = d),
            (this._deletedRulePlaceholder = '#' + d + '-deleted-rule____{}'),
            i('boolean' == typeof h, '`optimizeForSpeed` must be a boolean'),
            (this._optimizeForSpeed = h),
            (this._serverSheet = void 0),
            (this._tags = []),
            (this._injected = !1),
            (this._rulesCount = 0),
            (this._nonce = null));
        }
        var b,
          c = a.prototype;
        return (
          (c.setOptimizeForSpeed = function (a) {
            (i(
              'boolean' == typeof a,
              '`setOptimizeForSpeed` accepts a boolean'
            ),
              i(
                0 === this._rulesCount,
                'optimizeForSpeed cannot be when rules have already been inserted'
              ),
              this.flush(),
              (this._optimizeForSpeed = a),
              this.inject());
          }),
          (c.isOptimizeForSpeed = function () {
            return this._optimizeForSpeed;
          }),
          (c.inject = function () {
            var a = this;
            (i(!this._injected, 'sheet already injected'),
              (this._injected = !0),
              (this._serverSheet = {
                cssRules: [],
                insertRule: function (b, c) {
                  return (
                    'number' == typeof c
                      ? (a._serverSheet.cssRules[c] = { cssText: b })
                      : a._serverSheet.cssRules.push({ cssText: b }),
                    c
                  );
                },
                deleteRule: function (b) {
                  a._serverSheet.cssRules[b] = null;
                },
              }));
          }),
          (c.getSheetForTag = function (a) {
            if (a.sheet) return a.sheet;
            for (var b = 0; b < document.styleSheets.length; b++)
              if (document.styleSheets[b].ownerNode === a)
                return document.styleSheets[b];
          }),
          (c.getSheet = function () {
            return this.getSheetForTag(this._tags[this._tags.length - 1]);
          }),
          (c.insertRule = function (a, b) {
            return (
              i(g(a), '`insertRule` accepts only strings'),
              'number' != typeof b && (b = this._serverSheet.cssRules.length),
              this._serverSheet.insertRule(a, b),
              this._rulesCount++
            );
          }),
          (c.replaceRule = function (a, b) {
            this._optimizeForSpeed;
            var c = this._serverSheet;
            if (
              (b.trim() || (b = this._deletedRulePlaceholder), !c.cssRules[a])
            )
              return a;
            c.deleteRule(a);
            try {
              c.insertRule(b, a);
            } catch (d) {
              (f ||
                console.warn(
                  'StyleSheet: illegal rule: \n\n' +
                    b +
                    '\n\nSee https://stackoverflow.com/q/20007992 for more info'
                ),
                c.insertRule(this._deletedRulePlaceholder, a));
            }
            return a;
          }),
          (c.deleteRule = function (a) {
            this._serverSheet.deleteRule(a);
          }),
          (c.flush = function () {
            ((this._injected = !1),
              (this._rulesCount = 0),
              (this._serverSheet.cssRules = []));
          }),
          (c.cssRules = function () {
            return this._serverSheet.cssRules;
          }),
          (c.makeStyleTag = function (a, b, c) {
            b &&
              i(g(b), 'makeStyleTag accepts only strings as second parameter');
            var d = document.createElement('style');
            (this._nonce && d.setAttribute('nonce', this._nonce),
              (d.type = 'text/css'),
              d.setAttribute('data-' + a, ''),
              b && d.appendChild(document.createTextNode(b)));
            var e = document.head || document.getElementsByTagName('head')[0];
            return (c ? e.insertBefore(d, c) : e.appendChild(d), d);
          }),
          (b = [
            {
              key: 'length',
              get: function () {
                return this._rulesCount;
              },
            },
          ]),
          (function (a, b) {
            for (var c = 0; c < b.length; c++) {
              var d = b[c];
              ((d.enumerable = d.enumerable || !1),
                (d.configurable = !0),
                'value' in d && (d.writable = !0),
                Object.defineProperty(a, d.key, d));
            }
          })(a.prototype, b),
          a
        );
      })();
    function i(a, b) {
      if (!a) throw Error('StyleSheet: ' + b + '.');
    }
    var j = function (a) {
        for (var b = 5381, c = a.length; c; ) b = (33 * b) ^ a.charCodeAt(--c);
        return b >>> 0;
      },
      k = {};
    function l(a, b) {
      if (!b) return 'jsx-' + a;
      var c = String(b),
        d = a + c;
      return (k[d] || (k[d] = 'jsx-' + j(a + '-' + c)), k[d]);
    }
    function m(a, b) {
      var c = a + (b = b.replace(/\/style/gi, '\\/style'));
      return (
        k[c] || (k[c] = b.replace(/__jsx-style-dynamic-selector/g, a)),
        k[c]
      );
    }
    var n = (function () {
        function a(a) {
          var b = void 0 === a ? {} : a,
            c = b.styleSheet,
            d = void 0 === c ? null : c,
            e = b.optimizeForSpeed,
            f = void 0 !== e && e;
          ((this._sheet =
            d || new h({ name: 'styled-jsx', optimizeForSpeed: f })),
            this._sheet.inject(),
            d &&
              'boolean' == typeof f &&
              (this._sheet.setOptimizeForSpeed(f),
              (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed())),
            (this._fromServer = void 0),
            (this._indices = {}),
            (this._instancesCounts = {}));
        }
        var b = a.prototype;
        return (
          (b.add = function (a) {
            var b = this;
            void 0 === this._optimizeForSpeed &&
              ((this._optimizeForSpeed = Array.isArray(a.children)),
              this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),
              (this._optimizeForSpeed = this._sheet.isOptimizeForSpeed()));
            var c = this.getIdAndRules(a),
              d = c.styleId,
              e = c.rules;
            if (d in this._instancesCounts) {
              this._instancesCounts[d] += 1;
              return;
            }
            var f = e
              .map(function (a) {
                return b._sheet.insertRule(a);
              })
              .filter(function (a) {
                return -1 !== a;
              });
            ((this._indices[d] = f), (this._instancesCounts[d] = 1));
          }),
          (b.remove = function (a) {
            var b = this,
              c = this.getIdAndRules(a).styleId;
            if (
              ((function (a, b) {
                if (!a) throw Error('StyleSheetRegistry: ' + b + '.');
              })(c in this._instancesCounts, 'styleId: `' + c + '` not found'),
              (this._instancesCounts[c] -= 1),
              this._instancesCounts[c] < 1)
            ) {
              var d = this._fromServer && this._fromServer[c];
              (d
                ? (d.parentNode.removeChild(d), delete this._fromServer[c])
                : (this._indices[c].forEach(function (a) {
                    return b._sheet.deleteRule(a);
                  }),
                  delete this._indices[c]),
                delete this._instancesCounts[c]);
            }
          }),
          (b.update = function (a, b) {
            (this.add(b), this.remove(a));
          }),
          (b.flush = function () {
            (this._sheet.flush(),
              this._sheet.inject(),
              (this._fromServer = void 0),
              (this._indices = {}),
              (this._instancesCounts = {}));
          }),
          (b.cssRules = function () {
            var a = this,
              b = this._fromServer
                ? Object.keys(this._fromServer).map(function (b) {
                    return [b, a._fromServer[b]];
                  })
                : [],
              c = this._sheet.cssRules();
            return b.concat(
              Object.keys(this._indices)
                .map(function (b) {
                  return [
                    b,
                    a._indices[b]
                      .map(function (a) {
                        return c[a].cssText;
                      })
                      .join(a._optimizeForSpeed ? '' : '\n'),
                  ];
                })
                .filter(function (a) {
                  return !!a[1];
                })
            );
          }),
          (b.styles = function (a) {
            var b, c;
            return (
              (b = this.cssRules()),
              void 0 === (c = a) && (c = {}),
              b.map(function (a) {
                var b = a[0],
                  d = a[1];
                return e.default.createElement('style', {
                  id: '__' + b,
                  key: '__' + b,
                  nonce: c.nonce ? c.nonce : void 0,
                  dangerouslySetInnerHTML: { __html: d },
                });
              })
            );
          }),
          (b.getIdAndRules = function (a) {
            var b = a.children,
              c = a.dynamic,
              d = a.id;
            if (c) {
              var e = l(d, c);
              return {
                styleId: e,
                rules: Array.isArray(b)
                  ? b.map(function (a) {
                      return m(e, a);
                    })
                  : [m(e, b)],
              };
            }
            return { styleId: l(d), rules: Array.isArray(b) ? b : [b] };
          }),
          (b.selectFromServer = function () {
            return Array.prototype.slice
              .call(document.querySelectorAll('[id^="__jsx-"]'))
              .reduce(function (a, b) {
                return ((a[b.id.slice(2)] = b), a);
              }, {});
          }),
          a
        );
      })(),
      o = d.createContext(null);
    function p() {
      return new n();
    }
    function q() {
      return d.useContext(o);
    }
    function r(a) {
      var b = q();
      return (b && b.add(a), null);
    }
    ((o.displayName = 'StyleSheetContext'),
      e.default.useInsertionEffect || e.default.useLayoutEffect,
      (r.dynamic = function (a) {
        return a
          .map(function (a) {
            return l(a[0], a[1]);
          })
          .join(' ');
      }),
      (c.StyleRegistry = function (a) {
        var b = a.registry,
          c = a.children,
          f = d.useContext(o),
          g = d.useState(function () {
            return f || b || p();
          })[0];
        return e.default.createElement(o.Provider, { value: g }, c);
      }),
      (c.createStyleRegistry = p),
      (c.style = r),
      (c.useStyleRegistry = q));
  },
  45708,
  (a, b, c) => {
    b.exports = a.r(872).style;
  },
  6103,
  (a, b, c) => {
    'use strict';
    var d = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
      e = /\n/g,
      f = /^\s*/,
      g = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
      h = /^:\s*/,
      i = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
      j = /^[;\s]*/,
      k = /^\s+|\s+$/g;
    function l(a) {
      return a ? a.replace(k, '') : '';
    }
    b.exports = function (a, b) {
      if ('string' != typeof a)
        throw TypeError('First argument must be a string');
      if (!a) return [];
      b = b || {};
      var c = 1,
        k = 1;
      function m(a) {
        var b = a.match(e);
        b && (c += b.length);
        var d = a.lastIndexOf('\n');
        k = ~d ? a.length - d : k + a.length;
      }
      function n() {
        var a = { line: c, column: k };
        return function (b) {
          return ((b.position = new o(a)), q(f), b);
        };
      }
      function o(a) {
        ((this.start = a),
          (this.end = { line: c, column: k }),
          (this.source = b.source));
      }
      function p(d) {
        var e = Error(b.source + ':' + c + ':' + k + ': ' + d);
        if (
          ((e.reason = d),
          (e.filename = b.source),
          (e.line = c),
          (e.column = k),
          (e.source = a),
          b.silent)
        );
        else throw e;
      }
      function q(b) {
        var c = b.exec(a);
        if (c) {
          var d = c[0];
          return (m(d), (a = a.slice(d.length)), c);
        }
      }
      function r(a) {
        var b;
        for (a = a || []; (b = s()); ) !1 !== b && a.push(b);
        return a;
      }
      function s() {
        var b = n();
        if ('/' == a.charAt(0) && '*' == a.charAt(1)) {
          for (
            var c = 2;
            '' != a.charAt(c) && ('*' != a.charAt(c) || '/' != a.charAt(c + 1));
          )
            ++c;
          if (((c += 2), '' === a.charAt(c - 1)))
            return p('End of comment missing');
          var d = a.slice(2, c - 2);
          return (
            (k += 2),
            m(d),
            (a = a.slice(c)),
            (k += 2),
            b({ type: 'comment', comment: d })
          );
        }
      }
      ((o.prototype.content = a), q(f));
      var t,
        u = [];
      for (
        r(u);
        (t = (function () {
          var a = n(),
            b = q(g);
          if (b) {
            if ((s(), !q(h))) return p("property missing ':'");
            var c = q(i),
              e = a({
                type: 'declaration',
                property: l(b[0].replace(d, '')),
                value: c ? l(c[0].replace(d, '')) : '',
              });
            return (q(j), e);
          }
        })());
      )
        !1 !== t && (u.push(t), r(u));
      return u;
    };
  },
  66510,
  (a, b, c) => {
    'use strict';
    var d =
      (a.e && a.e.__importDefault) ||
      function (a) {
        return a && a.__esModule ? a : { default: a };
      };
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      (c.default = function (a, b) {
        let c = null;
        if (!a || 'string' != typeof a) return c;
        let d = (0, e.default)(a),
          f = 'function' == typeof b;
        return (
          d.forEach((a) => {
            if ('declaration' !== a.type) return;
            let { property: d, value: e } = a;
            f ? b(d, e, a) : e && ((c = c || {})[d] = e);
          }),
          c
        );
      }));
    let e = d(a.r(6103));
  },
  98257,
  (a, b, c) => {
    'use strict';
    (Object.defineProperty(c, '__esModule', { value: !0 }),
      (c.camelCase = void 0));
    var d = /^--[a-zA-Z0-9_-]+$/,
      e = /-([a-z])/g,
      f = /^[^-]+$/,
      g = /^-(webkit|moz|ms|o|khtml)-/,
      h = /^-(ms)-/,
      i = function (a, b) {
        return b.toUpperCase();
      },
      j = function (a, b) {
        return ''.concat(b, '-');
      };
    c.camelCase = function (a, b) {
      var c;
      return (void 0 === b && (b = {}), !(c = a) || f.test(c) || d.test(c))
        ? a
        : ((a = a.toLowerCase()),
          (a = b.reactCompat ? a.replace(h, j) : a.replace(g, j)).replace(
            e,
            i
          ));
    };
  },
  30841,
  (a, b, c) => {
    'use strict';
    var d = (
        (a.e && a.e.__importDefault) ||
        function (a) {
          return a && a.__esModule ? a : { default: a };
        }
      )(a.r(66510)),
      e = a.r(98257);
    function f(a, b) {
      var c = {};
      return (
        a &&
          'string' == typeof a &&
          (0, d.default)(a, function (a, d) {
            a && d && (c[(0, e.camelCase)(a, b)] = d);
          }),
        c
      );
    }
    ((f.default = f), (b.exports = f));
  },
  83230,
  (a, b, c) => {
    'use strict';
    var d = Object.prototype.hasOwnProperty,
      e = Object.prototype.toString,
      f = Object.defineProperty,
      g = Object.getOwnPropertyDescriptor,
      h = function (a) {
        return 'function' == typeof Array.isArray
          ? Array.isArray(a)
          : '[object Array]' === e.call(a);
      },
      i = function (a) {
        if (!a || '[object Object]' !== e.call(a)) return !1;
        var b,
          c = d.call(a, 'constructor'),
          f =
            a.constructor &&
            a.constructor.prototype &&
            d.call(a.constructor.prototype, 'isPrototypeOf');
        if (a.constructor && !c && !f) return !1;
        for (b in a);
        return void 0 === b || d.call(a, b);
      },
      j = function (a, b) {
        f && '__proto__' === b.name
          ? f(a, b.name, {
              enumerable: !0,
              configurable: !0,
              value: b.newValue,
              writable: !0,
            })
          : (a[b.name] = b.newValue);
      },
      k = function (a, b) {
        if ('__proto__' === b) {
          if (!d.call(a, b)) return;
          else if (g) return g(a, b).value;
        }
        return a[b];
      };
    b.exports = function a() {
      var b,
        c,
        d,
        e,
        f,
        g,
        l = arguments[0],
        m = 1,
        n = arguments.length,
        o = !1;
      for (
        'boolean' == typeof l && ((o = l), (l = arguments[1] || {}), (m = 2)),
          (null == l || ('object' != typeof l && 'function' != typeof l)) &&
            (l = {});
        m < n;
        ++m
      )
        if (((b = arguments[m]), null != b))
          for (c in b)
            ((d = k(l, c)),
              l !== (e = k(b, c)) &&
                (o && e && (i(e) || (f = h(e)))
                  ? (f
                      ? ((f = !1), (g = d && h(d) ? d : []))
                      : (g = d && i(d) ? d : {}),
                    j(l, { name: c, newValue: a(o, g, e) }))
                  : void 0 !== e && j(l, { name: c, newValue: e })));
      return l;
    };
  },
  50227,
  (a, b, c) => {
    b.exports = a.x('node:path', () => require('node:path'));
  },
  59639,
  (a, b, c) => {
    b.exports = a.x('node:process', () => require('node:process'));
  },
  57764,
  (a, b, c) => {
    b.exports = a.x('node:url', () => require('node:url'));
  },
  74743,
  (a) => {
    'use strict';
    var b = a.i(33845),
      c = a.i(29474),
      d = a.i(47912),
      e = a.i(31045),
      f = a.i(93272),
      g = a.i(76945),
      h = a.i(45708);
    function i() {}
    function j() {}
    let k = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
      l = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
      m = {};
    function n(a, b) {
      return ((b || m).jsx ? l : k).test(a);
    }
    let o = /[ \t\n\f\r]/g;
    function p(a) {
      return '' === a.replace(o, '');
    }
    class q {
      constructor(a, b) {
        ((this.attribute = b), (this.property = a));
      }
    }
    ((q.prototype.attribute = ''),
      (q.prototype.booleanish = !1),
      (q.prototype.boolean = !1),
      (q.prototype.commaOrSpaceSeparated = !1),
      (q.prototype.commaSeparated = !1),
      (q.prototype.defined = !1),
      (q.prototype.mustUseProperty = !1),
      (q.prototype.number = !1),
      (q.prototype.overloadedBoolean = !1),
      (q.prototype.property = ''),
      (q.prototype.spaceSeparated = !1),
      (q.prototype.space = void 0));
    let r = 0,
      s = z(),
      t = z(),
      u = z(),
      v = z(),
      w = z(),
      x = z(),
      y = z();
    function z() {
      return 2 ** ++r;
    }
    a.s(
      [
        'boolean',
        0,
        s,
        'booleanish',
        0,
        t,
        'commaOrSpaceSeparated',
        0,
        y,
        'commaSeparated',
        0,
        x,
        'number',
        0,
        v,
        'overloadedBoolean',
        0,
        u,
        'spaceSeparated',
        0,
        w,
      ],
      43429
    );
    var A = a.i(43429);
    let B = Object.keys(A);
    class C extends q {
      constructor(a, b, c, d) {
        let e = -1;
        if (
          (super(a, b),
          (function (a, b, c) {
            c && (a[b] = c);
          })(this, 'space', d),
          'number' == typeof c)
        )
          for (; ++e < B.length; ) {
            const a = B[e];
            !(function (a, b, c) {
              c && (a[b] = c);
            })(this, B[e], (c & A[a]) === A[a]);
          }
      }
    }
    function D(a) {
      return a.toLowerCase();
    }
    C.prototype.defined = !0;
    let E = /[A-Z]/g,
      F = /-[a-z]/g,
      G = /^data[-\w.:]+$/i;
    function H(a) {
      return '-' + a.toLowerCase();
    }
    function I(a) {
      return a.charAt(1).toUpperCase();
    }
    let J = {
      classId: 'classID',
      dataType: 'datatype',
      itemId: 'itemID',
      strokeDashArray: 'strokeDasharray',
      strokeDashOffset: 'strokeDashoffset',
      strokeLineCap: 'strokeLinecap',
      strokeLineJoin: 'strokeLinejoin',
      strokeMiterLimit: 'strokeMiterlimit',
      typeOf: 'typeof',
      xLinkActuate: 'xlinkActuate',
      xLinkArcRole: 'xlinkArcrole',
      xLinkHref: 'xlinkHref',
      xLinkRole: 'xlinkRole',
      xLinkShow: 'xlinkShow',
      xLinkTitle: 'xlinkTitle',
      xLinkType: 'xlinkType',
      xmlnsXLink: 'xmlnsXlink',
    };
    class K {
      constructor(a, b, c) {
        ((this.normal = b), (this.property = a), c && (this.space = c));
      }
    }
    function L(a, b) {
      let c = {},
        d = {};
      for (let b of a)
        (Object.assign(c, b.property), Object.assign(d, b.normal));
      return new K(c, d, b);
    }
    function M(a) {
      let b = {},
        c = {};
      for (let [d, e] of Object.entries(a.properties)) {
        let f = new C(d, a.transform(a.attributes || {}, d), e, a.space);
        (a.mustUseProperty &&
          a.mustUseProperty.includes(d) &&
          (f.mustUseProperty = !0),
          (b[d] = f),
          (c[D(d)] = d),
          (c[D(f.attribute)] = d));
      }
      return new K(b, c, a.space);
    }
    ((K.prototype.normal = {}),
      (K.prototype.property = {}),
      (K.prototype.space = void 0));
    let N = M({
      properties: {
        ariaActiveDescendant: null,
        ariaAtomic: t,
        ariaAutoComplete: null,
        ariaBusy: t,
        ariaChecked: t,
        ariaColCount: v,
        ariaColIndex: v,
        ariaColSpan: v,
        ariaControls: w,
        ariaCurrent: null,
        ariaDescribedBy: w,
        ariaDetails: null,
        ariaDisabled: t,
        ariaDropEffect: w,
        ariaErrorMessage: null,
        ariaExpanded: t,
        ariaFlowTo: w,
        ariaGrabbed: t,
        ariaHasPopup: null,
        ariaHidden: t,
        ariaInvalid: null,
        ariaKeyShortcuts: null,
        ariaLabel: null,
        ariaLabelledBy: w,
        ariaLevel: v,
        ariaLive: null,
        ariaModal: t,
        ariaMultiLine: t,
        ariaMultiSelectable: t,
        ariaOrientation: null,
        ariaOwns: w,
        ariaPlaceholder: null,
        ariaPosInSet: v,
        ariaPressed: t,
        ariaReadOnly: t,
        ariaRelevant: null,
        ariaRequired: t,
        ariaRoleDescription: w,
        ariaRowCount: v,
        ariaRowIndex: v,
        ariaRowSpan: v,
        ariaSelected: t,
        ariaSetSize: v,
        ariaSort: null,
        ariaValueMax: v,
        ariaValueMin: v,
        ariaValueNow: v,
        ariaValueText: null,
        role: null,
      },
      transform: (a, b) =>
        'role' === b ? b : 'aria-' + b.slice(4).toLowerCase(),
    });
    function O(a, b) {
      return b in a ? a[b] : b;
    }
    function P(a, b) {
      return O(a, b.toLowerCase());
    }
    let Q = M({
        attributes: {
          acceptcharset: 'accept-charset',
          classname: 'class',
          htmlfor: 'for',
          httpequiv: 'http-equiv',
        },
        mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
        properties: {
          abbr: null,
          accept: x,
          acceptCharset: w,
          accessKey: w,
          action: null,
          allow: null,
          allowFullScreen: s,
          allowPaymentRequest: s,
          allowUserMedia: s,
          alt: null,
          as: null,
          async: s,
          autoCapitalize: null,
          autoComplete: w,
          autoFocus: s,
          autoPlay: s,
          blocking: w,
          capture: null,
          charSet: null,
          checked: s,
          cite: null,
          className: w,
          cols: v,
          colSpan: null,
          content: null,
          contentEditable: t,
          controls: s,
          controlsList: w,
          coords: v | x,
          crossOrigin: null,
          data: null,
          dateTime: null,
          decoding: null,
          default: s,
          defer: s,
          dir: null,
          dirName: null,
          disabled: s,
          download: u,
          draggable: t,
          encType: null,
          enterKeyHint: null,
          fetchPriority: null,
          form: null,
          formAction: null,
          formEncType: null,
          formMethod: null,
          formNoValidate: s,
          formTarget: null,
          headers: w,
          height: v,
          hidden: u,
          high: v,
          href: null,
          hrefLang: null,
          htmlFor: w,
          httpEquiv: w,
          id: null,
          imageSizes: null,
          imageSrcSet: null,
          inert: s,
          inputMode: null,
          integrity: null,
          is: null,
          isMap: s,
          itemId: null,
          itemProp: w,
          itemRef: w,
          itemScope: s,
          itemType: w,
          kind: null,
          label: null,
          lang: null,
          language: null,
          list: null,
          loading: null,
          loop: s,
          low: v,
          manifest: null,
          max: null,
          maxLength: v,
          media: null,
          method: null,
          min: null,
          minLength: v,
          multiple: s,
          muted: s,
          name: null,
          nonce: null,
          noModule: s,
          noValidate: s,
          onAbort: null,
          onAfterPrint: null,
          onAuxClick: null,
          onBeforeMatch: null,
          onBeforePrint: null,
          onBeforeToggle: null,
          onBeforeUnload: null,
          onBlur: null,
          onCancel: null,
          onCanPlay: null,
          onCanPlayThrough: null,
          onChange: null,
          onClick: null,
          onClose: null,
          onContextLost: null,
          onContextMenu: null,
          onContextRestored: null,
          onCopy: null,
          onCueChange: null,
          onCut: null,
          onDblClick: null,
          onDrag: null,
          onDragEnd: null,
          onDragEnter: null,
          onDragExit: null,
          onDragLeave: null,
          onDragOver: null,
          onDragStart: null,
          onDrop: null,
          onDurationChange: null,
          onEmptied: null,
          onEnded: null,
          onError: null,
          onFocus: null,
          onFormData: null,
          onHashChange: null,
          onInput: null,
          onInvalid: null,
          onKeyDown: null,
          onKeyPress: null,
          onKeyUp: null,
          onLanguageChange: null,
          onLoad: null,
          onLoadedData: null,
          onLoadedMetadata: null,
          onLoadEnd: null,
          onLoadStart: null,
          onMessage: null,
          onMessageError: null,
          onMouseDown: null,
          onMouseEnter: null,
          onMouseLeave: null,
          onMouseMove: null,
          onMouseOut: null,
          onMouseOver: null,
          onMouseUp: null,
          onOffline: null,
          onOnline: null,
          onPageHide: null,
          onPageShow: null,
          onPaste: null,
          onPause: null,
          onPlay: null,
          onPlaying: null,
          onPopState: null,
          onProgress: null,
          onRateChange: null,
          onRejectionHandled: null,
          onReset: null,
          onResize: null,
          onScroll: null,
          onScrollEnd: null,
          onSecurityPolicyViolation: null,
          onSeeked: null,
          onSeeking: null,
          onSelect: null,
          onSlotChange: null,
          onStalled: null,
          onStorage: null,
          onSubmit: null,
          onSuspend: null,
          onTimeUpdate: null,
          onToggle: null,
          onUnhandledRejection: null,
          onUnload: null,
          onVolumeChange: null,
          onWaiting: null,
          onWheel: null,
          open: s,
          optimum: v,
          pattern: null,
          ping: w,
          placeholder: null,
          playsInline: s,
          popover: null,
          popoverTarget: null,
          popoverTargetAction: null,
          poster: null,
          preload: null,
          readOnly: s,
          referrerPolicy: null,
          rel: w,
          required: s,
          reversed: s,
          rows: v,
          rowSpan: v,
          sandbox: w,
          scope: null,
          scoped: s,
          seamless: s,
          selected: s,
          shadowRootClonable: s,
          shadowRootDelegatesFocus: s,
          shadowRootMode: null,
          shape: null,
          size: v,
          sizes: null,
          slot: null,
          span: v,
          spellCheck: t,
          src: null,
          srcDoc: null,
          srcLang: null,
          srcSet: null,
          start: v,
          step: null,
          style: null,
          tabIndex: v,
          target: null,
          title: null,
          translate: null,
          type: null,
          typeMustMatch: s,
          useMap: null,
          value: t,
          width: v,
          wrap: null,
          writingSuggestions: null,
          align: null,
          aLink: null,
          archive: w,
          axis: null,
          background: null,
          bgColor: null,
          border: v,
          borderColor: null,
          bottomMargin: v,
          cellPadding: null,
          cellSpacing: null,
          char: null,
          charOff: null,
          classId: null,
          clear: null,
          code: null,
          codeBase: null,
          codeType: null,
          color: null,
          compact: s,
          declare: s,
          event: null,
          face: null,
          frame: null,
          frameBorder: null,
          hSpace: v,
          leftMargin: v,
          link: null,
          longDesc: null,
          lowSrc: null,
          marginHeight: v,
          marginWidth: v,
          noResize: s,
          noHref: s,
          noShade: s,
          noWrap: s,
          object: null,
          profile: null,
          prompt: null,
          rev: null,
          rightMargin: v,
          rules: null,
          scheme: null,
          scrolling: t,
          standby: null,
          summary: null,
          text: null,
          topMargin: v,
          valueType: null,
          version: null,
          vAlign: null,
          vLink: null,
          vSpace: v,
          allowTransparency: null,
          autoCorrect: null,
          autoSave: null,
          disablePictureInPicture: s,
          disableRemotePlayback: s,
          prefix: null,
          property: null,
          results: v,
          security: null,
          unselectable: null,
        },
        space: 'html',
        transform: P,
      }),
      R = M({
        attributes: {
          accentHeight: 'accent-height',
          alignmentBaseline: 'alignment-baseline',
          arabicForm: 'arabic-form',
          baselineShift: 'baseline-shift',
          capHeight: 'cap-height',
          className: 'class',
          clipPath: 'clip-path',
          clipRule: 'clip-rule',
          colorInterpolation: 'color-interpolation',
          colorInterpolationFilters: 'color-interpolation-filters',
          colorProfile: 'color-profile',
          colorRendering: 'color-rendering',
          crossOrigin: 'crossorigin',
          dataType: 'datatype',
          dominantBaseline: 'dominant-baseline',
          enableBackground: 'enable-background',
          fillOpacity: 'fill-opacity',
          fillRule: 'fill-rule',
          floodColor: 'flood-color',
          floodOpacity: 'flood-opacity',
          fontFamily: 'font-family',
          fontSize: 'font-size',
          fontSizeAdjust: 'font-size-adjust',
          fontStretch: 'font-stretch',
          fontStyle: 'font-style',
          fontVariant: 'font-variant',
          fontWeight: 'font-weight',
          glyphName: 'glyph-name',
          glyphOrientationHorizontal: 'glyph-orientation-horizontal',
          glyphOrientationVertical: 'glyph-orientation-vertical',
          hrefLang: 'hreflang',
          horizAdvX: 'horiz-adv-x',
          horizOriginX: 'horiz-origin-x',
          horizOriginY: 'horiz-origin-y',
          imageRendering: 'image-rendering',
          letterSpacing: 'letter-spacing',
          lightingColor: 'lighting-color',
          markerEnd: 'marker-end',
          markerMid: 'marker-mid',
          markerStart: 'marker-start',
          navDown: 'nav-down',
          navDownLeft: 'nav-down-left',
          navDownRight: 'nav-down-right',
          navLeft: 'nav-left',
          navNext: 'nav-next',
          navPrev: 'nav-prev',
          navRight: 'nav-right',
          navUp: 'nav-up',
          navUpLeft: 'nav-up-left',
          navUpRight: 'nav-up-right',
          onAbort: 'onabort',
          onActivate: 'onactivate',
          onAfterPrint: 'onafterprint',
          onBeforePrint: 'onbeforeprint',
          onBegin: 'onbegin',
          onCancel: 'oncancel',
          onCanPlay: 'oncanplay',
          onCanPlayThrough: 'oncanplaythrough',
          onChange: 'onchange',
          onClick: 'onclick',
          onClose: 'onclose',
          onCopy: 'oncopy',
          onCueChange: 'oncuechange',
          onCut: 'oncut',
          onDblClick: 'ondblclick',
          onDrag: 'ondrag',
          onDragEnd: 'ondragend',
          onDragEnter: 'ondragenter',
          onDragExit: 'ondragexit',
          onDragLeave: 'ondragleave',
          onDragOver: 'ondragover',
          onDragStart: 'ondragstart',
          onDrop: 'ondrop',
          onDurationChange: 'ondurationchange',
          onEmptied: 'onemptied',
          onEnd: 'onend',
          onEnded: 'onended',
          onError: 'onerror',
          onFocus: 'onfocus',
          onFocusIn: 'onfocusin',
          onFocusOut: 'onfocusout',
          onHashChange: 'onhashchange',
          onInput: 'oninput',
          onInvalid: 'oninvalid',
          onKeyDown: 'onkeydown',
          onKeyPress: 'onkeypress',
          onKeyUp: 'onkeyup',
          onLoad: 'onload',
          onLoadedData: 'onloadeddata',
          onLoadedMetadata: 'onloadedmetadata',
          onLoadStart: 'onloadstart',
          onMessage: 'onmessage',
          onMouseDown: 'onmousedown',
          onMouseEnter: 'onmouseenter',
          onMouseLeave: 'onmouseleave',
          onMouseMove: 'onmousemove',
          onMouseOut: 'onmouseout',
          onMouseOver: 'onmouseover',
          onMouseUp: 'onmouseup',
          onMouseWheel: 'onmousewheel',
          onOffline: 'onoffline',
          onOnline: 'ononline',
          onPageHide: 'onpagehide',
          onPageShow: 'onpageshow',
          onPaste: 'onpaste',
          onPause: 'onpause',
          onPlay: 'onplay',
          onPlaying: 'onplaying',
          onPopState: 'onpopstate',
          onProgress: 'onprogress',
          onRateChange: 'onratechange',
          onRepeat: 'onrepeat',
          onReset: 'onreset',
          onResize: 'onresize',
          onScroll: 'onscroll',
          onSeeked: 'onseeked',
          onSeeking: 'onseeking',
          onSelect: 'onselect',
          onShow: 'onshow',
          onStalled: 'onstalled',
          onStorage: 'onstorage',
          onSubmit: 'onsubmit',
          onSuspend: 'onsuspend',
          onTimeUpdate: 'ontimeupdate',
          onToggle: 'ontoggle',
          onUnload: 'onunload',
          onVolumeChange: 'onvolumechange',
          onWaiting: 'onwaiting',
          onZoom: 'onzoom',
          overlinePosition: 'overline-position',
          overlineThickness: 'overline-thickness',
          paintOrder: 'paint-order',
          panose1: 'panose-1',
          pointerEvents: 'pointer-events',
          referrerPolicy: 'referrerpolicy',
          renderingIntent: 'rendering-intent',
          shapeRendering: 'shape-rendering',
          stopColor: 'stop-color',
          stopOpacity: 'stop-opacity',
          strikethroughPosition: 'strikethrough-position',
          strikethroughThickness: 'strikethrough-thickness',
          strokeDashArray: 'stroke-dasharray',
          strokeDashOffset: 'stroke-dashoffset',
          strokeLineCap: 'stroke-linecap',
          strokeLineJoin: 'stroke-linejoin',
          strokeMiterLimit: 'stroke-miterlimit',
          strokeOpacity: 'stroke-opacity',
          strokeWidth: 'stroke-width',
          tabIndex: 'tabindex',
          textAnchor: 'text-anchor',
          textDecoration: 'text-decoration',
          textRendering: 'text-rendering',
          transformOrigin: 'transform-origin',
          typeOf: 'typeof',
          underlinePosition: 'underline-position',
          underlineThickness: 'underline-thickness',
          unicodeBidi: 'unicode-bidi',
          unicodeRange: 'unicode-range',
          unitsPerEm: 'units-per-em',
          vAlphabetic: 'v-alphabetic',
          vHanging: 'v-hanging',
          vIdeographic: 'v-ideographic',
          vMathematical: 'v-mathematical',
          vectorEffect: 'vector-effect',
          vertAdvY: 'vert-adv-y',
          vertOriginX: 'vert-origin-x',
          vertOriginY: 'vert-origin-y',
          wordSpacing: 'word-spacing',
          writingMode: 'writing-mode',
          xHeight: 'x-height',
          playbackOrder: 'playbackorder',
          timelineBegin: 'timelinebegin',
        },
        properties: {
          about: y,
          accentHeight: v,
          accumulate: null,
          additive: null,
          alignmentBaseline: null,
          alphabetic: v,
          amplitude: v,
          arabicForm: null,
          ascent: v,
          attributeName: null,
          attributeType: null,
          azimuth: v,
          bandwidth: null,
          baselineShift: null,
          baseFrequency: null,
          baseProfile: null,
          bbox: null,
          begin: null,
          bias: v,
          by: null,
          calcMode: null,
          capHeight: v,
          className: w,
          clip: null,
          clipPath: null,
          clipPathUnits: null,
          clipRule: null,
          color: null,
          colorInterpolation: null,
          colorInterpolationFilters: null,
          colorProfile: null,
          colorRendering: null,
          content: null,
          contentScriptType: null,
          contentStyleType: null,
          crossOrigin: null,
          cursor: null,
          cx: null,
          cy: null,
          d: null,
          dataType: null,
          defaultAction: null,
          descent: v,
          diffuseConstant: v,
          direction: null,
          display: null,
          dur: null,
          divisor: v,
          dominantBaseline: null,
          download: s,
          dx: null,
          dy: null,
          edgeMode: null,
          editable: null,
          elevation: v,
          enableBackground: null,
          end: null,
          event: null,
          exponent: v,
          externalResourcesRequired: null,
          fill: null,
          fillOpacity: v,
          fillRule: null,
          filter: null,
          filterRes: null,
          filterUnits: null,
          floodColor: null,
          floodOpacity: null,
          focusable: null,
          focusHighlight: null,
          fontFamily: null,
          fontSize: null,
          fontSizeAdjust: null,
          fontStretch: null,
          fontStyle: null,
          fontVariant: null,
          fontWeight: null,
          format: null,
          fr: null,
          from: null,
          fx: null,
          fy: null,
          g1: x,
          g2: x,
          glyphName: x,
          glyphOrientationHorizontal: null,
          glyphOrientationVertical: null,
          glyphRef: null,
          gradientTransform: null,
          gradientUnits: null,
          handler: null,
          hanging: v,
          hatchContentUnits: null,
          hatchUnits: null,
          height: null,
          href: null,
          hrefLang: null,
          horizAdvX: v,
          horizOriginX: v,
          horizOriginY: v,
          id: null,
          ideographic: v,
          imageRendering: null,
          initialVisibility: null,
          in: null,
          in2: null,
          intercept: v,
          k: v,
          k1: v,
          k2: v,
          k3: v,
          k4: v,
          kernelMatrix: y,
          kernelUnitLength: null,
          keyPoints: null,
          keySplines: null,
          keyTimes: null,
          kerning: null,
          lang: null,
          lengthAdjust: null,
          letterSpacing: null,
          lightingColor: null,
          limitingConeAngle: v,
          local: null,
          markerEnd: null,
          markerMid: null,
          markerStart: null,
          markerHeight: null,
          markerUnits: null,
          markerWidth: null,
          mask: null,
          maskContentUnits: null,
          maskUnits: null,
          mathematical: null,
          max: null,
          media: null,
          mediaCharacterEncoding: null,
          mediaContentEncodings: null,
          mediaSize: v,
          mediaTime: null,
          method: null,
          min: null,
          mode: null,
          name: null,
          navDown: null,
          navDownLeft: null,
          navDownRight: null,
          navLeft: null,
          navNext: null,
          navPrev: null,
          navRight: null,
          navUp: null,
          navUpLeft: null,
          navUpRight: null,
          numOctaves: null,
          observer: null,
          offset: null,
          onAbort: null,
          onActivate: null,
          onAfterPrint: null,
          onBeforePrint: null,
          onBegin: null,
          onCancel: null,
          onCanPlay: null,
          onCanPlayThrough: null,
          onChange: null,
          onClick: null,
          onClose: null,
          onCopy: null,
          onCueChange: null,
          onCut: null,
          onDblClick: null,
          onDrag: null,
          onDragEnd: null,
          onDragEnter: null,
          onDragExit: null,
          onDragLeave: null,
          onDragOver: null,
          onDragStart: null,
          onDrop: null,
          onDurationChange: null,
          onEmptied: null,
          onEnd: null,
          onEnded: null,
          onError: null,
          onFocus: null,
          onFocusIn: null,
          onFocusOut: null,
          onHashChange: null,
          onInput: null,
          onInvalid: null,
          onKeyDown: null,
          onKeyPress: null,
          onKeyUp: null,
          onLoad: null,
          onLoadedData: null,
          onLoadedMetadata: null,
          onLoadStart: null,
          onMessage: null,
          onMouseDown: null,
          onMouseEnter: null,
          onMouseLeave: null,
          onMouseMove: null,
          onMouseOut: null,
          onMouseOver: null,
          onMouseUp: null,
          onMouseWheel: null,
          onOffline: null,
          onOnline: null,
          onPageHide: null,
          onPageShow: null,
          onPaste: null,
          onPause: null,
          onPlay: null,
          onPlaying: null,
          onPopState: null,
          onProgress: null,
          onRateChange: null,
          onRepeat: null,
          onReset: null,
          onResize: null,
          onScroll: null,
          onSeeked: null,
          onSeeking: null,
          onSelect: null,
          onShow: null,
          onStalled: null,
          onStorage: null,
          onSubmit: null,
          onSuspend: null,
          onTimeUpdate: null,
          onToggle: null,
          onUnload: null,
          onVolumeChange: null,
          onWaiting: null,
          onZoom: null,
          opacity: null,
          operator: null,
          order: null,
          orient: null,
          orientation: null,
          origin: null,
          overflow: null,
          overlay: null,
          overlinePosition: v,
          overlineThickness: v,
          paintOrder: null,
          panose1: null,
          path: null,
          pathLength: v,
          patternContentUnits: null,
          patternTransform: null,
          patternUnits: null,
          phase: null,
          ping: w,
          pitch: null,
          playbackOrder: null,
          pointerEvents: null,
          points: null,
          pointsAtX: v,
          pointsAtY: v,
          pointsAtZ: v,
          preserveAlpha: null,
          preserveAspectRatio: null,
          primitiveUnits: null,
          propagate: null,
          property: y,
          r: null,
          radius: null,
          referrerPolicy: null,
          refX: null,
          refY: null,
          rel: y,
          rev: y,
          renderingIntent: null,
          repeatCount: null,
          repeatDur: null,
          requiredExtensions: y,
          requiredFeatures: y,
          requiredFonts: y,
          requiredFormats: y,
          resource: null,
          restart: null,
          result: null,
          rotate: null,
          rx: null,
          ry: null,
          scale: null,
          seed: null,
          shapeRendering: null,
          side: null,
          slope: null,
          snapshotTime: null,
          specularConstant: v,
          specularExponent: v,
          spreadMethod: null,
          spacing: null,
          startOffset: null,
          stdDeviation: null,
          stemh: null,
          stemv: null,
          stitchTiles: null,
          stopColor: null,
          stopOpacity: null,
          strikethroughPosition: v,
          strikethroughThickness: v,
          string: null,
          stroke: null,
          strokeDashArray: y,
          strokeDashOffset: null,
          strokeLineCap: null,
          strokeLineJoin: null,
          strokeMiterLimit: v,
          strokeOpacity: v,
          strokeWidth: null,
          style: null,
          surfaceScale: v,
          syncBehavior: null,
          syncBehaviorDefault: null,
          syncMaster: null,
          syncTolerance: null,
          syncToleranceDefault: null,
          systemLanguage: y,
          tabIndex: v,
          tableValues: null,
          target: null,
          targetX: v,
          targetY: v,
          textAnchor: null,
          textDecoration: null,
          textRendering: null,
          textLength: null,
          timelineBegin: null,
          title: null,
          transformBehavior: null,
          type: null,
          typeOf: y,
          to: null,
          transform: null,
          transformOrigin: null,
          u1: null,
          u2: null,
          underlinePosition: v,
          underlineThickness: v,
          unicode: null,
          unicodeBidi: null,
          unicodeRange: null,
          unitsPerEm: v,
          values: null,
          vAlphabetic: v,
          vMathematical: v,
          vectorEffect: null,
          vHanging: v,
          vIdeographic: v,
          version: null,
          vertAdvY: v,
          vertOriginX: v,
          vertOriginY: v,
          viewBox: null,
          viewTarget: null,
          visibility: null,
          width: null,
          widths: null,
          wordSpacing: null,
          writingMode: null,
          x: null,
          x1: null,
          x2: null,
          xChannelSelector: null,
          xHeight: v,
          y: null,
          y1: null,
          y2: null,
          yChannelSelector: null,
          z: null,
          zoomAndPan: null,
        },
        space: 'svg',
        transform: O,
      }),
      S = M({
        properties: {
          xLinkActuate: null,
          xLinkArcRole: null,
          xLinkHref: null,
          xLinkRole: null,
          xLinkShow: null,
          xLinkTitle: null,
          xLinkType: null,
        },
        space: 'xlink',
        transform: (a, b) => 'xlink:' + b.slice(5).toLowerCase(),
      }),
      T = M({
        attributes: { xmlnsxlink: 'xmlns:xlink' },
        properties: { xmlnsXLink: null, xmlns: null },
        space: 'xmlns',
        transform: P,
      }),
      U = M({
        properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
        space: 'xml',
        transform: (a, b) => 'xml:' + b.slice(3).toLowerCase(),
      }),
      V = L([N, Q, S, T, U], 'html'),
      W = L([N, R, S, T, U], 'svg');
    var X = a.i(30841);
    let Y = $('end'),
      Z = $('start');
    function $(a) {
      return function (b) {
        let c = (b && b.position && b.position[a]) || {};
        if (
          'number' == typeof c.line &&
          c.line > 0 &&
          'number' == typeof c.column &&
          c.column > 0
        )
          return {
            line: c.line,
            column: c.column,
            offset:
              'number' == typeof c.offset && c.offset > -1 ? c.offset : void 0,
          };
      };
    }
    function _(a) {
      return a && 'object' == typeof a
        ? 'position' in a || 'type' in a
          ? ab(a.position)
          : 'start' in a || 'end' in a
            ? ab(a)
            : 'line' in a || 'column' in a
              ? aa(a)
              : ''
        : '';
    }
    function aa(a) {
      return ac(a && a.line) + ':' + ac(a && a.column);
    }
    function ab(a) {
      return aa(a && a.start) + '-' + aa(a && a.end);
    }
    function ac(a) {
      return a && 'number' == typeof a ? a : 1;
    }
    class ad extends Error {
      constructor(a, b, c) {
        (super(), 'string' == typeof b && ((c = b), (b = void 0)));
        let d = '',
          e = {},
          f = !1;
        if (
          (b &&
            (e =
              ('line' in b && 'column' in b) || ('start' in b && 'end' in b)
                ? { place: b }
                : 'type' in b
                  ? { ancestors: [b], place: b.position }
                  : { ...b }),
          'string' == typeof a
            ? (d = a)
            : !e.cause && a && ((f = !0), (d = a.message), (e.cause = a)),
          !e.ruleId && !e.source && 'string' == typeof c)
        ) {
          const a = c.indexOf(':');
          -1 === a
            ? (e.ruleId = c)
            : ((e.source = c.slice(0, a)), (e.ruleId = c.slice(a + 1)));
        }
        if (!e.place && e.ancestors && e.ancestors) {
          const a = e.ancestors[e.ancestors.length - 1];
          a && (e.place = a.position);
        }
        const g = e.place && 'start' in e.place ? e.place.start : e.place;
        ((this.ancestors = e.ancestors || void 0),
          (this.cause = e.cause || void 0),
          (this.column = g ? g.column : void 0),
          (this.fatal = void 0),
          (this.file = ''),
          (this.message = d),
          (this.line = g ? g.line : void 0),
          (this.name = _(e.place) || '1:1'),
          (this.place = e.place || void 0),
          (this.reason = this.message),
          (this.ruleId = e.ruleId || void 0),
          (this.source = e.source || void 0),
          (this.stack =
            f && e.cause && 'string' == typeof e.cause.stack
              ? e.cause.stack
              : ''),
          (this.actual = void 0),
          (this.expected = void 0),
          (this.note = void 0),
          (this.url = void 0));
      }
    }
    ((ad.prototype.file = ''),
      (ad.prototype.name = ''),
      (ad.prototype.reason = ''),
      (ad.prototype.message = ''),
      (ad.prototype.stack = ''),
      (ad.prototype.column = void 0),
      (ad.prototype.line = void 0),
      (ad.prototype.ancestors = void 0),
      (ad.prototype.cause = void 0),
      (ad.prototype.fatal = void 0),
      (ad.prototype.place = void 0),
      (ad.prototype.ruleId = void 0),
      (ad.prototype.source = void 0));
    let ae = {}.hasOwnProperty,
      af = new Map(),
      ag = /[A-Z]/g,
      ah = new Set(['table', 'tbody', 'thead', 'tfoot', 'tr']),
      ai = new Set(['td', 'th']),
      aj = 'https://github.com/syntax-tree/hast-util-to-jsx-runtime';
    function ak(a, b, c) {
      var d, e, f, g, h, j, k, l, m;
      let n, o, r, s, t, u, v, w, x, y, z;
      return 'element' === b.type
        ? ((d = a),
          (e = b),
          (f = c),
          (o = n = d.schema),
          'svg' === e.tagName.toLowerCase() &&
            'html' === n.space &&
            (d.schema = W),
          d.ancestors.push(e),
          (r = ao(d, e.tagName, !1)),
          (s = (function (a, b) {
            let c,
              d,
              e = {};
            for (d in b.properties)
              if ('children' !== d && ae.call(b.properties, d)) {
                let f = (function (a, b, c) {
                  let d = (function (a, b) {
                    let c = D(b),
                      d = b,
                      e = q;
                    if (c in a.normal) return a.property[a.normal[c]];
                    if (c.length > 4 && 'data' === c.slice(0, 4) && G.test(b)) {
                      if ('-' === b.charAt(4)) {
                        let a = b.slice(5).replace(F, I);
                        d = 'data' + a.charAt(0).toUpperCase() + a.slice(1);
                      } else {
                        let a = b.slice(4);
                        if (!F.test(a)) {
                          let c = a.replace(E, H);
                          ('-' !== c.charAt(0) && (c = '-' + c),
                            (b = 'data' + c));
                        }
                      }
                      e = C;
                    }
                    return new e(d, b);
                  })(a.schema, b);
                  if (
                    !(null == c || ('number' == typeof c && Number.isNaN(c)))
                  ) {
                    var e;
                    let b;
                    if (
                      (Array.isArray(c) &&
                        (c = d.commaSeparated
                          ? ((b = {}),
                            ('' === (e = c)[e.length - 1] ? [...e, ''] : e)
                              .join(
                                (b.padRight ? ' ' : '') +
                                  ',' +
                                  (!1 === b.padLeft ? '' : ' ')
                              )
                              .trim())
                          : c.join(' ').trim()),
                      'style' === d.property)
                    ) {
                      let b =
                        'object' == typeof c
                          ? c
                          : (function (a, b) {
                              try {
                                return (0, X.default)(b, { reactCompat: !0 });
                              } catch (c) {
                                if (a.ignoreInvalidStyle) return {};
                                let b = new ad(
                                  'Cannot parse `style` attribute',
                                  {
                                    ancestors: a.ancestors,
                                    cause: c,
                                    ruleId: 'style',
                                    source: 'hast-util-to-jsx-runtime',
                                  }
                                );
                                throw (
                                  (b.file = a.filePath || void 0),
                                  (b.url =
                                    aj + '#cannot-parse-style-attribute'),
                                  b
                                );
                              }
                            })(a, String(c));
                      return (
                        'css' === a.stylePropertyNameCase &&
                          (b = (function (a) {
                            let b,
                              c = {};
                            for (b in a)
                              ae.call(a, b) &&
                                (c[
                                  (function (a) {
                                    let b = a.replace(ag, aq);
                                    return (
                                      'ms-' === b.slice(0, 3) && (b = '-' + b),
                                      b
                                    );
                                  })(b)
                                ] = a[b]);
                            return c;
                          })(b)),
                        ['style', b]
                      );
                    }
                    return [
                      'react' === a.elementAttributeNameCase && d.space
                        ? J[d.property] || d.property
                        : d.attribute,
                      c,
                    ];
                  }
                })(a, d, b.properties[d]);
                if (f) {
                  let [d, g] = f;
                  a.tableCellAlignToStyle &&
                  'align' === d &&
                  'string' == typeof g &&
                  ai.has(b.tagName)
                    ? (c = g)
                    : (e[d] = g);
                }
              }
            return (
              c &&
                ((e.style || (e.style = {}))[
                  'css' === a.stylePropertyNameCase ? 'text-align' : 'textAlign'
                ] = c),
              e
            );
          })(d, e)),
          (t = an(d, e)),
          ah.has(e.tagName) &&
            (t = t.filter(function (a) {
              return (
                'string' != typeof a ||
                !('object' == typeof a ? 'text' === a.type && p(a.value) : p(a))
              );
            })),
          al(d, s, r, e),
          am(s, t),
          d.ancestors.pop(),
          (d.schema = n),
          d.create(e, r, s, f))
        : 'mdxFlowExpression' === b.type || 'mdxTextExpression' === b.type
          ? (function (a, b) {
              if (b.data && b.data.estree && a.evaluater) {
                let c = b.data.estree.body[0];
                return (
                  i('ExpressionStatement' === c.type),
                  a.evaluater.evaluateExpression(c.expression)
                );
              }
              ap(a, b.position);
            })(a, b)
          : 'mdxJsxFlowElement' === b.type || 'mdxJsxTextElement' === b.type
            ? ((g = a),
              (h = b),
              (j = c),
              (v = u = g.schema),
              'svg' === h.name && 'html' === u.space && (g.schema = W),
              g.ancestors.push(h),
              (w = null === h.name ? g.Fragment : ao(g, h.name, !0)),
              (x = (function (a, b) {
                let c = {};
                for (let d of b.attributes)
                  if ('mdxJsxExpressionAttribute' === d.type)
                    if (d.data && d.data.estree && a.evaluater) {
                      let b = d.data.estree.body[0];
                      i('ExpressionStatement' === b.type);
                      let e = b.expression;
                      i('ObjectExpression' === e.type);
                      let f = e.properties[0];
                      (i('SpreadElement' === f.type),
                        Object.assign(
                          c,
                          a.evaluater.evaluateExpression(f.argument)
                        ));
                    } else ap(a, b.position);
                  else {
                    let e,
                      f = d.name;
                    if (d.value && 'object' == typeof d.value)
                      if (d.value.data && d.value.data.estree && a.evaluater) {
                        let b = d.value.data.estree.body[0];
                        (i('ExpressionStatement' === b.type),
                          (e = a.evaluater.evaluateExpression(b.expression)));
                      } else ap(a, b.position);
                    else e = null === d.value || d.value;
                    c[f] = e;
                  }
                return c;
              })(g, h)),
              (y = an(g, h)),
              al(g, x, w, h),
              am(x, y),
              g.ancestors.pop(),
              (g.schema = u),
              g.create(h, w, x, j))
            : 'mdxjsEsm' === b.type
              ? (function (a, b) {
                  if (b.data && b.data.estree && a.evaluater)
                    return a.evaluater.evaluateProgram(b.data.estree);
                  ap(a, b.position);
                })(a, b)
              : 'root' === b.type
                ? ((k = a),
                  (l = b),
                  (m = c),
                  am((z = {}), an(k, l)),
                  k.create(l, k.Fragment, z, m))
                : 'text' === b.type
                  ? b.value
                  : void 0;
    }
    function al(a, b, c, d) {
      'string' != typeof c && c !== a.Fragment && a.passNode && (b.node = d);
    }
    function am(a, b) {
      if (b.length > 0) {
        let c = b.length > 1 ? b : b[0];
        c && (a.children = c);
      }
    }
    function an(a, b) {
      let c = [],
        d = -1,
        e = a.passKeys ? new Map() : af;
      for (; ++d < b.children.length; ) {
        let f,
          g = b.children[d];
        if (a.passKeys) {
          let a =
            'element' === g.type
              ? g.tagName
              : 'mdxJsxFlowElement' === g.type || 'mdxJsxTextElement' === g.type
                ? g.name
                : void 0;
          if (a) {
            let b = e.get(a) || 0;
            ((f = a + '-' + b), e.set(a, b + 1));
          }
        }
        let h = ak(a, g, f);
        void 0 !== h && c.push(h);
      }
      return c;
    }
    function ao(a, b, c) {
      let d;
      if (c)
        if (b.includes('.')) {
          let a,
            c = b.split('.'),
            e = -1;
          for (; ++e < c.length; ) {
            let b = n(c[e])
              ? { type: 'Identifier', name: c[e] }
              : { type: 'Literal', value: c[e] };
            a = a
              ? {
                  type: 'MemberExpression',
                  object: a,
                  property: b,
                  computed: !!(e && 'Literal' === b.type),
                  optional: !1,
                }
              : b;
          }
          (i(a, 'always a result'), (d = a));
        } else
          d =
            n(b) && !/^[a-z]/.test(b)
              ? { type: 'Identifier', name: b }
              : { type: 'Literal', value: b };
      else d = { type: 'Literal', value: b };
      if ('Literal' === d.type) {
        let b = d.value;
        return ae.call(a.components, b) ? a.components[b] : b;
      }
      if (a.evaluater) return a.evaluater.evaluateExpression(d);
      ap(a);
    }
    function ap(a, b) {
      let c = new ad('Cannot handle MDX estrees without `createEvaluater`', {
        ancestors: a.ancestors,
        place: b,
        ruleId: 'mdx-estree',
        source: 'hast-util-to-jsx-runtime',
      });
      throw (
        (c.file = a.filePath || void 0),
        (c.url = aj + '#cannot-handle-mdx-estrees-without-createevaluater'),
        c
      );
    }
    function aq(a) {
      return '-' + a.toLowerCase();
    }
    let ar = {
      action: ['form'],
      cite: ['blockquote', 'del', 'ins', 'q'],
      data: ['object'],
      formAction: ['button', 'input'],
      href: ['a', 'area', 'base', 'link'],
      icon: ['menuitem'],
      itemId: null,
      manifest: ['html'],
      ping: ['a', 'area'],
      poster: ['video'],
      src: [
        'audio',
        'embed',
        'iframe',
        'img',
        'input',
        'script',
        'source',
        'track',
        'video',
      ],
    };
    a.i(10385);
    let as = {};
    function at(a, b, c) {
      var d;
      if ((d = a) && 'object' == typeof d) {
        if ('value' in a) return 'html' !== a.type || c ? a.value : '';
        if (b && 'alt' in a && a.alt) return a.alt;
        if ('children' in a) return au(a.children, b, c);
      }
      return Array.isArray(a) ? au(a, b, c) : '';
    }
    function au(a, b, c) {
      let d = [],
        e = -1;
      for (; ++e < a.length; ) d[e] = at(a[e], b, c);
      return d.join('');
    }
    function av(a, b, c, d) {
      let e,
        f = a.length,
        g = 0;
      if (
        ((b = b < 0 ? (-b > f ? 0 : f + b) : b > f ? f : b),
        (c = c > 0 ? c : 0),
        d.length < 1e4)
      )
        ((e = Array.from(d)).unshift(b, c), a.splice(...e));
      else
        for (c && a.splice(b, c); g < d.length; )
          ((e = d.slice(g, g + 1e4)).unshift(b, 0),
            a.splice(...e),
            (g += 1e4),
            (b += 1e4));
    }
    function aw(a, b) {
      return a.length > 0 ? (av(a, a.length, 0, b), a) : b;
    }
    let ax = {}.hasOwnProperty,
      ay = aK(/[A-Za-z]/),
      az = aK(/[\dA-Za-z]/),
      aA = aK(/[#-'*+\--9=?A-Z^-~]/);
    function aB(a) {
      return null !== a && (a < 32 || 127 === a);
    }
    let aC = aK(/\d/),
      aD = aK(/[\dA-Fa-f]/),
      aE = aK(/[!-/:-@[-`{-~]/);
    function aF(a) {
      return null !== a && a < -2;
    }
    function aG(a) {
      return null !== a && (a < 0 || 32 === a);
    }
    function aH(a) {
      return -2 === a || -1 === a || 32 === a;
    }
    let aI = aK(/\p{P}|\p{S}/u),
      aJ = aK(/\s/);
    function aK(a) {
      return function (b) {
        return null !== b && b > -1 && a.test(String.fromCharCode(b));
      };
    }
    function aL(a, b, c, d) {
      let e = d ? d - 1 : 1 / 0,
        f = 0;
      return function (d) {
        return aH(d)
          ? (a.enter(c),
            (function d(g) {
              return aH(g) && f++ < e ? (a.consume(g), d) : (a.exit(c), b(g));
            })(d))
          : b(d);
      };
    }
    let aM = {
        tokenize: function (a) {
          let b,
            c = a.attempt(
              this.parser.constructs.contentInitial,
              function (b) {
                return null === b
                  ? void a.consume(b)
                  : (a.enter('lineEnding'),
                    a.consume(b),
                    a.exit('lineEnding'),
                    aL(a, c, 'linePrefix'));
              },
              function (c) {
                return (
                  a.enter('paragraph'),
                  (function c(d) {
                    let e = a.enter('chunkText', {
                      contentType: 'text',
                      previous: b,
                    });
                    return (
                      b && (b.next = e),
                      (b = e),
                      (function b(d) {
                        if (null === d) {
                          (a.exit('chunkText'),
                            a.exit('paragraph'),
                            a.consume(d));
                          return;
                        }
                        return aF(d)
                          ? (a.consume(d), a.exit('chunkText'), c)
                          : (a.consume(d), b);
                      })(d)
                    );
                  })(c)
                );
              }
            );
          return c;
        },
      },
      aN = {
        tokenize: function (a) {
          let b,
            c,
            d,
            e = this,
            f = [],
            g = 0;
          return h;
          function h(b) {
            if (g < f.length) {
              let c = f[g];
              return (
                (e.containerState = c[1]),
                a.attempt(c[0].continuation, i, j)(b)
              );
            }
            return j(b);
          }
          function i(a) {
            if ((g++, e.containerState._closeFlow)) {
              let c;
              ((e.containerState._closeFlow = void 0), b && r());
              let d = e.events.length,
                f = d;
              for (; f--; )
                if (
                  'exit' === e.events[f][0] &&
                  'chunkFlow' === e.events[f][1].type
                ) {
                  c = e.events[f][1].end;
                  break;
                }
              q(g);
              let h = d;
              for (; h < e.events.length; )
                ((e.events[h][1].end = { ...c }), h++);
              return (
                av(e.events, f + 1, 0, e.events.slice(d)),
                (e.events.length = h),
                j(a)
              );
            }
            return h(a);
          }
          function j(c) {
            if (g === f.length) {
              if (!b) return m(c);
              if (b.currentConstruct && b.currentConstruct.concrete)
                return o(c);
              e.interrupt = !!(
                b.currentConstruct && !b._gfmTableDynamicInterruptHack
              );
            }
            return ((e.containerState = {}), a.check(aO, k, l)(c));
          }
          function k(a) {
            return (b && r(), q(g), m(a));
          }
          function l(a) {
            return (
              (e.parser.lazy[e.now().line] = g !== f.length),
              (d = e.now().offset),
              o(a)
            );
          }
          function m(b) {
            return ((e.containerState = {}), a.attempt(aO, n, o)(b));
          }
          function n(a) {
            return (g++, f.push([e.currentConstruct, e.containerState]), m(a));
          }
          function o(d) {
            if (null === d) {
              (b && r(), q(0), a.consume(d));
              return;
            }
            return (
              (b = b || e.parser.flow(e.now())),
              a.enter('chunkFlow', {
                _tokenizer: b,
                contentType: 'flow',
                previous: c,
              }),
              (function b(c) {
                if (null === c) {
                  (p(a.exit('chunkFlow'), !0), q(0), a.consume(c));
                  return;
                }
                return aF(c)
                  ? (a.consume(c),
                    p(a.exit('chunkFlow')),
                    (g = 0),
                    (e.interrupt = void 0),
                    h)
                  : (a.consume(c), b);
              })(d)
            );
          }
          function p(a, f) {
            let h = e.sliceStream(a);
            if (
              (f && h.push(null),
              (a.previous = c),
              c && (c.next = a),
              (c = a),
              b.defineSkip(a.start),
              b.write(h),
              e.parser.lazy[a.start.line])
            ) {
              let a,
                c,
                f = b.events.length;
              for (; f--; )
                if (
                  b.events[f][1].start.offset < d &&
                  (!b.events[f][1].end || b.events[f][1].end.offset > d)
                )
                  return;
              let h = e.events.length,
                i = h;
              for (; i--; )
                if (
                  'exit' === e.events[i][0] &&
                  'chunkFlow' === e.events[i][1].type
                ) {
                  if (a) {
                    c = e.events[i][1].end;
                    break;
                  }
                  a = !0;
                }
              for (q(g), f = h; f < e.events.length; )
                ((e.events[f][1].end = { ...c }), f++);
              (av(e.events, i + 1, 0, e.events.slice(h)),
                (e.events.length = f));
            }
          }
          function q(b) {
            let c = f.length;
            for (; c-- > b; ) {
              let b = f[c];
              ((e.containerState = b[1]), b[0].exit.call(e, a));
            }
            f.length = b;
          }
          function r() {
            (b.write([null]),
              (c = void 0),
              (b = void 0),
              (e.containerState._closeFlow = void 0));
          }
        },
      },
      aO = {
        tokenize: function (a, b, c) {
          return aL(
            a,
            a.attempt(this.parser.constructs.document, b, c),
            'linePrefix',
            this.parser.constructs.disable.null.includes('codeIndented')
              ? void 0
              : 4
          );
        },
      },
      aP = {
        partial: !0,
        tokenize: function (a, b, c) {
          return function (b) {
            return aH(b) ? aL(a, d, 'linePrefix')(b) : d(b);
          };
          function d(a) {
            return null === a || aF(a) ? b(a) : c(a);
          }
        },
      };
    class aQ {
      constructor(a) {
        ((this.left = a ? [...a] : []), (this.right = []));
      }
      get(a) {
        if (a < 0 || a >= this.left.length + this.right.length)
          throw RangeError(
            'Cannot access index `' +
              a +
              '` in a splice buffer of size `' +
              (this.left.length + this.right.length) +
              '`'
          );
        return a < this.left.length
          ? this.left[a]
          : this.right[this.right.length - a + this.left.length - 1];
      }
      get length() {
        return this.left.length + this.right.length;
      }
      shift() {
        return (this.setCursor(0), this.right.pop());
      }
      slice(a, b) {
        let c = null == b ? 1 / 0 : b;
        return c < this.left.length
          ? this.left.slice(a, c)
          : a > this.left.length
            ? this.right
                .slice(
                  this.right.length - c + this.left.length,
                  this.right.length - a + this.left.length
                )
                .reverse()
            : this.left
                .slice(a)
                .concat(
                  this.right
                    .slice(this.right.length - c + this.left.length)
                    .reverse()
                );
      }
      splice(a, b, c) {
        this.setCursor(Math.trunc(a));
        let d = this.right.splice(this.right.length - (b || 0), 1 / 0);
        return (c && aR(this.left, c), d.reverse());
      }
      pop() {
        return (this.setCursor(1 / 0), this.left.pop());
      }
      push(a) {
        (this.setCursor(1 / 0), this.left.push(a));
      }
      pushMany(a) {
        (this.setCursor(1 / 0), aR(this.left, a));
      }
      unshift(a) {
        (this.setCursor(0), this.right.push(a));
      }
      unshiftMany(a) {
        (this.setCursor(0), aR(this.right, a.reverse()));
      }
      setCursor(a) {
        if (
          a !== this.left.length &&
          (!(a > this.left.length) || 0 !== this.right.length) &&
          (!(a < 0) || 0 !== this.left.length)
        )
          if (a < this.left.length) {
            let b = this.left.splice(a, 1 / 0);
            aR(this.right, b.reverse());
          } else {
            let b = this.right.splice(
              this.left.length + this.right.length - a,
              1 / 0
            );
            aR(this.left, b.reverse());
          }
      }
    }
    function aR(a, b) {
      let c = 0;
      if (b.length < 1e4) a.push(...b);
      else for (; c < b.length; ) (a.push(...b.slice(c, c + 1e4)), (c += 1e4));
    }
    function aS(a) {
      let b,
        c,
        d,
        e,
        f,
        g,
        h,
        i = {},
        j = -1,
        k = new aQ(a);
      for (; ++j < k.length; ) {
        for (; j in i; ) j = i[j];
        if (
          ((b = k.get(j)),
          j &&
            'chunkFlow' === b[1].type &&
            'listItemPrefix' === k.get(j - 1)[1].type &&
            ((d = 0) < (g = b[1]._tokenizer.events).length &&
              'lineEndingBlank' === g[d][1].type &&
              (d += 2),
            d < g.length && 'content' === g[d][1].type))
        )
          for (; ++d < g.length && 'content' !== g[d][1].type; )
            'chunkText' === g[d][1].type &&
              ((g[d][1]._isInFirstContentOfListItem = !0), d++);
        if ('enter' === b[0])
          b[1].contentType &&
            (Object.assign(
              i,
              (function (a, b) {
                let c,
                  d,
                  e = a.get(b)[1],
                  f = a.get(b)[2],
                  g = b - 1,
                  h = [],
                  i = e._tokenizer;
                !i &&
                  ((i = f.parser[e.contentType](e.start)),
                  e._contentTypeTextTrailing &&
                    (i._contentTypeTextTrailing = !0));
                let j = i.events,
                  k = [],
                  l = {},
                  m = -1,
                  n = e,
                  o = 0,
                  p = 0,
                  q = [0];
                for (; n; ) {
                  for (; a.get(++g)[1] !== n; );
                  (h.push(g),
                    !n._tokenizer &&
                      ((c = f.sliceStream(n)),
                      n.next || c.push(null),
                      d && i.defineSkip(n.start),
                      n._isInFirstContentOfListItem &&
                        (i._gfmTasklistFirstContentOfListItem = !0),
                      i.write(c),
                      n._isInFirstContentOfListItem &&
                        (i._gfmTasklistFirstContentOfListItem = void 0)),
                    (d = n),
                    (n = n.next));
                }
                for (n = e; ++m < j.length; )
                  'exit' === j[m][0] &&
                    'enter' === j[m - 1][0] &&
                    j[m][1].type === j[m - 1][1].type &&
                    j[m][1].start.line !== j[m][1].end.line &&
                    ((p = m + 1),
                    q.push(p),
                    (n._tokenizer = void 0),
                    (n.previous = void 0),
                    (n = n.next));
                for (
                  i.events = [],
                    n
                      ? ((n._tokenizer = void 0), (n.previous = void 0))
                      : q.pop(),
                    m = q.length;
                  m--;
                ) {
                  let b = j.slice(q[m], q[m + 1]),
                    c = h.pop();
                  (k.push([c, c + b.length - 1]), a.splice(c, 2, b));
                }
                for (k.reverse(), m = -1; ++m < k.length; )
                  ((l[o + k[m][0]] = o + k[m][1]),
                    (o += k[m][1] - k[m][0] - 1));
                return l;
              })(k, j)
            ),
            (j = i[j]),
            (h = !0));
        else if (b[1]._container) {
          for (d = j, c = void 0; d--; )
            if (
              'lineEnding' === (e = k.get(d))[1].type ||
              'lineEndingBlank' === e[1].type
            )
              'enter' === e[0] &&
                (c && (k.get(c)[1].type = 'lineEndingBlank'),
                (e[1].type = 'lineEnding'),
                (c = d));
            else if (
              'linePrefix' === e[1].type ||
              'listItemIndent' === e[1].type
            );
            else break;
          c &&
            ((b[1].end = { ...k.get(c)[1].start }),
            (f = k.slice(c, j)).unshift(b),
            k.splice(c, j - c + 1, f));
        }
      }
      return (av(a, 0, 1 / 0, k.slice(0)), !h);
    }
    let aT = {
        resolve: function (a) {
          return (aS(a), a);
        },
        tokenize: function (a, b) {
          let c;
          return function (b) {
            return (
              a.enter('content'),
              (c = a.enter('chunkContent', { contentType: 'content' })),
              d(b)
            );
          };
          function d(b) {
            return null === b
              ? e(b)
              : aF(b)
                ? a.check(aU, f, e)(b)
                : (a.consume(b), d);
          }
          function e(c) {
            return (a.exit('chunkContent'), a.exit('content'), b(c));
          }
          function f(b) {
            return (
              a.consume(b),
              a.exit('chunkContent'),
              (c.next = a.enter('chunkContent', {
                contentType: 'content',
                previous: c,
              })),
              (c = c.next),
              d
            );
          }
        },
      },
      aU = {
        partial: !0,
        tokenize: function (a, b, c) {
          let d = this;
          return function (b) {
            return (
              a.exit('chunkContent'),
              a.enter('lineEnding'),
              a.consume(b),
              a.exit('lineEnding'),
              aL(a, e, 'linePrefix')
            );
          };
          function e(e) {
            if (null === e || aF(e)) return c(e);
            let f = d.events[d.events.length - 1];
            return !d.parser.constructs.disable.null.includes('codeIndented') &&
              f &&
              'linePrefix' === f[1].type &&
              f[2].sliceSerialize(f[1], !0).length >= 4
              ? b(e)
              : a.interrupt(d.parser.constructs.flow, c, b)(e);
          }
        },
      },
      aV = {
        tokenize: function (a) {
          let b = this,
            c = a.attempt(
              aP,
              function (d) {
                return null === d
                  ? void a.consume(d)
                  : (a.enter('lineEndingBlank'),
                    a.consume(d),
                    a.exit('lineEndingBlank'),
                    (b.currentConstruct = void 0),
                    c);
              },
              a.attempt(
                this.parser.constructs.flowInitial,
                d,
                aL(
                  a,
                  a.attempt(this.parser.constructs.flow, d, a.attempt(aT, d)),
                  'linePrefix'
                )
              )
            );
          return c;
          function d(d) {
            return null === d
              ? void a.consume(d)
              : (a.enter('lineEnding'),
                a.consume(d),
                a.exit('lineEnding'),
                (b.currentConstruct = void 0),
                c);
          }
        },
      },
      aW = { resolveAll: a$() },
      aX = aZ('string'),
      aY = aZ('text');
    function aZ(a) {
      return {
        resolveAll: a$('text' === a ? a_ : void 0),
        tokenize: function (b) {
          let c = this,
            d = this.parser.constructs[a],
            e = b.attempt(d, f, g);
          return f;
          function f(a) {
            return i(a) ? e(a) : g(a);
          }
          function g(a) {
            return null === a
              ? void b.consume(a)
              : (b.enter('data'), b.consume(a), h);
          }
          function h(a) {
            return i(a) ? (b.exit('data'), e(a)) : (b.consume(a), h);
          }
          function i(a) {
            if (null === a) return !0;
            let b = d[a],
              e = -1;
            if (b)
              for (; ++e < b.length; ) {
                let a = b[e];
                if (!a.previous || a.previous.call(c, c.previous)) return !0;
              }
            return !1;
          }
        },
      };
    }
    function a$(a) {
      return function (b, c) {
        let d,
          e = -1;
        for (; ++e <= b.length; )
          void 0 === d
            ? b[e] && 'data' === b[e][1].type && ((d = e), e++)
            : (b[e] && 'data' === b[e][1].type) ||
              (e !== d + 2 &&
                ((b[d][1].end = b[e - 1][1].end),
                b.splice(d + 2, e - d - 2),
                (e = d + 2)),
              (d = void 0));
        return a ? a(b, c) : b;
      };
    }
    function a_(a, b) {
      let c = 0;
      for (; ++c <= a.length; )
        if (
          (c === a.length || 'lineEnding' === a[c][1].type) &&
          'data' === a[c - 1][1].type
        ) {
          let d,
            e = a[c - 1][1],
            f = b.sliceStream(e),
            g = f.length,
            h = -1,
            i = 0;
          for (; g--; ) {
            let a = f[g];
            if ('string' == typeof a) {
              for (h = a.length; 32 === a.charCodeAt(h - 1); ) (i++, h--);
              if (h) break;
              h = -1;
            } else if (-2 === a) ((d = !0), i++);
            else if (-1 === a);
            else {
              g++;
              break;
            }
          }
          if ((b._contentTypeTextTrailing && c === a.length && (i = 0), i)) {
            let f = {
              type:
                c === a.length || d || i < 2
                  ? 'lineSuffix'
                  : 'hardBreakTrailing',
              start: {
                _bufferIndex: g ? h : e.start._bufferIndex + h,
                _index: e.start._index + g,
                line: e.end.line,
                column: e.end.column - i,
                offset: e.end.offset - i,
              },
              end: { ...e.end },
            };
            ((e.end = { ...f.start }),
              e.start.offset === e.end.offset
                ? Object.assign(e, f)
                : (a.splice(c, 0, ['enter', f, b], ['exit', f, b]), (c += 2)));
          }
          c++;
        }
      return a;
    }
    function a0(a) {
      return null === a || aG(a) || aJ(a) ? 1 : aI(a) ? 2 : void 0;
    }
    function a1(a, b, c) {
      let d = [],
        e = -1;
      for (; ++e < a.length; ) {
        let f = a[e].resolveAll;
        f && !d.includes(f) && ((b = f(b, c)), d.push(f));
      }
      return b;
    }
    let a2 = {
      name: 'attention',
      resolveAll: function (a, b) {
        let c,
          d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = -1;
        for (; ++k < a.length; )
          if (
            'enter' === a[k][0] &&
            'attentionSequence' === a[k][1].type &&
            a[k][1]._close
          ) {
            for (c = k; c--; )
              if (
                'exit' === a[c][0] &&
                'attentionSequence' === a[c][1].type &&
                a[c][1]._open &&
                b.sliceSerialize(a[c][1]).charCodeAt(0) ===
                  b.sliceSerialize(a[k][1]).charCodeAt(0)
              ) {
                if (
                  (a[c][1]._close || a[k][1]._open) &&
                  (a[k][1].end.offset - a[k][1].start.offset) % 3 &&
                  !(
                    (a[c][1].end.offset -
                      a[c][1].start.offset +
                      a[k][1].end.offset -
                      a[k][1].start.offset) %
                    3
                  )
                )
                  continue;
                h =
                  a[c][1].end.offset - a[c][1].start.offset > 1 &&
                  a[k][1].end.offset - a[k][1].start.offset > 1
                    ? 2
                    : 1;
                let l = { ...a[c][1].end },
                  m = { ...a[k][1].start };
                (a3(l, -h),
                  a3(m, h),
                  (f = {
                    type: h > 1 ? 'strongSequence' : 'emphasisSequence',
                    start: l,
                    end: { ...a[c][1].end },
                  }),
                  (g = {
                    type: h > 1 ? 'strongSequence' : 'emphasisSequence',
                    start: { ...a[k][1].start },
                    end: m,
                  }),
                  (e = {
                    type: h > 1 ? 'strongText' : 'emphasisText',
                    start: { ...a[c][1].end },
                    end: { ...a[k][1].start },
                  }),
                  (d = {
                    type: h > 1 ? 'strong' : 'emphasis',
                    start: { ...f.start },
                    end: { ...g.end },
                  }),
                  (a[c][1].end = { ...f.start }),
                  (a[k][1].start = { ...g.end }),
                  (i = []),
                  a[c][1].end.offset - a[c][1].start.offset &&
                    (i = aw(i, [
                      ['enter', a[c][1], b],
                      ['exit', a[c][1], b],
                    ])),
                  (i = aw(i, [
                    ['enter', d, b],
                    ['enter', f, b],
                    ['exit', f, b],
                    ['enter', e, b],
                  ])),
                  (i = aw(
                    i,
                    a1(
                      b.parser.constructs.insideSpan.null,
                      a.slice(c + 1, k),
                      b
                    )
                  )),
                  (i = aw(i, [
                    ['exit', e, b],
                    ['enter', g, b],
                    ['exit', g, b],
                    ['exit', d, b],
                  ])),
                  a[k][1].end.offset - a[k][1].start.offset
                    ? ((j = 2),
                      (i = aw(i, [
                        ['enter', a[k][1], b],
                        ['exit', a[k][1], b],
                      ])))
                    : (j = 0),
                  av(a, c - 1, k - c + 3, i),
                  (k = c + i.length - j - 2));
                break;
              }
          }
        for (k = -1; ++k < a.length; )
          'attentionSequence' === a[k][1].type && (a[k][1].type = 'data');
        return a;
      },
      tokenize: function (a, b) {
        let c,
          d = this.parser.constructs.attentionMarkers.null,
          e = this.previous,
          f = a0(e);
        return function (g) {
          return (
            (c = g),
            a.enter('attentionSequence'),
            (function g(h) {
              if (h === c) return (a.consume(h), g);
              let i = a.exit('attentionSequence'),
                j = a0(h),
                k = !j || (2 === j && f) || d.includes(h),
                l = !f || (2 === f && j) || d.includes(e);
              return (
                (i._open = !!(42 === c ? k : k && (f || !l))),
                (i._close = !!(42 === c ? l : l && (j || !k))),
                b(h)
              );
            })(g)
          );
        };
      },
    };
    function a3(a, b) {
      ((a.column += b), (a.offset += b), (a._bufferIndex += b));
    }
    let a4 = {
        continuation: {
          tokenize: function (a, b, c) {
            let d = this;
            return function (b) {
              return aH(b)
                ? aL(
                    a,
                    e,
                    'linePrefix',
                    d.parser.constructs.disable.null.includes('codeIndented')
                      ? void 0
                      : 4
                  )(b)
                : e(b);
            };
            function e(d) {
              return a.attempt(a4, b, c)(d);
            }
          },
        },
        exit: function (a) {
          a.exit('blockQuote');
        },
        name: 'blockQuote',
        tokenize: function (a, b, c) {
          let d = this;
          return function (b) {
            if (62 === b) {
              let c = d.containerState;
              return (
                c.open ||
                  (a.enter('blockQuote', { _container: !0 }), (c.open = !0)),
                a.enter('blockQuotePrefix'),
                a.enter('blockQuoteMarker'),
                a.consume(b),
                a.exit('blockQuoteMarker'),
                e
              );
            }
            return c(b);
          };
          function e(c) {
            return aH(c)
              ? (a.enter('blockQuotePrefixWhitespace'),
                a.consume(c),
                a.exit('blockQuotePrefixWhitespace'),
                a.exit('blockQuotePrefix'),
                b)
              : (a.exit('blockQuotePrefix'), b(c));
          }
        },
      },
      a5 = {
        name: 'characterEscape',
        tokenize: function (a, b, c) {
          return function (b) {
            return (
              a.enter('characterEscape'),
              a.enter('escapeMarker'),
              a.consume(b),
              a.exit('escapeMarker'),
              d
            );
          };
          function d(d) {
            return aE(d)
              ? (a.enter('characterEscapeValue'),
                a.consume(d),
                a.exit('characterEscapeValue'),
                a.exit('characterEscape'),
                b)
              : c(d);
          }
        },
      },
      a6 = {
        AElig: 'Æ',
        AMP: '&',
        Aacute: 'Á',
        Abreve: 'Ă',
        Acirc: 'Â',
        Acy: 'А',
        Afr: '𝔄',
        Agrave: 'À',
        Alpha: 'Α',
        Amacr: 'Ā',
        And: '⩓',
        Aogon: 'Ą',
        Aopf: '𝔸',
        ApplyFunction: '⁡',
        Aring: 'Å',
        Ascr: '𝒜',
        Assign: '≔',
        Atilde: 'Ã',
        Auml: 'Ä',
        Backslash: '∖',
        Barv: '⫧',
        Barwed: '⌆',
        Bcy: 'Б',
        Because: '∵',
        Bernoullis: 'ℬ',
        Beta: 'Β',
        Bfr: '𝔅',
        Bopf: '𝔹',
        Breve: '˘',
        Bscr: 'ℬ',
        Bumpeq: '≎',
        CHcy: 'Ч',
        COPY: '©',
        Cacute: 'Ć',
        Cap: '⋒',
        CapitalDifferentialD: 'ⅅ',
        Cayleys: 'ℭ',
        Ccaron: 'Č',
        Ccedil: 'Ç',
        Ccirc: 'Ĉ',
        Cconint: '∰',
        Cdot: 'Ċ',
        Cedilla: '¸',
        CenterDot: '·',
        Cfr: 'ℭ',
        Chi: 'Χ',
        CircleDot: '⊙',
        CircleMinus: '⊖',
        CirclePlus: '⊕',
        CircleTimes: '⊗',
        ClockwiseContourIntegral: '∲',
        CloseCurlyDoubleQuote: '”',
        CloseCurlyQuote: '’',
        Colon: '∷',
        Colone: '⩴',
        Congruent: '≡',
        Conint: '∯',
        ContourIntegral: '∮',
        Copf: 'ℂ',
        Coproduct: '∐',
        CounterClockwiseContourIntegral: '∳',
        Cross: '⨯',
        Cscr: '𝒞',
        Cup: '⋓',
        CupCap: '≍',
        DD: 'ⅅ',
        DDotrahd: '⤑',
        DJcy: 'Ђ',
        DScy: 'Ѕ',
        DZcy: 'Џ',
        Dagger: '‡',
        Darr: '↡',
        Dashv: '⫤',
        Dcaron: 'Ď',
        Dcy: 'Д',
        Del: '∇',
        Delta: 'Δ',
        Dfr: '𝔇',
        DiacriticalAcute: '´',
        DiacriticalDot: '˙',
        DiacriticalDoubleAcute: '˝',
        DiacriticalGrave: '`',
        DiacriticalTilde: '˜',
        Diamond: '⋄',
        DifferentialD: 'ⅆ',
        Dopf: '𝔻',
        Dot: '¨',
        DotDot: '⃜',
        DotEqual: '≐',
        DoubleContourIntegral: '∯',
        DoubleDot: '¨',
        DoubleDownArrow: '⇓',
        DoubleLeftArrow: '⇐',
        DoubleLeftRightArrow: '⇔',
        DoubleLeftTee: '⫤',
        DoubleLongLeftArrow: '⟸',
        DoubleLongLeftRightArrow: '⟺',
        DoubleLongRightArrow: '⟹',
        DoubleRightArrow: '⇒',
        DoubleRightTee: '⊨',
        DoubleUpArrow: '⇑',
        DoubleUpDownArrow: '⇕',
        DoubleVerticalBar: '∥',
        DownArrow: '↓',
        DownArrowBar: '⤓',
        DownArrowUpArrow: '⇵',
        DownBreve: '̑',
        DownLeftRightVector: '⥐',
        DownLeftTeeVector: '⥞',
        DownLeftVector: '↽',
        DownLeftVectorBar: '⥖',
        DownRightTeeVector: '⥟',
        DownRightVector: '⇁',
        DownRightVectorBar: '⥗',
        DownTee: '⊤',
        DownTeeArrow: '↧',
        Downarrow: '⇓',
        Dscr: '𝒟',
        Dstrok: 'Đ',
        ENG: 'Ŋ',
        ETH: 'Ð',
        Eacute: 'É',
        Ecaron: 'Ě',
        Ecirc: 'Ê',
        Ecy: 'Э',
        Edot: 'Ė',
        Efr: '𝔈',
        Egrave: 'È',
        Element: '∈',
        Emacr: 'Ē',
        EmptySmallSquare: '◻',
        EmptyVerySmallSquare: '▫',
        Eogon: 'Ę',
        Eopf: '𝔼',
        Epsilon: 'Ε',
        Equal: '⩵',
        EqualTilde: '≂',
        Equilibrium: '⇌',
        Escr: 'ℰ',
        Esim: '⩳',
        Eta: 'Η',
        Euml: 'Ë',
        Exists: '∃',
        ExponentialE: 'ⅇ',
        Fcy: 'Ф',
        Ffr: '𝔉',
        FilledSmallSquare: '◼',
        FilledVerySmallSquare: '▪',
        Fopf: '𝔽',
        ForAll: '∀',
        Fouriertrf: 'ℱ',
        Fscr: 'ℱ',
        GJcy: 'Ѓ',
        GT: '>',
        Gamma: 'Γ',
        Gammad: 'Ϝ',
        Gbreve: 'Ğ',
        Gcedil: 'Ģ',
        Gcirc: 'Ĝ',
        Gcy: 'Г',
        Gdot: 'Ġ',
        Gfr: '𝔊',
        Gg: '⋙',
        Gopf: '𝔾',
        GreaterEqual: '≥',
        GreaterEqualLess: '⋛',
        GreaterFullEqual: '≧',
        GreaterGreater: '⪢',
        GreaterLess: '≷',
        GreaterSlantEqual: '⩾',
        GreaterTilde: '≳',
        Gscr: '𝒢',
        Gt: '≫',
        HARDcy: 'Ъ',
        Hacek: 'ˇ',
        Hat: '^',
        Hcirc: 'Ĥ',
        Hfr: 'ℌ',
        HilbertSpace: 'ℋ',
        Hopf: 'ℍ',
        HorizontalLine: '─',
        Hscr: 'ℋ',
        Hstrok: 'Ħ',
        HumpDownHump: '≎',
        HumpEqual: '≏',
        IEcy: 'Е',
        IJlig: 'Ĳ',
        IOcy: 'Ё',
        Iacute: 'Í',
        Icirc: 'Î',
        Icy: 'И',
        Idot: 'İ',
        Ifr: 'ℑ',
        Igrave: 'Ì',
        Im: 'ℑ',
        Imacr: 'Ī',
        ImaginaryI: 'ⅈ',
        Implies: '⇒',
        Int: '∬',
        Integral: '∫',
        Intersection: '⋂',
        InvisibleComma: '⁣',
        InvisibleTimes: '⁢',
        Iogon: 'Į',
        Iopf: '𝕀',
        Iota: 'Ι',
        Iscr: 'ℐ',
        Itilde: 'Ĩ',
        Iukcy: 'І',
        Iuml: 'Ï',
        Jcirc: 'Ĵ',
        Jcy: 'Й',
        Jfr: '𝔍',
        Jopf: '𝕁',
        Jscr: '𝒥',
        Jsercy: 'Ј',
        Jukcy: 'Є',
        KHcy: 'Х',
        KJcy: 'Ќ',
        Kappa: 'Κ',
        Kcedil: 'Ķ',
        Kcy: 'К',
        Kfr: '𝔎',
        Kopf: '𝕂',
        Kscr: '𝒦',
        LJcy: 'Љ',
        LT: '<',
        Lacute: 'Ĺ',
        Lambda: 'Λ',
        Lang: '⟪',
        Laplacetrf: 'ℒ',
        Larr: '↞',
        Lcaron: 'Ľ',
        Lcedil: 'Ļ',
        Lcy: 'Л',
        LeftAngleBracket: '⟨',
        LeftArrow: '←',
        LeftArrowBar: '⇤',
        LeftArrowRightArrow: '⇆',
        LeftCeiling: '⌈',
        LeftDoubleBracket: '⟦',
        LeftDownTeeVector: '⥡',
        LeftDownVector: '⇃',
        LeftDownVectorBar: '⥙',
        LeftFloor: '⌊',
        LeftRightArrow: '↔',
        LeftRightVector: '⥎',
        LeftTee: '⊣',
        LeftTeeArrow: '↤',
        LeftTeeVector: '⥚',
        LeftTriangle: '⊲',
        LeftTriangleBar: '⧏',
        LeftTriangleEqual: '⊴',
        LeftUpDownVector: '⥑',
        LeftUpTeeVector: '⥠',
        LeftUpVector: '↿',
        LeftUpVectorBar: '⥘',
        LeftVector: '↼',
        LeftVectorBar: '⥒',
        Leftarrow: '⇐',
        Leftrightarrow: '⇔',
        LessEqualGreater: '⋚',
        LessFullEqual: '≦',
        LessGreater: '≶',
        LessLess: '⪡',
        LessSlantEqual: '⩽',
        LessTilde: '≲',
        Lfr: '𝔏',
        Ll: '⋘',
        Lleftarrow: '⇚',
        Lmidot: 'Ŀ',
        LongLeftArrow: '⟵',
        LongLeftRightArrow: '⟷',
        LongRightArrow: '⟶',
        Longleftarrow: '⟸',
        Longleftrightarrow: '⟺',
        Longrightarrow: '⟹',
        Lopf: '𝕃',
        LowerLeftArrow: '↙',
        LowerRightArrow: '↘',
        Lscr: 'ℒ',
        Lsh: '↰',
        Lstrok: 'Ł',
        Lt: '≪',
        Map: '⤅',
        Mcy: 'М',
        MediumSpace: ' ',
        Mellintrf: 'ℳ',
        Mfr: '𝔐',
        MinusPlus: '∓',
        Mopf: '𝕄',
        Mscr: 'ℳ',
        Mu: 'Μ',
        NJcy: 'Њ',
        Nacute: 'Ń',
        Ncaron: 'Ň',
        Ncedil: 'Ņ',
        Ncy: 'Н',
        NegativeMediumSpace: '​',
        NegativeThickSpace: '​',
        NegativeThinSpace: '​',
        NegativeVeryThinSpace: '​',
        NestedGreaterGreater: '≫',
        NestedLessLess: '≪',
        NewLine: '\n',
        Nfr: '𝔑',
        NoBreak: '⁠',
        NonBreakingSpace: ' ',
        Nopf: 'ℕ',
        Not: '⫬',
        NotCongruent: '≢',
        NotCupCap: '≭',
        NotDoubleVerticalBar: '∦',
        NotElement: '∉',
        NotEqual: '≠',
        NotEqualTilde: '≂̸',
        NotExists: '∄',
        NotGreater: '≯',
        NotGreaterEqual: '≱',
        NotGreaterFullEqual: '≧̸',
        NotGreaterGreater: '≫̸',
        NotGreaterLess: '≹',
        NotGreaterSlantEqual: '⩾̸',
        NotGreaterTilde: '≵',
        NotHumpDownHump: '≎̸',
        NotHumpEqual: '≏̸',
        NotLeftTriangle: '⋪',
        NotLeftTriangleBar: '⧏̸',
        NotLeftTriangleEqual: '⋬',
        NotLess: '≮',
        NotLessEqual: '≰',
        NotLessGreater: '≸',
        NotLessLess: '≪̸',
        NotLessSlantEqual: '⩽̸',
        NotLessTilde: '≴',
        NotNestedGreaterGreater: '⪢̸',
        NotNestedLessLess: '⪡̸',
        NotPrecedes: '⊀',
        NotPrecedesEqual: '⪯̸',
        NotPrecedesSlantEqual: '⋠',
        NotReverseElement: '∌',
        NotRightTriangle: '⋫',
        NotRightTriangleBar: '⧐̸',
        NotRightTriangleEqual: '⋭',
        NotSquareSubset: '⊏̸',
        NotSquareSubsetEqual: '⋢',
        NotSquareSuperset: '⊐̸',
        NotSquareSupersetEqual: '⋣',
        NotSubset: '⊂⃒',
        NotSubsetEqual: '⊈',
        NotSucceeds: '⊁',
        NotSucceedsEqual: '⪰̸',
        NotSucceedsSlantEqual: '⋡',
        NotSucceedsTilde: '≿̸',
        NotSuperset: '⊃⃒',
        NotSupersetEqual: '⊉',
        NotTilde: '≁',
        NotTildeEqual: '≄',
        NotTildeFullEqual: '≇',
        NotTildeTilde: '≉',
        NotVerticalBar: '∤',
        Nscr: '𝒩',
        Ntilde: 'Ñ',
        Nu: 'Ν',
        OElig: 'Œ',
        Oacute: 'Ó',
        Ocirc: 'Ô',
        Ocy: 'О',
        Odblac: 'Ő',
        Ofr: '𝔒',
        Ograve: 'Ò',
        Omacr: 'Ō',
        Omega: 'Ω',
        Omicron: 'Ο',
        Oopf: '𝕆',
        OpenCurlyDoubleQuote: '“',
        OpenCurlyQuote: '‘',
        Or: '⩔',
        Oscr: '𝒪',
        Oslash: 'Ø',
        Otilde: 'Õ',
        Otimes: '⨷',
        Ouml: 'Ö',
        OverBar: '‾',
        OverBrace: '⏞',
        OverBracket: '⎴',
        OverParenthesis: '⏜',
        PartialD: '∂',
        Pcy: 'П',
        Pfr: '𝔓',
        Phi: 'Φ',
        Pi: 'Π',
        PlusMinus: '±',
        Poincareplane: 'ℌ',
        Popf: 'ℙ',
        Pr: '⪻',
        Precedes: '≺',
        PrecedesEqual: '⪯',
        PrecedesSlantEqual: '≼',
        PrecedesTilde: '≾',
        Prime: '″',
        Product: '∏',
        Proportion: '∷',
        Proportional: '∝',
        Pscr: '𝒫',
        Psi: 'Ψ',
        QUOT: '"',
        Qfr: '𝔔',
        Qopf: 'ℚ',
        Qscr: '𝒬',
        RBarr: '⤐',
        REG: '®',
        Racute: 'Ŕ',
        Rang: '⟫',
        Rarr: '↠',
        Rarrtl: '⤖',
        Rcaron: 'Ř',
        Rcedil: 'Ŗ',
        Rcy: 'Р',
        Re: 'ℜ',
        ReverseElement: '∋',
        ReverseEquilibrium: '⇋',
        ReverseUpEquilibrium: '⥯',
        Rfr: 'ℜ',
        Rho: 'Ρ',
        RightAngleBracket: '⟩',
        RightArrow: '→',
        RightArrowBar: '⇥',
        RightArrowLeftArrow: '⇄',
        RightCeiling: '⌉',
        RightDoubleBracket: '⟧',
        RightDownTeeVector: '⥝',
        RightDownVector: '⇂',
        RightDownVectorBar: '⥕',
        RightFloor: '⌋',
        RightTee: '⊢',
        RightTeeArrow: '↦',
        RightTeeVector: '⥛',
        RightTriangle: '⊳',
        RightTriangleBar: '⧐',
        RightTriangleEqual: '⊵',
        RightUpDownVector: '⥏',
        RightUpTeeVector: '⥜',
        RightUpVector: '↾',
        RightUpVectorBar: '⥔',
        RightVector: '⇀',
        RightVectorBar: '⥓',
        Rightarrow: '⇒',
        Ropf: 'ℝ',
        RoundImplies: '⥰',
        Rrightarrow: '⇛',
        Rscr: 'ℛ',
        Rsh: '↱',
        RuleDelayed: '⧴',
        SHCHcy: 'Щ',
        SHcy: 'Ш',
        SOFTcy: 'Ь',
        Sacute: 'Ś',
        Sc: '⪼',
        Scaron: 'Š',
        Scedil: 'Ş',
        Scirc: 'Ŝ',
        Scy: 'С',
        Sfr: '𝔖',
        ShortDownArrow: '↓',
        ShortLeftArrow: '←',
        ShortRightArrow: '→',
        ShortUpArrow: '↑',
        Sigma: 'Σ',
        SmallCircle: '∘',
        Sopf: '𝕊',
        Sqrt: '√',
        Square: '□',
        SquareIntersection: '⊓',
        SquareSubset: '⊏',
        SquareSubsetEqual: '⊑',
        SquareSuperset: '⊐',
        SquareSupersetEqual: '⊒',
        SquareUnion: '⊔',
        Sscr: '𝒮',
        Star: '⋆',
        Sub: '⋐',
        Subset: '⋐',
        SubsetEqual: '⊆',
        Succeeds: '≻',
        SucceedsEqual: '⪰',
        SucceedsSlantEqual: '≽',
        SucceedsTilde: '≿',
        SuchThat: '∋',
        Sum: '∑',
        Sup: '⋑',
        Superset: '⊃',
        SupersetEqual: '⊇',
        Supset: '⋑',
        THORN: 'Þ',
        TRADE: '™',
        TSHcy: 'Ћ',
        TScy: 'Ц',
        Tab: '	',
        Tau: 'Τ',
        Tcaron: 'Ť',
        Tcedil: 'Ţ',
        Tcy: 'Т',
        Tfr: '𝔗',
        Therefore: '∴',
        Theta: 'Θ',
        ThickSpace: '  ',
        ThinSpace: ' ',
        Tilde: '∼',
        TildeEqual: '≃',
        TildeFullEqual: '≅',
        TildeTilde: '≈',
        Topf: '𝕋',
        TripleDot: '⃛',
        Tscr: '𝒯',
        Tstrok: 'Ŧ',
        Uacute: 'Ú',
        Uarr: '↟',
        Uarrocir: '⥉',
        Ubrcy: 'Ў',
        Ubreve: 'Ŭ',
        Ucirc: 'Û',
        Ucy: 'У',
        Udblac: 'Ű',
        Ufr: '𝔘',
        Ugrave: 'Ù',
        Umacr: 'Ū',
        UnderBar: '_',
        UnderBrace: '⏟',
        UnderBracket: '⎵',
        UnderParenthesis: '⏝',
        Union: '⋃',
        UnionPlus: '⊎',
        Uogon: 'Ų',
        Uopf: '𝕌',
        UpArrow: '↑',
        UpArrowBar: '⤒',
        UpArrowDownArrow: '⇅',
        UpDownArrow: '↕',
        UpEquilibrium: '⥮',
        UpTee: '⊥',
        UpTeeArrow: '↥',
        Uparrow: '⇑',
        Updownarrow: '⇕',
        UpperLeftArrow: '↖',
        UpperRightArrow: '↗',
        Upsi: 'ϒ',
        Upsilon: 'Υ',
        Uring: 'Ů',
        Uscr: '𝒰',
        Utilde: 'Ũ',
        Uuml: 'Ü',
        VDash: '⊫',
        Vbar: '⫫',
        Vcy: 'В',
        Vdash: '⊩',
        Vdashl: '⫦',
        Vee: '⋁',
        Verbar: '‖',
        Vert: '‖',
        VerticalBar: '∣',
        VerticalLine: '|',
        VerticalSeparator: '❘',
        VerticalTilde: '≀',
        VeryThinSpace: ' ',
        Vfr: '𝔙',
        Vopf: '𝕍',
        Vscr: '𝒱',
        Vvdash: '⊪',
        Wcirc: 'Ŵ',
        Wedge: '⋀',
        Wfr: '𝔚',
        Wopf: '𝕎',
        Wscr: '𝒲',
        Xfr: '𝔛',
        Xi: 'Ξ',
        Xopf: '𝕏',
        Xscr: '𝒳',
        YAcy: 'Я',
        YIcy: 'Ї',
        YUcy: 'Ю',
        Yacute: 'Ý',
        Ycirc: 'Ŷ',
        Ycy: 'Ы',
        Yfr: '𝔜',
        Yopf: '𝕐',
        Yscr: '𝒴',
        Yuml: 'Ÿ',
        ZHcy: 'Ж',
        Zacute: 'Ź',
        Zcaron: 'Ž',
        Zcy: 'З',
        Zdot: 'Ż',
        ZeroWidthSpace: '​',
        Zeta: 'Ζ',
        Zfr: 'ℨ',
        Zopf: 'ℤ',
        Zscr: '𝒵',
        aacute: 'á',
        abreve: 'ă',
        ac: '∾',
        acE: '∾̳',
        acd: '∿',
        acirc: 'â',
        acute: '´',
        acy: 'а',
        aelig: 'æ',
        af: '⁡',
        afr: '𝔞',
        agrave: 'à',
        alefsym: 'ℵ',
        aleph: 'ℵ',
        alpha: 'α',
        amacr: 'ā',
        amalg: '⨿',
        amp: '&',
        and: '∧',
        andand: '⩕',
        andd: '⩜',
        andslope: '⩘',
        andv: '⩚',
        ang: '∠',
        ange: '⦤',
        angle: '∠',
        angmsd: '∡',
        angmsdaa: '⦨',
        angmsdab: '⦩',
        angmsdac: '⦪',
        angmsdad: '⦫',
        angmsdae: '⦬',
        angmsdaf: '⦭',
        angmsdag: '⦮',
        angmsdah: '⦯',
        angrt: '∟',
        angrtvb: '⊾',
        angrtvbd: '⦝',
        angsph: '∢',
        angst: 'Å',
        angzarr: '⍼',
        aogon: 'ą',
        aopf: '𝕒',
        ap: '≈',
        apE: '⩰',
        apacir: '⩯',
        ape: '≊',
        apid: '≋',
        apos: "'",
        approx: '≈',
        approxeq: '≊',
        aring: 'å',
        ascr: '𝒶',
        ast: '*',
        asymp: '≈',
        asympeq: '≍',
        atilde: 'ã',
        auml: 'ä',
        awconint: '∳',
        awint: '⨑',
        bNot: '⫭',
        backcong: '≌',
        backepsilon: '϶',
        backprime: '‵',
        backsim: '∽',
        backsimeq: '⋍',
        barvee: '⊽',
        barwed: '⌅',
        barwedge: '⌅',
        bbrk: '⎵',
        bbrktbrk: '⎶',
        bcong: '≌',
        bcy: 'б',
        bdquo: '„',
        becaus: '∵',
        because: '∵',
        bemptyv: '⦰',
        bepsi: '϶',
        bernou: 'ℬ',
        beta: 'β',
        beth: 'ℶ',
        between: '≬',
        bfr: '𝔟',
        bigcap: '⋂',
        bigcirc: '◯',
        bigcup: '⋃',
        bigodot: '⨀',
        bigoplus: '⨁',
        bigotimes: '⨂',
        bigsqcup: '⨆',
        bigstar: '★',
        bigtriangledown: '▽',
        bigtriangleup: '△',
        biguplus: '⨄',
        bigvee: '⋁',
        bigwedge: '⋀',
        bkarow: '⤍',
        blacklozenge: '⧫',
        blacksquare: '▪',
        blacktriangle: '▴',
        blacktriangledown: '▾',
        blacktriangleleft: '◂',
        blacktriangleright: '▸',
        blank: '␣',
        blk12: '▒',
        blk14: '░',
        blk34: '▓',
        block: '█',
        bne: '=⃥',
        bnequiv: '≡⃥',
        bnot: '⌐',
        bopf: '𝕓',
        bot: '⊥',
        bottom: '⊥',
        bowtie: '⋈',
        boxDL: '╗',
        boxDR: '╔',
        boxDl: '╖',
        boxDr: '╓',
        boxH: '═',
        boxHD: '╦',
        boxHU: '╩',
        boxHd: '╤',
        boxHu: '╧',
        boxUL: '╝',
        boxUR: '╚',
        boxUl: '╜',
        boxUr: '╙',
        boxV: '║',
        boxVH: '╬',
        boxVL: '╣',
        boxVR: '╠',
        boxVh: '╫',
        boxVl: '╢',
        boxVr: '╟',
        boxbox: '⧉',
        boxdL: '╕',
        boxdR: '╒',
        boxdl: '┐',
        boxdr: '┌',
        boxh: '─',
        boxhD: '╥',
        boxhU: '╨',
        boxhd: '┬',
        boxhu: '┴',
        boxminus: '⊟',
        boxplus: '⊞',
        boxtimes: '⊠',
        boxuL: '╛',
        boxuR: '╘',
        boxul: '┘',
        boxur: '└',
        boxv: '│',
        boxvH: '╪',
        boxvL: '╡',
        boxvR: '╞',
        boxvh: '┼',
        boxvl: '┤',
        boxvr: '├',
        bprime: '‵',
        breve: '˘',
        brvbar: '¦',
        bscr: '𝒷',
        bsemi: '⁏',
        bsim: '∽',
        bsime: '⋍',
        bsol: '\\',
        bsolb: '⧅',
        bsolhsub: '⟈',
        bull: '•',
        bullet: '•',
        bump: '≎',
        bumpE: '⪮',
        bumpe: '≏',
        bumpeq: '≏',
        cacute: 'ć',
        cap: '∩',
        capand: '⩄',
        capbrcup: '⩉',
        capcap: '⩋',
        capcup: '⩇',
        capdot: '⩀',
        caps: '∩︀',
        caret: '⁁',
        caron: 'ˇ',
        ccaps: '⩍',
        ccaron: 'č',
        ccedil: 'ç',
        ccirc: 'ĉ',
        ccups: '⩌',
        ccupssm: '⩐',
        cdot: 'ċ',
        cedil: '¸',
        cemptyv: '⦲',
        cent: '¢',
        centerdot: '·',
        cfr: '𝔠',
        chcy: 'ч',
        check: '✓',
        checkmark: '✓',
        chi: 'χ',
        cir: '○',
        cirE: '⧃',
        circ: 'ˆ',
        circeq: '≗',
        circlearrowleft: '↺',
        circlearrowright: '↻',
        circledR: '®',
        circledS: 'Ⓢ',
        circledast: '⊛',
        circledcirc: '⊚',
        circleddash: '⊝',
        cire: '≗',
        cirfnint: '⨐',
        cirmid: '⫯',
        cirscir: '⧂',
        clubs: '♣',
        clubsuit: '♣',
        colon: ':',
        colone: '≔',
        coloneq: '≔',
        comma: ',',
        commat: '@',
        comp: '∁',
        compfn: '∘',
        complement: '∁',
        complexes: 'ℂ',
        cong: '≅',
        congdot: '⩭',
        conint: '∮',
        copf: '𝕔',
        coprod: '∐',
        copy: '©',
        copysr: '℗',
        crarr: '↵',
        cross: '✗',
        cscr: '𝒸',
        csub: '⫏',
        csube: '⫑',
        csup: '⫐',
        csupe: '⫒',
        ctdot: '⋯',
        cudarrl: '⤸',
        cudarrr: '⤵',
        cuepr: '⋞',
        cuesc: '⋟',
        cularr: '↶',
        cularrp: '⤽',
        cup: '∪',
        cupbrcap: '⩈',
        cupcap: '⩆',
        cupcup: '⩊',
        cupdot: '⊍',
        cupor: '⩅',
        cups: '∪︀',
        curarr: '↷',
        curarrm: '⤼',
        curlyeqprec: '⋞',
        curlyeqsucc: '⋟',
        curlyvee: '⋎',
        curlywedge: '⋏',
        curren: '¤',
        curvearrowleft: '↶',
        curvearrowright: '↷',
        cuvee: '⋎',
        cuwed: '⋏',
        cwconint: '∲',
        cwint: '∱',
        cylcty: '⌭',
        dArr: '⇓',
        dHar: '⥥',
        dagger: '†',
        daleth: 'ℸ',
        darr: '↓',
        dash: '‐',
        dashv: '⊣',
        dbkarow: '⤏',
        dblac: '˝',
        dcaron: 'ď',
        dcy: 'д',
        dd: 'ⅆ',
        ddagger: '‡',
        ddarr: '⇊',
        ddotseq: '⩷',
        deg: '°',
        delta: 'δ',
        demptyv: '⦱',
        dfisht: '⥿',
        dfr: '𝔡',
        dharl: '⇃',
        dharr: '⇂',
        diam: '⋄',
        diamond: '⋄',
        diamondsuit: '♦',
        diams: '♦',
        die: '¨',
        digamma: 'ϝ',
        disin: '⋲',
        div: '÷',
        divide: '÷',
        divideontimes: '⋇',
        divonx: '⋇',
        djcy: 'ђ',
        dlcorn: '⌞',
        dlcrop: '⌍',
        dollar: '$',
        dopf: '𝕕',
        dot: '˙',
        doteq: '≐',
        doteqdot: '≑',
        dotminus: '∸',
        dotplus: '∔',
        dotsquare: '⊡',
        doublebarwedge: '⌆',
        downarrow: '↓',
        downdownarrows: '⇊',
        downharpoonleft: '⇃',
        downharpoonright: '⇂',
        drbkarow: '⤐',
        drcorn: '⌟',
        drcrop: '⌌',
        dscr: '𝒹',
        dscy: 'ѕ',
        dsol: '⧶',
        dstrok: 'đ',
        dtdot: '⋱',
        dtri: '▿',
        dtrif: '▾',
        duarr: '⇵',
        duhar: '⥯',
        dwangle: '⦦',
        dzcy: 'џ',
        dzigrarr: '⟿',
        eDDot: '⩷',
        eDot: '≑',
        eacute: 'é',
        easter: '⩮',
        ecaron: 'ě',
        ecir: '≖',
        ecirc: 'ê',
        ecolon: '≕',
        ecy: 'э',
        edot: 'ė',
        ee: 'ⅇ',
        efDot: '≒',
        efr: '𝔢',
        eg: '⪚',
        egrave: 'è',
        egs: '⪖',
        egsdot: '⪘',
        el: '⪙',
        elinters: '⏧',
        ell: 'ℓ',
        els: '⪕',
        elsdot: '⪗',
        emacr: 'ē',
        empty: '∅',
        emptyset: '∅',
        emptyv: '∅',
        emsp13: ' ',
        emsp14: ' ',
        emsp: ' ',
        eng: 'ŋ',
        ensp: ' ',
        eogon: 'ę',
        eopf: '𝕖',
        epar: '⋕',
        eparsl: '⧣',
        eplus: '⩱',
        epsi: 'ε',
        epsilon: 'ε',
        epsiv: 'ϵ',
        eqcirc: '≖',
        eqcolon: '≕',
        eqsim: '≂',
        eqslantgtr: '⪖',
        eqslantless: '⪕',
        equals: '=',
        equest: '≟',
        equiv: '≡',
        equivDD: '⩸',
        eqvparsl: '⧥',
        erDot: '≓',
        erarr: '⥱',
        escr: 'ℯ',
        esdot: '≐',
        esim: '≂',
        eta: 'η',
        eth: 'ð',
        euml: 'ë',
        euro: '€',
        excl: '!',
        exist: '∃',
        expectation: 'ℰ',
        exponentiale: 'ⅇ',
        fallingdotseq: '≒',
        fcy: 'ф',
        female: '♀',
        ffilig: 'ﬃ',
        fflig: 'ﬀ',
        ffllig: 'ﬄ',
        ffr: '𝔣',
        filig: 'ﬁ',
        fjlig: 'fj',
        flat: '♭',
        fllig: 'ﬂ',
        fltns: '▱',
        fnof: 'ƒ',
        fopf: '𝕗',
        forall: '∀',
        fork: '⋔',
        forkv: '⫙',
        fpartint: '⨍',
        frac12: '½',
        frac13: '⅓',
        frac14: '¼',
        frac15: '⅕',
        frac16: '⅙',
        frac18: '⅛',
        frac23: '⅔',
        frac25: '⅖',
        frac34: '¾',
        frac35: '⅗',
        frac38: '⅜',
        frac45: '⅘',
        frac56: '⅚',
        frac58: '⅝',
        frac78: '⅞',
        frasl: '⁄',
        frown: '⌢',
        fscr: '𝒻',
        gE: '≧',
        gEl: '⪌',
        gacute: 'ǵ',
        gamma: 'γ',
        gammad: 'ϝ',
        gap: '⪆',
        gbreve: 'ğ',
        gcirc: 'ĝ',
        gcy: 'г',
        gdot: 'ġ',
        ge: '≥',
        gel: '⋛',
        geq: '≥',
        geqq: '≧',
        geqslant: '⩾',
        ges: '⩾',
        gescc: '⪩',
        gesdot: '⪀',
        gesdoto: '⪂',
        gesdotol: '⪄',
        gesl: '⋛︀',
        gesles: '⪔',
        gfr: '𝔤',
        gg: '≫',
        ggg: '⋙',
        gimel: 'ℷ',
        gjcy: 'ѓ',
        gl: '≷',
        glE: '⪒',
        gla: '⪥',
        glj: '⪤',
        gnE: '≩',
        gnap: '⪊',
        gnapprox: '⪊',
        gne: '⪈',
        gneq: '⪈',
        gneqq: '≩',
        gnsim: '⋧',
        gopf: '𝕘',
        grave: '`',
        gscr: 'ℊ',
        gsim: '≳',
        gsime: '⪎',
        gsiml: '⪐',
        gt: '>',
        gtcc: '⪧',
        gtcir: '⩺',
        gtdot: '⋗',
        gtlPar: '⦕',
        gtquest: '⩼',
        gtrapprox: '⪆',
        gtrarr: '⥸',
        gtrdot: '⋗',
        gtreqless: '⋛',
        gtreqqless: '⪌',
        gtrless: '≷',
        gtrsim: '≳',
        gvertneqq: '≩︀',
        gvnE: '≩︀',
        hArr: '⇔',
        hairsp: ' ',
        half: '½',
        hamilt: 'ℋ',
        hardcy: 'ъ',
        harr: '↔',
        harrcir: '⥈',
        harrw: '↭',
        hbar: 'ℏ',
        hcirc: 'ĥ',
        hearts: '♥',
        heartsuit: '♥',
        hellip: '…',
        hercon: '⊹',
        hfr: '𝔥',
        hksearow: '⤥',
        hkswarow: '⤦',
        hoarr: '⇿',
        homtht: '∻',
        hookleftarrow: '↩',
        hookrightarrow: '↪',
        hopf: '𝕙',
        horbar: '―',
        hscr: '𝒽',
        hslash: 'ℏ',
        hstrok: 'ħ',
        hybull: '⁃',
        hyphen: '‐',
        iacute: 'í',
        ic: '⁣',
        icirc: 'î',
        icy: 'и',
        iecy: 'е',
        iexcl: '¡',
        iff: '⇔',
        ifr: '𝔦',
        igrave: 'ì',
        ii: 'ⅈ',
        iiiint: '⨌',
        iiint: '∭',
        iinfin: '⧜',
        iiota: '℩',
        ijlig: 'ĳ',
        imacr: 'ī',
        image: 'ℑ',
        imagline: 'ℐ',
        imagpart: 'ℑ',
        imath: 'ı',
        imof: '⊷',
        imped: 'Ƶ',
        in: '∈',
        incare: '℅',
        infin: '∞',
        infintie: '⧝',
        inodot: 'ı',
        int: '∫',
        intcal: '⊺',
        integers: 'ℤ',
        intercal: '⊺',
        intlarhk: '⨗',
        intprod: '⨼',
        iocy: 'ё',
        iogon: 'į',
        iopf: '𝕚',
        iota: 'ι',
        iprod: '⨼',
        iquest: '¿',
        iscr: '𝒾',
        isin: '∈',
        isinE: '⋹',
        isindot: '⋵',
        isins: '⋴',
        isinsv: '⋳',
        isinv: '∈',
        it: '⁢',
        itilde: 'ĩ',
        iukcy: 'і',
        iuml: 'ï',
        jcirc: 'ĵ',
        jcy: 'й',
        jfr: '𝔧',
        jmath: 'ȷ',
        jopf: '𝕛',
        jscr: '𝒿',
        jsercy: 'ј',
        jukcy: 'є',
        kappa: 'κ',
        kappav: 'ϰ',
        kcedil: 'ķ',
        kcy: 'к',
        kfr: '𝔨',
        kgreen: 'ĸ',
        khcy: 'х',
        kjcy: 'ќ',
        kopf: '𝕜',
        kscr: '𝓀',
        lAarr: '⇚',
        lArr: '⇐',
        lAtail: '⤛',
        lBarr: '⤎',
        lE: '≦',
        lEg: '⪋',
        lHar: '⥢',
        lacute: 'ĺ',
        laemptyv: '⦴',
        lagran: 'ℒ',
        lambda: 'λ',
        lang: '⟨',
        langd: '⦑',
        langle: '⟨',
        lap: '⪅',
        laquo: '«',
        larr: '←',
        larrb: '⇤',
        larrbfs: '⤟',
        larrfs: '⤝',
        larrhk: '↩',
        larrlp: '↫',
        larrpl: '⤹',
        larrsim: '⥳',
        larrtl: '↢',
        lat: '⪫',
        latail: '⤙',
        late: '⪭',
        lates: '⪭︀',
        lbarr: '⤌',
        lbbrk: '❲',
        lbrace: '{',
        lbrack: '[',
        lbrke: '⦋',
        lbrksld: '⦏',
        lbrkslu: '⦍',
        lcaron: 'ľ',
        lcedil: 'ļ',
        lceil: '⌈',
        lcub: '{',
        lcy: 'л',
        ldca: '⤶',
        ldquo: '“',
        ldquor: '„',
        ldrdhar: '⥧',
        ldrushar: '⥋',
        ldsh: '↲',
        le: '≤',
        leftarrow: '←',
        leftarrowtail: '↢',
        leftharpoondown: '↽',
        leftharpoonup: '↼',
        leftleftarrows: '⇇',
        leftrightarrow: '↔',
        leftrightarrows: '⇆',
        leftrightharpoons: '⇋',
        leftrightsquigarrow: '↭',
        leftthreetimes: '⋋',
        leg: '⋚',
        leq: '≤',
        leqq: '≦',
        leqslant: '⩽',
        les: '⩽',
        lescc: '⪨',
        lesdot: '⩿',
        lesdoto: '⪁',
        lesdotor: '⪃',
        lesg: '⋚︀',
        lesges: '⪓',
        lessapprox: '⪅',
        lessdot: '⋖',
        lesseqgtr: '⋚',
        lesseqqgtr: '⪋',
        lessgtr: '≶',
        lesssim: '≲',
        lfisht: '⥼',
        lfloor: '⌊',
        lfr: '𝔩',
        lg: '≶',
        lgE: '⪑',
        lhard: '↽',
        lharu: '↼',
        lharul: '⥪',
        lhblk: '▄',
        ljcy: 'љ',
        ll: '≪',
        llarr: '⇇',
        llcorner: '⌞',
        llhard: '⥫',
        lltri: '◺',
        lmidot: 'ŀ',
        lmoust: '⎰',
        lmoustache: '⎰',
        lnE: '≨',
        lnap: '⪉',
        lnapprox: '⪉',
        lne: '⪇',
        lneq: '⪇',
        lneqq: '≨',
        lnsim: '⋦',
        loang: '⟬',
        loarr: '⇽',
        lobrk: '⟦',
        longleftarrow: '⟵',
        longleftrightarrow: '⟷',
        longmapsto: '⟼',
        longrightarrow: '⟶',
        looparrowleft: '↫',
        looparrowright: '↬',
        lopar: '⦅',
        lopf: '𝕝',
        loplus: '⨭',
        lotimes: '⨴',
        lowast: '∗',
        lowbar: '_',
        loz: '◊',
        lozenge: '◊',
        lozf: '⧫',
        lpar: '(',
        lparlt: '⦓',
        lrarr: '⇆',
        lrcorner: '⌟',
        lrhar: '⇋',
        lrhard: '⥭',
        lrm: '‎',
        lrtri: '⊿',
        lsaquo: '‹',
        lscr: '𝓁',
        lsh: '↰',
        lsim: '≲',
        lsime: '⪍',
        lsimg: '⪏',
        lsqb: '[',
        lsquo: '‘',
        lsquor: '‚',
        lstrok: 'ł',
        lt: '<',
        ltcc: '⪦',
        ltcir: '⩹',
        ltdot: '⋖',
        lthree: '⋋',
        ltimes: '⋉',
        ltlarr: '⥶',
        ltquest: '⩻',
        ltrPar: '⦖',
        ltri: '◃',
        ltrie: '⊴',
        ltrif: '◂',
        lurdshar: '⥊',
        luruhar: '⥦',
        lvertneqq: '≨︀',
        lvnE: '≨︀',
        mDDot: '∺',
        macr: '¯',
        male: '♂',
        malt: '✠',
        maltese: '✠',
        map: '↦',
        mapsto: '↦',
        mapstodown: '↧',
        mapstoleft: '↤',
        mapstoup: '↥',
        marker: '▮',
        mcomma: '⨩',
        mcy: 'м',
        mdash: '—',
        measuredangle: '∡',
        mfr: '𝔪',
        mho: '℧',
        micro: 'µ',
        mid: '∣',
        midast: '*',
        midcir: '⫰',
        middot: '·',
        minus: '−',
        minusb: '⊟',
        minusd: '∸',
        minusdu: '⨪',
        mlcp: '⫛',
        mldr: '…',
        mnplus: '∓',
        models: '⊧',
        mopf: '𝕞',
        mp: '∓',
        mscr: '𝓂',
        mstpos: '∾',
        mu: 'μ',
        multimap: '⊸',
        mumap: '⊸',
        nGg: '⋙̸',
        nGt: '≫⃒',
        nGtv: '≫̸',
        nLeftarrow: '⇍',
        nLeftrightarrow: '⇎',
        nLl: '⋘̸',
        nLt: '≪⃒',
        nLtv: '≪̸',
        nRightarrow: '⇏',
        nVDash: '⊯',
        nVdash: '⊮',
        nabla: '∇',
        nacute: 'ń',
        nang: '∠⃒',
        nap: '≉',
        napE: '⩰̸',
        napid: '≋̸',
        napos: 'ŉ',
        napprox: '≉',
        natur: '♮',
        natural: '♮',
        naturals: 'ℕ',
        nbsp: ' ',
        nbump: '≎̸',
        nbumpe: '≏̸',
        ncap: '⩃',
        ncaron: 'ň',
        ncedil: 'ņ',
        ncong: '≇',
        ncongdot: '⩭̸',
        ncup: '⩂',
        ncy: 'н',
        ndash: '–',
        ne: '≠',
        neArr: '⇗',
        nearhk: '⤤',
        nearr: '↗',
        nearrow: '↗',
        nedot: '≐̸',
        nequiv: '≢',
        nesear: '⤨',
        nesim: '≂̸',
        nexist: '∄',
        nexists: '∄',
        nfr: '𝔫',
        ngE: '≧̸',
        nge: '≱',
        ngeq: '≱',
        ngeqq: '≧̸',
        ngeqslant: '⩾̸',
        nges: '⩾̸',
        ngsim: '≵',
        ngt: '≯',
        ngtr: '≯',
        nhArr: '⇎',
        nharr: '↮',
        nhpar: '⫲',
        ni: '∋',
        nis: '⋼',
        nisd: '⋺',
        niv: '∋',
        njcy: 'њ',
        nlArr: '⇍',
        nlE: '≦̸',
        nlarr: '↚',
        nldr: '‥',
        nle: '≰',
        nleftarrow: '↚',
        nleftrightarrow: '↮',
        nleq: '≰',
        nleqq: '≦̸',
        nleqslant: '⩽̸',
        nles: '⩽̸',
        nless: '≮',
        nlsim: '≴',
        nlt: '≮',
        nltri: '⋪',
        nltrie: '⋬',
        nmid: '∤',
        nopf: '𝕟',
        not: '¬',
        notin: '∉',
        notinE: '⋹̸',
        notindot: '⋵̸',
        notinva: '∉',
        notinvb: '⋷',
        notinvc: '⋶',
        notni: '∌',
        notniva: '∌',
        notnivb: '⋾',
        notnivc: '⋽',
        npar: '∦',
        nparallel: '∦',
        nparsl: '⫽⃥',
        npart: '∂̸',
        npolint: '⨔',
        npr: '⊀',
        nprcue: '⋠',
        npre: '⪯̸',
        nprec: '⊀',
        npreceq: '⪯̸',
        nrArr: '⇏',
        nrarr: '↛',
        nrarrc: '⤳̸',
        nrarrw: '↝̸',
        nrightarrow: '↛',
        nrtri: '⋫',
        nrtrie: '⋭',
        nsc: '⊁',
        nsccue: '⋡',
        nsce: '⪰̸',
        nscr: '𝓃',
        nshortmid: '∤',
        nshortparallel: '∦',
        nsim: '≁',
        nsime: '≄',
        nsimeq: '≄',
        nsmid: '∤',
        nspar: '∦',
        nsqsube: '⋢',
        nsqsupe: '⋣',
        nsub: '⊄',
        nsubE: '⫅̸',
        nsube: '⊈',
        nsubset: '⊂⃒',
        nsubseteq: '⊈',
        nsubseteqq: '⫅̸',
        nsucc: '⊁',
        nsucceq: '⪰̸',
        nsup: '⊅',
        nsupE: '⫆̸',
        nsupe: '⊉',
        nsupset: '⊃⃒',
        nsupseteq: '⊉',
        nsupseteqq: '⫆̸',
        ntgl: '≹',
        ntilde: 'ñ',
        ntlg: '≸',
        ntriangleleft: '⋪',
        ntrianglelefteq: '⋬',
        ntriangleright: '⋫',
        ntrianglerighteq: '⋭',
        nu: 'ν',
        num: '#',
        numero: '№',
        numsp: ' ',
        nvDash: '⊭',
        nvHarr: '⤄',
        nvap: '≍⃒',
        nvdash: '⊬',
        nvge: '≥⃒',
        nvgt: '>⃒',
        nvinfin: '⧞',
        nvlArr: '⤂',
        nvle: '≤⃒',
        nvlt: '<⃒',
        nvltrie: '⊴⃒',
        nvrArr: '⤃',
        nvrtrie: '⊵⃒',
        nvsim: '∼⃒',
        nwArr: '⇖',
        nwarhk: '⤣',
        nwarr: '↖',
        nwarrow: '↖',
        nwnear: '⤧',
        oS: 'Ⓢ',
        oacute: 'ó',
        oast: '⊛',
        ocir: '⊚',
        ocirc: 'ô',
        ocy: 'о',
        odash: '⊝',
        odblac: 'ő',
        odiv: '⨸',
        odot: '⊙',
        odsold: '⦼',
        oelig: 'œ',
        ofcir: '⦿',
        ofr: '𝔬',
        ogon: '˛',
        ograve: 'ò',
        ogt: '⧁',
        ohbar: '⦵',
        ohm: 'Ω',
        oint: '∮',
        olarr: '↺',
        olcir: '⦾',
        olcross: '⦻',
        oline: '‾',
        olt: '⧀',
        omacr: 'ō',
        omega: 'ω',
        omicron: 'ο',
        omid: '⦶',
        ominus: '⊖',
        oopf: '𝕠',
        opar: '⦷',
        operp: '⦹',
        oplus: '⊕',
        or: '∨',
        orarr: '↻',
        ord: '⩝',
        order: 'ℴ',
        orderof: 'ℴ',
        ordf: 'ª',
        ordm: 'º',
        origof: '⊶',
        oror: '⩖',
        orslope: '⩗',
        orv: '⩛',
        oscr: 'ℴ',
        oslash: 'ø',
        osol: '⊘',
        otilde: 'õ',
        otimes: '⊗',
        otimesas: '⨶',
        ouml: 'ö',
        ovbar: '⌽',
        par: '∥',
        para: '¶',
        parallel: '∥',
        parsim: '⫳',
        parsl: '⫽',
        part: '∂',
        pcy: 'п',
        percnt: '%',
        period: '.',
        permil: '‰',
        perp: '⊥',
        pertenk: '‱',
        pfr: '𝔭',
        phi: 'φ',
        phiv: 'ϕ',
        phmmat: 'ℳ',
        phone: '☎',
        pi: 'π',
        pitchfork: '⋔',
        piv: 'ϖ',
        planck: 'ℏ',
        planckh: 'ℎ',
        plankv: 'ℏ',
        plus: '+',
        plusacir: '⨣',
        plusb: '⊞',
        pluscir: '⨢',
        plusdo: '∔',
        plusdu: '⨥',
        pluse: '⩲',
        plusmn: '±',
        plussim: '⨦',
        plustwo: '⨧',
        pm: '±',
        pointint: '⨕',
        popf: '𝕡',
        pound: '£',
        pr: '≺',
        prE: '⪳',
        prap: '⪷',
        prcue: '≼',
        pre: '⪯',
        prec: '≺',
        precapprox: '⪷',
        preccurlyeq: '≼',
        preceq: '⪯',
        precnapprox: '⪹',
        precneqq: '⪵',
        precnsim: '⋨',
        precsim: '≾',
        prime: '′',
        primes: 'ℙ',
        prnE: '⪵',
        prnap: '⪹',
        prnsim: '⋨',
        prod: '∏',
        profalar: '⌮',
        profline: '⌒',
        profsurf: '⌓',
        prop: '∝',
        propto: '∝',
        prsim: '≾',
        prurel: '⊰',
        pscr: '𝓅',
        psi: 'ψ',
        puncsp: ' ',
        qfr: '𝔮',
        qint: '⨌',
        qopf: '𝕢',
        qprime: '⁗',
        qscr: '𝓆',
        quaternions: 'ℍ',
        quatint: '⨖',
        quest: '?',
        questeq: '≟',
        quot: '"',
        rAarr: '⇛',
        rArr: '⇒',
        rAtail: '⤜',
        rBarr: '⤏',
        rHar: '⥤',
        race: '∽̱',
        racute: 'ŕ',
        radic: '√',
        raemptyv: '⦳',
        rang: '⟩',
        rangd: '⦒',
        range: '⦥',
        rangle: '⟩',
        raquo: '»',
        rarr: '→',
        rarrap: '⥵',
        rarrb: '⇥',
        rarrbfs: '⤠',
        rarrc: '⤳',
        rarrfs: '⤞',
        rarrhk: '↪',
        rarrlp: '↬',
        rarrpl: '⥅',
        rarrsim: '⥴',
        rarrtl: '↣',
        rarrw: '↝',
        ratail: '⤚',
        ratio: '∶',
        rationals: 'ℚ',
        rbarr: '⤍',
        rbbrk: '❳',
        rbrace: '}',
        rbrack: ']',
        rbrke: '⦌',
        rbrksld: '⦎',
        rbrkslu: '⦐',
        rcaron: 'ř',
        rcedil: 'ŗ',
        rceil: '⌉',
        rcub: '}',
        rcy: 'р',
        rdca: '⤷',
        rdldhar: '⥩',
        rdquo: '”',
        rdquor: '”',
        rdsh: '↳',
        real: 'ℜ',
        realine: 'ℛ',
        realpart: 'ℜ',
        reals: 'ℝ',
        rect: '▭',
        reg: '®',
        rfisht: '⥽',
        rfloor: '⌋',
        rfr: '𝔯',
        rhard: '⇁',
        rharu: '⇀',
        rharul: '⥬',
        rho: 'ρ',
        rhov: 'ϱ',
        rightarrow: '→',
        rightarrowtail: '↣',
        rightharpoondown: '⇁',
        rightharpoonup: '⇀',
        rightleftarrows: '⇄',
        rightleftharpoons: '⇌',
        rightrightarrows: '⇉',
        rightsquigarrow: '↝',
        rightthreetimes: '⋌',
        ring: '˚',
        risingdotseq: '≓',
        rlarr: '⇄',
        rlhar: '⇌',
        rlm: '‏',
        rmoust: '⎱',
        rmoustache: '⎱',
        rnmid: '⫮',
        roang: '⟭',
        roarr: '⇾',
        robrk: '⟧',
        ropar: '⦆',
        ropf: '𝕣',
        roplus: '⨮',
        rotimes: '⨵',
        rpar: ')',
        rpargt: '⦔',
        rppolint: '⨒',
        rrarr: '⇉',
        rsaquo: '›',
        rscr: '𝓇',
        rsh: '↱',
        rsqb: ']',
        rsquo: '’',
        rsquor: '’',
        rthree: '⋌',
        rtimes: '⋊',
        rtri: '▹',
        rtrie: '⊵',
        rtrif: '▸',
        rtriltri: '⧎',
        ruluhar: '⥨',
        rx: '℞',
        sacute: 'ś',
        sbquo: '‚',
        sc: '≻',
        scE: '⪴',
        scap: '⪸',
        scaron: 'š',
        sccue: '≽',
        sce: '⪰',
        scedil: 'ş',
        scirc: 'ŝ',
        scnE: '⪶',
        scnap: '⪺',
        scnsim: '⋩',
        scpolint: '⨓',
        scsim: '≿',
        scy: 'с',
        sdot: '⋅',
        sdotb: '⊡',
        sdote: '⩦',
        seArr: '⇘',
        searhk: '⤥',
        searr: '↘',
        searrow: '↘',
        sect: '§',
        semi: ';',
        seswar: '⤩',
        setminus: '∖',
        setmn: '∖',
        sext: '✶',
        sfr: '𝔰',
        sfrown: '⌢',
        sharp: '♯',
        shchcy: 'щ',
        shcy: 'ш',
        shortmid: '∣',
        shortparallel: '∥',
        shy: '­',
        sigma: 'σ',
        sigmaf: 'ς',
        sigmav: 'ς',
        sim: '∼',
        simdot: '⩪',
        sime: '≃',
        simeq: '≃',
        simg: '⪞',
        simgE: '⪠',
        siml: '⪝',
        simlE: '⪟',
        simne: '≆',
        simplus: '⨤',
        simrarr: '⥲',
        slarr: '←',
        smallsetminus: '∖',
        smashp: '⨳',
        smeparsl: '⧤',
        smid: '∣',
        smile: '⌣',
        smt: '⪪',
        smte: '⪬',
        smtes: '⪬︀',
        softcy: 'ь',
        sol: '/',
        solb: '⧄',
        solbar: '⌿',
        sopf: '𝕤',
        spades: '♠',
        spadesuit: '♠',
        spar: '∥',
        sqcap: '⊓',
        sqcaps: '⊓︀',
        sqcup: '⊔',
        sqcups: '⊔︀',
        sqsub: '⊏',
        sqsube: '⊑',
        sqsubset: '⊏',
        sqsubseteq: '⊑',
        sqsup: '⊐',
        sqsupe: '⊒',
        sqsupset: '⊐',
        sqsupseteq: '⊒',
        squ: '□',
        square: '□',
        squarf: '▪',
        squf: '▪',
        srarr: '→',
        sscr: '𝓈',
        ssetmn: '∖',
        ssmile: '⌣',
        sstarf: '⋆',
        star: '☆',
        starf: '★',
        straightepsilon: 'ϵ',
        straightphi: 'ϕ',
        strns: '¯',
        sub: '⊂',
        subE: '⫅',
        subdot: '⪽',
        sube: '⊆',
        subedot: '⫃',
        submult: '⫁',
        subnE: '⫋',
        subne: '⊊',
        subplus: '⪿',
        subrarr: '⥹',
        subset: '⊂',
        subseteq: '⊆',
        subseteqq: '⫅',
        subsetneq: '⊊',
        subsetneqq: '⫋',
        subsim: '⫇',
        subsub: '⫕',
        subsup: '⫓',
        succ: '≻',
        succapprox: '⪸',
        succcurlyeq: '≽',
        succeq: '⪰',
        succnapprox: '⪺',
        succneqq: '⪶',
        succnsim: '⋩',
        succsim: '≿',
        sum: '∑',
        sung: '♪',
        sup1: '¹',
        sup2: '²',
        sup3: '³',
        sup: '⊃',
        supE: '⫆',
        supdot: '⪾',
        supdsub: '⫘',
        supe: '⊇',
        supedot: '⫄',
        suphsol: '⟉',
        suphsub: '⫗',
        suplarr: '⥻',
        supmult: '⫂',
        supnE: '⫌',
        supne: '⊋',
        supplus: '⫀',
        supset: '⊃',
        supseteq: '⊇',
        supseteqq: '⫆',
        supsetneq: '⊋',
        supsetneqq: '⫌',
        supsim: '⫈',
        supsub: '⫔',
        supsup: '⫖',
        swArr: '⇙',
        swarhk: '⤦',
        swarr: '↙',
        swarrow: '↙',
        swnwar: '⤪',
        szlig: 'ß',
        target: '⌖',
        tau: 'τ',
        tbrk: '⎴',
        tcaron: 'ť',
        tcedil: 'ţ',
        tcy: 'т',
        tdot: '⃛',
        telrec: '⌕',
        tfr: '𝔱',
        there4: '∴',
        therefore: '∴',
        theta: 'θ',
        thetasym: 'ϑ',
        thetav: 'ϑ',
        thickapprox: '≈',
        thicksim: '∼',
        thinsp: ' ',
        thkap: '≈',
        thksim: '∼',
        thorn: 'þ',
        tilde: '˜',
        times: '×',
        timesb: '⊠',
        timesbar: '⨱',
        timesd: '⨰',
        tint: '∭',
        toea: '⤨',
        top: '⊤',
        topbot: '⌶',
        topcir: '⫱',
        topf: '𝕥',
        topfork: '⫚',
        tosa: '⤩',
        tprime: '‴',
        trade: '™',
        triangle: '▵',
        triangledown: '▿',
        triangleleft: '◃',
        trianglelefteq: '⊴',
        triangleq: '≜',
        triangleright: '▹',
        trianglerighteq: '⊵',
        tridot: '◬',
        trie: '≜',
        triminus: '⨺',
        triplus: '⨹',
        trisb: '⧍',
        tritime: '⨻',
        trpezium: '⏢',
        tscr: '𝓉',
        tscy: 'ц',
        tshcy: 'ћ',
        tstrok: 'ŧ',
        twixt: '≬',
        twoheadleftarrow: '↞',
        twoheadrightarrow: '↠',
        uArr: '⇑',
        uHar: '⥣',
        uacute: 'ú',
        uarr: '↑',
        ubrcy: 'ў',
        ubreve: 'ŭ',
        ucirc: 'û',
        ucy: 'у',
        udarr: '⇅',
        udblac: 'ű',
        udhar: '⥮',
        ufisht: '⥾',
        ufr: '𝔲',
        ugrave: 'ù',
        uharl: '↿',
        uharr: '↾',
        uhblk: '▀',
        ulcorn: '⌜',
        ulcorner: '⌜',
        ulcrop: '⌏',
        ultri: '◸',
        umacr: 'ū',
        uml: '¨',
        uogon: 'ų',
        uopf: '𝕦',
        uparrow: '↑',
        updownarrow: '↕',
        upharpoonleft: '↿',
        upharpoonright: '↾',
        uplus: '⊎',
        upsi: 'υ',
        upsih: 'ϒ',
        upsilon: 'υ',
        upuparrows: '⇈',
        urcorn: '⌝',
        urcorner: '⌝',
        urcrop: '⌎',
        uring: 'ů',
        urtri: '◹',
        uscr: '𝓊',
        utdot: '⋰',
        utilde: 'ũ',
        utri: '▵',
        utrif: '▴',
        uuarr: '⇈',
        uuml: 'ü',
        uwangle: '⦧',
        vArr: '⇕',
        vBar: '⫨',
        vBarv: '⫩',
        vDash: '⊨',
        vangrt: '⦜',
        varepsilon: 'ϵ',
        varkappa: 'ϰ',
        varnothing: '∅',
        varphi: 'ϕ',
        varpi: 'ϖ',
        varpropto: '∝',
        varr: '↕',
        varrho: 'ϱ',
        varsigma: 'ς',
        varsubsetneq: '⊊︀',
        varsubsetneqq: '⫋︀',
        varsupsetneq: '⊋︀',
        varsupsetneqq: '⫌︀',
        vartheta: 'ϑ',
        vartriangleleft: '⊲',
        vartriangleright: '⊳',
        vcy: 'в',
        vdash: '⊢',
        vee: '∨',
        veebar: '⊻',
        veeeq: '≚',
        vellip: '⋮',
        verbar: '|',
        vert: '|',
        vfr: '𝔳',
        vltri: '⊲',
        vnsub: '⊂⃒',
        vnsup: '⊃⃒',
        vopf: '𝕧',
        vprop: '∝',
        vrtri: '⊳',
        vscr: '𝓋',
        vsubnE: '⫋︀',
        vsubne: '⊊︀',
        vsupnE: '⫌︀',
        vsupne: '⊋︀',
        vzigzag: '⦚',
        wcirc: 'ŵ',
        wedbar: '⩟',
        wedge: '∧',
        wedgeq: '≙',
        weierp: '℘',
        wfr: '𝔴',
        wopf: '𝕨',
        wp: '℘',
        wr: '≀',
        wreath: '≀',
        wscr: '𝓌',
        xcap: '⋂',
        xcirc: '◯',
        xcup: '⋃',
        xdtri: '▽',
        xfr: '𝔵',
        xhArr: '⟺',
        xharr: '⟷',
        xi: 'ξ',
        xlArr: '⟸',
        xlarr: '⟵',
        xmap: '⟼',
        xnis: '⋻',
        xodot: '⨀',
        xopf: '𝕩',
        xoplus: '⨁',
        xotime: '⨂',
        xrArr: '⟹',
        xrarr: '⟶',
        xscr: '𝓍',
        xsqcup: '⨆',
        xuplus: '⨄',
        xutri: '△',
        xvee: '⋁',
        xwedge: '⋀',
        yacute: 'ý',
        yacy: 'я',
        ycirc: 'ŷ',
        ycy: 'ы',
        yen: '¥',
        yfr: '𝔶',
        yicy: 'ї',
        yopf: '𝕪',
        yscr: '𝓎',
        yucy: 'ю',
        yuml: 'ÿ',
        zacute: 'ź',
        zcaron: 'ž',
        zcy: 'з',
        zdot: 'ż',
        zeetrf: 'ℨ',
        zeta: 'ζ',
        zfr: '𝔷',
        zhcy: 'ж',
        zigrarr: '⇝',
        zopf: '𝕫',
        zscr: '𝓏',
        zwj: '‍',
        zwnj: '‌',
      },
      a7 = {}.hasOwnProperty;
    function a8(a) {
      return !!a7.call(a6, a) && a6[a];
    }
    let a9 = {
        name: 'characterReference',
        tokenize: function (a, b, c) {
          let d,
            e,
            f = this,
            g = 0;
          return function (b) {
            return (
              a.enter('characterReference'),
              a.enter('characterReferenceMarker'),
              a.consume(b),
              a.exit('characterReferenceMarker'),
              h
            );
          };
          function h(b) {
            return 35 === b
              ? (a.enter('characterReferenceMarkerNumeric'),
                a.consume(b),
                a.exit('characterReferenceMarkerNumeric'),
                i)
              : (a.enter('characterReferenceValue'), (d = 31), (e = az), j(b));
          }
          function i(b) {
            return 88 === b || 120 === b
              ? (a.enter('characterReferenceMarkerHexadecimal'),
                a.consume(b),
                a.exit('characterReferenceMarkerHexadecimal'),
                a.enter('characterReferenceValue'),
                (d = 6),
                (e = aD),
                j)
              : (a.enter('characterReferenceValue'), (d = 7), (e = aC), j(b));
          }
          function j(h) {
            if (59 === h && g) {
              let d = a.exit('characterReferenceValue');
              return e !== az || a8(f.sliceSerialize(d))
                ? (a.enter('characterReferenceMarker'),
                  a.consume(h),
                  a.exit('characterReferenceMarker'),
                  a.exit('characterReference'),
                  b)
                : c(h);
            }
            return e(h) && g++ < d ? (a.consume(h), j) : c(h);
          }
        },
      },
      ba = {
        partial: !0,
        tokenize: function (a, b, c) {
          let d = this;
          return function (b) {
            return null === b
              ? c(b)
              : (a.enter('lineEnding'), a.consume(b), a.exit('lineEnding'), e);
          };
          function e(a) {
            return d.parser.lazy[d.now().line] ? c(a) : b(a);
          }
        },
      },
      bb = {
        concrete: !0,
        name: 'codeFenced',
        tokenize: function (a, b, c) {
          let d,
            e = this,
            f = {
              partial: !0,
              tokenize: function (a, b, c) {
                let f = 0;
                return function (b) {
                  return (
                    a.enter('lineEnding'),
                    a.consume(b),
                    a.exit('lineEnding'),
                    g
                  );
                };
                function g(b) {
                  return (
                    a.enter('codeFencedFence'),
                    aH(b)
                      ? aL(
                          a,
                          i,
                          'linePrefix',
                          e.parser.constructs.disable.null.includes(
                            'codeIndented'
                          )
                            ? void 0
                            : 4
                        )(b)
                      : i(b)
                  );
                }
                function i(b) {
                  return b === d
                    ? (a.enter('codeFencedFenceSequence'),
                      (function b(e) {
                        return e === d
                          ? (f++, a.consume(e), b)
                          : f >= h
                            ? (a.exit('codeFencedFenceSequence'),
                              aH(e) ? aL(a, j, 'whitespace')(e) : j(e))
                            : c(e);
                      })(b))
                    : c(b);
                }
                function j(d) {
                  return null === d || aF(d)
                    ? (a.exit('codeFencedFence'), b(d))
                    : c(d);
                }
              },
            },
            g = 0,
            h = 0;
          return function (b) {
            var f;
            let j;
            return (
              (f = b),
              (g =
                (j = e.events[e.events.length - 1]) &&
                'linePrefix' === j[1].type
                  ? j[2].sliceSerialize(j[1], !0).length
                  : 0),
              (d = f),
              a.enter('codeFenced'),
              a.enter('codeFencedFence'),
              a.enter('codeFencedFenceSequence'),
              (function b(e) {
                return e === d
                  ? (h++, a.consume(e), b)
                  : h < 3
                    ? c(e)
                    : (a.exit('codeFencedFenceSequence'),
                      aH(e) ? aL(a, i, 'whitespace')(e) : i(e));
              })(f)
            );
          };
          function i(f) {
            return null === f || aF(f)
              ? (a.exit('codeFencedFence'),
                e.interrupt ? b(f) : a.check(ba, k, o)(f))
              : (a.enter('codeFencedFenceInfo'),
                a.enter('chunkString', { contentType: 'string' }),
                (function b(e) {
                  return null === e || aF(e)
                    ? (a.exit('chunkString'),
                      a.exit('codeFencedFenceInfo'),
                      i(e))
                    : aH(e)
                      ? (a.exit('chunkString'),
                        a.exit('codeFencedFenceInfo'),
                        aL(a, j, 'whitespace')(e))
                      : 96 === e && e === d
                        ? c(e)
                        : (a.consume(e), b);
                })(f));
          }
          function j(b) {
            return null === b || aF(b)
              ? i(b)
              : (a.enter('codeFencedFenceMeta'),
                a.enter('chunkString', { contentType: 'string' }),
                (function b(e) {
                  return null === e || aF(e)
                    ? (a.exit('chunkString'),
                      a.exit('codeFencedFenceMeta'),
                      i(e))
                    : 96 === e && e === d
                      ? c(e)
                      : (a.consume(e), b);
                })(b));
          }
          function k(b) {
            return a.attempt(f, o, l)(b);
          }
          function l(b) {
            return (
              a.enter('lineEnding'),
              a.consume(b),
              a.exit('lineEnding'),
              m
            );
          }
          function m(b) {
            return g > 0 && aH(b) ? aL(a, n, 'linePrefix', g + 1)(b) : n(b);
          }
          function n(b) {
            return null === b || aF(b)
              ? a.check(ba, k, o)(b)
              : (a.enter('codeFlowValue'),
                (function b(c) {
                  return null === c || aF(c)
                    ? (a.exit('codeFlowValue'), n(c))
                    : (a.consume(c), b);
                })(b));
          }
          function o(c) {
            return (a.exit('codeFenced'), b(c));
          }
        },
      },
      bc = {
        name: 'codeIndented',
        tokenize: function (a, b, c) {
          let d = this;
          return function (b) {
            return (a.enter('codeIndented'), aL(a, e, 'linePrefix', 5)(b));
          };
          function e(b) {
            let e = d.events[d.events.length - 1];
            return e &&
              'linePrefix' === e[1].type &&
              e[2].sliceSerialize(e[1], !0).length >= 4
              ? (function b(c) {
                  return null === c
                    ? f(c)
                    : aF(c)
                      ? a.attempt(bd, b, f)(c)
                      : (a.enter('codeFlowValue'),
                        (function c(d) {
                          return null === d || aF(d)
                            ? (a.exit('codeFlowValue'), b(d))
                            : (a.consume(d), c);
                        })(c));
                })(b)
              : c(b);
          }
          function f(c) {
            return (a.exit('codeIndented'), b(c));
          }
        },
      },
      bd = {
        partial: !0,
        tokenize: function (a, b, c) {
          let d = this;
          return e;
          function e(b) {
            return d.parser.lazy[d.now().line]
              ? c(b)
              : aF(b)
                ? (a.enter('lineEnding'), a.consume(b), a.exit('lineEnding'), e)
                : aL(a, f, 'linePrefix', 5)(b);
          }
          function f(a) {
            let f = d.events[d.events.length - 1];
            return f &&
              'linePrefix' === f[1].type &&
              f[2].sliceSerialize(f[1], !0).length >= 4
              ? b(a)
              : aF(a)
                ? e(a)
                : c(a);
          }
        },
      };
    function be(a, b, c, d, e, f, g, h, i) {
      let j = i || 1 / 0,
        k = 0;
      return function (b) {
        return 60 === b
          ? (a.enter(d), a.enter(e), a.enter(f), a.consume(b), a.exit(f), l)
          : null === b || 32 === b || 41 === b || aB(b)
            ? c(b)
            : (a.enter(d),
              a.enter(g),
              a.enter(h),
              a.enter('chunkString', { contentType: 'string' }),
              o(b));
      };
      function l(c) {
        return 62 === c
          ? (a.enter(f), a.consume(c), a.exit(f), a.exit(e), a.exit(d), b)
          : (a.enter(h),
            a.enter('chunkString', { contentType: 'string' }),
            m(c));
      }
      function m(b) {
        return 62 === b
          ? (a.exit('chunkString'), a.exit(h), l(b))
          : null === b || 60 === b || aF(b)
            ? c(b)
            : (a.consume(b), 92 === b ? n : m);
      }
      function n(b) {
        return 60 === b || 62 === b || 92 === b ? (a.consume(b), m) : m(b);
      }
      function o(e) {
        return !k && (null === e || 41 === e || aG(e))
          ? (a.exit('chunkString'), a.exit(h), a.exit(g), a.exit(d), b(e))
          : k < j && 40 === e
            ? (a.consume(e), k++, o)
            : 41 === e
              ? (a.consume(e), k--, o)
              : null === e || 32 === e || 40 === e || aB(e)
                ? c(e)
                : (a.consume(e), 92 === e ? p : o);
      }
      function p(b) {
        return 40 === b || 41 === b || 92 === b ? (a.consume(b), o) : o(b);
      }
    }
    function bf(a, b, c, d, e, f) {
      let g,
        h = this,
        i = 0;
      return function (b) {
        return (a.enter(d), a.enter(e), a.consume(b), a.exit(e), a.enter(f), j);
      };
      function j(l) {
        return i > 999 ||
          null === l ||
          91 === l ||
          (93 === l && !g) ||
          (94 === l && !i && '_hiddenFootnoteSupport' in h.parser.constructs)
          ? c(l)
          : 93 === l
            ? (a.exit(f), a.enter(e), a.consume(l), a.exit(e), a.exit(d), b)
            : aF(l)
              ? (a.enter('lineEnding'), a.consume(l), a.exit('lineEnding'), j)
              : (a.enter('chunkString', { contentType: 'string' }), k(l));
      }
      function k(b) {
        return null === b || 91 === b || 93 === b || aF(b) || i++ > 999
          ? (a.exit('chunkString'), j(b))
          : (a.consume(b), g || (g = !aH(b)), 92 === b ? l : k);
      }
      function l(b) {
        return 91 === b || 92 === b || 93 === b ? (a.consume(b), i++, k) : k(b);
      }
    }
    function bg(a, b, c, d, e, f) {
      let g;
      return function (b) {
        return 34 === b || 39 === b || 40 === b
          ? (a.enter(d),
            a.enter(e),
            a.consume(b),
            a.exit(e),
            (g = 40 === b ? 41 : b),
            h)
          : c(b);
      };
      function h(c) {
        return c === g
          ? (a.enter(e), a.consume(c), a.exit(e), a.exit(d), b)
          : (a.enter(f), i(c));
      }
      function i(b) {
        return b === g
          ? (a.exit(f), h(g))
          : null === b
            ? c(b)
            : aF(b)
              ? (a.enter('lineEnding'),
                a.consume(b),
                a.exit('lineEnding'),
                aL(a, i, 'linePrefix'))
              : (a.enter('chunkString', { contentType: 'string' }), j(b));
      }
      function j(b) {
        return b === g || null === b || aF(b)
          ? (a.exit('chunkString'), i(b))
          : (a.consume(b), 92 === b ? k : j);
      }
      function k(b) {
        return b === g || 92 === b ? (a.consume(b), j) : j(b);
      }
    }
    function bh(a, b) {
      let c;
      return function d(e) {
        return aF(e)
          ? (a.enter('lineEnding'),
            a.consume(e),
            a.exit('lineEnding'),
            (c = !0),
            d)
          : aH(e)
            ? aL(a, d, c ? 'linePrefix' : 'lineSuffix')(e)
            : b(e);
      };
    }
    function bi(a) {
      return a
        .replace(/[\t\n\r ]+/g, ' ')
        .replace(/^ | $/g, '')
        .toLowerCase()
        .toUpperCase();
    }
    let bj = {
        partial: !0,
        tokenize: function (a, b, c) {
          return function (b) {
            return aG(b) ? bh(a, d)(b) : c(b);
          };
          function d(b) {
            return bg(
              a,
              e,
              c,
              'definitionTitle',
              'definitionTitleMarker',
              'definitionTitleString'
            )(b);
          }
          function e(b) {
            return aH(b) ? aL(a, f, 'whitespace')(b) : f(b);
          }
          function f(a) {
            return null === a || aF(a) ? b(a) : c(a);
          }
        },
      },
      bk = [
        'address',
        'article',
        'aside',
        'base',
        'basefont',
        'blockquote',
        'body',
        'caption',
        'center',
        'col',
        'colgroup',
        'dd',
        'details',
        'dialog',
        'dir',
        'div',
        'dl',
        'dt',
        'fieldset',
        'figcaption',
        'figure',
        'footer',
        'form',
        'frame',
        'frameset',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'head',
        'header',
        'hr',
        'html',
        'iframe',
        'legend',
        'li',
        'link',
        'main',
        'menu',
        'menuitem',
        'nav',
        'noframes',
        'ol',
        'optgroup',
        'option',
        'p',
        'param',
        'search',
        'section',
        'summary',
        'table',
        'tbody',
        'td',
        'tfoot',
        'th',
        'thead',
        'title',
        'tr',
        'track',
        'ul',
      ],
      bl = ['pre', 'script', 'style', 'textarea'],
      bm = {
        partial: !0,
        tokenize: function (a, b, c) {
          return function (d) {
            return (
              a.enter('lineEnding'),
              a.consume(d),
              a.exit('lineEnding'),
              a.attempt(aP, b, c)
            );
          };
        },
      },
      bn = {
        partial: !0,
        tokenize: function (a, b, c) {
          let d = this;
          return function (b) {
            return aF(b)
              ? (a.enter('lineEnding'), a.consume(b), a.exit('lineEnding'), e)
              : c(b);
          };
          function e(a) {
            return d.parser.lazy[d.now().line] ? c(a) : b(a);
          }
        },
      },
      bo = {
        name: 'labelEnd',
        resolveAll: function (a) {
          let b = -1,
            c = [];
          for (; ++b < a.length; ) {
            let d = a[b][1];
            if (
              (c.push(a[b]),
              'labelImage' === d.type ||
                'labelLink' === d.type ||
                'labelEnd' === d.type)
            ) {
              let a = 'labelImage' === d.type ? 4 : 2;
              ((d.type = 'data'), (b += a));
            }
          }
          return (a.length !== c.length && av(a, 0, a.length, c), a);
        },
        resolveTo: function (a, b) {
          let c,
            d,
            e,
            f,
            g = a.length,
            h = 0;
          for (; g--; )
            if (((c = a[g][1]), d)) {
              if ('link' === c.type || ('labelLink' === c.type && c._inactive))
                break;
              'enter' === a[g][0] &&
                'labelLink' === c.type &&
                (c._inactive = !0);
            } else if (e) {
              if (
                'enter' === a[g][0] &&
                ('labelImage' === c.type || 'labelLink' === c.type) &&
                !c._balanced &&
                ((d = g), 'labelLink' !== c.type)
              ) {
                h = 2;
                break;
              }
            } else 'labelEnd' === c.type && (e = g);
          let i = {
              type: 'labelLink' === a[d][1].type ? 'link' : 'image',
              start: { ...a[d][1].start },
              end: { ...a[a.length - 1][1].end },
            },
            j = {
              type: 'label',
              start: { ...a[d][1].start },
              end: { ...a[e][1].end },
            },
            k = {
              type: 'labelText',
              start: { ...a[d + h + 2][1].end },
              end: { ...a[e - 2][1].start },
            };
          return (
            (f = aw(
              (f = [
                ['enter', i, b],
                ['enter', j, b],
              ]),
              a.slice(d + 1, d + h + 3)
            )),
            (f = aw(f, [['enter', k, b]])),
            (f = aw(
              f,
              a1(
                b.parser.constructs.insideSpan.null,
                a.slice(d + h + 4, e - 3),
                b
              )
            )),
            (f = aw(f, [['exit', k, b], a[e - 2], a[e - 1], ['exit', j, b]])),
            (f = aw(f, a.slice(e + 1))),
            (f = aw(f, [['exit', i, b]])),
            av(a, d, a.length, f),
            a
          );
        },
        tokenize: function (a, b, c) {
          let d,
            e,
            f = this,
            g = f.events.length;
          for (; g--; )
            if (
              ('labelImage' === f.events[g][1].type ||
                'labelLink' === f.events[g][1].type) &&
              !f.events[g][1]._balanced
            ) {
              d = f.events[g][1];
              break;
            }
          return function (b) {
            return d
              ? d._inactive
                ? k(b)
                : ((e = f.parser.defined.includes(
                    bi(f.sliceSerialize({ start: d.end, end: f.now() }))
                  )),
                  a.enter('labelEnd'),
                  a.enter('labelMarker'),
                  a.consume(b),
                  a.exit('labelMarker'),
                  a.exit('labelEnd'),
                  h)
              : c(b);
          };
          function h(b) {
            return 40 === b
              ? a.attempt(bp, j, e ? j : k)(b)
              : 91 === b
                ? a.attempt(bq, j, e ? i : k)(b)
                : e
                  ? j(b)
                  : k(b);
          }
          function i(b) {
            return a.attempt(br, j, k)(b);
          }
          function j(a) {
            return b(a);
          }
          function k(a) {
            return ((d._balanced = !0), c(a));
          }
        },
      },
      bp = {
        tokenize: function (a, b, c) {
          return function (b) {
            return (
              a.enter('resource'),
              a.enter('resourceMarker'),
              a.consume(b),
              a.exit('resourceMarker'),
              d
            );
          };
          function d(b) {
            return aG(b) ? bh(a, e)(b) : e(b);
          }
          function e(b) {
            return 41 === b
              ? j(b)
              : be(
                  a,
                  f,
                  g,
                  'resourceDestination',
                  'resourceDestinationLiteral',
                  'resourceDestinationLiteralMarker',
                  'resourceDestinationRaw',
                  'resourceDestinationString',
                  32
                )(b);
          }
          function f(b) {
            return aG(b) ? bh(a, h)(b) : j(b);
          }
          function g(a) {
            return c(a);
          }
          function h(b) {
            return 34 === b || 39 === b || 40 === b
              ? bg(
                  a,
                  i,
                  c,
                  'resourceTitle',
                  'resourceTitleMarker',
                  'resourceTitleString'
                )(b)
              : j(b);
          }
          function i(b) {
            return aG(b) ? bh(a, j)(b) : j(b);
          }
          function j(d) {
            return 41 === d
              ? (a.enter('resourceMarker'),
                a.consume(d),
                a.exit('resourceMarker'),
                a.exit('resource'),
                b)
              : c(d);
          }
        },
      },
      bq = {
        tokenize: function (a, b, c) {
          let d = this;
          return function (b) {
            return bf.call(
              d,
              a,
              e,
              f,
              'reference',
              'referenceMarker',
              'referenceString'
            )(b);
          };
          function e(a) {
            return d.parser.defined.includes(
              bi(
                d.sliceSerialize(d.events[d.events.length - 1][1]).slice(1, -1)
              )
            )
              ? b(a)
              : c(a);
          }
          function f(a) {
            return c(a);
          }
        },
      },
      br = {
        tokenize: function (a, b, c) {
          return function (b) {
            return (
              a.enter('reference'),
              a.enter('referenceMarker'),
              a.consume(b),
              a.exit('referenceMarker'),
              d
            );
          };
          function d(d) {
            return 93 === d
              ? (a.enter('referenceMarker'),
                a.consume(d),
                a.exit('referenceMarker'),
                a.exit('reference'),
                b)
              : c(d);
          }
        },
      },
      bs = {
        name: 'labelStartImage',
        resolveAll: bo.resolveAll,
        tokenize: function (a, b, c) {
          let d = this;
          return function (b) {
            return (
              a.enter('labelImage'),
              a.enter('labelImageMarker'),
              a.consume(b),
              a.exit('labelImageMarker'),
              e
            );
          };
          function e(b) {
            return 91 === b
              ? (a.enter('labelMarker'),
                a.consume(b),
                a.exit('labelMarker'),
                a.exit('labelImage'),
                f)
              : c(b);
          }
          function f(a) {
            return 94 === a && '_hiddenFootnoteSupport' in d.parser.constructs
              ? c(a)
              : b(a);
          }
        },
      },
      bt = {
        name: 'labelStartLink',
        resolveAll: bo.resolveAll,
        tokenize: function (a, b, c) {
          let d = this;
          return function (b) {
            return (
              a.enter('labelLink'),
              a.enter('labelMarker'),
              a.consume(b),
              a.exit('labelMarker'),
              a.exit('labelLink'),
              e
            );
          };
          function e(a) {
            return 94 === a && '_hiddenFootnoteSupport' in d.parser.constructs
              ? c(a)
              : b(a);
          }
        },
      },
      bu = {
        name: 'lineEnding',
        tokenize: function (a, b) {
          return function (c) {
            return (
              a.enter('lineEnding'),
              a.consume(c),
              a.exit('lineEnding'),
              aL(a, b, 'linePrefix')
            );
          };
        },
      },
      bv = {
        name: 'thematicBreak',
        tokenize: function (a, b, c) {
          let d,
            e = 0;
          return function (f) {
            var g;
            return (
              a.enter('thematicBreak'),
              (d = g = f),
              (function f(g) {
                return g === d
                  ? (a.enter('thematicBreakSequence'),
                    (function b(c) {
                      return c === d
                        ? (a.consume(c), e++, b)
                        : (a.exit('thematicBreakSequence'),
                          aH(c) ? aL(a, f, 'whitespace')(c) : f(c));
                    })(g))
                  : e >= 3 && (null === g || aF(g))
                    ? (a.exit('thematicBreak'), b(g))
                    : c(g);
              })(g)
            );
          };
        },
      },
      bw = {
        continuation: {
          tokenize: function (a, b, c) {
            let d = this;
            return (
              (d.containerState._closeFlow = void 0),
              a.check(
                aP,
                function (c) {
                  return (
                    (d.containerState.furtherBlankLines =
                      d.containerState.furtherBlankLines ||
                      d.containerState.initialBlankLine),
                    aL(a, b, 'listItemIndent', d.containerState.size + 1)(c)
                  );
                },
                function (c) {
                  return d.containerState.furtherBlankLines || !aH(c)
                    ? ((d.containerState.furtherBlankLines = void 0),
                      (d.containerState.initialBlankLine = void 0),
                      e(c))
                    : ((d.containerState.furtherBlankLines = void 0),
                      (d.containerState.initialBlankLine = void 0),
                      a.attempt(by, b, e)(c));
                }
              )
            );
            function e(e) {
              return (
                (d.containerState._closeFlow = !0),
                (d.interrupt = void 0),
                aL(
                  a,
                  a.attempt(bw, b, c),
                  'linePrefix',
                  d.parser.constructs.disable.null.includes('codeIndented')
                    ? void 0
                    : 4
                )(e)
              );
            }
          },
        },
        exit: function (a) {
          a.exit(this.containerState.type);
        },
        name: 'list',
        tokenize: function (a, b, c) {
          let d = this,
            e = d.events[d.events.length - 1],
            f =
              e && 'linePrefix' === e[1].type
                ? e[2].sliceSerialize(e[1], !0).length
                : 0,
            g = 0;
          return function (b) {
            let e =
              d.containerState.type ||
              (42 === b || 43 === b || 45 === b
                ? 'listUnordered'
                : 'listOrdered');
            if (
              'listUnordered' === e
                ? !d.containerState.marker || b === d.containerState.marker
                : aC(b)
            ) {
              if (
                (d.containerState.type ||
                  ((d.containerState.type = e), a.enter(e, { _container: !0 })),
                'listUnordered' === e)
              )
                return (
                  a.enter('listItemPrefix'),
                  42 === b || 45 === b ? a.check(bv, c, h)(b) : h(b)
                );
              if (!d.interrupt || 49 === b)
                return (
                  a.enter('listItemPrefix'),
                  a.enter('listItemValue'),
                  (function b(e) {
                    return aC(e) && ++g < 10
                      ? (a.consume(e), b)
                      : (!d.interrupt || g < 2) &&
                          (d.containerState.marker
                            ? e === d.containerState.marker
                            : 41 === e || 46 === e)
                        ? (a.exit('listItemValue'), h(e))
                        : c(e);
                  })(b)
                );
            }
            return c(b);
          };
          function h(b) {
            return (
              a.enter('listItemMarker'),
              a.consume(b),
              a.exit('listItemMarker'),
              (d.containerState.marker = d.containerState.marker || b),
              a.check(aP, d.interrupt ? c : i, a.attempt(bx, k, j))
            );
          }
          function i(a) {
            return ((d.containerState.initialBlankLine = !0), f++, k(a));
          }
          function j(b) {
            return aH(b)
              ? (a.enter('listItemPrefixWhitespace'),
                a.consume(b),
                a.exit('listItemPrefixWhitespace'),
                k)
              : c(b);
          }
          function k(c) {
            return (
              (d.containerState.size =
                f + d.sliceSerialize(a.exit('listItemPrefix'), !0).length),
              b(c)
            );
          }
        },
      },
      bx = {
        partial: !0,
        tokenize: function (a, b, c) {
          let d = this;
          return aL(
            a,
            function (a) {
              let e = d.events[d.events.length - 1];
              return !aH(a) && e && 'listItemPrefixWhitespace' === e[1].type
                ? b(a)
                : c(a);
            },
            'listItemPrefixWhitespace',
            d.parser.constructs.disable.null.includes('codeIndented')
              ? void 0
              : 5
          );
        },
      },
      by = {
        partial: !0,
        tokenize: function (a, b, c) {
          let d = this;
          return aL(
            a,
            function (a) {
              let e = d.events[d.events.length - 1];
              return e &&
                'listItemIndent' === e[1].type &&
                e[2].sliceSerialize(e[1], !0).length === d.containerState.size
                ? b(a)
                : c(a);
            },
            'listItemIndent',
            d.containerState.size + 1
          );
        },
      },
      bz = {
        name: 'setextUnderline',
        resolveTo: function (a, b) {
          let c,
            d,
            e,
            f = a.length;
          for (; f--; )
            if ('enter' === a[f][0]) {
              if ('content' === a[f][1].type) {
                c = f;
                break;
              }
              'paragraph' === a[f][1].type && (d = f);
            } else
              ('content' === a[f][1].type && a.splice(f, 1),
                e || 'definition' !== a[f][1].type || (e = f));
          let g = {
            type: 'setextHeading',
            start: { ...a[c][1].start },
            end: { ...a[a.length - 1][1].end },
          };
          return (
            (a[d][1].type = 'setextHeadingText'),
            e
              ? (a.splice(d, 0, ['enter', g, b]),
                a.splice(e + 1, 0, ['exit', a[c][1], b]),
                (a[c][1].end = { ...a[e][1].end }))
              : (a[c][1] = g),
            a.push(['exit', g, b]),
            a
          );
        },
        tokenize: function (a, b, c) {
          let d,
            e = this;
          return function (b) {
            var g;
            let h,
              i = e.events.length;
            for (; i--; )
              if (
                'lineEnding' !== e.events[i][1].type &&
                'linePrefix' !== e.events[i][1].type &&
                'content' !== e.events[i][1].type
              ) {
                h = 'paragraph' === e.events[i][1].type;
                break;
              }
            return !e.parser.lazy[e.now().line] && (e.interrupt || h)
              ? (a.enter('setextHeadingLine'),
                (d = b),
                (g = b),
                a.enter('setextHeadingLineSequence'),
                (function b(c) {
                  return c === d
                    ? (a.consume(c), b)
                    : (a.exit('setextHeadingLineSequence'),
                      aH(c) ? aL(a, f, 'lineSuffix')(c) : f(c));
                })(g))
              : c(b);
          };
          function f(d) {
            return null === d || aF(d)
              ? (a.exit('setextHeadingLine'), b(d))
              : c(d);
          }
        },
      };
    a.s(
      [
        'attentionMarkers',
        0,
        { null: [42, 95] },
        'contentInitial',
        0,
        {
          91: {
            name: 'definition',
            tokenize: function (a, b, c) {
              let d,
                e = this;
              return function (b) {
                var d;
                return (
                  a.enter('definition'),
                  (d = b),
                  bf.call(
                    e,
                    a,
                    f,
                    c,
                    'definitionLabel',
                    'definitionLabelMarker',
                    'definitionLabelString'
                  )(d)
                );
              };
              function f(b) {
                return ((d = bi(
                  e
                    .sliceSerialize(e.events[e.events.length - 1][1])
                    .slice(1, -1)
                )),
                58 === b)
                  ? (a.enter('definitionMarker'),
                    a.consume(b),
                    a.exit('definitionMarker'),
                    g)
                  : c(b);
              }
              function g(b) {
                return aG(b) ? bh(a, h)(b) : h(b);
              }
              function h(b) {
                return be(
                  a,
                  i,
                  c,
                  'definitionDestination',
                  'definitionDestinationLiteral',
                  'definitionDestinationLiteralMarker',
                  'definitionDestinationRaw',
                  'definitionDestinationString'
                )(b);
              }
              function i(b) {
                return a.attempt(bj, j, j)(b);
              }
              function j(b) {
                return aH(b) ? aL(a, k, 'whitespace')(b) : k(b);
              }
              function k(f) {
                return null === f || aF(f)
                  ? (a.exit('definition'), e.parser.defined.push(d), b(f))
                  : c(f);
              }
            },
          },
        },
        'disable',
        0,
        { null: [] },
        'document',
        0,
        {
          42: bw,
          43: bw,
          45: bw,
          48: bw,
          49: bw,
          50: bw,
          51: bw,
          52: bw,
          53: bw,
          54: bw,
          55: bw,
          56: bw,
          57: bw,
          62: a4,
        },
        'flow',
        0,
        {
          35: {
            name: 'headingAtx',
            resolve: function (a, b) {
              let c,
                d,
                e = a.length - 2,
                f = 3;
              return (
                'whitespace' === a[3][1].type && (f += 2),
                e - 2 > f && 'whitespace' === a[e][1].type && (e -= 2),
                'atxHeadingSequence' === a[e][1].type &&
                  (f === e - 1 ||
                    (e - 4 > f && 'whitespace' === a[e - 2][1].type)) &&
                  (e -= f + 1 === e ? 2 : 4),
                e > f &&
                  ((c = {
                    type: 'atxHeadingText',
                    start: a[f][1].start,
                    end: a[e][1].end,
                  }),
                  (d = {
                    type: 'chunkText',
                    start: a[f][1].start,
                    end: a[e][1].end,
                    contentType: 'text',
                  }),
                  av(a, f, e - f + 1, [
                    ['enter', c, b],
                    ['enter', d, b],
                    ['exit', d, b],
                    ['exit', c, b],
                  ])),
                a
              );
            },
            tokenize: function (a, b, c) {
              let d = 0;
              return function (e) {
                var f;
                return (
                  a.enter('atxHeading'),
                  (f = e),
                  a.enter('atxHeadingSequence'),
                  (function e(f) {
                    return 35 === f && d++ < 6
                      ? (a.consume(f), e)
                      : null === f || aG(f)
                        ? (a.exit('atxHeadingSequence'),
                          (function c(d) {
                            return 35 === d
                              ? (a.enter('atxHeadingSequence'),
                                (function b(d) {
                                  return 35 === d
                                    ? (a.consume(d), b)
                                    : (a.exit('atxHeadingSequence'), c(d));
                                })(d))
                              : null === d || aF(d)
                                ? (a.exit('atxHeading'), b(d))
                                : aH(d)
                                  ? aL(a, c, 'whitespace')(d)
                                  : (a.enter('atxHeadingText'),
                                    (function b(d) {
                                      return null === d || 35 === d || aG(d)
                                        ? (a.exit('atxHeadingText'), c(d))
                                        : (a.consume(d), b);
                                    })(d));
                          })(f))
                        : c(f);
                  })(f)
                );
              };
            },
          },
          42: bv,
          45: [bz, bv],
          60: {
            concrete: !0,
            name: 'htmlFlow',
            resolveTo: function (a) {
              let b = a.length;
              for (
                ;
                b-- && ('enter' !== a[b][0] || 'htmlFlow' !== a[b][1].type);
              );
              return (
                b > 1 &&
                  'linePrefix' === a[b - 2][1].type &&
                  ((a[b][1].start = a[b - 2][1].start),
                  (a[b + 1][1].start = a[b - 2][1].start),
                  a.splice(b - 2, 2)),
                a
              );
            },
            tokenize: function (a, b, c) {
              let d,
                e,
                f,
                g,
                h,
                i = this;
              return function (b) {
                var c;
                return (
                  (c = b),
                  a.enter('htmlFlow'),
                  a.enter('htmlFlowData'),
                  a.consume(c),
                  j
                );
              };
              function j(g) {
                return 33 === g
                  ? (a.consume(g), k)
                  : 47 === g
                    ? (a.consume(g), (e = !0), n)
                    : 63 === g
                      ? (a.consume(g), (d = 3), i.interrupt ? b : G)
                      : ay(g)
                        ? (a.consume(g), (f = String.fromCharCode(g)), o)
                        : c(g);
              }
              function k(e) {
                return 45 === e
                  ? (a.consume(e), (d = 2), l)
                  : 91 === e
                    ? (a.consume(e), (d = 5), (g = 0), m)
                    : ay(e)
                      ? (a.consume(e), (d = 4), i.interrupt ? b : G)
                      : c(e);
              }
              function l(d) {
                return 45 === d ? (a.consume(d), i.interrupt ? b : G) : c(d);
              }
              function m(d) {
                let e = 'CDATA[';
                return d === e.charCodeAt(g++)
                  ? (a.consume(d), g === e.length)
                    ? i.interrupt
                      ? b
                      : y
                    : m
                  : c(d);
              }
              function n(b) {
                return ay(b)
                  ? (a.consume(b), (f = String.fromCharCode(b)), o)
                  : c(b);
              }
              function o(g) {
                if (null === g || 47 === g || 62 === g || aG(g)) {
                  let h = 47 === g,
                    j = f.toLowerCase();
                  return !h && !e && bl.includes(j)
                    ? ((d = 1), i.interrupt ? b(g) : y(g))
                    : bk.includes(f.toLowerCase())
                      ? ((d = 6), h)
                        ? (a.consume(g), p)
                        : i.interrupt
                          ? b(g)
                          : y(g)
                      : ((d = 7),
                        i.interrupt && !i.parser.lazy[i.now().line]
                          ? c(g)
                          : e
                            ? (function b(c) {
                                return aH(c) ? (a.consume(c), b) : w(c);
                              })(g)
                            : q(g));
                }
                return 45 === g || az(g)
                  ? (a.consume(g), (f += String.fromCharCode(g)), o)
                  : c(g);
              }
              function p(d) {
                return 62 === d ? (a.consume(d), i.interrupt ? b : y) : c(d);
              }
              function q(b) {
                return 47 === b
                  ? (a.consume(b), w)
                  : 58 === b || 95 === b || ay(b)
                    ? (a.consume(b), r)
                    : aH(b)
                      ? (a.consume(b), q)
                      : w(b);
              }
              function r(b) {
                return 45 === b || 46 === b || 58 === b || 95 === b || az(b)
                  ? (a.consume(b), r)
                  : s(b);
              }
              function s(b) {
                return 61 === b
                  ? (a.consume(b), t)
                  : aH(b)
                    ? (a.consume(b), s)
                    : q(b);
              }
              function t(b) {
                return null === b ||
                  60 === b ||
                  61 === b ||
                  62 === b ||
                  96 === b
                  ? c(b)
                  : 34 === b || 39 === b
                    ? (a.consume(b), (h = b), u)
                    : aH(b)
                      ? (a.consume(b), t)
                      : (function b(c) {
                          return null === c ||
                            34 === c ||
                            39 === c ||
                            47 === c ||
                            60 === c ||
                            61 === c ||
                            62 === c ||
                            96 === c ||
                            aG(c)
                            ? s(c)
                            : (a.consume(c), b);
                        })(b);
              }
              function u(b) {
                return b === h
                  ? (a.consume(b), (h = null), v)
                  : null === b || aF(b)
                    ? c(b)
                    : (a.consume(b), u);
              }
              function v(a) {
                return 47 === a || 62 === a || aH(a) ? q(a) : c(a);
              }
              function w(b) {
                return 62 === b ? (a.consume(b), x) : c(b);
              }
              function x(b) {
                return null === b || aF(b)
                  ? y(b)
                  : aH(b)
                    ? (a.consume(b), x)
                    : c(b);
              }
              function y(b) {
                return 45 === b && 2 === d
                  ? (a.consume(b), C)
                  : 60 === b && 1 === d
                    ? (a.consume(b), D)
                    : 62 === b && 4 === d
                      ? (a.consume(b), H)
                      : 63 === b && 3 === d
                        ? (a.consume(b), G)
                        : 93 === b && 5 === d
                          ? (a.consume(b), F)
                          : aF(b) && (6 === d || 7 === d)
                            ? (a.exit('htmlFlowData'), a.check(bm, I, z)(b))
                            : null === b || aF(b)
                              ? (a.exit('htmlFlowData'), z(b))
                              : (a.consume(b), y);
              }
              function z(b) {
                return a.check(bn, A, I)(b);
              }
              function A(b) {
                return (
                  a.enter('lineEnding'),
                  a.consume(b),
                  a.exit('lineEnding'),
                  B
                );
              }
              function B(b) {
                return null === b || aF(b)
                  ? z(b)
                  : (a.enter('htmlFlowData'), y(b));
              }
              function C(b) {
                return 45 === b ? (a.consume(b), G) : y(b);
              }
              function D(b) {
                return 47 === b ? (a.consume(b), (f = ''), E) : y(b);
              }
              function E(b) {
                if (62 === b) {
                  let c = f.toLowerCase();
                  return bl.includes(c) ? (a.consume(b), H) : y(b);
                }
                return ay(b) && f.length < 8
                  ? (a.consume(b), (f += String.fromCharCode(b)), E)
                  : y(b);
              }
              function F(b) {
                return 93 === b ? (a.consume(b), G) : y(b);
              }
              function G(b) {
                return 62 === b
                  ? (a.consume(b), H)
                  : 45 === b && 2 === d
                    ? (a.consume(b), G)
                    : y(b);
              }
              function H(b) {
                return null === b || aF(b)
                  ? (a.exit('htmlFlowData'), I(b))
                  : (a.consume(b), H);
              }
              function I(c) {
                return (a.exit('htmlFlow'), b(c));
              }
            },
          },
          61: bz,
          95: bv,
          96: bb,
          126: bb,
        },
        'flowInitial',
        0,
        { [-2]: bc, [-1]: bc, 32: bc },
        'insideSpan',
        0,
        { null: [a2, aW] },
        'string',
        0,
        { 38: a9, 92: a5 },
        'text',
        0,
        {
          [-5]: bu,
          [-4]: bu,
          [-3]: bu,
          33: bs,
          38: a9,
          42: a2,
          60: [
            {
              name: 'autolink',
              tokenize: function (a, b, c) {
                let d = 0;
                return function (b) {
                  return (
                    a.enter('autolink'),
                    a.enter('autolinkMarker'),
                    a.consume(b),
                    a.exit('autolinkMarker'),
                    a.enter('autolinkProtocol'),
                    e
                  );
                };
                function e(b) {
                  return ay(b) ? (a.consume(b), f) : 64 === b ? c(b) : h(b);
                }
                function f(b) {
                  return 43 === b || 45 === b || 46 === b || az(b)
                    ? ((d = 1),
                      (function b(c) {
                        return 58 === c
                          ? (a.consume(c), (d = 0), g)
                          : (43 === c || 45 === c || 46 === c || az(c)) &&
                              d++ < 32
                            ? (a.consume(c), b)
                            : ((d = 0), h(c));
                      })(b))
                    : h(b);
                }
                function g(d) {
                  return 62 === d
                    ? (a.exit('autolinkProtocol'),
                      a.enter('autolinkMarker'),
                      a.consume(d),
                      a.exit('autolinkMarker'),
                      a.exit('autolink'),
                      b)
                    : null === d || 32 === d || 60 === d || aB(d)
                      ? c(d)
                      : (a.consume(d), g);
                }
                function h(b) {
                  return 64 === b
                    ? (a.consume(b), i)
                    : aA(b)
                      ? (a.consume(b), h)
                      : c(b);
                }
                function i(e) {
                  return az(e)
                    ? (function e(f) {
                        return 46 === f
                          ? (a.consume(f), (d = 0), i)
                          : 62 === f
                            ? ((a.exit('autolinkProtocol').type =
                                'autolinkEmail'),
                              a.enter('autolinkMarker'),
                              a.consume(f),
                              a.exit('autolinkMarker'),
                              a.exit('autolink'),
                              b)
                            : (function b(f) {
                                if ((45 === f || az(f)) && d++ < 63) {
                                  let c = 45 === f ? b : e;
                                  return (a.consume(f), c);
                                }
                                return c(f);
                              })(f);
                      })(e)
                    : c(e);
                }
              },
            },
            {
              name: 'htmlText',
              tokenize: function (a, b, c) {
                let d,
                  e,
                  f,
                  g = this;
                return function (b) {
                  return (
                    a.enter('htmlText'),
                    a.enter('htmlTextData'),
                    a.consume(b),
                    h
                  );
                };
                function h(b) {
                  return 33 === b
                    ? (a.consume(b), i)
                    : 47 === b
                      ? (a.consume(b), u)
                      : 63 === b
                        ? (a.consume(b), s)
                        : ay(b)
                          ? (a.consume(b), w)
                          : c(b);
                }
                function i(b) {
                  return 45 === b
                    ? (a.consume(b), j)
                    : 91 === b
                      ? (a.consume(b), (e = 0), n)
                      : ay(b)
                        ? (a.consume(b), r)
                        : c(b);
                }
                function j(b) {
                  return 45 === b ? (a.consume(b), m) : c(b);
                }
                function k(b) {
                  return null === b
                    ? c(b)
                    : 45 === b
                      ? (a.consume(b), l)
                      : aF(b)
                        ? ((f = k), E(b))
                        : (a.consume(b), k);
                }
                function l(b) {
                  return 45 === b ? (a.consume(b), m) : k(b);
                }
                function m(a) {
                  return 62 === a ? D(a) : 45 === a ? l(a) : k(a);
                }
                function n(b) {
                  let d = 'CDATA[';
                  return b === d.charCodeAt(e++)
                    ? (a.consume(b), e === d.length ? o : n)
                    : c(b);
                }
                function o(b) {
                  return null === b
                    ? c(b)
                    : 93 === b
                      ? (a.consume(b), p)
                      : aF(b)
                        ? ((f = o), E(b))
                        : (a.consume(b), o);
                }
                function p(b) {
                  return 93 === b ? (a.consume(b), q) : o(b);
                }
                function q(b) {
                  return 62 === b ? D(b) : 93 === b ? (a.consume(b), q) : o(b);
                }
                function r(b) {
                  return null === b || 62 === b
                    ? D(b)
                    : aF(b)
                      ? ((f = r), E(b))
                      : (a.consume(b), r);
                }
                function s(b) {
                  return null === b
                    ? c(b)
                    : 63 === b
                      ? (a.consume(b), t)
                      : aF(b)
                        ? ((f = s), E(b))
                        : (a.consume(b), s);
                }
                function t(a) {
                  return 62 === a ? D(a) : s(a);
                }
                function u(b) {
                  return ay(b) ? (a.consume(b), v) : c(b);
                }
                function v(b) {
                  return 45 === b || az(b)
                    ? (a.consume(b), v)
                    : (function b(c) {
                        return aF(c)
                          ? ((f = b), E(c))
                          : aH(c)
                            ? (a.consume(c), b)
                            : D(c);
                      })(b);
                }
                function w(b) {
                  return 45 === b || az(b)
                    ? (a.consume(b), w)
                    : 47 === b || 62 === b || aG(b)
                      ? x(b)
                      : c(b);
                }
                function x(b) {
                  return 47 === b
                    ? (a.consume(b), D)
                    : 58 === b || 95 === b || ay(b)
                      ? (a.consume(b), y)
                      : aF(b)
                        ? ((f = x), E(b))
                        : aH(b)
                          ? (a.consume(b), x)
                          : D(b);
                }
                function y(b) {
                  return 45 === b || 46 === b || 58 === b || 95 === b || az(b)
                    ? (a.consume(b), y)
                    : (function b(c) {
                        return 61 === c
                          ? (a.consume(c), z)
                          : aF(c)
                            ? ((f = b), E(c))
                            : aH(c)
                              ? (a.consume(c), b)
                              : x(c);
                      })(b);
                }
                function z(b) {
                  return null === b ||
                    60 === b ||
                    61 === b ||
                    62 === b ||
                    96 === b
                    ? c(b)
                    : 34 === b || 39 === b
                      ? (a.consume(b), (d = b), A)
                      : aF(b)
                        ? ((f = z), E(b))
                        : aH(b)
                          ? (a.consume(b), z)
                          : (a.consume(b), B);
                }
                function A(b) {
                  return b === d
                    ? (a.consume(b), (d = void 0), C)
                    : null === b
                      ? c(b)
                      : aF(b)
                        ? ((f = A), E(b))
                        : (a.consume(b), A);
                }
                function B(b) {
                  return null === b ||
                    34 === b ||
                    39 === b ||
                    60 === b ||
                    61 === b ||
                    96 === b
                    ? c(b)
                    : 47 === b || 62 === b || aG(b)
                      ? x(b)
                      : (a.consume(b), B);
                }
                function C(a) {
                  return 47 === a || 62 === a || aG(a) ? x(a) : c(a);
                }
                function D(d) {
                  return 62 === d
                    ? (a.consume(d),
                      a.exit('htmlTextData'),
                      a.exit('htmlText'),
                      b)
                    : c(d);
                }
                function E(b) {
                  return (
                    a.exit('htmlTextData'),
                    a.enter('lineEnding'),
                    a.consume(b),
                    a.exit('lineEnding'),
                    F
                  );
                }
                function F(b) {
                  return aH(b)
                    ? aL(
                        a,
                        G,
                        'linePrefix',
                        g.parser.constructs.disable.null.includes(
                          'codeIndented'
                        )
                          ? void 0
                          : 4
                      )(b)
                    : G(b);
                }
                function G(b) {
                  return (a.enter('htmlTextData'), f(b));
                }
              },
            },
          ],
          91: bt,
          92: [
            {
              name: 'hardBreakEscape',
              tokenize: function (a, b, c) {
                return function (b) {
                  return (a.enter('hardBreakEscape'), a.consume(b), d);
                };
                function d(d) {
                  return aF(d) ? (a.exit('hardBreakEscape'), b(d)) : c(d);
                }
              },
            },
            a5,
          ],
          93: bo,
          95: a2,
          96: {
            name: 'codeText',
            previous: function (a) {
              return (
                96 !== a ||
                'characterEscape' ===
                  this.events[this.events.length - 1][1].type
              );
            },
            resolve: function (a) {
              let b,
                c,
                d = a.length - 4,
                e = 3;
              if (
                ('lineEnding' === a[3][1].type || 'space' === a[e][1].type) &&
                ('lineEnding' === a[d][1].type || 'space' === a[d][1].type)
              ) {
                for (b = e; ++b < d; )
                  if ('codeTextData' === a[b][1].type) {
                    ((a[e][1].type = 'codeTextPadding'),
                      (a[d][1].type = 'codeTextPadding'),
                      (e += 2),
                      (d -= 2));
                    break;
                  }
              }
              for (b = e - 1, d++; ++b <= d; )
                void 0 === c
                  ? b !== d && 'lineEnding' !== a[b][1].type && (c = b)
                  : (b === d || 'lineEnding' === a[b][1].type) &&
                    ((a[c][1].type = 'codeTextData'),
                    b !== c + 2 &&
                      ((a[c][1].end = a[b - 1][1].end),
                      a.splice(c + 2, b - c - 2),
                      (d -= b - c - 2),
                      (b = c + 2)),
                    (c = void 0));
              return a;
            },
            tokenize: function (a, b, c) {
              let d,
                e,
                f = 0;
              return function (b) {
                return (
                  a.enter('codeText'),
                  a.enter('codeTextSequence'),
                  (function b(c) {
                    return 96 === c
                      ? (a.consume(c), f++, b)
                      : (a.exit('codeTextSequence'), g(c));
                  })(b)
                );
              };
              function g(i) {
                return null === i
                  ? c(i)
                  : 32 === i
                    ? (a.enter('space'), a.consume(i), a.exit('space'), g)
                    : 96 === i
                      ? ((e = a.enter('codeTextSequence')),
                        (d = 0),
                        (function c(g) {
                          return 96 === g
                            ? (a.consume(g), d++, c)
                            : d === f
                              ? (a.exit('codeTextSequence'),
                                a.exit('codeText'),
                                b(g))
                              : ((e.type = 'codeTextData'), h(g));
                        })(i))
                      : aF(i)
                        ? (a.enter('lineEnding'),
                          a.consume(i),
                          a.exit('lineEnding'),
                          g)
                        : (a.enter('codeTextData'), h(i));
              }
              function h(b) {
                return null === b || 32 === b || 96 === b || aF(b)
                  ? (a.exit('codeTextData'), g(b))
                  : (a.consume(b), h);
              }
            },
          },
        },
      ],
      31051
    );
    var bA = a.i(31051);
    let bB = /[\0\t\n\r]/g;
    function bC(a, b) {
      let c = Number.parseInt(a, b);
      return c < 9 ||
        11 === c ||
        (c > 13 && c < 32) ||
        (c > 126 && c < 160) ||
        (c > 55295 && c < 57344) ||
        (c > 64975 && c < 65008) ||
        (65535 & c) == 65535 ||
        (65535 & c) == 65534 ||
        c > 1114111
        ? '�'
        : String.fromCodePoint(c);
    }
    let bD =
      /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
    function bE(a, b, c) {
      if (b) return b;
      if (35 === c.charCodeAt(0)) {
        let a = c.charCodeAt(1),
          b = 120 === a || 88 === a;
        return bC(c.slice(b ? 2 : 1), b ? 16 : 10);
      }
      return a8(c) || a;
    }
    let bF = {}.hasOwnProperty;
    function bG(a) {
      return { line: a.line, column: a.column, offset: a.offset };
    }
    function bH(a, b) {
      if (a)
        throw Error(
          'Cannot close `' +
            a.type +
            '` (' +
            _({ start: a.start, end: a.end }) +
            '): a different token (`' +
            b.type +
            '`, ' +
            _({ start: b.start, end: b.end }) +
            ') is open'
        );
      throw Error(
        'Cannot close document, a token (`' +
          b.type +
          '`, ' +
          _({ start: b.start, end: b.end }) +
          ') is still open'
      );
    }
    function bI(a) {
      let b = this;
      b.parser = function (c) {
        var d, e;
        let f, g, h, i;
        return (
          'string' !=
            typeof (d = {
              ...b.data('settings'),
              ...a,
              extensions: b.data('micromarkExtensions') || [],
              mdastExtensions: b.data('fromMarkdownExtensions') || [],
            }) && ((e = d), (d = void 0)),
          (function (a) {
            let b = {
              transforms: [],
              canContainEols: [
                'emphasis',
                'fragment',
                'heading',
                'paragraph',
                'strong',
              ],
              enter: {
                autolink: d(r),
                autolinkProtocol: j,
                autolinkEmail: j,
                atxHeading: d(o),
                blockQuote: d(function () {
                  return { type: 'blockquote', children: [] };
                }),
                characterEscape: j,
                characterReference: j,
                codeFenced: d(n),
                codeFencedFenceInfo: e,
                codeFencedFenceMeta: e,
                codeIndented: d(n, e),
                codeText: d(function () {
                  return { type: 'inlineCode', value: '' };
                }, e),
                codeTextData: j,
                data: j,
                codeFlowValue: j,
                definition: d(function () {
                  return {
                    type: 'definition',
                    identifier: '',
                    label: null,
                    title: null,
                    url: '',
                  };
                }),
                definitionDestinationString: e,
                definitionLabelString: e,
                definitionTitleString: e,
                emphasis: d(function () {
                  return { type: 'emphasis', children: [] };
                }),
                hardBreakEscape: d(p),
                hardBreakTrailing: d(p),
                htmlFlow: d(q, e),
                htmlFlowData: j,
                htmlText: d(q, e),
                htmlTextData: j,
                image: d(function () {
                  return { type: 'image', title: null, url: '', alt: null };
                }),
                label: e,
                link: d(r),
                listItem: d(function (a) {
                  return {
                    type: 'listItem',
                    spread: a._spread,
                    checked: null,
                    children: [],
                  };
                }),
                listItemValue: function (a) {
                  this.data.expectingFirstListItemValue &&
                    ((this.stack[this.stack.length - 2].start = Number.parseInt(
                      this.sliceSerialize(a),
                      10
                    )),
                    (this.data.expectingFirstListItemValue = void 0));
                },
                listOrdered: d(s, function () {
                  this.data.expectingFirstListItemValue = !0;
                }),
                listUnordered: d(s),
                paragraph: d(function () {
                  return { type: 'paragraph', children: [] };
                }),
                reference: function () {
                  this.data.referenceType = 'collapsed';
                },
                referenceString: e,
                resourceDestinationString: e,
                resourceTitleString: e,
                setextHeading: d(o),
                strong: d(function () {
                  return { type: 'strong', children: [] };
                }),
                thematicBreak: d(function () {
                  return { type: 'thematicBreak' };
                }),
              },
              exit: {
                atxHeading: g(),
                atxHeadingSequence: function (a) {
                  let b = this.stack[this.stack.length - 1];
                  b.depth || (b.depth = this.sliceSerialize(a).length);
                },
                autolink: g(),
                autolinkEmail: function (a) {
                  (k.call(this, a),
                    (this.stack[this.stack.length - 1].url =
                      'mailto:' + this.sliceSerialize(a)));
                },
                autolinkProtocol: function (a) {
                  (k.call(this, a),
                    (this.stack[this.stack.length - 1].url =
                      this.sliceSerialize(a)));
                },
                blockQuote: g(),
                characterEscapeValue: k,
                characterReferenceMarkerHexadecimal: m,
                characterReferenceMarkerNumeric: m,
                characterReferenceValue: function (a) {
                  let b,
                    c = this.sliceSerialize(a),
                    d = this.data.characterReferenceType;
                  d
                    ? ((b = bC(
                        c,
                        'characterReferenceMarkerNumeric' === d ? 10 : 16
                      )),
                      (this.data.characterReferenceType = void 0))
                    : (b = a8(c));
                  let e = this.stack[this.stack.length - 1];
                  e.value += b;
                },
                characterReference: function (a) {
                  this.stack.pop().position.end = bG(a.end);
                },
                codeFenced: g(function () {
                  let a = this.resume();
                  ((this.stack[this.stack.length - 1].value = a.replace(
                    /^(\r?\n|\r)|(\r?\n|\r)$/g,
                    ''
                  )),
                    (this.data.flowCodeInside = void 0));
                }),
                codeFencedFence: function () {
                  this.data.flowCodeInside ||
                    (this.buffer(), (this.data.flowCodeInside = !0));
                },
                codeFencedFenceInfo: function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].lang = a;
                },
                codeFencedFenceMeta: function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].meta = a;
                },
                codeFlowValue: k,
                codeIndented: g(function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].value = a.replace(
                    /(\r?\n|\r)$/g,
                    ''
                  );
                }),
                codeText: g(function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].value = a;
                }),
                codeTextData: k,
                data: k,
                definition: g(),
                definitionDestinationString: function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].url = a;
                },
                definitionLabelString: function (a) {
                  let b = this.resume(),
                    c = this.stack[this.stack.length - 1];
                  ((c.label = b),
                    (c.identifier = bi(this.sliceSerialize(a)).toLowerCase()));
                },
                definitionTitleString: function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].title = a;
                },
                emphasis: g(),
                hardBreakEscape: g(l),
                hardBreakTrailing: g(l),
                htmlFlow: g(function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].value = a;
                }),
                htmlFlowData: k,
                htmlText: g(function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].value = a;
                }),
                htmlTextData: k,
                image: g(function () {
                  let a = this.stack[this.stack.length - 1];
                  if (this.data.inReference) {
                    let b = this.data.referenceType || 'shortcut';
                    ((a.type += 'Reference'),
                      (a.referenceType = b),
                      delete a.url,
                      delete a.title);
                  } else (delete a.identifier, delete a.label);
                  this.data.referenceType = void 0;
                }),
                label: function () {
                  let a = this.stack[this.stack.length - 1],
                    b = this.resume(),
                    c = this.stack[this.stack.length - 1];
                  ((this.data.inReference = !0),
                    'link' === c.type
                      ? (c.children = a.children)
                      : (c.alt = b));
                },
                labelText: function (a) {
                  let b = this.sliceSerialize(a),
                    c = this.stack[this.stack.length - 2];
                  ((c.label = b.replace(bD, bE)),
                    (c.identifier = bi(b).toLowerCase()));
                },
                lineEnding: function (a) {
                  let c = this.stack[this.stack.length - 1];
                  if (this.data.atHardBreak) {
                    ((c.children[c.children.length - 1].position.end = bG(
                      a.end
                    )),
                      (this.data.atHardBreak = void 0));
                    return;
                  }
                  !this.data.setextHeadingSlurpLineEnding &&
                    b.canContainEols.includes(c.type) &&
                    (j.call(this, a), k.call(this, a));
                },
                link: g(function () {
                  let a = this.stack[this.stack.length - 1];
                  if (this.data.inReference) {
                    let b = this.data.referenceType || 'shortcut';
                    ((a.type += 'Reference'),
                      (a.referenceType = b),
                      delete a.url,
                      delete a.title);
                  } else (delete a.identifier, delete a.label);
                  this.data.referenceType = void 0;
                }),
                listItem: g(),
                listOrdered: g(),
                listUnordered: g(),
                paragraph: g(),
                referenceString: function (a) {
                  let b = this.resume(),
                    c = this.stack[this.stack.length - 1];
                  ((c.label = b),
                    (c.identifier = bi(this.sliceSerialize(a)).toLowerCase()),
                    (this.data.referenceType = 'full'));
                },
                resourceDestinationString: function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].url = a;
                },
                resourceTitleString: function () {
                  let a = this.resume();
                  this.stack[this.stack.length - 1].title = a;
                },
                resource: function () {
                  this.data.inReference = void 0;
                },
                setextHeading: g(function () {
                  this.data.setextHeadingSlurpLineEnding = void 0;
                }),
                setextHeadingLineSequence: function (a) {
                  this.stack[this.stack.length - 1].depth =
                    61 === this.sliceSerialize(a).codePointAt(0) ? 1 : 2;
                },
                setextHeadingText: function () {
                  this.data.setextHeadingSlurpLineEnding = !0;
                },
                strong: g(),
                thematicBreak: g(),
              },
            };
            !(function a(b, c) {
              let d = -1;
              for (; ++d < c.length; ) {
                let e = c[d];
                Array.isArray(e)
                  ? a(b, e)
                  : (function (a, b) {
                      let c;
                      for (c in b)
                        if (bF.call(b, c))
                          switch (c) {
                            case 'canContainEols': {
                              let d = b[c];
                              d && a[c].push(...d);
                              break;
                            }
                            case 'transforms': {
                              let d = b[c];
                              d && a[c].push(...d);
                              break;
                            }
                            case 'enter':
                            case 'exit': {
                              let d = b[c];
                              d && Object.assign(a[c], d);
                            }
                          }
                    })(b, e);
              }
            })(b, (a || {}).mdastExtensions || []);
            let c = {};
            return function (a) {
              let d = { type: 'root', children: [] },
                g = {
                  stack: [d],
                  tokenStack: [],
                  config: b,
                  enter: f,
                  exit: h,
                  buffer: e,
                  resume: i,
                  data: c,
                },
                j = [],
                k = -1;
              for (; ++k < a.length; )
                ('listOrdered' === a[k][1].type ||
                  'listUnordered' === a[k][1].type) &&
                  ('enter' === a[k][0]
                    ? j.push(k)
                    : (k = (function (a, b, c) {
                        let d,
                          e,
                          f,
                          g,
                          h = b - 1,
                          i = -1,
                          j = !1;
                        for (; ++h <= c; ) {
                          let b = a[h];
                          switch (b[1].type) {
                            case 'listUnordered':
                            case 'listOrdered':
                            case 'blockQuote':
                              ('enter' === b[0] ? i++ : i--, (g = void 0));
                              break;
                            case 'lineEndingBlank':
                              'enter' === b[0] &&
                                (!d || g || i || f || (f = h), (g = void 0));
                              break;
                            case 'linePrefix':
                            case 'listItemValue':
                            case 'listItemMarker':
                            case 'listItemPrefix':
                            case 'listItemPrefixWhitespace':
                              break;
                            default:
                              g = void 0;
                          }
                          if (
                            (!i &&
                              'enter' === b[0] &&
                              'listItemPrefix' === b[1].type) ||
                            (-1 === i &&
                              'exit' === b[0] &&
                              ('listUnordered' === b[1].type ||
                                'listOrdered' === b[1].type))
                          ) {
                            if (d) {
                              let g = h;
                              for (e = void 0; g--; ) {
                                let b = a[g];
                                if (
                                  'lineEnding' === b[1].type ||
                                  'lineEndingBlank' === b[1].type
                                ) {
                                  if ('exit' === b[0]) continue;
                                  (e &&
                                    ((a[e][1].type = 'lineEndingBlank'),
                                    (j = !0)),
                                    (b[1].type = 'lineEnding'),
                                    (e = g));
                                } else if (
                                  'linePrefix' === b[1].type ||
                                  'blockQuotePrefix' === b[1].type ||
                                  'blockQuotePrefixWhitespace' === b[1].type ||
                                  'blockQuoteMarker' === b[1].type ||
                                  'listItemIndent' === b[1].type
                                );
                                else break;
                              }
                              (f && (!e || f < e) && (d._spread = !0),
                                (d.end = Object.assign(
                                  {},
                                  e ? a[e][1].start : b[1].end
                                )),
                                a.splice(e || h, 0, ['exit', d, b[2]]),
                                h++,
                                c++);
                            }
                            if ('listItemPrefix' === b[1].type) {
                              let e = {
                                type: 'listItem',
                                _spread: !1,
                                start: Object.assign({}, b[1].start),
                                end: void 0,
                              };
                              ((d = e),
                                a.splice(h, 0, ['enter', e, b[2]]),
                                h++,
                                c++,
                                (f = void 0),
                                (g = !0));
                            }
                          }
                        }
                        return ((a[b][1]._spread = j), c);
                      })(a, j.pop(), k)));
              for (k = -1; ++k < a.length; ) {
                let c = b[a[k][0]];
                bF.call(c, a[k][1].type) &&
                  c[a[k][1].type].call(
                    Object.assign(
                      { sliceSerialize: a[k][2].sliceSerialize },
                      g
                    ),
                    a[k][1]
                  );
              }
              if (g.tokenStack.length > 0) {
                let a = g.tokenStack[g.tokenStack.length - 1];
                (a[1] || bH).call(g, void 0, a[0]);
              }
              for (
                d.position = {
                  start: bG(
                    a.length > 0
                      ? a[0][1].start
                      : { line: 1, column: 1, offset: 0 }
                  ),
                  end: bG(
                    a.length > 0
                      ? a[a.length - 2][1].end
                      : { line: 1, column: 1, offset: 0 }
                  ),
                },
                  k = -1;
                ++k < b.transforms.length;
              )
                d = b.transforms[k](d) || d;
              return d;
            };
            function d(a, b) {
              return function (c) {
                (f.call(this, a(c), c), b && b.call(this, c));
              };
            }
            function e() {
              this.stack.push({ type: 'fragment', children: [] });
            }
            function f(a, b, c) {
              (this.stack[this.stack.length - 1].children.push(a),
                this.stack.push(a),
                this.tokenStack.push([b, c || void 0]),
                (a.position = { start: bG(b.start), end: void 0 }));
            }
            function g(a) {
              return function (b) {
                (a && a.call(this, b), h.call(this, b));
              };
            }
            function h(a, b) {
              let c = this.stack.pop(),
                d = this.tokenStack.pop();
              if (d)
                d[0].type !== a.type &&
                  (b
                    ? b.call(this, a, d[0])
                    : (d[1] || bH).call(this, a, d[0]));
              else
                throw Error(
                  'Cannot close `' +
                    a.type +
                    '` (' +
                    _({ start: a.start, end: a.end }) +
                    '): it’s not open'
                );
              c.position.end = bG(a.end);
            }
            function i() {
              var a;
              return (
                (a = this.stack.pop()),
                at(
                  a,
                  'boolean' != typeof as.includeImageAlt || as.includeImageAlt,
                  'boolean' != typeof as.includeHtml || as.includeHtml
                )
              );
            }
            function j(a) {
              let b = this.stack[this.stack.length - 1].children,
                c = b[b.length - 1];
              ((c && 'text' === c.type) ||
                (((c = { type: 'text', value: '' }).position = {
                  start: bG(a.start),
                  end: void 0,
                }),
                b.push(c)),
                this.stack.push(c));
            }
            function k(a) {
              let b = this.stack.pop();
              ((b.value += this.sliceSerialize(a)),
                (b.position.end = bG(a.end)));
            }
            function l() {
              this.data.atHardBreak = !0;
            }
            function m(a) {
              this.data.characterReferenceType = a.type;
            }
            function n() {
              return { type: 'code', lang: null, meta: null, value: '' };
            }
            function o() {
              return { type: 'heading', depth: 0, children: [] };
            }
            function p() {
              return { type: 'break' };
            }
            function q() {
              return { type: 'html', value: '' };
            }
            function r() {
              return { type: 'link', title: null, url: '', children: [] };
            }
            function s(a) {
              return {
                type: 'list',
                ordered: 'listOrdered' === a.type,
                start: null,
                spread: a._spread,
                children: [],
              };
            }
          })(e)(
            (function (a) {
              for (; !aS(a); );
              return a;
            })(
              (function (a) {
                let b = {
                  constructs: (function (a) {
                    let b = {},
                      c = -1;
                    for (; ++c < a.length; )
                      !(function (a, b) {
                        let c;
                        for (c in b) {
                          let d,
                            e = (ax.call(a, c) ? a[c] : void 0) || (a[c] = {}),
                            f = b[c];
                          if (f)
                            for (d in f) {
                              ax.call(e, d) || (e[d] = []);
                              let a = f[d];
                              !(function (a, b) {
                                let c = -1,
                                  d = [];
                                for (; ++c < b.length; )
                                  ('after' === b[c].add ? a : d).push(b[c]);
                                av(a, 0, 0, d);
                              })(e[d], Array.isArray(a) ? a : a ? [a] : []);
                            }
                        }
                      })(b, a[c]);
                    return b;
                  })([bA, ...((a || {}).extensions || [])]),
                  content: c(aM),
                  defined: [],
                  document: c(aN),
                  flow: c(aV),
                  lazy: {},
                  string: c(aX),
                  text: c(aY),
                };
                return b;
                function c(a) {
                  return function (c) {
                    return (function (a, b, c) {
                      let d = {
                          _bufferIndex: -1,
                          _index: 0,
                          line: (c && c.line) || 1,
                          column: (c && c.column) || 1,
                          offset: (c && c.offset) || 0,
                        },
                        e = {},
                        f = [],
                        g = [],
                        h = [],
                        i = {
                          attempt: o(function (a, b) {
                            p(a, b.from);
                          }),
                          check: o(n),
                          consume: function (a) {
                            (aF(a)
                              ? (d.line++,
                                (d.column = 1),
                                (d.offset += -3 === a ? 2 : 1),
                                q())
                              : -1 !== a && (d.column++, d.offset++),
                              d._bufferIndex < 0
                                ? d._index++
                                : (d._bufferIndex++,
                                  d._bufferIndex === g[d._index].length &&
                                    ((d._bufferIndex = -1), d._index++)),
                              (j.previous = a));
                          },
                          enter: function (a, b) {
                            let c = b || {};
                            return (
                              (c.type = a),
                              (c.start = m()),
                              j.events.push(['enter', c, j]),
                              h.push(c),
                              c
                            );
                          },
                          exit: function (a) {
                            let b = h.pop();
                            return (
                              (b.end = m()),
                              j.events.push(['exit', b, j]),
                              b
                            );
                          },
                          interrupt: o(n, { interrupt: !0 }),
                        },
                        j = {
                          code: null,
                          containerState: {},
                          defineSkip: function (a) {
                            ((e[a.line] = a.column), q());
                          },
                          events: [],
                          now: m,
                          parser: a,
                          previous: null,
                          sliceSerialize: function (a, b) {
                            return (function (a, b) {
                              let c,
                                d = -1,
                                e = [];
                              for (; ++d < a.length; ) {
                                let f,
                                  g = a[d];
                                if ('string' == typeof g) f = g;
                                else
                                  switch (g) {
                                    case -5:
                                      f = '\r';
                                      break;
                                    case -4:
                                      f = '\n';
                                      break;
                                    case -3:
                                      f = '\r\n';
                                      break;
                                    case -2:
                                      f = b ? ' ' : '	';
                                      break;
                                    case -1:
                                      if (!b && c) continue;
                                      f = ' ';
                                      break;
                                    default:
                                      f = String.fromCharCode(g);
                                  }
                                ((c = -2 === g), e.push(f));
                              }
                              return e.join('');
                            })(l(a), b);
                          },
                          sliceStream: l,
                          write: function (a) {
                            return ((g = aw(g, a)),
                            (function () {
                              let a;
                              for (; d._index < g.length; ) {
                                let c = g[d._index];
                                if ('string' == typeof c)
                                  for (
                                    a = d._index,
                                      d._bufferIndex < 0 &&
                                        (d._bufferIndex = 0);
                                    d._index === a && d._bufferIndex < c.length;
                                  ) {
                                    var b;
                                    ((b = c.charCodeAt(d._bufferIndex)),
                                      (k = k(b)));
                                  }
                                else k = k(c);
                              }
                            })(),
                            null !== g[g.length - 1])
                              ? []
                              : (p(b, 0),
                                (j.events = a1(f, j.events, j)),
                                j.events);
                          },
                        },
                        k = b.tokenize.call(j, i);
                      return (b.resolveAll && f.push(b), j);
                      function l(a) {
                        return (function (a, b) {
                          let c,
                            d = b.start._index,
                            e = b.start._bufferIndex,
                            f = b.end._index,
                            g = b.end._bufferIndex;
                          if (d === f) c = [a[d].slice(e, g)];
                          else {
                            if (((c = a.slice(d, f)), e > -1)) {
                              let a = c[0];
                              'string' == typeof a
                                ? (c[0] = a.slice(e))
                                : c.shift();
                            }
                            g > 0 && c.push(a[f].slice(0, g));
                          }
                          return c;
                        })(g, a);
                      }
                      function m() {
                        let {
                          _bufferIndex: a,
                          _index: b,
                          line: c,
                          column: e,
                          offset: f,
                        } = d;
                        return {
                          _bufferIndex: a,
                          _index: b,
                          line: c,
                          column: e,
                          offset: f,
                        };
                      }
                      function n(a, b) {
                        b.restore();
                      }
                      function o(a, b) {
                        return function (c, e, f) {
                          var g;
                          let k, l, n, o;
                          return Array.isArray(c)
                            ? p(c)
                            : 'tokenize' in c
                              ? p([c])
                              : ((g = c),
                                function (a) {
                                  let b = null !== a && g[a],
                                    c = null !== a && g.null;
                                  return p([
                                    ...(Array.isArray(b) ? b : b ? [b] : []),
                                    ...(Array.isArray(c) ? c : c ? [c] : []),
                                  ])(a);
                                });
                          function p(a) {
                            return ((k = a), (l = 0), 0 === a.length)
                              ? f
                              : r(a[l]);
                          }
                          function r(a) {
                            return function (c) {
                              let e, f, g, k, l;
                              return ((e = m()),
                              (f = j.previous),
                              (g = j.currentConstruct),
                              (k = j.events.length),
                              (l = Array.from(h)),
                              (o = {
                                from: k,
                                restore: function () {
                                  ((d = e),
                                    (j.previous = f),
                                    (j.currentConstruct = g),
                                    (j.events.length = k),
                                    (h = l),
                                    q());
                                },
                              }),
                              (n = a),
                              a.partial || (j.currentConstruct = a),
                              a.name &&
                                j.parser.constructs.disable.null.includes(
                                  a.name
                                ))
                                ? t(c)
                                : a.tokenize.call(
                                    b ? Object.assign(Object.create(j), b) : j,
                                    i,
                                    s,
                                    t
                                  )(c);
                            };
                          }
                          function s(b) {
                            return (a(n, o), e);
                          }
                          function t(a) {
                            return (o.restore(), ++l < k.length) ? r(k[l]) : f;
                          }
                        };
                      }
                      function p(a, b) {
                        (a.resolveAll && !f.includes(a) && f.push(a),
                          a.resolve &&
                            av(
                              j.events,
                              b,
                              j.events.length - b,
                              a.resolve(j.events.slice(b), j)
                            ),
                          a.resolveTo && (j.events = a.resolveTo(j.events, j)));
                      }
                      function q() {
                        d.line in e &&
                          d.column < 2 &&
                          ((d.column = e[d.line]), (d.offset += e[d.line] - 1));
                      }
                    })(b, a, c);
                  };
                }
              })(e)
                .document()
                .write(
                  ((g = 1),
                  (h = ''),
                  (i = !0),
                  function (a, b, c) {
                    let d,
                      e,
                      j,
                      k,
                      l,
                      m = [];
                    for (
                      a =
                        h +
                        ('string' == typeof a
                          ? a.toString()
                          : new TextDecoder(b || void 0).decode(a)),
                        j = 0,
                        h = '',
                        i && (65279 === a.charCodeAt(0) && j++, (i = void 0));
                      j < a.length;
                    ) {
                      if (
                        ((bB.lastIndex = j),
                        (k =
                          (d = bB.exec(a)) && void 0 !== d.index
                            ? d.index
                            : a.length),
                        (l = a.charCodeAt(k)),
                        !d)
                      ) {
                        h = a.slice(j);
                        break;
                      }
                      if (10 === l && j === k && f) (m.push(-3), (f = void 0));
                      else
                        switch (
                          (f && (m.push(-5), (f = void 0)),
                          j < k && (m.push(a.slice(j, k)), (g += k - j)),
                          l)
                        ) {
                          case 0:
                            (m.push(65533), g++);
                            break;
                          case 9:
                            for (
                              e = 4 * Math.ceil(g / 4), m.push(-2);
                              g++ < e;
                            )
                              m.push(-1);
                            break;
                          case 10:
                            (m.push(-4), (g = 1));
                            break;
                          default:
                            ((f = !0), (g = 1));
                        }
                      j = k + 1;
                    }
                    return (
                      c && (f && m.push(-5), h && m.push(h), m.push(null)),
                      m
                    );
                  })(c, d, !0)
                )
            )
          )
        );
      };
    }
    let bJ = 'object' == typeof self ? self : globalThis,
      bK = (a) => {
        var b;
        let c, d;
        return ((b = new Map()),
        (c = (a, c) => (b.set(c, a), a)),
        (d = (e) => {
          if (b.has(e)) return b.get(e);
          let [f, g] = a[e];
          switch (f) {
            case 0:
            case -1:
              return c(g, e);
            case 1: {
              let a = c([], e);
              for (let b of g) a.push(d(b));
              return a;
            }
            case 2: {
              let a = c({}, e);
              for (let [b, c] of g) a[d(b)] = d(c);
              return a;
            }
            case 3:
              return c(new Date(g), e);
            case 4: {
              let { source: a, flags: b } = g;
              return c(new RegExp(a, b), e);
            }
            case 5: {
              let a = c(new Map(), e);
              for (let [b, c] of g) a.set(d(b), d(c));
              return a;
            }
            case 6: {
              let a = c(new Set(), e);
              for (let b of g) a.add(d(b));
              return a;
            }
            case 7: {
              let { name: a, message: b } = g;
              return c(new bJ[a](b), e);
            }
            case 8:
              return c(BigInt(g), e);
            case 'BigInt':
              return c(Object(BigInt(g)), e);
            case 'ArrayBuffer':
              return c(new Uint8Array(g).buffer, g);
            case 'DataView': {
              let { buffer: a } = new Uint8Array(g);
              return c(new DataView(a), g);
            }
          }
          return c(new bJ[f](g), e);
        }))(0);
      },
      { toString: bL } = {},
      { keys: bM } = Object,
      bN = (a) => {
        let b = typeof a;
        if ('object' !== b || !a) return [0, b];
        let c = bL.call(a).slice(8, -1);
        switch (c) {
          case 'Array':
            return [1, ''];
          case 'Object':
            return [2, ''];
          case 'Date':
            return [3, ''];
          case 'RegExp':
            return [4, ''];
          case 'Map':
            return [5, ''];
          case 'Set':
            return [6, ''];
          case 'DataView':
            return [1, c];
        }
        return c.includes('Array')
          ? [1, c]
          : c.includes('Error')
            ? [7, c]
            : [2, c];
      },
      bO = ([a, b]) => 0 === a && ('function' === b || 'symbol' === b),
      bP = (a, { json: b, lossy: c } = {}) => {
        var d, e, f;
        let g,
          h,
          i = [];
        return (
          ((d = !(b || c)),
          (e = !!b),
          (f = new Map()),
          (g = (a, b) => {
            let c = i.push(a) - 1;
            return (f.set(b, c), c);
          }),
          (h = (a) => {
            if (f.has(a)) return f.get(a);
            let [b, c] = bN(a);
            switch (b) {
              case 0: {
                let e = a;
                switch (c) {
                  case 'bigint':
                    ((b = 8), (e = a.toString()));
                    break;
                  case 'function':
                  case 'symbol':
                    if (d) throw TypeError('unable to serialize ' + c);
                    e = null;
                    break;
                  case 'undefined':
                    return g([-1], a);
                }
                return g([b, e], a);
              }
              case 1: {
                if (c) {
                  let b = a;
                  return (
                    'DataView' === c
                      ? (b = new Uint8Array(a.buffer))
                      : 'ArrayBuffer' === c && (b = new Uint8Array(a)),
                    g([c, [...b]], a)
                  );
                }
                let d = [],
                  e = g([b, d], a);
                for (let b of a) d.push(h(b));
                return e;
              }
              case 2: {
                if (c)
                  switch (c) {
                    case 'BigInt':
                      return g([c, a.toString()], a);
                    case 'Boolean':
                    case 'Number':
                    case 'String':
                      return g([c, a.valueOf()], a);
                  }
                if (e && 'toJSON' in a) return h(a.toJSON());
                let f = [],
                  i = g([b, f], a);
                for (let b of bM(a))
                  (d || !bO(bN(a[b]))) && f.push([h(b), h(a[b])]);
                return i;
              }
              case 3:
                return g([b, a.toISOString()], a);
              case 4: {
                let { source: c, flags: d } = a;
                return g([b, { source: c, flags: d }], a);
              }
              case 5: {
                let c = [],
                  e = g([b, c], a);
                for (let [b, e] of a)
                  (d || !(bO(bN(b)) || bO(bN(e)))) && c.push([h(b), h(e)]);
                return e;
              }
              case 6: {
                let c = [],
                  e = g([b, c], a);
                for (let b of a) (d || !bO(bN(b))) && c.push(h(b));
                return e;
              }
            }
            let { message: i } = a;
            return g([b, { name: c, message: i }], a);
          }))(a),
          i
        );
      },
      bQ =
        'function' == typeof structuredClone
          ? (a, b) =>
              b && ('json' in b || 'lossy' in b)
                ? bK(bP(a, b))
                : structuredClone(a)
          : (a, b) => bK(bP(a, b));
    function bR(a) {
      let b = [],
        c = -1,
        d = 0,
        e = 0;
      for (; ++c < a.length; ) {
        let f = a.charCodeAt(c),
          g = '';
        if (37 === f && az(a.charCodeAt(c + 1)) && az(a.charCodeAt(c + 2)))
          e = 2;
        else if (f < 128)
          /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(f)) ||
            (g = String.fromCharCode(f));
        else if (f > 55295 && f < 57344) {
          let b = a.charCodeAt(c + 1);
          f < 56320 && b > 56319 && b < 57344
            ? ((g = String.fromCharCode(f, b)), (e = 1))
            : (g = '�');
        } else g = String.fromCharCode(f);
        (g &&
          (b.push(a.slice(d, c), encodeURIComponent(g)),
          (d = c + e + 1),
          (g = '')),
          e && ((c += e), (e = 0)));
      }
      return b.join('') + a.slice(d);
    }
    function bS(a, b) {
      let c = [{ type: 'text', value: '↩' }];
      return (
        b > 1 &&
          c.push({
            type: 'element',
            tagName: 'sup',
            properties: {},
            children: [{ type: 'text', value: String(b) }],
          }),
        c
      );
    }
    function bT(a, b) {
      return 'Back to reference ' + (a + 1) + (b > 1 ? '-' + b : '');
    }
    let bU = function (a) {
      var b, c;
      if (null == a) return bW;
      if ('function' == typeof a) return bV(a);
      if ('object' == typeof a) {
        return Array.isArray(a)
          ? (function (a) {
              let b = [],
                c = -1;
              for (; ++c < a.length; ) b[c] = bU(a[c]);
              return bV(function (...a) {
                let c = -1;
                for (; ++c < b.length; ) if (b[c].apply(this, a)) return !0;
                return !1;
              });
            })(a)
          : ((b = a),
            bV(function (a) {
              let c;
              for (c in b) if (a[c] !== b[c]) return !1;
              return !0;
            }));
      }
      if ('string' == typeof a) {
        return (
          (c = a),
          bV(function (a) {
            return a && a.type === c;
          })
        );
      }
      throw Error('Expected function, string, or object as test');
    };
    function bV(a) {
      return function (b, c, d) {
        return !!(
          (function (a) {
            return null !== a && 'object' == typeof a && 'type' in a;
          })(b) &&
          a.call(this, b, 'number' == typeof c ? c : void 0, d || void 0)
        );
      };
    }
    function bW() {
      return !0;
    }
    let bX = [];
    function bY(a, b, c, d) {
      var e, f, g;
      let h, i, j, k, l, m;
      ('function' == typeof b && 'function' != typeof c
        ? ((i = void 0), (j = b), (h = c))
        : ((i = b), (j = c), (h = d)),
        (e = i),
        (f = function (a, b) {
          let c = b[b.length - 1],
            d = c ? c.children.indexOf(a) : void 0;
          return j(a, d, c);
        }),
        (g = h),
        'function' == typeof e && 'function' != typeof f
          ? ((g = f), (f = e))
          : (k = e),
        (l = bU(k)),
        (m = g ? -1 : 1),
        (function a(b, c, d) {
          let h = b && 'object' == typeof b ? b : {};
          if ('string' == typeof h.type) {
            let a =
              'string' == typeof h.tagName
                ? h.tagName
                : 'string' == typeof h.name
                  ? h.name
                  : void 0;
            Object.defineProperty(i, 'name', {
              value:
                'node (\x1b[33m' +
                b.type +
                (a ? '<' + a + '>' : '') +
                '\x1b[39m)',
            });
          }
          return i;
          function i() {
            var h;
            let i,
              j,
              k,
              n = bX;
            if (
              (!e || l(b, c, d[d.length - 1] || void 0)) &&
              !1 ===
                (n = Array.isArray((h = f(b, d)))
                  ? h
                  : 'number' == typeof h
                    ? [!0, h]
                    : null == h
                      ? bX
                      : [h])[0]
            )
              return n;
            if ('children' in b && b.children && b.children && 'skip' !== n[0])
              for (
                j = (g ? b.children.length : -1) + m, k = d.concat(b);
                j > -1 && j < b.children.length;
              ) {
                if (!1 === (i = a(b.children[j], j, k)())[0]) return i;
                j = 'number' == typeof i[1] ? i[1] : j + m;
              }
            return n;
          }
        })(a, void 0, [])());
    }
    function bZ(a, b) {
      let c = b.referenceType,
        d = ']';
      if (
        ('collapsed' === c
          ? (d += '[]')
          : 'full' === c && (d += '[' + (b.label || b.identifier) + ']'),
        'imageReference' === b.type)
      )
        return [{ type: 'text', value: '![' + b.alt + d }];
      let e = a.all(b),
        f = e[0];
      f && 'text' === f.type
        ? (f.value = '[' + f.value)
        : e.unshift({ type: 'text', value: '[' });
      let g = e[e.length - 1];
      return (
        g && 'text' === g.type
          ? (g.value += d)
          : e.push({ type: 'text', value: d }),
        e
      );
    }
    function b$(a) {
      let b = a.spread;
      return null == b ? a.children.length > 1 : b;
    }
    function b_(a, b, c) {
      let d = 0,
        e = a.length;
      if (b) {
        let b = a.codePointAt(d);
        for (; 9 === b || 32 === b; ) (d++, (b = a.codePointAt(d)));
      }
      if (c) {
        let b = a.codePointAt(e - 1);
        for (; 9 === b || 32 === b; ) (e--, (b = a.codePointAt(e - 1)));
      }
      return e > d ? a.slice(d, e) : '';
    }
    let b0 = {
      blockquote: function (a, b) {
        let c = {
          type: 'element',
          tagName: 'blockquote',
          properties: {},
          children: a.wrap(a.all(b), !0),
        };
        return (a.patch(b, c), a.applyData(b, c));
      },
      break: function (a, b) {
        let c = {
          type: 'element',
          tagName: 'br',
          properties: {},
          children: [],
        };
        return (
          a.patch(b, c),
          [a.applyData(b, c), { type: 'text', value: '\n' }]
        );
      },
      code: function (a, b) {
        let c = b.value ? b.value + '\n' : '',
          d = {},
          e = b.lang ? b.lang.split(/\s+/) : [];
        e.length > 0 && (d.className = ['language-' + e[0]]);
        let f = {
          type: 'element',
          tagName: 'code',
          properties: d,
          children: [{ type: 'text', value: c }],
        };
        return (
          b.meta && (f.data = { meta: b.meta }),
          a.patch(b, f),
          (f = {
            type: 'element',
            tagName: 'pre',
            properties: {},
            children: [(f = a.applyData(b, f))],
          }),
          a.patch(b, f),
          f
        );
      },
      delete: function (a, b) {
        let c = {
          type: 'element',
          tagName: 'del',
          properties: {},
          children: a.all(b),
        };
        return (a.patch(b, c), a.applyData(b, c));
      },
      emphasis: function (a, b) {
        let c = {
          type: 'element',
          tagName: 'em',
          properties: {},
          children: a.all(b),
        };
        return (a.patch(b, c), a.applyData(b, c));
      },
      footnoteReference: function (a, b) {
        let c,
          d =
            'string' == typeof a.options.clobberPrefix
              ? a.options.clobberPrefix
              : 'user-content-',
          e = String(b.identifier).toUpperCase(),
          f = bR(e.toLowerCase()),
          g = a.footnoteOrder.indexOf(e),
          h = a.footnoteCounts.get(e);
        (void 0 === h
          ? ((h = 0), a.footnoteOrder.push(e), (c = a.footnoteOrder.length))
          : (c = g + 1),
          (h += 1),
          a.footnoteCounts.set(e, h));
        let i = {
          type: 'element',
          tagName: 'a',
          properties: {
            href: '#' + d + 'fn-' + f,
            id: d + 'fnref-' + f + (h > 1 ? '-' + h : ''),
            dataFootnoteRef: !0,
            ariaDescribedBy: ['footnote-label'],
          },
          children: [{ type: 'text', value: String(c) }],
        };
        a.patch(b, i);
        let j = {
          type: 'element',
          tagName: 'sup',
          properties: {},
          children: [i],
        };
        return (a.patch(b, j), a.applyData(b, j));
      },
      heading: function (a, b) {
        let c = {
          type: 'element',
          tagName: 'h' + b.depth,
          properties: {},
          children: a.all(b),
        };
        return (a.patch(b, c), a.applyData(b, c));
      },
      html: function (a, b) {
        if (a.options.allowDangerousHtml) {
          let c = { type: 'raw', value: b.value };
          return (a.patch(b, c), a.applyData(b, c));
        }
      },
      imageReference: function (a, b) {
        let c = String(b.identifier).toUpperCase(),
          d = a.definitionById.get(c);
        if (!d) return bZ(a, b);
        let e = { src: bR(d.url || ''), alt: b.alt };
        null !== d.title && void 0 !== d.title && (e.title = d.title);
        let f = {
          type: 'element',
          tagName: 'img',
          properties: e,
          children: [],
        };
        return (a.patch(b, f), a.applyData(b, f));
      },
      image: function (a, b) {
        let c = { src: bR(b.url) };
        (null !== b.alt && void 0 !== b.alt && (c.alt = b.alt),
          null !== b.title && void 0 !== b.title && (c.title = b.title));
        let d = {
          type: 'element',
          tagName: 'img',
          properties: c,
          children: [],
        };
        return (a.patch(b, d), a.applyData(b, d));
      },
      inlineCode: function (a, b) {
        let c = { type: 'text', value: b.value.replace(/\r?\n|\r/g, ' ') };
        a.patch(b, c);
        let d = {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: [c],
        };
        return (a.patch(b, d), a.applyData(b, d));
      },
      linkReference: function (a, b) {
        let c = String(b.identifier).toUpperCase(),
          d = a.definitionById.get(c);
        if (!d) return bZ(a, b);
        let e = { href: bR(d.url || '') };
        null !== d.title && void 0 !== d.title && (e.title = d.title);
        let f = {
          type: 'element',
          tagName: 'a',
          properties: e,
          children: a.all(b),
        };
        return (a.patch(b, f), a.applyData(b, f));
      },
      link: function (a, b) {
        let c = { href: bR(b.url) };
        null !== b.title && void 0 !== b.title && (c.title = b.title);
        let d = {
          type: 'element',
          tagName: 'a',
          properties: c,
          children: a.all(b),
        };
        return (a.patch(b, d), a.applyData(b, d));
      },
      listItem: function (a, b, c) {
        let d = a.all(b),
          e = c
            ? (function (a) {
                let b = !1;
                if ('list' === a.type) {
                  b = a.spread || !1;
                  let c = a.children,
                    d = -1;
                  for (; !b && ++d < c.length; ) b = b$(c[d]);
                }
                return b;
              })(c)
            : b$(b),
          f = {},
          g = [];
        if ('boolean' == typeof b.checked) {
          let a,
            c = d[0];
          (c && 'element' === c.type && 'p' === c.tagName
            ? (a = c)
            : ((a = {
                type: 'element',
                tagName: 'p',
                properties: {},
                children: [],
              }),
              d.unshift(a)),
            a.children.length > 0 &&
              a.children.unshift({ type: 'text', value: ' ' }),
            a.children.unshift({
              type: 'element',
              tagName: 'input',
              properties: {
                type: 'checkbox',
                checked: b.checked,
                disabled: !0,
              },
              children: [],
            }),
            (f.className = ['task-list-item']));
        }
        let h = -1;
        for (; ++h < d.length; ) {
          let a = d[h];
          ((e || 0 !== h || 'element' !== a.type || 'p' !== a.tagName) &&
            g.push({ type: 'text', value: '\n' }),
            'element' !== a.type || 'p' !== a.tagName || e
              ? g.push(a)
              : g.push(...a.children));
        }
        let i = d[d.length - 1];
        i &&
          (e || 'element' !== i.type || 'p' !== i.tagName) &&
          g.push({ type: 'text', value: '\n' });
        let j = { type: 'element', tagName: 'li', properties: f, children: g };
        return (a.patch(b, j), a.applyData(b, j));
      },
      list: function (a, b) {
        let c = {},
          d = a.all(b),
          e = -1;
        for (
          'number' == typeof b.start && 1 !== b.start && (c.start = b.start);
          ++e < d.length;
        ) {
          let a = d[e];
          if (
            'element' === a.type &&
            'li' === a.tagName &&
            a.properties &&
            Array.isArray(a.properties.className) &&
            a.properties.className.includes('task-list-item')
          ) {
            c.className = ['contains-task-list'];
            break;
          }
        }
        let f = {
          type: 'element',
          tagName: b.ordered ? 'ol' : 'ul',
          properties: c,
          children: a.wrap(d, !0),
        };
        return (a.patch(b, f), a.applyData(b, f));
      },
      paragraph: function (a, b) {
        let c = {
          type: 'element',
          tagName: 'p',
          properties: {},
          children: a.all(b),
        };
        return (a.patch(b, c), a.applyData(b, c));
      },
      root: function (a, b) {
        let c = { type: 'root', children: a.wrap(a.all(b)) };
        return (a.patch(b, c), a.applyData(b, c));
      },
      strong: function (a, b) {
        let c = {
          type: 'element',
          tagName: 'strong',
          properties: {},
          children: a.all(b),
        };
        return (a.patch(b, c), a.applyData(b, c));
      },
      table: function (a, b) {
        let c = a.all(b),
          d = c.shift(),
          e = [];
        if (d) {
          let c = {
            type: 'element',
            tagName: 'thead',
            properties: {},
            children: a.wrap([d], !0),
          };
          (a.patch(b.children[0], c), e.push(c));
        }
        if (c.length > 0) {
          let d = {
              type: 'element',
              tagName: 'tbody',
              properties: {},
              children: a.wrap(c, !0),
            },
            f = Z(b.children[1]),
            g = Y(b.children[b.children.length - 1]);
          (f && g && (d.position = { start: f, end: g }), e.push(d));
        }
        let f = {
          type: 'element',
          tagName: 'table',
          properties: {},
          children: a.wrap(e, !0),
        };
        return (a.patch(b, f), a.applyData(b, f));
      },
      tableCell: function (a, b) {
        let c = {
          type: 'element',
          tagName: 'td',
          properties: {},
          children: a.all(b),
        };
        return (a.patch(b, c), a.applyData(b, c));
      },
      tableRow: function (a, b, c) {
        let d = c ? c.children : void 0,
          e = 0 === (d ? d.indexOf(b) : 1) ? 'th' : 'td',
          f = c && 'table' === c.type ? c.align : void 0,
          g = f ? f.length : b.children.length,
          h = -1,
          i = [];
        for (; ++h < g; ) {
          let c = b.children[h],
            d = {},
            g = f ? f[h] : void 0;
          g && (d.align = g);
          let j = { type: 'element', tagName: e, properties: d, children: [] };
          (c &&
            ((j.children = a.all(c)), a.patch(c, j), (j = a.applyData(c, j))),
            i.push(j));
        }
        let j = {
          type: 'element',
          tagName: 'tr',
          properties: {},
          children: a.wrap(i, !0),
        };
        return (a.patch(b, j), a.applyData(b, j));
      },
      text: function (a, b) {
        let c = {
          type: 'text',
          value: (function (a) {
            let b = String(a),
              c = /\r?\n|\r/g,
              d = c.exec(b),
              e = 0,
              f = [];
            for (; d; )
              (f.push(b_(b.slice(e, d.index), e > 0, !0), d[0]),
                (e = d.index + d[0].length),
                (d = c.exec(b)));
            return (f.push(b_(b.slice(e), e > 0, !1)), f.join(''));
          })(String(b.value)),
        };
        return (a.patch(b, c), a.applyData(b, c));
      },
      thematicBreak: function (a, b) {
        let c = {
          type: 'element',
          tagName: 'hr',
          properties: {},
          children: [],
        };
        return (a.patch(b, c), a.applyData(b, c));
      },
      toml: b1,
      yaml: b1,
      definition: b1,
      footnoteDefinition: b1,
    };
    function b1() {}
    let b2 = {}.hasOwnProperty,
      b3 = {};
    function b4(a, b) {
      a.position &&
        (b.position = (function (a) {
          let b = Z(a),
            c = Y(a);
          if (b && c) return { start: b, end: c };
        })(a));
    }
    function b5(a, b) {
      let c = b;
      if (a && a.data) {
        let b = a.data.hName,
          d = a.data.hChildren,
          e = a.data.hProperties;
        ('string' == typeof b &&
          ('element' === c.type
            ? (c.tagName = b)
            : (c = {
                type: 'element',
                tagName: b,
                properties: {},
                children: 'children' in c ? c.children : [c],
              })),
          'element' === c.type && e && Object.assign(c.properties, bQ(e)),
          'children' in c && c.children && null != d && (c.children = d));
      }
      return c;
    }
    function b6(a, b) {
      let c = [],
        d = -1;
      for (b && c.push({ type: 'text', value: '\n' }); ++d < a.length; )
        (d && c.push({ type: 'text', value: '\n' }), c.push(a[d]));
      return (b && a.length > 0 && c.push({ type: 'text', value: '\n' }), c);
    }
    function b7(a) {
      let b = 0,
        c = a.charCodeAt(b);
      for (; 9 === c || 32 === c; ) (b++, (c = a.charCodeAt(b)));
      return a.slice(b);
    }
    function b8(a, b) {
      let c,
        d,
        e,
        f,
        g =
          ((c = b || b3),
          (d = new Map()),
          (e = new Map()),
          (f = {
            all: function (a) {
              let b = [];
              if ('children' in a) {
                let c = a.children,
                  d = -1;
                for (; ++d < c.length; ) {
                  let e = f.one(c[d], a);
                  if (e) {
                    if (
                      d &&
                      'break' === c[d - 1].type &&
                      (Array.isArray(e) ||
                        'text' !== e.type ||
                        (e.value = b7(e.value)),
                      !Array.isArray(e) && 'element' === e.type)
                    ) {
                      let a = e.children[0];
                      a && 'text' === a.type && (a.value = b7(a.value));
                    }
                    Array.isArray(e) ? b.push(...e) : b.push(e);
                  }
                }
              }
              return b;
            },
            applyData: b5,
            definitionById: d,
            footnoteById: e,
            footnoteCounts: new Map(),
            footnoteOrder: [],
            handlers: { ...b0, ...c.handlers },
            one: function (a, b) {
              let c = a.type,
                d = f.handlers[c];
              if (b2.call(f.handlers, c) && d) return d(f, a, b);
              if (f.options.passThrough && f.options.passThrough.includes(c)) {
                if ('children' in a) {
                  let { children: b, ...c } = a,
                    d = bQ(c);
                  return ((d.children = f.all(a)), d);
                }
                return bQ(a);
              }
              return (
                f.options.unknownHandler ||
                function (a, b) {
                  let c = b.data || {},
                    d =
                      'value' in b &&
                      !(b2.call(c, 'hProperties') || b2.call(c, 'hChildren'))
                        ? { type: 'text', value: b.value }
                        : {
                            type: 'element',
                            tagName: 'div',
                            properties: {},
                            children: a.all(b),
                          };
                  return (a.patch(b, d), a.applyData(b, d));
                }
              )(f, a, b);
            },
            options: c,
            patch: b4,
            wrap: b6,
          }),
          bY(a, function (a) {
            if ('definition' === a.type || 'footnoteDefinition' === a.type) {
              let b = 'definition' === a.type ? d : e,
                c = String(a.identifier).toUpperCase();
              b.has(c) || b.set(c, a);
            }
          }),
          f),
        h = g.one(a, void 0),
        j = (function (a) {
          let b =
              'string' == typeof a.options.clobberPrefix
                ? a.options.clobberPrefix
                : 'user-content-',
            c = a.options.footnoteBackContent || bS,
            d = a.options.footnoteBackLabel || bT,
            e = a.options.footnoteLabel || 'Footnotes',
            f = a.options.footnoteLabelTagName || 'h2',
            g = a.options.footnoteLabelProperties || { className: ['sr-only'] },
            h = [],
            i = -1;
          for (; ++i < a.footnoteOrder.length; ) {
            let e = a.footnoteById.get(a.footnoteOrder[i]);
            if (!e) continue;
            let f = a.all(e),
              g = String(e.identifier).toUpperCase(),
              j = bR(g.toLowerCase()),
              k = 0,
              l = [],
              m = a.footnoteCounts.get(g);
            for (; void 0 !== m && ++k <= m; ) {
              l.length > 0 && l.push({ type: 'text', value: ' ' });
              let a = 'string' == typeof c ? c : c(i, k);
              ('string' == typeof a && (a = { type: 'text', value: a }),
                l.push({
                  type: 'element',
                  tagName: 'a',
                  properties: {
                    href: '#' + b + 'fnref-' + j + (k > 1 ? '-' + k : ''),
                    dataFootnoteBackref: '',
                    ariaLabel: 'string' == typeof d ? d : d(i, k),
                    className: ['data-footnote-backref'],
                  },
                  children: Array.isArray(a) ? a : [a],
                }));
            }
            let n = f[f.length - 1];
            if (n && 'element' === n.type && 'p' === n.tagName) {
              let a = n.children[n.children.length - 1];
              (a && 'text' === a.type
                ? (a.value += ' ')
                : n.children.push({ type: 'text', value: ' ' }),
                n.children.push(...l));
            } else f.push(...l);
            let o = {
              type: 'element',
              tagName: 'li',
              properties: { id: b + 'fn-' + j },
              children: a.wrap(f, !0),
            };
            (a.patch(e, o), h.push(o));
          }
          if (0 !== h.length)
            return {
              type: 'element',
              tagName: 'section',
              properties: { dataFootnotes: !0, className: ['footnotes'] },
              children: [
                {
                  type: 'element',
                  tagName: f,
                  properties: { ...bQ(g), id: 'footnote-label' },
                  children: [{ type: 'text', value: e }],
                },
                { type: 'text', value: '\n' },
                {
                  type: 'element',
                  tagName: 'ol',
                  properties: {},
                  children: a.wrap(h, !0),
                },
                { type: 'text', value: '\n' },
              ],
            };
        })(g),
        k = Array.isArray(h)
          ? { type: 'root', children: h }
          : h || { type: 'root', children: [] };
      return (
        j &&
          (i('children' in k),
          k.children.push({ type: 'text', value: '\n' }, j)),
        k
      );
    }
    function b9(a, b) {
      return a && 'run' in a
        ? async function (c, d) {
            let e = b8(c, { file: d, ...b });
            await a.run(e, d);
          }
        : function (c, d) {
            return b8(c, { file: d, ...(a || b) });
          };
    }
    function ca(a) {
      if (a) throw a;
    }
    var cb = a.i(83230);
    function cc(a) {
      if ('object' != typeof a || null === a) return !1;
      let b = Object.getPrototypeOf(a);
      return (
        (null === b ||
          b === Object.prototype ||
          null === Object.getPrototypeOf(b)) &&
        !(Symbol.toStringTag in a) &&
        !(Symbol.iterator in a)
      );
    }
    var cd = a.i(50227),
      cd = cd,
      ce = a.i(59639),
      ce = ce,
      cf = a.i(57764),
      cf = cf;
    function cg(a) {
      return !!(
        null !== a &&
        'object' == typeof a &&
        'href' in a &&
        a.href &&
        'protocol' in a &&
        a.protocol &&
        void 0 === a.auth
      );
    }
    let ch = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];
    class ci {
      constructor(a) {
        let b, c;
        ((b = a
          ? cg(a)
            ? { path: a }
            : 'string' == typeof a ||
                (function (a) {
                  return !!(
                    a &&
                    'object' == typeof a &&
                    'byteLength' in a &&
                    'byteOffset' in a
                  );
                })(a)
              ? { value: a }
              : a
          : {}),
          (this.cwd = 'cwd' in b ? '' : ce.default.cwd()),
          (this.data = {}),
          (this.history = []),
          (this.messages = []),
          this.value,
          this.map,
          this.result,
          this.stored);
        let d = -1;
        for (; ++d < ch.length; ) {
          const a = ch[d];
          a in b &&
            void 0 !== b[a] &&
            null !== b[a] &&
            (this[a] = 'history' === a ? [...b[a]] : b[a]);
        }
        for (c in b) ch.includes(c) || (this[c] = b[c]);
      }
      get basename() {
        return 'string' == typeof this.path
          ? cd.default.basename(this.path)
          : void 0;
      }
      set basename(a) {
        (ck(a, 'basename'),
          cj(a, 'basename'),
          (this.path = cd.default.join(this.dirname || '', a)));
      }
      get dirname() {
        return 'string' == typeof this.path
          ? cd.default.dirname(this.path)
          : void 0;
      }
      set dirname(a) {
        (cl(this.basename, 'dirname'),
          (this.path = cd.default.join(a || '', this.basename)));
      }
      get extname() {
        return 'string' == typeof this.path
          ? cd.default.extname(this.path)
          : void 0;
      }
      set extname(a) {
        if ((cj(a, 'extname'), cl(this.dirname, 'extname'), a)) {
          if (46 !== a.codePointAt(0))
            throw Error('`extname` must start with `.`');
          if (a.includes('.', 1))
            throw Error('`extname` cannot contain multiple dots');
        }
        this.path = cd.default.join(this.dirname, this.stem + (a || ''));
      }
      get path() {
        return this.history[this.history.length - 1];
      }
      set path(a) {
        (cg(a) && (a = (0, cf.fileURLToPath)(a)),
          ck(a, 'path'),
          this.path !== a && this.history.push(a));
      }
      get stem() {
        return 'string' == typeof this.path
          ? cd.default.basename(this.path, this.extname)
          : void 0;
      }
      set stem(a) {
        (ck(a, 'stem'),
          cj(a, 'stem'),
          (this.path = cd.default.join(
            this.dirname || '',
            a + (this.extname || '')
          )));
      }
      fail(a, b, c) {
        let d = this.message(a, b, c);
        throw ((d.fatal = !0), d);
      }
      info(a, b, c) {
        let d = this.message(a, b, c);
        return ((d.fatal = void 0), d);
      }
      message(a, b, c) {
        let d = new ad(a, b, c);
        return (
          this.path &&
            ((d.name = this.path + ':' + d.name), (d.file = this.path)),
          (d.fatal = !1),
          this.messages.push(d),
          d
        );
      }
      toString(a) {
        return void 0 === this.value
          ? ''
          : 'string' == typeof this.value
            ? this.value
            : new TextDecoder(a || void 0).decode(this.value);
      }
    }
    function cj(a, b) {
      if (a && a.includes(cd.default.sep))
        throw Error(
          '`' +
            b +
            '` cannot be a path: did not expect `' +
            cd.default.sep +
            '`'
        );
    }
    function ck(a, b) {
      if (!a) throw Error('`' + b + '` cannot be empty');
    }
    function cl(a, b) {
      if (!a) throw Error('Setting `' + b + '` requires `path` to be set too');
    }
    let cm = function (a) {
        let b = this.constructor.prototype,
          c = b[a],
          d = function () {
            return c.apply(d, arguments);
          };
        return (Object.setPrototypeOf(d, b), d);
      },
      cn = {}.hasOwnProperty;
    class co extends cm {
      constructor() {
        (super('copy'),
          (this.Compiler = void 0),
          (this.Parser = void 0),
          (this.attachers = []),
          (this.compiler = void 0),
          (this.freezeIndex = -1),
          (this.frozen = void 0),
          (this.namespace = {}),
          (this.parser = void 0),
          (this.transformers = (function () {
            let a = [],
              b = {
                run: function (...b) {
                  let c = -1,
                    d = b.pop();
                  if ('function' != typeof d)
                    throw TypeError(
                      'Expected function as last argument, not ' + d
                    );
                  !(function e(f, ...g) {
                    let h = a[++c],
                      i = -1;
                    if (f) return void d(f);
                    for (; ++i < b.length; )
                      (null === g[i] || void 0 === g[i]) && (g[i] = b[i]);
                    ((b = g),
                      h
                        ? (function (a, b) {
                            let c;
                            return function (...b) {
                              let f,
                                g = a.length > b.length;
                              g && b.push(d);
                              try {
                                f = a.apply(this, b);
                              } catch (a) {
                                if (g && c) throw a;
                                return d(a);
                              }
                              g ||
                                (f && f.then && 'function' == typeof f.then
                                  ? f.then(e, d)
                                  : f instanceof Error
                                    ? d(f)
                                    : e(f));
                            };
                            function d(a, ...e) {
                              c || ((c = !0), b(a, ...e));
                            }
                            function e(a) {
                              d(null, a);
                            }
                          })(
                            h,
                            e
                          )(...g)
                        : d(null, ...g));
                  })(null, ...b);
                },
                use: function (c) {
                  if ('function' != typeof c)
                    throw TypeError(
                      'Expected `middelware` to be a function, not ' + c
                    );
                  return (a.push(c), b);
                },
              };
            return b;
          })()));
      }
      copy() {
        let a = new co(),
          b = -1;
        for (; ++b < this.attachers.length; ) {
          let c = this.attachers[b];
          a.use(...c);
        }
        return (a.data((0, cb.default)(!0, {}, this.namespace)), a);
      }
      data(a, b) {
        return 'string' == typeof a
          ? 2 == arguments.length
            ? (cs('data', this.frozen), (this.namespace[a] = b), this)
            : (cn.call(this.namespace, a) && this.namespace[a]) || void 0
          : a
            ? (cs('data', this.frozen), (this.namespace = a), this)
            : this.namespace;
      }
      freeze() {
        if (this.frozen) return this;
        for (; ++this.freezeIndex < this.attachers.length; ) {
          let [a, ...b] = this.attachers[this.freezeIndex];
          if (!1 === b[0]) continue;
          !0 === b[0] && (b[0] = void 0);
          let c = a.call(this, ...b);
          'function' == typeof c && this.transformers.use(c);
        }
        return ((this.frozen = !0), (this.freezeIndex = 1 / 0), this);
      }
      parse(a) {
        this.freeze();
        let b = cv(a),
          c = this.parser || this.Parser;
        return (cq('parse', c), c(String(b), b));
      }
      process(a, b) {
        let c = this;
        return (
          this.freeze(),
          cq('process', this.parser || this.Parser),
          cr('process', this.compiler || this.Compiler),
          b ? d(void 0, b) : new Promise(d)
        );
        function d(d, e) {
          let f = cv(a),
            g = c.parse(f);
          function h(a, c) {
            a || !c
              ? e(a)
              : d
                ? d(c)
                : (i(b, '`done` is defined if `resolve` is not'), b(void 0, c));
          }
          c.run(g, f, function (a, b, d) {
            var e, f;
            if (a || !b || !d) return h(a);
            let g = c.stringify(b, d);
            ('string' == typeof (e = g) ||
            ((f = e) &&
              'object' == typeof f &&
              'byteLength' in f &&
              'byteOffset' in f)
              ? (d.value = g)
              : (d.result = g),
              h(a, d));
          });
        }
      }
      processSync(a) {
        let b,
          c = !1;
        return (
          this.freeze(),
          cq('processSync', this.parser || this.Parser),
          cr('processSync', this.compiler || this.Compiler),
          this.process(a, function (a, d) {
            ((c = !0), ca(a), (b = d));
          }),
          cu('processSync', 'process', c),
          i(b, 'we either bailed on an error or have a tree'),
          b
        );
      }
      run(a, b, c) {
        (ct(a), this.freeze());
        let d = this.transformers;
        return (
          c || 'function' != typeof b || ((c = b), (b = void 0)),
          c ? e(void 0, c) : new Promise(e)
        );
        function e(e, f) {
          i(
            'function' != typeof b,
            '`file` can’t be a `done` anymore, we checked'
          );
          let g = cv(b);
          d.run(a, g, function (b, d, g) {
            let h = d || a;
            b
              ? f(b)
              : e
                ? e(h)
                : (i(c, '`done` is defined if `resolve` is not'),
                  c(void 0, h, g));
          });
        }
      }
      runSync(a, b) {
        let c,
          d = !1;
        return (
          this.run(a, b, function (a, b) {
            (ca(a), (c = b), (d = !0));
          }),
          cu('runSync', 'run', d),
          i(c, 'we either bailed on an error or have a tree'),
          c
        );
      }
      stringify(a, b) {
        this.freeze();
        let c = cv(b),
          d = this.compiler || this.Compiler;
        return (cr('stringify', d), ct(a), d(a, c));
      }
      use(a, ...b) {
        let c = this.attachers,
          d = this.namespace;
        if ((cs('use', this.frozen), null == a));
        else if ('function' == typeof a) g(a, b);
        else if ('object' == typeof a) Array.isArray(a) ? f(a) : e(a);
        else throw TypeError('Expected usable value, not `' + a + '`');
        return this;
        function e(a) {
          if (!('plugins' in a) && !('settings' in a))
            throw Error(
              'Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither'
            );
          (f(a.plugins),
            a.settings &&
              (d.settings = (0, cb.default)(!0, d.settings, a.settings)));
        }
        function f(a) {
          let b = -1;
          if (null == a);
          else if (Array.isArray(a))
            for (; ++b < a.length; )
              !(function (a) {
                if ('function' == typeof a) g(a, []);
                else if ('object' == typeof a)
                  if (Array.isArray(a)) {
                    let [b, ...c] = a;
                    g(b, c);
                  } else e(a);
                else throw TypeError('Expected usable value, not `' + a + '`');
              })(a[b]);
          else throw TypeError('Expected a list of plugins, not `' + a + '`');
        }
        function g(a, b) {
          let d = -1,
            e = -1;
          for (; ++d < c.length; )
            if (c[d][0] === a) {
              e = d;
              break;
            }
          if (-1 === e) c.push([a, ...b]);
          else if (b.length > 0) {
            let [d, ...f] = b,
              g = c[e][1];
            (cc(g) && cc(d) && (d = (0, cb.default)(!0, g, d)),
              (c[e] = [a, d, ...f]));
          }
        }
      }
    }
    let cp = new co().freeze();
    function cq(a, b) {
      if ('function' != typeof b)
        throw TypeError('Cannot `' + a + '` without `parser`');
    }
    function cr(a, b) {
      if ('function' != typeof b)
        throw TypeError('Cannot `' + a + '` without `compiler`');
    }
    function cs(a, b) {
      if (b)
        throw Error(
          'Cannot call `' +
            a +
            '` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.'
        );
    }
    function ct(a) {
      if (!cc(a) || 'string' != typeof a.type)
        throw TypeError('Expected node, got `' + a + '`');
    }
    function cu(a, b, c) {
      if (!c)
        throw Error('`' + a + '` finished async. Use `' + b + '` instead');
    }
    function cv(a) {
      var b;
      return (b = a) &&
        'object' == typeof b &&
        'message' in b &&
        'messages' in b
        ? a
        : new ci(a);
    }
    let cw = [],
      cx = { allowDangerousHtml: !0 },
      cy = /^(https?|ircs?|mailto|xmpp)$/i,
      cz = [
        { from: 'astPlugins', id: 'remove-buggy-html-in-markdown-parser' },
        {
          from: 'allowDangerousHtml',
          id: 'remove-buggy-html-in-markdown-parser',
        },
        {
          from: 'allowNode',
          id: 'replace-allownode-allowedtypes-and-disallowedtypes',
          to: 'allowElement',
        },
        {
          from: 'allowedTypes',
          id: 'replace-allownode-allowedtypes-and-disallowedtypes',
          to: 'allowedElements',
        },
        { from: 'className', id: 'remove-classname' },
        {
          from: 'disallowedTypes',
          id: 'replace-allownode-allowedtypes-and-disallowedtypes',
          to: 'disallowedElements',
        },
        { from: 'escapeHtml', id: 'remove-buggy-html-in-markdown-parser' },
        { from: 'includeElementIndex', id: '#remove-includeelementindex' },
        {
          from: 'includeNodeIndex',
          id: 'change-includenodeindex-to-includeelementindex',
        },
        { from: 'linkTarget', id: 'remove-linktarget' },
        {
          from: 'plugins',
          id: 'change-plugins-to-remarkplugins',
          to: 'remarkPlugins',
        },
        { from: 'rawSourcePos', id: '#remove-rawsourcepos' },
        {
          from: 'renderers',
          id: 'change-renderers-to-components',
          to: 'components',
        },
        { from: 'source', id: 'change-source-to-children', to: 'children' },
        { from: 'sourcePos', id: '#remove-sourcepos' },
        {
          from: 'transformImageUri',
          id: '#add-urltransform',
          to: 'urlTransform',
        },
        {
          from: 'transformLinkUri',
          id: '#add-urltransform',
          to: 'urlTransform',
        },
      ];
    function cA(a) {
      var c;
      let d,
        e,
        f,
        g,
        h,
        i =
          ((d = (c = a).rehypePlugins || cw),
          (e = c.remarkPlugins || cw),
          (f = c.remarkRehypeOptions
            ? { ...c.remarkRehypeOptions, ...cx }
            : cx),
          cp().use(bI).use(e).use(b9, f).use(d)),
        k =
          ((g = a.children || ''),
          (h = new ci()),
          'string' == typeof g
            ? (h.value = g)
            : j(
                'Unexpected value `' +
                  g +
                  '` for `children` prop, expected `string`'
              ),
          h);
      return (function (a, c) {
        let d = c.allowedElements,
          e = c.allowElement,
          f = c.components,
          g = c.disallowedElements,
          h = c.skipHtml,
          i = c.unwrapDisallowed,
          k = c.urlTransform || cB;
        for (let a of cz)
          Object.hasOwn(c, a.from) &&
            j(
              'Unexpected `' +
                a.from +
                '` prop, ' +
                (a.to ? 'use `' + a.to + '` instead' : 'remove it') +
                ' (see <https://github.com/remarkjs/react-markdown/blob/main/changelog.md#' +
                a.id +
                '> for more info)'
            );
        return (
          d &&
            g &&
            j(
              'Unexpected combined `allowedElements` and `disallowedElements`, expected one or the other'
            ),
          bY(a, function (a, b, c) {
            if ('raw' === a.type && c && 'number' == typeof b)
              return (
                h
                  ? c.children.splice(b, 1)
                  : (c.children[b] = { type: 'text', value: a.value }),
                b
              );
            if ('element' === a.type) {
              let b;
              for (b in ar)
                if (Object.hasOwn(ar, b) && Object.hasOwn(a.properties, b)) {
                  let c = a.properties[b],
                    d = ar[b];
                  (null === d || d.includes(a.tagName)) &&
                    (a.properties[b] = k(String(c || ''), b, a));
                }
            }
            if ('element' === a.type) {
              let f = d ? !d.includes(a.tagName) : !!g && g.includes(a.tagName);
              if (
                (!f && e && 'number' == typeof b && (f = !e(a, b, c)),
                f && c && 'number' == typeof b)
              )
                return (
                  i && a.children
                    ? c.children.splice(b, 1, ...a.children)
                    : c.children.splice(b, 1),
                  b
                );
            }
          }),
          (function (a, b) {
            var c, d, e, f;
            let g;
            if (!b || void 0 === b.Fragment)
              throw TypeError('Expected `Fragment` in options');
            let h = b.filePath || void 0;
            if (b.development) {
              if ('function' != typeof b.jsxDEV)
                throw TypeError(
                  'Expected `jsxDEV` in options when `development: true`'
                );
              ((c = h),
                (d = b.jsxDEV),
                (g = function (a, b, e, f) {
                  let g = Array.isArray(e.children),
                    h = Z(a);
                  return d(
                    b,
                    e,
                    f,
                    g,
                    {
                      columnNumber: h ? h.column - 1 : void 0,
                      fileName: c,
                      lineNumber: h ? h.line : void 0,
                    },
                    void 0
                  );
                }));
            } else {
              if ('function' != typeof b.jsx)
                throw TypeError('Expected `jsx` in production options');
              if ('function' != typeof b.jsxs)
                throw TypeError('Expected `jsxs` in production options');
              ((e = b.jsx),
                (f = b.jsxs),
                (g = function (a, b, c, d) {
                  let g = Array.isArray(c.children) ? f : e;
                  return d ? g(b, c, d) : g(b, c);
                }));
            }
            let i = {
                Fragment: b.Fragment,
                ancestors: [],
                components: b.components || {},
                create: g,
                elementAttributeNameCase: b.elementAttributeNameCase || 'react',
                evaluater: b.createEvaluater ? b.createEvaluater() : void 0,
                filePath: h,
                ignoreInvalidStyle: b.ignoreInvalidStyle || !1,
                passKeys: !1 !== b.passKeys,
                passNode: b.passNode || !1,
                schema: 'svg' === b.space ? W : V,
                stylePropertyNameCase: b.stylePropertyNameCase || 'dom',
                tableCellAlignToStyle: !1 !== b.tableCellAlignToStyle,
              },
              j = ak(i, a, void 0);
            return j && 'string' != typeof j
              ? j
              : i.create(a, i.Fragment, { children: j || void 0 }, void 0);
          })(a, {
            Fragment: b.Fragment,
            components: f,
            ignoreInvalidStyle: !0,
            jsx: b.jsx,
            jsxs: b.jsxs,
            passKeys: !0,
            passNode: !0,
          })
        );
      })(i.runSync(i.parse(k), k), a);
    }
    function cB(a) {
      let b = a.indexOf(':'),
        c = a.indexOf('?'),
        d = a.indexOf('#'),
        e = a.indexOf('/');
      return -1 === b ||
        (-1 !== e && b > e) ||
        (-1 !== c && b > c) ||
        (-1 !== d && b > d) ||
        cy.test(a.slice(0, b))
        ? a
        : '';
    }
    let cC = {
      hidden: { opacity: 0, y: 40 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
      },
    };
    function cD({ block: a, index: e }) {
      let { type: f, content: g } = a,
        i = (a) =>
          a
            ? a.startsWith('http')
              ? a
              : `https://umkmwbkwvulxtdodzmzf.supabase.co/storage/v1/object/public/site-assets/${a}`
            : '',
        j = (a, c, d = '') => {
          if (!a) return null;
          let e = a
              .replace(/\sstyle\s*=\s*(?:"[^"]*"|'[^']*')/gi, '')
              .replace(/\sclass(Name)?\s*=\s*(?:"[^"]*"|'[^']*')/gi, ''),
            f = [
              c?.fontSize || 'text-lg md:text-xl',
              c?.fontWeight || 'font-light',
              c?.textAlign || '',
              c?.color && !c.color.startsWith('#') ? c.color : '',
              'mb-4 leading-relaxed',
            ].join(' '),
            g = c?.color && c.color.startsWith('#') ? c.color : null,
            i = g ? `md-text-${g.replace(/[^a-zA-Z0-9]/g, '')}` : '';
          return (0, b.jsxs)(b.Fragment, {
            children: [
              g &&
                (0, b.jsx)(h.default, {
                  id: '5dabeed32825af40',
                  dynamic: [i, g, i, g],
                  children: `.${i}{color:${g}}.${i} a{color:${g}}`,
                }),
              (0, b.jsx)('div', {
                className: `prose prose-invert max-w-none ${d} ${i}`,
                children: (0, b.jsx)(cA, {
                  skipHtml: !0,
                  components: {
                    p: ({ children: a }) =>
                      (0, b.jsx)('p', { className: f, children: a }),
                    h1: ({ children: a }) =>
                      (0, b.jsx)('h1', {
                        className: `${c?.textAlign || ''} font-bold text-4xl md:text-6xl mb-8`,
                        children: a,
                      }),
                    h2: ({ children: a }) =>
                      (0, b.jsx)('h2', {
                        className: `${c?.textAlign || ''} font-bold text-3xl md:text-5xl mb-6`,
                        children: a,
                      }),
                    h3: ({ children: a }) =>
                      (0, b.jsx)('h3', {
                        className: `${c?.textAlign || ''} font-bold text-2xl md:text-4xl mb-4`,
                        children: a,
                      }),
                    ul: ({ children: a }) =>
                      (0, b.jsx)('ul', {
                        className: `${f} list-disc pl-6 mb-4 space-y-2 text-left`,
                        children: a,
                      }),
                    ol: ({ children: a }) =>
                      (0, b.jsx)('ol', {
                        className: `${f} list-decimal pl-6 mb-4 space-y-2 text-left`,
                        children: a,
                      }),
                    strong: ({ children: a }) =>
                      (0, b.jsx)('strong', {
                        className: 'font-bold text-white',
                        children: a,
                      }),
                    em: ({ children: a }) =>
                      (0, b.jsx)('em', { className: 'italic', children: a }),
                  },
                  children: e,
                }),
              }),
            ],
          });
        },
        k = (a, c, e = !0) => {
          let f;
          if (!a) return null;
          let g =
              (f = a.match(
                /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
              )) && 11 === f[2].length
                ? f[2]
                : null,
            h = g
              ? 'youtube'
              : c || (a.match(/\.(mp4|webm|ogg)$/i) ? 'video' : 'image');
          if ('youtube' === h && g)
            return (0, b.jsx)('div', {
              className:
                'w-full relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5 aspect-video',
              children: (0, b.jsx)('iframe', {
                src: `https://www.youtube.com/embed/${g}?autoplay=1&mute=0&loop=1&playlist=${g}&controls=1&modestbranding=1&rel=0`,
                title: 'YouTube video player',
                className: 'absolute inset-0 w-full h-full',
                allow:
                  'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
                allowFullScreen: !0,
              }),
            });
          if ('video' === h) {
            let c = i(a);
            return (0, b.jsx)('div', {
              className:
                'w-full relative rounded-2xl overflow-hidden bg-slate-900/50 border border-white/5',
              children: (0, b.jsx)('video', {
                src: c,
                className: 'w-full h-auto',
                autoPlay: e,
                muted: !1,
                loop: e,
                controls: !0,
                playsInline: !0,
              }),
            });
          }
          let j = i(a);
          return (0, b.jsx)('div', {
            className:
              'w-full relative rounded-2xl overflow-hidden bg-slate-900/50',
            children: (0, b.jsx)(d.default, {
              src: j,
              alt: 'Project Media',
              width: 0,
              height: 0,
              sizes: '(max-width: 768px) 100vw, 80vw',
              className: 'w-full h-auto object-contain',
            }),
          });
        };
      return (0, b.jsx)(c.motion.section, {
        className: 'w-full',
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: !0, margin: '-10%' },
        variants: cC,
        children: (() => {
          switch (f) {
            case 'text':
              return (0, b.jsx)('div', {
                className: 'std-grid',
                children: (0, b.jsx)('div', {
                  className: 'max-w-4xl mx-auto text-center',
                  children: j(g.text, g.textConfig),
                }),
              });
            case 'image':
              return (0, b.jsx)('div', {
                className: 'w-full max-w-screen-2xl mx-auto px-4 md:px-0',
                children: k(g.media, 'image'),
              });
            case 'video':
              return (0, b.jsx)('div', {
                className: 'w-full max-w-screen-2xl mx-auto px-4 md:px-0',
                children: k(g.media, 'video', !1),
              });
            case 'video-autoplay':
              return (0, b.jsx)('div', {
                className: 'w-full max-w-screen-2xl mx-auto px-4 md:px-0',
                children: k(g.media, 'video', !0),
              });
            case 'image-text':
              return (0, b.jsx)('div', {
                className: 'std-grid',
                children: (0, b.jsxs)('div', {
                  className:
                    'grid grid-cols-1 md:grid-cols-2 gap-12 items-center',
                  children: [
                    (0, b.jsx)('div', { children: k(g.media, 'image') }),
                    (0, b.jsx)('div', { children: j(g.text, g.textConfig) }),
                  ],
                }),
              });
            case 'text-image':
              return (0, b.jsx)('div', {
                className: 'std-grid',
                children: (0, b.jsxs)('div', {
                  className:
                    'grid grid-cols-1 md:grid-cols-2 gap-12 items-center',
                  children: [
                    (0, b.jsx)('div', {
                      className: 'order-2 md:order-1',
                      children: j(g.text, g.textConfig),
                    }),
                    (0, b.jsx)('div', {
                      className: 'order-1 md:order-2',
                      children: k(g.media, 'image'),
                    }),
                  ],
                }),
              });
            case 'image-image':
              return (0, b.jsx)('div', {
                className: 'std-grid',
                children: (0, b.jsxs)('div', {
                  className: 'grid grid-cols-1 md:grid-cols-2 gap-6',
                  children: [k(g.media, 'image'), k(g.media2, 'image')],
                }),
              });
            case 'image-video':
              return (0, b.jsx)('div', {
                className: 'std-grid',
                children: (0, b.jsxs)('div', {
                  className:
                    'grid grid-cols-1 md:grid-cols-2 gap-6 items-center',
                  children: [k(g.media, 'image'), k(g.media2, 'video', !0)],
                }),
              });
            case 'video-text':
              return (0, b.jsx)('div', {
                className: 'std-grid',
                children: (0, b.jsxs)('div', {
                  className:
                    'grid grid-cols-1 md:grid-cols-2 gap-12 items-center',
                  children: [k(g.media, 'video', !0), j(g.text, g.textConfig)],
                }),
              });
            default:
              return null;
          }
        })(),
      });
    }
    function cE({ project: a }) {
      let h =
          'https://umkmwbkwvulxtdodzmzf.supabase.co'.replace(/\/$/, '') ?? '',
        i =
          a.cover && !a.cover.startsWith('http')
            ? h
              ? `${h}/storage/v1/object/public/site-assets/${a.cover}`
              : ''
            : a.cover || '',
        j = (0, f.useSearchParams)().get('from');
      return (0, b.jsxs)('div', {
        className:
          'bg-[#040013] text-white selection:bg-blue-600 selection:text-white',
        children: [
          (0, b.jsxs)('section', {
            className:
              'relative h-[90vh] w-full flex flex-col items-center justify-center overflow-hidden',
            children: [
              i &&
                (0, b.jsxs)(c.motion.div, {
                  initial: { scale: 1.1, opacity: 0 },
                  animate: { scale: 1, opacity: 1 },
                  transition: { duration: 2, ease: [0.22, 1, 0.36, 1] },
                  className: 'absolute inset-0 z-0',
                  children: [
                    (0, b.jsx)(d.default, {
                      src: i,
                      alt: a.title,
                      fill: !0,
                      className: 'object-cover opacity-60',
                      priority: !0,
                    }),
                    (0, b.jsx)('div', {
                      className:
                        'absolute inset-0 bg-linear-to-b from-transparent via-[#040013]/50 to-[#040013]',
                    }),
                  ],
                }),
              (0, b.jsx)('div', {
                className:
                  'absolute top-0 left-0 z-50 p-6 md:p-10 w-full flex justify-between items-start pointer-events-none',
                children: (0, b.jsxs)(e.default, {
                  href: 'portfolio' === j ? '/portfolio' : '/',
                  className:
                    'pointer-events-auto group flex items-center gap-3 text-white/50 hover:text-white transition-colors duration-300',
                  children: [
                    (0, b.jsx)('div', {
                      className:
                        'w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-black/20 backdrop-blur-md group-hover:bg-white/10 transition-all',
                      children: (0, b.jsx)(g.ArrowLeft, {
                        className:
                          'w-4 h-4 group-hover:-translate-x-0.5 transition-transform',
                      }),
                    }),
                    (0, b.jsx)('span', {
                      className:
                        'text-sm font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300',
                      children:
                        'portfolio' === j
                          ? 'Voltar ao Portfólio'
                          : 'Voltar para Home',
                    }),
                  ],
                }),
              }),
              (0, b.jsxs)('div', {
                className: 'std-grid relative z-10 text-center',
                children: [
                  (0, b.jsx)(c.motion.h1, {
                    initial: { opacity: 0, y: 40 },
                    animate: { opacity: 1, y: 0 },
                    transition: {
                      duration: 1.2,
                      delay: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    },
                    className:
                      'text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter',
                    children: a.title,
                  }),
                  (0, b.jsx)(c.motion.div, {
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                    transition: { duration: 1, delay: 1.5 },
                    className: 'mt-12 flex justify-center',
                    children: (0, b.jsx)('div', {
                      className:
                        'w-px h-24 bg-linear-to-b from-blue-600 to-transparent',
                    }),
                  }),
                ],
              }),
            ],
          }),
          (0, b.jsx)('div', {
            className: 'space-y-32 md:space-y-64 pb-32',
            children:
              a.content && Array.isArray(a.content)
                ? a.content.map((a, c) =>
                    (0, b.jsx)(cD, { block: a, index: c }, a.id ?? `block-${c}`)
                  )
                : (0, b.jsx)('div', {
                    className: 'text-center text-slate-500 py-20',
                    children: 'Sem conteúdo disponível.',
                  }),
          }),
          (0, b.jsx)('section', {
            className: 'py-32 border-t border-white/5',
            children: (0, b.jsxs)('div', {
              className: 'std-grid text-center space-y-8',
              children: [
                (0, b.jsx)('p', {
                  className:
                    'text-sm uppercase tracking-[0.3em] text-blue-400 font-bold',
                  children: 'Obrigado por assistir',
                }),
                (0, b.jsx)('h2', {
                  className: 'text-4xl md:text-6xl font-bold',
                  children: 'Quer criar algo incrível?',
                }),
                (0, b.jsx)('div', {
                  className: 'flex justify-center pt-8',
                  children: (0, b.jsx)(e.default, {
                    href: '/#contact',
                    className:
                      'inline-block px-12 py-5 bg-blue-600 rounded-full text-lg font-bold hover:bg-white hover:text-blue-600 transition-all duration-500',
                    children: 'Vamos Conversar',
                  }),
                }),
              ],
            }),
          }),
        ],
      });
    }
    a.s(['default', () => cE], 74743);
  },
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d2b74812._.js.map
