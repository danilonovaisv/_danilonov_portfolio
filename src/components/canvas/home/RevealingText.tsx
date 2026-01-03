'use client';

import { useRef, useMemo } from 'react';
import { Text, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { BRAND } from '@/config/brand';

// Shader de Revelação (Mantido igual, pois funciona bem)
const RevealMaterial = shaderMaterial(
  {
    uGhostPos: new THREE.Vector3(0, 0, 0),
    uRevealRadius: 4.0,
    uColor: new THREE.Color('#ffffff'),
    uOpacity: 1.0,
  },
  `
    varying vec3 vPos;
    void main() {
      vPos = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
    }
  `,
  `
    uniform vec3 uGhostPos;
    uniform float uRevealRadius;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying vec3 vPos;

    void main() {
      float dist = distance(vPos.xy, uGhostPos.xy);
      float alpha = 1.0 - smoothstep(uRevealRadius * 0.3, uRevealRadius, dist);
      alpha = max(alpha, 0.0);
      gl_FragColor = vec4(uColor, alpha * uOpacity);
    }
  `
);

extend({ RevealMaterial });

type RevealMaterialType = THREE.ShaderMaterial & {
  uGhostPos: THREE.Vector3;
  uRevealRadius: number;
  uColor: THREE.Color;
  uOpacity: number;
};

// Add to R3F Intrinsic Elements
// eslint-disable-next-line no-unused-vars
declare module '@react-three/fiber' {
  interface ThreeElements {
    revealMaterial: any;
  }
}

export default function RevealingText({
  ghostRef,
}: {
  ghostRef: React.RefObject<THREE.Group | null>;
}) {
  const titleMat = useRef<RevealMaterialType>(null);
  const subMat = useRef<RevealMaterialType>(null);
  const { viewport } = useThree();

  const isMobile = viewport.width < 5.5;

  const config = useMemo(
    () => ({
      // Ajuste visual para bater com "5-8rem" no desktop
      titleSize: isMobile ? 0.55 : 1.2,
      // Ajuste visual para bater com "4-6rem" no desktop
      subSize: isMobile ? 0.35 : 0.85,

      titleY: isMobile ? 0.35 : 0.5,
      subY: isMobile ? -0.35 : -0.4,
      radius: isMobile ? 3.5 : 6.0,
      letterSpacing: -0.05,
    }),
    [isMobile]
  );

  useFrame(() => {
    if (ghostRef.current) {
      const ghostPos = ghostRef.current.position;
      if (titleMat.current) titleMat.current.uGhostPos.copy(ghostPos);
      if (subMat.current) subMat.current.uGhostPos.copy(ghostPos);
    }
  });

  // URL DA FONTE NO SUPABASE (Centralizada)
  const fontUrl = BRAND.fonts.bold;

  return (
    <group position={[0, 0, -1.5]}>
      {/* Título: "VOCÊ NÃO VÊ O DESIGN." */}
      <Text
        font={fontUrl}
        fontSize={config.titleSize}
        lineHeight={0.9} // Leading apertado
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

      {/* Subtítulo: "MAS ELE VÊ VOCÊ." */}
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
          uColor={new THREE.Color('#cccccc')} // Leve contraste
          uRevealRadius={config.radius}
          uOpacity={0.9}
        />
      </Text>
    </group>
  );
}
