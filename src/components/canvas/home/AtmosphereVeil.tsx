'use client';

import React, { useRef } from 'react';
import { extend, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { GHOST_CONFIG } from '@/config/ghostConfig';

// Define the custom shader material
const AtmosphereShaderMaterial = shaderMaterial(
  {
    ghostPosition: new THREE.Vector3(0, 0, 0),
    revealRadius: GHOST_CONFIG.revealRadius,
    fadeStrength: GHOST_CONFIG.fadeStrength,
    baseOpacity: GHOST_CONFIG.atmosphereBackgroundOpacity, // Use correct config
    revealOpacity: GHOST_CONFIG.revealOpacity,
    time: 0,
    color: new THREE.Color(0x0014ff),
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    void main() {
      vUv = uv;
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      vWorldPosition = worldPos.xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform vec3 ghostPosition;
    uniform float revealRadius;
    uniform float fadeStrength;
    uniform float baseOpacity;
    uniform float revealOpacity;
    uniform float time;
    uniform vec3 color;
    
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    void main() {
      // Calculate distance from ghost
      float dist = distance(vWorldPosition.xy, ghostPosition.xy);
      
      // Dynamic pulsing radius
      float dynamicRadius = revealRadius * 0.3 + sin(time * 0.5) * 2.0;
      
      // Reveal mask
      float reveal = smoothstep(dynamicRadius * 0.4, dynamicRadius * 1.5, dist);
      reveal = pow(reveal, fadeStrength);
      
      // Invert reveal: clarity near ghost, fog far away
      float finalOpacity = mix(revealOpacity, baseOpacity, reveal);
      
      // Output color
      gl_FragColor = vec4(color, finalOpacity);
    }
  `
);

extend({ AtmosphereShaderMaterial });

interface AtmosphereVeilProps {
  ghostPosition?: THREE.Vector3;
}

export default function AtmosphereVeil({ ghostPosition }: AtmosphereVeilProps) {
  const materialRef = useRef<any>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.time = state.clock.getElapsedTime();
      if (ghostPosition) {
        materialRef.current.ghostPosition.copy(ghostPosition);
      }
    }
  });

  return (
    <mesh position={[0, 0, -50]} renderOrder={-100}>
      <planeGeometry args={[300, 300]} />
      <atmosphereShaderMaterial
        ref={materialRef}
        transparent
        depthWrite={false}
        color={new THREE.Color('#001040')} // Darker blue base
      />
    </mesh>
  );
}
