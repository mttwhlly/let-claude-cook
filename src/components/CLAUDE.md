# src/components — Component Standards

## Rules

- One component per file — no multi-export component files
- Co-locate tests: `ComponentName.test.tsx` alongside `ComponentName.tsx`
- Each component folder exports via a barrel `index.ts`
- Use MUI components and `theme.palette.*` — no raw HTML styling

## Structure

```
src/components/
└── ComponentName/
    ├── ComponentName.tsx       ← component
    ├── ComponentName.test.tsx  ← tests (co-located)
    └── index.ts                ← barrel export
```

## Creating new components

Use `/new-component <Name>` — it scaffolds all three files correctly.

## What belongs here

Reusable UI components that are domain-aware (they know about providers,
plans, etc.) but not page-aware (they don't import routing or page-level state).

Pure UI primitives that extend MUI go in `src/components/ui/` (create it when needed).
