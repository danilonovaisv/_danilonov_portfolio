'use client';

import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const revealFragmentShader = `
  varying vec3 vWorldPosition;
  uniform vec3 uGhostPosition;
  uniform float uRevealRadius;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    float dist = distance(vWorldPosition.xy, uGhostPosition.xy);
    
    // Suavização da luz (Lanterna)
    float alpha = 1.0 - smoothstep(uRevealRadius * 0.2, uRevealRadius, dist);
    
    // GARANTIA: Nunca deixa o texto totalmente invisível (min 0.05) para debug
    float finalAlpha = max(alpha, 0.05) * uOpacity;
    
    gl_FragColor = vec4(uColor, finalAlpha);
  }
`;

const revealVertexShader = `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

interface RevealingTextProps {
  ghostRef: React.RefObject<THREE.Group>;
}

export default function RevealingText({ ghostRef }: RevealingTextProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uGhostPosition: { value: new THREE.Vector3(0, 0, 0) },
        uRevealRadius: { value: 6.0 }, // Aumentei o raio para ser mais fácil de ver
        uColor: { value: new THREE.Color('#ffffff') },
        uOpacity: { value: 1.0 },
      },
      vertexShader: revealVertexShader,
      fragmentShader: revealFragmentShader,
      transparent: true,
      depthWrite: false,
    });
  }, []);

  useFrame(() => {
    if (ghostRef.current && materialRef.current) {
      // Sincroniza a posição da luz com o fantasma
      materialRef.current.uniforms.uGhostPosition.value.lerp(
        ghostRef.current.position,
        0.1
      );
    }
  });

  // REMOVI A PROPRIEDADE 'font' para usar a fonte padrão (Arial/Roboto)
  // Isso evita erros de carregamento de URL
  return (
    <group position={[0, -0.5, 0]}>
      {' '}
      {/* Z=0 para garantir que não está escondido no fundo */}
      <Text
        fontSize={0.8}
        maxWidth={8}
        lineHeight={1.1}
        letterSpacing={-0.05}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        <primitive object={shaderMaterial} attach="material" />
        DESIGN, NÃO É{'\n'}SÓ ESTÉTICA.
      </Text>
      <Text
        fontSize={0.25}
        maxWidth={6}
        position={[0, -1.2, 0]}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        <primitive object={shaderMaterial} attach="material" />[ É INTENÇÃO, É
        ESTRATÉGIA, É EXPERIÊNCIA ]
      </Text>
    </group>
  );
}
