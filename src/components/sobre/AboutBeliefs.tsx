"use client";

import { useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import "./AboutBeliefs.css";

const PHRASES = [
  <>Um vídeo que <strong>respira</strong>.</>,
  <>Uma marca que se <strong>reconhece</strong>.</>,
  <>Um detalhe que <strong>fica</strong>.</>,
  <>
    <strong>Crio</strong> para gerar presença.
  </>,
  <>
    <strong>Mesmo</strong> quando não estou ali.
  </>,
  <>
    <strong>Mesmo</strong> quando ninguém percebe o esforço.
  </>,
];

const BACKGROUNDS = [
  "#0048ff", // início azul principal
  "#8705f2",
  "#f501d3",
  "#0048ff",
  "#8705f2",
  "#f501d3",
  "#0048ff", // termina azul principal
];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export function AboutBeliefs() {
  const prefersReduced = useReducedMotion();

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const phraseRef = useRef(null);

  // seção: ~140vh → sticky content ocupa 100vh enquanto o scroll “avança” os steps
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const steps = useMemo(() => PHRASES.length + 1, []); // 6 frases + 1 final manifesto
  const [stepIndex, setStepIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.round(latest * (steps - 1));
    setStepIndex(clamp(idx, 0, steps - 1));
  });

  const titleInView = useInView(titleRef, { amount: 0.4, once: true });

  const isFinal = stepIndex === steps - 1;
  const phraseIndex = clamp(stepIndex, 0, PHRASES.length - 1);
  const bg = BACKGROUNDS[stepIndex] ?? BACKGROUNDS[BACKGROUNDS.length - 1];
  const phraseInView = useInView(phraseRef, {
    margin: "-20% 0px -20% 0px",
    amount: "some",
  });

  return (
    <motion.section
      ref={sectionRef}
      className="moveSection"
      animate={{ backgroundColor: bg }}
      transition={{
        duration: prefersReduced ? 0 : 0.8,
        ease: [0.17, 0.55, 0.55, 1],
      }}
    >
      <div className="moveSticky">
        <div className="grid">
          {/* 1) BIG TÍTULO FIXO */}
          <div className="titleArea" ref={titleRef}>
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={
                titleInView || prefersReduced
                  ? { opacity: 1, filter: "blur(0px)" }
                  : undefined
              }
              transition={{
                duration: prefersReduced ? 0 : 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="font-display titleLine">
                Acredito no design que muda o dia de alguém.
              </div>
              <div className="font-h2 titleLine">
                Não pelo choque, mas pela conexão.
              </div>
            </motion.div>
          </div>

          {/* 2) ÁREA CENTRAL: frases rotativas (1 por vez) */}
          <div className="phraseArea" aria-live="polite" ref={phraseRef}>
            <div className="colorBlockWrap">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`block-${stepIndex}`}
                  className="colorBlock"
                  initial={
                    prefersReduced ? { opacity: 1 } : { y: "100%", opacity: 1 }
                  }
                  animate={
                    prefersReduced
                      ? { opacity: 1 }
                      : { y: "0%", opacity: 1 }
                  }
                  exit={
                    prefersReduced
                      ? { opacity: 0 }
                      : { y: "-100%", opacity: 1 }
                  }
                  transition={{
                    duration: prefersReduced ? 0 : 0.65,
                    ease: [0.2, 0.65, 0.45, 1],
                  }}
                  style={{ backgroundColor: bg }}
                />
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {!isFinal ? (
                <motion.div
                  key={`phrase-${phraseIndex}`}
                  className="font-h2 phrase"
                  initial={
                    prefersReduced || !phraseInView
                      ? { opacity: 1 }
                      : { opacity: 0, x: 60, filter: "blur(10px)" }
                  }
                  animate={
                    prefersReduced
                      ? { opacity: 1 }
                      : { opacity: 1, x: 0, filter: "blur(0px)" }
                  }
                  exit={
                    prefersReduced
                      ? { opacity: 0 }
                      : { opacity: 0, x: -40, filter: "blur(10px)" }
                  }
                  transition={{
                    duration: prefersReduced ? 0 : 0.65,
                    ease: [0.2, 0.65, 0.45, 1],
                  }}
                >
                  {PHRASES[phraseIndex]}
                </motion.div>
              ) : (
                /* 3) TEXTO FINAL (3 linhas, BIG, branco) */
                <motion.div
                  key="final-manifesto"
                  className="finalWrap"
                  initial={
                    prefersReduced || !phraseInView
                      ? { opacity: 1 }
                      : { opacity: 0, x: 80, scale: 0.98, filter: "blur(12px)" }
                  }
                  animate={
                    prefersReduced
                      ? { opacity: 1 }
                      : { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }
                  }
                  transition={{
                    duration: prefersReduced ? 0 : 0.75,
                    ease: [0.2, 0.65, 0.45, 1],
                  }}
                >
                  <div className="font-display finalText">
                    <div>ISSO É</div>
                    <div>GHOST</div>
                    <div>DESIGN</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* “handoff” visual/espacial para a próxima seção (onde o Ghost entra) */}
      <div className="handoffSpacer" aria-hidden="true" />
    </motion.section>
  );
}

export default AboutBeliefs;
