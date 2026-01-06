'use client';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

// Shader copiado e adaptado da referência (CodePen)
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform vec3 ghostPosition;
  uniform float revealRadius;
  uniform float fadeStrength;
  uniform float baseOpacity;
  uniform float revealOpacity;
  uniform float time;
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  
  void main() {
    float dist = distance(vWorldPosition.xy, ghostPosition.xy);
    
    // Raio pulsante
    float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
    
    // Gradiente suave de revelação
    float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
    reveal = pow(reveal, fadeStrength);
    
    // Mistura entre a opacidade revelada e a opacidade base (escura)
    float opacity = mix(revealOpacity, baseOpacity, reveal);
    
    // Cor escura (quase preta) para esconder o fundo
    gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
  }
`;

interface AtmosphereProps {
  ghostRef: React.RefObject<THREE.Group>; // Precisa saber onde o fantasma está
}

export default function AtmosphereVeil({ ghostRef }: AtmosphereProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
      revealRadius: { value: 35.0 }, // Aumente/diminua para mudar o tamanho da luz
      fadeStrength: { value: 1.7 },
      baseOpacity: { value: 0.95 }, // Quão escuro é o fundo longe do fantasma (0 a 1)
      revealOpacity: { value: 0.05 }, // Quão claro fica perto do fantasma
      time: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.time.value = state.clock.getElapsedTime();

    // Atualiza a posição do shader para seguir o fantasma
    if (ghostRef.current) {
      materialRef.current.uniforms.ghostPosition.value.copy(
        ghostRef.current.position
      );
    }
  });

  return (
    <mesh position={[0, 0, -10]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
