import Hero from './_components/sections/Hero';
import PortfolioShowcase from './_components/sections/PortfolioShowcase';
import FeaturedProjects from './_components/sections/FeaturedProjects';
import Clients from './_components/sections/Clients';
import Contact from './_components/sections/Contact';

export const metadata = {
  title: 'Danilo Novais | Portfólio',
  description:
    'Design, não é só estética. É intenção, é estratégia, é experiência.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <PortfolioShowcase />
      <FeaturedProjects />
      <Clients />
      <Contact />
    </>
  );
}
