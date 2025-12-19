import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useIsMobile } from '../../hooks/useIsMobile';
import { AnalogDecay } from './AnalogDecayEffect';

const GhostMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Custom Geometry with Wavy Bottom
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 64, 64);
    const positionAttribute = geo.getAttribute('position');
    const positions = positionAttribute.array;

    // Modify vertices for wavy bottom matching reference logic exactly
    for (let i = 0; i < positions.length; i += 3) {
      if (positions[i + 1] < -0.2) {
        const x = positions[i];
        const z = positions[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        positions[i + 1] = -2.0 + combinedNoise;
      }
    }

    geo.computeVertexNormals();
    return geo;
  }, []);

  // Animate floating with reference params
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(t * 1.6) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        color="#0f2027"
        transparent
        opacity={0.88}
        emissive="#5d8cff"
        emissiveIntensity={5.8} // Reference value
        roughness={0.02}
        metalness={0.0}
        side={THREE.DoubleSide}
      />
      <Eyes />
    </mesh>
  );
};

const Eyes = () => {
  const [blink, setBlink] = useState(false);

  useFrame(() => {
    if (Math.random() > 0.995) {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }
  });

  const eyeScale = blink ? 0.1 : 1;

  return (
    <group>
      {/* Eye Sockets - Deeper and larger as per reference */}
      <mesh position={[-0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
      <mesh position={[0.7, 0.6, 1.9]} scale={[1.1, 1.0, 0.6]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Glowing Eyes */}
      <group scale={[1, eyeScale, 1]}>
        <mesh position={[-0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#00ff80" transparent opacity={0.6} />{' '}
          {/* Green hue */}
        </mesh>
        <mesh position={[0.7, 0.6, 2.0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial color="#00ff80" transparent opacity={0.6} />
        </mesh>

        {/* Outer Glow (BackSide) - Crucial for the fuzzy glow look */}
        <mesh position={[-0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 32, 32]} />
          <meshBasicMaterial
            color="#00ff80"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh position={[0.7, 0.6, 1.95]}>
          <sphereGeometry args={[0.525, 32, 32]} />
          <meshBasicMaterial
            color="#00ff80"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </group>
  );
};

const GhostScene = () => {
  const isMobile = useIsMobile();
  // Reference logic for particles: "visible only in screens > 768px" -> essentially mobile count 0 or very low
  // User instruction said "reduce to 50", but pixel perfect might imply none. I'll stick to 50 for mobile optimization request.
  const particleCount = isMobile ? 50 : 250;

  return (
    <>
      <color attach="background" args={['#06071f']} />

      <ambientLight intensity={0.08} color="#0a0a2e" />
      <directionalLight
        position={[-8, 6, -4]}
        intensity={1.8}
        color="#4a90e2"
      />
      <directionalLight
        position={[8, -4, -6]}
        intensity={1.26}
        color="#50e3c2"
      />

      <group position={[0, 0, 0]}>
        <GhostMesh />
      </group>

      <Sparkles
        count={particleCount}
        scale={[20, 20, 20]} // Larger scale for "atmosphere"
        size={4}
        speed={0.4}
        opacity={0.6}
        color="#5d8cff" // Matching reference particles
      />

      <EffectComposer enableNormalPass={false}>
        {/* Bloom to match reference strength */}
        <Bloom
          luminanceThreshold={0.0}
          mipmapBlur
          intensity={0.3} // Base bloom strength
          radius={1.25}
        />
        {/* Custom Analog Decay Shader from Reference */}
        <AnalogDecay
          analogGrain={0.4}
          analogBleeding={1.0}
          analogVSync={1.0}
          analogScanlines={1.0}
          analogVignette={1.0}
          analogJitter={0.4}
          analogIntensity={0.6}
        />
      </EffectComposer>
    </>
  );
};

export default GhostScene;
