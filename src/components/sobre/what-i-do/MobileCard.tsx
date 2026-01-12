'use client';

import { motion } from 'framer-motion';

interface MobileCardProps {
  index: number;
  text: string;
  prefersReducedMotion: boolean;
}

export const MobileCard = ({
  index,
  text,
  prefersReducedMotion,
}: MobileCardProps) => {
  const formattedNumber = `${index + 1}`.padStart(2, '0');

  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.article
      tabIndex={0}
      aria-label={text}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-10%' }}
      variants={variants}
      className="group relative flex flex-row items-center text-white outline-none bg-[#0048ff] w-full h-[70px] rounded-[12px] px-[18px] gap-3 hover:brightness-110 focus-visible:ring-2 focus-visible:ring-[#4fe6ff]"
    >
      <div className="text-[1.5rem] font-black leading-none text-[#8705f2] transition-colors duration-200 group-hover:text-white">
        {formattedNumber}
      </div>
      <p className="text-[0.875rem] font-bold leading-[1.3]">
        <span className="text-white">{text}</span>
      </p>
    </motion.article>
  );
};
