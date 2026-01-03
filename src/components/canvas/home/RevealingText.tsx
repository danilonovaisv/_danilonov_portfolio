import { useRef, useMemo } from 'react';
import { Text, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';

import * as THREE from 'three';

// 1. Definição do Material Shader
const RevealMaterial = shaderMaterial(
  {
    uGhostPos: new THREE.Vector3(0, 0, 0),
    uRevealRadius: 3.5,
    uColor: new THREE.Color('#ffffff'),
    uOpacity: 1.0,
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
    uniform float uOpacity;
    varying vec3 vPos;

    void main() {
      float dist = distance(vPos.xy, uGhostPos.xy);
      float alpha = 1.0 - smoothstep(uRevealRadius * 0.4, uRevealRadius, dist);
      
      if (alpha <= 0.01) discard;
      gl_FragColor = vec4(uColor, alpha * uOpacity);
    }
  `
);

extend({ RevealMaterial });

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
      // Ajuste fino para os tamanhos "5-8rem" e "4-6rem" visuais
      titleSize: isMobile ? 0.6 : 1.0,
      subSize: isMobile ? 0.4 : 0.7,

      // Posições ajustadas para acomodar os CTAs
      titleY: isMobile ? 0.25 : 0.4,
      subY: isMobile ? -0.35 : -0.4,

      radius: isMobile ? 3.0 : 4.5,
      letterSpacing: -0.06, // Tracking-tight agressivo
    }),
    [isMobile]
  );

  useFrame(() => {
    if (ghostRef.current) {
      const ghostPos = ghostRef.current.position;
      // @ts-ignore - Propriedades uniformes existem no shaderMaterial
      if (titleMat.current) titleMat.current.uGhostPos.copy(ghostPos);
      // @ts-ignore
      if (subMat.current) subMat.current.uGhostPos.copy(ghostPos);
    }
  });

  // Fonte: Certifica-te que o ficheiro existe em /public/fonts/
  const fontUrl = '/fonts/TT Norms Pro Bold.woff2';

  return (
    <group position={[0, 0, -1.5]}>
      {/* H1 */}
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

      {/* H2 */}
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
