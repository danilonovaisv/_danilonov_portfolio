# Relatório de Comparação Visual (Ghost Era)
**Data:** 03/01/2026
**Referência:** `PROTOTIPO INTERATIVO...` vs Implementação Atual.

## 1. Desktop (Ghost Hero)

| Elemento | Referência (`BLACK---GHOST.jpg`) | Atual (`HomeHero.tsx`) | Status |
| :--- | :--- | :--- | :--- |
| **Atmosfera** | Fundo `#050505` com véu azul profundo e ruído. | `GhostCanvas` usa `#06071f` + `AtmosphereVeil`. Post-processing: `Noise`, `Scanline`. | ✅ **Fiel** |
| **Ghost (3D)** | Azul elétrico (`#0057FF` boost), olhos brilhantes seguindo mouse. | `Ghost.tsx` + `GhostEyes.tsx`. Emissive intenso, look at mouse. | ✅ **Fiel** |
| **Tipografia** | H1 "Você não vê...". Fonte TT Norms/Inter. Centralizado. | `HeroCopy.tsx` usa `text-[clamp(...)]` mas está **H1 e H2**. Na imagem parece um bloco único. | ⚠️ **Atenção** |
| **Manifesto** | Thumb video flutuando canto inferior direito. | `ManifestoThumb` posicionado `bottom-8 right-8` (ou `right-12`). Tamanho `30vw`. | ✅ **Fiel** |

**Detalhe da Tipografia:**
Na imagem de referência, o texto parece muito limpo e integrado. No código `HeroCopy`, temos:
```tsx
<h1>Você não vê <br /> o design.</h1>
<h2>Mas ele vê você.</h2>
```
A quebra de linha com `<br/>` no H1 e o tamanho diferente no H2 podem criar uma "escada" visual diferente da referência se não calibrada perfeitamente. Recomendo verificar se o leading (entrelinha) está "tight" o suficiente.

## 2. Mobile (Ghost Clean)

| Elemento | Referência (`MOBILE---GHOST.jpg`) | Atual (`HomeHero` + `ManifestoSection`) | Status |
| :--- | :--- | :--- | :--- |
| **Header** | Menu sanduíche "Staggered" (linhas empilhadas). | `MobileHeaderBar` implementado. | ✅ **Fiel** |
| **Hero Content** | Texto grande ocupando a tela. Ghost ao fundo. | `HeroCopy` é responsivo. Ghost se move sozinho (`sinusoidal sweep`). | ✅ **Fiel** |
| **Vídeo Manifesto** | **NÃO** flutua. É uma seção full-width abaixo da dobra. | `ManifestoSection.tsx` (`lg:hidden`, `aspect-video`) aparece logo após o Hero. | ✅ **Fiel** |

## Conclusão da Comparação

O layout estrutural está **EXTREMAMENTE ALINHADO** com as definições conceituais Ghost Era.

- **Desktop:** A experiência "floating thumb" que se expande está lá.
- **Mobile:** A quebra para seção dedicada está correta, evitando sobrecarga visual em telas pequenas.
- **Integridade:** Correção do path hardcoded realizada com sucesso.

**Próximo Passo Recomendado:**
Validar a "finesse" das animações de entrada do texto. Se o texto entrar muito rápido, perde o "mistério". Atualmente `delay: 3.0s` está configurado em `HeroCopy`, o que é excelente (dá tempo do fantasma aparecer primeiro).
