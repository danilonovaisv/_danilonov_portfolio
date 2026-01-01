// src/components/GhostHeroCanvas.tsx
'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Preloader } from './Preloader';

type Props = { className?: string; bloom?: boolean };

export function GhostHeroCanvas({ className, bloom = true }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const reduced = useMemo(
    () =>
      (typeof window !== 'undefined' &&
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) ||
      false,
    []
  );

  const init = useCallback(async () => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 12);
    scene.add(camera);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const key = new THREE.DirectionalLight(0xffffff, 1.2);
    key.position.set(4, 7, 10);
    scene.add(ambient, key);

    const geometry = new THREE.IcosahedronGeometry(4, 4);
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 0.0,
      roughness: 0.05,
      transmission: 1.0,
      thickness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      color: new THREE.Color('#ffffff'),
    });
    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    const particles = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array(3 * 200), 3)
      ),
      new THREE.PointsMaterial({
        size: 0.03,
        color: 0xffffff,
        transparent: true,
        opacity: 0.6,
      })
    );
    const arr = (
      particles.geometry.getAttribute('position') as THREE.BufferAttribute
    ).array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (Math.random() - 0.5) * 10;
      arr[i + 1] = (Math.random() - 0.5) * 10;
      arr[i + 2] = (Math.random() - 0.5) * 10;
    }
    scene.add(particles);
    particles.geometry.attributes.position.needsUpdate = true;

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const mouse = new THREE.Vector2(0, 0);
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    container.addEventListener('pointermove', onPointerMove, { passive: true });

    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.016;
      if (!reduced) {
        orb.rotation.x += 0.003;
        orb.rotation.y += 0.004;
        orb.position.x = Math.sin(t * 0.6) * 0.4 + mouse.x * 0.3;
        orb.position.y = Math.sin(t * 0.7) * 0.3 + mouse.y * 0.3;
        particles.rotation.y += 0.001;
        particles.rotation.x += 0.0007;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    setTimeout(() => setReady(true), reduced ? 100 : 1200);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('pointermove', onPointerMove);
      ro.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      particles.geometry.dispose();
      (particles.material as THREE.Material).dispose?.();
      container.removeChild(renderer.domElement);
    };
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => setReady(true), 100);
      return () => clearTimeout(t);
    }
    const cleanup = init();
    return () => {
      cleanup?.then((fn) => fn && fn());
    };
  }, [init, reduced]);

  return (
    <div
      className={'relative w-full ' + (className ?? '')}
      aria-label="hero-3d"
    >
      {!reduced && <div ref={mountRef} className="absolute inset-0 -z-0" />}
      <Preloader ready={ready} />
    </div>
  );
}
