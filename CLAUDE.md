# let-claude-cook

## What This Repo Is

A dogfood sandbox for building and testing Claude Code configuration patterns
(CLAUDE.md files, skills, hooks, slash commands, sub-agents) before rolling them
out to Nexus pod repos and other CAQH projects.

**Owner:** Matt Whalley, UX Engineer @ CAQH  
**Purpose:** Learn, prove, and demo Claude Code workflows for the tech org

---

## Project Context

- **Stack:** TypeScript / React / MUI (mirrors Nexus pod repos)
- **Design system:** CAQH customized MUI tokens (Figma file: `iiL1cMzMkJ55GaOM8qbGdw`)
- **Primary token reference:** `primary/main` aliases CAQH brand token
- **ADO branch convention:** `feature/<pod>/<ticket-id>-<short-description>`
- **PR template:** Always populate Summary, Figma link, Testing notes, Token impact

---

## Key Commands

| Task | Command |
|------|---------|
| Lint | `npm run lint` |
| Type check | `npm run typecheck` |
| Tests | `npm test` |
| Build | `npm run build` |

---

## Code Standards

### TypeScript
- Strict mode always on — no `any`, use `unknown`
- Prefer `interface` over `type` for object shapes
- All components must have explicit prop interfaces

### MUI / Design Tokens
- **Never** hardcode hex values — always import from the token system
- Use `theme.palette.*` for colors, never raw strings
- Spacing via `theme.spacing()` only
- Import tokens from `@caqh/design-tokens` (or local `src/theme/tokens.ts` in this sandbox)
- See `.claude/skills/mui-patterns/SKILL.md` for full pattern guide

### Components
- One component per file
- Co-locate tests: `ComponentName.test.tsx` alongside `ComponentName.tsx`
- Export from barrel `index.ts` in each feature folder

---

## What I'm Testing Here

1. **CLAUDE.md hierarchy** — this root file + nested files in subdirectories
2. **Skills** — on-demand expertise loaded when relevant (MUI, ADO, a11y)
3. **Hooks** — deterministic enforcement (token guards, branch protection, auto-format)
4. **Slash commands** — `/pr-review`, `/new-component`, `/triage`
5. **Sub-agents** — specialized reviewers (code quality, accessibility)

---

## Do Not

- Push directly to `main`
- Hardcode credentials or API keys anywhere
- Skip the PR template fields
- Use inline styles or hardcoded colors
