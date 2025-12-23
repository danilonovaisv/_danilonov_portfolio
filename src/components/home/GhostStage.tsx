'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Loading Client-Side only Canvas to avoid SSR issues
const GhostCanvas = dynamic(() => import('./webgl/GhostCanvas'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#050505]" />,
});

const GhostStage: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Suspense fallback={<div className="w-full h-full bg-[#050505]" />}>
        <GhostCanvas />
      </Suspense>
    </div>
  );
};

export default GhostStage;
