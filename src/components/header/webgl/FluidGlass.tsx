'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { MeshTransmissionMaterial, Text, RoundedBox } from '@react-three/drei';
import { useRouter } from 'next/navigation';

interface FluidGlassProps {
  mode: 'lens' | 'bar';
  lensProps: {
    scale: number;
    ior: number;
    thickness: number;
    chromaticAberration: number;
    anisotropy: number;
    navItems: { label: string; link: string }[];
  };
}

const GlassBar = ({
  lensProps,
}: {
  lensProps: FluidGlassProps['lensProps'];
}) => {
  const { navItems, ior, thickness, chromaticAberration, anisotropy } =
    lensProps;
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = 0;

  // Bar dimensions
  const barWidth = 7.5;
  const barHeight = 0.7;
  const barDepth = 0.18;

  // Calculate text positions
  const textSpacing = barWidth / (navItems.length + 1);

  return (
    <group>
      {/* Dark Glass Bar */}
      <RoundedBox
        args={[barWidth, barHeight, barDepth]}
        radius={0.35}
        smoothness={8}
      >
        <MeshTransmissionMaterial
          backside
          samples={8}
          resolution={128}
          transmission={0.5}
          roughness={0.18}
          thickness={thickness}
          ior={ior}
          chromaticAberration={chromaticAberration}
          anisotropy={anisotropy}
          distortion={0.08}
          distortionScale={0.12}
          temporalDistortion={0.02}
          color="#050510"
          attenuationColor="#0b1a3f"
          attenuationDistance={0.28}
        />
      </RoundedBox>

      {/* Blue glow outline */}
      <RoundedBox
        args={[barWidth + 0.08, barHeight + 0.08, barDepth - 0.06]}
        radius={0.38}
        smoothness={8}
        position={[0, 0, -0.04]}
      >
        <meshBasicMaterial color="#7c5dff" transparent opacity={0.16} />
      </RoundedBox>

      {/* Navigation Text */}
      <group position={[0, 0, 0.12]}>
        {navItems.map((item, index) => {
          const xPos = -barWidth / 2 + textSpacing * (index + 1);
          const isActive = index === activeIndex;
          return (
            <Text
              key={item.link}
              position={[xPos, 0, 0]}
              fontSize={0.14}
              color={
                isActive
                  ? '#1a68ff'
                  : hoveredIndex === index
                    ? '#ffffff'
                    : '#d8d8d8'
              }
              font="/fonts/RobotoBlack.ttf"
              anchorX="center"
              anchorY="middle"
              letterSpacing={0.02}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer';
                setHoveredIndex(index);
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'auto';
                setHoveredIndex(null);
              }}
              onClick={() => router.push(item.link)}
            >
              {item.label}
            </Text>
          );
        })}
      </group>
    </group>
  );
};

const FluidGlass = ({ lensProps }: FluidGlassProps) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ pointerEvents: 'none' }}
      className="bg-transparent"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[0, 2, 3]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 0, 2]} intensity={0.3} color="#3b82f6" />

      <GlassBar lensProps={lensProps} />
    </Canvas>
  );
};

export default FluidGlass;
