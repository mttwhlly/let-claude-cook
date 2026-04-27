# Hook Testing Log

Results of manual hook verification. Update after each test run.

---

## check-design-tokens

- **Tested:** 2026-04-27
- **Input:** Attempted to write a `.tsx` file containing `color: '#003087'` (CAQH brand primary)
- **Result:** Blocked ✅
- **Notes:** Hook correctly identifies hex values in non-comment lines. Exempt
  patterns (`.test.tsx`, `.spec.tsx`, `.md`) pass through unblocked as expected.
  Edit tool input is read from stdin as JSON — hook parses `tool_input.content`
  for the file body and `tool_input.file_path` for the extension check.

---

## guard-main-branch

- **Tested:** Pending — requires attempting `git push origin main` in a session
- **Input:** —
- **Result:** —
- **Notes:** Hook reads Bash tool input from stdin as JSON. Checks
  `tool_input.command` against patterns for `git push ... main` and
  `git reset --hard`. Should also block `--force` pushes.

---

## log-file-change

- **Tested:** 2026-04-27
- **Input:** Any Write/Edit operation during scaffold build-out
- **Result:** Creates `.claude/logs/changes.jsonl` ✅ (verify with `cat .claude/logs/changes.jsonl`)
- **Notes:** Appends one JSON line per write: `{"ts":"...","tool":"Write","file":"..."}`.
  Never blocks — failure is silent to avoid interrupting writes.

---

## session-context

- **Tested:** Pending — fires on SessionStart, requires a fresh Claude Code session
- **Input:** N/A (no stdin for SessionStart hooks)
- **Result:** —
- **Notes:** Outputs branch name, last commit hash + message, and `git status --short`
  to stdout. Claude reads this before the first user prompt. Verify by starting
  a new session and checking the initial context Claude has.

---

## Known Issues

None confirmed. Open issues tracked in `docs/known-issues.md` (create if failures are found).
