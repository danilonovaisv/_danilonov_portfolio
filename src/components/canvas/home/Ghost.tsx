'use client';

import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Mesh, MeshStandardMaterial, Vector3 } from 'three';
import { GHOST_CONFIG, resolveFluorescentColor } from '@/config/ghostConfig';
import GhostEyes from '@/components/canvas/home/ghost/GhostEyes';

// ============================================================================
// Ghost Component (forwardRef para expor posição ao RevealingText)
// ============================================================================
const Ghost = forwardRef<Group, React.JSX.IntrinsicElements['group']>(
  (props, ref) => {
    const group = useRef<Group>(null);
    const bodyMesh = useRef<Mesh>(null);
    const bodyMaterial = useRef<MeshStandardMaterial>(null);

    // Expor o group.current via ref
    useImperativeHandle(ref, () => group.current as Group);

    const { viewport, size } = useThree();
    const targetPosition = useRef(new Vector3(0, 0, 0));

    // Geometria do Ghost (modificada para ficar orgânica na base)
    const ghostGeometry = useMemo(() => {
      const geometry = new THREE.SphereGeometry(2, 64, 64);
      const positionAttribute = geometry.getAttribute('position');
      const positions = positionAttribute.array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];
        if (y < -0.2) {
          const noise1 = Math.sin(x * 5) * 0.35;
          const noise2 = Math.cos(z * 4) * 0.25;
          const noise3 = Math.sin((x + z) * 3) * 0.15;
          const combinedNoise = noise1 + noise2 + noise3;
          positions[i + 1] = -2.0 + combinedNoise;
        }
      }
      geometry.computeVertexNormals();
      return geometry;
    }, []);

    useFrame((state) => {
      if (!group.current || !bodyMesh.current) return;

      const { clock, pointer } = state;
      const t = clock.getElapsedTime();
      const isMobile = size.width < 768;

      // ============================================================
      // MOVIMENTO MOBILE AUTOMÁTICO (Lissajous Pattern)
      // O Ghost faz um movimento orgânico que explora toda a Hero,
      // criando uma experiência imersiva mesmo sem interação.
      // Frequências diferentes criam um padrão fluido e não repetitivo.
      // ============================================================
      const mobileTargets = {
        x:
          Math.sin(t * 0.4) * (viewport.width * 0.35) +
          Math.sin(t * 0.15) * (viewport.width * 0.35 * 0.3),
        y:
          Math.cos(t * 0.3) * (viewport.height * 0.25) +
          Math.sin(t * 0.2) * (viewport.height * 0.25 * 0.4),
      };

      const desktopTargets = {
        x: pointer.x * (viewport.width / 3.5),
        y: pointer.y * (viewport.height / 3.5),
      };

      const { x: xTarget, y: yTarget } = isMobile
        ? mobileTargets
        : desktopTargets;

      targetPosition.current.set(xTarget, yTarget, 0);
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
      }

      // Flutuação vertical
      const floatY = Math.sin(t * GHOST_CONFIG.floatSpeed) * 0.2;
      bodyMesh.current.position.y = floatY;

      // Inclinação baseada no movimento
      const moveX = targetPosition.current.x - group.current.position.x;
      bodyMesh.current.rotation.z = -moveX * 0.15;
      bodyMesh.current.rotation.y = Math.sin(t * 0.5) * 0.1;
    });

    // Resolve color names to actual hex values
    const resolvedBodyColor = resolveFluorescentColor(GHOST_CONFIG.bodyColor);
    const resolvedGlowColor = resolveFluorescentColor(GHOST_CONFIG.glowColor);
    const resolvedEyeGlowColor = resolveFluorescentColor(
      GHOST_CONFIG.eyeGlowColor
    );

    return (
      <group ref={group} scale={GHOST_CONFIG.ghostScale} {...props}>
        {/* Iluminação direcional que acompanha o Ghost */}
        <directionalLight
          position={[-8, 6, -4]}
          intensity={GHOST_CONFIG.rimLightIntensity}
          color={resolvedGlowColor}
        />
        <directionalLight
          position={[8, -4, -6]}
          intensity={GHOST_CONFIG.rimLightIntensity}
          color={resolvedEyeGlowColor}
        />

        {/* Corpo do Ghost */}
        <mesh ref={bodyMesh} geometry={ghostGeometry}>
          <meshStandardMaterial
            ref={bodyMaterial}
            color={resolvedBodyColor}
            emissive={resolvedGlowColor}
            emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
            transparent
            opacity={GHOST_CONFIG.ghostOpacity}
            roughness={0.0}
            metalness={0.1}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>

        <GhostEyes color={resolvedEyeGlowColor} position={[0, 0.6, 1.8]} />
      </group>
    );
  }
);

Ghost.displayName = 'Ghost';
export default Ghost;
