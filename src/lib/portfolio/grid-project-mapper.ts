import type { Project, ProjectDetailsLink } from '@/types/portfolio-grid';
import type { PortfolioProject } from '@/types/project';

const buildHighlights = (project: PortfolioProject) =>
  project.detail?.highlights?.filter((entry): entry is string => Boolean(entry)) ??
  project.tags?.filter((entry): entry is string => Boolean(entry)) ??
  [];

export function mapPortfolioProjectsToGrid(projects: PortfolioProject[]): Project[] {
  return projects.map((project) => {
    const gallery =
      project.detail?.gallery
        ?.filter((src): src is string => Boolean(src))
        .map((src, index) => ({
          src,
          alt: `${project.title} gallery ${index + 1}`,
        })) ?? [];

    const links: ProjectDetailsLink[] | undefined =
      project.detail?.externalUrl || project.landingPageSlug
        ? [
            project.detail?.externalUrl
              ? {
                  label: 'Case completo',
                  url: project.detail.externalUrl,
                }
              : null,
            project.landingPageSlug
              ? {
                  label: 'Landing interna',
                  url: `/portfolio/${project.landingPageSlug}`,
                }
              : null,
          ].filter((entry): entry is ProjectDetailsLink => Boolean(entry))
        : undefined;

    return {
      id: project.id,
      title: project.title,
      description:
        project.shortDescription ??
        project.detail?.description ??
        project.subtitle ??
        project.client,
      thumbnailUrl: project.image,
      landingPageUrl: project.landingPageSlug
        ? `/portfolio/${project.landingPageSlug}`
        : undefined,
      technologies: buildHighlights(project),
      details: {
        body:
          project.detail?.description ??
          project.shortDescription ??
          project.subtitle ??
          'Projeto do portfólio.',
        highlights: buildHighlights(project),
        gallery: gallery.length ? gallery : undefined,
        links,
      },
      slug: project.slug,
      accentColor: project.accentColor,
    };
  });
}
