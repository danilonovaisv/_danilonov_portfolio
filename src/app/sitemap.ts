import { MetadataRoute } from 'next';
import { HOME_CONTENT } from '@/config/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://portfoliodanilo.com';

  const projectUrls = HOME_CONTENT.featuredProjects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...projectUrls,
  ];
}
