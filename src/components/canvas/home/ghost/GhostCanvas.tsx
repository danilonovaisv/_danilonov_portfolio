'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { EffectComposer } from '@react-three/postprocessing';

import Fireflies from './Fireflies';
import AtmosphereVeil from '../AtmosphereVeil';
import GhostMesh from './GhostMesh'; // The integrated R3F mesh + eyes
import { AnalogDecay } from './AnalogDecayPass';
import { GHOST_CONFIG } from '@/config/ghostConfig';

type MousePosition = [number, number];

const Scene = ({ mousePosition }: { mousePosition: MousePosition }) => {
  const timeRef = useRef(0);
  const movementRef = useRef(0);
  // Shared vector for tracking position (Atmosphere reads this)
  const lastGhostPosRef = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((_, delta) => {
    timeRef.current += delta;
  });

  return (
    <>
      <ambientLight color={0x0a0a2e} intensity={0.08} />
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

      <GhostMesh
        timeRef={timeRef}
        mouseX={mousePosition[0]}
        mouseY={mousePosition[1]}
        movementRef={movementRef}
        lastGhostPosRef={lastGhostPosRef}
      />

      <Environment preset="apartment" />
      <Fireflies />

      {/* Pass the Vector3 object itself from the ref */}
      <AtmosphereVeil ghostPosition={lastGhostPosRef.current} />
    </>
  );
};

const GhostCanvas = () => {
  const [mousePosition, setMousePosition] = useState<[number, number]>([0, 0]);

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
      className="absolute inset-0 z-0"
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.9,
        }}
        camera={{
          position: GHOST_CONFIG.cameraPosition,
          fov: GHOST_CONFIG.cameraFov,
        }}
        dpr={[1, 2]}
      >
        <Scene mousePosition={mousePosition} />
        <EffectComposer enableNormalPass={false}>
          <AnalogDecay
            grain={GHOST_CONFIG.analogGrain}
            bleeding={GHOST_CONFIG.analogBleeding}
            vsync={GHOST_CONFIG.analogVSync}
            scanlines={GHOST_CONFIG.analogScanlines}
            vignette={GHOST_CONFIG.analogVignette}
            intensity={GHOST_CONFIG.analogIntensity}
            jitter={GHOST_CONFIG.analogJitter}
            limboMode={GHOST_CONFIG.limboMode}
          />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
};

export default GhostCanvas;
