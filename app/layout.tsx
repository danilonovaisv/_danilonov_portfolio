import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import MainLayout from '../components/layout/MainLayout';
import './globals.css';

const metaTitle = 'Portfólio — Danilo Novais | Design, não é só estética.';
const metaDescription =
  'Design estratégico, UX, motion design e experiências digitais em WebGL/3D. Portfólio de Danilo Novais com projetos que unem intenção, estratégia e experiência.';
const metaImage =
  'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/project-images/Branding-Project.webp';
const metaUrl = 'https://portfoliodanilo.com';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#F4F5F7',
};

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  openGraph: {
    title: metaTitle,
    description: metaDescription,
    url: metaUrl,
    siteName: 'Danilo Novais Portfolio',
    images: [
      {
        url: metaImage,
        width: 1200,
        height: 630,
        alt: 'Capa do portfólio de Danilo Novais',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: metaTitle,
    description: metaDescription,
    creator: '@danilo_novais',
    images: [metaImage],
  },
  icons: {
    icon: 'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/faivcon-02.svg',
    shortcut:
      'https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/logo_site/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`scroll-smooth antialiased ${inter.variable} ${outfit.variable}`}
    >
      <body className="bg-[#F4F5F7] text-[#111111] font-sans">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
