import { HOMEPAGE_CONTENT } from '@/config/homepageContent';
import { MAIN_ROUTES } from '@/config/navigation';

describe('global site links', () => {
  it('keeps main routes in sync with anchors', () => {
    const expectedAnchors: Record<string, string> = {
      home: '#hero',
      sobre: '#Sobre',
      portfolio: '#portfolio-showcase',
      contato: '#contact',
    };

    expect(MAIN_ROUTES).toHaveLength(4);

    MAIN_ROUTES.forEach((route) => {
      expect(expectedAnchors[route.id]).toBeDefined();
      expect(route.anchor).toBe(expectedAnchors[route.id]);
    });
  });

  it('exposes the expected footer anchors', () => {
    const expectedFooter = [
      { label: 'Home', href: '#hero' },
      { label: 'Sobre', href: '#Sobre' },
      { label: 'Portfolio', href: '#portfolio-showcase' },
      { label: 'Contact', href: '#contact' },
    ];

    expect(HOMEPAGE_CONTENT.footer.links).toEqual(expectedFooter);
  });

  it('locates the manifesto video on Supabase storage', () => {
    const url = HOMEPAGE_CONTENT.videoManifesto.videoUrl;
    expect(url).toMatch(/supabase\.co\/storage\/v1\/object\/public\//);
    expect(url.endsWith('.mp4')).toBe(true);
  });
});
