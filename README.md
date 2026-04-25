# let-claude-cook 🍳

A dogfood sandbox for Claude Code workflows — CLAUDE.md files, skills, hooks,
slash commands, and sub-agents — built for use across CAQH Nexus pod repos.

---

## Purpose

1. **Learn** — experiment with Claude Code configuration in a low-stakes repo
2. **Prove** — collect real evidence of quality/efficiency improvements  
3. **Demo** — show tech leads a working, opinionated setup

---

## Repo Structure

```
let-claude-cook/
├── CLAUDE.md                        ← Project memory (loaded every session)
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
    └── ...
```

---

## Setup

### Prerequisites

- [Claude Code](https://claude.ai/code) installed: `npm install -g @anthropic-ai/claude-code`
- Node.js 18+ (hooks are cross-platform Node scripts)
- Git

### Clone & open

```bash
git clone https://github.com/<your-handle>/let-claude-cook.git
cd let-claude-cook
claude  # opens Claude Code in this directory
```

### Windows (work VM)

The hooks are Node.js scripts so they run on both Mac and Windows without
modification — as long as `node` is in your PATH. No bash required.

---

## Using the slash commands

In a Claude Code session:

| Command | What it does |
|---------|-------------|
| `/pr-review` | Reviews current branch diff against CAQH standards |
| `/new-component ProviderCard` | Scaffolds a new component with tests |
| `/triage NX-1234 login is broken` | Investigates and plans a fix |
| `/weekly-impact <your notes>` | Generates exec + personal impact reports |

---

## What the hooks enforce

| Hook | Trigger | What it blocks/logs |
|------|---------|-------------------|
| `check-design-tokens.js` | Before any file write to `.ts/.tsx` | Hardcoded hex/rgb colors |
| `guard-main-branch.js` | Before any bash command | Push to main, `git reset --hard` |
| `log-file-change.js` | After every file write | Appends to `.claude/logs/changes.jsonl` |
| `session-context.js` | Session start | Prints branch + git status to Claude |

---

## Extending to a Nexus pod repo

1. Copy `.claude/` into the pod repo
2. Update `CLAUDE.md` with pod-specific context (pod name, Jira project, etc.)
3. Add pod-specific skills if needed (e.g. a skill for that pod's data domain)
4. Commit — hooks and skills apply to everyone running Claude Code in that repo

---

## Relationship to Sandcastle

This repo is set up to be Sandcastle-ready when the time comes.
The `.claude/` config, skills, and hooks here become the agent's operating
environment when run inside a Docker sandbox via `sandcastle.run()`.

See `docs/sandcastle-plan.md` (coming soon) for the parallel agent pattern.
