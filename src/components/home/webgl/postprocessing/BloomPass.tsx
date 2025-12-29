import { useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { UnrealBloomPass } from 'three-stdlib';

type BloomPassProps = {
  intensity?: number;
  threshold?: number;
  radius?: number;
};

export default function BloomPass({
  intensity = 3.2,
  threshold = 0.08,
  radius = 0.85,
}: BloomPassProps) {
  const resolution = useMemo(() => new THREE.Vector2(1, 1), []);
  const bloomPass = useMemo(
    () => new UnrealBloomPass(resolution, intensity, radius, threshold),
    [resolution, intensity, radius, threshold]
  );

  useEffect(() => {
    bloomPass.strength = intensity;
    bloomPass.radius = radius;
    bloomPass.threshold = threshold;
  }, [bloomPass, intensity, radius, threshold]);

  return <primitive object={bloomPass} />;
}
