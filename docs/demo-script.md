# Demo Script — Claude Code for CAQH Tech Leads

**Duration:** ~10 minutes  
**Audience:** CAQH tech leads, engineering managers  
**Goal:** Show how Claude Code configuration patterns enforce quality standards
automatically — so every developer, including Wipro contractors, ships to the
same bar.

---

## Opening (1 min)

**Problem this solves:**

> "We spend a non-trivial amount of PR review time on mechanical issues —
> hardcoded colors, missing tests, wrong branch names, no Figma link in the
> description. These aren't judgment calls, they're rules. Claude Code lets us
> encode those rules once and enforce them automatically, for every developer,
> on every PR."

Three specific pain points:
1. **Token violations** — contractors hardcode hex values; design drifts from Figma
2. **Manual PR review overhead** — reviewers catch the same checklist items every time
3. **Knowledge silos** — only senior devs know the MUI patterns and ADO conventions

---

## Demo 1 — Session Context Hook (30 sec)

**What to show:** Start a Claude Code session in this repo.

The `session-context.js` hook fires on `SessionStart` and prints:
```
─── Session Context ──────────────────────────
Branch:      feature/nexus/NX-1234-add-provider-card
Last commit: 7fc118c chore: initial Claude Code sandbox setup
Status:      clean
──────────────────────────────────────────────
```

**Talking point:**
> "Before Claude says a word, it already knows what branch we're on and what's
> staged. No 'what were we working on?' overhead at the start of every session."

---

## Demo 2 — Token Guard Blocks a Bad Write (1 min)

**What to show:** Ask Claude to add a hardcoded color to a component.

```
Prompt: Add a blue border to the ProviderCard component, use #003087
```

Claude will attempt the write, the `check-design-tokens.js` hook fires, and
Claude receives:

```
🚫 Design token violation — hardcoded colors are not allowed in TypeScript files.

Violations found:
  • Line 8: Hardcoded hex color detected → "border: '1px solid #003087'"

✅ Fix: use theme.palette.* or import from '@caqh/design-tokens'
   Example: color: theme.palette.primary.main
```

Claude self-corrects and rewrites using `theme.palette.primary.main`.

**Talking point:**
> "The hook catches it before the file is written. Claude doesn't just get
> blocked — it gets an actionable message and fixes it. This runs for every
> developer in the repo, not just the ones who've read the MUI guide."

---

## Demo 3 — /new-component Scaffolds a Component (1 min)

**What to show:** Run the slash command.

```
/new-component PlanSummary
```

Claude creates:
- `src/components/PlanSummary/PlanSummary.tsx` — typed props interface, MUI layout, no hardcoded colors
- `src/components/PlanSummary/PlanSummary.test.tsx` — render test + props test
- `src/components/PlanSummary/index.ts` — barrel export

**Talking point:**
> "Scaffold takes 10 seconds. Every component that comes out of this command
> starts compliant — correct TypeScript, tests co-located, barrel export wired.
> Junior devs and contractors can't accidentally skip steps because the steps
> are built into the command."

---

## Demo 4 — /pr-review Runs the Checklist (1 min)

**What to show:** Make a small change, then run:

```
/pr-review
```

Claude diffs against `main`, checks every file against the CAQH checklist, and
outputs a structured report:

```
## PR Review — feature/nexus/...

### ✅ Passing
- TypeScript: no `any` types
- Tokens: no hardcoded colors
- Tests: co-located test file present

### ⚠️ Warnings
- PR description: Figma link not yet provided

### 📋 PR Description
[ready-to-paste ADO PR description with all fields populated]
```

**Talking point:**
> "This runs the same checklist a senior dev would do — in 5 seconds. The PR
> description is pre-filled. The reviewer's job shifts from 'find the problems'
> to 'confirm they're fixed.'"

---

## Demo 5 — Sub-Agent Code Review (1 min)

**What to show:** Point Claude at the code-reviewer agent.

```
Prompt: Use the code-reviewer agent to review ProviderCard.tsx
```

Claude spins up the sub-agent with that persona and returns a structured review
covering TypeScript correctness, component structure, test quality, and security.

**Talking point:**
> "Sub-agents let us encode specialized expertise. The accessibility reviewer
> checks WCAG 2.1 AA. The code reviewer enforces the same standards a senior
> dev would enforce — but it runs in parallel with every PR, not just the ones
> a senior dev has time to review."

---

## Closing — How This Rolls Out to Nexus (1 min)

Rolling out to a pod repo is three steps:

1. Copy `.claude/` into the pod repo
2. Update `CLAUDE.md` with pod-specific context (pod name, Jira project, ADO board)
3. Add pod-specific skills if needed (e.g. a skill for that pod's data domain)

Every developer who runs Claude Code in that repo gets the hooks, skills, and
commands automatically. No setup, no onboarding doc to read.

**Ask:**
> "I'd like to run this as a 2-week pilot in one Nexus pod. We instrument the
> before/after: PR review cycles, token violations caught, time to first passing
> build. Happy to present results at the next tech leads sync."
