import React from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface BeliefFinalSectionProps {
  scrollProgress: MotionValue<number>;
  bgColor: string;
}

export const BeliefFinalSection: React.FC<BeliefFinalSectionProps> = ({ scrollProgress, bgColor }) => {
  const opacity = useTransform(scrollProgress, [0.8, 1], [0, 1]);
  const y = useTransform(scrollProgress, [0.8, 1], [100, 0]);

  return (
    <motion.div
      style={{ opacity, backgroundColor: bgColor }}
      className="w-full h-screen flex flex-col items-center justify-center p-8 text-center"
    >
      <motion.p
        style={{ y }}
        className="text-white text-lg md:text-xl max-w-2xl font-light leading-relaxed"
      >
        A verdadeira inovação reside na intersecção entre arte e engenharia.
        Não construímos apenas interfaces; esculpimos experiências.
      </motion.p>

      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="mt-8 w-px h-24 bg-white/20 origin-top"
      />
    </motion.div>
  );
};
