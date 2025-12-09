export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  imageUrl: string;
  layout: 'small' | 'medium' | 'wide' | 'rectangle';
};

export const featuredProjects: Project[] = [
  {
    slug: 'magic-radio-branding',
    title: 'Bringing the Magic Back to Radio',
    client: 'Magic',
    category: 'branding',
    layout: 'small',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Brand-Identity%20copy.webp',
  },
  {
    slug: 'taking-sportswear',
    title: 'Taking Sportswear to the Skies',
    client: 'Eurosport',
    category: 'campaign',
    layout: 'medium',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Key-Visual.webp',
  },
  {
    slug: 'epic-look-campaign',
    title: 'Refreshing a Telecom Challenger',
    client: 'Epic',
    category: 'branding',
    layout: 'wide',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp',
  },
  {
    slug: 'fff-legal-identity',
    title: 'Designing Trust for FFF Legal Identity',
    client: 'FFF Legal',
    category: 'branding / website',
    layout: 'rectangle',
    imageUrl:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/webdesigner-2%202.gif',
  },
];
