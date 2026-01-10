export const BRAND = {
  name: 'Danilo Novais',
  domain: 'portfoliodanilo.com',

  // Paleta de Cores (Design System 2.1)
  colors: {
    // Primary tokens
    primary: '#0048ff', // Primary brand color, interactive elements, CTAs
    accent: '#4fe6ff', // Secondary highlights, Ghost atmosphere glow

    // Aliases for semantic usage (Design System 2.1)
    bluePrimary: '#0048ff', // CTAs, links, interativos
    blueAccent: '#4fe6ff', // Destaques secundários, brilhos

    // Backgrounds
    background: '#040013', // Fundo escuro principal (Deep Void)
    backgroundLight: '#f0f0f0', // Seções claras

    // Text colors
    text: '#fcffff', // Texto principal (dark mode)
    textInverse: '#0e0e0e', // Texto em fundos claros
    textSecondary: '#a1a3a3', // Infos secundárias
    textEmphasis: '#2E85F2', // Palavras destacadas no meio do texto
    textHighlight: '#4fe6ff', // Destaques curtos, intros breves

    // Detail colors
    purpleDetails: '#8705f2', // Highlights sutis
    pinkDetails: '#f501d3', // Ênfases pontuais

    // Neutrals
    neutral: '#0b0d3a', // Gradientes sutis
    neutralLight: '#F5F5F5', // Fundos secundários
  },

  typography: {
    primary: 'TT Norms Pro',
    mono: 'PPSupplyMono',
    fallbacks: ['ui-sans-serif', 'system-ui'],
  },

  // Assets Globais (2.6 Global Assets)
  assets: {
    logos: {
      favicon:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg',
      faviconLight:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg',
      light:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg', // Header
      dark: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg', // Header (bg claro)
    },
    video: {
      manifesto:
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
    },
    fonts: {
      primary: 'TT Norms Pro',
      mono: 'PPSupplyMono',
    },
  },

  // Legacy support - keep old structure for backward compatibility
  logos: {
    light:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoLight.svg',
    dark: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/LogoDark.svg',
    favicon:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/Favicon.svg',
    faviconLight:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/FaviconLight.svg',
  },

  video: {
    manifesto:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4',
  },

  layout: {
    container: 'w-full max-w-[1920px] mx-auto px-5 md:px-10 lg:px-16',
  },
};
