import React from 'react';
import { SOCIALS } from '../../lib/constants';

const Footer: React.FC = () => {
  const footerLinks = [
    { label: 'home', href: '/#hero', aria: 'Ir para seção Hero' },
    {
      label: 'portfólio showcase',
      href: '/#portfolio-showcase',
      aria: 'Ir para seção Portfólio Showcase',
    },
    { label: 'sobre', href: '/sobre', aria: 'Ir para página Sobre' },
    { label: 'contato', href: '/#contact', aria: 'Ir para seção Contato' },
  ];

  return (
    <footer className="fixed inset-x-0 bottom-0 z-[900] bg-[#0057FF] text-white shadow-[0_-12px_40px_rgba(0,87,255,0.25)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left text-sm opacity-90 font-medium">
          <p>© 2025 Danilo Novais Vilela — todos os direitos reservados.</p>
        </div>

        <nav aria-label="Navegação de rodapé">
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  aria-label={link.aria}
                  className="text-sm font-semibold hover:text-white/80 transition-colors lowercase tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF] rounded-sm px-1 hover:underline underline-offset-8 decoration-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex justify-center gap-3 md:gap-4">
          {SOCIALS.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 transition-colors p-2 rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0057FF]"
              aria-label={`Abrir perfil no ${social.platform} em nova aba`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
