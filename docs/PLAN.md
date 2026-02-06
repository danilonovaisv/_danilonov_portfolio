# PLAN: Ajuste de Alinhamento e Estética - Ghost System v3

Este plano visa sincronizar a interface do portfólio com o design especificado na imagem de referência, focando no alinhamento de grid, tamanho de fontes e posicionamento do elemento 3D Ghost.

## 📋 Tarefas

### 1. Ajuste do Texto à Esquerda (BeliefSection)

- **Arquivo**: `src/components/sobre/beliefs/BeliefSection.tsx`
- **Ação**:
  - Aumentar o tamanho da fonte (`text-clamp`) para desktop.
  - Ajustar o `padding-left` ou alinhamento para que o texto comece exatamente na linha do grid (conforme as linhas amarelas da imagem).
  - Verificar o `leading` (espaçamento entre linhas).

### 2. Redimensionamento e Reposicionamento do Ghost (GhostModel)

- **Arquivo**: `src/components/sobre/3d/GhostModel.tsx`
- **Ação**:
  - Aumentar a `baseScale` para desktop (de `0.35` para `0.45` ou `0.5`).
  - Ajustar `targetY` e `targetX` no `isFinalPhase` para elevar o Ghost e centralizá-lo conforme a caixa azul da imagem.

### 3. Ajuste do Texto à Direita (BeliefFixedHeader)

- **Arquivo**: `src/components/sobre/beliefs/BeliefFixedHeader.tsx`
- **Ação**:
  - Validar o alinhamento do bloco de texto com o grid à direita.
  - Garantir que a hierarquia "Acredito no..." vs "Não pelo choque..." esteja visualmente equilibrada.

### 4. Verificação Final

- **Ação**:
  - Rodar `lint_runner.py` para garantir integridade.
  - Se possível, rodar `lighthouse_audit.py` (ou pelo menos garantir que não quebramos a performance).

## 🤖 Agentes Envolvidos

| Agente | Responsabilidade |
| :--- | :--- |
| **@ghost_architect** | Orquestração e estrutura dos componentes de layout. |
| **@spectral_artist** | Ajustes no modelo 3D (Escala e Posição). |
| **@motion_choreographer** | Sincronização das animações de entrada/saída. |
| **@test-engineer** | Auditoria de lint e conformidade. |

## 🚦 Status

- [ ] Implementação do Texto Esquerdo
- [ ] Implementação do Ghost 3D
- [ ] Implementação do Texto Direito
- [ ] Validação de Lint

✅ **Pronto para iniciar?** (Aguardando aprovação do usuário)
