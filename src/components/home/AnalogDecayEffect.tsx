import React, { forwardRef, useMemo } from 'react';
import { Uniform } from 'three';
import { Effect } from 'postprocessing';
import * as THREE from 'three';

const fragmentShader = `
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

// Random functions
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float random(float x) {
  return fract(sin(x) * 43758.5453123);
}

// Advanced procedural grain based on film grain simulation
float gaussian(float z, float u, float o) {
  return (1.0 / (o * sqrt(2.0 * 3.1415))) * exp(-(((z - u) * (z - u)) / (2.0 * (o * o))));
}

vec3 grain(vec2 uv, float time, float intensity) {
  float seed = dot(uv, vec2(12.9898, 78.233));
  float noise = fract(sin(seed) * 43758.5453 + time * 2.0);
  noise = gaussian(noise, 0.0, 0.5 * 0.5);
  return vec3(noise) * intensity;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float time = uTime * 1.8;
  vec2 jitteredUV = uv;

  // Analog Jitter - temporal instability
  if (uAnalogJitter > 0.01) {
    float jitterAmount = (random(vec2(floor(time * 60.0))) - 0.5) * 0.003 * uAnalogJitter * uAnalogIntensity;
    jitteredUV.x += jitterAmount;
    jitteredUV.y += (random(vec2(floor(time * 30.0) + 1.0)) - 0.5) * 0.001 * uAnalogJitter * uAnalogIntensity;
  }

  // VHS-style vertical sync roll
  if (uAnalogVSync > 0.01) {
    float vsyncRoll = sin(time * 2.0 + uv.y * 100.0) * 0.02 * uAnalogVSync * uAnalogIntensity;
    float vsyncChance = step(0.95, random(vec2(floor(time * 4.0))));
    jitteredUV.y += vsyncRoll * vsyncChance;
  }

  // Sample texture with jitter
  vec4 color = texture2D(inputBuffer, jitteredUV);

  // Color bleeding/channel separation
  if (uAnalogBleeding > 0.01) {
    float bleedAmount = 0.012 * uAnalogBleeding * uAnalogIntensity;
    float offsetPhase = time * 1.5 + uv.y * 20.0;
    vec2 redOffset = vec2(sin(offsetPhase) * bleedAmount, 0.0);
    vec2 blueOffset = vec2(-sin(offsetPhase * 1.1) * bleedAmount * 0.8, 0.0);

    float r = texture2D(inputBuffer, jitteredUV + redOffset).r;
    float g = texture2D(inputBuffer, jitteredUV).g;
    float b = texture2D(inputBuffer, jitteredUV + blueOffset).b;
    color = vec4(r, g, b, color.a);
  }

  // Improved procedural film grain
  if (uAnalogGrain > 0.01) {
    vec3 grainEffect = grain(uv, time, 0.075 * uAnalogGrain * uAnalogIntensity);
    grainEffect *= (1.0 - color.rgb);
    color.rgb += grainEffect;
  }

  // Scanlines
  if (uAnalogScanlines > 0.01) {
    float scanlineFreq = 600.0 + uAnalogScanlines * 400.0;
    float scanlinePattern = sin(uv.y * scanlineFreq) * 0.5 + 0.5;
    float scanlineIntensity = 0.1 * uAnalogScanlines * uAnalogIntensity;
    color.rgb *= (1.0 - scanlinePattern * scanlineIntensity);

    float horizontalLines = sin(uv.y * scanlineFreq * 0.1) * 0.02 * uAnalogScanlines * uAnalogIntensity;
    color.rgb *= (1.0 - horizontalLines);
  }

  // Vignetting
  if (uAnalogVignette > 0.01) {
    vec2 vignetteUV = (uv - 0.5) * 2.0;
    float vignette = 1.0 - dot(vignetteUV, vignetteUV) * 0.3 * uAnalogVignette * uAnalogIntensity;
    color.rgb *= vignette;
  }

  // Simple Limbo Mode (Black and White)
  if (uLimboMode > 0.5) {
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = vec3(gray);
  }

  outputColor = color;
}
`;

class AnalogDecayEffectImpl extends Effect {
  constructor({
    analogGrain = 0.4,
    analogBleeding = 1.0,
    analogVSync = 1.0,
    analogScanlines = 1.0,
    analogVignette = 1.0,
    analogJitter = 0.4,
    analogIntensity = 0.6,
    limboMode = 0.0,
  } = {}) {
    super('AnalogDecayEffect', fragmentShader, {
      uniforms: new Map<string, Uniform>([
        ['uTime', new Uniform(0)],
        ['uResolution', new Uniform(new THREE.Vector2(1, 1))],
        ['uAnalogGrain', new Uniform(analogGrain)],
        ['uAnalogBleeding', new Uniform(analogBleeding)],
        ['uAnalogVSync', new Uniform(analogVSync)],
        ['uAnalogScanlines', new Uniform(analogScanlines)],
        ['uAnalogVignette', new Uniform(analogVignette)],
        ['uAnalogJitter', new Uniform(analogJitter)],
        ['uAnalogIntensity', new Uniform(analogIntensity)],
        ['uLimboMode', new Uniform(limboMode)],
      ]),
    });
  }

  update(
    renderer: THREE.WebGLRenderer,
    inputBuffer: THREE.WebGLRenderTarget,
    deltaTime: number
  ) {
    const timeUniform = this.uniforms.get('uTime');
    if (timeUniform) {
      timeUniform.value += deltaTime;
    }
  }
}

// Effect component wrapping the custom effect
export const AnalogDecay = forwardRef((props: any, ref) => {
  const effect = useMemo(() => new AnalogDecayEffectImpl(props), [props]);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
