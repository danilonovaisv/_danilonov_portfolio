'use client';

import React, { forwardRef, useMemo } from 'react';
import { Uniform, WebGLRenderer, WebGLRenderTarget } from 'three';
import { Effect } from 'postprocessing';

// GLSL Fragment Shader: A mágica do visual "VHS/Analógico"
const fragmentShader = `
  uniform float uTime;
  uniform float uIntensity;
  uniform float uSpeed;

  // Função simples de ruído pseudo-aleatório
  float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // Distorção leve nas coordenadas UV baseada no tempo (efeito de onda de calor/scanline)
    vec2 distortedUV = uv;
    float n = noise(vec2(uv.y * 100.0, uTime * uSpeed));
    
    // Deslocamento horizontal aleatório (glitch sutil)
    if (n > 0.98) {
      distortedUV.x += (n - 0.98) * uIntensity * 2.0;
    }

    // Aberração Cromática: Separar canais RGB levemente
    float r = texture2D(inputBuffer, distortedUV + vec2(0.002 * uIntensity, 0.0)).r;
    float g = texture2D(inputBuffer, distortedUV).g;
    float b = texture2D(inputBuffer, distortedUV - vec2(0.002 * uIntensity, 0.0)).b;

    // Scanlines suaves
    float scanline = sin(uv.y * 800.0) * 0.04 * uIntensity;
    
    vec3 color = vec3(r, g, b) - scanline;

    outputColor = vec4(color, inputColor.a);
  }
`;

// Classe de Efeito do Postprocessing
class AnalogDecayEffect extends Effect {
  constructor({ intensity = 0.5, speed = 1.0 }) {
    super('AnalogDecayEffect', fragmentShader, {
      uniforms: new Map([
        ['uTime', new Uniform(0)],
        ['uIntensity', new Uniform(intensity)],
        ['uSpeed', new Uniform(speed)],
      ]),
    });
  }

  update(
    renderer: WebGLRenderer,
    inputBuffer: WebGLRenderTarget,
    deltaTime: number
  ) {
    const uTime = this.uniforms.get('uTime');
    if (uTime) uTime.value += deltaTime;
  }
}

// Wrapper React para o R3F
export const AnalogDecay = forwardRef<
  any,
  { intensity?: number; speed?: number }
>(({ intensity = 0.5, speed = 1.0 }, ref) => {
  const effect = useMemo(
    () => new AnalogDecayEffect({ intensity, speed }),
    [intensity, speed]
  );

  // Atualiza uniforms se as props mudarem via Leva
  useMemo(() => {
    const uIntensity = effect.uniforms.get('uIntensity');
    const uSpeed = effect.uniforms.get('uSpeed');
    if (uIntensity) uIntensity.value = intensity;
    if (uSpeed) uSpeed.value = speed;
  }, [intensity, speed, effect]);

  return <primitive ref={ref} object={effect} dispose={null} />;
});

AnalogDecay.displayName = 'AnalogDecay';
