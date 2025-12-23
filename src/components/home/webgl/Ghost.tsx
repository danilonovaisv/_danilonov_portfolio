'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* =========================
   GHOST MESH
   (The Ethereal Entity)
========================= */
export default function Ghost() {
  const mesh = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  // Create geometry with baked distortion
  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(2, 64, 64);
    const pos = geo.attributes.position;

    // Apply static noise/distortion to initial shape
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // "Ghost skirt" distortion at the bottom
      if (y < -0.5) {
        const noise = Math.sin(x * 4) * 0.2 + Math.cos(z * 4) * 0.2;
        pos.setY(i, y + noise);
        // Widen the bottom slightly
        pos.setX(i, x * (1.0 - y * 0.1));
        pos.setZ(i, z * (1.0 - y * 0.1));
      }
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#000000'), // Base dark
        emissive: new THREE.Color('#4c7aff'), // Blueish glow
        emissiveIntensity: 2.0,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();

    // 1. Levinatation
    mesh.current.position.y = Math.sin(t * 1.5) * 0.1;

    // 2. Mouse Follow (Lerp)
    // Convert mouse (-1 to 1) to world units approx
    const targetX = mouse.x * 2;
    const targetY = mouse.y * 1;

    mesh.current.position.x += (targetX - mesh.current.position.x) * 0.05;
    mesh.current.position.y += (targetY - mesh.current.position.y) * 0.05;

    // 3. Subtle Rotation
    mesh.current.rotation.y = t * 0.2;

    // 4. Pulse Emissive
    material.emissiveIntensity = 2.0 + Math.sin(t * 2.5) * 0.5;
  });

  return (
    <mesh ref={mesh} geometry={geometry} material={material} scale={1.4} />
  );
}
