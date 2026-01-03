'use client';

import { useRef, useMemo } from 'react';
import { Text, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Material Shader Simplificado
const RevealMaterial = shaderMaterial(
  {
    uGhostPos: new THREE.Vector3(0, 0, 0),
    uRevealRadius: 4.0,
    uColor: new THREE.Color('#ffffff'),
    uOpacity: 1.0,
  },
  // Vertex Shader
  `
    varying vec3 vPos;
    void main() {
      vPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 uGhostPos;
    uniform float uRevealRadius;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec3 vPos;

    void main() {
      float dist = distance(vPos.xy, uGhostPos.xy);
      // Lógica de revelação: 1.0 (visível) perto, 0.0 (invisível) longe
      float alpha = 1.0 - smoothstep(uRevealRadius * 0.3, uRevealRadius, dist);
      
      // Garante um mínimo de visibilidade (0.02) para debug, se necessário remova para 0.0
      alpha = max(alpha, 0.0); 

      gl_FragColor = vec4(uColor, alpha * uOpacity);
    }
  `
);

extend({ RevealMaterial });

declare module '@react-three/fiber' {
  // eslint-disable-next-line no-unused-vars
  interface ThreeElements {
    revealMaterial: any;
  }
}

export default function RevealingText({
  ghostRef,
}: {
  ghostRef: React.RefObject<THREE.Group | null>;
}) {
  const titleMat = useRef<THREE.ShaderMaterial>(null);
  const subMat = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;

  const config = useMemo(
    () => ({
      titleSize: isMobile ? 0.6 : 1.1,
      subSize: isMobile ? 0.4 : 0.75,
      titleY: isMobile ? 0.3 : 0.5,
      subY: isMobile ? -0.3 : -0.35,
      radius: isMobile ? 3.5 : 5.5, // Raio aumentado para garantir visibilidade
      letterSpacing: -0.05,
    }),
    [isMobile]
  );

  useFrame(() => {
    if (ghostRef.current) {
      const ghostPos = ghostRef.current.position;
      // Atualiza uniformes
      if (titleMat.current) {
        (titleMat.current as any).uGhostPos.copy(ghostPos);
      }
      if (subMat.current) {
        (subMat.current as any).uGhostPos.copy(ghostPos);
      }
    }
  });

  // Caminho da fonte (Certifique-se que TT Norms Pro Bold.woff2 está em public/fonts/)
  const fontUrl = '/fonts/TT Norms Pro Bold.woff2';

  return (
    <group position={[0, 0, -1.5]}>
      {' '}
      {/* Z=-1.5 (Atrás do fantasma) */}
      {/* Título Principal */}
      <Text
        font={fontUrl}
        fontSize={config.titleSize}
        lineHeight={1.0}
        letterSpacing={config.letterSpacing}
        textAlign="center"
        position={[0, config.titleY, 0]}
        maxWidth={viewport.width * 0.9}
        anchorY="bottom"
      >
        VOCÊ NÃO VÊ{'\n'}O DESIGN.
        <revealMaterial
          ref={titleMat}
          transparent
          uColor={new THREE.Color('#ffffff')}
          uRevealRadius={config.radius}
          uOpacity={1.0}
        />
      </Text>
      {/* Subtítulo */}
      <Text
        font={fontUrl}
        fontSize={config.subSize}
        letterSpacing={config.letterSpacing}
        textAlign="center"
        position={[0, config.subY, 0]}
        maxWidth={viewport.width * 0.9}
        anchorY="top"
      >
        MAS ELE VÊ VOCÊ.
        <revealMaterial
          ref={subMat}
          transparent
          uColor={new THREE.Color('#cccccc')}
          uRevealRadius={config.radius}
          uOpacity={0.9}
        />
      </Text>
    </group>
  );
}
