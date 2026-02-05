# Orchestration Plan: Responsive 3D Ghost Motion & UI Sync

## 1. System Overview

**Objective**: Synchronize 3D Ghost Model animation with UI text elements and ensure responsive fidelity across Mobile/Desktop.

## 2. Orchestration Team (Antigravity Agents)

| Agent | ID | Role | Responsibilities |
|---|---|---|---|
| **Motion Orchestrator** | `@motion_choreographer` | UX/UI Motion | Define animation timing (duration, easing), Sync `3D_ELEMENT` fade-in with `FIXED_TEXT`. |
| **Frontend Specialist** | `@ghost_architect` | Responsive 3D | Implement precise positioning logic in `GhostModel.tsx` for Mobile/Desktop views. |
| **QA Inspector** | `@audit_sentinel` | Fidelity | Validate implementation against reference images ("Redline" check). |

## 3. Implementation Workflow

### Phase 1: Planning (Current)

- [x] Analyze `AboutBeliefs.tsx` and `GhostModel.tsx`.
- [x] Define Agent Responsibilities.
- [ ] Approval of Plan.

### Phase 2: Execution (Sequential Handoff)

#### Step 2.1: Motion Orchestration (Agent A)

- **Target File**: `GhostScene.tsx`, `AboutBeliefs.tsx`
- **Action**:
  - Set `GhostScene` entry transition to match text.
  - Define Global Easing: `cubicBezier(0.22, 1, 0.36, 1)`.
  - Ensure `opacity` and `filter` transitions are synchronized.
  - **New Constraint**: Sync fade-in with "surgir junto com a entrada do texto fixo".

#### Step 2.2: Responsive Positioning (Agent B)

- **Target File**: `GhostModel.tsx`
- **Action**:
  - Refactor `config` object to be more declarative for Mobile vs Desktop.
  - **Mobile**: Adjust `baseX`, `startY` to prevent overlap with footer text. (Ref: `ghost-3D-position-mobile.jpg`)
  - **Desktop**: Center/Right alignment. (Ref: `ghost-3D-position-desktop.jpg`)
  - **Final**: Implement ending state. (Ref: `ghost-3D-desktop-mobile-final.jpg`)
  - Implement `useThree` viewport logic to handle resizing dynamically.

#### Step 2.3: Visual QA (Agent C)

- **Action**:
  - Run `lint_runner.py` to ensure Type Safety.
  - Verify `App` build.
  - User Manual Check: Compare against `ghost-3D-position-*.jpg`.

## 4. Verification

- `checklist.py` must pass.
