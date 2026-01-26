// Adicione esta diretiva na primeira linha do arquivo
'use client';

import { useEffect, useState } from 'react';
// ... imports

export default function AntigravityComponent() {
  // Garanta que só roda após a montagem no navegador
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // Retorna null no servidor

  return <div>...</div>;
}
