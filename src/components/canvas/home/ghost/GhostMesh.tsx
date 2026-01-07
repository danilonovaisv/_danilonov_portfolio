'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

type GhostMeshProps = {
  timeRef: React.MutableRefObject<number>;
  mouseX: number;
  mouseY: number;
  movementRef: React.MutableRefObject<number>;
  lastGhostPosRef: React.MutableRefObject<THREE.Vector3>;
};

export default function GhostMesh({
  timeRef,
  mouseX,
  mouseY,
  movementRef,
  lastGhostPosRef,
}: GhostMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  const leftEyeRef = useRef<THREE.Mesh>(null!);
  const rightEyeRef = useRef<THREE.Mesh>(null!);
  const leftGlowRef = useRef<THREE.Mesh>(null!);
  const rightGlowRef = useRef<THREE.Mesh>(null!);

  // Eye opacity state (mutable for performance)
  const eyeOpacityRef = useRef(0);

  // Blink logic
  const [blink, setBlink] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const timeout = () => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
      const nextBlink = Math.random() * 4000 + 2000;
      timer = setTimeout(timeout, nextBlink);
    };
    timer = setTimeout(timeout, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Parameters from config
  const params = useMemo(
    () => ({
      followSpeed: GHOST_CONFIG.followSpeed,
      wobbleAmount: GHOST_CONFIG.wobbleAmount,
      floatSpeed: GHOST_CONFIG.floatSpeed,
      emissiveIntensity: GHOST_CONFIG.emissiveIntensity,
      pulseSpeed: GHOST_CONFIG.pulseSpeed,
      pulseIntensity: GHOST_CONFIG.pulseIntensity,
      bodyColor: new THREE.Color(GHOST_CONFIG.bodyColor),
      glowColor: new THREE.Color(GHOST_CONFIG.glowColor),
    }),
    []
  );

  // Shader modification to add "cloth" deformation at the bottom
  const onBeforeCompile = useMemo(
    () => (shader: any) => {
      // Uniforms
      shader.uniforms.uTime = { value: 0 };

      // Vertex Shader Injection
      shader.vertexShader = `
        uniform float uTime;
        ${shader.vertexShader}
      `;

      // Replace begin_vertex to apply deformation
      // Logic: if (y < -0.2) flatten and add noise
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        
        // Simple Sine Noise
        float noiseFreq = 5.0;
        float noiseAmp = 0.35;
        
        // Check if bottom part
        if (transformed.y < -0.2) {
          float x = transformed.x;
          float z = transformed.z;
          
          float noise1 = sin(x * 5.0) * 0.35;
          float noise2 = cos(z * 4.0) * 0.25;
          float noise3 = sin((x + z) * 3.0) * 0.15;
          float combinedNoise = noise1 + noise2 + noise3;
          
          // Apply flattening + noise
          // Original: positions[i + 1] = -2.0 + combinedNoise;
          transformed.y = -2.0 + combinedNoise;
        }
        `
      );

      // Store shader reference to update uniforms
      meshRef.current.userData.shader = shader;
    },
    []
  );

  useFrame((_, __) => {
    if (!groupRef.current || !meshRef.current) return;

    const time = timeRef.current;

    // Update Shader Time
    if (meshRef.current.userData.shader) {
      meshRef.current.userData.shader.uniforms.uTime.value = time;
    }

    // 1. Follow Mouse
    const targetX = mouseX * GHOST_CONFIG.mouseInfluence.x;
    const targetY = mouseY * GHOST_CONFIG.mouseInfluence.y;

    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * params.followSpeed;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * params.followSpeed;

    // 2. Float Animation
    const float1 = Math.sin(time * params.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(time * params.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(time * params.floatSpeed * 2.3) * 0.008;
    groupRef.current.position.y += float1 + float2 + float3;

    // 3. Movement Detection & Eye Glow
    const dist = lastGhostPosRef.current.distanceTo(groupRef.current.position);
    movementRef.current =
      movementRef.current * GHOST_CONFIG.eyeGlowDecay +
      dist * (1 - GHOST_CONFIG.eyeGlowDecay);
    lastGhostPosRef.current.copy(groupRef.current.position);

    const isMoving = movementRef.current > GHOST_CONFIG.movementThreshold;
    const targetGlow = isMoving ? 1.0 : 0.0;
    const glowChangeSpeed = isMoving
      ? GHOST_CONFIG.eyeGlowResponse * 2
      : GHOST_CONFIG.eyeGlowResponse;
    eyeOpacityRef.current = THREE.MathUtils.lerp(
      eyeOpacityRef.current,
      targetGlow,
      glowChangeSpeed
    );

    // Apply Opacity to Eyes
    if (leftEyeRef.current && rightEyeRef.current) {
      // Blink scaling
      const targetScaleY = blink ? 0.1 : 1;
      const blinkLerp = 0.4;
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(
        leftEyeRef.current.scale.y,
        targetScaleY,
        blinkLerp
      );
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(
        rightEyeRef.current.scale.y,
        targetScaleY,
        blinkLerp
      );

      // Opacity
      const matL = leftEyeRef.current.material as THREE.MeshBasicMaterial;
      const matR = rightEyeRef.current.material as THREE.MeshBasicMaterial;
      const matGL = leftGlowRef.current.material as THREE.MeshBasicMaterial;
      const matGR = rightGlowRef.current.material as THREE.MeshBasicMaterial;

      if (matL) matL.opacity = eyeOpacityRef.current;
      if (matR) matR.opacity = eyeOpacityRef.current;
      if (matGL) matGL.opacity = eyeOpacityRef.current * 0.5;
      if (matGR) matGR.opacity = eyeOpacityRef.current * 0.5;
    }

    // 4. Pulse / Breathe Emissive
    const pulse = Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
    const breathe = Math.sin(time * 0.6) * 0.12;
    const currentEmissiveIntensity = params.emissiveIntensity + pulse + breathe;

    if (meshRef.current.material) {
      (
        meshRef.current.material as THREE.MeshStandardMaterial
      ).emissiveIntensity = currentEmissiveIntensity;
    }

    // 5. Wobble / Rotation
    const tiltStrength = 0.1 * params.wobbleAmount;
    const tiltDecay = 0.95;
    const mouseDirection = new THREE.Vector2(
      targetX - groupRef.current.position.x,
      targetY - groupRef.current.position.y
    ).normalize();

    if (meshRef.current) {
      meshRef.current.rotation.z =
        meshRef.current.rotation.z * tiltDecay +
        -mouseDirection.x * tiltStrength * (1 - tiltDecay);
      meshRef.current.rotation.x =
        meshRef.current.rotation.x * tiltDecay +
        mouseDirection.y * tiltStrength * (1 - tiltDecay);
      meshRef.current.rotation.y =
        Math.sin(time * 1.4) * 0.05 * params.wobbleAmount;

      // 6. Scale Variation
      const scaleVariation =
        1 + Math.sin(time * 2.1) * 0.025 * params.wobbleAmount + pulse * 0.015;
      const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
      const finalScale = scaleVariation * scaleBreath;
      meshRef.current.scale.set(finalScale, finalScale, finalScale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        {/* Same Sphere geometry */}
        <sphereGeometry args={[2, 40, 40]} />
        <meshStandardMaterial
          color={params.bodyColor}
          transparent
          opacity={GHOST_CONFIG.ghostOpacity}
          emissive={params.glowColor}
          emissiveIntensity={params.emissiveIntensity}
          roughness={0.02}
          metalness={0.0}
          side={THREE.DoubleSide}
          onBeforeCompile={onBeforeCompile}
        />
      </mesh>

      {/* EYES INTEGRATED */}
      <group>
        {/* LEFT EYE */}
        <group position={[-0.7, 0.6, 2.0]}>
          <mesh ref={leftEyeRef}>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshBasicMaterial
              color={GHOST_CONFIG.eyeGlowColor}
              transparent
              opacity={0}
            />
          </mesh>
          <mesh ref={leftGlowRef} position={[0, 0, -0.05]}>
            <sphereGeometry args={[0.525, 12, 12]} />
            <meshBasicMaterial
              color={GHOST_CONFIG.eyeGlowColor}
              transparent
              opacity={0}
              side={THREE.BackSide}
            />
          </mesh>
        </group>

        {/* RIGHT EYE */}
        <group position={[0.7, 0.6, 2.0]}>
          <mesh ref={rightEyeRef}>
            <sphereGeometry args={[0.3, 12, 12]} />
            <meshBasicMaterial
              color={GHOST_CONFIG.eyeGlowColor}
              transparent
              opacity={0}
            />
          </mesh>
          <mesh ref={rightGlowRef} position={[0, 0, -0.05]}>
            <sphereGeometry args={[0.525, 12, 12]} />
            <meshBasicMaterial
              color={GHOST_CONFIG.eyeGlowColor}
              transparent
              opacity={0}
              side={THREE.BackSide}
            />
          </mesh>
        </group>
      </group>
    </group>
  );
}
