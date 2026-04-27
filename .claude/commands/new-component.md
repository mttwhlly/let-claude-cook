# /new-component

Scaffold a new MUI component following CAQH standards.

**Usage:** `/new-component <ComponentName>`

## Steps

1. Parse the component name from the argument (PascalCase).
2. Determine the feature folder: `src/components/<ComponentName>/`
3. Ask the user: "What props should this component accept?" if not provided.
4. Create the three files below.
5. Remind the user to export from the parent barrel if one exists.

## Files to Create

### `src/components/<Name>/<Name>.tsx`

```tsx
import { Box, Typography } from '@mui/material';

interface <Name>Props {
  // props here
}

export function <Name>({ ...props }: <Name>Props) {
  return (
    <Box>
      <Typography variant="body1">
        {/* component content */}
      </Typography>
    </Box>
  );
}
```

Rules:
- Prop interface always named `<Name>Props`
- Export as named export (not default)
- No hardcoded colors — `theme.palette.*` only
- Use `sx` prop for styling, `theme.spacing()` for spacing
- If the component needs theme values in logic: `const theme = useTheme()`

### `src/components/<Name>/<Name>.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import { <Name> } from './<Name>';

const defaultProps: <Name>Props = {
  // minimum valid props
};

describe('<Name>', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider theme={theme}>
        <<Name> {...defaultProps} />
      </ThemeProvider>
    );
  });

  it('displays [key prop]', () => {
    render(
      <ThemeProvider theme={theme}>
        <<Name> {...defaultProps} [prop]="[test value]" />
      </ThemeProvider>
    );
    expect(screen.getByText('[test value]')).toBeInTheDocument();
  });
});
```

### `src/components/<Name>/index.ts`

```ts
export { <Name> } from './<Name>';
export type { <Name>Props } from './<Name>';
```

## After Creation

Remind the user:
- Run `npm test` to verify tests pass
- If there's a parent `src/components/index.ts`, add the export there
- If this implements a Figma design, link it in the PR description
