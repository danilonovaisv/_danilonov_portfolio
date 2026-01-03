// src/components/canvas/home/RevealingText.tsx
'use client';

import { useRef } from 'react';
import { Text, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Material personalizado para o efeito de revelação
const RevealShaderMaterial = shaderMaterial(
  {
    uGhostPos: new THREE.Vector3(0, 0, 0),
    uRevealRadius: 4.0,
    uColor: new THREE.Color('#ffffff'),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uGhostPos;
    uniform float uRevealRadius;
    uniform vec3 uColor;
    varying vec3 vPos;

    void main() {
      // Calcula a distância entre o pixel do texto e o fantasma
      float dist = distance(vPos.xy, uGhostPos.xy);
      
      // Cria o gradiente de revelação (mais visível perto, invisível longe)
      // Ajuste os valores smoothstep para controlar a suavidade da borda
      float alpha = 1.0 - smoothstep(uRevealRadius * 0.3, uRevealRadius, dist);
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `
);

extend({ RevealShaderMaterial });

export default function RevealingText({
  ghostRef,
}: {
  ghostRef: React.RefObject<THREE.Group>;
}) {
  const titleMat = useRef<any>(null);
  const subMat = useRef<any>(null);
  const { viewport } = useThree();

  // Lógica responsiva
  const isMobile = viewport.width < 5;
  const titleSize = isMobile ? 0.5 : 0.85;
  const subtitleSize = titleSize * 0.8; // 20% menor conforme solicitado (4.8vw vs 6vw ratio)

  useFrame(() => {
    // Sincroniza a posição do fantasma com o shader do texto
    if (ghostRef.current) {
      if (titleMat.current)
        titleMat.current.uGhostPos.copy(ghostRef.current.position);
      if (subMat.current)
        subMat.current.uGhostPos.copy(ghostRef.current.position);
    }
  });

  return (
    <group position={[0, 0, -1.0]}>
      {' '}
      {/* Posicionado atrás do fantasma (Z < -0.2) */}
      {/* Título */}
      <Text
        fontSize={titleSize}
        lineHeight={1.1}
        letterSpacing={-0.05}
        textAlign="center"
        position={[0, 0.6, 0]}
        maxWidth={viewport.width * 0.9}
        anchorY="bottom"
      >
        VOCÊ NÃO VÊ{'\n'}O DESIGN.
        <revealShaderMaterial
          ref={titleMat}
          transparent
          uColor="#ffffff"
          uRevealRadius={isMobile ? 3.0 : 4.5}
        />
      </Text>
      {/* Subtítulo */}
      <Text
        fontSize={subtitleSize}
        letterSpacing={0.02}
        textAlign="center"
        position={[0, 0.4, 0]} // Ajuste fino da posição
        maxWidth={viewport.width * 0.9}
        anchorY="top"
      >
        MAS ELE VÊ VOCÊ.
        <revealShaderMaterial
          ref={subMat}
          transparent
          uColor="#cccccc"
          uRevealRadius={isMobile ? 3.0 : 4.5}
        />
      </Text>
    </group>
  );
}
