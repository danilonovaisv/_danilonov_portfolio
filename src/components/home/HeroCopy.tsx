export function HeroCopy() {
  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Tag */}
      <span className="font-mono text-[12px] uppercase tracking-[0.4em] text-cyan-400 opacity-80">
        [ BRAND AWARENESS ]
      </span>

      {/* Main Headline */}
      <div className="space-y-2">
        <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[1.1] tracking-tight text-white uppercase italic">
          Você não vê
          <br />
          <span className="text-cyan-500">o design.</span>
        </h1>
        <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-semibold tracking-wide text-slate-300">
          Mas ele vê você.
        </h2>
      </div>

      {/* Subcopy */}
      <p className="max-w-md text-[0.95rem] md:text-[1.1rem] leading-relaxed text-slate-400 font-medium">
        [ É intenção, é estratégia, é experiência. ]
      </p>

      {/* CTA Button */}
      <div className="pt-8">
        <a
          href="/sobre"
          className="group relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-10 py-4 text-[0.9rem] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:border-cyan-500/30 hover:bg-cyan-500/5"
          aria-label="Ir para a seção sobre"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-cyan-300">
            step inside
          </span>
          <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1 text-cyan-400">
            →
          </span>

          {/* Inner Glow */}
          <div className="absolute inset-0 -z-10 rounded-full bg-cyan-500/0 blur-xl transition-colors duration-500 group-hover:bg-cyan-500/10" />
        </a>
      </div>
    </div>
  );
}

export default HeroCopy;
