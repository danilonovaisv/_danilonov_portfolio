'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
};

const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'ghost-blue-identity',
    title: 'Identidade Ghost Blue',
    description:
      'Uma marca etérea para startups de tecnologia com camadas de luz, vidro e movimento suave.',
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
    category: 'branding & emoção digital',
  },
  {
    id: 'waveform-studio',
    title: 'Waveform Studio',
    description:
      'Landing page responsiva com motion blur, tipografia condensada e micro-interações áudio-sincronizadas.',
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
    category: 'web & motion',
  },
  {
    id: 'lumina-campaign',
    title: 'Campanha Lumina',
    description:
      'Série de criativos com gradientes intensos, tipografia futurista e narrativa sonora para eventos.',
    image:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
    category: 'campanha & direção de arte',
  },
];

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div
          className={`transition-all duration-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
              portfólio showcase
            </h2>
            <p className="text-blue-400">Let&apos;s build something amazing together</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_PROJECTS.map((project, index) => (
              <article
                key={project.id}
                className="bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 120}ms`,
                }}
              >
                <div className="relative aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 90vw"
                    className="object-cover"
                  />
                  <button
                    type="button"
                    aria-label={`Abrir detalhes do projeto ${project.title}`}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-200"
                  >
                    <span className="sr-only">Ver detalhes</span>
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <title>Play project animation</title>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-400">
                    {project.category}
                  </p>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-sm text-gray-400">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
