# Project Memory

## [STATUS ATUAL]

- [2026-01-26] Ativada configuração mestra baseada no arquivo `.agentrules` na raiz.
- [2026-01-26] Atualizado `.cursorrules` para integrar os diretórios `./agent/rules/` e `./agent/workflows/` como fontes primárias de verdade.
- [2026-01-26] Todos os 19 arquivos de regras e 32 arquivos de workflows registrados em `.agentrules` foram validados e estão ativos.
- [2026-01-26] Configurado caminho para arquivos de customização do agente em `.agent/customizations`.
- [2026-01-26] Criada regra de integridade em `.agent/rules/customizations.md` para priorizar este caminho.
- [2026-01-26] Documentado o novo caminho em `AGENT.md`.

- [2026-01-26] Sincronização e atualização mestre de regras concluída (@rules:atualizar).
- [2026-01-26] .agentrules validado e atualizado com todos os 19 arquivos de regras e 32 workflows.
- [2026-01-26] .cursorrules refinado com core tech stack (Next.js 15, React 18.3, Tailwind v4/v3.4), Z-Index Hierarchy e Motion Principles.
- [2026-01-26] Corrigida discrepância de informações do usuário no contexto das regras.

## [CONTEXTO TÉCNICO]

- **Tech Stack:** Confirmado o uso de Next.js 15 e React 18.3 para estabilidade com R3F e Post-processing.
- **Hierarchy:** Mantida a arquitetura de camadas Z-Index rígida para garantir a atmosfera "Ghost".
- **Single Source of Truth:** Definida a prioridade `./docs/blueprints_project/` > `./agent/rules/` > `.cursorrules`.

## [PRÓXIMOS PASSOS]

- O sistema está agora calibrado com as regras mais recentes. Auditorias de componentes podem ser realizadas seguindo os workflows de `./agent/workflows/`.

## [ALERTA DE BUGS]

- Nenhum bug identificado nesta configuração.
