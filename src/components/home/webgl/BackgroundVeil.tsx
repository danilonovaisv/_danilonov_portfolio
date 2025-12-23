import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

const VeilMaterial = shaderMaterial(
  { time: 0 },
  /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  /* glsl */ `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vec3 col = vec3(0.004, 0.008, 0.015);
      float vignette = 1.0 - smoothstep(0.4, 1.0, length(vUv - 0.5) * 1.4);
      col *= vignette;
      gl_FragColor = vec4(col, 0.8);
    }
  `
);

extend({ VeilMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      veilMaterial: any;
    }
  }
}

export default function BackgroundVeil() {
  return (
    <mesh scale={[100, 100, 1]}>
      <planeGeometry />
      {/* @ts-ignore */}
      <veilMaterial key={VeilMaterial.key} time={0} />
    </mesh>
  );
}
