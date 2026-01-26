# 🛠️ AGENT CUSTOMIZATIONS

This rule instructs the agent to always check for and prioritize instructions located in the `.agent/customizations` directory.

## 📂 CUSTOMIZATION PATH (STRICT)

**Path:** `./agent/customizations/`

### 1. Priority
- Files within this directory contain project-specific overrides, tweaks, and additional contexts.
- Always include the contents of this directory in your reasoning process before executing tasks.
- If a rule in `customizations/` conflicts with a global rule, the customization ALWAYS wins.

### 2. Loading Protocol
- At the start of every mission, scan `.agent/customizations/` for `.md` or `.txt` files.
- Merge the context from these files into your operational logic.
