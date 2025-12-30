'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';

const GhostCanvas = dynamic(() => import('@/components/canvas/home/GhostCanvas'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[radial-gradient(circle_at_center,#0b0d3a_0,#06071f_60%)]" />
  ),
});

export default function GhostStage() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    // Fallback visual leve quando o usuário prefere menos motion
    return (
      <div className="h-full w-full bg-[radial-gradient(circle_at_center,#0b0d3a_0,#06071f_60%)]" />
    );
  }

  return <GhostCanvas />;
}
