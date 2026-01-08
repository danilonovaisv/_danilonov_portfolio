'use client';

import React, { useRef } from 'react';
import HeroCopy from './hero/HeroCopy';
import GhostCanvas from './hero/GhostCanvas';

export default function HomeHero() {
  const ghostRef = useRef(null);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Canvas do Ghost */}
      <GhostCanvas ghostRef={ghostRef} />
      
      {/* Texto da Hero */}
      <HeroCopy />
    </div>
  );
}
