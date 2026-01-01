'use client';

import { Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';

// --- SHADER DA CORTINA (MÁSCARA) ---
const darknessFragmentShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  uniform vec3 uGhostPosition;
  uniform float uRevealRadius;
  uniform vec3 uBackgroundColor; // Cor do fundo do site

  void main() {
    float dist = distance(vWorldPosition.xy, uGhostPosition.xy);
    
    // Lógica da Lanterna Invertida:
    // Perto do fantasma (dist 0) -> Alpha 0.0 (Transparente -> Mostra o texto)
    // Longe do fantasma -> Alpha 1.0 (Opaco -> Esconde o texto com a cor do fundo)
    float alpha = smoothstep(uRevealRadius * 0.3, uRevealRadius, dist);
    
    // Garante opacidade total longe da luz
    alpha = clamp(alpha, 0.0, 1.0);
    
    // Pinta com a cor do fundo e aplica a transparência calculada
    gl_FragColor = vec4(uBackgroundColor, alpha);
  }
`;

const darknessVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

interface RevealingTextProps {
  ghostRef: React.RefObject<THREE.Group | null>;
}

export default function RevealingText({ ghostRef }: RevealingTextProps) {
  const maskMaterialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  // Material da Cortina
  const darknessMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uGhostPosition: { value: new THREE.Vector3(0, 0, 0) },
        uRevealRadius: { value: isMobile ? 2.5 : 3.8 }, // Tamanho da lanterna
        // AQUI: A cor deve ser EXATAMENTE a cor do fundo do Canvas (#050511)
        uBackgroundColor: { value: new THREE.Color('#050511') },
      },
      vertexShader: darknessVertexShader,
      fragmentShader: darknessFragmentShader,
      transparent: true,
      depthWrite: false, // Importante para não bugar a renderização
    });
  }, [isMobile]);

  useFrame(() => {
    // A cortina segue o fantasma para criar o buraco
    if (ghostRef.current && maskMaterialRef.current) {
      maskMaterialRef.current.uniforms.uGhostPosition.value.lerp(
        ghostRef.current.position,
        0.1
      );
    }
  });

  return (
    <group>
      {/* 1. TEXTO BRANCO (Fica atrás da cortina, Z = -0.2) */}
      {/* Usamos fonte padrão para garantir que aparece */}
      <group position={[0, 0.2, -0.2]}>
        {/* TAG */}
        <Text
          fontSize={isMobile ? 0.09 : 0.1}
          position={[0, isMobile ? 1.3 : 1.5, 0]}
          letterSpacing={0.2}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6aAZ9hjp-Ek-_EeA.woff"
        >
          [ BRAND AWARENESS ]
        </Text>

        {/* TÍTULO - Peso Heavy/Bold */}
        <Text
          fontSize={isMobile ? 0.45 : 0.7}
          lineHeight={1}
          textAlign="center"
          anchorX="center"
          anchorY="bottom"
          position={[0, 0.1, 0]}
          color="white"
          fontWeight="bold" // Força o negrito
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
        >
          você não vê
        </Text>
        <Text
          fontSize={isMobile ? 0.45 : 0.7}
          lineHeight={1}
          textAlign="center"
          anchorX="center"
          anchorY="top"
          position={[0, -0.1, 0]}
          color="white"
          fontWeight="bold"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYAZ9hjp-Ek-_EeA.woff"
        >
          o design.
        </Text>

        {/* SUBTÍTULO - Peso Light/Regular */}
        <Text
          fontSize={isMobile ? 0.25 : 0.35}
          position={[0, isMobile ? -1.0 : -1.1, 0]}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color="white"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyFAZ9hjp-Ek-_EeA.woff"
        >
          mas ele vê você.
        </Text>
      </group>

      {/* 2. CORTINA DE ESCURIDÃO (Z = -0.1) */}
      {/* Fica NA FRENTE do texto, escondendo-o, exceto onde o fantasma passa */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
        <primitive
          object={darknessMaterial}
          ref={maskMaterialRef}
          attach="material"
        />
      </mesh>
    </group>
  );
}
