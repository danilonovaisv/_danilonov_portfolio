'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
  ShaderPass,
  GammaCorrectionShader,
} from 'three-stdlib';
import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';
import { AnalogDecayShader } from '@/components/canvas/shaders/AnalogShader';
import { GhostFireflies } from './GhostFireflies';
import { GhostParticles } from './GhostParticles';

// Extender para usar no React Three Fiber
extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass });

export function Ghost({ particleCount = 100 }: { particleCount: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);
  const eyesRef = useRef<THREE.Group>(null!);
  const atmosphereRef = useRef<THREE.Mesh>(null!);
  const composerRef = useRef<EffectComposer | null>(null);
  const bloomPassRef = useRef<UnrealBloomPass | null>(null);
  const analogPassRef = useRef<ShaderPass | null>(null);
  const { viewport, mouse, camera, scene, gl } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);

  // Refs for motion tracking
  const prevPositionRef = useRef(new THREE.Vector3());
  const currentMovementRef = useRef(0);

  // Inicializar o compositor de efeitos com Resize Handler
  useEffect(() => {
    setIsLoaded(true);
    /* 
    if (!gl || !scene || !camera) return;

    // Configurar Bloom e Composer
    // ... disabled for debugging ...
    */
  }, [gl, scene, camera]);

  // Atualizar o shader da atmosfera e Animação
  useFrame(({ clock }) => {
    // Safety check first
    if (!groupRef.current || !atmosphereRef.current) return;

    const t = clock.getElapsedTime();

    // Atualizar posição da atmosfera
    const mat = atmosphereRef.current.material as THREE.ShaderMaterial;
    if (mat.uniforms) {
      mat.uniforms.ghostPosition.value.copy(groupRef.current.position);
      mat.uniforms.time.value = t;
    }

    // Atualizar passos de analog decay
    // if (analogPassRef.current && analogPassRef.current.uniforms) {
    //   analogPassRef.current.uniforms.uTime.value = t;
    //   // uResolution is handled by resize listener now, but we can verify
    // }

    // Movimento do fantasma (Smooth Follow)
    const targetX = mouse.x * viewport.width * 0.3;
    const targetY = mouse.y * viewport.height * 0.5;

    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * GHOST_CONFIG.followSpeed;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * GHOST_CONFIG.followSpeed;

    // Tilt based on velocity (Organic Lag)
    const velocityX = targetX - groupRef.current.position.x;
    const velocityY = targetY - groupRef.current.position.y;

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -velocityX * 0.05,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      velocityY * 0.05,
      0.05
    );

    // Animação flutuante (Idle)
    const float1 = Math.sin(t * GHOST_CONFIG.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(t * GHOST_CONFIG.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(t * GHOST_CONFIG.floatSpeed * 2.3) * 0.008;
    groupRef.current.position.y += float1 + float2 + float3;

    // Pulsar efeito (Heartbeat)
    const pulse1 =
      Math.sin(t * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity;
    const breathe = Math.sin(t * 0.12) * 0.12;

    if (
      bodyRef.current &&
      bodyRef.current.material instanceof THREE.MeshStandardMaterial
    ) {
      bodyRef.current.material.emissiveIntensity =
        GHOST_CONFIG.emissiveIntensity + pulse1 + breathe;
    }

    // Animação dos olhos
    if (
      eyesRef.current &&
      eyesRef.current.userData &&
      eyesRef.current.userData.leftEyeMaterial
    ) {
      const {
        leftEyeMaterial,
        rightEyeMaterial,
        leftOuterGlowMaterial,
        rightOuterGlowMaterial,
      } = eyesRef.current.userData;

      // Calcular movimento
      const prevPos = prevPositionRef.current;
      const movementAmount = prevPos.distanceTo(groupRef.current.position);

      // Update accumulated movement with decay
      currentMovementRef.current =
        currentMovementRef.current * GHOST_CONFIG.eyeGlowDecay +
        movementAmount * (4 - GHOST_CONFIG.eyeGlowDecay);

      // Update previous position for next frame
      prevPos.copy(groupRef.current.position);

      // Atualizar brilho dos olhos com base no movimento
      const isMoving =
        currentMovementRef.current > GHOST_CONFIG.movementThreshold;
      const targetGlow = isMoving ? 0.8 : 0.2;
      const glowChangeSpeed = isMoving
        ? GHOST_CONFIG.eyeGlowResponse * 1
        : GHOST_CONFIG.eyeGlowResponse;

      const newOpacity =
        leftEyeMaterial.opacity +
        (targetGlow - leftEyeMaterial.opacity) * glowChangeSpeed;
      leftEyeMaterial.opacity = newOpacity;
      rightEyeMaterial.opacity = newOpacity;
      leftOuterGlowMaterial.opacity = newOpacity * 0.33;
      rightOuterGlowMaterial.opacity = newOpacity * 0.33;
    }

    // Renderizar com efeitos (SEMPRE, se composer existir)
    // if (composerRef.current && isLoaded) {
    //   composerRef.current.render();
    // }
  }, 1);

  // Criar luzes de contorno
  useEffect(() => {
    if (!scene) return;

    const rimLight1 = new THREE.DirectionalLight(
      '#0059ff',
      GHOST_CONFIG.rimLightIntensity
    );
    rimLight1.position.set(-8, 6, -4);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(
      'rgba(0,234,255,0.85)',
      GHOST_CONFIG.rimLightIntensity * 3.7
    );
    rimLight2.position.set(8, -4, -6);
    scene.add(rimLight2);

    // Luz ambiente mínima
    const ambientLight = new THREE.AmbientLight(0x0a0a2e, 0.8);
    scene.add(ambientLight);

    // Create Eyes
    if (eyesRef.current && !eyesRef.current.children.length) {
      const leftEyeGeometry = new THREE.SphereGeometry(0.12, 12, 12);
      const rightEyeGeometry = new THREE.SphereGeometry(0.12, 12, 12);
      const leftOuterGlowGeometry = new THREE.SphereGeometry(0.22, 12, 12);
      const rightOuterGlowGeometry = new THREE.SphereGeometry(0.22, 12, 12);

      const eyeColor = getConfigColorHex(GHOST_CONFIG.eyeGlowColor);

      const leftEyeMaterial = new THREE.MeshBasicMaterial({
        color: eyeColor,
        transparent: true,
        opacity: 0.8,
      });
      const rightEyeMaterial = new THREE.MeshBasicMaterial({
        color: eyeColor,
        transparent: true,
        opacity: 0.8,
      });
      const leftOuterGlowMaterial = new THREE.MeshBasicMaterial({
        color: eyeColor,
        transparent: true,
        opacity: 0.3,
      });
      const rightOuterGlowMaterial = new THREE.MeshBasicMaterial({
        color: eyeColor,
        transparent: true,
        opacity: 0.3,
      });

      const leftEye = new THREE.Mesh(leftEyeGeometry, leftEyeMaterial);
      const rightEye = new THREE.Mesh(rightEyeGeometry, rightEyeMaterial);
      const leftOuter = new THREE.Mesh(
        leftOuterGlowGeometry,
        leftOuterGlowMaterial
      );
      const rightOuter = new THREE.Mesh(
        rightOuterGlowGeometry,
        rightOuterGlowMaterial
      );

      leftEye.position.set(-0.6, 0.2, 1.6);
      rightEye.position.set(0.6, 0.2, 1.6);
      leftOuter.position.copy(leftEye.position);
      rightOuter.position.copy(rightEye.position);

      eyesRef.current.add(leftEye);
      eyesRef.current.add(rightEye);
      eyesRef.current.add(leftOuter);
      eyesRef.current.add(rightOuter);

      eyesRef.current.userData = {
        leftEyeMaterial,
        rightEyeMaterial,
        leftOuterGlowMaterial,
        rightOuterGlowMaterial,
      };
    }
  }, [scene]);

  return (
    <group name="SAFE_GHOST_DEBUG">
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="cyan" wireframe />
      </mesh>
    </group>
  );
}

export default Ghost;
