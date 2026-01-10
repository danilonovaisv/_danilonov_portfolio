'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree, extend } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { GHOST_CONFIG, getConfigColorHex } from '@/config/ghostConfig';

// Extender para usar no React Three Fiber
extend({ EffectComposer, RenderPass, UnrealBloomPass, ShaderPass, OutputPass });

export function Ghost() {
  const groupRef = useRef<THREE.Group>(null!);
  const bodyRef = useRef<THREE.Mesh>(null!);
  const eyesRef = useRef<THREE.Group>(null!);
  const atmosphereRef = useRef<THREE.Mesh>(null!);
  const composerRef = useRef<any>(null);
  const bloomPassRef = useRef<any>(null);
  const analogPassRef = useRef<any>(null);
  const { viewport, mouse, camera, scene, gl } = useThree();
  const [isLoaded, setIsLoaded] = useState(false);

  // Criar o shader de analog decay
  const analogDecayShader = {
    uniforms: {
      tDiffuse: { value: null },
      uTime: { value: 0.0 },
      uResolution: {
        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
      },
      uAnalogGrain: { value: GHOST_CONFIG.analogGrain },
      uAnalogBleeding: { value: GHOST_CONFIG.analogBleeding },
      uAnalogVSync: { value: GHOST_CONFIG.analogVSync },
      uAnalogScanlines: { value: GHOST_CONFIG.analogScanlines },
      uAnalogVignette: { value: GHOST_CONFIG.analogVignette },
      uAnalogJitter: { value: GHOST_CONFIG.analogJitter },
      uAnalogIntensity: { value: GHOST_CONFIG.analogIntensity },
      uLimboMode: { value: GHOST_CONFIG.limboMode ? 1.0 : 0.0 },
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

      float random(float x) {
        return fract(sin(x) * 43758.5453123);
      }

      float gaussian(float z, float u, float o) {
        return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
      }

      vec3 grain(vec2 uv, float time, float intensity) {
        float seed = dot(uv, vec2(12.9898, 78.233));
        float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
        noise = gaussian(noise, 0.0, 0.5 * 0.5);
        return vec3(noise) * intensity;
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

        if (uAnalogVSync > 0.01) {
          float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
          float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
          jitteredUV.y += vsyncRoll * vsyncChance;
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
          vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
          grainEffect *= (1.0 - color.rgb);
          color.rgb += grainEffect;
        }

        if (uAnalogScanlines > 0.01) {
          float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
          float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
          float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
          color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);

          float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
          color.rgb *= (1.0 - horizontalLines);
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
    `,
  };

  // Inicializar o compositor de efeitos
  useEffect(() => {
    if (!gl || !scene || !camera) return;

    const renderer = gl;
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      GHOST_CONFIG.emissiveIntensity * 0.1,
      1.25,
      0.0
    );
    composer.addPass(bloomPass);
    bloomPassRef.current = bloomPass;

    const analogPass = new ShaderPass(analogDecayShader);
    composer.addPass(analogPass);
    analogPassRef.current = analogPass;

    const outputPass = new OutputPass();
    composer.addPass(outputPass);

    composerRef.current = composer;

    // Forçar renderização inicial
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, [gl, scene, camera]);

  // Deformação da geometria do corpo
  useEffect(() => {
    if (!bodyRef.current) return;
    const geo = bodyRef.current.geometry as THREE.SphereGeometry;
    const pos = geo.attributes.position;
    const array = pos.array as Float32Array;

    for (let i = 0; i < array.length; i += 3) {
      const y = array[i + 1];
      if (y < -0.2) {
        const x = array[i];
        const z = array[i + 2];
        const noise1 = Math.sin(x * 5) * 0.35;
        const noise2 = Math.cos(z * 4) * 0.25;
        const noise3 = Math.sin((x + z) * 3) * 0.15;
        const combinedNoise = noise1 + noise2 + noise3;
        array[i + 1] = -2.0 + combinedNoise;
      }
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  }, []);

  // Criar os olhos
  useEffect(() => {
    if (!eyesRef.current || !groupRef.current) return;

    // Criar soquetes dos olhos
    const socketGeometry = new THREE.SphereGeometry(0.45, 16, 16);
    const socketMaterial = new THREE.MeshBasicMaterial({
      color: '#2c0463',
      transparent: true,
    });

    const leftSocket = new THREE.Mesh(socketGeometry, socketMaterial);
    leftSocket.position.set(-0.7, 0.6, 1.9);
    leftSocket.scale.set(1.1, 1.0, 0.6);
    eyesRef.current.add(leftSocket);

    const rightSocket = new THREE.Mesh(socketGeometry, socketMaterial);
    rightSocket.position.set(0.7, 0.6, 1.9);
    rightSocket.scale.set(1.1, 1.0, 0.6);
    eyesRef.current.add(rightSocket);

    // Criar olhos brilhantes (50% maiores)
    const eyeGeometry = new THREE.SphereGeometry(0.3, 12, 12);

    const leftEyeMaterial = new THREE.MeshBasicMaterial({
      color: getConfigColorHex(GHOST_CONFIG.eyeGlowColor),
      transparent: true,
      opacity: 0,
    });
    const leftEye = new THREE.Mesh(eyeGeometry, leftEyeMaterial);
    leftEye.position.set(-0.7, 0.6, 2.0);
    eyesRef.current.add(leftEye);

    const rightEyeMaterial = new THREE.MeshBasicMaterial({
      color: getConfigColorHex(GHOST_CONFIG.eyeGlowColor),
      transparent: true,
      opacity: 0,
    });
    const rightEye = new THREE.Mesh(eyeGeometry, rightEyeMaterial);
    rightEye.position.set(0.7, 0.6, 2.0);
    eyesRef.current.add(rightEye);

    // Adicionar brilho externo
    const outerGlowGeometry = new THREE.SphereGeometry(0.525, 12, 12);

    const leftOuterGlowMaterial = new THREE.MeshBasicMaterial({
      color: getConfigColorHex(GHOST_CONFIG.eyeGlowColor),
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    });
    const leftOuterGlow = new THREE.Mesh(
      outerGlowGeometry,
      leftOuterGlowMaterial
    );
    leftOuterGlow.position.set(-0.7, 0.6, 1.95);
    eyesRef.current.add(leftOuterGlow);

    const rightOuterGlowMaterial = new THREE.MeshBasicMaterial({
      color: getConfigColorHex(GHOST_CONFIG.eyeGlowColor),
      transparent: true,
      opacity: 0,
      side: THREE.BackSide,
    });
    const rightOuterGlow = new THREE.Mesh(
      outerGlowGeometry,
      rightOuterGlowMaterial
    );
    rightOuterGlow.position.set(0.7, 0.6, 1.95);
    eyesRef.current.add(rightOuterGlow);

    // Armazenar referências para animação
    eyesRef.current.userData = {
      leftEye,
      rightEye,
      leftEyeMaterial,
      rightEyeMaterial,
      leftOuterGlow,
      rightOuterGlow,
      leftOuterGlowMaterial,
      rightOuterGlowMaterial,
    };
  }, []);

  // Criar a atmosfera que revela o fundo
  useEffect(() => {
    if (!atmosphereRef.current) return;

    const atmosphereGeometry = new THREE.PlaneGeometry(200, 300);
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ghostPosition: { value: new THREE.Vector3(0, 0, 0) },
        revealRadius: { value: GHOST_CONFIG.revealRadius },
        fadeStrength: { value: GHOST_CONFIG.fadeStrength },
        baseOpacity: { value: GHOST_CONFIG.baseOpacity },
        revealOpacity: { value: GHOST_CONFIG.revealOpacity },
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 ghostPosition;
        uniform float revealRadius;
        uniform float fadeStrength;
        uniform float baseOpacity;
        uniform float revealOpacity;
        uniform float time;
        varying vec2 vUv;
        varying vec3 vWorldPosition;

        void main() {
          float dist = distance(vWorldPosition.xy, ghostPosition.xy);
          float dynamicRadius = revealRadius + sin(time * 2.0) * 5.0;
          float reveal = smoothstep(dynamicRadius * 0.2, dynamicRadius, dist);
          reveal = pow(reveal, fadeStrength);
          float opacity = mix(revealOpacity, baseOpacity, reveal);
          gl_FragColor = vec4(0.001, 0.001, 0.002, opacity);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    atmosphereRef.current.geometry = atmosphereGeometry;
    atmosphereRef.current.material = atmosphereMaterial;
    atmosphereRef.current.position.z = -50;
    atmosphereRef.current.renderOrder = -50;
  }, []);

  // Atualizar o shader da atmosfera
  useFrame(({ clock }) => {
    if (!isLoaded || !groupRef.current || !atmosphereRef.current) return;

    const t = clock.getElapsedTime();

    // Atualizar posição da atmosfera
    const mat = atmosphereRef.current.material as THREE.ShaderMaterial;
    if (mat.uniforms) {
      mat.uniforms.ghostPosition.value.copy(groupRef.current.position);
      mat.uniforms.time.value = t;
    }

    // Atualizar passos de analog decay
    if (analogPassRef.current && analogPassRef.current.uniforms) {
      analogPassRef.current.uniforms.uTime.value = t;
      analogPassRef.current.uniforms.uResolution.value.set(
        window.innerWidth,
        window.innerHeight
      );
      analogPassRef.current.uniforms.uLimboMode.value = GHOST_CONFIG.limboMode
        ? 1.0
        : 0.0;
    }

    // Movimento do fantasma
    const targetX = mouse.x * viewport.width * 0.5;
    const targetY = mouse.y * viewport.height * 0.5;

    groupRef.current.position.x +=
      (targetX - groupRef.current.position.x) * GHOST_CONFIG.followSpeed;
    groupRef.current.position.y +=
      (targetY - groupRef.current.position.y) * GHOST_CONFIG.followSpeed;

    // Animação flutuante
    const float1 = Math.sin(t * GHOST_CONFIG.floatSpeed * 1.5) * 0.03;
    const float2 = Math.cos(t * GHOST_CONFIG.floatSpeed * 0.7) * 0.018;
    const float3 = Math.sin(t * GHOST_CONFIG.floatSpeed * 2.3) * 0.008;
    groupRef.current.position.y += float1 + float2 + float3;

    // Pulsar efeito
    const pulse1 =
      Math.sin(t * GHOST_CONFIG.pulseSpeed) * GHOST_CONFIG.pulseIntensity;
    const breathe = Math.sin(t * 0.6) * 0.12;

    if (bodyRef.current.material instanceof THREE.MeshStandardMaterial) {
      bodyRef.current.material.emissiveIntensity =
        GHOST_CONFIG.emissiveIntensity + pulse1 + breathe;
    }

    // Animação dos olhos
    if (eyesRef.current && eyesRef.current.userData) {
      const {
        leftEyeMaterial,
        rightEyeMaterial,
        leftOuterGlowMaterial,
        rightOuterGlowMaterial,
      } = eyesRef.current.userData;

      // Calcular movimento
      const prevGhostPosition = new THREE.Vector3().copy(
        groupRef.current.position
      );
      const currentMovement = prevGhostPosition.distanceTo(
        groupRef.current.position
      );

      // Atualizar brilho dos olhos com base no movimento
      const isMoving = currentMovement > GHOST_CONFIG.movementThreshold;
      const targetGlow = isMoving ? 1.0 : 1.0;
      const glowChangeSpeed = isMoving
        ? GHOST_CONFIG.eyeGlowResponse * 2
        : GHOST_CONFIG.eyeGlowResponse;

      const newOpacity =
        leftEyeMaterial.opacity +
        (targetGlow - leftEyeMaterial.opacity) * glowChangeSpeed;
      leftEyeMaterial.opacity = newOpacity;
      rightEyeMaterial.opacity = newOpacity;
      leftOuterGlowMaterial.opacity = newOpacity * 0.3;
      rightOuterGlowMaterial.opacity = newOpacity * 0.3;
    }

    // Renderizar com efeitos
    if (composerRef.current) {
      composerRef.current.render();
    }
  });

  // Criar luzes de contorno
  useEffect(() => {
    if (!scene) return;

    const rimLight1 = new THREE.DirectionalLight(
      '#bf04a6',
      GHOST_CONFIG.rimLightIntensity
    );
    rimLight1.position.set(-8, 6, -4);
    scene.add(rimLight1);

    const rimLight2 = new THREE.DirectionalLight(
      '#bf04a6',
      GHOST_CONFIG.rimLightIntensity * 0.7
    );
    rimLight2.position.set(8, -4, -6);
    scene.add(rimLight2);

    // Luz ambiente mínima
    const ambientLight = new THREE.AmbientLight(0x0a0a2e, 0.08);
    scene.add(ambientLight);
  }, [scene]);

  return (
    <>
      {/* Fantasma */}
      <group ref={groupRef} scale={GHOST_CONFIG.ghostScale} name="ghost">
        {/* Corpo do Fantasma */}
        <mesh ref={bodyRef}>
          <sphereGeometry args={[2, 40, 40]} />
          <meshStandardMaterial
            color={getConfigColorHex(GHOST_CONFIG.bodyColor)}
            roughness={0.02}
            metalness={0.0}
            transparent
            opacity={GHOST_CONFIG.ghostOpacity}
            emissive={getConfigColorHex(GHOST_CONFIG.glowColor)}
            emissiveIntensity={GHOST_CONFIG.emissiveIntensity}
            alphaTest={0.2}
          />
        </mesh>

        {/* Olhos */}
        <group ref={eyesRef} position={[0, 0, 0]}>
          {/* Os olhos serão criados pelo useEffect acima */}
        </group>
      </group>

      {/* Atmosfera que revela o fundo */}
      <mesh ref={atmosphereRef} />

      {/* Fireflies (pontos de luz) */}
      {[...Array(200)].map((_, i) => (
        <mesh
          key={`firefly-${i}`}
          position={[
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 20,
          ]}
        >
          <sphereGeometry args={[0.02, 2, 2]} />
          <meshBasicMaterial color={0xffff44} transparent opacity={0.9} />
          <pointLight intensity={0.8} distance={3} decay={2} color={0xffff44} />
        </mesh>
      ))}

      {/* Partículas (simulação simples) */}
      {[...Array(GHOST_CONFIG.particleCount)].map((_, i) => (
        <mesh key={`particle-${i}`} visible={true}>
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshBasicMaterial
            color={getConfigColorHex(GHOST_CONFIG.particleColor)}
            transparent
            opacity={0}
          />
        </mesh>
      ))}
    </>
  );
}

export default Ghost;
