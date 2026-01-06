import HomeHero from '@/components/home/HomeHero';
import ManifestoSection from '@/components/home/ManifestoSection';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import { SiteClosure } from '@/components/layout/SiteClosure';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ManifestoSection />
      <PortfolioShowcase />
      <FeaturedProjectsSection />
      <SiteClosure />
    </>
  );
}
