# Skill: MUI Patterns & Design Tokens

You are an expert in Material UI v5 and the CAQH design token system. Apply
this knowledge whenever working with UI components, theming, or styling in
this repo.

---

## Token System

Tokens live in `src/theme/tokens.ts`. They are wired into MUI via
`src/theme/index.ts`. **Never import raw values from tokens.ts in
components** — always go through `theme.palette.*`.

```ts
// ✅ Correct
sx={{ color: 'primary.main' }}
sx={{ backgroundColor: theme.palette.background.default }}

// ❌ Wrong — never hardcode
sx={{ color: '#003087' }}
sx={{ color: tokens.brandPrimary }}
```

---

## Color Usage

| Semantic meaning | Token path |
|-----------------|------------|
| Brand primary | `theme.palette.primary.main` |
| Brand primary dark | `theme.palette.primary.dark` |
| Brand primary light | `theme.palette.primary.light` |
| Text primary | `theme.palette.text.primary` |
| Text secondary | `theme.palette.text.secondary` |
| Surface/background | `theme.palette.background.default` |
| Card/paper surface | `theme.palette.background.paper` |
| Error | `theme.palette.error.main` |
| Success | `theme.palette.success.main` |
| Warning | `theme.palette.warning.main` |

---

## Spacing

Always use `theme.spacing()` or MUI's `sx` shorthand — never raw px values:

```ts
// ✅
sx={{ p: 2, mt: 1, gap: 1.5 }}
sx={{ padding: theme.spacing(2) }}

// ❌
sx={{ padding: '16px' }}
sx={{ marginTop: 8 }}
```

---

## Typography

Use MUI Typography with semantic variants. Never use raw `<h1>`/`<p>` tags
in components.

```tsx
<Typography variant="h4" component="h1">Page Title</Typography>
<Typography variant="body1">Body text</Typography>
<Typography variant="caption" color="text.secondary">Meta info</Typography>
```

---

## Component Patterns

### Card
```tsx
<Card elevation={1}>
  <CardContent>
    <Typography variant="h6">{title}</Typography>
    <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
  </CardContent>
</Card>
```

### Chip (status/tag)
```tsx
// Use color prop, never backgroundColor
<Chip label="Active" color="success" size="small" />
<Chip label="Pending" color="warning" size="small" />
```

### Button
```tsx
// Primary action
<Button variant="contained" color="primary">Save</Button>
// Secondary action
<Button variant="outlined" color="primary">Cancel</Button>
// Destructive
<Button variant="contained" color="error">Delete</Button>
```

---

## sx prop vs styled()

Prefer `sx` for one-off styles. Use `styled()` only for reusable styled
primitives.

```tsx
// ✅ sx for component-level overrides
<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

// ✅ styled() for a reusable primitive
const StatusDot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
}));
```

---

## useTheme Hook

When you need theme values inside a component's logic (not just sx):

```tsx
import { useTheme } from '@mui/material/styles';

function MyComponent() {
  const theme = useTheme();
  // theme.palette.primary.main, theme.spacing(2), etc.
}
```

---

## What to Avoid

- `style={{ color: '#...' }}` — hook will block this
- `sx={{ color: 'red' }}` — named CSS colors are also bad practice
- Importing from `src/theme/tokens.ts` directly in components
- `!important` overrides
- Nesting more than 2 levels deep in `sx`
