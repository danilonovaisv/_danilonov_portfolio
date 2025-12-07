import type { ReactNode } from 'react';
import MainLayout from './_components/layout/MainLayout';
import './globals.css';

export const metadata = {
  applicationName: 'Portfólio Danilo Novais',
  colorScheme: 'light',
  openGraph: {
    title: 'Danilo Novais | Portfólio',
    description:
      'Design, não é só estética. É intenção, é estratégia, é experiência.',
    url: 'https://portfoliodanilo.com',
    siteName: 'Portfólio Danilo Novais',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
