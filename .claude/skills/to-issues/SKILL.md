---
name: to-issues
description: Break a plan, spec, or PRD into independently-grabbable Azure DevOps work items using tracer-bullet vertical slices. Use when user wants to convert a plan into ADO work items, create implementation tickets, or break down a feature into tasks.
---

# To Issues (Azure DevOps)

Break a plan into independently-workable ADO work items using vertical slices
(tracer bullets).

## Prerequisites

Azure CLI with DevOps extension:

```bash
az extension add --name azure-devops
az devops configure --defaults organization=https://dev.azure.com/<org> project=<project>
```

## Process

### 1. Gather context

Work from the current conversation. If the user provides an ADO work item ID,
fetch it:

```bash
az boards work-item show --id <id>
```

### 2. Explore codebase (if not already done)

Understand the current state of relevant code before proposing slices.

### 3. Draft vertical slices

Break the plan into **tracer bullet** slices — each is a thin vertical cut
through ALL layers end-to-end (schema, logic, UI, tests), NOT a horizontal
layer (e.g. "do all the UI first").

Each slice should be:

- **HITL** (human-in-the-loop) — needs a decision, design review, or judgment call
- **AFK** (away from keyboard) — can be fully implemented and merged without human interaction

Prefer AFK slices where possible.

Rules:

- Each slice delivers a narrow but complete path through every layer
- A completed slice is demoable or verifiable on its own
- Many thin slices > few thick ones

### 4. Present and confirm

Show as a numbered list. For each slice:

- **Title**: short name
- **Type**: HITL / AFK
- **Blocked by**: which slices must complete first
- **ADO type**: User Story / Task / Bug

Ask:

- Does the granularity feel right?
- Are blocking relationships correct?
- Should any slices be merged or split?

Iterate until approved.

### 5. Create ADO work items

Create in **dependency order** (blockers first) so you can reference real IDs
in the "Blocked by" field.

```bash
az boards work-item create \
  --title "<title>" \
  --type "User Story" \
  --description "<body>"
```

To link a blocking relationship after both items exist:

```bash
az boards work-item relation add \
  --id <blocked-item-id> \
  --target-id <blocker-id> \
  --relation-type "Predecessor"
```

## Work Item Body Template

```
## What to build

A concise description of this vertical slice. Describe end-to-end behavior,
not layer-by-layer implementation.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Blocked by

- #<work-item-id> — <title>

Or "None — can start immediately" if no blockers.
```

## ADO Work Item Type Guide

| Slice type                               | ADO type   |
| ---------------------------------------- | ---------- |
| End-user visible feature slice           | User Story |
| Technical task with no direct user story | Task       |
| Known defect to fix                      | Bug        |
| Group of related stories                 | Feature    |
