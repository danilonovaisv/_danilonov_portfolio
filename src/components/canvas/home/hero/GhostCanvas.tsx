'use client';

/**
 * GhostCanvas.tsx
 * ================
 * Wrapper R3F declarativo para a cena Ghost Atmosphere.
 *
 * Este componente encapsula a configuração do Canvas React Three Fiber,
 * permitindo uma arquitetura limpa e separação de responsabilidades.
 *
 * Features:
 * - DPR adaptativo baseado no devicePixelRatio
 * - Fallback para gradiente CSS se WebGL não for suportado
 * - Prefers-reduced-motion respeitado
 * - Performance adaptativa via hook
 */

import { Suspense, memo, useCallback, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';

import { useWebGLSupport } from '@/hooks/useWebGLSupport';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';
import { GHOST_CONFIG } from '@/config/ghostConfig';

import Ghost from './Ghost';
import { Atmosphere } from './Atmosphere';
import { AtmosphereVeil } from './AtmosphereVeil';

// Configuração do Canvas
const CANVAS_CONFIG = {
  fov: GHOST_CONFIG.cameraFov,
  near: 0.1,
  far: 1000,
  position: [0, 0, GHOST_CONFIG.cameraDistance] as [number, number, number],
} as const;

// Fallback estático para quando WebGL não está disponível
function StaticFallback() {
  return (
    <div
      className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,#0a0029_0%,#040013_70%)]"
      aria-hidden="true"
    />
  );
}

// Loader interno do Canvas (enquanto assets carregam)
function CanvasLoader() {
  return null; // Transparent loading - o Preloader principal cuida disso
}

// Componente de Cena (dentro do Canvas)
const GhostSceneContent = memo(function GhostSceneContent() {
  const performanceConfig = usePerformanceAdaptive();

  return (
    <>
      {/* Atmosfera de fundo */}
      <Atmosphere />

      {/* Véu atmosférico (reveal effect) */}
      <AtmosphereVeil />

      {/* Ghost principal com partículas e fireflies */}
      <Ghost particleCount={performanceConfig.particleCount} />

      {/* Iluminação */}
      <ambientLight
        color={0x0a0a2e}
        intensity={GHOST_CONFIG.ambientLightIntensity}
      />
      <directionalLight
        color={0x4a90e2}
        intensity={GHOST_CONFIG.rimLightIntensity}
        position={[-8, 6, -4]}
      />
      <directionalLight
        color={0x50e3c2}
        intensity={GHOST_CONFIG.rimLightIntensity * 0.7}
        position={[8, -4, -6]}
      />

      {/* Preload de assets */}
      <Preload all />
    </>
  );
});

// Props do componente principal
interface GhostCanvasProps {
  /** Callback quando o Canvas termina de inicializar */
  onCreated?: () => void;
  /** Classe CSS adicional */
  className?: string;
}

/**
 * GhostCanvas - Wrapper R3F para a atmosfera Ghost
 *
 * Uso:
 * ```tsx
 * <GhostCanvas onCreated={() => setIsLoaded(true)} />
 * ```
 */
const GhostCanvas = memo(function GhostCanvas({
  onCreated,
  className = '',
}: GhostCanvasProps) {
  const supportsWebGL = useWebGLSupport();
  const prefersReducedMotion = usePrefersReducedMotion();
  const performanceConfig = usePerformanceAdaptive();
  const [isReady, setIsReady] = useState(false);

  // Callback de criação do Canvas
  const handleCreated = useCallback(
    (state: { gl: THREE.WebGLRenderer }) => {
      // Configurar renderer
      state.gl.toneMapping = THREE.ACESFilmicToneMapping;
      state.gl.toneMappingExposure = 0.9;
      state.gl.setClearColor(0x000000, 0);

      setIsReady(true);
      onCreated?.();
    },
    [onCreated]
  );

  // Se preferir movimento reduzido ou WebGL não suportado, mostrar fallback
  useEffect(() => {
    if (!supportsWebGL || prefersReducedMotion) {
      // Ainda dispara o callback para não bloquear o fluxo
      onCreated?.();
    }
  }, [supportsWebGL, prefersReducedMotion, onCreated]);

  // Fallback para dispositivos sem WebGL ou com prefers-reduced-motion
  if (!supportsWebGL || prefersReducedMotion) {
    return <StaticFallback />;
  }

  return (
    <div
      className={`absolute inset-0 z-0 transition-opacity duration-500 ease-out ${isReady ? 'opacity-100' : 'opacity-0'} ${className}`}
    >
      <Canvas
        dpr={performanceConfig.pixelRatio}
        gl={{
          antialias: performanceConfig.quality === 'high',
          powerPreference: 'high-performance',
          alpha: true,
          premultipliedAlpha: false,
          stencil: false,
          depth: true,
          preserveDrawingBuffer: false,
        }}
        camera={{
          fov: CANVAS_CONFIG.fov,
          near: CANVAS_CONFIG.near,
          far: CANVAS_CONFIG.far,
          position: CANVAS_CONFIG.position,
        }}
        className="absolute! inset-0! w-full! h-full! pointer-events-none!"
        onCreated={handleCreated}
      >
        <Suspense fallback={<CanvasLoader />}>
          <GhostSceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
});

export { GhostCanvas };
export default GhostCanvas;
