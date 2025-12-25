'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import LogoLight from '@/assets/logos/LogoLight.svg';

const MobileStaggeredMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  const menuItems = [
    { label: 'home', link: '#hero' },
    { label: 'sobre', link: '/sobre' },
    { label: 'portfolio showcase', link: '/portfolio' },
    { label: 'contato', link: '#contact' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://instagram.com' },
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="fixed top-4 left-4 z-50 flex items-center gap-3 rounded-full bg-black/50 px-4 py-2 backdrop-blur-md">
        <Image
          src={LogoLight}
          alt="Danilo Novais"
          className="h-7 w-auto"
          priority
        />
      </div>

      {/* Menu Button */}
      <motion.button
        className="fixed top-6 right-6 z-50 flex h-12 w-12 flex-col items-center justify-center rounded-full border border-white/20 bg-white/15 backdrop-blur-md"
        onClick={toggleMenu}
        animate={{ 
          backgroundColor: isOpen ? "#000" : "#e9e9ef",
          transition: { duration: 0.3 }
        }}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
      >
        <motion.span
          className="mb-1.5 block h-0.5 w-6 bg-black"
          animate={{ 
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
            backgroundColor: isOpen ? "#e9e9ef" : "#000"
          }}
        />
        <motion.span
          className="block h-0.5 w-6 bg-black"
          animate={{ 
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
            backgroundColor: isOpen ? "#e9e9ef" : "#000"
          }}
        />
      </motion.button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Layers */}
            <motion.div
              className="fixed inset-0 z-40 bg-[#B19EEF]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="fixed inset-0 z-40 bg-[#5227FF]"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
            />

            {/* Menu Content */}
            <motion.div
              ref={menuRef}
              className="fixed inset-0 z-40 flex flex-col justify-center items-center text-white overflow-hidden"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              <div className="text-center mb-16">
                <motion.h2
                  className="text-5xl font-light"
                  variants={{
                    closed: { y: '100%', opacity: 0 },
                    open: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
                  }}
                >
                  Menu
                </motion.h2>
              </div>

              <div className="flex flex-col items-center">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="overflow-hidden"
                    variants={{
                      closed: { height: 0 },
                      open: { height: 'auto' }
                    }}
                    transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <motion.div
                      variants={{
                        closed: { y: '100%', opacity: 0 },
                        open: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
                      }}
                    >
                      <Link
                        href={item.link}
                        className="block text-3xl md:text-4xl font-light py-3 px-8 hover:opacity-70 transition-opacity"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="text-[#5227FF] mr-3">0{index + 1}.</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="absolute bottom-12 flex space-x-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {socialItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:opacity-70 transition-opacity"
                  >
                    {item.label}
                  </Link>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileStaggeredMenu;
