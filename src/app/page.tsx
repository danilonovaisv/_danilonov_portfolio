import { Metadata } from 'next';
import HomeHero from '@/components/home/HomeHero';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';

export const metadata: Metadata = {
  title: 'Danilo Novais | Creative Developer & Interactive Designer',
  description:
    'Exploração visual e técnica de Danilo Novais. Creative Developer especializado em WebGL, R3F e experiências digitais interativas de alto impacto.',
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* 1. Hero with Video Expansion */}
      <HomeHero />

      {/* 2. Portfolio Content */}
      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </div>
  );
}
