'use client';

import AtmosphereVeil from '@/components/canvas/home/AtmosphereVeil';
import Fireflies from '@/components/canvas/home/ghost/Fireflies';
import Ghost from '@/components/canvas/home/Ghost';
import Particles from '@/components/canvas/home/ghost/Particles';
import { GHOST_CONFIG, FLUORESCENT_COLORS } from '@/config/ghostConfig';

export default function Scene() {
  const fogCol =
    (FLUORESCENT_COLORS as any)[GHOST_CONFIG.fogColor] || GHOST_CONFIG.fogColor;
  const ambientCol =
    (FLUORESCENT_COLORS as any)[GHOST_CONFIG.ambientLightColor] ||
    GHOST_CONFIG.ambientLightColor;

  return (
    <>
      <fog
        attach="fog"
        args={[fogCol, GHOST_CONFIG.fogNear, GHOST_CONFIG.fogFar]}
      />
      <AtmosphereVeil />
      <Fireflies />
      <Particles />
      <Ghost />
      <ambientLight
        color={ambientCol}
        intensity={GHOST_CONFIG.ambientLightIntensity}
      />
    </>
  );
}
