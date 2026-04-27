---
name: to-issues
description: Break a plan, spec, or PRD into independently-grabbable Jira tickets using tracer-bullet vertical slices. Use when user wants to convert a plan into Jira tickets, create implementation stories, or break down a feature into tasks.
---

# To Issues (Jira)

Break a plan into independently-workable Jira tickets using vertical slices
(tracer bullets).

## Prerequisites

[jira-cli](https://github.com/ankitpokhrel/jira-cli) (ankitpokhrel/jira-cli):

```bash
# Install (Mac)
brew install ankitpokhrel/tap/jira-cli

# First-time setup
jira init
```

## Process

### 1. Gather context

Work from the current conversation. If the user provides a Jira issue key
(e.g. `NX-123`), fetch it:

```bash
jira issue view NX-123
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
- **Jira type**: Story / Task / Bug

Ask:

- Does the granularity feel right?
- Are blocking relationships correct?
- Should any slices be merged or split?

Iterate until approved.

### 5. Create Jira tickets

Create in **dependency order** (blockers first) so you can reference real keys
in the "Blocked by" field.

```bash
jira issue create \
  --project <PROJECT-KEY> \
  --type Story \
  --summary "<title>" \
  --body "<body>"
```

To link a blocking relationship after both tickets exist:

```bash
jira issue link <blocked-key> <blocker-key> "is blocked by"
# e.g. jira issue link NX-456 NX-123 "is blocked by"
```

To set a parent Epic:

```bash
jira issue move <story-key> --parent <epic-key>
```

## Ticket Body Template

```
## What to build

A concise description of this vertical slice. Describe end-to-end behavior,
not layer-by-layer implementation.

## Acceptance criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Blocked by

- <TICKET-KEY> — <title>

Or "None — can start immediately" if no blockers.
```

## Jira Issue Type Guide

| Slice type                               | Jira type |
| ---------------------------------------- | --------- |
| End-user visible feature slice           | Story     |
| Technical task with no direct user story | Task      |
| Known defect to fix                      | Bug       |
| Group of related stories                 | Epic      |
