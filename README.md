# let-claude-cook 🍳

A dogfood sandbox for Claude Code workflows — CLAUDE.md files, skills, hooks,
slash commands, and sub-agents — built for use across CAQH Nexus pod repos.

---

## Purpose

1. **Learn** — experiment with Claude Code configuration in a low-stakes repo
2. **Prove** — collect real evidence of quality/efficiency improvements
3. **Demo** — show tech leads a working, opinionated setup

---

## Prerequisites

- **Node.js 18+** — hooks are Node scripts, build uses Vite
  - Check: `node --version`
  - Install: [nodejs.org](https://nodejs.org) or `brew install node`
- **Claude Code** — `npm install -g @anthropic-ai/claude-code`
- **Git**

---

## First Session Checklist

After cloning and running `npm install`, verify the setup:

1. **Hooks are wired** — open Claude Code (`claude`) and check that the session
   banner prints branch + git status. If it doesn't, confirm `.claude/settings.json`
   exists and hook paths are correct.

2. **Token guard fires** — ask Claude to write a `.tsx` file with a hardcoded
   hex color (e.g. `color: '#003087'`). It should be blocked with a clear
   message before the file is written.

3. **npm scripts all pass** — run each in order:
   ```bash
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```
   All four should exit 0. See `docs/hook-testing-log.md` for expected results.

---

## Repo Structure

```
let-claude-cook/
├── CLAUDE.md                        ← Project memory (loaded every session)
├── src/
│   ├── main.tsx                     ← App entry point
│   ├── App.tsx                      ← Demo page
│   ├── test-setup.ts                ← Vitest + jest-dom setup
│   ├── theme/
│   │   ├── tokens.ts                ← Raw CAQH design tokens (don't import in components)
│   │   ├── index.ts                 ← MUI theme instance
│   │   └── CLAUDE.md               ← Token rules
│   └── components/
│       ├── CLAUDE.md               ← Component standards
│       └── ProviderCard/            ← Demo component
│           ├── ProviderCard.tsx
│           ├── ProviderCard.test.tsx
│           └── index.ts
├── .claude/
│   ├── settings.json                ← Shared hooks (committed)
│   ├── settings.local.json          ← Personal overrides (gitignored)
│   ├── hooks/
│   │   ├── check-design-tokens.js   ← Blocks hardcoded colors in .ts/.tsx
│   │   ├── guard-main-branch.js     ← Blocks push to main + git reset --hard
│   │   ├── log-file-change.js       ← Audit log of every file Claude touches
│   │   └── session-context.js       ← Loads git status at session start
│   ├── skills/
│   │   ├── mui-patterns/SKILL.md    ← MUI + design token patterns
│   │   ├── ado-pr-workflow/SKILL.md ← ADO branch/PR/commit standards
│   │   └── nexus-accessibility/SKILL.md ← WCAG 2.1 AA patterns
│   ├── commands/
│   │   ├── pr-review.md             ← /pr-review
│   │   ├── new-component.md         ← /new-component <Name>
│   │   ├── triage.md                ← /triage <issue description>
│   │   └── weekly-impact.md         ← /weekly-impact <notes>
│   └── agents/
│       ├── code-reviewer.md         ← Deep code quality sub-agent
│       └── a11y-reviewer.md         ← WCAG-focused sub-agent
└── docs/
    ├── hook-testing-log.md          ← Hook verification results
    └── demo-script.md               ← 10-min demo for tech leads
```

---

## Setup

```bash
git clone https://github.com/<your-handle>/let-claude-cook.git
cd let-claude-cook
npm install
claude  # opens Claude Code in this directory
```

### Windows (work VM)

Hooks are Node.js scripts — they run on Mac and Windows without modification,
as long as `node` is in your PATH.

---

## Using the Slash Commands

In a Claude Code session:

| Command | What it does |
|---------|-------------|
| `/pr-review` | Reviews current branch diff against CAQH standards |
| `/new-component ProviderCard` | Scaffolds a new component with tests |
| `/triage NX-1234 login is broken` | Investigates and plans a fix |
| `/weekly-impact <your notes>` | Generates exec + personal impact reports |

---

## What the Hooks Enforce

| Hook | Trigger | What it blocks/logs |
|------|---------|-------------------|
| `check-design-tokens.js` | Before any `.ts/.tsx` write | Hardcoded hex/rgb colors |
| `guard-main-branch.js` | Before any bash command | Push to main, `git reset --hard` |
| `log-file-change.js` | After every file write | Appends to `.claude/logs/changes.jsonl` |
| `session-context.js` | Session start | Prints branch + git status to Claude |

---

## Extending to a Nexus Pod Repo

1. Copy `.claude/` into the pod repo
2. Update `CLAUDE.md` with pod-specific context (pod name, Jira project, ADO board)
3. Add pod-specific skills if needed (e.g. a data-domain skill for that pod)
4. Commit — hooks and skills apply to everyone running Claude Code in that repo

The `check-design-tokens.js` hook and token standards carry over as-is.
Skills can be overridden or extended per pod via nested `CLAUDE.md` files.

---

## Relationship to Sandcastle

This repo is set up to be Sandcastle-ready when the time comes.
The `.claude/` config, skills, and hooks here become the agent's operating
environment when run inside a Docker sandbox via `sandcastle.run()`.

See `docs/sandcastle-plan.md` (coming soon) for the parallel agent pattern.
