'use client';

// ... (imports mantidos)

export default function HomeHero() {
  // ... (hooks mantidos)

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-dvh md:h-[250vh] bg-[#020204] overflow-hidden" // Cor de fundo corrigida
      aria-label="Home hero section"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {/* Preloader */}
        <AnimatePresence>
          {isLoading && (
            <Preloader
              durationMs={CONFIG.preloadMs}
              onComplete={handlePreloaderDone}
              label="Summoning spirits"
            />
          )}
        </AnimatePresence>

        {/* WEBGL - GHOST STAGE (Z-INDEX 0) */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ filter: 'blur(20px)', opacity: 0 }}
          animate={{
            filter: isLoading ? 'blur(20px)' : 'blur(0px)',
            opacity: 1,
          }}
          transition={{ duration: 2.0, ease: 'linear' }}
        >
          {/* Aqui chamamos o GhostStage que renderiza o Canvas */}
          <GhostStage
            reducedMotion={prefersReducedMotion}
            active={!isLoading}
          />
        </motion.div>

        {/* HERO COPY (HTML INTERFACE - Z-INDEX 10) */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute inset-0 z-10 pointer-events-none"
        >
          <div className="w-full h-full pointer-events-auto">
            <HeroCopy startEntrance={!isLoading} />
          </div>
        </motion.div>

        {/* ... (Manifesto e Scroll Helper mantidos) */}
      </div>

      <div className="hidden md:block h-screen w-full pointer-events-none" />
    </section>
  );
}
