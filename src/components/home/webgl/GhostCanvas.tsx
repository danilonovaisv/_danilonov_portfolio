import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Float, Sparkles, shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing';

// Shader Fresnel Customizado (BLUE ENERGY)
const FresnelMaterial = shaderMaterial(
  {
    uTime: 0,
    uColor: new THREE.Color(0.2, 0.5, 3.0), // Azul HDR Base
    uRimColor: new THREE.Color(0.5, 1.5, 6.0), // Ciano/Branco HDR Borda
    uFresnelBias: 0.1,
    uFresnelScale: 1.5,
    uFresnelPower: 2.0,
  },
  // Vertex Shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec2 vUv;
    uniform float uTime;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      
      // Leve distorção vertex para "respirar"
      vec3 pos = position;
      pos.x += sin(pos.y * 2.0 + uTime) * 0.02;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // Fragment Shader
  `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 uColor;
    uniform vec3 uRimColor;
    uniform float uFresnelBias;
    uniform float uFresnelScale;
    uniform float uFresnelPower;

    void main() {
      vec3 viewDir = normalize(-vPosition);
      float fresnel = uFresnelBias + uFresnelScale * pow(1.0 + dot(viewDir, vNormal), uFresnelPower);
      
      // Cor final mistura base + borda intensa
      vec3 color = mix(uColor, uRimColor, fresnel);
      
      gl_FragColor = vec4(color, 1.0); // Alpha 1.0 para o bloom pegar bem
    }
  `
);

extend({ FresnelMaterial });

function GhostMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);

  useFrame((state, delta) => {
    // 1. Rotate the MESH
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.rotation.y += delta * 0.15;
    }

    // 2. Animate the MATERIAL
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
        {/* @ts-ignore */}
        <fresnelMaterial ref={materialRef} transparent={true} />
      </mesh>
    </Float>
  );
}

export default function GhostCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={[1, 2]}
      gl={{
        antialias: false,
        alpha: true, // IMPORTANTE: Transparência para o mix-blend funcionar
        powerPreference: 'high-performance',
      }}
      camera={{ fov: 35, position: [0, 0, 7] }}
    >
      {/* Removido <color attach="background" /> 
        O fundo deve ser transparente para ver o texto "através" do canvas
      */}

      <GhostMesh />

      {/* Partículas Azuis */}
      <Sparkles
        count={50}
        scale={6}
        size={4}
        speed={0.4}
        opacity={0.6}
        color="#0057FF"
      />

      <EffectComposer>
        <Bloom
          luminanceThreshold={1.2} // Só brilha o que for HDR > 1.0
          mipmapBlur
          intensity={1.5}
          radius={0.6}
        />
        <Noise opacity={0.15} />
        <Vignette eskil={false} offset={0.1} darkness={0.5} />
      </EffectComposer>
    </Canvas>
  );
}
