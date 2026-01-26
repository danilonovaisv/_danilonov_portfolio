// components/portfolio/PortfolioShowcaseSection.tsx
'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryFilter from './CategoryFilter'; // Certifique-se que o caminho esteja correto
import PortfolioModalNew from './PortfolioModalNew'; // Certifique-se que o caminho esteja correto
import type { PortfolioProject } from '@/types/project'; // Certifique-se que o tipo esteja correto
// import { PROJECT_CATEGORIES } from '@/data/projects'; // Se for usar dados reais

// Definindo os tipos necessários localmente ou importando de um lugar central
type ProjectCategory = string; // Ou o tipo exato de sua enumeração de categorias

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string; // Usado no overlay, similar ao CodePen
  category: ProjectCategory;
  imageUrl: string; // Ou URL do vídeo
  projectData: PortfolioProject; // Dados completos para o modal
  widthClass?: string; // Para variação de tamanho (opcional)
  heightClass?: string; // Para variação de tamanho (opcional)
}

// Dados de exemplo - Substitua pela sua fonte real de dados
const mockPortfolioItems: ShowcaseItem[] = [
  // Exemplo com base no HTML modelo e estilos atuais
  {
    id: '1',
    title: 'Fringilla Fermentum',
    subtitle: 'Web Design',
    category: 'web',
    imageUrl: '/images/art/p1.jpg', // Use imagens reais
    projectData: {
      id: '1',
      slug: 'projeto-1',
      title: 'Fringilla Fermentum',
      subtitle: 'Um projeto incrível de Web Design',
      displayCategory: 'Web Design',
      category: 'web',
      client: 'Cliente A',
      year: '2025',
      image: '/images/art/p1.jpg', // Imagem principal
      tags: ['React', 'TypeScript'],
      detail: { description: 'Descrição detalhada...' },
      layout: { cols: 'col-span-2', height: 'row-span-2' }, // Exemplo de layout
      landingPageSlug: 'projeto-1', // Se tiver página própria
      type: 'A', // Tipo para o modal
      accentColor: '#0048ff',
    } as PortfolioProject,
    widthClass: 'md:col-span-2',
    heightClass: 'md:row-span-2',
  },
  {
    id: '2',
    title: 'Vestibulum Tellus',
    subtitle: 'Graphic Design',
    category: 'graphic',
    imageUrl: '/images/art/p2.jpg',
    projectData: {
      id: '2',
      slug: 'projeto-2',
      title: 'Vestibulum Tellus',
      subtitle: 'Design gráfico impactante',
      displayCategory: 'Graphic Design',
      category: 'graphic',
      client: 'Cliente B',
      year: '2025',
      image: '/images/art/p2.jpg',
      tags: ['Illustrator', 'Branding'],
      detail: { description: 'Descrição detalhada...' },
      layout: { cols: 'col-span-1', height: 'row-span-1' },
      landingPageSlug: 'projeto-2',
      type: 'B',
      accentColor: '#8705f2',
    } as PortfolioProject,
  },
  // ... adicione mais itens conforme seu portfólio
  // Exemplo com video
  // {
  //   id: '3',
  //   title: 'Motion Concept',
  //   subtitle: 'Motion Graphics',
  //   category: 'video',
  //   imageUrl: '/path/to/video-thumb.jpg', // Thumbnail
  //   projectData: { /* ... */ },
  //   // widthClass, heightClass...
  // }
];

const easing = [0.22, 1, 0.36, 1] as const;

const PortfolioShowcaseSection = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('*');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtra os itens com base na categoria ativa
  const filteredItems = useMemo(() => {
    if (activeCategory === '*') return mockPortfolioItems; // Mostra todos
    return mockPortfolioItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Abre o modal com os dados do projeto
  const openModal = (project: PortfolioProject) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Fecha o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Mapeia os itens filtrados para os cards animados
  const renderedItems = filteredItems.map((item) => (
    <motion.div
      key={item.id}
      layoutId={`card-container-${item.id}`} // Crucial para animação de layout com o modal
      className={`
        relative group overflow-hidden cursor-pointer
        ${item.widthClass || 'col-span-1'} ${item.heightClass || 'row-span-1'}
        aspect-[4/5] // Ajuste o aspect ratio conforme necessário
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: easing }}
      onClick={() => openModal(item.projectData)}
    >
      {/* Imagem de Fundo (ou Video Placeholder) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      />

      {/* Overlay com Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Overlay de Texto (animado como no CodePen) */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 text-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.h3
          className="text-xl md:text-2xl font-semibold mb-1"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: easing, delay: 0.05 }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="text-sm md:text-base text-white/80"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: easing, delay: 0.1 }}
        >
          {item.subtitle}
        </motion.p>
        {/* Botão opcional no overlay */}
        <motion.div
          className="mt-4 px-4 py-2 border border-white/30 rounded-full text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100"
          initial={{ y: 20, opacity: 0 }}
          whileHover={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: easing, delay: 0.15 }}
        >
          View Details
        </motion.div>
      </motion.div>

      {/* Overlay mais escuro no hover */}
      <motion.div
        className="absolute inset-0 bg-black/20 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.3 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </motion.div>
  ));

  return (
    <section className="relative bg-[#0f172a] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Awesome Shots</h2>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            Uma seleção cuidadosa dos nossos trabalhos mais impactantes e inovadores.
          </p>
        </div>

        <div className="mb-10">
          <CategoryFilter
            activeCategory={activeCategory as any} // Ajuste de tipo necessário se ProjectCategory for string
            onChange={setActiveCategory as any} // Ajuste de tipo necessário se onChange esperar tipo específico
          />
        </div>

        <motion.div
          layout // Crucial para animação de layout dos filhos ao filtrar
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout" initial={false}> {/* Animação de entrada/saída dos cards */}
            {renderedItems}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-6">Vamos trabalhar juntos?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 transition-colors duration-200"
            >
              Ver Mais Trabalhos
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              Entrar em Contato
            </a>
          </div>
        </div>
      </div>

      {/* Modal Reutilizado */}
      <PortfolioModalNew
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
};

export default PortfolioShowcaseSection;
