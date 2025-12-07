import React from 'react';
import type { Metadata, Viewport } from 'next';
import MainLayout from '../components/layout/MainLayout';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Danilo Novais | Portfolio',
  description: 'Design, não é só estética. É intenção, é estratégia, é experiência.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
