'use client';

import { useEffect, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

type GhostCanvasProps = {
  ghostRef?: MutableRefObject<THREE.Group | null>;
};

export default function GhostCanvas({ ghostRef }: GhostCanvasProps) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: true,
      premultipliedAlpha: false,
      stencil: false,
      depth: true,
      preserveDrawingBuffer: false
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.setClearColor(0x000000, 0);
    canvasRef.current.appendChild(renderer.domElement);

    // Setup scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    // Setup post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.3,
      1.25,
      0.0
    );
    composer.addPass(bloomPass);

    // Analog Decay Shader
    const analogDecayShader = {
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uAnalogGrain: { value: 0.4 },
        uAnalogBleeding: { value: 1.0 },
        uAnalogVSync: { value: 1.0 },
        uAnalogScanlines: { value: 1.0 },
        uAnalogVignette: { value: 1.0 },
        uAnalogJitter: { value: 0.4 },
        uAnalogIntensity: { value: 0.6 },
        uLimboMode: { value: 0.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform vec2 uResolution;
        uniform float uAnalogGrain;
        uniform float uAnalogBleeding;
        uniform float uAnalogVSync;
        uniform float uAnalogScanlines;
        uniform float uAnalogVignette;
        uniform float uAnalogJitter;
        uniform float uAnalogIntensity;
        uniform float uLimboMode;
        varying vec2 vUv;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
        }
        
        void main() {
          vec2 uv = vUv;
          float time = uTime * 1.8;
          
          vec2 jitteredUV = uv;
          if (uAnalogJitter > 0.01) {
            float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
            jitteredUV.x += jitterAmount;
            jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
          }
          
          vec4 color = texture2D(tDiffuse, jitteredUV);
          
          if (uAnalogBleeding > 0.01) {
            float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
            float offsetPhase = time * 1.5 + uv.y * 20.0;
            vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
            vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);
            float r = texture2D(tDiffuse, jitteredUV + redOffset).r;
            float g = texture2D(tDiffuse, jitteredUV).g;
            float b = texture2D(tDiffuse, jitteredUV + blueOffset).b;
            color = vec4(r, g, b, color.a);
          }
          
          if (uAnalogGrain > 0.01) {
            vec3 grainEffect = vec3(random(uv + time), random(uv.yx + time), random(uv.yx * 2.0 + time)) * 0.075 * uAnalogGrain * uAnalogIntensity;
            color.rgb += grainEffect * (1.0 - color.rgb);
          }
          
          if (uAnalogScanlines > 0.01) {
            float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
            float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
            float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
            color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);
          }
          
          if (uAnalogVignette > 0.01) {
            vec2 vignetteUV = (uv - 0.5) * 2.0;
            float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
            color.rgb *= vignette;
          }
          
          if (uLimboMode > 0.5) {
            float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
            color.rgb = vec3(gray);
          }
          
          gl_FragColor = color;
        }
      `
    };

    const analogDecayPass = new ShaderPass(analogDecayShader);
    composer.addPass(analogDecayPass);
    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    // Create ghost
    const ghostGroup = new THREE.Group();
    scene.add(ghostGroup);
    if (ghostRef) {
      ghostRef.current = ghostGroup;
    }

    // Ghost geometry
    const ghostGeometry = new THREE.SphereGeometry(2, 40, 40);
    const positionAttribute = ghostGeometry.getAttribute("position");
    const positions = positionAttribute.array;
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
    ghostGeometry.computeVertexNormals();

    // Ghost material
    const ghostMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f2027,
      transparent: true,
      opacity: 0.88,
      emissive: 0x0080ff,
      emissiveIntensity: 5.8,
      roughness: 0.02,
      metalness: 0.0,
      side: THREE.DoubleSide,
      alphaTest: 0.1
    });

    const ghostBody = new THREE.Mesh(ghostGeometry, ghostMaterial);
    ghostGroup.add(ghostBody);

    // Eyes
    const createEyes = () => {
      const eyeGroup = new THREE.Group();
      ghostGroup.add(eyeGroup);
      
      const eyeGeometry = new THREE.SphereGeometry(0.3, 12, 12);
      const leftEyeMaterial = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        transparent: true,
        opacity: 0
      });
      const leftEye = new THREE.Mesh(eyeGeometry, leftEyeMaterial);
      leftEye.position.set(-0.7, 0.6, 2.0);
      eyeGroup.add(leftEye);
      
      const rightEyeMaterial = new THREE.MeshBasicMaterial({
        color: 0x8a2be2,
        transparent: true,
        opacity: 0
      });
      const rightEye = new THREE.Mesh(eyeGeometry, rightEyeMaterial);
      rightEye.position.set(0.7, 0.6, 2.0);
      eyeGroup.add(rightEye);
      
      return { leftEye, rightEye, leftEyeMaterial, rightEyeMaterial };
    };

    const eyes = createEyes();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0a0a2e, 0.08);
    scene.add(ambientLight);

    const rimLight1 = new THREE.DirectionalLight(0x4a90e2, 1.8);
    rimLight1.position.set(-8, 6, -4);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(0x50e3c2, 1.26);
    rimLight2.position.set(8, -4, -6);
    scene.add(rimLight2);

    // Mouse tracking
    const mouse = new THREE.Vector2();
    const prevMouse = new THREE.Vector2();
    const mouseSpeed = new THREE.Vector2();
    let lastMouseUpdate = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseUpdate > 16) {
        prevMouse.x = mouse.x;
        prevMouse.y = mouse.y;
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouseSpeed.x = mouse.x - prevMouse.x;
        mouseSpeed.y = mouse.y - prevMouse.y;
        lastMouseUpdate = now;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    let lastFrameTime = 0;

    function animate(timestamp) {
      requestAnimationFrame(animate);
      const deltaTime = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      if (deltaTime > 100) return;
      
      const timeIncrement = (deltaTime / 16.67) * 0.01;
      time += timeIncrement;

      // Ghost movement
      const targetX = mouse.x * 11;
      const targetY = mouse.y * 7;
      ghostGroup.position.x += (targetX - ghostGroup.position.x) * 0.05;
      ghostGroup.position.y += (targetY - ghostGroup.position.y) * 0.05;

      // Floating animation
      const float1 = Math.sin(time * 1.6 * 1.5) * 0.03;
      const float2 = Math.cos(time * 1.6 * 0.7) * 0.018;
      const float3 = Math.sin(time * 1.6 * 2.3) * 0.008;
      ghostGroup.position.y += float1 + float2 + float3;

      // Pulsing effects
      const pulse1 = Math.sin(time * 1.6) * 0.6;
      const breathe = Math.sin(time * 0.6) * 0.12;
      ghostMaterial.emissiveIntensity = 5.8 + pulse1 + breathe;

      // Body animations
      const mouseDirection = new THREE.Vector2(
        targetX - ghostGroup.position.x,
        targetY - ghostGroup.position.y
      ).normalize();
      const tiltStrength = 0.1 * 0.35;
      const tiltDecay = 0.95;
      ghostBody.rotation.z = ghostBody.rotation.z * tiltDecay + -mouseDirection.x * tiltStrength * (1 - tiltDecay);
      ghostBody.rotation.x = ghostBody.rotation.x * tiltDecay + mouseDirection.y * tiltStrength * (1 - tiltDecay);
      ghostBody.rotation.y = Math.sin(time * 1.4) * 0.05 * 0.35;

      // Scale variations
      const scaleVariation = 1 + Math.sin(time * 2.1) * 0.025 * 0.35 + pulse1 * 0.015;
      const scaleBreath = 1 + Math.sin(time * 0.8) * 0.012;
      const finalScale = scaleVariation * scaleBreath;
      ghostBody.scale.set(finalScale, finalScale, finalScale);

      // Eye glow animation
      const normalizedMouseSpeed = Math.sqrt(mouseSpeed.x * mouseSpeed.x + mouseSpeed.y * mouseSpeed.y) * 8;
      const isMoving = normalizedMouseSpeed > 0.07;
      const targetGlow = isMoving ? 1.0 : 0.0;
      const glowChangeSpeed = isMoving ? 0.31 * 2 : 0.31;
      const newOpacity = eyes.leftEyeMaterial.opacity + (targetGlow - eyes.leftEyeMaterial.opacity) * glowChangeSpeed;
      eyes.leftEyeMaterial.opacity = newOpacity;
      eyes.rightEyeMaterial.opacity = newOpacity;

      // Render
      composer.render();
    }

    // Initialize
    const fakeEvent = new MouseEvent("mousemove", {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2
    });
    window.dispatchEvent(fakeEvent);
    animate(0);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
      bloomPass.setSize(window.innerWidth, window.innerHeight);
      analogDecayPass.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [ghostRef]);

  return <div ref={canvasRef} className="absolute inset-0 z-20" />;
}
