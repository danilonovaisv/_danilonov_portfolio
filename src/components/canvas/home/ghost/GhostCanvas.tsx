'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { extend } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';

import Fireflies from './Fireflies';
import AtmosphereVeil from '../AtmosphereVeil';
import GhostEyes from './GhostEyes';
import { AnalogDecay } from './AnalogDecayPass';
import { GHOST_CONFIG } from '@/config/ghostConfig';

// --- COMPONENTE DO GHOST ---
const GhostModel = ({
  mousePosition,
  time,
}: {
  mousePosition: [number, number];
  time: number;
}) => {
  const group = useRef<THREE.Group>(null!);
  const ghostBody = useRef<THREE.Mesh>(null!);
  const leftEye = useRef<THREE.Mesh>(null!);
  const rightEye = useRef<THREE.Mesh>(null!);
  const leftGlow = useRef<THREE.Mesh>(null!);
  const rightGlow = useRef<THREE.Mesh>(null!);

  // Parâmetros ajustáveis com base na configuração
  const params = useMemo(
    () => ({
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
      baseColor: new THREE.Color(GHOST_CONFIG.bodyColor),
      glowColor: new THREE.Color(GHOST_CONFIG.glowColor),
      eyeGlowColor: new THREE.Color(GHOST_CONFIG.eyeGlowColor),
    }),
    []
  );

  useFrame(() => {
    if (
      !group.current ||
      !ghostBody.current ||
      !leftEye.current ||
      !rightEye.current
    )
      return;

    const [mouseX, mouseY] = mousePosition;
    const targetX = mouseX * 11;
    const targetY = mouseY * 7;

    // Movimento suave do grupo
    group.current.position.x +=
      (targetX - group.current.position.x) * params.followSpeed;
    group.current.position.y +=
      (targetY - group.current.position.y) * params.followSpeed;

    // Animação de flutuação
    const float1 = Math.sin(time * params.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(time * params.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(time * params.floatSpeed * 2.3) * 0.008;
    group.current.position.y += float1 + float2 + float3;

    // Pulsos e respiração no brilho
    const pulse = Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
    const breathe = Math.sin(time * 0.6) * 0.12;
    const currentEmissiveIntensity = params.emissiveIntensity + pulse + breathe;
    (
      ghostBody.current.material as THREE.MeshStandardMaterial
    ).emissiveIntensity = currentEmissiveIntensity;

    // Animações do corpo
    const tiltStrength = 0.1 * params.wobbleAmount;
    const tiltDecay = 0.95;
    const mouseDirection = new THREE.Vector2(
      targetX - group.current.position.x,
      targetY - group.current.position.y
    ).normalize();
    ghostBody.current.rotation.z =
      ghostBody.current.rotation.z * tiltDecay +
      -mouseDirection.x * tiltStrength * (1 - tiltDecay);
    ghostBody.current.rotation.x =
      ghostBody.current.rotation.x * tiltDecay +
      mouseDirection.y * tiltStrength * (1 - tiltDecay);
    ghostBody.current.rotation.y =
      Math.sin(time * 1.4) * 0.05 * params.wobbleAmount;

    // Variação de escala
    const scaleVariation =
      1 + Math.sin(time * 2.1) * 0.025 * params.wobbleAmount + pulse * 0.015;
    const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
    const finalScale = scaleVariation * scaleBreath;
    ghostBody.current.scale.set(finalScale, finalScale, finalScale);

    // Animação dos olhos
    const normalizedMouseSpeed =
      Math.sqrt((mouseX * 10) ** 2 + (mouseY * 10) ** 2) * 0.1; // Aproximação
    const isMoving = normalizedMouseSpeed > params.movementThreshold;
    const targetGlow = isMoving ? 1.0 : 0.0;
    const glowChangeSpeed = isMoving
      ? params.eyeGlowResponse * 2
      : params.eyeGlowResponse;

    if (leftEye.current.material && rightEye.current.material) {
      const leftMat = leftEye.current.material as THREE.MeshBasicMaterial;
      const rightMat = rightEye.current.material as THREE.MeshBasicMaterial;
      const leftGlowMat = leftGlow.current.material as THREE.MeshBasicMaterial;
      const rightGlowMat = rightGlow.current
        .material as THREE.MeshBasicMaterial;

      leftMat.opacity += (targetGlow - leftMat.opacity) * glowChangeSpeed;
      rightMat.opacity = leftMat.opacity; // Igual ao esquerdo
      leftGlowMat.opacity = leftMat.opacity * 0.3;
      rightGlowMat.opacity = leftMat.opacity * 0.3;
    }
  });

  // Geometria do Ghost
  const ghostGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 40, 40);
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

  // Material do Ghost
  const ghostMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: params.baseColor,
      transparent: true,
      opacity: GHOST_CONFIG.ghostOpacity,
      emissive: params.glowColor,
      emissiveIntensity: params.emissiveIntensity,
      roughness: 0.02,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });
  }, [params.baseColor, params.glowColor, params.emissiveIntensity]);

  return (
    <group ref={group}>
      {/* Corpo do Ghost */}
      <mesh ref={ghostBody} geometry={ghostGeometry} material={ghostMaterial} />

      {/* Grupo dos Olhos */}
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
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
          />
        </mesh>
        <mesh ref={rightEye} position={[0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 12, 12]} />
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
          />
        </mesh>

        {/* Olhos - Brilho Externo */}
        <mesh ref={leftGlow} position={[-0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} />
          <meshBasicMaterial
            color={params.eyeGlowColor}
            transparent
            opacity={0}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh ref={rightGlow} position={[0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 12, 12]} />
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

// --- CENÁRIO 3D ---
const Scene = ({ mousePosition }: { mousePosition: [number, number] }) => {
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    setTime((t) => t + delta);
  });

  return (
    <>
      {/* Luzes diretamente no JSX */}
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

      <GhostModel mousePosition={mousePosition} time={time} />
      <Environment preset="apartment" />
      <Fireflies />
      <AtmosphereVeil />
      <GhostEyes color="#ffffff" />
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
        camera={{ position: [0, 0, 20], fov: 75 }}
        dpr={[1, 2]} // Ajuste de resolução para performance
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
            limboMode={GHOST_CONFIG.limboMode}
          />
        </EffectComposer>
      </Canvas>
    </motion.div>
  );
};

export default GhostCanvas;
