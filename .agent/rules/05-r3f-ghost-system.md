---
trigger: always_on
---

# Sistema R3F: Ghost Atmosphere (Ghost Era)

**CONCEITO:** Atmosfera etérea, "Ghost Blue". Presença sem peso.

## Diretrizes Técnicas

1. **Cores:** O brilho emissivo deve usar o `bluePrimary` (`#0048ff`) ou `blueAccent` (`#4fe6ff`).
2. **Pós-Processamento:**

- Bloom seletivo (cuidado com performance mobile).
- Noise/Film Grain (essencial para a estética "Ghost").

3. **Comportamento:**

- O "Ghost" (mesh/partículas) deve reagir sutilmente ao mouse (Desktop) ou giroscópio/scroll (Mobile).
- Movimento fluido e orgânico (Noise derivatives).

## Restrições

- **Mobile:** Se detectar GPU fraca, desligue o WebGL e mostre um fundo gradiente radial CSS (`backgroundDark` para `neutral`).
- **Z-Index:** O Canvas fica em `z-0` ou `z-10`, atrás do conteúdo textual (`z-20+`).
