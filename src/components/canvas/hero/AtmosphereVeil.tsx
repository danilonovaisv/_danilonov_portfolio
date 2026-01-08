// src/components/canvas/AtmosphereVeil.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHOST_CONFIG } from '@/config/ghostConfig';

// Shader para o véu atmosférico (efeito de lanterna)
const atmosphereVertexShader = `
varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;
  vec4 worldPos = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPos.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const atmosphereFragmentShader = `
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

  // Pulsing reveal radius
  float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;

  // Create smooth reveal gradient
  float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
  reveal = pow(reveal, fadeStrength);

  // Mix between revealed and base opacity
  float opacity = mix(revealOpacity, baseOpacity, reveal);

  // EXTREMELY low RGB values to avoid bloom
  gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
}
`;

export default function AtmosphereVeil({
  ghostPosition,
}: {
  ghostPosition: [number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useEffect(() => {
    if (!meshRef.current || !materialRef.current) return;

    // Atualiza as uniforms do shader
    const uniforms = materialRef.current.uniforms;
    uniforms.ghostPosition.value.set(ghostPosition[0], ghostPosition[1], 0); // Z=0 por enquanto
    uniforms.time.value = 0; // Inicializa o tempo
  }, [ghostPosition]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.getElapsedTime();
    }
  });

  // Cria o material com o shader
  const material = new THREE.ShaderMaterial({
    uniforms: {
      ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
      revealRadius: { value: GHOST_CONFIG.revealRadius },
      fadeStrength: { value: GHOST_CONFIG.fadeStrength },
      baseOpacity: { value: GHOST_CONFIG.baseOpacity },
      revealOpacity: { value: GHOST_CONFIG.revealOpacity },
      time: { value: 0 },
    },
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    transparent: true,
    depthWrite: false,
  });

  // Cria a geometria (plano grande)
  const geometry = new THREE.PlaneGeometry(300, 300);

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -50]} // Posiciona atrás do ghost
      renderOrder={-100} // Garante que fique atrás dos outros elementos
      material={material}
      geometry={geometry}
    />
  );
}
