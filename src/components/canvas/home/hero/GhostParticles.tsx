import { useMemo } from 'react';
import { getConfigColorHex, GHOST_CONFIG } from '@/config/ghostConfig';

export function GhostParticles() {
  // Memoize creation to prevent churn
  const particles = useMemo(() => {
    return Array.from({ length: GHOST_CONFIG.particleCount }).map((_, i) => ({
      key: `particle-${i}`,
    }));
  }, []);

  return (
    <>
      {particles.map((p) => (
        <mesh key={p.key} visible={true}>
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
