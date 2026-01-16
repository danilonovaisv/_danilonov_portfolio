
import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface FinalSectionProps {
  bgColor: string;
}

const FinalSection: React.FC<FinalSectionProps> = ({ bgColor }) => {
  const ref = useRef<HTMLElement>(null);

  return (
    <section 
      ref={ref}
      style={{ backgroundColor: bgColor }}
      className="w-full h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      <motion.div 
        className="flex flex-col items-center justify-center text-center text-white font-display leading-[0.78] w-full max-w-[98vw]"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="text-[16vw] md:text-[14rem] tracking-tighter">
          ISSO É
        </div>
        <div className="text-[30vw] md:text-[25rem] font-black tracking-tighter">
          GHOST
        </div>
        <div className="text-[24vw] md:text-[19rem] tracking-tighter">
          DESIGN
        </div>
      </motion.div>
    </section>
  );
};

export default FinalSection;
