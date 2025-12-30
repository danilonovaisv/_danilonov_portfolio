// src/components/home/webgl/RevealingText.tsx
'use client';

import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Shader personalizado para o efeito de "Reveal"
const revealFragmentShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition; // Recebe a posição mundial do vértice
  
  uniform vec3 uGhostPosition; // Posição do fantasma
  uniform float uRevealRadius; // Raio da "lanterna"
  uniform vec3 uColor;

  void main() {
    // Calcula a distância entre este pixel do texto e o fantasma
    float dist = distance(vWorldPosition.xy, uGhostPosition.xy);
    
    // Cria uma máscara suave (1.0 perto do fantasma, 0.0 longe)
    // smoothstep(edge0, edge1, x): inverte para que fique visível PERTO (1.0) e invisível LONGE (0.0)
    float alpha = 1.0 - smoothstep(0.0, uRevealRadius, dist);
    
    // Aplica a cor e a opacidade calculada
    gl_FragColor = vec4(uColor, alpha);
  }
`;

const revealVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    // Calcula a posição real do vértice no mundo 3D
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

interface RevealingTextProps {
    ghostRef: React.RefObject<THREE.Group | null>; // Referência ao objeto do fantasma
}

export default function RevealingText({ ghostRef }: RevealingTextProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Criamos o material apenas uma vez
    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uGhostPosition: { value: new THREE.Vector3(0, 0, 0) },
                uRevealRadius: { value: 3.5 }, // Aumente/diminua para mudar o tamanho da luz
                uColor: { value: new THREE.Color('#ffffff') }
            },
            vertexShader: revealVertexShader,
            fragmentShader: revealFragmentShader,
            transparent: true,
            depthWrite: false, // Importante para não bugar a transparência com outros objetos
        });
    }, []);

    useFrame(() => {
        // Atualiza a posição do fantasma no shader a cada frame
        if (ghostRef.current && materialRef.current) {
            // Lerp suave para a luz não "tremer" demais se o fantasma se mover rápido
            materialRef.current.uniforms.uGhostPosition.value.lerp(ghostRef.current.position, 0.1);
        }
    });

    return (
        <group position={[0, -1, -2]}> {/* Z = -2 coloca o texto ATRÁS do fantasma */}
            <Text
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                fontSize={0.8}
                maxWidth={8}
                lineHeight={1}
                letterSpacing={-0.05}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                <primitive object={shaderMaterial} ref={materialRef} attach="material" />
                DESIGN, NÃO É{"\n"}SÓ ESTÉTICA.
            </Text>

            <Text
                font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                fontSize={0.25}
                maxWidth={6}
                position={[0, -1.2, 0]} // Subtexto um pouco mais abaixo
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                <primitive object={shaderMaterial} attach="material" />
                [ É INTENÇÃO, É ESTRATÉGIA, É EXPERIÊNCIA ]
            </Text>
        </group>
    );
}