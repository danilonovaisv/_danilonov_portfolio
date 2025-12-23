import { Effect } from 'postprocessing';
import { Uniform } from 'three';

const fragmentShader = `
uniform float time;
uniform float intensity;
uniform float speed;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void mainUv(inout vec2 uv) {
  // Horizontal Jitter (Glitchy displacement)
  float noise = random(vec2(floor(uv.y * 100.0), floor(time * 20.0)));
  float jitter = step(0.99, noise) * 0.02 * intensity; // Ocasional jump
  uv.x += jitter;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  // 1. Grain
  float grain = (random(uv + time * speed) - 0.5) * 0.15 * intensity;
  
  // 2. Scanlines (Moving slowly)
  float scanline = sin(uv.y * 200.0 + time * speed * 2.0) * 0.05 * intensity;
  
  // Combine
  vec3 color = inputColor.rgb;
  color += grain;
  color -= scanline; // Subtract to darken lines
  
  // 3. Contrast boost slightly to pop the ghost
  color = color * 1.05;

  outputColor = vec4(color, inputColor.a);
}
`;

export class AnalogDecayEffect extends Effect {
    constructor({ intensity = 1.0, speed = 1.0 } = {}) {
        super('AnalogDecayEffect', fragmentShader, {
            uniforms: new Map([
                ['time', new Uniform(0)],
                ['intensity', new Uniform(intensity)],
                ['speed', new Uniform(speed)],
            ]),
        });
    }

    update(_: any, __: any, delta: number) {
        this.uniforms.get('time')!.value += delta;
    }
}
