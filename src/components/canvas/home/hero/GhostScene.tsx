'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePerformanceAdaptive } from '@/hooks/usePerformanceAdaptive';

// Importações de pós-processamento via three-stdlib
// @ts-ignore
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
// @ts-ignore
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
// @ts-ignore
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
// @ts-ignore
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass';
// @ts-ignore
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';

// Refactored Imports
import { analogDecayShaderConfig } from './GhostScene.shaders';
import {
  createAtmosphere,
  createGhost,
  createEyes,
  createFireflies,
  createParticleSystem
} from './GhostScene.factory';

export default function GhostScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const performanceConfig = usePerformanceAdaptive();

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // --- CONFIGURAÇÃO INICIAL E VARIÁVEIS ---

    // Gestão do Preloader (Adaptado para usar Refs)
    const preloaderManager = {
      loadingSteps: 0,
      totalSteps: 5,
      isComplete: false,
      updateProgress: (step: number) => {
        const loadingSteps = Math.min(step, 5);
        const percentage = (loadingSteps / 5) * 100;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${percentage}%`;
        }
      },
      complete: (canvas: HTMLCanvasElement) => {
        if (preloaderManager.isComplete) return;
        preloaderManager.isComplete = true;
        preloaderManager.updateProgress(5);

        setTimeout(() => {
          if (preloaderRef.current)
            preloaderRef.current.classList.add('fade-out');

          canvas.classList.add('fade-in');

          setTimeout(() => {
            if (preloaderRef.current)
              preloaderRef.current.style.display = 'none';
          }, 1000);
        }, 1500);
      },
    };

    // --- THREE.JS SETUP ---

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    preloaderManager.updateProgress(1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
      premultipliedAlpha: false,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: false,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.setClearColor(0x000000, 0);

    // Estilos do Canvas
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.background = 'transparent';

    mountElement.appendChild(renderer.domElement);

    preloaderManager.updateProgress(2);

    // --- PÓS-PROCESSAMENTO ---

    const originalBloomSettings = {
      strength: 0.3,
      radius: 1.25,
      threshold: 0.0,
    };
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      originalBloomSettings.strength,
      originalBloomSettings.radius,
      originalBloomSettings.threshold
    );
    composer.addPass(bloomPass);

    preloaderManager.updateProgress(3);

    const analogDecayPass = new ShaderPass(analogDecayShaderConfig);
    // Initialize resolution
    analogDecayPass.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    composer.addPass(analogDecayPass);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // --- PARÂMETROS ---

    const params = {
      bodyColor: 0x0f2027,
      glowColor: 'blue',
      eyeGlowColor: 'violet',
      ghostOpacity: 0.88,
      ghostScale: 2.4,
      emissiveIntensity: 5.8,
      pulseSpeed: 1.6,
      pulseIntensity: 0.6,
      eyeGlowIntensity: 4.5,
      eyeGlowDecay: 0.95,
      eyeGlowResponse: 0.31,
      rimLightIntensity: 1.8,
      followSpeed: 0.05,
      wobbleAmount: 0.35,
      floatSpeed: 1.6,
      movementThreshold: 0.07,
      particleCount: performanceConfig.particleCount * 5,
      particleDecayRate: 0.005,
      particleColor: 'violet',
      createParticlesOnlyWhenMoving: true,
      particleCreationRate: performanceConfig.quality === 'low' ? 2 : 5,
      revealRadius: 37,
      fadeStrength: 1.7,
      baseOpacity: 0.9,
      revealOpacity: 0.05,
      fireflyGlowIntensity: 4.3,
      fireflySpeed: 0.09,
      analogIntensity: 0.9,
      analogGrain: 0.4,
      analogBleeding: 0.9,
      analogVSync: 1.7,
      analogScanlines: 1.0,
      analogVignette: 2.4,
      analogJitter: 0.5,
      limboMode: false,
    };

    // --- OBJETOS DA CENA (REFACTORED) ---

    // Atmosfera
    const atmosphere = createAtmosphere(params);
    scene.add(atmosphere.mesh);

    const ambientLight = new THREE.AmbientLight(0x0a0a2e, 0.08);
    scene.add(ambientLight);

    // Fantasma
    const ghost = createGhost(params);
    scene.add(ghost.group);

    // Luzes de Borda (Rim Lights) - Mantidas aqui pois são simples
    const rimLight1 = new THREE.DirectionalLight(0x4a90e2, params.rimLightIntensity);
    rimLight1.position.set(-8, 6, -4);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0x50e3c2, params.rimLightIntensity * 0.7);
    rimLight2.position.set(8, -4, -6);
    scene.add(rimLight2);

    preloaderManager.updateProgress(4);

    // Olhos
    const eyes = createEyes(ghost.group, params);

    // Pirilampos
    const fireflySystem = createFireflies(params, performanceConfig.fireflyCount);
    scene.add(fireflySystem.group);

    // Partículas
    const particleSystem = createParticleSystem(params);
    scene.add(particleSystem.group);
    particleSystem.initPool(100);

    // --- DETECÇÃO DE DISPOSITIVO ---
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobileWidth = window.innerWidth <= 768;
    const isMobile = isTouchDevice || isMobileWidth;

    // --- EVENT LISTENERS ---
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const mouse = new THREE.Vector2();
    let hasReceivedMouseInput = false;
    let touchTimeout: NodeJS.Timeout;

    const updateMousePos = (x: number, y: number) => {
      hasReceivedMouseInput = true;
      mouse.x = (x / window.innerWidth) * 2 - 1;
      mouse.y = -(y / window.innerHeight) * 2 + 1;
      clearTimeout(touchTimeout);
      touchTimeout = setTimeout(() => { hasReceivedMouseInput = false; }, 3000);
    };

    const onMouseMove = (e: MouseEvent) => updateMousePos(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) updateMousePos(e.touches[0].clientX, e.touches[0].clientY);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.setSize(window.innerWidth, window.innerHeight);
      analogDecayPass.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // --- LOOP DE ANIMAÇÃO ---
    let time = 0;
    let lastFrameTime = 0;
    let currentMovement = 0;
    let isInitialized = false;
    let animationId: number;
    let lastParticleTime = 0;

    const forceInitialRender = () => {
      for (let i = 0; i < 3; i++) composer.render();
      for (let i = 0; i < 10; i++) particleSystem.create(ghost.group.position);
      composer.render();
      isInitialized = true;
      preloaderManager.complete(renderer.domElement);
    };

    preloaderManager.updateProgress(5);
    setTimeout(forceInitialRender, 100);

    const animate = (timestamp: number) => {
      animationId = requestAnimationFrame(animate);
      if (!isInitialized) return;

      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      if (deltaTime > 100) return;

      const timeIncrement = (deltaTime / 16.67) * 0.01;
      time += timeIncrement;

      // Atualizações de Uniforms
      atmosphere.material.uniforms.time.value = time;
      analogDecayPass.uniforms.uTime.value = time;
      analogDecayPass.uniforms.uLimboMode.value = params.limboMode ? 1.0 : 0.0;

      // Movimento do Fantasma
      let targetX: number;
      let targetY: number;
      const autoSpeed = 0.85;
      const amplitudeX = 9;
      const amplitudeY = 6;
      const autoX = Math.sin(time * autoSpeed) * amplitudeX + Math.cos(time * autoSpeed * 0.5) * 2;
      const autoY = Math.sin(time * autoSpeed * 0.7 + Math.PI / 2) * amplitudeY + Math.sin(time * autoSpeed * 1.3) * 1.5;

      if (!hasReceivedMouseInput) {
        targetX = autoX;
        const scrollOffset = (scrollY / window.innerHeight) * -15;
        targetY = autoY + scrollOffset;
      } else {
        targetX = mouse.x * 12 + autoX * 0.1;
        targetY = mouse.y * 8 + autoY * 0.1 + (scrollY / window.innerHeight) * -15;
      }

      const prevPos = ghost.group.position.clone();
      ghost.group.position.x += (targetX - ghost.group.position.x) * params.followSpeed;
      ghost.group.position.y += (targetY - ghost.group.position.y) * params.followSpeed;
      atmosphere.material.uniforms.ghostPosition.value.copy(ghost.group.position);

      const moveAmt = prevPos.distanceTo(ghost.group.position);
      currentMovement = currentMovement * params.eyeGlowDecay + moveAmt * (1 - params.eyeGlowDecay);

      ghost.group.position.y += Math.sin(time * params.floatSpeed * 1.5) * 0.03;

      const pulse1 = Math.sin(time * params.pulseSpeed) * params.pulseIntensity;
      ghost.material.emissiveIntensity = params.emissiveIntensity + pulse1;

      // Atualizar Olhos
      const isMoving = currentMovement > params.movementThreshold;
      const targetGlow = isMoving ? 1.0 : 0.0;
      const glowChangeSpeed = isMoving ? params.eyeGlowResponse * 2 : params.eyeGlowResponse;
      const newOpacity = eyes.leftEyeMaterial.opacity + (targetGlow - eyes.leftEyeMaterial.opacity) * glowChangeSpeed;

      eyes.leftEyeMaterial.opacity = newOpacity;
      eyes.rightEyeMaterial.opacity = newOpacity;
      eyes.leftOuterGlowMaterial.opacity = newOpacity * 0.3;
      eyes.rightOuterGlowMaterial.opacity = newOpacity * 0.3;

      // Atualizar Partículas (Logica simplificada usando o sistema)
      const shouldCreate = isMobile
        ? currentMovement > 0.003
        : params.createParticlesOnlyWhenMoving
          ? currentMovement > 0.005 && hasReceivedMouseInput
          : currentMovement > 0.005;

      if (shouldCreate && timestamp - lastParticleTime > 100) {
        const count = Math.min(
          params.particleCreationRate,
          Math.max(1, Math.floor(moveAmt * 100))
        );
        Array.from({ length: count }).forEach(() => particleSystem.create(ghost.group.position));
        lastParticleTime = timestamp;
      }

      particleSystem.update(time);

      if (performanceConfig.enablePostProcessing) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    };

    animate(0);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={mountRef} className="fixed inset-0 w-full h-full">
      <div
        ref={preloaderRef}
        className="absolute inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-1000"
      >
        <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-blue-500 transition-all duration-300 ease-out w-0"
          />
        </div>
      </div>
    </div>
  );
}
