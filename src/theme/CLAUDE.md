# src/theme — Design Token Source

This directory is the token source of truth for the sandbox.

## Rules

- `tokens.ts` contains raw CAQH brand values — treat them as constants, not imports
- In real Nexus repos, tokens come from `@caqh/design-tokens` (npm package)
- **Components must NEVER import from `tokens.ts` directly**
- Always use `theme.palette.*` — the theme wires tokens into MUI's palette

## Why

Token abstraction lets us swap the token source (e.g. upgrade from local file
to `@caqh/design-tokens`) without touching any component.

## Adding tokens

1. Add the raw value to `tokens.ts`
2. Map it to a semantic palette slot in `index.ts`
3. Reference it in components as `theme.palette.<slot>`
