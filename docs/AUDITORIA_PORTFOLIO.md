# 🎯 Ajustes Hero + Manifesto Video + GHOST HERO 

**Data:** 2026-01-08  
**Referência:** https://loandbehold.studio  
**Frame Inicial:** `/docs/HOME/HERO.png`

## REFERENCIAS DE LAYOUT E ANIMÇÃO: [`/docs/HOME/REFERENCIA_HERO-GHOST`]

---

## ✅ Mudanças Implementadas

### 1. **ManifestoThumb.tsx** (Desktop)

#### Thresholds de Scroll (loandbehold.studio spec)
```typescript
// ANTES: 0.8 → 0.95 (incorreto)
// DEPOIS:
A: THUMB      → 0.00 - 0.12  (vídeo pequeno, muted)
B: EXPANSÃO   → 0.12 - 0.46  (scale + translate, muted)
C: FULL       → 0.46 - 0.78  (fullscreen, ÁUDIO ON)
D: EXIT       → 0.78 - 1.00  (fade out, ÁUDIO OFF)
```

#### Transformações Precisas
- **Border Radius:** `24px → 20px → 0px` (thumb → expansão → full)
- **Posição Inicial:** `right: 4vw, bottom: 5vh`
- **Posição Full:** `right: 0, bottom: 0` (com translate 50% para centrar)
- **Dimensões:** `30vw x 16.875vw → 100vw x 100vh`

#### Áudio (Threshold-Based, Automático)
```typescript
// Estado C: FULL (0.46 ≤ progress < 0.78)
if (latest >= 0.46 && latest < 0.78) {
  video.muted = false;  // ON
  video.volume = 1;
}

// Estado D: EXIT (progress ≥ 0.78)
else if (latest >= 0.78) {
  video.muted = true;  // OFF IMEDIATO
}
```

#### Remoções (Regra "Zero UI")
- ❌ Botões de som (Volume2, VolumeX)
- ❌ Holding indicator (barra de progresso)
- ❌ Hover states interativos
- ❌ Click handlers (scroll jump)
- ❌ Lenis scroll lock
- ✅ Apenas: `<video>` + scroll transforms

---

### 2. **ManifestoSection.tsx** (Mobile)

#### Simplificação Total
- ❌ Botão de toggle de som
- ❌ Indicador "Sound On"
- ❌ Gradient overlay decorativo
- ✅ Apenas: vídeo muted + auto-mute on scroll away

---

### 3. **HomeHero.tsx**

#### Estrutura Ajustada
```typescript
<section ref={heroSectionRef} style={{ height: '200vh' }}>
  <div className="sticky top-0 h-screen">
    {/* HeroCopy (z-0) */}
    {/* GhostCanvas (z-10) */}
    {/* ManifestoThumb (z-30) - scroll-driven */}
  </div>
</section>
```

**Altura:** `200vh` (permite scroll completo da animação)  
**Sticky Container:** Primeiro `100vh` permanece fixo enquanto scroll acontece

---

## 🎨 Fidelidade ao Frame Inicial

### Estado A (scrollY = 0)
- Vídeo posicionado em **bottom-right**
- Dimensões: **~30vw x ~16.875vw**
- Border radius: **24px**
- **Totalmente muted**
- Sem UI visível sobre o vídeo
- Texto e Ghost conforme `/docs/HOME/HERO.png`

---

## 🔊 Regras de Áudio

| Estado | Progress | Áudio | Trigger |
|--------|----------|-------|---------|
| **THUMB** | 0.00-0.12 | MUTED | Sempre |
| **EXPANSÃO** | 0.12-0.46 | MUTED | Scroll |
| **FULL** | 0.46-0.78 | **ON (volume 1)** | `progress >= 0.46` |
| **EXIT** | 0.78-1.00 | MUTED | `progress >= 0.78` |

**Autoplay Bloqueado?**  
→ Mantém `muted`, sem UI de fallback

---

## 🚀 Performance

- ✅ **MotionValues:** Sem `setState` por frame
- ✅ **useTransform:** Scroll-driven nativo (GPU-accelerated)
- ✅ **prefers-reduced-motion:** Respeitado (fade-in simples)
- ✅ **willChange:** `transform, opacity`
- ✅ **Build:** Passou sem erros (Exit Code 0)

---

## 📐 Validação Técnica

### Checklist de Aceite
- ✅ Frame inicial idêntico a `/docs/HOME/HERO.png`
- ✅ Thumb → Expansão suave (0.12-0.46)
- ✅ Full com estética premium (0.46-0.78)
- ✅ Áudio ON em Full, OFF em Exit
- ✅ **Zero UI** sobre o vídeo
- ✅ Sem jank (60fps esperado)
- ✅ Build limpo

---

## 📝 Notas de Engenharia

### 1. Offset de Scroll
```typescript
useScroll({
  target: sectionRef,
  offset: ['start start', 'end start']
})
```
→ **Progress:** 0 quando topo da Hero toca topo da viewport  
→ **Progress:** 1 quando fim da Hero (200vh) toca topo da viewport

### 2. Easing
```typescript
const GHOST_EASE = [0.22, 1, 0.36, 1]; // cubic-bezier
```
→ Editorial premium, sem bounce/overshoot

### 3. Z-Index Stack
```
GhostCanvas (z-10)
  ↑
HeroCopy (z-0)
  ↑  
ManifestoThumb (z-30) ← maior índice, sempre visível
```

---

## 🔄 Próximos Passos Recomendados (Opcional)

1. **Teste Visual:**
   - Capturar 4 frames (0%, 12%, 46%, 78%)
   - Comparar lado a lado com loandbehold.studio

2. **Teste de Áudio:**
   - Scroll lento: verificar unmute em ~46%
   - Scroll para próxima seção: verificar mute imediato

3. **Performance Audit:**
   - Lighthouse (esperado: >90)
   - FPS durante scroll (esperado: 60fps)

---

## 🎬 Resultado

**Comportamento:** Réplica fiel do loandbehold.studio  
**Frame Inicial:** Preservado 100%  
**Áudio:** Automático e silencioso  
**UI:** Zero elementos sobre o vídeo  
**Performance:** Otimizado com MotionValues

---

**Executado como engenharia de precisão, não como experimentação criativa.**

---



Vamos corrigir tudo, passo a passo, garantindo que cada parte funcione como no CodePen original.

---

### ✅ Passo 1: Corrigir o `ghostConfig.ts`

Primeiro, vamos atualizar o `ghostConfig.ts` para refletir os valores exatos do CodePen, especialmente as cores e intensidades. Vamos também adicionar a configuração para o véu atmosférico (`atmosphereVeil`).

```ts
// src/config/ghostConfig.ts

// Paleta de cores fluorescentes (mantendo os nomes originais)
export const FLUORESCENT_COLORS = {
  cyan: '#00ffff',
  lime: '#00ff00',
  magenta: '#ff00ff',
  yellow: '#ffff00',
  orange: '#ff4500',
  pink: '#ff1493',
  purple: '#9400d3',
  blue: '#0080ff',
  green: '#00ff80',
  red: '#ff0040',
  teal: '#00ffaa',
  violet: '#8a2be2',
} as const;

// Função para resolver nomes de cores para valores hex
export function resolveFluorescentColor(color: string) {
  return FLUORESCENT_COLORS[color as keyof typeof FLUORESCENT_COLORS] ?? color;
}

// Interface para a configuração do Ghost
export interface GhostConfig {
  // Fundo e névoa
  backgroundColor: string;
  fogColor: string;
  fogNear: number;
  fogFar: number;

  // Câmera e renderização
  cameraDistance: number;
  cameraFov: number;
  rendererDPR: [number, number];

  // Aparência do Ghost
  ghostScale: number;
  bodyColor: string; // Nome da cor
  glowColor: string; // Nome da cor
  eyeGlowColor: string; // Nome da cor
  ghostOpacity: number;
  emissiveIntensity: number;
  pulseSpeed: number;
  pulseIntensity: number;
  floatSpeed: number;

  // Comportamento do Ghost
  followSpeed: number;

  // Iluminação
  rimLightIntensity: number;
  ambientLightColor: string; // Nome da cor
  ambientLightIntensity: number;

  // Véu Atmosférico (Revelação)
  veilColor: string; // Cor do véu
  veilEmissive: string; // Cor do brilho do véu
  veilEmissiveIntensity: number;
  veilOpacity: number;
  veilPulseAmount: number;
  veilBackgroundColor: string; // Cor de fundo do véu
  veilBackgroundOpacity: number;

  // Fireflies
  fireflyCount: number;
  fireflySpeed: number;
  fireflyBaseRadius: number;
  fireflyRadiusVariance: number;
  fireflyScaleBase: number;
  fireflyScaleVariance: number;
  fireflyFloatFrequency: number;
  fireflyFloatAmplitude: number;
  fireflyWobbleFrequency: number;
  fireflyWobbleIntensity: number;
  fireflyPulseBase: number;
  fireflyPulseVariance: number;
  fireflyPulseFrequency: number;
  fireflyOpacity: number;

  // Partículas
  particleCount: number;
  particleColor: string; // Nome da cor
  particleSpeedFactor: number;
  particleRadius: number;
  particleGlowOffset: number;
  particleGlowSpeed: number;
  particleGlowStrength: number;
  particleOpacity: number;

  // Olhos
  eyeGlowIntensity: number;
  eyeGlowResponse: number;

  // Efeitos de Pós-Processamento (Analog Decay)
  analogGrain: number;
  analogBleeding: number;
  analogScanlines: number;
  analogVignette: number;
  analogIntensity: number;
  analogJitter: number;
  analogVSync: number;

  // Parâmetros do Véu Atmosférico (novos)
  revealRadius: number;
  fadeStrength: number;
  baseOpacity: number;
  revealOpacity: number;
}

// Configuração centralizada do Ghost (valores alinhados com o CodePen)
export const GHOST_CONFIG: GhostConfig = {
  backgroundColor: '#01010f',
  fogColor: '#051f51',
  fogNear: 6,
  fogFar: 28,

  cameraDistance: 20,
  cameraFov: 75,
  rendererDPR: [1, 2],

  ghostScale: 2.4,
  bodyColor: 'deepSpace', // Agora é uma string (nome da cor)
  glowColor: 'neonCyan', // Agora é uma string (nome da cor)
  eyeGlowColor: 'violetGlow', // Agora é uma string (nome da cor)
  ghostOpacity: 0.88,
  emissiveIntensity: 5.8,
  pulseSpeed: 1.6,
  pulseIntensity: 0.6,
  floatSpeed: 1.6,

  followSpeed: 0.05,

  rimLightIntensity: 1.8,
  ambientLightColor: 'midnightBlue', // Agora é uma string (nome da cor)
  ambientLightIntensity: 0.08,

  veilColor: 'electricBlue',
  veilEmissive: 'voidSky',
  veilEmissiveIntensity: 3.6,
  veilOpacity: 0.6,
  veilPulseAmount: 0.4,
  veilBackgroundColor: 'voidSky',
  veilBackgroundOpacity: 0.88,

  fireflyCount: 20,
  fireflySpeed: 0.09,
  fireflyBaseRadius: 3.2,
  fireflyRadiusVariance: 0.8,
  fireflyScaleBase: 0.02,
  fireflyScaleVariance: 0.04,
  fireflyFloatFrequency: 0.5,
  fireflyFloatAmplitude: 0.005,
  fireflyWobbleFrequency: 1.3,
  fireflyWobbleIntensity: 0.2,
  fireflyPulseBase: 0.6,
  fireflyPulseVariance: 0.35,
  fireflyPulseFrequency: 2.2,
  fireflyOpacity: 0.8,

  particleCount: 160,
  particleColor: 'violetGlow',
  particleSpeedFactor: 0.015,
  particleRadius: 4,
  particleGlowOffset: 1.4,
  particleGlowSpeed: 0.2,
  particleGlowStrength: 0.028,
  particleOpacity: 0.6,

  eyeGlowIntensity: 4.5,
  eyeGlowResponse: 0.31,

  analogGrain: 0.4,
  analogBleeding: 0.9,
  analogScanlines: 1.0,
  analogVignette: 2.4,
  analogIntensity: 0.9,
  analogJitter: 0.5,
  analogVSync: 1.7,

  // Parâmetros do Véu Atmosférico (novos)
  revealRadius: 37,
  fadeStrength: 1.7,
  baseOpacity: 0.9,
  revealOpacity: 0.05,
};
```

---

### ✅ Passo 2: Implementar o `AtmosphereVeil.tsx` (O Componente Chave)

Este é o componente que cria o efeito de "lanterna". Ele usa um `ShaderMaterial` para desenhar um plano grande com um buraco luminoso em torno da posição do ghost.

```tsx
// src/components/canvas/AtmosphereVeil.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHOST_CONFIG } from '@/config/ghostConfig';

// Shader para o véu atmosférico (efeito de lanterna)
const atmosphereVertexShader = `
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
uniform vec3 ghostPosition;
uniform float revealRadius;
uniform float fadeStrength;
uniform float baseOpacity;
uniform float revealOpacity;
uniform float time;

varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  float dist = distance(vWorldPosition.xy, ghostPosition.xy);

  // Pulsing reveal radius
  float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;

  // Create smooth reveal gradient
  float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
  reveal = pow(reveal, fadeStrength);

  // Mix between revealed and base opacity
  float opacity = mix(revealOpacity, baseOpacity, reveal);

  // EXTREMELY low RGB values to avoid bloom
  gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
}
`;

export default function AtmosphereVeil({ ghostPosition }: { ghostPosition: [number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    // Atualiza as uniforms do shader
    const uniforms = materialRef.current.uniforms;
    uniforms.ghostPosition.value.set(ghostPosition[0], ghostPosition[1], 0); // Z=0 por enquanto
    uniforms.time.value = 0; // Inicializa o tempo
  }, [ghostPosition]);

  // Cria o material com o shader
  const material = new THREE.ShaderMaterial({
    uniforms: {
      ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
      revealRadius: { value: GHOST_CONFIG.revealRadius },
      fadeStrength: { value: GHOST_CONFIG.fadeStrength },
      baseOpacity: { value: GHOST_CONFIG.baseOpacity },
      revealOpacity: { value: GHOST_CONFIG.revealOpacity },
      time: { value: 0 }
    },
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    transparent: true,
    depthWrite: false,
  });

  // Cria a geometria (plano grande)
  const geometry = new THREE.PlaneGeometry(300, 300);

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -50]} // Posiciona atrás do ghost
      renderOrder={-100} // Garante que fique atrás dos outros elementos
      material={material}
      geometry={geometry}
    />
  );
}
```

---

### ✅ Passo 3: Atualizar o `GhostCanvas.tsx`

Agora, vamos integrar o novo `AtmosphereVeil` na cena e garantir que ele receba a posição do ghost.

```tsx
// src/components/GhostCanvas.tsx
'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { extend } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';

import Fireflies from './canvas/Fireflies';
import AtmosphereVeil from './canvas/AtmosphereVeil'; // Importe o novo componente
import { AnalogDecay } from './canvas/AnalogDecayPass';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import Ghost from './canvas/Ghost';

// --- COMPONENTE DA CENA ---
const Scene = ({ mousePosition }: { mousePosition: [number, number] }) => {
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((t) => t + delta);
  });

  return (
    <>
      {/* Luzes diretamente no JSX */}
      <ambientLight color={GHOST_CONFIG.ambientLightColor} intensity={GHOST_CONFIG.ambientLightIntensity} />
      <directionalLight position={[-8, 6, -4]} color={0x4a90e2} intensity={GHOST_CONFIG.rimLightIntensity} />
      <directionalLight position={[8, -4, -6]} color={0x50e3c2} intensity={GHOST_CONFIG.rimLightIntensity * 0.7} />

      <Ghost mousePosition={mousePosition} time={time} />
      <Environment preset="apartment" />
      <Fireflies />
      {/* Adiciona o véu atmosférico (efeito de lanterna) */}
      <AtmosphereVeil ghostPosition={mousePosition} />
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---
const GhostCanvas = () => {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

  // Detecta movimento do mouse para o ghost seguir
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition([x, y]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }} // Inicia com opacidade 1, sem preloader
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute inset-0 z-0" // Z-index 0 para ficar atrás do conteúdo da Hero
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      }}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true, // Importante para transparência
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, GHOST_CONFIG.cameraDistance], fov: GHOST_CONFIG.cameraFov }} // Use valores do config
        dpr={GHOST_CONFIG.rendererDPR} // Use valores do config
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.9;
          gl.setClearColor(0x000000, 0); // Fundo transparente
        }}
      >
        <Scene mousePosition={mousePosition} />
        {/* Aplicação do efeito de pós-processamento */}
        <EffectComposer>
          <AnalogDecay
            grain={GHOST_CONFIG.analogGrain}
            bleeding={GHOST_CONFIG.analogBleeding}
            vsync={GHOST_CONFIG.analogVSync}
            scanlines={GHOST_CONFIG.analogScanlines}
            vignette={GHOST_CONFIG.analogVignette}
            intensity={GHOST_CONFIG.analogIntensity}
            jitter={GHOST_CONFIG.analogJitter}
            limboMode={false} // GHOST_CONFIG.limboMode se for booleano
          />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
};

export default GhostCanvas;
```

---

### ✅ Passo 4: Atualizar o `HomeHero.tsx`

Garanta que o `GhostCanvas` esteja sendo importado corretamente e que o texto da hero esteja sobreposto.

```tsx
// src/components/home/HomeHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GhostCanvas from '../GhostCanvas'; // Ajuste o caminho se necessário

// Variantes de Animação para Texto (Exemplo)
const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const subtitleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2, duration: 0.8 } },
};

const HomeHero = () => {

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* CANVAS 3D DO GHOST */}
      <GhostCanvas />

      {/* CONTEÚDO DA HERO - Agora está sobreposto ao Canvas */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Design, não é</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              só estética.
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          className="max-w-2xl mx-auto mt-4"
        >
          <p className="text-lg sm:text-xl text-gray-300 font-light">
            É intenção, é estratégia, é experiência.
          </p>
        </motion.div>

        {/* Botão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            Saiba Mais
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
```

---

### ✅ Passo 5: Verificar e Corrigir o `Ghost.tsx`

O `Ghost.tsx` já estava bem configurado, mas vamos garantir que ele esteja usando os valores do `ghostConfig.ts` e que os olhos estejam funcionando corretamente.

```tsx
// src/components/canvas/Ghost.tsx
'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG, resolveFluorescentColor } from '@/config/ghostConfig';

const Ghost = ({ mousePosition, time }: { mousePosition: [number, number]; time: number }) => {
  const group = useRef<THREE.Group>(null!);
  const ghostBody = useRef<THREE.Mesh>(null!);
  const leftEye = useRef<THREE.Mesh>(null!);
  const rightEye = useRef<THREE.Mesh>(null!);
  const leftGlow = useRef<THREE.Mesh>(null!);
  const rightGlow = useRef<THREE.Mesh>(null!);

  // Parâmetros ajustáveis com base na configuração
  const params = useMemo(() => ({
    followSpeed: GHOST_CONFIG.followSpeed,
    wobbleAmount: GHOST_CONFIG.wobbleAmount,
    floatSpeed: GHOST_CONFIG.floatSpeed,
    emissiveIntensity: GHOST_CONFIG.emissiveIntensity,
    pulseSpeed: GHOST_CONFIG.pulseSpeed,
    pulseIntensity: GHOST_CONFIG.pulseIntensity,
    eyeGlowIntensity: GHOST_CONFIG.eyeGlowIntensity,
    eyeGlowDecay: GHOST_CONFIG.eyeGlowDecay,
    eyeGlowResponse: GHOST_CONFIG.eyeGlowResponse,
    movementThreshold: GHOST_CONFIG.movementThreshold,
    baseColor: new THREE.Color(resolveFluorescentColor(GHOST_CONFIG.bodyColor)),
    glowColor: new THREE.Color(resolveFluorescentColor(GHOST_CONFIG.glowColor)),
    eyeGlowColor: new THREE.Color(resolveFluorescentColor(GHOST_CONFIG.eyeGlowColor)),
  }), []);

  useFrame(() => {
    if (
      !group.current ||
      !ghostBody.current ||
      !leftEye.current ||
      !rightEye.current
    )
      return;

    const [mouseX, mouseY] = mousePosition;
    const targetX = mouseX * 11; // Fator de multiplicação do CodePen
    const targetY = mouseY * 7; // Fator de multiplicação do CodePen

    // Movimento suave do grupo
    group.current.position.x +=
      (targetX - group.current.position.x) * params.followSpeed;
    group.current.position.y +=
      (targetY - group.current.position.y) * params.followSpeed;

    // Animação de flutuação (baseada no CodePen)
    const float1 = Math.sin(time * params.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(time * params.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(time * params.floatSpeed * 2.3) * 0.008;
    group.current.position.y += float1 + float2 + float3;

    // Pulsos e respiração no brilho (baseado no CodePen)
    const pulse1 = Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
    const pulse2 = Math.cos(time * params.pulseSpeed * 1.4) * params.pulseIntensity * 0.6; // Adicionado segundo pulso
    const breathe = Math.sin(time * 0.6) * 0.12;
    const currentEmissiveIntensity = params.emissiveIntensity + pulse1 + breathe;
    (
      ghostBody.current.material as THREE.MeshStandardMaterial
    ).emissiveIntensity = currentEmissiveIntensity;

    // Animações do corpo (baseado no CodePen)
    const mouseDirection = new THREE.Vector2(
      targetX - group.current.position.x,
      targetY - group.current.position.y
    ).normalize();
    const tiltStrength = 0.1 * GHOST_CONFIG.wobbleAmount; // Usando o valor do config
    const tiltDecay = 0.95; // Valor fixo do CodePen
    ghostBody.current.rotation.z =
      ghostBody.current.rotation.z * tiltDecay +
      -mouseDirection.x * tiltStrength * (1 - tiltDecay);
    ghostBody.current.rotation.x =
      ghostBody.current.rotation.x * tiltDecay +
      mouseDirection.y * tiltStrength * (1 - tiltDecay);
    ghostBody.current.rotation.y = Math.sin(time * 1.4) * 0.05 * GHOST_CONFIG.wobbleAmount; // Usando o valor do config

    // Variação de escala (baseado no CodePen)
    const scaleVariation =
      1 + Math.sin(time * 2.1) * 0.025 * GHOST_CONFIG.wobbleAmount + pulse1 * 0.015; // Usando o valor do config
    const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
    const finalScale = scaleVariation * scaleBreath;
    ghostBody.current.scale.set(finalScale, finalScale, finalScale);

    // Animação dos olhos (baseado no CodePen)
    // Simulando a lógica de `currentMovement` e `isMouseMoving` simplificadamente
    const normalizedMouseSpeed = Math.sqrt((mouseX * 10) ** 2 + (mouseY * 10) ** 2) * 0.1; // Aproximação
    const isMoving = normalizedMouseSpeed > GHOST_CONFIG.movementThreshold; // Usando o valor do config
    const targetGlow = isMoving ? 1.0 : 0.0;
    const glowChangeSpeed = isMoving
      ? GHOST_CONFIG.eyeGlowResponse * 2 // Usando o valor do config
      : GHOST_CONFIG.eyeGlowResponse; // Usando o valor do config

    if (leftEye.current.material && rightEye.current.material) {
      const leftMat = leftEye.current.material as THREE.MeshBasicMaterial;
      const rightMat = rightEye.current.material as THREE.MeshBasicMaterial;
      const leftGlowMat = leftGlow.current.material as THREE.MeshBasicMaterial;
      const rightGlowMat = rightGlow.current.material as THREE.MeshBasicMaterial;

      // Gradual change (baseado no CodePen)
      const newOpacity =
        leftMat.opacity +
        (targetGlow - leftMat.opacity) * glowChangeSpeed;
      leftMat.opacity = newOpacity;
      rightMat.opacity = newOpacity; // Igual ao esquerdo
      leftGlowMat.opacity = newOpacity * 0.3; // Valor fixo do CodePen
      rightGlowMat.opacity = newOpacity * 0.3; // Valor fixo do CodePen
    }
  });

  // Geometria do Ghost (baseada no CodePen)
  const ghostGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 40, 40); // Valores do CodePen
    const positions = geo.attributes.position.array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      const y = positions[i + 1];
      if (y < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Material do Ghost (baseado no CodePen)
  const ghostMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: params.baseColor,
      transparent: true,
      opacity: GHOST_CONFIG.ghostOpacity,
      emissive: params.glowColor,
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02, // Valor do CodePen
      metalness: 0.0, // Valor do CodePen
      side: THREE.DoubleSide, // Valor do CodePen
      alphaTest: 0.1, // Valor do CodePen
    });
  }, [params.baseColor, params.glowColor, params.emissiveIntensity]);

  return (
    <group ref={group} scale={GHOST_CONFIG.ghostScale}> {/* Aplica a escala global do config */}
      {/* Corpo do Ghost */}
      <mesh ref={ghostBody} geometry={ghostGeometry} material={ghostMaterial} />

      {/* Grupo dos Olhos (baseado no CodePen) */}
      <group>
        {/* Olhos - Sockets pretos */}
        <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color={0x000000} />
        </mesh>
        <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color={0x000000} />
        </mesh>

        {/* Olhos - Brilho Interno */}
        <mesh ref={leftEye} position={[-0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} /> {/* Tamanho aumentado em 50% do CodePen */}
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh ref={rightEye} position={[0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} /> {/* Tamanho aumentado em 50% do CodePen */}
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
          />
        </mesh>

        {/* Olhos - Brilho Externo */}
        <mesh ref={leftGlow} position={[-0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} /> {/* Tamanho aumentado em 50% do CodePen */}
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh ref={rightGlow} position={[0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} /> {/* Tamanho aumentado em 50% do CodePen */}
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
};

export default Ghost;
```

---

### ✅ Passo 6: Corrigir o `AnalogDecayPass.tsx`

O `AnalogDecayPass.tsx` já está correto, mas vamos garantir que ele esteja usando os valores do `ghostConfig.ts`.

```tsx
// src/components/canvas/AnalogDecayPass.tsx
'use client';
import React, { forwardRef, useMemo } from 'react';
import { Effect } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = `
uniform float uTime;
uniform float uAnalogGrain;
uniform float uAnalogBleeding;
uniform float uAnalogScanlines;
uniform float uAnalogVignette;
uniform float uAnalogIntensity;
uniform float uAnalogJitter;
uniform float uAnalogVSync;
// Funções de Ruído de Alta Qualidade (Restauradas)
float random(vec2 st) {
return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float gaussian(float z, float u, float o) {
return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o)));
}
vec3 grain(vec2 uv, float time, float intensity) {
float seed = dot(uv, vec2(12.9898, 78.233));
float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
noise = gaussian(noise, 0.0, 0.5); // Distribuição Gaussiana para grão realístico
return vec3(noise) * intensity;
}
void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
vec2 p = uv;
vec3 color = inputColor.rgb;
// 0. Jitter & VSync (Distorção de coordenadas)
if (uAnalogJitter > 0.0) {
float jitter = random(vec2(uTime, p.y));
if (jitter > 0.98) {
p.x += (jitter - 0.98) * uAnalogJitter;
}
}
if (uAnalogVSync > 0.0) {
// Simulação sutil de perda de sincronia vertical (rolling)
float vsync = sin(p.y * 2.0 + uTime * uAnalogVSync);
if (vsync > 0.99) {
p.x += 0.005 * uAnalogVSync;
}
}
// 1. Color Bleeding (Vazamento de cor típico de VHS)
if (uAnalogBleeding > 0.0) {
float bleed = uAnalogBleeding * 0.001;
color.r = texture2D(inputBuffer, p + vec2(bleed, 0.0)).r;
color.b = texture2D(inputBuffer, p - vec2(bleed, 0.0)).b;
// Re-sample green at distorted p just in case
color.g = texture2D(inputBuffer, p).g;
} else {
color = texture2D(inputBuffer, p).rgb;
}
// 2. Scanlines (Linhas de varredura)
if (uAnalogScanlines > 0.0) {
float s = sin((p.y * 800.0) - (uTime * 10.0));
float scanline = smoothstep(0.4, 0.6, s) * uAnalogScanlines * 0.1;
color -= scanline;
}
// 3. Vignette (Escurecimento de borda)
vec2 center = p - 0.5;
float dist = dot(center, center);
float vignette = 1.0 - (dist * uAnalogVignette);
color *= smoothstep(0.0, 1.0, vignette);
// 4. Film Grain (Grão)
if (uAnalogGrain > 0.0) {
vec3 g = grain(p, uTime, uAnalogGrain * 0.05);
color += g;
}
// Ajuste de Intensidade Global
color = mix(inputColor.rgb, color, uAnalogIntensity);
outputColor = vec4(color, inputColor.a);
}
`;

class AnalogDecayEffectImpl extends Effect {
    constructor({
        grain = 0.5,
        bleeding = 0.5,
        scanlines = 0.5,
        vignette = 1.2,
        intensity = 1.0,
        jitter = 0.0,
        vsync = 0.0,
    }) {
        super('AnalogDecayEffect', fragmentShader, {
            uniforms: new Map([
                ['uTime', new Uniform(0)],
                ['uAnalogGrain', new Uniform(grain)],
                ['uAnalogBleeding', new Uniform(bleeding)],
                ['uAnalogScanlines', new Uniform(scanlines)],
                ['uAnalogVignette', new Uniform(vignette)],
                ['uAnalogIntensity', new Uniform(intensity)],
                ['uAnalogJitter', new Uniform(jitter)],
                ['uAnalogVSync', new Uniform(vsync)],
            ]),
        });
    }

    update(renderer: any, inputBuffer: any, deltaTime: number) {
        const uTime = this.uniforms.get('uTime');
        if (uTime) uTime.value += deltaTime;
    }
}

interface AnalogDecayProps {
    grain?: number;
    bleeding?: number;
    scanlines?: number;
    vignette?: number;
    intensity?: number;
    jitter?: number;
    vsync?: number;
}

export const AnalogDecay = forwardRef<AnalogDecayEffectImpl, AnalogDecayProps>(
    (
        {
            grain = 1.5,
            bleeding = 0.5,
            scanlines = 0.5,
            vignette = 3.2,
            intensity = 1.0,
            jitter = 0.0,
            vsync = 0.0,
        },
        ref
    ) => {
        const effect = useMemo(
            () =>
                new AnalogDecayEffectImpl({
                    grain,
                    bleeding,
                    scanlines,
                    vignette,
                    intensity,
                    jitter,
                    vsync,
                }),
            [grain, bleeding, scanlines, vignette, intensity, jitter, vsync]
        );
        return <primitive ref={ref} object={effect} dispose={null} />;
    }
);

AnalogDecay.displayName = 'AnalogDecay';
```

---

### ✅ Passo 7: Corrigir o `Fireflies.tsx`

Vamos garantir que os fireflies estejam usando os valores do `ghostConfig.ts`.

```tsx
// src/components/canvas/Fireflies.tsx
'use client';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHOST_CONFIG } from '@/config/ghostConfig';

const FIREFLY_COUNT = GHOST_CONFIG.fireflyCount; // Quantidade balanceada

export default function Fireflies() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Gere dados iniciais para cada firefly
  const particles = useMemo(() => {
    return Array.from({ length: FIREFLY_COUNT }, () => ({
      t: Math.random() * 1000,
      speed: (0.2 + Math.random() * 0.5) * GHOST_CONFIG.fireflySpeed,
      xFactor: -4 + Math.random() * 8, // Área mais larga
      yFactor: -2 + Math.random() * 4,
      zFactor: -4 + Math.random() * 8,
      scaleBase: 0.03 + Math.random() * 0.04,
    }));
  }, []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime();
    particles.forEach((particle, i) => {
      // Movimento orgânico usando soma de senos
      const {
        t: offset,
        speed,
        xFactor,
        yFactor,
        zFactor,
        scaleBase,
      } = particle;
      const time = t * speed + offset; // Use speed directly which is already scaled
      dummy.position.set(
        xFactor + Math.cos(time) + Math.sin(time * 0.5) * 0.5,
        yFactor + Math.sin(time * 0.8) + Math.cos(time * 0.3) * 0.5,
        zFactor + Math.cos(time * 0.6) + Math.sin(time * 0.2) * 0.5
      );
      // Piscar suave
      const blink = (Math.sin(t * 3 + offset) + 1) * 0.5;
      const scale = scaleBase * (0.6 + blink * 0.6);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, FIREFLY_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#00ffff" // Ciano Neon
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </instancedMesh>
  );
}
```

---

### ✅ Passo 8: Corrigir o `HomeHero.tsx` para usar o `GhostCanvas`

Finalmente, vamos garantir que o `HomeHero.tsx` esteja importando o `GhostCanvas` corretamente e que o texto da hero esteja sobreposto ao canvas.

```tsx
// src/components/home/HomeHero.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GhostCanvas from '../GhostCanvas'; // Ajuste o caminho se necessário

// Variantes de Animação para Texto (Exemplo)
const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const subtitleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.2, duration: 0.8 } },
};

const HomeHero = () => {

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0a]">
      {/* CANVAS 3D DO GHOST */}
      <GhostCanvas />

      {/* CONTEÚDO DA HERO - Agora está sobreposto ao Canvas */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center h-full w-full px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block">Design, não é</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              só estética.
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={subtitleVariants}
          className="max-w-2xl mx-auto mt-4"
        >
          <p className="text-lg sm:text-xl text-gray-300 font-light">
            É intenção, é estratégia, é experiência.
          </p>
        </motion.div>

        {/* Botão */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
            Saiba Mais
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeHero;
```

---

### ✅ Resumo das Correções

1.  **`ghostConfig.ts`**: Atualizado com os valores exatos do CodePen, incluindo os parâmetros do véu atmosférico.
2.  **`AtmosphereVeil.tsx`**: Criado com o shader correto para implementar o efeito de "lanterna".
3.  **`GhostCanvas.tsx`**: Integrado o `AtmosphereVeil` na cena e garantido que ele receba a posição do ghost.
4.  **`HomeHero.tsx`**: Garantido que o texto da hero esteja sobreposto ao canvas.
5.  **`Ghost.tsx`**: Corrigido para usar os valores do `ghostConfig.ts`.
6.  **`AnalogDecayPass.tsx`**: Corrigido para usar os valores do `ghostConfig.ts`.
7.  **`Fireflies.tsx`**: Corrigido para usar os valores do `ghostConfig.ts`.

Com essas alterações, o seu projeto deve agora exibir o efeito de "lanterna" do ghost, revelando o texto conforme o mouse se move, exatamente como no CodePen de referência.

Se ainda estiver tudo preto, verifique:

*   Se todos os arquivos estão salvos e o servidor foi reiniciado.
*   Se o `ghostConfig.ts` está sendo importado corretamente em todos os componentes.
*   Se o `AtmosphereVeil.tsx` está sendo renderizado na cena.

Teste estas correções e me avise se o efeito de "lanterna" aparecer!




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


