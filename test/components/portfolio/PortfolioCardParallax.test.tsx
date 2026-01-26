import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PortfolioCardParallax } from '@/components/portfolio/PortfolioCardParallax';
import { PortfolioProject } from '@/types/project';

// Mock Next Router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Framer Motion
jest.mock('framer-motion', () => {
  const mockMotionValue = {
    get: jest.fn(() => 0),
    on: jest.fn(() => () => {}),
    onChange: jest.fn(() => () => {}),
    stop: jest.fn(),
    destroy: jest.fn(),
  };

  return {
    motion: {
      div: ({ children, className, style, ...props }: any) => (
        <div className={className} style={style} {...props}>
          {children}
        </div>
      ),
    },
    useScroll: jest.fn(() => ({
      scrollYProgress: mockMotionValue,
    })),
    useTransform: jest.fn(() => mockMotionValue),
    useReducedMotion: jest.fn(() => false),
  };
});

// Mock Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  // Render a lightweight accessible placeholder instead of an <img> to satisfy linting
  default: ({ src, alt, className, ...props }: any) => (
    <span
      role="img"
      aria-label={alt}
      data-src={src}
      className={className}
      {...props}
    />
  ),
}));

const mockProject: PortfolioProject = {
  id: '1',
  slug: 'test-project',
  title: 'Test Project',
  client: 'Test Client',
  category: 'web',
  displayCategory: 'Web Design',
  year: 2024,
  image: '/test-image.jpg',
  type: 'B',
  layout: {
    cols: 'col-span-1',
    height: 'h-[400px]'
  }
};

describe('PortfolioCardParallax', () => {
  it('should render the project title and category overlay', () => {
    render(<PortfolioCardParallax project={mockProject} index={0} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('should have the required structure for the parallax effect', () => {
    const { container } = render(<PortfolioCardParallax project={mockProject} index={0} />);
    
    // Check for the card wrapper
    const card = container.querySelector('.parallax-card');
    expect(card).toBeInTheDocument();
    
    // Check for the image wrapper (needed for parallax)
    const imageWrapper = container.querySelector('.card-image-wrapper');
    expect(imageWrapper).toBeInTheDocument();
    
    // Check for the image itself
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
  });

  it('should render the info overlay as per HTML reference', () => {
    render(<PortfolioCardParallax project={mockProject} index={0} />);
    
    const info = screen.getByText('Test Project').closest('.info');
    expect(info).toBeInTheDocument();
    expect(info?.parentElement).toHaveClass('text-overlay');
  });
});
