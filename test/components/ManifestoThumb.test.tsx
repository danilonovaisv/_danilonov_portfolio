// @ts-nocheck
import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, jest, beforeEach } from '@jest/globals';
import ManifestoThumb from '../../src/components/home/ManifestoThumb';

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
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({
    scrollYProgress: { get: () => 0, onChange: jest.fn(), on: jest.fn() },
  }),
  useTransform: () => 0, // Mock return value for transforms coordinates/colors
  useSpring: () => 0,
  useMotionValueEvent: jest.fn(),
}));

describe('ManifestoThumb Component', () => {
  // Mock do window resize
  const mockInnerWidth = (width: number) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Desktop Layout', () => {
    beforeEach(() => {
      mockInnerWidth(1280); // Desktop width
    });

    it('deve renderizar a thumbnail no desktop', () => {
      render(<ManifestoThumb />);

      // Procura pelo video que é o elemento principal
      const video = document.querySelector('video');
      expect(video).toBeInTheDocument();
    });

    it('deve ter posicionamento absolute dentro do container sticky', () => {
      const { container } = render(<ManifestoThumb />);

      // O container principal deve ter absolute positioning (mudança recente de fixed -> absolute)
      const thumbContainer = container.firstChild as HTMLElement;
      expect(thumbContainer).toHaveClass('absolute');
    });

    it('deve ter z-index alto (z-50) para ficar acima de outros elementos', () => {
      const { container } = render(<ManifestoThumb />);

      const thumbContainer = container.firstChild as HTMLElement;
      expect(thumbContainer).toHaveClass('z-50');
    });

    it('deve renderizar o vídeo com os atributos corretos', () => {
      render(<ManifestoThumb />);

      const video = document.querySelector('video') as HTMLVideoElement;
      expect(video).toBeInTheDocument();
      expect(video).toHaveAttribute(
        'src',
        'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-videos/VIDEO-APRESENTACAO-PORTFOLIO.mp4'
      );
      // O mock do framer-motion não executa lógica real, então verificamos os atributos estáticos
      expect(video).toHaveAttribute('loop');
      expect(video).toHaveAttribute('autoPlay');
    });

    it('deve ter aria-label para acessibilidade', () => {
      render(<ManifestoThumb />);

      const video = document.querySelector('video');
      expect(video).toHaveAttribute('aria-label', 'Manifesto thumbnail');
    });

    it('deve ter cursor pointer para indicar clicabilidade', () => {
      render(<ManifestoThumb />);
      // O cursor-pointer está na div interna
      const innerDiv = document.querySelector('.cursor-pointer');
      expect(innerDiv).toBeInTheDocument();
    });

    it('NÃO deve renderizar a versão mobile no desktop', () => {
      const { container } = render(<ManifestoThumb />);

      const thumbContainer = container.firstChild as HTMLElement;
      // No desktop, o container deve ser absolute (não fixed)
      expect(thumbContainer).toHaveClass('absolute');
      // E não deve ter a altura de mobile (h-[70vh])
      expect(thumbContainer).not.toHaveClass('h-[70vh]');
    });
  });

  describe('Mobile Layout', () => {
    beforeEach(() => {
      mockInnerWidth(768); // Mobile width
    });

    it('NÃO deve renderizar a thumbnail flutuante no mobile', () => {
      const { container } = render(<ManifestoThumb />);

      const thumbContainer = container.firstChild as HTMLElement;
      // No mobile, não deve ter fixed positioning
      expect(thumbContainer).not.toHaveClass('fixed');
    });

    it('deve renderizar a seção de vídeo fullwidth no mobile', () => {
      const { container } = render(<ManifestoThumb />);

      const thumbContainer = container.firstChild as HTMLElement;
      expect(thumbContainer).toHaveClass('w-full');
      expect(thumbContainer).toHaveClass('h-[70vh]');
    });

    it('deve ter aria-label na seção de vídeo mobile para acessibilidade', () => {
      render(<ManifestoThumb />);

      const video = document.querySelector('video');
      expect(video).toHaveAttribute('aria-label', 'Manifesto video full');
    });

    it('deve ter altura correta (h-[70vh]) no mobile', () => {
      const { container } = render(<ManifestoThumb />);

      const thumbContainer = container.firstChild as HTMLElement;
      expect(thumbContainer).toHaveClass('h-[70vh]');
    });

    it('deve renderizar vídeo com object-cover no mobile', () => {
      render(<ManifestoThumb />);

      const video = document.querySelector('video');
      expect(video).toBeInTheDocument();
      expect(video).toHaveClass('object-cover');
    });
  });

  describe('Responsividade', () => {
    it('deve alternar entre layouts desktop e mobile corretamente', () => {
      // Inicia em desktop
      mockInnerWidth(1280);
      const { container, rerender } = render(<ManifestoThumb />);

      let thumbContainer = container.firstChild as HTMLElement;
      expect(thumbContainer).toHaveClass('absolute');

      // Simula resize para mobile
      mockInnerWidth(768);
      rerender(<ManifestoThumb />);

      thumbContainer = container.firstChild as HTMLElement;
      expect(thumbContainer).toHaveClass('w-full');
      expect(thumbContainer).not.toHaveClass('absolute');
    });
  });
});
