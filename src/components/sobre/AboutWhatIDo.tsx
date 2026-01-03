import { motion, useReducedMotion } from 'framer-motion';

// 7 Cards Content hardcoded to match prototype perfectly if not in config
const CAPABILITIES = [
  { title: 'Direção criativa', desc: 'que organiza o caos' },
  { title: 'Design estratégico', desc: 'que guia decisões' },
  { title: 'Identidades', desc: 'que permanecem na memória' },
  { title: 'Campanhas', desc: 'multicanais com lógica e emoção' },
  { title: 'Branding', desc: 'que não grita — mas marca' },
  { title: 'Inteligência artificial', desc: 'aplicada à criação e automação' },
  { title: 'Liderança criativa', desc: 'com visão e método' },
];

export function AboutWhatIDo() {
  const prefersReducedMotion = useReducedMotion();

  // Split title lines and highlight keywords
  const renderTitle = () => {
    return (
      <div className="text-center pt-8 md:pt-16 mb-12 md:mb-20 space-y-2 max-w-[900px] mx-auto z-10 relative">
        <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-bold tracking-tight leading-[1.1] text-white">
          Do <span className="text-primary">insight</span> ao{' '}
          <span className="text-primary">impacto</span>.
          <br className="hidden md:block" />
          <span className="text-white font-medium block md:inline mt-2">
            Mesmo quando você não percebe.
          </span>
        </h2>
      </div>
    );
  };

  return (
    <section
      className="min-h-screen bg-[#040013] py-20 relative overflow-hidden flex flex-col justify-center"
      aria-label="O que eu faço"
    >
      {/* Background Ambience / Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {renderTitle()}
        </motion.div>

        {/* 7 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
          {CAPABILITIES.map((item, index) => {
            // Logic for the 7th item (index 6) to be centered
            const isLastItem = index === 6;

            return (
              <motion.div
                key={index}
                initial={
                  prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                className={`
                  group relative 
                  bg-[#1A1A2E]/90
                  border-t-[2px] border-t-primary
                  rounded-xl
                  p-6 md:p-8
                  transition-all duration-300
                  hover:-translate-y-1 hover:bg-[#1f1f35] hover:border-t-[3px]
                  flex flex-col items-start gap-3
                  ${isLastItem ? 'md:col-span-2 md:w-1/2 md:mx-auto xl:col-span-1 xl:col-start-2 xl:w-full xl:mx-0' : ''}
                `}
              >
                {/* Title */}
                <h3 className="text-lg md:text-[20px] font-semibold text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary block" />
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-[15px] md:text-[16px] font-normal text-white/90 leading-relaxed pl-4">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
