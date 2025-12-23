// src/components/home/HomeHero.tsx
import GhostStage from './GhostStage';

export default function HomeHero() {
  return (
    <section className="relative w-full h-full bg-[#06071f] overflow-hidden">
      {/* WebGL Atmosfera */}
      <GhostStage />

      {/* Overlay Radial (opcional, z-10) */}
      <div
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#06071f_60%)] pointer-events-none"
        aria-hidden="true"
      />
    </section>
  );
}
