// Placeholder CAQH design tokens.
// In production Nexus repos these come from @caqh/design-tokens.
// Components must NOT import these directly — use theme.palette.* instead.

export const tokens = {
  // Brand
  brandPrimary: '#003087',
  brandPrimaryDark: '#001f5b',
  brandPrimaryLight: '#1a4fa8',

  // Neutral
  textPrimary: 'rgba(0, 0, 0, 0.87)',
  textSecondary: 'rgba(0, 0, 0, 0.60)',
  textDisabled: 'rgba(0, 0, 0, 0.38)',

  // Surface
  surfaceDefault: '#ffffff',
  surfacePaper: '#ffffff',
  surfaceBackground: '#f5f5f5',

  // Status
  statusSuccess: '#2e7d32',
  statusWarning: '#ed6c02',
  statusError: '#d32f2f',
  statusInfo: '#0288d1',
} as const;
