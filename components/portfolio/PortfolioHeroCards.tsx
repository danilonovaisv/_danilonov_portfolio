'use client';

import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';
import styles from './PortfolioHeroCards.module.css';

type HeroCard = {
  id: string;
  label: string;
  gradient: string;
  accent: string;
  rotate: number;
  offset: {
    x: number;
    y: number;
  };
};

const heroCards: HeroCard[] = [
  {
    id: 'brand-shift',
    label: 'Transição de identidade',
    gradient:
      'linear-gradient(135deg, rgba(0,87,255,0.7), rgba(15,23,42,0.95))',
    accent: '#0057ff',
    rotate: -10,
    offset: { x: -36, y: -8 },
  },
  {
    id: 'experience',
    label: 'Experiência digital',
    gradient:
      'linear-gradient(150deg, rgba(124,58,237,0.8), rgba(12,17,35,0.9))',
    accent: '#7c3aed',
    rotate: -2,
    offset: { x: -12, y: 0 },
  },
  {
    id: 'campaign',
    label: 'Campanha integrada',
    gradient:
      'linear-gradient(160deg, rgba(15,23,42,0.95), rgba(14,165,233,0.6))',
    accent: '#0ea5e9',
    rotate: 6,
    offset: { x: 18, y: -4 },
  },
  {
    id: 'motion',
    label: 'Motion & video',
    gradient:
      'linear-gradient(145deg, rgba(15,23,42,0.9), rgba(0,87,255,0.65), rgba(255,255,255,0.08))',
    accent: '#111827',
    rotate: 14,
    offset: { x: 40, y: 6 },
  },
];

const easing = [0.22, 1, 0.36, 1] as const;

export default function PortfolioHeroCards() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = React.useState<string | null>(
    heroCards[1]?.id ?? null
  );

  const activateCard = (id: string) => setActiveId(id);
  const resetActive = () => setActiveId(null);
  const toggleCard = (id: string) =>
    setActiveId((previous) => (previous === id ? null : id));

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 -z-10 rounded-[32px] bg-gradient-to-br from-[#dce7ff]/70 via-white to-[#f5f5f5] blur-2xl"
        aria-hidden
      />

      <motion.ul
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          ease: easing,
        }}
        className="relative flex h-[360px] items-center justify-center sm:h-[420px]"
        style={{ perspective: 1600 }}
      >
        {heroCards.map((card, index) => {
          const isActive = activeId === card.id;
          const isMuted = activeId !== null && !isActive;

          return (
            <motion.li
              key={card.id}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: isActive ? heroCards.length + 3 : heroCards.length - index }}
            >
              <motion.button
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => activateCard(card.id)}
                onFocus={() => activateCard(card.id)}
                onMouseLeave={resetActive}
                onBlur={resetActive}
                onClick={() => toggleCard(card.id)}
                initial={{
                  opacity: 0,
                  y: 18,
                  rotate: card.rotate - 4,
                  x: card.offset.x * 0.6,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: card.offset.y,
                  x: card.offset.x,
                  rotate: card.rotate,
                  scale: isActive ? 1.02 : 1,
                  transition: {
                    duration: reduceMotion ? 0 : 0.75,
                    ease: easing,
                    delay: reduceMotion ? 0 : index * 0.08,
                  },
                }}
                whileHover={
                  reduceMotion
                    ? { scale: 1.02 }
                    : {
                        y: card.offset.y - 16,
                        scale: 1.04,
                        rotateX: 6,
                        rotateY: -5,
                        boxShadow:
                          '0 28px 70px -32px rgba(0,0,0,0.55), 0 24px 60px -30px rgba(0,87,255,0.45)',
                      }
                }
                whileFocus={
                  reduceMotion
                    ? { scale: 1.02 }
                    : {
                        y: card.offset.y - 16,
                        scale: 1.04,
                        rotateX: 6,
                        rotateY: -5,
                        boxShadow:
                          '0 28px 70px -32px rgba(0,0,0,0.55), 0 24px 60px -30px rgba(0,87,255,0.45)',
                      }
                }
                whileTap={{ scale: 0.98 }}
                className={clsx(
                  styles.card,
                  isActive && styles.cardActive,
                  isMuted && styles.cardMuted
                )}
                style={
                  {
                    '--card-gradient': card.gradient,
                    '--card-accent': card.accent,
                  } as React.CSSProperties
                }
              >
                <span className="sr-only">{card.label}</span>
                <span className={styles.glow} aria-hidden />
                <span className={styles.grid} aria-hidden />
                <span className={styles.shine} aria-hidden />
                <span className={styles.edge} aria-hidden />
              </motion.button>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}
