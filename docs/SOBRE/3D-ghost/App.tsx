
import React, { Suspense } from 'react';
import GhostScene from './components/GhostScene';
import Overlay from './components/Overlay';

const App: React.FC = () => {
  return (
    <main className="relative w-full h-screen bg-[#040013]">
      {/* Scrollable Content Overlay - Agora atrás da cena 3D (z-0) */}
      <div className="relative z-0">
        <Overlay />
      </div>

      {/* 3D Scene - Agora acima do texto (z-10) com pointer-events-none para permitir interação com o que está atrás */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full text-white animate-pulse font-mono">
            SUMMONING...
          </div>
        }>
          <GhostScene />
        </Suspense>
      </div>
    </main>
  );
};

export default App;
