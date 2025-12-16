// @ts-nocheck
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, expect, it, jest } from '@jest/globals';
import PortfolioShowcaseSection from '../../src/components/home/PortfolioShowcase';
import { CATEGORIES } from '../../src/lib/constants';

// Mock do Framer Motion para evitar complexidade de animação nos testes
jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, className, ...props }: any) => 
      <section className={className} {...props}>{children}</section>,
    div: ({ children, className, ...props }: any) => 
      <div className={className} {...props}>{children}</div>,
    h2: ({ children, className, ...props }: any) => 
      <h2 className={className} {...props}>{children}</h2>,
    h3: ({ children, className, ...props }: any) => 
      <h3 className={className} {...props}>{children}</h3>,
    p: ({ children, className, ...props }: any) => 
      <p className={className} {...props}>{children}</p>,
    span: ({ children, className, ...props }: any) => 
      <span className={className} {...props}>{children}</span>,
    li: ({ children, className, ...props }: any) => 
      <li className={className} {...props}>{children}</li>,
    a: ({ children, className, ...props }: any) => 
      <a className={className} {...props}>{children}</a>,
    button: ({ children, className, ...props }: any) => 
      <button className={className} {...props}>{children}</button>,
    ul: ({ children, className, ...props }: any) => 
      <ul className={className} {...props}>{children}</ul>,
    video: ({ children, className, ...props }: any) => 
      <video className={className} {...props}>{children}</video>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock do Lucide React
jest.mock('lucide-react', () => {
  return {
    ArrowRight: () => <div data-testid="arrow-right-icon" />,
    ArrowUpRight: () => <div data-testid="arrow-up-right-icon" />,
  };
});

// Mock do hook usePrefersReducedMotion
jest.mock('../../src/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => false,
}));

describe('PortfolioShowcaseSection Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar o título da seção corretamente', () => {
    render(<PortfolioShowcaseSection />);
    
    const titleElement = screen.getByText('portfólio showcase');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.closest('h2')).toBeInTheDocument();
  });

  it('deve renderizar todas as categorias', () => {
    render(<PortfolioShowcaseSection />);
    
    CATEGORIES.forEach((category) => {
      // Para a categoria especial 'websites-webcampaigns-tech', verificamos o texto dividido
      if (category.id === 'websites-webcampaigns-tech') {
        expect(screen.getByText('Web Campaigns,')).toBeInTheDocument();
        expect(screen.getByText('Websites & Tech')).toBeInTheDocument();
      } else {
        expect(screen.getByText(category.label)).toBeInTheDocument();
      }
    });
  });
});