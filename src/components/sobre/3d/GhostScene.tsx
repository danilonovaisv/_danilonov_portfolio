import React, { ReactNode, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  Environment,
  Sparkles,
  ContactShadows,
} from '@react-three/drei';
import GhostModel from './GhostModel';
import { ProceduralGhost } from './ProceduralGhost';
import { MotionValue } from 'framer-motion';

interface ThreeErrorBoundaryProps {
  children?: ReactNode;
  fallback: ReactNode;
}

interface ThreeErrorBoundaryState {
  hasError: boolean;
}

class ThreeErrorBoundary extends React.Component<
  ThreeErrorBoundaryProps,
  ThreeErrorBoundaryState
> {
  constructor(props: ThreeErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}



interface GhostSceneProps {
  scrollProgress: MotionValue<number>;
}

const GhostScene: React.FC<GhostSceneProps> = ({ scrollProgress }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.5} />

      {/* Standard cinematic light from docs reference */}
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1.5}
        castShadow
      />

      <pointLight position={[-5, 5, -5]} intensity={1} />

      <Environment preset="city" />

      <Sparkles
        count={60}
        scale={10}
        size={1.5}
        speed={0.3}
        opacity={0.2}
        color="#ffffff"
      />

      {/* Layer 3D - The Ghost follows the scroll prop (Native scroll) */}
      <ThreeErrorBoundary fallback={<ProceduralGhost />}>
        <Suspense fallback={<ProceduralGhost />}>
          <GhostModel scrollProgress={scrollProgress} />
        </Suspense>
      </ThreeErrorBoundary>

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.2}
        scale={10}
        blur={2}
        far={4}
      />
    </Canvas>
  );
};

export default GhostScene;
