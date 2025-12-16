// @ts-nocheck
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, it, jest } from '@jest/globals';
import PortfolioShowcaseSection from '@/components/home/PortfolioShowcase';
import { CATEGORIES } from '@/lib/constants';

// Mock do Framer Motion para evitar complexidade de animação nos testes
jest.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    li: ({ children, ...props }: any) => <li {...props}>{children}</li>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    ul: ({ children, ...props }: any) => <ul {...props}>{children}</ul>,
    video: ({ children, ...props }: any) => <video {...props}>{children}</video>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  useScroll: () => ({ scrollY: { get: () => 0, onChange: () => {} } }),
  useTransform: () => '0px',
  useMotionValueEvent: () => {},
}));

// Mock do Lucide React
jest.mock('lucide-react', () => {
  return {
    ArrowRight: () => <svg data-testid="arrow-right-icon" />,
    ArrowUpRight: () => <svg data-testid="arrow-up-right-icon" />,
  };
});

// Mock do hook usePrefersReducedMotion
jest.mock('@/hooks/usePrefersReducedMotion', () => ({
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

  it('deve expandir uma categoria quando clicada', async () => {
    render(<PortfolioShowcaseSection />);
    
    const firstCategory = CATEGORIES[0];
    const categoryButton = screen.getByLabelText(`${firstCategory.label} expand`);
    
    fireEvent.click(categoryButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(`${firstCategory.label} collapse`)).toBeInTheDocument();
    });
    
    // Verifica se o conteúdo expandido está presente
    expect(screen.getByText('Explorando os limites da criatividade em')).toBeInTheDocument();
    expect(screen.getByText('Destaques')).toBeInTheDocument();
    
    // Verifica se os itens de destaque estão presentes
    expect(screen.getByText('Projeto Exemplo 1')).toBeInTheDocument();
    expect(screen.getByText('Projeto Exemplo 2')).toBeInTheDocument();
    expect(screen.getByText('Projeto Exemplo 3')).toBeInTheDocument();
  });

  it('deve recolher uma categoria quando clicada novamente', async () => {
    render(<PortfolioShowcaseSection />);
    
    const firstCategory = CATEGORIES[0];
    const categoryButton = screen.getByLabelText(`${firstCategory.label} expand`);
    
    // Primeiro clique para expandir
    fireEvent.click(categoryButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(`${firstCategory.label} collapse`)).toBeInTheDocument();
    });
    
    // Segundo clique para recolher
    fireEvent.click(categoryButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(`${firstCategory.label} expand`)).toBeInTheDocument();
    });
    
    // Verifica que o conteúdo expandido não está mais presente
    expect(screen.queryByText('Explorando os limites da criatividade em')).not.toBeInTheDocument();
  });

  it('deve mostrar o botão "Voltar para a lista" quando uma categoria está expandida', async () => {
    render(<PortfolioShowcaseSection />);
    
    const firstCategory = CATEGORIES[0];
    const categoryButton = screen.getByLabelText(`${firstCategory.label} expand`);
    
    fireEvent.click(categoryButton);
    
    await waitFor(() => {
      expect(screen.getByText('Voltar para a lista')).toBeInTheDocument();
    });
  });

  it('deve fechar a categoria expandida ao clicar no botão "Voltar para a lista"', async () => {
    render(<PortfolioShowcaseSection />);
    
    const firstCategory = CATEGORIES[0];
    const categoryButton = screen.getByLabelText(`${firstCategory.label} expand`);
    
    // Expandir a categoria
    fireEvent.click(categoryButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(`${firstCategory.label} collapse`)).toBeInTheDocument();
    });
    
    // Clicar no botão de voltar
    const backButton = screen.getByText('Voltar para a lista');
    fireEvent.click(backButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(`${firstCategory.label} expand`)).toBeInTheDocument();
    });
  });

  it('deve renderizar o botão CTA quando nenhuma categoria está expandida', () => {
    render(<PortfolioShowcaseSection />);
    
    expect(screen.getByText("let's build something great")).toBeInTheDocument();
  });

  it('deve esconder o botão CTA quando uma categoria está expandida', async () => {
    render(<PortfolioShowcaseSection />);
    
    const ctaButton = screen.getByText("let's build something great");
    expect(ctaButton).toBeInTheDocument();
    
    const firstCategory = CATEGORIES[0];
    const categoryButton = screen.getByLabelText(`${firstCategory.label} expand`);
    
    fireEvent.click(categoryButton);
    
    await waitFor(() => {
      expect(screen.queryByText("let's build something great")).not.toBeInTheDocument();
    });
  });

  it('deve permitir expandir diferentes categorias', async () => {
    render(<PortfolioShowcaseSection />);
    
    // Expandir primeira categoria
    const firstCategory = CATEGORIES[0];
    const firstCategoryButton = screen.getByLabelText(`${firstCategory.label} expand`);
    fireEvent.click(firstCategoryButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(`${firstCategory.label} collapse`)).toBeInTheDocument();
    });
    
    // Fechar primeira categoria
    fireEvent.click(firstCategoryButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(`${firstCategory.label} expand`)).toBeInTheDocument();
    });
    
    // Expandir segunda categoria
    const secondCategory = CATEGORIES[1];
    const secondCategoryButton = screen.getByLabelText(`${secondCategory.label} expand`);
    fireEvent.click(secondCategoryButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText(`${secondCategory.label} collapse`)).toBeInTheDocument();
    });
  });
});