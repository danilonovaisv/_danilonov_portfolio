'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PortfolioProject } from '@/types/project';
import { createPortal } from 'react-dom';
import { useBodyLock } from '@/hooks/useBodyLock';

import TypeAContent from './content/TypeAContent';
import TypeBContent from './content/TypeBContent';


interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: PortfolioProject | null;
}

export const PortfolioModal = ({ isOpen, onClose, project }: PortfolioModalProps) => {
  useBodyLock(isOpen);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !project) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - 0.18s linear */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'linear' }}
            onClick={onClose}
            className="fixed inset-0 z-[990] bg-black/90 backdrop-blur-md"
          />

          {/* Container - 0.26s ease (delay 0.12s) */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ 
                duration: 0.26, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.12 
            }}
            className="fixed inset-0 z-[995] overflow-y-auto"
          >
             <button 
                onClick={onClose}
                aria-label="Fechar galeria"
                className="fixed top-6 right-6 z-[1000] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
             >
                <X size={24} />
             </button>

             {/* Content Stagger starting from 0.52s (0.12 + 0.26 + leeway or just direct delay) */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.52, duration: 0.4 }}
               className="min-h-full w-full"
             >
                 {project.type === 'A' ? (
                    <TypeAContent project={project} />
                 ) : (
                    <TypeBContent project={project} />
                 )}
             </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};
