import { useMemo } from 'react';

export function GhostFireflies() {
  // Memoize random positions to prevent re-generation on re-renders
  const fireflies = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => ({
      key: `firefly-${i}`,
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
    }));
  }, []);

  return (
    <>
      {fireflies.map((fly) => (
        <mesh key={fly.key} position={fly.position}>
          <sphereGeometry args={[0.02, 2, 2]} />
          <meshBasicMaterial color={0xffff44} transparent opacity={0.9} />
          <pointLight intensity={0.8} distance={3} decay={2} color={0xffff44} />
        </mesh>
      ))}
    </>
  );
}
