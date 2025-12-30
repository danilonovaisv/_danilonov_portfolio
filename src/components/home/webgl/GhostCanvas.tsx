// src/components/home/webgl/GhostCanvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Ghost from './Ghost';
import Particles from './Particles';
import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil';
import * as THREE from 'three';

// Importando efeitos padrão da biblioteca
import {
    EffectComposer,
    Bloom,
    Noise,
    Vignette,
    Scanline,
    ChromaticAberration
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function GhostCanvas() {
    const dpr: [number, number] =
        typeof window === 'undefined'
            ? [1, 1.5]
            : [1, Math.min(2, window.devicePixelRatio || 1)];

    return (
        <Canvas
            dpr={dpr}
            gl={{
                antialias: false,
                alpha: true,
                powerPreference: 'high-performance',
                toneMapping: THREE.NoToneMapping, // Importante para cores neon
            }}
            camera={{ position: [0, 0, 6], fov: 35 }}
        >
            {/* Fundo escuro azulado como no print */}
            <color attach="background" args={['#050511']} />

            <Suspense fallback={null}>
                {/* Elementos da Cena */}
                <AtmosphereVeil />
                <Ghost scale={0.2} position={[0, -0.2, 0]} />
                <Particles />
                <Fireflies />

                {/* EFEITOS VISUAIS (O "Look" do vídeo) */}
                <EffectComposer disableNormalPass>

                    {/* 1. Bloom: O brilho intenso */}
                    <Bloom
                        luminanceThreshold={1} // Só brilha o que for muito claro (emissive > 1)
                        mipmapBlur // Suaviza o brilho
                        intensity={1.8}
                        radius={0.6}
                    />

                    {/* 2. Aberração Cromática: O efeito de "glitch" nas bordas */}
                    <ChromaticAberration
                        offset={[0.002, 0.002]} // Deslocamento sutil das cores RGB
                        radialModulation={false}
                        modulationOffset={0}
                    />

                    {/* 3. Scanlines: Linhas de TV horizontal */}
                    <Scanline
                        density={1.5} // Quantidade de linhas
                        opacity={0.3} // Visibilidade das linhas
                    />

                    {/* 4. Noise: Granulação de filme */}
                    <Noise
                        opacity={0.15}
                        premultiply
                        blendFunction={BlendFunction.OVERLAY}
                    />

                    {/* 5. Vignette: Escurecer as bordas */}
                    <Vignette eskil={false} offset={0.1} darkness={1.0} />

                </EffectComposer>
            </Suspense>
        </Canvas>
    );
}