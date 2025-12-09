(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
  typeof document === 'object' ? document.currentScript : undefined,
  '[project]/components/three/TorusDan.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export D as useFrame>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/@react-three/fiber/dist/events-1eccaf1c.esm.js [app-client] (ecmascript) <export C as useThree>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshTransmissionMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/@react-three/drei/core/MeshTransmissionMaterial.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/@react-three/drei/core/Float.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/three/build/three.core.js [app-client] (ecmascript)'
      );
    var _s = __turbopack_context__.k.signature();
    ('use client');
    const TorusDan = () => {
      _s();
      const { viewport } = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__[
        'useThree'
      ])();
      const meshRef = (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'useRef'
      ])(null);
      (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__[
        'useFrame'
      ])(
        {
          'TorusDan.useFrame': (state, delta) => {
            if (meshRef.current) {
              // Continuous slow rotation
              meshRef.current.rotation.z += delta * 0.05;
              // Mouse interaction (Parallax/Tilt)
              const { x, y } = state.pointer;
              meshRef.current.rotation.x =
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'MathUtils'
                ].lerp(
                  meshRef.current.rotation.x,
                  y * 0.2,
                  0.05 // Smoothness
                );
              meshRef.current.rotation.y =
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'MathUtils'
                ].lerp(
                  meshRef.current.rotation.y,
                  x * 0.2,
                  0.05 // Smoothness
                );
            }
          },
        }['TorusDan.useFrame']
      );
      // Responsive scale for procedural torus
      const responsiveScale = viewport.width < 5 ? 2.5 : 3.0;
      return (
        // @ts-ignore
        /*#__PURE__*/ (0,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
          'jsxDEV'
        ])(
          'group',
          {
            scale: responsiveScale,
            children: /*#__PURE__*/ (0,
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
              'jsxDEV'
            ])(
              __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Float$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                'Float'
              ],
              {
                speed: 1.5,
                rotationIntensity: 0.2,
                floatIntensity: 0.5,
                floatingRange: [-0.1, 0.1],
                children: /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'mesh',
                  {
                    ref: meshRef,
                    position: [0, 0, 0],
                    rotation: [0, 0, 0],
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        'torusGeometry',
                        {
                          args: [1, 0.4, 64, 128],
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/components/three/TorusDan.tsx',
                          lineNumber: 50,
                          columnNumber: 11,
                        },
                        ('TURBOPACK compile-time value', void 0)
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$MeshTransmissionMaterial$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'MeshTransmissionMaterial'
                        ],
                        {
                          backside: true,
                          samples: 6,
                          resolution: 512,
                          transmission: 0.98,
                          roughness: 0.0,
                          clearcoat: 1,
                          clearcoatRoughness: 0,
                          thickness: 2.5,
                          ior: 1.4,
                          chromaticAberration: 0.04,
                          anisotropy: 0,
                          distortion: 0.6,
                          distortionScale: 0.4,
                          temporalDistortion: 0.1,
                          attenuationDistance: 0.5,
                          attenuationColor: '#ffffff',
                          color: '#ffffff',
                          background:
                            new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$three$2f$build$2f$three$2e$core$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                              'Color'
                            ]('#F4F5F7'),
                        },
                        void 0,
                        false,
                        {
                          fileName: '[project]/components/three/TorusDan.tsx',
                          lineNumber: 52,
                          columnNumber: 11,
                        },
                        ('TURBOPACK compile-time value', void 0)
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/components/three/TorusDan.tsx',
                    lineNumber: 47,
                    columnNumber: 9,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
              },
              void 0,
              false,
              {
                fileName: '[project]/components/three/TorusDan.tsx',
                lineNumber: 40,
                columnNumber: 7,
              },
              ('TURBOPACK compile-time value', void 0)
            ),
          },
          void 0,
          false,
          {
            fileName: '[project]/components/three/TorusDan.tsx',
            lineNumber: 39,
            columnNumber: 5,
          },
          ('TURBOPACK compile-time value', void 0)
        )
      );
    };
    _s(TorusDan, 'eY7TroDgutGahnaqwB+XsewSKd4=', false, function () {
      return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__C__as__useThree$3e$__[
          'useThree'
        ],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$events$2d$1eccaf1c$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__D__as__useFrame$3e$__[
          'useFrame'
        ],
      ];
    });
    _c = TorusDan;
    const __TURBOPACK__default__export__ = TorusDan;
    var _c;
    __turbopack_context__.k.register(_c, 'TorusDan');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/components/three/HeroGlassCanvas.tsx [app-client] (ecmascript)',
  (__turbopack_context__) => {
    'use strict';

    __turbopack_context__.s(['default', () => __TURBOPACK__default__export__]);
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ =
      __turbopack_context__.i(
        '[project]/node_modules/@react-three/fiber/dist/react-three-fiber.esm.js [app-client] (ecmascript) <locals>'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/@react-three/drei/core/Environment.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerspectiveCamera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/@react-three/drei/core/PerspectiveCamera.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/node_modules/@react-three/drei/core/Lightformer.js [app-client] (ecmascript)'
      );
    var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$three$2f$TorusDan$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ =
      __turbopack_context__.i(
        '[project]/components/three/TorusDan.tsx [app-client] (ecmascript)'
      );
    ('use client');
    const HeroGlassCanvas = ({ className }) => {
      return /*#__PURE__*/ (0,
      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
        'jsxDEV'
      ])(
        'div',
        {
          className: `w-full h-full ${className}`,
          children: /*#__PURE__*/ (0,
          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
            'jsxDEV'
          ])(
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$fiber$2f$dist$2f$react$2d$three$2d$fiber$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__[
              'Canvas'
            ],
            {
              dpr: [1, 2],
              gl: {
                alpha: true,
                antialias: true,
                toneMappingExposure: 1.2,
              },
              children: [
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$PerspectiveCamera$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'PerspectiveCamera'
                  ],
                  {
                    makeDefault: true,
                    position: [0, 0, 12],
                    fov: 30,
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/components/three/HeroGlassCanvas.tsx',
                    lineNumber: 15,
                    columnNumber: 9,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'ambientLight',
                  {
                    intensity: 0.5,
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/components/three/HeroGlassCanvas.tsx',
                    lineNumber: 19,
                    columnNumber: 9,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'spotLight',
                  {
                    position: [10, 10, 10],
                    angle: 0.15,
                    penumbra: 1,
                    intensity: 1,
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/components/three/HeroGlassCanvas.tsx',
                    lineNumber: 21,
                    columnNumber: 9,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  'pointLight',
                  {
                    position: [-10, -10, -10],
                    intensity: 1,
                    color: '#0057FF',
                  },
                  void 0,
                  false,
                  {
                    fileName: '[project]/components/three/HeroGlassCanvas.tsx',
                    lineNumber: 28,
                    columnNumber: 9,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
                /*#__PURE__*/ (0,
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                  'jsxDEV'
                ])(
                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                    'Suspense'
                  ],
                  {
                    fallback: null,
                    children: [
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$three$2f$TorusDan$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'default'
                        ],
                        {},
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/components/three/HeroGlassCanvas.tsx',
                          lineNumber: 31,
                          columnNumber: 11,
                        },
                        ('TURBOPACK compile-time value', void 0)
                      ),
                      /*#__PURE__*/ (0,
                      __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                        'jsxDEV'
                      ])(
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Environment$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                          'Environment'
                        ],
                        {
                          preset: 'city',
                          children: /*#__PURE__*/ (0,
                          __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                            'jsxDEV'
                          ])(
                            'group',
                            {
                              rotation: [-Math.PI / 2, 0, 0],
                              children: [
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'Lightformer'
                                  ],
                                  {
                                    intensity: 4,
                                    'rotation-x': Math.PI / 2,
                                    position: [0, 5, -9],
                                    scale: [10, 10, 1],
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/three/HeroGlassCanvas.tsx',
                                    lineNumber: 38,
                                    columnNumber: 15,
                                  },
                                  ('TURBOPACK compile-time value', void 0)
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'Lightformer'
                                  ],
                                  {
                                    intensity: 2,
                                    'rotation-y': Math.PI / 2,
                                    position: [-5, 1, -1],
                                    scale: [20, 0.1, 1],
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/three/HeroGlassCanvas.tsx',
                                    lineNumber: 44,
                                    columnNumber: 15,
                                  },
                                  ('TURBOPACK compile-time value', void 0)
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'Lightformer'
                                  ],
                                  {
                                    intensity: 2,
                                    'rotation-y': Math.PI / 2,
                                    position: [-5, -1, -1],
                                    scale: [20, 0.5, 1],
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/three/HeroGlassCanvas.tsx',
                                    lineNumber: 50,
                                    columnNumber: 15,
                                  },
                                  ('TURBOPACK compile-time value', void 0)
                                ),
                                /*#__PURE__*/ (0,
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                  'jsxDEV'
                                ])(
                                  __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$react$2d$three$2f$drei$2f$core$2f$Lightformer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__[
                                    'Lightformer'
                                  ],
                                  {
                                    intensity: 2,
                                    'rotation-y': -Math.PI / 2,
                                    position: [10, 1, 0],
                                    scale: [20, 1, 1],
                                  },
                                  void 0,
                                  false,
                                  {
                                    fileName:
                                      '[project]/components/three/HeroGlassCanvas.tsx',
                                    lineNumber: 56,
                                    columnNumber: 15,
                                  },
                                  ('TURBOPACK compile-time value', void 0)
                                ),
                              ],
                            },
                            void 0,
                            true,
                            {
                              fileName:
                                '[project]/components/three/HeroGlassCanvas.tsx',
                              lineNumber: 37,
                              columnNumber: 13,
                            },
                            ('TURBOPACK compile-time value', void 0)
                          ),
                        },
                        void 0,
                        false,
                        {
                          fileName:
                            '[project]/components/three/HeroGlassCanvas.tsx',
                          lineNumber: 34,
                          columnNumber: 11,
                        },
                        ('TURBOPACK compile-time value', void 0)
                      ),
                    ],
                  },
                  void 0,
                  true,
                  {
                    fileName: '[project]/components/three/HeroGlassCanvas.tsx',
                    lineNumber: 30,
                    columnNumber: 9,
                  },
                  ('TURBOPACK compile-time value', void 0)
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: '[project]/components/three/HeroGlassCanvas.tsx',
              lineNumber: 11,
              columnNumber: 7,
            },
            ('TURBOPACK compile-time value', void 0)
          ),
        },
        void 0,
        false,
        {
          fileName: '[project]/components/three/HeroGlassCanvas.tsx',
          lineNumber: 10,
          columnNumber: 5,
        },
        ('TURBOPACK compile-time value', void 0)
      );
    };
    _c = HeroGlassCanvas;
    const __TURBOPACK__default__export__ = HeroGlassCanvas;
    var _c;
    __turbopack_context__.k.register(_c, 'HeroGlassCanvas');
    if (
      typeof globalThis.$RefreshHelpers$ === 'object' &&
      globalThis.$RefreshHelpers !== null
    ) {
      __turbopack_context__.k.registerExports(
        __turbopack_context__.m,
        globalThis.$RefreshHelpers$
      );
    }
  },
  '[project]/components/three/HeroGlassCanvas.tsx [app-client] (ecmascript, next/dynamic entry)',
  (__turbopack_context__) => {
    __turbopack_context__.n(
      __turbopack_context__.i(
        '[project]/components/three/HeroGlassCanvas.tsx [app-client] (ecmascript)'
      )
    );
  },
]);

//# sourceMappingURL=components_three_d9033eef._.js.map
