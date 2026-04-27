# /pr-review

Review the current branch diff against CAQH standards and produce a structured
report.

## Steps

1. Run `git diff main...HEAD --stat` to get an overview of changed files.
2. Run `git diff main...HEAD` to read all changes in full.
3. Run `git log main...HEAD --oneline` to review commit messages.
4. Check each changed file against the criteria below.
5. Output a structured report grouped by category.

## Review Criteria

### Commits
- [ ] Each commit follows Conventional Commits format (`type(scope): description`)
- [ ] No commit messages like "WIP", "fix", "update", "changes"

### TypeScript
- [ ] No `any` types (use `unknown` where needed)
- [ ] All components have explicit prop interfaces
- [ ] Strict mode violations: check for implicit returns, missing types

### Design Tokens / MUI
- [ ] No hardcoded hex colors (`#...`) in `.ts`/`.tsx` files
- [ ] No hardcoded `rgb()`/`rgba()` values
- [ ] Colors sourced from `theme.palette.*` only
- [ ] Spacing via `theme.spacing()` or MUI `sx` shorthand — no raw `px`

### Components
- [ ] One component per file
- [ ] Each new component has a co-located `.test.tsx`
- [ ] Each feature folder has a barrel `index.ts`
- [ ] No inline styles (`style={{...}}`)

### Accessibility
- [ ] Interactive elements have accessible labels
- [ ] Icon-only buttons have `aria-label`
- [ ] Form fields have associated labels
- [ ] Keyboard navigation works (no mouse-trap patterns)

### Tests
- [ ] New components have at least: render test, props display test
- [ ] No skipped tests (`it.skip`, `test.skip`, `xit`)
- [ ] No `console.log` left in test files

### PR Description (prompt user if not on GitHub)
- [ ] Summary field populated with ticket reference
- [ ] Figma link provided (or "N/A — no UI changes")
- [ ] Testing notes filled in
- [ ] Token impact documented

## Output Format

```
## PR Review — [branch name]

### ✅ Passing
- [list items that pass]

### ⚠️ Warnings (should fix before merge)
- [list warnings with file:line references]

### 🚫 Blockers (must fix before merge)
- [list blockers with file:line references]

### 📋 PR Description
[Paste ready-to-use PR description populated from the diff]
```

If everything passes, output:
```
## PR Review — [branch name]
✅ All checks pass. Ready to open PR.

[Paste PR description]
```
