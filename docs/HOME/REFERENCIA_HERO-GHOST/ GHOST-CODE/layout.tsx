import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Ghost Hero",
  description: "Você não vê o design. Mas ele vê você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
