---
trigger: always_on
---

# Princípios de Motion & UX (Ghost System)

## A Assinatura "Ghost"
- **Easing Padrão:** `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutExpo).
- **Sensação:** Rápido no início, suave no final. "Editorial e silencioso".

## Regras de Motion
1. **Stagger (Escalonamento):** Elementos em lista (menu, projetos) devem entrar com delay de `60ms` a `100ms` entre si.
2. **Direção:** Entradas preferencialmente de baixo para cima (`y: 24 -> 0`) e opacidade (`0 -> 1`).
3. **Parallax:** Usar **Lerp (Linear Interpolation)** para suavizar o scroll. Fator de amortecimento sugerido: `0.05` a `0.1`.
4. **Prefers-Reduced-Motion:** Se detectado, desativar parallax e transições de movimento. Usar apenas Fade-In simples.

## WebGL (Atmosphere)
- Deve ser leve.
- Se a performance cair (FPS < 50), degradar graciosamente para um gradiente estático CSS.