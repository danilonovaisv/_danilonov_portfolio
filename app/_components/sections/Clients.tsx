'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CLIENT_LOGOS } from '@/src/lib/constants';
import type { ClientLogo } from '@/src/lib/types';

type ClientLogoItemProps = {
  logo: ClientLogo;
};

const ClientLogoItem: React.FC<ClientLogoItemProps> = ({ logo }) => {
  const [hasError, setHasError] = useState(false);
  const fallbackLabel = logo.name;

  if (hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-white font-bold text-xl opacity-50">
          {fallbackLabel}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={logo.src}
      alt={fallbackLabel}
      width={160}
      height={80}
      sizes="(min-width: 1024px) 12vw, 40vw"
      loading="lazy"
      className="w-full h-auto brightness-0 invert"
      onError={() => setHasError(true)}
    />
  );
};

const Clients: React.FC = () => {
  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="py-20 bg-[#0057FF] text-white"
    >
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="clients-title"
          className="text-3xl md:text-4xl font-bold mb-16"
        >
          marcas com as quais já trabalhei.
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 items-center justify-items-center">
          {CLIENT_LOGOS.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="w-full max-w-[140px] opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <ClientLogoItem logo={logo} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
