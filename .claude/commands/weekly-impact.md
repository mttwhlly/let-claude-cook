# /weekly-impact

Generate two weekly impact reports from proof-of-impact notes.

**Usage:** `/weekly-impact <your notes>`

Paste raw notes about what you shipped, fixed, or learned this week. The
command produces two polished reports.

## Output

### Report 1: Executive Summary (for your manager or skip-level)

Format:
```
## Week of [date] — [Your Name]

### Shipped
- [Achievement] → [Business impact, e.g. "reduces manual QA time by ~2h/PR"]

### In Progress
- [Work item] — [Expected completion or blocker]

### Metrics / Evidence
- [Any quantitative signal: PRs merged, tests added, violations caught, etc.]

### Asks / Blockers
- [Anything you need from leadership]
```

Tone: confident, outcome-focused, no jargon. Executives want "what changed and
why it matters," not technical detail.

### Report 2: Personal Leverage Log (for your own records)

Format:
```
## [date] — Leverage Log

### What I shipped
[More detailed version with technical specifics]

### What I learned
[New patterns, tools, or insights worth remembering]

### What slowed me down
[Honest friction points — process, tooling, knowledge gaps]

### What I'd do differently
[Retrospective note for future similar work]

### Seeds planted
[Things I set in motion that will pay off later — skills invested in,
relationships built, tech debt addressed, etc.]
```

Tone: honest, reflective, for your eyes only.

## Guidelines

- Infer dates from context if not given (ask if ambiguous)
- Translate technical work into business language for Report 1
- Keep Report 1 under 200 words
- Report 2 can be as long as needed — this is your institutional memory
- If the notes mention Claude Code or AI tooling, frame it as a productivity
  multiplier in Report 1: "Reduced [X] from N hours to M minutes using AI-assisted
  code review"
