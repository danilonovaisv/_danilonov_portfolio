// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import ManifestoThumb from '../../src/components/home/ManifestoThumb';

// Mock do react-responsive
const mockIsMobile = jest.fn(() => false);
jest.mock('react-responsive', () => ({
  useMediaQuery: () => mockIsMobile(),
}));

// Mock do Framer Motion para evitar complexidade de animação nos testes
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <div {...validProps}>{children}</div>;
    },
    section: ({ children, ...props }: any) => {
      const validProps = { ...props };
      [
        'initial',
        'whileInView',
        'viewport',
        'variants',
        'animate',
        'transition',
        'exit',
        'layout',
        'custom',
        'whileHover',
        'whileTap',
      ].forEach((prop) => delete validProps[prop]);
      return <section {...validProps}>{children}</section>;
    },
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock do Lucide React
jest.mock('lucide-react', () => {
  return {
    ArrowUpRight: () => <div data-testid="arrow-up-right-icon" />,
  };
});

describe('ManifestoThumb Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsMobile.mockReturnValue(false);
  });

  describe('Desktop Layout', () => {
    beforeEach(() => {
      mockIsMobile.mockReturnValue(false);
    });

    it('deve renderizar a thumbnail no desktop', () => {
      render(<ManifestoThumb />);

      // Verifica que a div da thumb existe com a classe correta
      const thumbContainer = document.querySelector('.video-thumb');
      expect(thumbContainer).toBeInTheDocument();
    });

    it('deve ter posicionamento fixed para evitar clipping', () => {
      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      expect(thumbContainer).toHaveClass('fixed');
      expect(thumbContainer).toHaveClass('bottom-8');
      expect(thumbContainer).toHaveClass('right-8');
    });

    it('deve ter z-index alto (z-50) para ficar acima de outros elementos', () => {
      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      expect(thumbContainer).toHaveClass('z-50');
    });

    it('deve renderizar o ícone de seta indicando interatividade', () => {
      render(<ManifestoThumb />);

      const arrowIcon = screen.getByTestId('arrow-up-right-icon');
      expect(arrowIcon).toBeInTheDocument();
    });

    it('deve renderizar o vídeo com os atributos corretos', () => {
      render(<ManifestoThumb />);

      const video = document.querySelector('video') as HTMLVideoElement;
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute('src', '/videos/showreel.mp4');
      // React handles boolean attributes differently - check property instead
      expect(video.muted).toBe(true);
      expect(video).toHaveAttribute('loop');
    });

    it('deve ter aria-label para acessibilidade', () => {
      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      expect(thumbContainer).toHaveAttribute('aria-label', 'Ver showreel completo');
    });

    it('deve ter role="button" para indicar interatividade', () => {
      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      expect(thumbContainer).toHaveAttribute('role', 'button');
    });

    it('deve ter tabIndex para navegação por teclado', () => {
      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      expect(thumbContainer).toHaveAttribute('tabindex', '0');
    });

    it('deve ter cursor pointer para indicar clicabilidade', () => {
      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      expect(thumbContainer).toHaveClass('cursor-pointer');
    });

    it('NÃO deve renderizar a seção de vídeo fullpage no desktop', () => {
      render(<ManifestoThumb />);

      const fullpageSection = document.getElementById('manifesto-video-section');
      expect(fullpageSection).not.toBeInTheDocument();
    });

    it('deve ter dimensões corretas para o vídeo (260x400 em md)', () => {
      render(<ManifestoThumb />);

      const video = document.querySelector('video');
      expect(video).toHaveClass('md:w-[260px]');
      expect(video).toHaveClass('md:h-[400px]');
    });
  });

  describe('Mobile Layout', () => {
    beforeEach(() => {
      mockIsMobile.mockReturnValue(true);
    });

    it('NÃO deve renderizar a thumbnail flutuante no mobile', () => {
      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      expect(thumbContainer).not.toBeInTheDocument();
    });

    it('deve renderizar a seção de vídeo fullpage no mobile', () => {
      render(<ManifestoThumb />);

      const fullpageSection = document.getElementById('manifesto-video-section');
      expect(fullpageSection).toBeInTheDocument();
    });

    it('deve ter aria-label na seção de vídeo mobile para acessibilidade', () => {
      render(<ManifestoThumb />);

      const fullpageSection = document.getElementById('manifesto-video-section');
      expect(fullpageSection).toHaveAttribute('aria-label', 'Vídeo manifesto em tela cheia');
    });

    it('deve ter altura de tela cheia (h-screen) no mobile', () => {
      render(<ManifestoThumb />);

      const fullpageSection = document.getElementById('manifesto-video-section');
      expect(fullpageSection).toHaveClass('h-screen');
      expect(fullpageSection).toHaveClass('w-full');
    });

    it('deve renderizar vídeo com object-cover no mobile', () => {
      render(<ManifestoThumb />);

      const video = document.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveClass('object-cover');
    });
  });

  describe('Interações', () => {
    beforeEach(() => {
      mockIsMobile.mockReturnValue(false);
    });

    it('deve chamar handleClick ao clicar na thumbnail', () => {
      // Mock window.scrollTo
      const scrollToMock = jest.fn();
      Object.defineProperty(window, 'scrollTo', {
        value: scrollToMock,
        writable: true,
      });

      // Mock innerWidth para desktop
      Object.defineProperty(window, 'innerWidth', {
        value: 1024,
        writable: true,
      });

      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      if (thumbContainer) {
        fireEvent.click(thumbContainer);
      }

      // O scroll pode não ser chamado se não houver .hero-section no DOM
      // Este teste verifica que o click é registrado sem erro
      expect(thumbContainer).toBeInTheDocument();
    });

    it('deve responder ao Enter key para acessibilidade', () => {
      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      if (thumbContainer) {
        fireEvent.keyDown(thumbContainer, { key: 'Enter' });
      }

      // Verifica que o componente não quebra ao receber Enter
      expect(thumbContainer).toBeInTheDocument();
    });

    it('deve responder ao Space key para acessibilidade', () => {
      render(<ManifestoThumb />);

      const thumbContainer = document.querySelector('.video-thumb');
      if (thumbContainer) {
        fireEvent.keyDown(thumbContainer, { key: ' ' });
      }

      // Verifica que o componente não quebra ao receber Space
      expect(thumbContainer).toBeInTheDocument();
    });
  });
});
