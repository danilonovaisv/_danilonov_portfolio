# 📋 PLAN.md - Auditoria e Reestruturação do ADMIN Panel

**Data:** 2026-02-04
**Autor:** Antigravity Orchestrator
**Status:** `EM_EXECUÇÃO` ✅ Aprovado pelo usuário

---

## 🆕 REQUISITO ADICIONAL

### Seleção de Modelo AI no Scene Generator

O usuário deve poder escolher entre diferentes modelos de geração de imagem:

| Modelo | Provider | Tipo |
|--------|----------|------|
| **Nano Banana** | Custom | Image Generation |
| **DALL-E 3** | OpenAI | Image Generation |
| **Sora** | OpenAI | Video Generation |
| **Flow** | Custom | Image/Video |
| **Whisky** | Custom | Image Generation |

**Nota:** Alguns modelos podem não estar disponíveis via API. Implementarei placeholders para modelos custom.

---

## 🎯 OBJETIVO

Realizar auditoria completa do painel ADMIN, separando as duas ferramentas de AI (**Copy Agent** e **Ad Scene Generator**) em menus individuais no sidebar, seguindo o padrão dos outros itens do menu.

---

## 📊 ESTADO ATUAL

### Estrutura de Navegação (Sidebar)

```
├── Dashboard
├── Trabalhos
├── Tags
├── Mídia & Layout
├── Landing Pages
├── Configurações
└── Antigravity AI ← (ÚNICO MENU que contém 2 ferramentas)
    ├── /copy-agent
    └── /scene-generator
```

### Problema Identificado

- O item "Antigravity AI" agrupa duas ferramentas distintas em um submenu
- Os outros itens do menu são acessos diretos (não têm submenus)
- A UX seria melhor com acesso direto a cada ferramenta

---

## 🎯 ESTADO DESEJADO

### Nova Estrutura de Navegação

```
├── Dashboard
├── Trabalhos
├── Tags
├── Mídia & Layout
├── Landing Pages
├── Configurações
├── Copy Agent ← NOVO MENU DIRETO (ícone: PenTool)
└── Scene Generator ← NOVO MENU DIRETO (ícone: Image)
```

---

## 📁 ARQUIVOS AFETADOS

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `src/config/admin-navigation.ts` | MODIFICAR | Adicionar rotas `copyAgent` e `sceneGenerator`, remover `antigravity` |
| `src/components/admin/AdminShell.tsx` | MODIFICAR | Atualizar `navItems` com dois novos itens separados |
| `src/app/admin/(protected)/copy-agent/page.tsx` | CRIAR | Mover conteúdo de `antigravity/copy-agent` |
| `src/app/admin/(protected)/scene-generator/page.tsx` | CRIAR | Mover conteúdo de `antigravity/scene-generator` |
| `src/app/admin/(protected)/copy-agent/actions.ts` | CRIAR | Mover action `generateProjectCopy` |
| `src/app/admin/(protected)/scene-generator/actions.ts` | CRIAR | Mover action `generateAdScenes` |
| `src/app/admin/antigravity/*` | REMOVER | Pasta antiga após migração |

---

## 🏗️ PLANO DE EXECUÇÃO

### FASE 1: Atualização de Navegação

**Agente:** @ghost_architect

1. Atualizar `admin-navigation.ts`:
   - Remover: `antigravity: '/admin/antigravity'`
   - Adicionar: `copyAgent: '/admin/copy-agent'`
   - Adicionar: `sceneGenerator: '/admin/scene-generator'`

2. Atualizar `AdminShell.tsx`:
   - Substituir item `Antigravity AI` por dois itens:
     - `Copy Agent` (ícone: `PenTool`, cor: indigo)
     - `Scene Generator` (ícone: `ImageIcon`, cor: emerald)

### FASE 2: Migração de Páginas

**Agente:** @ghost_architect

1. Criar `src/app/admin/(protected)/copy-agent/page.tsx`
   - Adaptar o componente de `antigravity/copy-agent/page.tsx`
   - Remover o layout wrapper (já existe em protected)
   - Ajustar imports

2. Criar `src/app/admin/(protected)/scene-generator/page.tsx`
   - Adaptar o componente de `antigravity/scene-generator/page.tsx`
   - Remover o layout wrapper
   - Ajustar imports

### FASE 3: Migração de Actions

**Agente:** @ghost_architect

1. Criar `src/app/admin/(protected)/copy-agent/actions.ts`
   - Mover função `generateProjectCopy`
   - Manter types

2. Criar `src/app/admin/(protected)/scene-generator/actions.ts`
   - Mover função `generateAdScenes`
   - Manter types

### FASE 4: Limpeza

**Agente:** @ghost_architect

1. Remover pasta `src/app/admin/antigravity/` após validação
2. Verificar links quebrados
3. Testar navegação

### FASE 5: Polimento Visual

**Agente:** @spectral_artist

1. Adicionar header com título e descrição em cada página
2. Garantir que as cores sigam o Ghost Design System:
   - Copy Agent: indigo accent (`#6366f1`)
   - Scene Generator: emerald accent (`#10b981`)

### FASE 6: Teste de Regressão

**Agente:** @audit_sentinel

1. Build check: `npm run build`
2. Verificar funcionamento das ferramentas AI
3. Testar navegação mobile
4. Verificar acessibilidade (aria-labels)

---

## 🛡️ CONSIDERAÇÕES DE SEGURANÇA

- [ ] Verificar que as actions permanecem como `'use server'`
- [ ] Garantir que OPENAI_API_KEY não é exposta
- [ ] Manter rotas dentro de `(protected)` para manter autenticação

---

## 📝 CHECKLIST DE VALIDAÇÃO

- [ ] Dois novos menus aparecem no sidebar
- [ ] Copy Agent funciona (gera texto)
- [ ] Scene Generator funciona (gera 3 imagens)
- [ ] Pasta `antigravity/` removida
- [ ] Build passa sem erros
- [ ] Mobile responsivo

---

## 🤖 BATALHÃO DESIGNADO

| Agente | Responsabilidade | Fases |
|--------|------------------|-------|
| **@ghost_architect** | Arquitetura e migração de componentes | 1, 2, 3, 4 |
| **@spectral_artist** | Polimento visual e cores Ghost | 5 |
| **@audit_sentinel** | Validação, build e testes | 6 |

---

> ⏸️ **AGUARDANDO APROVAÇÃO DO USUÁRIO PARA PROSSEGUIR**
