# /triage

Investigate a bug or issue and produce an actionable plan.

**Usage:** `/triage <ticket-id or description>`

## Steps

1. Parse the issue description from the argument.
2. If a ticket ID is given (e.g. `NX-1234`), acknowledge it and ask the user
   to paste the ticket description if they want it included in the analysis.
3. Search the codebase for relevant files using keywords from the description.
4. Read the most relevant files.
5. Identify the likely root cause.
6. Produce a structured triage report.

## Output Format

```
## Triage: [ticket ID or short description]

### Summary
[1-2 sentence description of the problem]

### Root Cause Hypothesis
[Most likely cause based on code review. Be specific — file:line if possible]

### Files to Investigate
- `path/to/file.ts` — [why it's relevant]

### Reproduction Steps (if derivable from code)
1. ...
2. ...

### Proposed Fix
[Specific code change or approach. If multiple options, rank them.]

### Risk
[Low / Medium / High — explain why]

### Branch Name
`feature/nexus/[ticket-id]-[short-description]`

### Estimated Effort
[XS / S / M / L — with brief justification]
```

## Guidelines

- Be specific: name files, functions, line numbers where possible
- If the root cause is unclear, list the top 2-3 hypotheses ranked by
  likelihood
- Flag any token violations, missing tests, or accessibility issues you notice
  while investigating — these belong in the triage report even if not the
  primary issue
- If the fix touches design tokens or MUI theming, note that in the risk section
