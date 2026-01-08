// src/components/GhostCanvas.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { EffectComposer } from '@react-three/postprocessing';

import Fireflies from './Fireflies';
import AtmosphereVeil from './AtmosphereVeil'; // Importe o novo componente
import { AnalogDecay } from './AnalogDecayPass';
import { GHOST_CONFIG } from '@/config/ghostConfig';
import Ghost from '../Ghost';

// --- COMPONENTE DA CENA ---
const Scene = ({ mousePosition }: { mousePosition: [number, number] }) => {
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((t) => t + delta);
  });

  return (
    <>
      {/* Luzes diretamente no JSX */}
      <ambientLight
        color={GHOST_CONFIG.ambientLightColor}
        intensity={GHOST_CONFIG.ambientLightIntensity}
      />
      <directionalLight
        position={[-8, 6, -4]}
        color={0x4a90e2}
        intensity={GHOST_CONFIG.rimLightIntensity}
      />
      <directionalLight
        position={[8, -4, -6]}
        color={0x50e3c2}
        intensity={GHOST_CONFIG.rimLightIntensity * 0.7}
      />

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
        camera={{
          position: [0, 0, GHOST_CONFIG.cameraDistance],
          fov: GHOST_CONFIG.cameraFov,
        }} // Use valores do config
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
          />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
};

export default GhostCanvas;
