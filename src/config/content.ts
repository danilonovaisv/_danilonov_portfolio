export const HOME_CONTENT = {
  hero: {
    title: ['Você não vê o design.'],
    subtitle: '[Mas ele vê você.]',
    cta: 'step inside →',
  },

  showcase: {
    title: 'portfólio showcase',
    floatingLabel: '[what we love working on]',
    cta: {
      label: 'let’s build something great →',
      href: '/portfolio',
    },
    ctas: [
      { label: 'Fale Comigo', href: '#contact', variant: 'primary' },
      {
        label: 'Download CV',
        href: '/cv-danilo-novais.pdf',
        variant: 'secondary',
        download: true,
        external: true,
      },
    ],
    categories: [
      {
        id: 'brand-campaigns',
        label: 'Brand & Campaigns',
        titleDesktop: 'Brand & Campaigns',
        titleMobile: 'Brand & Campaigns',
        align: 'start',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      },
      {
        id: 'videos-motions',
        label: 'Videos & Motions',
        titleDesktop: 'Videos & Motions',
        titleMobile: 'Videos & Motions',
        align: 'center',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
      },
      {
        id: 'websites-tech',
        label: 'Web Campaigns, Websites & Tech',
        titleDesktop: 'Web Campaigns, Websites & Tech',
        titleMobile: 'Websites & Tech',
        align: 'end',
        thumb:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
      },
    ],
  },

  featuredProjects: [
    {
      id: 1,
      slug: 'branding-project',
      title: 'BRANDING PROJECT',
      category: 'Branding',
      client: 'Client A',
      year: 2024,
      tags: ['Strategy', 'Identity'],
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
      layout: {
        h: 'h-[400px] md:h-[500px]',
        cols: 'md:col-span-8',
        sizes: '(max-width: 768px) 100vw, 50vw',
      },
    },
    {
      id: 2,
      slug: 'key-visual',
      title: 'KEY VISUAL',
      category: 'Visual Design',
      client: 'Client B',
      year: 2024,
      tags: ['Art Direction'],
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
      layout: {
        h: 'h-[400px] md:h-[500px]',
        cols: 'md:col-span-4',
        sizes: '(max-width: 768px) 100vw, 33vw',
      },
    },
    {
      id: 3,
      slug: 'welcome-ad',
      title: 'WELCOME AD',
      category: 'Advertising',
      client: 'Client C',
      year: 2024,
      tags: ['Motion', 'Campaign'],
      img: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/WelcomeAd_800x500px.webp',
      layout: {
        h: 'h-[400px] md:h-[500px]',
        cols: 'md:col-span-12',
        sizes: '(max-width: 768px) 100vw, 100vw',
      },
    },
  ],

  clients: {
    title: 'marcas com as quais já trabalhei',
    // Gerador de URLs para os 12 SVGs monocromáticos
    logos: Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      src: `https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/client-logos/client${i + 1}.svg`,
      alt: `Client Logo ${i + 1}`,
    })),
  },

  contact: {
    title: 'contato',
    subtitle: 'Tem uma pergunta ou quer trabalhar junto?',
  },
};

export const ABOUT_CONTENT = {
  hero: {
    title: { text: 'Sou ', highlight: 'Danilo Novais.' },
    manifesto: [
      { text: 'Você ', highlight: 'não vê tudo' },
      { text: 'o que eu faço. Mas' },
      { text: 'sente quando' },
      { highlight: 'funciona.' },
    ],
    description: [
      'Crio design que observa, entende',
      'e guia experiências com intenção,',
      'estratégia e tecnologia — na medida certa.',
    ],
    videos: {
      desktop:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4',
      mobile:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4',
    },
  },
  beliefsIntro: [
    { text: 'Acredito no ' },
    { text: 'design que muda o dia', highlight: true },
    { text: ' de alguém.', newLine: true },
    { text: 'Não pelo choque, ' },
    { text: 'mas pela conexão.', highlight: true },
  ],
  intro: {
    origin:
      'Goiânia, 2012. O início foi em agências, mas a inquietude era maior.',
  },
  origin: {
    title: 'Origem',
    blocks: [
      {
        type: 'block',
        id: '1',
        title: 'O QUE PERMANECE',
        text: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. Enquanto muitos olhavam para o brilho imediato, eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo. A essência das coisas sempre falou mais alto do que a superfície.',
        description: '',
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp',
        alt: 'Observando os detalhes',
      },
      {
        type: 'block',
        id: '2',
        title: 'DO TRAÇO À INTENÇÃO',
        text: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
        description: '',
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp',
        alt: 'Processo criativo',
        align: 'left',
      },
      {
        type: 'block',
        id: '3',
        title: 'A DESCOBERTA DO INVISÍVEL',
        text: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
        description: '',
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp',
        alt: 'Design invisível',
        align: 'right',
      },
      {
        type: 'block',
        id: '4',
        title: 'EXPANSÃO COM PROPÓSITO',
        text: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
        description: '',
        src: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp',
        alt: 'Expansão e tecnologia',
        align: 'left',
      },
    ],
  },
  whatIDo: {
    title: ['Do insight ao impacto.', 'Mesmo quando você não percebe.'],
    cards: [
      { id: '1', text: 'Direção criativa que organiza o caos' },
      { id: '2', text: 'Design estratégico que guia decisões' },
      { id: '3', text: 'Identidades que permanecem na memória' },
      { id: '4', text: 'Campanhas multicanais com lógica e emoção' },
      { id: '5', text: 'Branding que não grita — mas marca' },
      {
        id: '6',
        text: 'Inteligência artificial aplicada à criação e automação',
      },
      { id: '7', text: 'Liderança criativa com visão e método' },
    ],
    marquee: [
      'DIREÇÃO CRIATIVA',
      'DESIGN ESTRATÉGICO',
      'IDENTIDADES',
      'CAMPANHAS',
      'BRANDING',
      'INTELIGÊNCIA ARTIFICIAL',
      'LIDERANÇA CRIATIVA',
    ],
  },
  method: {
    title: ['Criatividade com método.', 'Impacto sem ruído.'],
    video:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/VideoAboutMethod.mp4',
    intro: [
      'O design que funciona não nasce do acaso. Ele é fruto de um processo estruturado que une intuição e técnica.',
      'Por isso, desenvolvi uma metodologia própria que garante consistência em cada entrega.',
      'Do briefing à entrega final, cada etapa é pensada para maximizar o impacto e minimizar o ruído.',
    ],
    steps: [
      { id: '01', text: 'Briefings bem construídos para decisões claras' },
      { id: '02', text: 'Estratégia como base de qualquer criação' },
      { id: '03', text: 'Design com propósito, não só beleza' },
      { id: '04', text: 'Revisões inteligentes, sem ruído desnecessário' },
      { id: '05', text: 'IA e automações para escalar com qualidade' },
      {
        id: '06',
        text: 'Métricas criativas: engajamento, retenção e resultado',
      },
    ],
  },
  beliefs: [
    { text: 'Um vídeo que respira.', highlight: 'respira' },
    { text: 'Uma marca que se reconhece.', highlight: 'reconhece' },
    { text: 'Um detalhe que fica.', highlight: 'fica' },
    { text: 'Crio para gerar presença.', highlight: 'Crio' },
    { text: 'Mesmo quando não estou ali.', highlight: 'Mesmo' },
    { text: 'Mesmo quando ninguém percebe o esforço.', highlight: 'Mesmo' },
  ],
  closing: {
    title: 'Hoje sou Diretor de Criação, com mais de 10 anos de estrada.',
    text: [
      'Já liderei marcas, agências, eventos e criei experiências para todos os canais.',
      'Agora, quero criar algo que permaneça — com você.',
    ],
    ghostText: {
      prefix: 'ISSO É',
      main: 'GHOST DESIGN',
    },
    ctas: [
      { label: 'Fale Comigo', href: '#contact', variant: 'primary' },
      {
        label: 'Download CV',
        href: '/cv-danilo-novais.pdf',
        variant: 'secondary',
        download: true,
        external: true,
      },
    ],
  },
};

export const PORTFOLIO_CONTENT = {
  hero: {
    video: {
      desktop:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/video-heroPort.mp4',
      mobile:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/video-heroPort-mobile.mp4',
    },
  },
};
