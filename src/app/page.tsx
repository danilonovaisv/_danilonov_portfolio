- // src/app/page.tsx (exemplo provável)
- export default function Page() {
-   return <main>...</main>;
- }
+ // src/app/page.tsx
+ import type { Metadata } from "next";
+ import { GhostHeroCanvas } from "@/components/GhostHeroCanvas";
+ import { motion } from "motion/react";
+
+ export const metadata: Metadata = {
+   title: "Portfólio — Danilo Novais",
+   description: "Design não é só estética — é intenção, estratégia e experiência.",
+ };
+
+ export default function Page() {
+   const prefersReduced =
+     typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
+
+   return (
+     <main className="relative min-h-[120vh] overflow-clip bg-neutral-950 text-white">
+       <section className="relative h-[100svh] w-full">
+         <GhostHeroCanvas />
+         <div className="relative z-[10] mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-6">
+           <span className="text-[12px] uppercase tracking-widest opacity-70">[BRAND AWARENESS]</span>
+           <motion.h1
+             initial={prefersReduced ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
+             animate={prefersReduced ? {} : { opacity: 1, y: 0, filter: "blur(0px)" }}
+             transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
+             className="mt-2 text-5xl font-extrabold leading-[0.95] md:text-7xl"
+           >
+             <strong>Design, não é<br />só estética.</strong>
+           </motion.h1>
+           <motion.p
+             initial={prefersReduced ? false : { opacity: 0, y: 10 }}
+             animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
+             transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
+             className="mt-3 text-xl text-neutral-300 md:text-2xl"
+           >
+             [É intenção, é estratégia, é experiência.]
+           </motion.p>
+           <motion.div
+             initial={prefersReduced ? false : { opacity: 0 }}
+             animate={prefersReduced ? {} : { opacity: 1 }}
+             transition={{ duration: 0.5, delay: 0.6 }}
+             className="mt-8"
+           >
+             <a
+               href="/sobre"
+               className="rounded-full border border-white/30 px-5 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/10"
+             >
+               Saiba mais
+             </a>
+           </motion.div>
+         </div>
+       </section>
+       {/* ...restante da página */}
+     </main>
+   );
+ }