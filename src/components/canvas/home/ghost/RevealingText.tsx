'use client';

import { useRef } from 'react';
import { Text, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const RevealMaterial = shaderMaterial(
  {
    uGhostPos: new THREE.Vector3(0, 0, 0),
    uRevealRadius: 2.4, // Raio menor para acompanhar o fantasma menor
    uBaseColor: new THREE.Color('#02040a'),
    uRevealColor: new THREE.Color('#ffffff'),
    uOpacity: 2.0,
  },
  `varying vec3 vWorldPosition; void main() { vec4 worldPosition = modelMatrix * vec4(position, 1.0); vWorldPosition = worldPosition.xyz; gl_Position = projectionMatrix * viewMatrix * worldPosition; }`,
  `
    uniform vec3 uGhostPos;
    uniform float uRevealRadius;
    uniform vec3 uBaseColor;
    uniform vec3 uRevealColor;
    uniform float uOpacity;
    varying vec3 vWorldPosition;
    
    float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }

    void main() {
      // Ajuste de sensibilidade da distância
      float dist = distance(vWorldPosition.xy, uGhostPos.xy * 0.8);
      float noise = random(vWorldPosition.xy * 15.0) * 0.1;  
      float radius = uRevealRadius + noise;
      float alpha = 1.0 - smoothstep(radius * 0.4, radius, dist);
      vec3 finalColor = mix(uBaseColor, uRevealColor, alpha);
      gl_FragColor = vec4(finalColor, uOpacity * (0.3 + alpha * 0.7)); 
    }
  `
);

extend({ RevealMaterial });

export default function RevealingText({
  ghostRef,
}: {
  ghostRef?: React.RefObject<THREE.Group | null>;
}) {
  const titleMat = useRef<any>(null);
  const subMat = useRef<any>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  useFrame(() => {
    if (ghostRef?.current) {
      const ghostPos = ghostRef.current.position;
      const radius = isMobile ? 1.2 : 1.4;
      if (titleMat.current) {
        titleMat.current.uGhostPos.lerp(ghostPos, 0.1);
        titleMat.current.uRevealRadius = radius;
      }
      if (subMat.current) {
        subMat.current.uGhostPos.lerp(ghostPos, 0.1);
        subMat.current.uRevealRadius = radius;
      }
    }
  });

  const fontUrl =
    'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/assets/fonts/TT%20Norms%20Pro%20Bold.woff2';

  return (
    <group position={[0, 0, -2]}>
      <Text
        font={fontUrl}
        fontSize={isMobile ? 0.35 : 0.65} // Fonte bem menor (era 1.5)
        fontWeight={900}
        letterSpacing={-0.05}
        textAlign="center"
        position={[0, 0.3, 0]}
        maxWidth={viewport.width * 0.8}
        anchorY="bottom"
      >
        VOCÊ NÃO VÊ{'\n'}O DESIGN.
        {/* @ts-ignore */}
        <revealMaterial ref={titleMat} transparent />
      </Text>

      <Text
        font={fontUrl}
        fontSize={isMobile ? 0.12 : 0.2} // Subtítulo discreto
        fontWeight={500}
        letterSpacing={0.2}
        textAlign="center"
        position={[0, -0.1, 0]}
        maxWidth={viewport.width * 0.8}
        anchorY="top"
      >
        MAS ELE VÊ VOCÊ.
        {/* @ts-ignore */}
        <revealMaterial
          ref={subMat}
          transparent
          uRevealColor={new THREE.Color('#8a9bbd')}
        />
      </Text>
    </group>
  );
}
