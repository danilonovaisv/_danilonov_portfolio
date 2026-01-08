'use client';

import AtmosphereVeil from '@/components/canvas/home/AtmosphereVeil';
import Fireflies from '@/components/canvas/home/ghost/Fireflies';
import Ghost from '@/components/canvas/home/Ghost';
import Particles from '@/components/canvas/home/ghost/Particles';
import { GHOST_CONFIG } from '@/config/ghostConfig';

export default function Scene() {
  return (
    <>
      <fog
        attach="fog"
        args={[
          GHOST_CONFIG.fogColor,
          GHOST_CONFIG.fogNear,
          GHOST_CONFIG.fogFar,
        ]}
      />
      <AtmosphereVeil />
      <Fireflies />
      <Particles />
      <Ghost />
      <ambientLight
        color={GHOST_CONFIG.ambientLightColor}
        intensity={GHOST_CONFIG.ambientLightIntensity}
      />
    </>
  );
}
