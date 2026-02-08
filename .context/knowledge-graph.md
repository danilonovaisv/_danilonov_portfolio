# Knowledge Graph

## Component Interactions

- **GhostCanvas**: Main WebGL entry point. Hosts `Ghost` (Model) and `Atmosphere`.
- **HeroParticles**: New R3F component. InstancedMesh based. Replaces legacy `GhostParticles`.
- **Loader**: Controls initial loading state. Dispatches 'loaded' event to start animations.

## State Management

- **Zustand**: Used for high-frequency updates (mouse position, scroll progress) to avoid React re-renders.
  - *Store Location*: `src/hooks/useStore.ts` (Verify if exists)

## Shaders

- **Vertex**: Standard `vUv`, `vNormal` passed to fragment.
- **Fragment**: Soft circle alpha blending standard for particles.
