'use client';

import React from 'react';
import { AboutHero } from '@/components/sobre/AboutHero';
import AboutOrigin from '@/components/sobre/AboutOrigin';
import { AboutWhatIDo } from '@/components/sobre/AboutWhatIDo';
import AboutMethod from '@/components/sobre/AboutMethod';
import { AboutBeliefs } from '@/components/sobre/AboutBeliefs';
import { AboutClosing } from '@/components/sobre/AboutClosing';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-(--ghost-bg) text-white">
      <AboutHero />
      <AboutOrigin />
      <AboutWhatIDo />
      <AboutMethod />
      <AboutBeliefs />
      <AboutClosing />
    </main>
  );
}
