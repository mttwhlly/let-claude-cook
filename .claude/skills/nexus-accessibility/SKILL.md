# Skill: Nexus Accessibility (WCAG 2.1 AA)

You are an expert in web accessibility for React/MUI applications. Apply WCAG
2.1 AA standards to all UI work in this repo. CAQH products serve healthcare
professionals and must be accessible.

---

## Core Principles

**POUR**: Perceivable, Operable, Understandable, Robust

Every component must pass at minimum:
- Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- Full keyboard navigability
- Screen reader announcement for all interactive elements
- No seizure-inducing animations

---

## Semantic HTML

MUI components render semantic HTML by default — preserve it:

```tsx
// ✅ Typography with correct component mapping
<Typography variant="h1" component="h1">Page Title</Typography>
<Typography variant="body1" component="p">Description</Typography>

// ✅ Button is always a <button> unless linking
<Button onClick={handleClick}>Action</Button>
<Button component={Link} href="/path">Navigate</Button>

// ❌ Don't suppress semantics
<Typography variant="h2" component="div">  // loses heading level
```

---

## ARIA Patterns

### Labels
```tsx
// Icon-only buttons must have aria-label
<IconButton aria-label="Close dialog">
  <CloseIcon />
</IconButton>

// Input fields must have labels (visible or aria-label)
<TextField label="Provider NPI" inputProps={{ 'aria-label': 'Provider NPI' }} />
```

### Live regions (dynamic content)
```tsx
// Status messages that update without navigation
<Box role="status" aria-live="polite">
  {saveMessage}
</Box>

// Error messages
<Box role="alert" aria-live="assertive">
  {errorMessage}
</Box>
```

### Dialogs
```tsx
<Dialog
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <DialogTitle id="dialog-title">Confirm Delete</DialogTitle>
  <DialogContent>
    <DialogContentText id="dialog-description">
      This action cannot be undone.
    </DialogContentText>
  </DialogContent>
</Dialog>
```

---

## Keyboard Navigation

All interactive elements must be reachable and operable via keyboard:

- `Tab` / `Shift+Tab`: focus order must be logical (top-left to bottom-right)
- `Enter` / `Space`: activate buttons and checkboxes
- `Escape`: close dialogs, tooltips, menus
- Arrow keys: navigate within menus, radio groups, tabs

```tsx
// Custom interactive elements need tabIndex and key handlers
<Box
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(); }}
>
```

---

## Focus Management

```tsx
// After opening a dialog, focus must move inside it
// MUI Dialog handles this automatically — don't override it

// After closing a dialog, focus returns to the trigger
const triggerRef = useRef<HTMLButtonElement>(null);

const handleClose = () => {
  setOpen(false);
  triggerRef.current?.focus();
};

<Button ref={triggerRef} onClick={() => setOpen(true)}>Open</Button>
```

---

## Color & Contrast

CAQH brand primary `#003087` on white passes AA (contrast ratio ~13:1).

Check any new color combinations at https://webaim.org/resources/contrastchecker/

Rules:
- Text on colored backgrounds: always check contrast
- Disabled state: MUI's default disabled styling passes AA
- Error red: MUI's `error.main` passes AA on white
- Never convey information with color alone — pair with icon or text

---

## Images & Icons

```tsx
// Decorative icons (beside text label)
<CheckCircleIcon aria-hidden="true" />

// Meaningful standalone icons
<CheckCircleIcon titleAccess="Verification complete" />

// Images
<img src={url} alt="Provider headshot for Dr. Jane Smith" />
// Decorative images
<img src={url} alt="" role="presentation" />
```

---

## Forms

```tsx
// Always associate labels with inputs
<FormControl>
  <FormLabel id="specialty-label">Specialty</FormLabel>
  <Select labelId="specialty-label" label="Specialty">
    ...
  </Select>
</FormControl>

// Show inline errors with aria-describedby
<TextField
  error={!!errors.npi}
  helperText={errors.npi}
  inputProps={{ 'aria-describedby': errors.npi ? 'npi-error' : undefined }}
/>
```

---

## Testing Accessibility

Run in tests:
```tsx
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('has no axe violations', async () => {
  const { container } = render(<ProviderCard ... />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

Manual testing:
1. Tab through the entire component — is every interactive element reachable?
2. Activate with Enter/Space — does it work?
3. Run with VoiceOver (Mac) or NVDA (Windows) — does it announce correctly?
