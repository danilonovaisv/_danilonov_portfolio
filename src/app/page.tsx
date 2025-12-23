import HomeIntro from '@/components/home/HomeIntro';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import Clients from '@/components/home/Clients';
import Contact from '@/components/home/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* 
        Hero + Manifesto Section 
        (Scroll driven transition handled internally by HomeIntro)
      */}
      <HomeIntro />

      {/* Anchor for automatic scroll from thumb click */}
      <div id="manifesto" className="absolute top-[200vh]" />

      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </main>
  );
}
