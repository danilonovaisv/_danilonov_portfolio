'use client';

export function HeroCopy() {
  return (
    <div className="mx-auto max-w-3xl text-[#d9dade]">
      <p className="mb-4 font-mono text-[12px] uppercase tracking-[0.24em]">
        [BRAND AWARENESS]
      </p>
      <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
        Design, não
        <br />
        é só estética.
      </h1>
      <p className="mb-8 text-base md:text-lg">
        [É intenção, é estratégia, é experiência.]
      </p>
      <a
        href="/sobre"
        className="text-[0.9rem] font-medium uppercase tracking-[0.22em] text-[#d9dade] transition-colors duration-300 hover:text-white"
        aria-label="Ir para a seção sobre e conhecer melhor o trabalho de Danilo"
      >
        get to know me better →
      </a>
    </div>
  );
}

export default HeroCopy;
