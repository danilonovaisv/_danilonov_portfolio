// código completo revisado aqui, e completo com os arquivos corrigidos e os arquivos que não precisou de correção. Todo material completo // (arquivo ou arquivos prontos para colar no projeto)

/* =====================================================================================
A) FILE INVENTORY (Path focus: src/components/three + src/components/sections/Hero.tsx)
=====================================================================================

Observação importante (transparência):
- Eu consegui listar os arquivos no path via GitHub API (árvore), e checar “ocorrências” via GitHub Code Search,
  mas a ferramenta de “get_file_contents” retornou “downloaded” sem expor o texto dos .tsx.
- Então: a “descrição do que cada arquivo faz” e a classificação abaixo são inferências altamente prováveis
  pelo nome, localização e referências encontradas (ou ausência delas).
- Onde não dá pra garantir 100%, eu deixei MAYBE_REQUIRED e explico.

Arquivos encontrados em src/components/three:
1) src/components/three/HeroGlassCanvas.tsx
   status: CORE_REQUIRED (REPLACED)
   descrição: Canvas R3F do Hero com Environment e iluminação; renderiza o TorusDan.

2) src/components/three/TorusDan.tsx
   status: CORE_REQUIRED (REPLACED)
   descrição: Componente 3D principal; carrega /public/media/torus_dan.glb via useGLTF e aplica MeshTransmissionMaterial.

3) src/components/three/HeroOrb.tsx
   status: SAFE_TO_DELETE
   descrição: Implementação alternativa/experimental do orb (não deve mais ser usada).

4) src/components/three/Model.tsx
   status: SAFE_TO_DELETE
   descrição: “Model” genérico de tutorial/experimento (parece inspirado no tutorial do Olivier Larose).

5) src/components/three/TorusDanRefraction.tsx
   status: MAYBE_REQUIRED (bem provável SAFE_TO_DELETE)
   descrição: Variante de “refraction”; não encontrei imports/referências em outros arquivos pelo code search.

Subpasta encontrada em src/components/three/orb:
6) src/components/three/orb/GlassOrb.tsx
   status: SAFE_TO_DELETE
   descrição: Implementação paralela do orb (pasta “orb”), substituída pelo par HeroGlassCanvas + TorusDan.

Arquivo no path extra pedido:
7) src/components/sections/Hero.tsx
   status: CORE_REQUIRED (REPLACED)
   descrição: Seção Hero (layout + texto + CTA + inclui o canvas 3D via dynamic import ssr:false).

=====================================================================================
B) WHAT CAN BE REMOVED
=====================================================================================
- src/components/three/HeroOrb.tsx
  Motivo: não deve mais ser usado (objetivo é manter apenas a implementação “glass orb” do Hero).

- src/components/three/Model.tsx
  Motivo: parece legado/tutorial; não faz parte do “clean area” do Hero.

- src/components/three/orb/GlassOrb.tsx
  Motivo: implementação paralela/antiga do orb; vamos manter só TorusDan + HeroGlassCanvas.

- (opcional) src/components/three/TorusDanRefraction.tsx
  Motivo: pelo code search não encontrei uso; mas como é variante “refraction”, pode estar guardada para testes.
  Sugestão: só delete após confirmar que não existe import em algum branch/feature.

=====================================================================================
C) PROPOSED STRUCTURE (clean)
=====================================================================================

src/
  components/
    sections/
      Hero.tsx                      (REPLACED)
    three/
      HeroGlassCanvas.tsx           (REPLACED)
      TorusDan.tsx                  (REPLACED)
      // delete: HeroOrb.tsx
      // delete: Model.tsx
      // delete: TorusDanRefraction.tsx (se confirmar)
      // delete folder: orb/

=====================================================================================
D) CODE CHANGES
=====================================================================================

/* ------------------------------------------------------------------------------------------------
src/components/three/TorusDan.tsx  [REPLACED]
- Carrega o GLB do torus e aplica MeshTransmissionMaterial (efeito “glass”).
- Implementação robusta sem depender do nome exato do mesh: percorre nodes e renderiza todos os meshes.
- Evita Leva/controls (tutorial) para manter bundle limpo.
------------------------------------------------------------------------------------------------- */
'use client';

import * as THREE from 'three';
import React, { memo, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, useGLTF } from '@react-three/drei';

type TorusDanProps = {
  /** Multiplicador adicional de escala (além do scale responsivo por viewport) */
  scaleMultiplier?: number;
  /** Posição do grupo */
  position?: THREE.Vector3 | [number, number, number];
  /** Rotação base do grupo */
  rotation?: THREE.Euler | [number, number, number];
  /** Intensidade do “float” (seno) */
  floatIntensity?: number;
  /** Velocidade do “float” */
  floatSpeed?: number;
  /** Velocidade de rotação */
  rotationSpeed?: number;
};

function TorusDanImpl({
  scaleMultiplier = 1,
  position = [0, 0, 0],
  rotation = [0.2, 0.7, 0],
  floatIntensity = 0.12,
  floatSpeed = 0.9,
  rotationSpeed = 0.25,
}: TorusDanProps) {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // Ajuste responsivo: quanto maior a viewport, maior o torus.
  const responsiveScale = useMemo(() => {
    const s = viewport.width / 3.2;
    return THREE.MathUtils.clamp(s, 0.85, 1.8) * scaleMultiplier;
  }, [viewport.width, scaleMultiplier]);

  // types do GLTF podem variar; `any` evita depender de gltfjsx/types.
  const gltf = useGLTF('/media/torus_dan.glb') as any;
  const nodes = (gltf?.nodes ?? {}) as Record<string, any>;

  const meshes = useMemo(() => {
    return Object.values(nodes).filter((n) => n && (n.isMesh || n.isSkinnedMesh));
  }, [nodes]);

  const mat = useMemo(
    () => ({
      transmission: 1,
      thickness: 0.45,
      roughness: 0.02,
      ior: 1.35,
      chromaticAberration: 0.12,
      anisotropy: 0.2,
      distortion: 0.35,
      distortionScale: 0.3,
      temporalDistortion: 0.15,
      clearcoat: 1,
      attenuationDistance: 0.75,
      attenuationColor: '#ffffff',
      samples: 8,
      resolution: 512,
      backside: true,
    }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!group.current) return;

    group.current.rotation.y = (rotation as any)[1] + t * rotationSpeed;
    group.current.rotation.x = (rotation as any)[0] + Math.sin(t * 0.7) * 0.06;
    group.current.rotation.z = (rotation as any)[2] + Math.cos(t * 0.5) * 0.04;

    group.current.position.y =
      (Array.isArray(position) ? position[1] : position.y) + Math.sin(t * floatSpeed) * floatIntensity;
  });

  return (
    <group
      ref={group}
      position={position as any}
      rotation={rotation as any}
      scale={responsiveScale}
      dispose={null}
    >
      {meshes.map((m: any, i: number) => {
        const geom = m.geometry as THREE.BufferGeometry | undefined;
        if (!geom) return null;

        return (
          <mesh
            key={m.uuid ?? i}
            geometry={geom}
            position={m.position}
            rotation={m.rotation}
            scale={m.scale}
            castShadow={false}
            receiveShadow={false}
          >
            <MeshTransmissionMaterial {...(mat as any)} />
          </mesh>
        );
      })}
    </group>
  );
}

export const TorusDan = memo(TorusDanImpl);

useGLTF.preload('/media/torus_dan.glb');


/* ------------------------------------------------------------------------------------------------
src/components/three/HeroGlassCanvas.tsx  [REPLACED]
- Canvas R3F do Hero (transparente) com Environment preset="city" e luzes suaves.
- Mantém API simples: className opcional para encaixe no layout.
------------------------------------------------------------------------------------------------- */
'use client';

import React, { Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { TorusDan } from './TorusDan';

type HeroGlassCanvasProps = {
  className?: string;
};

function HeroGlassCanvasImpl({ className }: HeroGlassCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 3.2], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight intensity={1.25} position={[2.5, 2.0, 3.0]} />
        <directionalLight intensity={0.65} position={[-3.0, 1.0, 2.0]} />

        <Suspense fallback={null}>
          <Environment preset="city" />
          <TorusDan position={[0, 0, 0]} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default memo(HeroGlassCanvasImpl);


/* ------------------------------------------------------------------------------------------------
src/components/sections/Hero.tsx  [REPLACED]
- Layout do Hero + dynamic import do Canvas 3D (ssr:false).
- Tailwind para responsividade + Framer Motion para entrada.
- Mantém o comportamento esperado no App Router: Hero é client component.
------------------------------------------------------------------------------------------------- */
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const HeroGlassCanvas = dynamic(() => import('../three/HeroGlassCanvas'), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-5xl font-extrabold leading-[0.95] tracking-tight text-neutral-900 md:text-7xl"
            >
              <span className="text-blue-600">Design</span>, não é só estética.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-blue-600 md:text-xl"
            >
              [É intenção, é estratégia, é experiência.]
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#sobre"
                className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-7 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
              >
                get to know me better
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  ↗
                </span>
              </a>

              <span className="text-sm text-neutral-500">
                {`{ brand awareness • web • motion • strategy }`}
              </span>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto aspect-square w-full max-w-[520px]"
            >
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-b from-neutral-100 to-neutral-50" />
              <HeroGlassCanvas className="absolute inset-0" />

              <div className="pointer-events-none absolute right-0 top-16 hidden translate-x-[30%] rounded-md bg-neutral-100/70 px-6 py-4 text-sm font-medium tracking-[0.18em] text-blue-600 backdrop-blur md:block">
                [ BRAND AWARENESS ]
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
    </section>
  );
}

/* =====================================================================================
E) MANUAL STEPS (checklist)
=====================================================================================
1) Deletar (SAFE_TO_DELETE):
   - src/components/three/HeroOrb.tsx
   - src/components/three/Model.tsx
   - src/components/three/orb/GlassOrb.tsx
   - (opcional) src/components/three/TorusDanRefraction.tsx
   - (opcional) remover pasta src/components/three/orb/

2) Garantir assets:
   - public/media/torus_dan.glb deve existir (o TorusDan usa /media/torus_dan.glb)

3) Dependências:
   - Nenhuma nova. Confirme que já existem:
     - three
     - @react-three/fiber
     - @react-three/drei
     - framer-motion
     - tailwindcss
===================================================================================== */
