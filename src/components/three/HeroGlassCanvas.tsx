'use client';

import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  PerspectiveCamera,
  Lightformer,
  useProgress,
} from '@react-three/drei';
import useIsMobile from '@/hooks/useIsMobile';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

const TorusDan = lazy(() => import('./TorusDan'));

type HeroGlassCanvasProps = {
  className?: string;
  reduceMotion?: boolean;
  scale?: number;
};

// ... (ProgressObserver definition remains unchanged)

const HeroGlassCanvas: React.FC<HeroGlassCanvasProps> = ({
  className,
  reduceMotion = false,
  scale = 3.2,
}) => {
  // ... (hooks remain unchanged)

  // ...

          <Suspense
            fallback={
              <mesh>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial
                  color="#9dbdff"
                  transparent
                  opacity={0.15}
                />
              </mesh>
            }
          >
            <TorusDan 
              reduceMotion={shouldReduceMotion} 
              isMobile={isMobile} 
              scale={scale} 
            />

            {/* Environment for realistic reflections */}

            {/* Environment for realistic reflections */}
            <Environment preset="city" background={false} blur={0.9}>
              {!shouldReduceMotion && (
                // @ts-ignore
                <group rotation={[-Math.PI / 2, 0, 0]}>
                  <Lightformer
                    intensity={3.6}
                    rotation-x={Math.PI / 2}
                    position={[0, 5, -9]}
                    scale={[10, 10, 1]}
                  />
                  <Lightformer
                    intensity={1.8}
                    rotation-y={Math.PI / 2}
                    position={[-5, 1, -1]}
                    scale={[20, 0.1, 1]}
                  />
                  <Lightformer
                    intensity={1.8}
                    rotation-y={Math.PI / 2}
                    position={[-5, -1, -1]}
                    scale={[20, 0.5, 1]}
                  />
                  <Lightformer
                    intensity={1.8}
                    rotation-y={-Math.PI / 2}
                    position={[10, 1, 0]}
                    scale={[20, 1, 1]}
                  />
                </group>
              )}
            </Environment>
          </Suspense>
        </Canvas>
      </Suspense>
      {!overlayUnmounted && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-linear-to-b from-[#050509]/90 to-transparent text-white transition-opacity duration-500 ${
            preloaderProgress >= 100 ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-white/80">
            carregando orb 3D
          </span>
          <span className="text-sm font-medium tracking-wide">
            {Math.min(Math.max(Math.round(preloaderProgress), 0), 100)}%
          </span>
          <div className="h-[2px] w-28 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{
                width: `${Math.min(Math.max(preloaderProgress, 0), 100)}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroGlassCanvas;
