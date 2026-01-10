import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ManifestoThumb from '@/components/home/hero/ManifestoThumb';

// Mock heroRef para os testes
const mockHeroRef = createRef<HTMLElement>();

// Mock useMediaQuery to simulate desktop resolution
jest.mock('@/hooks/useMediaQuery', () => ({
  useMediaQuery: jest.fn(() => true),
}));

jest.mock('framer-motion', () => {
  const mockMotionValue = {
    get: () => 0,
    set: jest.fn(),
    on: jest.fn(() => jest.fn()),
    onChange: jest.fn(() => jest.fn()),
  };
  return {
    ...jest.requireActual('framer-motion'),
    useTransform: jest.fn(() => mockMotionValue),
    useMotionValueEvent: jest.fn(),
    useScroll: jest.fn(() => ({ scrollYProgress: mockMotionValue })),
    useSpring: jest.fn(() => mockMotionValue),
  };
});

// Mock do IntersectionObserver
beforeAll(() => {
  class MockIntersectionObserver {
    observe = jest.fn();
    disconnect = jest.fn();
    unobserve = jest.fn();
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: MockIntersectionObserver,
  });

  // Mock para o window.matchMedia do useReducedMotion
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('ManifestoThumb Component', () => {
  it('deve renderizar a seção do manifesto corretamente', () => {
    render(<ManifestoThumb heroRef={mockHeroRef} />);

    // Verifica se o vídeo existe pelo label acessível
    // O componente usa "Vídeo showreel demonstrando projetos de design gráfico" no video
    const video = screen.getByLabelText(
      'Vídeo showreel demonstrando projetos de design gráfico'
    );
    expect(video).toBeInTheDocument();
  });

  it('deve renderizar o vídeo com os atributos corretos', () => {
    const { container } = render(<ManifestoThumb heroRef={mockHeroRef} />);

    // Procura o vídeo dentro do componente
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();

    // Verifica atributos essenciais de vídeo
    expect(video).toHaveAttribute('playsInline');
    expect(video).toHaveAttribute('loop');
    expect((video as HTMLVideoElement).muted).toBe(true);
    expect((video as HTMLVideoElement).autoplay).toBe(true);
  });

  it('não deve exibir controles', () => {
    const { container } = render(<ManifestoThumb heroRef={mockHeroRef} />);
    const video = container.querySelector('video');
    expect(video).not.toHaveAttribute('controls');
  });
});
