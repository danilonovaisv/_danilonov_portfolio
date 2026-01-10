export const HOME_CONTENT = {
  hero: {
    title: ['Você não vê o design.'],
    subtitle: '[Mas ele vê você.]',
    cta: 'step inside →',
  },

  showcase: {
    title: 'portfólio showcase',
    cta: { label: 'vamos trabalhar juntos', href: '/portfolio' },
    categories: [
      { id: 'brand-campaigns', label: 'Brand & Campaigns' },
      { id: 'videos-motions', label: 'Videos & Motions' },
      { id: 'websites-tech', label: 'Web Campaigns, Websites & Tech' },
    ],
  },

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
    title: 'Sou Danilo Novais.',
    manifesto: [
      'Você não vê tudo',
      'o que eu faço. Mas',
      'sente quando',
      'funciona.',
    ],
    subtitle:
      'Crio design que observa, entende e guia experiências com intenção, estratégia e tecnologia — na medida certa.',
    keywords: ['Danilo Novais', 'não vê tudo', 'funciona'],
  },
  origin: {
    title: 'Origem',
    blocks: [
      {
        id: 'A',
        title: 'O QUE PERMANECE',
        text: 'Desde cedo, sempre prestei atenção no que ficava — não só no que aparecia. Enquanto muitos olhavam para o brilho imediato, eu era atraído pelos vestígios, pelos detalhes que sobreviviam ao tempo. A essência das coisas sempre falou mais alto do que a superfície.',
        image:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-1.webp',
        align: 'right',
      },
      {
        id: 'B',
        title: 'DO TRAÇO À INTENÇÃO',
        text: 'Rabiscos viraram ideias. Ideias viraram projetos. E os projetos começaram a deixar rastros. Meu processo criativo nasceu do improviso, do lápis na margem do caderno. Aos poucos, aquilo que era instinto virou direção. Com cada tentativa, aprendi a dar forma ao invisível — até que os conceitos começaram a falar por si.',
        image:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-2.webp',
        align: 'left',
      },
      {
        id: 'C',
        title: 'A DESCOBERTA DO INVISÍVEL',
        text: 'Foi ali que entendi: design não é enfeite. É ferramenta invisível de transformação. Por trás de cada escolha visual, existe intenção. Descobri que o design verdadeiro não grita — ele conduz. Ele está presente nos detalhes que ninguém percebe, mas que todos sentem. Transformar sem que se perceba a transformação: isso é potência.',
        image:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-3.webp',
        align: 'right',
      },
      {
        id: 'D',
        title: 'EXPANSÃO COM PROPÓSITO',
        text: 'Estudei Comunicação, mergulhei no design, no branding e hoje uso inteligência artificial para expandir o alcance sem perder a essência humana da criação. Minha trajetória uniu intuição com método, arte com estratégia. O futuro pede novas ferramentas — e eu as abracei. Mas nunca deixei que a tecnologia apagasse o que me move: a sensibilidade, o olhar atento, a busca pelo significado.',
        image:
          'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/sobre-4.webp',
        align: 'left',
      },
    ],
  },
  services: {
    title: {
      line1: 'Do insight ao impacto.',
      line2: 'Mesmo quando você não percebe.',
    },
    items: [
      {
        id: 1,
        text: 'Direção criativa que organiza o caos',
        highlight: 'Direção criativa',
      },
      {
        id: 2,
        text: 'Design estratégico que guia decisões',
        highlight: 'Design estratégico',
      },
      {
        id: 3,
        text: 'Identidades que permanecem na memória',
        highlight: 'Identidades',
      },
      {
        id: 4,
        text: 'Campanhas multicanais com lógica e emoção',
        highlight: 'Campanhas',
      },
      {
        id: 5,
        text: 'Branding que não grita — mas marca',
        highlight: 'Branding',
      },
      {
        id: 6,
        text: 'Inteligência artificial aplicada à criação e automação',
        highlight: 'Inteligência artificial',
      },
      {
        id: 7,
        text: 'Liderança criativa com visão e método',
        highlight: 'Liderança criativa',
      },
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
    title: {
      line1: 'Criatividade com método.',
      line2: 'Impacto sem ruído.',
    },
    description:
      'Meu processo combina estrutura e fluidez. Para cada projeto, um caminho claro que transforma problemas complexos em soluções visuais elegantes e funcionais.',
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
    { text: 'Um vídeo que respira.', highlight: 'respira.' },
    { text: 'Uma marca que se reconhece.', highlight: 'reconhece.' },
    { text: 'Um detalhe que fica.', highlight: 'fica.' },
    { text: 'Crio para gerar presença.', highlight: 'Crio' },
    { text: 'Mesmo quando não estou ali.', highlight: 'Mesmo' },
    { text: 'Mesmo quando ninguém percebe o esforço.', highlight: 'Mesmo' },
  ],
};
