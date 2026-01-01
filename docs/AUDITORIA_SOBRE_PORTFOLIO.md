
🔍 1️⃣ AUDITORIA REAL — HERO DA PÁGINA SOBRE

Baseado na imagem enviada, a Hero está implementada, porém com desvios importantes em relação ao protótipo Ghost Design.

⸻

✅ O QUE ESTÁ CERTO
    •    ✔️ Hero existe e ocupa viewport
    •    ✔️ Texto alinhado à direita
    •    ✔️ Presença de vídeo/visual de fundo
    •    ✔️ Keyword com destaque azul (funciona, intenção)
    •    ✔️ Header integrado (glass / floating)
    •    ✔️ Clima dark / ghost preservado

👉 Base boa. Não é refazer — é ajustar fino.

⸻

⚠️ 2️⃣ PROBLEMAS IDENTIFICADOS (COM SEVERIDADE)

🔴 PROBLEMA 01 — TIPOGRAFIA (CRÍTICO)

Sintomas visíveis
    •    Hierarquia tipográfica inconsistente:
    •    Sou Danilo Novais. muito próximo visualmente do corpo
    •    Corpo com peso e contraste baixos demais
    •    Line-height do parágrafo está apertado
    •    Tracking parece inconsistente
    •    Texto perde legibilidade contra o fundo em alguns pontos

Por que é problema

No Ghost Design, tipografia é a interface principal.
Se ela falha, todo o conceito perde força.

Ajustes necessários
    •    H1 com mais presença (size + weight)
    •    Corpo com line-height maior
    •    Melhor separação visual entre headline e parágrafo
    •    Contraste mínimo garantido (overlay do vídeo)

⸻

🔴 PROBLEMA 02 — VÍDEO DA HERO (CRÍTICO)

Sintomas
    •    Vídeo está competindo visualmente com o texto
    •    O fundo tem informação demais
    •    Falta clareza se:
    •    o vídeo correto está sendo usado
    •    há diferenciação desktop / mobile
    •    Overlay escuro insuficiente

Vídeos oficiais (OBRIGATÓRIOS)

Desktop:
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobre.mp4

Mobile:
https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/HeroSobreMobile.mp4

Ajustes necessários
    •    Garantir uso EXATO desses vídeos
    •    opacity do vídeo entre 0.5–0.65
    •    Overlay gradiente mais forte
    •    preload="metadata"
    •    playsInline, muted, loop

⸻

🟡 PROBLEMA 03 — KEYWORDS EM DESTAQUE

Sintomas
    •    Destaque azul existe, mas:
    •    peso poderia ser mais consistente
    •    hover pouco perceptível
    •    Pode haver mais controle editorial

Ajustes
    •    Limitar a 1–2 keywords por parágrafo
    •    Garantir font-weight: 600
    •    Hover apenas muda cor (sem glow / underline)

⸻

🟡 PROBLEMA 04 — MOTION DO TEXTO

Sintomas
    •    Texto parece entrar “todo junto”
    •    Falta sensação de respiração linha a linha

Ajustes
    •    Entrada line-by-line:
    •    headline
    •    pausa
    •    parágrafo
    •    Blur inicial leve (8–10px)
    •    Easing ghost (cubic-bezier(0.22,1,0.36,1))

⸻

⚠️ 3️⃣ ABOUT METHOD — PONTO CRÍTICO A VALIDAR

Mesmo sem print, pelo estado geral da Hero, é quase certo validar:

Vídeo obrigatório

https://aymuvxysygrwoicsjgxj.supabase.co/storage/v1/object/public/sobre_page/VideoAboutMethod.mp4

Ajustes esperados
    •    Vídeo como camada secundária
    •    Texto sempre em primeiro plano
    •    Parallax ultra sutil (≤ 20px)
    •    Sem competir com leitura
    •    Opacity controlada
    •    Fallback estático se necessário

⸻

🤖 PROMPT EXECUTOR FINAL (PARA AGENT / CI / PR)

Use este prompt exatamente como está:

# 🤖 PROMPT DE AJUSTE — HERO + ABOUT METHOD (SOBRE)

Você é um **Agent Executor Frontend/UI Sênior**.

## Fonte da verdade
- docs/PROTOTIPO_INTERATIVO_SOBRE_GHOST_COMPLETO.md

## OBJETIVO
Corrigir tipografia, vídeo e motion da página SOBRE
para atingir fidelidade total ao Ghost Design.

---

## AJUSTES OBRIGATÓRIOS — HERO

### Tipografia
- Ajustar hierarquia:
  - H1 mais presente
  - Corpo com melhor line-height
- Garantir legibilidade contra o vídeo
- Alinhamento à direita mantido
- Tracking consistente
- Keywords:
  - Máx. 1–2 por parágrafo
  - `.ghost-accent`
  - Hover só muda cor

### Vídeo
- Usar EXATAMENTE:
  - Desktop: HeroSobre.mp4
  - Mobile: HeroSobreMobile.mp4
- autoplay, muted, loop, playsInline
- Opacity do vídeo: 0.5–0.65
- Overlay gradiente escuro obrigatório
- preload="metadata"

### Motion
- Entrada em camadas:
  1. Headline
  2. Pausa curta
  3. Parágrafo
- opacity + blur leve
- ❌ Sem scale / bounce / rotate

---

## AJUSTES — ABOUT METHOD

### Vídeo
- Usar EXATAMENTE:
  VideoAboutMethod.mp4
- Vídeo como background secundário
- Texto sempre acima
- Parallax ≤ 20px
- Opacity controlada

---

## REGRAS
- ❌ Não alterar textos
- ❌ Não reinventar layout
- ❌ Não trocar vídeos
- ❌ Não exagerar motion
- ✅ Mobile-first
- ✅ Fidelidade visual total

## CRITÉRIO DE ACEITE
- Tipografia consistente
- Vídeos corretos
- Texto legível em qualquer frame
- Ghost Design preservado

