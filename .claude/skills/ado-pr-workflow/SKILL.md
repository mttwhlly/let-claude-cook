# Skill: ADO PR Workflow

You are an expert in CAQH's Azure DevOps branching, commit, and PR standards.
Apply this knowledge whenever creating branches, writing commits, or preparing
pull requests.

---

## Branch Naming

Format: `feature/<pod>/<ticket-id>-<short-description>`

```
feature/nexus/NX-1234-add-provider-card
feature/nexus/NX-5678-fix-auth-redirect
bugfix/nexus/NX-9999-token-expiry-crash
chore/infra/update-mui-to-v6
```

Rules:
- Always lowercase, hyphens only (no underscores, no spaces)
- Pod name: `nexus`, `portal`, `api`, `infra`, etc.
- Ticket ID must match the ADO work item
- Never commit directly to `main`

---

## Commit Format

Follow Conventional Commits:

```
<type>(<scope>): <short description>

[optional body]

[optional footer: closes NX-1234]
```

Types:
| Type | When to use |
|------|------------|
| `feat` | New feature or component |
| `fix` | Bug fix |
| `chore` | Tooling, deps, config (no prod code) |
| `refactor` | Code change with no behavior change |
| `test` | Adding or fixing tests |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no logic change) |
| `perf` | Performance improvement |

Examples:
```
feat(provider-card): add NPI display with copy-to-clipboard
fix(auth): handle token expiry during concurrent requests
chore(deps): upgrade MUI from 5.14 to 5.15
test(provider-card): add snapshot and a11y tests
```

---

## PR Template

Every PR must populate all fields:

```markdown
## Summary
<!-- What does this PR do? Why? Link to ADO ticket. -->
Closes NX-1234

## Figma
<!-- Link to the Figma frame this implements, or "N/A - no UI changes" -->

## Testing
<!-- How was this tested? What should reviewers verify? -->
- [ ] Unit tests pass
- [ ] Manual test: [describe the flow]
- [ ] No console errors
- [ ] Responsive at 1280px and 768px

## Token Impact
<!-- Did this change add, remove, or modify design token usage? -->
- None / Added `primary.light` for hover state / etc.
```

---

## PR Size Guidelines

- Aim for < 400 lines changed per PR
- Split large features into: scaffold → logic → tests → docs
- Never mix unrelated changes in one PR

---

## Review Checklist (use with /pr-review)

Before requesting review, confirm:
- [ ] Branch follows naming convention
- [ ] All commits follow Conventional Commits format
- [ ] PR description fully populated
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm test` passes
- [ ] No hardcoded colors (hook enforces this)
- [ ] No `any` types
- [ ] New components have tests
- [ ] Figma link included if UI changed

---

## Merge Strategy

- Squash merge into `main` (preserves clean history)
- Delete branch after merge
- PR title becomes the squash commit message — make it Conventional Commits format
