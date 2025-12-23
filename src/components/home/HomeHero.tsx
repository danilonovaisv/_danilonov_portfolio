// src/components/home/HomeHero.tsx
import GhostStage from './GhostStage';

export default function HomeHero() {
  return (
    <section className="relative w-full h-full bg-[#050505] overflow-hidden">
      {/* WebGL Atmosfera (z-0) */}
      <GhostStage />

      {/* Overlay Radial (z-10) - integração visual */}
      <div
        className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,#0b0d3a_0%,#050505_60%)] pointer-events-none opacity-60"
        aria-hidden="true"
      />
    </section>
  );
}
