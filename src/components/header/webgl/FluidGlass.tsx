'use client';

import { Canvas } from '@react-three/fiber';
import {
  Scroll,
  Preload,
  ScrollControls,
} from '@react-three/drei';
import { FluidGlassBarProps } from './types';
import { NavItems } from './components/NavItems';
import { ScrollImages } from './components/ScrollImages';
import { Typography } from './components/Typography';
import { BarWrapper } from './components/BarWrapper';

export default function FluidGlassBar({
  navItems = [],
  barProps,
  eventSource,
  followPointer = true,
  className,
}: FluidGlassBarProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 15 }}
      gl={{ alpha: true }}
      eventSource={eventSource as any}
      className={className}
    >
      <ScrollControls
        damping={0.2}
        pages={3}
        distance={0.4}
        enabled={followPointer}
      >
        <NavItems items={navItems} />
        <BarWrapper {...barProps}>
          <Scroll>
            <Typography />
            <ScrollImages />
          </Scroll>
          <Scroll html />
          <Preload />
        </BarWrapper>
      </ScrollControls>
    </Canvas>
  );
}

