import React from 'react';
import type { Metadata, Viewport } from 'next';
import MainLayout from '../components/layout/MainLayout';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4F5F7',
};

export const metadata: Metadata = {
  title: 'Danilo Novais | Portfolio',
  description: 'Design, não é só estética. É intenção, é estratégia, é experiência.',
  openGraph: {
    title: 'Danilo Novais | Portfolio',
    description: 'Design, não é só estética. É intenção, é estratégia, é experiência.',
    url: 'https://portfoliodanilo.com',
    siteName: 'Danilo Novais Portfolio',
    images: [
      {
        url: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp', // Imagem de fallback/capa
        width: 1200,
        height: 630,
        alt: 'Danilo Novais Portfolio Cover',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Danilo Novais | Portfolio',
    description: 'Design, não é só estética. É intenção, é estratégia, é experiência.',
    creator: '@danilo_novais', // Verificado no arquivo .md
  },
  icons: {
    icon: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg',
    shortcut: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth antialiased">
      <body className="bg-[#F4F5F7] text-[#111111]">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}