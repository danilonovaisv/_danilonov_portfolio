export type SiteAssetRole = {
  key: string;
  label: string;
  description: string;
  page: string;
  asset_type: 'image' | 'video' | 'file' | 'font';
  subPath?: string;
  sort_order?: number;
};

export type SiteAssetRoleGroup = {
  label: string;
  roles: SiteAssetRole[];
};

const globalLogos: SiteAssetRole[] = [
  {
    key: 'global.logo_header_light',
    label: 'Logo header (claro)',
    description: 'Versão clara do logo do header',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
  {
    key: 'global.logo_header_dark',
    label: 'Logo header (escuro)',
    description: 'Versão escura do logo do header',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
  {
    key: 'global.favicon_light',
    label: 'Favicon claro',
    description: 'Favicon claro utilizado na aba',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
  {
    key: 'global.favicon_dark',
    label: 'Favicon escuro',
    description: 'Favicon escuro utilizado na aba',
    page: 'global',
    asset_type: 'image',
    subPath: 'logos',
  },
];

const globalFonts: SiteAssetRole[] = [
  {
    key: 'global.font_display',
    label: '--font-display',
    description: 'Fonte principal de destaque',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: 'global.font_h1',
    label: '--font-h1',
    description: 'Fonte dos títulos h1',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: 'global.font_h2',
    label: '--font-h2',
    description: 'Fonte dos títulos h2',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: 'global.font_h3',
    label: '--font-h3',
    description: 'Fonte dos títulos h3',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: 'global.font_body',
    label: '--font-body',
    description: 'Fonte do corpo de texto',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
  {
    key: 'global.font_light',
    label: '--font-light',
    description: 'Fonte auxiliar leve',
    page: 'global',
    asset_type: 'font',
    subPath: 'fonts',
  },
];

const clientStrips: SiteAssetRole[] = Array.from({ length: 12 }, (_, index) => ({
  key: `clients.strip.${index + 1}`,
  label: `Logo cliente ${index + 1}`,
  description: 'Logo para a faixa de clientes',
  page: 'clients',
  asset_type: 'image',
  subPath: 'clients',
  sort_order: index + 1,
}));

const aboutHeroVideos: SiteAssetRole[] = [
  {
    key: 'about.hero_video.desktop',
    label: 'Vídeo hero Sobre (desktop)',
    description: 'Vídeo da hero da página Sobre (desktop)',
    page: 'about',
    asset_type: 'video',
    subPath: 'hero',
  },
  {
    key: 'about.hero_video.mobile',
    label: 'Vídeo hero Sobre (mobile)',
    description: 'Versão mobile da hero sobre',
    page: 'about',
    asset_type: 'video',
    subPath: 'hero',
  },
];

const aboutOriginImages: SiteAssetRole[] = Array.from({ length: 4 }, (_, index) => ({
  key: `about.origin_image.${index + 1}`,
  label: `Origem imagem ${index + 1}`,
  description: 'Imagem da seção Origem',
  page: 'about',
  asset_type: 'image',
  subPath: 'origin',
  sort_order: index + 1,
}));

const aboutMethodVideo: SiteAssetRole = {
  key: 'about.method_video',
  label: 'Vídeo método',
  description: 'Vídeo da seção Método',
  page: 'about',
  asset_type: 'video',
  subPath: 'method',
};

const aboutCurriculum: SiteAssetRole = {
  key: 'about.curriculum_pdf',
  label: 'Currículo para download',
  description: 'PDF usado na seção AboutClosing',
  page: 'about',
  asset_type: 'file',
  subPath: 'curriculum',
};

const portfolioHeroVideos: SiteAssetRole[] = [
  {
    key: 'portfolio.hero_video.desktop',
    label: 'Vídeo hero Portfólio (desktop)',
    description: 'Hero do portfólio desktop',
    page: 'portfolio',
    asset_type: 'video',
    subPath: 'hero',
  },
  {
    key: 'portfolio.hero_video.mobile',
    label: 'Vídeo hero Portfólio (mobile)',
    description: 'Hero do portfólio mobile',
    page: 'portfolio',
    asset_type: 'video',
    subPath: 'hero',
  },
];

export const siteAssetRoleGroups: SiteAssetRoleGroup[] = [
  { label: 'Global • Logos', roles: globalLogos },
  { label: 'Global • Fonts', roles: globalFonts },
  { label: 'Clients • Logos', roles: clientStrips },
  { label: 'Sobre • Hero vídeos', roles: aboutHeroVideos },
  { label: 'Sobre • Origem', roles: aboutOriginImages },
  {
    label: 'Sobre • Método & Curriculum',
    roles: [aboutMethodVideo, aboutCurriculum],
  },
  { label: 'Portfólio • Hero vídeos', roles: portfolioHeroVideos },
];

const allSiteAssetRoles = siteAssetRoleGroups.flatMap((group) => group.roles);

export const siteAssetRoleMap = new Map(
  allSiteAssetRoles.map((role) => [role.key, role])
) as ReadonlyMap<string, SiteAssetRole>;

export function getSiteAssetRoleByKey(key: string) {
  return siteAssetRoleMap.get(key);
}
