import HomeHero from '@/components/home/HomeHero';
import PortfolioShowcaseSection from '@/components/portfolio/PortfolioShowcaseSection';
import FeaturedProjectsSection from '@/components/home/FeaturedProjectsSection';
import ClientsBrandsSection from '@/components/home/ClientsBrandsSection';
import ContactSection from '@/components/home/ContactSection';

export default function Page() {
  return (
    <main>
      <HomeHero />
      <PortfolioShowcaseSection />
      <FeaturedProjectsSection />
      <ClientsBrandsSection />
      <ContactSection />
    </main>
  );
}
