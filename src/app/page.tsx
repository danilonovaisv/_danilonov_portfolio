import HomeHero from '@/components/home/HomeHero';
import ManifestoThumb from '@/components/home/ManifestoThumb';
import ManifestoSection from '@/components/home/ManifestoSection';
import PortfolioShowcase from '@/components/portfolio/PortfolioShowcase';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import { SiteClosure } from '@/components/layout/SiteClosure';

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ManifestoThumb />
      <ManifestoSection />
      <PortfolioShowcase />
      <FeaturedProjectsSection />
      <SiteClosure />
    </>
  );
}
