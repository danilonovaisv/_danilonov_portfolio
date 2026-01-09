'use client';

import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { GHOST_CONFIG } from '@/config/ghostConfig';

// ============================================================================
// Ghost Component (forwardRef para expor posição ao RevealingText)
// ============================================================================
const Ghost = forwardRef<
  Group,
  React.JSX.IntrinsicElements['group'] & { children?: React.ReactNode }
>((props, ref) => {
  const group = useRef<Group>(null);
  const bodyMesh = useRef<Mesh>(null);
  const bodyMaterial = useRef<MeshStandardMaterial>(null);
  const { children, ...rest } = props;

  // Expor o group.current via ref
  useImperativeHandle(ref, () => group.current as Group);

  const { viewport, size } = useThree();
  const targetPosition = useRef(new Vector3(0, 0, 0));
  const prevPosition = useRef(new Vector3(0, 0, 0));

  // Geometria do Ghost (agora atualizada dinamicamente no fragment/vertex shader via onBeforeCompile)
  const ghostGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    return geometry;
  }, []);

  useFrame((state, delta) => {
    if (!group.current || !bodyMesh.current) return;

    const t = state.clock.getElapsedTime();
    const pointer = state.pointer;
    const isMobile = size.width < 768;

    let xTarget: number;
    let yTarget: number;

    if (isMobile) {
      const xAmplitude = viewport.width * 0.35;
      const yAmplitude = viewport.height * 0.25;

      xTarget =
        Math.sin(t * 0.4) * xAmplitude +
        Math.sin(t * 0.15) * (xAmplitude * 0.3);
      yTarget =
        Math.cos(t * 0.3) * yAmplitude + Math.sin(t * 0.2) * (yAmplitude * 0.4);
    } else {
      xTarget = pointer.x * (viewport.width / 3.5);
      yTarget = pointer.y * (viewport.height / 3.5);
    }

    targetPosition.current.set(xTarget, yTarget, 0);

    // Salva posição anterior para cálculos de velocidade/inclinação
    prevPosition.current.copy(group.current.position);

    group.current.position.lerp(
      targetPosition.current,
      GHOST_CONFIG.followSpeed
    );

    // Pulsação do corpo
    if (bodyMaterial.current) {
      const pulse =
        Math.sin(t * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity;
      bodyMaterial.current.emissiveIntensity =
        GHOST_CONFIG.emissiveIntensity + pulse;

      // Injeta tempo nos uniforms do shader customizado
      if (bodyMaterial.current.userData.shader) {
        bodyMaterial.current.userData.shader.uniforms.uTime.value = t;
      }
    }

    // Flutuação vertical e Inclinação orgânica
    const floatY = Math.sin(t * GHOST_CONFIG.floatSpeed) * 0.2;
    bodyMesh.current.position.y = floatY;

    // Calcula velocidade para inclinação dinâmica
    const velocity =
      (group.current.position.x - prevPosition.current.x) / delta;
    const targetRotationZ = -velocity * 0.1;
    bodyMesh.current.rotation.z = THREE.MathUtils.lerp(
      bodyMesh.current.rotation.z,
      targetRotationZ,
      0.1
    );

    // Rotação suave constante
    bodyMesh.current.rotation.y = Math.sin(t * 0.5) * 0.15;
  });

  // Customização do shader para movimento orgânico (Vertex Noise)
  const onBeforeCompile = (shader: {
    uniforms: { [key: string]: any };
    vertexShader: string;
    fragmentShader: string;
  }) => {
    shader.uniforms.uTime = { value: 0 };
    shader.vertexShader = `
      uniform float uTime;
      ${shader.vertexShader}
    `.replace(
      '#include <begin_vertex>',
      `
      #include <begin_vertex>
      
      // Ruído orgânico para o corpo do Ghost
      float n = sin(position.x * 1.5 + position.y * 2.0 + uTime * 1.2) * 0.1;
      n += cos(position.z * 1.5 + position.y * 1.5 - uTime * 0.8) * 0.1;
      
      transformed.xyz += normal * n;
      
      // Deformação da cauda na base
      if (position.y < 0.5) {
        float falloff = pow(1.0 - (position.y + 2.0) / 2.5, 2.0);
        float tailMove = sin(uTime * 2.0 + position.y * 3.0) * 0.4 * falloff;
        transformed.x += sin(uTime * 1.5 + position.y * 2.0) * 0.2 * falloff;
        transformed.z += cos(uTime * 1.5 + position.y * 2.0) * 0.2 * falloff;
        transformed.y += tailMove;
      }
      `
    );
    bodyMaterial.current!.userData.shader = shader;
  };

  return (
    <group ref={group} scale={GHOST_CONFIG.ghostScale} {...rest}>
      {/* Iluminação direcional que acompanha o Ghost */}
      <directionalLight
        position={[-8, 6, -4]}
        intensity={GHOST_CONFIG.rimLightIntensity}
        color={GHOST_CONFIG.glowColor}
      />
      <directionalLight
        position={[8, -4, -6]}
        intensity={GHOST_CONFIG.rimLightIntensity}
        color={GHOST_CONFIG.eyeGlowColor}
      />

      {/* Corpo do Ghost */}
      <mesh ref={bodyMesh} geometry={ghostGeometry}>
        <meshStandardMaterial
          ref={bodyMaterial}
          color={GHOST_CONFIG.bodyColor}
          emissive={GHOST_CONFIG.glowColor}
          emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
          transparent
          opacity={GHOST_CONFIG.ghostOpacity}
          roughness={0.0}
          metalness={0.1}
          side={THREE.DoubleSide}
          toneMapped={false}
          onBeforeCompile={onBeforeCompile}
        />

        {children}
      </mesh>
    </group>
  );
});

Ghost.displayName = 'Ghost';
export default Ghost;
