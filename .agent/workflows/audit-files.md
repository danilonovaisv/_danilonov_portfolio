---
description: # 🛡️ Workflow de Auditoria de Arquitetura - Antigravity
---

# 🛡️ Workflow de Auditoria de Arquitetura - Antigravity

Este documento descreve o fluxo de trabalho para validar a integridade arquitetural do projeto **Antigravity**. O objetivo é garantir que as "Sessões" (módulos) e "Páginas" (arquivos) respeitem as regras de dependência e importação definidas.

---

## 📋 Pré-requisitos

Antes de iniciar a auditoria, certifique-se de que:

1.  O ambiente **Python 3.x** está ativo.
2.  O script de auditoria `antigravity_audit.py` está na raiz do projeto.
3.  As regras de arquitetura estão atualizadas no arquivo de configuração (dentro do script).

---

## ⚙️ Configuração de Regras (Matriz de Dependência)

As regras definem **quem pode chamar quem**. Antes de rodar, verifique a constante `ARQUITETURA_PERMITIDA` no script.

**Exemplo de Estrutura:**
| Sessão Atual | Pode Importar de... |
| :--- | :--- |
| `Controllers` | `Services`, `Utils` |
| `Services` | `Repositories`, `Utils` |
| `Utils` | _(Nenhum - deve ser isolado)_ |

> **Nota:** Se uma nova sessão for criada, ela deve ser adicionada manualmente a esta matriz antes da auditoria.

---

## 🚀 Execução do Workflow

Siga os passos abaixo para realizar a auditoria manual.

### Passo 1: Iniciar o Antigravity Auditor

Abra o terminal na raiz do projeto e execute:

```bash
python antigravity_audit.py

Passo 2: Seleção de Sessão
O sistema solicitará o nome da sessão (pasta) que será o foco da auditoria.
 * Entrada: Digite o nome exato da pasta (ex: financeiro, usuarios, core).
Passo 3: Definição de Escopo
O sistema perguntará o nível de profundidade da auditoria. Escolha uma das opções:
🅰️ Opção 1: Auditoria Completa da Sessão
 * O que faz: Varre todos os arquivos dentro da pasta da sessão escolhida.
 * Quando usar: Antes de um Merge Request ou ao finalizar uma feature grande.
 * Ação: Digite 1.
🅱️ Opção 2: Auditoria de Página Única (Single Page)
 * O que faz: Analisa apenas um arquivo específico dentro daquela sessão.
 * Quando usar: Durante o desenvolvimento, para verificar se o arquivo que você acabou de criar está em conformidade.
 * Ação:
   * Digite 2.
   * Forneça o nome do arquivo (ex: CreateUserHandler.py).
📊 Análise de Resultados
Após a execução, o Antigravity retornará um dos seguintes status:
✅ Sucesso (Clean)
✅ Sucesso! X arquivos analisados. Nenhuma violação encontrada.

 * Significado: Todos os imports respeitam a arquitetura.
 * Próximo Passo: O código está aprovado para commit/push.
⚠️ Violação Detectada (Violation)
[VIOLAÇÃO] Arquivo 'X' na sessão 'Y' importou 'Z' indevidamente.

 * Significado: Um arquivo está acessando uma camada que não deveria (ex: View chamando Database diretamente).
 * Ação Corretiva:
   * Abra o arquivo listado.
   * Remova o import proibido.
   * Refatore o código para passar pela camada intermediária correta.
   * Execute o Workflow novamente.
🔄 Resumo do Fluxo
 * Start (python antigravity_audit.py)
 * Input (Nome da Sessão)
 * Decision (Sessão Completa ou Arquivo Único?)
   * Se Completa: Loop em todos os arquivos da pasta.
   * Se Única: Leitura de um arquivo específico.
 * Process (Verificação AST vs Regras).
 * Output (Relatório de Conformidade).
> Antigravity Maintenance
> Mantenha a gravidade baixa e a qualidade do código alta.
>
```
