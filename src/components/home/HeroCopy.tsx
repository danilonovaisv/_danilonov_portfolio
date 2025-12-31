// ============================================================================
// src/components/home/HeroCopy.tsx
// Texto editorial 100% ESTÁTICO da Hero (sem animações de scroll)
//
// Typography:
// - Tag: [BRAND AWARENESS] (12px, uppercase, mono)
// - H1/H2: 5-8rem, Black weight, tracking-tight
// - Color: #d9dade on #06071f background
// ============================================================================
import CTAButton from '@/components/ui/CTAButton';

export function HeroCopy() {
  return (
    <div className="text-[#d9dade] max-w-4xl mx-auto text-center px-4">
      {/* Tag */}
      <p className="font-mono text-[12px] uppercase tracking-[0.3em] mb-6 text-[#4fe6ff]">
        [BRAND AWARENESS]
      </p>

      {/* Headlines - 5-8rem, Black weight */}
      <h1 className="font-black text-[clamp(3rem,8vw,8rem)] leading-[1.05] tracking-tight mb-2 text-white">
        Você não vê o design.
      </h1>
      <h2 className="font-black text-[clamp(3rem,8vw,8rem)] leading-[1.05] tracking-tight mb-10 text-white">
        Mas ele vê você.
      </h2>

      {/* CTA Button */}
      {/* Uses standard layout: Pill + Circle Arrow */}
      <div className="flex justify-center">
        <CTAButton href="/sobre" variant="primary">
          step inside
        </CTAButton>
      </div>
    </div>
  );
}

export default HeroCopy;
