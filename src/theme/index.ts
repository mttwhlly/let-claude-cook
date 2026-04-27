import { createTheme } from '@mui/material/styles';
import { tokens } from './tokens';

export const theme = createTheme({
  palette: {
    primary: {
      main: tokens.brandPrimary,
      dark: tokens.brandPrimaryDark,
      light: tokens.brandPrimaryLight,
    },
    text: {
      primary: tokens.textPrimary,
      secondary: tokens.textSecondary,
      disabled: tokens.textDisabled,
    },
    background: {
      default: tokens.surfaceBackground,
      paper: tokens.surfacePaper,
    },
    success: {
      main: tokens.statusSuccess,
    },
    warning: {
      main: tokens.statusWarning,
    },
    error: {
      main: tokens.statusError,
    },
    info: {
      main: tokens.statusInfo,
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
