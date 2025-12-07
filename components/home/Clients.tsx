'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '../../lib/constants';

const Clients: React.FC = () => {
  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="py-24 bg-[#0057FF] text-white"
    >
      <div className="container mx-auto px-6 md:px-12 text-center max-w-7xl">
        <motion.h2
          id="clients-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-20 tracking-tight"
        >
          marcas com as quais já trabalhei.
        </motion.h2>

        <ul
          role="list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-16 items-center justify-items-center"
        >
          {CLIENT_LOGOS.map((logo, index) => {
            // Extrair nome da marca da URL se possível ou usar um fallback genérico com índice
            // Como as URLs são .../client1.svg, podemos inferir que o alt deve ser descritivo se tivéssemos os nomes.
            // O requisito pede: "alt de cada logo = nome da marca".
            // Como os dados atuais são apenas strings de URL (vide constants.tsx),
            // vou manter uma estratégia de 'Marca Parceira {index + 1}' para ser honesto com os dados que tenho,
            // ou tentar um split simples se o nome do arquivo ajudar, mas 'client1' não é muito descritivo.
            // Para cumprir "Acessibilidade: alt de cada logo = nome da marca", seria ideal ter um objeto { name, url }.
            // Vou ajustar o alt para ser semântico "Logo Cliente {n}" já que não tenho os nomes reais nas constantes.
            const clientName = `Cliente Parceiro ${index + 1}`;

            return (
              <motion.li
                key={index}
                role="listitem"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="w-full flex justify-center"
              >
                <div className="relative w-full max-w-[160px] h-16 md:h-20 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={logo}
                    alt={`Logo ${clientName}`}
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 200px"
                    className="object-contain brightness-0 invert"
                    loading="lazy"
                  />
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Clients;
