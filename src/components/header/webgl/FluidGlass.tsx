'use client';

import * as THREE from 'three';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  MeshTransmissionMaterial,
  Text,
  Center,
  RoundedBox
} from '@react-three/drei';
import { useRouter } from 'next/navigation';

type Mode = 'lens' | 'bar';

interface FluidGlassProps {
  mode: Mode;
  lensProps: {
    scale: number;
    ior: number;
    thickness: number;
    chromaticAberration: number;
    anisotropy: number;
    navItems: { label: string; link: string }[];
  }
}

const GlassContent = ({ lensProps }: { lensProps: FluidGlassProps['lensProps'] }) => {
  const { navItems, ior, thickness, chromaticAberration, anisotropy } = lensProps;
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Calculate width based on items roughly
  // 4 items.
  // We want to fill the viewport mostly.

  
  // Create a bar shape
  // Viewport width/height matches the 600px/80px ratio effectively.
  
  return (
    <group>
      {/* Navigation Text */}
      <group position={[0, 0, -1]}>
        <Center>
            <group>
                {navItems.map((item, index) => {
                    const spacing = 1.2;
                    const xPos = (index - (navItems.length - 1) / 2) * spacing;
                    return (
                        <Text
                            key={item.link}
                            position={[xPos, 0, 0]}
                            fontSize={0.22}
                            color={hoveredIndex === index ? "#ffffff" : "#cccccc"}
                            font="/fonts/Inter-Medium.woff" // Assuming font exists or fallback
                            anchorX="center"
                            anchorY="middle"
                            onPointerOver={() => { document.body.style.cursor = 'pointer'; setHoveredIndex(index); }}
                            onPointerOut={() => { document.body.style.cursor = 'auto'; setHoveredIndex(null); }}
                            onClick={() => router.push(item.link)}
                        >
                            {item.label}
                        </Text>
                    );
                })}
            </group>
        </Center>
      </group>

      {/* Glass Layer */}
      <RoundedBox args={[6, 0.8, 0.5]} radius={0.4} smoothness={4}>
        <MeshTransmissionMaterial 
            backside
            samples={8}
            resolution={512}
            transmission={1}
            roughness={0.1}
            thickness={thickness}
            ior={ior}
            chromaticAberration={chromaticAberration}
            anisotropy={anisotropy}
            distortion={0.2}
            distortionScale={0.3}
            temporalDistortion={0}
            color="#ffffff"
            background={new THREE.Color('#000000')}
        />
      </RoundedBox>
    </group>
  );
};

const FluidGlass = ({ lensProps }: FluidGlassProps) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 4], fov: 45 }} 
      gl={{ alpha: true }}
      style={{ pointerEvents: 'auto' }} // Enable interaction
    >
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <GlassContent lensProps={lensProps} />
    </Canvas>
  );
};

export default FluidGlass;
